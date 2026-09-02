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
//
// 20.08.2026: revised against 'for Case study IBS.docx' — multi-Excel before-
// state, 2 interviews + 1 admin meeting, UCD/double-diamond framing, results deferred until
// real use (no study eyebrow — see metricsIntro), design section added.
// 27.08.2026: wireframe section added — prose, the process strip (moved
// over from figures.design), and a pending figure for the full-size export
// still owed from the Claude Design project. Decoding the strip's embedded
// panels to write it showed all three panels are the attendance-month
// screen (wireframe page 1g), so the "participant screen" wording around
// the strip was corrected to name the screen.
// Card-level fields (id/status/title/tags/thumbnails/card*) live in
// ./card.js — eagerly aggregated site-wide — and are spread here so the
// detail page sees one object. This file carries only the prose and media
// that load with the route's own chunk.
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

// The two research artefacts are full standalone documents — a nine-lane
// activity diagram and a seven-card persona set — too detailed to read at
// figure size. Each renders here as a preview that opens the real page in a
// new tab. The pages themselves live in public/ (files under src/ are
// bundled, not served) and keep the folder names they were authored under:
//   public/projects/digitalising-ibs-travel-reimbursements/UML/Detailed-UML.html
//   public/projects/digitalising-ibs-travel-reimbursements/Personas/Persona.html
const DOCS = '/projects/digitalising-ibs-travel-reimbursements';

