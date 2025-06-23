import React from 'react';

import {BlogPostProps} from "@/utils";

import {Avatar, Badge, ButtonLink, Section, SectionTitle} from "@/components/common";
import {clsx} from "clsx";
import Image from "next/image";

interface BlogSingleSectionContentProps {
  post: BlogPostProps;
}

export const BlogSingleSectionContent = ({post}:BlogSingleSectionContentProps) => {

  return (
    <Section
      extraClassName={clsx("c-blog-single-section-content")}
      hideSectionTitle
    >
      <div className="c-blog-single-section-content-nav">
        <ButtonLink
          href="/blog"
          btnText="Back"
          btnVariant="link"
        />
      </div>

      {post.tags.map((tag) => (
        <Badge key={tag.value} text={tag.label}/>
      ))}

      <SectionTitle
        headingTag="h1"
        headingClass="h3"
        title={post.title}
      />

      <div className="c-blog-single-section-content-details">
        {post.author?.image || post.author?.image && (
          <Avatar image={post.author.image} alt={post.author.name}/>
        )}
        {post.date}
      </div>

      <div className="c-blog-single-section-content-image">
        <Image
          src={post.image}
          alt={post.title}
          width={1160}
          height={632}
        />
      </div>

      <div className="c-blog-single-section-content-grid">
        <div className="c-blog-single-section-content-grid-text">
          {post.content}
        </div>

        <div className="c-blog-single-section-content-grid-sidebar">
          <div className="c-blog-single-section-content-grid-sidebar-table">
            table of content here
          </div>

          <div className="c-blog-single-section-content-grid-sidebar-share">
            share here
          </div>

        </div>

      </div>

    </Section>
  );
};
