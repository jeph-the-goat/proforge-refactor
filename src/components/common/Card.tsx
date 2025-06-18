import styles from "@/styles/common/Card.module.scss";
import React from 'react';
import {clsx} from "clsx";
import {IconBox} from "@/components";

interface CardProps {
  icon?: React.ReactNode;
  useIconBox?: boolean;
  title: string;
  text: string;
}

export const Card = (
  {
    icon,
    useIconBox,
    title,
    text
  }: CardProps) => {
  return (
    <article className={clsx(styles.cCard,"c-card")}>

      {useIconBox? (
        <IconBox icon={icon}/>
      ):(
        <i>{icon}</i>
      )}

      <div className="c-card-body">

        <p className="h6">
          {title}
        </p>

        <p>
          {text}
        </p>

      </div>

    </article>
  );
};