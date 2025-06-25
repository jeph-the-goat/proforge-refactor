"use client";
import styles from "@/styles/BlogSingleToC.module.scss";

import React from 'react';
import Link from "next/link";
import { clsx } from "clsx";

import { TocItem } from "@/functions";
import {useMediaQuerySafe} from "@/hooks";

import {Dropdown} from "@/components";


interface TableOfContentsProps {
  tocItems: TocItem[];
  activeId: string;
}

export const BlogSingleToC = ({ tocItems, activeId }: TableOfContentsProps) => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');

  const renderTocItem = (item: TocItem, index: number) => {
    if (item.type === 'heading') {
      return (
        <Link
          key={`${item.id}-${index}`}
          href={`#${item.id}`}
          className={clsx(
            'toc-heading-link',
            `level-${item.level}`,
            activeId === item.id && "active"
          )}
          title={`See ${item.text} `}
        >
          {item.text}
        </Link>
      );
    }

    if (item.type === 'list' && item.subItems && item.subItems.length > 0) {
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
                className={clsx('toc-list-link', activeId === listItem.id && "active")}
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

  return (
    <div className={clsx(styles.cBlogSingleToc, "c-blog-single-toc")}>

      {isMobile? (
        <Dropdown
          extraClassName="c-mobile"
          btnText="Table of Contents"
        >
          <div className="c-blog-single-toc-content">
            {tocItems.map((item, index) => renderTocItem(item, index))}
          </div>

        </Dropdown>
      ):(
        <div className="c-desktop">
          <p>
            <span>Table of Contents</span>
          </p>

          <div className="c-blog-single-toc-content">
            {tocItems.map((item, index) => renderTocItem(item, index))}
          </div>

        </div>
      )}

    </div>
  );
};