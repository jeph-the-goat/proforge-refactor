import styles from "@/styles/AboutSectionMission.module.scss";
import {IcnTriangle} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {AboutStats} from "@/utils";

import {IconBox, Section} from "@/components/common";

export const AboutSectionMission = () => {
  return (
    <Section
      extraClassName={clsx(styles.cAboutSectionMission, "c-about-section-mission")}
      addWrapper
      leadIcon={<IcnTriangle/>}
      leadText="Our Mission"
      headingClass="h4"
      title="We believe the future of the internet is decentralized. Our mission is to create powerful tools and infrastructure that help developers and teams unlock the full potential of Web3 technology."
    >

      <div className="c-about-section-mission-grid">
        {AboutStats.map((stat, statIdx) => (
          <article key={statIdx} className="c-about-section-mission-grid-card">

            <IconBox
              icon={stat.icon}
            />

            <div className="c-about-section-mission-grid-card-body">
              <p className="h5">
                {stat.value}
              </p>

              <p>
                {stat.label}
              </p>
            </div>

          </article>

        ))}

      </div>

    </Section>
  );
};
