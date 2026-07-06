// ─────────────────────────────────────────────────────────────
// DesignSystem.jsx — "Ink & Bloom v2" living style guide
// Route: /design-system
//
// A self-documenting page: every specimen is rendered with the
// real tokens (CSS variables) and the real components, so if a
// token changes, this page updates itself. Single source of
// truth, but for design.
//
// Conventions honored:
// - .type-* role classes from theme.css (never raw sizes)
// - Section pattern: hairline divider → sticky label rail (3/9)
// - framer-motion fade-ups with the house easing
// - Gold highlighter appears exactly ONCE on this page
// ─────────────────────────────────────────────────────────────
import React from "react";
import { motion } from "framer-motion";

// If these live elsewhere in your tree, adjust the paths:
import { Button, SolidButton } from "../components/Button";
import { Badge } from "../components/Badge";
import { TagChip } from "../components/TagChip";
import { InkHighlight } from "../components/InkHighlight";
import { ScribbleDivider } from "../components/ScribbleDivider";

// ── Motion presets (house rules: 0.45–0.7s, y 16–24, stagger 0.1) ──
const EASE = [0.22, 0.61, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─────────────────────────────────────────────────────────────
// Token data — mirrors tokens/colors.css. These are DESIGN data,
// not profile data, so they live here rather than profile.js.
// Swatches render via var(--…) so they always match the CSS.
// ─────────────────────────────────────────────────────────────
const INK_PAPER = [
  { name: "Ink 900", varName: "--color-ink-900", hex: "#211D1C", note: "Body + display text, doodles", light: false },
  { name: "Ink 600", varName: "--color-ink-600", hex: "#6B6560", note: "Secondary text", light: false },
  { name: "Ink 300", varName: "--color-ink-300", hex: "#B9B4AD", note: "Faint / disabled", light: true },
  { name: "Paper 100", varName: "--color-paper-100", hex: "#EBE9E1", note: "Subtle fills", light: true },
  { name: "Paper 200", varName: "--color-paper-200", hex: "#E0DDD2", note: "Hairlines", light: true },
  { name: "White", varName: "--color-white", hex: "#FFFFFF", note: "The page", light: true },
];

const ACCENTS = [
  { name: "Coral — primary", varName: "--color-coral-500", hex: "#E43D12", rule: "Large text (≥24px), headings, shapes. Small text → 600 #B93110.", light: false },
  { name: "Rose — secondary", varName: "--color-rose-500", hex: "#D6536D", rule: "Hover whisper on links. Small text → 600 #B03A53.", light: false },
  { name: "Blush — tint", varName: "--color-blush-300", hex: "#FFA2B6", rule: "Backgrounds & washes ONLY. Never text.", light: true },
  { name: "Gold — highlighter", varName: "--color-gold-500", hex: "#EFB11D", rule: "Highlighter marks only. Once per page.", light: true },
];

const TYPE_SPECIMENS = [
  { cls: "type-hero", label: ".type-hero", spec: "Bricolage 800 · opsz 96 · homepage name ONLY", sample: "Sanaz" },
  { cls: "type-display", label: ".type-display", spec: "Bricolage 800 · clamp(3rem → 6rem)", sample: "Field Notes" },
  { cls: "type-h1", label: ".type-h1", spec: "Bricolage 800 · H1 zone", sample: "Evidence over adjectives" },
  { cls: "type-h2", label: ".type-h2", spec: "Bricolage 800 · H2 zone", sample: "Mixed-methods research" },
  { cls: "type-h3", label: ".type-h3", spec: "Bricolage 700 · H3 zone", sample: "Contextual inquiry, N=30" },
];

const MOTION_RULES = [
  { name: "Easing", value: "cubic-bezier(.22, .61, .36, 1)", note: "Everywhere. No exceptions, no bounces." },
  { name: "Entrance", value: "fade-up · y 16–24px · 0.45–0.7s", note: "Staggered ~0.1s between siblings." },
  { name: "Draw-on", value: "SVG pathLength / stroke-dashoffset", note: "Scribbles, ovals, and highlighter swipes." },
  { name: "Hover", value: "translateY(-1px) · darken to -600", note: "Photos de-grayscale in 0.5–0.7s." },
  { name: "Accessibility", value: "prefers-reduced-motion", note: "All animation collapses to ~0ms." },
];

// ── Local building blocks ──
function SectionLabel({ children }) {
  return (
    <p
      className="type-label"
      style={{ color: "var(--primary-600)", position: "sticky", top: 96, margin: 0 }}
    >
      {children}
    </p>
  );
}

function DSSection({ label, children }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full pt-16 md:pt-20"
    >
      <div className="w-full h-px mb-8" style={{ background: "var(--border)" }} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6">
        <div className="md:col-span-3">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </motion.section>
  );
}

