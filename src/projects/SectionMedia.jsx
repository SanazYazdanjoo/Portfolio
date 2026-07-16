// src/projects/SectionMedia.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Figure grid for project detail pages — speaks the Quiet Edition language:
//   • border-border frames, no chrome, no color noise
//   • mono micro-type captions (same voice as MetaField / Tech Stack)
//   • `span: 2` for hero figures (full-width charts)
//   • type: "video" → autoplay/loop/muted MP4 demo (your MAGIC & Ninja GIFs,
//     converted to MP4 — ~94% smaller). Falls back to the poster frame when
//     the user prefers reduced motion, and in print.
//
// Fully additive: projects without a `figures` key render exactly as before.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { useReducedMotion } from "framer-motion";

export default function SectionMedia({ items }) {
  const prefersReducedMotion = useReducedMotion();
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
      {items.map((f, i) => (
        <figure
          key={i}
          className={`m-0 ${f.span === 2 ? "sm:col-span-2" : ""}`}
        >
          <div className="border border-border bg-muted/30 overflow-hidden">
            {f.type === "video" && !prefersReducedMotion ? (
              <video
                src={f.src}
                poster={f.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={f.alt}
                className={`w-full h-auto block print:hidden ${f.className || ""}`}
              />
            ) : (
              <img
                src={f.type === "video" ? f.poster : f.src}
                alt={f.alt}
                loading="lazy"
                className={`w-full h-auto block ${f.className || ""}`}
              />
            )}
            {/* Print fallback for videos: show the poster frame instead */}
            {f.type === "video" && !prefersReducedMotion && (
              <img
                src={f.poster}
                alt={f.alt}
                className="w-full h-auto hidden print:block"
              />
            )}
          </div>
          {f.caption && (
            <figcaption
              className="mt-2.5 font-mono text-2xs uppercase tracking-wider
                         text-text/45 leading-relaxed"
            >
              {f.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
