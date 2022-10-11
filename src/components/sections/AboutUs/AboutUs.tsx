import React, { FC, useEffect, useRef, useState } from "react";
import cx from "classnames";
import styles from "./AboutUs.module.scss";
import { motion } from "framer-motion";
import Container from "components/Layout/Container";
import { getMotionProps, ioDefault } from "util/animation";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Button from "components/common/Button/Button";
import SectionTitle, {
  SectionTitleProps,
} from "components/common/SectionTitle/SectionTitle";

type WhatWeDoProps = {
  className?: string;
  items?: any;
};

const AboutUs: FC<WhatWeDoProps & SectionTitleProps> = ({
  className,
  title,
  content,
  items,
}) => {
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [touchMove, setTouchMove] = useState({ start: 0, end: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const frame = () => {
      setContainerWidth(containerRef.current.offsetWidth);
      setWindowWidth(document.body.scrollWidth);
      setLeft(containerRef.current.getBoundingClientRect().left);
    };
    frame();
    let id: number;
    const handleResize = () => {
      cancelAnimationFrame(id);
      setContainerWidth(0);
      setWindowWidth(0);
      setLeft(0);
      id = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  const $sm = 480;
  const maxContainerWidth = 938;
  const cardWidth = containerWidth > $sm ? 480 : containerWidth;
  const gutterWidth = containerWidth > $sm ? 35 : 0;
  const slideWidth = containerWidth > $sm ? cardWidth + gutterWidth : cardWidth;

  const isAtBeginning = () => index < 0;
  const moveLeft = () => {
    if (isAtBeginning()) {
      setIndex(index + 1);
    }
  };

  const fullWidth = items?.length * slideWidth - gutterWidth;

  const numVisible =
    containerWidth > $sm ? Math.floor(containerWidth / slideWidth) : 1;

  const isAtEnd = () =>
    -items?.length + numVisible <
    (containerWidth > maxContainerWidth - 1 ? index - 1 : index);
  const moveRight = () => {
    if (isAtEnd()) {
      setIndex(index - 1);
    }
  };

  const pos =
    index === 0
      ? 0
      : isAtEnd()
        ? index * slideWidth
        : -(fullWidth - containerWidth);

  const slidable = fullWidth > containerWidth;

  const onTouchEnd = () => {
    const { start, end } = touchMove;
    const dis = end - start;
    if (dis === 0) return;
    dis > 0 ? moveLeft() : moveRight();
  };

  const { ref, inView } = useInView(ioDefault);
  const router = useRouter();
  const { locale } = router;

  return (
    <div className={styles.section} ref={ref}>
      <Container className={cx(styles.base, className)}>
        <a id="what-we-do" className={styles.anchor} />
        <SectionTitle
          className={styles.header}
          title={title}
          content={content}
          align="left"
        />
        <div className={cx(styles.arrows)}>
          <Button onClick={moveLeft}>
            <Image
              src="/images/icon-right-arrow-circled.png"
              width="48"
              height="48"
              className={cx(
                styles.arrow,
                styles["arrow-left"],
                !isAtBeginning() && styles.disabled,
              )}
            />
          </Button>
          <Button onClick={moveRight}>
            <Image
              src="/images/icon-right-arrow-circled.png"
              width="48"
              height="48"
              className={cx(
                styles.arrow,
                styles["arrow-right"],
                !isAtEnd() && styles.disabled,
              )}
            />
          </Button>
        </div>
        <motion.div
          ref={containerRef}
          className={styles.slidesWraper}
          {...getMotionProps({ order: 2, animate: inView })}
        >
          <div
            className={slidable ? styles.slidesContainer : undefined}
            style={
              windowWidth >= $sm ? { left: -left, width: windowWidth } : {}
            }
          >
            <motion.div
              className={styles.slides}
              style={
                slidable
                  ? {
                    transform: `translate(${pos + (windowWidth >= $sm ? left : index * 35)
                      }px, 0)`,
                  }
                  : {}
              }
              onTouchStart={(e) =>
                setTouchMove({ start: e.touches[0].clientX, end: 0 })
              }
              onTouchMove={(e) =>
                setTouchMove((state) => ({
                  ...state,
                  ["end"]: e.touches[0].clientX,
                }))
              }
              onTouchEnd={onTouchEnd}
            >
              {items?.map((v, i) => (
                <motion.div
                  key={i}
                  className={cx(styles.slide, locale === "ar" && styles.rtl)}
                >
                  <Image
                    className={styles.img}
                    src={v.filename}
                    alt="pic"
                    layout="fill"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AboutUs;
