// ViewMoreProjects.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ViewMore({
  items = [],
  title = "More Projects",
  collapsedLabel = "View More Projects",
  expandedLabel = "Hide Projects",
  className = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mt-20 ${className}`}>
      {/* Centered focus control */}
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        {/* <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-4">
          {title}
        </p> */}

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="
            group relative inline-flex items-center gap-3
            h-12 px-8 rounded-full
            bg-neutral-900/60 backdrop-blur
            border border-neutral-700
            text-neutral-200 text-sm font-medium
            shadow-lg shadow-black/30
            hover:border-neutral-500 hover:text-white
            focus:outline-none
          "
          aria-expanded={open}
        >
          {/* glow ring */}
          <span className="absolute inset-0 rounded-full ring-1 ring-neutral-600/30 group-hover:ring-neutral-400/40 transition-all" />

          <span className="relative z-10">
            {open ? expandedLabel : collapsedLabel}
          </span>

          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 text-neutral-400 group-hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>
      </div>

      {/* Expand / collapse */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="more-projects"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* slight backdrop to increase focus */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 to-transparent pointer-events-none" />

              {items.map((node, idx) => (
                <div key={idx}>{node}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
