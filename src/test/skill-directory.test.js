import { describe, expect, it } from "vitest";
import {
  getSkillGroup,
  skillDirectoryCopy,
  skillGroupOrder,
} from "../data/skillDirectory";

describe("skill directory", () => {
  it("groups representative portfolio skills into the intended recruiter-facing sections", () => {
    expect(getSkillGroup("Stakeholder Interviews")).toBe("research");
    expect(getSkillGroup("Interaction Design")).toBe("design");
    expect(getSkillGroup("React")).toBe("technical");
    expect(getSkillGroup("Human-Robot Interaction")).toBe("domain");
  });

  it("keeps the public wording natural and free of the old evidence label", () => {
    const visibleCopy = JSON.stringify(skillDirectoryCopy);
    expect(visibleCopy).not.toMatch(/evidence/i);
  });

  it("keeps a stable section order", () => {
    expect(skillGroupOrder).toEqual([
      "research",
      "design",
      "technical",
      "domain",
    ]);
  });
});
