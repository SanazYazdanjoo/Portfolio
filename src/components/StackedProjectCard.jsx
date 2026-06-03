// src/components/StackedProjectCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const TAB_COLORS = [
  "var(--peach)",
  "var(--gold)",
  "var(--accent-weak)",
  "var(--muted)",
];

function DataField({ label, children }) {
  return (
    <div className="flex flex-col">
      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-black/45 mb-2">
        {label}
      </span>
      <div className="border-t border-black/10 pt-3">
        {children}
      </div>
    </div>
  );
}

export function StackedProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) {
    return null; // Simplified for focus on active projects
  }

  const tabColor = TAB_COLORS[index % TAB_COLORS.length];
  const hasImage = project.thumbnail && !imgError;

  return (
    <motion.section
      className="relative w-full group isolate px-16" // Explicit 4rem layout padding
      style={{ 
        zIndex: isHovered ? 100 : index + 10,
        // Negative margin tucks the BODY but leaves the HEADER/TITLE visible
        marginTop: index === 0 ? "0" : "-3rem" 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link to={`/projects/${project.id}`} className="block w-full outline-none">
        
        {/* ── 1. The Asymmetrical Header (Titles visible in the stack) ── */}
        <div
          className="h-32 border-t border-black/5 transition-all duration-1000 ease-[0.25, 1, 0.5, 1]"
          style={{ 
            backgroundColor: tabColor,
            // Header lift for interactivity
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
          }}
        >
          {/* 12-Column Grid inside the header for asymmetrical title placement */}
          <div className="grid grid-cols-12 w-full h-full px-10 items-end pb-6">
            <span className="col-span-1 font-mono text-[10px] text-black/40 tabular-nums pb-2">
              {String(index + 1).padStart(2, "0")}
            </span>
            
            {/* Title starts at Column 4 to create the offset asymmetrical feeling */}
            <h2 className="col-start-4 col-span-9 font-display font-black text-3xl tracking-[-0.04em] uppercase leading-[0.85] text-text-display">
              {project.title}
            </h2>
          </div>
        </div>

        {/* ── 2. The Reveal Body ── */}
        <motion.div
          initial={false}
          animate={{ 
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -10 : 0 
          }}
          transition={{ 
            height: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.8, delay: isHovered ? 0.4 : 0 },
            y: { duration: 1.1, ease: [0.25, 1, 0.5, 1] }
          }}
          className="overflow-hidden bg-[#F8F8F8]"
        >
          {/* Grid alignment mirrors the header for visual continuity */}
          <div className="px-10 py-8 grid grid-cols-12 gap-y-12 border-b border-black/5">
            
            {/* Metadata Pinned to Col 1 */}
            <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
              <DataField label="Role">
                <p className="text-[13px] font-bold text-text/90 leading-tight">
                  {project.role}
                </p>
              </DataField>
              <DataField label="Timeline">
                <p className="font-mono text-[11px] text-text/60">{project.timeline}</p>
              </DataField>
            </div>

            {/* Empty Vertical Gutter for Asymmetry */}
            <div className="hidden md:block md:col-span-1 border-r border-black/[0.03]" />

            {/* Context/Summary Pinned to Col 5 */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              {project.tagline && (
                <DataField label="Context">
                  <p className="text-[12px] text-text/60 leading-relaxed font-light">
                    {project.tagline}
                  </p>
                </DataField>
              )}
              <DataField label="Methods">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {(project.tags || []).slice(0, 6).map((item) => (
                    <li key={item} className="font-mono text-[10px] text-text/45 flex items-center gap-2">
                      <span className="w-1 h-px bg-black/15" /> {item}
                    </li>
                  ))}
                </ul>
              </DataField>
            </div>

            {/* Image Visual Pinned to Col 9 */}
            <div className="col-span-12 md:col-start-9 md:col-span-4 self-end">
              <div className="aspect-[21/9] w-full overflow-hidden bg-black/5">
                {hasImage ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover grayscale contrast-[1.1] mix-blend-multiply opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-5 font-mono text-5xl italic">
                    {index + 1}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.section>
  );
}