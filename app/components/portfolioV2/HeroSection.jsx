import React from "react";
// import portraitGrayNoBg from "@/assets/heavily-edited-ultra-white-cropped.png";
import portraitGrayNoBg from "@/assets/heavily-edited-fotor-glasses-white-cropped.png";
import MotionSection from "./MotionSection.jsx";
import { motion } from "framer-motion";
import { TypewriterSections } from "./TypeWriterSections.jsx";

const badgeVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * One place to control ALL timings, in the order they appear.
 * - Keep units consistent (ms for typewriter, seconds for MotionSection delays/durations)
 * - Labels match the exact animated elements below
 */
const TIMING = {
  // 1) Hero wrapper
  heroContainerDelayS: 0.05,

  // 2) Availability pill
  availabilityPillDelayS: 14.9,

  // 3) H1 Typewriter (headline)
  h1TypewriterInitialDelayMs: 100,
  h1TypewriterSpeedMs: 20,
  h1TypewriterEraseSpeedMs: 20,
  h1TypewriterPauseAfterMs: 100,

  // 4) Paragraph wrapper motion (fade/slide in)
  paragraphMotionDelayS: 4.2,
  paragraphMotionDurationS: 1.5,

  // 5) Paragraph Typewriter
  paragraphTypewriterInitialDelayMs: 4400,
  paragraphTypewriterSpeedMs: 7,
  paragraphTypewriterPauseAfterMs: 600,

  // 6) CTA buttons motion group
  ctasMotionDelayS: 0,
  ctasMotionDurationS: 0.7,
  ctasMotionStaggerChildrenS: 0.2,
  ctasMotionDelayChildrenS: 14.2,

  // 7) Badges row motion group
  badgesMotionDelayS: 0.1,
  badgesMotionDurationS: 0.6,
  badgesMotionStaggerChildrenS: 0.1,
  badgesMotionDelayChildrenS: 14.8,

  // 8) Portrait motion
  portraitDelayS: 14,
  portraitDurationS: 2,

  // 9) Scroll indicator motion
  scrollIndicatorDelayS: 15,
  scrollIndicatorDurationS: 1.4,
};

