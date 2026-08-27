import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";
import { CollapsibleSectionHead } from "./CollapsibleSection";
import { HandChevron } from "../../components/HandIcons";
import { EASE } from "./constants";

// Phase config. Labels are resolved via t() at render time; only keys live here.
const PHASE_META = {
  discover: { labelKey: "project.phase.discover", number: "01" },
  define:   { labelKey: "project.phase.define",   number: "02" },
  design:   { labelKey: "project.phase.design",   number: "03" },
  deliver:  { labelKey: "project.phase.deliver",  number: "04" },
};

// Process step — vertical numbered stepper. Suits a research process more
// naturally than a horizontal scroll rail, and fits the narrower content
// column without needing scroll affordances (edge fades, arrows, a
// progress dial) to tell the reader there's more.
function ProcessStep({ item, index, total }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const phase = PHASE_META[item.phase] || PHASE_META.discover;

  return (
    <motion.li
      className="relative pl-11 md:pl-12 pb-10 last:pb-0"
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ delay: Math.min(index, 6) * 0.06, duration: 0.4, ease: EASE }}
    >
      {index < total - 1 && (
        <span aria-hidden="true" className="absolute left-[13px] md:left-[15px] top-9 bottom-0 rule-line-v" />
      )}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9
                   rounded-full rule-circle [--rule-line-color:var(--primary-600)] [--rule-fill-color:var(--bg)] font-mono text-xs font-bold text-primary-600"
      >
        {index + 1}
      </span>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {item.imagePath && !imgError && (
          <div className="w-full sm:w-[150px] aspect-[4/3] shrink-0 overflow-hidden border rule-frame-in [--rule-fill-color:rgb(var(--muted-rgb)/0.4)]">
            <img
              src={item.imagePath}
              alt={item.title}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-2xs uppercase text-text-meta mb-2">
            {phase.number} {t(phase.labelKey)}
            <span className="mx-1.5 text-text/25">·</span>
            {item.type}
          </p>

          <h3 className="font-display font-bold text-base text-text leading-snug mb-2">
            {item.title}
          </h3>

          <p className="text-sm text-text-meta leading-relaxed">
            {item.annotation}
          </p>

          {item.insight && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded((p) => !p)}
                aria-expanded={expanded}
                className="flex items-center gap-2 group/btn"
              >
                <span className="text-2xs font-extrabold uppercase text-primary-600">
                  {expanded ? t("project.process.hideInsight") : t("project.process.keyInsight")}
                </span>
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-text-meta group-hover/btn:text-dim transition-colors"
                >
                  <HandChevron className="w-3 h-3" />
                </motion.span>
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm leading-relaxed text-text-meta
                                  border-l-2 rule-edge-l [--rule-line-color:rgb(var(--primary-rgb)/0.4)] pl-3 mt-3">
                      {item.insight}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}

// Process gallery — vertical stepper. Carries the same collapsible-body
// contract as ContentSection (`#<id>-body`, aria-hidden, the 0fr/1fr grid
// trick) rather than reusing it, because the body is an <ol> of steps
// rather than prose, and the sidebar/pill nav resolves `process` like any
// other section id.
export function ProcessGallerySection({ items, number, isOpen, onToggle, staggerDelayMs = 0 }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  if (!items || items.length === 0) return null;

  return (
    <section id="process" className="pt-10 mb-14 md:pt-16 md:mb-20 border-t rule-t scroll-mt-32">
      <CollapsibleSectionHead
        id="process" number={number} kicker={t("project.process.kicker")} heading={t("project.process.heading")}
        isOpen={isOpen} onToggle={onToggle}
      />

      <div
        id="process-body"
        data-collapsible-body
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: "" } : {})}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: prefersReducedMotion ? "none" : `grid-template-rows 350ms ease ${staggerDelayMs}ms`,
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <ol className="list-none p-0 m-0 max-w-measure transition-[max-width] duration-300 ease-smooth" role="list" aria-label={t("project.process.ariaLabel")}>
            {items.map((item, i) => (
              <ProcessStep key={`${item.phase}-${i}`} item={item} index={i} total={items.length} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
