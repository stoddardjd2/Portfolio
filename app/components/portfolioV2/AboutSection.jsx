import React from "react";
import MotionSection from "./MotionSection.jsx";

function AboutSection() {
  return (
    <MotionSection delay={0.18}>
      <h2 className="text-sm font-medium text-white mb-6 uppercase tracking-widest">
        More About Me
      </h2>
      <div className="prose prose-invert prose-sm text-neutral-400">
        <p className="mb-4">
          Hi, I am Jared -- a full-stack developer who loves building systems
          that feel effortless for users and powerful under the hood. I thrive
          where engineering, UX, and real-world product constraints meet.
        </p>
        <p className="mb-4">
          As a solo founder, I have learned how to design intuitive interfaces,
          architect scalable backends, debug complex date logic, and ship
          features fast that people actually want.
        </p>
        <p>
          I am looking to join a team where I can bring this level of ownership,
          velocity, and product insight to real-world engineering challenges.
        </p>
      </div>
    </MotionSection>
  );
}

export default AboutSection;
