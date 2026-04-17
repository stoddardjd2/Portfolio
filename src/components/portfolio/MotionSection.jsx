import React from "react";
import { motion } from "framer-motion";

const DEFAULT_VARIANTS = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function MotionSection({
  as: Element = "section",

  delay = 0,
  duration = 1.2,

  active = false,
  autoTrigger = true,
  triggerOnce = true,

  rootMargin = "0px",

  staggerChildren,
  delayChildren,

  // ✅ callback props
  onEnter,           // called when it enters viewport
  onEnterOnce = true, // prevents repeated calls if once=false

  className = "",
  children,
  defaultVariants = DEFAULT_VARIANTS,
  style,
  ...rest
}) {
  const transition = {
    duration,
    delay,
    ease: EASE_OUT,
    ...(staggerChildren != null ? { staggerChildren } : {}),
    ...(delayChildren != null ? { delayChildren } : {}),
  };

  const content = children;
  // For active mode, call onEnter once when it becomes active
  const prevActiveRef = React.useRef(active);
  React.useEffect(() => {
    if (!prevActiveRef.current && active) onEnter?.();
    prevActiveRef.current = active;
  }, [active, onEnter]);

  const didEnterRef = React.useRef(false);
  const handleEnter = React.useCallback(() => {
    if (!onEnter) return;
    if (onEnterOnce && didEnterRef.current) return;
    didEnterRef.current = true;
    onEnter();
  }, [onEnter, onEnterOnce]);

  if (active) {
    return (
      <motion.div
        as={Element}
        initial="hidden"
        animate="visible"
        variants={defaultVariants}
        transition={transition}
        className={className}
        style={style}
        {...rest}
      >
        {content}
      </motion.div>
    );
  }

  if (!autoTrigger) {
    return (
      <motion.div
        as={Element}
        initial="hidden"
        animate="hidden"
        variants={defaultVariants}
        transition={transition}
        className={className}
        style={style}
        {...rest}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      as={Element}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: rootMargin }}
      variants={defaultVariants}
      transition={transition}
      onViewportEnter={handleEnter}   // ✅ fires when it comes into view
      className={className}
      style={style}
      {...rest}
    >
      {content}
    </motion.div>
  );
}
