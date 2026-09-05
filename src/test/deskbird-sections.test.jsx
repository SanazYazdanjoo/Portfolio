// The deskbird study-record fields (2026-09-05): milestones, pilots,
// surveySections, studyPlans, competitiveReview, contextualDesignModels,
// participantVoices, conceptPack, conceptLineage, assetDisclosure. Each has
// a renderer now; these tests pin that every one reaches the page, in both
// languages, and that the two lists carrying status/owner beside their
// bilingual text keep those fields through localization.
import { describe, it, expect } from "vitest";
import { screen, within, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import { useTranslation } from "../context/LanguageContext";
import { projectData } from "../projects/deskbird-hybrid-work/deskbird-hybrid-work.data";
import Project2 from "../projects/deskbird-hybrid-work/index";
import { ConceptLineage } from "../projects/template/ConceptLineage";

function LangToggle() {
  const { toggleLang } = useTranslation();
  return <button type="button" onClick={toggleLang}>toggle-lang</button>;
}

describe("ConceptLineage", () => {
  const lineage = [
    { concept: "A", outcome: "carried-forward", as: "A'", owner: "self" },
    { concept: "B", outcome: "merged", as: "BC", owner: "team", note: "B note" },
    { concept: "C", outcome: "dropped", owner: "team", note: "C note" },
    { concept: "D", outcome: "merged", as: "BC", owner: "team", note: "D note" },
  ];

  it("groups merged sources into one target and keeps the count honest", () => {
    renderWithProviders(<ConceptLineage lineage={lineage} />);
    expect(screen.getByText("4 directions came out of ideation. 2 went to the client.")).toBeInTheDocument();
    const groups = screen.getAllByRole("listitem").filter((li) => li.parentElement.getAttribute("aria-label") === "Concept lineage");
    expect(groups).toHaveLength(3);
    // The merged group holds both sources and names the target once.
    const merged = groups.find((g) => within(g).queryByText("B") && within(g).queryByText("D"));
    expect(merged).toBeTruthy();
    expect(within(merged).getAllByText("BC")).toHaveLength(1);
    expect(within(merged).getByText("Merged")).toBeInTheDocument();
    expect(within(merged).getByText("B note")).toBeInTheDocument();
    expect(within(merged).getByText("D note")).toBeInTheDocument();
    expect(screen.getByText("Dropped")).toBeInTheDocument();
    expect(screen.getByText("Carried forward")).toBeInTheDocument();
    expect(screen.getByText("Mine")).toBeInTheDocument();
  });
});

describe("deskbird study-record fields on the page", () => {
  it("renders every new field, then re-renders it in German", () => {
    renderWithProviders(<><LangToggle /><Project2 /></>, { route: "/projects/deskbird-hybrid-work" });

    // Concepts section exists and the rail lists it.
    const concepts = document.getElementById("concepts");
    expect(concepts).not.toBeNull();
    expect(within(concepts).getByText("5 directions came out of ideation. 3 went to the client.")).toBeInTheDocument();
    expect(within(concepts).getByText("Interest-Based Communities")).toBeInTheDocument();
    expect(within(concepts).getByText(projectData.conceptPack[0].en)).toBeInTheDocument();
    // figures.concepts renders here (pending placeholder).
    expect(within(concepts).getByRole("img", { name: projectData.figures.concepts[0].alt.en })).toBeInTheDocument();

    // Voices in the Challenge.
    const challenge = document.getElementById("challenge");
    expect(within(challenge).getByText("In Their Words")).toBeInTheDocument();
    expect(within(challenge).getByText(`“${projectData.participantVoices[1].en}”`)).toBeInTheDocument();

    // Milestones in the Process.
    const process = document.getElementById("process");
    expect(within(process).getByText("Timeline")).toBeInTheDocument();
    expect(within(process).getByText(projectData.milestones[0].label.en)).toBeInTheDocument();

    // Study design in Methodology, with status and owner preserved.
    const methodology = document.getElementById("methodology");
    expect(within(methodology).getAllByText("Completed")).toHaveLength(3);
    expect(within(methodology).getAllByText("Not run")).toHaveLength(2);
    expect(within(methodology).getByText("10 sections")).toBeInTheDocument();
    expect(within(methodology).getByText(projectData.surveySections[8].en)).toBeInTheDocument();
    expect(within(methodology).getByText(projectData.pilots[0].en)).toBeInTheDocument();
    expect(within(methodology).getByText("Collaboration Model")).toBeInTheDocument();
    expect(within(methodology).getByText("Owner unconfirmed")).toBeInTheDocument();
    expect(within(methodology).getByText("Flexopus")).toBeInTheDocument();
    expect(within(methodology).getByText("Workvivo")).toBeInTheDocument();

    // Disclosure line under the hero.
    expect(screen.getByText(projectData.assetDisclosure.en)).toBeInTheDocument();

    // Contribution lists all four owned items.
    for (const item of projectData.myContribution.owned) {
      expect(screen.getByText(item.en)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole("button", { name: "toggle-lang" }));
    expect(within(document.getElementById("concepts")).getByText("5 Richtungen kamen aus der Ideation. 3 gingen zum Kunden.")).toBeInTheDocument();
    expect(within(document.getElementById("challenge")).getByText(`“${projectData.participantVoices[1].de}”`)).toBeInTheDocument();
    expect(within(document.getElementById("process")).getByText(projectData.milestones[0].label.de)).toBeInTheDocument();
    const methodologyDe = document.getElementById("methodology");
    expect(within(methodologyDe).getAllByText("Nicht durchgeführt")).toHaveLength(2);
    expect(within(methodologyDe).getByText("Kollaborationsmodell")).toBeInTheDocument();
    expect(screen.getByText(projectData.assetDisclosure.de)).toBeInTheDocument();
  });
});
