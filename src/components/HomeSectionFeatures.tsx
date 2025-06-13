import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/ui/SectionTitle";

export const HomeSectionFeatures = () => {
  return (
    <section className={clsx("c-home-section-features")}>

      <div className="div c-container">

        <SectionTitle
          leadText="Features"
          headingClass="h3"
          title="Tools That Feel Like Superpowers"
          paragraph="The only platform you’ll ever need for seamless Web3 development."
        />

        <div className="c-home-section-features-grid">


        </div>

      </div>

    </section>
  );
};