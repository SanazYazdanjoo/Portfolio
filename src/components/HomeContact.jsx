// The homepage's closing ask, rendered inside the same HomeSection rhythm as
// About and Case Studies ("03 — Get in touch"). The page previously ended on
// the last case study and handed the reader straight to a footer whose
// contact details are 14px utility text — the one thing the page is asking
// for was the quietest thing on it.
//
// Deliberately not a second copy of /contact: no copy-to-clipboard, no
// "good things to send me" list, no phone. Availability, the address at real
// scale, and the three links a recruiter opens next. Everything here already
// exists in profile data, so the two pages cannot disagree.

import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { StatusDot } from "./StatusDot";
import { REPO_URL } from "../data/site";
import { EASE } from "../utils/motion";

const LINK =
  "inline-flex items-center gap-1.5 text-sm font-bold text-text " +
  "hover:text-primary-600 transition-colors duration-200 focus-ring";

// The house external-link mark. Decorative, but it still carries the full
// text-meta ink rather than a half-opacity wash — an opacity that puts a
// glyph at 3.6:1 is not a "subtle" version of a legible one.
function ExternalMark() {
  return <span aria-hidden="true" className="text-xs">↗</span>;
}

export function HomeContact({ data }) {
  const { contact } = data;
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
    >
      {/* Availability — the answer to "can she even take this job?" */}
      <div className="flex items-start gap-3 max-w-[58ch]">
        <StatusDot label={t("footer.available")} />
        <p className="text-base leading-relaxed text-text">
          {contact.availability}
        </p>
      </div>

      {/* The address, at the scale of a heading. `break-words` because a
          long address must wrap rather than push the column wide. */}
      <a
        href={`mailto:${contact.email}`}
        className="block mt-8 md:mt-10 font-display font-extrabold text-2xl md:text-3xl
                   tracking-[-0.01em] leading-tight text-text break-words rule-underline
                   hover:text-primary-600 transition-colors duration-200 focus-ring"
      >
        {contact.email}
      </a>

      {/* Where a reader goes next. /cv is the CV itself — a page whose print
          stylesheet produces the one-page A4, which is why this is a route
          and not a file download. */}
      <ul className="mt-8 md:mt-10 flex flex-wrap gap-x-10 gap-y-4 list-none m-0 p-0
                     border-t rule-t pt-6">
        {contact.linkedin && (
          <li>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn <ExternalMark />
            </a>
          </li>
        )}
        {contact.github && (
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className={LINK}>
              GitHub <ExternalMark />
            </a>
          </li>
        )}
        <li>
          <Link to="/cv" className={LINK}>
            {t("nav.cv")}
          </Link>
        </li>
        <li>
          <Link to="/contact" className={LINK}>
            {t("home.contact.moreWays")}
          </Link>
        </li>
      </ul>

      {/* Colophon — a credibility statement, not fine print. It used to be
          10px at the very bottom of the footer, which is the wrong place for
          the one sentence proving that the person asking for a UX
          engineering role built the page the claim is on. It sits here, at
          reading size, next to the ask. */}
      <p className="mt-10 md:mt-12 border-t rule-t pt-6 max-w-[62ch]
                    text-sm leading-relaxed text-text-meta">
        {t("footer.colophon")}{" "}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary transition-colors duration-200
                     rule-underline focus-ring"
        >
          {t("footer.viewSource")} <ExternalMark />
        </a>
      </p>
    </motion.div>
  );
}
