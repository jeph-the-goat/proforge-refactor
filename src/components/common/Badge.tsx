import styles from "@/styles/common/Badge.module.scss"
import React, {ReactNode} from 'react';
import {clsx} from "clsx";

interface BadgeProps {
  bgColor?: string;
  icon?: ReactNode;
  text?: string;
  children?: ReactNode;
}

export const Badge = (
  {
    bgColor,
    icon,
    text,
    children,
  }: BadgeProps) => {
  return (
    <span
      className={clsx(styles.cBadge, "c-badge")}
      style={{backgroundColor: bgColor? `${bgColor}` : "var(--neutral-900)"}}
    >
      {icon && (
        <i>{icon}</i>
      )}

      {text? (
        <span>{text}</span>
      ) : (
        children
      )}
    </span>
  );
};
