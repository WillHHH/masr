import React, { FC } from "react";
import Container, { ContainerProps } from "components/Layout/Container";

import styles from "./Guides.module.scss";
import GridSample from "../GridSample";

type GuideProps = {
  containerPreset?: ContainerProps["preset"];
  showGridSample?: boolean;
};

const Guides: FC<GuideProps> = ({
  containerPreset,
  showGridSample = false,
}) => {
  return (
    <div className={styles.base}>
      <label>Viewport</label>
      <Container preset={containerPreset}>
        <label>Container Padding</label>
        <div className={styles.containerPaddingGuide}>
          <label>Container Interior</label>
          {showGridSample && <GridSample />}
        </div>
      </Container>
    </div>
  );
};

export default Guides;
