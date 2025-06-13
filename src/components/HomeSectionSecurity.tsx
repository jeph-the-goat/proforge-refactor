import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/common";

export const HomeSectionSecurity = () => {
  return (
    <section className={clsx("c-home-section-security")}>

      <div className="c-container">

        <SectionTitle
          leadText="Security"
          headingClass="h3"
          title="Your Data, Locked Tight"
          paragraph="Get the tools, documentation, and community support you need to master Web3 development."
        />

        <div className="c-home-section-security-grid">


        </div>

      </div>

    </section>
  );
};