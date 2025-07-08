import { prisma } from '@/lib/prisma'
import stripe from '@/lib/stripe'
import type { Customer, User } from '@prisma/client'

export class CustomerService {
  /**
   * Get or create a Stripe customer for a user
   */
  async getOrCreateCustomer(user: User): Promise<Customer> {
    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { userId: user.id }
    })

    if (existingCustomer) {
      return existingCustomer
    }

    // Create new Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email: user.email || undefined,
      name: user.name || undefined,
      metadata: {
        userId: user.id
      }
    })

    // Create customer record in database
    return await prisma.customer.create({
      data: {
        userId: user.id,
        stripeCustomerId: stripeCustomer.id,
      }
    })
  }

  /**
   * Update customer subscription details
   */
  async updateSubscription(
    customerId: string,
    data: {
      subscriptionId?: string
      subscriptionStatus?: string
      priceId?: string
      currentPeriodEnd?: Date
    }
  ): Promise<Customer> {
    return await prisma.customer.update({
      where: { id: customerId },
      data
    })
  }

  /**
   * Update customer payment method
   */
  async updatePaymentMethod(
    customerId: string,
    paymentMethodId: string
  ): Promise<Customer> {
    // Update Stripe customer's default payment method
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    })

    if (!customer) {
      throw new Error('Customer not found')
    }

    await stripe.customers.update(customer.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    })

    // Update local customer record
    return await prisma.customer.update({
      where: { id: customerId },
      data: {
        defaultPaymentMethod: paymentMethodId,
        hasValidPaymentMethod: true
      }
    })
  }

  /**
   * Update customer billing address
   */
  async updateBillingAddress(
    customerId: string,
    billingAddress: Record<string, any>
  ): Promise<Customer> {
    return await prisma.customer.update({
      where: { id: customerId },
      data: {
        billingAddress
      }
    })
  }

  /**
   * Get customer by Stripe customer ID
   */
  async getByStripeCustomerId(stripeCustomerId: string): Promise<Customer | null> {
    return await prisma.customer.findUnique({
      where: { stripeCustomerId }
    })
  }

  /**
   * Get customer by user ID
   */
  async getByUserId(userId: string): Promise<Customer | null> {
    return await prisma.customer.findUnique({
      where: { userId }
    })
  }
} 