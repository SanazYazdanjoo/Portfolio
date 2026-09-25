// The traceability blocks the IBS case study writes, and the silence every
// other case study must keep: researchEvidence, traceChains, qualityChecks,
// statusTiers and supportingFigures are data-gated, so a project without
// them renders none of their labels.
import { describe, it, expect, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as gazeData } from "../projects/gaze-assisted-input/gaze-assisted-input.data";
import { projectData as ibsData } from "../projects/digitalising-ibs-travel-reimbursements/digitalising-ibs-travel-reimbursements.data";

afterEach(() => {
  window.sessionStorage.removeItem("project-toc-collapsed");
});

describe("trace chains", () => {
  it("renders every chain in the Solution section, featured ones outside the disclosure", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const solution = document.getElementById("solution");
    const details = solution.querySelector("details");

    for (const chain of ibsData.traceChains.items) {
      const heading = within(solution).getByRole("heading", { name: chain.title.en });
      expect(details.contains(heading)).toBe(!chain.featured);
    }
    expect(within(solution).getByText(ibsData.traceChains.moreLabel.en)).toBeInTheDocument();
  });

  it("reads each chain in the order evidence → requirement → decision → implementation", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const first = ibsData.traceChains.items[0];
    const cells = ["evidence", "requirement", "decision", "implementation"].map(
      (k) => screen.getByText(first[k].text.en)
    );
    for (let i = 1; i < cells.length; i++) {
      expect(cells[i - 1].compareDocumentPosition(cells[i])).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    }
  });

  it("states that no chain has been validated with users", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    expect(screen.getByText(ibsData.traceChains.intro.en)).toBeInTheDocument();
  });
});

describe("evaluation status", () => {
  it("keeps implemented, internally tested and not-validated apart in Results", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const results = document.getElementById("results");
    for (const tier of ibsData.statusTiers.items) {
      expect(within(results).getByRole("region", { name: tier.title.en })).toBeInTheDocument();
    }
  });

  it("reports open quality checks as open, not as passing", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const methodology = document.getElementById("methodology");
    const open = ibsData.qualityChecks.items.filter((c) => c.state === "open");
    expect(open.length).toBeGreaterThan(0);
    expect(within(methodology).getAllByText(ibsData.qualityChecks.stateLabels.open.en)).toHaveLength(open.length);
  });
});

describe("evidence weighting", () => {
  it("puts the research findings with their sources under the Challenge", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const challenge = document.getElementById("challenge");
    for (const item of ibsData.researchEvidence.items) {
      expect(within(challenge).getByText(item.label.en)).toBeInTheDocument();
    }
  });

  it("keeps supporting figures behind a disclosure, the primary figure outside it", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const challenge = document.getElementById("challenge");
    const primary = within(challenge).getByAltText(ibsData.figures.challenge[0].alt.en);
    expect(primary.closest("details")).toBeNull();
    for (const f of ibsData.supportingFigures.challenge.items) {
      expect(within(challenge).getByAltText(f.alt.en).closest("details")).not.toBeNull();
    }
  });
});

describe("a project without the fields", () => {
  it("renders none of the traceability blocks", () => {
    for (const key of ["researchEvidence", "traceChains", "qualityChecks", "statusTiers", "supportingFigures"]) {
      expect(gazeData[key]).toBeUndefined();
    }
    renderWithProviders(<ProjectTemplate meta={gazeData} />);
    expect(document.querySelector("[data-trace-chains]")).toBeNull();
    expect(screen.queryByText(ibsData.traceChains.title.en)).not.toBeInTheDocument();
    expect(screen.queryByText(ibsData.statusTiers.title.en)).not.toBeInTheDocument();
  });
});
