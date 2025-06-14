import styles from "@/styles/IntegrationSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionTitle} from "src/components/common";

export const IntegrationSectionHero = () => {
  return (
    <section className={clsx(styles.cIntegrationSectionHero, "c-integration-section-hero")}>

      <div className="c-container">

        <div className="c-integration-section-hero-grid">

          <div className='c-integration-section-hero-grid-text'>

            <SectionTitle
              headingTag="h1"
              title="Supercharge Your Workflow with Seamless Integrations"
              paragraph="Seamlessly integrate with leading blockchains and your favorite tools to supercharge your Web3 development."
            />

          </div>

        </div>

      </div>

    </section>
  );
}; 