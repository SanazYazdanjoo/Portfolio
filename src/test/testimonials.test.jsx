// Testimonials are third-party endorsements on the About page, double-gated:
// TESTIMONIALS_PUBLISHED is the owner's explicit "go", and an empty item list
// renders nothing even with the flag up. Both gates are asserted here against
// a mocked data module, so the section's behaviour is locked in before any
// real quote exists; the last block checks the real data file's contract so
// publishing with malformed items fails loudly.
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import About from "../pages/About";

const mockState = vi.hoisted(() => ({ published: false, items: [] }));

vi.mock("../data/testimonials", () => ({
  get TESTIMONIALS_PUBLISHED() {
    return mockState.published;
  },
  get testimonialItems() {
    return mockState.items;
  },
}));

const sampleItem = {
  id: 1,
  quote: { en: "A sample endorsement.", de: "Eine Beispiel-Empfehlung." },
  name: "Sample Endorser",
  role: { en: "Product Manager", de: "Product Managerin" },
  company: "Sample GmbH",
  source: "https://www.linkedin.com/in/sample",
};

describe("Testimonials section", () => {
  it("renders nothing while unpublished, even with items present", () => {
    mockState.published = false;
    mockState.items = [sampleItem];
    renderWithProviders(<About />);
    expect(screen.queryByText("In Their Words")).not.toBeInTheDocument();
    expect(screen.queryByText(/sample endorsement/i)).not.toBeInTheDocument();
  });

  it("renders nothing when published but empty", () => {
    mockState.published = true;
    mockState.items = [];
    renderWithProviders(<About />);
    expect(screen.queryByText("In Their Words")).not.toBeInTheDocument();
  });

  it("renders quote, name, role, company, and source link once published", () => {
    mockState.published = true;
    mockState.items = [sampleItem];
    renderWithProviders(<About />);
    expect(screen.getByText("In Their Words")).toBeInTheDocument();
    expect(screen.getByText(/a sample endorsement/i)).toBeInTheDocument();
    expect(screen.getByText("Sample Endorser")).toBeInTheDocument();
    expect(screen.getByText(/product manager · sample gmbh/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read on LinkedIn" })).toHaveAttribute(
      "href",
      sampleItem.source
    );
  });
});

describe("Testimonials data contract", () => {
  it("real items are well-formed, and publishing requires at least one", async () => {
    const real = await vi.importActual("../data/testimonials");
    if (real.TESTIMONIALS_PUBLISHED) {
      expect(
        real.testimonialItems.length,
        "TESTIMONIALS_PUBLISHED is true but no items exist"
      ).toBeGreaterThan(0);
    }
    for (const item of real.testimonialItems) {
      expect(item.quote?.en?.trim()).toBeTruthy();
      expect(item.quote?.de?.trim()).toBeTruthy();
      expect(item.name?.trim()).toBeTruthy();
      expect(item.role?.en?.trim()).toBeTruthy();
      expect(item.role?.de?.trim()).toBeTruthy();
      expect(item.company?.trim()).toBeTruthy();
    }
  });
});
