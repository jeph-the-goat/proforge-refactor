import styles from "@/styles/HomeSectionIntegration.module.scss";
import {IcnPullRequest} from "@assets/icons";
import ImageTop from "@assets/images/home-integration-top-x1.webp";
import ImageBottom from "@assets/images/home-integration-bottom-x1.webp";

import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {ButtonLink, Section, SectionTitle} from "src/components/common";

export const HomeSectionIntegration = () => {
  return (
    <Section
      extraClassName={clsx(styles.cHomeSectionIntegration, "c-home-section-integration")}
      uncontainedChildren
      hideSectionTitle
    >
      <div className="c-container">

        <div className="c-home-section-integration-image top">
          <Image
            src={ImageTop}
            alt="Decorative top"
            width={480}
            height={183}
          />
        </div>

        <SectionTitle
          badgeIcon={<IcnPullRequest/>}
          badgeText="Integration"
          headingClass="h3"
          title="Seamlessly Connect to the Ecosystem"
          paragraph="We integrate effortlessly so you can focus on building, not troubleshooting."
        />

        <ButtonLink
          href="/integration"
          btnText="See All Integration"
        />

        <div className="c-home-section-integration-image bottom">
          <Image
            src={ImageBottom}
            alt="Decorative bottom"
            width={480}
            height={183}
          />
        </div>

      </div>

    </Section>
  );
};