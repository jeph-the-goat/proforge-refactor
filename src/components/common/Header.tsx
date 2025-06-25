'use client';
import styles from '@/styles/common/Header.module.scss';
import React from 'react'
import {clsx} from "clsx";

import {useMediaQuerySafe} from "@/hooks";
import {Logo, HeaderNavItems, MobileMenu, ButtonLink} from "@/components";

export const Header = () => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');
  return (
    <header className={clsx(styles.cHeader,"c-header")}>

      <div className="c-header-wrapper">

        <Logo/>

        {!isMobile && (
          <HeaderNavItems extraClassName='c-desktop' hasToggler/>
        )}

        <div className="c-header-button-wrapper">
          <ButtonLink
            href="/login"
            btnColor="white"
            btnSize="md"
            btnText="Login"
          />
        </div>

        <MobileMenu/>

      </div>

    </header>
  )
}