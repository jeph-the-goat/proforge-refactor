import styles from "@/styles/common/SectionTitle.module.scss";
import {IcnStar} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {SectionTitleProps} from "@/types";

import {Badge} from "@/components";

export const SectionTitle = (
  {
    alignment,
    badgeBgColor,
    badgeText,
    badgeIcon,
    headingTag,
    headingClass,
    title,
    paragraph
  }:SectionTitleProps) => {
  return (
    <div
      className={clsx(styles.cSectionTitle, "c-section-title")}
      data-alignment={alignment}
    >

      {badgeText && (
        <Badge
          bgColor={badgeBgColor}
          icon={badgeIcon? badgeIcon : <IcnStar/>}
          text={badgeText}
        />
      )}

      {headingTag === "h1"?(
        <h1 className={clsx(headingClass? headingClass : "h2", "c-gradient-text")}>
          {title}
        </h1>
      ):(
        <h2 className={clsx(headingClass, "c-gradient-text")}>
          {title}
        </h2>
      )}

      {paragraph && (
        <div className="c-section-title-paragraph">
          {paragraph}
        </div>
      )}

    </div>
  );
};
