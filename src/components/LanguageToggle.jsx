// src/components/LanguageToggle.jsx
// ─── Language Toggle ───────────────────────────────────────────────────────────
// Minimal EN/DE toggle styled for the editorial sketchbook aesthetic.
// Place inside your <Nav /> component.

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function LanguageToggle({ className = "" }) {
  const { lang, toggleLang } = useTranslation();

  return (
    <button
      onClick={toggleLang}
      className={`
        relative flex items-center gap-1 
        text-[10px] font-black uppercase tracking-[0.2em]
        text-text/50 hover:text-text transition-colors
        ${className}
      `}
      aria-label={`Switch to ${lang === "en" ? "German" : "English"}`}
      title={lang === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
    >
      <span className={lang === "en" ? "text-primary" : "text-text/35"}>EN</span>
      <span className="text-text/20">/</span>
      <span className={lang === "de" ? "text-primary" : "text-text/35"}>DE</span>

      {/* Underline indicator slides to active language */}
      <motion.span
        className="absolute -bottom-0.5 h-[1.5px] bg-primary rounded-full"
        initial={false}
        animate={{
          left: lang === "en" ? "0%" : "55%",
          width: lang === "en" ? "38%" : "40%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </button>
  );
}
