// src/components/ProjectCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScribbleUnderline } from "./DoodleLibrary";

// ─── Thumbnail with graceful fallback ───────────────────────────────────────
function ProjectThumbnail({ src, alt, index }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="w-full h-full bg-primary/6 flex items-center justify-center">
        <span className="font-black text-[80px] md:text-[100px] text-primary/10 leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

// ─── Coming Soon card ────────────────────────────────────────────────────────
function ComingSoonCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative border border-border/30 bg-bg overflow-hidden"
    >
      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative z-20 grid md:grid-cols-[1fr_2.2fr]">
        {/* Left: Placeholder thumbnail */}
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[220px] overflow-hidden bg-primary/4">
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary/20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center opacity-50">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-3 block">
            Coming Soon
          </span>
          <h3 className="font-black text-xl md:text-2xl text-text/60 tracking-tight mb-3 line-clamp-2">
            {project.title || "Untitled Project"}
          </h3>
          {project.tagline && (
            <p className="text-sm text-text/40 leading-relaxed">
              {project.tagline}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ProjectCard ────────────────────────────────────────────────────────
export function ProjectCard({ project, index }) {
  // Route any non-published project to the coming soon state
  if (!project || project.status === "coming-soon" || !project.id) {
    return <ComingSoonCard project={project || {}} index={index} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group block border border-border/30 hover:border-primary/40
                   bg-bg hover:bg-primary/[0.02] transition-all duration-300
                   overflow-hidden"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="grid md:grid-cols-[1fr_2.2fr]">
          {/* ── LEFT: project number ─────────────────── */}
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-muted/40">
            <ProjectThumbnail
              className="display-none"
              src={project.thumbnail}
              alt={project.title}
              index={index}
            />

            {/* Index number  */}
            <span
              className="relative justify-center font-black text-[11px] uppercase tracking-widest
                             text-white/60 mix-blend-overlay z-10"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── RIGHT: Content ────────────────────────────────────── */}
          <div className="p-8 md:p-10 flex flex-col justify-between gap-6">

            {/*  Research Methods ← THE KEY DIFFERENTIATOR */}
            {project.methods && project.methods.length > 0 && (
              <div className="display-none">
                <p className="text-[8.5px] font-black uppercase tracking-[0.2em] text-primary/70 mb-2.5">
                  Research Methods
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.methods.map((method) => (
                    <span
                      key={method}
                      className="text-[9.5px] font-semibold text-primary border border-primary/30
                                 bg-primary/5 px-2.5 py-1
                                 group-hover:bg-primary/10 group-hover:border-primary/50
                                 transition-colors duration-300"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* title + tagline + meta */}
            <div>
              <h3
                className="font-black text-xl md:text-2xl text-text group-hover:text-primary
                             transition-colors duration-300 tracking-tight leading-tight mb-3"
              >
                {project.title}
              </h3> 
              <div>
                {project.tagline && (
                  <p className="text-sm text-text/60 leading-relaxed display-none">
                    {project.tagline}
                  </p>
                )}
              </div>

              {/* Role + timeline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                  {project.role}
                </span>
                <span className="text-[9px] text-text/30">·</span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-text/40">
                  {project.timeline}
                </span>
              </div>

            </div>            

{/* CTA */}
              <span
                className="text-[10px] font-black uppercase tracking-widest text-primary/60
                               group-hover:text-primary transition-colors duration-300 flex items-center gap-1.5 shrink-0"
              >
                View Case Study
                <svg
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>

              </span>       

            {/* Bottom block: Metrics + CTA */}
            <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-border/20">
              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-x-5 gap-y-1 display-none">
                  {project.metrics.map((m) => (
                    <span key={m.label} className="text-[10px]">
                      <span className="font-black text-primary">{m.value}</span>
                      <span className="text-text/40 ml-1">{m.label}</span>
                    </span>
                  ))}
                </div>
              )}
            </div> 

                 

          </div>           {/* End of right content */}
        </div>         {/*  End of grid */}
      </Link>
    </motion.div>
  );
}
