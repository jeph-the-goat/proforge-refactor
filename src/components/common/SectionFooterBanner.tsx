import React from 'react';
import {clsx} from "clsx";
import {ButtonLink, SectionTitle} from "@/components";

export const SectionFooterBanner= () => {
  return (
    <section className={clsx("c-section-footer-banner")}>

      <div className="c-container">

        <div className="c-section-footer-banner-image">
          image here
        </div>

        <SectionTitle
          headingClass="h3"
          title="Let’s Build Something Amazing Today"
          paragraph="Join the Web3 revolution today with tools designed to make your life easier and your projects unstoppable."
        />

        <ButtonLink
          href="/"
          btnText="Get Started - For Free"
        />

      </div>

    </section>
  );
}
