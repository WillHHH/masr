import React, { FC, MouseEvent } from "react";
import cx from "classnames";
import LinkWrap from "components/common/LinkWrap/LinkWrap";
import styles from "./Button.module.scss";
import { ReactComponent as Arrow } from "images/icons/chevron-left.svg";

type ButtonProps = {
  className?: string;
  text?: string;
  type?: "pill" | "ghost" | "back" | "box";
  mode?: "light" | "dark";
  onClick?: (event: MouseEvent) => void;
  href?: string;
  style?: any;
  children?: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const Button: FC<ButtonProps> = ({
  text,
  type = "box",
  mode = "light",
  href,
  onClick,
  className,
  children,
  ...props
}) => {
  const content = (
    <button
      tabIndex={0}
      className={cx(
        styles.base,
        styles[type],
        className,
        mode === "dark" && styles.dark,
        !!children && styles.children,
      )}
      onClick={onClick}
      {...props}
    >
      {children || (
        <>
          <span>{text}</span>
          <Arrow />
        </>
      )}
    </button>
  );

  return !!href ? <LinkWrap href={href}>{content}</LinkWrap> : content;
};

export default Button;
