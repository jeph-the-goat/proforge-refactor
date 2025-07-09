import styles from "@/styles/HomeSectionBenefits.module.scss";

import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";

import {HomeBenefits} from "@/utils";

import {Card, Section} from "@/components";

export const HomeSectionBenefits = () => {
  return (
    <Section
      extraClassName={clsx(styles.cHomeSectionBenefits, "c-home-section-benefits")}
      badgeText="Benefits"
      headingClass="h3"
      title="Why Developers and Teams Love Us"
      paragraph="We take the headaches out of building Web3 projects, so you can focus on creating."
    >

      <div className="c-home-section-benefits-body">

        <div className="c-home-section-benefits-image">
          <Image
            src="/images/home-benefits-image-x1.webp"
            alt="Why Developers and Teams Love Us"
            width={1160}
            height={500}
            />

        </div>

        <div className="c-home-section-benefits-grid">

          {HomeBenefits.map((benefit, benefitIdx) => (
            <Card
              key={benefitIdx}
              icon={benefit.icon}
              title={benefit.title}
              text={benefit.text}
            />
          ))}

        </div>

      </div>

    </Section>
  );
};