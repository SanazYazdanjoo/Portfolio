// The one section pattern: divider, numbered kicker, clickable heading,
// collapsible body. CollapsibleSectionHead is exported separately because
// ProcessGallery.jsx renders the same head over a non-prose body.

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Chevron } from "./Chevron";
import { EASE } from "./constants";

// Section head — the one heading pattern, used by every section. The
// <button> nests inside the <h2> rather than the reverse: <h2> is not
// permitted content inside <button>, and this matches the ARIA Authoring
// Practices accordion example.
export function CollapsibleSectionHead({ id, number, kicker, heading, isOpen, onToggle }) {
  return (
    <>
      <p className="text-2xs font-black uppercase text-primary-600 mb-3">
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
 leading-tight text-text focus-ring"
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
  // On a phone this is a plain <section>: no entrance animation, no
  // in-view observer, no inline opacity or transform — nothing framer-motion
  // would touch between two frames. The reveal-on-scroll was first trimmed
  // to opacity-only here (a y-transform earned each section an iOS
  // compositing layer, and those layers were ordered above the sticky bar
  // mid-scroll and ghosted when contained), and the page still shook. The
  // phone version of this page now carries no scroll-linked motion at all;
  // an entrance a reader cannot distinguish from "the page loaded" is not
  // worth a compositing layer that changes mid-scroll.
  const isMobile = useIsMobile();
  // 128px of scroll margin was the sticky pill bar's height plus breathing
  // room. A phone has no pinned bar any more, so a tap on the section index
  // lands the heading just under the header rather than a bar's height
  // below it.
  const className = "pt-10 mb-14 md:pt-16 md:mb-20 border-t rule-t scroll-mt-6 md:scroll-mt-32";

  const body = (
    <>
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
    </>
  );

  if (isMobile) {
    return (
      <section id={id} className={className}>
        {body}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {body}
    </motion.section>
  );
}
