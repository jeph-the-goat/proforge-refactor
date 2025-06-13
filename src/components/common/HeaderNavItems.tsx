import React from 'react';
import {NavItems} from "@/utils";
import {ButtonLink} from "@/components";
import {clsx} from "clsx";

interface HeaderNavItemsProps {
  extraClassName?: string;
}
export const HeaderNavItems = ({extraClassName}: HeaderNavItemsProps) => {
  return (
    <nav className={clsx("c-nav", extraClassName)}>
      {NavItems.map((navLink, navLinkIdx) => (
        <ButtonLink
          key={navLinkIdx}
          extraClassName="c-nav-link"
          href={navLink.url}
          btnText={navLink.label}
          btnVariant='link'
        />
      ))}
    </nav>
  );
};
