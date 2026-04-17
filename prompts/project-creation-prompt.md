# ProjectCard JSON Generator Prompt

## System / Instruction Prompt

You are a senior full-stack engineer and technical writer.

Generate **ProjectCard-ready JSON output** that maps exactly to the props of the following React component:

`<ProjectCard {...props} />`

The output **MUST be valid JSON only** (no comments, no markdown, no explanations).

## React Component Usage

```jsx
import ProjectCard from "../src/components/portfolio/ProjectCard.jsx";

// Example usage with JSON output:
const projectData = {
  "title": "My Project Title",
  "description": "Project description...",
  "badges": ["React", "Node.js"],
  "features": ["Feature description 1", "Feature description 2"],
  "featureHighlights": ["exact", "substrings", "from", "features"]
};

function ProjectsSection() {
  return (
    <ProjectCard {...projectData} />
  );
}
```

---

## 🚨 Critical Rules (Must Follow)

1. **featureHighlights MUST be exact substrings of entries in `features`**
   - Case-sensitive
   - No paraphrasing
2. Do **NOT** invent technologies or capabilities
3. Use **resume-grade, technically precise language**
4. Avoid marketing fluff or vague claims
5. Output must be directly usable in a React component
6. Every featureHighlights entry is an exact, case-sensitive substring of at least one features entry, so string-based highlighting will work reliably.
7. Mention metrics when possible but do not overdo it
8. OUTPUT MUST BE REACT COMPONENT (JSX)
  

---




## 🧩 Required JSON Shape & React Component Format

### JSON Structure:
```json
{
  "title": "",
  "actions": [
    {
      "href": "",
      "target": "_blank",
      "label": "",
      "icon": "lucide:external-link"
    }
  ],
  "description": "",
  "badges": [],
  "enableSlideshow": true,
  "slideshowAutoplay": false,
  "images": [],
  "slideFocus": [
    { "xPct": 0, "yPct": 0 }
  ],
  "features": [],
  "featureHighlights": []
}
```

### React Component Usage:
```jsx
import ProjectCard from "../src/components/portfolio/ProjectCard.jsx";

// In your ProjectsSection.jsx:
<ProjectCard
  title="Project Title"
  actions={[
    {
      href: "https://github.com/example/repo",
      target: "_blank",
      label: "GitHub",
      icon: "lucide:external-link"
    }
  ]}
  description="Project description..."
  badges={["React", "Node.js", "MongoDB"]}
  enableSlideshow={true}
  slideshowAutoplay={false}
  images={[
    {
      type: "image",
      src: "/assets/projects/project-image.png",
      title: "Screenshot"
    }
  ]}
  slideFocus={[
    { xPct: 0, yPct: 0 }
  ]}
  features={[
    "Feature description 1 with technical details",
    "Feature description 2 with implementation details"
  ]}
  featureHighlights={[
    "exact substring from features",
    "another exact match"
  ]}
/>
```

## EXAMPLE:

### React Component Format:
```jsx
<ProjectCard
  title="Scrollos - Internal Catalog Platform"
  actions={[
    {
      href: "https://github.com/2351Labs/the-ui/?tab=readme-ov-file",
      target: "_blank",
      label: "Demo",
      icon: "lucide:external-link"
    }
  ]}
  collapsible={true}
  collapsedByDefault={true}
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
    "Vanilla CSS"
  ]}
  enableSlideshow={true}
  slideshowAutoplay={false}
  images={["scrollosProjectImageList"]}
  slideFocus={[
    { xPct: 0, yPct: 0 },
    { xPct: 0, yPct: 0 },
    { xPct: 0, yPct: 0 },
    { xPct: 0, yPct: 0 },
    { xPct: 0, yPct: 0 },
    { xPct: 0, yPct: 0 }
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
    "Production deployment using Netlify, Render, and MongoDB Atlas with environment-based configuration."
  ]}
  featureHighlights={[
    "Centralized catalog",
    "server-side pagination",
    "filtering",
    "URL query parameters",
    "shareable",
    "Role-based access control",
    "OAuth 2.0",
    "JWT-secured API endpoints",
    "Sortable, resizable data tables",
    "Inline documentation editing",
    "change history",
    "light and dark themes",
    "responsive UI",
    "Netlify",
    "Render",
    "MongoDB Atlas"
  ]}
/>
### JSON Format:
```json
{
  "title": "Resume Generator + Job Tracker (AI-assisted)",
  "actions": [
    {
      "href": "https://github.com/your-org/resume-generator",
      "target": "_blank",
      "label": "GitHub",
      "icon": "lucide:external-link"
    }
  ],
  "collapsible": true,
  "collapsedByDefault": true,
  "description": "Full-stack app that ingests job descriptions, generates ATS-aligned resume outputs, exports high-fidelity PDFs, and tracks job applications with usage and cost telemetry.",
  "badges": [
    "React",
    "Vite",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Puppeteer",
    "Axios",
    "Cheerio",
    "OpenAI"
  ],
  "enableSlideshow": false,
  "slideshowAutoplay": false,
  "images": [],
  "slideFocus": [{ "xPct": 0, "yPct": 0 }],
  "features": [
    "Job description ingestion from raw text and URLs using Axios + Cheerio, extracting cleaned page content.",
    "Generated ATS-friendly professional summaries and structured job metadata using OpenAI.",
    "Keyword extraction with categories and relevance scores, then candidate relevance scoring against configured skills.",
    "Single-source resume templating: the backend serves templates and styles used by both live preview and PDF rendering.",
    "Server-side PDF generation with Puppeteer producing consistent A4 output aligned with the live HTML preview.",
    "Persisted job applications in MongoDB with URL-based duplicate prevention and day-based filtering for reviews.",
    "Token usage telemetry persisted per session with estimated input/output tokens and cost breakdown in the UI.",
    "Resume bullet highlights supported via exact phrase matching, rendering bold text in both preview and PDF."
  ],
  "featureHighlights": [
    "Job description ingestion",
    "Axios + Cheerio",
    "ATS-friendly professional summaries",
    "structured job metadata",
    "Keyword extraction",
    "relevance scores",
    "candidate relevance scoring",
    "Single-source resume templating",
    "live preview",
    "PDF rendering",
    "PDF generation",
    "Puppeteer",
    "MongoDB",
    "URL-based duplicate prevention",
    "Token usage telemetry",
    "cost breakdown",
    "exact phrase matching"
  ]
}
```

