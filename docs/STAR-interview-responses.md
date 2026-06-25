# STAR Interview Responses — Full Answers

Human-like, first-person answers written around your actual portfolio experience.
Replace bracketed notes `[like this]` with real numbers or specifics only you know.
For failure and conflict, the framework is real — fill in your actual incident.

---

## 1. Big Impact Project

> "Tell me about a project you worked on that had a significant impact."

**Situation:** I wanted to solve a real problem I kept noticing — most small businesses have genuinely terrible websites, the kind that were built a decade ago and never touched. The opportunity was clear: find these businesses at scale, automatically generate a modern replacement, and make it easy for the owner to adopt it. That became FixMyOldWebsite.

**Task:** I was the sole engineer and product owner, so I had to design and build the entire thing — the data pipeline that discovered businesses, the AI system that generated sites, the multi-tenant infrastructure that hosted them, and the outreach engine that connected it all together.

**Action:** The first thing I did was figure out how to discover businesses reliably without burning through API budget. I built a tile-based geographic scanner on top of the Google Places API — it would divide a region into a grid, scan each tile, deduplicate results, and checkpoint progress so a crash wouldn't restart from scratch. That alone cut API costs by 60 to 80 percent compared to a naive search approach. Once I had leads, I ran Puppeteer and Lighthouse audits across them — but I quickly hit a problem with Chrome at scale: orphaned browser processes were accumulating and eating memory. I built a Chrome lifecycle manager with a process registry and watchdog logic that cleaned up after failed jobs, which cut memory usage by more than half. For site generation, I built a multi-stage AI pipeline using GPT-4 and Google Search to enrich business data, detect the industry vertical, generate content, and optimize SEO — all in under 30 seconds per site. Each generated site ran on its own subdomain with automatic SSL provisioning via DNS validation. Finally I built an outreach system with email and SMS campaigns that included scoring-based logic so we only contacted high-quality leads, with timezone-aware scheduling, A/B testing, and rate limits to keep deliverability healthy.

**Result:** The system was running thousands of audits daily across 50+ parallel workers. Queries across millions of lead records returned in under 200ms because I spent time on MongoDB indexes and geospatial sorting. Most importantly it was a fully operational product — real sites deployed, real outreach sent, real data coming back. It was the most complete system I had built at that point and it sharpened my instincts for distributed work, cost management, and what it actually takes to get AI output into production.

---

## 2. Failure / Mistake

> "Tell me about a time you made a mistake or failed at something."

> ⚠️ Fill in your real incident below. The framework below is built around the most likely failure pattern from your experience — a silent bug in a financial or messaging flow. Swap in what actually happened.

**Situation:** [Early on with Splitify / during a deploy / during a heavy audit run], I shipped a change that [describe what broke — e.g., caused duplicate SMS reminders to go out, missed a timezone edge case in recurring billing, or processed a webhook more than once]. It affected [real users / a specific flow], and I found out through [a user complaint / a spike in costs / monitoring].

**Task:** I was the only engineer, so I owned the fix entirely — diagnosing what happened, stopping ongoing damage, communicating if needed, and making sure it could not happen again.

**Action:** The first thing I did was isolate the scope — I pulled logs and figured out exactly how many users were affected and what state they were in. Then I pushed a hotfix to stop the bleeding. After that I did a proper root cause analysis: I traced back through the code and found that [the webhook had no idempotency check / the cron job ran in server time instead of user time / a retry could trigger the same action twice]. Once I understood it, I fixed it properly — I added idempotency keys to all webhook handlers, stored a record of processed event IDs in MongoDB so replays were no-ops, and added an alert on [cost spike / message volume / error rate] so I would know within minutes if something similar happened again. I also wrote a test case specifically for the scenario that caught me.

**Result:** The issue was resolved, and [describe the outcome — e.g., no user was double-charged, I issued a credit, I reached out directly]. More importantly, the system became meaningfully more robust after it. I now treat idempotency as a first-class requirement for anything that touches money or messaging, not something I add later. That lesson has shaped every payment and scheduling system I have built since.

---

## 3. Conflict with Teammate

> "Tell me about a time you had a disagreement with a teammate or stakeholder."

> ⚠️ The 85ers gives you the most natural setup for this. Fill in what actually happened with the creative/design team.

