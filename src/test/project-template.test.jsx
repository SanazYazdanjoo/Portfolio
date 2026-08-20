import { describe, it, expect, afterEach } from "vitest";
import { screen, within, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData } from "../projects/gaze-assisted-input/data";
import { projectData as ibsData } from "../projects/digitalising-ibs-travel-reimbursements/data";

// Renders the page in German. The provider reads the stored preference on
// mount, so it has to be set before render, and cleared after — otherwise the
// first German test silently turns every later test German too.
function renderInGerman(meta) {
  window.localStorage.setItem("portfolio-lang", "de");
  return renderWithProviders(<ProjectTemplate meta={meta} />);
}

afterEach(() => window.localStorage.removeItem("portfolio-lang"));

describe("ProjectTemplate", () => {
  it("renders challenge figures when they exist in the project data", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByAltText("challenge")).toBeInTheDocument();
  });
});

// The rendering half of the data/renderer contract. projects.test.js checks
// the data shape; these check that the shape actually reaches the page, and —
// more importantly — that a project omitting an optional field gets silence
// rather than an empty heading or a stray label.
describe("ProjectTemplate — header lead line", () => {
  it("renders the tagline for the IBS case study", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    expect(screen.getByText(ibsData.tagline.en)).toBeInTheDocument();
  });
});

describe("ProjectTemplate — at-a-glance strip renders from present fields, not a flag", () => {
  // A synthetic fixture, not a real project: `resultsAtAGlance` is optional
  // and no project currently sets it, but the code path is live and a test
  // pinned to one project's copy breaks whenever that copy is rewritten —
  // which is exactly how this test came to fail on main.
  const withGlance = {
    ...projectData,
    metricsIntro: undefined,
    resultsAtAGlance: {
      title: { en: "Measured so far", de: "Bisher gemessen" },
      items: [{ value: "3", label: { en: "things counted", de: "Dinge gezählt" } }],
    },
  };

  it("uses the project's own strip title and items when resultsAtAGlance is present", () => {
    renderWithProviders(<ProjectTemplate meta={withGlance} />);

    expect(screen.getByText("Measured so far")).toBeInTheDocument();
    expect(screen.queryByText("Study at a Glance")).not.toBeInTheDocument();
    expect(screen.getByText("things counted")).toBeInTheDocument();
  });

  it("falls back to metrics under the default heading for projects without resultsAtAGlance", () => {
    expect(projectData.resultsAtAGlance).toBeUndefined();
    expect(projectData.metricsIntro).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByText("Study at a Glance")).toBeInTheDocument();
  });

  it("renders no strip at all when a project has neither field", () => {
    const bare = { ...projectData, metrics: undefined, resultsAtAGlance: undefined };
    renderWithProviders(<ProjectTemplate meta={bare} />);
    expect(screen.queryByText("Study at a Glance")).not.toBeInTheDocument();
  });
});

// `metricsIntro` replaces the eyebrow rather than joining it. A project that
// has to explain how to read its numbers is the project for which "Study at a
// Glance" is a false label — stacking a caption under a wrong heading does
// not make the heading right.
describe("ProjectTemplate — metricsIntro", () => {
  it("renders above the grid and replaces the study-shaped eyebrow", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    const intro = screen.getByText(ibsData.metricsIntro.en);
    expect(intro).toBeInTheDocument();
    expect(screen.queryByText("Study at a Glance")).not.toBeInTheDocument();

    // Above the grid, not below it: the first metric cell must follow it in
    // document order.
    const firstMetric = screen.getByText(ibsData.metrics[0].label.en);
    expect(intro.compareDocumentPosition(firstMetric))
      .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("renders in German too", () => {
    renderInGerman(ibsData);
    expect(screen.getByText(ibsData.metricsIntro.de)).toBeInTheDocument();
  });

  it("renders nothing for a project without the field", () => {
    expect(projectData.metricsIntro).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByText("Study at a Glance")).toBeInTheDocument();
  });
});

