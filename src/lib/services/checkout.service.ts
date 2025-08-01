import {CustomerService} from './customer.service'
import stripe from '@/lib/stripe'
import {User} from '@prisma/client'
import {getDomain} from '@/lib/env'
import {CheckoutOptions, ICheckoutService} from './interfaces/checkout.interface'
import type Stripe from 'stripe'

export class CheckoutService implements ICheckoutService {
  constructor(private customerService: CustomerService = new CustomerService()) {}

  /**
   * Create a Stripe checkout session for a user
   */
  async createCheckoutSession(
    user: User,
    priceId: string,
    options: CheckoutOptions = {}
  ): Promise<Stripe.Checkout.Session> {
    try {
      // Get or create customer
      const customer = await this.customerService.getOrCreateCustomer(user)

      // Create checkout session
      return await stripe.checkout.sessions.create({
        customer: customer.stripeCustomerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: options.successUrl || `${getDomain()}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: options.cancelUrl || `${getDomain()}/`,
        subscription_data: options.trialDays
          ? {
            trial_period_days: options.trialDays,
          }
          : undefined,
        metadata: {
          userId: user.id,
          customerId: customer.id,
          ...options.metadata,
        },
      })
    } catch (error) {
      console.error('Failed to create checkout session:', error)
      throw new Error(
        'Failed to create checkout session: ' +
        (error instanceof Error ? error.message : 'Unknown error')
      )
    }
  }

  /**
   * Create a Stripe billing portal session for a customer
   */
  async createPortalSession(
    user: User,
    returnUrl?: string
  ): Promise<Stripe.BillingPortal.Session> {
    try {
      const customer = await this.customerService.getByUserId(user.id)

      if (!customer) {
        throw new Error('No customer found for user')
      }

      return await stripe.billingPortal.sessions.create({
        customer: customer.stripeCustomerId,
        return_url: returnUrl || getDomain(),
      })
    } catch (error) {
      console.error('Failed to create portal session:', error)
      throw new Error(
        'Failed to create portal session: ' +
        (error instanceof Error ? error.message : 'Unknown error')
      )
    }
  }

  /**
   * Validate a checkout session
   */
  async validateSession(
    sessionId: string,
    userId: string
  ): Promise<{
    isValid: boolean
    message?: string
    session?: Stripe.Checkout.Session
  }> {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription', 'payment_intent']
      })
      
      // Verify the session belongs to this user
      if (session.metadata?.userId !== userId) {
        return { isValid: false, message: 'Session does not belong to user' }
      }

      // Verify the payment status
      if (session.payment_status !== 'paid') {
        return { isValid: false, message: 'Payment not completed' }
      }

      // For subscriptions, verify subscription status
      if (session.mode === 'subscription' && session.subscription) {
        const subscription = session.subscription as Stripe.Subscription
        if (subscription.status !== 'active' && subscription.status !== 'trialing') {
          return { isValid: false, message: 'Subscription not active' }
        }
      }

      return { isValid: true, session }
    } catch (error) {
      console.error('Session validation error:', error)
      return { 
        isValid: false, 
        message: 'Invalid session: ' + 
          (error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }
}