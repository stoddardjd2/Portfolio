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

function PortfolioPageV2() {
  return (
    <div className="bg-neutral-950 text-neutral-400 antialiased selection:bg-neutral-800 selection:text-white min-h-screen">
      <NavBar />
      <main id="top" className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <HeroSection />
        <ValueSection />
        <ProjectsSection />
        <ExperienceSection />
        <CaseStudySection />
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          <AboutSection />
          <TestimonialsSection />
        </div>
        <SkillsSection />

        <ContactSection />
      </main>
    </div>
  );
}

export default PortfolioPageV2;
