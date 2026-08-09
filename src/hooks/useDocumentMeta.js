// Sets per-route <title>, meta description, canonical, and Open Graph tags.
// This hook only owns the DOM plumbing — callers supply title/description
// sourced from profile.js/data.json (static pages) or projectData (case
// studies), already resolved to the active language via useLocalizedProfile
// or t() before being passed in.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { profileData } from "../data/profile";

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useDocumentMeta({ title, description }) {
  const { lang } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    // Read lazily (not at module scope) and defensively: test files that
    // mock ../data/profile with a partial shape shouldn't crash a hook
    // that only needs this for one field.
    const siteUrl = profileData?.contact?.website ?? "";
    const url = `${siteUrl}${pathname}`;

    if (title) document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setCanonical(url);
  }, [title, description, pathname, lang]);
}
