// The footer, as the reference draws it: one 32px band, one line of mono
// label text. Copyright and timezone on the left, the four legal
// destinations on the right. Nothing else — the colophon moved to the
// contact section, where the reference puts it.
//
// The cookie control sits here because this renders on every route:
// Cookiebot's own floating widget is hidden site-wide (see #CookiebotWidget
// in theme.css) because it renders as a black disc over the page content.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

const LEGAL_LINK = "hover:text-primary-600 transition-colors duration-200";

export function Footer({ data }) {
  const { name } = data;
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border no-print">
      <div
        className="grid-12 text-tag font-mono text-text-dim"
        style={{ paddingBlock: "var(--space-32)" }}
      >
        <div className="md:col-span-12 flex flex-wrap items-baseline justify-between gap-s24">
          <span>&copy; {year} {name} &middot; {t("footer.timezone")}</span>

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
