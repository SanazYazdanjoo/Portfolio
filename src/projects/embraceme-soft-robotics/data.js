// Content is sourced from Group_Report__EmbraceMe__.docx and FBHCI_Individual_Final_Report.pdf.
import thumbnailImg from './Project-3.png';
import thumbnailWebp from './Project-3.webp';

export const projectData = {
  id: "embraceme-soft-robotics",
  status: "Published",
  order: 4,
  title: {
    en: "EmbraceMe – Inflatable Human-Robot for Emotional Care",
    de: "EmbraceMe – aufblasbarer Mensch-Roboter für emotionale Fürsorge",
  },
  subtitle: {
    en: "A Pneumatic Soft-Robotic Hugging Interface, Exhibited & Evaluated in Public",
    de: "Ein pneumatisches Soft-Robotik-Umarmungsinterface, öffentlich ausgestellt und evaluiert",
  },
  tagline: {
    en: "Engineering a soft-robotic hug — and honestly reporting where it fell short.",
    de: "Eine soft-robotische Umarmung entwickeln — und ehrlich berichten, wo sie scheiterte.",
  },
  role: {
    en: "HCI Researcher & Prototyping Engineer (team of 3)",
    de: "HCI-Researcherin & Prototyping-Engineer (3-köpfiges Team)",
  },
  timeline: "SoSe 2023",
  tags: ["Soft Robotics", "Human-Robot Interaction", "Shape-Changing Interfaces", "Literature Review", "Competitive Analysis", "Physical Prototyping", "Material Testing", "Arduino", "Sensor Integration", "Interaction Design", "Data Physicalization", "Public Exhibition Research"],
  thumbnail: thumbnailImg,
  thumbnailWebp,
  heroImage: thumbnailImg,

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

  challenge: {
    en: "Physical touch like hugging releases oxytocin and measurably reduces stress — but not everyone has access to it: loved ones may be distant, or contact may be unsafe. We set out to build an inflatable soft-robotic interface delivering Deep Pressure Stimulation through a standalone hugging experience, gentle enough for direct human contact where rigid robots fail.",
    de: "Körperliche Berührung wie Umarmen setzt Oxytocin frei und reduziert nachweislich Stress — doch nicht jeder hat Zugang dazu: Nahestehende können weit entfernt sein, oder Kontakt kann unsicher sein. Wir wollten ein aufblasbares Soft-Robotik-Interface bauen, das Deep Pressure Stimulation über eine eigenständige Umarmungserfahrung liefert — sanft genug für direkten menschlichen Kontakt, wo starre Roboter versagen.",
  },

  solution: {
    en: "A standalone hugging bot built on a mannequin frame with PneuNet bending-actuator arms: foam limbs (80×16 cm) with 45° triangular cuts housing heat-sealed TPU air chambers. A 5-pad capacitive touch sensor on the chest triggers inflation when a user leans in for a hug; a Festo 5/3 solenoid valve and timed Arduino logic (3s inflate, 9s deflate) regulate pressure, with an LED feedback cycle (green: ready, white: hugging, blinking red: resetting) communicating system state.",
    de: "Ein eigenständiger Umarmungsroboter auf einem Schaufensterpuppen-Rahmen mit PneuNet-Biegeaktor-Armen: Schaumstoffgliedmaßen (80×16 cm) mit 45°-Dreieckseinschnitten, die heißverschweißte TPU-Luftkammern enthalten. Ein 5-Pad-kapazitiver Berührungssensor an der Brust löst das Aufblasen aus, sobald sich eine Person zur Umarmung nähert; ein Festo-5/3-Magnetventil und getaktete Arduino-Logik (3s aufblasen, 9s ablassen) regulieren den Druck, mit einem LED-Feedback-Zyklus (grün: bereit, weiß: umarmend, rot blinkend: zurücksetzend), der den Systemzustand kommuniziert.",
  },

  methodology: {
    en: "We grounded the design in a literature review of interpersonal touch, Deep Pressure Stimulation, and soft robotics, and a comparative analysis of prior hugging systems (Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot, and Bauhaus's own Hugging Suit) to identify their gaps — partial body coverage, static holds, and no emotional context. Two actuation techniques were evaluated (soft-growing vs. PneuNet bending); the standalone form factor decided for inclusivity determined the PneuNet approach. The prototype then went through iterative material testing before public exhibition with observation and user feedback.",
    de: "Wir haben das Design auf eine Literaturrecherche zu zwischenmenschlicher Berührung, Deep Pressure Stimulation und Soft Robotics sowie eine Vergleichsanalyse bestehender Umarmungssysteme (Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot und Bauhaus' eigenen Hugging Suit) gestützt, um deren Lücken zu identifizieren — partielle Körperabdeckung, statisches Halten und fehlender emotionaler Kontext. Zwei Aktuierungstechniken wurden evaluiert (soft-growing vs. PneuNet-Biegung); die für Inklusivität gewählte eigenständige Form entschied für den PneuNet-Ansatz. Der Prototyp durchlief anschließend iterative Materialtests vor der öffentlichen Ausstellung mit Beobachtung und Nutzerfeedback.",
  },

  results: {
    en: "At a public university exhibition, visitors described the interaction as fun and surprising — the bot 'waking up' to hug back was the standout moment. The evaluation also surfaced honest design failures: some users read the pink, muscular arms as uncanny and avoided full contact, and without clear signifiers, nobody could guess how to initiate a hug unprompted. My individual follow-up applied Offenhuber's data physicalization framework to propose the next iteration: emotion-recognition data (wearables, mood tracking) mapped to arm extension and hug intensity, turning a binary-triggered mechanism into an emotionally adaptive interface.",
    de: "Bei einer öffentlichen Universitätsausstellung beschrieben Besucher:innen die Interaktion als lustig und überraschend — das 'Aufwachen' des Bots, um zurückzuumarmen, war der Höhepunkt. Die Evaluation zeigte auch ehrliche Designfehler: Manche Nutzer:innen empfanden die pinken, muskulösen Arme als unheimlich und vermieden vollen Kontakt, und ohne klare Signifikanten konnte niemand ohne Anleitung erraten, wie eine Umarmung eingeleitet wird. Meine individuelle Nachbetrachtung wandte Offenhubers Data-Physicalization-Framework an, um die nächste Iteration vorzuschlagen: Emotionserkennungsdaten (Wearables, Stimmungs-Tracking), die auf Armausdehnung und Umarmungsintensität abgebildet werden — ein binär ausgelöster Mechanismus wird so zu einem emotional adaptiven Interface.",
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
        en: "Analyzed Hug Over a Distance, Huggy Pajama, HugShirt, HuggieBot 3.0, MIT's Huggable, and the Bauhaus Hugging Suit — comparing wearable vs. standalone forms, actuation, and sensing.",
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
      imagePath: null,
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
      imagePath: null,
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
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "Public Exhibition & Observation", de: "Öffentliche Ausstellung & Beobachtung" },
      title: { en: "Real Users, Real (Uncomfortable) Findings", de: "Echte Nutzer:innen, echte (unbequeme) Erkenntnisse" },
      annotation: {
        en: "Exhibited at a university event open to academic and non-academic visitors. Observed interactions and collected impressions: delight at the bot 'waking up,' but also uncanny-valley reactions to its form and confusion about how to initiate contact without our explanation.",
        de: "Ausgestellt bei einer Universitätsveranstaltung, offen für akademisches und nicht-akademisches Publikum. Interaktionen beobachtet und Eindrücke gesammelt: Freude über das 'Aufwachen' des Bots, aber auch Uncanny-Valley-Reaktionen auf seine Form und Verwirrung darüber, wie Kontakt ohne unsere Erklärung eingeleitet wird.",
      },
      insight: {
        en: "Two design failures documented honestly: aesthetic choices triggered avoidance in some users, and the interface lacked signifiers — curiosity did not translate into interaction without designer intervention.",
        de: "Zwei Designfehler ehrlich dokumentiert: ästhetische Entscheidungen lösten bei manchen Nutzer:innen Vermeidung aus, und dem Interface fehlten Signifikanten — Neugier übersetzte sich ohne Eingreifen der Designer:innen nicht in Interaktion.",
      },
      imagePath: null,
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
        de: "Die sichtbaren Designfehler (unheimliche Armästhetik, fehlende Signifikanten zum Einleiten einer Umarmung) wurden nicht innerhalb des Gruppenprojekts nachgebessert — sie wurden stattdessen in einen individuellen kritischen Reflexionsbericht überführt.",
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
    { tag: "Public Exhibition Research", evidence: "process:Real Users, Real (Uncomfortable) Findings", status: "evidenced" },
  ],
};

export default projectData;
