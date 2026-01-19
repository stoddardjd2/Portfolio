import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import portraitGrayNoBg from "@/assets/heavily-edited-fotor-glasses-white-cropped.png";
import downloadResume from "./resumeDownloadHelper.js";
import {
  ArrowRight,
  Download,
  MapPin,
  Layers,
  Flame,
  Brain,
} from "lucide-react";
import CompanyBanner from "./CompanyBanner.jsx";

/**
 * ✅ SINGLE SOURCE OF TRUTH (all timings/easing/offsets here)
 * Update these values and EVERYTHING (including portrait + scroll indicator) stays consistent.
 */
const MOTION = {
  // feel
  easeEnter: [0.4, 0, 0.2, 1], // smooth "silky" in-out
  easeHover: [0.2, 0.9, 0.2, 1],

  // shared offsets/blur
  yEnter: 10,
  ySmall: 8,
  blurEnter: 4,

  // orchestration
  staggerChildren: 0.08,
  delayChildren: 0.06,

  // base durations
  durFadeUp: 0.75,
  durFadeIn: 0.8,
  durBadge: 0.65,

  // portrait sequencing
  portraitWrapDelay: 0.12,
  portraitWrapDur: 1.85,
  portraitImgDelay: 0.16,
  portraitImgDur: 0.95,
  portraitImgExtraBlur: 4, // blurEnter + this

  // interactions
  hoverLift: -1,
  tapScale: 0.99,
  hoverDur: 0.25,
  tapDur: 0.15,

  // scroll indicator
  scrollDelay: 0.7,
  scrollDur: 0.7,
};

function makeVariants(m) {
  const blur = (px) => `blur(${px}px)`;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: m.staggerChildren,
        delayChildren: m.delayChildren,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: m.yEnter, filter: blur(m.blurEnter) },
    visible: {
      opacity: 1,
      y: 0,
      filter: blur(0),
      transition: { duration: m.durFadeUp, ease: m.easeEnter },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, filter: blur(m.blurEnter) },
    visible: {
      opacity: 1,
      filter: blur(0),
      transition: { duration: m.durFadeIn, ease: m.easeEnter },
    },
  };

  const badgeItem = {
    hidden: { opacity: 0, y: m.ySmall, filter: blur(m.blurEnter) },
    visible: {
      opacity: 1,
      y: 0,
      filter: blur(0),
      transition: { duration: m.durBadge, ease: m.easeEnter },
    },
  };

  const paragraph = {
    hidden: { opacity: 0, y: m.yEnter, filter: blur(m.blurEnter) },
    visible: {
      opacity: 1,
      y: 0,
      filter: blur(0),
      transition: { duration: 0.75, ease: m.easeEnter, delay: 0.2 },
    },
  };

  // portrait wrap + img as variants (so no inline transition needed)
  const portraitWrap = {
    hidden: { opacity: 0, filter: blur(m.blurEnter) },
    visible: {
      opacity: 1,
      filter: blur(0),
      transition: {
        duration: m.portraitWrapDur,
        ease: m.easeEnter,
        delay: m.portraitWrapDelay,
      },
    },
  };

  const portraitImg = {
    hidden: {
      opacity: 0,
      y: m.yEnter,
      filter: blur(m.blurEnter + m.portraitImgExtraBlur),
    },
    visible: {
      opacity: 0.7,
      y: 0,
      filter: blur(0),
      transition: {
        duration: m.portraitImgDur,
        ease: m.easeEnter,
        delay: m.portraitImgDelay,
      },
    },
  };

  // scroll indicator as variants (controlled at top)
  const scrollIndicator = {
    hidden: { opacity: 0, y: m.yEnter },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: m.scrollDur,
        ease: m.easeEnter,
        delay: m.scrollDelay,
      },
    },
  };

  const hoverLift = {
    whileHover: {
      y: m.hoverLift,
      transition: { duration: m.hoverDur, ease: m.easeHover },
    },
    whileTap: {
      scale: m.tapScale,
      transition: { duration: m.tapDur, ease: m.easeEnter },
    },
  };

  return {
    container,
    fadeUp,
    fadeIn,
    badgeItem,
    portraitWrap,
    portraitImg,
    scrollIndicator,
    hoverLift,
    paragraph,
  };
}

function useIsMobile(breakpointPx = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpointPx);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpointPx]);

  return isMobile;
}

