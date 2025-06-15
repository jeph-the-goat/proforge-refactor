import {IcnDollarSign} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/common";

export const HomeSectionPricing = () => {
  return (
    <section className={clsx("c-home-section-pricing")}>

      <div className="div c-container">

        <SectionTitle
          leadIcon={<IcnDollarSign/>}
          leadText="Pricing"
          headingClass="h3"
          title="Fair Pricing for Every Stage"
          paragraph="Affordable plans for developers, startups, and enterprises. Choose the plan that grows with you."
        />

        <div className="c-home-section-pricing-grid">


        </div>

      </div>

    </section>
  );
};