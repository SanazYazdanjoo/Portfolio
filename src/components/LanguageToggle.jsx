// Minimal EN/DE toggle styled for the editorial sketchbook aesthetic.
// Intended to be placed inside the <Nav /> component.

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function LanguageToggle({ className = "" }) {
  const { lang, toggleLang, t } = useTranslation();

  // Both the accessible name and the tooltip are written in the language the
  // button switches *to* — a German visitor is offered "Switch to English",
  // an English one "Auf Deutsch wechseln". `common.switchToOther` already
  // holds the opposite language's string in each table, so one key covers it.
  const switchLabel = t("common.switchToOther");

  return (
    <button
      onClick={toggleLang}
      className={`relative flex items-center justify-center min-w-[44px] min-h-[44px]
 text-dim hover:text-text transition-colors

 ${className} focus-ring`}
      aria-label={switchLabel}
      title={switchLabel}
    >
      {/* 12px, not 10px: this is an all-caps, letter-spaced label and the
          site holds those to a 12px floor. The active/inactive distinction
          rides on the coral + underline, not on pushing the inactive label
          past legibility. */}
      <span className="relative flex items-center gap-1 text-xs tracking-caps font-black uppercase">
        <span className={lang === "en" ? "text-primary" : "text-dim"}>EN</span>
        <span className="text-text/20">/</span>
        <span className={lang === "de" ? "text-primary" : "text-dim"}>DE</span>

        {/* Underline indicator slides to active language */}
        <motion.span
          className="absolute -bottom-1 h-[5px] rule-stroke bg-primary"
          initial={false}
          animate={{
            left: lang === "en" ? "0%" : "55%",
            width: lang === "en" ? "38%" : "40%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </span>
    </button>
  );
}
