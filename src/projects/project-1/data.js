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
  title: "Gaze-Assisted Input in Dual-Display Environments",
  tags: ["TypeScript Custom App", "Quantitative UX", "Eye-Tracking", "Real-Time API", "Mixed-Methods"],

  subtitle: "A Comparative Evaluation of MAGIC Pointing, Ninja Cursors, and a Mouse Baseline",
  tagline: "Can gaze make cross-screen pointing faster — without sacrificing user trust?",
  role: "UX Engineer (Master's Thesis)",
  
  timeline: "10/2025 – 04/2026",
  thumbnail: thumbnailImg,
  heroImage: thumbnailImg,

  methods: [
    "Custom TypeScript Architecture",
    "Within-Subjects Experiment (3×2×6)",
    "Real-Time Data Logging",
    "Repeated-Measures ANOVA",
    "SUS Evaluation",
    "Reflexive Thematic Analysis",
  ],

  metrics: [
    { value: "TypeScript", label: "experimental software built" },
    { value: "N=30", label: "within-subjects experiment" },
    { value: "η²ₚ=.69", label: "technique × distance interaction" },
    { value: "60%", label: "preferred the gaze-hybrid (Ninja)" },
  ],

  techStack: ["TypeScript", "Pupil Labs Neon", "Real-Time API", "AprilTag Marker Mapping", "Python", "React"],

  figures: {
    challenge: [
      {
        type: "image",
        src: challenge,
        alt: "challenge",
        caption: "challenge",
        span: 2,
        className: "w-full h-auto block",
      },
    ],
    solution: [
      {
        type: "image",
        src: threeInputMethods,
        alt: "Three input methods compared in the study",
        caption: "Three input methods in the evaluation",
        span: 2,
        className: "w-full h-auto block",
      },
      {
        type: "video",
        src: magicDemo,
        poster: thumbnailImg,
        alt: "MAGIC pointing demo in a dual-display experiment",
        caption: "MAGIC Pointing demo",
      },
      {
        type: "video",
        src: ninjaDemo,
        poster: thumbnailImg,
        alt: "Ninja cursors demo in a dual-display experiment",
        caption: "Ninja Cursors demo",
      }
    ],
    methodology: [
      {
        type: "image",
        src: experimentalDesign,
        alt: "Experimental design overview for the study",
        caption: "Experimental design overview",
        span: 2,
        className: "w-full h-auto block",
      },
    ],
    results: [
      {
        type: "image",
        src: SUS,
        alt: "SUS score comparison for mouse, Ninja Cursors, and MAGIC Pointing",
        caption: "SUS results across input methods",
        span: 2,
        className: "w-full h-auto block",
      },
    ],
  },

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Semi-structured Interviews",
      title: "Characterising Real Multi-Display Work",
      annotation: "20 participants (researchers and tech/design professionals) recreated their workstation on a shared Figma canvas, then discussed screen roles, input preferences, and cross-display pain points in ~30-minute sessions. Analysed with reflexive thematic analysis.",
      insight: "Cursor loss was a real, named pain point: participants described 'shaking' the mouse to find the pointer, and 14 of 20 reported neck strain or eye fatigue. This directly motivated the focus on cross-display target acquisition.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Workspace Visualisation",
      title: "Grounding the Lab Setup in Reality",
      annotation: "Participants' recreated configurations revealed dominant patterns: side-by-side dual displays, laptop + external monitor (12/20), and near-universal mouse use (17/20) even on laptops.",
      insight: "The lab apparatus copied what people actually use — side-by-side dual displays, mouse as the manual device, and a height-adjustable desk to address the ergonomic strain participants reported.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Experimental Design",
      title: "A 3×2×6 Within-Subjects Protocol",
      annotation: "Three input methods (Mouse, MAGIC Pointing, gaze-augmented Ninja Cursors) × two target sizes × six distances (875–3226 px), counterbalanced with a balanced Latin square. Measures: movement time, repeat rate, and SUS per method block.",
      insight: "Treating distance as a categorical factor was deliberate — the six levels mix within-screen and cross-screen movements, which is exactly where the techniques were expected to diverge.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Frontend Engineering",
      title: "TypeScript Architecture & Real-Time Gaze Pipeline",
      annotation: "Engineered the complete experiment software from scratch in TypeScript. Interfaced with the Pupil Labs Neon head-mounted tracker via its real-time streaming API, utilizing AprilTag-based surface mapping to translate gaze onto each display. Implemented MAGIC (gaze-triggered warp, 20 px landing offset) and a gaze-augmented Ninja variant (one cursor per screen, gaze-based switching, 150 ms guard).",
      insight: "The two techniques distribute risk differently on a system level: MAGIC couples gaze precision to every landing, while Ninja uses gaze only for the coarse display switch — an architectural difference that later explained the entire results pattern.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Quantitative Analysis",
      title: "RM-ANOVA: A Distance-Dependent Crossover",
      annotation: "Repeated-measures ANOVA on log-transformed movement time (n=24 after data-quality exclusions), Greenhouse–Geisser corrected, Tukey post-hoc. Significant technique × distance interaction (η²ₚ = .690, p < .001).",
      insight: "Mouse won at short distances — but Ninja significantly beat it at the two intermediate cross-screen distances (1684 and 2243 px) and converged at the longest. Gaze assistance pays off precisely where the bezel crossing is the dominant cost.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "SUS + Thematic Analysis",
      title: "Trust Beats Speed",
      annotation: "SUS after each block (n=30): Mouse 85.2, Ninja 72.6, MAGIC 55.9 (Friedman p < .001). Reflexive thematic analysis of open feedback surfaced seven themes, from the 'transport advantage' (23/30) to the 'landing penalty' (22/30).",
      insight: "60% preferred Ninja despite the mouse's higher SUS — participants framed it as 'best of both worlds.' Predictability and trust, not raw speed, determined acceptance.",
      imagePath: null,
    },
  ],

  challenge: "Multi-display workstations are everywhere, yet the mouse alone makes cross-display pointing costly: long pointer transits, cursor re-acquisition after bezel crossings, and attentional switches between screens. Prior work proposed gaze-assisted hybrids, but few controlled studies had compared MAGIC Pointing and Ninja Cursors against a mouse baseline in a dual-display setting — a comparison explicitly called for as future work by Räihä & Špakov (2009).",
  solution: "I engineered the complete technical architecture and evaluation framework. This included building a dual-display eye-tracking apparatus (Pupil Labs Neon, real-time streaming API, AprilTag surface mapping) and developing performant TypeScript implementations of MAGIC Pointing (gaze-triggered cursor warp with manual fine-tuning) and a gaze-augmented Ninja Cursors variant (one persistent cursor per screen, activated by gaze). Both were then evaluated against a standard mouse baseline in reciprocal pointing tasks.",
  methodology: "A two-phase mixed-methods design. Phase I: a formative pre-study (n=20) using semi-structured interviews and a Figma-based workspace visualisation task, analysed with reflexive thematic analysis, which grounded the lab configuration in real dual-display practice. Phase II: a controlled within-subjects experiment (N=30) with a 3×2×6 factorial design — input method × target size × distance (875–3226 px) — measuring movement time, repeat rate, and SUS, analysed with repeated-measures ANOVA (Greenhouse–Geisser corrected, Tukey post-hoc).",
  results: "A significant technique × distance interaction (η²ₚ = .690) revealed a crossover: the mouse was fastest for short distances, but Ninja Cursors significantly outperformed it at the two intermediate cross-screen distances (1684 and 2243 px) and converged at the longest (3226 px). MAGIC was consistently slowest — its warp coupled gaze noise directly to landing accuracy, producing the highest repeat rate on small targets (4.69%). SUS ranked Mouse (85.2) > Ninja (72.6) > MAGIC (55.9), yet 60% of participants named Ninja their most preferred method.",
  implications: "Gaze assistance should be a context-aware accelerator, not an always-on replacement. Three design directions follow from the data: adaptive activation using the screen boundary itself as the trigger, semantic snapping toward UI elements to fix MAGIC's landing penalty, and stronger visual differentiation of the active cursor in multi-cursor designs. The broader lesson for UI engineers: predictability and system trust — not raw speed alone — determine whether users adopt a novel interaction pattern.",
  conclusion: [
      {
        type: "image",
        src: conclusion,
        poster: thumbnailImg,
        alt: "conclusion",
        caption: "conclusion",
        span: 2,
        className: "w-full h-auto block"
      }
  ],
  

};

export default projectData;