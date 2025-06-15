import styles from "@/styles/common/Section.module.scss";
import React, {ReactNode} from 'react';
import {clsx} from "clsx";
import {SectionTitleProps} from "@/types";
import {SectionTitle} from "@/components";

interface SectionProps extends SectionTitleProps{
  extraClassName?: string;
  addWrapper?: boolean;
  hideSectionTitle?: boolean;
  uncontainedChildren?: boolean;
  children?: ReactNode;
}

export const Section = (
  {
    extraClassName,
    addWrapper,
    hideSectionTitle,
    alignment,
    leadText,
    leadIcon,
    headingTag,
    headingClass,
    title,
    paragraph,
    uncontainedChildren,
    children,
  }:SectionProps) => {
  return (
    <section className={clsx(styles.cSection,"c-section", extraClassName)}>

      {addWrapper? (
        <div className="c-section-wrapper">

          <div className="c-container">

            {!hideSectionTitle && (
              <SectionTitle
                alignment={alignment}
                leadIcon={leadIcon}
                leadText={leadText}
                headingClass={headingClass}
                headingTag={headingTag}
                title={title}
                paragraph={paragraph}
              />
            )}

            {!uncontainedChildren &&(children)}

          </div>

          {uncontainedChildren &&(children)}

        </div>
      ):(
        <div className="c-container">

          <SectionTitle
            alignment={alignment}
            leadIcon={leadIcon}
            leadText={leadText}
            headingClass={headingClass}
            headingTag={headingTag}
            title={title}
            paragraph={paragraph}
          />

          {!uncontainedChildren &&(children)}

        </div>
      )}

      {uncontainedChildren &&(children)}
    </section>
  );
};