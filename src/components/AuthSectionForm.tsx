import styles from "@/styles/AuthSectionForm.module.scss";
import React, {ReactNode} from 'react';
import {clsx} from "clsx";
import {IconBox, Logo} from "@/components";

interface AuthSectionFormProps {
  extraClassName?: string;
  icon: ReactNode;
  title: string;
  text: string;
  children: ReactNode;
  footNote?: ReactNode;
}

export const AuthSectionForm = (
  {
    extraClassName,
    icon,
    title,
    text,
    children,
    footNote,
  }:AuthSectionFormProps) => {
  return (
    <section className={clsx(styles.cAuthSectionForm, "c-auth-section-form", extraClassName)}>

      <div className="c-container">

        <Logo isDisabled/>

        <div className="c-auth-section-form-wrapper">

          <div className="c-auth-section-form-header">

            <IconBox icon={icon}/>

            <div className="c-auth-section-form-header-text">
              <h1 className="h5 c-gradient-text">
                {title}
              </h1>

              <p>
                {text}
              </p>

            </div>

          </div>

          <div className="c-auth-section-form-content">
            {children}
          </div>

          {footNote && (
            <div className="c-auth-section-form-footer">
              <small> {footNote}</small>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
