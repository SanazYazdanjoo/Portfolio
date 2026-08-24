// The evidence contract, extended from case-study tags to the CV itself.
// The site's stated rule is "every tag carries evidence" — projects.test.js
// enforces it for case-study tags via tagEvidence. These two suites close the
// gap that rule left open. The contract is TIERED (owner ruling, 2026-08-24):
//
//   Tier 1 — named in a case study. The full-strength claim.
//   Tier 2 — named in a CV experience entry's own task text. Valid for
//            SKILL NAMES ONLY: a career-era tool (Postman, WordPress) is
//            evidenced by the job entry that used it. Tier 2 never satisfies
//            a NUMERIC claim — self-reported numbers don't back themselves.
//   Tier 0 — named in neither. Deleted, not evidenced after the fact.
//
// Numeric-claim scoping, stated where the contract is stated on the site:
// case-study claims carry evidence; numeric claims inside pre-2021
// experience entries (the pre-case-study era — entries ending on or before
// the 2021 M.Sc. start) are self-reported job history and out of this
// contract's scope. Aggregate stats may instead carry a `derivedFrom` field
// naming contributing case studies and per-study counts; the test verifies
// every count against its named case study and that the counts sum to at
// least the claimed figure.
//
// These suites fail the build on orphans. The intended fix for an orphan is
// DELETING the claim, never writing a mention into a case study to rescue
// it — the metric-provenance suite in projects.test.js exists to catch
// exactly that rescue.
//
// Matching is textual and deliberately conservative-fuzzy: a label resolves
// through its base name, its slash/ampersand parts, or its parenthetical
// tokens ("Eye-Tracking Evaluation (Pupil Labs)" resolves through "Pupil
// Labs"); short tokens like "R" or "GA" must match case-sensitively on word
// boundaries so "R" never resolves through "React". A claim number resolves
// as digits or spelled out ("13" through "thirteen-step"), with digit
// boundaries so "4" never resolves through "aged 25–34". A metric tied to a
// specific project (portfolioHighlights) may only resolve against THAT
// project — "4 stakeholder interviews" on the deskbird highlight cannot
// borrow IBS's "four indirect stakeholders".

import { describe, it, expect } from "vitest";
// FULL data.js modules (test-only glob): the evidence corpus is the
// case-study prose, which the card-level aggregator no longer carries
// after the Phase 5 split.
import { fullProjects, getFullProject } from "../test/fullProjects";
import { profileData } from "./profile";
import { careerPhases } from "./career";

// Same walker as projects.test.js (kept in sync by hand — it is ten lines):
// collects every EN-side and language-neutral string in a data tree.
function collectEnglishStrings(value, out) {
  if (value === null || value === undefined) return;
  if (typeof value === "string") { out.push(value); return; }
  if (Array.isArray(value)) { value.forEach((v) => collectEnglishStrings(v, out)); return; }
  if (typeof value !== "object") return;
  if (Object.prototype.hasOwnProperty.call(value, "en")) {
    if (typeof value.en === "string") out.push(value.en);
    return;
  }
  for (const key of Object.keys(value)) collectEnglishStrings(value[key], out);
}

const corpusByProject = new Map(
  fullProjects.map((p) => {
    const strings = [];
    collectEnglishStrings(p, strings);
    return [p.slug, strings];
  })
);

// Tier 2 corpus: the CV experience entries' own task text (EN side).
const tier2Corpus = (profileData.experience ?? []).flatMap((job) => {
  const strings = [];
  collectEnglishStrings({ tasks: job.tasks }, strings);
  return strings;
});

// ── Suite 1: skill chips ────────────────────────────────────────────────────

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function skillKeys(label) {
  // Parenthetical tokens are alternates only when they are NAMES (Pupil
  // Labs, Vitest, WCAG) — lowercase commentary like "(daily use)" must not
  // resolve a chip through IBS's "deployed for daily use".
  const parenTokens = [...label.matchAll(/\(([^)]*)\)/g)]
    .flatMap((m) => m[1].split(","))
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && /^[A-Z0-9]/.test(t));
  const base = label.replace(/\s*\([^)]*\)/g, "").trim();
  const parts = base.split(/\s*[/&·]\s*/).map((t) => t.trim()).filter(Boolean);
  return { base, keys: [...new Set([base, ...parts, ...parenTokens])].filter(Boolean) };
}

