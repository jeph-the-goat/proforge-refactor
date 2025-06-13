import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/ui/SectionTitle";

export const HomeSectionBlog = () => {
  return (
    <section className={clsx("c-home-section-blog")}>

      <div className="c-container">

        <SectionTitle
          leadText="Blog"
          headingClass="h3"
          title="Learn, Share, and Stay Ahead"
          paragraph="Get the tools, documentation, and community support you need to master Web3 development."
        />

        <div className="c-home-section-blog-grid">


        </div>

      </div>

    </section>
  );
};