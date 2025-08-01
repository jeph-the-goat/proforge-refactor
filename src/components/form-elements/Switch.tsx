import React from 'react';
import { clsx } from "clsx";
import styles from '@/styles/form-elements/Switch.module.scss';

interface SwitchProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <label className={clsx(styles.cSwitch, "c-switch", className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="c-switch-input"
      />
      <span className="c-switch-slider"></span>
    </label>
  );
}; 