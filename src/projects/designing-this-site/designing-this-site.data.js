// This case study documents the portfolio itself. Unlike the other case
// studies, there is no separate source document to cite: the evidence is
// the rest of this repository. Every architectural claim below (data flow,
// i18n, print pipeline, invariant tests) is verified against the actual
// source at the time of writing, not recalled from memory.
//
// 2026-08: the long-form Process/Challenge/Solution/Methodology/Implications
// sections were removed in favour of a tighter artefact-first page: About →
// Wireframes → Design System → Prototype → Accessibility → Metrics. The `sectionTitles`
// override below renames Results to "Metrics" for this project only — its
// numbers are measurements of the artefact, not findings of a study, so the
// study-shaped heading came off. The planned research (5 moderated sessions,
// a 5-second test on the hero, a first-click test on the nav) is still only
// referenced as pending in `results`/`metrics`; zero invented findings,
// participant counts, or quotes.
//
// The four Lighthouse scores in `metrics`/`results` are real, measured
// against production (see comment above `metrics`).
//
// Card-level fields (id/status/title/tags/excludeFromHome) live in ./card.js
// — eagerly aggregated site-wide — and are spread here so the detail page
// sees one object. This file carries only the prose, which loads with the
// route's own chunk.

import card from './card';
import wireframeXl from './assets/wireframe-case-study-xl.svg';
import wireframeMobile from './assets/wireframe-case-study-mobile.svg';

