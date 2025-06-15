import {IcnDollarSign} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import {PricingPlans, Section} from "@/components/common";

export const HomeSectionPricing = () => {
  return (
    <Section
      extraClassName={clsx("c-home-section-pricing")}
      addWrapper
      leadIcon={<IcnDollarSign/>}
      leadText="Pricing"
      headingClass="h3"
      title="Fair Pricing for Every Stage"
      paragraph="Affordable plans for developers, startups, and enterprises. Choose the plan that grows with you."
    >

      <PricingPlans/>

    </Section>
  );
};