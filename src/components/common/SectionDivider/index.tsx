import React, { FC } from "react";
import cx from "classnames";

import styles from "./SectionDivider.module.scss";
import Container from "components/Layout/Container";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getMotionProps, ioDefault } from "util/animation";

type SectionDividerProps = {
  mode?: "light" | "dark";
  spacing?: "none" | "small" | "medium" | "large";
  background?: "none" | "green";
  contain?: boolean;
  hideLine?: boolean;
};

const SectionDivider: FC<SectionDividerProps> = ({
  mode = "light",
  spacing = "medium",
  background = "none",
  contain = true,
  hideLine = false,
}) => {
  const { ref, inView } = useInView(ioDefault);

  return (
    <div
      className={cx(
        styles.base,
        styles[`mode-${mode}`],
        styles[`spacing-${spacing}`],
        background === "green" && styles.greenBackround,
        { [styles.hiddenLine]: hideLine },
      )}
      ref={ref}
    >
      {contain ? (
        <Container>
          <motion.hr {...getMotionProps({ animate: inView })} />
        </Container>
      ) : (
        <motion.hr {...getMotionProps({ animate: inView })} />
      )}
    </div>
  );
};

export default SectionDivider;
