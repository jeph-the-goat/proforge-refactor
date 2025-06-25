import {IcnDollarSign} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {PricingPlans, Section} from "@/components";

export const HomeSectionPricing = () => {
  return (
    <Section
      extraClassName={clsx("c-home-section-pricing")}
      addWrapper
      badgeIcon={<IcnDollarSign/>}
      badgeText="Pricing"
      headingClass="h3"
      title="Fair Pricing for Every Stage"
      paragraph="Affordable plans for developers, startups, and enterprises. Choose the plan that grows with you."
    >

      <PricingPlans/>

    </Section>
  );
};