// Unicode-aware token boundary: ASCII \b calls the "ä" in "Räihä" a
// boundary, which resolved the skill "R" through a literature citation.
const bounded = (token, flags) =>
  new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegex(token)}(?![\\p{L}\\p{N}])`, `u${flags}`);

function keyMatchesCorpus(key, strings) {
  if (key.length <= 2) {
    const re = bounded(key, ""); // case-sensitive: "R" must not resolve via "react"
    return strings.some((s) => re.test(s));
  }
  if (key.length === 3) {
    // Bounded but case-insensitive: "Git" should resolve via "git mv".
    const re = bounded(key, "i");
    return strings.some((s) => re.test(s));
  }
  const needle = key.toLowerCase();
  return strings.some((s) => s.toLowerCase().includes(needle));
}

// Last resort: every significant word of the base label appears somewhere in
// ONE project's corpus (light plural-stemming). This is what lets
// "Controlled Experiments" resolve through "a controlled within-subjects
// experiment" without a literal-label hit.
// A word matches on token boundaries with an optional plural "s" — plain
// substring containment let "products" resolve through "production site".
// A word carrying a leading acronym ("RESTful", "APIs") also matches via
// that acronym, case-sensitively: "RESTful" resolves through the task text
// "validated REST endpoints".
function wordMatches(word, text) {
  const stem = word.replace(/s$/i, "");
  if (
    new RegExp(
      `(?<![\\p{L}\\p{N}])${escapeRegex(stem)}s?(?![\\p{L}\\p{N}])`,
      "iu"
    ).test(text)
  ) return true;
  const acronym = /^([A-Z]{3,})[a-z]/.exec(word)?.[1];
  return acronym
    ? new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegex(acronym)}(?![\\p{L}\\p{N}])`, "u").test(text)
    : false;
}

// Generic descriptor words a multi-word label can shed in Tier 2 when a
// specific word already matched — "RESTful APIs" is evidenced by "REST
// endpoints" even though the word "APIs" never appears. Tier 1 keeps the
// full-strength every-word rule.
const GENERIC_TAIL = new Set(["apis", "api", "testing", "development", "design", "tools", "engineering"]);

function wordsMatchCorpus(base, strings, { genericOptional = false } = {}) {
  // Digits stay inside words: "HTML5" must not degrade to "html" and then
  // resolve through a .html filename in a figure link.
  const words = base.split(/[^A-Za-z0-9-]+/).filter((w) => w.length >= 4);
  if (words.length === 0) return false;
  const haystack = strings.join("\n");
  const matched = words.filter((w) => wordMatches(w, haystack));
  if (matched.length === words.length) return true;
  if (!genericOptional) return false;
  const unmatched = words.filter((w) => !matched.includes(w));
  return matched.length >= 1 && unmatched.every((w) => GENERIC_TAIL.has(w.toLowerCase()));
}

function skillResolves(label) {
  const { base, keys } = skillKeys(label);
  // Tier 1: a case study names it.
  for (const strings of corpusByProject.values()) {
    if (keys.some((k) => keyMatchesCorpus(k, strings))) return true;
    if (wordsMatchCorpus(base, strings)) return true;
  }
  // Tier 2: a CV experience entry's task text names it (skill names only).
  if (keys.some((k) => keyMatchesCorpus(k, tier2Corpus))) return true;
  if (wordsMatchCorpus(base, tier2Corpus, { genericOptional: true })) return true;
  return false;
}

describe("CV skill chips — every rendered skill resolves to a case study that names it", () => {
  it("profile.skills has no orphans", () => {
    const orphans = [];
    for (const [category, skills] of Object.entries(profileData.skills ?? {})) {
      for (const skill of skills) {
        if (!skillResolves(skill)) orphans.push(`skills["${category}"]: "${skill}"`);
      }
    }
    expect(
      orphans,
      `Orphaned CV skills (no case study names them — delete the chip, don't write evidence for it):\n${orphans.join("\n")}`
    ).toEqual([]);
  });

  it("career-arc chips have no orphans", () => {
    const orphans = [];
    for (const phase of careerPhases) {
      for (const group of phase.skillGroups ?? []) {
        for (const chip of group.items ?? []) {
          if (!skillResolves(chip)) orphans.push(`careerPhases[${phase.phase}]: "${chip}"`);
        }
      }
    }
    expect(
      orphans,
      `Orphaned career-arc chips (no case study names them):\n${orphans.join("\n")}`
    ).toEqual([]);
  });
});

