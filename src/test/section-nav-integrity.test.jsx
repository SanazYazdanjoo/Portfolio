// The section-rail invariant, run against every real case study.
//
// ProjectTemplate derives the sidebar TOC and the mobile pill bar from
// `activeSections` — SECTIONS filtered by whether the project's data.js
// carries that key. The section bodies, though, are rendered by hand, one
// JSX block per section. Those are two independent derivations of the same
// list, and nothing but these tests makes them agree.
//
// They drifted once already: the process gallery was rendered as
//   {meta.process?.length ? <ProcessGallerySection/> : heroImageFallback}
// and a later edit rewrote it as
//   {!(meta.process?.length) && heroImageFallback}
// keeping the fallback and dropping the gallery. `process` stayed in
// SECTIONS, so every case study still listed "Research Process" in its rail
// and still counted it in the section numbering — the entry just scrolled
// nowhere, and every process entry in every data.js (6 for deskbird, 7 for
// EmbraceMe, 6 for the thesis) stopped rendering at all. Nothing failed,
// because no test asserted the two lists agreed.
//
// Same class as "id === slug === folder name" in src/data/projects.test.js:
// a claim that could silently go stale becomes something the suite catches.

import { describe, it, expect } from "vitest";
import { within } from "@testing-library/react";
import { renderWithProviders, screen } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { fullProjects as projects } from "./fullProjects";

describe("section rail — every listed section resolves to a real section", () => {
  it.each(projects.map((p) => [p.slug, p]))(
    "%s: every sidebar entry scrolls to an element that exists",
    (slug, project) => {
      const { unmount } = renderWithProviders(<ProjectTemplate meta={project} />);

      const nav = screen.getByRole("navigation", { name: /page sections/i });
      const entries = within(nav)
        .getAllByRole("button")
        .map((b) => b.textContent.trim())
        // The expand/collapse-all control sits in the same <nav> but is not a
        // section link — it is the only entry without a leading 01/02 number.
        .filter((label) => /^\d{2}/.test(label));

      expect(entries.length, `${slug} rendered no section links`).toBeGreaterThan(0);

      for (const label of entries) {
        // navigateToSection() does getElementById(id).scrollIntoView() — a
        // missing node is a dead nav entry, which is the bug this catches.
        const id = label.replace(/^\d{2}\s*/, "").toLowerCase();
        const section = document.getElementById(id);
        expect(
          section,
          `${slug}: sidebar lists "${label}" but no <section id="${id}"> renders`
        ).not.toBeNull();
      }

      unmount();
    }
  );

  it.each(projects.filter((p) => p.process?.length > 0).map((p) => [p.slug, p]))(
    "%s: defines process entries, so the process gallery renders them",
    (slug, project) => {
      const { unmount } = renderWithProviders(<ProjectTemplate meta={project} />);

      const body = document.getElementById("process-body");
      expect(body, `${slug} has ${project.process.length} process entries but no #process-body`).not.toBeNull();
      expect(body).toHaveAttribute("aria-hidden", "false");

      // Every entry, not just the first — a stepper that renders one item and
      // drops the rest would still satisfy the check above.
      const steps = within(body).getAllByRole("listitem");
      expect(steps.length, `${slug}: ${project.process.length} entries in data.js`).toBe(
        project.process.length
      );

      unmount();
    }
  );
});
