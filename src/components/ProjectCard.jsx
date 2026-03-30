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
      className="relative py-10 border-t border-border/30 opacity-40"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-caveat text-3xl text-primary/20 select-none">
          {String(index + 1).padStart(2, "0")}.
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

// ─── Main ProjectCard ────────────────────────────────────────────────────────
export function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  if (!project || project.status === "coming-soon" || !project.id) {
    return <ComingSoonCard project={project || {}} index={index} />;
  }

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
        className="group block"
        aria-label={`View case study: ${project.title}`}
      >
        {/* ── Image ──────────────────────────────────────────── */}
        <div className="relative aspect-[16/9] overflow-hidden bg-primary/[0.03]">
          {hasImage ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700
                         group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-caveat text-[5rem] text-primary/[0.06] select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* ── Content below image ────────────────────────────── */}
        <div className="pt-5 pb-10">

          {/* Always visible: number + title + role */}
          <div className="flex items-start gap-4">
            <span
              className="font-caveat text-2xl md:text-3xl text-primary/20 leading-none
                         select-none shrink-0 pt-0.5
                         group-hover:text-primary/40 transition-colors duration-500"
            >
              {String(index + 1).padStart(2, "0")}.
            </span>

            <div className="flex-1 min-w-0">
              <h3
                className="font-black text-xl md:text-2xl text-text tracking-tight leading-tight
                           group-hover:text-primary transition-colors duration-300"
              >
                {project.title}
              </h3>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/50 mt-2 block">
                {project.role}
                <span className="text-text/20 mx-2">·</span>
                <span className="font-medium text-text/30">{project.timeline}</span>
              </span>
            </div>
          </div>

          {/* ── Hover reveal ─────────────────────────────────── */}
          <div
            className="grid transition-all duration-500 ease-out
                        max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100
                        overflow-hidden"
          >
            <div className="pt-5 ml-[calc(1.5rem+1rem)] md:ml-[calc(2rem+1rem)]">

              {/* Tagline */}
              {project.tagline && (
                <p className="text-sm text-text/50 leading-relaxed mb-4 max-w-lg">
                  {project.tagline}
                </p>
              )}

              {/* Research Methods */}
              {project.methods && project.methods.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-4">
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

              {/* Metrics + CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/20">
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {project.metrics.map((m) => (
                      <span key={m.label} className="text-[11px]">
                        <span className="font-black text-primary">{m.value}</span>
                        <span className="text-text/35 ml-1">{m.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/50
                             flex items-center gap-1.5 shrink-0 ml-auto"
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
          </div>

        </div>
      </Link>
    </motion.div>
  );
}