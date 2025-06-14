import {TextareaHTMLAttributes} from "react";

import {cFormGroupProps} from "@/types";

import {FormGroup} from "@/components";

interface InputTextareaProps extends cFormGroupProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
}

export const InputTextarea = (
  {
    labelText,
    labelIsHidden,
    name,
    placeholder,
    hasErrors,
    errorText,
    inputGroupIcon,
    inputGroupText,
    ...rest
  }: InputTextareaProps) => {
  return (
    <FormGroup
      extraClassName="c-form-group-textarea"
      name={name}
      labelText={labelText}
      labelIsHidden={labelIsHidden}
      hasErrors={hasErrors}
      errorText={errorText}
      inputGroupText={inputGroupText}
    >
      <textarea
        id={`id_${name}`}
        placeholder={placeholder? placeholder : ""}
        {...rest}
      />

    </FormGroup>
  );
}
