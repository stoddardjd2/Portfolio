import React, { lazy, useState } from "react";
import MotionSection from "./MotionSection.jsx";
import the85ersHomePageImg from "../../assets/projects/85ersHomePage.png?format=jpg&quality=80&as=src";
import the85erContactUsPageImg from "../../assets/projects/85ersContactPage.png?format=jpg&quality=80&as=src";

import the85erEventsImg from "../../assets/projects/85ersEvents.png?format=jpg&quality=80&as=src";
import the85erTeamImg from "../../assets/projects/85ersTeam.png?format=jpg&quality=80&as=src";
import the85erOurStoryV2Img from "../../assets/projects/85ersOurStory2.png?format=jpg&quality=80&as=src";

import the85erOurStoryPageImg from "../../assets/projects/85ersOurStoryPage.png?format=jpg&quality=80&as=src";
import splitifyHomePageImg from "../../assets/projects/splitifyHomePage.png?format=jpg&quality=80&as=src";
import splitifyPayPageImg from "../../assets/projects/splitifyPayPage.png?format=jpg&quality=80&as=src";
import splitifyHomePageImg2 from "../../assets/projects/splitifyHomePage2.png?format=jpg&quality=80&as=src";
import splitifyDashboardPageImg from "../../assets/projects/splitifyDashboardPage.png?format=jpg&quality=80&as=src";
import splitifyPremiumPage from "../../assets/projects/splitifyPremiumPage.png?format=jpg&quality=80&as=src";
import splitifyOnboardingPage from "../../assets/projects/splitifyOnboardingPage.png?format=jpg&quality=80&as=src";
import ProjectCard from "./ProjectCard.jsx";

import splitifyLogoImg from "../../assets/project-logos/splitifyLogo.png?format=jpg&quality=80&as=src";
import the85ersLogo from "../../assets/project-logos/85ersLogo.png?format=jpg&quality=80&as=src";
import videoPromptGeneratorLogo from "../../assets/project-logos/videoPromptGenerator.png?format=png&quality=80&as=src";
import analyticsDashboard from "../../assets/project-logos/analyticsDashboard.png?format=png&quality=80&as=src";
import scrollosLogo from "../../assets/project-logos/scrollosLogo.png?format=png&quality=80&as=src";
import tiktokLogo from "../../assets/project-logos/tiktokLogo.png?format=png&quality=80&as=src";
import mealPlannerLogo from "../../assets/project-logos/mealPlannerLogo.png?format=png&quality=80&as=src";

import ViewMore from "./ViewMore.jsx";
// eager = import immediately (recommended for small sets)
const scrollosProjectImageList = Object.entries(
  import.meta.glob("/app/assets/projects/scrollos/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
    query: "?format=png&quality=80&as=src",
  })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v);

import plaidIcon from "../../assets/project-integration-icons/plaid.png";
// import plaidIcon from "../../assets/project-integration-icons/plaid-full.png";
// import telnyxIcon from "../../assets/project-integration-icons/telnyx.png";
import telnyxIcon from "../../assets/project-integration-icons/telnyx-icon.png?format=png&quality=80&as=src";
import stripeIcon from "../../assets/project-integration-icons/stripe.svg?format=png&quality=80&as=src";
import chatGptIcon from "../../assets/project-integration-icons/chatGpt.png?format=png&quality=80&as=src";
import venmoIcon from "../../assets/project-integration-icons/venmo.svg?format=jpg&quality=80&as=src";
import storiedSportsIcon from "../../assets/project-integration-icons/storiedSports.png?format=png&quality=80&as=src";
import adidasIcon from "../../assets/project-integration-icons/adidas.svg?format=jpg&quality=80&as=src";
import theRealestIcon from "../../assets/project-integration-icons/theRealest.png?format=jpg&quality=80&as=src";
import seattleReignFcIcon from "../../assets/project-integration-icons/seattleReignFc.png?format=jpg&quality=80&as=src";
import uswntIcon from "../../assets/project-integration-icons/uswnt.png?format=jpg&quality=80&as=src";

