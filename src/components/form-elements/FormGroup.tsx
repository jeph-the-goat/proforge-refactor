import styles from "@/styles/common/FormGroup.module.scss";

import {ReactNode, Ref} from "react";
import clsx from "clsx";

import {cFormGroupProps} from "@/types";

interface FormGroupProps extends cFormGroupProps {
  name: string;
  hasDescription?: boolean;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const FormGroup = (
  {
    extraClassName,
    labelText,
    labelIsHidden,
    name,
    hasDescription = false,
    children,
    inputGroupIcon,
    inputGroupText,
    hasErrors,
    errorText,
    ref,
  }: FormGroupProps
) => {
  return (
    <div
      ref={ref}
      className={clsx(styles.cFormGroup, "c-form-group", extraClassName)}
      style={hasDescription ? {marginBottom: "0.5rem"} : {}}
    >
      <label
        htmlFor={`id_${name}`}
        className={clsx(
          "c-form_label",
          labelIsHidden && "c-visually-hidden"
        )}
      >
        {labelText}
      </label>

      <div className="c-form-group-wrapper">

        <div className={clsx("c-form-group-input", hasErrors && "is-invalid")}>

          {inputGroupIcon && (
            <i className="c-form-group-input-icon">
              {inputGroupIcon}
            </i>
          )}

          {children}

        </div>

        {inputGroupText}

      </div>

      {hasErrors && (
        <small className="c-form-group-error">
          {(errorText as string)}
        </small>
      )}
    </div>
  );
}