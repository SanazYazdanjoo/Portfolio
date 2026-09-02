// Which skill tags belong to which section — derived, never hand-maintained.
//
// Every case study already answers this question in its data: `tagEvidence`
// entries point at the section that backs the tag, written as a section-id
// prefix ("wireframe: …", "prototype: …", "metrics/results: …"). That
// prefix is the mapping; this module reads it rather than asking the data
// files for a second, parallel list that could drift out of step with the
// first. Drift between a pointer and the thing it points at is the exact
// defect class the tagEvidence suite exists to catch, so the fix is to not
// create a second source.
//
// Derivation is best-effort by design. A tag whose evidence names no
// section simply never floats: it stays in the Skills row in the header,
// which is where every tag lives anyway. Nothing renders empty, nothing
// renders wrong, and no data file has to be edited for the feature to ship.

import { SECTIONS } from "./constants";

// How a pointer is read. `tagEvidence` prose is written as semicolon-
// separated clauses, each opening with where to look and then quoting what
// is there: "figures.challenge: the AS-IS swimlane…", "wireframe section:
// the Phase 2 wireframes…", "solution and prototype: the claim state
// machine…". The part before a clause's first colon is therefore the
// pointer, and everything after it is the quotation — so only the pointer
// is searched. Searching the whole clause would map a tag to any section
// its quoted sentence happened to name, which is the opposite of what the
// pointer says.
const IDS = SECTIONS.map((s) => s.id);

// Word-boundary match, case-insensitive, so "figures.methodology",
// "metrics/results" and "solution and prototype" all resolve, while
// "designSystem" never resolves as "design".
const MATCHERS = IDS.map((id) => ({
  id,
  re: new RegExp(`(?:^|[^A-Za-z])${id}(?![A-Za-z])`, "i"),
}));

/**
 * @param {string[]} tags            the project's tags, in their authored order
 * @param {Array<{tag: string, evidence: string}>} tagEvidence
 * @returns {Record<string, string[]>} section id -> tags, in the tags order
 */
export function deriveTagSections(tags, tagEvidence) {
  const bySection = {};
  if (!tags?.length || !tagEvidence?.length) return bySection;

  const evidenceFor = new Map(tagEvidence.map((e) => [e.tag, e.evidence || ""]));

  for (const tag of tags) {
    const evidence = evidenceFor.get(tag);
    if (!evidence) continue;

    const heads = evidence
      .split(";")
      .map((clause) => {
        const colon = clause.indexOf(":");
        return colon === -1 ? "" : clause.slice(0, colon);
      })
      .join(" | ");
    if (!heads.trim()) continue;

    for (const { id, re } of MATCHERS) {
      if (!re.test(heads)) continue;
      (bySection[id] ||= []).push(tag);
    }
  }
  return bySection;
}
