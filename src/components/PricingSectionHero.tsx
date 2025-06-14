import React from 'react';

import {SectionHero, SectionTitle} from "src/components/common";

export const PricingSectionHero = () => {
  return (
    <SectionHero extraClassName="c-pricing-section-hero">

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Flexible Plans for Every Team"
          paragraph="Flexible and transparent pricing designed to scale with your needs, from startup to enterprise."
        />

      </div>

    </SectionHero>
  );
}; 