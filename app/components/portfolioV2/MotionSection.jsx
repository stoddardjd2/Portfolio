import React, { useMemo } from "react";
import { motion } from "framer-motion";

const motionMap = {
  section: motion.section,
  div: motion.div,
  footer: motion.footer,
  header: motion.header,
  main: motion.main,
  article: motion.article,
  nav: motion.nav,
  aside: motion.aside,
};

function MotionSection({
  as: Element = "section",
  delay = 0,
  duration = 1.2,
  viewPortTrigger = 0.4,
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
  // ✅ stable component type across renders
  const MotionTag = useMemo(() => {
    if (typeof Element === "string") return motionMap[Element] || motion(Element);
    // If Element is a React component, create once per Element reference
    return motion(Element);
  }, [Element]);

  const transition = useMemo(() => {
    return {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      ...(staggerChildren || delayChildren
        ? { staggerChildren, delayChildren }
        : {}),
    };
  }, [duration, delay, staggerChildren, delayChildren]);

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewPortTrigger }}
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
