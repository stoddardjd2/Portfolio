import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

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

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const elH = entry.boundingClientRect.height;
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

  // ✅ manual trigger (set true when your function fires)
  active = false,

  // ✅ pixel trigger options (keep these)
  triggerPx = 200,
  triggerOnce = true,
  rootMargin = "0px",
  autoTrigger = true, // set false if you want ONLY manual

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

  const pxVisible = usePxInView(ref, triggerPx, {
    once: triggerOnce,
    rootMargin,
  });

  // ✅ Final gate:
  // - manual active always wins
  // - otherwise fall back to px trigger if enabled
  const isVisible = active || (autoTrigger ? pxVisible : false);

  const MotionTag = useMemo(() => {
    // Keep it safe and simple: strings only (your usage doesn’t need `as`)
    // If you do want `as="div"` etc, you can expand later.
    return typeof Element === "string" ? motion[Element] || motion.section : motion.section;
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
