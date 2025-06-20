import {IcnArrowUpRight} from "@assets/icons";

import React from 'react';
import {ButtonLink} from "@/components/common";

import {ContactInfo} from "@/utils";
import clsx from "clsx";

interface ContactSectionHeroListProps {
  extraClassName?: string;
}

export const ContactSectionHeroList = ({extraClassName}:ContactSectionHeroListProps) => {
  return (
    <div className={clsx("c-section-hero-grid-list", extraClassName)}>

      <p>
        Prefer to send us a message directly?
      </p>

      <ul>
        {ContactInfo.map((info, infoIdx) => (
          <li key={infoIdx}>
            <i>{info.icon}</i>

            <div>
              <p>
                <span className="title">{info.title}</span>
                <span className="text">{info.text}</span>
              </p>

              <ButtonLink
                href={`mailto:${info.url}`}
                isExternal
                btnText={info.url}
                btnVariant="link"
                icon={<IcnArrowUpRight/>}
              />
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};
