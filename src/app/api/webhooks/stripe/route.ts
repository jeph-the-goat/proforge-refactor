import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import { CustomerService } from '@/lib/services/customer.service'
import type { Stripe } from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const customerService = new CustomerService()

// Maximum age of webhook events to process (5 minutes)
const MAX_WEBHOOK_AGE = 5 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature')

    if (!signature) {
      console.warn('Missing Stripe signature')
      return new NextResponse('No signature', { 
        status: 400,
        headers: { 'Cache-Control': 'no-store' }
      })
    }

    // Verify webhook signature and construct event
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Check event age
    const eventAge = Date.now() - event.created * 1000
    if (eventAge > MAX_WEBHOOK_AGE) {
      console.warn('Webhook event too old:', { eventAge, eventId: event.id })
      return new NextResponse('Event too old', { 
        status: 400,
        headers: { 'Cache-Control': 'no-store' }
      })
    }

    // Verify event hasn't been processed before (implement idempotency)
    const idempotencyKey = event.id
    const processed = await checkIfEventProcessed(idempotencyKey)
    if (processed) {
      return new NextResponse('Event already processed', { 
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customer = await customerService.getByStripeCustomerId(session.customer as string)

        if (!customer) {
          console.error('No customer found for session:', {
            sessionId: session.id,
            customerId: session.customer
          })
          break
        }

        // Verify the customer matches the metadata
        if (session.metadata?.customerId !== customer.id) {
          console.error('Customer ID mismatch:', {
            sessionId: session.id,
            metadataCustomerId: session.metadata?.customerId,
            customerId: customer.id
          })
          break
        }

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          
          await customerService.updateSubscription(customer.id, {
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
            priceId: subscription.items.data[0].price.id,
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          })
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customer = await customerService.getByStripeCustomerId(subscription.customer as string)

        if (!customer) {
          console.error('No customer found for subscription:', {
            subscriptionId: subscription.id,
            customerId: subscription.customer
          })
          break
        }

        await customerService.updateSubscription(customer.id, {
          subscriptionStatus: subscription.status,
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        })
        break
      }

      case 'payment_method.attached': {
        const paymentMethod = event.data.object as Stripe.PaymentMethod
        const customer = await customerService.getByStripeCustomerId(paymentMethod.customer as string)

        if (!customer) {
          console.error('No customer found for payment method:', {
            paymentMethodId: paymentMethod.id,
            customerId: paymentMethod.customer
          })
          break
        }

        // Verify the payment method belongs to the customer
        // const stripeCustomer = await stripe.customers.retrieve(customer.stripeCustomerId)
        const paymentMethods = await stripe.paymentMethods.list({
          customer: customer.stripeCustomerId,
          type: paymentMethod.type as Stripe.PaymentMethodListParams['type']
        })

        if (!paymentMethods.data.find(pm => pm.id === paymentMethod.id)) {
          console.error('Payment method does not belong to customer:', {
            paymentMethodId: paymentMethod.id,
            customerId: customer.id
          })
          break
        }

        await customerService.updatePaymentMethod(customer.id, paymentMethod.id)
        break
      }
    }

    // Mark event as processed
    await markEventAsProcessed(idempotencyKey)

    return new NextResponse(null, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
      }
    })
  } catch (err) {
    console.error('Webhook error:', err)
    return new NextResponse(
      'Webhook error: ' + (err instanceof Error ? err.message : 'Unknown error'),
      { 
        status: 400,
        headers: { 'Cache-Control': 'no-store' }
      }
    )
  }
}

// Note: Implement these functions with your database
async function checkIfEventProcessed(eventId: string): Promise<boolean> {
  // TODO: Check if event has been processed in your database
  void eventId;
  return false
}

async function markEventAsProcessed(eventId: string): Promise<void> {
  // TODO: Mark event as processed in your database
  void eventId;
} 