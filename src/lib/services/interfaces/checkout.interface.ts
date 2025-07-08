import { User } from '@prisma/client'
import Stripe from 'stripe'

export interface CheckoutOptions {
  successUrl?: string
  cancelUrl?: string
  trialDays?: number
  metadata?: Record<string, string>
}

export interface ICheckoutService {
  createCheckoutSession(
    user: User,
    priceId: string,
    options?: CheckoutOptions
  ): Promise<Stripe.Checkout.Session>

  createPortalSession(
    user: User,
    returnUrl?: string
  ): Promise<Stripe.BillingPortal.Session>

  validateSession(
    sessionId: string,
    userId: string
  ): Promise<{
    isValid: boolean
    message?: string
    session?: Stripe.Checkout.Session
  }>
} 