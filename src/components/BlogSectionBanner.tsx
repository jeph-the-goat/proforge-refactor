import styles from "@/styles/BlogSectionBanner.module.scss"
import {IcnMail} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {Banner, SubscribeForm} from "@/components";

export const BlogSectionBanner = () => {
  return (
    <Banner
      extraClassName={clsx(styles.cBlogSectionBanner, "c-blog-section-banner")}
      isSection
      icon={<IcnMail/>}
      title="Stay in the Loop with Web3 News"
      paragraph="Get the latest updates, expert insights, and exclusive resources delivered straight to your inbox."
    >

      <SubscribeForm/>

      <p>
        No spam, just valuable content. Unsubscribe anytime.
      </p>
    </Banner>
  );
};
