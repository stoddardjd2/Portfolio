import React from "react";
import MotionSection from "./MotionSection.jsx";

function ProjectsSection() {
  return (
    <MotionSection id="projects" className="mb-32" delay={0.12}>
      <div className="flex items-end justify-between mb-12">
        <div>
          {/* <h2 className="text-sm font-medium text-white mb-2 uppercase tracking-widest">
            Featured Work
          </h2> */}
          <h3 className="text-2xl font-medium text-white tracking-tight">
            Production Applications
          </h3>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden mb-8">
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-semibold uppercase tracking-wider border border-blue-500/20 mb-3">
                Star Project
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight mb-2">
                Splitify - Automated Bill Splitting
              </h3>
              <p className="text-neutral-400 max-w-xl">
                Solo-built SaaS used by roommates and households to split bills,
                automate reminders, and get paid back without awkward follow-ups.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 px-4 rounded border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <span
                  className="iconify w-4 h-4"
                  data-icon="lucide:external-link"
                ></span>{" "}
                Live Demo
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <span
                  className="iconify w-4 h-4"
                  data-icon="lucide:github"
                ></span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                Key Features Built
              </h4>
              <ul className="space-y-3">
                <FeatureItem text="Dynamic recurring billing engine with custom intervals and timezone awareness." />
                <FeatureItem text="SMS pay-by-link flow via Telnyx so participants do not need accounts." />
                <FeatureItem text="Payment processing via Stripe + Plaid for bank linking." />
                <FeatureItem text="Automated reminder engine with smart retries and logic." />
              </ul>
            </div>
            <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-5">
              <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React 19",
                  "Node.js",
                  "MongoDB",
                  "Stripe",
                  "Telnyx",
                  "Plaid",
                  "Vercel",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded border border-neutral-800 bg-neutral-900 text-xs text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  Admin Dashboard
                </h4>
                <p className="text-xs text-neutral-500">
                  Includes LTV, CAC, user segmentation, and request heatmaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ProjectCard
          title="LTV/CAC Analytics Dashboard"
          icon="lucide:bar-chart-2"
          description="Internal analytics system for measuring Splitify's revenue health. Features metrics for churn, engagement, and server-side pagination with aggregation pipeline optimizations."
          badges={["MongoDB Aggr.", "Express"]}
        />
        <ProjectCard
          title="The 85ers"
          icon="lucide:image"
          description="A creative brand platform featuring dynamic hero layouts, custom motion, and CMS-lite image workflows. Built with a modular component system and high visual polish."
          badges={["Framer Motion", "React"]}
        />
      </div>
    </MotionSection>
  );
}

function FeatureItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm text-neutral-400">
      <span
        className="iconify w-4 h-4 text-blue-400 mt-0.5"
        data-icon="lucide:check"
      ></span>
      <span>
        <strong className="text-neutral-300 font-normal">{text}</strong>
      </span>
    </li>
  );
}

function ProjectCard({ title, icon, description, badges }) {
  return (
    <div className="group p-6 rounded-xl border border-neutral-800 bg-neutral-900/10 hover:border-neutral-700 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white tracking-tight">{title}</h3>
        <span
          className="iconify w-5 h-5 text-neutral-600 group-hover:text-white transition-colors"
          data-icon={icon}
        ></span>
      </div>
      <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="px-2 py-0.5 text-[10px] text-neutral-500 border border-neutral-800 rounded"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
