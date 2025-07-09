import styles from "@/styles/common/SectionFooterBanner.module.scss";
import React from 'react';
import {clsx} from "clsx";
import {ButtonLink, SectionTitle} from "@/components";
import Image from "next/image";

export const SectionFooterBanner= () => {
  return (
    <section className={clsx(styles.cSectionFooterBanner,"c-section-footer-banner")}>

      <div className="c-container">

        <div className="c-section-footer-banner-image">
          <Image
            src="/images/home-footer-banner-img-x2.webp"
            alt="Let’s Build Something Amazing Today"
            width={816}
            height={121}
          />
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
