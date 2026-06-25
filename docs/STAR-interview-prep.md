# STAR Interview Prep (from portfolio experience)

Behavioral interview preparation grounded in projects and roles described on your portfolio. Use **Situation → Task → Action → Result**; reuse the same 4–6 signature stories with different emphasis per prompt.

---

## Story spine (what the site emphasizes)

| Thread | Portfolio angle |
|--------|------------------|
| Founding / ownership | FixMyOldWebsite, Splitify: end-to-end product, infra, growth |
| Scale & reliability | Distributed jobs (atomic claiming, 50+ workers), Chrome lifecycle (memory ↓50%+), tile-based Places scanning (API cost ↓60–80%), idempotent payments/SMS |
| Product + UX | Real-time CMS, live preview, motion-heavy The 85ers, analytics dashboards |
| Enterprise-style internal tools | Scrollos / 2351 Labs: OAuth, RBAC, URL-driven catalog state |
| People leadership (non-tech) | Safeway & Kroger: profitability, waste, inventory accuracy, cross-functional execution |

---

## How to use STAR

1. **Situation** — 1–2 sentences: context and stakes.  
2. **Task** — Your responsibility (not the team’s generic goal).  
3. **Action** — 3–5 concrete steps **you** took (tools, tradeoffs, sequence).  
4. **Result** — Metrics, behavior change, or learning; add reflection if asked.

Reuse stories; only the **angle** changes per question.

---

## Big impact project

**Strong anchors:** FixMyOldWebsite (discovery → site generation → outreach) or Splitify (live users and real-money flows).

### Example angle — FixMyOldWebsite

| | |
|---|---|
| **Situation** | Needed to identify businesses with weak web presence, generate replacement sites, and support outreach at scale. |
| **Task** | Own architecture for multi-tenant hosting, AI/data pipeline, background processing, and cost-aware third-party API usage. |
| **Action** | Multi-stage enrichment (Places/Search/scraping); worker pool with atomic job claiming; Chrome lifecycle management for audits; tile-based geographic scanning to control API cost; MongoDB schemas/indexes for lead scale and query performance. |
| **Result** | Tie to defensible outcomes: e.g. daily audit volume, API/memory savings, query latency targets as you actually measured them. |

---

## Failure / mistake

Not documented on the site — use a **real** incident. Fits your profile:

- Shipping under pressure (Splitify: MVP to live users quickly).  
- Bad assumption in scraping/AI pipeline (rate limits, bad leads, false positives).  
- Retail: ordering, staffing, or process change that failed, then recovered with data.

### STAR shape

What broke → what you owned → **specific** fix (rollback, tests, monitoring, process) → what you do differently now (feature flags, idempotency, checklists — aligned with how you describe Splitify).

---

## Conflict with teammate

Not documented on the site — use a **real** situation.

**Natural fits:**

- **The 85ers:** creative/design direction vs. engineering (motion, performance, deadlines).  
- **2351 Labs / Scrollos:** product/design vs. security, IA, or internal-user needs.  
- **Retail:** standards, scheduling, or cross-functional friction.

### STAR shape

Disagreement on **what/why**, not personalities → shared goal (quality, date, brand safety) → tradeoff or experiment → outcome. Show **disagree and commit** if that applied.

---

## Leadership / ownership

**Two lanes:**

1. **Technical:** Splitify (full lifecycle: strategy, UX, frontend, backend, infra, analytics, growth) or FixMyOldWebsite (platform + workers + cost).  
2. **People/process:** Safeway & Kroger — profitability, waste reduction, inventory accuracy, daily execution.

### Example angle — Splitify

| | |
|---|---|
| **Situation** | Early-stage product with real payments, bank linking, and SMS. |
| **Task** | Own reliability and cost while shipping quickly. |
| **Action** | Idempotent webhooks and safe retries; timezone-aware scheduling; dashboards for cost, abuse, and operations; funnel analytics. |
| **Result** | Metrics you can quote (activation, retention, cost); what you learned running a live system. |

---

## Ambiguous problem

**Fit:** “Find businesses that need sites,” qualify them, automate outreach — fuzzy until you define scoring, coverage, and success metrics.

### STAR angle

Vague initial goal → how you **defined success** (coverage, duplicate rate, cost per lead, conversion) → iterations (scoring, tile-based scanner, campaign rules) → clear “definition of done.”

Vocabulary from your lead/outreach work: deterministic coverage, duplicate prevention, crash-safe resume, dual-worker architecture for stability.

---

## Tight deadline / pressure

**Strong anchor:** Splitify — shipped an MVP to live users **in under one month** (per experience section).

### STAR

Deadline + constraints (security, money, third-party APIs) → how you **scoped** the MVP (defer features, not correctness) → incremental releases → post-launch hardening.

The 85ers supports **creative/partner** deadline pressure (brands, evolving direction).

---

## Learning something fast

**Portfolio hooks:**

- **PhotoMax:** many tests across models and prompt variations — structured experimentation.  
- **New product/stack:** Next.js / React / multi-tenant patterns if you ramped quickly for FixMyOldWebsite.  
- **Integrations:** Stripe, Plaid, Telnyx, Google APIs — docs, edge cases, webhooks.

### STAR

Gap in knowledge → time box → approach (spikes, docs, small proofs) → what shipped → what you’d do faster next time.

---

## Improving a system / performance

**Strong on-site evidence:**

- Chrome lifecycle / process management: **memory reduced by over 50%** (FixMyOldWebsite).  
- Tile-based Places scanning: **60–80% lower API cost**, full coverage, no duplicates, crash recovery.  
- MongoDB: **sub-200ms** filtered queries with indexes; aggregation tuning (internal analytics dashboard).  
- SEO / SSR / CDN — sub-1s page load claims on project card.

Pick **one** change; cite **before/after** with a metric you measured.

---

## Hard problem

**Technical narratives that match your copy:**

- Distributed correctness: atomic MongoDB claiming, parallel workers, separating heavy audits from outreach.  
- Geo + API economics: tile scanner with resume and deduplication.  
- Browser automation at scale: Puppeteer/Lighthouse without leaks or runaway processes.  
- Product logic: e.g. meal planner — ingredient normalization, macros, list aggregation.

### STAR

Why naive approach fails → constraints → design → failure modes handled → measurable outcome.

---

## Elevator line (optional)

Full-stack / founding engineer who ships **production AI and SaaS**, optimizes for **cost, reliability, and UX**, with **operational leadership** experience from retail management.

---

## Themes to mirror (testimonials / about)

- Full ownership; production quality; fast shipping.  
- Clear communication; intentional use of AI; product-driven mindset.

---

## Credibility note

STAR answers should survive follow-up questions. Use **exact metrics** only when true; otherwise use careful ranges or qualitative outcomes you can explain.
