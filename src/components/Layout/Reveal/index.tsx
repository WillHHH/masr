/* 

  Using <Reveal />
  Tools: https://github.com/civiccc/react-waypoint

  Renders a Waypoint element, expecting one or more children.
  Two methods for animation:
  1 Use the "preset" prop to choose one of the pre-made animations
    Available presets: 'fadeUp', 'fadeLeft', 'clip'
    OR
  2 Pass your own "initialClassName" and a "visibleClassName".
    The "initialClassName" is always present. The "visibleClassName"
    will be applied only when the element has entered the viewport,
    and removed when it exits.

  Usage:
  - Will invoke the "fadeUp" preset by default. Passing in an initialClassName
    will override this - so don't pass in a preset AND an initialClassName.
  - The <Reveal /> component is meant as a "div replacement", feel free to
    use it to wrap any elements you want to animate.
  - Note that the animation is applied to the child/children of the wrapper,
    not the wrapper itself.
  - Accepts a className or inline style object for customization
    of the outer div by the parent component. Use these to style the outer div,
    but note that styles applied to children could conflict with animation styles.
  - Accepts an onEnter or onLeave handler function to fire when
    element enters or exits the viewport, respectively, in case you want
    the parent to react to entry/exit events.
  - Use waypointProps prop to override any/all react-waypoint config.
  - By default, if you pass in multiple children, they will each be animated and
    each given a staggered transition-delay (staggerBy prop, default: 111ms).

*/

import React, { useState, FC } from "react";
import { Waypoint } from "react-waypoint";
import cx from "classnames";
import styles from "./Reveal.module.scss";

export interface Props {
  className?: string;
  style?: any;
  preset?: "fadeUp" | "fadeLeft" | "clip";
  initialClassName?: string;
  visibleClassName?: string;
  children: React.ReactNode;
  waypointProps?: any;
  delay?: number;
  staggerBy?: number;
  onEnter?: () => void;
  onLeave?: () => void;
  exit?: boolean;
}

const Reveal: FC<Props> = ({
  className,
  style,
  preset = "fadeUp",
  initialClassName = "",
  visibleClassName = "",
  onEnter,
  onLeave,
  children,
  waypointProps = {
    topOffset: "10%",
    bottomOffset: "10%",
  },
  delay = 0,
  staggerBy = 111,
  exit = true,
}) => {
  const [visible, setVisible] = useState(false);

  const enter = () => {
    setVisible(true);
    onEnter && onEnter();
  };

  const leave = () => {
    if (exit) {
      setVisible(false);
      onLeave && onLeave();
    }
  };

  const useInitClassName = !!initialClassName
    ? initialClassName
    : styles[`${preset}Init`];

  const useVisibleClassName = !!visibleClassName
    ? visibleClassName
    : styles[`${preset}Visible`];

  return (
    <Waypoint onEnter={enter} onLeave={leave} {...waypointProps}>
      <div
        className={cx(styles.base, className, useInitClassName, {
          [useVisibleClassName]: visible,
          [styles.stagger]: staggerBy > 0,
        })}
        style={{ ...style, transitionDelay: `${delay * staggerBy}ms` }}
      >
        {children}
      </div>
    </Waypoint>
  );
};

export default Reveal;
