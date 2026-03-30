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
        <span className="font-caveat text-5xl text-primary/15 select-none">
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
        className="group block py-14 md:py-20"
        aria-label={`View case study: ${project.title}`}
      >
        <div
          className={`flex flex-col gap-8
                      ${isEven
                        ? "md:flex-row md:items-start"
                        : "md:flex-row-reverse md:items-start"
                      }`}
        >
          {/* ── Image + Number cluster ──────────────────────── */}
          <div
            className={`relative shrink-0 ${isEven ? "md:mr-8" : "md:ml-8"}`}
          >
            {/* Large number — positioned overlapping the image */}
            <span
              className={`absolute z-10 font-caveat text-[5rem] md:text-[6.5rem]
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
            className={`flex-1 flex flex-col justify-center min-w-0 pt-2
                        ${isEven ? "md:text-left" : "md:text-right"}`}
          >
            {/* Title */}
            <h3
              className="font-black text-xl md:text-2xl text-text tracking-tight leading-tight
                         group-hover:text-primary transition-colors duration-300 mb-2"
            >
              {project.title}
            </h3>

            {/* Role + timeline — always visible */}
            <div
              className={`flex flex-wrap items-center gap-x-3 mb-1
                          ${isEven ? "" : "md:justify-end"}`}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60">
                {project.role}
              </span>
              <span className="text-[9px] text-text/20">·</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-text/35">
                {project.timeline}
              </span>
            </div>

            {/* ── Hover reveal ─────────────────────────────── */}
            <div
              className="grid transition-all duration-500 ease-out
                         max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100
                         overflow-hidden"
            >
              <div className="pt-4">
                {/* Tagline */}
                {project.tagline && (
                  <p
                    className={`text-sm text-text/50 leading-relaxed mb-4 max-w-md
                                ${isEven ? "" : "md:ml-auto"}`}
                  >
                    {project.tagline}
                  </p>
                )}

                {/* Research Methods */}
                {project.methods && project.methods.length > 0 && (
                  <div
                    className={`flex flex-wrap gap-x-3 gap-y-1.5 mb-4
                                ${isEven ? "" : "md:justify-end"}`}
                  >
                    {project.methods.map((method) => (
                      <span
                        key={method}
                        className="text-[10px] font-semibold text-primary/70
                                   border-b border-primary/25"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                )}

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div
                    className={`flex flex-wrap gap-x-5 gap-y-1 mb-4
                                ${isEven ? "" : "md:justify-end"}`}
                  >
                    {project.metrics.map((m) => (
                      <span key={m.label} className="text-[11px]">
                        <span className="font-black text-primary">{m.value}</span>
                        <span className="text-text/35 ml-1">{m.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black
                              uppercase tracking-[0.2em] text-primary/40
                              group-hover:text-primary/70 transition-colors duration-300
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
            {/* ── End hover reveal ─────────────────────────── */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}