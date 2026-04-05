// src/context/LanguageContext.jsx
// ─── i18n Context ──────────────────────────────────────────────────────────────
// Lightweight translation system — no external dependencies.
// Stores language preference in localStorage, defaults to browser language.

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import en from "../translations/en";
import de from "../translations/de";

const translations = { en, de };
const SUPPORTED_LANGS = ["en", "de"];
const STORAGE_KEY = "portfolio-lang";

// Detect browser language, fallback to "en"
function detectLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

  const browserLang = navigator.language?.slice(0, 2);
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : "en";
}

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  // Persist to localStorage + update <html lang="">
  const setLang = useCallback((newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  }, []);

  // Toggle between EN ↔ DE
  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "de" : "en");
  }, [lang, setLang]);

  // Set <html lang=""> on mount
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Translation function: t("nav.home") → looks up translations[lang]["nav.home"]
  const t = useCallback(
    (key, fallback) => {
      return translations[lang]?.[key] ?? translations.en?.[key] ?? fallback ?? key;
    },
    [lang]
  );

  // Resolve bilingual fields from profile.js: { en: "...", de: "..." } → string
  // If the value is already a plain string, return it as-is.
  const localize = useCallback(
    (value) => {
      if (value === null || value === undefined) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object" && (value.en || value.de)) {
        return value[lang] ?? value.en ?? "";
      }
      return String(value);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a <LanguageProvider>");
  }
  return context;
}
