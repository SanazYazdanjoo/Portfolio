import { describe, it, expect } from "vitest";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as gazeData } from "../projects/gaze-assisted-input/gaze-assisted-input.data";

// With no explicit quote, Prose lifts a section's first sentence into the
// margin rail. The gaze case study sets `quote: false` for Challenge,
// Solution and Methodology, because that lifted sentence repeated the
// paragraph beside it word for word.
const firstSentence = (text) => text.match(/^.*?[.!?](?=\s|$)/)[0].trim();

describe("Prose margin note", () => {
  it("is off for gaze Challenge, Solution and Methodology", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={gazeData} />);
    for (const id of ["challenge", "solution", "methodology"]) {
      const section = container.querySelector(`section#${id}`);
      const lead = firstSentence(gazeData[id].en);
      const hits = [...section.querySelectorAll("*")].filter(
        (el) => el.childElementCount === 0 && el.textContent.trim() === lead
      );
      expect(hits, `${id}: lead sentence repeated in the margin`).toHaveLength(0);
    }
  });

  it("still lifts the lead sentence when a project sets no quote", () => {
    const meta = { ...gazeData, challengeQuote: undefined };
    const { container } = renderWithProviders(<ProjectTemplate meta={meta} />);
    const lead = firstSentence(gazeData.challenge.en);
    const hits = [...container.querySelectorAll("section#challenge *")].filter(
      (el) => el.childElementCount === 0 && el.textContent.trim() === lead
    );
    expect(hits.length).toBeGreaterThan(0);
  });
});
