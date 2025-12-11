import React from "react";

function HeroSection() {
  return (
    <section className="mb-32">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-300 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Open to Full-Time Roles &amp; Contract Work
      </div>

      <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]">
        I Am More Than Just a <br className="hidden md:block" />
        <span className="text-neutral-500">Full Stack</span> Developer.
      </h1>

      {/* <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]">
        I Build Fast, Scalable, <br className="hidden md:block" />
        <span className="text-neutral-500">User-Focused</span> Web Applications.
      </h1>  */}

      {/* <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed font-light">
        Full-stack engineer and solo founder specializing in React, Node.js,
        MongoDB, and cloud-native architectures. I design, build, and ship
        production-ready software that solves real user problems.
      </p> */}
      <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed font-light">
        Full-stack engineer & founder experienced in building production systems
        and AI-powered workflows. I know when AI will help or hinder
        development, and I rely on a deep understanding of software engineering
        fundementals to ensure correctness and reliability.
      </p>
 {/* And mordern UX/UI strategies for increasing conversions and user engagement.  */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-white text-neutral-950 text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          View My Projects
          <span
            className="iconify w-4 h-4"
            data-icon="lucide:arrow-right"
          ></span>
        </a>
        <a
          href="#resume"
          className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors bg-neutral-900/30"
        >
          <span className="iconify w-4 h-4" data-icon="lucide:download"></span>
          Download Resume
        </a>
      </div>

      <div className="flex items-center gap-6 text-xs font-medium text-neutral-500 uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <span className="iconify w-4 h-4" data-icon="lucide:map-pin"></span>{" "}
          US-Based
        </div>
        <div className="flex items-center gap-2">
          <span className="iconify w-4 h-4" data-icon="lucide:layers"></span>{" "}
          Full-Stack
        </div>
        <div className="flex items-center gap-2">
          <span className="iconify w-4 h-4" data-icon="lucide:lightbulb"></span>{" "}
          Product-Minded
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
