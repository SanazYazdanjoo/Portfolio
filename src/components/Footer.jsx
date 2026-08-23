import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { StatusDot } from "./StatusDot";

// This site's own source, for the colophon — distinct from contact.github
// (the profile link), which points at the author's GitHub root instead.
const REPO_URL = "https://github.com/SanazYazdanjoo/Portfolio";

export function Footer({ data }) {
  const { name, contact } = data;
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  const isContactPage = pathname === "/contact";

  return (
    <footer className="relative border-t rule-t bg-bg no-print">
      <div className="w-full max-w-page mx-auto px-4 md:px-8 pt-12 pb-10">

        {/* Minimalist HR grid */}
        {!isContactPage && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 mb-10">

          {/* Column 1: Status */}
          <div className="md:col-span-5">
            <h3 className="text-xs font-black uppercase tracking-caps text-text-meta mb-5">
              {t("footer.status")}
            </h3>
            <div className="flex items-start gap-3">
              <StatusDot label={t("footer.available")} />
              <p className="text-sm text-text-meta leading-relaxed font-medium">
                {t("footer.basedIn").replace("{location}", contact.location)}<br />
                {data.heroMeta?.status || t("hero.meta.statusValue")}
              </p>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-black uppercase tracking-caps text-text-meta mb-5">
              {t("footer.directContact")}
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
                    LinkedIn <span aria-hidden="true" className="text-xs">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Utility */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-caps text-text-meta mb-5">
              {t("footer.utility")}
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/cv" className="text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                  {t("footer.cvLink")}<span aria-hidden="true" className="text-xs">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/credentials" className="text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                  {t("credentials.heading")}<span aria-hidden="true" className="text-xs">↗</span>
                </Link>
              </li>
              {contact.github && (
                <li>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                    {t("footer.githubLink")} <span aria-hidden="true" className="text-xs">↗</span>
                  </a>
                </li>
              )}
              <li className="text-text-meta pt-1 text-xs uppercase tracking-caps font-bold">
                {t("footer.timezone")}
              </li>
            </ul>
          </div>
        </div>
        )}

        {/* Divider */}
        <div className="rule-line mb-4" />

        {/* Colophon: this site is the case study */}
        <p className="text-xs text-text-meta font-medium mb-3">
          {t("footer.colophon")}{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary transition-colors duration-300 rule-underline"
          >
            {t("footer.viewSource")} <span aria-hidden="true" className="text-xs">↗</span>
          </a>
        </p>

        {/* Bottom bar: copyright + legal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-text-meta font-medium">© {year} {name}</p>

          <nav className="flex items-center gap-5" aria-label={t("footer.legalAriaLabel")}>
            <Link
              to="/impressum"
              className="text-xs font-bold uppercase tracking-caps text-text-meta
                         hover:text-primary transition-colors duration-300"
            >
              {t("footer.impressum")}
            </Link>
            <Link
              to="/privacy"
              className="text-xs font-bold uppercase tracking-caps text-text-meta
                         hover:text-primary transition-colors duration-300"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/sitemap"
              className="text-xs font-bold uppercase tracking-caps text-text-meta
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