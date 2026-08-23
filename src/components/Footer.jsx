// Site chrome only: the colophon, copyright, timezone, the legal routes and
// the cookie control. Everything a visitor might actually want next lives in
// the homepage's contact section, and repeating it here is what made the two
// read as one long duplicated block.
//
// On the same 12-column grid as every section: the colophon spans cols 1-7
// (a narrower measure is fewer columns, never a max-width), the rule and the
// bottom bar span all twelve.
//
// The cookie control is here because this renders on every route: Cookiebot's
// own floating widget is hidden site-wide (see #CookiebotWidget in theme.css)
// because it renders as a black disc over the page content.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { REPO_URL } from "../data/site";

const LEGAL_LINK =
  "type-label text-text-meta hover:text-primary transition-colors duration-300";

export function Footer({ data }) {
  const { name } = data;
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t rule-t bg-bg no-print">
      <div className="grid-12 py-s64">

        <p className="md:col-span-7 text-small text-text-meta">
          {t("footer.colophon")}{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary transition-colors duration-300
                       rule-underline focus-ring"
          >
            {t("footer.viewSource")} <span aria-hidden="true" className="text-label">↗</span>
          </a>
        </p>

        <div className="md:col-span-12 mt-s48 pt-s24 border-t rule-t
                        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-s16">
          <div className="flex flex-wrap items-center gap-x-s24 gap-y-s4">
            <p className="text-small text-text-meta">© {year} {name}</p>
            <p className="type-label text-text-meta">{t("footer.timezone")}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-s24 gap-y-s8" aria-label={t("footer.legalAriaLabel")}>
            <Link to="/impressum" className={LEGAL_LINK}>{t("footer.impressum")}</Link>
            <Link to="/privacy" className={LEGAL_LINK}>{t("footer.privacy")}</Link>
            <Link to="/sitemap" className={LEGAL_LINK}>{t("footer.sitemap")}</Link>
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
