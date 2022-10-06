import React, { FC } from "react";
import cx from "classnames";

import styles from "./SectionTitle.module.scss";
import Reveal from "components/Layout/Reveal";

export type SectionTitleProps = {
  className?: string;
  title?: string;
  content?: string;
  align?: "center" | "left";
};

const SectionTitle: FC<SectionTitleProps> = ({
  className,
  title,
  content,
  align = "center",
}) => {
  return (
    <Reveal>
      <div className={cx(styles.base, styles[align], className)}>
        <h2>{title}</h2>
        <hr />
        <p>{content}</p>
      </div>
    </Reveal>
  );
};

export default SectionTitle;
