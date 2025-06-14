import {HTMLProps, ReactNode} from "react";


export interface cButtonProps {
  extraClassName?: string;
  btnText?: string;
  btnTitle?: string;
  children?: ReactNode;
  btnVariant?: "link" | "icon";
  btnColor?: "white" | "dark" | "ghost";
  btnSize?: "md" | "sm"; //md:40px
  icon?: ReactNode;
  iconPlacement?: "left";
}

export interface cFormGroupProps {
  extraClassName?: string;
  labelText: string;
  labelIsHidden?: boolean;
  inputGroupIcon?: ReactNode;
  inputGroupText?: ReactNode;
  hasErrors?: boolean;
  errorText?: string;
}

export interface cInputProps extends HTMLProps<HTMLInputElement>{
  type: "text" | "password" | "search" | "email" | "tel" | "date" | "time";
  name: string;
  placeholder?: string;
}