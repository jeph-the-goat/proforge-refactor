import styles from "@/styles/HomeSectionFeatures.module.scss";
import {IcnBolt} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {SectionTitle} from "@/components/common";

import {HomeFeatureCardList} from "@/utils";

export const HomeSectionFeatures = () => {
  return (
    <section className={clsx(styles.cHomeSectionFeatures, "c-home-section-features")}>

      <div className="c-home-section-features-wrapper">

        <div className="c-container">

          <SectionTitle
            leadIcon={<IcnBolt/>}
            leadText="Features"
            headingClass="h3"
            title="Tools That Feel Like Superpowers"
            paragraph="The only platform you’ll ever need for seamless Web3 development."
          />

          <div className="c-home-section-features-grid">

            {HomeFeatureCardList.map((feature, featureIdx) => (
              <article
                key={featureIdx}
                className="c-home-section-features-grid-card"
              >
               <div className="c-home-section-features-grid-card-image">
                <img src={feature.image} alt={feature.title}/>
               </div>

                <div className="c-home-section-features-grid-card-body">
                  <p className="h6">
                    {feature.title}
                  </p>

                  <p className="c-home-section-features-grid-card-paragraph">
                    {feature.paragraph}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};