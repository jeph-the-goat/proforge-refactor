import React from 'react';

import {SectionHero, SectionTitle} from "src/components/common";

export const BlogSectionHero = () => {
  return (
    <SectionHero extraClassName="c-blog-section-hero">

      <div className='c-section-hero-grid-text'>

        <SectionTitle
          headingTag="h1"
          title="Stay Ahead in Web3"
          paragraph="Explore expert insights, industry trends, and best practices for building in the decentralized future."
        />

      </div>

    </SectionHero>
  );
}; 