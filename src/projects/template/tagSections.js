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

// A section id counts as named when it appears followed by a colon and is
// not part of a longer word — so "design:" matches, "designSystem:" does
// not match `design`, and "metrics/results:" matches `results`.
const MATCHERS = SECTIONS.map((s) => ({
  id: s.id,
  re: new RegExp(`(?:^|[^A-Za-z])${s.id}\s*:`, "i"),
}));

/**
 * @param {string[]} tags            the project's tags, in their authored order
 * @param {Array<{tag: string, evidence: string}>} tagEvidence
 * @returns {Record<string, string[]>} section id → tags, in the tags order
 */
export function deriveTagSections(tags, tagEvidence) {
  const bySection = {};
  if (!tags?.length || !tagEvidence?.length) return bySection;

  const evidenceFor = new Map(tagEvidence.map((e) => [e.tag, e.evidence || ""]));

  for (const tag of tags) {
    const evidence = evidenceFor.get(tag);
    if (!evidence) continue;
    for (const { id, re } of MATCHERS) {
      if (!re.test(evidence)) continue;
      (bySection[id] ||= []).push(tag);
    }
  }
  return bySection;
}
