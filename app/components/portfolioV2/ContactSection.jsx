import React from "react";
import MotionSection from "./MotionSection.jsx";

function ContactSection() {

  const now = new Date()
  
  return (
    <MotionSection
      as="footer"
      id="contact"
      className="border-t border-neutral-800 pt-16"
      delay={0.22}
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
        <div>
          <h2 className="text-3xl font-medium text-white tracking-tight mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-neutral-400 mb-8 max-w-md font-light">
            I am open to full-time full-stack roles, backend roles, and
            product-focused engineering positions.
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:email@example.com"
              className="h-10 px-6 rounded bg-white text-neutral-950 text-sm font-medium flex items-center gap-2 hover:bg-neutral-200 transition-colors"
            >
              <span className="iconify w-4 h-4" data-icon="lucide:mail"></span>{" "}
              Email Me
            </a>
            <a
              href="#"
              className="h-10 px-6 rounded border border-neutral-800 text-neutral-300 text-sm font-medium flex items-center gap-2 hover:text-white hover:border-neutral-600 transition-colors"
            >
              <span className="iconify w-4 h-4" data-icon="lucide:linkedin"></span>{" "}
              LinkedIn
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded border border-neutral-800 text-neutral-300 flex items-center justify-center hover:text-white hover:border-neutral-600 transition-colors"
            >
              <span className="iconify w-4 h-4" data-icon="lucide:github"></span>
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-600">(c) {now.getFullYear()} Jared. All rights reserved.</p>
        </div>
      </div>
    </MotionSection>
  );
}

export default ContactSection;
