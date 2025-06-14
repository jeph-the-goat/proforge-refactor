import styles from "@/styles/PricingSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionTitle} from "src/components/common";

export const PricingSectionHero = () => {
  return (
    <section className={clsx(styles.cPricingSectionHero, "c-pricing-section-hero")}>

      <div className="c-container">

        <div className="c-pricing-section-hero-grid">

          <div className='c-pricing-section-hero-grid-text'>

            <SectionTitle
              headingTag="h1"
              title="Flexible Plans for Every Team"
              paragraph="Flexible and transparent pricing designed to scale with your needs, from startup to enterprise."
            />

          </div>

        </div>

      </div>

    </section>
  );
}; 