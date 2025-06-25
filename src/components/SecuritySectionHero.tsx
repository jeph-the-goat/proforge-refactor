import styles from "@/styles/LegalSectionHero.module.scss";

import React from 'react';
import {clsx} from "clsx";

import {SectionHero, SectionTitle} from "@/components/common";

export const SecuritySectionHero = () => {
  return (
    <SectionHero extraClassName={clsx(styles.cLegalSectionHero, "c-legal-section-hero", "security")}>

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Cookie Policy"
          paragraph={
            <>
              <p>Effective Date: January 16, 2025</p>
              <p>At Nexora, we use cookies and similar technologies to enhance your experience, analyze site performance, and improve our services. This Cookie Policy explains what cookies are, how we use them, and your options for managing cookie preferences.</p>
            </>
          }
        />

      </div>

    </SectionHero>
  );
};
