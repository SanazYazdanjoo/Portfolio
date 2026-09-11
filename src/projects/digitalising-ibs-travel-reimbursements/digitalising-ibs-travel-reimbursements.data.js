// Recruiter-facing case study content for the IBS travel reimbursement project.
// Evidence sources: >1 year of insider process observation, two expert interviews,
// one administration working meeting, an ongoing anonymous participant survey (n=6),
// document/artefact analysis, the AS-IS process map, the problem register, and the
// implemented application verified against the project codebase.
//
// Status honesty: the deployed demo is used for stakeholder feedback, but formal
// task-based usability evaluation has not run yet. Baseline/problem evidence is
// reported as observed counts or single-case measurements; no post-launch impact is
// claimed before it is measured.
import card from './card';
import thumbnailImg from './Project-4.png';
import prototypeScreenshot from './Fahrtkostenerstattung-—-Prototyp-08-14-2026.jpg';
import umlPreview from './UML-preview.png';
import fiveW1HFrame from './5W1H.png';
import stakeholderMap from './Stakeholders.png';
import personaPreview from './Persona-preview.png';
import designSystemSheet from './IBS-Design-System.png';
import architectureDiagram from './App-Architecture-Simplified.png';
import beforeAfterArtefacts from './before-after.webp';
import architectureGuarantees from './architecture-guarantees.png';
import processStrip from './process-sketch-wireframe-shipped.svg';
import wireframeAttendance from './wireframe-attendance-month.png';
import wireframeHiFiAttendance from './wireframe-hifi-attendance-month.png';

const DOCS = '/projects/digitalising-ibs-travel-reimbursements';

