'use client';
import {ButtonHTMLAttributes} from 'react';
import clsx from "clsx";

import {cButtonProps} from "@/types";
import {IcnChevronDown} from "@assets/icons";

interface ButtonProps extends cButtonProps, ButtonHTMLAttributes<HTMLButtonElement>{
  type?: "reset" | "submit";
  hasChevronIcon?: boolean;
}

export const Button = (
  {
    extraClassName,
    type,
    btnText,
    btnTitle,
    children,
    btnColor,
    btnVariant,
    btnSize,
    icon,
    iconPlacement,
    hasChevronIcon,
    ...rest
  }:ButtonProps) => {

  return (
    <button
      type={type? type : "button"}
      className={clsx("c-button", extraClassName)}
      data-color={btnColor? btnColor : "default"}
      data-variant={btnVariant}
      data-size={btnSize}
      data-icon-placement={iconPlacement}
      title={btnText?? btnTitle?? "Button title"}
      aria-label={btnText?? btnTitle?? "Button title"}
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

      {hasChevronIcon && (
        <i className="c-button-icon-chevron">
          <IcnChevronDown/>
        </i>
      )}

    </button>
  );
};
