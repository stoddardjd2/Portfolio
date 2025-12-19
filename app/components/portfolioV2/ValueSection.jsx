import React from "react";
import { motion } from "framer-motion";
import MotionSection from "./MotionSection.jsx";

const cardReveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const itemVariants = {
  hidden: { opacity: 0, y: 0, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function ValueSection() {
  const cards = [
    {
      icon: "lucide:box",
      title: "End-to-End Product Engineering",
      description:
        "From idea + UX + frontend + backend + deployment. I handle the entire lifecycle efficiently.",
    },
    {
      icon: "lucide:shield-check",
      title: "Highly Reliable System Design",
      description:
        "Background schedulers, payments, SMS, and webhooks designed for fault tolerance.",
    },
    {
      icon: "lucide:message-square",
      title: "Clear Communication",
      description:
        "No blockers, no ambiguity. I keep features moving forward with constant clarity.",
    },
    {
      icon: "lucide:zap",
      title: "AI-Enhanced Development",
      description:
        "I use AI-assisted workflows and deep engineering knowledge to move fast while keeping systems stable and correct.",
    },
  ];

  return (
    <MotionSection
      className="border-t border-dashed border-neutral-800 pt-16"
      delay={0.1}
      duration={1}
      // staggerChildren={0.05}
      // delayChildren={0.1}
    >
      {/* Title */}
      <motion.h3
        variants={itemVariants}
        className="text-2xl font-medium text-white tracking-tight"
      >
        Full-Stack Execution + Founder-Level Ownership
      </motion.h3>

      {/* Paragraph */}
      <motion.p
        variants={itemVariants}
        className="mt-4 max-w-2xl text-neutral-400 font-light mb-12"
      >
        I am not just a developer, I have built and shipped entire SaaS products
        from zero to paying users. I understand engineering, UX, business
        constraints, and real-world reliability.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((c) => (
          <MotionSection
            key={c.title}
            as="div"
            delay={0}
            duration={0.7}
            // ✅ IMPORTANT: override MotionSection's default y:42 so it doesn't fight your card
            // defaultVariants={cardReveal}
          >
            <ValueCard {...c} />
          </MotionSection>
        ))}
      </div>
    </MotionSection>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div
      className="group p-6 rounded-xl border border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 transition-all duration-300"
      style={{ willChange: "transform, opacity, filter" }}
    >
      <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
        <span className="iconify w-5 h-5" data-icon={icon}></span>
      </div>
      <h4 className="text-white font-medium mb-2">{title}</h4>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default ValueSection;
