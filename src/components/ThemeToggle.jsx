// Sun/moon in the nav, next to the language toggle.
//
// One button, not a light|dark pair like LanguageToggle: the two themes have
// no visible names to keep on screen, and a lone glyph reads faster than two.
// The glyph shows the theme the click GIVES you — moon in light mode, sun in
// dark — and the accessible name says the same thing in words, so the icon's
// direction is never load-bearing.
//
// Drawn, not machine-set (HandSun/HandMoon come from the same pen as the
// burger and every rule on the page — see HandIcons.jsx).
//
// `self-center`: the nav row aligns its items by BASELINE for the wordmark
// and the link text, but an icon has no baseline worth aligning to — its
// em-box would sit visibly high. Centering this one item against the row
// matches how the burger button sits.

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/LanguageContext";
import { HandSun, HandMoon } from "./HandIcons";

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label = theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`self-center text-text cursor-pointer hover:text-primary-600
                  transition-colors duration-200 focus-ring ${className}`}
    >
      {theme === "dark" ? (
        <HandSun className="w-[19px] h-[19px]" />
      ) : (
        <HandMoon className="w-[19px] h-[19px]" />
      )}
    </button>
  );
}
