import stripe from '@lib/stripe';
import type Stripe from 'stripe';
import {CustomerService} from './customer.service';

interface CreateCheckoutSessionParams {
  userId: string;
  userCount: number;
  isAnnual: boolean;
  selectedAddOns: string[];
  customerId?: string;
  email?: string;
}

interface CreatePortalSessionParams {
  customerId: string;
  returnUrl: string;
}

export class StripeService {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  async createCheckoutSession({
    userId,
    userCount,
    isAnnual,
    selectedAddOns,
    customerId,
    email,
  }: CreateCheckoutSessionParams) {
    try {
      // Calculate price based on user count and add-ons
      let totalPrice = 75 * userCount  // $75 per user

      // Add selected add-ons to price
      const addOns = [
        { id: "ai-fleet", price: 25 * userCount },
        { id: "service-scheduling", price: 30 * userCount },
        { id: "ai-analytics", price: 1000 },
      ]

      selectedAddOns.forEach(addonId => {
        const addon = addOns.find(a => a.id === addonId)
        if (addon) {
          totalPrice += addon.price
        }
      })

      // Apply annual discount if applicable
      if (isAnnual) {
        totalPrice *= 12 * 0.8 // 20% discount for annual billing
      }

      // Create or retrieve Stripe customer
      let stripeCustomer: Stripe.Customer
      if (customerId) {
        stripeCustomer = await stripe.customers.retrieve(customerId) as Stripe.Customer
      } else {
        stripeCustomer = await stripe.customers.create({
          email,
          metadata: {
            userId,
          },
        })
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.id,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "required",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `ProForge ERP Subscription (${userCount} users)`,
                description: `Includes: Base plan${selectedAddOns.length ? ` + ${selectedAddOns.join(", ")}` : ""}`,
              },
              unit_amount: Math.round(totalPrice * 100), // Convert to cents
              recurring: {
                interval: isAnnual ? "year" : "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          userCount: userCount.toString(),
          addOns: JSON.stringify(selectedAddOns),
          isAnnual: isAnnual.toString(),
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      })

      return { url: session.url, sessionId: session.id }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to create checkout session")
    }
  }

  async createPortalSession({ customerId, returnUrl }: CreatePortalSessionParams) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      })

      return { url: session.url }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to create portal session")
    }
  }

  async validateCheckoutSession(sessionId: string, userId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer", "subscription"],
      })

      if (!session?.metadata?.userId || session.metadata.userId !== userId) {
        throw new Error("Invalid session")
      }

      return {
        isValid: true,
        customerId: session.customer as string,
        subscriptionId: session.subscription as string,
      }
    } catch (error) {
      void error;
      return { isValid: false }
    }
  }
} 