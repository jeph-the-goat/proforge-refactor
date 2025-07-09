"use client";
import {IcnEye, IcnEyeOff} from "@assets/icons";

import {HTMLProps, useState} from "react";

import {cFormGroupProps} from "@/types";

import {Button, FormGroup} from "@/components";

interface InputPasswordProps extends cFormGroupProps, HTMLProps<HTMLInputElement> {
  name: string;
}

export const InputPassword =(
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
  }: InputPasswordProps) => {
  const [passwordIsVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <FormGroup
      extraClassName="c-form-group-password"
      name={name}
      labelText={labelText}
      labelIsHidden={labelIsHidden}
      hasErrors={hasErrors}
      errorText={errorText}
      inputGroupIcon={inputGroupIcon}
      inputGroupText={inputGroupText}
    >
      <input
        {...rest}
        type={passwordIsVisible? "text": "password"}
        id={`id_${name}`}
        placeholder={placeholder? placeholder : ""}
        aria-invalid={!!hasErrors}
      />

      <Button
        btnTitle={passwordIsVisible? "Hide password" : "Show password"}
        btnColor="ghost"
        btnVariant="icon"
        icon={passwordIsVisible? <IcnEyeOff/> : <IcnEye/>}
        btnSize="md"
        onClick={togglePasswordVisibility}
      />

    </FormGroup>
  );
}

export default InputPassword;