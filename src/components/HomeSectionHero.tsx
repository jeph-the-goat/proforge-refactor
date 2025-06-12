import styles from "@/styles/HomeSectionHero.module.scss";
import HeroImage from "@assets/images/home-hero-image.svg";
import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {ButtonLink} from "@/components/ui";

export const HomeSectionHero = () => {
  return (
    <section className={clsx(styles.cHomeSectionHero, "c-home-section-hero")}>

      <div className="c-container">

        <div className="c-home-section-hero-grid">

          <div className='c-home-section-hero-grid-text'>

            <h1 className="h2 c-gradient-text">
              Revolutionize Web3 Development
            </h1>

            <p>
              From multi-chain access to AI-driven smart contracts, our platform simplifies Web3 development.
            </p>

            <div className="c-button-container">

              <ButtonLink
                href='/'
                btnText='Get Started'
              />

              <ButtonLink
                href='/'
                btnColor='white'
                btnText='Learn More'
              />

            </div>

          </div>

          <div className="c-home-section-hero-grid-image">

            <Image
              src="/images/home-hero-image.svg"
              alt="Revolutionize Web3 Development"
              width={465}
              height={417}
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default HomeSectionHero;