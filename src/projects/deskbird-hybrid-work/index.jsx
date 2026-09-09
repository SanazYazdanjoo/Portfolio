import React from 'react';
import ProjectTemplate from '../../projects/ProjectTemplate';
import { projectData } from './deskbird-hybrid-work.data';

// Recruiter-facing presentation layer. The full evidence inventory remains in
// deskbird-hybrid-work.data.js; this object only decides what to surface first.
// The long source file is deliberately kept as the single factual record.
const readyFigures = (figures = [], limit = 1) =>
  figures.filter((figure) => figure.src || figure.href).slice(0, limit);

const processStep = (index, figureLimit = 1) => ({
  ...projectData.process[index],
  // Do not publish "image pending" boxes in the recruiter view. Missing
  // artefacts stay documented in the source data and the dev console, while
  // the public case study shows only evidence that is actually ready.
  figures: readyFigures(projectData.process[index]?.figures, figureLimit),
});

const recruiterMeta = {
  ...projectData,

  // The original page repeated the brief in About, Challenge and Solution.
  // Make About the executive summary and let the evidence journey do the rest.
  challenge: undefined,
  solution: undefined,

  about: {
    en: "deskbird asked how a hybrid-work SaaS product could support genuine social connection without adding another noisy channel. In a six-person UX research team, we combined stakeholder research with a 57-person survey and six contextual inquiries. I owned the Interest-Based Communities concept from research grounding through its concept pack; deskbird stakeholders selected it from the three client proposals, and the team developed it into a high-fidelity prototype.",
    de: "deskbird wollte wissen, wie ein Hybrid-Work-SaaS-Produkt echte soziale Verbindung unterstützen kann, ohne einen weiteren störenden Kanal hinzuzufügen. In einem sechsköpfigen UX-Research-Team kombinierten wir Stakeholder-Research mit einer Umfrage mit 57 Teilnehmenden und sechs Contextual Inquiries. Ich verantwortete das Konzept Interest-Based Communities von der Forschungsgrundlage bis zum Konzeptpaket; deskbirds Stakeholder wählten es aus den drei Kundenkonzepten aus, und das Team entwickelte es zu einem High-Fidelity-Prototyp weiter.",
  },

  // Six steps are enough to communicate the reasoning chain. The source keeps
  // all ten steps, including product review, scoping, affinity-wall mechanics
  // and release slicing, for readers who need the full research record.
  process: [
    processStep(1), // stakeholder alignment
    processStep(3), // N=57 survey
    processStep(4), // N=6 contextual inquiry
    processStep(6), // requirements synthesis
    processStep(7), // concept development / selection
    processStep(9), // high-fidelity prototype + testing
  ],

  // The milestone rail and detailed instrument inventories made Methodology
  // read like a research report. Their evidence remains in projectData; the
  // recruiter view keeps only the methods and decisions that changed the work.
  milestones: undefined,
  pilots: undefined,
  surveySections: undefined,
  studyPlans: undefined,
  competitiveReview: undefined,
  contextualDesignModels: undefined,
  participantVoices: undefined,

  myContribution: {
    owned: [
      {
        en: "Owned Interest-Based Communities from participant evidence through JTBD framing, feature-MVP definition and storyboard.",
        de: "Interest-Based Communities von Teilnehmenden-Evidenz über JTBD-Framing und Feature-MVP bis zum Storyboard verantwortet.",
      },
      {
        en: "Built the Collaboration Model across all six contextual-inquiry participants.",
        de: "Das Kollaborationsmodell über alle sechs Contextual-Inquiry-Teilnehmenden hinweg erstellt.",
      },
      {
        en: "Authored and presented the methodology section of the final client presentation.",
        de: "Den Methodikteil der finalen Kundenpräsentation erstellt und präsentiert.",
      },
    ],
    shared: [
      {
        en: "Co-designed and analysed the survey, contextual inquiries, affinity synthesis and evidence-linked requirements with the six-person team.",
        de: "Umfrage, Contextual Inquiries, Affinity-Synthese und evidenzverknüpfte Anforderungen gemeinsam im sechsköpfigen Team konzipiert und ausgewertet.",
      },
      {
        en: "Co-built the high-fidelity prototype, ran usability testing and delivered the final recommendations to deskbird.",
        de: "High-Fidelity-Prototyp gemeinsam entwickelt, Usability-Tests durchgeführt und die finalen Empfehlungen an deskbird übergeben.",
      },
    ],
  },

  sectionTitles: {
    about: {
      label: { en: "Executive summary", de: "Kurzüberblick" },
      kicker: { en: "Industry UX research", de: "Industrie-UX-Research" },
      heading: { en: "From a fuzzy social brief to a selected product concept", de: "Von einem offenen Social-Briefing zu einem ausgewählten Produktkonzept" },
    },
    process: {
      label: { en: "Evidence journey", de: "Evidenzweg" },
      kicker: { en: "Research → requirements → concept", de: "Research → Anforderungen → Konzept" },
      heading: { en: "How the evidence changed the product direction", de: "Wie die Evidenz die Produktrichtung veränderte" },
    },
    concepts: {
      label: { en: "Concept decision", de: "Konzeptentscheidung" },
      kicker: { en: "5 directions → 3 proposals → 1 selected", de: "5 Richtungen → 3 Vorschläge → 1 ausgewählt" },
      heading: { en: "Why Interest-Based Communities survived the cut", de: "Warum Interest-Based Communities die Auswahl überstand" },
    },
    methodology: {
      label: { en: "Research design", de: "Research-Design" },
      kicker: { en: "Triangulation", de: "Triangulation" },
      heading: { en: "How we balanced breadth, observation and client constraints", de: "Wie wir Breite, Beobachtung und Kundenanforderungen ausbalancierten" },
    },
    results: {
      label: { en: "Findings & outcome", de: "Erkenntnisse & Ergebnis" },
      kicker: { en: "What changed", de: "Was sich änderte" },
      heading: { en: "What the research led us to build", de: "Was die Forschung uns bauen ließ" },
    },
    limitations: {
      label: { en: "Evidence boundaries", de: "Evidenzgrenzen" },
      kicker: { en: "Research maturity", de: "Forschungsreife" },
      heading: { en: "What this project can — and cannot — claim", de: "Was dieses Projekt behaupten kann — und was nicht" },
    },
  },

  methodology: {
    en: "We triangulated several kinds of evidence rather than treating one method as truth: stakeholder interviews and product/competitor review set the business and product constraints; a piloted online survey (N=57) quantified social preferences and privacy boundaries; six piloted 90-minute remote contextual inquiries, each followed by a 30-minute interview, showed how those patterns appeared in real hybrid workdays. We then used interpretation sessions, contextual-design models, affinity synthesis and source-linked requirements to turn observations into product criteria before ideation.",
    de: "Wir triangulierten mehrere Evidenzarten, statt eine Methode als alleinige Wahrheit zu behandeln: Stakeholder-Interviews sowie Produkt- und Wettbewerbsanalyse setzten Geschäfts- und Produktgrenzen; eine pilotierte Online-Umfrage (N=57) quantifizierte soziale Präferenzen und Datenschutzgrenzen; sechs pilotierte 90-minütige Remote Contextual Inquiries mit jeweils anschließendem 30-minütigem Interview zeigten, wie diese Muster im realen hybriden Arbeitsalltag auftreten. Anschließend übersetzten wir Beobachtungen über Interpretationssitzungen, Contextual-Design-Modelle, Affinity-Synthese und quellenverknüpfte Anforderungen in Produktkriterien, bevor die Ideation begann.",
  },

  methods: [
    projectData.methods[2],  // stakeholder interviews
    projectData.methods[3],  // online survey
    projectData.methods[5],  // remote contextual inquiry
    projectData.methods[8],  // affinity diagramming
    projectData.methods[9],  // requirements engineering
    projectData.methods[12], // usability testing & iteration
  ],

  results: {
    en: "The research changed the solution in four important ways. Socialising clustered around breaks rather than formal collaboration moments. Nearly three-quarters of survey respondents said knowing personal details about colleagues helps them feel more connected, but privacy preferences set a clear boundary around what a profile should ask for. Interaction across departments and seniority levels remained difficult, so the concept had to create low-pressure connection beyond the org chart. Those findings produced five directions, three client proposals and one selected concept: Interest-Based Communities. Usability testing checked feature understanding and interaction, but it did not establish adoption or a real-world increase in social connection.",
    de: "Die Forschung veränderte die Lösung in vier wichtigen Punkten. Soziale Interaktion konzentrierte sich auf Pausen statt auf formelle Kollaborationsmomente. Fast drei Viertel der Umfrageteilnehmenden sagten, dass persönliche Details über Kolleg:innen das Verbundenheitsgefühl stärken; gleichzeitig setzten Datenschutzpräferenzen eine klare Grenze dafür, was ein Profil abfragen sollte. Interaktion über Abteilungs- und Senioritätsgrenzen hinweg blieb schwierig, daher musste das Konzept niedrigschwellige Verbindung jenseits des Organigramms ermöglichen. Aus diesen Erkenntnissen entstanden fünf Richtungen, drei Kundenkonzepte und ein ausgewähltes Konzept: Interest-Based Communities. Die Usability-Tests prüften Feature-Verständnis und Interaktion, belegten aber weder Adoption noch eine reale Steigerung sozialer Verbundenheit.",
  },

  resultsAtAGlance: {
    title: { en: "Evidence at a glance", de: "Evidenz auf einen Blick" },
    items: projectData.metrics,
  },

  outcome: {
    body: {
      en: "At handover, deskbird stakeholders selected my concept and said they intended to build it in upcoming sprints. Because the student team had no backlog visibility after the project ended, I treat the verified outcome as concept selection, prototype delivery and development recommendations — not as confirmed product adoption.",
      de: "Bei der Übergabe wählten deskbirds Stakeholder mein Konzept aus und erklärten, es in kommenden Sprints umsetzen zu wollen. Da das Studierendenteam nach Projektende keinen Einblick in den Backlog hatte, behandle ich als verifiziertes Ergebnis die Konzeptauswahl, die Prototypübergabe und die Entwicklungsempfehlungen — nicht eine bestätigte Produktadoption.",
    },
    adoption: "unknown",
  },

  limitations: [
    projectData.limitations[0],
    projectData.limitations[1],
    projectData.limitations[2],
    projectData.limitations[3],
  ],

  // Section-level media follows the same rule as process media: show only
  // artefacts that actually exist in the repository, never public placeholders.
  figures: {
    concepts: readyFigures(projectData.figures?.concepts, 1),
    methodology: readyFigures(projectData.figures?.methodology, 1),
    results: readyFigures(projectData.figures?.results, 1),
  },
};

// Dev-only: the full source still lists every planned figure so missing media
// remains visible during authoring even though the public recruiter view hides it.
if (import.meta.env.DEV) {
  const missing = [
    ...new Set(
      projectData.process
        .flatMap((step) => step.figures ?? [])
        .concat(Object.values(projectData.figures ?? {}).flat())
        .filter((figure) => !figure.src)
        .map((figure) => figure.pendingFile)
    ),
  ];
  if (missing.length) console.warn('[case study] media pending:', missing);
}

export default function Project2() {
  return <ProjectTemplate meta={recruiterMeta} />;
}
