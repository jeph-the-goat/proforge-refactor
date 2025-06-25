"use client";
import styles from "@/styles/common/Dropdown.module.scss";
import React, {ReactNode, useCallback, useRef, useState} from 'react';
import {clsx} from "clsx";
import {useOnClickOutside} from "usehooks-ts";

import {Button} from "@/components";

interface DropdownProps {
  extraClassName?: string;
  btnText: string;
  children: ReactNode;
}
export const Dropdown = ({extraClassName, btnText, children}:DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleOpen = useCallback(() => {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen)
  }, [setIsDropdownOpen])

  const handleClose = useCallback(() => {
    setIsDropdownOpen(false)
  }, [setIsDropdownOpen])

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, handleClose);

  return (
    <div
      className={clsx(styles.cDropdown,"c-dropdown", extraClassName)}
      ref={dropdownRef}
    >
      <Button
        extraClassName={clsx("c-dropdown-toggle", isDropdownOpen && "is-open")}
        btnText={btnText}
        btnVariant="link"
        hasChevronIcon
        onClick={handleToggleOpen}
      />

      <aside className={clsx("c-dropdown-menu", isDropdownOpen && "is-open")}>

        <div className="c-dropdown-menu-wrapper">

          <div className="c-dropdown-menu-inner">

            <div className="c-dropdown-menu-content" onClick={handleClose}>
              {children}
            </div>

          </div>

        </div>

      </aside>

    </div>
  );
};
