import styles from '@/styles/Header.module.scss';
import React from 'react'
import {clsx} from "clsx";

import {NavItems} from "@/utils";
import {Button, ButtonLink, Logo} from "@/components";
import HeaderNavItems from "@/components/ui/HeaderNavItems";

export const Header = () => {
  return (
    <header className={clsx(styles.cHeader,"c-header")}>

      <div className="c-header-wrapper">

        <Logo/>

        <HeaderNavItems extraClassName='c-desktop'/>

        <Button
          btnColor="white"
          btnSize="md"
          btnText="Login"
        />

      </div>

    </header>
  )
}