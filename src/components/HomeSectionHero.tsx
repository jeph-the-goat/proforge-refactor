import styles from "@/styles/HomeSectionHero.module.scss";
import HomeHeroImage from "@assets/images/home-hero-image-x2.webp";

import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {DummyUserList} from "@/utils";

import {ButtonLink, EventBar, SectionHero, SectionTitle} from "src/components";

export const HomeSectionHero = () => {
  return (
    <SectionHero extraClassName={clsx(styles.cHomeSectionHero, "c-home-section-hero")}>

      <div className='c-section-hero-grid-text'>

        <EventBar
          text="Level Up Your ERP Game"
          linkUrl="/"
          linkText="Join Free Webinar"
          users={DummyUserList}
        />

        <SectionTitle
          headingTag="h1"
          title="Streamline Your Construction Business"
          paragraph="The only ERP built for AIA billing and Union compliance. From job costing to certified payroll, manage everything in one powerful platform.."
        />

        <div className="c-button-container">

          <ButtonLink
            href='#'
            btnText='Get Started'
          />

          <ButtonLink
            href='#'
            btnColor='dark'
            btnText='Learn More'
          />

        </div>

      </div>

      <div className="c-section-hero-grid-image">

        <Image
          src={HomeHeroImage}
          alt="Streamline Your Construction Business"
          width={1160}
          height={500}
        />

      </div>

    </SectionHero>
  );
};
