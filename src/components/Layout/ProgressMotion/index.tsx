import React, { FC } from "react";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { useElementDimensions } from "util/hooks/useElementDimensions";
import { linear, Easing } from "popmotion";

/*
  Props used for animation, exported separately
  for creating reusable "motion presets"
*/
export type ProgressMotionAnimation = {
  transform?: (currentValue) => string;
  opacity?: (currentValue) => number;
  curve?:
    | "cover"
    | "contain"
    | "edge"
    | "edge-in"
    | "edge2"
    | "edge2-in"
    | "edge3-in"
    | "in"
    | "out"
    | "in-out";
  orientation?: "vertical" | "horizontal";
  scrollX?: MotionValue;
  scrollY?: MotionValue;
  ease?: Easing | Easing[];
};

/* Extends with general props for base dom element */
interface ProgressMotionProps extends ProgressMotionAnimation {
  tagName?: string;
  className?: string;
  onClick?: () => any;
  children?: React.ReactNode;
  style?: any;
}

const ProgressMotion: FC<ProgressMotionProps> = ({
  tagName = "div",
  className,
  onClick,
  style = {},
  children,
  transform = () => "none",
  opacity = () => 1,
  curve = "cover",
  orientation = "vertical",
  scrollX = null,
  scrollY = null,
  ease = linear,
}) => {
  const MotionComponent = motion[tagName];

  const { width: viewportWidth = 0, height: viewportHeight = 0 } =
    useWindowSize();
  const [elX, elY, elWidth, elHeight, elRef] = useElementDimensions();
  const { scrollX: vpScrollX, scrollY: vpScrollY } = useScroll();
  const position = orientation === "vertical" ? elY : elX;
  const size = orientation === "vertical" ? elHeight : elWidth;
  const area = orientation === "vertical" ? viewportHeight : viewportWidth;
  const scrollValue: MotionValue<number> =
    orientation === "vertical"
      ? scrollY !== null
        ? scrollY
        : vpScrollY
      : scrollX !== null
      ? scrollX
      : vpScrollX;

  /* 
    CURVES:   | viewport edge   • interpolation   - hold

    cover:    0|•••••••••••|1
    contain:   |0•••••••••1|
    in:       0|•••••1-----|1
    out:      1|-----1•••••|0
    in-out:   0|•••••1•••••|0
    edge:     0|••1-----1••|0
    edge-in:  0|••1--------|
    edge2:    0|•••1---1•••|0
    edge2-in: 0|•••1-------|
    edge3-in:  |0•1--------|

    top:  0: top of element enters bottom of viewport
          1: top of element reaches top of viewport

    Todo:
    - De-couple cover/contain so any curve can be either.
    - Add more curves?
  */

  const curves = {
    cover: { from: [position - area, position + size], to: [0, 1] },
    contain: { from: [position - area + size, position], to: [0, 1] },
    in: {
      from: [position - area, position + size / 2 - area / 2],
      to: [0, 1],
    },
    out: {
      from: [position + size / 2 - area / 2, position + size],
      to: [1, 0],
    },
    "in-out": {
      from: [position - area, position + size / 2 - area / 2, position + size],
      to: [0, 1, 0],
    },
    edge: {
      from: [
        position - area,
        position + size / 2 - area * 0.75,
        position + size / 2 - area * 0.25,
        position + size,
      ],
      to: [0, 1, 1, 0],
    },
    "edge-in": {
      from: [
        position - area,
        position + size / 2 - area * 0.75,
        position + size / 2 - area * 0.25,
        position + size,
      ],
      to: [0, 1, 1, 1],
    },
    edge2: {
      from: [
        position - area + area / 4,
        position + size / 2 - area * 0.6,
        position + size / 2 - area * 0.4,
        position + size,
      ],
      to: [0, 1, 1, 0],
    },
    "edge2-in": {
      from: [
        position - area + area / 4,
        position + size / 2 - area * 0.6,
        position + size / 2 - area * 0.4,
        position + size,
      ],
      to: [0, 1, 1, 1],
    },
    "edge3-in": {
      from: [
        position - area + size,
        position + size / 2 - area * 0.8,
        position + size / 2 - area * 0.4,
        position + size,
      ],
      to: [0, 1, 1, 1],
    },
    top: {
      from: [position - area, position - area * 2],
      to: [0, 0],
    },
  };

  const percentVisible = useTransform(
    scrollValue,
    curves[curve].from,
    curves[curve].to,
    {
      ease: ease,
    },
  );

  // TODO: make this more open-ended
  const transformStyle = useTransform(percentVisible, transform);
  const opacityStyle = useTransform(percentVisible, opacity);

  return (
    <MotionComponent
      className={className}
      onClick={onClick}
      style={{ ...style, transform: transformStyle, opacity: opacityStyle }}
      ref={elRef}
    >
      {children}
    </MotionComponent>
  );
};

export default ProgressMotion;

/* 

Reminder:
Answer https://stackoverflow.com/questions/70522413/access-parent-ref-from-child-for-framer-motion-useelementscroll
if you figure that out!

*/
