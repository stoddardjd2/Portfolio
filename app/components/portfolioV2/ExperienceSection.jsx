import React from "react";
import MotionSection from "./MotionSection.jsx";

function ExperienceSection() {
  return (
    <MotionSection id="experience" className="mb-32" delay={0.14}>
      <h2 className="text-sm font-medium text-white mb-8 uppercase tracking-widest">
        Experience
      </h2>
      <div className="space-y-4">
 
        <ExperienceEntry
          role="Founder / Full-Stack Engineer"
          company="Splitify"
          timeframe="2023 – Present"
          bullets={[
            "Founded and built a production SaaS automating shared expenses, payments, and SMS reminders to reduce friction in group billing.",
            "Owned the full product lifecycle end-to-end across strategy, UX, frontend, backend APIs, infrastructure, analytics, and growth.",
            "Designed backend systems for recurring billing, timezone-aware scheduling, payment tracking, and reliable message delivery.",
            "Integrated payments, bank linking, and SMS providers with robust error handling, observability, and cost controls.",
            "Shipped a fault-tolerant system handling live users and real money with safe retries, idempotency, and abuse prevention.",
            "Built internal admin dashboards for real-time analytics, cost projections, and monitoring suspicious user behavior.",
            "Implemented end-to-end analytics across onboarding, activation, payments, conversion, retention, and LTV.",
            "Ran early-stage paid acquisition experiments across channels, iterating on messaging and onboarding to improve activation.",
            "Continuously iterated on product features and UI/UX based on user data, support feedback, and insights from production.",
          ]}
        />

        <ExperienceEntry
          role="Full-Stack Engineer"
          company="the85ers"
          timeframe="2021 - 2023"
          bullets={[
            "Delivered full-stack features for startups, from UX prototypes to production releases.",
            "Implemented payment flows, integrations (Stripe, Telnyx, Plaid), and admin dashboards.",
            "Improved performance and reliability across Node/React stacks.",
          ]}
        />

        <ExperienceEntry
          role="Full-Stack Engineer"
          company="2351 Labs"
          timeframe="2018 - 2021"
          bullets={[
            "Built internal tools, APIs, and dashboards for data-heavy workflows.",
            "Collaborated with design/product to ship user-centric features quickly.",
            "Maintained CI/CD pipelines and deployment automation.",
          ]}
        />
      </div>
    </MotionSection>
  );
}

function ExperienceEntry({ role, company, timeframe, bullets }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
        <div>
          <p className="text-sm font-semibold text-white">{role}</p>
          <p className="text-sm text-neutral-500">{company}</p>
        </div>
        <p className="text-xs text-neutral-500">{timeframe}</p>
      </div>
      <ul className="space-y-2 text-sm text-neutral-400">
        {bullets.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              className="iconify w-4 h-4 text-blue-400"
              data-icon="lucide:dot"
            ></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceSection;
