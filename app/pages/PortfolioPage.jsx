import React from "react";

function PortfolioPage() {
  const email = "youremail@example.com";
  const github = "https://github.com/yourhandle";
  const linkedin = "https://www.linkedin.com/in/yourprofile";
  const resumeUrl = "/Jared-Stoddard-Resume.pdf"; // update path

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Max-width wrapper */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        {/* HERO */}
        <header className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
              Full-Stack Engineer & Solo Founder
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              I build fast, scalable,{" "}
              <span className="text-emerald-400">user-focused</span> web
              applications.
            </h1>
            <p className="mt-5 text-pretty text-base text-slate-300 sm:text-lg">
              Full-stack engineer & solo founder specializing in{" "}
              <span className="font-semibold text-slate-100">
                React, Node.js, MongoDB
              </span>{" "}
              and cloud-native architectures. I design, build, and ship
              production-ready software that solves real user problems—from
              frontend UX to backend systems that scale.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-300">
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1">
                Open to Full-Time & Contract
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
                US-Based
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
                Product-Minded
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
              >
                View My Projects
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900/60"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="mt-8 w-full max-w-sm self-start rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl lg:mt-0">
            <h2 className="text-sm font-semibold text-slate-200">
              Snapshot
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-400">Core Stack</dt>
                <dd className="text-right text-slate-100">
                  React, Node.js, Express, MongoDB, Tailwind, Stripe, Telnyx,
                  Plaid
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-400">Highlights</dt>
                <dd className="text-right text-slate-100">
                  Built & shipped complete SaaS (Splitify) as solo founder
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-400">Focus</dt>
                <dd className="text-right text-slate-100">
                  End-to-end product engineering, reliability, and UX
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* WHAT I BRING */}
        <section
          id="value"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                What I Bring
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-50">
                Full-stack execution with{" "}
                <span className="text-emerald-400">founder-level ownership.</span>
              </p>
              <p className="mt-4 text-sm text-slate-300 sm:text-base">
                I’ve built and shipped a real SaaS product (Splitify) from zero
                to paying users. That means I understand engineering, UX,
                product tradeoffs, and the reliability required in production.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ValueCard
                title="End-to-end product engineering"
                body="I take features from idea → UX → frontend → backend → deployment, owning the full lifecycle."
              />
              <ValueCard
                title="Reliable system design"
                body="Background schedulers, payments, SMS flows, and webhooks built to be robust and maintainable."
              />
              <ValueCard
                title="Clear, proactive communication"
                body="I surface tradeoffs early, unblock others quickly, and keep progress transparent."
              />
              <ValueCard
                title="Fast iteration, stable code"
                body="Ship quickly with guardrails—pragmatic testing, metrics, and safe rollouts."
              />
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Skills Snapshot
          </h2>
          <p className="mt-3 text-2xl font-semibold text-slate-50">
            A toolbox shaped by real production work.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <SkillColumn
              title="Frontend"
              items={[
                "React 19, Vite",
                "TailwindCSS, component systems",
                "Responsive layouts & UX patterns",
                "GA4 tracking & analytics hooks",
              ]}
            />
            <SkillColumn
              title="Backend"
              items={[
                "Node.js, Express, REST APIs",
                "Authentication & session flows",
                "Stripe, Telnyx SMS, Plaid",
                "Schedulers, background jobs",
              ]}
            />
            <SkillColumn
              title="Data & Cloud"
              items={[
                "MongoDB, Mongoose, aggregations",
                "Schema design & performance tuning",
                "AWS / Vercel / Cloudflare",
                "CI/CD, Docker, observability",
              ]}
            />
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Selected Projects
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-50">
                Real applications I’ve designed, built, and shipped.
              </p>
            </div>
            <div className="text-sm text-slate-400">
              <span className="font-medium text-slate-200">
                Code & more on GitHub →
              </span>{" "}
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {github.replace("https://", "")}
              </a>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Splitify */}
            <ProjectCard
              label="SaaS • Full Stack • Live"
              name="Splitify — Automated Bill Splitting & Pay-By-Text Platform"
              oneLiner="Solo-built SaaS for roommates and shared households to split bills, automate reminders, and get paid back without awkward follow-ups."
              contributions={[
                "Designed and implemented a full React + Node + Mongo architecture with clean separation of concerns.",
                "Built a dynamic recurring billing engine with custom intervals, timezone-aware scheduling, and robust date utilities.",
                "Implemented SMS pay-by-link flows using Telnyx so participants can pay without creating accounts.",
                "Integrated Stripe and Plaid for card and bank payments, including variable amounts and secure webhooks.",
                "Developed admin analytics dashboards for LTV, CAC, churn, and engagement segmentation.",
                "Shipped marketing pages, pricing, and GA4 tracking to measure acquisition and conversion.",
              ]}
              tech="React 19, Node.js, Express, MongoDB, TailwindCSS, Stripe, Telnyx, Plaid, Vercel, Cloudflare"
              liveUrl="#"
              codeUrl="#"
            />

            {/* LTV/CAC Analytics */}
            <ProjectCard
              label="Internal Tool • Analytics"
              name="LTV/CAC Analytics Dashboard"
              oneLiner="Internal analytics system providing real-time visibility into Splitify’s revenue health and user engagement."
              contributions={[
                "Designed metrics for LTV, CAC, churn, MRR, and user cohorts to inform product and marketing decisions.",
                "Implemented server-side pagination, filtering, and sorting across large datasets using aggregation pipelines.",
                "Optimized MongoDB aggregation steps to keep dashboards fast and responsive under growing data volume.",
              ]}
              tech="React, Node.js, MongoDB Aggregation, TailwindCSS"
            />

            {/* The 85ers */}
            <ProjectCard
              label="Creative Brand • Frontend"
              name="The 85ers — Multimedia Storytelling Platform"
              oneLiner="A visually rich site for storytelling and content, featuring dynamic layouts, modular components, and optimized media."
              contributions={[
                "Built a modular React component system for hero sections, content cards, and events blocks.",
                "Designed a responsive, modern layout with Tailwind, prioritizing readability and strong visual hierarchy.",
                "Implemented image optimization strategies and simple content management patterns for easy iteration.",
              ]}
              tech="React, Vite, TailwindCSS"
            />
          </div>
        </section>

        {/* CASE STUDY */}
        <section
          id="case-study"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Case Study
          </h2>
          <p className="mt-3 text-2xl font-semibold text-slate-50">
            Building reliable automation in a real-world SaaS.
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="space-y-4 text-sm text-slate-300 sm:text-base">
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  The Problem
                </h3>
                <p className="mt-1">
                  Splitify users needed recurring bills, automatic reminders,
                  and timezone-accurate due dates—all without duplicate sends,
                  missed reminders, or confusing behavior when users paid early.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  My Approach
                </h3>
                <p className="mt-1">
                  I designed a timezone-aware scheduler using a “pseudo-PST”
                  world to normalize all date arithmetic. I built dedicated
                  utilities like{" "}
                  <span className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">
                    calculateDueDate
                  </span>
                  ,{" "}
                  <span className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">
                    calculateNextReminderDate
                  </span>{" "}
                  and{" "}
                  <span className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">
                    sameOrAfterDayInTimezone
                  </span>{" "}
                  to keep logic explicit and testable. I also implemented
                  participant-level suppression rules so marking someone as
                  paid immediately stopped future reminders.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  Impact
                </h3>
                <p className="mt-1">
                  The result: no duplicate reminders, accurate billing cycles,
                  and a smoother payment experience. Users just see consistent,
                  predictable behavior while the complexity stays under the
                  hood.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-100">
                System Highlights
              </h3>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Timezone-aware date utilities with consistent behavior in
                    PST and UTC.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Idempotent reminder sending to prevent duplicate messages or
                    race conditions.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Participant-level reminder suppression when a payment is
                    marked as complete.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Clear separation between scheduling logic and UI, making
                    changes safer and easier to reason about.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            About Me
          </h2>
          <p className="mt-3 text-2xl font-semibold text-slate-50">
            A builder at the intersection of engineering, UX, and product.
          </p>
          <div className="mt-4 max-w-3xl space-y-3 text-sm text-slate-300 sm:text-base">
            <p>
              I’m Jared, a full-stack developer who loves building systems that
              feel effortless for users and powerful under the hood. I enjoy
              working where engineering, UX, and real product constraints meet.
            </p>
            <p>
              As a solo founder, I’ve had to be the engineer, designer, and
              product owner. That means I’m comfortable designing flows,
              architecting systems, debugging messy edge cases, and shipping to
              production—all while staying close to the user experience.
            </p>
            <p>
              I’m excited to bring this level of ownership, velocity, and
              product thinking to a team solving meaningful problems at scale.
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Testimonials
          </h2>
          <p className="mt-3 text-2xl font-semibold text-slate-50">
            What people say about working with me.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <TestimonialCard
              quote="Jared delivers far beyond expectations. He takes full ownership of features and ships production-quality work fast."
              name="Product Manager"
              role="SaaS Collaboration"
            />
            <TestimonialCard
              quote="A rare mix of engineering talent, design instinct, and founder-level responsibility. He sees the whole product, not just the code."
              name="Startup Advisor"
              role="Early-Stage Founder Support"
            />
          </div>
        </section>

        {/* RESUME + CONTACT */}
        <section
          id="contact"
          className="mt-16 border-t border-slate-800 pt-12 lg:mt-20 lg:pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Contact
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-50">
                Let’s build something great together.
              </p>
              <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                I’m open to full-time full-stack roles, backend roles, and
                product-focused engineering positions. If you’re building
                something ambitious and need someone who can own features
                end-to-end, I’d love to talk.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                >
                  Email Me
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900/60"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900/60"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-100">
                Resume
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Prefer a traditional overview? Grab the PDF version of my
                experience, skills, and projects.
              </p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Small subcomponents for clarity
function ValueCard({ title, body }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{body}</p>
    </div>
  );
}

function SkillColumn({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  label,
  name,
  oneLiner,
  contributions,
  tech,
  liveUrl,
  codeUrl,
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          {label}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-50">{name}</h3>
      <p className="mt-2 text-sm text-slate-300">{oneLiner}</p>

      <div className="mt-3">
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Key Contributions
        </h4>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
          {contributions.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Tech:</span> {tech}
      </p>

      {(liveUrl || codeUrl) && (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {liveUrl && liveUrl !== "#" && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              View Live
            </a>
          )}
          {codeUrl && codeUrl !== "#" && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 font-semibold text-slate-100 hover:border-slate-400 hover:bg-slate-900/60"
            >
              View Code
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function TestimonialCard({ quote, name, role }) {
  return (
    <figure className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-sm text-slate-200">“{quote}”</p>
      <figcaption className="mt-4 text-sm text-slate-400">
        <span className="font-semibold text-slate-100">{name}</span>{" "}
        <span className="text-slate-500">· {role}</span>
      </figcaption>
    </figure>
  );
}

export default PortfolioPage;
