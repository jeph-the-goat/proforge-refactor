import styles from "@/styles/HomeSectionSecurity.module.scss";
import {IcnLock} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {HomeSecurity} from "@/utils";

import {Card, Section} from "@/components";

export const HomeSectionSecurity = () => {
  return (
    <Section
      extraClassName={clsx(styles.cHomeSectionSecurity, "c-home-section-security")}
      badgeIcon={<IcnLock/>}
      badgeText="Security"
      headingClass="h3"
      title="Your Data, Locked Tight"
      paragraph="Get the tools, documentation, and community support you need to master Web3 development."
    >

      <div className="c-home-section-security-grid">

        {HomeSecurity.map((security, securityIdx) => (
          <Card
            key={securityIdx}
            icon={security.icon}
            title={security.title}
            text={security.text}
          />
        ))}
      </div>

    </Section>
  );
};