// The section `figures.design` was written for and nothing rendered.
describe("ProjectTemplate — design section", () => {
  it("renders its heading, prose and figures", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    const section = document.getElementById("design");
    expect(section).toBeInTheDocument();
    expect(within(section).getByText(/How It Was Made/)).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: "Design" })).toBeInTheDocument();
    expect(within(section).getByText(ibsData.design.en)).toBeInTheDocument();

    // Every planned figure occupies a slot, whether or not its artwork has
    // been exported — a figure waiting on its image must still be visibly
    // present, not silently absent.
    expect(section.querySelectorAll("figure")).toHaveLength(ibsData.figures.design.length);

    for (const figure of ibsData.figures.design) {
      if (typeof figure.src === "string") {
        expect(within(section).getByAltText(figure.alt.en)).toBeInTheDocument();
      }
      // Framing is authored for both, so both must show it.
      expect(within(section).getByText(figure.title.en)).toBeInTheDocument();
    }
  });

  it("sits between Solution and Methodology", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const solution = document.getElementById("solution");
    const design = document.getElementById("design");
    const methodology = document.getElementById("methodology");

    expect(solution.compareDocumentPosition(design)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(design.compareDocumentPosition(methodology)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("renders in German too", () => {
    renderInGerman(ibsData);
    const section = document.getElementById("design");
    expect(within(section).getByText(ibsData.design.de)).toBeInTheDocument();
  });

  it("renders nothing — not an empty section — for a project without the field", () => {
    expect(projectData.design).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(document.getElementById("design")).toBeNull();
    expect(screen.queryByText("How It Was Made")).not.toBeInTheDocument();
  });
});

// Verbatims are survey evidence. Which section they are evidence *for* is a
// per-project judgement in the data; presence alone decides whether they
// render at all.
describe("ProjectTemplate — verbatim placement", () => {
  it("puts IBS's survey quotes in the Challenge section, not Results", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    const challenge = document.getElementById("challenge");
    const results = document.getElementById("results");

    for (const v of ibsData.verbatims) {
      const quote = `“${v.quote.en}”`;
      expect(within(challenge).getAllByText(quote).length).toBeGreaterThan(0);
      expect(within(results).queryByText(quote)).not.toBeInTheDocument();
    }
  });

  it("renders them after the prose and before the figures", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const challenge = document.getElementById("challenge");

    const prose = within(challenge).getByText(ibsData.challenge.en);
    const quote = within(challenge).getAllByText(`“${ibsData.verbatims[0].quote.en}”`)[0];
    const figure = within(challenge).getByAltText(ibsData.figures.challenge[0].alt.en);

    expect(prose.compareDocumentPosition(quote)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(quote.compareDocumentPosition(figure)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("renders in German too", () => {
    renderInGerman(ibsData);
    const challenge = document.getElementById("challenge");
    for (const v of ibsData.verbatims) {
      expect(within(challenge).getAllByText(`“${v.quote.de}”`).length).toBeGreaterThan(0);
    }
  });

  // The other project with verbatims must not move. It has no `verbatimsIn`,
  // so it keeps the default Results placement.
  it("leaves a project without verbatimsIn in Results", () => {
    expect(projectData.verbatimsIn).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);

    const results = document.getElementById("results");
    const challenge = document.getElementById("challenge");

    for (const v of projectData.verbatims) {
      const quote = `“${v.quote.en}”`;
      expect(within(results).getAllByText(quote).length).toBeGreaterThan(0);
      expect(within(challenge).queryByText(quote)).not.toBeInTheDocument();
    }
  });

  it("renders nothing for a project with no verbatims at all", () => {
    const bare = { ...ibsData, verbatims: undefined };
    renderWithProviders(<ProjectTemplate meta={bare} />);
    expect(screen.queryByLabelText("Participant quote")).not.toBeInTheDocument();
  });
});

describe("ProjectTemplate — deliberately-not-built block", () => {
  it("renders its data-supplied title and every item", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    expect(screen.getByText(ibsData.notBuilt.title.en)).toBeInTheDocument();
    for (const item of ibsData.notBuilt.items) {
      expect(screen.getByText(item.en)).toBeInTheDocument();
    }
  });

  it("renders after the Results prose", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    const results = screen.getByText(ibsData.results.en);
    const notBuilt = screen.getByText(ibsData.notBuilt.title.en);
    expect(results.compareDocumentPosition(notBuilt)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("renders in German too", () => {
    renderInGerman(ibsData);
    expect(screen.getByText(ibsData.notBuilt.title.de)).toBeInTheDocument();
    for (const item of ibsData.notBuilt.items) {
      expect(screen.getByText(item.de)).toBeInTheDocument();
    }
  });

  it("renders nothing for a project without the field", () => {
    expect(projectData.notBuilt).toBeUndefined();
    const { container } = renderWithProviders(<ProjectTemplate meta={projectData} />);
    // No stray heading, and no empty bordered list where the block would be.
    expect(container.textContent).not.toMatch(/deliberately not built/i);
  });
});

describe("ProjectTemplate — AI-assistance disclosure", () => {
  it("renders the disclosure as a labelled metadata row when present", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    expect(screen.getByText("AI Assistance")).toBeInTheDocument();
    expect(screen.getByText(ibsData.aiAssistance.en)).toBeInTheDocument();
  });

  it("renders nothing — not an empty row — for a project without the field", () => {
    expect(projectData.aiAssistance).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.queryByText("AI Assistance")).not.toBeInTheDocument();
  });
});

// The sidebar toggle. Not a screenshot test — what matters here is that the
// control is reachable, labelled, and actually points at the list it claims
// to control.
describe("ProjectTemplate — collapsible section nav", () => {
  it("exposes a labelled toggle wired to the list it controls", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    const toggle = screen.getByRole("button", { name: "Hide section list" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const controlledId = toggle.getAttribute("aria-controls");
    expect(controlledId).toBeTruthy();
    expect(document.getElementById(controlledId)).toBeInTheDocument();
  });

  it("keeps every section reachable by name once collapsed", async () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    const toggle = screen.getByRole("button", { name: "Hide section list" });
    fireEvent.click(toggle);

    const expanded = screen.getByRole("button", { name: "Show section list" });
    expect(expanded).toHaveAttribute("aria-expanded", "false");

    // Labels are gone from view but not from the accessibility tree.
    const list = document.getElementById(expanded.getAttribute("aria-controls"));
    expect(within(list).getByRole("button", { name: "Challenge" })).toBeInTheDocument();
    expect(within(list).getByRole("button", { name: "Design" })).toBeInTheDocument();
  });
});
