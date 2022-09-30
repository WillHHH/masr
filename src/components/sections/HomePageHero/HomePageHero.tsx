import React, { useRef, useState } from "react";
import cx from "classnames";
import styles from "./HomePageHero.module.scss";
import Button from "components/common/Button/Button";
import Container from "components/Layout/Container";
import { useRouter } from "next/router";
import { HeroTitleTexts } from "./HeroTitleTexts";
import useScrollOffset from "util/hooks/useScrollOffset";
import VideoPlayer from "components/common/VideoPlayer/VideoPlayer";
import { motion } from "framer-motion";
import { getMotionProps } from "util/animation";

type HomePageHeroProps = {
  className?: string;
  href?: string;
  cta?: string;
  image?: string;
  videoId?: string;
  isYoutube?: boolean;
};

const HomePageHero = ({
  className,
  cta,
  image,
  videoId,
  isYoutube,
}: HomePageHeroProps) => {
  const [playerActive, setPlayerActive] = useState(false);

  const { locale } = useRouter();
  const titleTexts = HeroTitleTexts[locale] || HeroTitleTexts["en"];
  const embeddedVideoRef = useRef(null);
  const [offset] = useScrollOffset();
  if (embeddedVideoRef.current) {
    if (offset > 900) {
      embeddedVideoRef.current.pause();
    } else {
      embeddedVideoRef.current.play();
    }
  }

  return (
    <div className={cx(styles.base, className, playerActive && styles.popup)}>
      <Container className={styles.body}>
        <h2 className={styles.title}>
          <div className={styles.align}>
            <motion.div
              className={styles.line1}
              {...getMotionProps({ order: 0 })}
            >
              {titleTexts?.line1}
            </motion.div>
            &nbsp;&nbsp;
            <div className={styles.line2}>{titleTexts?.line2}</div>
          </div>
          <div className={styles.bottom}>
            <motion.h2
              className={styles.line3}
              {...getMotionProps({ order: 1 })}
            >
              {titleTexts?.line3}
            </motion.h2>
            {/* {cta && (
              <motion.div {...getMotionProps({ order: 2 })}>
                <Button
                  className={cx(
                    styles.button,
                    locale === "ar" && styles.arButton,
                  )}
                  onClick={() => setPlayerActive(true)}
                  text={cta}
                  type="box"
                  mode="dark"
                />
              </motion.div>
            )} */}
          </div>
        </h2>
      </Container>
      <div className={styles.videoWrap}>
        <video
          ref={embeddedVideoRef}
          className={styles.video}
          src={image}
          playsInline
          loop
          muted
          autoPlay
        ></video>
      </div>
      {videoId && playerActive && (
        <VideoPlayer
          isYoutube={isYoutube}
          videoId={videoId}
          onClose={() => setPlayerActive(false)}
        />
      )}
      {/* <img
        onClick={() => {
          scrollTo({
            top: 9999,
            left: 0,
            behavior: "smooth",
          });
        }}
        className={styles.scrollToBottom}
        src={`/images/scroll-to-bottom.svg`}
      /> */}
    </div>
  );
};

export default HomePageHero;
