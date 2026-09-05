// The floating prototype badge (one project only — see
// projects/digitalising-ibs-travel-reimbursements/PrototypeFab.jsx).
//
// What matters here is not the animation but the three rules the animation
// hangs off: it stays away until the reader is actually reading, it parks
// while the inline gold CTA is on screen so only one gold mark is ever
// visible, and it never renders a link to nowhere.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor, act } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import { PrototypeFab } from "../projects/digitalising-ibs-travel-reimbursements/PrototypeFab";

const HREF = "https://ibs-fktn.vercel.app/";
const LABEL = { en: "Open the live prototype", de: "Live-Prototyp öffnen" };

// The app scrolls inside a container, not the window (App.jsx), and the
// badge finds it with .closest(".overflow-y-auto") — so the fixture has to
// provide one. jsdom has no layout, so clientHeight is 0 and the reveal
// threshold collapses to "scrollTop > 0", which is all this needs.
function renderFab(props = {}) {
  const utils = renderWithProviders(
    <div className="overflow-y-auto" data-testid="scroller">
      <div id="prototype">inline prototype section</div>
      <PrototypeFab href={HREF} label={LABEL} {...props} />
    </div>
  );
  const scroller = screen.getByTestId("scroller");
  return {
    ...utils,
    scroller,
    scrollDown() {
      act(() => {
        scroller.scrollTop = 900;
        scroller.dispatchEvent(new Event("scroll"));
      });
    },
  };
}

// A controllable IntersectionObserver so a test can say "the prototype
// section just came into view" without any layout. The badge now builds TWO
// observers — its own section-parking one (no rootMargin) and the shared
// corner hook's (rootMargin shrinks the root to the corner zone) — so the
// fake routes by that signature instead of trusting construction order.
let notifyIntersection; // the prototype-section observer
let notifyCorner; // useCornerOccupied's corner-zone observer

beforeEach(() => {
  notifyIntersection = null;
  notifyCorner = null;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback, opts) {
        const notify = (isIntersecting, target = null) =>
          act(() => callback([{ isIntersecting, target }]));
        if (opts?.rootMargin) notifyCorner = notify;
        else notifyIntersection = notify;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// Below md, where the badge shares the corner with the section index and the
// figure chips. framer's useReducedMotion also reads matchMedia, so the stub
// answers every query as matching — which only makes exits instant.
function stubMobileViewport() {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    }))
  );
}

describe("Floating prototype badge", () => {
  it("stays out of the way until the reader has scrolled in", () => {
    renderFab();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("appears once scrolled, linking to the prototype in a new tab", () => {
    const { scrollDown } = renderFab();
    scrollDown();

    const link = screen.getByRole("link", { name: /open the live prototype/i });
    expect(link).toHaveAttribute("href", HREF);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("names the new tab in its accessible label", () => {
    const { scrollDown } = renderFab();
    scrollDown();
    expect(screen.getByRole("link", { name: /opens in a new tab/i })).toBeInTheDocument();
  });

  it("parks while the inline prototype section is on screen", async () => {
    const { scrollDown } = renderFab();
    scrollDown();
    expect(screen.getByRole("link")).toBeInTheDocument();

    notifyIntersection(true);
    await waitFor(() => expect(screen.queryByRole("link")).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    notifyIntersection(false);
    await waitFor(() => expect(screen.getByRole("link")).toBeInTheDocument());
  });

  it("renders nothing at all without a prototype URL", () => {
    const { scrollDown, container } = renderFab({ href: undefined });
    scrollDown();
    expect(container.querySelector("a")).toBeNull();
  });

  it("parks on phones while a corner occupant is under it", async () => {
    // Same yield as the ASK AI pill: the section index in transit and the figure
    // chips pass straight through this corner on a 393px viewport, and the
    // bar slicing the badge (its z-40 over this z-30) read as broken.
    stubMobileViewport();
    const { scrollDown } = renderFab();
    scrollDown();
    expect(screen.getByRole("link")).toBeInTheDocument();

    const occupant = document.createElement("div");
    notifyCorner(true, occupant);
    await waitFor(() => expect(screen.queryByRole("link")).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    notifyCorner(false, occupant);
    await waitFor(() => expect(screen.getByRole("link")).toBeInTheDocument());
  });

  it("ignores corner occupants on desktop, where it overlaps nothing", async () => {
    const { scrollDown } = renderFab();
    scrollDown();

    const occupant = document.createElement("div");
    notifyCorner(true, occupant);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
