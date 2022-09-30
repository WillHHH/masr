import React from "react";
import styles from "./PreviewModeIndicator.module.scss";

const PreviewModeIndicator = () => {
  return (
    <div className={styles.base}>
      <a href="/api/exit-preview">Click to exit Preview Mode</a>
    </div>
  );
};

export default PreviewModeIndicator;
