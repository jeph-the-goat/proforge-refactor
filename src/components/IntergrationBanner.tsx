import React from 'react';
import {Banner, ButtonLink} from "@/components/common";

interface IntegrationBannerProps {
  extraClassName?: string;
}

export const IntegrationBanner = ({extraClassName}:IntegrationBannerProps) => {
  return (
    <Banner
      extraClassName={extraClassName}
      title="Missing Integration?"
      paragraph="Missing a tool or blockchain? Let us know, and we’ll work on adding it!"
    >
      <ButtonLink
        href="/contact"
        btnText="Contact Us"
      />
    </Banner>
  );
};
