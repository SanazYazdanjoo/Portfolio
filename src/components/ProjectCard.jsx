// src/components/ProjectCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ─── Coming Soon card ────────────────────────────────────────────────────────
function ComingSoonCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="py-16 opacity-40"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-sans font-black text-5xl text-primary/15 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-bold text-lg text-text/40 tracking-tight">
            {project.title || "Untitled Project"}
          </h3>
          {project.tagline && (
            <p className="text-sm text-text/25 mt-1">{project.tagline}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ProjectCard (zigzag editorial layout) ──────────────────────────────
export function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  if (!project || project.status === "coming-soon" || !project.id) {
    return <ComingSoonCard project={project || {}} index={index} />;
  }

  const isEven = index % 2 === 0;
  const hasImage = project.thumbnail && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="paper-bg group block py-14 md:py-20"
        aria-label={`View case study: ${project.title}`}
      >
        <div
          className={`flex flex-col gap-8
                      ${isEven
                        ? "md:flex-row md:items-stretch"
                        : "md:flex-row-reverse md:items-stretch"
                      }`}
        >
          {/* ── Image + Number cluster ──────────────────────── */}
          <div
            className={`relative shrink-0 ${isEven ? "md:mr-8" : "md:ml-8"}`}
          >
            {/* Large number */}
            <span
              className={`absolute z-10 font-sans font-black text-[5rem] md:text-[6.5rem]
                          leading-none select-none text-primary/15
                          group-hover:text-primary/30 transition-colors duration-500
                          ${isEven
                            ? "-left-4 -top-8 md:-left-6 md:-top-10"
                            : "-right-4 -top-8 md:-right-6 md:-top-10"
                          }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Thumbnail */}
            <div className="photo-frame relative w-56 md:w-64 aspect-[3/4] overflow-hidden bg-primary/[0.03]">
              {hasImage ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-all duration-700
                             grayscale group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-primary/[0.04] flex items-center justify-center">
                  <span className="font-caveat text-4xl text-primary/[0.08] select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Text content ───────────────────────────────── */}
          <div
            className={` flex-1 flex flex-col justify-start min-w-0 pt-2
                        ${isEven ? "md:text-left" : "md:text-right"}`}
          >
            {/* Title */}
            <h3
              className="font-black text-xl md:text-2xl text-text tracking-tight leading-tight
                         group-hover:text-primary transition-colors duration-300"
            >
              {project.title}
            </h3>

            {/* Tagline — always visible as the hook */}
            {project.tagline && (
              <p
                className={`text-sm text-text/45 leading-relaxed mt-2 max-w-md
                            ${isEven ? "" : "md:ml-auto"}`}
              >
                {project.tagline}
              </p>
            )}

            {/* ── Hover reveal ─────────────────────────────── */}
            <div
              className="grid transition-all duration-500 ease-out
                         max-h-0 opacity-100 group-hover:max-h-[300px]
                         overflow-hidden"
            >
              <div className="pt-5 space-y-4">

                {/* Methods — compact inline with mid-dots */}
                {project.methods && project.methods.length > 0 && (
                  <p
                    className={`text-[11px] text-text/50 tracking-wide
                                ${isEven ? "" : "md:text-right"}`}
                  >
                    {project.methods.map((method, i) => (
                      <span key={method}>
                        <span className="font-semibold text-text/60">{method}</span>
                        {i < project.methods.length - 1 && (
                          <span className="mx-2 text-primary/30">·</span>
                        )}
                      </span>
                    ))}
                  </p>
                )}

                {/* Metrics — clean grid with accent border */}
                {project.metrics && project.metrics.length > 0 && (
                  <div
                    className={`flex flex-wrap gap-x-6 gap-y-2
                                ${isEven
                                  ? "border-l-2 border-primary/20 pl-4"
                                  : "border-r-2 border-primary/20 pr-4 md:justify-end"
                                }`}
                  >
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5">
                        <span className="font-black text-sm text-primary">{m.value}</span>
                        <span className="text-[10px] text-text/35 uppercase tracking-wider">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
            {/* ── End hover reveal ─────────────────────────── */}

            {/* CTA — pinned to bottom of text column */}
            <span
              className={`mt-auto inline-flex items-center gap-1.5 md:text-xl font-display font-black
                           tracking-[0.2em] text-primary/40
                          group-hover:text-primary/70 transition-colors duration-300 pt-4
                          ${isEven ? "" : "md:ml-auto"}`}
            >
              View Case Study
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1
                           transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}