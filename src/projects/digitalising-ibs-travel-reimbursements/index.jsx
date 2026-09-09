import React from 'react';
import ProjectTemplate from '../ProjectTemplate';
import { PrototypeFab } from './PrototypeFab';
import { projectData } from './digitalising-ibs-travel-reimbursements.data';

// Recruiter-facing presentation layer. The detailed evidence remains in the
// project data file; this object only changes what is surfaced first and how
// the existing evidence is labelled. Lists below select existing source items
// by reference rather than copying their claims, so the detail page still has
// one factual source of truth.
const recruiterMeta = {
  ...projectData,

  myContribution: {
    owned: [
      {
        en: 'Administered the legacy reimbursement process for more than a year and proposed the redesign',
        de: 'Den bisherigen Erstattungsprozess über ein Jahr administriert und die Neugestaltung vorgeschlagen',
      },
      {
        en: 'Conducted insider observation, expert interviews, the participant survey, and artefact analysis',
        de: 'Insider-Beobachtung, Experteninterviews, Teilnehmenden-Umfrage und Artefaktanalyse durchgeführt',
      },
      {
        en: 'Mapped the 13-step workflow and translated evidence into a problem register and traceable requirements',
        de: 'Den 13-stufigen Ablauf kartiert und Evidenz in Problemregister und nachvollziehbare Anforderungen übersetzt',
      },
      {
        en: 'Designed the role model, state machine, information architecture, wireframes, and design system',
        de: 'Rollenmodell, Zustandsmaschine, Informationsarchitektur, Wireframes und Designsystem entworfen',
      },
      {
        en: 'Built the React/TypeScript application and the integration architecture for SQLite, Excel, and Nextcloud',
        de: 'Die React/TypeScript-Anwendung und die Integrationsarchitektur für SQLite, Excel und Nextcloud entwickelt',
      },
      {
        en: 'Instrumented the evaluation and automated the rule and traceability checks that protect the build',
        de: 'Die Evaluation instrumentiert und Regel- sowie Traceability-Prüfungen automatisiert, die den Build absichern',
      },
    ],
  },

  sectionTitles: {
    about: {
      label: { en: 'Context & role', de: 'Kontext & Rolle' },
      kicker: { en: 'Inside the process', de: 'Im Prozess' },
      heading: { en: 'Why I was close enough to see the problem', de: 'Warum ich nah genug am Prozess war, um das Problem zu sehen' },
    },
    challenge: {
      label: { en: 'Problem', de: 'Problem' },
      kicker: { en: 'AS-IS', de: 'IST-Zustand' },
      heading: { en: 'Why the paper process failed', de: 'Warum der Papierprozess scheiterte' },
    },
    solution: {
      label: { en: 'What I built', de: 'Was ich gebaut habe' },
      kicker: { en: 'TO-BE', de: 'SOLL-Zustand' },
      heading: { en: 'From paper chase to one traceable workflow', de: 'Von der Papier-Nachverfolgung zu einem nachvollziehbaren Ablauf' },
    },
    design: {
      label: { en: 'Design decisions', de: 'Designentscheidungen' },
      kicker: { en: 'Research → interface', de: 'Research → Interface' },
      heading: { en: 'How research became interface rules', de: 'Wie Forschung zu Interface-Regeln wurde' },
    },
    wireframe: {
      label: { en: 'Interaction design', de: 'Interaktionsdesign' },
      kicker: { en: 'Structure first', de: 'Struktur zuerst' },
      heading: { en: 'From sketch to shipped screen', de: 'Von der Skizze zum ausgelieferten Screen' },
    },
    prototype: {
      label: { en: 'Working demo', de: 'Funktionierende Demo' },
      kicker: { en: 'Build', de: 'Build' },
      heading: { en: 'A deployed system the team can already work with', de: 'Ein bereitgestelltes System, mit dem das Team bereits arbeiten kann' },
    },
    methodology: {
      label: { en: 'Evidence chain', de: 'Evidenzkette' },
      kicker: { en: 'Research → requirements → code', de: 'Research → Anforderungen → Code' },
      heading: { en: 'How I turned observations into requirements and code', de: 'Wie ich Beobachtungen in Anforderungen und Code übersetzt habe' },
    },
    results: {
      label: { en: 'Evidence so far', de: 'Evidenz bisher' },
      kicker: { en: 'What is proven', de: 'Was belegt ist' },
      heading: { en: 'What is proven — and what is still pending', de: 'Was belegt ist — und was noch aussteht' },
    },
    limitations: {
      label: { en: 'Next evaluation', de: 'Nächste Evaluation' },
      kicker: { en: 'Research maturity', de: 'Forschungsreife' },
      heading: { en: 'What the evidence cannot claim yet', de: 'Was die Evidenz noch nicht behaupten kann' },
    },
  },

  // The raw source keeps the complete research inventory. For the case-study
  // reading surface, show the six methods that best communicate the bridge
  // from discovery to implementation; the full evidence remains traceable in
  // the detailed figures and tag-evidence record.
  methods: [
    projectData.methods[0],  // insider process observation
    projectData.methods[1],  // expert interviews + admin working meeting
    projectData.methods[2],  // participant survey
    projectData.methods[6],  // UML process mapping
    projectData.methods[9],  // requirements traceability
    projectData.methods[12], // built-in usage instrumentation
  ],

  techStack: [
    projectData.techStack[0], // React
    projectData.techStack[1], // TypeScript
    projectData.techStack[4], // Vitest
    projectData.techStack[5], // Fastify
    projectData.techStack[7], // SQLite
    projectData.techStack[8], // ExcelJS / local Excel files
    projectData.techStack[9], // Nextcloud WebDAV
  ],

  // The current Results section was visually dominated by ten baseline
  // numbers. Keep the full metric record in projectData, but surface four
  // recruiter-relevant proof points here: process complexity, real delay,
  // participant transparency, and engineering rigour.
  resultsAtAGlance: {
    title: { en: 'Baseline evidence at a glance', de: 'Baseline-Evidenz auf einen Blick' },
    items: [
      projectData.metrics[5], // 9 actors / 13 steps / 4 return loops
      projectData.metrics[6], // 43+ day traced claim
      projectData.metrics[8], // 4/6 do not know the calculation
      projectData.metrics[9], // automated tests
    ],
  },

  // Keep the limitations most relevant to a hiring decision: positionality,
  // sample coverage, role coverage, and the fact that usability outcomes are
  // deliberately not claimed before the evaluation runs.
  limitations: [
    projectData.limitations[0],
    projectData.limitations[1],
    projectData.limitations[2],
    projectData.limitations[4],
  ],
};

// The floating prototype badge is mounted here rather than inside
// ProjectTemplate on purpose: it is a one-project affordance (this is the
// only case study with a deployed build behind it), and a template that
// rendered it from `prototypeUrl` would put it on every future project that
// links anywhere. It reads the same two data fields the inline CTA does, so
// the link and its label never drift apart.
export default function Project4() {
  return (
    <>
      <ProjectTemplate meta={recruiterMeta} />
      <PrototypeFab href={projectData.prototypeUrl} label={projectData.prototypeUrlLabel} />
    </>
  );
}
