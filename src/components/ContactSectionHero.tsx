import styles from "@/styles/ContactSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionHero, SectionTitle, ContactForm, ContactSectionHeroList} from "src/components";

export const ContactSectionHero = () => {
  return (
    <SectionHero
      extraClassName={clsx(styles.cContactSectionHero, "c-contact-section-hero")}
      hasColumns
    >

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          alignment="left"
          headingTag="h1"
          title="We’re Here to Help"
          paragraph="Have a question, need support, or want to partner with us? We’d love to hear from you."
        />

        <ContactSectionHeroList extraClassName="c-desktop"/>

      </div>

      <div className="c-section-hero-grid-form">
        <ContactForm/>
      </div>

      <ContactSectionHeroList extraClassName="c-mobile"/>

    </SectionHero>
  );
}; 