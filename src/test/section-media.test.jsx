import { afterEach, describe, it, expect, vi } from "vitest";
import { act, screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import SectionMedia from "../projects/SectionMedia";

const figures = [
  { src: "/a.webp", alt: "Diagram A", caption: "Caption A" },
  { src: "/b.webp", alt: "Diagram B", zoom: false },
];

afterEach(() => {
  vi.useRealTimers();
});

describe("SectionMedia", () => {
  it("renders nothing when there are no items", () => {
    const { container } = renderWithProviders(<SectionMedia items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("gives every figure alt text", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    expect(screen.getByAltText("Diagram A")).toBeInTheDocument();
    expect(screen.getByAltText("Diagram B")).toBeInTheDocument();
  });

  it("makes zoomable figures keyboard-reachable buttons, and respects zoom:false", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    expect(
      screen.getByRole("button", { name: /enlarge figure: diagram a/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /enlarge figure: diagram b/i })
    ).not.toBeInTheDocument();
  });

  it("opens a labelled modal dialog on click and closes on Escape", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /enlarge figure: diagram a/i }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Diagram A");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("restores body scroll after the overlay closes", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    fireEvent.click(screen.getByRole("button", { name: /enlarge figure: diagram a/i }));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});

describe("Embedded media loading state", () => {
  const embed = [{
    type: "embed",
    src: "https://embed.figma.com/design/example",
    alt: "Interactive Figma board",
    loadingText: "Loading interactive prototype…",
    loadingDetail: "This may take a few seconds.",
    slowLoadingText: "Still loading the prototype…",
    slowLoadingDetail: "Figma embeds can sometimes take a little longer.",
    externalHref: "https://www.figma.com/design/example",
    externalLabel: "Open in Figma",
  }];

  it("keeps an accessible loader visible until the iframe loads", () => {
    const { container } = renderWithProviders(<SectionMedia items={embed} />);
    const frame = screen.getByTitle("Interactive Figma board");
    const wrapper = container.querySelector("[data-embed-state]");

    expect(wrapper).toHaveAttribute("data-embed-state", "loading");
    expect(wrapper).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Loading interactive prototype…");
    expect(screen.getByRole("status")).toHaveTextContent("This may take a few seconds.");
    expect(frame).toHaveAttribute("tabindex", "-1");
    expect(frame.className).toContain("opacity-0");

    fireEvent.load(frame);

    expect(wrapper).toHaveAttribute("data-embed-state", "loaded");
    expect(wrapper).toHaveAttribute("aria-busy", "false");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(frame).toHaveAttribute("tabindex", "0");
    expect(frame.className).toContain("opacity-100");
  });

  it("offers a Figma fallback when an embed is taking a long time", () => {
    vi.useFakeTimers();
    const { container } = renderWithProviders(<SectionMedia items={embed} />);

    act(() => {
      vi.advanceTimersByTime(7000);
    });

    expect(container.querySelector("[data-embed-state]")).toHaveAttribute(
      "data-embed-state",
      "slow"
    );
    expect(screen.getByRole("status")).toHaveTextContent("Still loading the prototype…");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Figma embeds can sometimes take a little longer."
    );
    expect(screen.getByRole("link", { name: /open in figma/i })).toHaveAttribute(
      "href",
      "https://www.figma.com/design/example"
    );
  });
});

describe("Figure framing fields", () => {
  const rich = [{
    src: "/c.webp",
    alt: "Diagram C",
    label: "Stakeholder Map",
    title: "Nine roles",
    description: "How to read it.",
    takeaway: "The finding.",
    takeawayLabel: "Why it matters",
  }];

  it("renders label, title, description and takeaway when provided", () => {
    renderWithProviders(<SectionMedia items={rich} />);
    expect(screen.getByText("Stakeholder Map")).toBeInTheDocument();
    expect(screen.getByText("Nine roles")).toBeInTheDocument();
    expect(screen.getByText("How to read it.")).toBeInTheDocument();
    expect(screen.getByText("The finding.")).toBeInTheDocument();
    expect(screen.getByText("Why it matters")).toBeInTheDocument();
  });

  it("falls back to a default takeaway label", () => {
    renderWithProviders(
      <SectionMedia items={[{ src: "/d.webp", alt: "D", takeaway: "X" }]} />
    );
    expect(screen.getByText("What it shows")).toBeInTheDocument();
  });

  it("stays backward compatible for figures with only src, alt and caption", () => {
    renderWithProviders(
      <SectionMedia items={[{ src: "/e.webp", alt: "E", caption: "Just a caption" }]} />
    );
    expect(screen.getByText(/just a caption/i)).toBeInTheDocument();
    expect(screen.queryByText("What it shows")).not.toBeInTheDocument();
  });

});

describe("Pending figures (src resolved to null)", () => {
  const pending = [
    { src: null, pendingFile: "p06_affinity-wall_full.png", alt: "Affinity wall", caption: "The wall", span: 2 },
    { src: "/real.png", alt: "Real one", caption: "Shipped", span: 1 },
  ];

  it("renders a labelled placeholder naming the awaited file, never a broken img", () => {
    renderWithProviders(<SectionMedia items={pending} />);
    const placeholder = screen.getByRole("img", { name: "Affinity wall" });
    expect(placeholder.tagName).not.toBe("IMG");
    expect(placeholder).toHaveTextContent("Figure in preparation");
    expect(placeholder).toHaveTextContent("p06_affinity-wall_full.png");
    expect(screen.queryByAltText("Affinity wall")).not.toBeInTheDocument();
    expect(screen.getByAltText("Real one")).toBeInTheDocument();
  });

  it("keeps the caption under a pending figure and hides the figure in print", () => {
    const { container } = renderWithProviders(<SectionMedia items={pending} />);
    expect(screen.getByText("The wall")).toBeInTheDocument();
    const [pendingFigure, realFigure] = container.querySelectorAll("figure");
    expect(pendingFigure.className).toContain("print:hidden");
    expect(pendingFigure.className).toContain("sm:col-span-2");
    expect(realFigure.className).not.toContain("print:hidden");
  });

  it("does not offer zoom on a pending figure", () => {
    renderWithProviders(<SectionMedia items={pending} />);
    expect(screen.queryByRole("button", { name: /enlarge figure: affinity wall/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enlarge figure: real one/i })).toBeInTheDocument();
  });
});
