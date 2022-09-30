import React, { FC } from "react";
import cx from "classnames";

import { ReactComponent as ChevronUp } from "images/icons/chevron-up.svg";
import { ReactComponent as ChevronDown } from "images/icons/chevron-down.svg";

import styles from "./Icon.module.scss";

type IconProps = {
  className?: string;
  icon?: "chevron-up" | "chevron-down" | "chevron-left" | "chevron-right";
  onClick?: () => void;
  style?: any;
};

const Icon: FC<IconProps> = ({ className, icon, onClick, style }) => {
  return (
    <div onClick={onClick} className={cx(styles.base, className)} style={style}>
      {icon === "chevron-up" && <ChevronUp />}
      {icon === "chevron-down" && <ChevronDown />}
    </div>
  );
};

export default Icon;
