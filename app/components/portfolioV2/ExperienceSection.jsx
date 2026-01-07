import React from "react";
import MotionSection from "./MotionSection.jsx";
import { useState } from "react";
function ExperienceSection({ highlightsOn, setHighlightsOn }) {
  return (
    <MotionSection
      id="experience"
      viewPortTrigger={0.1}
      className="scroll-mt-30"
      delay={0.14}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-medium text-white uppercase tracking-widest">
          Experience
        </h2>

        <button
          type="button"
          onClick={() => setHighlightsOn((v) => !v)}
          className={
            "h-8 px-3 rounded border text-[11px] font-medium flex items-center gap-2 transition-colors " +
            (highlightsOn
              ? "border-neutral-700 text-neutral-200 hover:border-neutral-500"
              : "border-neutral-800 text-neutral-400 hover:border-neutral-600")
          }
          aria-pressed={highlightsOn}
        >
          <span
            className="iconify inline-block leading-none text-[14px]"
            data-icon="lucide:highlighter"
            aria-hidden="true"
          />
          {highlightsOn ? "Highlights On" : "Highlights Off"}
        </button>
      </div>
      <div className="space-y-4">
        <ExperienceEntry
          role="Founder / Full-Stack Engineer"
          company="Splitify"
          timeframe="July 2025 – Present"
          highlights={[
            "production SaaS",
            "SMS reminders",
            "recurring billing",
            "timezone-aware",
            "idempotency",
            "admin dashboards",
            "LTV",
            "Google Ads",
            "rapid iteration",
            "MVP",
            "APIs",
            "payments",
            "cost projections",
            "bank linking",
            "paid acquisition",
            "A/B testing",
            "onboarding",
            "automate social media",
          ]}
          highlightsOn={highlightsOn}
          bullets={[
            "Founded and built a platform automating shared expenses, payments, and SMS reminders for live users and real-money transactions.",
            "Shipped an MVP to live users in under one month, balancing rapid iteration with reliability, security, and financial constraints.",
            "Owned the full product lifecycle end-to-end across strategy, UX, frontend, backend APIs, infrastructure, analytics, and growth.",
            "Designed backend systems for recurring billing, timezone-aware scheduling, payment tracking, and reliable message delivery.",
            "Integrated payments, bank linking, and SMS providers with robust error handling, observability, cost controls, and idempotency.",
            "Built fault-tolerant systems and internal admin dashboards for analytics, cost projections, and monitoring suspicious behavior.",
            "Implemented end-to-end analytics across onboarding, activation, payments, conversion, retention, and LTV.",
            "Drove growth through paid acquisition experiments, SEO, A/B testing, and continuous product and UI/UX iteration.",
          ]}
          // bullets={[
          //   "Founded and built a platform automating shared expenses, payments, and SMS reminders to reduce friction in group billing.",
          //   "Shipped an MVP to live users in less than a month, balancing rapid iteration with reliability, security, and real-money constraints.",
          //   "Owned the full product lifecycle end-to-end across strategy, UX, frontend, backend APIs, infrastructure, analytics, and growth.",
          //   "Designed backend systems for recurring billing, timezone-aware scheduling, payment tracking, and reliable message delivery.",
          //   "Integrated payments, bank linking, and SMS providers with robust error handling, observability, and cost controls.",
          //   "Shipped a fault-tolerant system handling live users and real money with safe retries, idempotency, and abuse prevention.",
          //   "Built internal admin dashboards for real-time analytics, cost projections, and monitoring suspicious user behavior.",
          //   "Implemented end-to-end analytics across onboarding, activation, payments, conversion, retention, and LTV.",
          //   "Ran early-stage paid acquisition experiments across channels, iterating on messaging and onboarding to improve activation.",
          //   "Continuously iterated on product features and UI/UX based on user data, support feedback, and insights from production.",
          //   "Built custom software to automate social media content generation, scheduling, and performance tracking.",
          //   "Drove all marketing and growth initiatives, including SEO, Google Ads, A/B testing, analytics, and launch campaigns on major platforms.",
          // ]}
        />

        <ExperienceEntry
          role="Full-Stack Engineer"
          company="the85ers"
          timeframe="Feb 2025  – Present"
          highlights={[
            "Framer Motion",
            "motion-driven",
            "image pipeline",
            "lazy loading",
            "responsive assets",
            "brand-safe",
          ]}
          highlightsOn={highlightsOn}
          bullets={[
            "Collaborated with designers, creative directors, and brand partners, including Adidas, to ship cinematic, motion-driven experiences.",
            "Translated brand and editorial direction into production-ready UI with dynamic heroes, image sequencing, and narrative flow.",
            "Built an image pipeline with responsive assets, lazy loading, and modern formats to meet professional publishing standards.",
            "Implemented custom Framer Motion animation systems for scroll-based reveals and transitions, balancing impact with performance.",
            "Delivered mobile-first, brand-safe implementations meeting quality and consistency standards for professional sports partners.",
          ]}
        />

        <ExperienceEntry
          role="Full-Stack Engineer"
          company="2351 Labs"
          timeframe="Jul 2024 - Feb 2025"
          highlights={[
            "OAuth 2.0",
            "JWT",
            "role access controls",
            "server-side pagination",
            "URL-driven state",
            "MongoDB Atlas",
            "Netlify",
            "Render",
            "white-labeled",
            "internal catalog platform",
            "documentation standards",
            "responsive layouts",
          ]}
          highlightsOn={highlightsOn}
          bullets={[
            "Designed and built a production-grade internal catalog platform to centralize services, libraries, and tooling across teams.",
            "Delivered a white-labeled, themeable UI adaptable to multiple clients and internal brands while maintaining a consistent core system.",
            "Collaborated with product and design partners to define information architecture, discovery flows, and documentation standards.",
            "Implemented server-side pagination, advanced filtering, and URL-driven state to support scalable, shareable dataset views.",
            "Built and enforced security using OAuth 2.0 (Google and Microsoft) with JWT-based role access controls for internal systems.",
            "Owned production deployments and environment configuration across Netlify, Render, and MongoDB Atlas.",
            "Delivered interactive, data-dense UIs with sortable, resizable tables and responsive layouts for desktop and mobile workflows.",
          ]}
        />

        <ExperienceEntry
          role="Department Manager"
          company="Safeway & Kroger"
          timeframe="Apr 2018 - Dec 2023"
          highlights={[
            "department operations",
            "operational efficiency",
            "performance targets",
            "profitability +50%",
            "process optimization",
            "product rotation",
            "replenishment workflows",
            "expired inventory −30%",
            "inventory accuracy +20%",
            "discrepancy analysis",
            "mobile inventory tools",
            "real-time visibility",
            "cross-functional leadership",
            "staffing & prioritization",
            "customer experience",
            "sales outcomes",
          ]}
          highlightsOn={highlightsOn}
          bullets={[
            "Owned end-to-end department operations, managing the team as a system with measurable inputs, outputs, and performance targets.",
            "Improved department profitability by ~50% in the first quarter through process optimization and operational efficiency.",
            "Redesigned product rotation and replenishment workflows, reducing expired inventory loss by approximately 30%.",
            "Increased inventory accuracy by ~20% through structured reporting, discrepancy analysis, and tighter controls.",
            "Streamlined stocking workflows using mobile inventory tools to reduce errors and improve real-time visibility.",
            "Led daily execution for a cross-functional team, balancing staffing, priorities, and time-sensitive workloads.",
            "Maintained high standards for organization and presentation to improve customer experience and sales outcomes.",
          ]}
        />
      </div>
    </MotionSection>
  );
}

