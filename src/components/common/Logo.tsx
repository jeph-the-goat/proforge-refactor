import styles from "@/styles/common/Logo.module.scss";
import NexoraLogo from "@assets/images/nexora-logo.svg";

import React from 'react'
import Link from "next/link";
import {clsx} from "clsx";

interface LogoProps {
  extraClassName?: string;
  isDisabled?: boolean; //use when logo is not a link
}
export const Logo =(
  {
    extraClassName,
    isDisabled,
  }: LogoProps) => {
  return (
    <>
      {isDisabled? (
        <span
          className={clsx(styles.cLogo, "c-logo", extraClassName)}
          title="Nexora"
          aria-label="Nexora"
        >
          <NexoraLogo/>
        </span>
      ):(
        <Link
          href='/'
          className={clsx(styles.cLogo, "c-logo", extraClassName)}
          title="Nexora"
          aria-label="Nexora"
        >
          <NexoraLogo/>
        </Link>
      )}
    </>
  );
}