import {IcnLock} from "@assets/icons";
import React from 'react';
import {clsx} from "clsx";
import {Section} from "@/components/common";

export const AboutSectionMission = () => {
  return (
    <Section
      extraClassName={clsx( "c-about-section-mission")}
      leadIcon={<IcnLock/>}
      leadText="Our Mission"
      headingClass="h4"
      title="We believe the future of the internet is decentralized. Our mission is to create powerful tools and infrastructure that help developers and teams unlock the full potential of Web3 technology."
    >

      <div className="c-about-section-mission-stats">

        <article>
          <i></i>

          <p></p>

          <small></small>

        </article>

      </div>

    </Section>
  );
};
