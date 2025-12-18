import React from "react";
import MotionSection from "./MotionSection.jsx";

function TestimonialsSection() {
  return (
    <MotionSection delay={0.2}>
      <h2 className="text-sm font-medium text-white mb-6 uppercase tracking-widest">
        Testimonials
      </h2>
      <div className="space-y-4">
        <TestimonialCard
          quote="Jared delivers far beyond expectations. He takes full ownership of features and ships production-quality work fast."
          source="Senior Engineer"
        />
        <TestimonialCard
          quote="Consistently delivers polished, scalable frontend systems with thoughtful design judgment."
          source="Client Services Lead"
        />
      </div>
    </MotionSection>
  );
}

function TestimonialCard({ quote, source }) {
  return (
    <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/20">
      <p className="text-sm text-neutral-300 italic mb-3">"{quote}"</p>
      <p className="text-xs text-neutral-500 not-italic">- {source}</p>
    </div>
  );
}

export default TestimonialsSection;
