import React from "react";
import NavBar from "../components/portfolio/NavBar.jsx";
import HeroSection from "../components/portfolio/HeroSection.jsx";
import ValueSection from "../components/portfolio/ValueSection.jsx";
import SkillsSection from "../components/portfolio/SkillsSection.jsx";
import ProjectsSection from "../components/portfolio/ProjectsSection.jsx";
import ExperienceSection from "../components/portfolio/ExperienceSection.jsx";
import CaseStudySection from "../components/portfolio/CaseStudySection.jsx";
import AboutSection from "../components/portfolio/AboutSection.jsx";
import TestimonialsSection from "../components/portfolio/TestimonialsSection.jsx";
import ContactSection from "../components/portfolio/ContactSection.jsx";
import { useState } from "react";
import ContactModal from "../components/portfolio/ContactModal.jsx";
import HeroSectionMobile from "../components/portfolio/HeroSectionMobile.jsx";
import { motion, AnimatePresence } from "framer-motion";
function PortfolioPageV2() {
  const role = (
    new URLSearchParams(window.location.search).get("role") || "Full-Stack Engineer"
  )
    .split(" ");
  const [open, setOpen] = useState(false);
  const [highlightsOn, setHighlightsOn] = useState(false);

  return (
    <div className=" text-neutral-400 antialiased selection:bg-neutral-800 selection:text-white">
      <NavBar />
      <main
        id="top"
        className="max-w-5xl mx-auto px-5 sm:px-6 pb-4 lg:pb-12 space-y-[clamp(4rem,8vw,8rem)]"
      >
        <div className="hidden md:block">
          <HeroSection role={role} />
        </div>
        {/* MOBILE */}
        <div className="md:hidden">
          <HeroSectionMobile role={role} />
        </div>

        <ProjectsSection
          highlightsOn={highlightsOn}
          setHighlightsOn={setHighlightsOn}
        />
        <ExperienceSection
          highlightsOn={highlightsOn}
          setHighlightsOn={setHighlightsOn}
          role={role}
        />
        {/* <CaseStudySection /> */}
        <div className="grid lg:grid-cols-2 gap-16">
          <AboutSection role={role}/>
          
        <ValueSection />

          {/* <TestimonialsSection /> */}
        </div>
        <SkillsSection />

        <ContactSection setOpen={setOpen} />
      </main>

      {open && <ContactModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}

export default PortfolioPageV2;
