/*

  Container
  Simple implementation of our scss mixin @include vw-container();

  Using this in your components will create a single point at which
  you can alter the behavior or parameters of vw-container() without
  altering the base mixin.

  Note: Not intended to be nested, it's just a single "outer boundary".

*/

import React, { FC } from "react";
import cx from "classnames";

import styles from "./Container.module.scss";

export type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
  preset?: "default" | "narrow" | "bracket-all" | "full";
};

const Container: FC<ContainerProps> = ({
  className,
  children,
  preset = "default",
}) => {
  return (
    <div className={cx(styles.base, styles[preset], className)}>{children}</div>
  );
};

export default Container;
