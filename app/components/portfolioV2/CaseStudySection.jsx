import React from "react";
import MotionSection from "./MotionSection.jsx";

function CaseStudySection() {
  return (
    <MotionSection className="mb-32" delay={0.16}>
      <div className="rounded-xl border border-neutral-800 bg-gradient-to-b from-neutral-900/50 to-neutral-950 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <span
            className="iconify w-64 h-64 text-white"
            data-icon="lucide:code-2"
          ></span>
        </div>

        <div className="relative z-10">
          <div className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-3">
            Case Study
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-6">
            Reliable Automation in a Real-World SaaS
          </h2>
          <p className="text-neutral-400 max-w-2xl mb-10 text-sm md:text-base leading-relaxed">
            Splitify requires perfect timing. Users need recurring bills,
            automatic reminders, and timezone-accurate due dates - all without
            batching errors or repeated sends.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <CaseItem
              step="1"
              color="red"
              title="The Problem"
              text="Complex date arithmetic caused drift. Users needed local-time accuracy for due dates to prevent phantom late fees or duplicate reminders."
            />
            <CaseItem
              step="2"
              color="blue"
              title="My Approach"
              text="Built pseudo-PST logic for timezone normalization, an idempotent scheduler, and explicit utilities like calculateDueDate and sameOrAfterDay."
            />
            <CaseItem
              step="3"
              color="emerald"
              title="The Impact"
              text="Zero duplicate reminders in production. Billing cycles remain accurate regardless of month length. Participants pay faster with a smoother flow."
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function CaseItem({ step, color, title, text }) {
  const colorClasses = {
    red: "bg-red-500/10 text-red-500",
    blue: "bg-blue-500/10 text-blue-500",
    emerald: "bg-emerald-500/10 text-emerald-500",
  }[color];

  return (
    <div>
      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
        <span
          className={`h-6 w-6 rounded-full ${colorClasses} flex items-center justify-center text-xs`}
        >
          {step}
        </span>
        {title}
      </h4>
      <p className="text-xs text-neutral-500 leading-relaxed">{text}</p>
    </div>
  );
}

export default CaseStudySection;
