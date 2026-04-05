// src/hooks/useLocalizedProfile.js
// ─── Localized Profile Hook ────────────────────────────────────────────────────
// Resolves bilingual fields in profile.js to the current language.
// Handles nested objects and arrays recursively.
//
// Usage:
//   const profile = useLocalizedProfile(profileData);
//   profile.tagline → resolves { en: "...", de: "..." } to current language string

import { useMemo } from "react";
import { useTranslation } from "../context/LanguageContext";

function isBilingualField(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (typeof value.en === "string" || typeof value.de === "string")
  );
}

function localizeValue(value, lang) {
  if (value === null || value === undefined) return value;

  // Direct bilingual field → resolve
  if (isBilingualField(value)) {
    return value[lang] ?? value.en ?? "";
  }

  // Array → recurse each item
  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, lang));
  }

  // Object → recurse each key
  if (typeof value === "object") {
    const resolved = {};
    for (const key of Object.keys(value)) {
      resolved[key] = localizeValue(value[key], lang);
    }
    return resolved;
  }

  // Primitive → return as-is
  return value;
}

export function useLocalizedProfile(data) {
  const { lang } = useTranslation();

  return useMemo(() => localizeValue(data, lang), [data, lang]);
}
