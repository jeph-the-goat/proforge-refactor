import React from 'react';
import {Banner} from "@/components/common";
import {IcnMail} from "@assets/icons";
import {SubscribeForm} from "@/components/forms/SubscribeForm";

export const BlogSectionBanner = () => {
  return (
    <Banner
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
