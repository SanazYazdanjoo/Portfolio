// EN / DE in the nav.
//
// The inactive language is a real control, not a greyed-out span: a visitor
// who reads German has to be able to see that DE is there and click it. So
// each language is its own button — the current one is inert, marked
// aria-current and carrying the drawn underline, and the other is a real
// button in full body ink. The underline marks the current language only;
// what makes the other read as clickable is the ink it is set in, the
// pointer cursor and the hover to the accent.
//
// Ink, not a dim tint. --text is 16.7:1 on the page background and
// --primary-600 is 13.2:1; the design reference set the inactive language in
// --color-ink-300, which is 2.06:1 and is what this replaced. There is no
// state here below 4.5:1.
//
// A <button> rather than an <a>: switching language changes context state,
// it does not navigate — the site has no per-language route to link to. It
// is styled as a link because that is what it behaves like.

import React from "react";
import { useTranslation } from "../context/LanguageContext";

const LANGUAGES = ["en", "de"];

export function LanguageToggle({ className = "" }) {
  const { lang, setLang, t } = useTranslation();

  // With two languages the inactive one is always "the other", so the single
  // `common.switchToOther` string — already written in the language being
  // switched TO — is the right accessible name for it.
  const switchLabel = t("common.switchToOther");

  return (
    <div
      className={`flex items-baseline gap-s6 text-tag font-mono pl-s8 border-l rule-l ${className}`}
    >
      {LANGUAGES.map((code) =>
        code === lang ? (
          <span key={code} aria-current="true" className="text-primary-600 rule-underline">
            {code.toUpperCase()}
          </span>
        ) : (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-label={switchLabel}
            title={switchLabel}
            className="text-text cursor-pointer hover:text-primary-600
                       transition-colors duration-200 focus-ring"
          >
            {code.toUpperCase()}
          </button>
        )
      )}
    </div>
  );
}
