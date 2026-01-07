import React from "react";
import { motion } from "framer-motion";
import MotionSection from "./MotionSection.jsx";

import adidasIcon from "../../assets/project-integration-icons/adidas.svg?format=png&quality=80&as=src";
import seattleReignFcIcon from "../../assets/project-integration-icons/seattleReignFc.png?format=png&quality=80&as=src";
import uswntIcon from "../../assets/project-integration-icons/uswnt.png?format=png&quality=80&as=src";
import storiedSportsIcon from "../../assets/project-integration-icons/storiedSports.png?format=png&quality=80&as=src";
import theRealestIcon from "../../assets/project-integration-icons/theRealest.png?format=png&quality=80&as=src";
import splitifyLogo from "../../assets/project-logos/splitifyLogo.png?format=png&quality=80&as=src";

// 2351 Labs text logo component
const LabsTextLogo = () => (
  <div className="w-12 h-12 bg-linear-to-br from-slate-900 to-slate-800 border border-slate-600 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:from-slate-800 group-hover:to-slate-700 group-hover:border-slate-500 relative overflow-hidden rounded-md">
    {/* Tech-inspired background pattern */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-linear-to-r from-transparent via-slate-500 to-transparent"></div>
    </div>

    {/* Main text */}
    <span className="text-white font-mono font-bold text-xs tracking-wider relative z-10">2351</span>
    <span className="text-slate-400 font-mono text-[8px] tracking-widest relative z-10 -mt-0.5">LABS</span>
  </div>
);

const companies = [
  {
    name: "Adidas",
    logo: adidasIcon,
    rounded: true,
  },
  {
    name: "Seattle Reign FC",
    logo: seattleReignFcIcon,
    rounded: true,
  },
  {
    name: "USWNT",
    logo: uswntIcon,
    rounded: true,
  },
  {
    name: "Storied Sports",
    logo: storiedSportsIcon,
    rounded: false,
  },
  {
    name: "The REALEST",
    logo: theRealestIcon,
    rounded: true,
  },
  {
    name: "Splitify",
    logo: splitifyLogo,
    rounded: false,
  },
  {
    name: "2351 Labs",
    logo: <LabsTextLogo />, // Text logo component
    rounded: false,
  },
];

function CompanyBanner({ centerOnMobile = false }) {
  return (
    <MotionSection
      className="py-8"
      delay={0.2}
      duration={0.8}
      staggerChildren={0.08}
      delayChildren={0.1}
    >
      <motion.div
        className={`flex flex-wrap items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300 ${
          centerOnMobile ? 'justify-center' : 'justify-start'
        }`}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {companies.map((company) => (
          <motion.div
            key={company.name}
            className="flex flex-col w-[70px] h-[90px] lg:h-fit lg:w-fit items-center  gap-2 group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <div className="relative ">
              {React.isValidElement(company.logo) ? (
                company.logo
              ) : company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className={`w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110 ${
                    company.rounded ? "rounded-full" : ""
                  }`}
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-xs text-gray-600 text-center">{company.name}</span>
                </div>
              )}
              <div className="absolute -inset-2 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
            <span className="text-xs text-center text-neutral-200 font-medium tracking-wide uppercase">
              {company.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}

export default CompanyBanner;
