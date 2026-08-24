// Content is sourced from Group_Report__EmbraceMe__.docx and FBHCI_Individual_Final_Report.pdf.
//
// Photographs (added 2026-08-24): the team's own figures from the group
// report — full-resolution originals live in this folder next to FIGURES.md,
// which maps each file to its report caption and records the two crop
// decisions. media/ holds the optimised derivatives the page imports;
// regenerate them with scripts/process-embraceme-figures.mjs. The former
// AI-generated cartoon (Project-3.png) is gone: a generated illustration
// must not stand as the image of a physical artefact.
// Card-level fields (id/status/title/tags/thumbnails/card*) live in
// ./card.js — eagerly aggregated site-wide — and are spread here so the
// detail page sees one object. This file carries only the prose and media
// that load with the route's own chunk.
import card from './card';
import thumbnailImg from './Project-3.png';
import finalBuildJpg from './media/final-build.jpg';
import sketchBackpack from './media/sketch-backpack-concept.jpg';
import sketchStandalone from './media/sketch-standalone-concept.jpg';
import armFinalStructure from './media/arm-final-structure.jpg';
import tpuTransparent from './media/tpu-transparent.jpg';
import tpuInconsistent from './media/tpu-inconsistent-inflation.jpg';
import tpuYellow from './media/tpu-yellow.jpg';
import airChannelPipes from './media/air-channel-pipes.jpg';
import arduinoSetup from './media/arduino-setup.jpg';
import touchSensorChest from './media/touch-sensor-chest.jpg';
import innerStructure from './media/inner-structure.jpg';

