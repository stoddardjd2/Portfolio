import React from "react";
// import portraitGrayNoBg from "@/assets/heavily-edited-ultra-white-cropped.png";
import portraitGrayNoBg from "@/assets/heavily-edited-fotor-glasses-white-cropped.png";
import MotionSection from "./MotionSection.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
import TypewriterText from "./TypeWriterText.jsx";
import { TypewriterSections } from "./TypeWriterSections.jsx";
const badgeVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function HeroSection() {
  return (
    <MotionSection
      className="mb-16 relative min-h-[calc(100vh-128px)] "
      delay={0.05}
    >
      <div className="z-10 relative h-full w-full ">
        <MotionSection delay={12.6}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Open to Full-Time Roles &amp; Contract Work
          </div>
        </MotionSection>

        <h1 className="text-4xl min-h-[140px] md:text-6xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]">
          {/* <TypewriterText
            text="I Am More Than Just a Full Stack Developer"
            mode="letter" // or "letter"
            speed={15} // ms per word/letter
            initialDelay={0} // ms after section appears
            start={true} // could wire this to in-view if needed
            breakAfter={[4]} // inserts <br/> after the 5th word
            highlights={{
              Full: "text-neutral-500",
              Stack: "text-neutral-500",
            }}
          /> */}
          <TypewriterSections
            className=""
            initialDelayMs={100}
            defaultSpeed={30}
            defaultEraseSpeed={20}
            showCursor={true}
            sections={[
              {
                text: "I Am a Full Stack Developer.",
                mode: "letter",
                retypeText: "I Am More Than Just a Full Stack Developer.",
                pauseAfter: 100,
                breakAfter: [5],
                highlights: {
                  Full: "text-neutral-500",
                  Stack: "text-neutral-500",
                },
              },
              // {
              //   text: "Full Stack Developer.",
              //   mode: "letter",
              //   pauseAfter: 300,
              //   highlights: {
              //     Full: "text-neutral-500",
              //     Stack: "text-neutral-500",
              //   },
              // },
            ]}
          />
          {/* I Am More Than Just a <br className="hidden md:block" />
          <span className="text-neutral-500">Full Stack</span> Developer. */}
        </h1>

        <MotionSection
          delay={4.2}
          duration={1.5}
          defaultVariants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <p className="text-lg  min-h-[165px] md:text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed font-light">
            <TypewriterSections
              className=""
              initialDelayMs={4400}
              defaultSpeed={10}
              showCursor={true}
              sections={[
                {
                  text: "Full-stack engineer & founder experienced in production systems and AI-powered workflows.",
                  mode: "letter",
                  pauseAfter: 600,
                },
                {
                  text: " I use AI effectively, understand its limitations, and know when manual engineering delivers better precision.",
                  mode: "letter",
                  pauseAfter: 600,
                },
                {
                  text: " I have launched real products, giving me UX/UI insight others lack and a proven ability to drive conversions and engagement.",
                  mode: "letter",
                  pauseAfter: 600,
                },
                  {
                  text: " Scroll down to see how.",
                  mode: "letter",
                  pauseAfter: 600,
                },
              ]}
            />
          </p> 
        </MotionSection>

        <MotionSection
          delay={0}
          duration={0.7}
          staggerChildren={0.2}
          delayChildren={11.6}
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
        <MotionSection
          delay={0.1}
          duration={0.6}
          staggerChildren={0.1}
          delayChildren={12.1}
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
              <span
                className="iconify w-4 h-4"
                data-icon="lucide:map-pin"
              ></span>{" "}
              US-Based
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              variants={badgeVariants}
            >
              <span
                className="iconify w-4 h-4"
                data-icon="lucide:layers"
              ></span>{" "}
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
      </div>

      <MotionSection
        className="mb-32 absolute top-0 z-0 right-[-50px]"
        delay={12.9}
        duration={2}
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

      <MotionSection
        className="flex justify-center absolute bottom-10 left-1/2 -translate-x-1/2 mx-auto"
        delay={13.6}
        duration={1.4}
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