function ProjectsSection({ highlightsOn, setHighlightsOn }) {

  return (
    <MotionSection
      id="projects"
      className="scroll-mt-30"
      delay={0.12}
      viewPortTrigger={0.1}
    >
      <h3 className="text-sm font-medium text-white mb-8 uppercase tracking-widest">
        Production Applications
      </h3>
      <ProjectCard
        className=""
        title="Splitify - AI Shared Expense Manager "
        description="Designed, built, and shipped a production SaaS, iterating with early users to streamline shared expense automation, payment collection, and reminder workflows."
        icon={splitifyLogoImg}
        iconDisableRounding={true}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        images={[
          splitifyHomePageImg,
          splitifyPayPageImg,
          splitifyHomePageImg2,
          splitifyDashboardPageImg,
          splitifyPremiumPage,
          splitifyOnboardingPage,
        ]}
        showAllImages={false}
        enableSlideshow={true}
        integrations={[
          { name: "Plaid", logo: plaidIcon, rounded: false },
          {
            name: "Telynx",
            logo: telnyxIcon,
            rounded: false,
            className: "invert",
          },
          { name: "Stripe", logo: stripeIcon },
          { name: "ChatGPT", logo: chatGptIcon, className: "invert" },
          { name: "Venmo", logo: venmoIcon },
        ]}
        showDots
        slideFocus={[
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
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
        featureHighlights={[
          "Idempotent",
          "failure-tolerant",
          "webhook",
          "Stripe",
          "Plaid",
          "recurring billing",
          "cron jobs",
          "timezone",
          "SMS",
          "Telnyx",
          "rate limiting",
          "abuse",
          "data models",
          "analytics",
          "LTV",
          "CAC",
          "cost forecasting",
          "Zero-account",
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
        title="The 85ers — Cinematic Storytelling Platform"
        icon={the85ersLogo}
        integrationText={"Collaborated With"}
        integrations={[
          { name: "Storied Sports", logo: storiedSportsIcon, rounded: false },
          { name: "Adidas", logo: adidasIcon },
          { name: "The REALEST", logo: theRealestIcon },
          { name: "Seatle Reign FC", logo: seattleReignFcIcon },
          { name: "USWNT", logo: uswntIcon },
        ]}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        description="A cinematic storytelling platform for the U.S. Women’s National Soccer Team built in partnership with adidas featuring motion-driven layouts and editorial visuals."
        badges={["Framer Motion", "React", "Figma", "Tailwind"]}
        images={[
          the85ersHomePageImg,
          the85erContactUsPageImg,
          the85erOurStoryPageImg,
          the85erEventsImg,
          the85erTeamImg,
          the85erOurStoryV2Img,
        ]}
        enableSlideshow={true}
        features={[
          "Cinematic, motion-driven layouts built with modular React components for long-form storytelling.",
          "Editorial-style page composition with dynamic hero sections, image sequencing, and narrative pacing.",
          "High-performance image pipeline using responsive assets, lazy loading, and optimized formats.",
          "Custom animation system using Framer Motion for scroll-based reveals and section transitions.",
          "Mobile-first responsive design ensuring visual fidelity across breakpoints and devices.",
          "Brand-safe implementation aligned with professional sports and partner standards.",
        ]}
        featureHighlights={[
          "modular React",
          "motion-driven",
          "image pipeline",
          "responsive assets",
          "lazy loading",
          "optimized formats",
          "Framer Motion",
          "scroll-based",
          "transitions",
          "Mobile-first",
          "responsive design",
          "Brand-safe",
          "performance",
        ]}
        slideFocus={[
          { xPct: 0, yPct: 0 }, // show more top (great for headers)
          { xPct: 0, yPct: 0 }, // bias down (great for mobile screens)
          { xPct: 0, yPct: 5 }, // bias down (great for mobile screens)
          { xPct: 0, yPct: 0 }, // bias down (great for mobile screens)
          { xPct: 0, yPct: 0 }, // bias down (great for mobile screens)
          { xPct: 0, yPct: 100 }, // bias down (great for mobile screens)
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
      <div className="grid md:grid-cols-2 gap-x-6">
        <ProjectCard
          title="Analytics Dashboard"
          icon={analyticsDashboard}
          iconDisableRounding={true}
          highlightsOn={highlightsOn}
          setHighlightsOn={setHighlightsOn}
          description="Internal analytics system for measuring Splitify's revenue health. Features metrics for churn, engagement, and server-side pagination with aggregation pipeline optimizations."
          badges={[
            "React 19",
            "React Router",
            "Node.js",
            "MongoDB",
            "Express.js",
            "Tailwind",
          ]}
          integrations={[
            { name: "Splitify", logo: splitifyLogoImg, rounded: false },
          ]}
          features={[
            "Advanced user search and filtering by name, email, plan, role, activity status, and lifecycle stage.",
            "Messaging analytics with per-user, per-plan, and time-window breakdowns for texts and emails.",
            "Cost tracking and forecasting system for SMS usage with daily, weekly, and monthly projections.",
            "Top sender and cost attribution tables to identify high-usage users and potential abuse.",
            "Plan-level cost analysis to evaluate free vs paid user impact on infrastructure spend.",
            "Live request and message inspection for operational debugging and customer support.",
            "Server-enforced RBAC ensuring sensitive analytics and operational data are accessible only to authorized roles.",
          ]}
          featureHighlights={[
            "search",
            "filtering",
            "lifecycle stage",
            "Messaging analytics",
            "Cost tracking",
            "forecasting",
            "projections",
            "cost attribution",
            "abuse",
            "RBAC",
            "authorized roles",
            "operational debugging",
            "customer support",
          ]}
        />
        <ProjectCard
          title="Video Prompt Generator"
          description="Built an internal automation tool that generates TikTok-ready scripts and AI video prompts using structured product context, pain-point libraries, hook templates, and strict scene guardrails."
          icon={videoPromptGeneratorLogo}
          iconDisableRounding={true}
          images={[]} // optional: add screenshots later
          showAllImages={false}
          enableSlideshow={false}
          highlightsOn={highlightsOn}
          setHighlightsOn={setHighlightsOn}
          integrations={[
            { name: "ChatGPT", logo: chatGptIcon, className: "invert" },
            { name: "TikTok", logo: tiktokLogo, rounded: false },
          ]}
          badges={[
            "React 19",
            "Tailwind",
            "Node.js",
            "Express.js",
            "ChatGPT Integration",
            "TikTok Integration",
            "Prompt Engineering",
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
          featureHighlights={[
            "Multi-step",
            "prompt engine",
            "TikTok-ready",
            "structured JSON",
            "Sora",
            "Veo",
            "Pika",
            "guardrails",
            "policy-safe",
            "Reusable libraries",
            "captions",
            "beat markers",
            "camera direction",
            "experimentation",
          ]}
        />
      </div>
      <ProjectCard
        title="Scrollos — Internal Catalog Platform"
        actions={[
          {
            href: "https://github.com/2351Labs/the-ui/?tab=readme-ov-file",
            target: "_blank",
            label: "Demo",
            icon: "lucide:external-link",
          },
        ]}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        icon={scrollosLogo} // replace with your Scrollos mark or generic catalog icon
        iconDisableRounding={true}
        description="A full-stack catalog platform built to centralize services, libraries, and internal tooling with powerful discovery, documentation, and version history."
        badges={[
          "React",
          "React Router",
          "Node.js",
          "Express.js",
          "MongoDB Atlas",
          "OAuth 2.0",
          "RBAC",
          "JWT Auth",
          "Vanilla CSS",
        ]}
        enableSlideshow={true}
        images={[...scrollosProjectImageList]}
        slideFocus={[
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
        ]}
        features={[
          "Centralized catalog for services, libraries, and internal tools with rich metadata and documentation.",
          "Advanced server-side pagination and filtering via flexible query parameters, optimized for large datasets.",
          "Catalog filter state persisted in URL query parameters, enabling shareable, reproducible views.",
          "Role-based access control with OAuth 2.0 (Google & Microsoft) and JWT-secured API endpoints.",
          "Sortable, resizable data tables with draggable column widths, fully supported on mobile.",
          "Inline documentation editing with change history tracking and metadata inspection.",
          "Dedicated views for documentation, version history, metadata, and support/help information.",
          "Custom light and dark themes with a fully responsive UI designed for desktop and mobile.",
          "Production deployment using Netlify, Render, and MongoDB Atlas with environment-based configuration.",
        ]}
        featureHighlights={[
          "server-side pagination",
          "filtering",
          "URL query parameters",
          "shareable",
          "RBAC",
          "OAuth 2.0",
          "JWT",
          "API endpoints",
          "Sortable",
          "resizable",
          "Inline documentation",
          "change history",
          "light and dark",
          "responsive",
          "Netlify",
          "Render",
          "MongoDB Atlas",
        ]}
      />

      <ViewMore
        collapsedLabel={"View Older Projects"}
        expandedLabel={"Hide Older Projects"}
        items={[
          <ProjectCard
            title="Meal Planner — Weekly Planning & Budgeting Tool"
            iconDisableRounding={true}
            description="A web-based meal planning application that helps users organize weekly meals, adjust serving sizes, and generate shopping lists, with smart recommendations to reduce cost and ingredient waste."
            highlightsOn={highlightsOn}
            setHighlightsOn={setHighlightsOn}
            badges={[
              "React",
              "Drag & Drop",
              "Web Scraping",
              "State Management",
              "UX Design",
              "Netlify",
            ]}
            features={[
              "Interactive drag-and-drop planner that allows meals to be moved, resized, or split across days of the week.",
              "Automatic serving-size calculations visualized as color-coded blocks for quick weekly planning.",
              "Recipe ingestion via URL using a web scraping API, with manual entry as a fallback.",
              "Recommended meal suggestions that reuse overlapping ingredients to reduce grocery cost and waste.",
              "Dynamic serving controls with multipliers and manual overrides for fine-grained portion adjustment.",
              "Automatically generated shopping lists based on planned meals and serving sizes.",
              "Global search across saved meals for fast retrieval and planning updates.",
            ]}
            featureHighlights={[
              "drag-and-drop",
              "serving-size",
              "web scraping",
              "fallback",
              "recommendations",
              "reduce cost",
              "shopping lists",
              "Global search",
              "state",
            ]}
            actions={[
              {
                href: "https://budget-meal-planner.netlify.app/",
                target: "_blank",
                label: "Live Demo",
                icon: "lucide:external-link",
              },
            ]}
          />,

          <div className="grid md:grid-cols-2 gap-x-6">
            <ProjectCard
              title="Collaborative To-Do List — Multi-User Task Manager"
              description="A simple full-stack to-do list application with user authentication and a backend for persisting and retrieving notes across sessions."
              highlightsOn={highlightsOn}
              setHighlightsOn={setHighlightsOn}
              badges={[
                "React",
                "Node.js",
                "Express.js",
                "Authentication",
                "REST APIs",
                "State Management",
              ]}
              features={[
                "User signup and login flows with server-side routing and authentication logic.",
                "Backend API for creating, retrieving, and persisting user-specific notes.",
                "Separation of frontend and backend concerns with a REST-based architecture.",
                "Shared task storage enabling collaborative-style usage across sessions.",
                "Lightweight data persistence using JSON-based storage for simplicity and clarity.",
                "Foundational authentication and authorization patterns suitable for extension to databases.",
              ]}
              featureHighlights={[
                "authentication",
                "signup",
                "login",
                "Backend API",
                "REST",
                "data persistence",
                "authorization",
                "frontend and backend",
              ]}
            />

            <ProjectCard
              title="Personal Daily Planner — Time-Based Task Organizer"
              description="A lightweight daily planning tool that lets users manage hourly events with visual indicators for past, present, and upcoming tasks, with persistent local storage."
              badges={[
                "JavaScript",
                "Frontend",
                "Local Storage",
                "Time-Based UI",
                "UX Design",
              ]}
              highlightsOn={highlightsOn}
              setHighlightsOn={setHighlightsOn}
              features={[
                "Editable hourly time blocks for planning and managing daily tasks.",
                "Real-time visual indicators that distinguish past, present, and future events.",
                "Persistent storage using localStorage to retain entries across browser sessions.",
                "Dynamic UI updates based on the current time without page refreshes.",
                "Simple, focused interface optimized for quick daily planning workflows.",
              ]}
              featureHighlights={[
                "localStorage",
                "Real-time",
                "visual indicators",
                "Dynamic UI",
                "time-based",
                "UX",
              ]}
            />

            <ProjectCard
              title="Real-Time Chat App — WebSocket Messaging"
              description="A real-time web chat application built with WebSockets, enabling instant message delivery and live updates across connected clients."
              badges={[
                "JavaScript",
                "WebSockets",
                "Real-Time Systems",
                "Client-Server Architecture",
                "Event-Driven",
              ]}
              highlightsOn={highlightsOn}
              setHighlightsOn={setHighlightsOn}
              features={[
                "Bi-directional, real-time messaging using WebSocket connections.",
                "Instant message broadcasting to all connected clients without page refreshes.",
                "Event-driven architecture for handling message send and receive flows.",
                "Lightweight client-server implementation focused on low-latency communication.",
                "Foundation for extending to rooms, user presence, and message persistence.",
              ]}
              featureHighlights={[
                "WebSockets",
                "real-time",
                "bi-directional",
                "low-latency",
                "event-driven",
                "client-server",
                "broadcasting",
              ]}
            />
            <ProjectCard
              title="Weather Forecast — API-Driven Weather App"
              description="A lightweight weather forecasting application that fetches and displays real-time weather data from a third-party API."
              badges={[
                "JavaScript",
                "REST APIs",
                "Async Data Fetching",
                "Frontend",
                "API Integration",
              ]}
              highlightsOn={highlightsOn}
              setHighlightsOn={setHighlightsOn}
              features={[
                "Integrated a third-party weather API to fetch current weather data dynamically.",
                "Asynchronous data fetching with proper handling of loading and error states.",
                "Parsed and transformed API responses into a user-friendly UI.",
                "Simple, focused interface for quickly checking weather conditions.",
                "Foundational API-integration patterns applicable to larger frontend systems.",
              ]}
              featureHighlights={[
                "third-party API",
                "REST",
                "Asynchronous",
                "loading",
                "error states",
                "transformed",
                "API responses",
              ]}
            />
          </div>,
        ]}
      />
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
