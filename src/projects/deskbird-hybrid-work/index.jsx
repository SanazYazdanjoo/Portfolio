import React from 'react';
import ProjectTemplate from '../../projects/ProjectTemplate';
import { projectData } from './deskbird-hybrid-work.data';
import competitorReviewImg from './media/p01_competitor-review.webp';
import conceptJtbdImg from './media/p08_concept-background-jtbd.webp';
import conceptFeaturesImg from './media/p08_concept-features-mvp.webp';

const suppliedMedia = {
  'p08_concept-background-jtbd.png': conceptJtbdImg,
  'p08_concept-features-mvp.png': conceptFeaturesImg,
};

const hydrateFigure = (figure) => {
  const src = suppliedMedia[figure?.pendingFile];
  return src ? { ...figure, src } : figure;
};

const enhancedProjectData = {
  ...projectData,
  process: projectData.process.map((step, index) => {
    const figures = (step.figures ?? []).map(hydrateFigure);

    // The supplied competitor-analysis board belongs with the opening
    // heuristic/state-of-the-art review. Keep it as evidence in addition to
    // the more focused exports that can still be added later.
    if (index === 0) {
      figures.push({
        type: 'image',
        src: competitorReviewImg,
        alt: {
          en: 'Competitor review of Flexopus, Condeco, Deskly and Pult, comparing colleague-finding, office status and booking, workspace customisation and related workplace features.',
          de: 'Wettbewerbsanalyse von Flexopus, Condeco, Deskly und Pult mit Vergleich von Kolleg:innen-Suche, Bürostatus und Buchung, Arbeitsplatz-Anpassung und verwandten Workplace-Funktionen.',
        },
        caption: {
          en: 'Direct desk-booking competitors already supported finding colleagues and coordinating office presence; the opportunity was not another finder, but a stronger social layer around shared interests and events.',
          de: 'Direkte Desk-Booking-Wettbewerber unterstützten bereits das Finden von Kolleg:innen und die Koordination der Büroanwesenheit; die Chance lag daher nicht in einem weiteren Finder, sondern in einer stärkeren sozialen Ebene rund um gemeinsame Interessen und Events.',
        },
        span: 2,
        className: 'w-full h-auto block',
      });
    }

    return { ...step, figures };
  }),
  figures: Object.fromEntries(
    Object.entries(projectData.figures ?? {}).map(([key, figures]) => [
      key,
      figures.map(hydrateFigure),
    ]),
  ),
};

// Dev-only: list every figure still waiting for its file in ./media. The
// data file resolves media by filename and returns null for a missing one,
// so the build never fails on an absent asset — this is the one place that
// says which are absent. Deduplicated, since a few files appear in two
// sections. Runs once at module load, like the checks in data/projects.js.
if (import.meta.env.DEV) {
  const missing = [
    ...new Set(
      enhancedProjectData.process
        .flatMap((s) => s.figures ?? [])
        .concat(Object.values(enhancedProjectData.figures ?? {}).flat())
        .filter((f) => !f.src)
        .map((f) => f.pendingFile)
        .filter(Boolean)
    ),
  ];
  if (missing.length) console.warn('[case study] media pending:', missing);
}

export default function Project2() {
  return <ProjectTemplate meta={enhancedProjectData} />;
}
