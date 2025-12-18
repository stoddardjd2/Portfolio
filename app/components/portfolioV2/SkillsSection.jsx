import React from "react";
import { motion } from "framer-motion";
import MotionSection from "./MotionSection.jsx";

const headerVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Grid-level: stagger columns
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,   // first column starts a bit after section header
      staggerChildren: 0.25 // gap between each column's start
    },
  },
};

// Column fades in, then lets its children run
const columnVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren", // fade in column first, then header/list
    },
  },
};

// h3 animation
const subHeaderVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// controls stagger of <li> inside each column
const listContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.9,   // wait until h3 is mostly in, THEN start items
      staggerChildren: 0.06, // ripple down the list
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

function SkillsSection() {
  return (
    <MotionSection
      id="skills"
      className="scroll-mt-30"
      delay={0.1}
      duration={0.6}
    >
      <motion.h2
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-sm font-medium text-white mb-8 uppercase tracking-widest"
      >
        Skills Snapshot
      </motion.h2>

      {/* Grid that staggers columns */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SkillColumn
          icon="lucide:layout"
          title="Frontend"
          items={[
            "React 19, Vite",
            "TailwindCSS",
            "Framer Motion",
            "Responsive UI",
            "UI/UX Design Tools",
            "Event Tracking",
          ]}
        />
        <SkillColumn
          icon="lucide:server"
          title="Backend"
          items={[
            "Node.js, Express",
            "Stripe",
            "Telnyx SMS",
            "Plaid",
            "Cron / Schedulers",
            "Auth 2.0 & Web Security",
          ]}
        />
        <SkillColumn
          icon="lucide:database"
          title="Data & Cloud"
          items={[
            "MongoDB, Mongoose",
            "Aggregation Pipelines",
            "Optimized Queries",
            "AWS / Vercel / Netlify",
            "Web Scraping",
            "Data Modeling & Optimization",
          ]}
        />
        <SkillColumn
          icon="lucide:wrench"
          title="Foundational"
          items={[
            "CI/CD Pipelines",
            "Performance Optimization",
            "SEO & Analytics",
            "Accessibility",
            "Admin Dashboards & Tools",
            "Rapid Prototyping & Iteration",
          ]}
        />
      </motion.div>
    </MotionSection>
  );
}

function SkillColumn({ icon, title, items }) {
  return (
    <motion.div variants={columnVariants}>
      {/* h3 comes in first for this column */}
      <motion.h3
        variants={subHeaderVariants}
        className="flex items-center gap-2 text-white font-medium mb-4 text-sm"
      >
        <span
          className="iconify w-4 h-4 text-neutral-500"
          data-icon={icon}
        ></span>{" "}
        {title}
      </motion.h3>

      {/* then list items stagger, but while they're animating,
          next column's h3 is already starting thanks to gridVariants.staggerChildren */}
      <motion.ul
        className="space-y-2 text-sm text-neutral-500"
        variants={listContainerVariants}
      >
        {items.map((item) => (
          <motion.li key={item} variants={listItemVariants}>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default SkillsSection;
