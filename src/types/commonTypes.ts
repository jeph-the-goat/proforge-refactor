import {HTMLProps, ReactNode} from "react";

export interface cButtonColors {
  btnColor?: "white" | "dark" | "ghost";
}

export interface cButtonProps extends cButtonColors{
  extraClassName?: string;
  btnText?: string;
  btnTitle?: string;
  children?: ReactNode;
  btnVariant?: "link" | "icon";
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
  type: "text" | "search" | "email" | "tel" | "date" | "time" | "password" | "number" | "file" | "url";
  name: string;
  placeholder?: string;
}


export interface SectionTitleProps {
  alignment?: "left";
  badgeBgColor?: string;
  badgeText?: string;
  badgeIcon?: ReactNode;
  headingTag?: "h1"
  headingClass?: string;
  title?: string;
  paragraph?: ReactNode;
}

export interface cLegalSectionGridSubItemProps {
  id: string;
  title: string;
  content: ReactNode;
}

export interface cLegalSectionGridProps {
  id: string;
  title: string;
  content: ReactNode;
  subItems?: cLegalSectionGridSubItemProps[];
}