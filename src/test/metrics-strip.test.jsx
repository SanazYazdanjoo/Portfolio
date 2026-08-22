// The metrics strip counts each number up from zero once it scrolls into
// view (projects/template/MetricsStrip.jsx).
//
// The rule these tests hold down is that the counter owns the WHOLE leading
// number, separators included. A metric authored as "1,234" that matches only
// the digits ahead of the separator counts 0 → 1 and strands ",234" beside the
// counter, so the strip reads "0,234" for the length of the animation. The
// mirror-image failure is a counter that swallows too much: "3 → 1" must count
// to 3, not to 31.
//
// Each value is checked at rest (before the observer fires) and again once the
// count has landed, because the two failures show up at different moments.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import { MetricsStrip } from "../projects/template/MetricsStrip";

// A controllable IntersectionObserver, so a test can say "the strip just
// scrolled into view" without any layout. framer-motion's useInView keys its
// entries by target, so the entry has to carry the real observed element —
// unlike the no-op observer in setup.js, which never fires at all.
let observers;

beforeEach(() => {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback) {
        this.callback = callback;
        this.targets = new Set();
        observers.push(this);
      }
      observe(el) {
        this.targets.add(el);
      }
      unobserve(el) {
        this.targets.delete(el);
      }
      disconnect() {
        this.targets.clear();
      }
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function scrollIntoView() {
  act(() => {
    for (const observer of observers) {
      const entries = [...observer.targets].map((target) => ({
        target,
        isIntersecting: true,
        intersectionRatio: 1,
      }));
      if (entries.length) observer.callback(entries, observer);
    }
  });
}

function renderMetric(value) {
  const { container } = renderWithProviders(
    <MetricsStrip metrics={[{ value, label: "a label" }]} />
  );
  return container.querySelector("p.tabular-nums");
}

// What the reader sees on screen. The print-only twin holds the settled value
// for paper and is hidden by a Tailwind class — but jsdom has no stylesheet to
// apply it, so it is removed before reading the text.
function screenText(el) {
  const clone = el.cloneNode(true);
  for (const span of clone.querySelectorAll("span")) {
    if (span.classList.contains("print:inline")) span.remove();
  }
  return clone.textContent;
}

// What a printed page shows: the value already settled, never mid-count.
function printText(el) {
  const twin = [...el.querySelectorAll("span")].find((s) =>
    s.classList.contains("print:inline")
  );
  return twin?.textContent;
}

describe("Metrics strip count-up", () => {
  it("counts a separated number as one number, not just its first digit", async () => {
    const el = renderMetric("1,234");

    // The regression: this read "0,234" when the match stopped at the comma.
    expect(screenText(el)).toBe("0");

    scrollIntoView();
    await waitFor(() => expect(screenText(el)).toBe("1,234"), { timeout: 3000 });
  });

  it("gives print the settled value, separator included", () => {
    const el = renderMetric("1,234");
    // Read "1" when the match stopped at the comma.
    expect(printText(el)).toBe("1,234");
  });

  it("does not treat a plain space as a separator", async () => {
    const el = renderMetric("3 → 1");

    expect(screenText(el)).toBe("0 → 1");

    scrollIntoView();
    // Counts to 3 — never to 31, which is what swallowing the space would give.
    await waitFor(() => expect(screenText(el)).toBe("3 → 1"), { timeout: 3000 });
  });

  it.each([
    ["43+", "0+"],
    ["4/6", "0/6"],
    ["60%", "0%"],
    ["80×16", "0×16"],
    ["3s / 9s", "0s / 9s"],
    ["100", "0"],
  ])("counts the leading number of %s and leaves the rest alone", async (value, atRest) => {
    const el = renderMetric(value);

    expect(screenText(el)).toBe(atRest);

    scrollIntoView();
    await waitFor(() => expect(screenText(el)).toBe(value), { timeout: 3000 });
  });

  it.each([">1 yr", "n=3", "n=6", "N=30", "~75%", "NO TRIGGER", "TypeScript"])(
    "renders %s as authored, with nothing to count",
    (value) => {
      const el = renderMetric(value);
      expect(screenText(el)).toBe(value);
      scrollIntoView();
      expect(screenText(el)).toBe(value);
    }
  );
});
