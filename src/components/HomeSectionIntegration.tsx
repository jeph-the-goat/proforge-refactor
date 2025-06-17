import {IcnPullRequest} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import {ButtonLink, Section, SectionTitle} from "src/components/common";

export const HomeSectionIntegration = () => {
  return (
    <Section
      extraClassName={clsx("c-home-section-integration")}
      uncontainedChildren
      hideSectionTitle
    >
      <div className="c-container">

        <div className="c-home-section-integration-image top">
          img here
        </div>

        <SectionTitle
          leadIcon={<IcnPullRequest/>}
          leadText="Integration"
          headingClass="h3"
          title="Seamlessly Connect to the Ecosystem"
          paragraph="We integrate effortlessly so you can focus on building, not troubleshooting."
        />

        <ButtonLink
          href="/integration"
          btnText="See All Integration"
        />

        <div className="c-home-section-integration-image bottom">
          img here
        </div>

      </div>

    </Section>
  );
};