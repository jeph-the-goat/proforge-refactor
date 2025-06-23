"use client";

import styles from "@/styles/BlogSingleSectionContent.module.scss";
import { IcnChevronLeft } from "@assets/icons";

import React, { useState, useEffect, useRef } from 'react';
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import {BlogPostProps, BlogShareButton, BlogShareButtons} from "@/utils";
import {createActiveSectionTracker, generateTableOfContents, TocItem} from "@/functions";

import {Avatar, Badge, Button, ButtonLink, Section, SectionTitle} from "@/components";

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

  const renderTocItem = (item: TocItem, index: number) => {
    if (item.type === 'heading') {
      // Render headings as direct links (no li wrapper)
      return (
        <Link
          key={`${item.id}-${index}`}
          href={`#${item.id}`}
          className={clsx('toc-heading-link', `level-${item.level}`, {
            active: activeId === item.id
          })}
        >
          {item.text}
        </Link>
      );
    }

    if (item.type === 'list' && item.subItems && item.subItems.length > 0) {
      // Render lists as actual ul/ol elements
      const ListElement = item.listType === 'ordered' ? 'ol' : 'ul';

      return (
        <ListElement
          key={`${item.id}-${index}`}
          className={clsx('toc-list', `toc-${item.listType}-list`)}
        >
          {item.subItems.map((listItem, listIndex) => (
            <li key={`${listItem.id}-${listIndex}`} className="toc-list-item">
              <Link
                href={`#${listItem.id}`}
                className={clsx('toc-list-link', {
                  active: activeId === listItem.id
                })}
              >
                {listItem.text}
              </Link>
            </li>
          ))}
        </ListElement>
      );
    }

    return null;
  };

  const handleShare = (button: BlogShareButton) => {
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

            {tocItems.length > 0 && (
              <div className="c-blog-single-section-content-grid-sidebar-item table">

                <p>
                  <span>Table of Contents</span>
                </p>

                <div className="c-blog-single-section-content-grid-sidebar-toc">
                  {tocItems.map((item, index) => renderTocItem(item, index))}
                </div>

              </div>
            )}

            <div className="c-blog-single-section-content-grid-sidebar-item share">
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