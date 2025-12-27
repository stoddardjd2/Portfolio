import React, { useEffect, useRef, useState, useMemo } from "react";
// import portraitGrayNoBg from "@/assets/heavily-edited-ultra-white-cropped.png";
import portraitGrayNoBg from "@/assets/heavily-edited-fotor-glasses-white-cropped.png";
import MotionSection from "./MotionSection.jsx";
import { motion } from "framer-motion";
import { TypewriterSections } from "./TypeWriterSections.jsx";
import downloadResume from "./resumeDownloadHelper.js";

const badgeVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const baseDelay = 10.2;
/**
 * One place to control ALL timings, in the order they appear.
 * - Keep units consistent (ms for typewriter, seconds for MotionSection delays/durations)
 * - Labels match the exact animated elements below
 */

const TIMING = {
  // 1) Hero wrapper
  heroContainerDelayS: 0.05,

  // 3) H1 Typewriter (headline)
  h1TypewriterInitialDelayMs: 100,
  h1TypewriterSpeedMs: 30,
  h1TypewriterEraseSpeedMs: 15,
  h1TypewriterPauseAfterMs: 100,

  // 4) Paragraph wrapper motion (fade/slide in)
  paragraphMotionDelayS: 0,
  paragraphMotionDurationS: 1.5,

  // 5) Paragraph Typewriter
  paragraphTypewriterInitialDelayMs: 800,
  paragraphTypewriterSpeedMs: 20,
  paragraphTypewriterPauseAfterMs: 300,

  // 8) Portrait motion
  // portraitDelayS: baseDelay + 0.1,
  // portraitDurationS: 2,

  // 6) CTA buttons motion group
  ctasMotionDelayS: 0,
  ctasMotionDurationS: 0.7,
  ctasMotionStaggerChildrenS: 0.2,
  ctasMotionDelayChildrenS: 0.3,

  // 7) Badges row motion group
  badgesMotionDelayS: 0.1,
  badgesMotionDurationS: 0.6,
  badgesMotionStaggerChildrenS: 0.1,
  badgesMotionDelayChildrenS: 0.6,

  // 2) Availability pill
  availabilityPillDelayS: 0.9,

  // 9) Scroll indicator motion
  scrollIndicatorDelayS: 2.2,
  scrollIndicatorDurationS: 1.4,
};

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

  const Wrapper = isMobile ? MotionSection : "div";

  const [heroIsFinished, setHeroIsFinished] = useState(false);
  const [heroParagraphIsFinished, setheroParagraphIsFinished] = useState(false);

  const paragraphSections = useMemo(
    () => [
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
        text: " I have shipped real full-stack products end-to-end, building scalable frontends, APIs, and production systems.",
        mode: "letter",
        pauseAfter: TIMING.paragraphTypewriterPauseAfterMs,
      },
      {
        text: " Scroll down to see how.",
        mode: "letter",
        pauseAfter: TIMING.paragraphTypewriterPauseAfterMs,
      },
    ],
    [
      // include only what can change
      TIMING.paragraphTypewriterPauseAfterMs,
    ]
  );

  const HeroContent = (
    <MotionSection
      className="absolute lg:static top-0 bg-neutral-950/90 h-full w-full lg:bg-transparent lg:height-fit"
      delay={TIMING.paragraphMotionDelayS}
      duration={TIMING.paragraphMotionDurationS}
      autoTrigger={false}
      active={heroIsFinished}
      defaultVariants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <p className=" text-md sm:text-lg   min-h-[165px] md:text-xl text-white/75 lg:text-neutral-400 max-w-2xl mb-8 leading-relaxed font-light">
        {/* 5) Paragraph typewriter */}
        <TypewriterSections
          className=""
          initialDelayMs={TIMING.paragraphTypewriterInitialDelayMs}
          defaultSpeed={TIMING.paragraphTypewriterSpeedMs}
          showCursor={true}
          runKey={1} // never restarts
          start={heroIsFinished} // manual trigger (only used when autoTrigger=true)
          onFinish={() => {
            setheroParagraphIsFinished(true);
          }}
          sections={paragraphSections}
        />
      </p>
      {/* 6) CTA buttons motion group */}
      <MotionSection
        delay={TIMING.ctasMotionDelayS}
        duration={TIMING.ctasMotionDurationS}
        staggerChildren={TIMING.ctasMotionStaggerChildrenS}
        delayChildren={TIMING.ctasMotionDelayChildrenS}
        autoTrigger={false}
        active={heroParagraphIsFinished}
        // defaultVariants={{
        //   hidden: { opacity: 0 },
        //   visible: { opacity: 1 },
        // }}
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

          <motion.button
            type="button"
            onClick={downloadResume}
            variants={{
              hidden: { opacity: 0, x: 0, y: 40, filter: "blur(0px)" },
              visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
            }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 h-10 px-6 rounded-md border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors bg-[#0E0E0E]"
          >
            <span
              className="iconify w-4 h-4"
              data-icon="lucide:download"
            ></span>
            Download Resume
          </motion.button>
        </div>
      </MotionSection>

      {/* 7) Badges row motion group */}
      <MotionSection
        delay={TIMING.badgesMotionDelayS}
        duration={TIMING.badgesMotionDurationS}
        staggerChildren={TIMING.badgesMotionStaggerChildrenS}
        delayChildren={TIMING.badgesMotionDelayChildrenS}
        autoTrigger={false}
        active={heroParagraphIsFinished}
      >
        <div className="flex items-center text-white/75 lg w-fit justify-center flex-wrap gap-x-6 gap-y-4 text-xs font-medium lg:text-neutral-500 uppercase tracking-wide">
          <motion.div
            className="flex items-center whitespace-nowrap gap-2"
            variants={badgeVariants}
          >
            <span
              className="iconify w-4 h-4 "
              data-icon="lucide:map-pin"
            ></span>{" "}
            US-Based
          </motion.div>

          <motion.div
            className="flex items-center  whitespace-nowrap gap-2"
            variants={badgeVariants}
          >
            <span className="iconify w-4 h-4" data-icon="lucide:layers"></span>{" "}
            Full-Stack
          </motion.div>

          <motion.div
            className="flex items-center  whitespace-nowrap gap-2"
            variants={badgeVariants}
          >
            <span className="iconify w-4 h-4" data-icon="lucide:flame"></span>{" "}
            Builder &amp; Founder
          </motion.div>

          <motion.div
            className="flex items-center  whitespace-nowrap gap-2"
            variants={badgeVariants}
          >
            <span className="iconify w-4 h-4" data-icon="lucide:brain"></span>{" "}
            AI Expert
          </motion.div>
        </div>
      </MotionSection>
    </MotionSection>
  );

  return (
    <MotionSection
      className="relative min-h-[840px] xxxxs:min-h-[750px] xxxs:min-h-[700px] xs:min-h-[calc(100vh-56px)] h-fit mb-0 flex justify-center items-start lg:items-center pt-20 lg:pt-0"
      delay={TIMING.heroContainerDelayS}
    >
      <div className="relative h-full w-full ">
        {/* 2) Availability pill */}
        <div className="z-10 relative">
          <MotionSection
            autoTrigger={false}
            active={heroParagraphIsFinished}
            delay={TIMING.availabilityPillDelayS}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-300 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Open to Full-Time &amp; Contract Work
            </div>
          </MotionSection>

          {/* 3) Headline typewriter */}
          <h1
            className={`
  text-[clamp(1.3075rem,7.6vw,3.75rem)]
  leading-[1.1]
  font-semibold tracking-tighter text-white
  mb-4 lg:mb-4
  min-h-[calc(2*1.2em)]
`}
          >
            {" "}
            <TypewriterSections
              className=""
              initialDelayMs={TIMING.h1TypewriterInitialDelayMs}
              defaultSpeed={TIMING.h1TypewriterSpeedMs}
              defaultEraseSpeed={TIMING.h1TypewriterEraseSpeedMs}
              // showCursor={true}
              onFinish={() => {
                setHeroIsFinished(true);
                console.log("FINSIHED");
              }}
              runKey={0} // never restarts
              sections={[
                {
                  // text: "I am a full-stack engineer.",
                  text: "I am more than just a full-stack engineer.",
                  skipTypingMain: true,
                  mode: "letter",
                  // retypeText: "I am more than just a full-stack engineer.",
                  pauseAfter: TIMING.h1TypewriterPauseAfterMs,
                  pauseBeforeErase: 1000,
                  breakAfterRetype: [5],
                  breakAfterMain:[5],
                  highlights: {
                    "full-stack": "text-neutral-500",
                    // stack: "text-neutral-500",
                  },
                },
              ]}
              //    sections={[
              //   {
              //     text: "I Am a Full Stack Developer.",
              //     // text: "I Am More Than Just a Full Stack Developer.",
              //     skipTypingMain: true,
              //     mode: "letter",
              //     retypeText: "I Am More Than Just a Full Stack Developer.",
              //     pauseAfter: TIMING.h1TypewriterPauseAfterMs,
              //     pauseBeforeErase: 1000,
              //     breakAfterRetype: [5],
              //     highlights: {
              //       Full: "text-neutral-500",
              //       Stack: "text-neutral-500",
              //     },
              //   },
              // ]}
            />
          </h1>

          {/* 8) Portrait motion */}
          <Wrapper
            {...(isMobile && {
              delay: TIMING.portraitDelayS,
              viewPortTrigger: 0.2,
              duration: TIMING.portraitDurationS,
            })}
            className="lg:absolute  relative  flex pb-10 lg:pb-0 lg:mt-16 items-center justify-center bottom-0 z-0 right-0"
          >
            <img
              src={portraitGrayNoBg}
              className="lg:h-[470px] px-[clamp(.1rem,5vw,12.5rem)] lg:px-0 scale-x-[-1]"
              alt="Portrait"
            />

            {/* 4) Paragraph wrapper motion */}

            {isMobile && HeroContent}
          </Wrapper>
          {!isMobile && HeroContent}
        </div>
      </div>

      {/* 9) Scroll indicator motion */}
      <MotionSection
        className="flex lg:inline hidden justify-center absolute bottom-10 left-1/2 -translate-x-1/2 mx-auto"
        delay={TIMING.scrollIndicatorDelayS}
        duration={TIMING.scrollIndicatorDurationS}
        autoTrigger={false}
        active={heroParagraphIsFinished}
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
