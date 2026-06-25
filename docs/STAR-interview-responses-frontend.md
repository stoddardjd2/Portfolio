# STAR Interview Responses — Frontend Role

Full, first-person answers framed around UI/UX, component architecture, performance,
animation, and frontend engineering. Same real experience, different emphasis.

Replace `[brackets]` with specific numbers you actually measured.

---

## 1. Big Impact Project

> "Tell me about a frontend project you're proud of."

**Situation:** The 85ers was a cinematic storytelling platform built in partnership with Adidas for the U.S. Women's National Soccer Team. The design team had an editorial vision — dynamic hero sequences, narrative pacing, full-bleed photography, motion-driven section reveals — and the bar was set by professional sports brands. This was not a landing page; it needed to feel like a production-quality digital editorial experience.

**Task:** I was the sole frontend developer. My job was to take Figma designs and creative direction from a team of designers and creative directors and translate them into a live site that matched the visual and motion fidelity they expected while also performing well on mobile and meeting the quality standards of partners like Adidas and Seattle Reign FC.

**Action:** I started by building a modular component system that matched the editorial structure — a set of flexible section types that could be composed into any page layout without one-off hacks. This made it fast to add new content and iterate without breaking existing pages. For motion, I built a custom Framer Motion system with scroll-based triggers, staggered reveals, and section transitions calibrated to feel cinematic without feeling gimmicky. I used a shared config for all timing and easing values so the motion language was consistent across the whole site. For images, I built a pipeline using modern formats, responsive srcset attributes, and lazy loading so the site held up on slower connections and mobile devices where the photography was doing a lot of visual work. I also implemented mobile-first layouts throughout — the designs were inherently desktop-forward, so I had to think carefully about how each section collapsed and reordered on smaller screens without losing the editorial feel.

**Result:** The site shipped with the cinematic quality the creative team needed and was deployed live at the85ers.org. It met the quality and consistency standards required to carry Adidas and USWNT branding. The creative director described it as matching their vision closely, which in a brand-partner context is genuinely the success metric. The modular component architecture also made the ongoing content additions straightforward — new pages could be composed quickly from the existing section library.

---

## 2. Failure / Mistake

> "Tell me about a time you made a mistake on the frontend."

> ⚠️ Framework grounded in your experience. Fill in the real incident.

**Situation:** [During The 85ers build / a Splitify UI release / a FixMyOldWebsite CMS update], I shipped a change that [describe — e.g., caused a layout to break on a specific viewport range I had not tested, introduced a motion jank on iOS Safari, caused a form to submit without proper validation, or broke a live preview sync in the CMS]. I found out [when the client flagged it / a user reported it / I noticed it during a review].

**Task:** I owned the fix entirely — diagnosing the exact failure, pushing a correction, and figuring out what I missed in my process so it would not happen again.

**Action:** First I reproduced it reliably across the affected environment — [Safari on iOS / a specific viewport / a specific user flow]. Once I could reproduce it consistently, the root cause became clear: [describe — e.g., I had used a CSS property that Safari handles differently, a Framer Motion variant was conflicting with a CSS transform applied by Tailwind, a state update was triggering a re-render at the wrong point in the form lifecycle]. I pushed a targeted fix and verified it across the devices and browsers I should have tested originally. Then I looked at my QA process: I had been testing primarily in Chrome on desktop and only spot-checking mobile. I added a browser and device checklist to my review process so Safari, Firefox, and a mid-tier Android device were always covered before a deploy. I also started using browser dev tools to throttle the network and CPU when testing anything that involved image loading or animation, because that is where mobile problems hide.

**Result:** The issue was resolved quickly and [describe the outcome — the client / creative director / users were not significantly impacted]. More importantly I closed a real gap in my process. That checklist is now a habit — I do not consider something done until I have verified it on Safari mobile, because that is consistently where frontend behavior diverges from what Chrome shows.

---

## 3. Conflict with Teammate

> "Tell me about a time you disagreed with a designer or stakeholder."

**Situation:** During The 85ers project, the creative team wanted a specific hero section to use a large, full-resolution video as the background — an autoplaying loop that anchored the visual energy of the page. The effect looked stunning in their mockup. But when I implemented it and tested it on an actual mobile device on a realistic network, the result was a multi-second blank before the video started playing, and on lower-end devices the animation performance degraded noticeably.

