"use client";
import styles from "@/styles/NotFoundSectionContent.module.scss";
import React, {ReactNode} from 'react';
import {clsx} from "clsx";
import Image from "next/image";

interface NotFoundSectionContentProps {
  extraClassName?: string;
  children: ReactNode;
}

export const NotFoundSectionContent = (
  {
    extraClassName,
    children
  }:NotFoundSectionContentProps) => {

  return (
    <section className={clsx(styles.cErrorSectionContent, "c-error-section-content", extraClassName)}>

      <div className="c-container">

        <div className="c-error-section-content-header">
          <div className="c-error-section-content-header-bg"/>

          <Image
            src="/images/error-404-image.svg"
            alt="Page not found"
            width={334}
            height={138}
          />
        </div>

        <div className="c-error-section-content-body">

          <div className="c-error-section-content-body-text">

            <h1 className="h2 c-gradient-text">
              Page Not found
            </h1>

            <p>
              It seems the page you're looking for doesn't exist. Let's get you back on track.
            </p>

          </div>

          <div className="c-button-container">
            {children}
          </div>

        </div>

      </div>

    </section>
  );
};