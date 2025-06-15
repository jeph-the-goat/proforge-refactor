import {IcnLock} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import {HomeSecurityFeatures} from "@/utils";
import {SectionTitle} from "@/components/common";

export const HomeSectionSecurity = () => {
  return (
    <section className={clsx("c-home-section-security")}>

      <div className="c-container">

        <SectionTitle
          leadIcon={<IcnLock/>}
          leadText="Security"
          headingClass="h3"
          title="Your Data, Locked Tight"
          paragraph="Get the tools, documentation, and community support you need to master Web3 development."
        />

        <div className="c-home-section-security-grid">

          {HomeSecurityFeatures.map((security, securityIdx) => (
            <article
              key={securityIdx}
            >
              <i>{security.icon}</i>

              <p>
                {security.title}
              </p>

              <p>
                {security.text}
              </p>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
};