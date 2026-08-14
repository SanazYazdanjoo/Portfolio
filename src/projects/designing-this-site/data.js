// This case study documents the portfolio itself. Unlike the other case
// studies, there is no separate source document to cite: the evidence is
// the rest of this repository. Every architectural claim below (data flow,
// i18n, print pipeline, invariant tests) is verified against the actual
// source at the time of writing, not recalled from memory.
//
// The research-driven parts of methodology/results and the discover-phase
// process entries are deliberately withheld pending real research data
// (5 moderated sessions, a 5-second test on the hero, a first-click test
// on the nav). Zero invented findings, participant counts, or quotes.
// Exception: the four Lighthouse scores in `metrics`/`results` are real,
// measured 2026-08-14 against production (see comment above `metrics`).
//
// No thumbnail/heroImage/figures yet — see assets/README.md.

export const projectData = {
  id: "designing-this-site",
  status: "published",
  order: 99,

  title: {
    en: "Designing This Portfolio",
    de: "Dieses Portfolio gestalten",
  },
  subtitle: {
    en: "A Case Study in Designing Under Constraint — Researcher, Designer, Engineer, and QA on the Same Artifact",
    de: "Eine Fallstudie über Gestalten unter Beschränkung — Researcherin, Designerin, Entwicklerin und QA am selben Artefakt",
  },
  tagline: {
    en: "A recruiter gets thirty seconds. An engineer reads the source. A printer gets one page. Same site, three tests.",
    de: "Eine Recruiterin bekommt dreißig Sekunden. Ein Engineer liest den Quellcode. Ein Drucker bekommt eine Seite. Dieselbe Website, drei Prüfungen.",
  },
  role: {
    en: "Researcher, Designer, Frontend Engineer & QA (solo)",
    de: "Researcherin, Designerin, Frontend-Entwicklerin & QA (alleinverantwortlich)",
  },
  timeline: "Ongoing · continuously iterated",

  tags: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "React Router",
    "Design Systems",
    "Component Architecture",
    "Information Architecture",
    "Responsive Design",
    "Accessibility",
    "Internationalization (i18n)",
    "Print CSS",
    "Automated Testing (Vitest)",
  ],

  methods: [
    { en: "Moderated Usability Testing (5 sessions, in progress)", de: "Moderierte Usability-Tests (5 Sessions, laufend)" },
    { en: "5-Second Test (hero)", de: "5-Sekunden-Test (Hero)" },
    { en: "First-Click Test (navigation)", de: "First-Click-Test (Navigation)" },
    { en: "Component Architecture & Design Systems Engineering", de: "Komponentenarchitektur & Design-Systems-Engineering" },
    { en: "Bilingual Content Architecture (EN/DE)", de: "Zweisprachige Content-Architektur (EN/DE)" },
    { en: "Print-CSS Engineering (screen-to-A4)", de: "Print-CSS-Engineering (Bildschirm zu A4)" },
    { en: "Invariant / Contract Testing (Vitest)", de: "Invarianten-/Contract-Testing (Vitest)" },
  ],

  // Pending, not failed: the protocol for each of these is already defined
  // (see methodology/results below) — the numbers are absent because the
  // sessions that would produce them haven't run, not because measurement
  // was skipped. `pending: true` renders a muted "Measurement pending"
  // state instead of a value; no number is written until one is real.
  //
  // The four Lighthouse rows are real: Lighthouse 13.4.0 against the
  // production site (https://yazdanjoo.de, emulated desktop, 2026-08-14).
  // Performance is 66 and is reported as 66 — see `results` for what
  // drags it down. Re-run and update all four together, not selectively.
  metrics: [
    { value: "66", label: { en: "Lighthouse — Performance", de: "Lighthouse — Performance" } },
    { value: "96", label: { en: "Lighthouse — Accessibility", de: "Lighthouse — Accessibility" } },
    { value: "96", label: { en: "Lighthouse — Best Practices", de: "Lighthouse — Best Practices" } },
    { value: "100", label: { en: "Lighthouse — SEO", de: "Lighthouse — SEO" } },
    { pending: true, label: { en: "WCAG 2.1 AA contrast, all token pairs", de: "WCAG 2.1 AA Kontrast, alle Token-Paare" } },
    { pending: true, label: { en: "Keyboard-only + first-click task success", de: "Tastatur- & First-Click-Erfolg" } },
    { pending: true, label: { en: "CV print length (target: 1 A4 page)", de: "Lebenslauf-Drucklänge (Ziel: 1 A4-Seite)" } },
    { pending: true, label: { en: "5-second test — time to answer ‘what does she do?’", de: "5-Sekunden-Test — Zeit bis zur Antwort" } },
  ],

  techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router", "Vitest", "Testing Library", "ESLint"],

  // Process gallery — discover-phase entries (competitive scan of UX
  // portfolios, the field-notebook concept, the moodboard) are withheld:
  // I have no real notes to cite yet, and won't invent the process that
  // produced them. What's below is the part I can verify against the
  // shipped code: token/typography decisions, the layout architecture,
  // and the component contract every case study — this one included —
  // renders through.
  process: [
    {
      phase: "define",
      type: { en: "Design Tokens", de: "Design-Tokens" },
      title: { en: "Ink & Bloom — Contrast Rules Baked Into the Names", de: "Ink & Bloom — Kontrastregeln in die Namen eingebacken" },
      annotation: {
        en: "A warm paper-and-ink palette with one coral accent and a gold highlighter, defined as raw primitives and consumed only through semantic tokens and .type-* role classes — Bricolage Grotesque for display type, DM Sans for body, Caveat for hand-drawn annotation text. Primary and primary-600 aren't the same token: the -500 step is reserved for large text and shapes, the -600 step for anything small enough that WCAG AA contrast actually matters.",
        de: "Eine warme Papier-und-Tinte-Palette mit einem einzigen Koralle-Akzent und einer goldenen Textmarker-Farbe, definiert als rohe Primitives und ausschließlich über semantische Tokens und .type-*-Rollenklassen genutzt — Bricolage Grotesque für Display-Typografie, DM Sans für Fließtext, Caveat für handschriftliche Annotationen. Primary und primary-600 sind nicht dasselbe Token: Die -500-Stufe ist großem Text und Formen vorbehalten, die -600-Stufe allem, was klein genug ist, dass WCAG-AA-Kontrast tatsächlich relevant wird.",
      },
      insight: {
        en: "Splitting a color into a 'large text' step and a 'small text' step means the contrast rule is enforced by which token name a component reaches for, not by a linter running after the fact — and the gold highlighter is deliberately excluded from that split, restricted by convention to a single highlighter mark per page rather than offered as a general-purpose text color.",
        de: "Eine Farbe in eine 'großer Text'- und eine 'kleiner Text'-Stufe aufzuteilen bedeutet, dass die Kontrastregel dadurch durchgesetzt wird, welchen Token-Namen eine Komponente verwendet — nicht durch einen nachträglich laufenden Linter. Die goldene Textmarker-Farbe ist bewusst von dieser Aufteilung ausgenommen und per Konvention auf eine einzige Markierung pro Seite beschränkt, statt als allgemeine Textfarbe angeboten zu werden.",
      },
      imagePath: null,
    },
    {
      phase: "design",
      type: { en: "Information Architecture", de: "Informationsarchitektur" },
      title: { en: "Three Tracks, Collapsing to One", de: "Drei Spuren, die zu einer zusammenfallen" },
      annotation: {
        en: "Every case study reads as three columns above the xl breakpoint — a sticky numbered section rail, a capped-width prose column, and a right rail that lifts one pull-quote sentence out of the long-form sections — and as a single column with a horizontal pill bar below it. The right rail is explicitly documentation, not new information: below xl it simply doesn't render, because the sentence it repeats already lives in the paragraph next to it.",
        de: "Jede Fallstudie liest sich oberhalb des xl-Breakpoints als drei Spalten — eine sticky, nummerierte Abschnittsleiste, eine breitenbegrenzte Fließtextspalte und eine rechte Spalte, die einen Pull-Quote-Satz aus den Langtext-Abschnitten heraushebt — und unterhalb davon als eine einzige Spalte mit einer horizontalen Pill-Leiste. Die rechte Spalte ist ausdrücklich Dokumentation, keine neue Information: Unterhalb von xl rendert sie schlicht nicht, weil der Satz, den sie wiederholt, bereits im danebenliegenden Absatz steht.",
      },
      insight: {
        en: "Building the rail as a duplicate of existing text, not as its own content slot, means a translator or a future editor only has to write one sentence, not two that have to be kept in sync by hand.",
        de: "Die rechte Spalte als Duplikat bestehenden Texts zu bauen, statt als eigenen Inhaltsslot, bedeutet, dass eine Übersetzerin oder eine künftige Redakteurin nur einen Satz schreiben muss, nicht zwei, die von Hand synchron gehalten werden müssten.",
      },
      imagePath: null,
    },
    {
      phase: "design",
      type: { en: "Component Architecture", de: "Komponentenarchitektur" },
      title: { en: "One Template, a Fixed Section List, an Escape Hatch", de: "Eine Vorlage, eine feste Abschnittsliste, eine Fluchttür" },
      annotation: {
        en: "Every case study — this one included — renders through the same ProjectTemplate({ meta, children }) contract. A fixed SECTIONS array decides what can appear and in what order; a data key that isn't in that array simply cannot render, no matter what a data.js file contains. A children escape hatch exists for the rare case a project needs something the section list doesn't cover, but it's additive — it appends after the standard sections rather than letting a project opt out of them.",
        de: "Jede Fallstudie — diese eingeschlossen — rendert über denselben ProjectTemplate({ meta, children })-Vertrag. Ein festes SECTIONS-Array entscheidet, was in welcher Reihenfolge erscheinen kann; ein Datenschlüssel, der nicht in diesem Array steht, kann schlicht nicht rendern, egal was eine data.js-Datei enthält. Eine children-Fluchttür existiert für den seltenen Fall, dass ein Projekt etwas braucht, das die Abschnittsliste nicht abdeckt, ist aber additiv — sie hängt sich hinter die Standardabschnitte an, statt einem Projekt zu erlauben, sie zu umgehen.",
      },
      insight: {
        en: "The constraint is the point: this document is bound by the exact same SECTIONS list as every research case study before it, which is what makes 'built under the same rules as the case studies it documents' a checkable claim rather than a tagline.",
        de: "Die Beschränkung ist der Punkt: Dieses Dokument ist an dieselbe SECTIONS-Liste gebunden wie jede Forschungs-Fallstudie davor, was 'gebaut nach denselben Regeln wie die Fallstudien, die es dokumentiert' zu einer überprüfbaren Aussage macht statt zu einem Slogan.",
      },
      imagePath: null,
    },
  ],

  about: {
    en: "A case study on the portfolio you are reading right now, built solo as researcher, designer, frontend engineer, and QA. It is a React and Tailwind site that has to satisfy three very different readers at once: a recruiter with thirty seconds, an engineer who opens the source, and a printer producing a one-page A4 CV. This case study documents the trade-offs those constraints forced.",
    de: "Eine Fallstudie über das Portfolio, das Sie gerade lesen — alleinverantwortlich umgesetzt als Researcherin, Designerin, Frontend-Entwicklerin und QA. Es ist eine React- und Tailwind-Website, die drei sehr unterschiedliche Lesende zugleich bedienen muss: eine Recruiterin mit dreißig Sekunden, eine Entwicklerin, die den Quellcode öffnet, und einen Drucker, der einen einseitigen A4-Lebenslauf ausgibt. Diese Fallstudie dokumentiert die Kompromisse, die daraus folgten.",
  },

  challenge: {
    en: "A recruiter spends roughly thirty seconds on a portfolio before deciding whether to keep reading — and in that window, the only question that matters is whether the person behind it can do the job. That's the primary constraint. But this site can't optimize for that reader alone: a technical reviewer who gets further will open the console and read the actual source, not just the prose, and the same content also has to leave the browser entirely and survive a printer queue as a one-page A4 CV, because plenty of hiring pipelines still forward a PDF, not a URL. Three audiences read the same fifteen files and expect three different things from them: a recruiter wants a verdict in seconds, an engineer wants a contract they can inspect, and a printer wants a page that doesn't orphan a heading halfway down. The decision this case study documents is treating the portfolio itself as a fourth case study — the one where I am simultaneously the researcher framing the problem, the designer making the trade-offs, the engineer shipping the code, and the QA who has to catch my own mistakes before a reader does. Every claim made about the other three case studies — evidence over adjectives, methods stated with an n, failures reported honestly — has to hold up when the artifact making those claims is judged by the same standard.",
    de: "Eine Recruiterin verbringt etwa dreißig Sekunden mit einem Portfolio, bevor sie entscheidet, ob sie weiterliest — und in diesem Fenster zählt nur eine Frage: Kann die Person hinter der Seite den Job? Das ist die primäre Beschränkung. Doch die Website kann nicht allein für diese Leserin optimiert werden: Eine technisch versiertere Prüferin, die weiterliest, öffnet die Konsole und liest den tatsächlichen Quellcode, nicht nur den Fließtext, und derselbe Inhalt muss den Browser vollständig verlassen und als einseitiger A4-Lebenslauf eine Druckerwarteschlange überstehen, weil viele Bewerbungsprozesse noch immer ein PDF erwarten, keine URL. Drei Zielgruppen lesen dieselben fünfzehn Dateien und erwarten drei unterschiedliche Dinge davon: Eine Recruiterin will in Sekunden ein Urteil, eine Entwicklerin einen Vertrag, den sie prüfen kann, und ein Drucker eine Seite, die keine Überschrift verwaist zurücklässt. Die Entscheidung, die diese Fallstudie dokumentiert, ist, das Portfolio selbst als vierte Fallstudie zu behandeln — jene, in der ich gleichzeitig die Researcherin bin, die das Problem rahmt, die Designerin, die die Kompromisse trifft, die Entwicklerin, die den Code ausliefert, und die QA, die eigene Fehler abfangen muss, bevor eine Leserin es tut. Jeder Anspruch, der in den anderen drei Fallstudien erhoben wird — Evidenz statt Adjektive, Methoden mit angegebenem n, ehrlich berichtete Fehlschläge — muss standhalten, wenn das Artefakt, das diese Ansprüche erhebt, am selben Maßstab gemessen wird.",
  },

  solution: {
    en: "Three explicit trade-offs shape the visual system and the information architecture. First, the hand-drawn doodles (Framer Motion pathLength draw-ins, a Caveat display face for annotations) carry personality against an otherwise disciplined type system — the cost is looking less immediately 'corporate' than a template-driven portfolio, a bet that a recruiter remembers a site with a voice. Second, every section on a case study renders open by default rather than collapsed: the primary reader is scanning for thirty seconds, and gating evidence behind a click optimizes for the wrong person. That decision also keeps browser find-in-page working end to end, lets a shared deep link land on visible content instead of a closed accordion, and means the screen and the printed page show the same information without a separate print-only layout. The cost is a longer page and a denser first paint; the mitigation is a sticky numbered section rail plus a per-section collapse control for a reader who wants to prune rather than scroll. Third, color is rationed on purpose: one loud coral (#892107) carries every accent, and the gold highlighter mark is used exactly once per page, by convention documented on the style guide itself — restraint as a design decision, not an oversight. The style guide isn't duplicated into this case study; it's linked directly, so a claim about the token system or the type scale can be checked against the same live tokens the rest of the site uses, not a screenshot of them.",
    de: "Drei bewusste Kompromisse prägen das visuelle System und die Informationsarchitektur. Erstens tragen die handgezeichneten Doodles (Framer-Motion-Pfadlängen-Animationen, eine Caveat-Displayschrift für Annotationen) Persönlichkeit gegen ein sonst diszipliniertes Typesystem — der Preis ist, weniger unmittelbar 'seriös' zu wirken als ein templategetriebenes Portfolio, eine Wette darauf, dass eine Recruiterin sich an eine Seite mit einer Stimme erinnert. Zweitens rendert jeder Abschnitt einer Fallstudie standardmäßig geöffnet statt eingeklappt: Die primäre Leserin scannt dreißig Sekunden lang, und Evidenz hinter einem Klick zu verstecken optimiert für die falsche Person. Diese Entscheidung hält außerdem die browserinterne Suche durchgängig funktionsfähig, lässt einen geteilten Deep-Link auf sichtbarem statt eingeklapptem Inhalt landen, und bedeutet, dass Bildschirm- und Druckausgabe dieselben Informationen zeigen, ohne ein separates reines Drucklayout. Der Preis ist eine längere Seite und ein dichterer erster Bildaufbau; die Abmilderung ist eine sticky nummerierte Abschnittsleiste plus eine Einklapp-Kontrolle pro Abschnitt für Leserinnen, die kürzen statt scrollen wollen. Drittens wird Farbe bewusst rationiert: Ein einziges lautes Koralle (#892107) trägt jeden Akzent, und die goldene Textmarker-Markierung wird laut dokumentierter Konvention im Styleguide selbst genau einmal pro Seite eingesetzt — Zurückhaltung als Designentscheidung, nicht als Versehen. Der Styleguide wird nicht in diese Fallstudie hineinkopiert, sondern direkt verlinkt, damit sich eine Aussage über das Token-System oder die Schriftskala gegen dieselben lebenden Tokens prüfen lässt, die der Rest der Website verwendet — nicht gegen einen Screenshot davon.",
  },

  prototype: {
    en: "The engineering is the part I can defend line by line. Content has one source: profile data lives in a single data.json compiled into profile.js, and every case study is a folder with a data.js that import.meta.glob discovers at build time — there is no manual project registry to forget to update. The same object literal drives both languages: useLocalizedProfile recursively resolves any { en, de } field, in nested arrays and objects alike, through one hook that every page and every case study shares, so English and German can't structurally drift apart even though translation quality itself still depends on me writing both by hand. Print is not a separate template: the CV renders from the same React tree as the screen version, gated by @media print and an @page A4 rule, with accordions forced open via a CSS guard on [data-collapsible-body] — a printed page has no click affordance, so a section that stayed collapsed on screen would silently vanish from the page a hiring manager actually holds. Motion respects prefers-reduced-motion globally, wired once at the router root rather than re-checked in every animated component. None of this is new discipline invented for this case study: a build-time bug where a project's status was written 'Published' with a capital P against a lowercase 'published' comparison silently emptied the homepage project list and nulled every case-study link, and it's an automated invariant test — not a manual review — that now makes that class of bug fail the build instead of shipping.",
    de: "Die Technik ist der Teil, den ich Zeile für Zeile verteidigen kann. Inhalte haben eine einzige Quelle: Profildaten liegen in einer einzigen data.json, die zu profile.js kompiliert wird, und jede Fallstudie ist ein Ordner mit einer data.js, den import.meta.glob zur Buildzeit entdeckt — es gibt kein manuelles Projektregister, das vergessen werden könnte. Dasselbe Objektliteral steuert beide Sprachen: useLocalizedProfile löst jedes { en, de }-Feld rekursiv auf, auch in verschachtelten Arrays und Objekten, über einen einzigen Hook, den jede Seite und jede Fallstudie teilt — Englisch und Deutsch können strukturell nicht auseinanderdriften, auch wenn die Übersetzungsqualität selbst weiterhin davon abhängt, dass ich beide von Hand schreibe. Druck ist keine separate Vorlage: Der Lebenslauf rendert aus demselben React-Baum wie die Bildschirmversion, gesteuert über @media print und eine @page-A4-Regel, mit über eine CSS-Guard auf [data-collapsible-body] erzwungen geöffneten Akkordeons — eine gedruckte Seite hat keine Klick-Affordanz, ein Abschnitt, der am Bildschirm eingeklappt blieb, würde sonst stillschweigend von der Seite verschwinden, die eine Personalverantwortliche tatsächlich in der Hand hält. Bewegung respektiert prefers-reduced-motion global, einmal an der Router-Wurzel verdrahtet statt in jeder animierten Komponente erneut geprüft. Nichts davon ist neu erfundene Disziplin für diese Fallstudie: Ein Build-Time-Bug, bei dem der Status eines Projekts als 'Published' mit großem P gegen einen Vergleich mit kleinem 'published' geschrieben wurde, leerte stillschweigend die Projektliste der Startseite und setzte jeden Fallstudien-Link auf null — und es ist ein automatisierter Invarianten-Test, nicht eine manuelle Prüfung, der diese Fehlerklasse heute vor dem Ausliefern abfängt statt sie zu verschicken.",
  },
  prototypeUrl: "/designsystem",
  prototypeUrlLabel: {
    en: "View the living style guide",
    de: "Den lebenden Styleguide ansehen",
  },

  methodology: {
    en: "Three methods are planned to test this page against real readers, not just against my own judgment: five moderated sessions with a 90-second task ('decide whether you'd interview me'), a 5-second test on the hero to check what a viewer retains before they've consciously read anything, and a first-click test on the navigation to check whether the information architecture matches what a visitor actually goes looking for first. This section will report, for each method, the sample size and the specific question it was chosen to answer — once those sessions have run. No participant count, quote, or finding is stated here until it exists.",
    de: "Drei Methoden sind geplant, um diese Seite an echten Leserinnen zu prüfen, nicht nur an meinem eigenen Urteil: fünf moderierte Sessions mit einer 90-Sekunden-Aufgabe ('entscheide, ob du mich zum Interview einladen würdest'), ein 5-Sekunden-Test auf dem Hero, um zu prüfen, was eine Betrachterin behält, bevor sie bewusst irgendetwas gelesen hat, und ein First-Click-Test auf der Navigation, um zu prüfen, ob die Informationsarchitektur dem entspricht, wonach eine Besucherin tatsächlich zuerst sucht. Dieser Abschnitt wird für jede Methode Stichprobengröße und die konkrete Frage berichten, die sie beantworten sollte — sobald diese Sessions gelaufen sind. Keine Teilnehmerzahl, kein Zitat und kein Befund wird hier behauptet, bevor es existiert.",
  },

  results: {
    en: "The first measured numbers, reported as measured: a Lighthouse 13.4.0 run against the production site (emulated desktop, August 14, 2026) scores Accessibility 96, Best Practices 96, SEO 100 — and Performance 66. The 66 is stated, not softened. First paint is fast (First Contentful Paint 0.5 s, Largest Contentful Paint 1.3 s); what holds the score down is a cumulative layout shift of 0.261 and 340 ms of total blocking time, which the audit traces to JavaScript the page ships but doesn't use (est. 733 KiB) and images it could deliver 461 KiB lighter. The same run also flags at least one background/foreground pair below the contrast threshold — exactly the class of finding the still-pending manual WCAG 2.1 AA pass across every token pair is designed to catch, and a caution against reading the 96 as a conformance claim. Still pending: that contrast pass, the keyboard-only completion check of the primary path, confirmation the CV prints to exactly one A4 page with no orphaned headings, time-to-answer 'what does she do?' from the 5-second test, and the first-click success rate on the navigation. A metric this page can't yet back with a number remains absent, not estimated.",
    de: "Die ersten gemessenen Zahlen, berichtet wie gemessen: Ein Lighthouse-13.4.0-Lauf gegen die Produktionsseite (emulierter Desktop, 14. August 2026) ergibt Accessibility 96, Best Practices 96, SEO 100 — und Performance 66. Die 66 wird genannt, nicht beschönigt. Der erste Bildaufbau ist schnell (First Contentful Paint 0,5 s, Largest Contentful Paint 1,3 s); was den Wert drückt, sind eine kumulative Layoutverschiebung von 0,261 und 340 ms Total Blocking Time, die der Audit auf JavaScript zurückführt, das die Seite ausliefert, aber nicht nutzt (geschätzt 733 KiB), sowie auf Bilder, die 461 KiB leichter ausgeliefert werden könnten. Derselbe Lauf markiert außerdem mindestens ein Vordergrund-/Hintergrund-Paar unterhalb der Kontrastschwelle — genau die Klasse von Befund, für die die noch ausstehende manuelle WCAG-2.1-AA-Prüfung über jedes Token-Paar gedacht ist, und eine Warnung davor, die 96 als Konformitätsaussage zu lesen. Weiterhin ausstehend: diese Kontrastprüfung, die Prüfung der reinen Tastaturbedienbarkeit des Hauptpfads, die Bestätigung, dass der Lebenslauf exakt auf eine A4-Seite ohne verwaiste Überschriften druckt, die Zeit bis zur Antwort auf 'Was macht sie eigentlich?' aus dem 5-Sekunden-Test, sowie die First-Click-Erfolgsrate der Navigation. Eine Kennzahl, die diese Seite noch nicht mit einer Zahl belegen kann, fehlt weiterhin, statt geschätzt zu werden.",
  },

  implications: {
    en: "Two things went wrong while building this case study, and both are worth naming precisely because neither was caught by reading. First: a build-time route derivation. The real route for a case study comes from the literal folder name under src/projects/ (main.jsx), the homepage/tag-card link comes from projects.js deriving a slug from that same folder name, and the sitemap page links via a separate id field — three independent derivations that only agree if all three strings match exactly. They didn't: one project's folder was capitalized while its id field was lowercase, so the in-app sitemap linked to a route that 404s. I wrote an invariant test asserting id, slug, and folder name are identical while building this section, ran it against the real project data, and it failed within minutes — not against a hypothetical, against the actual site. The fix was a two-step git mv (git doesn't record a case-only rename on a case-insensitive filesystem) and a second test asserting slugs stay lowercase, so the next instance of this fails the build instead of shipping to production. Second, and more uncomfortable: the first draft of the solution section above claimed the accordions on this very page render closed by default. They don't — a passing test says the opposite, and always has. The false claim came from a stale comment in the print stylesheet describing behavior the code had already moved away from; I read the comment, trusted it, and wrote it into the spec for this case study before anyone checked it against a test. Both failures are the same failure mode: documentation — a field name, a code comment, a brief — drifting away from what the code actually does, invisible to a prose read and caught only by something that executes. The architecture's stated goal is a single source of truth. Shipping three unreconciled ones, and nearly writing a fourth, is the honest measure of how hard that goal is to actually hit.",
    de: "Beim Bau dieser Fallstudie sind zwei Dinge schiefgelaufen, und beide sind es wert, genau benannt zu werden, weil keines davon durch Lesen entdeckt wurde. Erstens: eine Routen-Ableitung zur Buildzeit. Die tatsächliche Route einer Fallstudie ergibt sich aus dem wörtlichen Ordnernamen unter src/projects/ (main.jsx), der Link auf Startseite/Tag-Karte ergibt sich aus projects.js, das aus demselben Ordnernamen einen Slug ableitet, und die Sitemap-Seite verlinkt über ein separates id-Feld — drei unabhängige Ableitungen, die nur übereinstimmen, wenn alle drei Zeichenketten exakt gleich sind. Taten sie nicht: Der Ordner eines Projekts war großgeschrieben, während dessen id-Feld kleingeschrieben war, sodass die interne Sitemap auf eine Route verlinkte, die 404 zurückgibt. Ich schrieb einen Invarianten-Test, der prüft, dass id, slug und Ordnername identisch sind, während ich an diesem Abschnitt arbeitete, ließ ihn gegen die echten Projektdaten laufen, und er schlug innerhalb von Minuten fehl — nicht gegen ein Gedankenexperiment, sondern gegen die tatsächliche Website. Die Behebung war ein zweistufiges git mv (Git zeichnet eine reine Groß-/Kleinschreibungs-Umbenennung auf einem nicht case-sensitiven Dateisystem nicht auf) und ein zweiter Test, der sicherstellt, dass Slugs kleingeschrieben bleiben, sodass der nächste derartige Fall den Build bricht, statt in Produktion zu gehen. Zweitens, und unangenehmer: Der erste Entwurf des obigen Solution-Abschnitts behauptete, die Akkordeons auf genau dieser Seite würden standardmäßig eingeklappt rendern. Das tun sie nicht — ein bestehender, grüner Test sagt das Gegenteil, und das schon immer. Die falsche Behauptung stammte aus einem veralteten Kommentar im Druck-Stylesheet, der ein Verhalten beschrieb, von dem sich der Code längst entfernt hatte; ich las den Kommentar, vertraute ihm, und schrieb ihn in die Spezifikation dieser Fallstudie, bevor ihn jemand gegen einen Test prüfte. Beide Fehler sind derselbe Fehlermodus: Dokumentation — ein Feldname, ein Codekommentar, ein Briefing — driftet von dem ab, was der Code tatsächlich tut, unsichtbar für eine Lektüre in Fließtext und nur durch etwas Ausführbares entdeckt. Das erklärte Ziel der Architektur ist eine einzige Quelle der Wahrheit. Drei nicht abgeglichene Quellen auszuliefern, und beinahe eine vierte zu schreiben, ist das ehrliche Maß dafür, wie schwer dieses Ziel tatsächlich zu erreichen ist.",
  },

  // The research that would produce an outcome (moderated sessions, 5-second
  // test, first-click test) hasn't run yet — see methodology above. This body
  // renders directly under `results`, which already lists what is pending, so
  // it states only what it adds: what gets recorded here once it does run.
  outcome: {
    body: {
      en: "No outcome yet, and none will be invented: once those sessions run, this is where what actually changed gets recorded — a shipped fix, a reprioritised backlog item, or a finding that changed nothing.",
      de: "Noch kein Ergebnis, und es wird keines erfunden: Sobald diese Sessions gelaufen sind, wird hier festgehalten, was sich tatsächlich geändert hat — eine ausgelieferte Korrektur, ein neu priorisierter Backlog-Punkt oder ein Befund ohne Konsequenz.",
    },
    adoption: "unknown",
  },

  tagEvidence: [
    { tag: "React", evidence: "process:One Template, a Fixed Section List, an Escape Hatch — ProjectTemplate({ meta, children })", status: "evidenced" },
    { tag: "Vite", evidence: "techStack: [\"React\", \"Vite\", \"Tailwind CSS\", \"Framer Motion\", \"React Router\", \"Vitest\", \"Testing Library\", \"ESLint\"] — rendered as Tech Stack chips; also prototype: \"import.meta.glob discovers at build time\" (Vite-only construct)", status: "evidenced" },
    { tag: "Tailwind CSS", evidence: "techStack: [\"React\", \"Vite\", \"Tailwind CSS\", \"Framer Motion\", \"React Router\", \"Vitest\", \"Testing Library\", \"ESLint\"] — rendered as Tech Stack chips under Methodology", status: "evidenced" },
    { tag: "Framer Motion", evidence: "solution: \"Framer Motion pathLength draw-ins\"", status: "evidenced" },
    { tag: "React Router", evidence: "techStack: [\"React\", \"Vite\", \"Tailwind CSS\", \"Framer Motion\", \"React Router\", \"Vitest\", \"Testing Library\", \"ESLint\"] — rendered as Tech Stack chips under Methodology", status: "evidenced" },
    { tag: "Design Systems", evidence: "process:Ink & Bloom — Contrast Rules Baked Into the Names; prototypeUrl links the living style guide", status: "evidenced" },
    { tag: "Component Architecture", evidence: "process:One Template, a Fixed Section List, an Escape Hatch — every case study renders through one ProjectTemplate({ meta, children }) contract, with a fixed SECTIONS array deciding what can appear at all; methods: \"Component Architecture & Design Systems Engineering\"", status: "evidenced" },
    { tag: "Information Architecture", evidence: "process:Three Tracks, Collapsing to One — a sticky numbered section rail, a capped-width prose column, and a pull-quote rail; the section order itself is fixed by the SECTIONS array every case study is bound to", status: "evidenced" },
    { tag: "Responsive Design", evidence: "process:Three Tracks, Collapsing to One — three columns above the xl breakpoint, a single column with a horizontal pill bar below it, with the right rail dropped rather than duplicated because the sentence it repeats already sits in the adjacent paragraph", status: "evidenced" },
    // Renamed from "Accessibility (WCAG 2.1 AA)": the old tag named a standard
    // the results section says out loud has not been audited yet. The work
    // (contrast-aware token split, reduced-motion, keyboard path) is real;
    // the conformance claim was not, so the standard came out of the name.
    { tag: "Accessibility", evidence: "process:Ink & Bloom — the -500/-600 token split puts the contrast rule in the token name a component reaches for; prototype: \"Motion respects prefers-reduced-motion globally, wired once at the router root\". Results still lists the WCAG 2.1 AA contrast pass and the keyboard-only check as pending, so this is design intent, not an audited result", status: "thin" },
    { tag: "Internationalization (i18n)", evidence: "prototype: \"useLocalizedProfile recursively resolves any { en, de } field\"", status: "evidenced" },
    { tag: "Print CSS", evidence: "prototype: \"@media print and an @page A4 rule, with accordions forced open via a CSS guard on [data-collapsible-body]\"", status: "evidenced" },
    { tag: "Automated Testing (Vitest)", evidence: "implications: \"an automated invariant test — not a manual review — that now makes that class of bug fail the build\"", status: "evidenced" },
  ],
};

export default projectData;
