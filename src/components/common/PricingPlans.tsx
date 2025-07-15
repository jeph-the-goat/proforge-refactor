"use client";

import styles from "@/styles/common/PricingPlans.module.scss";
import { IcnBolt, IcnCircleCheck } from "@assets/icons";

import React, { useState } from 'react';
import { clsx } from "clsx";

import {PlanProps, Plans} from "@/utils";

import {Button, ButtonLink, ToggleSwitch} from "@/components";
// Remove direct stripe import - use API route instead
import { useSession, signIn } from "next-auth/react";

const getAnnualPrice = (plan: PlanProps): { price: string; amount: number | null } => {
  if (plan.priceAmount === null || plan.priceAmount === 0) {
    return { price: plan.price, amount: plan.priceAmount }; // Keep original for Free/Custom
  }

  const annualAmount = Math.round(plan.priceAmount * 12 * 0.8); // 20% discount (pay 80%)

  return {
    price: `$${annualAmount}`,
    amount: annualAmount
  };
};

export const PricingPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleGetStarted = async (userCount: number = 1) => {
    if (!session) {
      signIn();
      return;
    }

    try {
      setIsLoading(true);

      // Call API route instead of direct stripe function
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userCount,
          isAnnual,
          selectedAddOns: []
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error(errorMessage);
      setIsLoading(false);
    }
  };

  const adaptedPricings = !isAnnual
    ? Plans
    : Plans.map(plan => {
      if (plan.id === 'enterprise' || plan.priceAmount === 0) {
        return plan;
      }

      const annualPricing = getAnnualPrice(plan);

      return {
        ...plan,
        price: annualPricing.price,
        priceAmount: annualPricing.amount,
        period: 'year'
      };
    });

  return (
    <div className={clsx(styles.cPricingPlans, "c-pricing-plans")}>

      <div className="c-pricing-plans-header">
        <ToggleSwitch
          toggleSwitchStyle="duo"
          name="pricing-toggle"
          labelText="Monthly"
          checked={isAnnual}
          onChange={(e) => setIsAnnual((e.target as HTMLInputElement).checked)}
          labelCheckedText={
            <>
              <span>Annual</span>
              <span className="c-toggle-switch-label-badge">
                <em>Save</em>
                <span>20%</span>
              </span>
            </>
          }
        />
      </div>

      <div className="c-pricing-plans-grid">
        {adaptedPricings.map((plan, planIdx) => (
          <article key={planIdx} className={clsx("c-pricing-plans-card", plan.id)}>

            <div className="c-pricing-plans-card-header">
              <div className="c-pricing-plans-card-header-icon">
                <i>{plan.icon}</i>
                {plan.popular && (
                  <span>
                    <i><IcnBolt/></i>
                    <span>Popular!</span>
                  </span>
                )}
              </div>

              <div className="c-pricing-plans-card-header-text">
                <p className="h6">{plan.name}</p>
                <p>{plan.description}</p>
              </div>
            </div>

            <div className="c-pricing-plans-card-body">
              <p>
                <span className={clsx("h4", plan.id !== "pro" && "c-gradient-text")}>
                  {plan.price}
                </span>
                {plan.period && (
                  <sub className="h6">
                    /{plan.period}
                  </sub>
                )}
              </p>

              <ul>
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx}>
                    <i><IcnCircleCheck/></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="c-pricing-plans-card-footer">
              {plan.id === "enterprise" ? (
                <ButtonLink
                  href="/contact"
                  btnText={plan.btnText}
                  btnColor={plan.btnColor}
                />
              ) : (
                <Button
                  btnText={plan.btnText}
                  btnColor={plan.btnColor}
                  onClick={() => handleGetStarted(plan.userCount)}
                  disabled={isLoading}
                />
              )}
            </div>

          </article>
        ))}
      </div>

    </div>
  );
};