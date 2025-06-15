import styles from "@/styles/common/SectionTitle.module.scss";
import {IcnStar} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import {SectionTitleProps} from "@/types";

export const SectionTitle = (
  {
    alignment,
    leadText,
    leadIcon,
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

      {leadText && (
        <div className="c-section-title-lead">
          <i>{leadIcon? leadIcon : (<IcnStar/>)}</i>
          <span>{leadText}</span>
        </div>
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
        <p>
          {paragraph}
        </p>
      )}

    </div>
  );
};
