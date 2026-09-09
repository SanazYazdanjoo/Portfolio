// Card-level fields (id/status/title/tags/thumbnails/card*) live in
// ./card.js — eagerly aggregated site-wide — and are spread here so the
// detail page sees one object. This file carries only the prose and media
// that load with the route's own chunk.
import card from './card';
import thumbnailImg from './Project-1.png';
import challenge from './media/challenge.png';
import magicDemo from './media/magic-demo.mp4';
import ninjaDemo from './media/ninja-demo.mp4';

import SUS from './media/sus.png';
import experimentalDesign from './media/experimental_design.png';
import threeInputMethods from './media/three_input_methods.png';
import conclusion from './media/conclusion.png';


export const projectData = {
  ...card,

  // Submission and defence are different dates and both are real: the thesis
  // was submitted 04/2026 and defended 05/2026. data.json's role entry runs
  // to 05/2026 (through the defence); this states the split so the two never
  // read as a contradiction. (F1, confirmed by the owner 2026-08-24.)
  timeline: { en: "10/2025 – 04/2026 · defence 05/2026", de: "10/2025 – 04/2026 · Verteidigung 05/2026" },

  // Explicit ownership is deliberately visible near the top of the case study.
  // A recruiter should not have to infer which parts of an academic project
  // were mine.
  myContribution: {
    owned: [
      { en: "Framed the research question and ran the formative user research", de: "Forschungsfrage formuliert und formative Nutzerforschung durchgeführt" },
      { en: "Designed the controlled study, tasks, counterbalancing, and measures", de: "Kontrollierte Studie, Aufgaben, Counterbalancing und Messgrößen konzipiert" },
      { en: "Engineered the TypeScript experiment and real-time gaze pipeline", de: "TypeScript-Experiment und Echtzeit-Blickpipeline entwickelt" },
      { en: "Conducted participant sessions and managed the study data", de: "Teilnehmenden-Sessions durchgeführt und Studiendaten verwaltet" },
      { en: "Analysed performance, SUS, and qualitative feedback", de: "Leistung, SUS und qualitatives Feedback analysiert" },
      { en: "Translated the evidence into interaction-design recommendations", de: "Evidenz in Empfehlungen für das Interaktionsdesign übersetzt" },
    ],
  },

  // Recruiter-facing labels keep the academic rigour but make the page read
  // like a case study rather than a thesis table of contents.
  sectionTitles: {
    about: {
      label: { en: "Research question", de: "Forschungsfrage" },
      kicker: { en: "Frame", de: "Rahmen" },
      heading: { en: "The question I set out to answer", de: "Die Frage, die ich beantworten wollte" },
    },
    process: {
      label: { en: "Approach", de: "Vorgehen" },
      kicker: { en: "Approach", de: "Vorgehen" },
      heading: { en: "How I approached it", de: "Wie ich vorgegangen bin" },
    },
    challenge: {
      label: { en: "Problem", de: "Problem" },
      kicker: { en: "Problem", de: "Problem" },
      heading: { en: "The interaction problem", de: "Das Interaktionsproblem" },
    },
    solution: {
      label: { en: "Built & evaluated", de: "Entwickelt & evaluiert" },
      kicker: { en: "Build", de: "Entwicklung" },
      heading: { en: "What I built & evaluated", de: "Was ich entwickelt & evaluiert habe" },
    },
    methodology: {
      label: { en: "Evaluation", de: "Evaluation" },
      kicker: { en: "Research decisions", de: "Forschungsentscheidungen" },
      heading: { en: "How I evaluated it", de: "Wie ich es evaluiert habe" },
    },
    results: {
      label: { en: "Findings", de: "Ergebnisse" },
      kicker: { en: "Evidence", de: "Evidenz" },
      heading: { en: "What I found", de: "Was ich herausgefunden habe" },
    },
    limitations: {
      label: { en: "Next iteration", de: "Nächste Iteration" },
      kicker: { en: "Reflection", de: "Reflexion" },
      heading: { en: "What I'd improve next", de: "Was ich als Nächstes verbessern würde" },
    },
    implications: {
      label: { en: "Design implications", de: "Design-Implikationen" },
      kicker: { en: "Application", de: "Anwendung" },
      heading: { en: "Design implications", de: "Implikationen für das Design" },
    },
    conclusion: {
      label: { en: "Demonstrates", de: "Kompetenzen" },
      kicker: { en: "Research → Usability Engineering → Implementation", de: "Research → Usability Engineering → Implementation" },
      heading: { en: "What this project demonstrates", de: "Was dieses Projekt zeigt" },
    },
  },

  heroImage: thumbnailImg,
  heroIsGenerated: true, // hero generated with Google Gemini — renders the credit

  methods: [
    { en: "Semi-Structured Interviews",             de: "Semi-strukturierte Interviews" },
    { en: "Workspace Visualisation",                de: "Arbeitsplatz-Visualisierung" },
    { en: "Within-Subjects Experiment (3×2×6)",   de: "Within-Subjects-Experiment (3×2×6)" },
    { en: "Repeated-Measures ANOVA",               de: "ANOVA mit Messwiederholung" },
    { en: "SUS Evaluation",                        de: "SUS-Evaluation" },
    { en: "Reflexive Thematic Analysis",           de: "Reflexive thematische Analyse" },
  ],

  metrics: [
    { value: "2", label: { en: "gaze techniques engineered from scratch in TypeScript", de: "blickgestützte Techniken von Grund auf in TypeScript entwickelt" } },
    { value: "N=30", label: { en: "within-subjects experiment", de: "Within-Subjects-Experiment" } },
    { value: "η²ₚ=.690", label: { en: "technique × distance interaction", de: "Interaktion Technik × Distanz" } },
    { value: "60%", label: { en: "preferred the gaze-hybrid (Ninja)", de: "bevorzugten den Blick-Hybrid (Ninja)" } },
  ],

  techStack: ["TypeScript", "Pupil Labs Neon", "Real-Time API", "AprilTag Marker Mapping", "Python", "React"],

  figures: {
    challenge: [
      {
        type: "image",
        src: challenge,
        alt: {
          en: "Slide: multi-display workstations are common, but cross-display pointing is costly with the mouse alone — long pointer transits, lost cursor after boundary crossing, and costly attentional switches, each with literature citations",
          de: "Folie: Multi-Display-Arbeitsplätze sind verbreitet, doch bildschirmübergreifendes Zeigen ist mit der Maus allein teuer — lange Zeigerwege, verlorener Cursor nach dem Rahmenübergang und teure Aufmerksamkeitswechsel, jeweils mit Literaturbelegen",
        },
        caption: {
          en: "The problem: three documented costs of cross-display pointing with a mouse",
          de: "Das Problem: drei belegte Kosten bildschirmübergreifenden Zeigens mit der Maus",
        },
        span: 2,
        className: "w-full h-auto block",
      },
    ],
    solution: [
      {
        type: "image",
        src: threeInputMethods,
        alt: { en: "Three input methods compared in the study", de: "Drei in der Studie verglichene Eingabemethoden" },
        caption: { en: "Three input methods in the evaluation", de: "Drei Eingabemethoden in der Evaluation" },
        span: 2,
        className: "w-full h-auto block",
      },
      {
        type: "video",
        src: magicDemo,
        poster: thumbnailImg,
        alt: { en: "MAGIC pointing demo in a dual-display experiment", de: "MAGIC-Pointing-Demo in einem Dual-Display-Experiment" },
        caption: { en: "MAGIC Pointing demo", de: "MAGIC-Pointing-Demo" },
      },
      {
        type: "video",
        src: ninjaDemo,
        poster: thumbnailImg,
        alt: { en: "Ninja cursors demo in a dual-display experiment", de: "Ninja-Cursors-Demo in einem Dual-Display-Experiment" },
        caption: { en: "Ninja Cursors demo", de: "Ninja-Cursors-Demo" },
      }
    ],
    methodology: [
      {
        type: "image",
        src: experimentalDesign,
        alt: { en: "Experimental design overview for the study", de: "Übersicht des Studiendesigns" },
        caption: { en: "Experimental design overview", de: "Übersicht des experimentellen Designs" },
        span: 2,
        className: "w-full h-auto block",
      },
    ],
    results: [
      {
        type: "image",
        src: SUS,
        alt: { en: "SUS score comparison for mouse, Ninja Cursors, and MAGIC Pointing", de: "SUS-Score-Vergleich für Maus, Ninja Cursors und MAGIC Pointing" },
        caption: { en: "SUS results across input methods", de: "SUS-Ergebnisse über alle Eingabemethoden" },
        span: 2,
        className: "w-full h-auto block",
      },
    ],
  },

  // Five recruiter-scannable steps. Detailed methodological choices still live
  // in the Methodology section, so this rail communicates reasoning rather
  // than repeating the thesis procedure line by line.
  process: [
    {
      phase: "discover",
      type: { en: "Understand", de: "Verstehen" },
      title: { en: "Understand the Real Workstation Context", de: "Den realen Arbeitsplatzkontext verstehen" },
      annotation: {
        en: "I interviewed 20 researchers and tech/design professionals and had them recreate their workstation on a shared Figma canvas. We discussed screen roles, input preferences, and cross-display pain points.",
        de: "Ich interviewte 20 Forschende und Tech-/Design-Fachkräfte und ließ sie ihren Arbeitsplatz auf einer gemeinsamen Figma-Fläche nachbilden. Wir besprachen Bildschirmrollen, Eingabepräferenzen und bildschirmübergreifende Schwachstellen.",
      },
      insight: {
        en: "Cursor loss was a real, named pain point; 14 of 20 also reported neck strain or eye fatigue. This grounded the study in an everyday multi-display problem rather than a lab-only hypothesis.",
        de: "Cursor-Verlust war ein real benannter Schwachpunkt; 14 von 20 berichteten zusätzlich Nackenverspannungen oder Augenermüdung. Damit basierte die Studie auf einem alltäglichen Multi-Display-Problem statt nur auf einer Laborhypothese.",
      },
      imagePath: null,
    },
    {
      phase: "define",
      type: { en: "Define", de: "Definieren" },
      title: { en: "Turn Pain Points into Measurable Questions", de: "Schwachstellen in messbare Fragen übersetzen" },
      annotation: {
        en: "I defined a 3×2×6 within-subjects comparison: Mouse, MAGIC Pointing, and gaze-augmented Ninja Cursors × two target sizes × six distances, with method and target-size order counterbalanced.",
        de: "Ich definierte einen 3×2×6-Within-Subjects-Vergleich: Maus, MAGIC Pointing und blickunterstützte Ninja Cursors × zwei Zielgrößen × sechs Distanzen, mit balancierter Reihenfolge von Methode und Zielgröße.",
      },
      insight: {
        en: "The protocol paired objective performance with subjective usability so a faster technique could not automatically be mistaken for a better user experience.",
        de: "Das Protokoll kombinierte objektive Leistung mit subjektiver Usability, damit eine schnellere Technik nicht automatisch mit einer besseren User Experience gleichgesetzt wurde.",
      },
      imagePath: null,
    },
    {
      phase: "design",
      type: { en: "Build", de: "Entwickeln" },
      title: { en: "Build the Gaze-Assisted System", de: "Das blickgestützte System entwickeln" },
      annotation: {
        en: "I engineered the experiment in TypeScript and connected the Pupil Labs Neon eye tracker through a Python real-time service and AprilTag-based surface mapping. I implemented MAGIC and a gaze-augmented Ninja variant for the dual-display setup.",
        de: "Ich entwickelte das Experiment in TypeScript und verband den Pupil Labs Neon Eyetracker über einen Python-Echtzeitdienst und AprilTag-basiertes Surface Mapping. Für das Dual-Display-Setup implementierte ich MAGIC und eine blickunterstützte Ninja-Variante.",
      },
      insight: {
        en: "The techniques distribute gaze uncertainty differently: MAGIC uses gaze for the landing location; Ninja uses it mainly for the coarse display switch. That architectural distinction later explained the results pattern.",
        de: "Die Techniken verteilen Blickunsicherheit unterschiedlich: MAGIC nutzt den Blick für die Landeposition; Ninja vor allem für den groben Bildschirmwechsel. Dieser Architekturunterschied erklärte später das Ergebnismuster.",
      },
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "Evaluate", de: "Evaluieren" },
      title: { en: "Run the Controlled Comparison", de: "Den kontrollierten Vergleich durchführen" },
      annotation: {
        en: "Thirty participants used all three methods across the controlled pointing conditions. I collected movement time, repeat rate, SUS after each method block, and open feedback.",
        de: "Dreißig Teilnehmende nutzten alle drei Methoden in den kontrollierten Zeigebedingungen. Ich erfasste Bewegungszeit, Wiederholungsrate, SUS nach jedem Methodenblock und offenes Feedback.",
      },
      insight: {
        en: "A within-subjects design let every participant act as their own comparison, reducing the influence of individual differences in pointing performance.",
        de: "Das Within-Subjects-Design machte jede teilnehmende Person zu ihrem eigenen Vergleich und reduzierte so den Einfluss individueller Unterschiede in der Zeigeleistung.",
      },
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "Translate", de: "Übersetzen" },
      title: { en: "Analyse and Translate the Evidence", de: "Evidenz analysieren und übersetzen" },
      annotation: {
        en: "I combined repeated-measures ANOVA, SUS comparison, and reflexive thematic analysis. The central pattern was a distance-dependent performance crossover together with a strong preference for the more predictable gaze hybrid.",
        de: "Ich kombinierte ANOVA mit Messwiederholung, SUS-Vergleich und reflexive thematische Analyse. Das zentrale Muster war ein distanzabhängiger Performance-Crossover zusammen mit einer starken Präferenz für den vorhersagbareren Blick-Hybrid.",
      },
      insight: {
        en: "The design lesson was not 'gaze is faster.' Gaze helped when it removed the costly part of a cross-screen move while preserving manual control and predictable cursor behaviour.",
        de: "Die Design-Lektion lautete nicht „Blick ist schneller“. Blicksteuerung half dann, wenn sie den teuren Teil einer bildschirmübergreifenden Bewegung entfernte und gleichzeitig manuelle Kontrolle und vorhersagbares Cursor-Verhalten bewahrte.",
      },
      imagePath: null,
    },
  ],

  about: {
    en: "People working across two displays repeatedly move the pointer over long distances and can lose track of it after crossing a screen boundary. I asked whether gaze-assisted pointing could reduce that interaction cost without giving up predictability, accuracy, or manual control. I led the project end-to-end: formative interviews, study design, TypeScript/Python implementation, a controlled N=30 experiment, quantitative and qualitative analysis, and design recommendations.",
    de: "Menschen, die mit zwei Bildschirmen arbeiten, bewegen den Zeiger wiederholt über große Distanzen und können ihn nach einem Bildschirmwechsel aus den Augen verlieren. Ich untersuchte, ob blickgestütztes Zeigen diese Interaktionskosten reduzieren kann, ohne Vorhersagbarkeit, Genauigkeit oder manuelle Kontrolle aufzugeben. Ich verantwortete das Projekt durchgängig: formative Interviews, Studiendesign, TypeScript-/Python-Implementierung, ein kontrolliertes Experiment mit N=30, quantitative und qualitative Analyse sowie Designempfehlungen.",
  },

  challenge: {
    en: "The problem was not simply pointer distance. In the formative study, participants described losing the cursor and 'shaking' the mouse to find it again; 14 of 20 also reported neck strain or eye fatigue. Prior work proposed gaze-assisted hybrids, but the open design question was whether gaze could remove cross-display transport cost without introducing a new cost in landing accuracy, attention, or trust.",
    de: "Das Problem war nicht nur die Zeigerdistanz. In der formativen Studie beschrieben Teilnehmende, den Cursor zu verlieren und die Maus „zu schütteln“, um ihn wiederzufinden; 14 von 20 berichteten außerdem Nackenverspannungen oder Augenermüdung. Frühere Arbeiten schlugen blickunterstützte Hybride vor, doch die offene Designfrage war, ob Blicksteuerung die Transportkosten zwischen Bildschirmen reduzieren kann, ohne neue Kosten bei Landegenauigkeit, Aufmerksamkeit oder Vertrauen zu erzeugen.",
  },
  solution: {
    en: "I built and evaluated three interaction conditions in the same dual-display environment. The mouse provided the baseline. MAGIC Pointing used gaze to warp the cursor toward the viewed location and left fine correction to the mouse. The gaze-augmented Ninja design kept one cursor per screen and used gaze mainly to select the active display. The setup combined Pupil Labs Neon, its real-time API, AprilTag surface mapping, a Python relay service, and a TypeScript experiment frontend.",
    de: "Ich entwickelte und evaluierte drei Interaktionsbedingungen in derselben Dual-Display-Umgebung. Die Maus diente als Baseline. MAGIC Pointing nutzte den Blick, um den Cursor zur betrachteten Position zu versetzen, und überließ die Feinkorrektur der Maus. Das blickunterstützte Ninja-Design hielt einen Cursor pro Bildschirm bereit und nutzte den Blick hauptsächlich zur Auswahl des aktiven Displays. Das Setup kombinierte Pupil Labs Neon, dessen Echtzeit-API, AprilTag-Surface-Mapping, einen Python-Relay-Service und ein TypeScript-Experiment-Frontend.",
  },
  methodology: {
    en: "Three research decisions shaped the evaluation. First, I used a two-phase mixed-methods design so the controlled experiment was grounded in real workstation behaviour rather than assumptions. Second, every participant used every input method, with method and target-size order counterbalanced, so individual pointing ability had less influence on the comparison. Third, I paired movement time and repeat rate with SUS and open feedback because speed alone cannot show whether an interaction feels predictable, controllable, or trustworthy. Performance was analysed with repeated-measures ANOVA (Greenhouse–Geisser corrected, Tukey post-hoc); qualitative feedback was analysed reflexively.",
    de: "Drei Forschungsentscheidungen prägten die Evaluation. Erstens nutzte ich ein zweiphasiges Mixed-Methods-Design, damit das kontrollierte Experiment auf realem Arbeitsplatzverhalten statt auf Annahmen beruhte. Zweitens nutzte jede teilnehmende Person jede Eingabemethode, wobei Methoden- und Zielgrößenreihenfolge balanciert wurden, sodass individuelle Zeigefähigkeit den Vergleich weniger beeinflusste. Drittens kombinierte ich Bewegungszeit und Wiederholungsrate mit SUS und offenem Feedback, weil Geschwindigkeit allein nicht zeigt, ob eine Interaktion vorhersagbar, kontrollierbar oder vertrauenswürdig wirkt. Die Performance wurde mit ANOVA mit Messwiederholung (Greenhouse–Geisser-korrigiert, Tukey-Post-hoc) analysiert; qualitatives Feedback wurde reflexiv ausgewertet.",
  },
  results: {
    en: "Three findings mattered. 1) Performance depended on distance: the mouse was fastest for short movements, while Ninja significantly outperformed it at the two intermediate cross-screen distances (1684 and 2243 px) and converged at the longest; the technique × distance interaction was large (η²ₚ = .690). 2) How gaze was integrated mattered more than simply adding gaze: MAGIC was consistently slowest and had the highest small-target repeat rate (4.69%), whereas Ninja matched the mouse's 3.30%. 3) Trust shaped acceptance: SUS ranked Mouse 85.2, Ninja 72.6, MAGIC 55.9, yet 60% still preferred Ninja — the hybrid that used gaze for transport while preserving predictable manual control.",
    de: "Drei Ergebnisse waren entscheidend. 1) Die Performance hing von der Distanz ab: Die Maus war bei kurzen Bewegungen am schnellsten, während Ninja sie bei den beiden mittleren bildschirmübergreifenden Distanzen (1684 und 2243 px) signifikant übertraf und sich bei der längsten anglich; die Interaktion Technik × Distanz war groß (η²ₚ = .690). 2) Wie Blicksteuerung integriert wurde, war wichtiger als Blicksteuerung einfach hinzuzufügen: MAGIC war durchgängig am langsamsten und hatte die höchste Wiederholungsrate bei kleinen Zielen (4,69 %), während Ninja mit 3,30 % der Maus entsprach. 3) Vertrauen prägte die Akzeptanz: Der SUS rangierte Maus 85,2, Ninja 72,6, MAGIC 55,9; dennoch bevorzugten 60 % Ninja — den Hybrid, der Blick für den Transport nutzte und gleichzeitig vorhersagbare manuelle Kontrolle bewahrte.",
  },

  // Portfolio-facing summary of the thesis limitations. Each item states the
  // boundary of the evidence and the concrete next research move.
  limitations: [
    {
      en: "Long-term learning — The study captured first impressions, while the mouse benefited from years of familiarity. Next: run a longitudinal study to see whether the coordination overhead reported by 18 of 30 participants decreases with practice.",
      de: "Langfristiges Lernen — Die Studie erfasste erste Eindrücke, während die Maus von jahrelanger Vertrautheit profitierte. Als Nächstes: eine Längsschnittstudie durchführen, um zu prüfen, ob der von 18 von 30 Teilnehmenden berichtete Koordinationsaufwand mit Übung sinkt.",
    },
    {
      en: "Real work versus laboratory pointing — Reciprocal pointing isolates target acquisition but not window management, context switching, or periods of cursor disengagement. Next: evaluate the techniques in realistic productivity workflows.",
      de: "Reale Arbeit versus Labor-Zeigen — Reziprokes Zeigen isoliert die Zielerfassung, aber nicht Fensterverwaltung, Kontextwechsel oder Phasen ohne Cursor-Kontakt. Als Nächstes: die Techniken in realistischen Produktivitäts-Workflows evaluieren.",
    },
    {
      en: "Endpoint data — The cleaned export did not retain miss/timeout outcomes and trial-level endpoint coordinates, so ISO-style effective throughput could not be computed. Next: retain endpoint-level telemetry by design in the logging schema.",
      de: "Endpunktdaten — Der bereinigte Export enthielt keine Miss-/Timeout-Ergebnisse und keine trial-genauen Endpunktkoordinaten, sodass ISO-konformer effektiver Throughput nicht berechnet werden konnte. Als Nächstes: Endpunkt-Telemetrie von Anfang an im Logging-Schema vorsehen.",
    },
    {
      en: "Distance and screen transition — The study intentionally used realistic, asymmetric display geometry, so distance and bezel crossing were not independently matched. Next: add matched within-screen and cross-screen distance pairs to isolate the boundary effect.",
      de: "Distanz und Bildschirmwechsel — Die Studie nutzte bewusst eine realistische, asymmetrische Display-Geometrie; daher waren Distanz und Rahmenübergang nicht unabhängig gematcht. Als Nächstes: gematchte bildschirminterne und bildschirmübergreifende Distanzpaare ergänzen, um den Grenzeffekt zu isolieren.",
    },
  ],

  implications: {
    en: "The evidence points to a specific design direction: use gaze as a context-aware accelerator, not an always-on replacement for manual pointing. First, activate assistance only when the costly event occurs, such as crossing a screen boundary. Second, preserve a predictable manual fine-control loop and consider semantic snapping toward UI targets to reduce landing error. Third, make the active cursor unmistakable in multi-cursor designs. The broader lesson for UX engineering is that performance gains only matter when the system remains understandable and trustworthy.",
    de: "Die Evidenz weist auf eine klare Designrichtung: Blicksteuerung als kontextsensitiven Beschleuniger nutzen, nicht als dauerhaften Ersatz für manuelles Zeigen. Erstens sollte Unterstützung nur dann aktiviert werden, wenn das kostspielige Ereignis auftritt, etwa beim Überschreiten einer Bildschirmgrenze. Zweitens sollte eine vorhersagbare manuelle Feinkontrolle erhalten bleiben; semantisches Einrasten an UI-Ziele kann Landefehler reduzieren. Drittens muss der aktive Cursor in Multi-Cursor-Designs eindeutig erkennbar sein. Die übergeordnete UX-Engineering-Lektion lautet: Performance-Gewinne zählen nur, wenn das System verständlich und vertrauenswürdig bleibt.",
  },
  conclusion: [
      {
        type: "image",
        src: conclusion,
        poster: thumbnailImg,
        alt: {
          en: "Summary slide with three takeaways — performance: distance-dependent, Ninja beats the mouse at intermediate cross-screen distances; acceptance: trust outweighs raw speed; design: treat gaze as a context-aware accelerator",
          de: "Zusammenfassungsfolie mit drei Kernaussagen — Leistung: distanzabhängig, Ninja schlägt die Maus bei mittleren bildschirmübergreifenden Distanzen; Akzeptanz: Vertrauen wiegt mehr als reine Geschwindigkeit; Design: Blick als kontextsensitiven Beschleuniger behandeln",
        },
        caption: {
          en: "End-to-end HCI work: user research → experimental design → implementation → usability evaluation → design guidance",
          de: "End-to-End-HCI-Arbeit: Nutzerforschung → Experimentaldesign → Implementierung → Usability-Evaluation → Designempfehlungen",
        },
        span: 2,
        className: "w-full h-auto block"
      }
  ],

  outcome: {
    body: {
      en: "This was a completed Master's thesis rather than a commercially deployed feature, so its impact is research and design evidence rather than product adoption. The work established where a gaze hybrid can outperform a mouse, why MAGIC's landing behaviour undermined usability, and three concrete interaction directions for future multi-display systems. It also demonstrates the bridge I bring to UX work: I can investigate the user problem, engineer the system needed to test it, and translate the evidence into design decisions.",
      de: "Dies war eine abgeschlossene Masterarbeit und kein kommerziell ausgeliefertes Feature; die Wirkung liegt daher in Forschungs- und Designevidenz statt in Produktadoption. Die Arbeit zeigte, wo ein Blick-Hybrid eine Maus übertreffen kann, warum MAGICs Landeverhalten die Usability beeinträchtigte, und leitete drei konkrete Interaktionsrichtungen für zukünftige Multi-Display-Systeme ab. Gleichzeitig zeigt sie die Brücke, die ich in UX-Arbeit einbringe: Ich kann das Nutzerproblem untersuchen, das notwendige System zur Prüfung entwickeln und die Evidenz in Designentscheidungen übersetzen.",
    },
    adoption: "academic",
  },

  // Both quotes are verbatim participant quotes published in the thesis
  // (Phase I pre-study, Theme T3, §3.1; Phase II main study, Theme 6, §4.6.1).
  verbatims: [
    {
      quote: {
        en: "Sometimes when I'm very much focused on the task, I just don't get [where the cursor] is, and then I have to shake it.",
        de: "Manchmal, wenn ich sehr auf die Aufgabe konzentriert bin, weiß ich einfach nicht, [wo der Cursor] ist, und dann muss ich ihn schütteln.",
      },
      attribution: {
        en: "P03 (engineer), Phase I pre-study (n=20) — on losing the cursor in everyday multi-display work",
        de: "P03 (Ingenieur:in), Vorstudie Phase I (n=20) — zum Cursor-Verlust in der alltäglichen Multi-Display-Arbeit",
      },
    },
    {
      quote: {
        en: "It's a mix of Mouse and MAGIC — you get the best out of both. It makes switching monitors faster while putting less strain on the eyes.",
        de: "Es ist eine Mischung aus Maus und MAGIC — man bekommt das Beste aus beidem. Der Monitorwechsel wird schneller, und die Augen werden weniger belastet.",
      },
      attribution: {
        en: "P21 on Ninja Cursors, Phase II study (N=30) — 60% preferred it despite the mouse scoring higher on SUS",
        de: "P21 zu Ninja Cursors, Phase-II-Studie (N=30) — 60 % bevorzugten es trotz des höheren SUS-Werts der Maus",
      },
    },
  ],

  tagEvidence: [
    { tag: "TypeScript", evidence: "process:Build the Gaze-Assisted System", status: "evidenced" },
    { tag: "React", evidence: "techStack: [\"TypeScript\", \"Pupil Labs Neon\", \"Real-Time API\", \"AprilTag Marker Mapping\", \"Python\", \"React\"] — rendered as Tech Stack under Methodology", status: "evidenced" },
    { tag: "Python", evidence: "process:Build the Gaze-Assisted System — Python real-time relay service", status: "evidenced" },
    { tag: "Eye-Tracking", evidence: "solution: Pupil Labs Neon head-mounted tracker, AprilTag surface mapping", status: "evidenced" },
    { tag: "Real-Time API Integration", evidence: "process:Build the Gaze-Assisted System — Pupil Labs real-time streaming API", status: "evidenced" },
    { tag: "Mixed-Methods Research", evidence: "methodology: two-phase mixed-methods design", status: "evidenced" },
    { tag: "Experimental Design", evidence: "process:Turn Pain Points into Measurable Questions", status: "evidenced" },
    { tag: "Semi-Structured Interviews", evidence: "process:Understand the Real Workstation Context — 20 formative interviews", status: "evidenced" },
    { tag: "Thematic Analysis", evidence: "process:Analyse and Translate the Evidence — reflexive thematic analysis of open feedback", status: "evidenced" },
    { tag: "Quantitative UX Research", evidence: "process:Run the Controlled Comparison — N=30 within-subjects experiment", status: "evidenced" },
    { tag: "Statistical Analysis (ANOVA)", evidence: "process:Analyse and Translate the Evidence — repeated-measures ANOVA, η²ₚ=.690", status: "evidenced" },
    { tag: "SUS Evaluation", evidence: "process:Run the Controlled Comparison — SUS after each method block", status: "evidenced" },
    { tag: "Figma", evidence: "process:Understand the Real Workstation Context — shared Figma workspace recreation", status: "evidenced" },
  ],
};

export default projectData;