export const projectData = {
  ...card,
  timeline: { en: "Ongoing · continuously iterated", de: "Laufend · kontinuierlich iteriert" },
  heroIsGenerated: true, // hero generated with Google Gemini — renders the credit

  // No research-method chips here: the 5-second test, first-click test and
  // moderated sessions are planned, not run (the Metrics section says so),
  // and a methods chip claiming any of them would contradict it. The chips
  // return when the sessions do. With no methodology prose on this project,
  // the template renders this list (and the tech stack) under Prototype
  // instead.
  methods: [
    { en: "Component Architecture & Design Systems Engineering", de: "Komponentenarchitektur & Design-Systems-Engineering" },
    { en: "Bilingual Content Architecture (EN/DE)", de: "Zweisprachige Content-Architektur (EN/DE)" },
    { en: "Print-CSS Engineering (screen-to-A4)", de: "Print-CSS-Engineering (Bildschirm zu A4)" },
    { en: "Invariant / Contract Testing (Vitest)", de: "Invarianten-/Contract-Testing (Vitest)" },
  ],

  // Results renamed to Metrics for this project only: the strip below holds
  // measurements of the artefact (Lighthouse runs, pending audits), not
  // findings of a study, and the site-wide "Key Findings & Outcome" heading
  // over-claimed. The mechanism is the template's per-project override —
  // the default translation keys stay untouched for the real studies.
  sectionTitles: {
    results: {
      label: { en: "Metrics", de: "Metriken" },
      kicker: { en: "Measured, Not Claimed", de: "Gemessen, nicht behauptet" },
      heading: { en: "Metrics", de: "Metriken" },
    },
  },

  // Pending, not failed: the protocol for each of these is already defined —
  // the numbers are absent because the sessions that would produce them
  // haven't run, not because measurement was skipped. `pending: true`
  // renders a muted "Measurement pending" state instead of a value; no
  // number is written until one is real.
  //
  // The four Lighthouse rows are real: Lighthouse 13.4.0 against the
  // production site (https://yazdanjoo.de, emulated desktop, 2026-08-24,
  // re-run after the performance pass; the previous run of 2026-08-14
  // scored 66/96/96/100). Mobile emulation on the same day: 77 — reported
  // in `results`. Re-run and update all four together, not selectively.
  metrics: [
    { value: "99", label: { en: "Lighthouse — Performance", de: "Lighthouse — Performance" } },
    { value: "100", label: { en: "Lighthouse — Accessibility", de: "Lighthouse — Accessibility" } },
    { value: "100", label: { en: "Lighthouse — Best Practices", de: "Lighthouse — Best Practices" } },
    { value: "100", label: { en: "Lighthouse — SEO", de: "Lighthouse — SEO" } },
    { pending: true, label: { en: "WCAG 2.1 AA contrast, all token pairs", de: "WCAG 2.1 AA Kontrast, alle Token-Paare" } },
    { pending: true, label: { en: "Keyboard-only + first-click task success", de: "Tastatur- & First-Click-Erfolg" } },
    { pending: true, label: { en: "CV print length (target: 1 A4 page)", de: "Lebenslauf-Drucklänge (Ziel: 1 A4-Seite)" } },
    { pending: true, label: { en: "5-second test — time to answer ‘what does she do?’", de: "5-Sekunden-Test — Zeit bis zur Antwort" } },
  ],

  // Replaces the default "Study at a Glance" eyebrow over the strip — these
  // numbers are tool measurements, not a study.
  metricsIntro: {
    en: "Lighthouse 13.4.0 against production, emulated desktop, 24 August 2026. The pending rows are protocols that are defined but not yet run.",
    de: "Lighthouse 13.4.0 gegen die Produktionsseite, emulierter Desktop, 24. August 2026. Die ausstehenden Zeilen sind definierte, aber noch nicht gelaufene Protokolle.",
  },

  techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router", "Vitest", "Testing Library", "ESLint"],

  about: {
    en: "A case study on the site you are reading. I built it alone: research, design, frontend, QA. It is React and Tailwind, and it has to work for three readers at once — a recruiter with thirty seconds, an engineer who opens the source, and a hiring manager holding the printed A4 CV. What follows are the trade-offs that came out of that.",
    de: "Eine Fallstudie über die Seite, die Sie gerade lesen. Ich habe sie allein gebaut: Research, Design, Frontend, QA. React und Tailwind, und sie muss für drei Lesende gleichzeitig funktionieren — eine Recruiterin mit dreißig Sekunden, eine Entwicklerin, die den Quellcode öffnet, und eine Personalverantwortliche mit dem gedruckten A4-Lebenslauf. Es folgen die Kompromisse, die daraus entstanden sind.",
  },

  // The layout architecture, stated as the wireframe it is. The figures are
  // post-hoc schematics drawn from the shipped ProjectTemplate code — the
  // prose says so out loud, because a wireframe that pretends to predate the
  // build would be exactly the kind of invented process this file refuses.
  wireframe: {
    en: "Every case study here uses one layout. Above the xl breakpoint it runs in three tracks: a sticky numbered section rail on the left that collapses to a 56-pixel number strip, the prose column in the middle at a 68ch measure (88ch once the rail is collapsed), and a pull-quote rail on the right. Below md the rail becomes a horizontal pill bar under the header. Below xl the pull-quote is dropped: it only repeats a sentence from the paragraph next to it. The order is not just convention. Every case study renders through the same ProjectTemplate({ meta, children }), and a fixed SECTIONS array decides what can appear and when — a data key that is not in it cannot render. One caveat on the figures below: I wireframed this site in the browser, so they are drawn from the shipped layout code, not from sketches that came first.",
    de: "Jede Fallstudie hier nutzt dasselbe Layout. Oberhalb des xl-Breakpoints läuft es in drei Spuren: links eine sticky nummerierte Abschnittsleiste, die zu einem 56 Pixel schmalen Nummernstreifen einklappt, in der Mitte die Fließtextspalte mit 68ch Lesemaß (88ch, wenn die Leiste eingeklappt ist), rechts eine Pull-Quote-Spalte. Unterhalb von md wird die Leiste zu einer horizontalen Pill-Leiste unter dem Header. Unterhalb von xl entfällt die Pull-Quote: Sie wiederholt nur einen Satz aus dem Absatz daneben. Die Reihenfolge ist nicht bloß Konvention. Jede Fallstudie rendert über dasselbe ProjectTemplate({ meta, children }), und ein festes SECTIONS-Array entscheidet, was wann erscheinen kann — ein Datenschlüssel, der nicht darin steht, kann nicht rendern. Ein Vorbehalt zu den Abbildungen unten: Ich habe die Seite im Browser gewireframet, sie sind also aus dem ausgelieferten Layout-Code gezeichnet, nicht aus Skizzen, die vorher entstanden wären.",
  },

  // Intro over the compact live-token view (template/DesignTokensPanel.jsx).
  // The panel resolves every value from theme.css at render time — this
  // prose only names the system and the two rules the numbers can't say.
  designSystem: {
    en: "Ink & Bloom, in short: a warm paper-and-ink palette, one loud coral accent, and a gold highlighter used at most once per page. Bricolage Grotesque for display type, DM Sans for body, Caveat for handwritten notes, and Framer Motion draw-ins that all share one easing curve. The table below reads its values from theme.css at render time instead of copying them, so it updates with the site rather than drifting from it. Two rules the numbers don't state on their own: each accent has a -500 step for large text and shapes and a -600 step for anything small enough that WCAG AA bites, and the gold sits outside that split — it is a background wash, never a text colour. Every icon in the interface, from arrows and chevrons to the ? and ! marks, is drawn with the same ~1.6–1.8px nib in one component file, so no icon font or library ships in the bundle. The full specimen sheet is the living style guide linked under Prototype. The same system is also published as a Figma Make kit — tokens, styles, components and the drawn-line rules, linked below.",
    de: "Ink & Bloom, kurz gefasst: eine warme Papier-und-Tinte-Palette, ein lauter Koralle-Akzent und ein goldener Textmarker, höchstens einmal pro Seite. Bricolage Grotesque für Display, DM Sans für Fließtext, Caveat für handschriftliche Notizen, dazu Framer-Motion-Zeichenanimationen auf einer einzigen Easing-Kurve. Die Tabelle unten liest ihre Werte beim Rendern aus theme.css, statt sie zu kopieren — sie aktualisiert sich also mit der Seite, statt von ihr abzuweichen. Zwei Regeln, die die Zahlen nicht selbst sagen: Jeder Akzent hat eine -500-Stufe für großen Text und Flächen und eine -600-Stufe für alles, was klein genug ist, dass WCAG AA greift. Das Gold steht außerhalb dieser Aufteilung: Hintergrundlasur, nie Textfarbe. Jedes Icon der Oberfläche, von Pfeilen und Chevrons bis zu den ?- und !-Zeichen, ist mit derselben ~1,6–1,8px-Feder gezeichnet und liegt in einer einzigen Komponentendatei; es gibt keinen Icon-Font und keine Icon-Bibliothek im Bundle. Das vollständige Musterblatt ist der lebende Styleguide, verlinkt unter Prototyp. Dasselbe System ist außerdem als Figma-Make-Kit veröffentlicht — Tokens, Styles, Komponenten und die Regeln der gezeichneten Linie, unten verlinkt.",
  },

  // The Figma Make build of the same system. Data-gated: ProjectTemplate
  // renders this link only when a project supplies designSystemUrl, so no
  // other case study's Design System section changes. Deliberately NOT the
  // gold PrototypeLink treatment — that mark is once-per-page and the real
  // prototype link one section below already spends it. This is the
  // system's own inline-link style: coral with the drawn hairline.
  designSystemUrl: "https://www.figma.com/make/X9ESZoIvrYX8XqT3BOC0pw/Ink---Bloom-Design-System",

  figures: {
    wireframe: [
      {
        type: 'image',
        src: wireframeXl,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Wireframe · ≥1280 px', de: 'Wireframe · ≥1280 px' },
        title: {
          en: 'Three tracks: rail, prose, pull-quote',
          de: 'Drei Spuren: Leiste, Fließtext, Pull-Quote',
        },
        description: {
          en: 'The template above xl: numbered TOC left, prose column centre, pull-quote right. Drawn from the shipped code — the section list in the rail is this page’s.',
          de: 'Die Vorlage oberhalb von xl: nummerierte Abschnittsleiste links, Fließtext in der Mitte, Pull-Quote rechts. Aus dem ausgelieferten Code gezeichnet — die Abschnittsliste ist die dieser Seite.',
        },
        alt: {
          en: 'Wireframe of the desktop case-study layout: a left rail listing About, Wireframe, Design System, Prototype and Metrics, a central column with heading bars, text lines, two crossed-out figure boxes and a four-cell metrics strip, and a right rail with a short quote block, annotated in monospace notes',
          de: 'Wireframe des Desktop-Fallstudien-Layouts: eine linke Leiste mit About, Wireframe, Designsystem, Prototyp und Metriken, eine mittlere Spalte mit Überschriftsbalken, Textzeilen, zwei durchkreuzten Abbildungsboxen und einem vierzelligen Metrik-Streifen sowie eine rechte Spalte mit kurzem Zitatblock, annotiert mit Monospace-Notizen',
        },
        caption: {
          en: 'Case-study template at xl — the layout this page is rendered with',
          de: 'Fallstudien-Vorlage bei xl — das Layout, mit dem diese Seite gerendert wird',
        },
      },
      {
        type: 'image',
        src: wireframeMobile,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Wireframe · <768 px', de: 'Wireframe · <768 px' },
        title: {
          en: 'One column, a pill bar, no rails',
          de: 'Eine Spalte, eine Pill-Leiste, keine Randspalten',
        },
        description: {
          en: 'The same template below md: the TOC becomes a scrolling pill bar, sections stack in the same order, the pull-quote doesn’t render. One responsive layout, not a separate mobile design.',
          de: 'Dieselbe Vorlage unterhalb von md: Die Abschnittsleiste wird zur scrollenden Pill-Leiste, die Abschnitte stapeln sich in derselben Reihenfolge, die Pull-Quote rendert nicht. Ein responsives Layout, kein separates Mobildesign.',
        },
        alt: {
          en: 'Wireframe of the mobile case-study layout inside a phone outline: a nav bar, a row of section pills with the first filled coral, stacked heading bars, text lines, a crossed-out figure box and a two-by-two metrics grid, with three annotation notes to the right',
          de: 'Wireframe des mobilen Fallstudien-Layouts in einem Telefonrahmen: eine Navigationsleiste, eine Reihe von Abschnitts-Pills, die erste korallrot gefüllt, gestapelte Überschriftsbalken, Textzeilen, eine durchkreuzte Abbildungsbox und ein Zwei-mal-zwei-Metrikraster, rechts daneben drei Anmerkungsnotizen',
        },
        caption: {
          en: 'The same page below the md breakpoint',
          de: 'Dieselbe Seite unterhalb des md-Breakpoints',
        },
      },
    ],
  },

  prototype: {
    en: "Content has one source. Profile data lives in a single data.json compiled into profile.js, and every case study is a folder with a data.js that import.meta.glob picks up at build time, so there is no registry to forget to update. Both languages come from the same object: useLocalizedProfile resolves any { en, de } field recursively, so English and German cannot drift structurally, even though I still write both by hand. Print is not a separate template. The CV renders from the same React tree as the screen version, gated by @media print and an @page A4 rule, with accordions forced open via [data-collapsible-body]; paper has no click affordance, so a collapsed section would simply be missing. prefers-reduced-motion is wired once at the router root instead of in every animated component. The invariant tests come from a real bug: a status written 'Published' and compared against 'published' silently emptied the homepage list and nulled every case-study link. A test now catches that class of mistake before it ships. The same suite guards the route contract — id, slug and folder name must match — which once caught a capitalised folder that needed a two-step git mv, because Git won't record a case-only rename on a case-insensitive filesystem. The newest piece is an 'Ask this portfolio' assistant on every page. Its knowledge base is generated at build time from the same data.json and case-study files the site renders; the OpenAI key and the grounding stay server-side, and it answers only from that knowledge.",
    de: "Inhalte haben eine einzige Quelle. Die Profildaten liegen in einer data.json, die zu profile.js kompiliert wird, und jede Fallstudie ist ein Ordner mit einer data.js, die import.meta.glob zur Buildzeit einsammelt — es gibt kein Register, das man vergessen könnte. Beide Sprachen kommen aus demselben Objekt: useLocalizedProfile löst jedes { en, de }-Feld rekursiv auf, Englisch und Deutsch können also strukturell nicht auseinanderlaufen, auch wenn ich beide weiterhin von Hand schreibe. Druck ist keine eigene Vorlage. Der Lebenslauf rendert aus demselben React-Baum wie die Bildschirmversion, gesteuert über @media print und eine @page-A4-Regel, mit über [data-collapsible-body] erzwungen geöffneten Akkordeons; Papier hat keine Klick-Affordanz, ein eingeklappter Abschnitt würde schlicht fehlen. prefers-reduced-motion ist einmal an der Router-Wurzel verdrahtet statt in jeder animierten Komponente. Die Invarianten-Tests stammen aus einem echten Bug: Ein Status, 'Published' geschrieben und gegen 'published' verglichen, leerte stillschweigend die Projektliste der Startseite und setzte jeden Fallstudien-Link auf null. Ein Test fängt diese Fehlerklasse heute vor dem Ausliefern ab. Dieselbe Suite sichert den Routen-Vertrag — id, slug und Ordnername müssen übereinstimmen — und fing einmal einen großgeschriebenen Ordner ab, dessen Behebung ein zweistufiges git mv brauchte, weil Git eine reine Groß-/Kleinschreibungs-Umbenennung auf einem nicht case-sensitiven Dateisystem nicht aufzeichnet. Das neueste Stück ist ein „Ask this portfolio“-Assistent auf jeder Seite. Seine Wissensbasis wird zur Buildzeit aus derselben data.json und denselben Fallstudien-Dateien erzeugt, die die Seite rendert; der OpenAI-Schlüssel und die Verankerung bleiben serverseitig, und er antwortet nur aus diesem Wissen.",
  },
  prototypeUrl: "/designsystem",
  prototypeUrlLabel: {
    en: "View the living style guide",
    de: "Den lebenden Styleguide ansehen",
  },

  // The accessibility statement: what was built and to what standard. Every
  // claim in it is verifiable in the source — the skip link and MotionConfig
  // in App.jsx, the focus contract and its history in theme.css (the "It was
  // fourteen" comment), the token split in theme.css, the hover rung locked
  // by src/test/hover-contrast.test.js. It deliberately stops short of a
  // WCAG conformance claim: the manual audit and the keyboard-only
  // walkthrough are still the pending rows in Metrics, and this section says
  // so rather than letting the standard's name imply the audit ran.
  accessibility: {
    en: "Built against WCAG 2.1 AA, as mechanisms in the source. The first tabbable element on every page is a skip link, hidden until it takes keyboard focus, then a coral chip that jumps past the navigation. Focus has one contract: the same two-pixel coral outline through :focus-visible and one focus-ring utility. Before that pass there were fourteen different focus treatments, and two elements had focus:outline-none with nothing in its place. A MotionConfig at the router root turns off every animation when the system asks for reduced motion, with per-component guards underneath. Contrast sits in the token names: -500 for large text and fills, -600 for small text where AA needs 4.5:1. Dark mode splits the coral further into separate fill and text tokens, because one value cannot both carry white and hold up as small text on a dark ground. Hover has its own AA-safe step, locked by a test that fails the build if a component reaches for a weaker colour. Every ratio is computed from the token values; sampling screenshots turned out to be unreliable for small text. Lighthouse scores the production site 100 on accessibility with no failing contrast pair. Two checks in Metrics are still open — the manual pass across every token pair and the keyboard-only walkthrough — so this names the standard I built against, not a conformance claim.",
    de: "Gebaut nach WCAG 2.1 AA, als Mechanismen im Quellcode. Das erste per Tab erreichbare Element jeder Seite ist ein Skip-Link: unsichtbar, bis er Tastaturfokus bekommt, dann ein korallfarbener Chip, der an der Navigation vorbeispringt. Fokus hat einen einzigen Vertrag: dieselbe zwei Pixel starke Koralle-Kontur über :focus-visible und eine Focus-Ring-Utility. Vor diesem Durchgang gab es vierzehn verschiedene Fokus-Stile, und zwei Elemente hatten focus:outline-none ohne Ersatz. Eine MotionConfig an der Router-Wurzel schaltet jede Animation ab, wenn das System reduzierte Bewegung anfordert; Guards in einzelnen Komponenten liegen als zweite Ebene darunter. Der Kontrast steckt in den Token-Namen: -500 für großen Text und Flächen, -600 für kleinen Text, wo AA 4,5:1 verlangt. Der Dark Mode teilt die Koralle weiter in getrennte Flächen- und Text-Tokens, weil ein einzelner Wert nicht zugleich Weiß tragen und als kleiner Text auf dunklem Grund bestehen kann. Hover hat eine eigene AA-sichere Stufe, gesichert durch einen Test, der den Build scheitern lässt, wenn eine Komponente nach einer schwächeren Farbe greift. Jedes Verhältnis ist aus den Token-Werten berechnet; Messung per Screenshot war bei kleinem Text unzuverlässig. Lighthouse bewertet die Produktionsseite mit 100 für Accessibility, ohne durchfallendes Kontrastpaar. Zwei Prüfungen in den Metriken stehen noch aus — der manuelle Durchgang über jedes Token-Paar und die reine Tastatur-Begehung — deshalb nenne ich hier den Standard, gegen den ich gebaut habe, und keine Konformität.",
  },

  results: {
    en: "Lighthouse 13.4.0 against production (emulated desktop, 24 August 2026): Performance 99, Accessibility 100, Best Practices 100, SEO 100. Mobile emulation the same day: 77, held down by a 4.4-second Largest Contentful Paint. Ten days earlier performance was 66, with a 0.261 layout shift, 340 ms blocking time and roughly 733 KiB of unused JavaScript. What closed the gap: a route-skeleton fix for the layout shift, lazy loading on every case-study figure, dead chunks removed, and a card/data split that took all five case studies' prose off the shared path (aggregator chunk 57 KB → 3.9 KB gzipped). Two optimisations I looked at and dropped: LazyMotion would save an estimated 20–25 KB gzipped but touch 35 files in the hand-drawn animation system, and splitting the profile data would break the local editor that writes it. Neither is worth it at these scores. The honest gap left is mobile LCP — a client-rendered hero can't paint before the JavaScript lands. Still open: the manual WCAG 2.1 AA contrast pass across every token pair (the automated audit found no failing pair, which is not the same thing), the keyboard-only run through the primary path, confirmation the CV prints to exactly one A4 page, and the two planned tests — time to answer 'what does she do?' and first-click success on the navigation.",
    de: "Lighthouse 13.4.0 gegen die Produktionsseite (emulierter Desktop, 24. August 2026): Performance 99, Accessibility 100, Best Practices 100, SEO 100. Mobile-Emulation am selben Tag: 77, gebremst von einem Largest Contentful Paint von 4,4 Sekunden. Zehn Tage zuvor lag Performance bei 66, mit 0,261 Layoutverschiebung, 340 ms Total Blocking Time und rund 733 KiB ungenutztem JavaScript. Geschlossen hat die Lücke: eine Route-Skeleton-Korrektur gegen die Layoutverschiebung, Lazy Loading für jede Fallstudien-Abbildung, entfernte tote Chunks und ein Card/Data-Split, der die Prosa aller fünf Fallstudien vom gemeinsamen Pfad nahm (Aggregator-Chunk 57 KB → 3,9 KB gzip). Zwei Optimierungen habe ich geprüft und verworfen: LazyMotion spart geschätzt 20–25 KB gzip, berührt aber 35 Dateien im handgezeichneten Animationssystem, und ein Aufteilen der Profildaten würde den lokalen Editor brechen, der sie schreibt. Beides lohnt bei diesen Werten nicht. Die ehrliche Lücke bleibt der mobile LCP: Ein clientseitig gerenderter Hero kann nicht zeichnen, bevor das JavaScript da ist. Offen bleiben: die manuelle WCAG-2.1-AA-Kontrastprüfung über jedes Token-Paar (der automatisierte Audit fand kein durchfallendes Paar, was nicht dasselbe ist), der reine Tastaturdurchlauf des Hauptpfads, die Bestätigung, dass der Lebenslauf auf genau eine A4-Seite druckt, und die zwei geplanten Tests: Zeit bis zur Antwort auf „Was macht sie?“ und First-Click-Erfolg in der Navigation.",
  },

  // The case study is about my own work, evaluated by me — these are the
  // limits that puts on everything above.
  limitations: [
    {
      en: "Sole author and sole evaluator. Every judgement here — structure, wording, visual system — is mine and unreviewed; there is no second designer on record who disagreed with any of it.",
      de: "Alleinige Autorin und alleinige Evaluatorin. Jede Entscheidung hier — Struktur, Formulierung, visuelles System — ist meine und ungeprüft; es gibt keine zweite Design-Stimme im Protokoll, die widersprochen hätte.",
    },
    {
      en: "No user research has run on the site itself. The 5-second test and the first-click test are defined and pending, so every usability claim here describes a mechanism in the source, not an observed effect on a reader.",
      de: "Auf der Seite selbst ist noch keine Nutzerforschung gelaufen. Der 5-Sekunden-Test und der First-Click-Test sind definiert und stehen aus; jede Usability-Aussage hier beschreibt daher einen Mechanismus im Quellcode, keine beobachtete Wirkung auf Lesende.",
    },
    {
      en: "The Lighthouse numbers are single lab runs under emulation, from one machine and one network. There is no field data from real visitors, and mobile LCP in particular is the metric emulation flatters least.",
      de: "Die Lighthouse-Werte sind einzelne Labormessungen unter Emulation, von einem Rechner und einem Netz. Es gibt keine Felddaten realer Besucher:innen, und gerade der mobile LCP ist der Wert, den die Emulation am wenigsten trifft.",
    },
    {
      en: "An automated accessibility score of 100 is not conformance. The manual contrast pass across every token pair and the keyboard-only walkthrough are still open, and nobody has run the site with a screen reader or with assistive technology in an actual user's hands.",
      de: "Ein automatisierter Accessibility-Wert von 100 ist keine Konformität. Die manuelle Kontrastprüfung über jedes Token-Paar und die reine Tastatur-Begehung stehen aus, und niemand hat die Seite mit einem Screenreader oder mit assistiver Technik in den Händen echter Nutzer:innen durchlaufen.",
    },
  ],

  // The research that would produce an outcome (moderated sessions, 5-second
  // test, first-click test) hasn't run yet — the Metrics prose above lists
  // exactly what is pending, so this body states only what it adds: what
  // gets recorded here once it does run.
  outcome: {
    body: {
      en: "No outcome yet. Once the sessions run, whatever actually changed goes here: a shipped fix, a reprioritised backlog item, or a finding that changed nothing.",
      de: "Noch kein Ergebnis. Sobald die Sessions gelaufen sind, steht hier, was sich tatsächlich geändert hat: eine ausgelieferte Korrektur, ein neu priorisierter Backlog-Punkt oder ein Befund ohne Folgen.",
    },
    // "deferred", not "unknown": unknown means handed over and never
    // verified (deskbird); here the evaluation is designed and simply has
    // not run yet — the outcome is withheld on purpose, not missing.
    adoption: "deferred",
  },

  tagEvidence: [
    { tag: "React", evidence: "wireframe: \"every case study renders through the same ProjectTemplate({ meta, children }) contract\"; prototype: \"the CV renders from the same React tree as the screen version\"", status: "evidenced" },
    { tag: "Vite", evidence: "prototype: \"import.meta.glob discovers at build time\" (Vite-only construct); techStack chips rendered under Prototype", status: "evidenced" },
    { tag: "Tailwind CSS", evidence: "about: \"a React and Tailwind site\"; techStack chips rendered under Prototype", status: "evidenced" },
    { tag: "Framer Motion", evidence: "designSystem: \"Framer Motion draw-ins that all share a single easing curve\"; prototype: \"Motion respects prefers-reduced-motion globally\"", status: "evidenced" },
    { tag: "React Router", evidence: "prototype: \"wired once at the router root\"; techStack chips rendered under Prototype", status: "evidenced" },
    { tag: "OpenAI API", evidence: "prototype: \"an OpenAI-backed 'Ask this portfolio' assistant, live on every page … the OpenAI key and the grounding stay server-side\" — the endpoint is api/chat.js, a serverless function streaming from the Chat Completions API", status: "evidenced" },
    { tag: "Prompt Engineering", evidence: "prototype: \"the assistant is instructed to answer only from that generated knowledge, never to invent\" — the persona, ground rules and grounding live in a server-side system prompt the client can neither read nor override", status: "evidenced" },
    { tag: "Design Systems", evidence: "designSystem section — the compact token view resolves live from theme.css; prototypeUrl links the living style guide", status: "evidenced" },
    { tag: "Component Architecture", evidence: "wireframe: the ProjectTemplate({ meta, children }) contract and the fixed SECTIONS array; methods: \"Component Architecture & Design Systems Engineering\"", status: "evidenced" },
    { tag: "Information Architecture", evidence: "wireframe: three tracks — a sticky numbered section rail, a capped prose column, a pull-quote rail — with the section order fixed by the SECTIONS array every case study is bound to", status: "evidenced" },
    { tag: "Responsive Design", evidence: "wireframe: three tracks above the xl breakpoint, one column with a horizontal pill bar below it; figures.wireframe shows both states of the same layout", status: "evidenced" },
    // Renamed from "Accessibility (WCAG 2.1 AA)": the old tag named a standard
    // the Metrics section says out loud has not been audited yet. The work
    // (contrast-aware token split, reduced-motion, keyboard path) is real;
    // the conformance claim was not, so the standard came out of the name.
    // 2026-08-28: promoted from "thin" — the accessibility section now
    // documents the mechanisms in full, and itself draws the line between
    // built-to-AA and audited-AA, so the tag no longer rests on scattered
    // mentions.
    { tag: "Accessibility", evidence: "accessibility section: the skip link, the single :focus-visible contract (replacing fourteen treatments), MotionConfig reduced-motion at the router root, the -500/-600 and dark fill/text token split with the hover rung locked by hover-contrast.test.js — and the explicit line that the manual WCAG 2.1 AA audit is still a pending row in Metrics", status: "evidenced" },
    { tag: "Performance Optimization", evidence: "results: the Lighthouse 66→99 record — route-skeleton fix removing the 0.261 layout shift, lazy loading on every case-study figure, dead chunks cut, the card/data split (aggregator chunk 57 KB → 3.9 KB gzipped) — plus the two optimisations rejected on the record", status: "evidenced" },
    { tag: "SEO", evidence: "metrics/results: Lighthouse SEO 100 measured against production (13.4.0, emulated desktop, 2026-08-24), alongside the other three category scores re-run together", status: "evidenced" },
    { tag: "Internationalization (i18n)", evidence: "prototype: \"useLocalizedProfile recursively resolves any { en, de } field\"", status: "evidenced" },
    { tag: "Print CSS", evidence: "prototype: \"@media print and an @page A4 rule, with accordions forced open via a CSS guard on [data-collapsible-body]\"", status: "evidenced" },
    { tag: "Automated Testing (Vitest)", evidence: "prototype: \"an automated test now makes that class of bug fail the build instead of shipping\"", status: "evidenced" },
  ],
};

export default projectData;
