import styles from "@/styles/Logo.module.scss";
import NexoraLogo from "@assets/images/nexora-logo.svg";

import React from 'react'
import Link from "next/link";
import {clsx} from "clsx";

interface LogoProps {
  extraClassName?: string;
}
export const Logo =(
  {
    extraClassName,
  }: LogoProps) => {
  return (
    <Link
      href='/'
      className={clsx(styles.cLogo, "c-logo", extraClassName)}
      title="Nexora"
      aria-label="Nexora"
    >
      <NexoraLogo/>
    </Link>
  );
}