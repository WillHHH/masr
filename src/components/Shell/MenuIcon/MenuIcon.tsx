import React, { FC } from "react";
import cx from "classnames";

import styles from "./MenuIcon.module.scss";

type MenuIconProps = {
  className?: string;
  active: boolean;
  onClick?: () => void;
};

const MenuIcon: FC<MenuIconProps> = ({ className, active, onClick }) => {
  return (
    <svg
      width="56"
      height="56"
      fill="none"
      className={cx(styles.base, className)}
      onClick={onClick}
    >
      <path
        stroke="#fff"
        strokeWidth="1.5"
        d="M1.06 27.375 28.397 1.061 54.71 28.397 27.375 54.712z"
        rotate="45deg"
      />
      {/* <path stroke="#fff" d="M16 24.5h25M16 32.5h25" /> */}
      <line
        className={cx(styles.topX, active && styles.active)}
        x1="16"
        y1="24"
        x2="41"
        y2="24"
        stroke="white"
        strokeWidth="1.5"
      />
      <line
        className={cx(styles.bottomX, active && styles.active)}
        x1="16"
        y1="33"
        x2="41"
        y2="33"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default MenuIcon;
