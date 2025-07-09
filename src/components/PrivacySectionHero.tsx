import styles from "@/styles/LegalSectionHero.module.scss";

import React from 'react';
import {clsx} from "clsx";

import {SectionHero, SectionTitle} from "@/components";

export const PrivacySectionHero = () => {
  return (
    <SectionHero extraClassName={clsx(styles.cLegalSectionHero, "c-legal-section-hero", "privacy")}>

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Privacy Policy"
          paragraph={
            <>
              <p>Effective Date: January 16, 2025</p>
              <p>{'Nexora Company ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'}</p>
            </>
          }
        />

      </div>

    </SectionHero>
  );
}; 