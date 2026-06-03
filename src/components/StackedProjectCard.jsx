// src/components/StackedProjectCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BAND_COLORS = [
  "var(--peach)",
  "var(--gold)",
  "var(--accent-weak)",
  "var(--muted)",
];

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-text/40 mb-2">
        {label}
      </span>
      <div className="border-t border-text/10 pt-2.5">{children}</div>
    </div>
  );
}

export function StackedProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const color = BAND_COLORS[index % BAND_COLORS.length];
  const hasImage = project.thumbnail && !imgError;

  return (
    <motion.div
      // onHoverStart/End track the entire div (header + expanded body),
      // so moving from the header into the body never fires onHoverEnd.
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
    >
      <Link to={`/projects/${project.id}`} className="block outline-none">

        {/* ── Colored band — fixed height, never changes size ── */}
        <div
          className="flex items-end gap-6 px-8 md:px-16 pb-5 pt-5 border-t border-black/[0.06]"
          style={{ backgroundColor: color, minHeight: "5.5rem" }}
        >
          <span className="font-mono text-[10px] text-black/35 tabular-nums self-start mt-1 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h2 className="flex-1 min-w-0 font-display font-black text-2xl md:text-[1.9rem] tracking-[-0.03em] uppercase leading-tight text-text-display">
            {project.title}
          </h2>

          <motion.span
            className="shrink-0 font-mono text-[9px] tracking-[0.18em] uppercase text-black/25 self-end mb-0.5"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            View
          </motion.span>
        </div>

        {/* ── Expandable detail body — in normal flow, no layout trickery ── */}
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{
            height: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.4, delay: open ? 0.12 : 0 },
          }}
          className="overflow-hidden bg-surface"
        >
          <div className="px-8 md:px-16 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-text/[0.07]">

            {/* Role + Timeline */}
            <div className="md:col-span-3 flex flex-col gap-5">
              <Field label="Role">
                <p className="text-[13px] font-semibold text-text/85 leading-snug">
                  {project.role}
                </p>
              </Field>
              <Field label="Timeline">
                <p className="font-mono text-[11px] text-text/55">{project.timeline}</p>
              </Field>
            </div>

            {/* Context + Methods */}
            <div className="md:col-start-5 md:col-span-4 flex flex-col gap-5">
              {project.tagline && (
                <Field label="Context">
                  <p className="text-[12px] text-text/60 leading-relaxed">{project.tagline}</p>
                </Field>
              )}
              {(project.tags || []).length > 0 && (
                <Field label="Methods">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span key={tag} className="font-mono text-[10px] text-text/40">
                        — {tag}
                      </span>
                    ))}
                  </div>
                </Field>
              )}
            </div>

            {/* Thumbnail */}
            <div className="md:col-start-9 md:col-span-4 self-end">
              <div className="aspect-[16/9] overflow-hidden bg-text/5">
                {hasImage ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-4xl italic text-text/[0.05]">
                    {index + 1}
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>

      </Link>
    </motion.div>
  );
}