// ── Suite 2: numeric CV claims ──────────────────────────────────────────────

const NUMBER_WORDS = {
  1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
  7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve",
  13: "thirteen", 14: "fourteen", 15: "fifteen", 16: "sixteen",
  17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty",
};

const NOUN_STOPWORDS = new Set([
  "across", "their", "there", "which", "where", "every", "other", "under",
  "between", "through", "during", "before", "after", "still", "would",
  "could", "being", "these", "those", "including", "distinct",
]);

// A number token: digits (with thousands separators / decimals) not embedded
// in a code like C1, 5W1H, or TYPO3, and not part of a larger number.
const NUMBER_TOKEN = /(?<![A-Za-z0-9.,])\d{1,3}(?:,\d{3})*(?:\.\d+)?(?![A-Za-z0-9])/g;

function numberPatternFor(num) {
  // Escape first, THEN make thousands separators optional — the other order
  // escapes the "?" quantifier into a literal and "1,234" stops matching.
  const digits = `(?<![0-9.])${escapeRegex(num).replace(/,/g, ",?")}(?![0-9.])`;
  const word = NUMBER_WORDS[Number(num.replace(/,/g, ""))];
  return new RegExp(word ? `${digits}|\\b${word}\\b` : digits, "i");
}

function contextNouns(text, index, length) {
  const window = text.slice(Math.max(0, index - 40), index + length + 40);
  return [...new Set(
    window.toLowerCase().split(/[^a-z-]+/)
      // "13-step" splits at the digits and leaves "-step" — trim stray
      // hyphens or the junk token inflates the noun count (and with it the
      // same-string requirement below).
      .map((w) => w.replace(/^-+|-+$/g, ""))
      .filter((w) => w.length >= 5 && !NOUN_STOPWORDS.has(w))
  )];
}

// Resolution: the number (digits or word) appears in a project string that
// also carries enough of the claim's context nouns IN THAT SAME STRING —
// noun-rich claims (4+) need two, others need one. Project-wide noun
// borrowing is what let "5+ digital products" resolve through IBS's "digital
// fluency" while "five role views" sat in a different sentence; same-string
// co-occurrence stops that, and stops "Page-1 Google rankings" resolving
// through "the one named external call … Google Maps".
//
// Stated limit: matching is textual, so a sentence that legitimately
// co-locates a number with the claim's own words resolves it even if the
// semantics differ — and the orphan lists this test prints are therefore
// reviewed by a person at a checkpoint before anything is deleted.
function numberResolves(num, nouns, projectSlugs) {
  const pattern = numberPatternFor(num);
  const required = nouns.length >= 4 ? 2 : 1;
  for (const slug of projectSlugs) {
    const strings = corpusByProject.get(slug) ?? [];
    const project = getFullProject(slug);

    const inString = strings.some(
      (s) =>
        pattern.test(s) &&
        nouns.filter((n) => wordMatches(n, s)).length >= required
    );
    if (inString) return true;

    // A number may also live as a project metric VALUE with its nouns in
    // that metric's own label ("1,234" + "automated tests — including …").
    const asMetricValue = (project?.metrics ?? []).some((m) => {
      const value = typeof m.value === "object" ? m.value.en : String(m.value ?? "");
      const label = typeof m.label === "object" ? m.label.en : String(m.label ?? "");
      return (
        pattern.test(value) &&
        nouns.filter((n) => wordMatches(n, `${value} ${label}`)).length >= required
      );
    });
    if (asMetricValue) return true;
  }
  return false;
}

function claimNumbersIn(text) {
  const found = [];
  for (const m of text.matchAll(NUMBER_TOKEN)) {
    const num = m[0];
    const rest = text.slice(m.index + num.length);
    if (/^(19|20)\d{2}$/.test(num)) continue; // years assert time, not volume
    if (/^\s*\+?\s*(years?|yrs?|jahren?)\b/i.test(rest)) continue; // durations
    if (/since\s*$/i.test(text.slice(0, m.index))) continue; // "since 2015"
    found.push({ num, index: m.index, length: num.length });
  }
  return found;
}

