"use client";

import styles from "@/styles/BlogSingleSectionContent.module.scss";
import { IcnChevronLeft } from "@assets/icons";

import React, { useState, useEffect, useRef } from 'react';
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { BlogPostProps } from "@/utils";
import {createActiveSectionTracker, generateTableOfContents, TocItem} from "@/functions";

import { Avatar, Badge, ButtonLink, Section, SectionTitle } from "@/components/common";

interface BlogSingleSectionContentProps {
  post: BlogPostProps;
}

export const BlogSingleSectionContent = ({ post }: BlogSingleSectionContentProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    if (allIds.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = createActiveSectionTracker(allIds, setActiveId);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [allIds]);

  const renderTocItem = (item: TocItem, index: number) => (
    <li key={`${item.id}-${index}`} className={clsx('toc-item', `level-${item.level}`, item.type)}>
      <Link
        href={`#${item.id}`}
        className={clsx('toc-link', { active: activeId === item.id })}
      >
        {item.type === 'list' && <span className="list-indicator">•</span>}
        {item.text}
      </Link>
      {item.subItems && item.subItems.length > 0 && (
        <ul className="toc-subitems">
          {item.subItems.map((subItem, subIndex) => renderTocItem(subItem, subIndex))}
        </ul>
      )}
    </li>
  );

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
        {post.tags.map((tag) => (
          <Badge key={tag.value} text={tag.label} />
        ))}

        <SectionTitle
          headingTag="h1"
          headingClass="h3"
          title={post.title}
        />

        <div className="c-blog-single-section-content-details">
          {post.author?.image && (
            <Avatar
              size="sm"
              image={post.author.image}
              alt={post.author.name}
            />
          )}
          <ul>
            <li className="author-name">{post.author?.name}</li>
            <li>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </li>
            <li>6 min read</li>
          </ul>
        </div>
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

            <div className="c-blog-single-section-content-grid-sidebar-item table">

              <p>
                <span>Table of Contents</span>
              </p>

              {tocItems.length > 0 ? (
                <ul>
                  {tocItems.map((item, index) => renderTocItem(item, index))}
                </ul>
              ) : (
                <p>No headings found in this post</p>
              )}

            </div>

            <div className="c-blog-single-section-content-grid-sidebar-item share">
              share here
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