export const projectData = {
  ...card,

  stage: {
    en: 'Demo delivered · evaluation pending',
    de: 'Demo übergeben · Evaluation ausstehend',
  },
  timeline: {
    en: '2026 · ongoing',
    de: '2026 · laufend',
  },
  aiAssistance: {
    en: 'AI-assisted implementation: AI coding tools supported development. Research, requirements, design decisions, architecture, and final verification were my responsibility.',
    de: 'KI-unterstützte Umsetzung: KI-Coding-Tools unterstützten die Entwicklung. Forschung, Anforderungen, Designentscheidungen, Architektur und finale Prüfung lagen in meiner Verantwortung.',
  },
  heroImage: thumbnailImg,
  heroIsGenerated: true,

  sectionTitles: {
    about: {
      label: { en: 'Overview', de: 'Überblick' },
      kicker: { en: '01 · Context', de: '01 · Kontext' },
      heading: { en: 'Why I knew this process from the inside', de: 'Warum ich diesen Prozess von innen kannte' },
    },
    challenge: {
      label: { en: 'Problem & findings', de: 'Problem & Befunde' },
      kicker: { en: '03 · Evidence', de: '03 · Evidenz' },
      heading: { en: 'The problem was structural, not clerical', de: 'Das Problem war strukturell, nicht nur administrativ' },
    },
    solution: {
      label: { en: 'Solution', de: 'Lösung' },
      kicker: { en: '04 · From evidence to product', de: '04 · Von Evidenz zum Produkt' },
      heading: { en: 'One workflow instead of disconnected hand-offs', de: 'Ein Workflow statt getrennter Übergaben' },
    },
    design: {
      label: { en: 'Design system', de: 'Designsystem' },
      kicker: { en: '05 · Design', de: '05 · Design' },
      heading: { en: 'Research cues carried into the interface', de: 'Forschungshinweise in die Oberfläche übertragen' },
    },
    wireframe: {
      label: { en: 'Wireframes', de: 'Wireframes' },
      kicker: { en: '06 · Interaction design', de: '06 · Interaktionsdesign' },
      heading: { en: 'Structure first, visual detail second', de: 'Erst Struktur, dann visuelles Detail' },
    },
    prototype: {
      label: { en: 'Prototype', de: 'Prototyp' },
      kicker: { en: '07 · Working build', de: '07 · Funktionierender Build' },
      heading: { en: 'A deployed demo the team can use', de: 'Eine bereitgestellte Demo für das Team' },
    },
    methodology: {
      label: { en: 'Research → build', de: 'Research → Build' },
      kicker: { en: '08 · Traceability', de: '08 · Traceability' },
      heading: { en: 'A finding did not stop at a sticky note', de: 'Ein Befund endete nicht am Sticky Note' },
    },
    results: {
      label: { en: 'Current status', de: 'Aktueller Stand' },
      kicker: { en: '09 · Evaluation', de: '09 · Evaluation' },
      heading: { en: 'What is measured — and what is not yet', de: 'Was gemessen ist — und was noch nicht' },
    },
    limitations: {
      label: { en: 'Limitations', de: 'Limitationen' },
      kicker: { en: '10 · Evidence limits', de: '10 · Grenzen der Evidenz' },
      heading: { en: 'What this evidence cannot prove yet', de: 'Was diese Evidenz noch nicht belegen kann' },
    },
  },

  about: {
    en: 'I spent more than a year administering this reimbursement process as a project assistant — collecting paper receipts, consolidating several Excel files, checking attendance, and calculating reimbursements. That gave me deep process knowledge, but I treated it as a set of assumptions to test rather than as research evidence on its own. I combined insider observation with expert interviews, an administration working meeting, an ongoing participant survey, and artefact analysis, then translated the verified problems into requirements and a working application. The demo is deployed for team feedback; formal usability evaluation is still pending.',
    de: 'Ich habe diesen Erstattungsprozess mehr als ein Jahr als Projektassistentin administriert — Papierbelege gesammelt, mehrere Excel-Dateien zusammengeführt, Anwesenheiten geprüft und Erstattungen berechnet. Dadurch kannte ich den Ablauf sehr genau, behandelte dieses Wissen aber als Annahmen, die überprüft werden müssen, nicht als alleinige Forschungsevidenz. Ich kombinierte die Insider-Beobachtung mit Experteninterviews, einem Arbeitstreffen mit der Verwaltung, einer laufenden Teilnehmenden-Umfrage und Artefaktanalyse und übersetzte die bestätigten Probleme anschließend in Anforderungen und eine funktionierende Anwendung. Die Demo ist für Team-Feedback bereitgestellt; die formale Usability-Evaluation steht noch aus.',
  },

  // A recruiter-scannable narrative near the top of the page.
  process: [
    {
      phase: 'discover',
      type: { en: 'Research', de: 'Research' },
      title: {
        en: 'Turn insider knowledge into testable questions',
        de: 'Insiderwissen in überprüfbare Fragen übersetzen',
      },
      annotation: {
        en: 'I combined more than a year of process observation with two expert interviews, one administration working meeting, an ongoing anonymous participant survey (n=6), and document analysis.',
        de: 'Ich kombinierte mehr als ein Jahr Prozessbeobachtung mit zwei Experteninterviews, einem Arbeitstreffen mit der Verwaltung, einer laufenden anonymen Teilnehmenden-Umfrage (n=6) und Dokumentenanalyse.',
      },
      insight: {
        en: 'Because I already knew the workflow, the research goal was to challenge my assumptions, not to confirm them.',
        de: 'Weil ich den Ablauf bereits kannte, sollte die Forschung meine Annahmen hinterfragen — nicht bestätigen.',
      },
    },
    {
      phase: 'define',
      type: { en: 'Evidence', de: 'Evidenz' },
      title: {
        en: 'Map the failure and grade the evidence',
        de: 'Fehler im Prozess kartieren und Evidenz bewerten',
      },
      annotation: {
        en: 'The AS-IS map exposed 13 steps, four return loops, and nine actors. Thematic clustering produced a register of 25 documented problems, each linked to its evidence source.',
        de: 'Die IST-Karte zeigte 13 Schritte, vier Rückschleifen und neun Akteure. Thematisches Clustering führte zu einem Register mit 25 dokumentierten Problemen, jeweils mit verknüpfter Evidenzquelle.',
      },
      insight: {
        en: 'Survey findings also changed the roadmap: I had treated phone-width support as secondary, but participants reported that phone submission mattered. Responsive participant use moved up the priority list; the full signed-in phone layout is still in progress.',
        de: 'Die Umfrage veränderte auch die Roadmap: Ich hatte die Smartphone-Breite zunächst nachrangig behandelt, doch Teilnehmende zeigten, dass die Einreichung per Smartphone wichtig ist. Die responsive Nutzung durch Teilnehmende rückte nach oben; das vollständige angemeldete Smartphone-Layout ist noch in Arbeit.',
      },
    },
    {
      phase: 'design',
      type: { en: 'Requirements & design', de: 'Anforderungen & Design' },
      title: {
        en: 'Translate findings into explicit product rules',
        de: 'Befunde in explizite Produktregeln übersetzen',
      },
      annotation: {
        en: 'The problem register became numbered requirements, a role-based information architecture, an explicit claim state model, and low- and high-fidelity wireframes.',
        de: 'Aus dem Problemregister entstanden nummerierte Anforderungen, eine rollenbasierte Informationsarchitektur, ein explizites Statusmodell für Anträge sowie Low- und High-Fidelity-Wireframes.',
      },
      insight: {
        en: 'The service map covers nine actors. Seven composite, evidence-backed role profiles document the perspectives used during design; five roles directly work through dedicated application views.',
        de: 'Die Service-Karte umfasst neun Akteure. Sieben zusammengesetzte, evidenzbasierte Rollenprofile dokumentieren die für das Design genutzten Perspektiven; fünf Rollen arbeiten direkt in eigenen Anwendungsansichten.',
      },
    },
    {
      phase: 'deliver',
      type: { en: 'Implementation', de: 'Umsetzung' },
      title: {
        en: 'Carry the same requirements into working code',
        de: 'Dieselben Anforderungen in funktionierenden Code übertragen',
      },
      annotation: {
        en: 'I built the role-based application in React and TypeScript with shared calculation rules, an explicit claim state machine, access controls, local data adapters, and automated tests.',
        de: 'Ich baute die rollenbasierte Anwendung mit React und TypeScript, gemeinsamen Berechnungsregeln, einer expliziten Zustandsmaschine für Anträge, Zugriffskontrollen, lokalen Datenadaptern und automatisierten Tests.',
      },
      insight: {
        en: 'Example: 4/6 survey respondents did not understand the reimbursement calculation. That became a requirement for transparent amounts, implemented as one shared calculation with a visible formula trace and protected by automated checks.',
        de: 'Beispiel: 4/6 Befragte verstanden die Berechnung ihrer Erstattung nicht. Daraus wurde die Anforderung nach transparenten Beträgen, umgesetzt als gemeinsame Berechnung mit sichtbarer Formel-Nachvollziehbarkeit und abgesichert durch automatisierte Prüfungen.',
      },
    },
    {
      phase: 'deliver',
      type: { en: 'Evaluation', de: 'Evaluation' },
      title: {
        en: 'Deploy first, measure the change next',
        de: 'Erst bereitstellen, dann die Veränderung messen',
      },
      annotation: {
        en: 'The demo is deployed for stakeholder feedback. Guided tasks, pseudonymous local event logging, and an end-of-session questionnaire are already built into the application for the formal usability evaluation.',
        de: 'Die Demo ist für Stakeholder-Feedback bereitgestellt. Geführte Aufgaben, pseudonyme lokale Ereignisprotokolle und ein Abschlussfragebogen sind bereits für die formale Usability-Evaluation in die Anwendung integriert.',
      },
      insight: {
        en: 'No post-launch improvement is claimed yet. The evaluation instruments exist; the user sessions have not run.',
        de: 'Noch wird keine Verbesserung nach der Einführung behauptet. Die Evaluationsinstrumente existieren; die Nutzersitzungen haben noch nicht stattgefunden.',
      },
    },
  ],

  challengeQuote: {
    en: 'The problem was not the form. It was the fragmented system around it.',
    de: 'Das Problem war nicht das Formular. Es war das fragmentierte System darum herum.',
  },
  challenge: {
    en: 'Travel reimbursement depended on paper attendance records, several Excel files, manual calculations, and hand-offs across nine actors. The same information was copied repeatedly, creating delays and opportunities for mistakes. Participants had no reliable confirmation after submitting documents, no visible calculation, and no claim status. In the ongoing survey, 4/6 respondents did not know how their amount was calculated, 5/6 had no reliable way to know whether their documents had arrived, and 4/6 named processing time as their main difficulty. One traced claim remained unpaid after 43+ days. The failure was structural, not clerical.',
    de: 'Die Fahrtkostenerstattung hing von Anwesenheitslisten auf Papier, mehreren Excel-Dateien, manuellen Berechnungen und Übergaben zwischen neun Akteuren ab. Dieselben Informationen wurden mehrfach übertragen, wodurch Verzögerungen und Fehlerquellen entstanden. Teilnehmende erhielten nach der Einreichung keine verlässliche Bestätigung, sahen die Berechnung nicht und hatten keinen sichtbaren Antragsstatus. In der laufenden Umfrage wussten 4/6 Befragte nicht, wie ihr Betrag berechnet wird, 5/6 hatten keine verlässliche Möglichkeit zu erkennen, ob ihre Unterlagen angekommen waren, und 4/6 nannten die Bearbeitungszeit als größte Schwierigkeit. Ein nachverfolgter Antrag war nach 43+ Tagen noch nicht ausgezahlt. Das Problem war strukturell, nicht nur administrativ.',
  },

  solutionQuote: {
    en: 'One role-based application connects submission, attendance, calculation, approval, and claim status.',
    de: 'Eine rollenbasierte Anwendung verbindet Einreichung, Anwesenheit, Berechnung, Freigabe und Antragsstatus.',
  },
  solution: {
    en: 'I replaced the fragmented workflow with one role-based application for attendance, supporting-document submission, reimbursement calculation, approval, and claim tracking. Participants can upload documents and see the state of their claim; staff work from the same attendance and reimbursement data instead of copying information between spreadsheets. Calculations are rebuilt from shared rules and the formula trace remains visible to reviewers. The participant upload flow is designed for phone use, while responsive support across the full authenticated application is still in progress. The current system covers the workflow up to payment; the final accounting payment step remains outside the application.',
    de: 'Ich ersetzte den fragmentierten Ablauf durch eine rollenbasierte Anwendung für Anwesenheit, das Einreichen von Nachweisen, Erstattungsberechnung, Freigabe und Statusverfolgung. Teilnehmende können Dokumente hochladen und den Zustand ihres Antrags sehen; Mitarbeitende arbeiten mit denselben Anwesenheits- und Erstattungsdaten, statt Informationen zwischen Tabellen zu kopieren. Berechnungen werden aus gemeinsamen Regeln neu erzeugt und die Formel bleibt für Prüfende nachvollziehbar. Der Upload-Pfad für Teilnehmende ist für die Smartphone-Nutzung ausgelegt; die responsive Unterstützung der gesamten angemeldeten Anwendung ist noch in Arbeit. Der aktuelle Stand deckt den Ablauf bis zur Auszahlung ab; der eigentliche Buchungs-/Auszahlungsschritt der Buchhaltung bleibt außerhalb der Anwendung.',
  },

  design: {
    en: 'I carried the research model into the interface instead of inventing a separate visual language. The role colours from the AS-IS swimlane map became the application role palette, supported by a compact type scale, status chips, note states, buttons, and form states. This keeps the same actor cues visible from research artefact to working screen.',
    de: 'Ich übertrug das Forschungsmodell in die Oberfläche, statt eine davon getrennte visuelle Sprache zu erfinden. Die Rollenfarben der IST-Swimlane wurden zur Rollenpalette der Anwendung, ergänzt durch eine kompakte Typografie-Skala, Status-Chips, Notiz-Zustände, Buttons und Formularzustände. So bleiben dieselben Akteurshinweise vom Forschungsartefakt bis zum funktionierenden Screen erhalten.',
  },

  wireframe: {
    en: 'I used low-fidelity wireframes to resolve information hierarchy and workflow logic against the numbered requirements before applying visual styling. The high-fidelity version kept the same structure and added the final attendance vocabulary, morning/afternoon states, role cues, exception highlighting, and completion feedback. The comparison below shows the same attendance-month screen from sketch to wireframe to deployed view.',
    de: 'Ich nutzte Low-Fidelity-Wireframes, um Informationshierarchie und Workflow-Logik entlang der nummerierten Anforderungen zu klären, bevor visuelle Gestaltung hinzukam. Die High-Fidelity-Version behielt dieselbe Struktur und ergänzte das finale Anwesenheitsvokabular, Vormittags-/Nachmittagszustände, Rollenhinweise, Hervorhebung von Ausnahmen und Fortschrittsfeedback. Der Vergleich unten zeigt denselben Anwesenheits-Monatsscreen von der Skizze über das Wireframe bis zur bereitgestellten Ansicht.',
  },

  methodologyQuote: {
    en: 'Research evidence became requirements, design decisions, implementation rules, and automated checks.',
    de: 'Forschungsevidenz wurde zu Anforderungen, Designentscheidungen, Implementierungsregeln und automatisierten Prüfungen.',
  },
  methodology: {
    en: 'The research-to-build chain is explicit. I treated insider observations as hypotheses, checked them through interviews, the administration working session, the ongoing participant survey, and artefact analysis, then clustered the evidence into a 25-problem register with evidence grades. Those problems became numbered requirements, information architecture, state rules, and wireframes. One example closes the loop: 4/6 respondents did not understand the reimbursement calculation → transparent calculation became a requirement → one shared calculation module now produces a visible formula trace → automated tests protect the requirement links. The same traceability also exposes gaps: confirmation after submission is only partially implemented, so the page does not present it as solved.',
    de: 'Die Kette von Forschung zur Umsetzung ist explizit. Ich behandelte meine Insider-Beobachtungen als Hypothesen, prüfte sie durch Interviews, das Arbeitstreffen mit der Verwaltung, die laufende Teilnehmenden-Umfrage und Artefaktanalyse und bündelte die Evidenz anschließend in einem Register mit 25 Problemen und Evidenzstufen. Daraus entstanden nummerierte Anforderungen, Informationsarchitektur, Zustandsregeln und Wireframes. Ein Beispiel schließt die Kette: 4/6 Befragte verstanden die Erstattungsberechnung nicht → transparente Berechnung wurde zur Anforderung → ein gemeinsames Berechnungsmodul erzeugt heute eine sichtbare Formel-Nachvollziehbarkeit → automatisierte Tests schützen die Verknüpfung zu den Anforderungen. Dieselbe Traceability macht auch Lücken sichtbar: Die Bestätigung nach der Einreichung ist nur teilweise umgesetzt und wird deshalb auf dieser Seite nicht als gelöst dargestellt.',
  },

  methods: [
    { en: 'Insider process observation (>1 year)', de: 'Insider-Prozessbeobachtung (>1 Jahr)' },
    { en: 'Expert interviews (n=2) + administration working meeting', de: 'Experteninterviews (n=2) + Arbeitstreffen mit der Verwaltung' },
    { en: 'Ongoing anonymous participant survey (n=6)', de: 'Laufende anonyme Teilnehmenden-Umfrage (n=6)' },
    { en: 'Document & artefact analysis', de: 'Dokumenten- & Artefaktanalyse' },
    { en: 'Thematic analysis / evidence grading', de: 'Thematische Analyse / Evidenzbewertung' },
    { en: 'Stakeholder & AS-IS process mapping', de: 'Stakeholder- & IST-Prozessmapping' },
    { en: 'Requirements traceability', de: 'Anforderungs-Traceability' },
    { en: 'Built-in usability evaluation instrumentation', de: 'Integrierte Instrumentierung für die Usability-Evaluation' },
  ],

  techStack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Vitest',
    'Node.js / Fastify',
    'SQLite',
    'ExcelJS',
    'Nextcloud WebDAV',
    'Figma Make',
    'Claude Code (AI-assisted development)',
  ],

  prototype: {
    en: 'The Vercel demo runs in the browser on fictional data so it can be shared safely with the team and portfolio visitors. It exposes the working role views and the current claim-state logic rather than simulating a finished production system. The participant upload path supports phone-oriented use; responsive support for the full signed-in shell is still in progress. Guided evaluation tasks, local pseudonymous event logging, and an end-of-session questionnaire are already integrated, ready for formal sessions once the application is used in daily work.',
    de: 'Die Vercel-Demo läuft im Browser mit fiktiven Daten und kann deshalb sicher mit dem Team und Portfolio-Besuchenden geteilt werden. Sie zeigt die funktionierenden Rollenansichten und die aktuelle Statuslogik, statt ein fertiges Produktivsystem zu simulieren. Der Upload-Pfad für Teilnehmende unterstützt die Smartphone-orientierte Nutzung; die responsive Unterstützung der gesamten angemeldeten Oberfläche ist noch in Arbeit. Geführte Evaluationsaufgaben, lokale pseudonyme Ereignisprotokolle und ein Abschlussfragebogen sind bereits integriert und für formale Sitzungen vorbereitet, sobald die Anwendung im Arbeitsalltag eingesetzt wird.',
  },
  prototypeUrl: 'https://ibs-fktn.vercel.app/',
  prototypeUrlLabel: {
    en: 'Open the live prototype',
    de: 'Live-Prototyp öffnen',
  },

  results: {
    en: 'The current evidence describes the existing process and the mechanisms implemented in the replacement. The working demo is deployed for team feedback, and internal testing has already exposed three instrumentation bugs. Formal usability sessions have not run, so I do not claim reduced processing time, fewer errors, better usability, or adoption yet. Those outcomes will be reported only after the evaluation is completed.',
    de: 'Die aktuelle Evidenz beschreibt den bestehenden Prozess und die Mechanismen, die in der neuen Anwendung umgesetzt sind. Die funktionierende Demo ist für Team-Feedback bereitgestellt, und interne Tests haben bereits drei Fehler in der Evaluationsinstrumentierung aufgedeckt. Formale Usability-Sitzungen haben noch nicht stattgefunden; deshalb behaupte ich noch keine kürzere Bearbeitungszeit, weniger Fehler, bessere Usability oder Adoption. Diese Ergebnisse werden erst nach abgeschlossener Evaluation berichtet.',
  },

  resultsAtAGlance: {
    title: {
      en: 'Research evidence so far',
      de: 'Forschungsevidenz bisher',
    },
    items: [
      {
        value: 'n=6',
        label: {
          en: 'participant survey responses so far · survey still open',
          de: 'Teilnehmenden-Umfrage bisher · weiterhin offen',
        },
      },
      {
        value: 'n=2 + 1',
        label: {
          en: 'expert interviews + one administration working meeting',
          de: 'Experteninterviews + ein Arbeitstreffen mit der Verwaltung',
        },
      },
      {
        value: '25',
        label: {
          en: 'documented problems in the evidence register',
          de: 'dokumentierte Probleme im Evidenzregister',
        },
      },
      {
        value: '4/6',
        label: {
          en: 'respondents did not understand how their amount is calculated',
          de: 'Befragte verstanden nicht, wie ihr Betrag berechnet wird',
        },
      },
      {
        value: '5/6',
        label: {
          en: 'had no reliable way to know whether documents had arrived',
          de: 'hatten keine verlässliche Möglichkeit zu wissen, ob Unterlagen angekommen waren',
        },
      },
      {
        value: '43+',
        label: {
          en: 'days for one traced claim, still unpaid when observation stopped',
          de: 'Tage bei einem nachverfolgten Antrag, bei Beobachtungsende noch nicht ausgezahlt',
        },
      },
    ],
  },

  // Kept separate from the research-evidence strip above. These are baseline
  // process facts, not study-result or engineering metrics.
  metrics: [
    { value: '13', label: { en: 'steps in the AS-IS reimbursement process', de: 'Schritte im IST-Erstattungsprozess' } },
    { value: '4', label: { en: 'return loops in the mapped process', de: 'Rückschleifen im kartierten Prozess' } },
    { value: '9', label: { en: 'actors across the end-to-end service', de: 'Akteure im End-to-End-Service' } },
    { value: '43+', label: { en: 'days in one traced claim · minimum for that case, not an average', de: 'Tage bei einem nachverfolgten Antrag · Minimum dieses Falls, kein Durchschnitt' } },
  ],
  metricsIntro: {
    en: 'Survey findings are reported as counts because the sample is still small. Product improvements will only be reported after formal evaluation.',
    de: 'Umfragebefunde werden als Anzahlen berichtet, weil die Stichprobe noch klein ist. Produktverbesserungen werden erst nach der formalen Evaluation berichtet.',
  },

  notBuilt: {
    title: {
      en: 'Current product boundaries',
      de: 'Aktuelle Produktgrenzen',
    },
    items: [
      {
        en: 'Digital signature is implemented but switched off while finance and data protection decide whether it can replace the paper signature.',
        de: 'Die digitale Unterschrift ist implementiert, aber deaktiviert, solange Finanzen und Datenschutz klären, ob sie die Papierunterschrift ersetzen kann.',
      },
      {
        en: 'PAID exists in the claim state model, but no screen can set it yet because the final payment step is not digital.',
        de: 'AUSGEZAHLT existiert im Statusmodell, kann aber noch von keinem Screen gesetzt werden, weil der finale Auszahlungsschritt nicht digital ist.',
      },
      {
        en: 'The participant upload path is phone-oriented, but responsive support for the full authenticated application is still in progress.',
        de: 'Der Upload-Pfad für Teilnehmende ist auf Smartphone-Nutzung ausgelegt; die responsive Unterstützung der gesamten angemeldeten Anwendung ist noch in Arbeit.',
      },
    ],
  },

  limitations: [
    {
      en: 'The participant survey is currently n=6, self-selected, and so far limited to the blended/online cohort; the in-person cohort and travel-pass holders are not yet represented.',
      de: 'Die Teilnehmenden-Umfrage umfasst derzeit n=6, ist selbstselektiv und bisher auf die Blended-/Online-Kohorte beschränkt; Präsenzkurs und Abo-Karten-Nutzende sind noch nicht vertreten.',
    },
    {
      en: 'Two expert interviews represent project management and accounting. Lecturers were not interviewed; their part of the workflow is mapped from artefacts and my own process observation.',
      de: 'Zwei Experteninterviews vertreten Projektleitung und Buchhaltung. Dozierende wurden nicht interviewt; ihr Teil des Ablaufs wurde aus Artefakten und meiner eigenen Prozessbeobachtung kartiert.',
    },
    {
      en: 'The 43+ day figure is one traced claim. It was still unpaid when observation stopped, so it is a minimum for that case — not an average or a distribution.',
      de: 'Die Angabe von 43+ Tagen stammt aus einem nachverfolgten Antrag. Er war bei Beobachtungsende noch nicht ausgezahlt; die Zahl ist daher ein Minimum für diesen Fall — kein Durchschnitt und keine Verteilung.',
    },
    {
      en: 'Formal usability evaluation of the new system has not run. The page therefore reports implemented mechanisms and baseline evidence, not measured improvement over the paper process.',
      de: 'Die formale Usability-Evaluation des neuen Systems hat noch nicht stattgefunden. Die Seite berichtet deshalb über umgesetzte Mechanismen und Baseline-Evidenz, nicht über gemessene Verbesserungen gegenüber dem Papierprozess.',
    },
  ],

  verbatimsIn: 'challenge',
  verbatims: [
    {
      quote: {
        en: 'No, I just take the amount as it comes.',
        de: 'Nein, ich nehme den Betrag so, wie er kommt.',
      },
      attribution: {
        en: 'Survey respondent on checking the reimbursement calculation · translated from German',
        de: 'Umfrageteilnehmende:r zur Prüfung der Erstattungsberechnung',
      },
    },
    {
      quote: {
        en: 'The processing time is the hardest part for me.',
        de: 'Die Bearbeitungszeit ist für mich am schwierigsten.',
      },
      attribution: {
        en: 'Survey respondent · four of six named processing time as their main difficulty · translated from German',
        de: 'Umfrageteilnehmende:r · vier von sechs nannten die Bearbeitungszeit als größte Schwierigkeit',
      },
    },
    {
      quote: {
        en: 'I don’t check it.',
        de: 'Ich prüfe es nicht.',
      },
      attribution: {
        en: 'Survey respondent on knowing whether submitted documents arrived · translated from German',
        de: 'Umfrageteilnehmende:r zur Frage, ob eingereichte Unterlagen angekommen sind',
      },
    },
  ],

  figures: {
    challenge: [
      {
        type: 'image',
        src: umlPreview,
        href: `${DOCS}/UML/Detailed-UML.html`,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'AS-IS process map', de: 'IST-Prozesskarte' },
        title: { en: '13 steps, nine actors, four return loops', de: '13 Schritte, neun Akteure, vier Rückschleifen' },
        description: {
          en: 'The activity map makes the fragmentation visible: collection and calculation are concentrated in administration, while approvals begin only after the paper packet moves downstream. Grey arrows are hand-offs; red arrows are return loops.',
          de: 'Die Aktivitätskarte macht die Fragmentierung sichtbar: Sammlung und Berechnung konzentrieren sich in der Verwaltung, während Freigaben erst nach der Weitergabe des Papierpakets beginnen. Graue Pfeile zeigen Übergaben, rote Pfeile Rückschleifen.',
        },
        alt: {
          en: 'Swimlane activity diagram of the AS-IS reimbursement process across nine actor lanes with hand-off and return arrows',
          de: 'Swimlane-Aktivitätsdiagramm des IST-Erstattungsprozesses über neun Akteursspuren mit Übergabe- und Rückschleifenpfeilen',
        },
        caption: { en: 'AS-IS reimbursement process — preview', de: 'IST-Erstattungsprozess — Vorschau' },
        linkLabel: { en: 'Open the diagram', de: 'Diagramm öffnen' },
      },
      {
        type: 'image',
        src: fiveW1HFrame,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Problem framing · 5W1H', de: 'Problemrahmung · 5W1H' },
        title: { en: 'The failure, framed as a service problem', de: 'Das Problem als Serviceproblem gerahmt' },
        description: {
          en: 'The 5W1H frame condensed the evidence into a design brief: reduce fragmented intake, make claim status visible, enforce calculation rules, and support digital approvals without hiding unresolved process steps.',
          de: 'Die 5W1H-Rahmung verdichtete die Evidenz zu einem Designbriefing: fragmentierte Einreichung reduzieren, Antragsstatus sichtbar machen, Berechnungsregeln erzwingen und digitale Freigaben unterstützen, ohne ungelöste Prozessschritte zu verstecken.',
        },
        alt: {
          en: 'Six-column 5W1H board summarising what, when, where, who, why, and how the reimbursement process fails',
          de: 'Sechsspaltige 5W1H-Tafel zu Was, Wann, Wo, Wer, Warum und Wie des problematischen Erstattungsprozesses',
        },
        caption: { en: '5W1H problem frame', de: '5W1H-Problemrahmung' },
      },
      {
        type: 'image',
        src: stakeholderMap,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Stakeholder map', de: 'Stakeholder-Map' },
        title: { en: 'Nine actors, one administrative integration point', de: 'Neun Akteure, ein administrativer Integrationspunkt' },
        description: {
          en: 'The map shows where responsibility and influence sit. Participants have high interest but little influence, while administration becomes the point through which the fragmented process is held together.',
          de: 'Die Karte zeigt, wo Verantwortung und Einfluss liegen. Teilnehmende haben hohes Interesse, aber wenig Einfluss, während die Verwaltung zum Punkt wird, der den fragmentierten Prozess zusammenhält.',
        },
        alt: {
          en: 'Stakeholder map showing nine actors by process proximity and by influence versus interest',
          de: 'Stakeholder-Map mit neun Akteuren nach Prozessnähe sowie Einfluss und Interesse',
        },
        caption: { en: 'Stakeholder map — proximity and influence × interest', de: 'Stakeholder-Map — Nähe und Einfluss × Interesse' },
      },
    ],

    solution: [
      {
        type: 'image',
        src: beforeAfterArtefacts,
        href: beforeAfterArtefacts,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Before / after · real artefacts', de: 'Vorher / Nachher · echte Artefakte' },
        title: { en: 'Four artefacts, four changes', de: 'Vier Artefakte, vier Veränderungen' },
        description: {
          en: 'The master tracker became a state-aware dashboard; paper attendance became a shared digital record; handwritten reimbursement forms became generated forms with completeness checks; and silent document submission became a visible claim flow. The figure also marks unresolved gaps, including final payment status and post-submission notifications.',
          de: 'Der Master-Tracker wurde zum statusbewussten Dashboard; Papier-Anwesenheit wurde zu einem gemeinsamen digitalen Datensatz; handschriftliche Erstattungsformulare wurden zu generierten Formularen mit Vollständigkeitsprüfungen; und die stille Dokumenteneinreichung wurde zu einem sichtbaren Antragsfluss. Die Abbildung markiert zugleich offene Lücken wie den finalen Auszahlungsstatus und Benachrichtigungen nach der Einreichung.',
        },
        alt: {
          en: 'Four-row before-and-after comparison pairing the old tracker, attendance list, reimbursement form, and submission channel with the screens that replace them',
          de: 'Vierzeiliger Vorher-Nachher-Vergleich von Tracker, Anwesenheitsliste, Erstattungsformular und Einreichungskanal mit den ersetzenden Screens',
        },
        caption: {
          en: 'Before/after artefacts · consolidated problem register · survey n=6 and open',
          de: 'Vorher/Nachher-Artefakte · konsolidiertes Problemregister · Umfrage n=6 und offen',
        },
        takeawayLabel: { en: 'What to notice', de: 'Worauf achten' },
        takeaway: {
          en: 'Each replacement is tied to a documented problem, and unresolved gaps stay visible instead of being presented as solved.',
          de: 'Jeder Ersatz ist mit einem dokumentierten Problem verknüpft; offene Lücken bleiben sichtbar, statt als gelöst dargestellt zu werden.',
        },
        linkLabel: { en: 'Open the figure full size', de: 'Abbildung in voller Größe öffnen' },
      },
      {
        type: 'image',
        src: prototypeScreenshot,
        href: 'https://ibs-fktn.vercel.app/#/admin',
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Working demo · Admin view', de: 'Funktionierende Demo · Admin-Ansicht' },
        title: { en: 'Missing information and claim state in one view', de: 'Fehlende Informationen und Antragsstatus in einer Ansicht' },
        description: {
          en: 'The admin table brings receipts, attendance, calculated amount, and claim state together so staff no longer have to assemble the same picture across separate spreadsheets.',
          de: 'Die Admin-Tabelle bringt Nachweise, Anwesenheit, berechneten Betrag und Antragsstatus zusammen, sodass Mitarbeitende dieselbe Übersicht nicht mehr aus mehreren Tabellen zusammensetzen müssen.',
        },
        alt: {
          en: 'Admin dashboard showing participants, transport method, missing documents, calculated amounts, and claim states',
          de: 'Admin-Dashboard mit Teilnehmenden, Verkehrsmittel, fehlenden Dokumenten, berechneten Beträgen und Antragsstatus',
        },
        caption: { en: 'Admin table in the deployed demo', de: 'Admin-Tabelle in der bereitgestellten Demo' },
        linkLabel: { en: 'Open the table view', de: 'Tabellenansicht öffnen' },
      },
      {
        type: 'image',
        src: architectureDiagram,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Technical implementation', de: 'Technische Umsetzung' },
        title: { en: 'Shared calculation rules instead of stored amounts', de: 'Gemeinsame Berechnungsregeln statt gespeicherter Beträge' },
        description: {
          en: 'Amounts are recalculated from stored inputs instead of saved as fixed values. The same rule module is used across roles, while access controls protect records and supporting files remain inside institute-controlled storage. The public demo uses fictional browser-only data.',
          de: 'Beträge werden aus gespeicherten Eingaben neu berechnet, statt als feste Werte gespeichert zu werden. Dasselbe Regelmodul wird rollenübergreifend genutzt, Zugriffskontrollen schützen Datensätze und Nachweise bleiben in institutskontrolliertem Speicher. Die öffentliche Demo nutzt ausschließlich fiktive Browser-Daten.',
        },
        alt: {
          en: 'Application architecture showing shared calculation rules, browser screens, storage adapters, server access controls, SQLite, Nextcloud, and one route lookup',
          de: 'Anwendungsarchitektur mit gemeinsamen Berechnungsregeln, Browser-Screens, Speicheradaptern, Server-Zugriffskontrollen, SQLite, Nextcloud und einer Routenabfrage',
        },
        caption: { en: 'Application architecture — verified against the implemented code', de: 'Anwendungsarchitektur — am implementierten Code geprüft' },
      },
      {
        type: 'image',
        src: architectureGuarantees,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Engineering quality', de: 'Engineering-Qualität' },
        title: { en: 'Which boundaries are enforced by tests', de: 'Welche Grenzen durch Tests abgesichert sind' },
        description: {
          en: 'The implementation has 1,734 automated tests/checks across business rules and architecture constraints. The enforcement table distinguishes boundaries that fail the build when crossed from conventions that still rely on developer discipline.',
          de: 'Die Umsetzung verfügt über 1.734 automatisierte Tests/Prüfungen für Geschäftsregeln und Architekturgrenzen. Die Tabelle unterscheidet Grenzen, bei deren Verletzung der Build fehlschlägt, von Konventionen, die weiterhin Entwicklerdisziplin erfordern.',
        },
        alt: {
          en: 'Engineering enforcement table listing tested architecture boundaries and one convention-only boundary',
          de: 'Engineering-Tabelle mit getesteten Architekturgrenzen und einer nur durch Konvention abgesicherten Grenze',
        },
        caption: { en: 'Engineering enforcement table', de: 'Engineering-Enforcement-Tabelle' },
      },
    ],

    design: [
      {
        type: 'image',
        src: designSystemSheet,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Design system', de: 'Designsystem' },
        title: { en: 'The same role cues from map to screen', de: 'Dieselben Rollenhinweise von der Karte bis zum Screen' },
        description: {
          en: 'The design system carries the role palette from the AS-IS map into the interface and adds the typography, states, buttons, and form patterns needed for the working application.',
          de: 'Das Designsystem überträgt die Rollenpalette der IST-Karte in die Oberfläche und ergänzt Typografie, Zustände, Buttons und Formularmuster für die funktionierende Anwendung.',
        },
        alt: {
          en: 'IBS design-system sheet with brand colours, role palette, type scale, buttons, status chips, and form states',
          de: 'IBS-Designsystem mit Markenfarben, Rollenpalette, Typografie, Buttons, Status-Chips und Formularzuständen',
        },
        caption: { en: 'IBS design system', de: 'IBS-Designsystem' },
      },
    ],

    wireframe: [
      {
        type: 'image',
        src: processStrip,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Sketch → wireframe → deployed', de: 'Skizze → Wireframe → bereitgestellt' },
        title: { en: 'The attendance screen across three stages', de: 'Der Anwesenheitsscreen in drei Stufen' },
        description: {
          en: 'The same attendance-month screen moves from a paper sketch to a requirement-led wireframe and then to the deployed interface.',
          de: 'Derselbe Anwesenheits-Monatsscreen entwickelt sich von der Papierskizze über ein an Anforderungen ausgerichtetes Wireframe bis zur bereitgestellten Oberfläche.',
        },
        alt: {
          en: 'Three-panel strip showing the attendance-month screen as a sketch, wireframe, and deployed interface',
          de: 'Dreiteiliger Streifen mit dem Anwesenheits-Monatsscreen als Skizze, Wireframe und bereitgestellte Oberfläche',
        },
        caption: { en: 'Attendance month · sketch to deployed view', de: 'Anwesenheitsmonat · von der Skizze zur bereitgestellten Ansicht' },
      },
      {
        type: 'image',
        src: wireframeAttendance,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Low-fidelity wireframe', de: 'Low-Fidelity-Wireframe' },
        title: { en: 'Resolve structure before styling', de: 'Struktur vor visueller Gestaltung klären' },
        description: {
          en: 'The low-fidelity version fixes the role navigation, programme selector, month/week switch, attendance vocabulary, day grid, and per-participant total before visual styling is applied.',
          de: 'Die Low-Fidelity-Version legt Rollennavigation, Maßnahmenauswahl, Monats-/Wochenwechsel, Anwesenheitsvokabular, Tagesraster und Summe pro teilnehmender Person fest, bevor visuelle Gestaltung hinzukommt.',
        },
        alt: {
          en: 'Low-fidelity attendance-month wireframe with sidebar, programme selector, attendance legend, daily grid, and participant totals',
          de: 'Low-Fidelity-Wireframe des Anwesenheitsmonats mit Seitenleiste, Maßnahmenauswahl, Anwesenheitslegende, Tagesraster und Teilnehmendensummen',
        },
        caption: { en: 'Attendance month · low fidelity', de: 'Anwesenheitsmonat · Low Fidelity' },
      },
      {
        type: 'image',
        src: wireframeHiFiAttendance,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'High-fidelity wireframe', de: 'High-Fidelity-Wireframe' },
        title: { en: 'Keep the structure, add operational detail', de: 'Struktur beibehalten, operative Details ergänzen' },
        description: {
          en: 'The high-fidelity version keeps the same structure and adds morning/afternoon attendance, the complete code vocabulary, role/course cues, open-field feedback, and focused exception highlighting.',
          de: 'Die High-Fidelity-Version behält dieselbe Struktur und ergänzt Vormittags-/Nachmittagsanwesenheit, das vollständige Code-Vokabular, Rollen-/Kurs-Hinweise, Feedback zu offenen Feldern und gezielte Hervorhebung von Ausnahmen.',
        },
        alt: {
          en: 'High-fidelity attendance-month wireframe with morning and afternoon cells, status legend, course chips, completion feedback, and exception highlighting',
          de: 'High-Fidelity-Wireframe des Anwesenheitsmonats mit Vormittags- und Nachmittagszellen, Statuslegende, Kurs-Chips, Fortschrittsfeedback und Hervorhebung von Ausnahmen',
        },
        caption: { en: 'Attendance month · high fidelity', de: 'Anwesenheitsmonat · High Fidelity' },
      },
    ],

    methodology: [
      {
        type: 'image',
        src: personaPreview,
        href: `${DOCS}/Personas/Persona.html`,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Evidence-backed role profiles', de: 'Evidenzbasierte Rollenprofile' },
        title: { en: 'Composite profiles, not portraits of participants', de: 'Zusammengesetzte Profile, keine Porträts von Teilnehmenden' },
        description: {
          en: 'Seven composite role profiles document perspectives used during design and state the evidence behind each profile. They complement the nine-actor service map; the application itself focuses on five roles with dedicated views.',
          de: 'Sieben zusammengesetzte Rollenprofile dokumentieren die im Design genutzten Perspektiven und benennen jeweils ihre Evidenzbasis. Sie ergänzen die Service-Karte mit neun Akteuren; die Anwendung selbst konzentriert sich auf fünf Rollen mit eigenen Ansichten.',
        },
        alt: {
          en: 'Set of seven composite role-profile cards with role labels and research quotes',
          de: 'Set aus sieben zusammengesetzten Rollenprofilen mit Rollenbezeichnungen und Forschungszitaten',
        },
        caption: { en: 'Evidence-backed role profiles — preview', de: 'Evidenzbasierte Rollenprofile — Vorschau' },
        linkLabel: { en: 'Open the role profiles', de: 'Rollenprofile öffnen' },
      },
    ],
  },

  tagEvidence: [
    { tag: 'UX Research', evidence: 'process + challenge: insider observation, expert interviews, administration working meeting, participant survey, artefact analysis, and evidence-led problem framing', status: 'evidenced' },
    { tag: 'Stakeholder Interviews', evidence: 'methods/process: two expert interviews plus one administration working meeting', status: 'evidenced' },
    { tag: 'Survey Design', evidence: 'methods + resultsAtAGlance + verbatims: ongoing anonymous participant survey, n=6', status: 'evidenced' },
    { tag: 'Thematic Analysis', evidence: 'process/methodology: thematic clustering into a 25-problem evidence register', status: 'evidenced' },
    { tag: 'Process Mapping (UML)', evidence: 'figures.challenge: AS-IS swimlane map with 13 steps, nine actors, and four return loops', status: 'evidenced' },
    { tag: 'Requirements Engineering', evidence: 'process/methodology: documented problems translated into numbered requirements, information architecture, and state rules', status: 'evidenced' },
    { tag: 'Requirements Traceability', evidence: 'methodology: finding → problem → requirement → implementation → automated check example', status: 'evidenced' },
    { tag: 'Information Architecture', evidence: 'process + solution: role-based information architecture and five dedicated application views', status: 'evidenced' },
    { tag: 'State Machine Modelling', evidence: 'solution/notBuilt: explicit claim states including the modelled-but-unreachable PAID state', status: 'evidenced' },
    { tag: 'Wireframing', evidence: 'wireframe + figures.wireframe: sketch, low-fidelity and high-fidelity versions of the attendance-month screen', status: 'evidenced' },
    { tag: 'Design Systems', evidence: 'design + figures.design: AS-IS role palette carried into the UI design system', status: 'evidenced' },
    { tag: 'Prototyping', evidence: 'prototype + prototypeUrl: deployed browser demo on fictional data', status: 'evidenced' },
    { tag: 'Usability Evaluation (instrumented)', evidence: 'process/prototype/results: guided tasks, local pseudonymous event log and end-of-session questionnaire are implemented; formal sessions pending', status: 'evidenced' },
    { tag: 'React', evidence: 'techStack + solution: working role-based application', status: 'evidenced' },
    { tag: 'TypeScript', evidence: 'techStack + methodology: shared calculation rules and state logic', status: 'evidenced' },
    { tag: 'Node.js / Fastify', evidence: 'techStack + figures.solution architecture: implemented server target', status: 'evidenced' },
    { tag: 'Automated Testing (Vitest)', evidence: 'techStack + figures.solution engineering-quality table: 1,734 automated tests/checks', status: 'evidenced' },
    { tag: 'Privacy by Design', evidence: 'solution/prototype/architecture: fictional public demo data, access controls, pseudonymous local evaluation logging, institute-controlled storage', status: 'evidenced' },
    { tag: 'GDPR / DSGVO', evidence: 'solution/notBuilt/architecture: institute-controlled storage and explicit data-protection dependency for digital signature', status: 'evidenced' },
  ],
};

export default projectData;
