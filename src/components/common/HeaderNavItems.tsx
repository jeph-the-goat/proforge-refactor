"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {NavItems} from "@/utils";
import {ButtonLink} from "@/components";
import Link from "next/link";

interface HeaderNavItemsProps {
  extraClassName?: string;
  hasToggler?: boolean;
}

export const HeaderNavItems = ({extraClassName, hasToggler}: HeaderNavItemsProps) => {
  const pathname = usePathname();

  // For the transition effect
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Set initial active rect position
  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(".is-active");
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        setActiveRect(rect);
        setHoveredRect(rect);
      }
    }
  }, [pathname]);

  // On mouse enter of link we update the hovered rect
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredRect(rect);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (activeRect) {
      setHoveredRect(activeRect);
    }
  };

  // Update rect on resize
  const updateRects = useCallback(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(".is-active");
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        setActiveRect(rect);
        setHoveredRect(rect);
      }
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", updateRects);
    return () => window.removeEventListener("resize", updateRects);
  }, [updateRects]);

  return (
    <nav ref={navRef} className={clsx("c-nav", extraClassName)}>

      {NavItems.map((navLink, navLinkIdx) => (
        <Link
          key={navLinkIdx}
          className={clsx("c-nav-link", isActive(navLink.url) && "is-active")}
          href={navLink.url}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoveredRect(rect);
            setActiveRect(rect);
          }}
        >
          {navLink.label}
        </Link>
      ))}

      {hasToggler && hoveredRect && (
        <span
          className="c-nav-toggler"
          style={{
            left: 0,
            transform: `translateX(${hoveredRect.left - (navRef.current?.getBoundingClientRect().left || 0)}px)`,
            width: hoveredRect.width,
            height: hoveredRect.height,
          }}
        />
      )}
    </nav>
  );
};