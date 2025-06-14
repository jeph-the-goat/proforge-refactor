import styles from "@/styles/AboutSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {SectionTitle} from "src/components/common";

export const AboutSectionHero = () => {
  return (
    <section className={clsx(styles.cAboutSectionHero, "c-about-section-hero")}>

      <div className="c-container">

        <div className="c-about-section-hero-grid">

          <div className='c-about-section-hero-grid-text'>

            <SectionTitle
              alignment="left"
              headingTag="h1"
              title="Building the Foundation of Web3, Together"
              paragraph="We’re on a mission to make decentralized development faster, easier, and more accessible for everyone."
            />
            
          </div>

          <div className="c-about-section-hero-grid-image">

            <Image
              src="/images/home-hero-img-x1.webp"
              alt="Revolutionize Web3 Development"
              width={1160}
              height={500}
            />

          </div>

        </div>

      </div>

    </section>
  );
};
