// Content is sourced from the IBS Fahrtkostenerstattung project documents:
// 5W1H, Stakeholders, Overview UML, Detailed UML, Current Problems, Persona,
// Information Architecture, Design System, README/DECISIONS/REQUIREMENTS,
// the survey export (n=6, rolling), the cycle-time observation log, and the
// architecture verification against commit 47b0301 ("The Reimbursement
// Round Trip", 19.08.2026).
//
// ⚠️ Status honesty: Phase 4 task-based evaluation has NOT run. What exists
// is a stakeholder demo (18.08.2026) that produced a change request, one
// end-to-end traced claim from the paper process, and instrumentation that
// caught three of its own measurement bugs on dev traffic. `results` says
// exactly that and no more. No `outcome` block until evaluation data exists.
//
// Process screenshots: staff names in the source decks were replaced with
// demo names before export (2026-08-13). Personas are composites, not
// portraits of individuals.
import thumbnailImg from './Project-4.png';
import thumbnailWebp from './Project-4.webp';
import prototypeScreenshot from './Fahrtkostenerstattung-—-Prototyp-08-14-2026.jpg';
import umlPreview from './UML-preview.png';
import fiveW1HFrame from './5W1H.png';
import stakeholderMap from './Stakeholders.png';
import personaPreview from './Persona-preview.png';
import designSystemSheet from './IBS-Design-System.png';
import architectureDiagram from './App-Architecture-Simplified.png';

// The two research artefacts are full standalone documents — a nine-lane
// activity diagram and a seven-card persona set — too detailed to read at
// figure size. Each renders here as a preview that opens the real page in a
// new tab. The pages themselves live in public/ (files under src/ are
// bundled, not served) and keep the folder names they were authored under:
//   public/projects/digitalising-ibs-travel-reimbursements/UML/Detailed-UML.html
//   public/projects/digitalising-ibs-travel-reimbursements/Personas/Persona.html
const DOCS = '/projects/digitalising-ibs-travel-reimbursements';

