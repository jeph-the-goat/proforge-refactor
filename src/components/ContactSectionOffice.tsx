import styles from "@/styles/ContactSectionOffice.module.scss";
import {IcnBuilding} from "@assets/icons";

import React from 'react';
import clsx from "clsx";

import {ButtonLink, Card, Section} from "@/components/common";
import {ContactBusinessInfo} from "@/utils";
import Image from "next/image";

export const ContactSectionOffice = () => {
  return (
    <Section
      extraClassName={clsx(styles.cContactSectionOffice, "c-contact-section-office")}
      badgeText="Our Office"
      badgeIcon={<IcnBuilding/>}
      headingClass="h3"
      title="Drop by and Say Hello!"
      paragraph="Whether you want to discuss partnerships, learn more about our platform, or just say hi, you’re always welcome at our office."
    >

      <div className="c-contact-section-office-grid">
        {ContactBusinessInfo.map((info, infoIdx) => (
          <Card
            key={infoIdx}
            icon={info.icon}
            title={info.title}
            text={info.text}
          />
        ))}
      </div>

       <div className="c-contact-section-office-image">
          <Image
            src="/images/contact-office-image-x1.webp"
            alt="Get direction"
            width={1160}
            height={300}
          />
       </div>

        <ButtonLink href="/" btnText="Get Direction"/>

    </Section>
  );
};
