import styles from "@/styles/SectionTitle.module.scss";
import {IcnStar} from "@assets/icons";

import React, {ReactNode} from 'react';
import {clsx} from "clsx";

interface SectionTitleProps {
  alignment?: "left";
  leadText?: string;
  leadIcon?: ReactNode;
  headingTag?: "h1"
  headingClass?: string;
  title: string;
  paragraph?: string;
}

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
