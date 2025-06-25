import styles from "@/styles/LegalSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionHero, SectionTitle} from "src/components/common";

export const TermsSectionHero = () => {
  return (
    <SectionHero extraClassName={clsx(styles.cLegalSectionHero, "c-legal-section-hero", "terms")}>

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Terms and Conditions"
          paragraph={
            <>
              <p>Effective Date: January 16, 2025</p>
              <p>{'These Terms and Conditions ("Terms") govern your use of our website, platform, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please discontinue your use of our Services.'}</p>
            </>
          }
        />
      </div>

    </SectionHero>
  );
}; 