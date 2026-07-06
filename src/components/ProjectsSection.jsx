// ─────────────────────────────────────────────────────────────
// ProjectsSection.jsx — the "Case Studies" muscle on Home.
//
// - id="projects" → /#projects nav anchor scrolls here
//   (scroll-mt offsets the sticky Nav so the title isn't hidden)
// - Full-bleed stacked rows: no gaps, each row carries its own
//   top hairline (per the Ink & Bloom layout rules)
// - Published rows first, coming-soon sinks to the bottom
//   (ordering lives in projects.js, not here)
// - Empty state: if there are no published projects at all,
//   a Caveat handwritten note instead of a blank void
// - Stagger fade-up on scroll-in, house easing, once only
// ─────────────────────────────────────────────────────────────
import React from "react";
import { motion } from "framer-motion";
import { sortedProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const EASE = [0.22, 0.61, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function EmptyState() {
  return (
    <motion.div variants={fadeUp} className="px-6 sm:px-16 py-16 text-center">
      <p
        className="doodle-text m-0"
        style={{ fontSize: "2rem", color: "var(--text-dim)" }}
      >
        Case studies are being inked — check back soon.
      </p>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const hasPublished = sortedProjects.some((p) => p.status === "published");

  return (
    <motion.section
      id="projects"
      className="w-full pt-16 md:pt-20 scroll-mt-24"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Section header: hairline → sticky label rail, per Home pattern */}
      <div className="w-full h-px mb-8" style={{ background: "var(--border)" }} />
      <motion.div variants={fadeUp} className="px-6 sm:px-16 mb-12">
        <p
          className="type-label m-0"
          style={{ color: "var(--primary-600)" }}
        >
          Case Studies
        </p>
      </motion.div>

      {/* Full-bleed stacked rows — no gap; rows own their hairlines */}
      {hasPublished ? (
        <div>
          {sortedProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
          {/* Closing hairline under the last row */}
          <div className="w-full h-px" style={{ background: "var(--border)" }} />
        </div>
      ) : (
        <EmptyState />
      )}
    </motion.section>
  );
}
