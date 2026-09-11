import { describe, expect, it } from "vitest";
import { projects } from "../data/projects";
import {
  getSkillFilterHref,
  getSkillProjectCount,
  projectHasSkill,
  projectProvidesSkillEvidence,
} from "../utils/skillEvidence";

describe("skill evidence helpers", () => {
  const evidencedProject = projects.find(
    (project) => project.status !== "coming-soon" && project.tags?.length > 0
  );
  const skill = evidencedProject?.tags?.[0];

  it("matches skill names case-insensitively", () => {
    expect(evidencedProject).toBeTruthy();
    expect(skill).toBeTruthy();
    expect(projectHasSkill(evidencedProject, skill.toLowerCase())).toBe(true);
  });

  it("only counts projects that already provide viewable evidence", () => {
    const expected = projects.filter(
      (project) => project.status !== "coming-soon" && projectHasSkill(project, skill)
    ).length;

    expect(getSkillProjectCount(skill)).toBe(expected);
    expect(projectProvidesSkillEvidence(evidencedProject, skill)).toBe(true);
  });

  it("builds a Projects filter URL only when evidence exists", () => {
    expect(getSkillFilterHref(skill)).toBe(`/projects?skill=${encodeURIComponent(skill)}`);
    expect(getSkillFilterHref("__missing-skill__")).toBeNull();
  });
});
