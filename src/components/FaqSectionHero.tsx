import styles from "@/styles/FaqSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionTitle} from "src/components/common";

export const FaqSectionHero = () => {
  return (
    <section className={clsx(styles.cFaqSectionHero, "c-faq-section-hero")}>

      <div className="c-container">

        <div className="c-faq-section-hero-grid">

          <div className='c-faq-section-hero-grid-text'>

            <SectionTitle
              headingTag="h1"
              title="Frequently Asked Questions"
              paragraph="Got questions? We’ve got answers. Here’s everything you need to know about our platform."
            />

          </div>

        </div>

      </div>

    </section>
  );
}; 