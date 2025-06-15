import styles from "@/styles/HomeSectionBlog.module.scss";
import {IcnArrowUpRight, IcnAward} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns'

import {BlogPosts} from "@/utils";

import {ButtonLink, Section} from "@/components/common";

export const HomeSectionBlog = () => {
  const latestPosts = BlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <Section
      extraClassName={clsx(styles.cHomeSectionBlog, "c-home-section-blog")}
      leadIcon={<IcnAward/>}
      leadText="Blog"
      headingClass="h3"
      title="Learn, Share, and Stay Ahead"
      paragraph="Get the tools, documentation, and community support you need to master Web3 development."
    >

      <div className="c-home-section-blog-content">

        <div className="c-home-section-blog-grid">

          {latestPosts.map((post, postIdx) => (
            <Link
              key={post.id}
              className={clsx(
                "c-home-section-blog-grid-card",
                postIdx === 0? "featured": "default"
              )}
              href={`/blog/${post.id}`}
              title={`Read more about: ${post.title}`}
              aria-label={`Read more about: ${post.title}`}
            >
              <span className="c-home-section-blog-grid-card-image">
                <Image
                  src="/images/blog-placeholder-image-x1.webp"
                  alt={post.title}
                  width={366}
                  height={222}
                />
              </span>

              <span className="c-home-section-blog-grid-card-body">

                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>

                <span className="h6">
                  {post.title}
                </span>

                <span className="c-button" data-variant="link">
                  <span className="c-button-label">Read More</span>
                  <i className="c-button-icon"><IcnArrowUpRight/></i>
                </span>

              </span>

            </Link>
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