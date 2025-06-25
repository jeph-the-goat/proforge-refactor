import styles from "@/styles/BlogCard.module.scss";
import {IcnArrowUpRight} from "@assets/icons";

import React, {ReactNode} from 'react';
import {clsx} from "clsx";
import Link from "next/link";
import Image from "next/image";
import {format} from "date-fns";

import {BlogPostProps} from "@/utils";

interface BlogCardProps {
  isFeatured?: boolean;
  data: BlogPostProps;
  headingClass?: string;
  imageWidth?: number;
  imageHeight?: number;
  hideReadMore?: boolean;
  children?: ReactNode;
}

export const BlogCard = (
  {
    isFeatured,
    data,
    headingClass,
    imageWidth,
    imageHeight,
    hideReadMore,
    children
  }: BlogCardProps) => {
  return (
    <Link
      className={clsx(styles.cBlogCard, "c-blog-card")}
      href={`/blog/${data.id}`}
      title={`Read more about: ${data.title}`}
      aria-label={`Read more about: ${data.title}`}
      data-card={isFeatured? "featured": "default"}
    >
      <span className="c-blog-card-image">

        <Image
          src={data.image}
          alt={data.title}
          width={imageWidth? imageWidth: 200}
          height={imageHeight? imageHeight : 150}
        />

      </span>

      <span className="c-blog-card-body">

        <time dateTime={data.date}>
          {format(new Date(data.date), 'MMMM d, yyyy')}
        </time>

        <span className={clsx("c-blog-card-title", headingClass? headingClass : "h6")}>
          {data.title}
        </span>

        {!hideReadMore && (
          <span className="c-button" data-variant="link">
            <span className="c-button-label">Read More</span>
            <i className="c-button-icon"><IcnArrowUpRight/></i>
          </span>
        )}

        {children}

      </span>

    </Link>
  );
};

