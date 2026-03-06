// src/components/AboutMe.jsx
import React from "react";
import { motion } from "framer-motion";

// Only these three skill categories are shown here — scannable, recruiter-relevant.
// Full skills list (QA, Tools) lives on the CV.
const SKILL_COLUMNS = ["Research", "Design", "Technical"];

export function AboutMe({ data }) {
  const { bio, name, aboutImage, doodles, skills } = data;

  return (
    <section className="container mx-auto px-4 md:px-8 relative z-20">

      {/* ── Top row: 60/40 grid — Bio+Heading (left) · Photo (right) ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-start mb-16">

        {/* LEFT COL — 60%: Doodle heading + Bio */}
        <div className="md:col-span-3 flex flex-col gap-6 pt-2">

          {/* Doodle heading — inline, part of the flow (not absolute) */}
          <motion.div
            className="w-fit"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
           
            <div className="font-display text-xl md:text-8xl  text-text mt-2">About Me</div>
          </motion.div>

          {/* Bio text */}
          <motion.p
            className="text-base md:text-lg text-text font-medium leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          >
            {bio}
          </motion.p>
        </div>

        {/* RIGHT COL — 40%: Photo, anchored to top */}
        <motion.div
          className="md:col-span-2 w-full"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          {/* On mobile: constrain width so photo doesn't go full-bleed */}
          <div className="max-w-[280px] mx-auto md:max-w-none md:mx-0">
            <img
              src={aboutImage}
              alt={name}
              className="w-full object-cover  
                         transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Skills grid: Research · Design · Technical ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {SKILL_COLUMNS.map((category, colIndex) => (
          <motion.div
            key={category}
            className="skills bg-bg px-6 py-7 group"
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
            <div className="flex flex-wrap gap-2 ">
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

    </section>
  );
}