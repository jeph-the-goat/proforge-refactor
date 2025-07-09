import styles from "@/styles/common/SectionHero.module.scss";
import React, {ReactNode} from 'react';
import {clsx} from "clsx";

interface SectionHeroProps {
  extraClassName: string;
  hasColumns?: boolean;
  children: ReactNode;
}

export const SectionHero = (
  {
    extraClassName,
    hasColumns,
    children,
  }:SectionHeroProps) => {
  return (
    <section
      className={clsx(styles.cSectionHero, "c-section-hero", extraClassName)}
      data-columns={hasColumns}
    >
      <div className="c-container">

        <div className="c-section-hero-grid">
          {children}
        </div>

      </div>

    </section>
  );
};
