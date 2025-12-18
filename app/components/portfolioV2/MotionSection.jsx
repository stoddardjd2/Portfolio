import React, { useMemo, useRef } from "react";
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

import { useEffect, useState } from "react";

/**
 * Triggers true when at least `px` vertical pixels of the element
 * are visible in the viewport.
 */

function usePxInView(
  ref,
  px = 120,
  { root = null, rootMargin = "0px", once = true } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && inView)) return;

    // Immediate sync check (helps "already visible on load" cases)
    const syncCheck = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const required = Math.min(px, r.height || px);

      return visible >= required;
    };

    if (syncCheck()) {
      setInView(true);
      return;
    }

    // Dense thresholds so intersectionRect updates frequently
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const elH = entry.boundingClientRect.height;

        // If the element is smaller than px, require only its full height
        const requiredPx = Math.min(px, elH || px);

        const visiblePx = Math.max(
          0,
          Math.min(elH, entry.intersectionRect.height)
        );

        if (visiblePx >= requiredPx) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold: thresholds }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [px, root, rootMargin, once, inView]);

  return inView;
}



function MotionSection({
  as: Element = "section",

  // animation
  delay = 0,
  duration = 1.2,

  // PIXEL-BASED trigger
  triggerPx = 200,
  triggerOnce = true,
  rootMargin = "0px",

  staggerChildren,
  delayChildren,

  className = "",
  children,

  defaultVariants = {
    hidden: { opacity: 0, y: 42, filter: "blur(2px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },

  ...rest
}) {
  const ref = useRef(null);

  const isVisible = usePxInView(ref, triggerPx, {
    once: triggerOnce,
    rootMargin,
  });

  const MotionTag = useMemo(() => {
    if (typeof Element === "string") {
      return motionMap[Element] || motion(Element);
    }
    return motion(Element);
  }, [Element]);

  const transition = useMemo(
    () => ({
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      ...(staggerChildren || delayChildren
        ? { staggerChildren, delayChildren }
        : {}),
    }),
    [duration, delay, staggerChildren, delayChildren]
  );

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
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