describe("CV numeric claims — every scale/volume/count number resolves to a case study", () => {
  it("impactStats, experience, and portfolioHighlights carry no unbacked numbers", () => {
    const allSlugs = [...corpusByProject.keys()];
    const orphans = [];

    const check = (text, path, projectSlugs) => {
      for (const { num, index, length } of claimNumbersIn(text)) {
        const nouns = contextNouns(text, index, length);
        if (nouns.length === 0) continue;
        if (!numberResolves(num, nouns, projectSlugs)) {
          orphans.push(`${path}: "${num}" in "${text.slice(Math.max(0, index - 30), index + length + 30).trim()}"`);
        }
      }
    };

    for (const [i, stat] of (profileData.impactStats ?? []).entries()) {
      const value = typeof stat.value === "object" ? stat.value.en : String(stat.value ?? "");
      const label = typeof stat.label === "object" ? stat.label.en : String(stat.label ?? "");
      // An aggregate stat carries `derivedFrom`: contributing case studies
      // with per-study counts. Each count must be named by its case study,
      // and the counts must sum to at least the claimed figure — verified
      // below in its own assertion, so the generic check is skipped here.
      if (stat.derivedFrom) continue;
      check(`${value} ${label}`, `impactStats[${i}]`, allSlugs);
    }

    for (const [i, job] of (profileData.experience ?? []).entries()) {
      // Scoping (see header): entries that ended on or before 2021 predate
      // the case-study era — their numbers are self-reported job history,
      // outside this contract.
      const endYear = Number(/(\d{4})\s*$/.exec(String(job.date ?? ""))?.[1] ?? NaN);
      if (Number.isFinite(endYear) && endYear <= 2021) continue;
      const strings = [];
      collectEnglishStrings({ impactMetrics: job.impactMetrics, tasks: job.tasks }, strings);
      for (const s of strings) check(s, `experience[${i}] (${job.company})`, allSlugs);
    }

    for (const h of profileData.portfolioHighlights ?? []) {
      // Highlights link a specific project — they may only resolve against it.
      const slugs = corpusByProject.has(h.id) ? [h.id] : allSlugs;
      // Metrics are value/label PAIRS: check them joined, or a bare "4" has
      // no context nouns and slips through the nouns.length === 0 skip.
      for (const m of h.metrics ?? []) {
        const value = typeof m.value === "object" ? m.value.en : String(m.value ?? "");
        const label = typeof m.label === "object" ? m.label.en : String(m.label ?? "");
        check(`${value} ${label}`, `portfolioHighlights(${h.id})`, slugs);
      }
      const strings = [];
      collectEnglishStrings({ summary: h.summary, type: h.type }, strings);
      for (const s of strings) check(s, `portfolioHighlights(${h.id})`, slugs);
    }

    expect(
      orphans,
      `Unbacked CV numbers (no case study names them — delete the claim, don't write evidence for it):\n${orphans.join("\n")}`
    ).toEqual([]);
  });

  it("every derivedFrom aggregate is the sum of counts its case studies actually name", () => {
    for (const [i, stat] of (profileData.impactStats ?? []).entries()) {
      if (!stat.derivedFrom) continue;
      const value = typeof stat.value === "object" ? stat.value.en : String(stat.value ?? "");
      const claimed = parseInt(value.replace(/[^0-9]/g, ""), 10);
      expect(Number.isFinite(claimed), `impactStats[${i}]: derivedFrom on a non-numeric value "${value}"`).toBe(true);

      let sum = 0;
      for (const source of stat.derivedFrom) {
        const strings = corpusByProject.get(source.id);
        expect(strings, `impactStats[${i}].derivedFrom names unknown project "${source.id}"`).toBeTruthy();
        for (const count of source.counts) {
          const pattern = numberPatternFor(String(count));
          expect(
            (strings ?? []).some((s) => pattern.test(s)),
            `impactStats[${i}].derivedFrom: count ${count} is not named anywhere in ${source.id}`
          ).toBe(true);
          sum += count;
        }
      }
      expect(
        sum,
        `impactStats[${i}]: claimed "${value}" but the backed counts sum to ${sum}`
      ).toBeGreaterThanOrEqual(claimed);
    }
  });
});
