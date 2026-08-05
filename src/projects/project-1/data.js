// src/projects/project-1/data.js

import thumbnailImg from './project1.png';
import challenge from './media/challenge.png';
import magicDemo from './media/magic-demo.mp4';
import ninjaDemo from './media/ninja-demo.mp4';

import SUS from './media/sus.png';
import experimentalDesign from './media/experimental_design.png';
import threeInputMethods from './media/three_input_methods.png';
import conclusion from './media/conclusion.png';



export const projectData = {
  id: "project-1",
  status: "Published",
  order: 2,
  title: {
    en: "Gaze-Assisted Input in Dual-Display Environments",
    de: "Blickgestützte Eingabe in Dual-Display-Umgebungen",
  },
  tags: ["TypeScript Custom App", "Quantitative UX", "Eye-Tracking", "Real-Time API", "Mixed-Methods"],

  subtitle: {
    en: "A Comparative Evaluation of MAGIC Pointing, Ninja Cursors, and a Mouse Baseline",
    de: "Eine vergleichende Evaluation von MAGIC Pointing, Ninja Cursors und einer Maus-Baseline",
  },
  tagline: {
    en: "Can gaze make cross-screen pointing faster — without sacrificing user trust?",
    de: "Kann Blicksteuerung bildschirmübergreifendes Zeigen beschleunigen — ohne das Vertrauen der Nutzer:innen zu kosten?",
  },
  role: {
    en: "UX Engineer (Master's Thesis)",
    de: "UX Engineer (Masterarbeit)",
  },

  timeline: "10/2025 – 04/2026",
  thumbnail: thumbnailImg,
  heroImage: thumbnailImg,

  methods: [
    { en: "Custom TypeScript Architecture",       de: "Eigene TypeScript-Architektur" },
    { en: "Within-Subjects Experiment (3×2×6)",   de: "Within-Subjects-Experiment (3×2×6)" },
    { en: "Real-Time Data Logging",                de: "Echtzeit-Datenerfassung" },
    { en: "Repeated-Measures ANOVA",               de: "ANOVA mit Messwiederholung" },
    { en: "SUS Evaluation",                        de: "SUS-Evaluation" },
    { en: "Reflexive Thematic Analysis",           de: "Reflexive thematische Analyse" },
  ],

  metrics: [
    { value: "TypeScript", label: { en: "experimental software built", de: "entwickelte Experimentalsoftware" } },
    { value: "N=30", label: { en: "within-subjects experiment", de: "Within-Subjects-Experiment" } },
    { value: "η²ₚ=.69", label: { en: "technique × distance interaction", de: "Interaktion Technik × Distanz" } },
    { value: "60%", label: { en: "preferred the gaze-hybrid (Ninja)", de: "bevorzugten den Blick-Hybrid (Ninja)" } },
  ],

  techStack: ["TypeScript", "Pupil Labs Neon", "Real-Time API", "AprilTag Marker Mapping", "Python", "React"],

  figures: {
    challenge: [
      {
        type: "image",
        src: challenge,
        alt: { en: "challenge", de: "Herausforderung" },
        caption: { en: "challenge", de: "Herausforderung" },
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

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: { en: "Semi-structured Interviews", de: "Semi-strukturierte Interviews" },
      title: { en: "Characterising Real Multi-Display Work", de: "Reale Multi-Display-Arbeit charakterisieren" },
      annotation: {
        en: "20 participants (researchers and tech/design professionals) recreated their workstation on a shared Figma canvas, then discussed screen roles, input preferences, and cross-display pain points in ~30-minute sessions. Analysed with reflexive thematic analysis.",
        de: "20 Teilnehmende (Forschende sowie Tech-/Design-Fachkräfte) bildeten ihren Arbeitsplatz auf einer gemeinsamen Figma-Fläche nach und diskutierten in ~30-minütigen Sessions Bildschirmrollen, Eingabepräferenzen und bildschirmübergreifende Schwachstellen. Ausgewertet mit reflexiver thematischer Analyse.",
      },
      insight: {
        en: "Cursor loss was a real, named pain point: participants described 'shaking' the mouse to find the pointer, and 14 of 20 reported neck strain or eye fatigue. This directly motivated the focus on cross-display target acquisition.",
        de: "Cursor-Verlust war ein real benannter Schwachpunkt: Teilnehmende beschrieben das 'Schütteln' der Maus, um den Zeiger wiederzufinden, und 14 von 20 berichteten Nackenverspannungen oder Augenermüdung. Das motivierte direkt den Fokus auf bildschirmübergreifendes Zielerfassen.",
      },
      imagePath: null,
    },
    {
      phase: "discover",
      type: { en: "Workspace Visualisation", de: "Arbeitsplatz-Visualisierung" },
      title: { en: "Grounding the Lab Setup in Reality", de: "Den Laboraufbau in der Realität verankern" },
      annotation: {
        en: "Participants' recreated configurations revealed dominant patterns: side-by-side dual displays, laptop + external monitor (12/20), and near-universal mouse use (17/20) even on laptops.",
        de: "Die nachgebildeten Konfigurationen der Teilnehmenden zeigten dominante Muster: nebeneinander angeordnete Dual-Displays, Laptop + externer Monitor (12/20) und nahezu universelle Mausnutzung (17/20) selbst auf Laptops.",
      },
      insight: {
        en: "The lab apparatus copied what people actually use — side-by-side dual displays, mouse as the manual device, and a height-adjustable desk to address the ergonomic strain participants reported.",
        de: "Der Laboraufbau übernahm, was tatsächlich genutzt wird — nebeneinander angeordnete Dual-Displays, die Maus als manuelles Eingabegerät und ein höhenverstellbarer Tisch gegen die berichtete ergonomische Belastung.",
      },
      imagePath: null,
    },
    {
      phase: "define",
      type: { en: "Experimental Design", de: "Experimentaldesign" },
      title: { en: "A 3×2×6 Within-Subjects Protocol", de: "Ein 3×2×6-Within-Subjects-Protokoll" },
      annotation: {
        en: "Three input methods (Mouse, MAGIC Pointing, gaze-augmented Ninja Cursors) × two target sizes × six distances (875–3226 px), counterbalanced with a balanced Latin square. Measures: movement time, repeat rate, and SUS per method block.",
        de: "Drei Eingabemethoden (Maus, MAGIC Pointing, blickunterstützte Ninja Cursors) × zwei Zielgrößen × sechs Distanzen (875–3226 px), balanciert mit einem ausgeglichenen lateinischen Quadrat. Messgrößen: Bewegungszeit, Wiederholungsrate und SUS pro Methodenblock.",
      },
      insight: {
        en: "Treating distance as a categorical factor was deliberate — the six levels mix within-screen and cross-screen movements, which is exactly where the techniques were expected to diverge.",
        de: "Distanz als kategorialen Faktor zu behandeln war bewusst gewählt — die sechs Stufen mischen bildschirminterne und bildschirmübergreifende Bewegungen, genau dort, wo sich die Techniken erwartungsgemäß unterscheiden sollten.",
      },
      imagePath: null,
    },
    {
      phase: "design",
      type: { en: "Frontend Engineering", de: "Frontend-Entwicklung" },
      title: { en: "TypeScript Architecture & Real-Time Gaze Pipeline", de: "TypeScript-Architektur & Echtzeit-Blickpipeline" },
      annotation: {
        en: "Engineered the complete experiment software from scratch in TypeScript. Interfaced with the Pupil Labs Neon head-mounted tracker via its real-time streaming API, utilizing AprilTag-based surface mapping to translate gaze onto each display. Implemented MAGIC (gaze-triggered warp, 20 px landing offset) and a gaze-augmented Ninja variant (one cursor per screen, gaze-based switching, 150 ms guard).",
        de: "Die komplette Experimentalsoftware von Grund auf in TypeScript entwickelt. Anbindung an den kopfgetragenen Pupil Labs Neon Eyetracker über dessen Echtzeit-Streaming-API, mit AprilTag-basiertem Oberflächen-Mapping zur Übersetzung des Blicks auf jeden Bildschirm. Implementiert wurden MAGIC (blickausgelöster Warp, 20 px Landeversatz) und eine blickunterstützte Ninja-Variante (ein Cursor pro Bildschirm, blickbasiertes Umschalten, 150 ms Sperrzeit).",
      },
      insight: {
        en: "The two techniques distribute risk differently on a system level: MAGIC couples gaze precision to every landing, while Ninja uses gaze only for the coarse display switch — an architectural difference that later explained the entire results pattern.",
        de: "Die beiden Techniken verteilen das Risiko auf Systemebene unterschiedlich: MAGIC koppelt Blickgenauigkeit an jede Landung, während Ninja den Blick nur für den groben Bildschirmwechsel nutzt — ein architektonischer Unterschied, der später das gesamte Ergebnismuster erklärte.",
      },
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "Quantitative Analysis", de: "Quantitative Analyse" },
      title: { en: "RM-ANOVA: A Distance-Dependent Crossover", de: "RM-ANOVA: ein distanzabhängiger Crossover" },
      annotation: {
        en: "Repeated-measures ANOVA on log-transformed movement time (n=24 after data-quality exclusions), Greenhouse–Geisser corrected, Tukey post-hoc. Significant technique × distance interaction (η²ₚ = .690, p < .001).",
        de: "ANOVA mit Messwiederholung auf log-transformierter Bewegungszeit (n=24 nach Ausschluss aufgrund von Datenqualität), Greenhouse-Geisser-korrigiert, Tukey-Post-hoc. Signifikante Interaktion Technik × Distanz (η²ₚ = .690, p < .001).",
      },
      insight: {
        en: "Mouse won at short distances — but Ninja significantly beat it at the two intermediate cross-screen distances (1684 and 2243 px) and converged at the longest. Gaze assistance pays off precisely where the bezel crossing is the dominant cost.",
        de: "Die Maus gewann bei kurzen Distanzen — aber Ninja schlug sie signifikant bei den beiden mittleren bildschirmübergreifenden Distanzen (1684 und 2243 px) und glich sich bei der längsten an. Blickunterstützung zahlt sich genau dort aus, wo der Rahmenübergang die dominante Kostenquelle ist.",
      },
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "SUS + Thematic Analysis", de: "SUS + thematische Analyse" },
      title: { en: "Trust Beats Speed", de: "Vertrauen schlägt Tempo" },
      annotation: {
        en: "SUS after each block (n=30): Mouse 85.2, Ninja 72.6, MAGIC 55.9 (Friedman p < .001). Reflexive thematic analysis of open feedback surfaced seven themes, from the 'transport advantage' (23/30) to the 'landing penalty' (22/30).",
        de: "SUS nach jedem Block (n=30): Maus 85,2, Ninja 72,6, MAGIC 55,9 (Friedman p < .001). Die reflexive thematische Analyse des offenen Feedbacks ergab sieben Themen, vom 'Transportvorteil' (23/30) bis zur 'Landestrafe' (22/30).",
      },
      insight: {
        en: "60% preferred Ninja despite the mouse's higher SUS — participants framed it as 'best of both worlds.' Predictability and trust, not raw speed, determined acceptance.",
        de: "60 % bevorzugten Ninja trotz des höheren SUS-Werts der Maus — Teilnehmende beschrieben es als 'das Beste aus beiden Welten.' Vorhersagbarkeit und Vertrauen, nicht reine Geschwindigkeit, entschieden über die Akzeptanz.",
      },
      imagePath: null,
    },
  ],

  challenge: {
    en: "Multi-display workstations are everywhere, yet the mouse alone makes cross-display pointing costly: long pointer transits, cursor re-acquisition after bezel crossings, and attentional switches between screens. Prior work proposed gaze-assisted hybrids, but few controlled studies had compared MAGIC Pointing and Ninja Cursors against a mouse baseline in a dual-display setting — a comparison explicitly called for as future work by Räihä & Špakov (2009).",
    de: "Multi-Display-Arbeitsplätze sind überall verbreitet, doch allein die Maus macht bildschirmübergreifendes Zeigen teuer: lange Zeigerwege, erneutes Auffinden des Cursors nach Rahmenübergängen und Aufmerksamkeitswechsel zwischen Bildschirmen. Frühere Arbeiten schlugen blickunterstützte Hybride vor, doch nur wenige kontrollierte Studien hatten MAGIC Pointing und Ninja Cursors gegen eine Maus-Baseline in einer Dual-Display-Umgebung verglichen — ein Vergleich, der von Räihä & Špakov (2009) explizit als zukünftige Arbeit gefordert wurde.",
  },
  solution: {
    en: "I engineered the complete technical architecture and evaluation framework. This included building a dual-display eye-tracking apparatus (Pupil Labs Neon, real-time streaming API, AprilTag surface mapping) and developing performant TypeScript implementations of MAGIC Pointing (gaze-triggered cursor warp with manual fine-tuning) and a gaze-augmented Ninja Cursors variant (one persistent cursor per screen, activated by gaze). Both were then evaluated against a standard mouse baseline in reciprocal pointing tasks.",
    de: "Ich habe die komplette technische Architektur und das Evaluationsframework entwickelt. Das umfasste den Aufbau eines Dual-Display-Eyetracking-Apparats (Pupil Labs Neon, Echtzeit-Streaming-API, AprilTag-Oberflächen-Mapping) sowie performante TypeScript-Implementierungen von MAGIC Pointing (blickausgelöster Cursor-Warp mit manueller Feinjustierung) und einer blickunterstützten Ninja-Cursors-Variante (ein dauerhafter Cursor pro Bildschirm, per Blick aktiviert). Beide wurden anschließend gegen eine Standard-Maus-Baseline in reziproken Zeigeaufgaben evaluiert.",
  },
  methodology: {
    en: "A two-phase mixed-methods design. Phase I: a formative pre-study (n=20) using semi-structured interviews and a Figma-based workspace visualisation task, analysed with reflexive thematic analysis, which grounded the lab configuration in real dual-display practice. Phase II: a controlled within-subjects experiment (N=30) with a 3×2×6 factorial design — input method × target size × distance (875–3226 px) — measuring movement time, repeat rate, and SUS, analysed with repeated-measures ANOVA (Greenhouse–Geisser corrected, Tukey post-hoc).",
    de: "Ein zweiphasiges Mixed-Methods-Design. Phase I: eine formative Vorstudie (n=20) mit semi-strukturierten Interviews und einer Figma-basierten Arbeitsplatz-Visualisierungsaufgabe, ausgewertet mit reflexiver thematischer Analyse, die die Laborkonfiguration in realer Dual-Display-Praxis verankerte. Phase II: ein kontrolliertes Within-Subjects-Experiment (N=30) mit einem 3×2×6-faktoriellen Design — Eingabemethode × Zielgröße × Distanz (875–3226 px) — mit Messung von Bewegungszeit, Wiederholungsrate und SUS, ausgewertet mit ANOVA mit Messwiederholung (Greenhouse-Geisser-korrigiert, Tukey-Post-hoc).",
  },
  results: {
    en: "A significant technique × distance interaction (η²ₚ = .690) revealed a crossover: the mouse was fastest for short distances, but Ninja Cursors significantly outperformed it at the two intermediate cross-screen distances (1684 and 2243 px) and converged at the longest (3226 px). MAGIC was consistently slowest — its warp coupled gaze noise directly to landing accuracy, producing the highest repeat rate on small targets (4.69%). SUS ranked Mouse (85.2) > Ninja (72.6) > MAGIC (55.9), yet 60% of participants named Ninja their most preferred method.",
    de: "Eine signifikante Interaktion Technik × Distanz (η²ₚ = .690) zeigte einen Crossover: Die Maus war bei kurzen Distanzen am schnellsten, doch Ninja Cursors übertrafen sie signifikant bei den beiden mittleren bildschirmübergreifenden Distanzen (1684 und 2243 px) und glichen sich bei der längsten (3226 px) an. MAGIC war durchgängig am langsamsten — der Warp koppelte Blickrauschen direkt an die Landegenauigkeit und erzeugte die höchste Wiederholungsrate bei kleinen Zielen (4,69 %). Der SUS-Score rangierte Maus (85,2) > Ninja (72,6) > MAGIC (55,9), dennoch nannten 60 % der Teilnehmenden Ninja als bevorzugte Methode.",
  },
  implications: {
    en: "Gaze assistance should be a context-aware accelerator, not an always-on replacement. Three design directions follow from the data: adaptive activation using the screen boundary itself as the trigger, semantic snapping toward UI elements to fix MAGIC's landing penalty, and stronger visual differentiation of the active cursor in multi-cursor designs. The broader lesson for UI engineers: predictability and system trust — not raw speed alone — determine whether users adopt a novel interaction pattern.",
    de: "Blickunterstützung sollte ein kontextsensitiver Beschleuniger sein, kein dauerhafter Ersatz. Aus den Daten folgen drei Gestaltungsrichtungen: adaptive Aktivierung mit der Bildschirmgrenze selbst als Auslöser, semantisches Einrasten an UI-Elementen zur Behebung von MAGICs Landestrafe, und eine stärkere visuelle Differenzierung des aktiven Cursors bei Multi-Cursor-Designs. Die übergeordnete Lehre für UI-Entwickler:innen: Vorhersagbarkeit und Systemvertrauen — nicht reine Geschwindigkeit — entscheiden darüber, ob Nutzer:innen ein neues Interaktionsmuster annehmen.",
  },
  conclusion: [
      {
        type: "image",
        src: conclusion,
        poster: thumbnailImg,
        alt: { en: "conclusion", de: "Fazit" },
        caption: { en: "conclusion", de: "Fazit" },
        span: 2,
        className: "w-full h-auto block"
      }
  ],


};

export default projectData;
