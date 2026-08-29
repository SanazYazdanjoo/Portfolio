// Site search, resolved entirely on the client from what every page already
// ships: the translation maps (where the static pages keep their body copy),
// the project card files (eagerly globbed by src/data/projects.js), and the
// tag counts derived from them. Deliberately NOT the full data.js prose —
// that would undo the card/data bundle split (see src/data/projects.js);
// a prebuilt index à la generate-chat-knowledge.mjs is the upgrade path if
// case-study body text ever needs to be searchable.

import en from "../translations/en";
import de from "../translations/de";
import { sortedProjects, getTagData } from "../data/projects";

const MESSAGES = { en, de };

/** Queries shorter than this return nothing — one letter matches everything. */
export const MIN_QUERY_LENGTH = 2;

// Static pages: which translation-key prefixes hold each page's copy, and
// which key names the page in results. Keys are per-language files, so the
// same map serves both languages. Chrome-only prefixes (nav., common.,
// footer., error., notFound., chat., scroll., project.) are left out on
// purpose: matching "Close menu" to no page helps nobody.
const PAGES = [
  { route: "/", prefixes: ["hero.", "home."], titleKey: "nav.home" },
  { route: "/projects", prefixes: ["projects."], titleKey: "nav.work" },
  { route: "/about", prefixes: ["about."], titleKey: "nav.about" },
  { route: "/cv", prefixes: ["cv."], titleKey: "nav.cv" },
  { route: "/contact", prefixes: ["contact."], titleKey: "contact.heading" },
  { route: "/credentials", prefixes: ["credentials."], titleKey: "credentials.heading" },
  { route: "/voluntary", prefixes: ["voluntary."], titleKey: "voluntary.heading" },
  { route: "/tags", prefixes: ["tags.directory."], titleKey: "tags.directory.title" },
  { route: "/designsystem", prefixes: ["designSystem."], titleKey: "nav.designSystem" },
  { route: "/sitemap", prefixes: ["sitemap."], titleKey: "sitemap.title" },
  { route: "/privacy", prefixes: ["privacy."], titleKey: "privacy.title" },
  { route: "/impressum", prefixes: ["impressum."], titleKey: "impressum.title" },
];

/** Resolve a bilingual { en, de } field (or plain string) to one language. */
const pick = (value, lang) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value[lang] ?? value.en ?? "";
  return String(value);
};

/**
 * Trim a long value to a window around the first match, so the result row
 * shows the sentence that earned the hit, not the paragraph's opening.
 */
const makeSnippet = (text, token) => {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const idx = token ? clean.toLowerCase().indexOf(token) : -1;
  if (idx === -1) {
    return clean.length > 140 ? `${clean.slice(0, 140).trimEnd()}…` : clean;
  }
  const start = Math.max(0, idx - 50);
  const end = Math.min(clean.length, idx + token.length + 90);
  return (
    (start > 0 ? "…" : "") + clean.slice(start, end).trim() + (end < clean.length ? "…" : "")
  );
};

/**
 * Search everything the client knows about.
 *
 * Returns `{ projects, pages, tags }`, each an array of
 * `{ type, title, snippet, href }` sorted best-first. All of a query's
 * whitespace-separated tokens must appear (case-insensitively) somewhere in
 * an entry for it to match; a title hit outranks a body hit.
 */
export function searchSite(query, lang) {
  const q = String(query ?? "").trim().toLowerCase();
  if (q.length < MIN_QUERY_LENGTH) return { projects: [], pages: [], tags: [] };
  const tokens = q.split(/\s+/).filter(Boolean);
  const first = tokens[0];
  const msgs = MESSAGES[lang] ?? MESSAGES.en;

  const projects = sortedProjects
    // coming-soon has no detail route — a result that can't be opened is noise
    .filter((p) => p.href)
    .map((p) => {
      const title = pick(p.title, lang);
      const prose = [
        pick(p.subtitle, lang),
        pick(p.tagline, lang),
        pick(p.role, lang),
        pick(p.context, lang),
        pick(p.cardOutcome, lang),
      ];
      const haystack = [title, ...prose, String(p.year ?? ""), (p.tags ?? []).join(" ")]
        .join(" \n ")
        .toLowerCase();
      if (!tokens.every((tk) => haystack.includes(tk))) return null;

      // Show the field that earned the hit; when only a tag matched, show the
      // tag row; otherwise fall back to the card's own one-liner.
      let snippetSource = prose.find((f) => f && f.toLowerCase().includes(first));
      if (!snippetSource && (p.tags ?? []).some((tag) => tag.toLowerCase().includes(first))) {
        snippetSource = (p.tags ?? []).join(" · ");
      }
      if (!snippetSource) snippetSource = pick(p.tagline, lang) || pick(p.subtitle, lang);

      return {
        type: "project",
        title,
        snippet: makeSnippet(snippetSource, first),
        href: p.href,
        score: title.toLowerCase().includes(first) ? 2 : 1,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  const pages = PAGES.map((page) => {
    const title = msgs[page.titleKey] ?? MESSAGES.en[page.titleKey] ?? page.route;
    const titleHit = tokens.every((tk) => title.toLowerCase().includes(tk));
    // Body copy: every value under the page's prefixes, minus pure chrome
    // (aria labels, placeholders, and "{count} of {total}"-style templates).
    const bodyHit = Object.entries(msgs).find(([key, value]) => {
      if (!page.prefixes.some((pre) => key.startsWith(pre))) return false;
      if (typeof value !== "string" || value.includes("{")) return false;
      if (/arialabel|placeholder/i.test(key)) return false;
      const lv = value.toLowerCase();
      return tokens.every((tk) => lv.includes(tk));
    });
    if (!titleHit && !bodyHit) return null;
    return {
      type: "page",
      title,
      snippet: bodyHit && bodyHit[1] !== title ? makeSnippet(bodyHit[1], first) : "",
      href: page.route,
      score: titleHit ? 2 : 1,
    };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  const tags = getTagData()
    .filter((tag) => {
      const name = tag.name.toLowerCase();
      return tokens.every((tk) => name.includes(tk));
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 8)
    .map((tag) => ({
      type: "tag",
      title: tag.name,
      count: tag.count,
      snippet: "",
      href: `/tags/${encodeURIComponent(tag.name)}`,
    }));

  return { projects, pages, tags };
}
