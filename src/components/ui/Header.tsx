'use client';
import styles from '@/styles/Header.module.scss';
import React from 'react'
import {clsx} from "clsx";

import {useMediaQuerySafe} from "@/hooks";
import {Button, Logo, HeaderNavItems, MobileMenu} from "@/components";

export const Header = () => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');
  return (
    <header className={clsx(styles.cHeader,"c-header")}>

      <div className="c-header-wrapper">

        <Logo/>

        {!isMobile && (
          <HeaderNavItems extraClassName='c-desktop'/>
        )}

        <Button
          btnColor="white"
          btnSize="md"
          btnText="Login"
        />

        <MobileMenu/>

      </div>

    </header>
  )
}