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
  heroIsGenerated: true, // the hero is a generated illustration — renders the credit

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
    en: "A case study on the portfolio you are reading right now, built solo as researcher, designer, frontend engineer, and QA. It is a React and Tailwind site that has to satisfy three very different readers at once: a recruiter with thirty seconds, an engineer who opens the source, and a hiring manager holding the printed one-page A4 CV. This case study documents the trade-offs those constraints forced.",
    de: "Eine Fallstudie über das Portfolio, das Sie gerade lesen — alleinverantwortlich umgesetzt als Researcherin, Designerin, Frontend-Entwicklerin und QA. Es ist eine React- und Tailwind-Website, die drei sehr unterschiedliche Lesende zugleich bedienen muss: eine Recruiterin mit dreißig Sekunden, eine Entwicklerin, die den Quellcode öffnet, und eine Personalverantwortliche mit dem gedruckten einseitigen A4-Lebenslauf. Diese Fallstudie dokumentiert die Kompromisse, die daraus folgten.",
  },

  // The layout architecture, stated as the wireframe it is. The figures are
  // post-hoc schematics drawn from the shipped ProjectTemplate code — the
  // prose says so out loud, because a wireframe that pretends to predate the
  // build would be exactly the kind of invented process this file refuses.
  wireframe: {
    en: "Every case study here — this page included — shares one wireframe: three tracks above the xl breakpoint, one column below it. The left track is a sticky, numbered section rail that collapses to a 56-pixel number strip, handing the freed width to the prose; below md its job passes to a horizontal pill bar under the header. The middle track is the prose column, capped at a 68ch reading measure that widens to 88ch when the rail is collapsed. The right track lifts a single pull-quote sentence out of the long-form sections — documentation, not new information, so below xl it simply doesn't render: the sentence it repeats already lives in the paragraph beside it. The structure is enforced rather than conventional: every case study renders through the same ProjectTemplate({ meta, children }) contract, and a fixed SECTIONS array decides what can appear and in what order — a data key that isn't in that array cannot render, no matter what a project's data file contains. One caveat about the figures below: this site was wireframed in the browser, so they are schematics drawn from the shipped layout code, not scans of sketches that preceded it.",
    de: "Jede Fallstudie hier — diese Seite eingeschlossen — teilt ein Wireframe: drei Spuren oberhalb des xl-Breakpoints, eine Spalte darunter. Die linke Spur ist eine sticky, nummerierte Abschnittsleiste, die zu einem 56 Pixel schmalen Nummernstreifen einklappt und die freigewordene Breite dem Fließtext übergibt; unterhalb von md übernimmt eine horizontale Pill-Leiste unter dem Header ihre Aufgabe. Die mittlere Spur ist die Fließtextspalte, begrenzt auf ein Lesemaß von 68ch, das sich auf 88ch weitet, wenn die Leiste eingeklappt ist. Die rechte Spur hebt einen einzelnen Pull-Quote-Satz aus den Langtext-Abschnitten heraus — Dokumentation, keine neue Information, weshalb sie unterhalb von xl schlicht nicht rendert: Der Satz, den sie wiederholt, steht bereits im danebenliegenden Absatz. Die Struktur ist erzwungen, nicht bloß Konvention: Jede Fallstudie rendert über denselben ProjectTemplate({ meta, children })-Vertrag, und ein festes SECTIONS-Array entscheidet, was in welcher Reihenfolge erscheinen kann — ein Datenschlüssel, der nicht in diesem Array steht, kann nicht rendern, egal was die Datendatei eines Projekts enthält. Ein Vorbehalt zu den Abbildungen unten: Diese Website wurde im Browser gewireframet; es sind Schemata, gezeichnet aus dem ausgelieferten Layout-Code, keine Scans von Skizzen, die ihm vorausgingen.",
  },

  // Intro over the compact live-token view (template/DesignTokensPanel.jsx).
  // The panel resolves every value from theme.css at render time — this
  // prose only names the system and the two rules the numbers can't say.
  designSystem: {
    en: "Ink & Bloom, in compact form: a warm paper-and-ink palette with one loud coral accent and a gold highlighter used at most once per page, Bricolage Grotesque for display type, DM Sans for body, Caveat for hand-drawn annotations, and Framer Motion draw-ins that all share a single easing curve. The table below is the design system the way an engineer trusts it: every value is resolved from theme.css at render time, not copied into this page — change a token and this case study updates with the site it describes, which is the difference between documentation and a screenshot of documentation. Two rules are worth reading out of the numbers. Each accent splits into a -500 and a -600 step, and the contrast rule lives in the token name a component reaches for: -500 for large text and shapes, -600 for anything small enough that WCAG AA actually bites. And the gold highlighter is excluded from that split entirely — it is a background wash, never a text color, restricted by convention to a single mark per page. The full specimen sheet, with components and the drawn-line rules, is the living style guide linked under Prototype.",
    de: "Ink & Bloom, kompakt: eine warme Papier-und-Tinte-Palette mit einem einzigen lauten Koralle-Akzent und einer goldenen Textmarker-Farbe, die höchstens einmal pro Seite eingesetzt wird, Bricolage Grotesque für Display-Typografie, DM Sans für Fließtext, Caveat für handschriftliche Annotationen und Framer-Motion-Zeichenanimationen, die alle eine einzige Easing-Kurve teilen. Die Tabelle unten ist das Designsystem, wie eine Entwicklerin ihm vertraut: Jeder Wert wird beim Rendern aus theme.css aufgelöst, nicht in diese Seite kopiert — ändere ein Token, und diese Fallstudie aktualisiert sich mit der Website, die sie beschreibt; das ist der Unterschied zwischen Dokumentation und einem Screenshot von Dokumentation. Zwei Regeln lohnt es, aus den Zahlen herauszulesen. Jeder Akzent teilt sich in eine -500- und eine -600-Stufe, und die Kontrastregel liegt im Token-Namen, nach dem eine Komponente greift: -500 für großen Text und Formen, -600 für alles, was klein genug ist, dass WCAG AA tatsächlich greift. Und die goldene Textmarker-Farbe ist von dieser Aufteilung vollständig ausgenommen — sie ist eine Hintergrund-Lasur, nie eine Textfarbe, per Konvention auf eine einzige Markierung pro Seite beschränkt. Das vollständige Musterblatt mit Komponenten und den Regeln der gezeichneten Linien ist der lebende Styleguide, verlinkt unter Prototyp.",
  },

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
          en: 'The case-study template above the xl breakpoint: a sticky numbered TOC on the left, the capped prose column in the middle, and the pull-quote rail on the right. Drawn from the shipped ProjectTemplate code — the section list in the rail is this very page’s.',
          de: 'Die Fallstudien-Vorlage oberhalb des xl-Breakpoints: links eine sticky nummerierte Abschnittsleiste, in der Mitte die begrenzte Fließtextspalte, rechts die Pull-Quote-Spalte. Gezeichnet aus dem ausgelieferten ProjectTemplate-Code — die Abschnittsliste in der Leiste ist die dieser Seite.',
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
          en: 'The same template below md: the TOC becomes a horizontally scrolling pill bar, sections stack into one column in the same order, and the pull-quote rail doesn’t render. One layout, responsive — not a separate mobile design.',
          de: 'Dieselbe Vorlage unterhalb von md: Die Abschnittsleiste wird zu einer horizontal scrollenden Pill-Leiste, die Abschnitte stapeln sich in derselben Reihenfolge in eine Spalte, und die Pull-Quote-Spalte rendert nicht. Ein Layout, responsiv — kein separates Mobildesign.',
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
    en: "The engineering is the part I can defend line by line. Content has one source: profile data lives in a single data.json compiled into profile.js, and every case study is a folder with a data.js that import.meta.glob discovers at build time — there is no manual project registry to forget to update. The same object literal drives both languages: useLocalizedProfile recursively resolves any { en, de } field, in nested arrays and objects alike, through one hook that every page and every case study shares, so English and German can't structurally drift apart even though translation quality itself still depends on me writing both by hand. Print is not a separate template: the CV renders from the same React tree as the screen version, gated by @media print and an @page A4 rule, with accordions forced open via a CSS guard on [data-collapsible-body] — a printed page has no click affordance, so a section that stayed collapsed on screen would silently vanish from the page a hiring manager actually holds. Motion respects prefers-reduced-motion globally, wired once at the router root rather than re-checked in every animated component. The invariant tests come from a real bug: a project status written 'Published' with a capital P, compared against a lowercase 'published', silently emptied the homepage project list and nulled every case-study link — an automated test now makes that class of bug fail the build instead of shipping. The same suite guards the route contract — id, slug and folder name must be identical — a rule that once caught a capitalized project folder whose fix needed a two-step git mv, since Git won't record a case-only rename on a case-insensitive filesystem. The newest proof of the single-source rule answers back: an OpenAI-backed 'Ask this portfolio' assistant, live on every page, whose knowledge base is generated at build time from the same data.json and case-study files the site itself renders — the OpenAI key and the grounding stay server-side, and the assistant is instructed to answer only from that generated knowledge, never to invent.",
    de: "Die Technik ist der Teil, den ich Zeile für Zeile verteidigen kann. Inhalte haben eine einzige Quelle: Profildaten liegen in einer einzigen data.json, die zu profile.js kompiliert wird, und jede Fallstudie ist ein Ordner mit einer data.js, den import.meta.glob zur Buildzeit entdeckt — es gibt kein manuelles Projektregister, das vergessen werden könnte. Dasselbe Objektliteral steuert beide Sprachen: useLocalizedProfile löst jedes { en, de }-Feld rekursiv auf, auch in verschachtelten Arrays und Objekten, über einen einzigen Hook, den jede Seite und jede Fallstudie teilt — Englisch und Deutsch können strukturell nicht auseinanderdriften, auch wenn die Übersetzungsqualität selbst weiterhin davon abhängt, dass ich beide von Hand schreibe. Druck ist keine separate Vorlage: Der Lebenslauf rendert aus demselben React-Baum wie die Bildschirmversion, gesteuert über @media print und eine @page-A4-Regel, mit über eine CSS-Guard auf [data-collapsible-body] erzwungen geöffneten Akkordeons — eine gedruckte Seite hat keine Klick-Affordanz, ein Abschnitt, der am Bildschirm eingeklappt blieb, würde sonst stillschweigend von der Seite verschwinden, die eine Personalverantwortliche tatsächlich in der Hand hält. Bewegung respektiert prefers-reduced-motion global, einmal an der Router-Wurzel verdrahtet statt in jeder animierten Komponente erneut geprüft. Die Invarianten-Tests stammen aus einem echten Bug: Ein Projektstatus, als 'Published' mit großem P geschrieben und gegen ein kleingeschriebenes 'published' verglichen, leerte stillschweigend die Projektliste der Startseite und setzte jeden Fallstudien-Link auf null — ein automatisierter Test fängt diese Fehlerklasse heute vor dem Ausliefern ab. Dieselbe Suite sichert den Routen-Vertrag — id, slug und Ordnername müssen identisch sein — eine Regel, die einst einen großgeschriebenen Projektordner abfing, dessen Behebung ein zweistufiges git mv brauchte, weil Git eine reine Groß-/Kleinschreibungs-Umbenennung auf einem nicht case-sensitiven Dateisystem nicht aufzeichnet. Der neueste Beweis der Ein-Quellen-Regel antwortet zurück: ein OpenAI-gestützter „Ask this portfolio“-Assistent, live auf jeder Seite, dessen Wissensbasis zur Buildzeit aus derselben data.json und denselben Fallstudien-Dateien generiert wird, die die Website selbst rendert — der OpenAI-Schlüssel und die Verankerung bleiben serverseitig, und der Assistent ist angewiesen, nur aus diesem generierten Wissen zu antworten, nie zu erfinden.",
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
    en: "Accessibility here is a set of mechanisms in the source, built against WCAG 2.1 AA. The first tabbable element on every page is a skip link — visually hidden until it receives keyboard focus, then a coral-bordered chip that jumps past the navigation to the main content. Focus indication has one contract: every interactive element renders the same two-pixel coral outline through :focus-visible and a single focus-ring utility; before that pass the site had fourteen different focus treatments, and two interactive elements carried focus:outline-none with nothing to replace it, which removes the keyboard indicator outright. Motion is wired once: a MotionConfig at the router root turns every Framer Motion animation off for readers whose system requests reduced motion, with per-component guards kept underneath as a second layer of the same promise. Contrast lives in the token vocabulary: each accent splits into a -500 step for large text and fills and a -600 step for small text, where AA requires 4.5:1; dark mode splits the coral further into separate fill and text tokens, because no single value can both carry white and stand as small text on a dark ground; and hover states have their own AA-safe rung, held in place by an automated test that fails the build when a component reaches for a lower-contrast hover color. Every ratio behind those tokens is computed from the token values themselves — screenshot sampling proved unreliable for small text. Lighthouse scores the production site 100 on accessibility, and its automated contrast audit finds no failing pair. Two checks in Metrics below are still pending — the manual WCAG 2.1 AA pass across every token pair and the keyboard-only walkthrough of the primary path — which is why this statement names the standard the mechanisms were built against, and leaves the conformance claim to the audit.",
    de: "Barrierefreiheit ist hier eine Reihe von Mechanismen im Quellcode, gebaut nach WCAG 2.1 AA. Das erste per Tab erreichbare Element jeder Seite ist ein Skip-Link — unsichtbar, bis er Tastaturfokus erhält, dann ein korallgerahmter Chip, der an der Navigation vorbei zum Hauptinhalt springt. Die Fokus-Anzeige hat einen einzigen Vertrag: Jedes interaktive Element rendert dieselbe zwei Pixel starke Koralle-Kontur über :focus-visible und eine einzige Focus-Ring-Utility; vor diesem Durchgang hatte die Website vierzehn verschiedene Fokus-Stile, und zwei interaktive Elemente trugen focus:outline-none ohne Ersatz — was den Tastatur-Indikator ersatzlos entfernt. Bewegung ist einmal verdrahtet: Eine MotionConfig an der Router-Wurzel schaltet jede Framer-Motion-Animation ab, wenn das System reduzierte Bewegung anfordert; Guards in einzelnen Komponenten bleiben darunter als zweite Ebene desselben Versprechens. Kontrast liegt im Token-Vokabular: Jeder Akzent teilt sich in eine -500-Stufe für großen Text und Flächen und eine -600-Stufe für kleinen Text, wo AA 4,5:1 verlangt; der Dark Mode teilt die Koralle weiter in getrennte Flächen- und Text-Tokens, weil kein einzelner Wert zugleich Weiß tragen und als kleiner Text auf dunklem Grund bestehen kann; und Hover-Zustände haben ihre eigene AA-sichere Stufe, gehalten von einem automatisierten Test, der den Build scheitern lässt, wenn eine Komponente nach einer kontrastärmeren Hover-Farbe greift. Jedes Verhältnis hinter diesen Tokens ist aus den Token-Werten selbst berechnet — Screenshot-Messung erwies sich für kleinen Text als unzuverlässig. Lighthouse bewertet die Produktionsseite mit 100 für Accessibility, und der automatisierte Kontrast-Audit findet kein durchfallendes Paar. Zwei Prüfungen in den Metriken unten stehen noch aus — der manuelle WCAG-2.1-AA-Durchgang über jedes Token-Paar und die reine Tastatur-Begehung des Hauptpfads — weshalb diese Erklärung den Standard nennt, gegen den die Mechanismen gebaut wurden, und die Konformitätsaussage dem Audit überlässt.",
  },

  results: {
    en: "Measured against production with Lighthouse 13.4.0 (emulated desktop, 24 August 2026): Performance 99, Accessibility 100, Best Practices 100, SEO 100. A mobile-emulation run the same day scores 77, held there by a 4.4-second Largest Contentful Paint. Ten days earlier the same tool scored Performance 66, with a 0.261 layout shift, 340 ms of blocking time, and an estimated 733 KiB of unused JavaScript — what closed that gap was engineering, not remeasurement: a route-skeleton fix that removed the layout shift, lazy loading on every case-study figure, dead chunks cut from the bundle, and a card/data split that took all five case studies' full prose off the shared path (the aggregator chunk went from 57 KB to 3.9 KB gzipped). Two further optimisations were considered and rejected: migrating Framer Motion to LazyMotion would trade an estimated 20–25 KB gzipped for a 35-file blast radius across the hand-drawn animation system, and splitting the profile data would break the local editor that writes it — neither is worth its risk at the scores above. The remaining honest gap is mobile LCP: a client-rendered hero cannot paint before the JavaScript arrives, and 4.4 seconds on a throttled connection is the price of that architecture. Still pending, unchanged: the manual WCAG 2.1 AA contrast pass across every token pair (this run's automated contrast audit found no failing pair — which is still not a conformance claim), the keyboard-only completion check of the primary path, confirmation the CV prints to exactly one A4 page with no orphaned headings, time-to-answer 'what does she do?' from the planned 5-second test, and the first-click success rate on the navigation.",
    de: "Gemessen gegen die Produktionsseite mit Lighthouse 13.4.0 (emulierter Desktop, 24. August 2026): Performance 99, Accessibility 100, Best Practices 100, SEO 100. Ein Mobile-Emulationslauf am selben Tag ergibt 77, gehalten von einem Largest Contentful Paint von 4,4 Sekunden. Zehn Tage zuvor ergab dasselbe Werkzeug Performance 66, mit einer Layoutverschiebung von 0,261, 340 ms Total Blocking Time und geschätzt 733 KiB ungenutztem JavaScript — geschlossen hat diese Lücke Engineering, nicht Neumessung: eine Route-Skeleton-Korrektur, die die Layoutverschiebung beseitigte, Lazy Loading für jede Fallstudien-Abbildung, tote Chunks aus dem Bundle entfernt und ein Card/Data-Split, der die vollständige Prosa aller fünf Fallstudien vom gemeinsamen Pfad nahm (der Aggregator-Chunk sank von 57 KB auf 3,9 KB gzip). Zwei weitere Optimierungen wurden geprüft und verworfen: Eine Migration von Framer Motion zu LazyMotion würde geschätzte 20–25 KB gzip gegen einen Wirkungsradius von 35 Dateien im handgezeichneten Animationssystem eintauschen, und eine Aufteilung der Profildaten würde den lokalen Editor brechen, der sie schreibt — beides ist sein Risiko bei den obigen Werten nicht wert. Die verbleibende ehrliche Lücke ist der mobile LCP: Ein clientseitig gerenderter Hero kann nicht zeichnen, bevor das JavaScript ankommt, und 4,4 Sekunden auf einer gedrosselten Verbindung sind der Preis dieser Architektur. Weiterhin ausstehend, unverändert: die manuelle WCAG-2.1-AA-Kontrastprüfung über jedes Token-Paar (der automatisierte Kontrast-Audit dieses Laufs fand kein durchfallendes Paar — was weiterhin keine Konformitätsaussage ist), die Prüfung der reinen Tastaturbedienbarkeit des Hauptpfads, die Bestätigung, dass der Lebenslauf exakt auf eine A4-Seite ohne verwaiste Überschriften druckt, die Zeit bis zur Antwort auf 'Was macht sie eigentlich?' aus dem geplanten 5-Sekunden-Test, sowie die First-Click-Erfolgsrate der Navigation.",
  },

  // The research that would produce an outcome (moderated sessions, 5-second
  // test, first-click test) hasn't run yet — the Metrics prose above lists
  // exactly what is pending, so this body states only what it adds: what
  // gets recorded here once it does run.
  outcome: {
    body: {
      en: "No outcome yet: once those sessions run, this is where what actually changed gets recorded — a shipped fix, a reprioritised backlog item, or a finding that changed nothing.",
      de: "Noch kein Ergebnis: Sobald diese Sessions gelaufen sind, wird hier festgehalten, was sich tatsächlich geändert hat — eine ausgelieferte Korrektur, ein neu priorisierter Backlog-Punkt oder ein Befund ohne Konsequenz.",
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
