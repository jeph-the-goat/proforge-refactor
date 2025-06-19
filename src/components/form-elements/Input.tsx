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
    inputGroupIcon,
    inputGroupText,
    ...rest
  }: InputProps) => {
  return (
    <FormGroup
      extraClassName={`c-form-group-${type}`}
      name={name}
      labelText={labelText}
      labelIsHidden={labelIsHidden}
      hasErrors={hasErrors}
      errorText={errorText}
      inputGroupIcon={inputGroupIcon}
      inputGroupText={inputGroupText}
    >
      <input
        type={type? type : "text"}
        id={`id_${name}`}
        placeholder={placeholder? placeholder : ""}
        aria-invalid={!!hasErrors}
        {...rest}
      />

    </FormGroup>
  );
}

export default Input;