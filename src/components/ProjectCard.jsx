// ─────────────────────────────────────────────────────────────
// ProjectCard.jsx — full-bleed case-study row ("Ink & Bloom v2").
//
// Anatomy:  [domain spine] [mono index] [UPPERCASE Bricolage title
//           + mid-dot methods]                [headline metric →]
//
// Two variants, one component:
//   status: "published"   → interactive <Link>, hover choreography
//   status: "coming-soon" → muted, inert, badged. NOT a link.
//
// Hover (published): row tints blush-weak, spine widens 8→12px,
// title + stat shift to coral-600. All on the house easing.
//
// Data contract: see projects.js. Never hardcode content here.
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

// Domain → spine color. Anything unmapped falls back to blush.
const SPINES = {
  attention: "var(--primary)",     // coral
  collaboration: "var(--highlight)", // gold
  affective: "var(--secondary)",   // rose
  _default: "var(--blush)",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Shared sub-parts ─────────────────────────────────────────

function IndexNumeral({ index, muted }) {
  return (
    <span
      className="shrink-0 mt-2 font-bold"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        color: muted ? "var(--color-ink-300)" : "var(--primary-600)",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

// The HCI proof line: methods joined by mid-dots, max 4.
function MethodsLine({ methods, muted }) {
  if (!methods?.length) return null;
  const shown = methods.slice(0, 4);
  return (
    <p
      className="mt-3 mb-0"
      style={{ fontSize: "var(--fs-sm)", letterSpacing: ".025em" }}
    >
      {shown.map((m, i) => (
        <React.Fragment key={m}>
          <span
            className="font-medium"
            style={{ color: muted ? "var(--color-ink-300)" : "var(--text-dim)" }}
          >
            {m}
          </span>
          {i < shown.length - 1 && (
            <span className="mx-2" style={{ color: "var(--border)" }}>·</span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}

function HeadlineMetric({ metric }) {
  if (!metric) return null;
  return (
    <div className="hidden sm:flex w-[190px] shrink-0 flex-col items-end pt-1">
      <div className="flex items-baseline gap-2">
        <span
          className="project-stat font-extrabold leading-none transition-colors duration-300"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-3xl)" }}
        >
          {metric.value}
        </span>
        <span
          className="uppercase text-right leading-tight max-w-[10ch]"
          style={{
            fontSize: "var(--fs-2xs)",
            letterSpacing: ".05em",
            color: "var(--text-dim)",
          }}
        >
          {metric.label}
        </span>
      </div>
    </div>
  );
}

// ── Published row ────────────────────────────────────────────

function PublishedRow({ project, index }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={project.href || `/projects/${project.slug}`}
        className="group relative block no-underline px-6 sm:px-16 py-7 transition-colors duration-300 hover:bg-[var(--blush-weak)]"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
      >
        {/* Domain spine — widens on hover */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-2 group-hover:w-3 transition-all duration-300"
          style={{ background: SPINES[project.domain] || SPINES._default }}
        />
        <div className="flex items-start gap-6">
          <IndexNumeral index={index} />
          <div className="flex-1 min-w-0">
            <h3
              className="m-0 uppercase font-extrabold group-hover:text-[var(--primary-600)] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-2xl)",
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                color: "var(--text)",
              }}
            >
              {project.title}
            </h3>
            <MethodsLine methods={project.methods} />
          </div>
          <HeadlineMetric metric={project.metrics?.[0]} />
        </div>
        {/* Scoped hover for the stat (Tailwind group can't reach inline color) */}
        <style>{`.group:hover .project-stat { color: var(--primary-600); }`}</style>
      </Link>
    </motion.div>
  );
}

// ── Coming Soon row — same anatomy, muted and inert ──────────

function ComingSoonRow({ project, index }) {
  return (
    <motion.div
      variants={fadeUp}
      aria-disabled="true"
      className="relative px-6 sm:px-16 py-7 opacity-60"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div className="flex items-start gap-6">
        <IndexNumeral index={index} muted />
        <div className="flex-1 min-w-0">
          <h3
            className="m-0 uppercase font-extrabold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-2xl)",
              lineHeight: 1.25,
              color: "var(--color-ink-300)",
            }}
          >
            {project.title}
          </h3>
          <MethodsLine methods={project.methods} muted />
        </div>
        <span
          className="shrink-0 mt-2 uppercase font-black px-2.5 py-1"
          style={{
            fontSize: 9,
            letterSpacing: ".2em",
            color: "var(--text-dim)",
            border: "1px solid var(--border)",
          }}
        >
          Coming Soon
        </span>
      </div>
    </motion.div>
  );
}

// ── Public component ─────────────────────────────────────────

export default function ProjectCard({ project, index = 0 }) {
  return project.status === "coming-soon" ? (
    <ComingSoonRow project={project} index={index} />
  ) : (
    <PublishedRow project={project} index={index} />
  );
}