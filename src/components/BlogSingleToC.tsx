"use client";
import styles from "@/styles/BlogSingleToC.module.scss";

import React, {useCallback, useRef, useState} from 'react';
import Link from "next/link";
import { clsx } from "clsx";

import { TocItem } from "@/functions";
import {Button} from "@/components";
import {useMediaQuerySafe} from "@/hooks";
import {useOnClickOutside} from "usehooks-ts";

interface TableOfContentsProps {
  tocItems: TocItem[];
  activeId: string;
}

export const BlogSingleToC = ({ tocItems, activeId }: TableOfContentsProps) => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const renderTocItem = (item: TocItem, index: number) => {
    if (item.type === 'heading') {
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

  const handleToggleOpen = useCallback(() => {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen)
  }, [setIsDropdownOpen])

  const handleClose = useCallback(() => {
    setIsDropdownOpen(false)
  }, [setIsDropdownOpen])

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, handleClose);

  return (
    <div className={clsx(styles.cBlogSingleToc, "c-blog-single-toc")}>

      <div className="c-desktop">
        <p>
          <span>Table of Contents</span>
        </p>

        <div className="c-blog-single-toc-content">
          {tocItems.map((item, index) => renderTocItem(item, index))}
        </div>

      </div>

      <div className="c-dropdown c-mobile" ref={dropdownRef}>

        <Button
          extraClassName={clsx("c-dropdown-toggle", isDropdownOpen && "is-open")}
          btnText="Table of Contents"
          btnVariant="link"
          hasChevronIcon
          onClick={handleToggleOpen}
        />

        <aside className={clsx("c-dropdown-menu", isDropdownOpen && "is-open")}>

          <div className="c-dropdown-menu-wrapper">

            <div className="c-dropdown-menu-inner">

              <div className="c-blog-single-toc-content" onClick={handleClose}>
                {tocItems.map((item, index) => renderTocItem(item, index))}
              </div>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};