**Task:** I needed to raise this concern clearly without dismissing the creative vision, and I needed to come back with an alternative that preserved what they were actually after — the sense of motion and cinematic weight — rather than just saying no.

**Action:** I built two versions and put them side by side for the team to see. Version one was the original video implementation; I screen-recorded it on a mid-tier mobile device on a throttled network to show what a real user would experience. Version two used a high-quality poster image with a layered Framer Motion overlay that created a parallax scroll effect and a subtle ken-burns animation on the image — it gave a very similar sense of motion and visual depth without any of the video loading latency. I framed the conversation around the user experience: the goal was to make people feel the energy of the brand immediately, and a blank screen for three seconds was doing the opposite. I also offered a hybrid — the video could load lazily after the poster had rendered and swap in once it was ready, so returning visitors on good connections would eventually see the full effect.

**Result:** We went with the hybrid approach. The poster with the motion overlay shipped immediately and the video loaded in behind it on capable connections. The creative team felt the brand impact they were after, and the site held up on mobile without the loading issue. I came away with a better framework for having these conversations: show the problem visually, lead with the shared goal, and bring an alternative rather than just a constraint.

---

## 4. Leadership / Ownership

> "Tell me about a time you took ownership of the frontend beyond just writing code."

**Situation:** At 2351 Labs I was brought in to build an internal catalog platform — Scrollos — that would centralize services, libraries, and tooling for an organization with multiple clients and internal brands. There was no existing component system, no established IA, and the product direction was still being defined when I started.

**Task:** I was responsible for the entire frontend — not just implementation, but the information architecture, the design system, the interaction patterns, and the decisions about how the catalog would actually work for users doing real discovery and documentation work.

**Action:** I started by understanding the use case deeply before writing any UI. I talked through workflows with the product and design partners: how does someone find an unfamiliar service? What does a developer need to see on a library detail page? How often do people update documentation, and what would make that feel low-friction? Those conversations shaped the IA — centralized catalog with advanced filtering, URL-driven state so views were shareable and reproducible, and inline documentation editing with change history so updates felt as lightweight as possible. On the component side, I built a consistent, themeable system that could be white-labeled across multiple clients. The tables were sortable and resizable with draggable column widths — something that required real custom implementation rather than a drop-in library — and they worked correctly on mobile. I also owned production deployments across Netlify, Render, and MongoDB Atlas, and handled OAuth integration with both Google and Microsoft for authentication. I treated the frontend as a product, not a deliverable — if something felt confusing to use, I flagged it and proposed an alternative rather than just building exactly what was spec'd.

**Result:** The platform shipped as a production-grade internal tool with role-based access, multi-client theming, and a scalable data browsing experience. Collaborators described the result as polished and consistent. The URL-state approach in particular proved useful — users could share filtered catalog views directly, which became a meaningful workflow improvement for their team.

---

## 5. Ambiguous Problem

> "Tell me about a time you had to figure out what to build when requirements weren't clear."

**Situation:** When I was building the real-time visual CMS for FixMyOldWebsite, the goal was defined loosely: business owners should be able to "customize their AI-generated site without coding." That is a direction, not a spec. There was no existing system to reference, no user research to pull from, and the AI-generated sites themselves were dynamic — structure, content, and layout varied by business type. I had to define what "customization" actually meant in that context before I could build it.

**Task:** I needed to design and implement a CMS that was genuinely no-code, worked across variable site structures, and gave users a live sense of what they were editing — all without a design spec or a precedent to follow.

**Action:** I started by listing every type of edit a business owner would realistically need: update the business name or tagline, change a color or font, swap a photo, reorder sections, update contact info. Then I grouped those by complexity and decided on the editing model: rather than a traditional form-based CMS where you fill in fields and click preview, I wanted inline editing — click a thing, change a thing, see it update immediately. That dictated the architecture: the CMS and the site preview had to share the same rendering logic. I built a versioned content model in MongoDB so every save was non-destructive and users could revert. The live preview ran inside an iframe with a WebSocket connection so content changes in the editor reflected in the preview in real time without a full reload. I also built a diff-based change indicator so users could see what had changed before publishing. The hardest part was making the inline editing feel natural across different content types — text, images, color themes — without exposing the underlying data structure to the user.

