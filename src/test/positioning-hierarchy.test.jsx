// The positioning hierarchy, as a contract: the first skills category is
// what she is hired for, the legacy tools sit in the last one, every CV
// role explains what it adds to the profile, and the IBS chain renders
// with its unfinished link visibly marked pending.
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import {
  profileData,
  coreExpertise,
  CORE_SKILLS_CATEGORY,
  ADDITIONAL_SKILLS_CATEGORY,
  SKILL_CATEGORY_KEYS,
} from "../data/profile";
import { projects } from "../data/projects";
import { getFullProject } from "./fullProjects";
import en from "../translations/en";
import de from "../translations/de";
import { EvidenceChain } from "../projects/template/EvidenceChain";
import CV from "../pages/CurriculumVitae";

describe("skills hierarchy", () => {
  const categories = Object.keys(profileData.skills);

  it("leads with Core Expertise and ends with the additional-experience line", () => {
    expect(categories[0]).toBe(CORE_SKILLS_CATEGORY);
    expect(categories[categories.length - 1]).toBe(ADDITIONAL_SKILLS_CATEGORY);
    expect(coreExpertise.length).toBeGreaterThanOrEqual(5);
  });

  it("keeps legacy tools out of the core and implementation groups", () => {
    const additional = profileData.skills[ADDITIONAL_SKILLS_CATEGORY];
    for (const legacy of ["WordPress", "nopCommerce", "Unity"]) {
      expect(additional, `${legacy} belongs in the additional line`).toContain(legacy);
    }
    expect(profileData.skills["Technical Implementation"]).toContain("React");
  });

  it("has a translated heading for every category in both languages", () => {
    for (const category of categories) {
      const key = SKILL_CATEGORY_KEYS[category];
      expect(key, `${category} has no translation key`).toBeTruthy();
      expect(en[key], `${key} missing in en`).toBeTruthy();
      expect(de[key], `${key} missing in de`).toBeTruthy();
    }
  });
});

describe("CV arc notes", () => {
  it("every experience entry says what it adds to the profile, in both languages", () => {
    for (const job of profileData.experience) {
      expect(job.arcNote?.en, `${job.company} has no arcNote`).toBeTruthy();
      expect(job.arcNote?.de, `${job.company} has no German arcNote`).toBeTruthy();
    }
  });

  it("renders the notes on the CV", () => {
    renderWithProviders(<CV />);
    expect(screen.getByText(profileData.experience[0].arcNote.en)).toBeInTheDocument();
  });
});

describe("homepage cards", () => {
  it("the three flagship cards each carry proof stats", () => {
    for (const id of ["gaze-assisted-input", "digitalising-ibs-travel-reimbursements", "deskbird-hybrid-work"]) {
      const card = projects.find((p) => p.id === id);
      expect(card.cardStats?.length, `${id} has no cardStats`).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("IBS evidence chain", () => {
  const ibs = getFullProject("digitalising-ibs-travel-reimbursements");

  it("runs research → validation and marks only validation as pending", () => {
    const stages = ibs.evidenceChain.map((s) => s.stage.en);
    expect(stages[0]).toBe("Research");
    expect(stages[stages.length - 1]).toBe("Validation");
    expect(ibs.evidenceChain.filter((s) => s.pending).map((s) => s.stage.en)).toEqual(["Validation"]);
  });

  it("renders the pending badge on the unfinished link only", () => {
    const items = ibs.evidenceChain.map((s) => ({ ...s, stage: s.stage.en, note: s.note.en }));
    renderWithProviders(<EvidenceChain items={items} />);
    expect(screen.getAllByText("Pending")).toHaveLength(1);
    expect(screen.getByText("Validation")).toBeInTheDocument();
  });
});
