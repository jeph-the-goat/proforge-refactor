import styles from "@/styles/HomeSectionBlog.module.scss";
import {IcnAward} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {BlogPosts} from "@/utils";

import {ButtonLink, Section, BlogCard} from "@/components";

export const HomeSectionBlog = () => {
  const latestPosts = BlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <Section
      extraClassName={clsx(styles.cHomeSectionBlog, "c-home-section-blog")}
      badgeIcon={<IcnAward/>}
      badgeText="Blog"
      headingClass="h3"
      title="Learn, Share, and Stay Ahead"
      paragraph="Get the tools, documentation, and community support you need to master Web3 development."
    >

      <div className="c-home-section-blog-content">

        <div className="c-home-section-blog-grid">

          {latestPosts.map((post, postIdx) => (
            <BlogCard
              key={post.id}
              isFeatured={postIdx === 0}
              data={post}
              imageWidth={postIdx === 0? 366 : 200}
              imageHeight={postIdx === 0? 222 : 150}
            />
          ))}

        </div>

        <ButtonLink
          href="/blog"
          btnText="See More"
          btnColor="dark"
        />

      </div>

    </Section>
  );
};