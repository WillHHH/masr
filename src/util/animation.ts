import { Transition } from "framer-motion";

const fadeVariants = {
  hide: {
    opacity: 0,
  },
  appear: {
    opacity: 1,
  },
};

const fadeStaggeredVariants = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.25,
    },
  },
  appear: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.25,
    },
  },
};

export const fadeUpVariants = {
  hide: {
    opacity: 0,
    y: 16,
  },
  appear: {
    opacity: 1,
    y: 0,
  },
};

export const fadeUpStaggeredVariants = {
  hide: {
    opacity: 0,
    y: 32,
  },
  appear: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.25,
    },
  },
};

export const fadeUpStaggeredFastVariants = {
  hide: {
    opacity: 0,
    y: 12,
  },
  appear: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

export const fadeLeftStaggeredFastVariants = {
  hide: {
    opacity: 0,
    x: 12,
  },
  appear: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

export const variants = {
  fade: fadeVariants,
  fadeStaggered: fadeStaggeredVariants,
  fadeUp: fadeUpVariants,
  fadeUpStaggered: fadeUpStaggeredVariants,
  fadeUpStaggeredFast: fadeUpStaggeredFastVariants,
  fadeLeftStaggeredFast: fadeLeftStaggeredFastVariants,
};

export type TransitionOptions = {
  d?: number;
  stagger?: number;
  ease?: string;
};

const defaultTransition: TransitionOptions = {
  d: 1,
  stagger: 0.25,
  ease: "easeOut",
};

export const getTransition = (
  order = 0,
  options: TransitionOptions = {},
): Transition => {
  const opts = {
    ...defaultTransition,
    ...options,
  };
  return {
    duration: opts.d,
    delay: order * opts.stagger,
    ease: opts.ease,
  };
};

type MotionPropOptions = {
  animate?: boolean;
  order?: number;
  variant?: string;
  transition?: TransitionOptions;
};

const defaultMotionPropOptions: MotionPropOptions = {
  animate: true,
  order: 0,
  variant: "fadeUp",
  transition: defaultTransition,
};

export const getMotionProps = (options: MotionPropOptions = {}) => {
  const opts = {
    ...defaultMotionPropOptions,
    ...options,
  };
  return {
    variants: variants[opts.variant],
    initial: "hide",
    animate: opts.animate ? "appear" : "hide",
    exit: "hide",
    transition: getTransition(opts.order, opts.transition),
  };
};

export const ioDefault = {
  triggerOnce: true,
  rootMargin: "0px 0px -20% 0px",
};
