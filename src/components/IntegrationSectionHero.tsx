import styles from "@/styles/IntegrationSectionHero.module.scss";

import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {SectionHero, SectionTitle} from "@/components";

export const IntegrationSectionHero = () => {
  return (
    <SectionHero extraClassName={clsx(styles.cIntegrationSectionHero, "c-integration-section-hero")}>

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Supercharge Your Workflow with Seamless Integrations"
          paragraph="Seamlessly integrate with leading blockchains and your favorite tools to supercharge your Web3 development."
        />

      </div>


      <div className="c-section-hero-grid-image">
        <Image
          src="/images/integration-hero-image-x2.webp"
          alt="hello"
          width={1160}
          height={409}
        />
      </div>

    </SectionHero>
  );
}; 