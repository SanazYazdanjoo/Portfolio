// src/projects/project-1/data.js

export const projectData = {
  id: "project-1",
  status: "published",
  title: "Gaze-Assisted Input in Dual-Display Environments",
  subtitle: "Designing for Conditional Gaze Assistance to Accelerate Cross-Screen Pointing",
  tagline: "Can gaze make cross-screen pointing faster — without sacrificing user trust?",
  role: "UX Engineer / Technical UX Researcher",
  timeline: "Feb 2026 – Mar 2026",
  tags: ["Quantitative UX", "Eye-Tracking", "Python", "Fitts' Law", "Mixed-Methods"],
  thumbnail: "/assets/projects/gaze-thumb.png",
  heroImage: "/assets/projects/gaze-hero.png",

  methods: [
    "Semi-structured Interviews",
    "Workspace Visualization",
    "Within-Subject Experiment",
    "SUS Evaluation",
    "Fitts' Law Analysis",
  ],

  metrics: [
    { value: "N=30", label: "participants" },
    { value: "N=20", label: "Phase I interviews" },
    { value: "SUS 85.2", label: "Mouse baseline" },
    { value: "2", label: "gaze conditions" },
  ],

  techStack: ["Pupil Labs Neon", "Python", "aiohttp", "python-socketio", "AprilTags"],

  // ── Process Gallery ──────────────────────────────────────────────────────
  // Shown at the top of the project page in place of the hero image.
  // Add imagePath once you have the asset: "/assets/process/project-1/filename.png"
  // phase: "discover" | "define" | "design" | "deliver"
  process: [
    {
      phase: "discover",
      type: "Semi-structured Interviews",
      title: "Understanding Real Multi-Display Workflows",
      annotation: "20 participants interviewed about daily dual-display practices, pain points, and mental models for cross-screen navigation — conducted remotely with workspace visualisation exercises.",
      insight: "Users rarely thought about cursor travel as a problem — they adapted around it. Any gaze intervention needed to feel invisible, not like a conscious tool.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Workspace Visualisation",
      title: "Mapping Real Dual-Display Setups",
      annotation: "Participants sketched or photographed their physical workspace and described their mental model of task distribution across displays.",
      insight: "Most users had an implicit primary/secondary screen hierarchy. Gaze-assist needed to respect this mental model or it would feel disruptive.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Experimental Design",
      title: "Within-Subject Study Protocol",
      annotation: "Designed a controlled within-subject experiment (N=30) comparing three conditions: traditional mouse, MAGIC Pointing, and Ninja Cursors. Counterbalanced to control for learning effects.",
      insight: "Within-subject design reduced participant variance — each person served as their own baseline, making performance differences between conditions statistically cleaner.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Technical Prototype",
      title: "Real-Time Gaze Pipeline Architecture",
      annotation: "Engineered a custom gaze-to-screen mapping system using Pupil Labs Neon, AprilTag fiducial markers, and a Python middleware layer streaming data to a browser via WebSocket.",
      insight: "AprilTag-based calibration proved far more reliable than software-only mapping — physical markers eliminated drift issues that made earlier attempts unusable.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "SUS Evaluation",
      title: "System Usability Scale Across 3 Conditions",
      annotation: "Post-task SUS questionnaire administered after each condition in the within-subject experiment. Results quantified perceived usability and trust per condition.",
      insight: "Mouse: 85.2 · Ninja: 72.6 · MAGIC: 55.9. Trust and predictability matter more than raw speed for gaze-assisted input.",
      imagePath: null,
    },
  ],

  challenge: "Dual-display environments increase visual space but can reduce interaction efficiency when users must frequently cross screen boundaries. Long pointer travel, cursor re-acquisition after boundary crossings, and attention switching create coordination costs beyond pure motor transport.",
  solution: "I investigated whether gaze-assisted hybrids—using gaze for fast coarse relocation and the mouse for precise acquisition—can reduce these costs without harming control, comfort, or trust. To do this, I engineered a custom pipeline using a Pupil Labs Neon eye tracker, mapping gaze-to-screen via AprilTags, and streaming real-time data to a browser application via Python middleware.",
  methodology: "The project used a two-phase mixed-methods design. Phase I included semi-structured interviews and workspace visualization with 20 users to understand real multi-display practices. Phase II was a controlled within-subject experiment (N=30) comparing MAGIC Pointing and gaze-augmented Ninja Cursors against a traditional mouse baseline.",
  results: "Across conditions, the mouse was fastest overall, with Ninja generally performing closer to the mouse than MAGIC. System Usability Scale (SUS) results aligned with perceived control and predictability: the Mouse rated highest (85.2), Ninja intermediate (72.6), and MAGIC lowest (55.9). The performance differences were strongly distance-dependent, especially for cross-screen transitions.",
  implications: "The key design outcome is to treat gaze assistance as a conditional accelerator, triggering it primarily for large relocations and cross-screen transitions rather than local pointing. Designing for trust is critical, requiring predictable activation rules, visible system state, and stable cross-screen behaviour to prevent usability breakdowns.",
};