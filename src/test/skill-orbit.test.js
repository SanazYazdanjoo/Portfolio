// The skill orbit reads tagEvidence pointers to decide which tags follow the
// reader into which section (src/projects/template/tagSections.js). The
// derivation is best-effort by contract — a tag whose pointer names no
// section simply stays in the header row — so this suite does not demand
// full coverage. It guards the two ways the feature could fail silently:
// mapping a tag to a section that does not exist, and a case study whose
// prose style drifts so far that the rail never appears on it at all.

import { describe, it, expect } from "vitest";
import { fullProjects } from "./fullProjects";
import { deriveTagSections } from "../projects/template/tagSections";
import { SECTIONS } from "../projects/template/constants";

const SECTION_IDS = new Set(SECTIONS.map((s) => s.id));

describe("skill orbit — tag → section derivation", () => {
  it("only ever maps to real sections, and only to tags the project declares", () => {
    for (const p of fullProjects) {
      const map = deriveTagSections(p.tags, p.tagEvidence);
      for (const [sectionId, tags] of Object.entries(map)) {
        expect(SECTION_IDS.has(sectionId), `${p.slug}: unknown section "${sectionId}"`).toBe(true);
        for (const tag of tags) {
          expect(p.tags, `${p.slug}: orbit tag "${tag}" is not one of the project's tags`).toContain(tag);
        }
        expect(new Set(tags).size, `${p.slug}/${sectionId}: duplicate tag`).toBe(tags.length);
      }
    }
  });

  it("every case study with tagEvidence floats something in at least two sections", () => {
    for (const p of fullProjects) {
      if (!p.tagEvidence?.length) continue;
      const map = deriveTagSections(p.tags, p.tagEvidence);
      expect(
        Object.keys(map).length,
        `${p.slug}: no tag maps to a section — the rail would never appear on this case study`
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("resolves the pointer, not the quotation", () => {
    // "design" must not swallow "designSystem", and the section named after
    // the colon (inside the quoted sentence) must not count as a pointer.
    const map = deriveTagSections(
      ["A", "B"],
      [
        { tag: "A", evidence: 'designSystem: "the results were good"' },
        { tag: "B", evidence: 'figures.challenge: "x"; solution and prototype: "y"' },
      ]
    );
    expect(map.designSystem).toEqual(["A"]);
    expect(map.design).toBeUndefined();
    expect(map.results).toBeUndefined();
    expect(map.challenge).toEqual(["B"]);
    expect(map.solution).toEqual(["B"]);
    expect(map.prototype).toEqual(["B"]);
  });

  it("returns nothing when there is nothing to derive from", () => {
    expect(deriveTagSections([], [])).toEqual({});
    expect(deriveTagSections(["A"], undefined)).toEqual({});
  });
});
