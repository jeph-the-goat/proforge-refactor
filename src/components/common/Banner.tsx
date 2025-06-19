import styles from "@/styles/common/Banner.module.scss";
import React, {ReactNode} from 'react';
import {clsx} from "clsx";

interface BannerProps {
  extraClassName?: string;
  isSection?: boolean;
  bgColor?: string;
  icon?: ReactNode;
  headingClass?: string;
  title: string;
  paragraph?: string;
  children?: ReactNode;
}

export const Banner = (
  {
    extraClassName,
    isSection,
    bgColor,
    icon,
    title,
    headingClass,
    paragraph,
    children
  }:BannerProps) => {
  return (
    <aside
      className={clsx(styles.cBanner, "c-banner",isSection && "is-section", extraClassName)}
    >
      <div
        className={clsx("c-banner-wrapper", isSection && "c-container")}
        style={{
          backgroundColor: bgColor? `${bgColor}` : "var(--neutral-900)"
        }}
      >

        <div className="c-banner-header">
          {icon && (
            <i>{icon}</i>
          )}

          <div className="c-banner-header-text">

            <h2 className={headingClass? headingClass : "h6"}>
              {title}
            </h2>

            <p>
              {paragraph}
            </p>

          </div>

        </div>

        {children}

      </div>

    </aside>
  );
};
