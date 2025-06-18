import styles from "@/styles/common/IconBox.module.scss";
import Ornament from "@assets/images/box-ornament.svg";

import React, {ReactNode} from 'react';
import {clsx} from "clsx";

interface IconBoxProps {
  icon?: ReactNode;
}

export const IconBox = ({icon}: IconBoxProps) => {
  return (
    <span className={clsx(styles.cIconBox, "c-icon-box")}>

      <span className="c-icon-box-wrapper">

        <span className='c-icon-box-bg'>
          <Ornament/>
        </span>

        <span className="c-icon-box-icon">
          <i>{icon}</i>
        </span>

      </span>

    </span>
  );
};
