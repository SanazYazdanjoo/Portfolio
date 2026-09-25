// Recruiter-facing case study content for the IBS travel reimbursement project.
// Evidence sources: >1 year of insider process observation, two expert interviews,
// one administration working meeting, an ongoing anonymous participant survey (n=6),
// document/artefact analysis, the AS-IS process map, the problem register, and the
// implemented application verified against the project codebase
// (github.com/SanazYazdanjoo/IBS_FKTN: REQUIREMENTS.md, docs/DECISIONS.md, the code).
//
// The page is a traceability story: existing workflow → research evidence →
// documented problems → requirements → decisions → implementation → quality →
// evaluation status → evidence limits. Its signature block is `traceChains`
// (Evidence → Requirement → Decision → Implementation), one chain per row.
//
// Status honesty: three tiers are kept apart everywhere — implemented,
// internally tested, not yet validated with users. Test and check results are
// dated to the run they come from (25 Sep 2026); two checks that currently fail
// are reported as open, not as green. No post-launch impact is claimed.
import card from './card';
import thumbnailImg from './Project-4.png';
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
// Product screens, captured 25 Sep 2026 from the application running locally
// on its committed fictional demo dataset (npm run seed:screenshot states in
// the IBS repository). No review-build banner or task bar: these are the
// screens as a user of the application sees them.
import screenCaseDetail from './screens/screen-case-detail-trace.webp';
import screenTnAmount from './screens/screen-tn-amount-trace.webp';
import screenTnStep from './screens/screen-tn-step-mode.webp';
import screenAttendance from './screens/screen-attendance-month.webp';
import screenManagerQueue from './screens/screen-manager-queue.webp';

const DOCS = '/projects/digitalising-ibs-travel-reimbursements';
const PHONE_SHOT = 'w-full h-auto block sm:max-w-[340px] sm:mx-auto';

