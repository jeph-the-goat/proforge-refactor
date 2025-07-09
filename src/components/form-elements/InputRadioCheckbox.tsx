import styles from "@/styles/common/FormGroup.module.scss";
import {HTMLProps, ReactNode} from "react";
import clsx from "clsx";

interface InputRadioCheckboxProps extends HTMLProps<HTMLInputElement>{
  type?: "radio";
  id: string;
  name: string;
  isLabelButton?: boolean;
  labelText?: string;
  hasErrors?: boolean;
  errorText?: string;
  children?: ReactNode;
}

export const InputRadioCheckbox = (
  {
    type,
    id,
    name,
    onChange,
    checked,
    isLabelButton,
    labelText,
    hasErrors,
    errorText,
    children,
    ...rest
  }: InputRadioCheckboxProps) => {
  return (
    <div className={clsx(styles.cFormGroup, "c-form-group", "c-form-group-check")}>

      <div className="c-form-group-wrapper">
        <input
          className={clsx(isLabelButton && "c-visually-hidden")}
          type={type? type : "checkbox"}
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          aria-invalid={!!hasErrors}
          {...rest}
        />

        <label htmlFor={id} className={clsx(isLabelButton && "is-button")}>
          {labelText? labelText : children}
        </label>

      </div>

      {hasErrors && (
        <small className="c-form-group-error">
          {(errorText as string)}
        </small>
      )}

    </div>
  );
}
