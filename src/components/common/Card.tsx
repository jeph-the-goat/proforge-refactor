import styles from "@/styles/common/Card.module.scss";
import React from 'react';
import {clsx} from "clsx";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  text: string;
}

export const Card = (
  {
    icon,
    title,
    text
  }: CardProps) => {
  return (
    <article className={clsx(styles.cCard,"c-card")}>

      <i>{icon}</i>

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