export const projectData = {
  ...card,
  stage: { en: 'Demo delivered · evaluation pending', de: 'Demo übergeben · Evaluation ausstehend' },
  timeline: { en: '2026 · four phases · ongoing', de: '2026 · vier Phasen · laufend' },

  aiAssistance: {
    en: 'Built with AI coding agents under my direction. The research, the requirements, and the architecture decisions are mine — the decision log records the AI suggestions I rejected — and every claim on this page is traceable to its sources.',
    de: 'Entwickelt mit KI-Coding-Agenten unter meiner Leitung. Die Forschung, die Anforderungen und die Architekturentscheidungen sind meine — das Entscheidungslog hält fest, welche KI-Vorschläge ich abgelehnt habe — und jede Aussage auf dieser Seite ist auf ihre Quellen rückführbar.',
  },
  // Only rendered as a fallback for a project with no thumbnail and no
  // process gallery, which this one is not — but it pointed at a file that
  // was never authored, so it now names the image that does exist.
  heroImage: thumbnailImg,
  heroIsGenerated: true, // hero generated with Google Gemini — renders the credit

  methods: [
    { en: 'Insider process observation (AS-IS)',              de: 'Insider-Prozessbeobachtung (IST-Zustand)' },
    { en: 'Expert interviews (n=2: project management, accounting) plus one working meeting with the administration team', de: 'Experteninterviews (n=2: Projektleitung, Buchhaltung) plus ein Arbeitstreffen mit dem Verwaltungsteam' },
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
    { value: 'n=6', label: { en: 'survey responses so far — the survey is open, and the in-person (Präsenzkurs) cohort is not yet reached', de: 'Umfrage-Antworten bisher — die Umfrage läuft, die Präsenzkurs-Kohorte ist noch nicht erreicht' } },
    { value: 'n=2', label: { en: 'expert interviews — project management and accounting — plus a working meeting with the administration team', de: 'Experteninterviews — Projektleitung und Buchhaltung — plus ein Arbeitstreffen mit dem Verwaltungsteam' } },
    { value: { en: '>1 yr', de: '>1 Jahr' }, label: { en: 'running the process myself before redesigning it — insider observation as the first evidence source', de: 'den Prozess selbst betrieben, bevor ich ihn neu entwarf — Insider-Beobachtung als erste Evidenzquelle' } },
    { value: '7', label: { en: 'personas, each with its provenance stated', de: 'Personas, jede mit angegebener Herkunft' } },
    { value: '9', label: { en: 'actors mapped across 13 steps and 4 return loops', de: 'Akteure über 13 Schritte und 4 Rückschleifen kartiert' } },
    { value: '43+', label: { en: 'days and still unpaid — one claim traced end to end through the paper process: 8 days sitting unseen, 1 day of admin work, the rest downstream and invisible', de: 'Tage und weiter unbezahlt — ein Antrag durchgängig im Papierprozess verfolgt: 8 Tage unbemerkt liegend, 1 Tag Bearbeitung, der Rest nachgelagert und unsichtbar' } },
    { value: '0', label: { en: 'reminders for private-vehicle (PKW) claims in the paper process — submitting depended entirely on the participant remembering', de: 'Erinnerungen an PKW-Anträge im Papierprozess — die Einreichung hing allein am Erinnern der Teilnehmenden' } },
    { value: '4/6', label: { en: 'respondents do not know how their amount is calculated; two have stopped trying', de: 'Befragte wissen nicht, wie ihr Betrag berechnet wird; zwei haben aufgehört, es zu versuchen' } },
    { value: { en: '1,234', de: '1.234' }, label: { en: 'automated tests — including guards that fail the build on an untraced requirement citation or a design-token drift', de: 'automatisierte Tests — darunter Guards, die den Build bei unbelegten Anforderungszitaten oder Token-Abweichungen scheitern lassen' } },
  ],

  metricsIntro: {
    en: 'How to read these numbers: they are counts of artefacts that exist, or measurements whose method is named — never projections. With n=6, survey findings are reported as counts, not percentages: enough to confirm or reframe a problem, never to size it.',
    de: 'So sind diese Zahlen zu lesen: Sie sind Zählungen existierender Artefakte oder Messungen mit benannter Methode — nie Prognosen. Bei n=6 werden Umfragebefunde als Anzahlen berichtet, nicht als Prozente: genug, um ein Problem zu bestätigen oder neu zu rahmen, nie, um es zu beziffern.',
  },

  techStack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Vitest',
    'Node.js Server (Fastify)',
    'Session Auth (argon2id) · CSRF · Rate Limiting',
    'SQLite',
    'SheetJS / Local Excel Files',
    'Nextcloud WebDAV Integration',
    'SVG (hand-authored diagrams)',
    'Claude Design (case-study figures, diagrams, early wireframes)',
    'Figma Make (clickable low-fidelity wireframe set)',
    'Claude Code (AI-assisted development)',
  ],

  about: {
    en: 'I joined the institute as a project assistant and ran this reimbursement process myself for over a year — long enough to see that it was not just inefficient but a steady source of frustration and avoidable mistakes for everyone in it. With a Master’s in HCI I had the research methods to turn those observations into verified requirements, and as a frontend developer I could carry the same requirements into working code — so I proposed replacing the scattered spreadsheets with one integrated application, and built it. As of August 2026 the prototype is in active development: the team works with the deployed demo and feeds back, the screens are being consolidated through that feedback and instrumented testing before release as the real product, and every claim on this page traces to a survey answer, a process map, or a line of code.',
    de: 'Ich kam als Projektassistentin an das Institut und habe diesen Erstattungsprozess über ein Jahr selbst betrieben — lange genug, um zu sehen, dass er nicht nur ineffizient war, sondern für alle Beteiligten eine stete Quelle von Frustration und vermeidbaren Fehlern. Mit einem Master in HCI hatte ich die Forschungsmethoden, um diese Beobachtungen in belegte Anforderungen zu überführen, und als Frontend-Entwicklerin konnte ich dieselben Anforderungen in laufenden Code tragen — also schlug ich vor, die verstreuten Tabellen durch eine integrierte Anwendung zu ersetzen, und baute sie. Stand August 2026 ist der Prototyp in aktiver Entwicklung: Das Team arbeitet mit der bereitgestellten Demo und gibt Feedback, die Screens werden vor der Veröffentlichung über dieses Feedback und instrumentierte Tests konsolidiert, und jede Aussage auf dieser Seite führt auf eine Umfrageantwort, eine Prozesskarte oder eine Codezeile zurück.',
  },

  challengeQuote: {
    en: 'A thirteen-step paper process with four return loops forced participants to wait weeks for their money — without any way of knowing where it was.',
    de: 'Ein dreizehnstufiger Papierprozess mit vier Rückschleifen zwang Teilnehmende, wochenlang auf ihr Geld zu warten — ohne jede Möglichkeit zu wissen, wo es blieb.',
  },
  challenge: {
    en: 'Every month, participants in a state-funded qualification programme claim back their travel costs. On paper it is a form; in practice it was an ecosystem of disconnected spreadsheets held together by one administrative role. Attendance started as paper marks in the classroom, was retyped by lecturers into an attendance-only Excel shared over Teams — often late, often incomplete, always chased — and exported again by the admin. A hasty „A“ for a participant who left early could quietly become an unexcused „U“ if the follow-up excuse never arrived, unfairly costing attendance days and, with them, reimbursement money. Calculating each month’s totals followed rules so error-prone that I built myself a helper spreadsheet just to get them right. Around that sat a master overview file, one prefilled Abrechnung file per participant, and whatever month- or case-specific lists the situation required. Participants, meanwhile, submitted into a void: no visible calculation, no confirmation, no status — four of six survey respondents could not even say how long reimbursement takes. The failure was structural, not clerical.',
    de: 'Jeden Monat fordern Teilnehmende eines staatlich geförderten Qualifizierungsprogramms ihre Fahrtkosten zurück. Auf dem Papier ist das ein Formular; in der Praxis war es ein Geflecht unverbundener Tabellen, zusammengehalten von einer einzigen administrativen Rolle. Die Anwesenheit begann als Papiereintrag im Kursraum, wurde von Dozierenden in eine reine Anwesenheits-Excel übertragen und über Teams geteilt — oft spät, oft unvollständig, immer angemahnt — und von der Verwaltung wieder exportiert. Aus einem hastigen „A“ für eine früher gehende Person konnte stillschweigend ein unentschuldigtes „U“ werden, wenn die Entschuldigung ausblieb — und mit den Anwesenheitstagen sank zu Unrecht auch die Erstattung. Die Monatsberechnung folgte Regeln, die so fehleranfällig waren, dass ich mir eine eigene Hilfs-Excel baute, um sie sicher zu beherrschen. Darum herum: eine Master-Übersichtsdatei, je teilnehmender Person eine vorbefüllte Abrechnungsdatei und die monats- oder fallspezifischen Listen. Teilnehmende reichten derweil ins Leere ein: keine sichtbare Berechnung, keine Bestätigung, kein Status — vier von sechs Befragten konnten nicht einmal sagen, wie lange die Erstattung dauert. Das Versagen war strukturell, nicht schreibtechnisch.',
  },

  solutionQuote: {
    en: 'One web application, five role views, one visible claim status — replacing a folder of Excel files, a Teams upload, and a paper chase.',
    de: 'Eine Webanwendung, fünf Rollenansichten, ein sichtbarer Antragsstatus — statt eines Ordners voller Excel-Dateien, eines Teams-Uploads und einer Papier-Nachlaufschleife.',
  },
  solution: {
    en: 'The app is one place where the whole monthly cycle happens: participants photograph and submit their proofs, lecturers keep attendance directly instead of retyping paper into a Teams spreadsheet, the admin sees every claim’s state and calculation, approvers release with one decision, and accounting reads the same numbers as everyone else. Five purpose-built role views replace the spreadsheet ecosystem. Participants get a mobile-first upload path with camera capture and an optional guided step-by-step mode for lower digital fluency, and the claim moves through an explicit state machine — “where is my money” has an on-screen answer for the first time. Amounts make the round trip instead of being stored: the database holds only the typed fields, and the amount is rebuilt from the same pure computation every time any role opens the record, with its full formula trace visible. Persistence sits behind adapters over a local SQLite database, with stored proofs mirrored to the institute’s own Nextcloud; the one named external call is a route lookup to Google Maps when staff check a driving distance, stated in the data-protection documentation rather than hidden.',
    de: 'Die App ist der eine Ort, an dem der gesamte Monatszyklus stattfindet: Teilnehmende fotografieren und reichen ihre Nachweise ein, Dozierende führen die Anwesenheit direkt statt Papier in eine Teams-Tabelle zu übertragen, die Verwaltung sieht Zustand und Berechnung jedes Antrags, Genehmigende geben mit einer Entscheidung frei, und die Buchhaltung liest dieselben Zahlen wie alle anderen. Fünf zweckgebaute Rollenansichten ersetzen das Tabellen-Geflecht. Teilnehmende erhalten einen mobile-first Upload-Pfad mit Kamerafunktion und einem optionalen geführten Schritt-für-Schritt-Modus, und der Antrag durchläuft eine explizite Zustandsmaschine — „Wo ist mein Geld?“ hat damit erstmals eine Antwort auf dem Bildschirm. Beträge machen die Rundreise, statt gespeichert zu werden: Die Datenbank hält nur die eingegebenen Felder, und der Betrag wird bei jedem Öffnen des Datensatzes von jeder Rolle aus derselben reinen Berechnung neu aufgebaut, mit sichtbarer Formel-Nachvollziehbarkeit. Die Datenhaltung liegt hinter Adaptern über einer lokalen SQLite-Datenbank, gespeicherte Nachweise werden zusätzlich in die institutseigene Nextcloud gespiegelt; der eine benannte externe Aufruf ist eine Routenabfrage an Google Maps bei der Entfernungsprüfung durch Mitarbeitende — in der Datenschutz-Dokumentation ausgewiesen statt versteckt.',
  },

  methodologyQuote: {
    en: 'The four phases follow a user-centred design cycle — a double diamond in which the build itself is instrumented, so the second diamond’s evaluation can actually be measured.',
    de: 'Die vier Phasen folgen einem nutzerzentrierten Designzyklus — ein Double Diamond, dessen Build selbst instrumentiert ist, damit die Evaluation des zweiten Diamanten wirklich messbar wird.',
  },

  methodology: {
    en: 'The project runs as a user-centred design process in the shape of the double diamond. Discover: insider observation from more than a year inside the process, two expert interviews — project management and accounting — plus a working meeting with the administration team, and the participant survey (n=6 and open), which reversed one of my priorities and added six problems I had not seen from the inside; because I knew the workflow personally, the first research task was strictly about making my own assumptions falsifiable. Define: thematic clustering into a problem register where every entry carries an evidence grade — confirmed, indicative, hypothesis, untested — and counts confirm or reframe a problem, never size it; the clustered problems became numbered requirements, a role-based sitemap, and the IBS-DesignSystem, whose nine role colours are the nine lane colours of the research map. Develop: Phase 3 engineered the calculation rules as pure, unit-tested TypeScript, with a build-failing test that keeps every requirement citation in code traced to its source problem — and states its own limit: it catches a citation without a source, not a problem without an implementation. Deliver: the evaluation is built into the app itself — guided tasks, a pseudonymous local event log, an end-of-session questionnaire — and dogfooding it on my own development traffic already caught three of its own measurement bugs.',
    de: 'Das Projekt läuft als nutzerzentrierter Designprozess in der Form des Double Diamond. Discover: Insider-Beobachtung aus über einem Jahr im Prozess, zwei Experteninterviews — Projektleitung und Buchhaltung — plus ein Arbeitstreffen mit dem Verwaltungsteam, und die Teilnehmenden-Umfrage (n=6, laufend), die eine meiner Prioritäten umkehrte und sechs Probleme ergänzte, die ich von innen nicht gesehen hatte; weil ich den Ablauf persönlich kannte, bestand die erste Forschungsaufgabe strikt darin, meine eigenen Annahmen falsifizierbar zu machen. Define: thematisches Clustern in ein Problemregister, in dem jeder Eintrag ein Evidenzlabel trägt — bestätigt, indikativ, Hypothese, ungeprüft — und Zählungen ein Problem bestätigen oder neu rahmen, nie beziffern; aus den geclusterten Problemen wurden nummerierte Anforderungen, eine rollenbasierte Sitemap und das IBS-DesignSystem, dessen neun Rollenfarben die neun Spurfarben der Forschungskarte sind. Develop: Phase 3 entwickelte die Berechnungsregeln als reines, unit-getestetes TypeScript — mit einem Build-brechenden Test, der jedes Anforderungszitat im Code auf sein Quellproblem zurückführt und seine eigene Grenze benennt: Er erkennt ein Zitat ohne Quelle, nicht ein Problem ohne Umsetzung. Deliver: Die Evaluation ist in die App eingebaut — geführte Aufgaben, ein pseudonymes lokales Ereignisprotokoll, ein Abschlussfragebogen — und beim Dogfooding auf meinen eigenen Entwicklungsdaten fand sie bereits drei ihrer eigenen Messfehler.',
  },

  // The deferral statement lives in the `outcome` block below (with the
  // shared "deferred" pill), not here — one voice, one place. `results`
  // keeps only the pointer to where the measured material sits, and
  // `metricsIntro` replaces the "Study at a Glance" eyebrow above the grid,
  // so the numbers keep a frame without being called the results of a study
  // that has not run.
  results: {
    en: 'The baseline this project will be measured against — the paper process — is in the metrics above; the instruments that will measure the change are described in the methodology.',
    de: 'Die Basis, an der dieses Projekt gemessen wird — der Papierprozess — steht in den Metriken oben; die Instrumente, die die Veränderung messen werden, sind in der Methodik beschrieben.',
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
        en: 'The participant survey has not yet reached the in-person (Präsenzkurs) cohort or any travel-pass (Abo-Karte) holder — the branch of the process with the strongest claims carries the least evidence.',
        de: 'Die Umfrage hat die Präsenzkurs-Kohorte und Abo-Karten-Nutzende noch nicht erreicht — der Prozesszweig mit den stärksten Annahmen trägt die wenigste Evidenz.',
      },
      {
        en: 'A phone-width layout for the signed-in app shell is in progress — my own survey says most participants submit from a phone, and the build did not honour that until the finding forced it.',
        de: 'Ein Telefon-Layout für die angemeldete App-Shell ist in Arbeit — die eigene Umfrage zeigt, dass die meisten Teilnehmenden per Handy einreichen, und der Build hielt das nicht ein, bis der Befund es erzwang.',
      },
    ],
  },

  // Limits on the evidence, distinct from `notBuilt` above: that block is
  // about scope not yet built, this one about what the research cannot show.
  limitations: [
    {
      en: 'I ran this process myself for more than a year, so the problem framing starts from my own experience. The survey was designed to make those assumptions falsifiable — and reversed one of my priorities — but no independent researcher has reviewed the problem register.',
      de: 'Ich habe diesen Prozess über ein Jahr selbst betrieben, die Problemrahmung beginnt also bei meiner eigenen Erfahrung. Die Umfrage war darauf angelegt, diese Annahmen falsifizierbar zu machen — und kehrte eine meiner Prioritäten um —, doch kein:e unabhängige:r Forschende:r hat das Problemregister geprüft.',
    },
    {
      en: 'The survey is n=6, self-selected, and so far entirely from the online (BL) cohort. The Präsenzkurs cohort and travel-pass (Abo-Karte) holders are absent, which is why findings are reported as counts: enough to confirm or reframe a problem, never to size it.',
      de: 'Die Umfrage liegt bei n=6, selbstselektiv und bisher vollständig aus der Online-Kohorte (BL). Die Präsenzkurs-Kohorte und Abo-Karten-Nutzende fehlen — deshalb werden Befunde als Anzahlen berichtet: genug, um ein Problem zu bestätigen oder neu zu rahmen, nie, um es zu beziffern.',
    },
    {
      en: 'Two expert interviews mean one voice per role — project management and accounting. Lecturers, who carry the attendance step the whole chain depends on, were not interviewed; their part of the process is mapped from artefacts and my own observation.',
      de: 'Zwei Experteninterviews bedeuten eine Stimme je Rolle — Projektleitung und Buchhaltung. Dozierende, die den Anwesenheitsschritt tragen, von dem die gesamte Kette abhängt, wurden nicht interviewt; ihr Prozessteil ist aus Artefakten und eigener Beobachtung kartiert.',
    },
    {
      en: 'The 43+ day figure is one claim traced end to end, and it is right-censored: the claim was still unpaid when the observation stopped. It shows how long the paper process can take — it is not an average and not a distribution.',
      de: 'Die Angabe von 43+ Tagen ist ein einzelner, durchgängig verfolgter Antrag — und sie ist rechtszensiert: Der Antrag war bei Beobachtungsende weiterhin unbezahlt. Sie zeigt, wie lange der Papierprozess dauern kann — sie ist kein Durchschnitt und keine Verteilung.',
    },
    {
      en: 'No usability evaluation has run. The instruments are built into the app and dogfooded, but every claim about the new system is a claim about a mechanism that exists — not about a measured improvement over the paper process.',
      de: 'Es ist noch keine Usability-Evaluation gelaufen. Die Instrumente sind in die App eingebaut und im Dogfooding erprobt, doch jede Aussage über das neue System betrifft einen vorhandenen Mechanismus — nicht eine gemessene Verbesserung gegenüber dem Papierprozess.',
    },
    {
      en: 'The traceability test guards citations, not coverage: it fails the build on a requirement citation without a source problem, and stays silent on a source problem with no implementation.',
      de: 'Der Traceability-Test sichert Zitate, nicht Abdeckung: Er lässt den Build bei einem Anforderungszitat ohne Quellproblem scheitern und schweigt bei einem Quellproblem ohne Umsetzung.',
    },
  ],

  // Rendered as its own section ("Design") between Solution and Methodology.
  // NOTE for the renderer: `design` text + `figures.design` are new keys.
  design: {
    en: 'The design system was extracted before the high-fidelity screens, not after them: brand colours, a nine-colour role palette carried unchanged from the research diagram’s lanes, note states, a type scale, and form-field states — so a lane in the research reads as the same actor as a badge in the app. How the screens themselves took shape, from paper sketch to wireframe to shipped view, is shown in the Wireframes section below.',
    de: 'Das Designsystem wurde vor den High-Fidelity-Screens extrahiert, nicht danach: Markenfarben, eine neunfarbige Rollenpalette, unverändert aus den Spuren des Forschungsdiagramms übernommen, Notizzustände, eine Typo-Skala und Formularfeld-Zustände — eine Spur in der Forschung steht damit für denselben Akteur wie ein Badge in der App. Wie die Screens selbst entstanden sind — von der Papierskizze über das Wireframe zur ausgelieferten Ansicht —, zeigt der Wireframe-Abschnitt darunter.',
  },

  // Rendered as its own section ("Wireframes") between Design and Prototype —
  // the template's wireframe slot (constants.js: PROSE_SECTIONS), data-gated
  // like every section, so switching it on here changes no other project.
  // The process strip anchors this section (moved from figures.design
  // 27.08.2026 — it documents the wireframe stage, not the token system).
  // Every claim below is checked against the strip's decoded panels: the
  // middle panel is wireframe page 1g, Anwesenheit · Monat, and the third
  // panel shows the deployed screen carrying the same structures.
  wireframe: {
    en: 'Before the high-fidelity screens were built, the layouts were drawn as wireframes against the numbered requirements from Phase 2. A wireframe fixes the structure of a screen — which elements it contains, in what order, and which rules apply — before colour and typography come in. The low-fidelity set was built as a clickable prototype in Figma Make, one tab per view, so the navigation between the screens could be walked through and not just imagined. The strip below shows the path for the attendance-month screen: the paper sketch from the process observation, the wireframe, and the screen as it shipped; the wireframe itself follows at full size.',
    de: 'Bevor die High-Fidelity-Screens gebaut wurden, wurden die Layouts als Wireframes entlang der nummerierten Anforderungen aus Phase 2 gezeichnet. Ein Wireframe legt die Struktur eines Screens fest — welche Elemente er enthält, in welcher Reihenfolge und nach welchen Regeln —, bevor Farbe und Typografie dazukommen. Der Low-Fidelity-Satz entstand als klickbarer Prototyp in Figma Make, ein Tab je Ansicht, sodass sich die Navigation zwischen den Screens durchlaufen und nicht nur vorstellen ließ. Der Streifen unten zeigt den Weg am Anwesenheits-Monatsscreen: die Papierskizze aus der Prozessbeobachtung, das Wireframe und den Screen im ausgelieferten Zustand; das Wireframe selbst folgt darunter in voller Größe.',
  },

  figures: {
    challenge: [
      // The AS-IS flow opens the section deliberately: the reader walks
      // the terrain first, then the 5W1H names where it breaks, then the
      // stakeholder map shows who is standing in it.
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
      // After the flow: the 5W1H states the failure in plain language in
      // six columns. Five are diagnosis; the sixth is the brief the
      // solution section then answers.
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
      // Closing the section: who is in the room, and that the whole
      // process runs through a single administrative role — visible as a
      // structural fact rather than a claim. The four quadrant strategies
      // are the engagement decisions the solution answers.
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
    ],

    solution: [
      // The corrected architecture diagram — the third version. The first
      // drew a waterfall (amount falls into the database); reading the code
      // proved the opposite, and the artefact that graded the first version
      // WRONG/IMPRECISE line-by-line is part of the project record. This one
      // is verified against commit 47b0301.
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
          en: 'Architecture diagram in two dashed regions. The browser holds Screens, Rules and Storage connected by a round trip of arrows: typed fields flow down, stored fields flow back up, and the amount with its full trace exists only between Rules and Screens. Inside the institute a Fastify server with a default-deny repo guard, a SQLite database with no amount column, and a Nextcloud mirror for proof files. A red side panel marks the single external call: a Google Maps route lookup typed by staff.',
          de: 'Architekturdiagramm in zwei gestrichelten Bereichen. Der Browser enthält Screens, Regeln und Storage, verbunden durch eine Rundreise von Pfeilen: Eingetippte Felder fließen abwärts, gespeicherte Felder kommen zurück, und der Betrag mit seiner Nachvollziehbarkeit existiert nur zwischen Regeln und Screens. Im Institut liegen ein Fastify-Server mit Default-Deny-Guard, eine SQLite-Datenbank ohne Betragsspalte und eine Nextcloud-Spiegelung für Nachweise. Ein rotes Seitenpanel markiert den einzigen externen Aufruf: eine von Mitarbeitenden getippte Google-Maps-Routenabfrage.',
        },
        caption: {
          en: 'Application architecture — round trip, verified at commit 47b0301',
          de: 'Anwendungsarchitektur — Rundreise, verifiziert bei Commit 47b0301',
        },
      },
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
      // ── Before/after artefact pairs — four-row comparison figure
      // (tracker · attendance list · form · submission), figure 20.08.2026.
      // Supersedes both the three-row v1 raster and the three-row standalone
      // HTML page that used to be linked here: neither carried the attendance
      // row, and both predate the consolidated register.
      //
      // The text below is written against THIS export — the 13 problem IDs,
      // the register version and the survey n are read off the figure's own
      // footer. They are one claim, not two: re-export and the caption gets
      // re-checked in the same pass.
      //
      // The export arrived as a 1920×2795 screen capture, so the top 88px (the
      // authoring app's status banner and toolbar) and the ~10px canvas card
      // edge are cropped off, then re-encoded to WebP q90 — 2.4 MB → 449 KB at
      // full resolution, no downscaling. Kept at 1900px wide because the column
      // renders at 1060–1280 CSS px, so this is still under 2× for the slot.
      //
      // `href` is the same bundled asset as `src`, not a separate page: at
      // column width the callouts are unreadable, so the click opens the
      // full-resolution image in its own tab, where the browser's own zoom and
      // pan do the job a zoom overlay would do worse.
      //
      // Source of truth: the figure is authored in the Claude Design project
      // ("The artefact that was replaced.html"); before-after.webp is its
      // export. Re-checked against that source 22.08.2026 — the four rows, the
      // four-tone legend, the three unresolved limits and the footer's thirteen
      // problem IDs all still match what is written below, so only the reading
      // key was missing and is added as `takeaway`.
      //
      // Two notes carried over from the source that this file did not record:
      //   · PENDING (client-naming decision) — two regions are legible on
      //     purpose today and may still need the blur treatment: the training
      //     address block on the printed Abrechnung, and the internal
      //     cost-centre line (Kostenstelle / Maßnahme) on the generated
      //     Formular. If that decision lands, both get blurred the way the
      //     cloud-intake capture already is, and before-after.webp is
      //     re-exported — at which point the caption gets re-checked too.
      //   · The attendance row uses the v2 redaction of the paper list. v1 is
      //     still in the design project; do not export against it.
      //
      // One discrepancy is left standing rather than silently corrected: the
      // participant-flow callout on the figure reads "Resolves P20 / P25", but
      // P25 is absent from the figure's own footer list. The caption below
      // reproduces the thirteen IDs the footer actually names — fix it in the
      // consolidated register first, then here.
      {
        type: 'image',
        src: beforeAfterArtefacts,
        href: beforeAfterArtefacts,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Before / after · real artefacts', de: 'Vorher / Nachher · echte Artefakte' },
        title: {
          en: 'The artefact that was replaced',
          de: 'Das Artefakt, das ersetzt wurde',
        },
        description: {
          en: 'Four of the artefacts that carry the manual cycle today, each paired with the screen that replaces it — and with what the replacement does not fix stated on the figure. Row one: the hand-kept master tracker — one of at least four spreadsheet artefacts a single month requires — becomes the admin board that keeps its own state. Row two: the paper Anwesenheitsliste, signed per session, handed in after the deadline, its codes overwritten and re-marked in three pen colours, becomes attendance recorded once in the session and read straight into the calculation, with unfilled fields counted openly. Row three: the printed Abrechnung completed by pen becomes a form the system generates from stored data, behind a gate of four completeness checks — the pen still signs, by decision, because the digital signature is built but switched off pending the data-protection ruling. Row four: the cloud intake nobody uses — five of six respondents submit by e-mail, one on paper, none through the only channel that leaves a trace — becomes a participant flow that shows the claim’s status instead of waiting to be asked. Three limits are marked on the figure: no screen produces the PAID status yet, the medical certificate still arrives on paper after the fact, and the app still does not notify participants once they leave it.',
          de: 'Vier der Artefakte, die den manuellen Zyklus heute tragen, jeweils gepaart mit dem Screen, der sie ersetzt — und mit dem, was der Ersatz nicht löst, direkt auf der Abbildung benannt. Zeile eins: Der handgeführte Master-Tracker — eines von mindestens vier Tabellen-Artefakten, die ein einziger Monat verlangt — wird zum Admin-Board, das seinen Zustand selbst führt. Zeile zwei: Die gedruckte Anwesenheitsliste, pro Sitzung unterschrieben, erst nach der Frist eingereicht, ihre Codes überschrieben und in drei Stiftfarben nachgetragen, wird zur Anwesenheit, die einmal in der Sitzung erfasst und direkt in die Berechnung gelesen wird — offene Felder werden dabei offen ausgewiesen. Zeile drei: Die per Stift ausgefüllte gedruckte Abrechnung wird zum Formular, das das System aus gespeicherten Daten erzeugt, hinter einem Gate aus vier Vollständigkeitsprüfungen — der Stift unterschreibt weiterhin, per Entscheidung: Die digitale Unterschrift ist gebaut, aber deaktiviert, bis der Datenschutz entschieden hat. Zeile vier: Der ungenutzte Cloud-Eingang — fünf von sechs Befragten reichen per E-Mail ein, eine Person auf Papier, niemand über den einzigen Kanal mit digitaler Spur — wird zum Teilnehmenden-Flow, der den Antragsstatus aktiv anzeigt, statt auf Nachfragen zu warten. Drei Grenzen stehen auf der Abbildung: Noch erzeugt kein Screen den Status AUSGEZAHLT, die AU-Bescheinigung kommt weiterhin nachträglich auf Papier, und die App benachrichtigt Teilnehmende nach dem Verlassen weiterhin nicht.',
        },
        alt: {
          en: 'Four-row comparison figure with a four-tone callout legend: problems in red, paired wins in green, one amber gate check, and honest limits as dashed notes. Row one pairs a blurred master Excel tracker with the admin dashboard. Row two pairs a blurred paper attendance list, hand-marked in several pen colours, with the app’s monthly attendance grid. Row three pairs a blurred printed reimbursement form completed by pen with the generated form view and its four-check gate. Row four pairs the unused cloud upload folder with the participant month view and its visible status chain. Three dashed callouts mark what is not resolved: the unreachable PAID status, the medical certificate still arriving on paper, and the missing post-submission notification.',
          de: 'Vierzeilige Vergleichsabbildung mit viertöniger Legende: Probleme in Rot, zugeordnete Lösungen in Grün, eine bernsteinfarbene Gate-Prüfung und ehrliche Grenzen als gestrichelte Notizen. Zeile eins paart einen unkenntlich gemachten Master-Excel-Tracker mit dem Admin-Dashboard. Zeile zwei paart eine unkenntlich gemachte Anwesenheitsliste auf Papier, handschriftlich in mehreren Stiftfarben markiert, mit dem Monatsraster der App. Zeile drei paart eine per Stift ausgefüllte, unkenntlich gemachte gedruckte Abrechnung mit der generierten Formularansicht und ihrem Gate aus vier Prüfungen. Zeile vier paart den ungenutzten Cloud-Upload-Ordner mit der Teilnehmenden-Monatsansicht und ihrer sichtbaren Statuskette. Drei gestrichelte Anmerkungen markieren, was nicht gelöst ist: der unerreichbare Status AUSGEZAHLT, die weiterhin auf Papier eintreffende AU-Bescheinigung und die fehlende Benachrichtigung nach der Einreichung.',
        },
        caption: {
          en: 'Before/after artefact pairs — problems referenced: P2 · P3 · P5 · P6 · P8 · P9 · P10 · P12 · P15 · P18 · P20 · P21 · P24 — consolidated register v20.08.2026 · survey n=6, all Blended-Kurs, self-selected, survey open',
          de: 'Vorher/Nachher-Artefaktpaare — referenzierte Probleme: P2 · P3 · P5 · P6 · P8 · P9 · P10 · P12 · P15 · P18 · P20 · P21 · P24 — konsolidiertes Register v20.08.2026 · Umfrage n=6, alle Blended-Kurs, selbstselektiert, Umfrage offen',
        },
        // The legend is the figure's reading key, and at column width it is
        // the first thing that stops being legible — so it is restated here,
        // where it renders as text rather than as four coloured rules.
        takeawayLabel: { en: 'How to read it', de: 'Wie sie zu lesen ist' },
        takeaway: {
          en: 'Four callout tones carry the argument: red states a problem as the process stands today, green a win paired to that exact problem, amber a gate the app checks before it will go on, and a dashed red note an honest limit. Every red has either a green or a dashed note facing it — nothing on the figure is left implying a fix that does not exist.',
          de: 'Vier Callout-Töne tragen die Argumentation: Rot benennt ein Problem im heutigen Prozess, Grün eine Lösung, die genau diesem Problem zugeordnet ist, Bernstein ein Gate, das die App prüft, bevor sie weitergeht, und eine gestrichelte rote Notiz eine ehrliche Grenze. Jedem Rot steht entweder ein Grün oder eine gestrichelte Notiz gegenüber — nichts auf der Abbildung suggeriert eine Lösung, die es nicht gibt.',
        },
        linkLabel: { en: 'Open the figure full size', de: 'Abbildung in voller Größe öffnen' },
      },
      // ── The enforcement table. Companion to the round-trip diagram: that
      // one tells a non-coder how it works, this tells an engineer what is
      // guaranteed — and by which build-failing test.
      {
        type: 'image',
        src: architectureGuarantees,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Architecture · what is guaranteed', de: 'Architektur · was garantiert ist' },
        title: {
          en: 'Which boundaries are enforced, and which are only convention',
          de: 'Welche Grenzen erzwungen sind — und welche nur Konvention',
        },
        description: {
          en: 'A boundary counts as enforced only if a build-time test fails when it is crossed; everything else is discipline. Four boundaries pass that bar — the pure rules package, access control in all four storage adapters, the server’s default-deny guard, and the shared access-control definition both sides import — each with its test named in the table. One does not: nothing separates screens from adapters, and the table says so, counter-example included. Stating which claims rest on a mechanism and which rest on discipline is the same evidence-grading the research applies to its findings, applied to the codebase.',
          de: 'Eine Grenze gilt nur dann als erzwungen, wenn ein Build-Test scheitert, sobald sie überschritten wird; alles andere ist Disziplin. Vier Grenzen bestehen diese Prüfung — das reine Regelpaket, die Zugriffskontrolle in allen vier Speicher-Adaptern, der Default-Deny-Guard des Servers und die geteilte Zugriffsdefinition, die beide Seiten importieren — jede mit benanntem Test in der Tabelle. Eine besteht sie nicht: Nichts trennt Screens von Adaptern, und die Tabelle sagt das, Gegenbeispiel inklusive. Zu benennen, welche Aussagen auf einem Mechanismus und welche auf Disziplin beruhen, ist dieselbe Evidenz-Einstufung, die die Forschung auf ihre Befunde anwendet — angewandt auf den Code.',
        },
        alt: {
          en: 'Table with five rows — Screens, Rules, Storage, Server, shared — and columns for the guarantee, the enforcing test, and what does not hold. Four rows carry an ENFORCED badge with a lock icon and a named test file; the Screens row carries a dashed CONVENTION badge and names 36 direct imports as the counter-example.',
          de: 'Tabelle mit fünf Zeilen — Screens, Regeln, Speicher, Server, shared — und Spalten für die Garantie, den erzwingenden Test und das, was nicht gilt. Vier Zeilen tragen ein ENFORCED-Badge mit Schloss und benannter Testdatei; die Screens-Zeile trägt ein gestricheltes CONVENTION-Badge und nennt 36 direkte Importe als Gegenbeispiel.',
        },
        caption: {
          en: 'Enforcement table — every path exists at commit 47b0301',
          de: 'Enforcement-Tabelle — jeder Pfad existiert bei Commit 47b0301',
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

      // ── The traceability pair. The mechanism the methodology text
      // describes, drawn twice: once closing end to end, once honestly
      // failing to. Publish together, in this order — the open chain alone
      // reads as a defect list; after the closed one it reads as rigour.
      //
      // Both carry `pending: true` and no `src`: neither export has been
      // drawn yet, so they render the frame that says the artwork is coming
      // rather than a broken image — the rule stated at the top of
      // SectionMedia.jsx.
      //
      // They deliberately do NOT carry a `${DOCS}` path. A public URL that
      // points at nothing still renders an <img>, and neither the build nor
      // the figure guard in projects.test.js can tell that it 404s — the
      // guard only asks for a src, an href or `pending`, never that the file
      // resolves. Every other figure on this page is an `import` instead, and
      // that is the difference worth keeping: a missing imported asset fails
      // `vite build` outright with UNRESOLVED_IMPORT and names this module,
      // so the artwork cannot go missing quietly a second time.
      //
      // To publish, drop the PNG next to this module and add its import at
      // the top of the file, alongside the other figure assets:
      //   import traceabilityChain from './traceability-chain.png';
      //   import traceabilityChainOpen from './traceability-chain-open.png';
      // then set `src: traceabilityChain` / `src: traceabilityChainOpen` and
      // delete the `pending: true` line. Nothing else about the entries
      // changes — the framing below is already final.
      {
        type: 'image',
        pending: true,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Traceability · the chain that closes', de: 'Traceability · die Kette, die schließt' },
        title: {
          en: 'From one participant sentence to an enforced constraint',
          de: 'Von einem Teilnehmenden-Satz zu einer erzwungenen Regel',
        },
        description: {
          en: 'One finding, followed end to end. Four of six survey respondents do not know how their reimbursement is calculated — two have stopped trying: "No, I just take the amount as it comes." That became problem P3/P15 in the register, the requirement that a participant-visible amount must never be a black box, the pure calculation module whose trace every role renders, and a build-failing test that keeps the citation chain intact. The figure also states the mechanism’s limit on its face: the guard fails on a citation without a source — never on a problem without an implementation.',
          de: 'Ein Befund, durchgängig verfolgt. Vier von sechs Befragten wissen nicht, wie ihre Erstattung berechnet wird — zwei haben aufgehört, es zu versuchen: „Nein, ich nehme den Betrag so, wie er kommt.“ Daraus wurde Problem P3/P15 im Register, die Anforderung, dass ein teilnehmenden-sichtbarer Betrag nie eine Black Box sein darf, das reine Berechnungsmodul, dessen Nachvollziehbarkeit jede Rolle anzeigt, und ein Build-brechender Test, der die Zitationskette intakt hält. Die Abbildung benennt auch die Grenze des Mechanismus: Der Guard scheitert an einem Zitat ohne Quelle — nie an einem Problem ohne Umsetzung.',
        },
        alt: {
          en: 'Five-stage chain from left to right: a survey verbatim, problem P3/P15 with a CONFIRMED chip, the requirements row, the calculation code files, and a guard test drawn as a lock closing back onto the chain with a return arrow labelled build fails. A handwritten annotation states the limit of the guard.',
          de: 'Fünfstufige Kette von links nach rechts: ein Umfrage-Zitat, Problem P3/P15 mit CONFIRMED-Chip, die Anforderungszeile, die Berechnungs-Codedateien und ein Guard-Test, gezeichnet als Schloss, das sich mit einem Rückpfeil „build fails" auf die Kette schließt. Eine handschriftliche Anmerkung benennt die Grenze des Guards.',
        },
        caption: {
          en: 'The chain that closes — survey n=6, open · consolidated register v20.08.2026',
          de: 'Die Kette, die schließt — Umfrage n=6, offen · konsolidiertes Register v20.08.2026',
        },
      },
      {
        type: 'image',
        pending: true,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Traceability · where it does not close', de: 'Traceability · wo sie nicht schließt' },
        title: {
          en: 'And where the chain does not close',
          de: 'Und wo die Kette nicht schließt',
        },
        description: {
          en: 'The same five stages for problem P21, silent intake — and an honest break before the last one. Four of six respondents learn their documents arrived only when the money appears; a fifth does not check at all. The requirement row exists, the error case is implemented in plain German, and the positive case — telling a participant their documents did arrive — is not built. The requirements table says so, the link to the guard is drawn broken, and the lock stands open: blocked and recorded, not defective.',
          de: 'Dieselben fünf Stufen für Problem P21, Silent Intake — mit einem ehrlichen Bruch vor der letzten. Vier von sechs Befragten erfahren nur am eintreffenden Geld, dass ihre Unterlagen angekommen sind; eine fünfte Person prüft gar nicht. Die Anforderungszeile existiert, der Fehlerfall ist auf verständlichem Deutsch umgesetzt, und der positive Fall — Teilnehmenden zu sagen, dass ihre Unterlagen angekommen sind — ist nicht gebaut. Die Anforderungstabelle sagt das, die Verbindung zum Guard ist gebrochen gezeichnet, und das Schloss steht offen: blockiert und dokumentiert, nicht defekt.',
        },
        alt: {
          en: 'Compressed five-stage chain for problem P21 ending in a dashed, broken link before the guard test, whose lock is drawn open. A handwritten line beneath reads: the positive case — telling a TN their documents arrived — is not built; the table says so.',
          de: 'Komprimierte fünfstufige Kette für Problem P21, die vor dem Guard-Test in einer gestrichelten, gebrochenen Verbindung endet; das Schloss ist offen gezeichnet. Eine handschriftliche Zeile darunter lautet: Der positive Fall — Teilnehmenden zu sagen, dass ihre Unterlagen angekommen sind — ist nicht gebaut; die Tabelle sagt das.',
        },
        caption: {
          en: 'Where the chain does not close — survey n=6, open · consolidated register v20.08.2026',
          de: 'Wo die Kette nicht schließt — Umfrage n=6, offen · konsolidiertes Register v20.08.2026',
        },
      },
    ],

    design: [
      // The Phase 2 artefact. It anchors the design section rather than
      // `solution` because the point is not how the app looks — it
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
      // The sketch → wireframe → shipped strip lived here until 27.08.2026.
      // It documents the wireframe stage, not the token system, so it moved
      // to figures.wireframe and anchors that section now.
    ],

    wireframe: [
      // ── Process strip: sketch, wireframe and shipped build of one screen.
      // Deliberately glanceable — under forty words on the figure itself;
      // the artefacts are the evidence, so nothing in it is redrawn.
      //
      // Artwork exported 20.08.2026 as SVG — the three slots are a photo, the
      // wireframe export and a screenshot, embedded, so the strip stays sharp
      // at full width. This entry carried the NEEDS_INPUT sentinel until then.
      //
      // 27.08.2026: the three embedded panels were decoded and checked while
      // the wireframe section was written. All three show the attendance-
      // month screen (the wireframe panel is page 1g, Anwesenheit · Monat;
      // the shipped panel is the deployed Anwesenheit → Monat view), so the
      // "participant screen" wording here, in the design prose and in the
      // SVG's own labels was corrected to name the screen.
      {
        type: 'image',
        src: processStrip,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Process · sketch to shipped', de: 'Prozess · Skizze bis Auslieferung' },
        title: {
          en: 'From sketch to wireframe to shipped screen',
          de: 'Von der Skizze über das Wireframe zum ausgelieferten Screen',
        },
        description: {
          en: 'Three stages of the same screen: the paper sketch from the process observation, the Phase 2 wireframe drawn against the numbered requirements, and the attendance-month view in the deployed app. None of the three is redrawn — the sketch is a photograph, the wireframe is the original export, and the third panel is a screenshot of the running build.',
          de: 'Drei Stufen desselben Screens: die Papierskizze aus der Prozessbeobachtung, das Phase-2-Wireframe entlang der nummerierten Anforderungen und die Anwesenheits-Monatsansicht in der bereitgestellten App. Keine der drei Stufen ist nachgezeichnet — die Skizze ist ein Foto, das Wireframe der Originalexport, das dritte Feld ein Screenshot des laufenden Builds.',
        },
        alt: {
          en: 'Three-panel strip labelled Sketch, Wireframe, Shipped, showing the same attendance-month screen as a paper sketch photograph, a wireframe export, and a screenshot of the deployed build, connected by two arrows.',
          de: 'Dreiteiliger Streifen mit den Feldern Skizze, Wireframe, Ausgeliefert: derselbe Anwesenheits-Monatsscreen als fotografierte Papierskizze, als Wireframe-Export und als Screenshot des ausgelieferten Builds, verbunden durch zwei Pfeile.',
        },
        caption: {
          en: 'Sketch, wireframe and shipped build of the attendance-month screen',
          de: 'Skizze, Wireframe und ausgelieferter Build des Anwesenheits-Monatsscreens',
        },
      },
      // ── The low-fidelity wireframe set at reading size. One page of it is
      // already on this page — the attendance-month panel inside the strip
      // above — but at panel width (453 CSS px) it can only prove the stage
      // happened. This entry publishes the same screen full-width.
      //
      // Provenance (02.09.2026): the low-fi set is a live, clickable
      // Figma Make site (IBS-FKTN-LOW-FI) with one tab per screen — Start,
      // Übersicht as table / pipeline / charts, Anwesenheit by month and by
      // week, TN Detail, TN Formular, TN-Daten, Kalender & Plan. The file
      // beside this module is a 2× deterministic capture of the
      // "Anwes.·Monat" tab, taken at a 1440 px viewport with the wireframe
      // tab bar hidden and cropped to the content box, so what is published
      // is the wireframe itself and not a screenshot of a website chrome.
      // The description below is written against that capture.
      //
      // Further screens of the set become sibling entries, same shape.
      {
        type: 'image',
        src: wireframeAttendance,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Low-fidelity wireframe', de: 'Low-Fidelity-Wireframe' },
        title: {
          en: 'The attendance-month wireframe at full size',
          de: 'Das Anwesenheits-Monats-Wireframe in voller Größe',
        },
        description: {
          en: 'The attendance-month screen from the low-fidelity set, at a size where it can actually be read. Everything that carries meaning is spelled out and everything else stays a grey bar — that is the point of a low-fidelity wireframe: the structure gets decided before colour, wording and typography can distract from it. The structure is already the shipped one: the role navigation on the left, the programme selector in the header, a toggle between the month view and the week view, an attendance-code legend, and one row per participant with a cell for every day of the month. The cells hold the actual vocabulary — X for a day attended, U for an unexcused absence, an em dash for a day that is not a working day — weekends, holidays and school-holiday columns are shaded rather than left to be counted by hand, and the Σ column adds each participant’s attendance days up, which is the number the whole reimbursement calculation hangs on.',
          de: 'Der Anwesenheits-Monatsscreen aus dem Low-Fidelity-Satz, in einer Größe, in der er sich tatsächlich lesen lässt. Alles, was Bedeutung trägt, ist ausformuliert, alles andere bleibt ein grauer Balken — genau dafür ist ein Low-Fidelity-Wireframe da: Die Struktur wird entschieden, bevor Farbe, Wortlaut und Typografie davon ablenken können. Die Struktur ist bereits die ausgelieferte: die Rollennavigation links, die Maßnahmenauswahl im Kopfbereich, ein Umschalter zwischen Monats- und Wochenansicht, eine Legende der Anwesenheitscodes und je teilnehmender Person eine Zeile mit einer Zelle für jeden Tag des Monats. Die Zellen tragen das echte Vokabular — X für einen besuchten Tag, U für unentschuldigtes Fehlen, ein Gedankenstrich für einen Nicht-Arbeitstag —, Wochenenden, Feiertage und Ferienspalten sind hinterlegt statt von Hand ausgezählt, und die Σ-Spalte summiert die Anwesenheitstage je Person: die Zahl, an der die gesamte Erstattungsberechnung hängt.',
        },
        alt: {
          en: 'Low-fidelity wireframe of the attendance-month screen: a left sidebar with the sections Start, Übersicht, Anwesenheit, Teilnehmende, Hilfsmittel, Freigaben and Sonstiges, a header with a programme selector, a month/week toggle and an attendance-code legend, and a table with one row per participant and one column per day of the month, cells reading X, U or an em dash, shaded weekend and school-holiday columns, a Σ column of attendance days, and a legend for public holiday/weekend, school holiday and working day.',
          de: 'Low-Fidelity-Wireframe des Anwesenheits-Monatsscreens: links eine Seitenleiste mit den Bereichen Start, Übersicht, Anwesenheit, Teilnehmende, Hilfsmittel, Freigaben und Sonstiges, im Kopfbereich eine Maßnahmenauswahl, ein Monats-/Wochen-Umschalter und eine Legende der Anwesenheitscodes, darunter eine Tabelle mit je einer Zeile pro teilnehmender Person und einer Spalte pro Tag des Monats, Zellen mit X, U oder Gedankenstrich, hinterlegten Wochenend- und Ferienspalten, einer Σ-Spalte der Anwesenheitstage sowie einer Legende für Feiertag/WE, Schulferien und Arbeitstag.',
        },
        caption: {
          en: 'Attendance · month — low-fidelity wireframe from the clickable set built in Figma Make',
          de: 'Anwesenheit · Monat — Low-Fidelity-Wireframe aus dem klickbaren Satz, gebaut in Figma Make',
        },
      },
    ],
  },

  // A live build is the strongest evidence an in-progress project can offer:
  // evaluation has no results yet, but the thing itself is open and clickable.
  // Runs on the demo adapter — fictional data pinned as fictional by a test,
  // external data sources disabled — so the link is safe to hand to a stranger.
  prototype: {
    en: 'A demo build is deployed on Vercel so the team can work with the app and give feedback ahead of the release — it runs entirely in the browser on fictional data, so it is safe to share. In parallel (status: August 2026) the usability evaluation is instrumented into the build itself: guided tasks per role, an event log, and an end-of-session questionnaire, being exercised now and ready for evaluation sessions once the app is deployed for daily use. One status, AUSGEZAHLT, is modelled but not yet producible: the payment leg of the real process is not digital, and the prototype says so instead of simulating it.',
    de: 'Auf Vercel ist ein Demo-Build bereitgestellt, damit das Team vor der Veröffentlichung mit der App arbeiten und Feedback geben kann — er läuft vollständig im Browser auf fiktiven Daten und ist deshalb unbedenklich teilbar. Parallel (Stand August 2026) ist die Usability-Evaluation in den Build selbst instrumentiert: geführte Aufgaben je Rolle, ein Ereignisprotokoll und ein Abschlussfragebogen — jetzt schon im Einsatz und bereit für Evaluationssitzungen, sobald die App im Alltag läuft. Ein Status, AUSGEZAHLT, ist modelliert, aber noch nicht erzeugbar: Der Auszahlungsschritt des realen Prozesses ist nicht digital, und der Prototyp sagt das, statt es zu simulieren.',
  },

  // Participant language from the survey (open since August 2026, n=6 so
  // far). German originals with English translations — anonymous,
  // non-identifying, quoted as given.
  //
  // These are evidence about the problem, not findings from a study — no
  // study has run — so they render inside the Challenge section rather than
  // in Results. `verbatimsIn` is the per-project override; a project that
  // omits it keeps the default Results placement.
  verbatimsIn: 'challenge',
  verbatims: [
    {
      quote: {
        en: 'No, I just take the amount as it comes.',
        de: 'Nein, ich nehme den Betrag so, wie er kommt.',
      },
      attribution: {
        en: 'Survey respondent, asked whether they check how their reimbursement is calculated — two of six answered in exactly these words (translated from German)',
        de: 'Umfrageteilnehmende:r auf die Frage, ob die Berechnung der Erstattung geprüft wird — zwei von sechs antworteten wörtlich so',
      },
    },
    {
      quote: {
        en: 'The processing time is the hardest part for me.',
        de: 'Die Bearbeitungszeit ist für mich am schwierigsten.',
      },
      attribution: {
        en: 'Survey respondent — four of six named processing time as their main difficulty; translated from German',
        de: 'Umfrageteilnehmende:r — vier von sechs nannten die Bearbeitungszeit als größte Schwierigkeit',
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

  // The outcome block joined the shared status system in the Phase 3
  // normalization: this project's earlier objection was to the "Outcome
  // Unknown" pill specifically (a verdict on running work), and the
  // vocabulary now carries "deferred" — evaluation designed, pending by
  // decision — which states exactly what is true. Body content moved here
  // from `results`, not written new; nothing is estimated or upgraded.
  outcome: {
    body: {
      en: 'Deferred by decision (status: August 2026): this space reports measured outcomes once the application is published and in daily use. The evaluation is already built into the app — guided tasks, an event log, an end-of-session questionnaire — so when the sessions run, what changed gets recorded here, not estimated beforehand.',
      de: 'Aufgeschoben per Entscheidung (Stand August 2026): An dieser Stelle stehen gemessene Ergebnisse, sobald die Anwendung veröffentlicht und im Alltag im Einsatz ist. Die Evaluation ist bereits in die App eingebaut — geführte Aufgaben, ein Ereignisprotokoll, ein Abschlussfragebogen —, sodass hier festgehalten wird, was sich tatsächlich geändert hat, statt es vorab zu schätzen.',
    },
    adoption: 'deferred',
  },

  // Every pointer below resolves to a field that exists in THIS file.
  tagEvidence: [
    { tag: 'UX Research', evidence: "methods: insider observation (>1 year inside the process), two expert interviews plus an administration-team meeting, participant survey (n=6 and open); metrics records six of the 25 documented problems as survey-contributed; verbatims quotes three respondents", status: 'evidenced' },
    { tag: 'Stakeholder Interviews', evidence: "metrics: 'n=2 expert interviews' plus the administration-team working meeting; methods: 'Expert interviews (n=2: project management, accounting)'; methodology names all three contacts and what each side checked", status: 'evidenced' },
    { tag: 'Survey Design', evidence: "methods: 'Participant survey (n=6 and open, anonymous)'; verbatims carries three responses quoted as given; the unreached PK cohort is stated as a limit rather than hidden", status: 'evidenced' },
    { tag: 'Thematic Analysis', evidence: "methodology Define: thematic clustering into a problem register with a per-entry evidence grade (confirmed / indicative / hypothesis / untested)", status: 'evidenced' },
    { tag: 'Persona Development', evidence: "figures.methodology: seven personas, one composite per role, each stating where its reading came from; methods: persona development with provenance labelling", status: 'evidenced' },
    { tag: 'Process Mapping (UML)', evidence: "figures.challenge: the AS-IS swimlane activity diagram — nine lanes, 13 steps, four return loops — opens the Challenge section; methods: UML activity diagrams (swimlane)", status: 'evidenced' },
    { tag: 'Service Design', evidence: "stakeholder mapping plus the end-to-end AS-IS cycle across nine actors; no rendered service blueprint exists yet — the TO-BE is delivered as role views and a claim state machine", status: 'thin' },
    { tag: 'Requirements Engineering', evidence: "methodology Define: clustered problems became numbered requirements and a role-based sitemap; methods: requirements traceability (FR / NFR / P-IDs)", status: 'evidenced' },
    { tag: 'Requirements Traceability', evidence: "methodology Develop: a build-failing test keeps every requirement citation in code traced to its source problem — and states its own limit: it catches a citation without a source, not a problem without an implementation", status: 'evidenced' },
    { tag: 'Information Architecture', evidence: "methods: information architecture & state modelling; solution: five purpose-built role views replacing the spreadsheet ecosystem", status: 'evidenced' },
    { tag: 'State Machine Modelling', evidence: "solution and prototype: the explicit claim state machine, including the modelled-but-unreachable AUSGEZAHLT status, stated honestly on the page", status: 'evidenced' },
    { tag: 'Wireframing', evidence: "wireframe section: the Phase 2 wireframes drawn against the numbered requirements; figures.wireframe: the sketch → wireframe → shipped strip of the attendance-month screen, plus that screen published full-width", status: 'evidenced' },
    { tag: 'Low-Fidelity Wireframe', evidence: "figures.wireframe: the attendance-month screen from the low-fidelity set at full size — structure, vocabulary and day grid decided while everything decorative is still a grey bar; the set covers Start, three Übersicht variants, month and week attendance, TN Detail, TN Formular, TN-Daten and Kalender & Plan", status: 'evidenced' },
    { tag: 'High-Fidelity Wireframe', evidence: "design section: the IBS design system sheet, and figures.prototype: the high-fidelity screens as built — the same attendance-month layout with the role palette, type scale and field states applied; prototype: the deployed demo running all five role views", status: 'evidenced' },
    { tag: 'Figma Make', evidence: "wireframe section and techStack: the low-fidelity set was built as a clickable Figma Make prototype, one tab per view, so the navigation between screens could be walked through; the published figure is a capture of its attendance-month tab", status: 'evidenced' },
    { tag: 'Claude Design', evidence: "techStack: the figures that carry this case study were drawn in Claude Design — the 5W1H frame, the stakeholder map, the simplified app architecture and its guarantees, the before/after artefact comparison, and the sketch → wireframe → shipped strip; the earlier wireframes came from there too, before the clickable set moved to Figma Make", status: 'evidenced' },
    { tag: 'Claude Code', evidence: "techStack: Claude Code was the AI-assisted development environment the React/TypeScript app and its test suite were built in; the case study documents the resulting artefacts, not the tooling, so this tag rests on the stack listing alone", status: 'thin' },
    { tag: 'Interaction Design', evidence: "the guided Schritt-für-Schritt mode, camera capture, and the visible status chain are interaction decisions traceable to numbered problems; no standalone interaction spec is published", status: 'thin' },
    { tag: 'Design Systems', evidence: "design section: the IBS-DesignSystem sheet with the research diagram's lane colours carried unchanged into the shipped UI; a token guard test fails the build on drift between sheet and code", status: 'evidenced' },
    { tag: 'Prototyping', evidence: "prototype: a deployed demo on Vercel running all five role views entirely in the browser on fictional data, safe to hand to a stranger", status: 'evidenced' },
    { tag: 'Usability Evaluation (instrumented)', evidence: "guided tasks per role, a pseudonymous event log and an end-of-session questionnaire are built into the app and dogfooded on my own traffic (three measurement bugs caught); sessions with users are pending deployment", status: 'thin' },
    { tag: 'Accessibility', evidence: "guided step-by-step mode, camera capture, mobile-first upload path — inclusive-design evidence, not a WCAG audit; notBuilt names the sub-768px shell gap openly", status: 'thin' },
    { tag: 'Data Visualization', evidence: "the admin Diagramme view (process donuts, monthly bars) and the hand-authored SVG research figures; no dedicated visualization study", status: 'thin' },
    { tag: 'React', evidence: "techStack; prototype: the deployed build runs all five role views", status: 'evidenced' },
    { tag: 'TypeScript', evidence: "methodology Develop: the calculation rules engineered as pure, unit-tested TypeScript", status: 'evidenced' },
    { tag: 'Node.js / Fastify', evidence: "techStack: Node.js Server (Fastify); the self-hosted target described in the architecture figure — implemented and tested, deployment pending", status: 'evidenced' },
    { tag: 'SQLite', evidence: "techStack and the architecture figure: local SQLite database holding only typed fields — no amount column, no trace column", status: 'evidenced' },
    { tag: 'Excel Automation (SheetJS)', evidence: "techStack: SheetJS / local Excel files — the adapter that reads the institute's existing workbooks so nothing has to be migrated by hand", status: 'evidenced' },
    { tag: 'Automated Testing (Vitest)', evidence: "metrics: 1,234 automated tests, including guards that fail the build on an untraced requirement citation or a design-token drift", status: 'evidenced' },
    { tag: 'Product Instrumentation', evidence: "methodology Deliver: pseudonymous local event log with sessionisation; dogfooding collapsed 690 logged records to 45 real sittings and caught three measurement bugs", status: 'evidenced' },
    { tag: 'Privacy by Design', evidence: "pseudonymous salted logging, local-only storage, a no-real-names build test, proofs mirrored only inside the institute, and the single external call (route lookup) named rather than hidden", status: 'evidenced' },
    { tag: 'GDPR / DSGVO', evidence: "solution: adapters over a local SQLite database with Nextcloud mirroring inside the institute; the published prototype runs on fictional data pinned by a test; survey verbatims are anonymous and non-identifying", status: 'evidenced' },
  ],
};

export default projectData;