/** -------- Highlight helpers -------- */

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, highlights = []) {
  if (!highlights?.length) return text;

  // normalize to patterns
  const patterns = highlights
    .filter(Boolean)
    .map((h) => (h instanceof RegExp ? h.source : escapeRegExp(String(h))))
    .filter(Boolean);

  if (!patterns.length) return text;

  // case-insensitive, avoid partial-word “overhighlight” where possible via boundaries
  const re = new RegExp(`(${patterns.join("|")})`, "gi");

  const parts = String(text).split(re);
  return parts.map((part, i) => {
    const isMatch = i % 2 === 1;
    if (!isMatch) return <React.Fragment key={i}>{part}</React.Fragment>;

    return (
      <mark
        key={i}
        className="rounded-md px-1 py-[1px] bg-neutral-800/60 border border-neutral-700/60 text-neutral-200 not-italic"
      >
        {part}
      </mark>
    );
  });
}
function ExperienceEntry({
  role,
  company,
  timeframe,
  bullets,
  highlights = [],
  highlightsOn = true,
}) {
  return (
    <MotionSection id="projects" className="scroll-mt-30" delay={0.12}>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-4 sm:p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
          <div>
            <p className="text-sm font-semibold text-white">{role}</p>
            <p className="text-sm text-neutral-500">{company}</p>
          </div>
          <p className="text-xs text-neutral-500">{timeframe}</p>
        </div>

        <ul className="space-y-2 text-sm text-neutral-400">
          {bullets.map((item, idx) => (
            <li key={`${company}-${idx}`} className="flex gap-2">
              <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center shrink-0 text-slate-400">
                <span
                  className="iconify block !h-4 !w-4"
                  data-icon="lucide:dot"
                />
              </span>
              <span className="flex-1 min-w-0">
                {highlightsOn ? highlightText(item, highlights) : item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}

export default ExperienceSection;