export const projectData = {
  ...card,

  stage: {
    en: 'Built and internally tested · user evaluation pending',
    de: 'Gebaut und intern getestet · Evaluation mit Nutzenden ausstehend',
  },
  timeline: {
    en: '2026 · ongoing',
    de: '2026 · laufend',
  },

  // The recruiter brief under the title (template/ProjectHeader.jsx). Every
  // line restates a fact the sections below evidence in full.
  brief: {
    problem: {
      en: 'A 13-step paper reimbursement process spread across nine actors: receipts, attendance and amounts copied between spreadsheets, no confirmation and no claim status for participants, and one traced claim still unpaid after 43+ days.',
      de: 'Ein 13-stufiger Papier-Erstattungsprozess, verteilt über neun Akteure: Belege, Anwesenheiten und Beträge zwischen Tabellen kopiert, keine Bestätigung und kein Antragsstatus für Teilnehmende, ein nachverfolgter Antrag nach 43+ Tagen noch unbezahlt.',
    },
    context: {
      en: 'In-house project at IBS, researched from the inside: I administered the process for more than a year as project assistant before rebuilding it.',
      de: 'Internes Projekt am IBS, von innen erforscht: Ich habe den Prozess über ein Jahr als Projektassistentin administriert, bevor ich ihn neu gebaut habe.',
    },
    methods: {
      en: 'Insider process observation · expert interviews and an administration working meeting · participant survey · artefact analysis · UML process mapping · evidence-graded problem register · FR/NFR requirements with traceability',
      de: 'Insider-Prozessbeobachtung · Experteninterviews und ein Arbeitstreffen mit der Verwaltung · Teilnehmenden-Umfrage · Artefaktanalyse · UML-Prozessmapping · Problemregister mit Evidenzgrad · FR/NFR-Anforderungen mit Traceability',
    },
    scale: {
      en: '9 actors · 13 steps · 25 evidence-graded problems · 5 role views in one React/TypeScript application · 1,810 automated tests',
      de: '9 Akteure · 13 Schritte · 25 Probleme mit Evidenzgrad · 5 Rollenansichten in einer React/TypeScript-Anwendung · 1.810 automatisierte Tests',
    },
    outcome: {
      en: 'One role-based application, built and internally tested, with a public demo on fictional data. Usability evaluation with real users is instrumented into the app but has not run — no improvement is claimed yet.',
      de: 'Eine rollenbasierte Anwendung, gebaut und intern getestet, mit öffentlicher Demo auf fiktiven Daten. Die Usability-Evaluation mit echten Nutzenden ist in die App instrumentiert, hat aber noch nicht stattgefunden — noch wird keine Verbesserung behauptet.',
    },
  },

  heroImage: thumbnailImg,
  heroIsGenerated: true,

  sectionTitles: {
    about: {
      label: { en: 'Context', de: 'Kontext' },
      kicker: { en: '01 · Context', de: '01 · Kontext' },
      heading: { en: 'I ran this process before I rebuilt it', de: 'Ich habe diesen Prozess betreut, bevor ich ihn neu gebaut habe' },
    },
    challenge: {
      label: { en: 'Workflow & evidence', de: 'Ablauf & Evidenz' },
      kicker: { en: '02 · Existing workflow & research evidence', de: '02 · Bestehender Ablauf & Forschungsevidenz' },
      heading: { en: 'Nine actors, thirteen steps, no shared picture', de: 'Neun Akteure, dreizehn Schritte, kein gemeinsames Bild' },
    },
    solution: {
      label: { en: 'Traceability', de: 'Traceability' },
      kicker: { en: '03 · Problems → requirements → decisions', de: '03 · Probleme → Anforderungen → Entscheidungen' },
      heading: { en: 'Every decision traced back to its evidence', de: 'Jede Entscheidung auf ihre Evidenz zurückgeführt' },
    },
    design: {
      label: { en: 'Design system', de: 'Designsystem' },
      kicker: { en: '04 · Design system', de: '04 · Designsystem' },
      heading: { en: 'Research cues carried into the interface', de: 'Forschungshinweise in die Oberfläche übertragen' },
    },
    wireframe: {
      label: { en: 'Wireframes', de: 'Wireframes' },
      kicker: { en: '05 · Interaction design', de: '05 · Interaktionsdesign' },
      heading: { en: 'Structure first, visual detail second', de: 'Erst Struktur, dann visuelles Detail' },
    },
    prototype: {
      label: { en: 'The product', de: 'Das Produkt' },
      kicker: { en: '06 · Implementation · the product', de: '06 · Umsetzung · das Produkt' },
      heading: { en: 'The working application, role by role', de: 'Die funktionierende Anwendung, Rolle für Rolle' },
    },
    methodology: {
      label: { en: 'Engineering & quality', de: 'Technik & Qualität' },
      kicker: { en: '07 · Implementation & quality', de: '07 · Umsetzung & Qualität' },
      heading: { en: 'One rule module, enforced boundaries, checks that can fail', de: 'Ein Regelmodul, erzwungene Grenzen, Prüfungen, die scheitern können' },
    },
    results: {
      label: { en: 'Evaluation status', de: 'Evaluationsstand' },
      kicker: { en: '08 · Evaluation status', de: '08 · Evaluationsstand' },
      heading: { en: 'Built and tested internally — not yet validated with users', de: 'Gebaut und intern getestet — noch nicht mit Nutzenden validiert' },
    },
    limitations: {
      label: { en: 'Limitations', de: 'Limitationen' },
      kicker: { en: '09 · Evidence limits', de: '09 · Grenzen der Evidenz' },
      heading: { en: 'What this evidence cannot prove yet', de: 'Was diese Evidenz noch nicht belegen kann' },
    },
  },

  about: {
    en: 'I spent more than a year administering this reimbursement process as a project assistant — collecting paper receipts, consolidating several Excel files, checking attendance, and calculating reimbursements. That gave me deep process knowledge, but I treated it as a set of assumptions to test rather than as research evidence on its own. I checked it against expert interviews, an administration working meeting, an ongoing participant survey and artefact analysis, turned the verified problems into numbered requirements, and built one application that carries those requirements into code. What follows traces that chain link by link, and marks where it stops.',
    de: 'Ich habe diesen Erstattungsprozess mehr als ein Jahr als Projektassistentin administriert — Papierbelege gesammelt, mehrere Excel-Dateien zusammengeführt, Anwesenheiten geprüft und Erstattungen berechnet. Dadurch kannte ich den Ablauf sehr genau, behandelte dieses Wissen aber als Annahmen, die überprüft werden müssen, nicht als alleinige Forschungsevidenz. Ich prüfte es an Experteninterviews, einem Arbeitstreffen mit der Verwaltung, einer laufenden Teilnehmenden-Umfrage und Artefaktanalyse, übersetzte die bestätigten Probleme in nummerierte Anforderungen und baute eine Anwendung, die diese Anforderungen in den Code trägt. Der folgende Text verfolgt diese Kette Glied für Glied — und zeigt, wo sie endet.',
  },

  // The chain the case study exists to show, one line per link, rendered
  // under the About copy (template/EvidenceChain.jsx). The overview; the
  // traced chains under Solution are the detail.
  evidenceChain: [
    {
      stage: { en: 'Research', de: 'Research' },
      note: {
        en: 'More than a year administering the process as project assistant, two expert interviews, a working meeting with the administration team, and an open participant survey.',
        de: 'Über ein Jahr Administration des Prozesses als Projektassistentin, zwei Experteninterviews, ein Arbeitstreffen mit dem Verwaltungsteam und eine laufende Teilnehmenden-Umfrage.',
      },
    },
    {
      stage: { en: 'Synthesis', de: 'Synthese' },
      note: {
        en: '25 documented problems, each carrying an evidence grade: confirmed, indicative, hypothesis, untested.',
        de: '25 dokumentierte Probleme, jedes mit einem Evidenzgrad: bestätigt, indikativ, Hypothese, ungeprüft.',
      },
    },
    {
      stage: { en: 'Requirements', de: 'Anforderungen' },
      note: {
        en: 'Numbered FR/NFR requirements traced to their source problems; a test fails the build when code cites a requirement that has no row.',
        de: 'Nummerierte FR/NFR-Anforderungen, auf ihre Quellprobleme zurückgeführt; ein Test lässt den Build scheitern, wenn Code eine Anforderung ohne Tabellenzeile zitiert.',
      },
    },
    {
      stage: { en: 'Design', de: 'Design' },
      note: {
        en: 'A role-based information architecture, an explicit claim state machine, wireframes before high-fidelity screens, and a design system whose role palette is the research diagram’s lane colours.',
        de: 'Eine rollenbasierte Informationsarchitektur, eine explizite Zustandsmaschine für Anträge, Wireframes vor den High-Fidelity-Screens und ein Designsystem, dessen Rollenpalette die Spurfarben des Forschungsdiagramms sind.',
      },
    },
    {
      stage: { en: 'Implementation', de: 'Implementierung' },
      note: {
        en: 'One React/TypeScript application with a Fastify backend: five role views, and every amount calculated by one shared rule module with its formula visible.',
        de: 'Eine React/TypeScript-Anwendung mit Fastify-Backend: fünf Rollenansichten, und jeder Betrag wird von einem gemeinsamen Regelmodul berechnet, mit sichtbarer Formel.',
      },
    },
    {
      stage: { en: 'Quality', de: 'Qualität' },
      note: {
        en: '1,810 automated tests across two suites, run in CI on every push; boundary and privacy tests that plant a violation to prove they can fail.',
        de: '1.810 automatisierte Tests in zwei Suiten, bei jedem Push in der CI ausgeführt; Grenz- und Datenschutztests, die einen Verstoß einbauen, um zu beweisen, dass sie scheitern können.',
      },
    },
    {
      stage: { en: 'Validation', de: 'Validierung' },
      pending: true,
      note: {
        en: 'A usability evaluation is instrumented into the app — scripted tasks, a pseudonymous event log, a questionnaire. No session with real users has run; measured outcomes are not yet available.',
        de: 'Eine Usability-Evaluation ist in die App instrumentiert — Aufgabenskripte, ein pseudonymes Ereignisprotokoll, ein Fragebogen. Noch hat keine Sitzung mit echten Nutzenden stattgefunden; gemessene Ergebnisse liegen nicht vor.',
      },
    },
  ],

  challengeQuote: {
    en: 'The problem was not the form. It was the fragmented system around it.',
    de: 'Das Problem war nicht das Formular. Es war das fragmentierte System darum herum.',
  },
  challenge: {
    en: 'Each month, a claim moved through paper attendance lists, several Excel files, a handwritten form, manual calculation and signatures, handed between nine actors in 13 steps with four return loops. The same information was copied repeatedly, and administration was the one point holding the pieces together. Participants had no confirmation that their documents had arrived, no visible calculation, and no claim status. The survey and interviews confirmed what I had seen from the inside, and added problems I had not noticed.',
    de: 'Jeden Monat lief ein Antrag durch Anwesenheitslisten auf Papier, mehrere Excel-Dateien, ein handschriftliches Formular, manuelle Berechnung und Unterschriften — übergeben zwischen neun Akteuren in 13 Schritten mit vier Rückschleifen. Dieselben Informationen wurden mehrfach übertragen, und die Verwaltung war der einzige Punkt, der alles zusammenhielt. Teilnehmende erhielten keine Bestätigung, dass ihre Unterlagen angekommen waren, sahen keine Berechnung und keinen Antragsstatus. Umfrage und Interviews bestätigten, was ich von innen gesehen hatte, und ergänzten Probleme, die mir nicht aufgefallen waren.',
  },

  researchEvidence: {
    title: { en: 'What the research found · with its source', de: 'Was die Forschung ergab · mit Quelle' },
    items: [
      {
        value: '4/6',
        label: { en: 'survey respondents did not know how their amount was calculated', de: 'Befragte wussten nicht, wie ihr Betrag berechnet wird' },
        source: { en: 'Anonymous participant survey · n=6 · still open', de: 'Anonyme Teilnehmenden-Umfrage · n=6 · weiterhin offen' },
      },
      {
        value: '5/6',
        label: { en: 'had no reliable way to know whether their documents had arrived', de: 'hatten keine verlässliche Möglichkeit zu erkennen, ob ihre Unterlagen angekommen waren' },
        source: { en: 'Anonymous participant survey · n=6', de: 'Anonyme Teilnehmenden-Umfrage · n=6' },
      },
      {
        value: '4/6',
        label: { en: 'named processing time as their main difficulty', de: 'nannten die Bearbeitungszeit als größte Schwierigkeit' },
        source: { en: 'Anonymous participant survey · n=6', de: 'Anonyme Teilnehmenden-Umfrage · n=6' },
      },
      {
        value: '43+',
        label: { en: 'days for one traced claim, still unpaid when observation stopped', de: 'Tage bei einem nachverfolgten Antrag, bei Beobachtungsende noch unbezahlt' },
        source: { en: 'Insider observation · one case, a minimum, not an average', de: 'Insider-Beobachtung · ein Fall, ein Minimum, kein Durchschnitt' },
      },
      {
        value: '2 + 1',
        label: { en: 'expert interviews (project management, accounting) and one administration working meeting', de: 'Experteninterviews (Projektleitung, Buchhaltung) und ein Arbeitstreffen mit der Verwaltung' },
        source: { en: 'Stakeholder research · lecturers not interviewed', de: 'Stakeholder-Research · Dozierende nicht interviewt' },
      },
      {
        value: '25',
        label: { en: 'documented problems, each graded confirmed, indicative, hypothesis or untested', de: 'dokumentierte Probleme, jedes als bestätigt, indikativ, Hypothese oder ungeprüft eingestuft' },
        source: { en: 'Thematic clustering into the problem register', de: 'Thematisches Clustering ins Problemregister' },
      },
    ],
  },

  solutionQuote: {
    en: 'A finding counts only once it is a requirement, a decision and code — and the gaps stay visible.',
    de: 'Ein Befund zählt erst, wenn er Anforderung, Entscheidung und Code geworden ist — und die Lücken bleiben sichtbar.',
  },
  solution: {
    en: 'The problem register became numbered requirements (FR/NFR), and each requirement names the problem it answers, the files that implement it, and how to check that it still holds. A test in the codebase fails the build when code cites a requirement that has no row. Below are the chains that matter most, each read left to right: the evidence, the requirement it became, the interaction decision, and what the code does. Where a chain stops short of the problem, it says so.',
    de: 'Aus dem Problemregister wurden nummerierte Anforderungen (FR/NFR), und jede Anforderung nennt das Problem, auf das sie antwortet, die Dateien, die sie umsetzen, und wie sich prüfen lässt, dass sie noch gilt. Ein Test in der Codebasis lässt den Build scheitern, wenn Code eine Anforderung ohne Tabellenzeile zitiert. Unten stehen die wichtigsten Ketten, jeweils von links nach rechts zu lesen: die Evidenz, die Anforderung, die daraus wurde, die Interaktionsentscheidung und was der Code tut. Wo eine Kette vor dem Problem endet, steht das dabei.',
  },

  traceChains: {
    title: { en: 'Evidence → Requirement → Decision → Implementation', de: 'Evidenz → Anforderung → Entscheidung → Umsetzung' },
    intro: {
      en: 'Status describes what is built. None of these chains has been validated with real users yet — that is the evaluation in section 08.',
      de: 'Der Status beschreibt, was gebaut ist. Keine dieser Ketten ist bisher mit echten Nutzenden validiert — das ist die Evaluation in Abschnitt 08.',
    },
    columns: {
      evidence: { en: 'Evidence', de: 'Evidenz' },
      requirement: { en: 'Requirement', de: 'Anforderung' },
      decision: { en: 'Interaction decision', de: 'Interaktionsentscheidung' },
      implementation: { en: 'Implementation', de: 'Umsetzung' },
    },
    statusLabels: {
      built: { en: 'Built', de: 'Gebaut' },
      partial: { en: 'Partly built', de: 'Teilweise gebaut' },
      modelled: { en: 'Modelled, not reachable', de: 'Modelliert, nicht erreichbar' },
    },
    moreLabel: { en: 'Three more traced chains', de: 'Drei weitere Ketten' },
    items: [
      {
        id: 'calculation',
        featured: true,
        status: 'built',
        title: { en: 'Make every amount explainable', de: 'Jeden Betrag nachvollziehbar machen' },
        evidence: {
          text: { en: '4/6 respondents did not know how their amount was calculated. “No, I just take the amount as it comes.”', de: '4/6 Befragte wussten nicht, wie ihr Betrag berechnet wird. „Nein, ich nehme den Betrag so, wie er kommt.“' },
          source: { en: 'Survey n=6 · problem register P3', de: 'Umfrage n=6 · Problemregister P3' },
        },
        requirement: {
          code: 'NFR-03',
          text: { en: 'Every amount carries its full formula; participant, admin and manager see the same number from the same calculation.', de: 'Jeder Betrag trägt seine vollständige Formel; Teilnehmende, Verwaltung und Leitung sehen dieselbe Zahl aus derselben Berechnung.' },
        },
        decision: {
          text: { en: 'Show the formula next to the amount — “So wurde gerechnet” for participants, the full breakdown for staff. Screens display the result; they never calculate it.', de: 'Die Formel neben dem Betrag zeigen — „So wurde gerechnet“ für Teilnehmende, die vollständige Aufschlüsselung für die Verwaltung. Screens zeigen das Ergebnis an; sie berechnen es nie.' },
        },
        implementation: {
          text: { en: 'One pure rule module returns every amount with its trace. Holding every screen to it exposed a real bug: one screen showed 21 working days in its header and 20 in the pay formula. Working days now come from the calendar everywhere.', de: 'Ein reines Regelmodul liefert jeden Betrag mit seinem Rechenweg. Jeden Screen daran zu binden deckte einen echten Fehler auf: Ein Screen zeigte oben 21 Arbeitstage und in der Formel 20. Arbeitstage kommen jetzt überall aus dem Kalender.' },
          source: { en: 'Unit tests on the rule module · boundary test keeps it free of UI code', de: 'Unit-Tests am Regelmodul · Grenztest hält es frei von UI-Code' },
        },
      },
      {
        id: 'completeness',
        featured: true,
        status: 'partial',
        title: { en: 'Show what is missing — and what arrived', de: 'Zeigen, was fehlt — und was angekommen ist' },
        evidence: {
          text: { en: '5/6 respondents had no reliable way to know whether their documents had arrived. Incomplete submissions caused return loops.', de: '5/6 Befragte hatten keine verlässliche Möglichkeit zu erkennen, ob ihre Unterlagen angekommen waren. Unvollständige Einreichungen verursachten Rückschleifen.' },
          source: { en: 'Survey n=6 · problem register P6, P21 · AS-IS map', de: 'Umfrage n=6 · Problemregister P6, P21 · IST-Karte' },
        },
        requirement: {
          code: 'FR-02 · P21',
          text: { en: 'The required-proof checklist per ticket type drives the upload screen; a participant is told when something is missing.', de: 'Die Nachweis-Checkliste je Ticketart steuert den Upload-Screen; Teilnehmende erfahren, wenn etwas fehlt.' },
        },
        decision: {
          text: { en: 'Name the required proofs at the moment the ticket type is chosen, show “x of y complete” until done, and show the claim’s stage as a visible path.', de: 'Die nötigen Nachweise in dem Moment nennen, in dem die Ticketart gewählt wird, „x von y vollständig“ zeigen, bis alles da ist, und die Stufe des Antrags als sichtbaren Weg darstellen.' },
        },
        implementation: {
          text: { en: 'One function generates the checklist per ticket type; both participant modes read the same derived state. An upload for a month without a record gets a plain-German message instead of an API error.', de: 'Eine Funktion erzeugt die Checkliste je Ticketart; beide Teilnehmenden-Modi lesen denselben abgeleiteten Zustand. Ein Upload für einen Monat ohne Datensatz bekommt eine Meldung in einfachem Deutsch statt eines API-Fehlers.' },
          source: { en: 'Tests cover the complete and the partial case', de: 'Tests decken den vollständigen und den unvollständigen Fall ab' },
        },
        gap: {
          en: 'Stops short: completeness is shown only while the participant is in the app. Nothing confirms arrival or reports a missing proof afterwards.',
          de: 'Endet vorher: Vollständigkeit wird nur angezeigt, solange die teilnehmende Person in der App ist. Nichts bestätigt danach den Eingang oder meldet einen fehlenden Nachweis.',
        },
      },
      {
        id: 'phone',
        featured: true,
        status: 'partial',
        title: { en: 'Submit on a phone, one decision at a time', de: 'Am Smartphone einreichen, eine Entscheidung nach der anderen' },
        evidence: {
          text: { en: 'Participants reported that phone submission mattered, which reversed my priority. One respondent’s answers showed strain with written German — recorded as a watch item, not a finding.', de: 'Teilnehmende gaben an, dass die Einreichung per Smartphone wichtig ist — das kehrte meine Priorität um. Die Antworten einer Person zeigten Schwierigkeiten mit geschriebenem Deutsch — als Beobachtungspunkt festgehalten, nicht als Befund.' },
          source: { en: 'Survey n=6 · watch item in the problem register', de: 'Umfrage n=6 · Beobachtungspunkt im Problemregister' },
        },
        requirement: {
          code: 'FR-15',
          text: { en: 'The participant with the lowest digital literacy and weakest German completes the flow without help.', de: 'Die teilnehmende Person mit der geringsten digitalen Erfahrung und den schwächsten Deutschkenntnissen schließt den Ablauf ohne Hilfe ab.' },
        },
        decision: {
          text: { en: 'A second mode, “Schritt für Schritt”: one question per screen, plain German with informal address, the proofs named on each choice, and camera capture as a main path.', de: 'Ein zweiter Modus, „Schritt für Schritt“: eine Frage pro Screen, einfaches Deutsch mit Du-Ansprache, die Nachweise an jeder Auswahl benannt und Kamera-Aufnahme als Hauptweg.' },
        },
        implementation: {
          text: { en: 'The step mode renders only from the same derived state as the standard mode, so the two can never disagree. All participant copy sits in one typed string table so the plain language can be reviewed in one place.', de: 'Der Schrittmodus rendert ausschließlich aus demselben abgeleiteten Zustand wie der Standardmodus, sodass beide nie voneinander abweichen. Alle Texte für Teilnehmende liegen in einer typisierten Tabelle, damit die einfache Sprache an einer Stelle geprüft werden kann.' },
        },
        gap: {
          en: 'Stops short: the full signed-in shell is not yet responsive, the correction screen has no step mode, and the German has had no readability review.',
          de: 'Endet vorher: Die gesamte angemeldete Oberfläche ist noch nicht responsiv, der Korrektur-Screen hat keinen Schrittmodus, und das Deutsch wurde nicht auf Lesbarkeit geprüft.',
        },
      },
      {
        id: 'attendance',
        status: 'built',
        title: { en: 'Attendance without re-typing', de: 'Anwesenheit ohne Abtippen' },
        evidence: {
          text: { en: 'Attendance lived on paper and in several Excel files and was copied between them. One month for 15 participants is 660 half-day entries.', de: 'Die Anwesenheit lag auf Papier und in mehreren Excel-Dateien und wurde zwischen ihnen übertragen. Ein Monat für 15 Teilnehmende sind 660 Halbtageseinträge.' },
          source: { en: 'Insider observation · artefact analysis · problem register P4/P5', de: 'Insider-Beobachtung · Artefaktanalyse · Problemregister P4/P5' },
        },
        requirement: {
          code: 'P4/P5',
          text: { en: 'Attendance is one shared digital record that any lecturer, including a covering one, can maintain — no paper hand-off.', de: 'Die Anwesenheit ist ein gemeinsamer digitaler Datensatz, den jede Lehrkraft, auch eine Vertretung, pflegen kann — ohne Papierübergabe.' },
        },
        decision: {
          text: { en: 'Keep the spreadsheet’s gestures instead of inventing new ones: drag, Shift- and Ctrl-click, code keys, copy and paste to and from Excel. A single click still edits one cell.', de: 'Die Gesten der Tabellenkalkulation übernehmen statt neue zu erfinden: Ziehen, Shift- und Strg-Klick, Codetasten, Kopieren und Einfügen von und nach Excel. Ein einfacher Klick bearbeitet weiterhin eine Zelle.' },
        },
        implementation: {
          text: { en: 'A bulk change is one save, one audit entry and one undo. The import shows the result before writing and rejects a table from a different month.', de: 'Eine Sammeländerung ist ein Speichervorgang, ein Protokolleintrag und ein Rückgängig. Der Import zeigt das Ergebnis vor dem Schreiben und lehnt eine Tabelle aus einem anderen Monat ab.' },
          source: { en: '24 unit tests on the selection and import logic', de: '24 Unit-Tests zur Auswahl- und Importlogik' },
        },
      },
      {
        id: 'handoff',
        status: 'built',
        title: { en: 'Approval without a paper relay', de: 'Freigabe ohne Papierweg' },
        evidence: {
          text: { en: 'Approved cases went to accounting by scan and through the secretariat; approval began only after the paper packet had moved downstream.', de: 'Freigegebene Fälle gingen per Scan und über das Sekretariat an die Buchhaltung; die Freigabe begann erst, nachdem das Papierpaket weitergereicht war.' },
          source: { en: 'AS-IS map · expert interviews · problem register P11', de: 'IST-Karte · Experteninterviews · Problemregister P11' },
        },
        requirement: {
          code: 'P11',
          text: { en: 'Approved cases go straight to accounting digitally — no scan step, no relay.', de: 'Freigegebene Fälle gehen direkt digital an die Buchhaltung — kein Scan, keine Weitergabe.' },
        },
        decision: {
          text: { en: 'The manager sees one summary per case and can release clean cases together; a case with an exception is never included in a batch.', de: 'Die Leitung sieht je Fall eine Zusammenfassung und kann unauffällige Fälle gemeinsam freigeben; ein Fall mit Ausnahme kommt nie in einen Stapel.' },
        },
        implementation: {
          text: { en: 'Approval sets the claim to “sent to accounting” directly. Who may make which transition is one table in the rule module, enforced by the server.', de: 'Die Freigabe setzt den Antrag direkt auf „an Buchhaltung“. Wer welchen Übergang auslösen darf, ist eine Tabelle im Regelmodul, die der Server durchsetzt.' },
        },
      },
      {
        id: 'payment',
        status: 'modelled',
        title: { en: 'Payment status for everyone', de: 'Zahlungsstatus für alle' },
        evidence: {
          text: { en: 'Neither participants nor administration could see which claims had been paid; payment lists were chased by hand.', de: 'Weder Teilnehmende noch Verwaltung konnten sehen, welche Anträge ausgezahlt waren; Zahlungslisten wurden von Hand nachverfolgt.' },
          source: { en: 'Survey n=6 · problem register P12, P18, P22', de: 'Umfrage n=6 · Problemregister P12, P18, P22' },
        },
        requirement: {
          code: 'P12 · P18 · P22',
          text: { en: 'Payment status is visible to administration and to the participant.', de: 'Der Zahlungsstatus ist für Verwaltung und Teilnehmende sichtbar.' },
        },
        decision: {
          text: { en: 'Model “paid” as the last stage of the claim path that every role sees.', de: '„Ausgezahlt“ als letzte Stufe des Antragswegs modellieren, den jede Rolle sieht.' },
        },
        implementation: {
          text: { en: 'The state exists in the model and the displays, and only accounting may set it — but no screen can set it yet, because the payment step itself is not digital.', de: 'Der Zustand existiert im Modell und in den Anzeigen, und nur die Buchhaltung darf ihn setzen — doch noch kein Screen kann ihn setzen, weil der Auszahlungsschritt selbst nicht digital ist.' },
        },
        gap: {
          en: 'Not addressed in substance. The payment problems look solved in the interface and are not; the requirements document says so.',
          de: 'In der Sache nicht gelöst. Die Zahlungsprobleme wirken in der Oberfläche gelöst und sind es nicht; das Anforderungsdokument sagt das.',
        },
      },
    ],
  },

  design: {
    en: 'I carried the research model into the interface instead of inventing a separate visual language. The role colours from the AS-IS swimlane map became the application role palette, supported by a compact type scale, status chips, note states, buttons, and form states. This keeps the same actor cues visible from research artefact to working screen.',
    de: 'Ich übertrug das Forschungsmodell in die Oberfläche, statt eine davon getrennte visuelle Sprache zu erfinden. Die Rollenfarben der IST-Swimlane wurden zur Rollenpalette der Anwendung, ergänzt durch eine kompakte Typografie-Skala, Status-Chips, Notiz-Zustände, Buttons und Formularzustände. So bleiben dieselben Akteurshinweise vom Forschungsartefakt bis zum funktionierenden Screen erhalten.',
  },

  wireframe: {
    en: 'I used low-fidelity wireframes to resolve information hierarchy and workflow logic against the numbered requirements before applying visual styling. The high-fidelity version kept the same structure and added the final attendance vocabulary, morning/afternoon states, role cues, exception highlighting, and completion feedback. The comparison below shows the same attendance-month screen from sketch to wireframe to deployed view.',
    de: 'Ich nutzte Low-Fidelity-Wireframes, um Informationshierarchie und Workflow-Logik entlang der nummerierten Anforderungen zu klären, bevor visuelle Gestaltung hinzukam. Die High-Fidelity-Version behielt dieselbe Struktur und ergänzte das finale Anwesenheitsvokabular, Vormittags-/Nachmittagszustände, Rollenhinweise, Hervorhebung von Ausnahmen und Fortschrittsfeedback. Der Vergleich unten zeigt denselben Anwesenheits-Monatsscreen von der Skizze über das Wireframe bis zur bereitgestellten Ansicht.',
  },

  prototype: {
    en: 'Five roles work in one application on one shared claim lifecycle: participants submit and follow their claim, lecturers record attendance, administration checks cases, the manager approves, accounting receives approved cases. The screens below come from the running application on its fictional demo dataset. The public demo runs the same application in the browser, without a server, and adds a demo banner and guided tasks for reviewers.',
    de: 'Fünf Rollen arbeiten in einer Anwendung auf einem gemeinsamen Antragsverlauf: Teilnehmende reichen ein und verfolgen ihren Antrag, Dozierende erfassen die Anwesenheit, die Verwaltung prüft Fälle, die Leitung gibt frei, die Buchhaltung erhält freigegebene Fälle. Die Screens unten stammen aus der laufenden Anwendung mit ihrem fiktiven Demo-Datensatz. Die öffentliche Demo führt dieselbe Anwendung im Browser ohne Server aus und ergänzt ein Demo-Banner und geführte Aufgaben für Reviewer:innen.',
  },
  prototypeUrl: 'https://ibs-fktn.vercel.app/',
  prototypeUrlLabel: {
    en: 'Open the live prototype',
    de: 'Live-Prototyp öffnen',
  },

  methodologyQuote: {
    en: 'A boundary counts as enforced only if a test fails when it is crossed.',
    de: 'Eine Grenze gilt nur dann als erzwungen, wenn ein Test scheitert, sobald sie überschritten wird.',
  },
  methodology: {
    en: 'Three technical decisions carry the design. The calculation rules live in one pure package that every screen reads, so a participant, an administrator and a manager can never see different amounts. Access control sits in the data layer rather than in hidden buttons, and the same isolation tests run against every storage implementation and over real HTTP. A Fastify and SQLite server adds real accounts, sessions, CSRF protection and an append-only audit trail; it runs locally on demo data and has not been deployed at the institute. The checks below say what guards each of these, and what their last run found.',
    de: 'Drei technische Entscheidungen tragen das Design. Die Berechnungsregeln liegen in einem reinen Paket, das jeder Screen liest, sodass Teilnehmende, Verwaltung und Leitung nie unterschiedliche Beträge sehen. Die Zugriffskontrolle liegt in der Datenschicht statt in versteckten Buttons, und dieselben Isolationstests laufen gegen jede Speicherimplementierung und über echtes HTTP. Ein Fastify- und SQLite-Server ergänzt echte Konten, Sitzungen, CSRF-Schutz und ein nur erweiterbares Änderungsprotokoll; er läuft lokal auf Demo-Daten und ist am Institut noch nicht in Betrieb. Die Prüfungen unten zeigen, was jede davon absichert und was ihr letzter Lauf ergab.',
  },

  qualityChecks: {
    title: { en: 'Internal checks · last run 25 Sep 2026', de: 'Interne Prüfungen · letzter Lauf 25.09.2026' },
    columns: {
      guards: { en: 'Guards', de: 'Sichert ab' },
      result: { en: 'Result', de: 'Ergebnis' },
    },
    stateLabels: {
      pass: { en: 'Passing', de: 'Bestanden' },
      open: { en: 'Open', de: 'Offen' },
    },
    items: [
      {
        check: { en: 'Automated tests', de: 'Automatisierte Tests' },
        state: 'pass',
        guards: { en: 'Calculation rules, claim transitions, access control, data contracts — in the app suite and the server suite. Lint, type check and both suites run in CI on every push.', de: 'Berechnungsregeln, Statusübergänge, Zugriffskontrolle, Datenverträge — in der App- und der Server-Suite. Lint, Typprüfung und beide Suiten laufen bei jedem Push in der CI.' },
        result: { en: '1,305 app + 505 server tests passing', de: '1.305 App- + 505 Server-Tests bestanden' },
      },
      {
        check: { en: 'Requirement traceability', de: 'Anforderungs-Traceability' },
        state: 'pass',
        guards: { en: 'Fails the build when code cites a requirement ID that has no row. It checks that a row exists, not that the row is true.', de: 'Lässt den Build scheitern, wenn Code eine Anforderungs-ID ohne Tabellenzeile zitiert. Er prüft, dass eine Zeile existiert, nicht, dass sie stimmt.' },
        result: { en: 'Passing', de: 'Bestanden' },
      },
      {
        check: { en: 'Boundary & privacy tests', de: 'Grenz- & Datenschutztests' },
        state: 'pass',
        guards: { en: 'Rule module free of UI and database code; no real names in demo data; no external hosts in the demo build; no personal data in audit records. Three of them plant a violation to prove they can fail.', de: 'Regelmodul frei von UI- und Datenbankcode; keine echten Namen in Demo-Daten; keine fremden Hosts im Demo-Build; keine personenbezogenen Daten im Änderungsprotokoll. Drei davon bauen einen Verstoß ein, um zu beweisen, dass sie scheitern können.' },
        result: { en: 'Passing', de: 'Bestanden' },
      },
      {
        check: { en: 'Accessibility (axe-core)', de: 'Barrierefreiheit (axe-core)' },
        state: 'open',
        guards: { en: 'WCAG 2.1 AA rules in a real browser, every route per role, both colour themes. Its first run found 40 violations that code review had missed. Not yet part of CI.', de: 'WCAG-2.1-AA-Regeln in einem echten Browser, jede Route je Rolle, beide Farbthemen. Der erste Lauf fand 40 Verstöße, die eine Codeprüfung übersehen hatte. Noch nicht Teil der CI.' },
        result: { en: 'Green on 3 Sep · 2 contrast violations on one chart legend on 25 Sep', de: 'Grün am 03.09. · 2 Kontrastverstöße in einer Diagrammlegende am 25.09.' },
      },
      {
        check: { en: 'Smoke test on the real server start', de: 'Smoke-Test am echten Serverstart' },
        state: 'open',
        guards: { en: 'Boots the server with its real start command and drives sign-in, saving, the audit trail and the Excel scripts over real HTTP — the class of bug unit tests cannot see.', de: 'Startet den Server mit seinem echten Startbefehl und prüft Anmeldung, Speichern, Änderungsprotokoll und die Excel-Skripte über echtes HTTP — die Fehlerklasse, die Unit-Tests nicht sehen.' },
        result: { en: 'Steps 1–9 of 12 pass · Excel import step fails', de: 'Schritte 1–9 von 12 bestanden · Excel-Import schlägt fehl' },
      },
    ],
    note: {
      en: 'These are checks on the build. They say the product does what its requirements describe; they do not say that it works for the people who will use it.',
      de: 'Das sind Prüfungen am Build. Sie zeigen, dass das Produkt tut, was seine Anforderungen beschreiben — nicht, dass es für die Menschen funktioniert, die es nutzen werden.',
    },
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
  ],

  results: {
    en: 'Everything above describes the existing process and what the replacement implements. The working demo is shared with the team for feedback, and internal use has already exposed three bugs in the evaluation instrumentation. Formal usability sessions have not run, so I do not claim shorter processing time, fewer errors, better usability or adoption. Those outcomes will be reported only once the evaluation has run.',
    de: 'Alles oben beschreibt den bestehenden Prozess und was die neue Anwendung umsetzt. Die funktionierende Demo wird mit dem Team für Feedback geteilt, und die interne Nutzung hat bereits drei Fehler in der Evaluationsinstrumentierung aufgedeckt. Formale Usability-Sitzungen haben nicht stattgefunden; deshalb behaupte ich keine kürzere Bearbeitungszeit, weniger Fehler, bessere Usability oder Adoption. Diese Ergebnisse werden erst berichtet, wenn die Evaluation gelaufen ist.',
  },

  statusTiers: {
    title: { en: 'Three kinds of evidence, kept apart', de: 'Drei Arten von Evidenz, getrennt gehalten' },
    items: [
      {
        key: 'implemented',
        title: { en: 'Implemented', de: 'Umgesetzt' },
        points: [
          { en: 'Five role views on one shared claim lifecycle', de: 'Fünf Rollenansichten auf einem gemeinsamen Antragsverlauf' },
          { en: 'Every amount from one rule module, with its formula visible', de: 'Jeder Betrag aus einem Regelmodul, mit sichtbarer Formel' },
          { en: 'Proof checklists generated from the rules; a step-by-step participant mode', de: 'Nachweis-Checklisten aus den Regeln erzeugt; ein Schrittmodus für Teilnehmende' },
          { en: 'Server with accounts, sessions and an append-only audit trail — run locally on demo data, not deployed at the institute', de: 'Server mit Konten, Sitzungen und nur erweiterbarem Protokoll — lokal auf Demo-Daten betrieben, am Institut nicht in Betrieb' },
        ],
      },
      {
        key: 'tested',
        title: { en: 'Internally tested', de: 'Intern getestet' },
        points: [
          { en: '1,810 automated tests passing, run in CI on every push', de: '1.810 automatisierte Tests bestanden, bei jedem Push in der CI' },
          { en: 'Automated WCAG 2.1 AA check across every route and role — two contrast violations currently open', de: 'Automatisierte WCAG-2.1-AA-Prüfung über jede Route und Rolle — zwei Kontrastverstöße derzeit offen' },
          { en: 'Internal testing of the demo, which exposed three bugs in the evaluation instrumentation', de: 'Interne Tests der Demo, die drei Fehler in der Evaluationsinstrumentierung aufdeckten' },
        ],
      },
      {
        key: 'notValidated',
        title: { en: 'Not yet validated with users', de: 'Noch nicht mit Nutzenden validiert' },
        points: [
          { en: 'Whether participants now understand their amount', de: 'Ob Teilnehmende ihren Betrag jetzt verstehen' },
          { en: 'Task success, time on task and errors for any role', de: 'Aufgabenerfolg, Bearbeitungszeit und Fehler für jede Rolle' },
          { en: 'Whether processing time goes down', de: 'Ob die Bearbeitungszeit sinkt' },
          { en: 'Ready to measure these: six scripted tasks covering all five roles, a pseudonymous consent-gated event log, an end-of-session questionnaire', de: 'Bereit, das zu messen: sechs Aufgabenskripte für alle fünf Rollen, ein pseudonymes, einwilligungspflichtiges Ereignisprotokoll, ein Abschlussfragebogen' },
        ],
      },
    ],
  },

  resultsAtAGlance: {
    title: {
      en: 'Evaluation readiness',
      de: 'Stand der Evaluation',
    },
    items: [
      {
        value: '6',
        label: {
          en: 'scripted evaluation tasks, covering all five roles',
          de: 'Aufgabenskripte für die Evaluation, alle fünf Rollen abgedeckt',
        },
      },
      {
        value: '64',
        label: {
          en: 'event types in the pseudonymous evaluation log',
          de: 'Ereignistypen im pseudonymen Evaluationsprotokoll',
        },
      },
      {
        value: '—',
        pending: true,
        label: {
          en: 'task success with real users',
          de: 'Aufgabenerfolg mit echten Nutzenden',
        },
      },
      {
        value: '—',
        pending: true,
        label: {
          en: 'processing time compared with the paper process',
          de: 'Bearbeitungszeit im Vergleich zum Papierprozess',
        },
      },
    ],
  },

  // Kept for the project card's own row; the page's strip above renders
  // `resultsAtAGlance`. Baseline process facts, not results.
  metrics: [
    { value: '13', label: { en: 'steps in the AS-IS reimbursement process', de: 'Schritte im IST-Erstattungsprozess' } },
    { value: '4', label: { en: 'return loops in the mapped process', de: 'Rückschleifen im kartierten Prozess' } },
    { value: '9', label: { en: 'actors across the end-to-end service', de: 'Akteure im End-to-End-Service' } },
    { value: '43+', label: { en: 'days in one traced claim · minimum for that case, not an average', de: 'Tage bei einem nachverfolgten Antrag · Minimum dieses Falls, kein Durchschnitt' } },
  ],
  metricsIntro: {
    en: 'The instruments exist and are counted here. The outcome numbers stay empty until sessions with real users have run.',
    de: 'Die Instrumente existieren und sind hier gezählt. Die Ergebniszahlen bleiben leer, bis Sitzungen mit echten Nutzenden stattgefunden haben.',
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
        en: 'Reminder e-mails and a confirmation after submission are not built; the reminder screen says so in the app.',
        de: 'Erinnerungs-E-Mails und eine Bestätigung nach der Einreichung sind nicht gebaut; der Erinnerungs-Screen sagt das in der App.',
      },
      {
        en: 'The participant upload path is phone-oriented, but responsive support for the full authenticated application is still in progress.',
        de: 'Der Upload-Pfad für Teilnehmende ist auf Smartphone-Nutzung ausgelegt; die responsive Unterstützung der gesamten angemeldeten Anwendung ist noch in Arbeit.',
      },
    ],
  },

  limitations: [
    {
      en: 'The participant survey is currently n=6, self-selected, and so far limited to the blended/online cohort; the in-person cohort and travel-pass holders are not yet represented. Counts confirm that a problem is real; they cannot say how common it is.',
      de: 'Die Teilnehmenden-Umfrage umfasst derzeit n=6, ist selbstselektiv und bisher auf die Blended-/Online-Kohorte beschränkt; Präsenzkurs und Abo-Karten-Nutzende sind noch nicht vertreten. Anzahlen bestätigen, dass ein Problem real ist; wie häufig es ist, können sie nicht sagen.',
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
      en: 'The traceability test proves that every cited requirement has a row, not that the row is right, and not that every documented problem has a requirement: processing time, the problem most respondents named, has none yet.',
      de: 'Der Traceability-Test beweist, dass jede zitierte Anforderung eine Zeile hat — nicht, dass die Zeile stimmt, und nicht, dass jedes dokumentierte Problem eine Anforderung hat: Die Bearbeitungszeit, das von den meisten Befragten genannte Problem, hat noch keine.',
    },
    {
      en: 'Formal usability evaluation of the new system has not run. The page therefore reports implemented mechanisms, internal checks and baseline evidence, not measured improvement over the paper process.',
      de: 'Die formale Usability-Evaluation des neuen Systems hat noch nicht stattgefunden. Die Seite berichtet deshalb über umgesetzte Mechanismen, interne Prüfungen und Baseline-Evidenz, nicht über gemessene Verbesserungen gegenüber dem Papierprozess.',
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
    // Primary evidence for the existing workflow; the framing artefacts
    // behind it are in supportingFigures.challenge.
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

    // The product, given the most visual weight on the page: one wide
    // staff screen, a pair of participant phone screens, then two more
    // staff screens. index.jsx appends the live embed after these.
    prototype: [
      {
        type: 'image',
        src: screenCaseDetail,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Administration · case detail', de: 'Verwaltung · Falldetail' },
        title: { en: 'The amount, its formula and its proofs in one view', de: 'Betrag, Formel und Nachweise in einer Ansicht' },
        description: {
          en: 'Ticket price ÷ working days × attendance days, shown as the calculation rather than a result. Proofs can be opened and marked readable or illegible; the 3 km rule is checked beside the attendance.',
          de: 'Ticketpreis ÷ Arbeitstage × Anwesenheitstage, als Rechnung gezeigt statt nur als Ergebnis. Nachweise lassen sich öffnen und als lesbar oder unleserlich markieren; die 3-km-Regel wird neben der Anwesenheit geprüft.',
        },
        alt: {
          en: 'Administration case detail for one participant: a table of months with status and amount, and below it the March breakdown with two proofs, attendance 22 of 22 days, and the formula 49.00 euro divided by 22 times 22 equals 49.00 euro',
          de: 'Falldetail der Verwaltung für eine teilnehmende Person: Monatstabelle mit Status und Betrag, darunter die Märzaufschlüsselung mit zwei Nachweisen, Anwesenheit 22 von 22 Tagen und der Formel 49,00 Euro geteilt durch 22 mal 22 gleich 49,00 Euro',
        },
        caption: { en: 'Case detail · fictional demo data', de: 'Falldetail · fiktive Demo-Daten' },
      },
      {
        type: 'image',
        src: screenTnAmount,
        span: 1,
        className: PHONE_SHOT,
        label: { en: 'Participant · phone', de: 'Teilnehmende · Smartphone' },
        title: { en: 'The amount says how it was calculated', de: 'Der Betrag sagt, wie er berechnet wurde' },
        description: {
          en: 'The claim’s stage as a path, and “So wurde gerechnet” — the same formula staff see.',
          de: 'Die Stufe des Antrags als Weg und „So wurde gerechnet“ — dieselbe Formel, die die Verwaltung sieht.',
        },
        alt: {
          en: 'Participant phone screen for March 2026: 49.00 euro on its way, the claim path from submitted to paid, and the expanded calculation 49.00 euro divided by 22 times 22',
          de: 'Smartphone-Screen für Teilnehmende, März 2026: 49,00 Euro unterwegs, der Antragsweg von eingereicht bis ausgezahlt und die aufgeklappte Rechnung 49,00 Euro geteilt durch 22 mal 22',
        },
        caption: { en: 'Standard mode · 390 px', de: 'Standardmodus · 390 px' },
      },
      {
        type: 'image',
        src: screenTnStep,
        span: 1,
        className: PHONE_SHOT,
        label: { en: 'Participant · step by step', de: 'Teilnehmende · Schritt für Schritt' },
        title: { en: 'One question per screen', de: 'Eine Frage pro Screen' },
        description: {
          en: 'Each ticket type names the proofs it needs at the moment it is chosen.',
          de: 'Jede Ticketart nennt die nötigen Nachweise in dem Moment, in dem sie gewählt wird.',
        },
        alt: {
          en: 'Step-by-step participant screen asking how the participant travels, with three choices — Deutschlandticket, online single ticket, car — each naming the proof it needs',
          de: 'Schritt-für-Schritt-Screen für Teilnehmende mit der Frage, wie die Person fährt, und drei Auswahlen — Deutschlandticket, Online-Einzelticket, PKW — jeweils mit dem nötigen Nachweis',
        },
        caption: { en: 'Schritt-für-Schritt mode · 390 px', de: 'Schritt-für-Schritt-Modus · 390 px' },
      },
      {
        type: 'image',
        src: screenAttendance,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Lecturer · attendance month', de: 'Dozierende · Anwesenheitsmonat' },
        title: { en: 'The attendance list, without the copying', de: 'Die Anwesenheitsliste, ohne das Abtippen' },
        description: {
          en: 'Morning and afternoon per day, the list’s own codes, open entries highlighted, and a running count of what is still missing.',
          de: 'Vormittag und Nachmittag je Tag, die Codes der Liste, offene Einträge hervorgehoben und ein laufender Zähler dessen, was noch fehlt.',
        },
        alt: {
          en: 'Lecturer attendance grid for March 2026 with 15 participants, morning and afternoon cells per day, codes such as X and U, open cells highlighted, and a header reading 566 of 660 recorded',
          de: 'Anwesenheitsraster der Dozierenden für März 2026 mit 15 Teilnehmenden, Vormittags- und Nachmittagszellen je Tag, Codes wie X und U, hervorgehobenen offenen Zellen und der Kopfzeile 566 von 660 erfasst',
        },
        caption: { en: 'Attendance month · fictional demo data', de: 'Anwesenheitsmonat · fiktive Demo-Daten' },
      },
      {
        type: 'image',
        src: screenManagerQueue,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Manager · approvals', de: 'Leitung · Freigaben' },
        title: { en: 'Exceptions never go through in a batch', de: 'Ausnahmen gehen nie im Stapel durch' },
        description: {
          en: 'A summary per case, clean cases released together, and approval sent digitally to accounting — no scan, no secretariat.',
          de: 'Eine Zusammenfassung je Fall, unauffällige Fälle gemeinsam freigegeben und die Freigabe digital an die Buchhaltung — kein Scan, kein Sekretariat.',
        },
        alt: {
          en: 'Manager approval queue for March with three open cases, one flagged with an exception, a case summary with proofs, attendance and signature, and buttons to approve or reject with a comment',
          de: 'Freigabeliste der Leitung für März mit drei offenen Fällen, einer davon mit Ausnahme markiert, einer Fallzusammenfassung mit Nachweisen, Anwesenheit und Unterschrift sowie Buttons zum Freigeben oder Ablehnen mit Kommentar',
        },
        caption: { en: 'Approval queue · fictional demo data', de: 'Freigabeliste · fiktive Demo-Daten' },
      },
    ],

    methodology: [
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
    ],
  },

  // Secondary artefacts: real, and one click away, but not at the weight of
  // the primary figure in each section.
  supportingFigures: {
    challenge: {
      label: { en: 'Supporting research artefacts', de: 'Weitere Forschungsartefakte' },
      items: [
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
    solution: {
      label: { en: 'Before and after, as real artefacts', de: 'Vorher und nachher, als echte Artefakte' },
      items: [
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
          linkLabel: { en: 'Open the figure full size', de: 'Abbildung in voller Größe öffnen' },
        },
      ],
    },
    methodology: {
      label: { en: 'Which boundaries are enforced by tests', de: 'Welche Grenzen durch Tests abgesichert sind' },
      items: [
        {
          type: 'image',
          src: architectureGuarantees,
          span: 2,
          className: 'w-full h-auto block',
          label: { en: 'Engineering quality', de: 'Engineering-Qualität' },
          title: { en: 'Enforced versus convention', de: 'Erzwungen oder nur Konvention' },
          description: {
            en: 'The enforcement table distinguishes boundaries that fail the build when crossed from the one that still relies on developer discipline: screens are expected not to calculate, and nothing checks it.',
            de: 'Die Tabelle unterscheidet Grenzen, bei deren Verletzung der Build fehlschlägt, von der einen, die weiterhin auf Entwicklerdisziplin beruht: Screens sollen nicht rechnen, und nichts prüft das.',
          },
          alt: {
            en: 'Engineering enforcement table listing tested architecture boundaries and one convention-only boundary',
            de: 'Engineering-Tabelle mit getesteten Architekturgrenzen und einer nur durch Konvention abgesicherten Grenze',
          },
          caption: { en: 'Engineering enforcement table', de: 'Engineering-Enforcement-Tabelle' },
        },
      ],
    },
  },

  tagEvidence: [
    { tag: 'UX Research', evidence: 'about + challenge + researchEvidence: insider observation, expert interviews, administration working meeting, participant survey, artefact analysis', status: 'evidenced' },
    { tag: 'Stakeholder Interviews', evidence: 'methods + researchEvidence: two expert interviews plus one administration working meeting', status: 'evidenced' },
    { tag: 'Survey Design', evidence: 'methods + researchEvidence + verbatims: ongoing anonymous participant survey, n=6', status: 'evidenced' },
    { tag: 'Thematic Analysis', evidence: 'researchEvidence + evidenceChain: thematic clustering into a 25-problem evidence register', status: 'evidenced' },
    { tag: 'Process Mapping (UML)', evidence: 'figures.challenge: AS-IS swimlane map with 13 steps, nine actors, and four return loops', status: 'evidenced' },
    { tag: 'Requirements Engineering', evidence: 'solution + traceChains: documented problems translated into numbered FR/NFR requirements', status: 'evidenced' },
    { tag: 'Requirements Traceability', evidence: 'traceChains + qualityChecks: evidence → requirement → decision → implementation chains, and a build-failing traceability test', status: 'evidenced' },
    { tag: 'Information Architecture', evidence: 'prototype + figures.prototype: five role views on one shared claim lifecycle', status: 'evidenced' },
    { tag: 'State Machine Modelling', evidence: 'traceChains (handoff, payment) + notBuilt: explicit claim states and role-restricted transitions, including the modelled-but-unreachable PAID state', status: 'evidenced' },
    { tag: 'Wireframing', evidence: 'wireframe + figures.wireframe: sketch, low-fidelity and high-fidelity versions of the attendance-month screen', status: 'evidenced' },
    { tag: 'Design Systems', evidence: 'design + figures.design: AS-IS role palette carried into the UI design system', status: 'evidenced' },
    { tag: 'Prototyping', evidence: 'prototype + figures.prototype + prototypeUrl: working application screens and a public demo on fictional data', status: 'evidenced' },
    { tag: 'Usability Engineering', evidence: 'traceChains + figures.prototype: survey findings became usability requirements (transparent calculation, visible completeness, phone step mode) implemented as screens', status: 'evidenced' },
    { tag: 'Usability Evaluation (instrumented)', evidence: 'statusTiers + resultsAtAGlance: six scripted tasks, pseudonymous event log and questionnaire implemented; sessions with real users pending', status: 'evidenced' },
    { tag: 'React', evidence: 'techStack + figures.prototype: working role-based application', status: 'evidenced' },
    { tag: 'TypeScript', evidence: 'techStack + methodology: shared calculation rules and state logic', status: 'evidenced' },
    { tag: 'Node.js / Fastify', evidence: 'techStack + methodology: server with accounts, sessions and audit trail, run locally', status: 'evidenced' },
    { tag: 'Automated Testing (Vitest)', evidence: 'qualityChecks: 1,305 app + 505 server tests passing, CI on every push, boundary tests proven able to fail', status: 'evidenced' },
    { tag: 'Privacy by Design', evidence: 'methodology + qualityChecks: access control in the data layer, fictional public demo data, privacy tests, pseudonymous evaluation logging', status: 'evidenced' },
    { tag: 'GDPR / DSGVO', evidence: 'methodology + notBuilt: institute-controlled storage and explicit data-protection dependency for digital signature', status: 'evidenced' },
  ],
};

export default projectData;