**Result:** The CMS shipped as a no-code editor where business owners could make meaningful customizations to their AI-generated site without any technical knowledge. The real-time preview with live updates was the piece I was most satisfied with — it made the experience feel immediate and trustworthy rather than abstract. Defining the problem clearly first — what does "customize" actually mean, what is the mental model, what is the editing unit — saved me from building something technically correct that users would not have understood how to use.

---

## 6. Tight Deadline / Pressure

> "Tell me about a time you delivered under a tight deadline."

**Situation:** The 85ers had a hard launch window tied to external partners — Adidas, Seattle Reign FC, USWNT. That kind of partner deadline is non-negotiable; missing it would have had real relationship and PR consequences for the organization, not just an inconvenient delay. At the same time the creative direction kept evolving right up until the final stretch, which is normal for editorial work but compresses the implementation window significantly.

**Task:** I needed to ship a production-quality, motion-rich, brand-safe site on a fixed date while absorbing creative changes that came in late — without letting the deadline become an excuse to cut quality corners that would be visible to a professional sports audience.

**Action:** The first thing I did was separate the stable parts of the build from the parts that were likely to change. The page structure, component architecture, image pipeline, and animation system I built early and treated as locked. The specific copy, images, and section ordering I kept flexible until late in the process, because I expected those to shift. That separation meant I could absorb a late content change without it destabilizing the whole build. When new creative direction came in I would assess it against two questions: does this require a new component type, or is it a configuration of something I already have? If it was a new pattern I had not built, I built it quickly and generalized it so it could be reused. I also kept close communication with the creative team so I knew what was coming rather than getting surprised — weekly syncs and async Figma comments so there were no late-breaking unknowns. When we got close to the deadline I did a full pass across breakpoints and browsers to catch anything that needed a fix before launch.

**Result:** The site launched on schedule. The motion design, typography, image sequencing, and responsive behavior all held up under real traffic and professional review. The creative team and brand partners were satisfied with the quality. The experience reinforced how much the upfront component architecture decision matters when you are under deadline pressure — a well-structured system absorbs change much more gracefully than a collection of one-off implementations.

---

## 7. Learning Something Fast

> "Tell me about a time you had to pick up a new technology or skill quickly."

**Situation:** When I started The 85ers project, Framer Motion was a library I had used for basic fade-ins and simple transitions — standard stuff. The creative direction called for something significantly more complex: scroll-linked parallax effects, staggered content reveals with cinematic timing, image sequencing tied to scroll position, and section transitions that felt like they were part of the story rather than generic page animation. I needed to get fluent in the deeper parts of the library fast.

**Task:** I had to go from surface-level Framer Motion usage to building a production-grade custom animation system in a timeline that did not allow for extended experimentation.

**Action:** I approached it as structured exploration rather than reading documentation top to bottom. I identified the specific things I needed to build — scroll-linked values, viewport-triggered variants, orchestrated stagger sequences — and I built small, isolated prototypes of each one before integrating them into the actual site. That way I understood each pattern clearly before I had to make it work in a real layout. As I went I noticed that the biggest source of inconsistency was timing and easing values scattered throughout components, so I centralized all motion config into a single constants object — one place to adjust the feel of the whole site. I also spent time intentionally testing the animations on lower-end hardware, not just my development machine, because animation that looks smooth on a powerful laptop can look completely different on a mid-tier phone.

**Result:** The final animation system was cohesive and felt intentional — the same easing language across all sections, scroll reveals that felt editorial rather than generic, and nothing that degraded on mobile. The centralized config turned out to be a genuinely good architectural decision, not just a convenience — when the creative team asked to adjust the overall pacing of the page late in the project, I could change it in one place. I also came away with a much deeper understanding of Framer Motion's orchestration model, which I have since applied in other projects including the FixMyOldWebsite CMS.

---

## 8. Improving a System / Performance

> "Tell me about a time you improved the performance of a frontend system."

