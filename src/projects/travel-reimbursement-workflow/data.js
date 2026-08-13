// Content is sourced from the IBS Fahrtkostenerstattung project documents:
// 5W1H, Stakeholders, Overview UML, Detailed UML, Current Problems, Persona,
// Information Architecture, Design System, README/DECISIONS/REQUIREMENTS.
//
// ⚠️ Phase 4 (evaluation) has not completed. Nothing in `metrics` or `results`
// claims an outcome. Anything not yet evidenced is marked TODO and left null.
//
// Process screenshots: staff names in the source decks were replaced with
// demo names before export (2026-08-13). Personas are composites, not
// portraits of individuals.
import thumbnailImg from './Project-4.png';
import thumbnailWebp from './Project-4.webp';

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
  tagline: {
    en: 'Nineteen documented failures, seven personas each carrying its own confidence rating, and a requirement trail that a build-time test refuses to let me break. Then I built the thing.',
    de: 'Neunzehn dokumentierte Schwachstellen, sieben Personas mit jeweils eigener Konfidenzangabe, und eine Anforderungsspur, die ein Build-Time-Test nicht brechen lässt. Dann habe ich es gebaut.',
  },
  role: {
    en: 'Solo — UX Research, UI Design, and Frontend Development',
    de: 'Alleinverantwortlich — UX Research, UI-Design und Frontend-Entwicklung',
  },
  timeline: '2026 · four phases · ongoing',
  tags: [
    'UX Research',
    'Service Design',
    'Information Architecture',
    'Design System',
    'React / TypeScript',
    'Public Sector',
    'Accessibility',
    'GDPR / DSGVO',
    'Requirements Traceability',
    'Persona Development',
    'Automated Testing (Vitest)',
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

  results: {
    en: 'The prototype is functional across all five roles and covered by 158 tests, with a build-time check that fails if any requirement cited in code has no traceable acceptance criterion. Two screens remain explicit, labelled placeholders rather than hidden gaps. Evaluation has not concluded, so there are no outcome metrics yet, and this case study will not claim any until there are. What the work has already produced is a decision record: the settled reading of the attendance-legend rule, and the reason the digital-signature path stays blocked pending a Data Protection Officer ruling.',
    de: 'Der Prototyp ist über alle fünf Rollen hinweg funktionsfähig und durch 158 Tests abgedeckt, mit einer Build-Time-Prüfung, die fehlschlägt, wenn eine im Code zitierte Anforderung kein nachvollziehbares Akzeptanzkriterium hat. Zwei Bildschirme bleiben explizit gekennzeichnete Platzhalter statt verborgene Lücken. Die Evaluation ist nicht abgeschlossen, es gibt also noch keine Ergebnismetriken, und diese Fallstudie wird keine behaupten, bevor es welche gibt. Was die Arbeit bereits hervorgebracht hat, ist ein Entscheidungsprotokoll: die verbindliche Lesart der Anwesenheitslegenden-Regel und der Grund, warum der digitale-Signatur-Pfad bis zu einer Entscheidung der Datenschutzbeauftragten blockiert bleibt.',
  },

  // Process gallery streamlined into the 4-phase Double Diamond structure
  process: [
    {
      phase: 'discover',
      type: { en: 'Context & Observation', de: 'Kontext & Beobachtung' },
      title: { en: 'DISCOVER: Mapping the AS-IS state', de: 'DISCOVER: Kartierung des IST-Zustands' },
      annotation: {
        en: 'Mapped the AS-IS state through 5W1H bounding, stakeholder interviews, and detailed swimlane activity diagrams to expose the bottlenecks in the existing thirteen-step manual reimbursement loop.',
        de: 'Kartierung des IST-Zustands durch 5W1H-Eingrenzung, Stakeholder-Interviews und detaillierte Swimlane-Aktivitätsdiagramme, um die Engpässe in der bestehenden dreizehnstufigen manuellen Erstattungsschleife aufzudecken.',
      },
      insight: {
        en: 'The WHERE lens did the most work: claims arrive through cloud, e-mail, and paper, but only cloud uploads leave a traceable record. The channel — not the paperwork — was the barrier.',
        de: 'Die WO-Perspektive leistete die meiste Arbeit: Anträge kommen über Cloud, E-Mail und Papier an, aber nur Cloud-Uploads hinterlassen eine nachvollziehbare Spur. Der Kanal — nicht der Papierkram — war die Barriere.',
      },
      imagePath: '/projects/digitalising-ibs-travel-reimbursements/01-discover.png',
      interactiveDiagram: {
        previewPath: '/projects/digitalising-ibs-travel-reimbursements/uml-preview-crop.png',
        livePath: '/projects/digitalising-ibs-travel-reimbursements/detailed-uml.html',
        label: { en: 'Open Interactive UML ↗', de: 'Interaktives UML öffnen ↗' }
      }
    },
    {
      phase: 'define',
      type: { en: 'Synthesis & Traceability', de: 'Synthese & Traceability' },
      title: { en: 'DEFINE: Translating failures into requirements', de: 'DEFINE: Übersetzung von Fehlern in Anforderungen' },
      annotation: {
        en: 'Clustered nineteen observed failures into five core themes using reflexive thematic analysis. Developed confidence-rated personas and translated every observed problem into a strict, numbered technical requirement.',
        de: 'Neunzehn beobachtete Fehler wurden mittels reflexiver thematischer Analyse in fünf Kernthemen geclustert. Entwicklung konfidenzbewerteter Personas und Übersetzung jedes beobachteten Problems in eine strikte, nummerierte technische Anforderung.',
      },
      insight: {
        en: 'This meant no requirement could quietly drift out of the codebase, and any reviewer can walk backwards from a function to the participant whose problem justified it.',
        de: 'Das bedeutete, dass keine Anforderung unbemerkt aus der Codebasis driften konnte, und jede prüfende Person von einer Funktion zurück zur Teilnehmerin gehen kann, deren Problem sie rechtfertigte.',
      },
      imagePath: '/projects/digitalising-ibs-travel-reimbursements/02-define.png', 
    },
    {
      phase: 'develop',
      type: { en: 'Architecture & Systems', de: 'Architektur & Systeme' },
      title: { en: 'DEVELOP: Building the state machine & IBS-DesignSystem', de: 'DEVELOP: Aufbau der Zustandsmaschine & IBS-DesignSystem' },
      annotation: {
        en: 'Transitioned from Excel constraints to a role-based explicit state machine. Mapped UI touchpoints for five distinct roles and established the IBS-DesignSystem to bridge research artifacts with the final interface.',
        de: 'Übergang von Excel-Einschränkungen zu einer rollenbasierten expliziten Zustandsmaschine. Kartierung von UI-Touchpoints für fünf verschiedene Rollen und Etablierung des IBS-DesignSystems, um Forschungsartefakte mit der finalen Oberfläche zu verbinden.',
      },
      insight: {
        en: 'Making status a first-class object, not a column someone updates, is what turns "I wait until the money arrives" into a screen that answers the question directly.',
        de: 'Status als eigenständiges Objekt zu behandeln, statt als Spalte, die jemand aktualisiert, verwandelt "ich warte, bis das Geld da ist" in einen Screen, der die Frage direkt beantwortet.',
      },
      imagePath: '/projects/digitalising-ibs-travel-reimbursements/03-develop.png',
    },
    {
      phase: 'deliver',
      type: { en: 'Build & Validate', de: 'Build & Validierung' },
      title: { en: 'DELIVER: 158 automated tests and a live engine', de: 'DELIVER: 158 automatisierte Tests und eine Live-Engine' },
      annotation: {
        en: 'Developed the frontend application powered by a 158-test calculation engine. Conducted task-based review builds with seeded exceptions to ensure control is enforced at the adapter level, not just in the UI.',
        de: 'Entwicklung der Frontend-Anwendung, angetrieben von einer 158-Test-Berechnungs-Engine. Durchführung aufgabenbasierter Review-Builds mit gezielt gesetzten Ausnahmen, um sicherzustellen, dass Kontrolle auf Adapterebene erzwungen wird, nicht nur in der UI.',
      },
      insight: {
        en: 'The post-build survey revealed that the structural gap affects everyone, not just low-fluency users. Four of five submit independently from a smartphone; the true cost is the invisible backend state.',
        de: 'Die Umfrage nach dem Build zeigte, dass die strukturelle Lücke alle betrifft, nicht nur Nutzende mit geringer Vertrautheit. Vier von fünf reichen eigenständig per Smartphone ein; die wahren Kosten sind der unsichtbare Backend-Status.',
      },
      imagePath: '/projects/digitalising-ibs-travel-reimbursements/04-deliver.png',
    },
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

  // The "decisions" drafted earlier (attendance-legend rule, signature-path
  // block) paraphrased sentences already stated verbatim in `results`
  // immediately above this section — visible duplication on the rendered
  // page, not a distinct set of post-build consequences. Cross-referenced
  // instead of repeated; omitted `decisions` rather than restate them under
  // a different heading.
  outcome: {
    body: {
      en: "Evaluation (Phase 4) has not concluded, so no adoption or performance outcome exists yet — this section will not claim one until it does. What does exist is a working build you can open and use: the prototype link above runs all five role interfaces end to end. The concrete decisions the work has already produced (the attendance-legend rule, the blocked signature path) are documented in Key Findings above, not repeated here.",
      de: "Die Evaluation (Phase 4) ist nicht abgeschlossen, es existiert also noch kein Adoptions- oder Leistungsergebnis — dieser Abschnitt wird keines behaupten, bevor es eines gibt. Was es gibt, ist ein funktionierender Build zum Ausprobieren: Der Prototyp-Link oben führt alle fünf Rollenoberflächen durchgängig aus. Die konkreten Entscheidungen, die die Arbeit bereits hervorgebracht hat (die Anwesenheitslegenden-Regel, der blockierte Signaturpfad), sind oben unter Zentrale Ergebnisse dokumentiert und werden hier nicht wiederholt.",
    },
    adoption: "unknown",
  },

  tagEvidence: [
    { tag: "UX Research", evidence: "process:Back to discovery after the build — participant survey (n=5, Aug 2026) with per-finding evidence labels; also methods: \"Insider process observation (AS-IS)\", \"Expert validation interview\"", status: "evidenced" },
    { tag: "Service Design", evidence: "process:Nine actors, one integration point (stakeholder map) + AS-IS swimlane activity diagrams — no rendered service blueprint exists; the solution's role-based views/state machine is a UI redesign, not itself service-design evidence", status: "thin" },
    { tag: "Information Architecture", evidence: "process:From Excel rows to a real application", status: "evidenced" },
    { tag: "Design System", evidence: "process:IBS-DesignSystem — one palette from diagram to production UI", status: "evidenced" },
    { tag: "React / TypeScript", evidence: "process:Five role interfaces, one tested calculation engine", status: "evidenced" },
    { tag: "Public Sector", evidence: "challenge: \"participants in a state-funded qualification programme\" — direct citation of state/public funding as the programme context", status: "evidenced" },
    { tag: "Accessibility", evidence: "solution: \"optional guided step-by-step mode for the lowest-fluency users\" — inclusive-design evidence, not a WCAG/a11y audit", status: "thin" },
    { tag: "GDPR / DSGVO", evidence: "results: digital-signature path blocked pending a Data Protection Officer ruling — a live data-protection constraint shaping what the build is allowed to do", status: "evidenced" },
    { tag: "Requirements Traceability", evidence: "process:From an observed problem to a line of code, and back", status: "evidenced" },
    { tag: "Persona Development", evidence: "process:Seven personas — with their confidence printed on them", status: "evidenced" },
    { tag: "Automated Testing (Vitest)", evidence: "results: \"158 tests\" across 25 files; build-time requirement-traceability check", status: "evidenced" },
  ],
};

export default projectData;