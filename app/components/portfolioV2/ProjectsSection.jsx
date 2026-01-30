import React, { lazy, useState } from "react";
import MotionSection from "./MotionSection.jsx";
import the85ersHomePageImg from "../../assets/projects/85ersHomePage.png?format=webp&quality=70&as=src";
import the85erContactUsPageImg from "../../assets/projects/85ersContactPage.png?format=webp&quality=70&as=src";

import the85erEventsImg from "../../assets/projects/85ersEvents.png?format=webp&quality=70&as=src";
import the85erTeamImg from "../../assets/projects/85ersTeam.png?format=webp&quality=70&as=src";
import the85erOurStoryV2Img from "../../assets/projects/85ersOurStory2.png?format=webp&quality=70&as=src";

import the85erOurStoryPageImg from "../../assets/projects/85ersOurStoryPage.png?format=webp&quality=70&as=src";
import splitifyHomePageImg from "../../assets/projects/splitifyHomePage.png?format=webp&quality=70&as=src";
import splitifyPayPageImg from "../../assets/projects/splitifyPayPage.png?format=webp&quality=70&as=src";
import splitifyHomePageImg2 from "../../assets/projects/splitifyHomePage2.png?format=webp&quality=70&as=src";
import splitifyDashboardPageImg from "../../assets/projects/splitifyDashboardPage.png?format=webp&quality=70&as=src";
import splitifyPremiumPage from "../../assets/projects/splitifyPremiumPage.png?format=webp&quality=70&as=src";
import splitifyOnboardingPage from "../../assets/projects/splitifyOnboardingPage.png?format=webp&quality=70&as=src";
import ProjectCard from "./ProjectCard.jsx";

import splitifyLogoImg from "../../assets/project-logos/splitifyLogo.png?format=webp&quality=70&as=src";
import the85ersLogo from "../../assets/project-logos/85ersLogo.png?format=webp&quality=70&as=src";
import videoPromptGeneratorLogo from "../../assets/project-logos/videoPromptGenerator.svg?format=webp&quality=70&as=src";
import analyticsDashboard from "../../assets/project-logos/analyticsDashboard.svg?format=webp&quality=70&as=src";
import scrollosLogo from "../../assets/project-logos/scrollosLogo.svg?format=webp&quality=70&as=src";
import tiktokLogo from "../../assets/project-logos/tiktokLogo.png?format=webp&quality=70&as=src";
import mealPlannerLogo from "../../assets/project-logos/mealPlannerLogo.png?format=webp&quality=70&as=src";
import autoWebsiteGeneratorLogo from "../../assets/project-logos/autoWebsiteGeneratorLogo.png?format=webp&quality=70&as=src";
import smartPlatterLogo from "../../assets/project-logos/smartPlatter.svg?format=webp&quality=70&as=src";
import photoMaxLogo from "../../assets/project-logos/photoMaxLogo.png?format=webp&quality=70&as=src";
import ViewMore from "./ViewMore.jsx";
import aiResumeOptimzerLogo from '../../assets/project-logos/ai-resume-optimizer.svg?format=webp&quality=70&as=src';
// eager = import immediately (recommended for small sets)
const scrollosProjectImageList = Object.entries(
  import.meta.glob("/app/assets/projects/scrollos/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
    query: "?format=webp&quality=70&as=src",
  })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v);

const autoWebsiteGenreratorProjectImageList = Object.entries(
  import.meta.glob(
    "/app/assets/projects/auto-website-generator/*.{png,jpg,jpeg,webp}",
    {
      eager: true,
      import: "default",
      query: "?format=webp&quality=70&as=src",
    }
  )
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v);

