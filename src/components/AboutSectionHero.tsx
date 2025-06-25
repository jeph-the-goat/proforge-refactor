import styles from "@/styles/AboutSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {SectionHero, SectionTitle} from "@/components";

export const AboutSectionHero = () => {
  return (
    <SectionHero
      extraClassName={clsx(styles.cAboutSectionHero, "c-about-section-hero")}
      hasColumns
    >
      <div className='c-section-hero-grid-text'>

        <SectionTitle
          alignment="left"
          headingTag="h1"
          title="Building the Foundation of Web3, Together"
          paragraph="We’re on a mission to make decentralized development faster, easier, and more accessible for everyone."
        />

      </div>

      <div className="c-section-hero-grid-image">

        <Image
          src="/images/about-hero-image-x2.webp"
          alt="Revolutionize Web3 Development"
          width={465}
          height={620}
        />

      </div>

    </SectionHero>
  );
};
