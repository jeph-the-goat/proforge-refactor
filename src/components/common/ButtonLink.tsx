import Link, {LinkProps} from "next/link";
import clsx from "clsx";

import {cButtonProps} from "@/types";

interface ButtonLinkProps extends cButtonProps, LinkProps{
  href: string,
  isExternal?: boolean;
  isDisabled?: boolean;
}

export const ButtonLink = (
  {
    href,
    isExternal,
    isDisabled,
    extraClassName,
    btnText,
    btnTitle,
    children,
    btnColor,
    btnVariant,
    btnSize,
    icon,
    iconPlacement,
    ...rest
  }:ButtonLinkProps) => {
  console.log('ButtonLink rest props:', rest);
  console.log('ButtonLink all props:', { href, isExternal, isDisabled, extraClassName, btnText, btnTitle, children, btnColor, btnVariant, btnSize, icon, iconPlacement, ...rest });

  return (
    <Link
      className={clsx("c-button", extraClassName, isDisabled && "is-disabled")}
      href={href? href : "/"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? 'noreferrer noopener': undefined}
      data-color={btnColor}
      data-variant={btnVariant}
      data-size={btnSize}
      data-icon-placement={iconPlacement}
      title={btnTitle? `View ${btnTitle}` : `View ${btnText}`}
      aria-label={btnTitle? `View ${btnTitle}` : `View ${btnText}`}
      {...rest}
    >

      {btnText?(
        <span className="c-button-label">
          {btnText}
        </span>
      ):(
        children
      )}

      {icon && (
        <i className="c-button-icon">
          {icon}
        </i>
      )}

    </Link>
  );
};
