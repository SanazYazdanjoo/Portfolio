// src/components/Footer.jsx
// Data-driven footer: pulls all content from profile.js — zero hardcoded strings.
// Sections: CTA + email · Social links · Availability status · Legal bar

import React from "react";
import { Link } from "react-router-dom";

export function Footer({ data }) {
  const { name, contact, role } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/20 bg-bg no-print">
      <div className="container mx-auto px-4 md:px-8 py-10">

        {/* ── Top row: CTA + Socials ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">

          {/* Left — CTA + email */}
          <div>
            <p className="font-caveat text-2xl md:text-3xl text-text leading-tight mb-2">
              Let's work together.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm md:text-base font-bold text-primary hover:text-primary/70
                         transition-colors duration-200 break-all"
            >
              {contact.email}
            </a>
          </div>

          {/* Right — Social links */}
          <nav className="flex items-center gap-5 sm:pt-2" aria-label="Social links">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-black uppercase tracking-widest text-text/40
                           hover:text-primary transition-colors duration-200"
              >
                LinkedIn
              </a>
            )}
            <span className="text-text/15 text-[10px] select-none" aria-hidden="true">·</span>
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-black uppercase tracking-widest text-text/40
                           hover:text-primary transition-colors duration-200"
              >
                GitHub
              </a>
            )}
          </nav>
        </div>

        {/* ── Availability status ── */}
        <div className="flex items-center gap-2 mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
            aria-hidden="true"
          />
          <p className="text-[11px] text-text/40 tracking-wide">
            Open to {role} roles in Germany
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-border/10 mb-4" />

        {/* ── Bottom bar: copyright + legal ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <p className="text-[11px] text-text/30 font-medium">
            © {year} {name}
          </p>

          <nav className="flex items-center gap-5" aria-label="Legal">
            <Link
              to="/impressum"
              className="text-[10px] font-bold uppercase tracking-widest text-text/30
                         hover:text-primary transition-colors duration-200"
            >
              Impressum
            </Link>
            <Link
              to="/privacy"
              className="text-[10px] font-bold uppercase tracking-widest text-text/30
                         hover:text-primary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              to="/sitemap"
              className="text-[10px] font-bold uppercase tracking-widest text-text/30
                         hover:text-primary transition-colors duration-200"
            >
              Sitemap
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}