export const projectData = {
  id: 'digitalising-ibs-travel-reimbursements',
  status: 'in-progress', // Phase 3 shipped · demo delivered · evaluation pending deployment
  stage: { en: 'Demo delivered · evaluation pending', de: 'Demo übergeben · Evaluation ausstehend' },
  order: 1,
  title: {
    en: 'Digitalising IBS Travel Reimbursements',
    de: 'Digitalisierung der IBS Fahrtkostenerstattung',
  },
  subtitle: {
    en: 'Digitalizing a nine-actor, paper-heavy reimbursement workflow',
    de: 'Digitalisierung eines papierlastigen Erstattungsprozesses mit neun Akteuren',
  },

  // This project was the only one of the five without a `tagline`, so the
  // header's lead line and the project card's "Context" field both rendered
  // empty for it while every sibling filled them. Claims nothing about the
  // app's reception: it names the finding (the process reports its own status
  // only by paying out) and the provenance of the work, not an outcome.
  tagline: {
    en: 'A reimbursement process whose only status update is the money arriving — researched from the inside, rebuilt from the evidence.',
    de: 'Ein Erstattungsprozess, dessen einzige Statusmeldung das eintreffende Geld ist — von innen erforscht, aus der Evidenz neu gebaut.',
  },
  role: {
    en: 'Solo — UX Research, UI Design, and Frontend Development',
    de: 'Alleinverantwortlich — UX Research, UI-Design und Frontend-Entwicklung',
  },
  timeline: '2026 · four phases · ongoing',

  // ⚠️ DRAFT — PLACEHOLDER COPY, NOT FOR PUBLICATION.
  // Sanaz rewrites this in her own words before it ships. It is here so the
  // mechanism (schema + rendering + print) is finished and reviewable; the
  // wording is not hers yet. Renders as the last row of the header metadata
  // block, labelled "AI Assistance" / "KI-Unterstützung".
  //
  // The field is optional across the project data shape: every other data.js
  // omits it and renders no row at all. Do not add it to a project unless
  // that project's disclosure has actually been written.
  aiAssistance: {
    en: 'Built with AI coding agents under my direction. The research, the requirements, the architecture decisions, the refusals recorded in the decision log — and every claim on this page — are mine and are traceable to their sources.',
    de: 'Entwickelt mit KI-Coding-Agenten unter meiner Leitung. Die Forschung, die Anforderungen, die Architekturentscheidungen, die im Entscheidungslog festgehaltenen Ablehnungen — und jede Aussage auf dieser Seite — sind meine und auf ihre Quellen rückführbar.',
  },
  tags: [
    'UX Research',
    'Service Design',
    'Survey Design',
    'Thematic Analysis',
    'Persona Development',
    'Requirements Engineering',
    'Requirements Traceability',
    'Information Architecture',
    'Design Systems',
    'React',
    'TypeScript',
    'Automated Testing (Vitest)',
    'Accessibility',
    'GDPR / DSGVO',
    'Public Sector',
  ],
  thumbnail: thumbnailImg,
  thumbnailWebp,
  heroImage: '/projects/digitalising-ibs-travel-reimbursements/hero-illustration.png',

  methods: [
    { en: 'Insider process observation (AS-IS)',              de: 'Insider-Prozessbeobachtung (IST-Zustand)' },
    { en: 'Expert validation interviews (n=2: administration, accounting)', de: 'Experten-Validierungsinterviews (n=2: Verwaltung, Buchhaltung)' },
    { en: 'Participant survey (n=6 and open, anonymous, BL cohort so far)', de: 'Teilnehmenden-Umfrage (n=6, laufend, anonym, bisher BL-Kohorte)' },
    { en: 'Document & artefact analysis',                     de: 'Dokumenten- & Artefaktanalyse' },
    { en: 'Thematic analysis / affinity clustering',          de: 'Thematische Analyse / Affinity Clustering' },
    { en: 'Stakeholder mapping',                              de: 'Stakeholder-Mapping' },
    { en: 'UML activity diagrams (swimlane)',                 de: 'UML-Aktivitätsdiagramme (Swimlane)' },
    { en: '5W1H problem framing',                             de: '5W1H-Problemrahmung' },
    { en: 'Persona development with provenance labelling',    de: 'Personaentwicklung mit Herkunftskennzeichnung' },
    { en: 'Requirements traceability (FR / NFR / P-IDs)',     de: 'Anforderungs-Traceability (FR / NFR / P-IDs)' },
    { en: 'Information architecture & state modelling',       de: 'Informationsarchitektur & Zustandsmodellierung' },
    { en: 'Single-case cycle-time observation (right-censored)', de: 'Einzelfall-Beobachtung der Bearbeitungsdauer (rechtszensiert)' },
    { en: 'Built-in usage instrumentation (pseudonymous, local-only)', de: 'Eingebaute Nutzungs-Instrumentierung (pseudonym, nur lokal)' },
  ],

  // Every number here is either a count of an artefact that exists, or a
  // measurement with its method named in the label. Claims without a
  // mechanism ("100%", "~4 wks estimate") were removed or replaced with the
  // measured version.
  metrics: [
    { value: '25', label: { en: 'problems documented — six added by the participant survey', de: 'dokumentierte Probleme — sechs durch die Teilnehmenden-Umfrage ergänzt' } },
    { value: 'n=6', label: { en: 'survey responses so far (survey open; PK cohort not yet reached — stated on every figure)', de: 'Umfrage-Antworten bisher (Umfrage offen; PK-Kohorte noch nicht erreicht — auf jeder Abbildung vermerkt)' } },
    { value: '7', label: { en: 'personas, each with its provenance stated', de: 'Personas, jede mit angegebener Herkunft' } },
    { value: '9', label: { en: 'actors mapped across 13 steps and 4 return loops', de: 'Akteure über 13 Schritte und 4 Rückschleifen kartiert' } },
    { value: '43+', label: { en: 'days and still unpaid — one claim traced end to end through the paper process: 8 days sitting unseen, 1 day of admin work, the rest downstream and invisible', de: 'Tage und weiter unbezahlt — ein Antrag durchgängig im Papierprozess verfolgt: 8 Tage unbemerkt liegend, 1 Tag Bearbeitung, der Rest nachgelagert und unsichtbar' } },
    { value: { en: 'NO TRIGGER', de: 'KEIN AUSLÖSER' }, label: { en: 'Private-vehicle claims were never prompted for — a PKW claim depends entirely on the participant remembering', de: 'PKW-Anträge wurden nie abgefragt — ein PKW-Antrag hängt allein am Erinnern der Teilnehmenden' } },
    { value: '4/6', label: { en: 'respondents do not know how their amount is calculated; two have stopped trying', de: 'Befragte wissen nicht, wie ihr Betrag berechnet wird; zwei haben aufgehört, es zu versuchen' } },
    { value: '5', label: { en: 'role-based interfaces built and wired', de: 'rollenbasierte Oberflächen gebaut und verdrahtet' } },
    { value: '1,234', label: { en: 'automated tests — including guards that fail the build on an untraced requirement citation or a design-token drift', de: 'automatisierte Tests — darunter Guards, die den Build bei unbelegten Anforderungszitaten oder Token-Abweichungen scheitern lassen' } },
  ],

  techStack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Vitest',
    'Node.js Server (Fastify)',
    'SQLite',
    'SheetJS / Local Excel Files',
    'Nextcloud WebDAV Integration',
    'SVG (hand-authored diagrams)',
    'Claude Design (wireframes)',
  ],

  about: {
    en: 'A solo end-to-end project digitalising a paper-heavy travel reimbursement process at a publicly funded institute: thirteen steps, nine actors, one shared Excel file — and participants who learn their claim arrived only when money appears, or doesn\u2019t. I researched the process as its administrator, built the replacement as its developer, and instrumented both, so every claim in this case study traces to a survey answer, a process map, or a line of code. Status: demo delivered to the institute, change request received, evaluation pending deployment.',
    de: 'Ein alleinverantwortliches End-to-End-Projekt zur Digitalisierung eines papierlastigen Fahrtkostenerstattungsprozesses an einem öffentlich geförderten Institut: dreizehn Schritte, neun Akteure, eine geteilte Excel-Datei — und Teilnehmende, die erst am eintreffenden Geld erkennen, dass ihr Antrag angekommen ist. Ich habe den Prozess als seine Administratorin erforscht, den Ersatz als seine Entwicklerin gebaut und beides instrumentiert — jede Aussage dieser Fallstudie führt auf eine Umfrageantwort, eine Prozesskarte oder eine Codezeile zurück. Status: Demo an das Institut übergeben, Änderungswünsche erhalten, Evaluation steht nach dem Deployment an.',
  },

  challengeQuote: {
    en: 'A thirteen-step paper process with four return loops forced the most vulnerable participants to wait weeks for their money — without any way of knowing where it was.',
    de: 'Ein dreizehnstufiger Papierprozess mit vier Rückschleifen zwang die vulnerabelsten Teilnehmenden, wochenlang auf ihr Geld zu warten — ohne jede Möglichkeit zu wissen, wo es blieb.',
  },
  challenge: {
    en: 'Every month, participants in a state-funded qualification programme claim back their travel costs. On paper it is a form. In practice, three unconnected intake channels fed one manual Excel file, held together by a single unstaffed administrative role. Whenever the process broke, participants submitted into a void with no visible calculation and no confirmation. Four of six survey respondents could not say how long reimbursement takes — that is not a data gap, it is the finding: nothing in the process tells them. The failure was structural, not clerical.',
    de: 'Jeden Monat fordern Teilnehmende eines staatlich geförderten Qualifizierungsprogramms ihre Fahrtkosten zurück. Auf dem Papier ist das ein Formular. In der Praxis speisten drei unverbundene Einreichungskanäle eine manuelle Excel-Datei, zusammengehalten von einer unbesetzten administrativen Rolle. Wenn der Prozess brach, reichten Teilnehmende ins Leere ein, ohne sichtbare Berechnung oder Bestätigung. Vier von sechs Befragten konnten nicht sagen, wie lange die Erstattung dauert — das ist keine Datenlücke, das ist der Befund: Nichts im Prozess sagt es ihnen. Das Versagen war strukturell, nicht schreibtechnisch.',
  },

  solutionQuote: {
    en: 'Nothing calculated is ever stored: the database holds what a person typed, and every role rebuilds the amount from the same fields through the same computation — a stale figure is not unlikely, it is unrepresentable.',
    de: 'Nichts Berechnetes wird je gespeichert: Die Datenbank hält, was eingetippt wurde, und jede Rolle baut den Betrag aus denselben Feldern durch dieselbe Berechnung neu auf — eine veraltete Zahl ist nicht unwahrscheinlich, sie ist nicht darstellbar.',
  },
  solution: {
    en: 'The role-based web application replaces the shared spreadsheet with five purpose-built views. Participants get a mobile-first upload path with camera capture and an optional guided step-by-step mode for lower digital fluency. The claim moves through an explicit state machine, so "where is my money" has an on-screen answer for the first time. Amounts make the round trip instead of being stored: the database holds only the typed fields — ticket type, price, distance, attendance — and the amount is rebuilt in the browser from the same pure computation every time any role opens the record, with its full formula trace visible. Persistence sits behind adapters over a local SQLite database, with stored proofs mirrored to the institute\u2019s own Nextcloud; the one named external call is a route lookup to Google Maps when staff check a driving distance, stated in the data-protection documentation rather than hidden.',
    de: 'Die rollenbasierte Webanwendung ersetzt die geteilte Tabelle durch fünf zweckgebaute Ansichten. Teilnehmende erhalten einen mobile-first Upload-Pfad mit Kamerafunktion und einem optionalen geführten Schritt-für-Schritt-Modus. Der Antrag durchläuft eine explizite Zustandsmaschine — „Wo ist mein Geld?" hat damit erstmals eine Antwort auf dem Bildschirm. Beträge machen die Rundreise, statt gespeichert zu werden: Die Datenbank hält nur die eingegebenen Felder — Ticketart, Preis, Entfernung, Anwesenheit — und der Betrag wird bei jedem Öffnen des Datensatzes von jeder Rolle aus derselben reinen Berechnung neu aufgebaut, mit sichtbarer Formel-Nachvollziehbarkeit. Die Datenhaltung liegt hinter Adaptern über einer lokalen SQLite-Datenbank, gespeicherte Nachweise werden zusätzlich in die institutseigene Nextcloud gespiegelt; der eine benannte externe Aufruf ist eine Routenabfrage an Google Maps bei der Entfernungsprüfung durch Mitarbeitende — in der Datenschutz-Dokumentation ausgewiesen statt versteckt.',
  },

  methodologyQuote: {
    en: 'Because I already knew the workflow from the inside, the first UX research task was strictly about making my own assumptions falsifiable.',
    de: 'Da ich den Ablauf bereits von innen kannte, bestand die erste UX-Research-Aufgabe strikt darin, meine eigenen Annahmen falsifizierbar zu machen.',
  },

  methodology: {
    en: 'I reconstructed the AS-IS process as swimlane activity diagrams, framed the problem space with 5W1H, and mapped nine stakeholders. Two expert validation interviews — one with an independent administrator, one with a member of the accounting team — checked the failure set against the administrative and the financial view of the process; the participant survey (n=6 and open, one cohort so far) then reversed one of my priorities and added six problems I had not observed from the inside. Every problem carries an evidence grade — confirmed, indicative, hypothesis, untested — and counts confirm or reframe a problem, never size it. Phase 2 turned the clustered problems into numbered requirements, a role-based sitemap, and the IBS-DesignSystem, where the nine lane colours of the research map are the nine role colours of the app. Phase 3 engineered the calculation rules as pure, unit-tested TypeScript, with a build-failing test that keeps every requirement citation in code traced to its source problem — and states its own limit: it catches a citation without a source, not a problem without an implementation.',
    de: 'Ich rekonstruierte den IST-Prozess als Swimlane-Aktivitätsdiagramme, rahmte den Problemraum mit 5W1H und kartierte neun Stakeholder. Zwei Experten-Validierungsinterviews — mit einer unabhängigen Verwaltungskraft und einem Mitglied der Buchhaltung — prüften die Fehlermenge aus administrativer und finanzieller Sicht; die Teilnehmenden-Umfrage (n=6, laufend, bisher eine Kohorte) kehrte anschließend eine meiner Prioritäten um und ergänzte sechs Probleme, die ich von innen nicht gesehen hatte. Jedes Problem trägt ein Evidenzlabel — bestätigt, indikativ, Hypothese, ungeprüft — und Zählungen bestätigen oder reframen ein Problem, sie beziffern es nie. Phase 2 verwandelte die geclusterten Probleme in nummerierte Anforderungen, eine rollenbasierte Sitemap und das IBS-DesignSystem, dessen neun Rollenfarben die neun Spurfarben der Forschungskarte sind. Phase 3 entwickelte die Berechnungsregeln als reines, unit-getestetes TypeScript — mit einem Build-brechenden Test, der jedes Anforderungszitat im Code auf sein Quellproblem zurückführt, und der seine eigene Grenze benennt: Er erkennt ein Zitat ohne Quelle, nicht ein Problem ohne Umsetzung.',
  },

  // Honest status. The stakeholder demo happened and produced a change
  // request; task-based evaluation has not run; and the strongest evidence so
  // far comes from measuring the paper process and from the instrumentation
  // finding its own bugs. No projected outcomes, no "early qualitative
  // feedback indicates".
  results: {
    en: 'The institute saw the working demo on 18 August 2026 and responded with a change request — improvements to existing features and new ones to build, which is the strongest signal an unreleased tool gets. Task-based evaluation has deliberately not run yet: the guided tasks, the event log, and the end-of-session questionnaire are built into the app, but scripting an evaluation on a prototype nobody uses daily would measure compliance, not use, so it waits for the deployment. Meanwhile the measurement has started where it can: one claim traced end to end through the current paper process — uploaded 5 July, noticed 8 days later, processed in a single day, and still unpaid after four checks, at least 43 days and counting, with the entire delay sitting in the segments no one in the process can see. The app\u2019s own instrumentation has already earned its place: run against my development traffic, it caught three of its own measurement bugs — sessions that never closed, a timer anchored to the wrong event, 690 logged records that were really 45 sittings — before any reviewer ever touched it.',
    de: 'Das Institut sah die laufende Demo am 18. August 2026 und antwortete mit einem Änderungsauftrag — Verbesserungen an bestehenden Funktionen und neue Features. Ein stärkeres Signal bekommt ein unveröffentlichtes Werkzeug nicht. Die aufgabenbasierte Evaluation lief bewusst noch nicht: Geführte Aufgaben, Ereignisprotokoll und Abschlussfragebogen sind in die App eingebaut, aber eine skriptgeführte Evaluation an einem Prototyp, den niemand täglich nutzt, würde Folgsamkeit messen statt Nutzung — sie wartet auf das Deployment. Gemessen wird unterdessen dort, wo es geht: ein Antrag durchgängig im aktuellen Papierprozess verfolgt — hochgeladen am 5. Juli, bemerkt 8 Tage später, an einem Tag bearbeitet, nach vier Kontrollen weiter unbezahlt, mindestens 43 Tage und zählend, wobei die gesamte Verzögerung in den Abschnitten liegt, die niemand im Prozess einsehen kann. Und die eingebaute Instrumentierung hat sich bereits bewährt: Auf meinen eigenen Entwicklungsdaten fand sie drei ihrer eigenen Messfehler — nie endende Sitzungen, einen falsch verankerten Timer, 690 protokollierte Datensätze, die in Wahrheit 45 Arbeitssitzungen waren — bevor je ein Reviewer sie berührte.',
  },
  // Replaces `resultsDetail: true`, which was a no-op: the renderer read the
  // flag as `!== false`, so setting it true did exactly what omitting it did,
  // and the strip it was meant to govern rendered under a hardcoded "Study at
  // a Glance" heading — a study label over a set of artefact counts, for a
  // project whose evaluation has not run. The strip now renders from whatever
  // field is present, and this one supplies both its heading and its items.
  //
  // Every value here is measured and none is an outcome of the app: two are
  // measurements of the *paper* process and of the instrumentation itself,
  // one is a count of bugs the event log found in its own data, one is a
  // dated event. No projected reductions, no targets, nothing phrased as a
  // result of the tool — it has no usage results yet. `metrics` stays
  // untouched above: the project card reads it for its own row.
  resultsAtAGlance: {
    title: { en: 'Measured so far', de: 'Bisher gemessen' },
    items: [
      {
        value: '43+',
        label: {
          en: 'days, one claim traced end to end through the paper process — still unpaid, right-censored',
          de: 'Tage, ein Antrag durchgängig im Papierprozess verfolgt — weiter unbezahlt, rechtszensiert',
        },
      },
      {
        value: '690 → 45',
        label: {
          en: 'logged records collapsed to real sittings after the instrumentation caught its own session bug',
          de: 'protokollierte Datensätze, zu echten Sitzungen zusammengeführt, nachdem die Instrumentierung ihren eigenen Sitzungsfehler fand',
        },
      },
      {
        value: '3',
        label: {
          en: 'measurement bugs the event log found in itself before any reviewer used it',
          de: 'Messfehler, die das Ereignisprotokoll an sich selbst fand, bevor je ein Reviewer es nutzte',
        },
      },
      {
        value: '1',
        label: {
          en: 'stakeholder demo → one change request (18 Aug 2026)',
          de: 'Stakeholder-Demo → ein Änderungsauftrag (18. Aug 2026)',
        },
      },
    ],
  },

  // What is deliberately not built or not switched on. This section is what
  // makes every other claim on the page believable.
  notBuilt: {
    title: { en: 'What is deliberately not built (yet)', de: 'Was bewusst (noch) nicht gebaut ist' },
    items: [
      {
        en: 'Digital signature (Modus B) is implemented but switched off, pending a ruling from finance and the data-protection officer. Paper signature remains the default because it fails safe.',
        de: 'Die digitale Unterschrift (Modus B) ist implementiert, aber deaktiviert — bis Finanzen und Datenschutzbeauftragte entschieden haben. Die Papierunterschrift bleibt Standard, weil sie sicher ausfällt.',
      },
      {
        en: 'The PAID status exists in the state machine and is reserved to Accounting — and no screen produces it yet, because the payment leg of the process is not digital. The status is modelled, unreachable, and says so.',
        de: 'Der Status AUSGEZAHLT existiert in der Zustandsmaschine und ist der Buchhaltung vorbehalten — und noch erzeugt ihn kein Screen, weil der Auszahlungsschritt nicht digital ist. Der Status ist modelliert, unerreichbar, und sagt das.',
      },
      {
        en: 'Deputy auto-activation is displayed but not automated, waiting on a real absence status to key from.',
        de: 'Die automatische Vertretungsaktivierung wird angezeigt, aber nicht automatisiert — sie wartet auf einen echten Abwesenheitsstatus.',
      },
      {
        en: 'The participant survey has not yet reached the PK cohort or any Abo-Karte holder — the branch of the process with the strongest claims carries the least evidence, and every figure says so.',
        de: 'Die Umfrage hat die PK-Kohorte und Abo-Karte-Nutzende noch nicht erreicht — der Prozesszweig mit den stärksten Annahmen trägt die wenigste Evidenz, und jede Abbildung vermerkt das.',
      },
      {
        en: 'A phone-width layout for the signed-in app shell is in progress — my own survey says most participants submit from a phone, and my own build did not honour that below 768px until the finding forced it.',
        de: 'Ein Telefon-Layout für die angemeldete App-Shell ist in Arbeit — die eigene Umfrage zeigt, dass die meisten Teilnehmenden per Handy einreichen, und der eigene Build hielt das unter 768px nicht ein, bis der Befund es erzwang.',
      },
    ],
  },

  figures: {
    challenge: [
      // The Phase 1 problem frame sits ahead of the activity diagram on
      // purpose: it states the failure in plain language in six columns, so a
      // reader arrives at the nine-lane swimlane already knowing what to look
      // for in it. Five of its six columns are diagnosis; the sixth is the
      // brief the solution section then answers.
      {
        type: 'image',
        src: fiveW1HFrame,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Problem frame · 5W1H', de: 'Problemrahmung · 5W1H' },
        title: {
          en: 'The problem, asked six ways',
          de: 'Das Problem, in sechs Fragen gestellt',
        },
        description: {
          en: 'One column per question. The first five are diagnosis — a hybrid paper-heavy monthly cycle, a deadline on the 15th against a payout weeks later, three intake channels feeding one Excel file with zero integration, nine roles meeting at a single Admin, and the four places the process predictably breaks. The sixth turns that into the brief: mobile-first upload, visible claim status, enforced calculation rules, digital approvals.',
          de: 'Eine Spalte je Frage. Die ersten fünf sind Diagnose — ein hybrider, papierlastiger Monatszyklus, eine Frist zum 15. gegen eine Auszahlung Wochen später, drei Einreichungskanäle in einer Excel-Datei ohne jede Integration, neun Rollen, die bei einer einzigen Verwaltungskraft zusammenlaufen, und die vier Stellen, an denen der Prozess vorhersehbar bricht. Die sechste macht daraus das Briefing: mobile-first Upload, sichtbarer Antragsstatus, erzwungene Berechnungsregeln, digitale Genehmigungen.',
        },
        alt: {
          en: 'Six-column 5W1H problem-framing board — What, When, Where, Who, Why, How — each column with a headline and three or four bullet findings about the AS-IS reimbursement process',
          de: 'Sechsspaltige 5W1H-Problemrahmung — Was, Wann, Wo, Wer, Warum, Wie — jede Spalte mit einer Überschrift und drei bis vier Stichpunkt-Befunden zum IST-Erstattungsprozess',
        },
        caption: {
          en: '5W1H problem frame — Phase 1',
          de: '5W1H-Problemrahmung — Phase 1',
        },
      },
      // Between the problem frame and the swimlane on purpose. The 5W1H says
      // what breaks; this says who is in the room and which of them the whole
      // process runs through — so the reader meets the nine actors by name
      // before the activity diagram shows the same nine in motion, and the
      // "single administrative role" the challenge text names is visible as a
      // structural fact rather than a claim. Like the 5W1H, its second half
      // turns diagnosis into brief: the four quadrant strategies are the
      // engagement decisions the solution section then answers.
      //
      // NOTE: description uses the sanitised role labels (Kostenstelle,
      // Finanzsystem, DMS) — the artefact itself was regenerated 2026-08-19
      // after the internal identifiers were removed. If the exported PNG
      // still shows the old labels, re-export before publishing.
      {
        type: 'image',
        src: stakeholderMap,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Stakeholder map · Phase 1', de: 'Stakeholder-Map · Phase 1' },
        title: {
          en: 'Nine actors, one integration point',
          de: 'Neun Akteure, ein Integrationspunkt',
        },
        description: {
          en: 'Left, proximity to the process: the Admin and the participants sit in the core as the single integration point — every other party reaches a claim through them. Around that core, three direct stakeholders (lecturer, approver, the programme\u2019s cost centre) and four indirect ones (parent-organisation finance, the finance system, the document-management system, internship coordination). Right, the same nine placed by influence against interest. The participants land low-influence, high-interest: the people the process exists for have the least power to move it, which is why their quadrant strategy is radical transparency rather than another approval step.',
          de: 'Links die Nähe zum Prozess: Verwaltung und Teilnehmende bilden den Kern als einzigen Integrationspunkt — alle anderen Beteiligten erreichen einen Antrag nur über sie. Um diesen Kern herum drei direkte Stakeholder (Dozent, Genehmiger, Kostenstelle der Maßnahme) und vier indirekte (Finanzen des Trägers, Finanzsystem, Dokumentenmanagement, Praktikumskoordination). Rechts dieselben neun, eingeordnet nach Einfluss gegen Interesse. Die Teilnehmenden landen bei geringem Einfluss und hohem Interesse: Diejenigen, für die der Prozess existiert, können ihn am wenigsten bewegen — deshalb lautet ihre Quadrantenstrategie radikale Transparenz statt eines weiteren Genehmigungsschritts.',
        },
        alt: {
          en: 'Two-panel stakeholder map. Left: concentric proximity rings with the Admin and participants at the core marked as the single integration point, three direct stakeholders in the inner ring and four indirect ones in the outer ring. Right: an influence-against-interest matrix placing the same nine actors across the Manage Closely, Keep Satisfied, Keep Informed and Monitor quadrants, each quadrant labelled with an engagement strategy.',
          de: 'Zweiteilige Stakeholder-Map. Links: konzentrische Näheringe mit Verwaltung und Teilnehmenden im Kern, markiert als einziger Integrationspunkt, drei direkten Stakeholdern im inneren Ring und vier indirekten im äußeren Ring. Rechts: eine Einfluss-Interesse-Matrix, die dieselben neun Akteure auf die Quadranten Manage Closely, Keep Satisfied, Keep Informed und Monitor verteilt, jeder Quadrant mit einer Engagement-Strategie beschriftet.',
        },
        caption: {
          en: 'Stakeholder map — proximity and influence × interest, Phase 1',
          de: 'Stakeholder-Map — Nähe und Einfluss × Interesse, Phase 1',
        },
      },
      {
        type: 'image',
        src: umlPreview,
        href: `${DOCS}/UML/Detailed-UML.html`,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Activity diagram · AS-IS', de: 'Aktivitätsdiagramm · IST-Zustand' },
        title: {
          en: 'The thirteen-step claim, mapped across nine lanes',
          de: 'Der dreizehnstufige Antrag, über neun Spuren kartiert',
        },
        description: {
          en: 'One monthly cycle, end to end. The left half is the collection and calculation work the Admin carries alone; the right half is the approval chain that only starts once the paper packet has been scanned. Grey arrows are hand-offs, red arrows are return loops.',
          de: 'Ein Monatszyklus, durchgängig. Die linke Hälfte ist die Sammel- und Berechnungsarbeit, die die Verwaltung allein trägt; die rechte Hälfte ist die Genehmigungskette, die erst beginnt, wenn das Papierpaket gescannt ist. Graue Pfeile sind Übergaben, rote Pfeile Rückschleifen.',
        },
        alt: {
          en: 'Swimlane activity diagram of the AS-IS reimbursement process across nine actor lanes, with hand-off and return arrows',
          de: 'Swimlane-Aktivitätsdiagramm des IST-Erstattungsprozesses über neun Akteursspuren, mit Übergabe- und Rückschleifenpfeilen',
        },
        caption: {
          en: 'AS-IS swimlane activity diagram — preview',
          de: 'IST-Swimlane-Aktivitätsdiagramm — Vorschau',
        },
        linkLabel: { en: 'Open the diagram', de: 'Diagramm öffnen' },
      },
    ],

    solution: [
      {
        type: 'image',
        src: prototypeScreenshot,
        href: 'https://ibs-fktn.vercel.app/#/admin',
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Live Prototype · Admin View', de: 'Live-Prototyp · Admin-Ansicht' },
        title: {
          en: 'High-density data overview with explicit states',
          de: 'Hohe Informationsdichte mit expliziten Zuständen',
        },
        description: {
          en: 'The table view provides the Admin with complete information density at a glance. It exposes missing receipts, attendance fractions, and exact calculated amounts side-by-side with the explicit claim status, effectively eliminating the manual chase loop.',
          de: 'Die Tabellenansicht bietet der Administration die volle Informationsdichte auf einen Blick. Sie zeigt fehlende Belege, Anwesenheitsquoten und exakt berechnete Beträge direkt neben dem expliziten Antragsstatus und eliminiert so die manuelle Nachlaufschleife.',
        },
        alt: {
          en: 'Admin dashboard prototype showing a dense table of participants, transport methods, missing receipts, calculated amounts, and current claim statuses',
          de: 'Admin-Dashboard-Prototyp, der eine dichte Tabelle mit Teilnehmenden, deren Verkehrsmitteln, fehlenden Belegen, berechneten Beträgen und aktuellen Antragsstatus zeigt',
        },
        caption: {
          en: 'Admin view — Table overview',
          de: 'Admin-Ansicht — Tabellenübersicht',
        },
        linkLabel: {
          en: 'Open the table view',
          de: 'Tabellenansicht öffnen',
        },
      },
      // The corrected architecture diagram — the third version. The first
      // drew a waterfall (amount falls into the database); reading the code
      // proved the opposite, and the artefact that graded the first version
      // WRONG/IMPRECISE line-by-line is part of the project record. This one
      // is verified against commit 47b0301.
      //
      // Imported rather than referenced through DOCS: the PNG sits in this
      // folder under src/, so Vite bundles and fingerprints it. DOCS points
      // into public/, which serves only the two standalone HTML documents.
      {
        type: 'image',
        src: architectureDiagram,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Architecture · verified against the code', de: 'Architektur · am Code verifiziert' },
        title: {
          en: 'The reimbursement round trip',
          de: 'Die Rundreise der Erstattung',
        },
        description: {
          en: 'Read the arrows in pairs: down carries what a person typed, up carries the same fields straight back. The amount exists only in the top half — computed in the browser by one shared rule module, never stored. The database holds no amount column and no trace column, which is why every role sees the identical figure and why no stored number can drift from the rule that produced it. Below the line, one guard underneath every server route refuses requests for someone else’s record by default, and every stored proof is mirrored to the institute’s own Nextcloud — which the app may write to but never delete from. The one named third-party call is the route lookup: staff type two addresses, nothing from a record is prefilled. The lower half describes the self-hosted target, implemented and tested; the public demo runs the top half alone, in the browser, on fictional data.',
          de: 'Die Pfeile paarweise lesen: abwärts fließt, was eingetippt wurde, aufwärts kommen dieselben Felder unverändert zurück. Der Betrag existiert nur in der oberen Hälfte — im Browser von einem gemeinsamen Regelmodul berechnet, nie gespeichert. Die Datenbank hat keine Betrags- und keine Trace-Spalte; deshalb sehen alle Rollen dieselbe Zahl, und keine gespeicherte Zahl kann von der Regel abweichen, die sie erzeugt hat. Unter der Linie verweigert ein Guard unterhalb jeder Server-Route standardmäßig den Zugriff auf fremde Datensätze, und jeder gespeicherte Nachweis wird in die institutseigene Nextcloud gespiegelt — in die die App schreiben, aus der sie aber nie löschen darf. Der eine benannte Drittanbieter-Aufruf ist die Routenabfrage: Mitarbeitende tippen zwei Adressen, nichts wird aus einem Datensatz vorbefüllt. Die untere Hälfte beschreibt das selbst gehostete Zielsystem, implementiert und getestet; die öffentliche Demo betreibt allein die obere Hälfte, im Browser, auf fiktiven Daten.',
        },
        alt: {
          en: 'Architecture diagram in two dashed regions. “The browser” holds Screens, Rules and Storage connected by a round trip of arrows: typed fields flow down, stored fields flow back up, and the amount with its full trace exists only between Rules and Screens. “Inside the institute” holds a Fastify server with a default-deny repo guard, a SQLite database with no amount column, and a Nextcloud mirror for proof files. A red side panel marks the single external call: a Google Maps route lookup typed by staff.',
          de: 'Architekturdiagramm in zwei gestrichelten Bereichen. „Der Browser“ enthält Screens, Regeln und Storage, verbunden durch eine Rundreise von Pfeilen: Eingetippte Felder fließen abwärts, gespeicherte Felder kommen zurück, und der Betrag mit seiner Nachvollziehbarkeit existiert nur zwischen Regeln und Screens. „Im Institut“ liegen ein Fastify-Server mit Default-Deny-Guard, eine SQLite-Datenbank ohne Betragsspalte und eine Nextcloud-Spiegelung für Nachweise. Ein rotes Seitenpanel markiert den einzigen externen Aufruf: eine von Mitarbeitenden getippte Google-Maps-Routenabfrage.',
        },
        caption: {
          en: 'Application architecture — round trip',
          de: 'Anwendungsarchitektur — Rundreise',
        },
      },
    ],

    methodology: [
      {
        type: 'image',
        src: personaPreview,
        href: `${DOCS}/Personas/Persona.html`,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Personas · provenance-labelled', de: 'Personas · mit Herkunftskennzeichnung' },
        title: {
          en: 'Seven personas, each carrying its own evidence',
          de: 'Sieben Personas, jede mit eigener Evidenz',
        },
        description: {
          en: 'One composite per role across the nine mapped actors — administration, participants, lecturer, approvers, finance. Each card pairs the role with a verbatim from the research and states where that reading came from, so a composite is never mistaken for a portrait of an individual.',
          de: 'Eine Komposit-Persona je Rolle über die neun kartierten Akteure — Verwaltung, Teilnehmende, Dozent, Genehmigende, Finanzen. Jede Karte verbindet die Rolle mit einem Originalzitat aus der Forschung und benennt die Herkunft dieser Lesart, damit ein Komposit nie für das Porträt einer einzelnen Person gehalten wird.',
        },
        alt: {
          en: 'Persona set: seven cards, each with a role, an icon and a verbatim quote',
          de: 'Persona-Set: sieben Karten, jeweils mit Rolle, Icon und Originalzitat',
        },
        caption: { en: 'Persona set — preview', de: 'Persona-Set — Vorschau' },
        linkLabel: { en: 'Open the personas', de: 'Personas öffnen' },
      },
      // The Phase 2 artefact the methodology text names. It sits here rather
      // than under `solution` because the point is not how the app looks — it
      // is that the nine lane colours from the AS-IS activity diagram became
      // the app's role palette unchanged, so the research and the build read
      // as one system.
      {
        type: 'image',
        src: designSystemSheet,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Design system · Phase 2', de: 'Designsystem · Phase 2' },
        title: {
          en: 'One palette, from swimlane to shipped screen',
          de: 'Eine Palette, von der Swimlane bis zum ausgelieferten Screen',
        },
        description: {
          en: 'The IBS-DesignSystem sheet: brand colours, the nine-lane role palette, note states, the type scale, buttons and status chips, the activity-box connector, and form-field states. The nine role colours are the same nine lane colours used in the AS-IS activity diagram — so a lane in the research reads as the same actor as a badge in the app, and nothing has to be re-learned between the two.',
          de: 'Das IBS-DesignSystem-Blatt: Markenfarben, die neunfarbige Rollenpalette, Notizzustände, die Typo-Skala, Buttons und Status-Chips, der Aktivitätsbox-Konnektor und Formularfeld-Zustände. Die neun Rollenfarben sind dieselben neun Spurfarben des IST-Aktivitätsdiagramms — eine Spur in der Forschung steht damit für denselben Akteur wie ein Badge in der App, und zwischen beiden muss nichts neu gelernt werden.',
        },
        alt: {
          en: 'IBS design system sheet: brand colour swatches, a nine-colour role palette labelled by actor, note-state boxes, type scale, buttons and status chips, an activity box with connector, and form-field states',
          de: 'IBS-Designsystem-Blatt: Markenfarbfelder, eine neunfarbige, nach Akteur beschriftete Rollenpalette, Notizzustands-Boxen, Typo-Skala, Buttons und Status-Chips, eine Aktivitätsbox mit Konnektor sowie Formularfeld-Zustände',
        },
        caption: {
          en: 'IBS-DesignSystem — tokens, role palette, and components',
          de: 'IBS-DesignSystem — Tokens, Rollenpalette und Komponenten',
        },
      },
    ],
  },

  // A live build is the strongest evidence an in-progress project can offer:
  // evaluation has no results yet, but the thing itself is open and clickable.
  // Runs on the demo adapter — fictional data pinned as fictional by a test,
  // external data sources disabled — so the link is safe to hand to a stranger.
  prototype: {
    en: 'The deployed build runs all five role interfaces on demo data, entirely in the browser behind the demo adapter — a static build with no server, which is exactly what makes it safe to hand to a stranger. It exercises the claim state machine — In Prüfung → Bereit für Freigabe → Freigegeben → An Buchhaltung — and every reimbursement amount is rebuilt live from the stored fields with its formula trace visible, so the participant view, the administrator view, and the approver view resolve the same number from the same computation. One status, AUSGEZAHLT, is modelled but not yet producible: the payment leg of the real process is not digital, and the prototype says so instead of simulating it.',
    de: 'Der ausgelieferte Build führt alle fünf Rollenoberflächen auf Demodaten aus, vollständig im Browser hinter dem Demo-Adapter — ein statischer Build ohne Server, und genau das macht ihn unbedenklich weiterzugeben. Er durchläuft die Antrags-Zustandsmaschine — In Prüfung → Bereit für Freigabe → Freigegeben → An Buchhaltung — und jeder Erstattungsbetrag wird live aus den gespeicherten Feldern neu aufgebaut, mit sichtbarer Formel-Nachvollziehbarkeit, sodass Teilnehmenden-, Verwaltungs- und Genehmigendenansicht dieselbe Zahl aus derselben Berechnung ableiten. Ein Status, AUSGEZAHLT, ist modelliert, aber noch nicht erzeugbar: Der Auszahlungsschritt des realen Prozesses ist nicht digital, und der Prototyp sagt das, statt es zu simulieren.',
  },

  // Participant language from the survey (open since August 2026, n=6 so
  // far). German originals with English translations — anonymous,
  // non-identifying, quoted as given.
  verbatims: [
    {
      quote: {
        en: 'No, I just take the amount as it comes.',
        de: 'Nein, ich nehme den Betrag so, wie er kommt.',
      },
      attribution: {
        en: 'Survey respondent, asked whether they check how their reimbursement is calculated — two of six answered in exactly these words (BL cohort; translated from German)',
        de: 'Umfrageteilnehmende:r auf die Frage, ob die Berechnung der Erstattung geprüft wird — zwei von sechs antworteten wörtlich so (BL-Kohorte)',
      },
    },
    {
      quote: {
        en: 'The processing time is the hardest part for me.',
        de: 'Die Bearbeitungszeit ist für mich am schwierigsten.',
      },
      attribution: {
        en: 'Survey respondent (n=6, BL cohort) — four of six named processing time as their main difficulty; translated from German',
        de: 'Umfrageteilnehmende:r (n=6, BL-Kohorte) — vier von sechs nannten die Bearbeitungszeit als größte Schwierigkeit',
      },
    },
    {
      quote: {
        en: 'I don\u2019t check it.',
        de: 'Ich prüfe es nicht.',
      },
      attribution: {
        en: 'Survey respondent, asked how they know their documents arrived — five of six have no reliable way of knowing: four wait for the money, one has stopped checking altogether (translated from German)',
        de: 'Umfrageteilnehmende:r auf die Frage, woher sie wissen, dass ihre Unterlagen angekommen sind — fünf von sechs haben keinen verlässlichen Weg: vier warten auf das Geld, eine:r prüft gar nicht mehr',
      },
    },
  ],

  prototypeUrl: 'https://ibs-fktn.vercel.app/',
  prototypeUrlLabel: {
    en: 'Open the live prototype',
    de: 'Live-Prototyp öffnen',
  },

  // No `outcome` block: it renders inside the Results section, and the only
  // honest content is already in `results`. `adoption` stays off too — an
  // "Outcome Unknown" pill reads as a verdict on the project instead of a
  // statement that the work is running.

  // Every pointer below resolves to a field that exists in THIS file.
  tagEvidence: [
    { tag: 'UX Research', evidence: 'methods: "Insider process observation (AS-IS)", "Expert validation interviews", "Participant survey (n=6 and open)"; verbatims quotes three of those respondents, and metrics records six of the 25 documented problems as survey-contributed', status: 'evidenced' },
    { tag: 'Service Design', evidence: 'methods: "Stakeholder mapping" + "UML activity diagrams (swimlane)"; figures.challenge maps one monthly cycle end to end across nine actor lanes, 13 steps, and four return loops. No rendered service blueprint exists yet, and the TO-BE is delivered as role-based views and a claim state machine — a UI redesign of the service, not a blueprint of it', status: 'thin' },
    { tag: 'Survey Design', evidence: 'methods: "Participant survey (n=6 and open, anonymous)"; metrics: "25 problems documented — six added by the participant survey"; verbatims carries three responses quoted as given; the unreached PK cohort is stated as a limit rather than hidden', status: 'evidenced' },
    { tag: 'Thematic Analysis', evidence: 'methods: "Thematic analysis / affinity clustering"; methodology describes clustering the observed problems into structural themes with per-problem evidence grades', status: 'evidenced' },
    { tag: 'Persona Development', evidence: 'figures.methodology: "Seven personas, each carrying its own evidence" — one composite per role, each stating where its reading came from; metrics: "7 personas, each with its provenance stated"', status: 'evidenced' },
    { tag: 'Requirements Engineering', evidence: 'methodology: "Phase 2 turned the clustered problems into numbered requirements, a role-based sitemap"; methods: "Requirements traceability (FR / NFR / P-IDs)"', status: 'evidenced' },
    { tag: 'Requirements Traceability', evidence: 'methodology: a build-failing test keeps every requirement citation in code traced to its source problem, and states its own limit — it catches a citation without a source, not a problem without an implementation', status: 'evidenced' },
    { tag: 'Information Architecture', evidence: 'methods: "Information architecture & state modelling"; solution: five purpose-built role views replacing one shared spreadsheet, plus the explicit claim state machine; prototype names the one modelled-but-unreachable status honestly', status: 'evidenced' },
    { tag: 'Design Systems', evidence: 'figures.methodology: "One palette, from swimlane to shipped screen" — the IBS-DesignSystem sheet, with the research diagram\u2019s lane colours carried unchanged into the shipped UI; a token guard test fails the build on drift between the sheet and the code', status: 'evidenced' },
    { tag: 'React', evidence: 'techStack rendered as Tech Stack chips under Methodology; metrics: "5 role-based interfaces built and wired"; prototype: the deployed build runs all five of them', status: 'evidenced' },
    { tag: 'TypeScript', evidence: 'methodology: "Phase 3 engineered the calculation rules as pure, unit-tested TypeScript"', status: 'evidenced' },
    { tag: 'Automated Testing (Vitest)', evidence: 'metrics: "1,234 automated tests — including guards that fail the build on an untraced requirement citation or a design-token drift"; techStack includes Vitest', status: 'evidenced' },
    { tag: 'Accessibility', evidence: 'solution: "an optional guided step-by-step mode", camera capture, and a mobile-first upload path — inclusive-design evidence, not a WCAG/a11y audit; notBuilt names the sub-768px shell gap openly', status: 'thin' },
    { tag: 'GDPR / DSGVO', evidence: 'solution: adapters over a local SQLite database with proofs mirrored to the institute\u2019s own Nextcloud, and the one named external call (Google Maps route lookup) stated in the data-protection documentation; the published prototype runs on the demo adapter with fictional data pinned by a test', status: 'evidenced' },
    { tag: 'Public Sector', evidence: 'challenge: "participants in a state-funded qualification programme" — direct citation of state/public funding as the programme context', status: 'evidenced' },
  ],
};

export default projectData;