import styles from "@/styles/HomeSectionFeatures.module.scss";
import {IcnBolt} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {HomeFeatures} from "@/utils";

import {Section} from "@/components/common";

export const HomeSectionFeatures = () => {
  return (
    <Section
      extraClassName={clsx(styles.cHomeSectionFeatures, "c-home-section-features")}
      addWrapper
      badgeIcon={<IcnBolt/>}
      badgeText="Features"
      headingClass="h3"
      title="Tools That Feel Like Superpowers"
      paragraph="The only platform you’ll ever need for seamless Web3 development."
    >
      <div className="c-home-section-features-grid">

        {HomeFeatures.map((feature, featureIdx) => (
          <article
            key={featureIdx}
            className="c-home-section-features-grid-card"
          >
            <div className="c-home-section-features-grid-card-image">
              <Image
                src={feature.image}
                alt={feature.title}
                width={200}
                height={200}
              />
            </div>

            <div className="c-home-section-features-grid-card-body">

              <p className="h6">
                {feature.title}
              </p>

              <p className="c-home-section-features-grid-card-paragraph">
                {feature.text}
              </p>

            </div>

          </article>
        ))}

      </div>

    </Section>
  );
};