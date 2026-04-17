import React from 'react';
import ProjectCard from '../src/components/portfolio/ProjectCard.jsx';

// Example ProjectCard component using JSON structure from project-creation-prompt.md
function ProjectCardExample() {
  // JSON structure as defined in the prompt
  const projectData = {
    "title": "AI-Powered Task Management System",
    "actions": [
      {
        "href": "https://github.com/example/task-manager",
        "target": "_blank",
        "label": "GitHub",
        "icon": "lucide:external-link"
      },
      {
        "href": "https://task-manager-demo.com",
        "target": "_blank",
        "label": "Live Demo",
        "icon": "lucide:external-link"
      }
    ],
    "collapsible": true,
    "collapsedByDefault": true,
    "description": "Full-stack task management application with AI-powered prioritization, automated scheduling, and team collaboration features built with modern web technologies.",
    "badges": [
      "React 18",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Redis",
      "Socket.io",
      "OpenAI GPT-4",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "enableSlideshow": true,
    "slideshowAutoplay": false,
    "images": [
      {
        "type": "image",
        "src": "/assets/projects/task-manager-dashboard.png",
        "title": "Main Dashboard"
      },
      {
        "type": "image",
        "src": "/assets/projects/task-manager-mobile.png",
        "title": "Mobile View"
      },
      {
        "type": "iframe",
        "src": "https://task-manager-demo.com",
        "title": "Live Demo"
      }
    ],
    "slideFocus": [
      { "xPct": 0, "yPct": 0 },
      { "xPct": 0, "yPct": 0 },
      { "xPct": 0, "yPct": 0 }
    ],
    "integrations": [
      { "name": "OpenAI", "logo": "chatgpt-icon", "className": "invert" },
      { "name": "Stripe", "logo": "stripe-icon" },
      { "name": "Google Calendar", "logo": "google-calendar-icon" }
    ],
    "features": [
      "AI-powered task prioritization using GPT-4 analysis of task descriptions, deadlines, and dependencies.",
      "Real-time collaborative editing with Socket.io enabling live updates across multiple users simultaneously.",
      "Automated scheduling system that optimizes task assignments based on team member availability and skills.",
      "Advanced analytics dashboard with PostgreSQL aggregation pipelines and Redis caching for performance.",
      "Mobile-responsive design with offline capability using Service Workers and IndexedDB.",
      "Role-based access control with JWT authentication and encrypted password storage.",
      "Integration with Google Calendar API for automatic meeting scheduling and conflict detection.",
      "Automated email notifications and reminders using SendGrid with customizable templates.",
      "Data export functionality supporting CSV, PDF, and JSON formats with background job processing.",
      "Comprehensive audit logging and change history tracking for compliance and debugging."
    ],
    "featureHighlights": [
      "AI-powered task prioritization",
      "GPT-4",
      "Real-time collaborative editing",
      "Socket.io",
      "Automated scheduling system",
      "Advanced analytics dashboard",
      "PostgreSQL",
      "Redis",
      "Mobile-responsive design",
      "offline capability",
      "Service Workers",
      "IndexedDB",
      "Role-based access control",
      "JWT authentication",
      "Google Calendar API",
      "automated meeting scheduling",
      "SendGrid",
      "Data export functionality",
      "CSV",
      "PDF",
      "JSON",
      "audit logging",
      "change history tracking"
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Project Card Example</h2>

      {/* Method 1: Using JSON object with spread operator */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Method 1: JSON Object (Spread)</h3>
        <ProjectCard {...projectData} />
      </div>

      {/* Method 2: Using direct JSX props */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Method 2: Direct JSX Props</h3>
        <ProjectCard
          title="AI-Powered Task Management System"
          actions={[
            {
              href: "https://github.com/example/task-manager",
              target: "_blank",
              label: "GitHub",
              icon: "lucide:external-link"
            },
            {
              href: "https://task-manager-demo.com",
              target: "_blank",
              label: "Live Demo",
              icon: "lucide:external-link"
            }
          ]}
          collapsible={true}
          collapsedByDefault={true}
          description="Full-stack task management application with AI-powered prioritization, automated scheduling, and team collaboration features built with modern web technologies."
          badges={[
            "React 18",
            "TypeScript",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "Redis",
            "Socket.io",
            "OpenAI GPT-4",
            "Tailwind CSS",
            "Framer Motion"
          ]}
          enableSlideshow={true}
          slideshowAutoplay={false}
          images={[
            {
              type: "image",
              src: "/assets/projects/task-manager-dashboard.png",
              title: "Main Dashboard"
            },
            {
              type: "image",
              src: "/assets/projects/task-manager-mobile.png",
              title: "Mobile View"
            },
            {
              type: "iframe",
              src: "https://task-manager-demo.com",
              title: "Live Demo"
            }
          ]}
          slideFocus={[
            { xPct: 0, yPct: 0 },
            { xPct: 0, yPct: 0 },
            { xPct: 0, yPct: 0 }
          ]}
          integrations={[
            { name: "OpenAI", logo: "chatgpt-icon", className: "invert" },
            { name: "Stripe", logo: "stripe-icon" },
            { name: "Google Calendar", logo: "google-calendar-icon" }
          ]}
          features={[
            "AI-powered task prioritization using GPT-4 analysis of task descriptions, deadlines, and dependencies.",
            "Real-time collaborative editing with Socket.io enabling live updates across multiple users simultaneously.",
            "Automated scheduling system that optimizes task assignments based on team member availability and skills.",
            "Advanced analytics dashboard with PostgreSQL aggregation pipelines and Redis caching for performance.",
            "Mobile-responsive design with offline capability using Service Workers and IndexedDB.",
            "Role-based access control with JWT authentication and encrypted password storage.",
            "Integration with Google Calendar API for automatic meeting scheduling and conflict detection.",
            "Automated email notifications and reminders using SendGrid with customizable templates.",
            "Data export functionality supporting CSV, PDF, and JSON formats with background job processing.",
            "Comprehensive audit logging and change history tracking for compliance and debugging."
          ]}
          featureHighlights={[
            "AI-powered task prioritization",
            "GPT-4",
            "Real-time collaborative editing",
            "Socket.io",
            "Automated scheduling system",
            "Advanced analytics dashboard",
            "PostgreSQL",
            "Redis",
            "Mobile-responsive design",
            "offline capability",
            "Service Workers",
            "IndexedDB",
            "Role-based access control",
            "JWT authentication",
            "Google Calendar API",
            "automated meeting scheduling",
            "SendGrid",
            "Data export functionality",
            "CSV",
            "PDF",
            "JSON",
            "audit logging",
            "change history tracking"
          ]}
        />
      </div>
    </div>
  );
}

export default ProjectCardExample;