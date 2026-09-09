import React from 'react';
import ProjectTemplate from '../../projects/ProjectTemplate';
import { projectData } from './deskbird-hybrid-work.data';
import competitorReviewImg from './media/p01_competitor-review.webp';
import ideationDirectionsImg from './media/p08_ideation-directions.webp';
import selectedDirectionImg from './media/p08_selected-interest-based-direction.webp';
import targetUsersImg from './media/p08_target-users.webp';
import conceptBackgroundImg from './media/p08_concept-background-jtbd.webp';
import conceptStoryboardImg from './media/p08_concept-storyboard.webp';
import conceptMvpImg from './media/p08_concept-features-mvp.webp';

const mediaClass = 'w-full h-auto block';

const competitorReviewFigure = {
  type: 'image',
  src: competitorReviewImg,
  pendingFile: 'p01_competitor-review.webp',
  alt: {
    en: 'Desk-booking competitor review comparing Flexopus, Condeco, Deskly and Pult, with recurring patterns grouped into colleague interaction, desk and area customisation, data-driven workplace enhancement, and space optimisation',
    de: 'Wettbewerbsanalyse von Deskbuchungsprodukten mit Flexopus, Condeco, Deskly und Pult sowie wiederkehrenden Mustern zu Kolleg:innen-Interaktion, Arbeitsplatz- und Bereichsanpassung, datenbasierter Arbeitsplatzoptimierung und Flächennutzung',
  },
  caption: {
    en: 'A slice of the direct competitor review — colleague-finding and attendance visibility were already common, so presence data itself was not the differentiator',
    de: 'Ein Ausschnitt der direkten Wettbewerbsanalyse — Kolleg:innen-Suche und Anwesenheitssichtbarkeit waren bereits verbreitet; Anwesenheitsdaten allein waren daher kein Differenzierungsmerkmal',
  },
  span: 2,
  className: mediaClass,
};

const ideationDirectionsFigure = {
  type: 'image',
  src: ideationDirectionsImg,
  pendingFile: 'p08_ideation-directions.webp',
  alt: {
    en: 'Five early concept directions shown side by side: efficient and engaging communication, interest-based events or social networking, personalised and optimised breaks, intelligent notification and alert system, and well-being and productivity',
    de: 'Fünf frühe Konzeptrichtungen nebeneinander: effiziente und ansprechende Kommunikation, interessenbasierte Events oder Social Networking, personalisierte und optimierte Pausen, intelligentes Benachrichtigungs- und Hinweissystem sowie Wohlbefinden und Produktivität',
  },
  caption: {
    en: 'The five directions after ideation — this is the wider funnel before the team narrowed them to three client-facing concepts',
    de: 'Die fünf Richtungen nach der Ideation — der breitere Funnel, bevor das Team sie auf drei kundenorientierte Konzepte verdichtete',
  },
  span: 2,
  className: mediaClass,
};

const selectedDirectionFigure = {
  type: 'image',
  src: selectedDirectionImg,
  pendingFile: 'p08_selected-interest-based-direction.webp',
  alt: {
    en: 'Concept board combining several social-connection ideas and a job statement, converging on Interest-based Events or Social Networking',
    de: 'Konzeptboard mit mehreren Ideen für soziale Verbindung und einem Job-Statement, das auf interessenbasierte Events oder Social Networking zuläuft',
  },
  caption: {
    en: 'My direction converged on interest-based events and social networking: shared interests as the bridge between office and remote colleagues',
    de: 'Meine Richtung verdichtete sich zu interessenbasierten Events und Social Networking: geteilte Interessen als Brücke zwischen Büro- und Remote-Kolleg:innen',
  },
  span: 1,
  className: mediaClass,
};

const targetUsersFigure = {
  type: 'image',
  src: targetUsersImg,
  pendingFile: 'p08_target-users.webp',
  alt: {
    en: 'Target users for the concept: anyone at the company, with particular relevance for remote employees seeking connection and hybrid employees who can benefit from online and offline events',
    de: 'Zielnutzende des Konzepts: grundsätzlich alle im Unternehmen, mit besonderer Relevanz für Remote-Mitarbeitende auf der Suche nach Verbindung und hybride Mitarbeitende, die von Online- und Offline-Events profitieren können',
  },
  caption: {
    en: 'Target users were deliberately broad — the concept had to work for both remote and hybrid employees rather than becoming an office-only social feature',
    de: 'Die Zielgruppe wurde bewusst breit gefasst — das Konzept sollte für Remote- wie auch hybride Mitarbeitende funktionieren und nicht zu einem reinen Büro-Social-Feature werden',
  },
  span: 1,
  className: mediaClass,
};

const hydrateConceptArtifact = (figure) => {
  if (figure.pendingFile === 'p08_concept-background-jtbd.png') {
    return { ...figure, src: conceptBackgroundImg, pendingFile: 'p08_concept-background-jtbd.webp' };
  }
  if (figure.pendingFile === 'p08_concept-storyboard.png') {
    return { ...figure, src: conceptStoryboardImg, pendingFile: 'p08_concept-storyboard.webp' };
  }
  if (figure.pendingFile === 'p08_concept-features-mvp.png') {
    return { ...figure, src: conceptMvpImg, pendingFile: 'p08_concept-features-mvp.webp' };
  }
  return figure;
};

export const enrichedProjectData = {
  ...projectData,
  process: projectData.process.map((step, index) => {
    if (index === 0) {
      return {
        ...step,
        figures: [...(step.figures ?? []), competitorReviewFigure],
      };
    }

    if (index === 7) {
      const hydrated = (step.figures ?? []).map(hydrateConceptArtifact);
      return {
        ...step,
        figures: [
          ...hydrated.slice(0, 1),
          ideationDirectionsFigure,
          selectedDirectionFigure,
          ...hydrated.slice(1, 2),
          targetUsersFigure,
          ...hydrated.slice(2),
        ],
      };
    }

    return step;
  }),
};

// Dev-only: list every figure still waiting for its file in ./media. The
// data file resolves media by filename and returns null for a missing one,
// so the build never fails on an absent asset — this is the one place that
// says which are absent. Deduplicated, since a few files appear in two
// sections. Runs once at module load, like the checks in data/projects.js.
if (import.meta.env.DEV) {
  const missing = [
    ...new Set(
      enrichedProjectData.process
        .flatMap((s) => s.figures ?? [])
        .concat(Object.values(enrichedProjectData.figures ?? {}).flat())
        .filter((f) => !f.src)
        .map((f) => f.pendingFile)
    ),
  ];
  if (missing.length) console.warn('[case study] media pending:', missing);
}

export default function Project2() {
  return <ProjectTemplate meta={enrichedProjectData} />;
}
