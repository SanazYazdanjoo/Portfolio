// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract:
// the aggregator eagerly globs card.js; the prose stays in data.js, which
// spreads this object and loads with the detail route's chunk.
// Banner/thumbnail: the AI illustration, restored by owner decision
// (2026-08-24) after its brief replacement with the build photograph — it
// carries the visible generation credit via heroIsGenerated in data.js.
// The homepage cardImage stays the team's own photograph of the final
// build (report Fig. 16), per the real-artefact card policy.
import thumbnailImg from './Project-3.png';
import thumbnailWebp from './Project-3.webp';
import cardFinalBuild from './media/card-final-build.webp';

export default {
  id: "embraceme-soft-robotics",
  status: "published",
  order: 4,
  title: {
    en: "EmbraceMe – An Inflatable Soft Robot for Emotional Care",
    de: "EmbraceMe – ein aufblasbarer Soft-Roboter für emotionale Fürsorge",
  },
  subtitle: {
    en: "A Pneumatic Soft-Robotic Hugging Interface, Exhibited & Evaluated in Public",
    de: "Ein pneumatisches Soft-Robotik-Umarmungsinterface, öffentlich ausgestellt und evaluiert",
  },
  tagline: {
    en: "Engineering a soft-robotic hug — and honestly reporting where it fell short.",
    de: "Eine soft-robotische Umarmung entwickeln — und ehrlich berichten, wo sie an ihre Grenzen stieß.",
  },
  role: {
    en: "HCI Researcher & Prototyping Engineer (team of 3)",
    de: "HCI-Researcherin & Prototyping-Engineer (3-köpfiges Team)",
  },
  year: "2023",
  context: {
    en: "University research project",
    de: "Universitäres Forschungsprojekt",
  },
  cardTags: ["Physical Prototyping", "Exhibition Research", "Arduino", "Human-Robot Interaction"],
  cardOutcome: {
    en: "Visitors wanted to control the hug; a binary touch trigger, not the soft hardware, broke the experience.",
    de: "Besucher:innen wollten die Umarmung steuern; ein binärer Berührungsauslöser brach die Erfahrung — nicht die weiche Hardware.",
  },
  cardImage: cardFinalBuild,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["Soft Robotics", "Human-Robot Interaction", "Shape-Changing Interfaces", "Literature Review", "Competitive Analysis", "Physical Prototyping", "Material Testing", "Arduino", "Sensor Integration", "Interaction Design", "Data Physicalization", "Exhibition Research"],
};