export const projectData = {
  ...card,
  // Bilingual: "SoSe" means nothing to an English reader; ProjectTemplate
  // localizes the whole meta object, so { en, de } resolves like any field.
  timeline: { en: "Summer semester 2023", de: "SoSe 2023" },

  // The AI illustration as the hero banner, by owner decision (2026-08-24) —
  // heroIsGenerated renders the visible generation credit, so it never
  // passes as documentation. The real photographs carry the evidence in the
  // figures below and on the homepage card.
  heroImage: thumbnailImg,
  heroIsGenerated: true,

  methods: [
    { en: "Literature Review",                                  de: "Literaturrecherche" },
    { en: "Comparative Analysis of Prior Systems",              de: "Vergleichsanalyse bestehender Systeme" },
    { en: "Iterative Physical Prototyping",                     de: "Iteratives physisches Prototyping" },
    { en: "Material Testing",                                    de: "Materialtests" },
    { en: "Public Exhibition & Observation",                    de: "Öffentliche Ausstellung & Beobachtung" },
    { en: "Critical Reflection (Data Physicalization Framework)", de: "Kritische Reflexion (Data-Physicalization-Framework)" },
  ],

  metrics: [
    { value: "Public", label: { en: "exhibition with live user observation", de: "Ausstellung mit Live-Nutzerbeobachtung" } },
    { value: "3", label: { en: "prototype iterations to a working hug", de: "Prototyp-Iterationen bis zur funktionierenden Umarmung" } },
    { value: "3s / 9s", label: { en: "inflate–deflate cycle timing", de: "Zeittakt Aufblasen–Ablassen" } },
    { value: "80×16", label: { en: "cm PneuNet foam arms", de: "cm PneuNet-Schaumstoffarme" } },
  ],

  techStack: ["Arduino", "Festo 5/3 Solenoid Valve", "5-Pad Capacitive Touch Sensor", "TPU (heat-sealed)", "Foam Fabrication", "LED Feedback"],

  // All figures are the team's own photographs from the group report (see
  // FIGURES.md for the file→caption map). Captions carry the report figure
  // number so a reader can trace each image to its source document.
  figures: {
    solution: [
      {
        type: "image",
        src: finalBuildJpg,
        span: 2,
        className: "w-full h-auto block",
        alt: {
          en: "The final EmbraceMe build: a plush, skin-toned torso with two inflatable arms on a black mannequin stand, an orange heart marking the touch sensor on the chest",
          de: "Der finale EmbraceMe-Aufbau: ein plüschiger, hautfarbener Torso mit zwei aufblasbaren Armen auf einem schwarzen Schaufensterpuppen-Ständer, ein oranges Herz markiert den Berührungssensor auf der Brust",
        },
        caption: {
          en: "The final build on its stand, as exhibited (report Fig. 16, cropped to the artefact)",
          de: "Der finale Aufbau auf dem Ständer, wie ausgestellt (Report-Abb. 16, auf das Artefakt beschnitten)",
        },
      },
      {
        type: "image",
        src: armFinalStructure,
        alt: {
          en: "The final arm structure: slotted foam limb with embedded TPU air chambers, bending as inflated",
          de: "Die finale Armstruktur: geschlitzter Schaumstoffarm mit eingebetteten TPU-Luftkammern, gebogen im aufgeblasenen Zustand",
        },
        caption: {
          en: "Final structure of the PneuNet arm (report Fig. 8)",
          de: "Finale Struktur des PneuNet-Arms (Report-Abb. 8)",
        },
      },
      {
        type: "image",
        src: innerStructure,
        alt: {
          en: "Inner structure of the bot with the air routing and arm mounting visible before the plush cover",
          de: "Innere Struktur des Roboters mit sichtbarer Luftführung und Armbefestigung vor dem Plüschüberzug",
        },
        caption: {
          en: "Inner structure before the cover (report Fig. 15)",
          de: "Innere Struktur vor dem Überzug (Report-Abb. 15)",
        },
      },
      {
        type: "image",
        src: touchSensorChest,
        alt: {
          en: "The 5-pad capacitive touch sensor mounted on the robot's chest",
          de: "Der kapazitive 5-Pad-Berührungssensor auf der Brust des Roboters",
        },
        caption: {
          en: "Touch sensor on the chest — the hug trigger (report Fig. 14)",
          de: "Berührungssensor auf der Brust — der Umarmungsauslöser (Report-Abb. 14)",
        },
      },
      {
        type: "image",
        src: arduinoSetup,
        alt: {
          en: "The Arduino and valve control setup wired for the pneumatic system",
          de: "Arduino- und Ventilsteuerung, verkabelt für das pneumatische System",
        },
        caption: {
          en: "Arduino setup driving the Festo valve (report Fig. 13)",
          de: "Arduino-Setup zur Ansteuerung des Festo-Ventils (Report-Abb. 13)",
        },
      },
      {
        type: "image",
        src: airChannelPipes,
        alt: {
          en: "Air channels built from pipes distributing airflow into the arm chambers",
          de: "Aus Rohren gebaute Luftkanäle, die den Luftstrom in die Armkammern verteilen",
        },
        caption: {
          en: "Air channel, using pipes (report Fig. 12)",
          de: "Luftkanal aus Rohren (Report-Abb. 12)",
        },
      },
    ],
    methodology: [
      {
        type: "image",
        src: sketchBackpack,
        alt: {
          en: "Early concept sketch of the wearable backpack model with soft-growing arms",
          de: "Frühe Konzeptskizze des tragbaren Rucksackmodells mit soft-growing Armen",
        },
        caption: {
          en: "Early sketch — backpack concept (report Fig. 1)",
          de: "Frühe Skizze — Rucksack-Konzept (Report-Abb. 1)",
        },
      },
      {
        type: "image",
        src: sketchStandalone,
        alt: {
          en: "Early concept sketch of the standalone hugging figure with PneuNet bending arms",
          de: "Frühe Konzeptskizze der eigenständigen Umarmungsfigur mit PneuNet-Biegearmen",
        },
        caption: {
          en: "Early sketch — the standalone concept that won (report Fig. 2)",
          de: "Frühe Skizze — das eigenständige Konzept, das sich durchsetzte (Report-Abb. 2)",
        },
      },
      {
        type: "image",
        src: tpuTransparent,
        alt: {
          en: "Five heat-sealed transparent TPU inflatable components laid out on a cutting mat",
          de: "Fünf heißverschweißte transparente TPU-Aufblaskomponenten auf einer Schneidematte",
        },
        caption: {
          en: "Homogenous inflatable components, transparent TPU (report Fig. 9, cropped)",
          de: "Homogene Aufblaskomponenten, transparentes TPU (Report-Abb. 9, beschnitten)",
        },
      },
      {
        type: "image",
        src: tpuInconsistent,
        span: 2,
        className: "w-full h-auto block",
        alt: {
          en: "Inflated transparent TPU chambers showing visibly inconsistent volumes — the documented material failure",
          de: "Aufgeblasene transparente TPU-Kammern mit sichtbar ungleichen Volumina — das dokumentierte Materialversagen",
        },
        caption: {
          en: "The failure that forced the iteration: inconsistent volume of inflated TPU (report Fig. 10)",
          de: "Das Versagen, das die Iteration erzwang: ungleiches Volumen des aufgeblasenen TPU (Report-Abb. 10)",
        },
      },
      {
        type: "image",
        src: tpuYellow,
        alt: {
          en: "The stiffer yellow TPU inflatable component of the final iteration",
          de: "Die steifere gelbe TPU-Aufblaskomponente der finalen Iteration",
        },
        caption: {
          en: "Final iteration: yellow TPU chamber (report Fig. 11)",
          de: "Finale Iteration: gelbe TPU-Kammer (Report-Abb. 11)",
        },
      },
    ],
  },

  about: {
    en: "A soft-robotics project exploring whether a machine can deliver the calming effect of a hug. In a team of three I designed and built EmbraceMe, a standalone hugging robot with inflatable PneuNet foam arms driven by an Arduino and a capacitive touch sensor. We exhibited it publicly and observed real visitors using it — documenting both what delighted them and where the design fell short.",
    de: "Ein Soft-Robotics-Projekt zur Frage, ob eine Maschine die beruhigende Wirkung einer Umarmung vermitteln kann. In einem dreiköpfigen Team habe ich EmbraceMe entworfen und gebaut — einen eigenständigen Umarmungsroboter mit aufblasbaren PneuNet-Schaumstoffarmen, gesteuert von einem Arduino und einem kapazitiven Berührungssensor. Wir haben ihn öffentlich ausgestellt und echte Besucher:innen dabei beobachtet — und dokumentiert, was sie begeisterte und wo das Design an seine Grenzen stieß.",
  },

  challenge: {
    en: "Physical touch like hugging releases oxytocin and measurably reduces stress — but not everyone has access to it: loved ones may be distant, or contact may be unsafe. We set out to build an inflatable soft-robotic interface delivering Deep Pressure Stimulation through a standalone hugging experience, gentle enough for direct human contact where rigid robots fail.",
    de: "Körperliche Berührung wie Umarmen setzt Oxytocin frei und reduziert nachweislich Stress — doch nicht alle haben Zugang dazu: Nahestehende können weit entfernt sein, oder Kontakt kann unsicher sein. Wir wollten ein aufblasbares Soft-Robotik-Interface bauen, das Deep Pressure Stimulation über eine eigenständige Umarmungserfahrung liefert — sanft genug für direkten menschlichen Kontakt, wo starre Roboter versagen.",
  },

  solution: {
    en: "A standalone hugging bot built on a mannequin frame with PneuNet bending-actuator arms: foam limbs (80×16 cm) with 45° triangular cuts housing heat-sealed TPU air chambers. A 5-pad capacitive touch sensor on the chest triggers inflation when a user leans in for a hug; a Festo 5/3 solenoid valve and timed Arduino logic (3s inflate, 9s deflate) regulate pressure, with an LED feedback cycle (green: ready, white: hugging, blinking red: resetting) communicating system state.",
    de: "Ein eigenständiger Umarmungsroboter auf einem Schaufensterpuppen-Rahmen mit PneuNet-Biegeaktor-Armen: Schaumstoffgliedmaßen (80×16 cm) mit 45°-Dreieckseinschnitten, die heißverschweißte TPU-Luftkammern enthalten. Ein 5-Pad-kapazitiver Berührungssensor an der Brust löst das Aufblasen aus, sobald sich eine Person zur Umarmung nähert; ein Festo-5/3-Magnetventil und getaktete Arduino-Logik (3s aufblasen, 9s ablassen) regulieren den Druck, mit einem LED-Feedback-Zyklus (grün: bereit, weiß: umarmend, rot blinkend: zurücksetzend), der den Systemzustand kommuniziert.",
  },

  methodology: {
    en: "We grounded the design in a literature review of interpersonal touch, Deep Pressure Stimulation, and soft robotics, and a comparative analysis of prior hugging systems (Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MIT's Huggable, and Bauhaus's own Hugging Suit) to identify their gaps — partial body coverage, static holds, and no emotional context. Two actuation techniques were evaluated (soft-growing vs. PneuNet bending); the standalone form factor decided for inclusivity determined the PneuNet approach. The prototype then went through iterative material testing before public exhibition with observation and user feedback.",
    de: "Wir haben das Design auf eine Literaturrecherche zu zwischenmenschlicher Berührung, Deep Pressure Stimulation und Soft Robotics sowie eine Vergleichsanalyse bestehender Umarmungssysteme (Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MITs Huggable und Bauhaus' eigenen Hugging Suit) gestützt, um deren Lücken zu identifizieren — partielle Körperabdeckung, statisches Halten und fehlender emotionaler Kontext. Zwei Aktuierungstechniken wurden evaluiert (soft-growing vs. PneuNet-Biegung); die für Inklusivität gewählte eigenständige Form entschied für den PneuNet-Ansatz. Der Prototyp durchlief anschließend iterative Materialtests vor der öffentlichen Ausstellung mit Beobachtung und Nutzerfeedback.",
  },

  results: {
    en: "At a public university exhibition, visitors described the interaction as fun and surprising — the bot 'waking up' to hug back was the standout moment. The evaluation also surfaced honest design failures: some users read the pink, muscular arms as uncanny and avoided full contact, and without clear signifiers, nobody could guess how to initiate a hug unprompted. My individual follow-up applied Offenhuber's data physicalization framework to propose the next iteration: emotion-recognition data (wearables, mood tracking) mapped to arm extension and hug intensity, turning a binary-triggered mechanism into an emotionally adaptive interface.",
    de: "Bei einer öffentlichen Universitätsausstellung beschrieben Besucher:innen die Interaktion als lustig und überraschend — das „Aufwachen“ des Bots, um die Umarmung zu erwidern, war der Höhepunkt. Die Evaluation zeigte auch ehrliche Designfehler: Manche Nutzer:innen empfanden die pinken, muskulösen Arme als unheimlich und vermieden vollen Kontakt, und ohne klare Signifier konnte niemand ohne Anleitung erraten, wie eine Umarmung eingeleitet wird. Meine individuelle Nachbetrachtung wandte Offenhubers Data-Physicalization-Framework an, um die nächste Iteration vorzuschlagen: Emotionserkennungsdaten (Wearables, Stimmungs-Tracking), die auf Armausdehnung und Umarmungsintensität abgebildet werden — ein binär ausgelöster Mechanismus wird so zu einem emotional adaptiven Interface.",
  },

  // Process gallery
  process: [
    {
      phase: "discover",
      type: { en: "Literature Review", de: "Literaturrecherche" },
      title: { en: "Deep Pressure Stimulation & Interpersonal Touch", de: "Deep Pressure Stimulation & zwischenmenschliche Berührung" },
      annotation: {
        en: "Reviewed research on interpersonal touch, oxytocin response, and DPS therapy (weighted blankets as the canonical example), alongside soft robotics and shape-changing interface literature.",
        de: "Durchsicht der Forschung zu zwischenmenschlicher Berührung, Oxytocin-Reaktion und DPS-Therapie (Gewichtsdecken als klassisches Beispiel), zusammen mit Literatur zu Soft Robotics und formveränderlichen Interfaces.",
      },
      insight: {
        en: "Hugging is one of the most desired affectionate touches, with measurable stress-reduction effects — but replicating human hugging exactly was out of scope. The goal became a soft, warm embrace, not a simulation of a person.",
        de: "Umarmen ist eine der am meisten gewünschten liebevollen Berührungen mit messbarer stressreduzierender Wirkung — doch menschliches Umarmen exakt nachzubilden lag außerhalb des Rahmens. Das Ziel wurde eine sanfte, warme Umarmung, keine Simulation einer Person.",
      },
      imagePath: null,
    },
    {
      phase: "discover",
      type: { en: "Comparative Analysis", de: "Vergleichsanalyse" },
      title: { en: "Mapping the Gaps in Prior Hugging Systems", de: "Die Lücken bestehender Umarmungssysteme kartieren" },
      annotation: {
        en: "Analysed Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MIT's Huggable, and the Bauhaus Hugging Suit — comparing wearable vs. standalone forms, actuation, and sensing.",
        de: "Analysiert wurden Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MITs Huggable und der Bauhaus Hugging Suit — im Vergleich von tragbaren und eigenständigen Formen, Aktuierung und Sensorik.",
      },
      insight: {
        en: "Every prior system shared two gaps: partial-body sensory coverage and zero emotional context. Devices sense touch, not feelings — this framed both our prototype and my later data physicalization critique.",
        de: "Jedes bestehende System teilte zwei Lücken: partielle sensorische Körperabdeckung und fehlenden emotionalen Kontext. Geräte erfassen Berührung, keine Gefühle — das prägte sowohl unseren Prototyp als auch meine spätere Data-Physicalization-Kritik.",
      },
      imagePath: null,
    },
    {
      phase: "define",
      type: { en: "Form & Technique Decision", de: "Form- & Technikentscheidung" },
      title: { en: "Backpack vs. Standalone — and Why It Decided Everything", de: "Rucksack vs. eigenständig — und warum das alles entschied" },
      annotation: {
        en: "Two concepts sketched: a portable backpack using soft-growing (vine robot) arms, and a standalone figure using PneuNet bending actuators. Chose standalone after consultation, for inclusivity across body sizes and open access at the exhibition.",
        de: "Zwei Konzepte skizziert: ein tragbarer Rucksack mit soft-growing (Vine-Robot)-Armen und eine eigenständige Figur mit PneuNet-Biegeaktoren. Nach Rücksprache für die eigenständige Variante entschieden — für Inklusivität über Körpergrößen hinweg und offenen Zugang bei der Ausstellung.",
      },
      insight: {
        en: "The form-factor decision cascaded into the actuation technique: standalone required PneuNet bending arms that hold their position in space without a skeleton — the project's hardest engineering constraint.",
        de: "Die Formfaktor-Entscheidung zog die Aktuierungstechnik nach sich: Die eigenständige Variante erforderte PneuNet-Biegearme, die ihre Position im Raum ohne Skelett halten — die härteste technische Randbedingung des Projekts.",
      },
      imagePath: sketchStandalone,
    },
    {
      phase: "design",
      type: { en: "Iterative Material Testing", de: "Iterative Materialtests" },
      title: { en: "Balloons → Transparent TPU → Yellow TPU", de: "Ballons → transparentes TPU → gelbes TPU" },
      annotation: {
        en: "Proof-of-concept with balloons in slotted foam validated the bending mechanism. Transparent TPU replaced them for durability — but deformed irregularly after repeated inflation, breaking the curvature. Final iteration: stiffer yellow TPU chambers with regulated airflow to prevent bursting.",
        de: "Ein Proof-of-Concept mit Ballons in geschlitztem Schaumstoff validierte den Biegemechanismus. Transparentes TPU ersetzte sie für mehr Haltbarkeit — verformte sich jedoch nach wiederholtem Aufblasen unregelmäßig und brach die Krümmung. Finale Iteration: steifere gelbe TPU-Kammern mit reguliertem Luftstrom gegen Platzen.",
      },
      insight: {
        en: "Material properties drove interaction quality: consistent chamber volume was the difference between a controlled embrace and an erratic one. Slot spacing (10 cm) and chamber size (8×6 cm) were tuned empirically across numerous arm samples.",
        de: "Materialeigenschaften bestimmten die Interaktionsqualität: konsistentes Kammervolumen war der Unterschied zwischen einer kontrollierten und einer unberechenbaren Umarmung. Schlitzabstand (10 cm) und Kammergröße (8×6 cm) wurden empirisch über zahlreiche Armmuster hinweg justiert.",
      },
      imagePath: tpuInconsistent,
    },
    {
      phase: "design",
      type: { en: "Sensing & Feedback System", de: "Sensorik- & Feedbacksystem" },
      title: { en: "Touch-Triggered Hugging with an LED Feedback Cycle", de: "Berührungsausgelöstes Umarmen mit LED-Feedback-Zyklus" },
      annotation: {
        en: "A 5-pad capacitive touch sensor on the bot's chest detects a user leaning in; Arduino opens the Festo 5/3 valve for 3 seconds to inflate, holds pressure during the hug, then vents for 9 seconds on release. LED states (green/white/blinking red) communicate readiness, hugging, and reset.",
        de: "Ein 5-Pad-kapazitiver Berührungssensor an der Brust des Bots erkennt, wenn sich eine Person nähert; Arduino öffnet das Festo-5/3-Ventil für 3 Sekunden zum Aufblasen, hält den Druck während der Umarmung und entlüftet dann 9 Sekunden beim Loslassen. LED-Zustände (grün/weiß/rot blinkend) kommunizieren Bereitschaft, Umarmung und Reset.",
      },
      insight: {
        en: "Timings were derived through trial-and-error experimentation — long enough to hold a firm hug, short enough to protect the chambers from over-inflation.",
        de: "Die Zeittaktung wurde durch Trial-and-Error ermittelt — lang genug für eine feste Umarmung, kurz genug, um die Kammern vor Überaufblasen zu schützen.",
      },
      imagePath: touchSensorChest,
    },
    {
      phase: "deliver",
      type: { en: "Public Exhibition & Observation", de: "Öffentliche Ausstellung & Beobachtung" },
      title: { en: "Real Users, Real (Uncomfortable) Findings", de: "Echte Nutzer:innen, echte (unbequeme) Erkenntnisse" },
      annotation: {
        en: "Exhibited at a university event open to academic and non-academic visitors. Observed interactions and collected impressions: delight at the bot 'waking up,' but also uncanny-valley reactions to its form and confusion about how to initiate contact without our explanation.",
        de: "Ausgestellt bei einer Universitätsveranstaltung, offen für akademisches und nicht-akademisches Publikum. Interaktionen beobachtet und Eindrücke gesammelt: Freude über das „Aufwachen“ des Bots, aber auch Uncanny-Valley-Reaktionen auf seine Form und Verwirrung darüber, wie Kontakt ohne unsere Erklärung eingeleitet wird.",
      },
      insight: {
        en: "Two design failures documented honestly: aesthetic choices triggered avoidance in some users, and the interface lacked signifiers — curiosity did not translate into interaction without designer intervention.",
        de: "Zwei Designfehler ehrlich dokumentiert: ästhetische Entscheidungen lösten bei manchen Nutzer:innen Vermeidung aus, und dem Interface fehlten Signifier — Neugier übersetzte sich ohne Eingreifen der Designer:innen nicht in Interaktion.",
      },
      imagePath: finalBuildJpg,
    },
    {
      phase: "deliver",
      type: { en: "Critical Reflection & Redesign Proposal", de: "Kritische Reflexion & Redesign-Vorschlag" },
      title: { en: "From Binary Trigger to Emotional Data (Individual Report)", de: "Von binärem Auslöser zu emotionalen Daten (Individualbericht)" },
      annotation: {
        en: "Applied Offenhuber's data physicalization framework to critique the prototype: it followed a physical process triggered by binary signals and conveyed no emotional message. Proposed a redesign where emotion-recognition data (wearables, mood tracking) drives soft-growing arms — extension length and warmth mapped to the user's distress level, hug rhythm synced to heartbeat.",
        de: "Offenhubers Data-Physicalization-Framework angewandt, um den Prototyp zu kritisieren: Er folgte einem physischen Prozess, ausgelöst durch binäre Signale, und vermittelte keine emotionale Botschaft. Vorgeschlagen wurde ein Redesign, bei dem Emotionserkennungsdaten (Wearables, Stimmungs-Tracking) soft-growing Arme steuern — Ausdehnungslänge und Wärme abgebildet auf den Stresslevel der Person, Umarmungsrhythmus synchron zum Herzschlag.",
      },
      insight: {
        en: "The reflection reframed the project's failure as a data problem, not a hardware problem — and defined ethical guardrails: user autonomy over hug intensity, explicit consent, and privacy-first handling of emotional data.",
        de: "Die Reflexion rahmte das Scheitern des Projekts als Datenproblem, nicht als Hardwareproblem — und definierte ethische Leitplanken: Nutzerautonomie über die Umarmungsintensität, ausdrückliche Einwilligung und datenschutzorientierter Umgang mit emotionalen Daten.",
      },
      imagePath: null,
    },
  ],

  // Role is "HCI Researcher & Prototyping Engineer (team of 3)" —
  // myContribution is required. `owned` is grounded directly in the results
  // and process-gallery text (the "Individual Report" is a separately
  // authored deliverable, distinct from the group submission). `notMine`
  // has no textual basis to derive from — flagged as NEEDS_INPUT rather
  // than guessed.
  myContribution: {
    owned: [
      {
        en: "The individual critical-reflection report — applying Offenhuber's data physicalization framework to critique the prototype and propose an emotion-driven redesign — was authored solely by me as a separate deliverable from the group submission.",
        de: "Der individuelle kritische Reflexionsbericht — der Offenhubers Data-Physicalization-Framework anwendet, um den Prototyp zu kritisieren und ein emotionsgesteuertes Redesign vorzuschlagen — wurde von mir allein als eigenständiges Deliverable, getrennt von der Gruppenabgabe, verfasst.",
      },
    ],
    shared: [
      {
        en: "Physical prototyping, material testing, and the touch-sensing/LED feedback system were built collaboratively across the three-person team.",
        de: "Physisches Prototyping, Materialtests und das Berührungssensor-/LED-Feedback-System wurden gemeinsam im dreiköpfigen Team gebaut.",
      },
    ],
    notMine: [
      {
        en: "No part of the group build was owned exclusively by another team member — the three of us contributed to each stage of the physical prototype together.",
        de: "Kein Teil des Gruppenbaus lag ausschließlich in der Verantwortung eines anderen Teammitglieds — wir drei haben zu jeder Phase des physischen Prototyps gemeinsam beigetragen.",
      },
    ],
  },

  // No `verbatims` field: the only participant-adjacent language on record is
  // the two-word fragment about the bot "waking up," and no exhibition
  // observation notes were kept that would support a real pull-quote.
  // Absent rather than promoted from a fragment — see CONTENT_GAPS.md.

  outcome: {
    body: {
      en: "EmbraceMe was not iterated into a second physical prototype after the exhibition — the group deliverable ended at the evaluated build. The follow-on work is a documented redesign proposal (individual report), not a shipped or roadmapped system, and no organisation has committed to building it.",
      de: "EmbraceMe wurde nach der Ausstellung nicht zu einem zweiten physischen Prototyp weiterentwickelt — das Gruppendeliverable endete beim evaluierten Build. Die Weiterarbeit ist ein dokumentierter Redesign-Vorschlag (Individualbericht), kein ausgeliefertes oder auf einer Roadmap stehendes System, und keine Organisation hat sich zu dessen Umsetzung verpflichtet.",
    },
    decisions: [
      {
        en: "The visible design failures (uncanny arm aesthetics, no signifiers for initiating a hug) were not patched within the group project — they were carried into an individual critical-reflection report instead.",
        de: "Die sichtbaren Designfehler (unheimliche Armästhetik, fehlende Signifier zum Einleiten einer Umarmung) wurden nicht innerhalb des Gruppenprojekts nachgebessert — sie wurden stattdessen in einen individuellen kritischen Reflexionsbericht überführt.",
      },
      {
        en: "The redesign proposal rejected the binary-trigger mechanism outright, replacing it with emotion-recognition data driving arm extension and hug intensity, with user autonomy, explicit consent, and privacy-first handling defined as guardrails before any such system would be built.",
        de: "Der Redesign-Vorschlag lehnte den binären Auslösemechanismus ausdrücklich ab und ersetzte ihn durch Emotionserkennungsdaten, die Armausdehnung und Umarmungsintensität steuern — mit Nutzerautonomie, ausdrücklicher Einwilligung und datenschutzorientiertem Umgang als vorab definierten Leitplanken für ein solches System.",
      },
    ],
    adoption: "academic",
  },

  tagEvidence: [
    { tag: "Soft Robotics", evidence: "solution: PneuNet bending-actuator arms with heat-sealed TPU air chambers", status: "evidenced" },
    { tag: "Human-Robot Interaction", evidence: "results: public exhibition with live user–bot hugging interaction", status: "evidenced" },
    { tag: "Shape-Changing Interfaces", evidence: "solution: PneuNet bending arms that change shape via inflation", status: "evidenced" },
    { tag: "Literature Review", evidence: "process:Deep Pressure Stimulation & Interpersonal Touch — interpersonal touch, oxytocin response, DPS therapy, and shape-changing interface literature; methods: \"Literature Review\"", status: "evidenced" },
    { tag: "Competitive Analysis", evidence: "process:Mapping the Gaps in Prior Hugging Systems — Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MIT's Huggable, and the Bauhaus Hugging Suit compared on form, actuation, and sensing to locate the two shared gaps", status: "evidenced" },
    { tag: "Physical Prototyping", evidence: "process:Balloons → Transparent TPU → Yellow TPU", status: "evidenced" },
    { tag: "Material Testing", evidence: "process:Iterative Material Testing", status: "evidenced" },
    { tag: "Arduino", evidence: "solution: \"Festo 5/3 solenoid valve and timed Arduino logic (3s inflate, 9s deflate)\"", status: "evidenced" },
    { tag: "Sensor Integration", evidence: "process:Touch-Triggered Hugging with an LED Feedback Cycle — 5-pad capacitive touch sensor", status: "evidenced" },
    { tag: "Interaction Design", evidence: "process:Touch-Triggered Hugging with an LED Feedback Cycle — touch as the trigger and a green/white/blinking-red LED cycle communicating readiness, hugging, and reset; results names the missing signifiers that stopped visitors initiating a hug unprompted", status: "evidenced" },
    { tag: "Data Physicalization", evidence: "process:Critical Reflection & Redesign Proposal — Offenhuber's data physicalization framework", status: "evidenced" },
    { tag: "Exhibition Research", evidence: "process:Real Users, Real (Uncomfortable) Findings", status: "evidenced" },
  ],
};

export default projectData;
