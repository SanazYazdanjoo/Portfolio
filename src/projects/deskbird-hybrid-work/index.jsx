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
import methodologyOverviewImg from './media/met_methodology-overview.avif';
import stateOfArtImg from './media/p01_state-of-the-art.avif';
import stakeholderThemesImg from './media/p02_stakeholder-themes.avif';
import socialFeatureTypesImg from './media/p03_social-feature-types.avif';
import surveyParticipantsImg from './media/p04_survey-participants.avif';
import ciParticipantsImg from './media/p05_ci-participants.avif';
import requirementsScopeImg from './media/p07_requirements-scope.avif';
import socialPreferencesImg from './media/p08_social-preferences.avif';
import threeConceptsImg from './media/p08_three-concepts.avif';

const mediaClass = 'w-full h-auto block';

const competitorReviewFigure = {
  type: 'image',
  src: competitorReviewImg,
  pendingFile: 'p01_competitor-review.webp',
  alt: {
    en: 'Competitor evidence board comparing Robin, Officely, Envoy, Kadence and Condeco, with examples of announcements, social events, colleague profiles, friend finding and calendar-based events',
    de: 'Wettbewerbsanalyse mit Robin, Officely, Envoy, Kadence und Condeco sowie Beispielen für Ankündigungen, Social Events, Kolleg:innen-Profile, Kolleg:innen-Suche und kalenderbasierte Events',
  },
  caption: {
    en: 'Direct competitor examples showed that event coordination and colleague-discovery patterns already existed across the market, helping narrow the opportunity toward interest-based connection rather than duplicating basic presence features',
    de: 'Konkrete Wettbewerbsbeispiele zeigten, dass Event-Koordination und Kolleg:innen-Suche bereits im Markt vorhanden waren. Dadurch ließ sich die Chance stärker auf interessenbasierte Verbindung statt auf eine weitere Anwesenheitsfunktion fokussieren',
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

// These exports directly match evidence slots already defined in the case-study
// data. We keep the original pendingFile names so the source/provenance notes in
// the data file remain stable while serving smaller AVIF versions on the web.
const suppliedEvidenceByPendingFile = {
  'met_methodology-overview.png': methodologyOverviewImg,
  'p01_state-of-the-art.png': stateOfArtImg,
  'p02_stakeholder-themes.png': stakeholderThemesImg,
  'p03_social-feature-types.png': socialFeatureTypesImg,
  'p04_survey-participants.png': surveyParticipantsImg,
  'p05_ci-participants.png': ciParticipantsImg,
  'p07_requirements-scope.png': requirementsScopeImg,
  'p08_social-preferences.png': socialPreferencesImg,
  'p08_three-concepts.png': threeConceptsImg,
};

const hydrateFigure = (figure) => {
  if (!figure) return figure;

  const suppliedSrc = suppliedEvidenceByPendingFile[figure.pendingFile];
  if (suppliedSrc) return { ...figure, src: suppliedSrc };

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

const hydratedTopLevelFigures = Object.fromEntries(
  Object.entries(projectData.figures ?? {}).map(([key, figures]) => [
    key,
    Array.isArray(figures) ? figures.map(hydrateFigure) : figures,
  ]),
);

const hydratedProjectData = {
  ...projectData,
  figures: hydratedTopLevelFigures,
  process: projectData.process.map((step, index) => {
    const hydrated = (step.figures ?? []).map(hydrateFigure);

    if (index === 0) {
      return {
        ...step,
        figures: [...hydrated, competitorReviewFigure],
      };
    }

    if (index === 7) {
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

    return { ...step, figures: hydrated };
  }),
};

// Keep pending media in the source data so it is easy to fill later, but do
// not show labelled placeholder cards to portfolio visitors in the meantime.
const resolvedFiguresOnly = (figures = []) => figures.filter((figure) => figure?.src);

export const enrichedProjectData = {
  ...hydratedProjectData,
  figures: Object.fromEntries(
    Object.entries(hydratedProjectData.figures ?? {}).map(([key, figures]) => [
      key,
      Array.isArray(figures) ? resolvedFiguresOnly(figures) : figures,
    ]),
  ),
  process: hydratedProjectData.process.map((step) => ({
    ...step,
    figures: resolvedFiguresOnly(step.figures),
  })),
};

// Dev-only: keep reporting the unresolved files to us even though visitors do
// not see them. This preserves the case study's media checklist while the
// public page contains only evidence that actually exists.
if (import.meta.env.DEV) {
  const missing = [
    ...new Set(
      hydratedProjectData.process
        .flatMap((s) => s.figures ?? [])
        .concat(Object.values(hydratedProjectData.figures ?? {}).flat())
        .filter((f) => !f?.src)
        .map((f) => f.pendingFile)
    ),
  ];
  if (missing.length) console.warn('[case study] media pending:', missing);
}

export default function Project2() {
  return <ProjectTemplate meta={enrichedProjectData} />;
}
