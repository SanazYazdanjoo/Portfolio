import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { StatusDot } from "./StatusDot";
import { REPO_URL } from "../data/site";

// Utility links come in two tiers. The first is what a visitor might
// actually want next (CV, credentials, GitHub). The second, after a
// hairline, is site meta — the design system, this page's source, and the
// cookie control — which belongs here and not in the primary nav.
//
// The cookie control is a button, not a link: Cookiebot's own floating
// widget is hidden site-wide (see #CookiebotWidget in theme.css) because it
// renders as a black disc on top of the page content, so this and the
// matching button on /privacy are how consent gets withdrawn.
const UTILITY_LINK =
  "text-text hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5";
const META_LINK =
  "text-text-meta hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5";

function ExternalMark() {
  return <span aria-hidden="true" className="text-xs">↗</span>;
}

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
                <Link to="/cv" className={UTILITY_LINK}>
                  {t("footer.cvLink")} <ExternalMark />
                </Link>
              </li>
              <li>
                <Link to="/credentials" className={UTILITY_LINK}>
                  {t("credentials.heading")} <ExternalMark />
                </Link>
              </li>
              {contact.github && (
                <li>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className={UTILITY_LINK}>
                    {t("footer.githubLink")} <ExternalMark />
                  </a>
                </li>
              )}
            </ul>

            {/* Second tier: site meta, after a hairline. */}
            <ul className="mt-5 pt-4 border-t rule-t space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/designsystem" className={META_LINK}>
                  {t("nav.designSystem")}
                </Link>
              </li>
              <li>
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={META_LINK}>
                  {t("footer.viewSource")} <ExternalMark />
                </a>
              </li>
            </ul>

            <p className="mt-5 text-text-meta text-xs uppercase tracking-caps font-bold">
              {t("footer.timezone")}
            </p>
          </div>
        </div>
        )}

        {/* Divider */}
        <div className="rule-line mb-4" />

        {/* The colophon sentence itself now sits beside the homepage's
            contact section (HomeContact.jsx), where it reads as a
            credibility statement rather than as the smallest line on the
            page. "View source" stays reachable from every route via the
            utility column above. */}
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
            {/* The replacement for Cookiebot's own floating widget, which is
                hidden site-wide (see #CookiebotWidget in theme.css). This bar
                renders on every route — including /contact, where the grid
                above is suppressed — so consent stays withdrawable from
                anywhere, alongside the button on /privacy. */}
            <button
              type="button"
              onClick={() => window.Cookiebot?.renew?.()}
              className="text-xs font-bold uppercase tracking-caps text-text-meta
                         hover:text-primary transition-colors duration-300 focus-ring"
            >
              {t("footer.cookieSettings")}
            </button>
          </nav>
        </div>

      </div>
    </footer>
  );
}