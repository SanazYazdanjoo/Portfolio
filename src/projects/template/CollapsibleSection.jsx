// The one section pattern: divider, numbered kicker, clickable heading,
// collapsible body. CollapsibleSectionHead is exported separately because
// ProcessGallery.jsx renders the same head over a non-prose body.

import { motion, useReducedMotion } from "framer-motion";
import { Chevron } from "./Chevron";
import { EASE } from "./constants";

// Section head — the one heading pattern, used by every section. The
// <button> nests inside the <h2> rather than the reverse: <h2> is not
// permitted content inside <button>, and this matches the ARIA Authoring
// Practices accordion example.
export function CollapsibleSectionHead({ id, number, kicker, heading, isOpen, onToggle }) {
  return (
    <>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-3">
        {number} — {kicker}
      </p>
      <h2 className="mb-8">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-body`}
          className="group flex w-full items-center justify-between gap-4 border-0 bg-transparent
                     p-0 text-left font-display font-extrabold text-2xl md:text-3xl tracking-tight
                     leading-tight text-text focus:outline-none focus-visible:ring-2
                     focus-visible:ring-primary-600"
        >
          <span>{heading}</span>
          <span className="mt-0.5 shrink-0 text-text-meta transition-colors duration-200 group-hover:text-primary-600 no-print">
            <Chevron isOpen={isOpen} />
          </span>
        </button>
      </h2>
    </>
  );
}

// Content section wrapper: divider, clickable head, collapsible body. Open
// state is controlled by the parent's openSections set. Body height is
// animated with the CSS grid 0fr/1fr trick rather than measured in JS, so
// it works for arbitrary content — text, figures, the metrics strip —
// without a resize observer. `staggerDelayMs` is only non-zero for the
// brief window right after "Collapse/Expand all" fires, so every panel
// settles in sequence instead of snapping together; a single section's own
// toggle always stays instant.
export function ContentSection({ id, number, kicker, heading, isOpen, onToggle, staggerDelayMs = 0, children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="pt-10 mb-14 md:pt-16 md:mb-20 border-t border-border scroll-mt-32"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <CollapsibleSectionHead
        id={id} number={number} kicker={kicker} heading={heading}
        isOpen={isOpen} onToggle={onToggle}
      />

      <div
        id={`${id}-body`}
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
          <div className="pb-1">{children}</div>
        </div>
      </div>
    </motion.section>
  );
}
