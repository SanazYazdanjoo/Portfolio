// src/projects/project-3/data.js
// ─── Evidence-locked to Group_Report__EmbraceMe__.docx + FBHCI_Individual_Final_Report.pdf ───
import thumbnailImg from './project-thumbnail.png';

export const projectData = {
  id: "project-3",
  status: "Published",
  title: "EmbraceMe – Inflatable Human-Robot for Emotional Care",
  subtitle: "A Pneumatic Soft-Robotic Hugging Interface, Exhibited & Evaluated in Public",
  tagline: "Engineering a soft-robotic hug — and honestly reporting where it fell short.",
  role: "HCI Researcher & Prototyping Engineer (team of 3)",
  timeline: "SoSe 2023",
  tags: ["Soft Robotics", "Human-Robot Interaction", "Data Physicalization", "Shape-Changing Interfaces", "Arduino"],
  thumbnail: thumbnailImg,
  heroImage: thumbnailImg,

  methods: [
    "Literature Review",
    "Comparative Analysis of Prior Systems",
    "Iterative Physical Prototyping",
    "Material Testing",
    "Public Exhibition & Observation",
    "Critical Reflection (Data Physicalization Framework)",
  ],

  metrics: [
    { value: "3", label: "material iterations (balloons → 2× TPU)" },
    { value: "80×16", label: "cm foam arms, PneuNet bending" },
    { value: "3s / 9s", label: "inflate–deflate cycle timing" },
    { value: "Public", label: "exhibition with live user observation" },
  ],

  techStack: ["Arduino", "Festo 5/3 Solenoid Valve", "5-Pad Capacitive Touch Sensor", "TPU (heat-sealed)", "Foam Fabrication", "LED Feedback"],

  challenge:
    "Physical touch like hugging releases oxytocin and measurably reduces stress — but not everyone has access to it: loved ones may be distant, or contact may be unsafe. We set out to build an inflatable soft-robotic interface delivering Deep Pressure Stimulation through a standalone hugging experience, gentle enough for direct human contact where rigid robots fail.",

  solution:
    "A standalone hugging bot built on a mannequin frame with PneuNet bending-actuator arms: foam limbs (80×16 cm) with 45° triangular cuts housing heat-sealed TPU air chambers. A 5-pad capacitive touch sensor on the chest triggers inflation when a user leans in for a hug; a Festo 5/3 solenoid valve and timed Arduino logic (3s inflate, 9s deflate) regulate pressure, with an LED feedback cycle (green: ready, white: hugging, blinking red: resetting) communicating system state.",

  methodology:
    "We grounded the design in a literature review of interpersonal touch, Deep Pressure Stimulation, and soft robotics, and a comparative analysis of prior hugging systems (Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot, and Bauhaus's own Hugging Suit) to identify their gaps — partial body coverage, static holds, and no emotional context. Two actuation techniques were evaluated (soft-growing vs. PneuNet bending); the standalone form factor decided for inclusivity determined the PneuNet approach. The prototype then went through iterative material testing before public exhibition with observation and user feedback.",

  results:
    "At a public university exhibition, visitors described the interaction as fun and surprising — the bot 'waking up' to hug back was the standout moment. The evaluation also surfaced honest design failures: some users read the pink, muscular arms as uncanny and avoided full contact, and without clear signifiers, nobody could guess how to initiate a hug unprompted. My individual follow-up applied Offenhuber's data physicalization framework to propose the next iteration: emotion-recognition data (wearables, mood tracking) mapped to arm extension and hug intensity, turning a binary-triggered mechanism into an emotionally adaptive interface.",

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Literature Review",
      title: "Deep Pressure Stimulation & Interpersonal Touch",
      annotation:
        "Reviewed research on interpersonal touch, oxytocin response, and DPS therapy (weighted blankets as the canonical example), alongside soft robotics and shape-changing interface literature.",
      insight:
        "Hugging is one of the most desired affectionate touches, with measurable stress-reduction effects — but replicating human hugging exactly was out of scope. The goal became a soft, warm embrace, not a simulation of a person.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Comparative Analysis",
      title: "Mapping the Gaps in Prior Hugging Systems",
      annotation:
        "Analyzed Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MIT's Huggable, and the Bauhaus Hugging Suit — comparing wearable vs. standalone forms, actuation, and sensing.",
      insight:
        "Every prior system shared two gaps: partial-body sensory coverage and zero emotional context. Devices sense touch, not feelings — this framed both our prototype and my later data physicalization critique.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Form & Technique Decision",
      title: "Backpack vs. Standalone — and Why It Decided Everything",
      annotation:
        "Two concepts sketched: a portable backpack using soft-growing (vine robot) arms, and a standalone figure using PneuNet bending actuators. Chose standalone after consultation, for inclusivity across body sizes and open access at the exhibition.",
      insight:
        "The form-factor decision cascaded into the actuation technique: standalone required PneuNet bending arms that hold their position in space without a skeleton — the project's hardest engineering constraint.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Iterative Material Testing",
      title: "Balloons → Transparent TPU → Yellow TPU",
      annotation:
        "Proof-of-concept with balloons in slotted foam validated the bending mechanism. Transparent TPU replaced them for durability — but deformed irregularly after repeated inflation, breaking the curvature. Final iteration: stiffer yellow TPU chambers with regulated airflow to prevent bursting.",
      insight:
        "Material properties drove interaction quality: consistent chamber volume was the difference between a controlled embrace and an erratic one. Slot spacing (10 cm) and chamber size (8×6 cm) were tuned empirically across numerous arm samples.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Sensing & Feedback System",
      title: "Touch-Triggered Hugging with an LED Feedback Cycle",
      annotation:
        "A 5-pad capacitive touch sensor on the bot's chest detects a user leaning in; Arduino opens the Festo 5/3 valve for 3 seconds to inflate, holds pressure during the hug, then vents for 9 seconds on release. LED states (green/white/blinking red) communicate readiness, hugging, and reset.",
      insight:
        "Timings were derived through trial-and-error experimentation — long enough to hold a firm hug, short enough to protect the chambers from over-inflation.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Public Exhibition & Observation",
      title: "Real Users, Real (Uncomfortable) Findings",
      annotation:
        "Exhibited at a university event open to academic and non-academic visitors. Observed interactions and collected impressions: delight at the bot 'waking up,' but also uncanny-valley reactions to its form and confusion about how to initiate contact without our explanation.",
      insight:
        "Two design failures documented honestly: aesthetic choices triggered avoidance in some users, and the interface lacked signifiers — curiosity did not translate into interaction without designer intervention.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Critical Reflection & Redesign Proposal",
      title: "From Binary Trigger to Emotional Data (Individual Report)",
      annotation:
        "Applied Offenhuber's data physicalization framework to critique the prototype: it followed a physical process triggered by binary signals and conveyed no emotional message. Proposed a redesign where emotion-recognition data (wearables, mood tracking) drives soft-growing arms — extension length and warmth mapped to the user's distress level, hug rhythm synced to heartbeat.",
      insight:
        "The reflection reframed the project's failure as a data problem, not a hardware problem — and defined ethical guardrails: user autonomy over hug intensity, explicit consent, and privacy-first handling of emotional data.",
      imagePath: null,
    },
  ],
};

export default projectData;