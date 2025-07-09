import styles from "@/styles/common/Seaparator.module.scss";
import React from 'react';
import {clsx} from "clsx";

interface SeparatorProps {
  text: string;
}

export const Separator = ({text}:SeparatorProps) => {
  return (
    <div className={clsx(styles.cSeparator, "c-separator")}>
      <span>{text}</span>
    </div>
  );
};
