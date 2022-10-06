import React, { FC, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import cx from "classnames";
import { motion } from "framer-motion";

import styles from "./LogoAnimationSection.module.scss";
import Container from "components/Layout/Container";
import { Player } from "@lottiefiles/react-lottie-player";
import { variants } from "util/animation";

export type LogoAnimationSectionProps = {
  title: string;
  content: string;
};

const LogoAnimationSection: FC<LogoAnimationSectionProps> = ({
  title,
  content,
}) => {
  const { ref: logoRef, inView: logoInView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -33% 0px",
  });
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -20% 0px",
  });
  const playerRef = useRef<any>();

  useEffect(() => {
    if (logoInView) {
      playerRef.current.play();
    }
  }, [logoInView]);

  return (
    <div className={styles.base}>
      <Container>
        <div className={styles.row}>
          <div className={cx(styles.column, styles.logoColumn)} ref={logoRef}>
            <Player
              ref={playerRef}
              keepLastFrame
              src="/images/logo-animation-data.json"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
          <motion.div
            className={cx(styles.column, styles.contentColumn)}
            ref={contentRef}
            variants={variants.fadeUpStaggered}
            initial="appear"
            animate={contentInView ? "appear" : "hide"}
          >
            <motion.h2
              dangerouslySetInnerHTML={{ __html: title }}
              variants={variants.fadeUpStaggered}
            />
            <motion.div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: content }}
              variants={variants.fadeUpStaggered}
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default LogoAnimationSection;
