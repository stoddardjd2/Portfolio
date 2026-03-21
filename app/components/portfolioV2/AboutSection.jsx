import React from "react";
import MotionSection from "./MotionSection.jsx";

function AboutSection({ role }) {
  return (
    <MotionSection delay={0.18}>
      <h2 className="text-sm font-medium text-white mb-6 uppercase tracking-widest">
        More About Me
      </h2>
      <div className="prose prose-invert prose-sm text-neutral-400">
        <p className="mb-4">
          I’m Jared, a {role.map((word) => word).join(" ")} with hands-on experience
          building and shipping production systems, including AI-powered
          workflows. I focus on creating software that feels intuitive to users
          while remaining precise, reliable, and scalable under the hood.
        </p>
        <p className="mb-4">
          I use AI intentionally, understanding where it accelerates
          development and where manual engineering is required for correctness,
          performance, and long-term maintainability. Having launched real
          products, I bring a strong UX/UI perspective and a practical
          understanding of what drives adoption, engagement, and conversion.
        </p>
        <p>
          I’m looking to join a team where I can apply this product-driven
          mindset, technical depth, and execution speed to meaningful
          engineering challenges.
        </p>
      </div>
    </MotionSection>
  );
}

export default AboutSection;
