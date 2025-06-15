import styles from "@/styles/ContactSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {ButtonLink, SectionTitle} from "src/components/common";
import {ContactForm} from "@/components/forms";
import {ContactInfo} from "@/utils";

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
                {ContactInfo.map((info, infoIdx) => (
                  <li key={infoIdx}>
                    <i>{info.icon}</i>

                    <div>
                      <span>{info.title}</span>
                      <span>{info.text}</span>
                      <ButtonLink
                        href={`mailto:${info.url}`}
                        isExternal
                        btnText={info.url}
                        btnVariant="link"
                      />
                    </div>
                  </li>
                ))}
              </ul>

            </div>

          </div>

          <div className="c-contact-section-hero-grid-form">
            <ContactForm/>
          </div>

        </div>

      </div>

    </section>
  );
}; 