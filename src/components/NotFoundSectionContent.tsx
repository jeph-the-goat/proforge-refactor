"use client";

import React, {ReactNode} from 'react';
import {clsx} from "clsx";

interface NotFoundSectionContentProps {
  children: ReactNode;
}

export const NotFoundSectionContent = ({children}:NotFoundSectionContentProps) => {

  return (
    <section className={clsx("c-error-section-content")}>

      <div className="c-error-section-content-header">
        404 here
      </div>

      <div className="c-error-section-content-text">
        <h1 className="c-gradient-text">
          Page Not found
        </h1>

        <p>
          It seems the page you're looking for doesn't exist. Let's get you back on track.
        </p>

        <div className="c-button-container">
          {children}
        </div>

      </div>

    </section>
  );
};