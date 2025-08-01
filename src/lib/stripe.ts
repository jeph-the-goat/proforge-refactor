import Stripe from 'stripe';
import { getEnvVar } from './env';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://proforgeerp.com' 
    : 'http://localhost:3000');

if (process.env.NODE_ENV === 'production' && process.env.VERCEL && !baseUrl.startsWith('https://') && !baseUrl.includes('localhost')) {
  throw new Error('Production domain must use HTTPS');
}

type PlanConfig = {
  userCount: number;
  isAnnual: boolean;
  selectedAddOns: string[];
};

type Interval = 'month' | 'year';

type StripeSubscriptionStatus = 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'paused';

type SubscriptionResponse = {
  subscriptionId: string;
  customerId: string;
  status: StripeSubscriptionStatus;
  currentPeriodEnd: number;
  userCount: number;
  isAnnual: boolean;
  addOns: string[];
  customerEmail: string | null;
};

type StripeErrorCode =
  | 'INVALID_SESSION_ID'
  | 'SESSION_EXPIRED'
  | 'INCOMPLETE_SESSION'
  | 'PAYMENT_INCOMPLETE'
  | 'MISSING_DATA'
  | 'PAYMENT_ACTION_REQUIRED'
  | 'PAYMENT_DISPUTED'
  | 'INVALID_SUBSCRIPTION_STATUS'
  | 'VERIFICATION_ERROR';

class StripeError extends Error {
  constructor(message: string, public code: StripeErrorCode) {
    super(message);
    this.name = 'StripeError';
  }
}

// Payment status constants
const VALID_PAYMENT_STATUSES = ['succeeded', 'processing'];
const VALID_SUBSCRIPTION_STATUSES: StripeSubscriptionStatus[] = [
  'active',
  'trialing'
];

export async function createCheckoutSession(planConfig: PlanConfig) {
  try {
    const { userCount, isAnnual, selectedAddOns } = planConfig;
    // Calculate line items based on configuration
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // Base subscription
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `ProForge Base Plan - ${userCount} user${userCount > 1 ? 's' : ''}`,
          description: `Base plan includes AIA billing, job costing, accounting, and more`,
        },
        unit_amount: 75 * 100, // $75 in cents
        recurring: {
          interval: isAnnual ? 'year' : 'month',
          interval_count: 1,
        },
      },
      quantity: userCount,
    });

    // Add-ons with proper typing
    if (selectedAddOns?.includes('ai-fleet')) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AI Fleet Management',
            description: 'Advanced AI-powered fleet tracking and optimization',
          },
          unit_amount: 25 * 100,
          recurring: {
            interval: isAnnual ? 'year' : 'month',
            interval_count: 1,
          },
        },
        quantity: userCount,
      });
    }

    if (selectedAddOns?.includes('service-scheduling')) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Service Scheduling',
            description: 'Intelligent service dispatch and scheduling system',
          },
          unit_amount: 50 * 100, // $50 in cents
          recurring: {
            interval: isAnnual ? 'year' : 'month' as Interval,
            interval_count: 1,
          },
        },
        quantity: userCount,
      });
    }

    if (selectedAddOns?.includes('ai-analytics')) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AI Data Analytics',
            description: 'Comprehensive AI-driven business analytics platform',
          },
          unit_amount: 1000 * 100, // $1000 in cents
          recurring: {
            interval: isAnnual ? 'year' : 'month' as Interval,
            interval_count: 1,
          },
        },
        quantity: 1, // Flat rate, not per user
      });
    }

    // Apply annual discount if applicable
    if (isAnnual) {
      lineItems.forEach(item => {
        if (item.price_data?.unit_amount) {
          // Apply 20% discount for annual billing
          item.price_data.unit_amount = Math.round((item.price_data.unit_amount * 12 * 0.8));
        }
      });
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'required',
      line_items: lineItems,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
      metadata: {
        userCount: userCount.toString(),
        isAnnual: isAnnual.toString(),
        addOns: selectedAddOns.join(','),
      },
      subscription_data: {
        metadata: {
          userCount: userCount.toString(),
          isAnnual: isAnnual.toString(),
          addOns: selectedAddOns.join(','),
        },
      },
    };

    const session = await stripe.checkout.sessions.create(params);

    if (!session?.url) {
      throw new Error('Failed to create checkout session URL');
    }

    return {
      url: session.url,
      sessionId: session.id,
    };
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error);
    throw new Error(error instanceof Error ? error.message : "Failed to create checkout session");
  }
}

