import {ReactNode} from "react";


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