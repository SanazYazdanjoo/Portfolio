// Content is sourced from the IBS Fahrtkostenerstattung project documents:
// 5W1H, Stakeholders, Overview UML, Detailed UML, Current Problems, Persona,
// Information Architecture, Design System, README/DECISIONS/REQUIREMENTS.
//
// ⚠️ Phase 4 (evaluation) has not completed. Nothing in `metrics` or `results`
// claims an outcome. Anything not yet evidenced is marked TODO and left null.
import thumbnailImg from './project4-Thumbnail.png';

export const projectData = {
  id: 'project-4',
  status: 'in-progress', // Phase 3 shipped · Phase 4 evaluation running
  stage: { en: "Evaluation in progress", de: "Evaluation läuft" },
  order: 1,
  title: {
    en: 'IBS Fahrtkostenerstattung',
    de: 'IBS Fahrtkostenerstattung',
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
  heroImage: '/projects/project-4/hero-overview-uml.png', // TODO: export from Overview UML

  methods: [
    { en: 'Insider process observation (AS-IS)',              de: 'Insider-Prozessbeobachtung (IST-Zustand)' },
    { en: 'Expert validation interview',                       de: 'Experten-Validierungsinterview' },
    { en: 'Document & artefact analysis',                      de: 'Dokumenten- & Artefaktanalyse' },
    { en: 'Thematic analysis / affinity clustering',           de: 'Thematische Analyse / Affinity Clustering' },
    { en: 'Stakeholder mapping',                                de: 'Stakeholder-Mapping' },
    { en: 'UML activity diagrams (swimlane)',                  de: 'UML-Aktivitätsdiagramme (Swimlane)' },
    { en: '5W1H problem framing',                               de: '5W1H-Problemrahmung' },
    { en: 'Persona development with provenance labelling',     de: 'Personaentwicklung mit Herkunftskennzeichnung' },
    { en: 'Requirements traceability (FR / NFR / P-IDs)',      de: 'Anforderungs-Traceability (FR / NFR / P-IDs)' },
    { en: 'Information architecture & state modelling',        de: 'Informationsarchitektur & Zustandsmodellierung' },
    { en: 'Task-based evaluation build (Phase 4, in progress)', de: 'Aufgabenbasierter Evaluations-Build (Phase 4, laufend)' },
  ],

  metrics: [
    { value: '19', label: { en: 'problems documented, clustered into 5 themes', de: 'dokumentierte Probleme, geclustert in 5 Themen' } },
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
    'SheetJS / Excel adapters',
    'IndexedDB',
    'SVG (hand-authored diagrams)',
    'Claude Design (wireframes)',
  ],

  challenge: {
    en: 'Every month, participants in a state-funded qualification programme claim back their travel costs. On paper it is a form. In practice it was a thirteen-step process spanning nine actors, three unconnected intake channels, and four backward return loops — held together by one administrator who intervened at four separate lane crossings per claim. Nothing moved without her manual push, and when she was away, nobody else could see why sixteen people had not been paid. Participants submitted into a void: no confirmation, no visible calculation, and often more than four weeks before the money appeared. The failure was structural, not clerical — and the people it hurt most were the ones least able to absorb it.',
    de: 'Jeden Monat fordern Teilnehmende eines staatlich geförderten Qualifizierungsprogramms ihre Fahrtkosten zurück. Auf dem Papier ist das ein Formular. In der Praxis war es ein dreizehnstufiger Prozess über neun Akteure, drei unverbundene Einreichungskanäle und vier rückwärtsgerichtete Rückschleifen — zusammengehalten von einer Administratorin, die pro Antrag an vier verschiedenen Spurwechseln manuell eingreifen musste. Ohne ihren manuellen Anstoß bewegte sich nichts, und war sie abwesend, konnte niemand sonst erkennen, warum sechzehn Personen nicht ausgezahlt worden waren. Teilnehmende reichten ins Leere ein: keine Bestätigung, keine sichtbare Berechnung, und oft mehr als vier Wochen, bis das Geld erschien. Das Versagen war strukturell, nicht schreibtechnisch — und am stärksten traf es diejenigen, die es am wenigsten auffangen konnten.',
  },

  solution: {
    en: 'A role-based web application that replaces the shared spreadsheet with five purpose-built views and replaces the manual chase loop with an explicit claim state machine (Under Review → Pending Approval → Approved → Paid). Participants get a mobile-first upload path with camera capture, German/English switching, and an optional guided step-by-step mode for the lowest-fluency users. Every reimbursement amount carries a full formula trace, so the participant, the admin, and the approver read the same number from the same computation — no black-box deductions to explain verbally. All persistence sits behind adapters, so the identical interface runs on demo data, a real Excel workbook, or an institute-owned backend, and participant data never leaves the institute.',
    de: 'Eine rollenbasierte Webanwendung, die die geteilte Tabelle durch fünf zweckgebaute Ansichten ersetzt und die manuelle Nachlaufschleife durch eine explizite Antrags-Zustandsmaschine ersetzt (In Prüfung → Genehmigung ausstehend → Genehmigt → Ausgezahlt). Teilnehmende erhalten einen mobile-first Upload-Pfad mit Kamerafunktion, Deutsch/Englisch-Umschaltung und einem optionalen geführten Schritt-für-Schritt-Modus für Nutzende mit geringer Vertrautheit. Jeder Erstattungsbetrag trägt eine vollständige Formel-Nachvollziehbarkeit, sodass Teilnehmende, Administration und Genehmigende dieselbe Zahl aus derselben Berechnung lesen — keine Black-Box-Abzüge, die mündlich erklärt werden müssen. Sämtliche Datenhaltung liegt hinter Adaptern, sodass dieselbe Oberfläche auf Demodaten, einer echten Excel-Arbeitsmappe oder einem institutseigenen Backend läuft, und Teilnehmendendaten das Institut nie verlassen.',
  },

  methodology: {
    en: 'Phase 1 began from insider practice rather than a clean-room brief: I already knew the workflow from the inside, so the first task was to make that knowledge falsifiable. I reconstructed the AS-IS process as swimlane activity diagrams, framed the problem space with 5W1H, mapped nine stakeholders, and clustered nineteen observed problems into five structural themes. An independent former occupant of the administrator role confirmed the full failure set, which moved that persona from self-report to validated. The other six did not get that treatment, and the persona set says so on every board — provenance and confidence are printed alongside the content, and the two personas resting on no evidence at all are labelled hypothesis-only. Phase 2 turned the clustered problems into numbered requirements, a role-based sitemap, a claim state machine, and the "Ink Bloom" design system: a nine-colour role palette carried consistently from the research diagrams through to the shipped UI, so a lane colour in an activity diagram means the same thing as a badge colour in the app. Phase 3 built it, with the calculation rules as pure, unit-tested TypeScript rather than logic buried in components. Phase 4 — a task-based evaluation with real reviewers in each of the five roles — is running now.',
    de: 'Phase 1 begann mit Insider-Praxis statt einem Reißbrett-Briefing: Ich kannte den Ablauf bereits von innen, die erste Aufgabe war also, dieses Wissen falsifizierbar zu machen. Ich rekonstruierte den IST-Prozess als Swimlane-Aktivitätsdiagramme, rahmte den Problemraum mit 5W1H, kartierte neun Stakeholder und clusterte neunzehn beobachtete Probleme zu fünf strukturellen Themen. Eine unabhängige, ehemalige Inhaberin der Administratorenrolle bestätigte die vollständige Fehlermenge, wodurch diese Persona vom Selbstbericht zur validierten Persona wurde. Die anderen sechs erhielten diese Behandlung nicht, und das Persona-Set zeigt das auf jedem Board — Herkunft und Konfidenz stehen neben dem Inhalt gedruckt, und die zwei Personas ganz ohne Evidenzgrundlage sind als reine Hypothese gekennzeichnet. Phase 2 verwandelte die geclusterten Probleme in nummerierte Anforderungen, eine rollenbasierte Sitemap, eine Antrags-Zustandsmaschine und das Designsystem "Ink Bloom": eine neunfarbige Rollenpalette, konsistent von den Forschungsdiagrammen bis zur ausgelieferten UI getragen, sodass eine Spurfarbe im Aktivitätsdiagramm dasselbe bedeutet wie eine Badge-Farbe in der App. Phase 3 baute es, mit den Berechnungsregeln als reinem, unit-getestetem TypeScript statt in Komponenten vergrabener Logik. Phase 4 — eine aufgabenbasierte Evaluation mit echten Prüfenden in jeder der fünf Rollen — läuft jetzt.',
  },

  results: {
    en: 'The prototype is functional across all five roles and covered by 158 tests, with a build-time check that fails if any requirement cited in code has no traceable acceptance criterion. Two screens remain explicit, labelled placeholders rather than hidden gaps. Evaluation has not concluded, so there are no outcome metrics yet, and this case study will not claim any until there are. What the work has already produced is a decision record: the settled reading of the attendance-legend rule, the reason the digital-signature path stays blocked pending a Data Protection Officer ruling, and the handling of a data-protection incident in which an early demo seed was generated from a real export and carried real participant data — regenerated from two fictional workbooks, with an automated test that now requires every name to trace back to them.',
    de: 'Der Prototyp ist über alle fünf Rollen hinweg funktionsfähig und durch 158 Tests abgedeckt, mit einer Build-Time-Prüfung, die fehlschlägt, wenn eine im Code zitierte Anforderung kein nachvollziehbares Akzeptanzkriterium hat. Zwei Bildschirme bleiben explizit gekennzeichnete Platzhalter statt verborgene Lücken. Die Evaluation ist nicht abgeschlossen, es gibt also noch keine Ergebnismetriken, und diese Fallstudie wird keine behaupten, bevor es welche gibt. Was die Arbeit bereits hervorgebracht hat, ist ein Entscheidungsprotokoll: die verbindliche Lesart der Anwesenheitslegenden-Regel, der Grund, warum der digitale-Signatur-Pfad bis zu einer Entscheidung der Datenschutzbeauftragten blockiert bleibt, und der Umgang mit einem Datenschutzvorfall, bei dem ein früher Demo-Datensatz aus einem echten Export generiert wurde und echte Teilnehmendendaten enthielt — neu generiert aus zwei fiktiven Arbeitsmappen, mit einem automatisierten Test, der nun verlangt, dass jeder Name auf sie zurückverfolgbar ist.',
  },

  // Process gallery
  process: [
    {
      phase: 'discover',
      type: { en: 'Framing', de: 'Rahmung' },
      title: { en: '5W1H — bounding the problem before touching a screen', de: '5W1H — das Problem eingrenzen, bevor ein Screen entsteht' },
      annotation: {
        en: 'Six lenses on one monthly cycle: who is involved, where claims physically enter, what the baseline actually is, why it fails, and how it could be different. Built first, so that later research had a shape to fill rather than a blank page.',
        de: 'Sechs Blickwinkel auf einen Monatszyklus: wer beteiligt ist, wo Anträge physisch eingehen, was die Ausgangslage tatsächlich ist, warum sie scheitert, und wie es anders sein könnte. Zuerst erstellt, damit spätere Forschung eine Form zum Füllen hatte statt eines leeren Blatts.',
      },
      insight: {
        en: 'The WHERE lens did the most work: claims arrive through cloud, e-mail, and paper, but only cloud uploads leave a traceable record. The channel — not the paperwork — was the barrier.',
        de: 'Die WO-Perspektive leistete die meiste Arbeit: Anträge kommen über Cloud, E-Mail und Papier an, aber nur Cloud-Uploads hinterlassen eine nachvollziehbare Spur. Der Kanal — nicht der Papierkram — war die Barriere.',
      },
      imagePath: '/projects/project-4/01-5w1h.png',
    },
    {
      phase: 'discover',
      type: { en: 'Stakeholder Map', de: 'Stakeholder-Map' },
      title: { en: 'Nine actors, one integration point', de: 'Neun Akteure, ein Integrationspunkt' },
      annotation: {
        en: 'Mapping each stakeholder by category, position, and system focus, then tracing where structural placement turns into a bottleneck rather than a handover.',
        de: 'Jeder Stakeholder wurde nach Kategorie, Position und Systemfokus kartiert, um dann nachzuvollziehen, wo strukturelle Platzierung zum Engpass statt zur Übergabe wird.',
      },
      insight: {
        en: 'The Admin sits at the centre of all nine roles by structure, not by seniority. Every friction point downstream traces back to that single crossing.',
        de: 'Die Administration steht strukturell im Zentrum aller neun Rollen, nicht aus Seniorität. Jeder nachgelagerte Reibungspunkt lässt sich auf diese eine Kreuzung zurückführen.',
      },
      imagePath: '/projects/project-4/02-stakeholders.png',
    },
    {
      phase: 'discover',
      type: { en: 'Process Model', de: 'Prozessmodell' },
      title: { en: 'AS-IS activity diagram — the shape of one cycle', de: 'IST-Aktivitätsdiagramm — die Form eines Zyklus' },
      annotation: {
        en: 'Thirteen steps, nine actors, four return loops, drawn as a swimlane activity diagram. The overview version is the argument; the detailed version underneath it is the evidence.',
        de: 'Dreizehn Schritte, neun Akteure, vier Rückschleifen, gezeichnet als Swimlane-Aktivitätsdiagramm. Die Übersichtsversion ist das Argument; die Detailversion darunter ist die Evidenz.',
      },
      insight: {
        en: 'The approval chain runs forward in a line but is broken backward. An error caught late routes to KST 0098 — one lane short of the person who actually produced the claim.',
        de: 'Die Genehmigungskette läuft vorwärts geradlinig, ist aber rückwärts unterbrochen. Ein spät entdeckter Fehler wird an KST 0098 geleitet — eine Spur zu kurz vor der Person, die den Antrag tatsächlich erstellt hat.',
      },
      imagePath: '/projects/project-4/03-overview-uml.png',
    },
    {
      phase: 'discover',
      type: { en: 'Process Model', de: 'Prozessmodell' },
      title: { en: 'Detailed swimlane — every branch and rejection path', de: 'Detaillierte Swimlane — jeder Zweig und Ablehnungspfad' },
      annotation: {
        en: 'The full decision tree, including the internship distance check, the sub-3-km exception, and each point where a claim can be sent back. This is the document the requirement IDs were extracted from.',
        de: 'Der vollständige Entscheidungsbaum, einschließlich der Praktikums-Distanzprüfung, der Unter-3-km-Ausnahme und jedes Punkts, an dem ein Antrag zurückgeschickt werden kann. Aus diesem Dokument wurden die Anforderungs-IDs extrahiert.',
      },
      insight: {
        en: 'Validating a distance rule meant printing a Google Maps route and physically attaching it to a form. That single step justified an entire automated eligibility check.',
        de: 'Eine Distanzregel zu validieren bedeutete, eine Google-Maps-Route auszudrucken und physisch an ein Formular zu heften. Allein dieser Schritt rechtfertigte eine vollständig automatisierte Berechtigungsprüfung.',
      },
      imagePath: '/projects/project-4/04-detailed-uml.png',
    },
    {
      phase: 'define',
      type: { en: 'Thematic Analysis', de: 'Thematische Analyse' },
      title: { en: 'Nineteen problems, five clusters', de: 'Neunzehn Probleme, fünf Cluster' },
      annotation: {
        en: 'Every observed failure written as a tagged note, colour-coded to the role that owns it, then clustered: submission friction, admin overload, information silos, approval-chain disconnects, and governance risk.',
        de: 'Jede beobachtete Schwachstelle als getaggte Notiz erfasst, farbcodiert nach der zuständigen Rolle, dann geclustert: Einreichungsreibung, Admin-Überlastung, Informationssilos, Brüche in der Genehmigungskette und Governance-Risiko.',
      },
      insight: {
        en: 'Proof volume does not predict failure. The participant owing the fewest documents carried the highest risk of the process breaking, because her only viable channel was the untracked one.',
        de: 'Nachweisvolumen sagt kein Scheitern voraus. Die Teilnehmerin mit den wenigsten geschuldeten Dokumenten trug das höchste Risiko eines Prozessabbruchs, weil ihr einziger gangbarer Kanal der nicht nachverfolgte war.',
      },
      imagePath: '/projects/project-4/05-problems.png',
    },
    {
      phase: 'define',
      type: { en: 'Personas', de: 'Personas' },
      title: { en: 'Seven personas — with their confidence printed on them', de: 'Sieben Personas — mit aufgedruckter Konfidenz' },
      annotation: {
        en: 'One validated, two from observed cases, two constructed, two hypothesis-only. Avatars are initial monograms rather than stock photography: a stock face on an unvalidated persona implies a specificity the research does not yet support.',
        de: 'Eine validiert, zwei aus beobachteten Fällen, zwei konstruiert, zwei rein hypothetisch. Avatare sind Initialen-Monogramme statt Stockfotos: ein Stockgesicht bei einer unvalidierten Persona suggeriert eine Konkretheit, die die Forschung noch nicht stützt.',
      },
      insight: {
        en: 'One quote slot is deliberately left empty. The role is currently vacant and no verbatim was captured, so nothing was invented to fill it.',
        de: 'Ein Zitatfeld bleibt bewusst leer. Die Rolle ist derzeit unbesetzt, und es wurde kein O-Ton erfasst — also wurde nichts erfunden, um es zu füllen.',
      },
      imagePath: '/projects/project-4/06-personas.png',
    },
    {
      phase: 'define',
      type: { en: 'Requirements Traceability', de: 'Anforderungs-Traceability' },
      title: { en: 'From an observed problem to a line of code, and back', de: 'Von einem beobachteten Problem zu einer Codezeile, und zurück' },
      annotation: {
        en: 'Each clustered problem became a numbered requirement with an acceptance criterion and named implementing files. The citations live as comments in the source, and a build-time test scans every file and fails if a cited requirement has no row in the traceability table.',
        de: 'Jedes geclusterte Problem wurde zu einer nummerierten Anforderung mit Akzeptanzkriterium und benannten umsetzenden Dateien. Die Zitate leben als Kommentare im Quellcode, und ein Build-Time-Test durchsucht jede Datei und schlägt fehl, wenn eine zitierte Anforderung keine Zeile in der Traceability-Tabelle hat.',
      },
      insight: {
        en: 'This is the part I would defend hardest. It means no requirement can quietly drift out of the codebase, and any reviewer can walk backwards from a function to the participant whose problem justified it. Where a citation could not be verified against the source report, it is flagged in the table rather than presented as settled.',
        de: 'Das ist der Teil, den ich am entschiedensten verteidigen würde. Er bedeutet, dass keine Anforderung unbemerkt aus der Codebasis driften kann, und jede prüfende Person von einer Funktion zurück zur Teilnehmerin gehen kann, deren Problem sie rechtfertigte. Wo ein Zitat nicht gegen den Quellbericht verifiziert werden konnte, ist das in der Tabelle markiert, statt als geklärt dargestellt zu werden.',
      },
      imagePath: '/projects/project-4/07-traceability.png',
    },
    {
      phase: 'design',
      type: { en: 'Information Architecture', de: 'Informationsarchitektur' },
      title: { en: 'From Excel rows to a real application', de: 'Von Excel-Zeilen zu einer echten Anwendung' },
      annotation: {
        en: 'Role-based views replace the single shared spreadsheet; an explicit claim state machine replaces the manual chase loop and the sticky notes. Each persona sees only the screens their role needs — a mobile-first surface for participants, a dense data grid for the Admin.',
        de: 'Rollenbasierte Ansichten ersetzen die eine geteilte Tabelle; eine explizite Antrags-Zustandsmaschine ersetzt die manuelle Nachlaufschleife und die Klebezettel. Jede Persona sieht nur die Screens, die ihre Rolle braucht — eine mobile-first Oberfläche für Teilnehmende, ein dichtes Datenraster für die Administration.',
      },
      insight: {
        en: 'Making status a first-class object, not a column someone updates, is what turns "I wait until the money arrives" into a screen that answers the question directly.',
        de: 'Status als eigenständiges Objekt zu behandeln, statt als Spalte, die jemand aktualisiert, verwandelt "ich warte, bis das Geld da ist" in einen Screen, der die Frage direkt beantwortet.',
      },
      imagePath: '/projects/project-4/08-ia.png',
    },
    {
      phase: 'design',
      type: { en: 'Design System', de: 'Designsystem' },
      title: { en: 'Ink Bloom — one palette from diagram to production UI', de: 'Ink Bloom — eine Palette vom Diagramm bis zur Produktiv-UI' },
      annotation: {
        en: 'Brand core, a nine-colour role palette, a four-state annotation system (note, problem, gate, win), and a spacing scale. Deliberately built so the research artefacts and the shipped interface share one visual language.',
        de: 'Marken-Kern, eine neunfarbige Rollenpalette, ein vierstufiges Annotationssystem (Notiz, Problem, Gate, Erfolg) und eine Abstandsskala. Bewusst so gebaut, dass Forschungsartefakte und ausgelieferte Oberfläche eine gemeinsame visuelle Sprache teilen.',
      },
      insight: {
        en: 'Carrying the role colours from the swimlane diagrams into the app means a stakeholder who reviewed the research can read the interface without relearning anything.',
        de: 'Die Rollenfarben aus den Swimlane-Diagrammen in die App zu übertragen bedeutet, dass ein Stakeholder, der die Forschung geprüft hat, die Oberfläche lesen kann, ohne etwas neu lernen zu müssen.',
      },
      imagePath: '/projects/project-4/09-design-system.png',
    },
    {
      phase: 'deliver',
      type: { en: 'Frontend Development', de: 'Frontend-Entwicklung' },
      title: { en: 'Five role interfaces, one tested calculation engine', de: 'Fünf Rollenoberflächen, eine getestete Berechnungs-Engine' },
      annotation: {
        en: 'React and TypeScript, with the reimbursement rules, attendance logic, and comparison calculation as pure functions under a 158-test suite. Persistence and identity sit behind adapters, and access control is enforced at the adapter, not in the UI.',
        de: 'React und TypeScript, mit Erstattungsregeln, Anwesenheitslogik und Vergleichsberechnung als reinen Funktionen unter einer 158-Test-Suite. Datenhaltung und Identität liegen hinter Adaptern, und Zugriffskontrolle wird am Adapter durchgesetzt, nicht in der UI.',
      },
      insight: {
        en: 'Every computed amount returns its own formula trace. That single architectural choice is what removed the administrator from the job of explaining deductions verbally, every month, to every person.',
        de: 'Jeder berechnete Betrag liefert seine eigene Formel-Nachvollziehbarkeit zurück. Allein diese architektonische Entscheidung nahm der Administration die Aufgabe ab, Abzüge jeden Monat jeder Person mündlich zu erklären.',
      },
      imagePath: '/projects/project-4/10-prototype.png',
    },
    {
      phase: 'deliver',
      type: { en: 'In Progress', de: 'Läuft' },
      title: { en: 'Phase 4 — task-based review build', de: 'Phase 4 — aufgabenbasierter Prüf-Build' },
      annotation: {
        en: 'A dedicated build gives each of the five roles a real login and a scripted task, including one deliberately seeded exception a Manager has to find before bulk-approving the rest. External data sources are force-disabled in this build.',
        de: 'Ein eigener Build gibt jeder der fünf Rollen einen echten Login und eine skriptierte Aufgabe, einschließlich einer bewusst eingebauten Ausnahme, die eine Managerin finden muss, bevor sie den Rest in einem Schritt genehmigt. Externe Datenquellen sind in diesem Build zwangsdeaktiviert.',
      },
      insight: {
        en: 'TODO — evaluation is running. This section will be written from results, not predictions.',
        de: 'TODO — die Evaluation läuft. Dieser Abschnitt wird aus Ergebnissen geschrieben, nicht aus Prognosen.',
      },
      imagePath: null,
    },
  ],
};

export default projectData;
