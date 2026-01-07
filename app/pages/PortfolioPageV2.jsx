import React from "react";
import NavBar from "../components/portfolioV2/NavBar.jsx";
import HeroSection from "../components/portfolioV2/HeroSection.jsx";
import ValueSection from "../components/portfolioV2/ValueSection.jsx";
import SkillsSection from "../components/portfolioV2/SkillsSection.jsx";
import ProjectsSection from "../components/portfolioV2/ProjectsSection.jsx";
import ExperienceSection from "../components/portfolioV2/ExperienceSection.jsx";
import CaseStudySection from "../components/portfolioV2/CaseStudySection.jsx";
import AboutSection from "../components/portfolioV2/AboutSection.jsx";
import TestimonialsSection from "../components/portfolioV2/TestimonialsSection.jsx";
import ContactSection from "../components/portfolioV2/ContactSection.jsx";
import { useState } from "react";
import ContactModal from "../components/portfolioV2/ContactModal.jsx";
import HeroSectionMobile from "../components/portfolioV2/HeroSectionMobile.jsx";
import { motion, AnimatePresence } from "framer-motion";
function PortfolioPageV2() {
  const [open, setOpen] = useState(false);
  const [highlightsOn, setHighlightsOn] = useState(false);

  return (
    <div className="bg-neutral-950 text-neutral-400 antialiased selection:bg-neutral-800 selection:text-white min-h-screen">
      <NavBar />
      <main
        id="top"
        className="max-w-5xl mx-auto px-5 sm:px-6 pb-4 lg:pb-12 space-y-[clamp(4rem,8vw,8rem)]"
      >
        <div className="hidden md:block">
          <HeroSection />
        </div>
        {/* MOBILE */}
        <div className="md:hidden">
          <HeroSectionMobile />
        </div>

        <ValueSection />
        <ProjectsSection
          highlightsOn={highlightsOn}
          setHighlightsOn={setHighlightsOn}
        />
        <ExperienceSection
          highlightsOn={highlightsOn}
          setHighlightsOn={setHighlightsOn}
        />
        {/* <CaseStudySection /> */}
        <div className="grid lg:grid-cols-2 gap-16">
          <AboutSection />
          <TestimonialsSection />
        </div>
        <SkillsSection />

        <ContactSection setOpen={setOpen} />
      </main>

      {open && <ContactModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}

export default PortfolioPageV2;
