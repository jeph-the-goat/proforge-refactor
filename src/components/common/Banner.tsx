import React, {ReactNode} from 'react';

interface BannerProps {
  icon?: ReactNode;
  title: string;
  paragraph?: string;
  children?: ReactNode;
}

export const Banner = (
  {
    icon,
    title,
    paragraph,
    children
  }:BannerProps) => {
  return (
    <aside className="c-banner">
      <i>{icon}</i>

      <div className="c-banner-text">

        <h2 className="h6">
          {title}
        </h2>

        <p>
          {paragraph}
        </p>
      </div>

      {children}

    </aside>
  );
};