**Situation:** When I was building The 85ers platform — a cinematic storytelling site for the U.S. Women's National Soccer Team in partnership with Adidas — I was working closely with designers and creative directors who had a strong vision for how the site should feel. At one point, [describe the specific disagreement — e.g., they wanted a scroll-driven animation sequence that I felt would create performance problems on mobile, or they wanted to use a large uncompressed video as the hero that would have significantly hurt load time].

**Task:** My job was to implement their vision faithfully while also being the person responsible for making the site actually perform. Those two things were in tension, and I had to navigate that without just saying no and without silently shipping something broken.

**Action:** Instead of pushing back in the abstract, I built a quick prototype of both approaches and measured them. I showed them side by side — [the design team's preferred version] loaded in [X seconds] on a mid-tier mobile device and had a noticeable jank, while my suggested alternative [describe] maintained the same visual impact with significantly better performance. I framed it not as "your idea is wrong" but as "here's what the user will actually experience — let's find an approach that serves both goals." We ended up [compromising / they agreed to the adjusted approach / I found a third option using Framer Motion with lazy-loaded segments that gave them the feel they wanted without the cost]. I also made sure to keep communicating throughout the build so there were no surprises late in the process.

**Result:** The site shipped with the cinematic quality they needed — scroll-based reveals, dynamic heroes, image sequencing — and it met professional publishing standards for a brand like Adidas. The creative director [describe feedback if you have it]. I came away with a better sense of how to advocate for technical constraints in a way that keeps the creative relationship healthy.

---

## 4. Leadership / Ownership

> "Tell me about a time you took ownership of something beyond your immediate role."

**Situation:** When I founded Splitify I was building a product that handled real money and real users from day one. There was no team, no safety net, and no one else to hand problems off to. I had to function as engineer, product manager, designer, and growth person simultaneously.

**Task:** I needed to ship a working product fast enough to get real feedback, but I was also dealing with constraints that most side projects do not have: third-party financial systems, SMS messaging with real costs, live payments that could not fail silently, and users who would immediately churn if something went wrong.

**Action:** I started by scoping ruthlessly. I identified the smallest version of the product that would let a real group of people split a real bill and get paid back — and I protected that core with the most care. For payments I integrated Stripe and Plaid with proper idempotency from the start, because I had seen what happens when retries are not handled correctly. For SMS I built rate limiting and cost controls into the messaging system before I opened it to users, not after. I built an internal admin dashboard early on — revenue, messaging costs, user activation, abuse signals — because I knew I could not make good decisions without visibility. I also ran paid acquisition experiments through Google Ads to learn what messaging actually drove signups, and I iterated the onboarding flow based on where users were dropping off. Every decision I made I tried to tie back to either retention or cost, because those were the two things that determined whether the product was viable.

**Result:** I shipped the MVP to live users in under a month and kept it running and improving while also running acquisition experiments. [Add real metrics if you have them — revenue, active users, conversion rate.] The experience gave me a concrete understanding of what "ownership" actually means — not just writing good code, but caring about the whole system, including whether users stick around and whether the unit economics make sense.

---

## 5. Ambiguous Problem

> "Tell me about a time you had to solve a problem where the requirements weren't clear."

**Situation:** When I started building the lead generation and outreach system for FixMyOldWebsite, the initial goal was essentially: find businesses that need new websites and reach out to them. That sounds straightforward, but almost nothing about it was actually defined. What counts as a business that "needs" a new website? How do you define geographic coverage? What does a good lead look like versus a waste of time? There was no spec.

**Task:** My job was to take that vague direction and figure out what the system actually needed to do — define the problem well enough that I could build something that would work reliably at scale, not just in the happy path.

**Action:** I started by breaking the ambiguity into smaller, answerable questions. For lead discovery, I asked: what makes geographic coverage complete? That led me to the tile-based scanner approach — I realized that a naive keyword search would give me random density, not systematic coverage, and I would have no way to know what I had missed. So I built a deterministic grid system that guaranteed full coverage within any region, with checkpointing so it could resume after a crash. For lead qualification, I asked: what signals actually predict that a business is a good prospect? I looked at Lighthouse scores, site age, technology stack, and whether the site was even crawlable, and I built a scoring engine that combined those signals into a ranking. For outreach, I asked: what does success look like? That forced me to define conversion — not just whether an email was sent, but whether someone clicked, visited the demo, and engaged with the generated site. I built the analytics to measure all of that from day one so I could iterate on messaging, timing, and targeting.

**Result:** The system ended up running thousands of audits a day with full geographic coverage, no duplicate leads, and crash-safe resume support. The scoring logic gave us a clear signal for which leads were worth prioritizing. More broadly, the process taught me that when a problem is vague, the fastest path forward is usually to turn the vague question into a set of specific, measurable sub-questions and answer them one at a time.

---

## 6. Tight Deadline / Pressure

> "Tell me about a time you worked under significant pressure or a tight deadline."

**Situation:** When I decided to build Splitify, I set myself a hard constraint: get a working product in front of real users within one month. That was not arbitrary — I had seen too many projects stall in polish mode indefinitely, and I wanted to force myself to make real tradeoffs and get real feedback.

**Task:** The challenge was that this was not a toy project. It involved Stripe payments, Plaid bank connections, Telnyx SMS with real costs, and user data I was responsible for protecting. The deadline was self-imposed, but the quality bar was not negotiable — I was not going to ship something that could double-charge someone or leak user data just because I was moving fast.

**Action:** The first thing I did was define the actual MVP: the minimum feature set that would let someone invite people to split a bill, accept payment, and get reminded if they had not paid. Everything else got deferred. I kept a clear list of things I was choosing not to build yet — like analytics, admin tools, and advanced billing options — and I built those after launch. For the things that were in scope, I prioritized correctness first: idempotent payment flows, safe retry logic, proper webhook handling. I also made architectural decisions that were fast to ship but easy to extend — simple data models, clean separation between the core billing logic and the UI, no premature abstraction. I used the time pressure as a filter: if a design decision required more than a couple hours to resolve, I defaulted to the simpler option and moved on.

**Result:** I shipped to real users inside the month. The core payment and messaging flows held up — no double charges, no runaway SMS costs. After launch I had real usage data, which immediately pointed me at things I would never have guessed to prioritize from the outside. The post-launch hardening phase — adding analytics, the admin dashboard, A/B testing for onboarding — was much more focused because I had real signals to work from. The experience reinforced something I now carry into every project: deadlines are a forcing function for good product judgment, and moving fast does not have to mean sacrificing the things that actually matter.

---

## 7. Learning Something Fast

> "Tell me about a time you had to learn something quickly."

**Situation:** When I started building PhotoMax — an app that converts selfies into high-quality dating profile photos — I had never worked deeply with image generation models at production scale. I knew the basic API surface, but I did not know which models would produce results that people would actually pay for, what prompt structures reliably worked, or how to handle the full workflow from upload through generation through delivery in a way that was resilient to failures.

**Task:** I needed to learn enough, fast enough, to build a product users would pay for — not just something that technically worked. The model and prompt decisions were not something I could punt on, because they were the core of the product.

**Action:** I treated learning as a structured experiment rather than just reading documentation. I set up a test harness where I could run the same source images through different models and prompt variations side by side, with consistent evaluation criteria — quality, likeness preservation, realism, and whether the output looked like something you would actually use on a dating profile. I ran a large number of test combinations across the models I had access to and documented what I observed systematically. In parallel I was learning the operational side: how to structure the Stripe webhook flow so a user who paid would always eventually get their photos, how to handle generation failures gracefully with automatic refunds, how to store uploads and outputs in Cloudflare R2 without accumulating orphaned files. I also looked at what other products in the space were doing and reverse-engineered what was working from a user experience perspective.

**Result:** By the time I shipped, I had a well-defined model and prompt combination I had genuine confidence in, a resilient end-to-end pipeline with retry logic and automated refunds on failures, and a multi-step UX that felt polished rather than cobbled together. The structured test approach saved me from shipping a product based on my first impression of the API — the final configuration performed noticeably better than where I started. It also gave me a reusable approach I now use any time I am working with a new AI API: build the test harness first, vary one thing at a time, and measure against real quality criteria.

---

## 8. Improving a System / Performance

> "Tell me about a time you improved the performance or reliability of an existing system."

**Situation:** While running large-scale website audits as part of FixMyOldWebsite, I started seeing memory usage climb continuously on the audit workers. We were running Puppeteer and Lighthouse across tens of thousands of businesses, with 50+ concurrent workers — and over time, the processes were consuming more and more memory without releasing it. Eventually they would get killed by the OS or start swapping, which slowed audits to a crawl and introduced flakiness into an otherwise deterministic pipeline.

**Task:** I needed to diagnose the root cause, fix it without disrupting the audit pipeline, and make the system stable enough to run continuously at scale without manual intervention.

**Action:** The first thing I did was instrument the system properly — I added memory logging at the worker level so I could see exactly when and where allocation was growing. The pattern became clear: Chrome processes were not always terminating cleanly when a job failed or timed out. A network error or a page that hung would cause Puppeteer to abandon the browser without explicitly closing it, and those processes would keep running in the background accumulating memory. I built a Chrome process registry — every browser instance that was launched was registered with a UUID, and a separate watchdog process ran on a short interval and killed any instance that had been running longer than the maximum allowed job duration or that belonged to a job that was no longer active. I also wrapped all Puppeteer launch and teardown logic in a manager class so that cleanup happened in a finally block regardless of how a job ended — success, error, or timeout. Additionally I added a fallback audit mode using a lightweight HTTP-based analysis for sites where the full browser audit was too expensive, which further reduced the pressure on Chrome at scale.

**Result:** Memory usage stabilized and stopped growing over time. The workers could run continuously without needing manual restarts. The Chrome lifecycle changes alone cut memory consumption by more than 50 percent, and the audit pipeline became meaningfully more reliable — fewer jobs timing out, fewer failures from resource exhaustion. It also made the system easier to operate because I was no longer watching memory graphs and babysitting workers manually.

---

## 9. Hard Problem

> "Tell me about the hardest technical problem you have solved."

**Situation:** One of the core challenges in FixMyOldWebsite was running geographic business discovery reliably at scale. The goal was to scan entire regions — cities, counties, entire states — find every business that matched our criteria, deduplicate them, and do it in a way that was both cost-efficient and crash-safe. The Google Places API charges per request, returns at most 20 results per call, and has no built-in concept of "give me everything in this area." A naive approach would either miss businesses, return massive numbers of duplicates, or cost a fortune.

**Task:** I needed to design a scanning system that provided complete, deterministic coverage of any geographic region with no duplicate leads, predictable API cost, and the ability to resume from where it left off after a crash — all while running continuously as part of a larger pipeline.

**Action:** I spent time thinking through the geometry of the problem before writing any code. The key insight was that Places API results are bounded by proximity to a search point — if you place search points close enough together on a grid, you can guarantee that every business in a region falls within the radius of at least one search point. So I built a tile-based scanner: the region is divided into a uniform grid of tiles, each tile has a center point, and the scanner requests nearby businesses for each tile center in sequence. The tile size is calibrated so the search radius covers the tile with overlap, ensuring no gaps. To handle duplicates — which are inevitable when a business is near the border of two tiles — I stored every discovered place ID in MongoDB with a unique index. Any attempt to insert a duplicate is a no-op, so the results set stays clean regardless of overlap. For crash recovery, I persisted the scan state — which tiles had been completed — so a restart would pick up from the next unfinished tile rather than starting over. I also added exponential backoff and fallback logic for API errors so a rate limit or transient failure would not abort the entire run. The result was a scanner that was completely deterministic: given the same region and tile size, it would always produce the same complete set of businesses, regardless of how many times it had been interrupted.

**Result:** The system ran thousands of audits daily across large geographic areas with zero duplicate leads and full crash recovery. The tile-based approach used the API budget predictably — I knew exactly how many requests a region would take before starting, which made cost projections reliable. It was also a design I could hand off to documentation clearly: the logic was explicit and the guarantees were easy to reason about. That kind of determinism in a distributed scraping context was not something I found obvious going in — it took real design work to get there.

---

## Elevator Line

I'm a full-stack engineer and founding engineer who has shipped production AI products and SaaS platforms from zero to real users. I care a lot about reliability, cost, and user experience — not just getting features out the door, but making sure they hold up when real people use them with real money. I have also managed teams in a previous chapter of my career, so I have a practical sense of how engineering decisions connect to business outcomes. I'm looking for a role where I can apply that depth on problems that matter.

---

> **Note:** Metrics and specifics marked with `[brackets]` need to be filled in with numbers you actually measured — volume, revenue, latency, cost, user counts. The STAR structure and narratives around them are based directly on what you have built and shipped.
