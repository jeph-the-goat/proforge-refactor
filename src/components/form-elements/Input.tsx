import {cFormGroupProps, cInputProps} from "@/types";
import {FormGroup} from "@/components";

interface InputProps extends cFormGroupProps, cInputProps {}

export const Input =(
  {
    labelText,
    labelIsHidden,
    type,
    name,
    placeholder,
    hasErrors,
    errorText,
    inputGroupText,
    ...rest
  }: InputProps) => {
  return (
    <FormGroup
      extraClassName={`c-form-group_${type}`}
      name={name}
      labelText={labelText}
      labelIsHidden={labelIsHidden}
      hasErrors={hasErrors}
      errorText={errorText}
      inputGroupText={inputGroupText}
    >
      <input
        type={type? type : "text"}
        id={`id_${name}`}
        placeholder={placeholder? placeholder : ""}
        {...rest}
      />

    </FormGroup>
  );
}

export default Input;