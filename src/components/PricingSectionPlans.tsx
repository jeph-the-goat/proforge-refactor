import styles from "@/styles/PricingSectionPlans.module.scss";

import React from 'react';
import {clsx} from "clsx";

import {PricingPlans, Section} from "@/components";

export const PricingSectionPlans = () => {
  return (
    <Section
      extraClassName={clsx(styles.cPricingSectionPlans, "c-pricing-section-plans")}
      hideSectionTitle
    >
      <PricingPlans/>
    </Section>
  );
};