function HeroSection() {
  return (
    <MotionSection
      className="relative min-h-[calc(100vh-56px)] flex justify-center items-center "
      delay={TIMING.heroContainerDelayS}
    >
      <div className="z-10 relative h-full w-full ">
        {/* 2) Availability pill */}
        <MotionSection delay={TIMING.availabilityPillDelayS}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Open to Full-Time Roles &amp; Contract Work
          </div>
        </MotionSection>

        {/* 3) Headline typewriter */}
        <h1 className="text-4xl min-h-[140px] md:text-6xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]">
          <TypewriterSections
            className=""
            initialDelayMs={TIMING.h1TypewriterInitialDelayMs}
            defaultSpeed={TIMING.h1TypewriterSpeedMs}
            defaultEraseSpeed={TIMING.h1TypewriterEraseSpeedMs}
            showCursor={true}
            sections={[
              {
                text: "I Am a Full Stack Developer.",
                mode: "letter",
                retypeText: "I Am More Than Just a Full Stack Developer.",
                pauseAfter: TIMING.h1TypewriterPauseAfterMs,
                breakAfter: [5],
                highlights: {
                  Full: "text-neutral-500",
                  Stack: "text-neutral-500",
                },
              },
            ]}
          />
        </h1>

        {/* 4) Paragraph wrapper motion */}
        <MotionSection
          delay={TIMING.paragraphMotionDelayS}
          duration={TIMING.paragraphMotionDurationS}
          defaultVariants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <p className="text-lg  min-h-[165px] md:text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed font-light">
            {/* 5) Paragraph typewriter */}
            <TypewriterSections
              className=""
              initialDelayMs={TIMING.paragraphTypewriterInitialDelayMs}
              defaultSpeed={TIMING.paragraphTypewriterSpeedMs}
              showCursor={true}
              sections={[
                {
                  text: "Full-stack engineer & founder experienced in production systems and AI-powered workflows.",
                  mode: "letter",
                  pauseAfter: TIMING.paragraphTypewriterPauseAfterMs,
                },
                {
                  text: " I use AI effectively, understand its limitations, and know when manual engineering delivers better precision.",
                  mode: "letter",
                  pauseAfter: TIMING.paragraphTypewriterPauseAfterMs,
                },
                {
                  text: " I have launched real products, giving me UX/UI insight others lack and a proven ability to drive conversions and engagement.",
                  mode: "letter",
                  pauseAfter: TIMING.paragraphTypewriterPauseAfterMs,
                },
                {
                  text: " Scroll down to see how.",
                  mode: "letter",
                  pauseAfter: TIMING.paragraphTypewriterPauseAfterMs,
                },
              ]}
            />
          </p>
        </MotionSection>

        {/* 6) CTA buttons motion group */}
        <MotionSection
          delay={TIMING.ctasMotionDelayS}
          duration={TIMING.ctasMotionDurationS}
          staggerChildren={TIMING.ctasMotionStaggerChildrenS}
          delayChildren={TIMING.ctasMotionDelayChildrenS}
          defaultVariants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a
              variants={{
                hidden: { opacity: 0, x: 0, y: 40, filter: "blur(0px)" },
                visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
              }}
              href="#projects"
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-white text-neutral-950 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              View My Projects
              <span
                className="iconify w-4 h-4"
                data-icon="lucide:arrow-right"
              ></span>
            </motion.a>

            <motion.a
              variants={{
                hidden: { opacity: 0, x: 0, y: 40, filter: "blur(0px)" },
                visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
              }}
              href="#resume"
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors bg-neutral-900/30"
            >
              <span
                className="iconify w-4 h-4"
                data-icon="lucide:download"
              ></span>
              Download Resume
            </motion.a>
          </div>
        </MotionSection>

        {/* 7) Badges row motion group */}
        <MotionSection
          delay={TIMING.badgesMotionDelayS}
          duration={TIMING.badgesMotionDurationS}
          staggerChildren={TIMING.badgesMotionStaggerChildrenS}
          delayChildren={TIMING.badgesMotionDelayChildrenS}
          defaultVariants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <div className="flex items-center gap-6 text-xs font-medium text-neutral-500 uppercase tracking-wide">
            <motion.div
              className="flex items-center gap-2"
              variants={badgeVariants}
            >
              <span className="iconify w-4 h-4" data-icon="lucide:map-pin"></span>{" "}
              US-Based
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              variants={badgeVariants}
            >
              <span className="iconify w-4 h-4" data-icon="lucide:layers"></span>{" "}
              Full-Stack
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              variants={badgeVariants}
            >
              <span className="iconify w-4 h-4" data-icon="lucide:flame"></span>{" "}
              Builder &amp; Founder
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              variants={badgeVariants}
            >
              <span className="iconify w-4 h-4" data-icon="lucide:brain"></span>{" "}
              AI Expert
            </motion.div>
          </div>
        </MotionSection>

        {/* 8) Portrait motion */}
        <MotionSection
          className="absolute bottom-0 z-0 right-0"
          delay={TIMING.portraitDelayS}
          duration={TIMING.portraitDurationS}
          defaultVariants={{
            hidden: { opacity: 0, x: 0, y: 40, filter: "blur(0px)" },
            visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
          }}
        >
          <img
            src={portraitGrayNoBg}
            className="h-[470px] scale-x-[-1]"
            alt="Portrait"
          />
        </MotionSection>
      </div>

      {/* 9) Scroll indicator motion */}
      <MotionSection
        className="flex justify-center absolute bottom-10 left-1/2 -translate-x-1/2 mx-auto"
        delay={TIMING.scrollIndicatorDelayS}
        duration={TIMING.scrollIndicatorDurationS}
        defaultVariants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="w-6 h-10 rounded-full border border-neutral-600/50 flex justify-center py-2">
          <div className="w-1 h-2 bg-neutral-400 rounded-full animate-scroll-wheel"></div>
        </div>
      </MotionSection>
    </MotionSection>
  );
}

export default HeroSection;
