import styles from "@/styles/PrivacyPolicySectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {DummyUserList} from "@/utils";
import {ButtonLink, EventBar} from "@/components/ui";
import {SectionTitle} from "@/components/ui/SectionTitle";

export const PrivacyPolicySectionHero = () => {
  return (
    <section className={clsx(styles.cPrivacyPolicySectionHero, "c-privacy-policy-section-hero")}>

      <div className="c-container">

        <div className="c-privacy-policy-section-hero-grid">

          <div className='c-privacy-policy-section-hero-grid-text'>

            <EventBar
              text="Level Up Your Web3 Game"
              linkUrl="/"
              linkText="Join Free Webinar"
              users={DummyUserList}
            />

            <SectionTitle
              headingTag="h1"
              title="Revolutionize Web3 Development"
              paragraph="From multi-chain access to AI-driven smart contracts, our platform simplifies Web3 development."
            />

            <div className="c-button-container">

              <ButtonLink
                href='/'
                btnText='Get Started'
              />

              <ButtonLink
                href='/'
                btnColor='dark'
                btnText='Learn More'
              />

            </div>

          </div>

          <div className="c-privacy-policy-section-hero-grid-image">

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