function HeroSection() {
  const isMobile = useIsMobile();

  // stable variants object
  const V = useMemo(() => makeVariants(MOTION), []);

  const HeroContent = (
    <motion.div
      className="absolute lg:static top-0  h-full w-full lg:bg-transparent lg:h-fit"
      variants={V.container}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className="text-md sm:text-lg min-h-[165px] md:text-xl text-white/75 lg:text-neutral-400 max-w-2xl mb-8 leading-relaxed font-light"
        variants={V.paragraph}
      >
        Full-stack engineer &amp; founder experienced in production systems and
        AI-powered workflows. I use AI effectively, understand its limitations,
        and know when manual engineering delivers better precision. I have
        shipped real full-stack products end-to-end, building scalable
        frontends, APIs, and production systems.{" "}
        <span className="text-white/80">Scroll down to see how.</span>
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        variants={V.container}
      >
        <motion.a
          href="#projects"
          variants={V.fadeUp}
          whileHover={{
            y: -4,
            transition: { duration: 0.15, ease: MOTION.easeHover },
          }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-white text-neutral-950 text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          View My Projects
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </motion.a>

        <motion.button
          type="button"
          onClick={downloadResume}
          variants={V.fadeUp}
          whileHover={{
            y: -4,
            transition: { duration: 0.15, ease: MOTION.easeHover },
          }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="inline-flex cursor-pointer items-center justify-center gap-2 h-10 px-6 rounded-md border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors bg-[#0E0E0E]"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Download Resume
        </motion.button>
      </motion.div>

      <div className="mb-8 lg:hidden ">
        <CompanyBanner />
      </div>
      {/* Badges */}
      {/* <motion.div
        className="flex items-center text-white/75 w-fit justify-center flex-wrap gap-x-6 gap-y-4 text-xs font-medium lg:text-neutral-500 uppercase tracking-wide"
        variants={V.container}
      >
        <motion.div className="flex items-center whitespace-nowrap gap-2" variants={V.badgeItem}>
          <MapPin className="w-4 h-4" aria-hidden="true" />
          US-Based
        </motion.div>

        <motion.div className="flex items-center whitespace-nowrap gap-2" variants={V.badgeItem}>
          <Layers className="w-4 h-4" aria-hidden="true" />
          Full-Stack
        </motion.div>

        <motion.div className="flex items-center whitespace-nowrap gap-2" variants={V.badgeItem}>
          <Flame className="w-4 h-4" aria-hidden="true" />
          Builder &amp; Founder
        </motion.div>

        <motion.div className="flex items-center whitespace-nowrap gap-2" variants={V.badgeItem}>
          <Brain className="w-4 h-4" aria-hidden="true" />
          AI Expert
        </motion.div>
      </motion.div> */}
    </motion.div>
  );

  return (
    <motion.div
      className="relative min-h-[840px] mt-[100px] lg:mt-[0px] w-full xxxxs:min-h-[750px] xxxs:min-h-[700px] xs:min-h-[calc(100vh-56px)] xs:min-h-[calc(100dvh-56px)] h-fit mb-0 flex justify-center items-start lg:items-center pt-20 lg:pt-0"
      initial="hidden"
      animate="visible"
      variants={V.container}
    >
      <div className="relative h-full w-full">
        <div className="z-10 relative">
          {/* Availability pill */}
          <motion.div
            className="inline-flex absolute -top-14 items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-300 mb-8"
            variants={V.fadeUp}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Open to Full-Time &amp; Contract Work
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="
              text-[clamp(1.3075rem,7.6vw,3.75rem)]
              leading-[1.1]
              font-semibold tracking-tighter text-white
              mb-4 lg:mb-4
              min-h-[calc(2*1.2em)]
            "
            variants={V.fadeUp}
          >
            I am more than just a
            <br />
            <span className="text-neutral-500">full-stack</span> engineer.
          </motion.h1>

          {/* Portrait (wrap + img both controlled at top via variants) */}
          <motion.div
            className="lg:absolute relative flex pb-10 lg:pb-0 lg:mt-0 lg:translate-y-1/2 bottom-0  lg:bottom-1/2 z-0 right-0"
            variants={V.portraitWrap}
          >
            <motion.img
              src={portraitGrayNoBg}
              className="lg:h-[470px] md:!opacity-20 lg:!opacity-60 px-[clamp(.1rem,5vw,12.5rem)] lg:px-0 scale-x-[-1]"
              alt="Portrait"
              variants={V.portraitImg}
              whileHover={{
                opacity: 0.8,
                transition: { duration: 0.15, ease: MOTION.easeHover },
              }}
            />

            {isMobile && HeroContent}
          </motion.div>

          {!isMobile && HeroContent}
        </div>

        {/* Company Banner */}
        <div className="mb-8 hidden lg:inline absolute left-0 right-0 top-full">
          <CompanyBanner />
        </div>
      </div>

      {/* Scroll indicator (also controlled at top) */}
      <motion.div
        className="flex lg:inline hidden justify-center absolute bottom-4 left-1/2 -translate-x-1/2 mx-auto"
        variants={V.scrollIndicator}
        initial="hidden"
        animate="visible"
      >
        {/* <div className="w-6 h-10 rounded-full border border-neutral-600/50 flex justify-center py-2">
          <div className="w-1 h-2 bg-neutral-400 rounded-full animate-scroll-wheel" />
        </div> */}
      </motion.div>
    </motion.div>
  );
}

export default HeroSection;
