import React from "react";

import styles from "./GridSample.module.scss";

const GridSample = () => {
  return (
    <div className={styles.base}>
      <div className={styles.guide} />
      <div className={styles.guide} />
      <div className={styles.guide} />
      <div className={styles.guide} />
      <div className={styles.guide} />
    </div>
  );
};

export default GridSample;
