import React from 'react';
import {clsx} from "clsx";

import {PricingPlans, Section} from "@/components/common";

export const PricingSectionPlans = () => {
  return (
    <Section
      extraClassName={clsx("c-pricing-section-plans")}
      hideSectionTitle
    >
      <PricingPlans/>
    </Section>
  );
};
