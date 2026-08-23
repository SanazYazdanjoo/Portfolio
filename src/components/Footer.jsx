// The footer carries site-level chrome and nothing else: the colophon,
// copyright, timezone, the legal routes, and the cookie control.
//
// It used to also carry a status block, the email address, LinkedIn, GitHub,
// the CV, credentials, the design system and a second "View source" link —
// a second navigation of the site, sitting directly under a homepage contact
// section that already offers availability, the email address, LinkedIn,
// GitHub and the CV. Two of everything, 300px apart. The contact section
// keeps those (see HomeContact.jsx); the footer keeps what belongs to the
// site rather than to the person.
//
// It renders on every route, so the cookie control lives here: Cookiebot's
// own floating widget is hidden site-wide (see #CookiebotWidget in
// theme.css) because it renders as a black disc over the page content, and
// this button plus the one on /privacy are how consent gets withdrawn.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { REPO_URL } from "../data/site";

const LEGAL_LINK =
  "text-xs font-bold uppercase tracking-caps text-text-meta " +
  "hover:text-primary transition-colors duration-300";

export function Footer({ data }) {
  const { name } = data;
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t rule-t bg-bg no-print">
      <div className="w-full max-w-page mx-auto px-4 md:px-8 pt-10 pb-10">

        {/* Colophon — this site is its own case study, so the line naming
            what it is built with is a credibility statement, not fine print.
            "View source" is its own link and the footer's only one, which is
            why the utility column's duplicate of it is gone. */}
        <p className="text-sm text-text-meta leading-relaxed max-w-[62ch] mb-8">
          {t("footer.colophon")}{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary transition-colors duration-300
                       rule-underline focus-ring"
          >
            {t("footer.viewSource")} <span aria-hidden="true" className="text-xs">↗</span>
          </a>
        </p>

        <div className="rule-line mb-4" />

        {/* Bottom bar: copyright + timezone, then the legal routes and the
            cookie control. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <p className="text-xs text-text-meta font-medium">© {year} {name}</p>
            <p className="text-xs font-bold uppercase tracking-caps text-text-meta">
              {t("footer.timezone")}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label={t("footer.legalAriaLabel")}>
            <Link to="/impressum" className={LEGAL_LINK}>
              {t("footer.impressum")}
            </Link>
            <Link to="/privacy" className={LEGAL_LINK}>
              {t("footer.privacy")}
            </Link>
            <Link to="/sitemap" className={LEGAL_LINK}>
              {t("footer.sitemap")}
            </Link>
            <button
              type="button"
              onClick={() => window.Cookiebot?.renew?.()}
              className={`${LEGAL_LINK} focus-ring`}
            >
              {t("footer.cookieSettings")}
            </button>
          </nav>
        </div>

      </div>
    </footer>
  );
}
