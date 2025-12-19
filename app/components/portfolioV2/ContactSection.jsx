import React, { useState } from "react";
import MotionSection from "./MotionSection.jsx";
import portraitGrayNoBg from "@/assets/heavily-edited-fotor-glasses-white-cropped.png";
import downloadResume from "./resumeDownloadHelper.js";

function ContactSection({ setOpen }) {
  const now = new Date();

  return (
    <>
      <MotionSection
        as="footer"
        id="contact"
        className="border-t border-neutral-800 pt-16"
        delay={0.22}
      >
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="inline-flex flex-col flex-none w-fit">
              <h2 className="text-3xl w-fit font-medium text-white tracking-tight mb-4">
                Let's Build Something Great
              </h2>
              <p className="text-neutral-400 mb-8 max-w-md font-light">
                I am open to full-stack, backend, frontend and product-focused
                roles.
              </p>

              <div className="flex gap-1.5 sm:gap-4 !gap-y-2 flex-wrap max-w-[350px]">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="h-10 whitespace-nowrap cursor-pointer px-6 rounded bg-white text-neutral-950 text-sm font-medium flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <span className="iconify w-4 h-4" data-icon="lucide:mail" />
                  Email Me
                </button>
                <a
                  href="https://www.linkedin.com/in/jared-stoddard/"
                  target="_blank"
                  className="h-10 px-6  rounded border border-neutral-800 text-neutral-300 text-sm font-medium flex items-center gap-2 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <span
                    className="iconify w-4 h-4"
                    data-icon="lucide:linkedin"
                  ></span>{" "}
                  LinkedIn
                </a>
                <a
                  href="https://github.com/stoddardjd2"
                  target="_blank"
                  className="h-10 w-10 rounded border border-neutral-800 text-neutral-300 flex items-center justify-center hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <span
                    className="iconify w-4 h-4"
                    data-icon="lucide:github"
                  ></span>
                </a>
                <span
                  aria-hidden
                  className="hidden sm:block w-0 basis-full h-0"
                />
                <button
                  type="button"
                  onClick={downloadResume}
                  variants={{
                    hidden: { opacity: 0, x: 0, y: 40, filter: "blur(0px)" },
                    visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
                  }}
                  className="inline-flex flex-none   items-center justify-center gap-2 h-10 px-6 rounded-md border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors cursor-pointer"
                >
                  <span
                    className="iconify w-4 h-4"
                    data-icon="lucide:download"
                  ></span>
                  Download Resume
                </button>
              </div>
            </div>
            <img
              className="sm:h-[230px] mt-auto mx-auto scale-x-[-1]  px-[clamp(.1rem,5vw,12.5rem)] lg:px-0"
              src={portraitGrayNoBg}
            />
          </div>
        </div>
        <div className="text-right mt-10">
          <p className="text-xs text-neutral-600">
            (c) {now.getFullYear()} Jared. All rights reserved.
          </p>
        </div>
      </MotionSection>

      {/* Modal rendered outside footer styling */}
    </>
  );
}

export default ContactSection;
