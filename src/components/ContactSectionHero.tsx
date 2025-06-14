import styles from "@/styles/ContactSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionTitle} from "src/components/common";

export const ContactSectionHero = () => {
  return (
    <section className={clsx(styles.cContactSectionHero, "c-contact-section-hero")}>

      <div className="c-container">

        <div className="c-contact-section-hero-grid">

          <div className='c-contact-section-hero-grid-text'>

            <SectionTitle
              alignment="left"
              headingTag="h1"
              title="We’re Here to Help"
              paragraph="Have a question, need support, or want to partner with us? We’d love to hear from you."
            />

            <div className="c-contact-section-hero-list">

              <p>
                Prefer to send us a message directly?
              </p>

              <ul>
                <li>list here</li>
              </ul>

            </div>

          </div>

          <div className="c-contact-section-hero-grid-form">

            form here

          </div>

        </div>

      </div>

    </section>
  );
}; 