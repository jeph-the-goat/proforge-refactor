import React from 'react';

import {SectionHero, SectionTitle} from "src/components/common";

export const FaqSectionHero = () => {
  return (
    <SectionHero extraClassName="c-faq-section-hero">

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Frequently Asked Questions"
          paragraph="Got questions? We’ve got answers. Here’s everything you need to know about our platform."
        />

      </div>

    </SectionHero>
  );
};
