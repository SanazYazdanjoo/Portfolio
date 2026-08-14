import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, within, waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import Credentials from "../pages/Credentials";

const { mockProfile } = vi.hoisted(() => ({
  mockProfile: {
    navLinks: [],
    certifications: [
      {
        title: "Figma 101 Workshop",
        provider: "HCI Group, Bauhaus-Universität Weimar",
        year: "2025",
        type: "workshop",
        topic: "design",
        skills: ["Figma", "Design Systems"],
        thumb: "/assets/certificates/figma-101.webp",
        file: "/assets/certificates/figma-101.pdf",
        verifyUrl: "",
      },
      {
        title: "Python Programming",
        provider: "TVTO",
        year: "2019",
        type: "course",
        topic: "engineering",
        skills: ["Python"],
        thumb: "",
        file: "",
        verifyUrl: "",
      },
    ],
  },
}));

vi.mock("../data/profile", () => ({
  profileData: mockProfile,
}));

describe("Credentials page", () => {
  it("renders one card per entry in profile.certifications", () => {
    renderWithProviders(<Credentials />);
    expect(screen.getByRole("heading", { name: "Figma 101 Workshop" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Python Programming" })).toBeInTheDocument();
  });

  it("renders the fallback tile, not an <img>, for a cert with no thumb", () => {
    renderWithProviders(<Credentials />);
    expect(
      screen.queryByAltText("Python Programming certificate from TVTO")
    ).not.toBeInTheDocument();
    // The fallback tile still surfaces the title as text (just not as an <img>).
    expect(screen.getAllByText("Python Programming").length).toBeGreaterThan(0);
  });

  it("does not make a cert with no file and no verifyUrl clickable", () => {
    renderWithProviders(<Credentials />);
    expect(
      screen.queryByRole("button", { name: /view credential: python programming/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /python programming/i })
    ).not.toBeInTheDocument();
  });

  it("opens a labelled dialog when a card with a file is clicked", () => {
    renderWithProviders(<Credentials />);
    fireEvent.click(
      screen.getByRole("button", { name: /view credential: figma 101 workshop/i })
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByText("Figma 101 Workshop")).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the triggering card", () => {
    renderWithProviders(<Credentials />);
    const trigger = screen.getByRole("button", {
      name: /view credential: figma 101 workshop/i,
    });

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

describe("Credentials page — topic filter", () => {
  const chip = (name) => screen.getByRole("button", { name: new RegExp(`^${name}`, "i") });

  it("renders one chip per topic in the data, plus All, with counts", () => {
    renderWithProviders(<Credentials />);
    expect(chip("all")).toHaveTextContent("2");
    expect(chip("design & prototyping")).toHaveTextContent("1");
    expect(chip("engineering")).toHaveTextContent("1");
    // No cert carries these topics, so they get no chip
    expect(screen.queryByRole("button", { name: /^accessibility/i })).not.toBeInTheDocument();
  });

  it("filters the grid to the selected topic without unmounting the page", async () => {
    renderWithProviders(<Credentials />);
    fireEvent.click(chip("engineering"));

    expect(screen.getByRole("heading", { name: "Python Programming" })).toBeInTheDocument();
    expect(screen.getByText("Showing 1 of 2")).toBeInTheDocument();
    // AnimatePresence keeps a filtered-out card mounted until its exit
    // animation finishes, so the removal is asserted asynchronously.
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", { name: "Figma 101 Workshop" })
    );
  });

  it("treats two selected topics as OR, not AND", () => {
    renderWithProviders(<Credentials />);
    fireEvent.click(chip("engineering"));
    fireEvent.click(chip("design & prototyping"));

    expect(screen.getByRole("heading", { name: "Python Programming" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Figma 101 Workshop" })).toBeInTheDocument();
  });

  it("deselects a chip on a second click and marks selection with aria-pressed", () => {
    renderWithProviders(<Credentials />);
    fireEvent.click(chip("engineering"));
    expect(chip("engineering")).toHaveAttribute("aria-pressed", "true");
    expect(chip("all")).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(chip("engineering"));
    expect(chip("engineering")).toHaveAttribute("aria-pressed", "false");
    expect(chip("all")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Figma 101 Workshop" })).toBeInTheDocument();
  });

  it("applies ?topic= from the URL on first render", () => {
    renderWithProviders(<Credentials />, { route: "/credentials?topic=design" });
    expect(screen.getByRole("heading", { name: "Figma 101 Workshop" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Python Programming" })).not.toBeInTheDocument();
  });

  it("ignores an unknown topic in the URL rather than emptying the grid", () => {
    renderWithProviders(<Credentials />, { route: "/credentials?topic=nonsense" });
    expect(screen.getByRole("heading", { name: "Figma 101 Workshop" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Python Programming" })).toBeInTheDocument();
  });

  it("resets to every credential from the All chip", () => {
    renderWithProviders(<Credentials />, { route: "/credentials?topic=design" });
    fireEvent.click(chip("all"));
    expect(screen.getByText("Showing 2 of 2")).toBeInTheDocument();
  });
});

describe("Credentials page — empty state", () => {
  it("renders the credentials.empty state, not a crash, for an empty array", () => {
    const original = mockProfile.certifications;
    mockProfile.certifications = [];

    try {
      renderWithProviders(<Credentials />);
      expect(screen.getByText(/credentials are being added/i)).toBeInTheDocument();
    } finally {
      mockProfile.certifications = original;
    }
  });
});