function Swatch({ name, varName, hex, note, rule, light }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col justify-end p-3 h-28"
      style={{
        background: `var(${varName})`,
        color: light ? "var(--color-ink-900)" : "#fff",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="type-label m-0" style={{ fontSize: 11, letterSpacing: ".1em" }}>{name}</p>
      <p className="m-0" style={{ fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1.5 }}>
        {hex} · {note || rule}
      </p>
    </motion.div>
  );
}

function RuleRow({ name, value, note }) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 py-3"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <p className="type-label m-0 sm:col-span-3" style={{ color: "var(--text-dim)", alignSelf: "center" }}>{name}</p>
      <p className="m-0 sm:col-span-4" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>{value}</p>
      <p className="type-body m-0 sm:col-span-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>{note}</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function DesignSystem() {
  return (
    <main className="max-w-[80rem] mx-auto px-6 md:px-10 pb-28">
      {/* ── Header ── */}
      <motion.header variants={stagger} initial="hidden" animate="show" className="pt-16 md:pt-24">
        <motion.p
          variants={fadeUp}
          className="type-label m-0 mb-8"
          style={{ letterSpacing: ".28em", color: "var(--text-dim)", fontSize: 11 }}
        >
          INK &amp; BLOOM · V2&nbsp;&nbsp;—&nbsp;&nbsp;LIVING STYLE GUIDE
        </motion.p>
        <motion.h1 variants={fadeUp} className="type-display m-0">
          Design System
        </motion.h1>
        <motion.p variants={fadeUp} className="type-lead mt-6 mb-0 max-w-2xl" style={{ color: "var(--text-dim)" }}>
          The concept is a <InkHighlight>researcher&rsquo;s field notebook</InkHighlight>: a clean
          white page, true-black ink for text and hand-drawn doodles, one loud coral accent,
          a rose whisper, and a gold highlighter as the signature mark. Every specimen below
          renders from the live CSS tokens — this page can&rsquo;t drift from the site.
        </motion.p>
      </motion.header>

      {/* ── 01 · Colors ── */}
      <DSSection label="01 · Colors">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="type-h3 mt-0 mb-4">Ink &amp; paper</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {INK_PAPER.map((s) => <Swatch key={s.varName} {...s} />)}
          </div>

          <h2 className="type-h3 mt-10 mb-4">Accents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {ACCENTS.map((s) => <Swatch key={s.varName} {...s} />)}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-6 p-4"
            style={{ background: "var(--muted)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
          >
            <p className="type-label m-0 mb-2" style={{ color: "var(--primary-600)" }}>Contrast rules (WCAG AA)</p>
            <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)" }}>
              <code style={{ fontFamily: "var(--font-mono)" }}>--primary / --secondary</code> → large text (≥24px), headings, UI shapes only.{" "}
              <code style={{ fontFamily: "var(--font-mono)" }}>--primary-600 / --secondary-600</code> → small text, links, body-size accents.{" "}
              <code style={{ fontFamily: "var(--font-mono)" }}>--blush / --highlight</code> → backgrounds and tints only, never text.
              Dark mode is warm charcoal, never blue-black.
            </p>
          </motion.div>
        </motion.div>
      </DSSection>

      {/* ── 02 · Typography ── */}
      <DSSection label="02 · Typography">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="type-body mt-0 mb-8" style={{ color: "var(--text-dim)" }}>
            Bricolage Grotesque for display (variable opsz, 500–800), DM Sans 400 for body —
            never 300 — and Caveat for handwritten asides. Components use the{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>.type-*</code>{" "}
            role classes below, not raw sizes.
          </motion.p>

          {TYPE_SPECIMENS.map(({ cls, label, spec, sample }) => (
            <motion.div key={cls} variants={fadeUp} className="py-5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--primary-600)" }}>{label}</code>
                <span className="type-label" style={{ color: "var(--text-dim)" }}>{spec}</span>
              </div>
              <p className={`${cls} m-0`} style={{ overflowWrap: "anywhere" }}>{sample}</p>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="py-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--primary-600)" }}>.type-body / .type-lead</code>
              <span className="type-label" style={{ color: "var(--text-dim)" }}>DM Sans 400 · leading 1.7</span>
            </div>
            <p className="type-lead m-0 mb-2">Copy leads with proof, not adjectives.</p>
            <p className="type-body m-0" style={{ color: "var(--text-dim)" }}>
              Metrics are the vocabulary: N=30, SUS 85.2, 50 survey respondents. Sentence case
              for body; tiny UPPERCASE tracked labels for kickers and metadata.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="py-5">
            <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--primary-600)" }}>.doodle-text</code>
              <span className="type-label" style={{ color: "var(--text-dim)" }}>Caveat · warm asides only</span>
            </div>
            <p className="doodle-text m-0" style={{ fontSize: "2rem" }}>
              handwritten notes, captions &amp; &ldquo;Coming Soon&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </DSSection>

      {/* ── 03 · Ink elements ── */}
      <DSSection label="03 · Ink">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="type-body mt-0 mb-6" style={{ color: "var(--text-dim)" }}>
            The signature layer. The gold <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>InkHighlight</code> appears{" "}
            <strong>once per page</strong> — it&rsquo;s a signature, not wallpaper (this page&rsquo;s
            single swipe lives in the intro above). The rose variant is the quieter alternative.
            Scribble dividers draw themselves on scroll-in; doodles are pointer-events-none decoration.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-6">
            <p className="type-tagline m-0 mb-3" style={{ fontSize: "var(--fs-2xl)" }}>
              <InkHighlight tone="rose">slightly feminine, always evidence-led</InkHighlight>
            </p>
            <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
              Try selecting this line — ::selection is blush, like a highlighter.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="type-label m-0 mb-3" style={{ color: "var(--text-dim)" }}>ScribbleDivider — wobbly hairline + ink dots</p>
            <ScribbleDivider />
          </motion.div>
        </motion.div>
      </DSSection>

      {/* ── 04 · Components ── */}
      <DSSection label="04 · Components">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="type-h3 mt-0 mb-1">Buttons</h2>
            <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
              The doodle button (Caveat label, coral oval sketches itself on hover) is for hero
              CTAs; the .btn system is for denser UI.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="#projects">See my work</Button>
              <SolidButton variant="primary">Download CV</SolidButton>
              <SolidButton variant="ghost">Say hello</SolidButton>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="type-h3 mt-0 mb-1">Badges &amp; tags</h2>
            <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
              Notebook-tag chips: ink outlines and soft washes, no heavy solid fills. Text is
              always AA — ink or the -600 accent shades.
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge tone="accent">Eye-Tracking</Badge>
              <Badge tone="rose">Contextual Inquiry</Badge>
              <Badge tone="highlight">N=30</Badge>
              <Badge tone="muted">Coming Soon</Badge>
            </div>
            <div className="flex flex-wrap items-center">
              <TagChip name="usability-testing" count={4} />
              <TagChip name="mixed-methods" count={3} />
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="type-h3 mt-0 mb-1">Surfaces &amp; imagery</h2>
            <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
              Cards use 12px radius; paper sheets, photo frames and project rows stay
              square-cornered. Shadows are warm brown-tinted, never gray. Photos sit in a
              white 8px mat, grayscale by default, colorizing on hover.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card">
                <p className="type-label m-0 mb-2" style={{ color: "var(--primary-600)" }}>.card</p>
                <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)" }}>
                  Surface + hairline border + shadow-sm. Radius 12px.
                </p>
              </div>
              <div className="paper-bg p-4">
                <p className="type-label m-0 mb-2" style={{ color: "var(--primary-600)" }}>.paper-bg</p>
                <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)" }}>
                  Layered warm sheet shadow, white top sheen. Square corners — like a real page.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </DSSection>

      {/* ── 05 · Motion ── */}
      <DSSection label="05 · Motion">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {MOTION_RULES.map((r) => <RuleRow key={r.name} {...r} />)}
        </motion.div>
      </DSSection>

      {/* ── 06 · Iconography ── */}
      <DSSection label="06 · Icons">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="type-body mt-0 mb-4">
            No icon fonts, no icon libraries. Three sources only:
          </motion.p>
          <motion.div variants={fadeUp}>
            <RuleRow name="Doodles" value="assets/icons/*.svg via CSS mask" note="Hand-drawn ink marks, tinted with currentColor (CustomIcon)." />
            <RuleRow name="Inline strokes" value="stroke-width: 2 · currentColor" note="Arrow, chevron, hamburger/close — tiny inline SVGs only." />
            <RuleRow name="Unicode" value="↗ · ×" note="External links, separators, close. No emoji, ever." />
          </motion.div>
        </motion.div>
      </DSSection>
    </main>
  );
}