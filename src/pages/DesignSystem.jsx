// MAINTENANCE RULE:
// This page imports and renders your real components — it never mocks them.
// The only section you need to manually update is COLOR_TOKENS and TYPE_SCALE
// if you add new CSS variables or font sizes to index.css / theme.css.
// Everything else (Doodles, Button, Badge, Card) updates automatically.

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScribbleUnderline, CircleDoodle, HorizontalMarginLine, SpeckleCluster } from "../components/DoodleLibrary";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";

// ─── Token definitions ────────────────────────────────────────────────────────
// Update these when you add new variables to index.css or theme.css.
const COLOR_TOKENS = [
  { name: "Primary",     var: "--primary",   role: "Burgundy — brand accent, headings, CTAs" },
  { name: "Primary 600", var: "--primary-600",role: "Darker burgundy for hover states" },
  { name: "Text",        var: "--text",      role: "Main body text (Inter)" },
  { name: "Text Dim",    var: "--text-dim",  role: "Secondary / muted text" },
  { name: "Background",  var: "--bg",        role: "Page background (Textured White)" },
  { name: "Muted",       var: "--muted",     role: "Subtle fills, chip backgrounds" },
  { name: "Border",      var: "--border",    role: "Dividers, card borders" },
  { name: "Peach",       var: "--peach",     role: "Warm secondary tone for accents" },
  { name: "Danger",      var: "--danger",    role: "Errors, destructive actions (QA States)" },
  { name: "Success",     var: "--success",   role: "Confirmations, passing tests (QA States)" },
];

const TYPE_SCALE = [
  { label: "Display",    size: "text-7xl",   weight: "font-black",   sample: "Portfolio." },
  { label: "H1",         size: "text-5xl",   weight: "font-black",   sample: "Case Studies." },
  { label: "H2",         size: "text-3xl",   weight: "font-black",   sample: "The Bridge." },
  { label: "H3",         size: "text-xl",    weight: "font-bold",    sample: "Research Methodology" },
  { label: "Body",       size: "text-base",  weight: "font-medium",  sample: "I bridge the gap between complex human behavior and technical system design." },
  { label: "Small",      size: "text-sm",    weight: "font-normal",  sample: "MSc. Human-Computer Interaction · Bauhaus University Weimar" },
  { label: "Label",      size: "text-xs",    weight: "font-black",   sample: "QUALITATIVE DATA", extra: "uppercase tracking-widest" },
  { label: "Micro",      size: "text-[9px]", weight: "font-black",   sample: "COMING SOON", extra: "uppercase tracking-[0.2em]" },
  { label: "Handwritten",size: "text-4xl",   weight: "font-bold",    sample: "Engineering meets Research", extra: "font-hand" },
];

const BADGE_TONES = ["accent", "muted"];
const SPACING_SCALE = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24];

// ─── Shared section wrapper ───────────────────────────────────────────────────
function Section({ id, label, title, description, children }) {
  return (
    <motion.section
      id={id}
      className="mb-20 scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-8">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary/60 mb-1">
          {label}
        </p>
        <div className="relative inline-block">
          <h2 className="text-2xl font-black text-text tracking-tight">{title}</h2>
          <ScribbleUnderline className="absolute -bottom-1.5 left-0 w-full h-3 text-primary opacity-50" />
        </div>
        {description && (
          <p className="text-sm text-text/45 mt-4 max-w-xl leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </motion.section>
  );
}

// ─── Color swatch ─────────────────────────────────────────────────────────────
function ColorSwatch({ token }) {
  const cssValue = typeof window !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue(token.var).trim()
    : "";

  return (
    <div className="group">
      <div
        className="w-full h-16 mb-3 border border-border/20 shadow-sm transition-transform group-hover:scale-[1.02]"
        style={{ backgroundColor: `var(${token.var})` }}
      />
      <p className="text-[11px] font-black text-text">{token.name}</p>
      <p className="text-[9.5px] text-primary font-mono">{token.var}</p>
      <p className="text-[9px] text-text/40 mt-0.5">{cssValue || "—"}</p>
      <p className="text-[9px] text-text/35 mt-0.5 leading-tight">{token.role}</p>
    </div>
  );
}

// ─── Spacing swatch ───────────────────────────────────────────────────────────
function SpacingSwatch({ value }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest w-8 shrink-0">
        {value * 4}px
      </span>
      <div
        className="bg-primary/20 h-4 shrink-0"
        style={{ width: `${value * 4}px` }}
      />
      <span className="text-[9px] text-text/40 font-mono">space-{value} / {value * 0.25}rem</span>
    </div>
  );
}

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "colors",       label: "Colors" },
  { id: "typography",   label: "Typography" },
  { id: "spacing",      label: "Spacing" },
  { id: "doodles",      label: "Doodles" },
  { id: "buttons",      label: "Buttons" },
  { id: "badges",       label: "Badges" },
  { id: "cards",        label: "Cards" },
  { id: "project-card", label: "Project Card" },
];

