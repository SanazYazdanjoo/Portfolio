// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profileData } from "../data/profile";
import { voluntaryItems } from "../data/voluntary";
import { ScribbleUnderline } from "../components/DoodleLibrary";
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';

// ─── Career arc data ─────────────────────────────────────────────────────────
const CAREER_ARC = [
  {
    phase: "01",
    label: "Software Engineering",
    years: "2010 – 2019",
    summary: "Built 20+ products from the ground up. Learned that code is easy; knowing what to build is hard.",
    tags: ["Frontend Dev", "WordPress", "HTML/CSS/JS"],
  },
  {
    phase: "02",
    label: "QA Engineering",
    years: "2019 – 2023",
    summary: "Shifted from building to breaking — and realised every bug was a user insight waiting to be heard.",
    tags: ["Usability Testing", "Bug Tracking", "Agile"],
  },
  {
    phase: "03",
    label: "UX Research",
    years: "2023 – Now",
    summary: "Now I ask 'why' before anyone writes a line of code. I speak both 'user' and 'developer' — fluently.",
    tags: ["HCI Research", "Contextual Inquiry", "Prototyping"],
    highlight: true,
  },
];

// ─── Research process steps ──────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    desc: "Stakeholder interviews, contextual inquiry, and desk research to frame the right problem before any solution is considered.",
  },
  {
    number: "02",
    title: "Define",
    desc: "Synthesise findings into actionable insights — personas, user flows, and evidence-backed problem statements.",
  },
  {
    number: "03",
    title: "Design",
    desc: "Storyboards, wireframes, and high-fidelity Figma prototypes that translate research directly into testable artefacts.",
  },
  {
    number: "04",
    title: "Deliver",
    desc: "Usability testing, iteration, and stakeholder alignment — with measurable outcomes documented at every stage.",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <main className="bg-bg min-h-screen relative overflow-hidden">

      {/* ══════════════════════════════════════════════
          SECTION 1 — Bio, Photo & Skills columns (Redesigned Editorial Layout)
      ══════════════════════════════════════════════ */}
      <section className="relative w-full px-[6%] md:px-[8%] pb-24 md:pb-32 font-sans text-text">
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">
          
          {/* ── Left Column: Typography & Text (Cols 1 to 7) ── */}
          <motion.div 
            className="md:col-span-7 flex flex-col pt-12 md:pt-24 z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Handwritten Header */}
            <div className="relative inline-block w-max mb-6 md:mb-10">
              <h2 className="font-display text-text text-6xl md:text-8xl -rotate-6 relative z-10">
                About Me
              </h2>
              {/* Optional: Add a scribble under the cursive text if you like */}
            </div>

            {/* Main Paragraph */}
            <p className="text-base md:text-lg lg:text-xl leading-[1.8] text-text/90 font-light max-w-xl">
              I bridge the gap between code and human behavior. With 5+ years as a Frontend Developer and QA Engineer — shipping 20+ production websites and building QA systems from scratch — I now apply that technical fluency to UX Research. 
              <br /><br />
              I run stakeholder interviews, contextual inquiries, and controlled experiments, then translate findings into validated Figma prototypes and working code. Currently pursuing my MSc in HCI at Bauhaus University of Weimar, I speak both 'user' and 'developer' — fluently.
            </p>
          </motion.div>

          {/* ── Right Column: The "Peeking" Photo (Cols 8 to 12) ── */}
          <motion.div 
            // The negative top margin (-mt-20 lg:-mt-32) pulls this image UP into the Hero section!
            id="AboutAvatarImg"
            className="md:col-span-5 relative -mt-10 md:-mt-20 lg:-mt-32 z-20 flex justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[400px]">
              <img 
                src={profileData.aboutImage} 
                alt={profileData.name} 
                className="w-full h-auto object-cover shadow-2xl transition-all duration-700 hover:grayscale-0"
                style={{ aspectRatio: "4/5" }}
              />
            </div>
          </motion.div>

        </div>

        {/* ── Bottom Section: Skills List ("What I Bring") ── */}
        <motion.div 
          className="w-full max-w-[1400px] mx-auto mt-20 md:mt-32 pt-10 border-t border-border/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <span className="block text-[10px] md:text-xs font-display tracking-[0.3em] text-primary mb-10">
            What I Bring
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-text mb-4">Research</h3>
              <ul className="text-sm text-text/70 space-y-2 font-medium leading-relaxed">
                <li>Qualitative Interviews</li>
                <li>Contextual Inquiry</li>
                <li>Survey Design</li>
                <li>Usability Testing</li>
                <li>Quantitative Analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-text mb-4">Design</h3>
              <ul className="text-sm text-text/70 space-y-2 font-medium leading-relaxed">
                <li>Design Thinking</li>
                <li>Wireframes & Prototypes</li>
                <li>User Flows</li>
                <li>Style Guides</li>
                <li>Behavioral Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-text mb-4">Technical</h3>
              <ul className="text-sm text-text/70 space-y-2 font-medium leading-relaxed">
                <li>HTML / CSS / JS</li>
                <li>Python</li>
                <li>React</li>
                <li>Bootstrap</li>
                <li>CMS (WordPress, Typo3)</li>
                <li>Arduino</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — Career Arc: The Bridge
      ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border/20 relative">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="mb-12"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
              How I Got Here
            </p>
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-black text-text tracking-tight">
                The Bridge
              </h2>
            </div>
            <p className="text-sm text-text/60 mt-5 max-w-md">
              My path wasn't linear — it was deliberate. Every phase built the one after it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/20">
            {CAREER_ARC.map((step, i) => (
              <motion.div
                key={step.phase}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`relative p-8 group
                  ${step.highlight
                    ? "bg-primary text-white"
                    : "bg-bg hover:bg-primary/4 transition-colors duration-300"
                  }`}
              >
                <span className={`block font-black text-[11px] uppercase tracking-widest mb-4
                  ${step.highlight ? "text-white/50" : "text-primary/40"}`}>
                  {step.phase}
                </span>

                <h3 className={`font-black text-lg leading-tight mb-1
                  ${step.highlight ? "text-white" : "text-text"}`}>
                  {step.label}
                </h3>
                <p className={`text-[10px] font-semibold uppercase tracking-widest mb-4
                  ${step.highlight ? "text-white/60" : "text-text/40"}`}>
                  {step.years}
                </p>

                <p className={`text-sm leading-relaxed mb-6
                  ${step.highlight ? "text-white/85" : "text-text/70"}`}>
                  {step.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1
                        ${step.highlight
                          ? "border border-white/30 text-white/80"
                          : "border border-border/60 text-text/60 group-hover:border-primary/30"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {i < CAREER_ARC.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      className={step.highlight ? "text-white" : "text-primary/40"}>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — Research Process
      ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border/20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="mb-12"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
              Methodology
            </p>
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-black text-text tracking-tight">
                How I Work
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/20">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-bg px-7 py-8 group hover:bg-primary/4 transition-colors duration-300"
              >
                <span className="block font-black text-4xl text-primary/15 mb-3 font-hand">
                  {step.number}
                </span>
                <h3 className="font-black text-base text-text mb-3 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-text/60">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — Voluntary Work
      ══════════════════════════════════════════════ */}
      {voluntaryItems.length > 0 && (
        <section className="py-20 border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="mb-12"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
                Beyond the Brief
              </p>
              <div className="relative inline-block">
                <h2 className="text-3xl md:text-4xl font-black text-text tracking-tight">
                  Voluntary Work
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20">
              {voluntaryItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-bg px-8 py-8 group hover:bg-primary/4 transition-colors duration-300"
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-black text-base text-text">{item.title}</h3>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-primary/60 shrink-0 ml-4">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[10.5px] font-bold uppercase tracking-widest text-text/40 mb-3">
                    {item.org}
                  </p>
                  <p className="text-sm leading-relaxed text-text/65">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 5 — CTA
      ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border/20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
                What's next?
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-text tracking-tight">
                See the research in action.
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/#projects"
                className="px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest
                           hover:bg-primary/90 transition-all duration-200"
              >
                View Projects
              </Link>
              <Link
                to="/cv"
                className="px-8 py-3 border border-primary/40 text-primary text-xs font-black uppercase tracking-widest
                           hover:bg-primary hover:text-white transition-all duration-200"
              >
                View CV
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}