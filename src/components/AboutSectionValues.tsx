import styles from "@/styles/AboutSectionValues.module.scss";
import {IcnThumb} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {AboutValues} from "@/utils/aboutData";

import {Card, Section} from "@/components/common";

export const AboutSectionValues = () => {
  return (
    <Section
      extraClassName={clsx(styles.cAboutSectionValues, "c-about-section-values")}
      leadIcon={<IcnThumb/>}
      leadText="Our Values"
      headingClass="h3"
      title="Guided by Innovation, Collaboration, and Trust"
      paragraph="These core values define who we are and how we work."
    >

      <div className="c-about-section-values-grid">

        {AboutValues.map((value, valueIdx) => (
          <Card
            key={valueIdx}
            icon={value.icon}
            title={value.title}
            text={value.text}
          />

        ))}

      </div>

    </Section>
  );
};