**Situation:** When building FixMyOldWebsite, the AI-generated sites needed to load fast — we were claiming sub-1s page loads in a context where the sites were also image-heavy business sites with hero photography, gallery sections, and rich content. Out of the box, with naively included images and full JavaScript bundles, that target was not going to be met.

**Task:** I was responsible for the entire frontend performance of these generated sites, including SSR, asset delivery, and the image pipeline. Getting to sub-1s on real hardware meant addressing several layers simultaneously.

**Action:** I started by profiling a representative generated site with Lighthouse and identified the biggest contributors to load time: unoptimized images, render-blocking resources, and no SSR on content that search engines needed to index. For images I built a pipeline that converted source assets to modern formats like WebP, generated multiple sizes for responsive srcset attributes, and served everything through Cloudflare R2 with CDN caching at the edge. For the image component itself I implemented lazy loading below the fold while eagerly loading the hero image, which is the one that directly affects largest contentful paint. For rendering I used Next.js SSR with structured JSON-LD for SEO, dynamic meta tags per tenant, and cached static shells where the content was unlikely to change between requests. I also audited JavaScript bundle size and removed dependencies that were being pulled in but not meaningfully used. The result was that the critical rendering path was lean — the first meaningful paint was of actual content, not a loading spinner waiting for a client-side render.

**Result:** The generated sites consistently scored well on Lighthouse across performance, SEO, and accessibility. The sub-1s page load target was achievable on typical connections with CDN delivery. Search engines could index the content from the SSR HTML rather than waiting for client JavaScript, which mattered for the SEO value proposition of the product. Performance in this context was not a nice-to-have — it was part of the core pitch, so hitting it actually required engineering it deliberately rather than hoping it would happen.

---

## 9. Hard Problem

> "What's the hardest frontend problem you've solved?"

**Situation:** For the AI Resume Optimizer I built a real-time resume editor where users could edit their resume live and see a pixel-accurate preview of the final document as they typed — and that same document could be exported as a high-fidelity PDF. The hard constraint was that the preview and the PDF export needed to produce identical output. A preview that looks right but exports differently is worse than no preview, because it breaks trust at exactly the moment the user most cares about the result.

**Task:** I had to design an architecture where one source of truth — an HTML template — drove both the browser-rendered live preview and the server-side Puppeteer PDF export, with the same fonts, spacing, layout behavior, and content across both.

**Action:** The core insight was that the preview could not be a "preview component" that approximated the real document — it had to literally render the same HTML template that Puppeteer would receive. So I built a shared HTML template system: the template lived on the server, and the browser would fetch and render it inside an iframe, substituting the current resume data. As the user edited, the data changes were sent to the iframe and the template re-rendered in place. No diff, no virtual DOM approximation — the same server template, live, in a frame. This gave me a guarantee: whatever the user saw was exactly what Puppeteer would render, because Puppeteer was receiving the same template and the same data. The tricky parts were font loading consistency — I had to ensure web fonts were fully loaded in both contexts before rendering — and page-break behavior, which is handled differently in a scrollable browser context than in a paginated print context. I used CSS print media queries within the shared template to control pagination so Puppeteer's output was paginated correctly, and I matched the iframe dimensions to an A4 aspect ratio with zoom scaling so the preview felt like looking at the real document.

**Result:** The preview was genuinely accurate — what the user saw matched the exported PDF closely enough that it felt like a native editor rather than an approximation. The shared template architecture also meant any visual change to the resume — font, spacing, section order — was immediately reflected in both preview and export without maintaining two separate rendering paths. It was the kind of problem where the obvious first approach, building a preview component that mirrors the real output, leads to a maintenance trap — and realizing that early enough to design around it correctly was where the real engineering happened.

---

## Elevator Line

I'm a frontend engineer who builds production-quality interfaces — motion systems, real-time editors, component architectures, and performance-optimized UIs. I have shipped brand-partner editorial sites, AI-powered CMSes, and SaaS products that handle real users and real money. I care deeply about how things feel to use, not just whether they technically work. When I join a frontend team I want to be the person who raises the quality bar, not just the person who closes tickets.

---

> **Note:** Metrics in `[brackets]` need your actual numbers. STAR answers work best when
> you can answer a follow-up like "how did you measure that?" without hesitation.