function SidebarNav({ activeId }) {
  return (
    <nav className="hidden md:block w-44 shrink-0">
      <div className="sticky top-28 space-y-1">
        <p className="text-[8.5px] font-black uppercase tracking-[0.2em] text-text/30 mb-4 px-3">
          Sections
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`w-full text-left px-3 py-2 text-[11px] font-bold uppercase tracking-widest
                transition-colors duration-200 flex items-center gap-2
                ${isActive ? "text-primary" : "text-text/35 hover:text-text/70"}`}
            >
              {isActive && <span className="w-1 h-1 rounded-full bg-primary shrink-0" />}
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DesignSystem() {
  const [activeId] = useState("colors");

  const demoProject = projects.find(p => p.status !== "coming-soon") || projects[0];
  const comingSoonDemo = { status: "coming-soon", title: "Upcoming Research Case Study", tagline: "Contextual Inquiry in progress." };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg">
      <div className="container mx-auto px-6 md:px-12">

        {/* Page header */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
            Sanaz Yazdanjoo — Visual Language
          </p>
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl font-black text-text tracking-tighter">
              Design System<span className="text-primary">.</span>
            </h1>
            <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-primary opacity-60" />
          </div>
          <p className="text-sm text-text/45 mt-6 max-w-lg">
            This system bridges engineering precision and human-centered design. 
            All values are read live from your <code>theme.css</code> variables.
          </p>

          {/* Live stats */}
          <div className="flex flex-wrap gap-8 mt-8 pt-6 border-t border-border/20">
            {[
              { value: COLOR_TOKENS.length, label: "Color tokens" },
              { value: TYPE_SCALE.length,   label: "Type styles" },
              { value: NAV_ITEMS.length,    label: "Components" },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-black text-2xl text-primary leading-none">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-widest text-text/40 font-semibold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.header>

        <div className="flex gap-12 md:gap-16">
          <SidebarNav activeId={activeId} />

          <div className="flex-1 min-w-0">

            {/* ── COLORS ── */}
            <Section id="colors" label="01 — Tokens" title="Colors" description="Read live from theme.css. These tokens represent the brand color for Sanaz Yazdanjoo.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {COLOR_TOKENS.map(token => <ColorSwatch key={token.var} token={token} />)}
              </div>
            </Section>

            {/* ── TYPOGRAPHY ── */}
            <Section id="typography" label="02 — Tokens" title="Typography" description="Inter handles UI and high-density technical data. Caveat (font-hand) provides research annotations.">
              <div className="space-y-px bg-border/15">
                {TYPE_SCALE.map(t => (
                  <div key={t.label} className="bg-bg flex items-baseline gap-6 px-5 py-5 group hover:bg-primary/[0.02] transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 w-20 shrink-0">{t.label}</span>
                    <span className={`${t.size} ${t.weight} ${t.extra || ""} text-text leading-tight flex-1 truncate`}>{t.sample}</span>
                    <span className="text-[9px] font-mono text-text/25 shrink-0 hidden sm:block">{t.size} {t.weight}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── SPACING ── */}
            <Section id="spacing" label="03 — Tokens" title="Spacing" description="Based on a 4px grid to maintain alignment across research panels.">
              <div className="space-y-3 bg-bg px-6 py-6 border border-border/20">
                {SPACING_SCALE.map(v => <SpacingSwatch key={v} value={v} />)}
              </div>
            </Section>

            {/* ── DOODLES ── */}
            <Section id="doodles" label="04 — Components" title="Doodle Library" description="Analog-style SVG primitives used to humanize technical case studies.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/15">
                {[
                  { name: "CircleDoodle", import: "DoodleLibrary", usage: "<CircleDoodle isAnimated={true} />", render: (<div className="relative w-24 h-24"><CircleDoodle isAnimated className="w-full h-full text-primary" /></div>) },
                  { name: "ScribbleUnderline", import: "DoodleLibrary", usage: "<ScribbleUnderline />", render: (<div className="relative w-40 h-8"><span className="text-lg font-black">Heading text</span><ScribbleUnderline className="absolute -bottom-1 left-0 w-full h-4 text-primary" /></div>) },
                  { name: "HorizontalMarginLine", import: "DoodleLibrary", usage: "<HorizontalMarginLine isVisible={true} />", render: <HorizontalMarginLine isVisible className="text-primary opacity-60 w-full" /> },
                  { name: "SpeckleCluster", import: "DoodleLibrary", usage: "<SpeckleCluster />", render: <SpeckleCluster className="text-primary/40" /> },
                ].map(item => (
                  <div key={item.name} className="bg-bg px-7 py-8">
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary/50 mb-1">{item.import}</p>
                    <p className="font-black text-sm text-text mb-4">{item.name}</p>
                    <div className="flex items-center justify-center py-6 border border-border/20 mb-4 min-h-[80px]">{item.render}</div>
                    <code className="text-[9.5px] text-text/40 font-mono">{item.usage}</code>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── BUTTONS ── */}
            <Section id="buttons" label="05 — Components" title="Buttons" description="Primary interaction components featuring hand-drawn hover states.">
              <div className="flex flex-wrap gap-10 items-start bg-bg px-8 py-10 border border-border/20">
                <div className="text-center"><Button>View Projects</Button><p className="text-[9px] text-text/35 uppercase tracking-widest mt-3">Default</p></div>
                <div className="text-center"><Button href="#">Get in Touch →</Button><p className="text-[9px] text-text/35 uppercase tracking-widest mt-3">As link</p></div>
              </div>
            </Section>

            {/* ── BADGES ── */}
            <Section id="badges" label="06 — Components" title="Badges" description="Status indicators for skills and project phases.">
              <div className="flex flex-wrap gap-4 bg-bg px-8 py-8 border border-border/20">
                {BADGE_TONES.map(tone => (
                  <div key={tone} className="flex flex-col items-center gap-2"><Badge tone={tone}>{tone}</Badge><code className="text-[9px] text-text/35 font-mono">tone="{tone}"</code></div>
                ))}
              </div>
            </Section>

            {/* ── CARDS ── */}
            <Section id="cards" label="07 — Components" title="Cards" description="Modular units for research findings and summary notes.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card title="Stakeholder Interviews" subtitle="Qualitative Insights"><p className="text-sm text-text/60 leading-relaxed">Summarized user pain points from deskbird Co. research.</p></Card>
                <Card title="Usability Metric"><p className="text-sm text-text/60 leading-relaxed">85% task completion rate observed during contextual inquiry.</p></Card>
              </div>
            </Section>

            {/* ── PROJECT CARD ── */}
            <Section id="project-card" label="08 — Components" title="Project Card" description="High-level project summaries optimized for scannability on the homepage.">
              <div className="space-y-px bg-border/15">
                {demoProject && (
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary/50 mb-3">Published state</p>
                    <ProjectCard project={demoProject} index={0} />
                  </div>
                )}
                <div className="mt-6">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary/50 mb-3">Coming Soon state</p>
                  <ProjectCard project={comingSoonDemo} index={1} />
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </main>
  );
}