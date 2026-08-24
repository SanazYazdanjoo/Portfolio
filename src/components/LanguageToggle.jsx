// EN / DE, exactly as the reference sets it: mono label type, separated from
// the nav by a hairline, the active language in the accent under a 1px rule
// and the inactive one in the faint ink token. It stays a real <button> —
// the reference draws two links because a static template cannot toggle.

import React from "react";
import { useTranslation } from "../context/LanguageContext";

export function LanguageToggle({ className = "" }) {
  const { lang, toggleLang, t } = useTranslation();

  // Both the accessible name and the tooltip are written in the language the
  // button switches *to*.
  const switchLabel = t("common.switchToOther");

  return (
    <button
      onClick={toggleLang}
      className={`flex items-baseline gap-s6 text-tag font-mono pl-s8 border-l border-border ${className} focus-ring`}
      aria-label={switchLabel}
      title={switchLabel}
    >
      {/* The reference sets the inactive language in --color-ink-300, which
          is 2.1:1 on paper. text-dim (5.7:1) is the one place this page
          departs from the reference, and it departs on contrast. */}
      <span className={lang === "en" ? "text-primary-600 border-b border-current" : "text-text-dim"}>EN</span>
      <span className={lang === "de" ? "text-primary-600 border-b border-current" : "text-text-dim"}>DE</span>
    </button>
  );
}
