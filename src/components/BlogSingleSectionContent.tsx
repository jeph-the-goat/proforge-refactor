"use client";

import styles from "@/styles/BlogSingleSectionContent.module.scss";
import { IcnChevronLeft } from "@assets/icons";

import React from 'react';
import { clsx } from "clsx";
import Image from "next/image";
import { format } from "date-fns";

import {BlogPostProps, BlogShareButton, BlogShareButtons} from "@/utils";
import {generateTableOfContents, TocItem} from "@/functions";
import {useScrollSectionTracker} from "@/hooks";

import {Avatar, Badge, BlogSingleToC, Button, ButtonLink, Section, SectionTitle} from "@/components";

interface BlogSingleSectionContentProps {
  post: BlogPostProps;
}

export const BlogSingleSectionContent = ({ post }: BlogSingleSectionContentProps) => {
  const { tocItems, contentWithIds } = generateTableOfContents(post.content);

  const extractIds = (items: TocItem[]): string[] => {
    const ids: string[] = [];
    items.forEach(item => {
      ids.push(item.id);
      if (item.subItems) {
        ids.push(...extractIds(item.subItems));
      }
    });
    return ids;
  };

  const allIds = extractIds(tocItems);

  const activeId = useScrollSectionTracker(allIds);

  const handleShare = (button: BlogShareButton) => {
    // Get current page URL
    const url = typeof window !== 'undefined' ? window.location.href : '';

    // Use post data for title and description
    const title = post.title;
    const description = post.excerpt || `Read "${post.title}" - ${post.author?.name ? `by ${post.author.name}` : 'Latest insights on Web3 development'}`;

    const shareUrl = button.getShareUrl(url, title, description);

    if (shareUrl) {
      window.open(
        shareUrl,
        'share-dialog',
        'width=600,height=400,resizable=yes,scrollbars=yes'
      );
    } else if (button.id === 'instagram') {
      // For Instagram, copy URL to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied! You can paste it in your Instagram story or bio.');
      });
    }
  };

  return (
    <Section
      extraClassName={clsx(styles.cBlogSingleSectionContent, "c-blog-single-section-content")}
      hideSectionTitle
    >
      <div className="c-blog-single-section-content-nav">
        <ButtonLink
          href="/blog"
          btnText="Back"
          btnVariant="link"
          icon={<IcnChevronLeft />}
          iconPlacement="left"
        />
      </div>

      <div className="c-blog-single-section-content-header">
        <div className="c-button-container">
          {post.tags.map((tag) => (
            <Badge key={tag.value} text={tag.label} />
          ))}
        </div>

        <SectionTitle
          headingTag="h1"
          headingClass="h3"
          title={post.title}
        />

        <ul className="c-blog-single-section-content-details">
          <li className="author-name">
            {post.author?.image && (
              <Avatar
                size="sm"
                image={post.author.image}
                alt={post.author.name}
              />
            )}
            {post.author?.name}
          </li>

          <li>
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          </li>

          <li>6 min read</li>

        </ul>

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

        <aside className="c-blog-single-section-content-grid-sidebar">

          <div className="c-blog-single-section-content-grid-sidebar-wrapper">

            {tocItems.length > 0 && (
              <BlogSingleToC
                tocItems={tocItems}
                activeId={activeId}
              />
            )}

            <div className="c-blog-single-section-content-grid-sidebar-share">
              <p>Share this blog</p>

              <div className="c-button-container">
                {BlogShareButtons.map((share) => (
                  <Button
                    key={share.id}
                    btnTitle={share.ariaLabel}
                    btnVariant="icon"
                    btnColor="ghost"
                    btnSize="md"
                    icon={share.icon}
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare(share);
                    }}
                  />
                ))}
              </div>

            </div>

          </div>

        </aside>

        <div className="c-blog-single-section-content-grid-text">
          {contentWithIds}
        </div>

      </div>

    </Section>
  );
};