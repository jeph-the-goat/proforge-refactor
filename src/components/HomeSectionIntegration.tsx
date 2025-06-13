import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/ui/SectionTitle";
import {ButtonLink} from "@/components/ui";

export const HomeSectionIntegration = () => {
  return (
    <section className={clsx("c-home-section-integration")}>

      <div className="c-container">

        <div className="c-home-section-integration-image top">
          img here
        </div>


        <SectionTitle
          leadText="Integration"
          headingClass="h3"
          title="Seamlessly Connect to the Ecosystem"
          paragraph="We integrate effortlessly so you can focus on building, not troubleshooting."
        />

        <ButtonLink
          href="/"
          btnText="See All Integration"
        />

        <div className="c-home-section-integration-image bottom">
          img here
        </div>

      </div>

    </section>
  );
};