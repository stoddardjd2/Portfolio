import React from "react";
import { motion } from "framer-motion";

function MotionSection({
  as: Element = "section",
  delay = 0,
  duration = 1.2,
  staggerChildren,
  delayChildren,
  children,
  className = "",
  defaultVariants = {
    hidden: { opacity: 0, y: 42, filter: "blur(2px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  ...rest
}) {
  const MotionTag = motion(Element);

  const transition = {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1],
    ...(staggerChildren || delayChildren
      ? { staggerChildren, delayChildren }
      : {}),
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={defaultVariants}
      transition={transition}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default MotionSection;
