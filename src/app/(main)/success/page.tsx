"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProForgeOnboarding from "@/components/onboarding/proforge-onboarding"
import { cn } from "@/lib/utils"
import { clsx } from "clsx"
import styles from "./success.module.scss"

type SubscriptionData = {
  subscriptionId: string;
  customerId: string;
  status: string;
  currentPeriodEnd: number;
  userCount: number;
  isAnnual: boolean;
  addOns: string[];
  customerEmail: string | null;
}

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(true)
  const [subscriptionVerified, setSubscriptionVerified] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    const verifySubscription = async () => {
      const currentSessionId = searchParams.get("session_id")

      if (!currentSessionId) {
        console.error("No session ID found. Please try again.")
        router.push("/pricing")
        return
      }

      setSessionId(currentSessionId)
      try {
        // Call API route instead of direct function
        const response = await fetch('/api/stripe/verify-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: currentSessionId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to verify subscription');
        }

        const result = await response.json();

        if (!result || !result.subscriptionId || result.status !== 'active') {
          console.error("Your subscription could not be verified. Please contact support.\nInvalid subscription result", result)
          setIsProcessing(false)
          return
        }
        
        setSubscriptionData({
          subscriptionId: result.subscriptionId,
          customerId: result.customerId,
          status: result.status,
          currentPeriodEnd: result.currentPeriodEnd,
          userCount: result.userCount,
          isAnnual: result.isAnnual,
          addOns: result.addOns,
          customerEmail: result.customerEmail
        })
        setIsProcessing(false)
        setSubscriptionVerified(true)
      } catch (error) {
        console.error("Your subscription could not be verified. Please contact support.\n", error)
        setIsProcessing(false)
      }
    }

    verifySubscription()
  }, [router, searchParams])

  if (subscriptionVerified && subscriptionData) {
    return <ProForgeOnboarding sessionId={sessionId} subscriptionData={subscriptionData} />
  }

  if (!isProcessing && !subscriptionVerified) {
    return (
      <div className={clsx(styles.cSuccessPage, "c-success-page")}>
        <div className="c-success-page-container">
          <div className="c-success-page-content">
            <h1 className="c-success-page-title">Subscription Error</h1>
            <p className="c-success-page-description">
              There was a problem verifying your subscription. Please contact support if this issue persists.
            </p>
            <button
              onClick={() => router.push("/#pricing")}
              className="c-success-page-button"
            >
              Return to Pricing
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(styles.cSuccessPage, "c-success-page")}>
      <div className="c-success-page-container">
        <div className="c-success-page-content">
          <h1 className="c-success-page-title">Processing Your Subscription</h1>
          <p className="c-success-page-description">
            Please wait while we verify your subscription...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className={clsx(styles.cSuccessPage, "c-success-page")}>
        <div className="c-success-page-container">
          <div className="c-success-page-content">
            <h1 className="c-success-page-title">Loading</h1>
            <p className="c-success-page-description">
              Please wait...
            </p>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
} 