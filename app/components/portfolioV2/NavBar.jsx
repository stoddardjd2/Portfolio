import React from "react";

function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 glass">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#top"
          className="text-sm font-medium tracking-widest text-white hover:text-neutral-300 transition-colors uppercase"
        >
          Jared Stoddard
        </a>
        <div className="flex gap-6 text-xs font-medium">
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
