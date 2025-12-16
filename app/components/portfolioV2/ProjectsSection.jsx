import React from "react";
import MotionSection from "./MotionSection.jsx";
import the85ersHomePageImg from "../../assets/projects/85ersHomePage.png?format=jpg&quality=80&as=src";
import the85erContactUsPageImg from "../../assets/projects/85ersContactPage.png?format=jpg&quality=80&as=src";
import the85erOurStoryPageImg from "../../assets/projects/85ersOurStoryPage.png?format=jpg&quality=80&as=src";
import splitifyHomePageImg from "../../assets/projects/splitifyHomePage.png?format=jpg&quality=80&as=src";
import splitifyPayPageImg from "../../assets/projects/splitifyPayPage.png?format=jpg&quality=80&as=src";
import ProjectCard from "./ProjectCard.jsx";
import splitifyLogoImg from "../../assets/projects/splitifyLogo.png?format=jpg&quality=80&as=src";
import the85ersLogo from "../../assets/projects/85ersLogo.png?format=jpg&quality=80&as=src";
function ProjectsSection() {
  return (
    <MotionSection
      id="projects"
      className="mb-32"
      delay={0.12}
      viewPortTrigger={0.1}
    >
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

      <ProjectCard
        className="rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden mb-8"
        title="Splitify - AI Shared Expense Manager "
        description="Designed, built, and shipped a production SaaS, collaborating with early users to improve shared expense automation, payments, and reminders."
        icon={splitifyLogoImg}
        images={[splitifyHomePageImg, splitifyPayPageImg]}
        showAllImages={false}
        enableSlideshow={true}
        integrations={[
          { name: "Plaid", logo: the85ersLogo },
          { name: "Tylnx", logo: splitifyLogoImg },
          { name: "Stripe", logo: splitifyLogoImg },
          { name: "ChatGPT", logo: splitifyLogoImg },
          { name: "Venmo", logo: splitifyLogoImg },

        ]}
        showDots
        slideFocus={[
          { xPct: 0, yPct: 0 }, // show more top (great for headers)
          { xPct: 0, yPct: 0 }, // bias down (great for mobile screens)
        ]}
        badges={[
          "React 19",
          "React Router",
          "Node.js",
          "MongoDB",
          "Tailwind",
          "Stripe API",
          "Telnyx API",
          "Plaid API",
        ]}
        features={[
          "Idempotent, failure-tolerant payment and messaging systems built for retries, webhook replays, and failures.",
          "Stripe payments with Plaid bank linking to dynamically track and update recurring expense splits.",
          "Dynamic recurring billing and reminder cron jobs with custom intervals and full timezone awareness.",
          "SMS pay-by-link payment flows via Telnyx with rate limiting and abuse safeguards to control costs.",
          "Designed data models for multi-user shared expenses with custom splits and reconciliation.",
          "Internal analytics dashboards for LTV, CAC, user segmentation, and cost forecasting.",
          "Zero-account payment experience for recipients, reducing friction while preserving security and traceability.",
        ]}
        // OPTIONAL: if your ProjectCard supports these (recommended)
        // tag={{
        //   text: "Star Project",
        //   className:
        //     "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-semibold uppercase tracking-wider border border-blue-500/20",
        // }}
        actions={[
          {
            href: "https://splitify.io/",
            target: "_blank",
            label: "Live Demo",
            icon: "lucide:external-link",
          },
        ]}
      />

      <ProjectCard
        title="The 85ers"
        icon={the85ersLogo}
        integrationText={"Collaborated With"}
        integrations={[
          { name: "Storied Sports", logo: the85ersLogo },
          { name: "Adidas", logo: splitifyLogoImg },
          { name: "The REALEST", logo: splitifyLogoImg },
          { name: "Seatle Reign FC", logo: splitifyLogoImg },
          { name: "USWNT", logo: splitifyLogoImg },
        ]}
        className="rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden mb-8"
        description="A creative brand platform featuring dynamic hero layouts, custom motion, and CMS-lite image workflows. Built with a modular component system and high visual polish."
        badges={["Framer Motion", "React", "Figma", "Tailwind"]}
        images={[
          the85ersHomePageImg,
          the85erContactUsPageImg,
          the85erOurStoryPageImg,
        ]}
        enableSlideshow={true}
        slideshowAutoplay={true}
        slideFocus={[
          { xPct: 0, yPct: 0 }, // show more top (great for headers)
          { xPct: 0, yPct: 0 }, // bias down (great for mobile screens)
          { xPct: 0, yPct: 5 }, // bias down (great for mobile screens)
        ]}
        actions={[
          {
            href: "https://the85ers.org/",
            target: "_blank",
            label: "Live Demo",
            icon: "lucide:external-link",
          },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <ProjectCard
          title="Analytics Dashboard"
          icon={splitifyLogoImg}
          description="Internal analytics system for measuring Splitify's revenue health. Features metrics for churn, engagement, and server-side pagination with aggregation pipeline optimizations."
          badges={[
            "React 19",
            "React Router",
            "Node.js",
            "MongoDB",
            "Express.js",
            "Tailwind",
          ]}
          features={[
            "Idempotent, failure-tolerant payment and messaging systems.",
            {
              text: "Stripe payments with Plaid bank linking for dynamic recurring splits.",
              // emphasis: true,
            },
            "Timezone-aware billing and reminder cron jobs.",
            {
              text: "SMS pay-by-link flows with rate limiting and abuse protection.",
            },
            "Advanced shared-expense data models with reconciliation.",
          ]}
        />
        <ProjectCard
          className="rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden mb-8"
          title="Video Prompt Generator – Social Media Automation"
          description="Built an internal automation tool that generates TikTok-ready scripts and AI video prompts using structured product context, pain-point libraries, hook templates, and strict scene guardrails."
          icon={splitifyLogoImg}
          images={[]} // optional: add screenshots later
          showAllImages={false}
          enableSlideshow={false}
          badges={[
            "React 19",
            "Tailwind",
            "Node.js",
            "Express.js",
            "ChatGPT Integration",
            "TikTok Integration",
            "Prompt Engineering",
            "Content Automation",
            "AI Workflows",
          ]}
          features={[
            "Multi-step prompt engine that converts product context and pain points into TikTok-ready scripts.",
            "Generates structured JSON prompts optimized for AI video tools like Sora, Veo, and Pika.",
            "Built-in creative guardrails to ensure realistic, speakable, and policy-safe outputs.",
            "Reusable libraries for hooks, pain points, characters, cameos, and scene framing.",
            "Automatically produces captions, pacing notes, beat markers, and camera direction.",
            "Designed for rapid experimentation across products, campaigns, and creators.",
          ]}
        />
      </div>
    </MotionSection>
  );
}

function FeatureItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm text-neutral-400">
      <span
        className="iconify w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
        data-icon="lucide:check"
      ></span>
      <span>
        <strong className="text-neutral-300 font-normal">{text}</strong>
      </span>
    </li>
  );
}

export default ProjectsSection;
