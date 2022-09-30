import React, { FC } from "react";
import cx from "classnames";
import Icon from "components/common/Icon/Icon";
import styles from "./BackToTop.module.scss";

type BackToTopProps = {
  className?: string;
};

const BackToTop: FC<BackToTopProps> = ({ className }) => {
  return (
    <div
      className={cx(styles.base, className)}
      onClick={() => {
        scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}
      tabIndex={0}
    >
      <Icon className={styles.icon} icon="chevron-up" />
    </div>
  );
};

export default BackToTop;
