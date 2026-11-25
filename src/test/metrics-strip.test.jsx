// The metrics strip renders every value exactly as authored, from the first
// frame (projects/template/MetricsStrip.jsx).
//
// It used to count each number up from 0 once the cell scrolled into view,
// which made the strip's resting state "0": a full-page screenshot or a quick
// scroll froze the IBS strip on "0 documented problems". These tests hold the
// replacement rule down: no observer, no animation, no intermediate value —
// what the data says is what the reader (and any capture) sees.

import { describe, it, expect } from "vitest";
import { renderWithProviders } from "./renderWithProviders";
import { MetricsStrip } from "../projects/template/MetricsStrip";

function renderStrip(metrics) {
  const { container } = renderWithProviders(<MetricsStrip metrics={metrics} />);
  return container;
}

describe("Metrics strip values", () => {
  it.each(["25", "1,234", "3 → 1", "43+", "4/6", "60%", "80×16", "3s / 9s", "n=6", ">1 yr", "~75%"])(
    "renders %s as authored, with no observer firing",
    (value) => {
      const container = renderStrip([{ value, label: "a label" }]);
      expect(container.querySelector("p.tabular-nums").textContent).toBe(value);
    }
  );

  it("never renders a zero the data does not contain", () => {
    const container = renderStrip([
      { value: "25", label: "problems" },
      { value: "4/6", label: "respondents" },
      { value: "43+", label: "days" },
    ]);
    const values = [...container.querySelectorAll("p.tabular-nums")].map((p) => p.textContent);
    expect(values).toEqual(["25", "4/6", "43+"]);
  });
});

describe("Metrics strip grid", () => {
  const grid = (n) =>
    renderStrip(Array.from({ length: n }, (_, i) => ({ value: String(i + 1), label: `m${i}` })))
      .querySelector(".grid").className;

  it("sits six items in threes, so no row ends in empty cells", () => {
    expect(grid(6)).toContain("lg:grid-cols-3");
    expect(grid(3)).toContain("lg:grid-cols-3");
  });

  it("sits four and eight items in fours", () => {
    expect(grid(4)).toContain("lg:grid-cols-4");
    expect(grid(8)).toContain("lg:grid-cols-4");
  });

  it("stays two columns below lg, where four-up cells clipped German labels", () => {
    expect(grid(4)).toMatch(/(^|\s)grid-cols-2(\s|$)/);
    expect(grid(4)).not.toMatch(/(^|\s)(sm|md):grid-cols-/);
  });
});
