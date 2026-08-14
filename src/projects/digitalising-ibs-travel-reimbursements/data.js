// Content is sourced from the IBS Fahrtkostenerstattung project documents:
// 5W1H, Stakeholders, Overview UML, Detailed UML, Current Problems, Persona,
// Information Architecture, Design System, README/DECISIONS/REQUIREMENTS.
//
// ⚠️ The prototype is still in development. `results` claims nothing — it
// reads "Work in Progress" until there is evidence to replace it with, and
// there is no `outcome` block yet. Anything not yet evidenced is marked TODO
// and left null.
//
// Process screenshots: staff names in the source decks were replaced with
// demo names before export (2026-08-13). Personas are composites, not
// portraits of individuals.
import thumbnailImg from './Project-4.png';
import thumbnailWebp from './Project-4.webp';
import prototypeScreenshot from './Fahrtkostenerstattung-—-Prototyp-08-14-2026.jpg'; // 
import umlPreview from './UML-preview.png';
import fiveW1HFrame from './5W1H.png';
import stakeholderMap from './Stakeholders.png';
import personaPreview from './Persona-preview.png';
import designSystemSheet from './IBS-Design-System.png';

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
  status: 'in-progress', // Phase 3 shipped · Phase 4 evaluation running
  stage: { en: "Evaluation in progress", de: "Evaluation läuft" },
  order: 1,
  title: {
    en: 'Digitalising IBS Travel Reimbursements',
    de: 'Digitalisierung der IBS Fahrtkostenerstattung',
  },
  subtitle: {
    en: 'Digitalizing a nine-actor, paper-heavy reimbursement workflow',
    de: 'Digitalisierung eines papierlastigen Erstattungsprozesses mit neun Akteuren',
  },
  role: {
    en: 'Solo — UX Research, UI Design, and Frontend Development',
    de: 'Alleinverantwortlich — UX Research, UI-Design und Frontend-Entwicklung',
  },
  timeline: '2026 · four phases · ongoing',
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
    { en: 'Expert validation interview',                      de: 'Experten-Validierungsinterview' },
    { en: 'Participant survey (n=5, anonymous, BL cohort)',   de: 'Teilnehmenden-Umfrage (n=5, anonym, BL-Kohorte)' },
    { en: 'Document & artefact analysis',                     de: 'Dokumenten- & Artefaktanalyse' },
    { en: 'Thematic analysis / affinity clustering',          de: 'Thematische Analyse / Affinity Clustering' },
    { en: 'Stakeholder mapping',                              de: 'Stakeholder-Mapping' },
    { en: 'UML activity diagrams (swimlane)',                 de: 'UML-Aktivitätsdiagramme (Swimlane)' },
    { en: '5W1H problem framing',                             de: '5W1H-Problemrahmung' },
    { en: 'Persona development with provenance labelling',    de: 'Personaentwicklung mit Herkunftskennzeichnung' },
    { en: 'Requirements traceability (FR / NFR / P-IDs)',     de: 'Anforderungs-Traceability (FR / NFR / P-IDs)' },
    { en: 'Information architecture & state modelling',       de: 'Informationsarchitektur & Zustandsmodellierung' },
    { en: 'Task-based evaluation build (Phase 4, in progress)', de: 'Aufgabenbasierter Evaluations-Build (Phase 4, laufend)' },
  ],

  metrics: [
    { value: '25', label: { en: 'problems documented — six added by the participant survey', de: 'dokumentierte Probleme — sechs durch die Teilnehmenden-Umfrage ergänzt' } },
    { value: 'n=5', label: { en: 'participant survey, every finding evidence-labelled', de: 'Teilnehmenden-Umfrage, jeder Befund mit Evidenzlabel' } },
    { value: '7', label: { en: 'personas, each with its provenance stated', de: 'Personas, jede mit angegebener Herkunft' } },
    { value: '9', label: { en: 'actors mapped across 13 steps and 4 return loops', de: 'Akteure über 13 Schritte und 4 Rückschleifen kartiert' } },
    { value: '4+ wks', label: { en: 'AS-IS submission-to-payout, as measured', de: 'IST-Zustand Einreichung bis Auszahlung, gemessen' } },
    { value: '~90%', label: { en: 'of PKW claims initially missed — no trigger existed', de: 'der PKW-Anträge zunächst übersehen — kein Auslöser vorhanden' } },
    { value: '100%', label: { en: 'of requirements cited in code traced to a source problem', de: 'der im Code zitierten Anforderungen auf ein Quellproblem rückverfolgt' } },
    { value: '5', label: { en: 'role-based interfaces built and wired', de: 'rollenbasierte Oberflächen gebaut und verdrahtet' } },
    { value: '158', label: { en: 'automated tests across 25 files', de: 'automatisierte Tests über 25 Dateien' } },
  ],

  techStack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Vitest',
    'Node.js Server',
    'SQLite (Local Database)',
    'SheetJS / Local Excel Files',
    'Nextcloud WebDAV Integration',
    'SVG (hand-authored diagrams)',
    'Claude Design (wireframes)',
  ],

  about: {
    en: 'A solo end-to-end project digitalising a paper-heavy travel reimbursement process at a publicly funded institute. I mapped the existing thirteen-step workflow across nine actors, then designed and built a role-based web application that replaces the shared spreadsheet with explicit claim states and fully traceable calculations. Three phases are complete; the evaluation of the working prototype is currently running.',
    de: 'Ein alleinverantwortliches End-to-End-Projekt zur Digitalisierung eines papierlastigen Fahrtkostenerstattungsprozesses an einem öffentlich geförderten Institut. Ich habe den bestehenden dreizehnstufigen Ablauf über neun Akteure kartiert und anschließend eine rollenbasierte Webanwendung entworfen und entwickelt, die die geteilte Tabelle durch explizite Antragszustände und vollständig nachvollziehbare Berechnungen ersetzt. Drei Phasen sind abgeschlossen; die Evaluation des laufenden Prototyps findet derzeit statt.',
  },

  challenge: {
    en: 'Every month, participants in a state-funded qualification programme claim back their travel costs. On paper it is a form. In practice it was a thirteen-step process spanning nine actors, three unconnected intake channels, and four backward return loops — held together by a single administrative role that had to intervene at four separate lane crossings per claim. Nothing moved without that manual push, and whenever the role was unstaffed, nobody else could see why sixteen people had not been paid. Participants submitted into a void: no confirmation, no visible calculation, and often more than four weeks before the money appeared. The failure was structural, not clerical — and the people it hurt most were the ones least able to absorb it.',
    de: 'Jeden Monat fordern Teilnehmende eines staatlich geförderten Qualifizierungsprogramms ihre Fahrtkosten zurück. Auf dem Papier ist das ein Formular. In der Praxis war es ein dreizehnstufiger Prozess über neun Akteure, drei unverbundene Einreichungskanäle und vier rückwärtsgerichtete Rückschleifen — zusammengehalten von einer einzigen administrativen Rolle, die pro Antrag an vier verschiedenen Spurwechseln manuell eingreifen musste. Ohne diesen manuellen Anstoß bewegte sich nichts, und war die Rolle unbesetzt, konnte niemand sonst erkennen, warum sechzehn Personen nicht ausgezahlt worden waren. Teilnehmende reichten ins Leere ein: keine Bestätigung, keine sichtbare Berechnung, und oft mehr als vier Wochen, bis das Geld erschien. Das Versagen war strukturell, nicht schreibtechnisch — und am stärksten traf es diejenigen, die es am wenigsten auffangen konnten.',
  },

  solution: {
    en: 'A role-based web application that replaces the shared spreadsheet with five purpose-built views and replaces the manual chase loop with an explicit claim state machine (Under Review → Pending Approval → Approved → Paid). Participants get a mobile-first upload path with camera capture, German/English switching, and an optional guided step-by-step mode for the lowest-fluency users. Every reimbursement amount carries a full formula trace, so the participant, the admin, and the approver read the same number from the same computation — no black-box deductions to explain verbally. All persistence sits behind adapters, utilizing a local SQLite database and Nextcloud integration rather than external Google Sheets, ensuring participant data never leaves the institute.',
    de: 'Eine rollenbasierte Webanwendung, die die geteilte Tabelle durch fünf zweckgebaute Ansichten ersetzt und die manuelle Nachlaufschleife durch eine explizite Antrags-Zustandsmaschine ersetzt (In Prüfung → Genehmigung ausstehend → Genehmigt → Ausgezahlt). Teilnehmende erhalten einen mobile-first Upload-Pfad mit Kamerafunktion, Deutsch/Englisch-Umschaltung und einem optionalen geführten Schritt-für-Schritt-Modus für Nutzende mit geringer Vertrautheit. Jeder Erstattungsbetrag trägt eine vollständige Formel-Nachvollziehbarkeit, sodass Teilnehmende, Administration und Genehmigende dieselbe Zahl aus derselben Berechnung lesen — keine Black-Box-Abzüge, die mündlich erklärt werden müssen. Die Datenhaltung erfolgt über eine lokale SQLite-Datenbank und Nextcloud-Integration statt externer Google Sheets, wodurch sichergestellt wird, dass Teilnehmendendaten das Institut nie verlassen.',
  },

  methodology: {
    en: 'Phase 1 began from insider practice rather than a clean-room brief: I already knew the workflow from the inside, so the first task was to make that knowledge falsifiable. I reconstructed the AS-IS process as swimlane activity diagrams, framed the problem space with 5W1H, mapped nine stakeholders, and clustered nineteen observed problems into five structural themes. A validation interview with an independent expert familiar with the role confirmed the full failure set. Phase 2 turned the clustered problems into numbered requirements, a role-based sitemap, a claim state machine, and the "IBS-DesignSystem": a nine-colour role palette carried consistently from the research diagrams through to the shipped UI, so a lane colour in an activity diagram means the same thing as a badge colour in the app. Phase 3 built it, with the calculation rules as pure, unit-tested TypeScript rather than logic buried in components. Phase 4 — a task-based evaluation with real reviewers in each of the five roles — is running now.',
    de: 'Phase 1 begann mit Insider-Praxis statt einem Reißbrett-Briefing: Ich kannte den Ablauf bereits von innen, die erste Aufgabe war also, dieses Wissen falsifizierbar zu machen. Ich rekonstruierte den IST-Prozess als Swimlane-Aktivitätsdiagramme, rahmte den Problemraum mit 5W1H, kartierte neun Stakeholder und clusterte neunzehn beobachtete Probleme zu fünf strukturellen Themen. Ein Validierungsinterview mit einer unabhängigen Fachperson bestätigte die vollständige Fehlermenge. Phase 2 verwandelte die geclusterten Probleme in nummerierte Anforderungen, eine rollenbasierte Sitemap, eine Antrags-Zustandsmaschine und das "IBS-DesignSystem": eine neunfarbige Rollenpalette, konsistent von den Forschungsdiagrammen bis zur ausgelieferten UI getragen, sodass eine Spurfarbe im Aktivitätsdiagramm dasselbe bedeutet wie eine Badge-Farbe in der App. Phase 3 baute es, mit den Berechnungsregeln als reinem, unit-getestetem TypeScript statt in Komponenten vergrabener Logik. Phase 4 — eine aufgabenbasierte Evaluation mit echten Prüfenden in jeder der fünf Rollen — läuft jetzt.',
  },

  // The prototype is still being built, so there are no findings to report yet.
  // This section stands at "Work in Progress" until there is something
  // evidenced to put in it. `resultsDetail: false` keeps
  // the Study-at-a-Glance strip and the participant quotes out of the section
  // while it says that — `metrics` and `verbatims` stay in the file because the
  // project card's "Impact at a glance" reads them.
  results: {
    en: 'Work in Progress',
    de: 'In Arbeit',
  },
  resultsDetail: false,

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
          en: 'One column per question. The first five are diagnosis — a hybrid paper-heavy monthly cycle, a deadline on the 15th against a payout four weeks later, three intake channels feeding one Excel file with zero integration, nine roles meeting at a single Admin, and the four places the process predictably breaks. The sixth turns that into the brief: mobile-first upload, visible claim status, enforced calculation rules, digital approvals.',
          de: 'Eine Spalte je Frage. Die ersten fünf sind Diagnose — ein hybrider, papierlastiger Monatszyklus, eine Frist zum 15. gegen eine Auszahlung vier Wochen später, drei Einreichungskanäle in einer Excel-Datei ohne jede Integration, neun Rollen, die bei einer einzigen Verwaltungskraft zusammenlaufen, und die vier Stellen, an denen der Prozess vorhersehbar bricht. Die sechste macht daraus das Briefing: mobile-first Upload, sichtbarer Antragsstatus, erzwungene Berechnungsregeln, digitale Genehmigungen.',
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
          en: 'Left, proximity to the process: the Admin and the participants sit in the core as the single integration point — every other party reaches a claim through them. Around that core, three direct stakeholders (lecturer, approver/finance officer, cost centre KST 0098) and four indirect ones (AWO Finanzen, EKN, eDoc, internship coordination). Right, the same nine placed by influence against interest. The participants land low-influence, high-interest: the people the process exists for have the least power to move it, which is why their quadrant strategy is radical transparency rather than another approval step.',
          de: 'Links die Nähe zum Prozess: Verwaltung und Teilnehmende bilden den Kern als einzigen Integrationspunkt — alle anderen Beteiligten erreichen einen Antrag nur über sie. Um diesen Kern herum drei direkte Stakeholder (Dozent, Genehmiger/Finanzer, Kostenstelle KST 0098) und vier indirekte (AWO Finanzen, EKN, eDoc, Praktikumskoordination). Rechts dieselben neun, eingeordnet nach Einfluss gegen Interesse. Die Teilnehmenden landen bei geringem Einfluss und hohem Interesse: Diejenigen, für die der Prozess existiert, können ihn am wenigsten bewegen — deshalb lautet ihre Quadrantenstrategie radikale Transparenz statt eines weiteren Genehmigungsschritts.',
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
        href: 'https://ibs-fktn.vercel.app/#/admin/pipeline',
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
          en: 'Admin dashboard prototype showing a dense table of participants, transport methods, missing receipts, calculated amounts, and current claim statuses like Paid or Nothing submitted',
          de: 'Admin-Dashboard-Prototyp, der eine dichte Tabelle mit Teilnehmenden, deren Verkehrsmitteln, fehlenden Belegen, berechneten Beträgen und aktuellen Antragsstatus wie Ausgezahlt oder Noch nichts eingereicht zeigt',
        },
        caption: {
          en: 'Admin view — Table overview',
          de: 'Admin-Ansicht — Tabellenübersicht',
        },
        linkLabel: { 
          en: 'Open the table view', 
          de: 'Tabellenansicht öffnen' 
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


  About: [
    {
    }
  ],

  // A live build is the strongest evidence an in-progress project can offer:
  // Phase 4 has no results yet, but the thing itself is open and clickable.
  // Runs on the demo adapter — fictional workbooks, external data sources
  // disabled — so the link is safe to hand to a stranger.
  prototype: {
    en: "The deployed build runs all five role interfaces on demo data, with persistence behind the demo adapter rather than a live backend. It exercises the full claim state machine — Under Review → Pending Approval → Approved → Paid — and every reimbursement amount carries its formula trace, so the participant view, the administrator view, and the approver view all resolve the same number from the same visible computation.",
    de: "Der ausgelieferte Build führt alle fünf Rollenoberflächen auf Demodaten aus, mit Datenhaltung hinter dem Demo-Adapter statt einem echten Backend. Er durchläuft die vollständige Antrags-Zustandsmaschine — In Prüfung → Genehmigung ausstehend → Genehmigt → Ausgezahlt — und jeder Erstattungsbetrag trägt seine Formel-Nachvollziehbarkeit, sodass Teilnehmenden-, Verwaltungs- und Genehmigendenansicht dieselbe Zahl aus derselben sichtbaren Berechnung ableiten.",
  },
  // Participant language from the August 2026 survey. German originals with
  // English translations — anonymous, non-identifying, quoted as given
  // (including the second respondent's own phrasing, not tidied).
  verbatims: [
    {
      quote: {
        en: "No, I just take the amount as it comes.",
        de: "Nein, ich nehme den Betrag so, wie er kommt.",
      },
      attribution: {
        en: "Survey respondent, asked whether they check how their reimbursement is calculated (n=5, BL cohort) — translated from German",
        de: "Umfrageteilnehmende:r auf die Frage, ob die Berechnung der Erstattung geprüft wird (n=5, BL-Kohorte)",
      },
    },
    {
      quote: {
        en: "The processing time is the hardest part for me.",
        de: "Die Bearbeitungszeit ist für mich am schwierigsten.",
      },
      attribution: {
        en: "Survey respondent (n=5, BL cohort) — all five raised processing time unprompted; translated from German",
        de: "Umfrageteilnehmende:r (n=5, BL-Kohorte) — alle fünf nannten die Bearbeitungszeit unaufgefordert",
      },
    },
  ],

  prototypeUrl: "https://ibs-fktn.vercel.app/",
  prototypeUrlLabel: {
    en: "Open the live prototype",
    de: "Live-Prototyp öffnen",
  },

  // No `outcome` block: it renders inside the Results section, and the only
  // thing there is to say right now is the "Work in Progress" that `results`
  // above already states — a second identical line, not new information.
  // `adoption` stays off too, deliberately: an "Outcome Unknown" pill reads as
  // a verdict on the project instead of a statement that the work is running.

  // Every pointer below resolves to a field that exists in THIS file. The
  // previous set pointed at `process:` entries — this case study has no
  // `process` array (it documents its artefacts through `figures` instead),
  // so those pointers named nothing, and `results:` was cited for a
  // digital-signature ruling and a test count that section does not contain.
  // Same drift the portfolio case study reports about itself: documentation
  // describing a shape the data had already moved away from.
  tagEvidence: [
    { tag: "UX Research", evidence: "methods: \"Insider process observation (AS-IS)\", \"Expert validation interview\", \"Participant survey (n=5, anonymous, BL cohort)\"; verbatims quotes two of those respondents, and metrics records six of the 25 documented problems as survey-contributed", status: "evidenced" },
    { tag: "Service Design", evidence: "methods: \"Stakeholder mapping\" + \"UML activity diagrams (swimlane)\"; figures.challenge maps one monthly cycle end to end across nine actor lanes, 13 steps, and four return loops. No rendered service blueprint exists, and the TO-BE is delivered as role-based views and a claim state machine — a UI redesign of the service, not a blueprint of it", status: "thin" },
    { tag: "Survey Design", evidence: "methods: \"Participant survey (n=5, anonymous, BL cohort)\"; metrics: \"25 problems documented — six added by the participant survey\" and \"n=5, every finding evidence-labelled\"; verbatims carries two responses quoted as given", status: "evidenced" },
    { tag: "Thematic Analysis", evidence: "methods: \"Thematic analysis / affinity clustering\"; methodology: \"clustered nineteen observed problems into five structural themes\"", status: "evidenced" },
    { tag: "Persona Development", evidence: "figures.methodology: \"Seven personas, each carrying its own evidence\" — one composite per role, each stating where its reading came from; metrics: \"7 personas, each with its provenance stated\"; methods: \"Persona development with provenance labelling\"", status: "evidenced" },
    { tag: "Requirements Engineering", evidence: "methodology: \"Phase 2 turned the clustered problems into numbered requirements, a role-based sitemap, a claim state machine\"; methods: \"Requirements traceability (FR / NFR / P-IDs)\"", status: "evidenced" },
    { tag: "Requirements Traceability", evidence: "metrics: \"100% of requirements cited in code traced to a source problem\"; methods: \"Requirements traceability (FR / NFR / P-IDs)\"", status: "evidenced" },
    { tag: "Information Architecture", evidence: "methods: \"Information architecture & state modelling\"; solution: five purpose-built role views replacing one shared spreadsheet, plus the explicit claim state machine (Under Review → Pending Approval → Approved → Paid)", status: "evidenced" },
    { tag: "Design Systems", evidence: "figures.methodology: \"One palette, from swimlane to shipped screen\" — the IBS-DesignSystem sheet (brand colours, nine-lane role palette, type scale, buttons, status chips, form-field states), with the research diagram's lane colours carried unchanged into the shipped UI", status: "evidenced" },
    { tag: "React", evidence: "techStack: [\"React\", \"TypeScript\", \"Vite\", \"Tailwind CSS\", \"Vitest\", ...] — rendered as Tech Stack chips under Methodology; metrics: \"5 role-based interfaces built and wired\"; prototype: the deployed build runs all five of them", status: "evidenced" },
    { tag: "TypeScript", evidence: "methodology: \"Phase 3 built it, with the calculation rules as pure, unit-tested TypeScript rather than logic buried in components\"", status: "evidenced" },
    { tag: "Automated Testing (Vitest)", evidence: "metrics: \"158 automated tests across 25 files\"; techStack includes Vitest; methodology names the calculation rules as unit-tested", status: "evidenced" },
    { tag: "Accessibility", evidence: "solution: \"an optional guided step-by-step mode for the lowest-fluency users\", German/English switching, and a mobile-first upload path with camera capture — inclusive-design evidence, not a WCAG/a11y audit", status: "thin" },
    { tag: "GDPR / DSGVO", evidence: "solution: \"All persistence sits behind adapters, utilizing a local SQLite database and Nextcloud integration rather than external Google Sheets, ensuring participant data never leaves the institute\"; the published prototype runs on the demo adapter with fictional workbooks, and the survey verbatims are anonymous and non-identifying", status: "evidenced" },
    { tag: "Public Sector", evidence: "challenge: \"participants in a state-funded qualification programme\" — direct citation of state/public funding as the programme context", status: "evidenced" },
  ],
};

export default projectData;