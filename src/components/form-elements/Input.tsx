import {cFormGroupProps, cInputProps} from "@/types";
import {Button, FormGroup} from "@/components";
import {IcnClose} from "@assets/icons";

interface InputProps extends cFormGroupProps, cInputProps {
  isClearable?: boolean;
  onClear?: () => void;
  value?: string;
}

export const Input =(
  {
    labelText,
    labelIsHidden,
    type,
    name,
    placeholder,
    isClearable,
    onClear,
    value,
    hasErrors,
    errorText,
    inputGroupIcon,
    inputGroupText,
    ...rest
  }: InputProps) => {
  const showClearButton = isClearable && type === "search" && value && value.length > 0;
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
        value={value}
        {...rest}
      />

      {showClearButton && (
        <Button
          extraClassName="c-form-group-search-clear-btn"
          btnVariant="icon"
          btnColor="ghost"
          btnSize="md"
          btnTitle="Clear"
          icon={<IcnClose/>}
          onClick={onClear}
        />
      )}

    </FormGroup>
  );
}

export default Input;