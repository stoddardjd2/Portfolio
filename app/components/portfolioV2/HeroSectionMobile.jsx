import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import portraitGrayNoBg from "@/assets/portrait/7-final-glasses-mirrored.png?format=webp&quality=70&as=src";
import downloadResume from "./resumeDownloadHelper.js";
import CompanyBanner from "./CompanyBanner.jsx";
import { ArrowRight, Download, MapPin, Layers, Flame, Brain } from "lucide-react";

/**
 * ✅ SINGLE SOURCE OF TRUTH for all motion timing/easing (including image).
 * Adjust values here and the whole hero updates consistently.
 */
const MOTION = {
  easeEnter: [0.4, 0, 0.2, 1], // silky in-out
  easeHover: [0.2, 0.9, 0.2, 1],

  // staggering
  staggerChildren: 0.08,
  delayChildren: 0.06,

  // shared "feel"
  blurEnterPx: 4,
  yEnterPx: 10,
  yBadgePx: 8,

  // durations
  durFadeUp: 0.75,
  durFadeIn: 0.8,
  durBadge: 0.65,

  // portrait sequencing
  portraitWrapDelay: 0,
  portraitWrapDur: 0.85,
  portraitDelay: 0.16,
  portraitDur: 0.95,

  // interactions
  hoverLiftPx: -1,
  tapScale: 0.99,
  hoverDur: 0.25,
  tapDur: 0.15,
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
    hidden: { opacity: 0, y: m.yEnterPx, filter: blur(m.blurEnterPx) },
    visible: {
      opacity: 1,
      y: 0,
      filter: blur(0),
      transition: { duration: m.durFadeUp, ease: m.easeEnter },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, filter: blur(m.blurEnterPx) },
    visible: {
      opacity: 1,
      filter: blur(0),
      transition: { duration: m.durFadeIn, ease: m.easeEnter },
    },
  };

  const badgeItem = {
    hidden: { opacity: 0, y: m.yBadgePx, filter: blur(m.blurEnterPx) },
    visible: {
      opacity: 1,
      y: 0,
      filter: blur(0),
      transition: { duration: m.durBadge, ease: m.easeEnter },
    },
  };

  const portraitWrap = {
    hidden: { opacity: 0, filter: blur(m.blurEnterPx) },
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
    hidden: { opacity: 0, y: m.yEnterPx, filter: blur(m.blurEnterPx) },
    visible: {
      opacity: 0.7,
      y: 0,
      filter: blur(0),
      transition: {
        duration: m.portraitDur,
        ease: m.easeEnter,
        delay: m.portraitDelay,
      },
    },
  };

  const paragraph = {
    hidden: { opacity: 0, y: m.yEnterPx, filter: blur(m.blurEnterPx) },
    visible: {
      opacity: 1,
      y: 0,
      filter: blur(0),
      transition: { duration:0.75, ease: m.easeEnter, delay: 0.3 },
    },
  };

  const hoverLift = {
    whileHover: {
      y: m.hoverLiftPx,
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

function HeroSectionMobile({ role = ["full-stack", "engineer"] }) {
  const isMobile = useIsMobile();

  // keep variants stable
  const V = useMemo(() => makeVariants(MOTION), []);

  return (
    <motion.div
      className="relative min-h-[840px] xxxxs:min-h-[750px] xxxs:min-h-[700px] xs:min-h-[calc(100vh-56px)] h-fit flex justify-center items-start pt-20"
      initial="hidden"
      animate="visible"
      variants={V.container}
    >
      
      <div className="relative h-full w-full">
      
        {/* Availability pill */}
        <motion.div className=" mb-4" variants={V.fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Open to Full-Time &amp; Contract Work
          </div>
        </motion.div>
        {/* Headline */}
        <motion.h1
          variants={V.fadeUp}
          className="
            text-[clamp(1.3075rem,9vw,3.75rem)]
            leading-[1.1]
            font-semibold tracking-tighter text-white
            mb-6
            min-h-[calc(2*1.2em)]
          "
        >
          I am more than just a <br />
          <span className="text-neutral-500">{role?.[0]}</span>
          {role?.[1] ? ` ${role[1]}` : ""}.
        </motion.h1>

        {/* Portrait (fully controlled via MOTION + variants above) */}
        <motion.div
          className="flex justify-center mb-8"
          variants={V.portraitWrap}
        >
            <motion.img
              src={portraitGrayNoBg}
              className="w-full md:!opacity-20 lg:!opacity-80  lg:px-0 !grayscale contrast-150 brightness-100"
              alt="Portrait"
              variants={V.portraitImg}
              whileHover={{
                opacity:0.8,
                transition: { duration: 0.15, ease: MOTION.easeHover },
              }}
            />
        </motion.div>

        {/* Paragraph */}
        <motion.p
          variants={V.paragraph}
          className="text-md sm:text-lg min-h-[165px] md:text-xl text-white/75 max-w-2xl mb-8 leading-relaxed font-light mx-auto "
        >
          {role.map((word) => word).join(" ")} experienced in production
          systems and AI-powered workflows. I use AI effectively, understand
          its limitations, and know when manual engineering delivers better
          precision. I have shipped real full-stack products end-to-end,
          building scalable frontends, APIs, and production systems.{" "}
          <span className="text-white/80">Scroll down to see how.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col lg:flex-row justify-center gap-4 mb-10"
          variants={V.container}
        >
          <motion.a
            href="#projects"
            variants={V.fadeUp}
            {...V.hoverLift}
            className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-white text-neutral-950 text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            View My Projects
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.button
            type="button"
            onClick={downloadResume}
            variants={V.fadeUp}
            {...V.hoverLift}
            className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors bg-[#0E0E0E]"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Company Banner */}
        <div className="">
          <CompanyBanner centerOnMobile={true} />
        </div>

        {/* Badges */}
        {/* <motion.div
          className="flex items-center justify-center flex-wrap gap-x-6 gap-y-4 text-xs font-medium uppercase tracking-wide text-neutral-500"
          variants={V.container}
        >
          <motion.div
            className="flex items-center gap-2"
            variants={V.badgeItem}
          >
            <MapPin className="w-4 h-4" />
            US-Based
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            variants={V.badgeItem}
          >
            <Layers className="w-4 h-4" />
            Full-Stack
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            variants={V.badgeItem}
          >
            <Flame className="w-4 h-4" />
            Builder &amp; Founder
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            variants={V.badgeItem}
          >
            <Brain className="w-4 h-4" />
            AI Expert
          </motion.div>
        </motion.div> */}

      </div>
    </motion.div>
  );
}

export default HeroSectionMobile;