export async function getSessionStatus(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.status,
      customerEmail: session.customer_details?.email,
      metadata: session.metadata,
    };
  } catch (error) {
    // Production error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to retrieve session status: ${errorMessage}`);
  }
}

export async function handleSubscriptionSuccess(
  sessionId: string,
): Promise<SubscriptionResponse> {
  try {
    // remove for prod
    if (!sessionId?.startsWith('cs_')) {
      throw new StripeError('Invalid session ID format', 'INVALID_SESSION_ID');
    }

    // Retrieve session with expanded details
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer', 'payment_intent', 'payment_intent.charges.data'],
    });

    // Check session expiration
    if (session.expires_at && session.expires_at < Math.floor(Date.now() / 1000)) {
      throw new StripeError('Session has expired', 'SESSION_EXPIRED');
    }

    // Validate session status
    if (session.status !== 'complete') {
      throw new StripeError('Session is not complete', 'INCOMPLETE_SESSION');
    }

    // Validate payment status
    if (session.payment_status !== 'paid') {
      throw new StripeError('Payment not completed', 'PAYMENT_INCOMPLETE');
    }

    // Validate subscription and customer existence
    if (!session?.subscription || !session?.customer) {
      throw new StripeError('Missing subscription or customer data', 'MISSING_DATA');
    }

    // Validate payment intent status
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    if (paymentIntent) {
      if (!VALID_PAYMENT_STATUSES.includes(paymentIntent.status)) {
        throw new StripeError('Payment requires additional action', 'PAYMENT_ACTION_REQUIRED');
      }

      // Check for disputes using expanded charges data
      const charge = (paymentIntent as any).charges?.data?.[0];
      if (charge?.disputed) {
        throw new StripeError('Payment is disputed', 'PAYMENT_DISPUTED');
      }
    }

    // Get subscription details with proper typing
    const subscriptionId = (session.subscription as Stripe.Subscription).id;
    const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
    const subscription = subscriptionResponse as unknown as Stripe.Subscription;

    if (!VALID_SUBSCRIPTION_STATUSES.includes(subscription.status)) {
      throw new StripeError('Subscription is not active', 'INVALID_SUBSCRIPTION_STATUS');
    }

    // Extract customer and metadata
    const customer = session.customer as Stripe.Customer;
    const metadata = session.metadata;

    // Calculate current period end
    const currentPeriodEnd = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // Default to 30 days

    return {
      subscriptionId: subscription.id,
      customerId: customer.id,
      status: subscription.status,
      currentPeriodEnd,
      userCount: metadata?.userCount ? parseInt(metadata.userCount) : 1,
      isAnnual: metadata?.isAnnual === 'true',
      addOns: metadata?.addOns ? metadata.addOns.split(',') : [],
      customerEmail: customer.email,
    };
  } catch (error) {
    if (error instanceof StripeError) {
      throw error;
    }
    throw new StripeError('Subscription verification failed', 'VERIFICATION_ERROR');
  }
}

const stripe = new Stripe(getEnvVar('STRIPE_SECRET_KEY'), {
  apiVersion: '2025-07-30.basil',
  typescript: true,
  appInfo: {
    name: 'ProForge ERP',
    version: '0.1.0',
  },
  maxNetworkRetries: 2, // Add automatic retries for failed requests
  timeout: 20000, // Set reasonable timeout (20 seconds)
});

export default stripe;

// Export base URL for consistent usage
export { baseUrl };