// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

export function Footer({ data }) {
  const { name, contact, role } = data;
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/20 bg-bg no-print">
      <div className="container mx-auto px-4 md:px-8 py-10">

        {/* ── Minimalist HR Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 mb-16 pt-8">
          
          {/* Column 1: Status (Matches AboutMe heading alignment) */}
          <div className="md:col-span-5">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-text/40 mb-5">
              Status
            </h3>
            <div className="flex items-start gap-3">
              <span className="relative flex h-2 w-2 mt-1.5 shrink-0" role="img" aria-label="Available">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-sm text-text/80 leading-relaxed font-medium">
                Currently based in {contact.location}.<br />
                Open to {role} roles.
              </p>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-text/40 mb-5">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a href={`mailto:${contact.email}`} className="text-text hover:text-primary transition-colors duration-300">
                  {contact.email}
                </a>
              </li>
              {contact.linkedin && (
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                    LinkedIn <span className="text-[10px] opacity-50">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Utility */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-text/40 mb-5">
              Utility
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/cv" className="text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                  Download CV (PDF) <span className="text-[10px] opacity-50">↗</span>
                </Link>
              </li>
              {contact.github && (
                <li>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                    GitHub <span className="text-[10px] opacity-50">↗</span>
                  </a>
                </li>
              )}
              <li className="text-text/50 pt-1 text-[11px] uppercase tracking-wide font-bold">
                Timezone: CET (UTC+1)
              </li>
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-border/10 mb-4" />

        {/* ── Bottom bar: copyright + legal ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[11px] text-text/30 font-medium">© {year} {name}</p>

          <nav className="flex items-center gap-5" aria-label="Legal">
            <Link
              to="/impressum"
              className="text-[10px] font-bold uppercase tracking-widest text-text/30
                         hover:text-primary transition-colors duration-300"
            >
              {t("footer.impressum")}
            </Link>
            <Link
              to="/privacy"
              className="text-[10px] font-bold uppercase tracking-widest text-text/30
                         hover:text-primary transition-colors duration-300"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/sitemap"
              className="text-[10px] font-bold uppercase tracking-widest text-text/30
                         hover:text-primary transition-colors duration-300"
            >
              {t("footer.sitemap")}
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
