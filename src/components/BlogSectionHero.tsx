import styles from "@/styles/BlogSectionHero.module.scss";
import React from 'react';
import {clsx} from "clsx";

import {SectionTitle} from "src/components/common";

export const BlogSectionHero = () => {
  return (
    <section className={clsx(styles.cBlogSectionHero, "c-blog-section-hero")}>

      <div className="c-container">

        <div className="c-blog-section-hero-grid">

          <div className='c-blog-section-hero-grid-text'>

            <SectionTitle
              headingTag="h1"
              title="Stay Ahead in Web3"
              paragraph="Explore expert insights, industry trends, and best practices for building in the decentralized future."
            />

          </div>

        </div>

      </div>

    </section>
  );
}; 