import plaidIcon from "../../assets/project-integration-icons/plaid.png";
// import plaidIcon from "../../assets/project-integration-icons/plaid-full.png";
// import telnyxIcon from "../../assets/project-integration-icons/telnyx.png";
import telnyxIcon from "../../assets/project-integration-icons/telnyx-icon.png?format=webp&quality=70&as=src";
import telnyxColoredIcon from "../../assets/project-integration-icons/telnyxColored.png?format=webp&quality=70&as=src";
import stripeIcon from "../../assets/project-integration-icons/Stripe.svg?format=webp&quality=70&as=src";
import chatGptIcon from "../../assets/project-integration-icons/chatGpt.png?format=webp&quality=70&as=src";
import venmoIcon from "../../assets/project-integration-icons/venmo.svg?format=webp&quality=70&as=src";
import storiedSportsIcon from "../../assets/project-integration-icons/storiedSports.png?format=webp&quality=70&as=src";
import adidasIcon from "../../assets/project-integration-icons/adidas.svg?format=webp&quality=70&as=src";
import theRealestIcon from "../../assets/project-integration-icons/theRealest.png?format=webp&quality=70&as=src";
import seattleReignFcIcon from "../../assets/project-integration-icons/seattleReignFc.png?format=webp&quality=70&as=src";
import uswntIcon from "../../assets/project-integration-icons/uswnt.png?format=webp&quality=70&as=src";
import googleSearchIcon from "../../assets/project-integration-icons/googleSearch.svg?format=webp&quality=70&as=src";
import googlePlacesIcon from "../../assets/project-integration-icons/googlePlaces.svg?format=webp&quality=70&as=src";
import fireworksAiIcon from "../../assets/project-integration-icons/fireworksAI.png?format=webp&quality=70&as=src";
import pexelsIcon from "../../assets/project-integration-icons/pexels.png?format=webp&quality=70&as=src";
import cloudflareIcon from "../../assets/project-integration-icons/cloudflare.svg?format=webp&quality=70&as=src";
import twilioIcon from "../../assets/project-integration-icons/twilio.svg?format=webp&quality=70&as=src";
import twilioColoredIcon from "../../assets/project-integration-icons/twilioColored.svg?format=webp&quality=70&as=src";
import serpapiIcon from "../../assets/project-integration-icons/serpapi.png?format=webp&quality=70&as=src";
import googleLightHouseIcon from "../../assets/project-integration-icons/googleLightHouse.png?format=webp&quality=70&as=src";
import googleAdsIcon from "../../assets/project-integration-icons/googleAds.svg?format=webp&quality=70&as=src";
import redditIcon from "../../assets/project-integration-icons/reddit.svg?format=webp&quality=70&as=src";
import googleAnalyticsIcon from "../../assets/project-integration-icons/googleAnalytics.svg?format=webp&quality=70&as=src";
import spoontacularIcon from "../../assets/project-integration-icons/spoontacular.png?format=webp&quality=70&as=src";
function ProjectsSection({ highlightsOn, setHighlightsOn }) {
  return (
    <MotionSection
      id="projects"
      className="scroll-mt-30"
      delay={0.12}
      viewPortTrigger={0.1}
    >
      <h3 className="text-sm font-medium text-white mb-8 uppercase tracking-widest">
        My Projects and Production Applications
      </h3>

      <ProjectCard
        // collapsedByDefault={false}
        starProject
        title="FixMyOldWebsite - AI Business Website Generator & CMS"
        description="AI-powered SaaS platform that generates, deploys, and hosts complete business websites using advanced web scraping, structured data enrichment, and aggregation from Google Places and Search APIs. Includes a custom CMS for users to make changes."
        // descriptionClassname = "!max-w-full"
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        icon={autoWebsiteGeneratorLogo}
        iconDisableRounding={true}
        badges={[
          "Next.js 16",
          "React 19",
          "Node.js",
          "MongoDB",
          "Mongoose",
          "WebSockets",
          "OpenAI GPT-4",
          "Fireworks FLUX",
          "Cloudflare R2",
          "Google Places API",
          "TailwindCSS",
          "Framer Motion",
          "JWT Auth",
          "SendGrid",
        ]}
        integrations={[
          { name: "ChatGPT", logo: chatGptIcon, className: "invert" },
          {
            name: "Google Search",
            logo: googleSearchIcon,
            className: "",
          },
          {
            name: "Google Places",
            logo: googlePlacesIcon,
            className: "",
          },
          {
            name: "Fireworks AI",
            logo: fireworksAiIcon,
            className: "bg-white p-[2px]",
          },
          {
            name: "Pexels",
            logo: pexelsIcon,
            className: "grayscale brightness-[8.4]",
          },
          { name: "Cloudflare", logo: cloudflareIcon, className: "" },
          { name: "SendGrid", logo: twilioColoredIcon, className: "" },
          { name: "Serpapi", logo: serpapiIcon, className: " " },
          { name: "Google Analytics", logo: googleAnalyticsIcon, rounded: false  },
        ]}
        actions={[
          {
            href: "https://fixMyOldWebsite.app",
            target: "_blank",
            label: "Live Demo",
            icon: "lucide:external-link",
          },
        ]}
        features={[
          "Architected a multi-stage AI pipeline that uses web scraping and Google Places/Search APIs to enrich business data, detect industry verticals, generate site content, optimize SEO, and deploy websites automatically.",
          "Multi-tenant SaaS architecture with custom domains, subdomains, tenant isolation, and white-label support.",
          "Designed a real-time visual CMS with live preview, enabling no-code customization of pages, routes, themes, fonts, images, domains.",
          "Automated wildcard SSL provisioning with DNS-based validation, secure tenant ownership verification, and access control.",
          "Content-aware AI image generation pipeline using Fireworks FLUX and Pexels fallback for 100% image availability with R2 storage.",
          "Production-grade security with rate limiting, fingerprint-based abuse prevention, input sanitization, and schema validation.",
          "SEO-optimized SSR with structured JSON-LD data, dynamic meta tags, and CDN-optimized asset delivery achieving sub-1s page loads.",
          "Automated setup of per-tenant contact form emails via wildcard platform domains with automated SPF/DKIM signing.",
        ]}
        featureHighlights={[
          "AI orchestration",
          "web scraping",
          "Google Places API",
          "Google Search API",
          "business data enrichment",
          "automated content generation",
          "business vertical analysis",
          "SEO optimization",
          "Multi-tenant",
          "automated SPF/DKIM",
          "Per-tenant contact form",
          "SaaS",
          "custom domains",
          "subdomains",
          "tenant isolation",
          "white-label",
          "custom CMS",
          "live preview",
          "no-code customization",
          "wildcard SSL",
          "DNS-based validation",
          "ownership verification",
          "access control",
          "Content-aware",
          "AI image generation",
          "FLUX",
          "Places/Search APIs",
          "Fireworks",
          "Pexels fallback",
          "100% availability",
          "rate limiting",
          "fingerprint-based",
          "abuse prevention",
          "input sanitization",
          "schema validation",
          "SEO-optimized",
          "SSR",
          "JSON-LD",
          "dynamic meta tags",
          "CDN-optimized",
          "sub-1s",
        ]}
        images={[
          {
            type: "iframe",
            src: "https://www.fixmyoldwebsite.app/?disableTextFocus=true&hideBubble=true",
            title: "AI Business Website Generator Live Demo",
            delayLoad: true, // Prevent immediate loading to avoid scroll flash
          },
          ...autoWebsiteGenreratorProjectImageList,
        ]}
        showAllImages={false}
        enableSlideshow={true}
        slideshowAutoplay={false}
        showDots
        slideFocus={[
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
          { xPct: 0, yPct: 0 },
        ]}
      />

      <ProjectCard
        // collapsedByDefault={false}
        starProject
        title="Splitify - AI Shared Expense Manager "
        description="Created a production SaaS adopted by real users that simplifies group finances through automated expense tracking, requests and reminders. Uses pay-by-link texts that require no account to make it as easy as possible to get paid back."
        icon={splitifyLogoImg}
        iconDisableRounding={true}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        images={[
          {
            type: "iframe",
            src: "https://splitify.io",
            title: "Splitify Live Demo",
          },
          // splitifyHomePageImg,
          splitifyPayPageImg,
          splitifyHomePageImg2,
          splitifyDashboardPageImg,
          splitifyPremiumPage,
          splitifyOnboardingPage,
        ]}
        showAllImages={false}
        enableSlideshow={true}
        slideshowAutoplay={false}
        integrations={[
          { name: "Plaid", logo: plaidIcon, rounded: false },
          {
            name: "Telynx",
            logo: telnyxColoredIcon,
            rounded: false,
            className: "",
          },
          { name: "Stripe", logo: stripeIcon },
          { name: "ChatGPT", logo: chatGptIcon, className: "invert" },
          { name: "Venmo", logo: venmoIcon },
          { name: "Google Ads", logo: googleAdsIcon, rounded: false },
          { name: "Google Analytics", logo: googleAnalyticsIcon, rounded: false  },
        ]}
        showDots
        slideFocus={[
          // { xPct: 0, yPct: 0 },
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
          "Express.js",
          "MongoDB",
          "Mongoose",
          "Tailwind",
          "Stripe API",
          "Telnyx API",
          "Plaid API",
          "ChatGPT API",
          "OAuth 2.0",
          "RBAC",
          "JWT Auth",
          "Google Analytics",
        ]}
        features={[
          "Built reliable payment and messaging systems that safely handle retries, webhook replays, and service failures.",
          "Integrated Stripe payments and Plaid bank connections to keep recurring expense splits accurate and up to date.",
          "Implemented recurring billing and reminder schedules with flexible intervals and correct handling across time zones.",
          "Created SMS pay-by-link payment flows using Telnyx, with safeguards to prevent abuse and control messaging costs.",
          "Designed data models to support shared expenses across multiple users, including custom splits and reconciliation.",
          "Built internal dashboards to track revenue, acquisition costs, user segments, and operational spend.",
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
          "internal dashboards",
          "reminder schedules",
          "payment and messaging systems",
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
        // collapsedByDefault={false}
        starProject
        title="The 85ers - Cinematic Storytelling Platform"
        icon={the85ersLogo}
        integrationText={"Collaborated With"}
        integrations={[
          { name: "Adidas", logo: adidasIcon },
          { name: "Seatle Reign FC", logo: seattleReignFcIcon },
          { name: "USWNT", logo: uswntIcon },
          { name: "Storied Sports", logo: storiedSportsIcon, rounded: false },
          { name: "The REALEST", logo: theRealestIcon },
        ]}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        description="A cinematic storytelling platform for the U.S. Women’s National Soccer Team built in partnership with adidas featuring motion-driven layouts and editorial visuals. Designed by Storied Sports, developed and deployed by me."
        badges={[
          "React 19",
          "React Router",
          "Figma",
          "Tailwind",
          "Framer Motion",
          "Google Analytics",
        ]}
        slideshowAutoplay={false}
        images={[
          {
            type: "iframe",
            src: "https://the85ers.org",
            title: "The 85ers Live Demo",
          },
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

      <ProjectCard
        // collapsedByDefault={false}
        starProject
        title="PhotoMax - AI Dating Photo Generator "
        icon={photoMaxLogo}
        actions={[{
          href: "https://www.photomax.me/",
          target: "_blank",
          label: "Live Demo",
          icon: "lucide:external-link",
        },]}
        integrations={[
          { name: "OpenAI", logo: chatGptIcon, className: "invert" },
          { name: "Stripe", logo: stripeIcon },
          { name: "Cloudflare R2", logo: cloudflareIcon },
          { name: "Reddit Ads", logo: redditIcon,  },
          { name: "Google Ads", logo: googleAdsIcon, rounded: false },
          { name: "Google Analytics", logo: googleAnalyticsIcon, rounded: false  },
        ]}

        description="Production web app that converts user selfies into high-quality dating profile photos using the most advanced image generation models. Ran 100s of tests with multiple models and prompt variations to find the best results. Application includes a full checkout, generation, and delivery workflow. Users can make iterative prompt-based edits. Intended for primarily mobile use."
        badges={[
          "Next.js (App Router)",
          "React 19",
          "Tailwind CSS",
          "Node.js",
          "OpenAI Images API",
          "MongoDB",
          "Cloudflare R2 (AWS SDK)",
          "Stripe Checkout",
          "Stripe Webhooks",
          "Google Pixel",
          "Reddit Pixel"
        ]}
        enableSlideshow={true}
        slideshowAutoplay={false}
        images={[{
          type: "iframe",
          src: "https://www.photomax.me",
          title: "PhotoMax Live Demo",
        }]}
        slideFocus={[{ xPct: 0, yPct: 0 }]}
        features={[
          "Built an end-to-end checkout → generation → delivery pipeline using Stripe Checkout + webhooks, MongoDB persistence, and OpenAI image generation.",
          "Implemented a resilient generation workflow with retry logic, error logging, and automated refunds on failures via Stripe.",
          "Designed a multi-step UX (upload → style selection → generation → results) with client-side progress polling and a results gallery.",
          "Integrated conversion tracking using Google and Reddit pixel/conversion tracking for paid acquisition measurement.",
          "Added usage limits and basic account management to protect API costs and support repeat customers.",
          "Stored user uploads and generated outputs in Cloudflare R2 via the AWS SDK, backing the results gallery and edit flow.",
          "Logged generation metadata, token usage, and cost estimates in MongoDB for operational insight and debugging."
        ]}
        featureHighlights={[
          "checkout → generation → delivery pipeline",
          "Stripe Checkout + webhooks",
          "MongoDB persistence",
          "OpenAI image generation",
          "retry logic",
          "error logging",
          "automated refunds",
          "Stripe",
          "multi-step UX (upload → style selection → generation → results)",
          "client-side progress polling",
          "results gallery",
          "Google and Reddit pixel/conversion tracking",
          "usage limits",
          "account management",
          "Cloudflare R2 via the AWS SDK",
          "token usage",
          "cost estimates",
          "operational insight"
        ]}
      />


      <ProjectCard
        title="SmartPlatter - AI Meal Planner"
        integrations={[
          { name: "OpenAI", logo: chatGptIcon, className: "invert" },
          { name: "Fireworks AI", logo: fireworksAiIcon, className: "bg-white p-[2px]" },
          { name: "Spoonacular", logo: spoontacularIcon, className: "" },
          { name: "Cloudflare R2", logo: cloudflareIcon, className: "" },
        ]}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        icon={smartPlatterLogo}
        actions={[
          {
            href: "",
            target: "_blank",
            label: "Demo",
            icon: "lucide:external-link"
          }
        ]}
        description="Full-stack meal planning app that imports recipes from URLs, pasted text, or photos, generates a weekly plan and categorized shopping list. Generates images for all recipes and ingredients, calculates macros and costs for each meal and week."
        badges={[
          "React 19",
          "Vite",
          "Tailwind CSS",
          "Framer Motion",
          "@dnd-kit",
          "Axios",
          "Node.js",
          "Express",
          "MongoDB",
          "Mongoose",
          "JWT Auth",
          "Google OAuth",
          "OpenAI (gpt-4o-mini)",
          "Fireworks AI",
          "Spoonacular",
          "Cloudflare R2",
          "SSE"
        ]}
        enableSlideshow={true}
        slideshowAutoplay={false}
        images={[]}
        slideFocus={[{ xPct: 0, yPct: 0 }]}
        features={[
          "Weekly drag-and-drop meal planner with calendar grouping, meal grouping, serving scaling, day-range planning, and automatic macro and cost calculations for each meal.",
          "Multi-input recipe ingestion via Spoonacular URL extraction, paste-in text parsing using OpenAI models, and image-to-recipe extraction using OpenAI (gpt-4o-mini).",
          "Ingredient normalization with unit conversion to a canonical base, enabling accurate list aggregation and computation of both macro nutrients and total cost per meal.",
          "Auto-generated shopping lists grouped by grocery category across customizable date ranges with deduped ingredients, usage counts per recipe, detailed macro breakdowns, and total cost math per week and per meal.",
          "AI image generation using Fireworks AI with Cloudflare R2 storage and Server-Sent Events updates for real-time image status.",
          "Server-Sent Events streams long-running image generation status to the client with a 15s heartbeat interval to keep connections alive.",
          "End-to-end auth using JWT + Google OAuth with protected routes and user-scoped data access.",
          "AI usage tracking logs response time, tokens, and estimated cost for text parsing and image-to-recipe extraction flows.",
          "PWA-ready frontend with manifest and service worker integration for an installable experience.",
          "Created a way to explore and share recipes with friends on the app and save them to your own collection."
        ]}
        featureHighlights={[
          "Weekly drag-and-drop meal planner",
          "calendar grouping",
          "serving scaling",
          "day-range planning",
          "Multi-input recipe ingestion",
          "Spoonacular URL extraction",
          "paste-in text parsing",
          "image-to-recipe extraction",
          "Ingredient normalization",
          "unit conversion to a canonical base",
          "Auto-generated shopping lists",
          "grouped by grocery category",
          "7-day ranges",
          "deduped ingredients",
          "usage counts per recipe",
          "total cost math",
          "AI image generation",
          "Fireworks AI",
          "Cloudflare R2 storage",
          "Server-Sent Events updates",
          "15s heartbeat interval",
          "JWT + Google OAuth",
          "protected routes",
          "user-scoped data access",
          "AI usage tracking",
          "response time",
          "tokens",
          "estimated cost",
          "capped at 100 items per request",
          "up to 3 images per request",
          "8MB per image",
          "2 uploads per user",
          "PWA-ready frontend",
          "manifest",
          "service worker integration"
        ]}
      />


      <ProjectCard
        title="Lead Generation & Outreach Automation Platform"
        description="A Full-stack CRM and lead intelligence system for discovering businesses that need new websites and driving data-powered email/SMS outreach with real-time analytics. Searches for businesses in a given geographic region and audits their website quality + SEO and collects business data for outreach.
"
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}
        icon={autoWebsiteGeneratorLogo}
        iconDisableRounding={true}
        badges={[
          "Node.js",
          "React",
          "MongoDB",
          "Mongoose",
          "Puppeteer",
          "Google Lighthouse",
          "WebSockets",
          "Leaflet",
          "p-limit",
          "Express.js",
          "Google Places API",
          "SendGrid",
          "Telnyx",
          "TailwindCSS",
        ]}
        integrations={[
          {
            name: "Google Places",
            logo: googlePlacesIcon,
            className: "",
          },
          {
            name: "Google Lighthouse",
            logo: googleLightHouseIcon,
            rounded: true,
            className: "",
          },
          { name: "SendGrid", logo: twilioColoredIcon, className: "", rounded: true },
          {
            name: "Telnyx",
            logo: telnyxColoredIcon,
            rounded: false,
            className: "",
          },
          {
            name: "FixMyOldWebsite",
            logo: autoWebsiteGeneratorLogo,
            className: "",
            rounded: false,
          }
        ]}
        features={[
          "Distributed job system with atomic MongoDB claiming ensures exactly-once processing across parallel workers.",
          "Concurrency-controlled Lighthouse + Puppeteer audits (50+ workers) using p-limit to prevent CPU spikes and resource exhaustion.",
          "CRM-style lead dashboard with search, filters, sorting, bulk actions, saved views, and customizable lead profiles.",
          "Dual-worker architecture separates heavy scanning/audits from outreach to maximize throughput and system stability.",
          "Chrome process registry & lifecycle manager prevents orphaned browsers and memory leaks during massive audit runs.",
          "Deterministic tile-based geo scanner guarantees full regional coverage, zero duplicates, and crash-safe resume support.",
          "Automated multi-step email campaigns with dynamic templating, score-based logic, A/B testing, and timezone-aware delivery.",
          "Interactive analytics dashboard with real-time metrics for scan progress, audit scores, outreach performance, worker health, and system throughput.",
        ]}
        featureHighlights={[
          "outdated websites detection",
          "technical scoring engine",
          "website quality analysis",
          "lead qualification",
          "CRM",
          "bulk actions",
          "stability",
          "analytics dashboard",
          "real-time metrics",
          "campaign performance tracking",
          "conversion analytics",
          "worker health monitoring",
          "system throughput analytics",

          "distributed job system",
          "atomic MongoDB",
          "exactly-once processing",
          "concurrency control",
          "p-limit",
          "50+ parallel workers",
          "Lighthouse",
          "Puppeteer",
          "dual-worker architecture",
          "Chrome process registry",
          "lifecycle manager",
          "memory leaks",
          "deterministic",
          "tile-based",
          "geographic scanning",
          "full regional coverage",
          "zero duplicates",
          "crash-safe",
          "persistent state",
          "Google Places API",
          "category filtering",
          "scoring-based gating",
          "dual audit system",
          "performance",
          "SEO",
          "accessibility",
          "custom HTML analysis",
          "outdated stacks",
          "technical debt",
          "exponential backoff",
          "fallback audit modes",
          "configurable timeouts",
          "WebSocket",
          "live dashboard",
          "job queues",
          "throughput",
          "active workers",
          "concurrency levels",
          "system health",
          "Leaflet",
          "geographic visualization",
          "MongoDB schemas",
          "millions of records",
          "cursor-based pagination",
          "aggregation pipelines",
          "geospatial queries",
          "distance-based sorting",
          "multi-step",
          "email + SMS",
          "campaign engine",
          "variable templating",
          "score-based",
          "conditional sections",
          "timezone-aware",
          "business-hours scheduling",
          "daily send limits",
          "duplicate-contact prevention",
          "unique constraints",
          "A/B testing",
          "analytics",
        ]}
        images={[]}
        showAllImages={false}
        enableSlideshow={false}
      />

      <ProjectCard
        title="AI Resume Optimizer & Job Tracker"
        description="Built a full-stack tool that analyzes resumes against job descriptions to assess candidate fit, optimize ATS keywords, and generate tailored summaries. Enables selective improvements, polished PDF exports, and job application tracking with intelligent duplicate detection and analytics."
        icon={aiResumeOptimzerLogo} // swap in when ready
        iconDisableRounding={false}
        highlightsOn={highlightsOn}
        setHighlightsOn={setHighlightsOn}

        integrations={[
          { name: "OpenAI", logo: chatGptIcon, className: "invert" },
        ]}
        badges={[
          "React 19",
          "Next.js 16",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Mongoose",
          "Tailwind CSS",
          "Framer Motion",
          "OpenAI GPT-5.2",
          "Puppeteer",
          "cheerio",
        ]}
        features={[
          "Built an AI-powered resume optimization system using GPT models to generate ATS-aligned summaries, keyword recommendations, and role-specific content from job descriptions.",
          "Implemented job description ingestion from raw text and URLs using Axios + Cheerio, extracting structured metadata.",
          "Designed a real-time resume editor with shared HTML templates powering both live preview and server-side PDF export via Puppeteer.",
          "Developed a keyword scoring pipeline combining AI relevance scores with candidate-skill matching to surface missing keywords.",
          "Built persistent job tracking with MongoDB, including URL-based duplicate prevention and day-based application filtering.",
          "Implemented usage telemetry and cost tracking for AI calls, exposing token usage and estimated spend in analytics dashboards.",
        ]}
        featureHighlights={[
          "AI-powered resume optimization system",
          "GPT models",
          "ATS-aligned summaries",
          "keyword recommendations",
          "job description ingestion",
          "Axios + Cheerio",
          "structured metadata",
          "real-time resume editor",
          "shared HTML templates",
          "live preview",
          "PDF export",
          "Puppeteer",
          "keyword scoring pipeline",
          "candidate-skill matching",
          "job tracking",
          "MongoDB",
          "URL-based duplicate prevention",
          "usage telemetry",
          "cost tracking",
          "token usage",
          "analytics dashboards",
        ]}
      />

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
          "Express.js",
          "MongoDB",
          "Mongoose",
          "Tailwind",
          "OAuth 2.0",
          "RBAC",
          "JWT Auth",
          "Google Analytics",
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
          "ChatGPT API",
          "TikTok API",
          "Prompt Engineering",
          "AI Workflows",
          "MongoDB",
          "Mongoose",
          "OAuth 2.0",
          "RBAC",
          "JWT Auth",
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

      <ProjectCard
        title="Scrollos - Internal Catalog Platform"
        collapsible={true}
        // collapsedByDefault={true}
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
          "Mongoose",
          "OAuth 2.0",
          "RBAC",
          "JWT Auth",
          "Vanilla CSS",
        ]}
        slideshowAutoplay={false}
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
        collapsedLabel={"View Old Projects"}
        expandedLabel={"Hide Old Projects"}
        items={[
          <ProjectCard
            title="Smart Meal Planner - Weekly Planning & Budgeting Tool"
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

          <>
            <ProjectCard
              title="Collaborative To-Do List"
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
              title="Personal Daily Planner - Time-Based Task Organizer"
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
              title="Real-Time Chat App - WebSocket Messaging"
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
              title="Weather Forecast - API-Driven Weather App"
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
          </>,
        ]}
      />
    </MotionSection>
  );
}

export default ProjectsSection;
