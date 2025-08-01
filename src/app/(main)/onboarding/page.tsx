"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProForgeOnboarding from "@/components/onboarding/proforge-onboarding"
import { clsx } from "clsx"
import { Button, Section } from "@/components";
import styles from "@/styles/onboarding/Loading.module.scss"

interface SubscriptionData {
  subscriptionId: string;
  customerId: string;
  status: string;
  currentPeriodEnd: number;
  userCount: number;
  isAnnual: boolean;
  addOns: string[];
  customerEmail: string | null;
}

function OnboardingContent() {
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
          console.error(errorData.error || 'Failed to verify subscription');
          setIsProcessing(false);
          return
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
    return <ProForgeOnboarding sessionId={sessionId} subscriptionData={subscriptionData}/>
  }

  if (!isProcessing && !subscriptionVerified) {
    return (
      <Section
        title="Subscription Error"
        paragraph="There was a problem verifying your subscription. Please contact support if this issue persists."
        extraClassName={clsx(styles.cOnboardingLoading, "c-onboarding-loading")}
      >
        <Button
          title="Return to Pricing"
          onClick={() => router.push("/#pricing")}
          extraClassName="c-onboarding-loading-button"
        >
          Return to Pricing
        </Button>
      </Section>
    )
  }

  // Loading state
  return (
    <Section
      title="Processing your subscription"
      paragraph="Please wait while we verify your subscription..."
      extraClassName={clsx(styles.cOnboardingLoading, "c-onboarding-loading")}>
    </Section>
  )
}

function OnboardingSetup() {
  return (
    <Suspense>
      <OnboardingContent />
    </Suspense>
  )
}

export default OnboardingSetup;