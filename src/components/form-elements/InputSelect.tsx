"use client";
import React from 'react';
import {cFormGroupProps} from "@/types";
import {FormGroup} from "@/components";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectProps,
} from "@radix-ui/react-select";
import {IcnChevronDown} from "@assets/icons";
import {clsx} from "clsx";

export interface cInputSelectOption {
  value: string;
  label: string;
}

interface InputSelectProps extends cFormGroupProps, SelectProps {
  name: string;
  placeholder?: string;
  options: cInputSelectOption[];
  value?: string;
  hasDescription?: boolean;
  onValueChange?: (value: string) => void;
}

export const InputSelect = (
  {
    extraClassName,
    labelText,
    labelIsHidden,
    options,
    name,
    hasDescription = false,
    placeholder,
    value,
    onValueChange,
    hasErrors,
    errorText,
    inputGroupIcon,
    inputGroupText,
    ...selectProps
  }: InputSelectProps) => {

  const handleValueChange = (newValue: string) => {
    // Prevent empty string from being set (known Radix UI issue)
    if (newValue === '' || newValue === undefined) {
      return;
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <FormGroup
      extraClassName={clsx("c-form-group-select", extraClassName)}
      name={name}
      labelText={labelText}
      labelIsHidden={labelIsHidden}
      hasErrors={hasErrors}
      errorText={errorText}
      inputGroupIcon={undefined}
      inputGroupText={inputGroupText}
      hasDescription={hasDescription}
    >
      <Select
        value={value || ""}
        onValueChange={handleValueChange}
        {...selectProps}
      >
        <SelectTrigger
          id={`id_${name}`}
          className="c-select-trigger"
        >
          {inputGroupIcon && (
            <i className="c-select-trigger-input-icon">
              {inputGroupIcon}
            </i>
          )}

          <SelectValue
            className="c-select-value"
            placeholder={placeholder || ""}
          >
            {value ? options.find(option => option.value === value)?.label : placeholder}
          </SelectValue>

          <SelectIcon className="c-select-trigger-chevron">
            <IcnChevronDown/>
          </SelectIcon>
        </SelectTrigger>

        <SelectPortal>
          <SelectContent
            position="popper"
            sideOffset={5}
            className="c-select-content"
          >
            {options.map((option: cInputSelectOption) => (
              <SelectItem
                key={option.value}
                className="c-select-item"
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </FormGroup>
  );
};

export {SelectContent, Select, SelectItem, SelectTrigger, SelectValue};
