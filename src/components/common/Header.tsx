'use client';
import styles from '@/styles/common/Header.module.scss';
import React from 'react'
import {clsx} from "clsx";

import {useMediaQuerySafe} from "@/hooks";
import {Logo, HeaderNavItems, MobileMenu, ButtonLink} from "@/components";
import {signOut, useSession} from "next-auth/react";

export const Header = () => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');
  const { data: session, status } = useSession()

  const isAuthenticated = status === 'authenticated' && session?.user

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/'
    })
  }

  return (
    <header className={clsx(styles.cHeader,"c-header")}>

      <div className="c-header-wrapper">

        <Logo/>

        {!isMobile && (
          <HeaderNavItems extraClassName='c-desktop' hasToggler/>
        )}

        <div className="c-header-button-wrapper">
          <ButtonLink
            onClick={isAuthenticated ? handleSignOut : () => {}}
            href={isAuthenticated ? "/logout" : "/login"}
            btnColor="white"
            btnSize="md"
            btnText={isAuthenticated ? "Logout" : "Login"}
          />
        </div>

        <MobileMenu/>

      </div>

    </header>
  )
}