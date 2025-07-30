import styles from "@/styles/common/Section.module.scss";

import React, { ReactNode } from 'react';
import { SectionTitleProps } from "@/types";

import { SectionTitle } from "@/components";
import {cn} from "@lib/utils";

interface SectionProps extends SectionTitleProps {
  extraClassName?: string;
  addWrapper?: boolean;
  hideSectionTitle?: boolean;
  uncontainedChildren?: boolean;
  children?: ReactNode;
}

export const Section = ({
  extraClassName,
  addWrapper,
  hideSectionTitle,
  alignment,
  badgeText,
  badgeIcon,
  headingTag,
  headingClass,
  title,
  paragraph,
  uncontainedChildren,
  children,
}: SectionProps) => {
  const sectionTitle = !hideSectionTitle && (
    <SectionTitle
      alignment={alignment}
      badgeBgColor={addWrapper? "var(--neutral-800)": undefined}
      badgeIcon={badgeIcon}
      badgeText={badgeText}
      headingClass={headingClass}
      headingTag={headingTag}
      title={title}
      paragraph={paragraph}
    />
  );

  const containedContent = (
    <div className="c-container">
      {sectionTitle}
      {!uncontainedChildren && children}
    </div>
  );

  const renderContent = () => {
    if (addWrapper) {
      return (
        <div className="c-section-wrapper">
          {containedContent}
          {uncontainedChildren && children}
        </div>
      );
    }

    if (uncontainedChildren && hideSectionTitle) {
      return children;
    }

    return (
      <>
        {containedContent}
        {uncontainedChildren && children}
      </>
    );
  };

  return (
    <section className={cn(styles.cSection, "c-section", extraClassName)}>
      {renderContent()}
    </section>
  );
};