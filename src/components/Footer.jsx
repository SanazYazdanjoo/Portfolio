// The footer: one 32px band of mono label text. Copyright and timezone on
// the left — copyright, colophon and the source link — and the four legal
// destinations on the right.
//
// The cookie control sits here because this renders on every route:
// Cookiebot's own floating widget is hidden site-wide (see #CookiebotWidget
// in theme.css) because it renders as a black disc over the page content.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { REPO_URL } from "../data/site";
import { HandArrow } from "./HandArrow";

const LEGAL_LINK = "hover:text-primary-600 transition-colors duration-200";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t rule-t no-print">
      <div
        className="grid-12 text-tag font-mono text-dim"
        style={{ paddingBlock: "var(--space-32)" }}
      >
        <div className="md:col-span-12 flex flex-wrap items-baseline justify-between gap-s24">
          <span>
            &copy; {year} &middot; {t("footer.colophon")}{" "}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-s6 text-primary-600 rule-underline hover:opacity-80 transition-opacity duration-200 focus-ring"
            >
              {t("footer.viewSource")} <HandArrow direction="up-right" />
            </a>
          </span>

          <nav
            className="flex flex-wrap gap-s24 uppercase"
            aria-label={t("footer.legalAriaLabel")}
          >
            <Link to="/impressum" className={LEGAL_LINK}>{t("footer.impressum")}</Link>
            <Link to="/privacy" className={LEGAL_LINK}>{t("footer.privacy")}</Link>
            <Link to="/sitemap" className={LEGAL_LINK}>{t("footer.sitemap")}</Link>
            <button
              type="button"
              onClick={() => window.Cookiebot?.renew?.()}
              className={`${LEGAL_LINK} uppercase focus-ring`}
            >
              {t("footer.cookieSettings")}
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
