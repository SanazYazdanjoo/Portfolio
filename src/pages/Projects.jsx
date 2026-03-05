// src/pages/Projects.jsx
import React from "react";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ScribbleUnderline } from "../components/DoodleLibrary";
import { motion } from "framer-motion";

// ─── Empty state — shown when projects array is empty ───────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-border/30 px-12 py-20 text-center"
    >
      <div className="mb-6">
        {/* Sketch pencil icon */}
        <svg className="w-12 h-12 text-primary/25 mx-auto" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </div>
      <p className="font-black text-lg text-text/30 uppercase tracking-widest mb-2">
        Work in Progress
      </p>
      <p className="text-sm text-text/40 max-w-xs mx-auto leading-relaxed">
        Case studies are being documented. Check back soon — good research takes time to tell properly.
      </p>
    </motion.div>
  );
}

export default function Projects() {
  // Separate published from coming-soon so we can render them differently
  const published = projects.filter((p) => p.status !== "coming-soon");
  const comingSoon = projects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = projects.length > 0;

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
      <div className="container relative z-10 mx-auto px-4 md:px-8">

        {/* ── Page header ── */}
        <motion.header
          className="mb-16 relative inline-block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text">
            Case Studies<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-primary opacity-70" />

      
        </motion.header>

        {/* ── Project cards or empty state ── */}
        {!hasAnyProjects ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-px bg-border/20">

            {/* Published projects */}
            {published.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}

            {/* Coming soon projects — rendered after published ones */}
            {comingSoon.map((project, i) => (
              <ProjectCard
                key={project.id || `coming-soon-${i}`}
                project={project}
                index={published.length + i}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}