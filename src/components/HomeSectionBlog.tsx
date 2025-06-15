import styles from "@/styles/HomeSectionBlog.module.scss";
import {IcnAward} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {BlogPosts} from "@/utils";

import {ButtonLink, SectionTitle} from "@/components/common";
import Image from "next/image";

export const HomeSectionBlog = () => {
  const latestPosts = BlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className={clsx(styles.cHomeSectionBlog, "c-home-section-blog")}>

      <div className="c-container">

        <SectionTitle
          leadIcon={<IcnAward/>}
          leadText="Blog"
          headingClass="h3"
          title="Learn, Share, and Stay Ahead"
          paragraph="Get the tools, documentation, and community support you need to master Web3 development."
        />

        <div className="c-home-section-blog-grid">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="c-home-section-blog-grid-card"
            >
              <div className="c-home-section-blog-grid-card-image">
                <Image
                  src="/images/blog-placeholder-image-x1.webp"
                  alt={post.title}
                  width={366}
                  height={222}
                />
              </div>

              <div className="c-home-section-blog-grid-card-body">
                <small>{post.date}</small>

                <p className="h6">{post.title}</p>

                <ButtonLink
                  href={`/blog/${post.id}`}
                  btnVariant="link"
                  btnTitle={`Read more about: ${post.title}`}
                  btnText="Read More"
                />

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
};