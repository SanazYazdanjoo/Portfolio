// src/projects/project-3/data.js
export const projectData = {
  id: "project-3",
  status: "published",
  title: "EmbraceMe – Inflatable Human-Robot for Emotional Care",
  subtitle: "Designing a Soft Robotic Hugging Bot for Affective Connection",
  tagline: "Engineering a soft-robotic system that simulates the comfort of a human hug.",
  role: "UX Engineer & Technical HCI Researcher",
  timeline: "SoSe 2023",
  tags: ["Soft Robotics", "Human-Robot Interaction", "Pneumatic Actuators", "Affective Computing", "Arduino"],
  thumbnail: "/assets/projects/embrace-thumb.png",
  heroImage: "/assets/projects/embrace-hero.png",

  methods: [
    "Literature Review",
    "Iterative Prototyping",
    "Material Testing",
    "Public Exhibition & Evaluation",
    "Affective Response Analysis",
  ],

  metrics: [
    { value: "Public", label: "exhibition debut" },
    { value: "Repeatable", label: "pneumatic cycles" },
    { value: "Arduino", label: "control system" },
  ],

  techStack: ["Arduino", "TPU", "Pneumatic Solenoid Valves", "Capacitive Sensors", "Foam Fabrication"],

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Literature Review",
      title: "Deep Pressure Stimulation & Carebots",
      annotation: "Systematic review of research on deep pressure stimulation (DPS), oxytocin response to physical contact, and existing soft-robotic carebot designs.",
      insight: "DPS research confirmed measurable physiological benefits. Existing carebots failed on the uncanny valley problem — a key design constraint identified before any prototype was built.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Design Constraints Framework",
      title: "Defining the Hug: What Must It Do?",
      annotation: "Synthesised literature and material constraints into design requirements: safe pressure range, repeatable actuation cycles, exhibition-readiness within one semester.",
      insight: "The most critical constraint was perceptual — the robot needed clear interaction signifiers so users knew intuitively how to engage, without instruction.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Iterative Physical Prototyping",
      title: "PneuNet Actuator Development",
      annotation: "Multiple rounds of TPU chamber fabrication, airflow regulation testing with a Festo 5/3 solenoid valve system, and pressure profile refinement.",
      insight: "Third iteration solved the sealing problem — earlier chambers leaked under pressure. Solution was a double-seal construction at chamber joints.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Material Testing",
      title: "TPU & Foam Material Evaluation",
      annotation: "Systematic testing of different TPU thicknesses and foam densities to achieve the right balance of inflation speed, pressure distribution, and tactile comfort.",
      insight: "Softer foam backing dramatically improved the perceived warmth of the hug — purely a material choice, not a mechanical one.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Public Exhibition & Evaluation",
      title: "EmbraceMe Goes Public",
      annotation: "Final system demonstrated at a public Bauhaus exhibition. Visitor interactions observed and affective responses recorded — surprise, curiosity, and comfort were dominant reactions.",
      insight: "Visitors who hesitated longest before engaging reported the most positive experience. Anticipation was part of the affective arc — an unexpected but important design finding.",
      imagePath: null,
    },
  ],

  challenge: "Modern communication lacks physical touch, yet research shows that hugging triggers oxytocin release and improves well-being. The challenge was to simulate comforting deep-pressure stimulation without human contact, while building a functional, exhibition-ready soft-robotic system within a semester.",
  solution: "We designed EmbraceMe, a standalone inflatable hugging bot. The system utilizes pneumatic soft bending actuators (PneuNets-inspired) with TPU inflatable chambers, controlled via an Arduino microcontroller system for safe inflation and deflation cycles.",
  methodology: "We utilized a mixed-methods approach, including a literature review on deep pressure stimulation (DPS) and carebots. The development followed iterative prototyping cycles involving material refinement, airflow regulation testing, and sensor mapping, leading to a public exhibition and evaluation.",
  results: "Public exhibition demonstrated positive affective responses including surprise and joy. Engineering outcomes included successful implementation of repeatable pneumatic cycles and stable airflow regulation using a Festo 5/3 solenoid valve system.",
  implications: "The project revealed critical insights regarding embodiment and the 'uncanny valley' effect. We identified that clear interaction signifiers are essential for users to intuitively understand how to engage with the robot.",
};