import styles from "@/styles/common/ToggleSwitch.module.scss";
import clsx from "clsx";
import {cFormGroupProps} from "@/types";
import {HTMLProps, ReactNode} from "react";

interface ToggleSwitchProps extends HTMLProps<HTMLInputElement> {
  labelText: ReactNode;
  labelIsHidden?: boolean
  name: string;
  toggleSwitchStyle?: "default" | "duo";
  labelCheckedText?: ReactNode;
}

export const ToggleSwitch =(
  {
    labelText,
    labelIsHidden,
    name,
    toggleSwitchStyle,
    labelCheckedText,
    ...rest
  }: ToggleSwitchProps) => {
  return (
    <div
      className={clsx(styles.cToggleSwitch, "c-toggle-switch")}
      data-style={toggleSwitchStyle? toggleSwitchStyle : "default"}
    >
      <input
        className="c-visually-hidden"
        type="checkbox"
        name={name}
        id={`id_${name}`}
        {...rest}
      />

      <label htmlFor={`id_${name}`} className="c-toggle-switch-label">

        <span
          className={clsx(
            "c-toggle-switch-label-text",
            toggleSwitchStyle !== "duo" && labelIsHidden && "c-visually-hidden",
            toggleSwitchStyle === "duo" && "unchecked",
          )}
        >
          {labelText}
        </span>

        {toggleSwitchStyle === "duo" && (
          <span className="c-toggle-switch-label-text checked">
            {labelCheckedText ? labelCheckedText : "Label checked text"}
          </span>
        )}

        <span className="c-toggle-switch-label-toggler" />

      </label>

    </div>
  );
}
