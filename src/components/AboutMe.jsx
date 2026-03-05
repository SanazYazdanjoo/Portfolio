// src/components/AboutMe.jsx
import React from "react";
import { motion } from "framer-motion";

// Only these three skill categories are shown here — scannable, recruiter-relevant.
// Full skills list (QA, Tools) lives on the CV.
const SKILL_COLUMNS = ["Research", "Design", "Technical"];

export function AboutMe({ data }) {
  const { bio, name, aboutImage, doodles, skills } = data;

  return (
    <div className="container mx-auto px-4 md:px-8 relative z-20">

      {/* Doodle heading */}
      <div className="absolute -top-10 md:-top-16 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <img src={doodles.aboutMe} className="absolute" alt="About Me Doodle" />
      </div>

      {/* ── Top row: Bio (left) + Photo (right) ── */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center pt-20 md:pt-10 mb-14">

        {/* Bio */}
        <div className="max-w-lg relative z-20 self-end">
          <p className="text-lg text-text font-medium leading-relaxed">{bio}</p>
        </div>

        {/* Photo */}
        <div className="relative justify-self-center md:justify-self-end mt-10 md:mt-0">
          <div className="text-text relative z-10 hover:text-primary transition-colors duration-500">
            <img
              src={aboutImage}
              className="object-cover grayscale"
              alt={name}
            />
          </div>
        </div>
      </div>

      {/* ── Skills grid: Research · Design · Technical ── */}
      <motion.div
        className="about-skills grid grid-cols-1 md:grid-cols-3 gap-px bg-border/20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {SKILL_COLUMNS.map((category, colIndex) => (
          <motion.div
            key={category}
            className="bg-bg px-6 py-7 group"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: colIndex * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            {/* Column label */}
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-4">
              {category}
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {(skills[category] || []).map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium text-text/80 border border-border/60
                             px-2.5 py-1 transition-all duration-300
                             group-hover:border-primary/30 group-hover:text-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}