// Route: /design-system. Every specimen renders from the real CSS tokens
// and real components, so a token change updates this page automatically.
// Conventions: .type-* role classes from theme.css instead of raw sizes;
// section pattern is a hairline divider plus a sticky label rail (3/9);
// framer-motion fade-ups use the house easing; the gold highlighter appears
// once on this page.
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button, SolidButton, InkCtaButton, CoralCtaButton } from "../components/Button";
import { PrototypeLink } from "../projects/template/PrototypeLink";
import { Badge } from "../components/Badge";
import { ADOPTION_META } from "../projects/template/OutcomeBlock";
import TagChip from "../components/TagChip";
import { InkHighlight } from "../components/InkHighlight";
import { ScribbleDivider } from "../components/ScribbleDivider";
import { HandArrow } from "../components/HandArrow";
import {
  HandMenu, HandClose, HandChevron, HandList, HandGrid, HandMail,
  HandQuestion, HandBang, HandInfo, HandSearch, HandCheck,
  HandPlus, HandMinus, HandDownload, HandSend, HandSpark,
} from "../components/HandIcons";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { EASE } from "../utils/motion";

// Motion presets (house rules: 0.45-0.7s, y 16-24px, stagger 0.1s)
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Token data mirrors tokens/colors.css. This is design data, not profile
// data, so it lives here rather than in profile.js. Swatches render via
// var(--...) so they always match the CSS.
const INK_PAPER = [
  { name: "Ink 900", varName: "--color-ink-900", hex: "#211D1C", note: "Body + display text, doodles", light: false },
  { name: "Ink 600", varName: "--color-ink-600", hex: "#6B6560", note: "Secondary text", light: false },
  { name: "Ink 300", varName: "--color-ink-300", hex: "#B9B4AD", note: "Faint / disabled", light: true },
  { name: "Paper 100", varName: "--color-paper-100", hex: "#EBE9E1", note: "Subtle fills", light: true },
  { name: "Paper 200", varName: "--color-paper-200", hex: "#E0DDD2", note: "Hairlines", light: true },
  { name: "White", varName: "--color-white", hex: "#FFFFFF", note: "The page", light: true },
];

const ACCENTS = [
  { name: "Coral — primary", varName: "--color-coral-500", hex: "#892107", rule: "Large text (≥24px), headings, shapes. Small text → 600 #5E1605.", light: false },
  { name: "Rose — secondary", varName: "--color-rose-500", hex: "#BF5858", rule: "Hover whisper on links. Small text → 600 #904849.", light: false },
  { name: "Blush — tint", varName: "--color-blush-300", hex: "#E1A19A", rule: "Backgrounds & washes ONLY. Never text.", light: true },
  { name: "Gold — highlighter", varName: "--color-gold-500", hex: "#D3A22E", rule: "Highlighter marks only. Once per page.", light: true },
];

const TYPE_SPECIMENS = [
  { cls: "type-hero", label: ".type-hero", spec: "Bricolage 800 · opsz 96 · homepage name ONLY", sample: "Sanaz" },
  { cls: "type-display", label: ".type-display", spec: "Bricolage 800 · clamp(3rem → 6rem)", sample: "Field Notes" },
  { cls: "type-h1", label: ".type-h1", spec: "Bricolage 800 · H1 zone", sample: "Evidence over adjectives" },
  { cls: "type-h2", label: ".type-h2", spec: "Bricolage 800 · H2 zone", sample: "Mixed-methods research" },
  { cls: "type-section", label: ".type-section", spec: "Bricolage 800 · clamp(28px → 36px) · pairs with an eyebrow above it", sample: "About Me" },
  { cls: "type-h3", label: ".type-h3", spec: "Bricolage 700 · H3 zone", sample: "Contextual inquiry, N=30" },
  { cls: "font-display font-extrabold text-metric", label: "text-metric", spec: "36 → 44px fluid · MetricsStrip numerals (text-metric-long for long values)", sample: "73%" },
  { cls: "font-hand text-quote", label: "text-quote", spec: "Caveat · 28px fixed · the hand runs optically small, so it gets its own step", sample: "“I stopped guessing.”" },
];

const MOTION_RULES = [
  { name: "Easing", value: "cubic-bezier(.22, .61, .36, 1)", note: "src/utils/motion.js — the only place it is written. Continuous loops stay linear." },
  { name: "Entrance", value: "fade-up · y 16–24px · 0.45–0.7s", note: "Staggered ~0.1s between siblings." },
  { name: "Draw-on", value: "SVG pathLength / stroke-dashoffset", note: "Scribbles, ovals, and highlighter swipes." },
  { name: "Line weight", value: "~1.2px, breathing 0.7–1.6px", note: "One nib for every drawn mark. No bold tier." },
  { name: "Hover", value: "colour first", note: "~50 of ~60 hovers are a colour change. A lift is only for cards and raised buttons; photos de-grayscale in 0.5–0.7s." },
  { name: "Focus", value: ".focus-ring", note: "2px coral outline, 2px offset. -inset for edge-to-edge targets, -light on dark. Never bare outline-none." },
  { name: "Links", value: ".rule-underline", note: "Inline prose links carry the drawn hairline in coral. Label and button links use colour alone." },
  { name: "Empty states", value: "<EmptyState>", note: "A drawn panel and a handwritten line. One pattern for every “nothing here”." },
  { name: "Accessibility", value: "prefers-reduced-motion", note: "MotionConfig at the app root + a CSS block. Transform and transition stop; opacity fades stay." },
];

// The glyph specimens render the real components from HandIcons.jsx /
// HandArrow.jsx, so a redrawn path updates this sheet automatically. "Job"
// is where the glyph works today; "bench" glyphs are drawn and waiting so a
// future control never has to reach for a library icon.
const GLYPH_SPECIMENS = [
  { name: "HandArrow", el: <HandArrow />, job: "Hero CTA, every “Read case study”" },
  { name: "HandArrow up-right", el: <HandArrow direction="up-right" />, job: "External links: LinkedIn, GitHub, CV" },
  { name: "HandArrow back", el: <HandArrow direction="back" />, job: "“All projects”, back links" },
  { name: "HandChevron", el: <HandChevron className="h-5 w-5" />, job: "Every disclosure; callers rotate it" },
  { name: "HandMenu", el: <HandMenu className="h-5 w-5" />, job: "Mobile burger, sidebar toggle" },
  { name: "HandClose", el: <HandClose className="h-5 w-5" />, job: "Menu, chat & lightbox dismiss" },
  { name: "HandList", el: <HandList className="h-5 w-5" />, job: "/projects list view" },
  { name: "HandGrid", el: <HandGrid className="h-5 w-5" />, job: "/projects grid view" },
  { name: "HandMail", el: <HandMail className="h-5 w-5" />, job: "Contact envelope" },
  { name: "HandDownload", el: <HandDownload className="h-5 w-5" />, job: "Credential download" },
  { name: "HandSend", el: <HandSend className="h-5 w-5" />, job: "Chat composer submit" },
  { name: "HandSpark", el: <HandSpark className="h-5 w-5" />, job: "Chat launcher" },
  { name: "HandQuestion", el: <HandQuestion className="h-5 w-5" />, job: "The 404 page’s mark" },
  { name: "HandBang", el: <HandBang className="h-5 w-5" />, job: "Error page, dev NEEDS-INPUT marker" },
  { name: "HandSearch", el: <HandSearch className="h-5 w-5" />, job: "Bench — future filter/search" },
  { name: "HandInfo", el: <HandInfo className="h-5 w-5" />, job: "Bench — method notes, hints" },
  { name: "HandCheck", el: <HandCheck className="h-5 w-5" />, job: "Bench — confirmations" },
  { name: "HandPlus", el: <HandPlus className="h-5 w-5" />, job: "Bench — expanders, steppers" },
  { name: "HandMinus", el: <HandMinus className="h-5 w-5" />, job: "Bench — HandPlus’s other half" },
];

const DS_SECTIONS = [
  { id: "colors", label: "01 · Colors" },
  { id: "typography", label: "02 · Typography" },
  { id: "ink", label: "03 · Ink" },
  { id: "components", label: "04 · Components" },
  { id: "motion", label: "05 · Motion" },
  { id: "icons", label: "06 · Icons" },
];

function DSSection({ id, children }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full pt-12 md:pt-16 scroll-mt-32"
    >
      <div className="w-full rule-line mb-8" />
      <div className="grid grid-cols-1 gap-y-6">{children}</div>
    </motion.section>
  );
}

function DSNav({ sections, activeId }) {
  const { t } = useTranslation();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label={t("designSystem.sectionsAriaLabel")} className="pt-1">
      <p className="text-2xs font-black uppercase text-gray-500 mb-5 pl-3">
        {t("cv.onThisPage")}
      </p>
      <ul className="space-y-0.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={`w-full text-left flex items-baseline gap-3 px-3 py-2 transition-colors duration-200 relative border-l-2
                  rule-edge-l ${
                  isActive
                    ? "[--rule-line-color:var(--primary)] text-primary"
                    : "[--rule-line-color:transparent] text-gray-500 hover:text-gray-900 hover:[--rule-line-color:rgb(209_213_219)]"
                }`}
              >
                <span className={`text-2xs font-bold uppercase leading-tight ${
                  isActive ? "text-primary" : "text-gray-600"
                }`}>
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobilePillBar({ sections, activeId }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    // Opaque, no backdrop-blur, own compositing layer — the same treatment
    // as the project pages' MobilePillBar (see SectionNav.jsx for the iOS
    // mid-scroll layer-ordering and repaint story).
    <div className="sticky top-0 z-40 bg-white border-b rule-edge-b -mx-6 px-6 py-3 no-print md:hidden"
         style={{ transform: "translateZ(0)" }}>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className={`shrink-0 px-3 py-1.5 text-2xs font-black uppercase border rule-frame transition-colors duration-200 ${
              activeId === section.id
                ? "text-white [--rule-line-color:var(--primary)] [--rule-fill-color:var(--primary)]"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Swatch({ name, varName, hex, note, rule, light }) {
  return (
    <motion.div
      variants={fadeUp}
      className="border rule-frame-r shadow-sm flex flex-col justify-end p-3 h-28"
      style={{ borderRadius: "var(--radius)", "--rule-fill-color": `var(${varName})` }}
    >
      {/* Text sits on a solid ink-900 chip rather than directly on the
          swatch fill: some accent -500 tones (e.g. rose) don't clear 4.5:1
          for either light or dark text at this size — the chip keeps the
          swatch itself showing the true token color while guaranteeing safe
          contrast regardless of which color it is. No-op for light
          swatches, which already pass with ink text directly on the fill. */}
      <div
        style={{
          background: light ? "transparent" : "var(--color-ink-900)",
          color: light ? "var(--color-ink-900)" : "#fff",
          display: "inline-block",
          width: "fit-content",
          padding: light ? 0 : "3px 6px",
          borderRadius: light ? 0 : 4,
        }}
      >
        <p className="type-label m-0" style={{ fontSize: 11, letterSpacing: ".1em" }}>{name}</p>
        <p className="m-0" style={{ fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1.5 }}>
          {hex} · {note || rule}
        </p>
      </div>
    </motion.div>
  );
}

function RuleRow({ name, value, note }) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 py-3 border-b rule-b"
    >
      <p className="type-label m-0 sm:col-span-3" style={{ color: "var(--text-dim)", alignSelf: "center" }}>{name}</p>
      <p className="m-0 sm:col-span-4" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>{value}</p>
      <p className="type-body m-0 sm:col-span-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>{note}</p>
    </motion.div>
  );
}

export default function DesignSystem() {
  const [activeId, setActiveId] = useState(DS_SECTIONS[0]?.id ?? null);
  const { t } = useTranslation();
  const profileData = useLocalizedProfile(rawProfile);

  useDocumentMeta({
    title: `${t("nav.designSystem")} — ${profileData.name}`,
    description: profileData.tagline,
  });

  useEffect(() => {
    if (DS_SECTIONS.length === 0) return undefined;

    const observers = [];

    DS_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(section.id);
          }
        },
        { rootMargin: "-12% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="design-system-page text-text bg-white min-h-screen w-full pb-28">
      <div className="flex items-start">
        <aside className="hidden md:block w-[180px] lg:w-[220px] shrink-0 no-print sticky top-36 self-start pr-6 lg:pr-8">
          <div className="border-l rule-edge-l pl-3 py-2">
            <DSNav sections={DS_SECTIONS} activeId={activeId} />
          </div>
        </aside>

        <div className="w-full border-l rule-edge-l px-6 py-12 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-doc">
            <MobilePillBar sections={DS_SECTIONS} activeId={activeId} />

            <motion.header variants={stagger} initial="hidden" animate="show" className="pt-16 md:pt-20">
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
                Think <InkHighlight>researcher&rsquo;s field notebook</InkHighlight>: a clean white
                page, true-black ink, hand-drawn doodles, one loud coral accent, and a gold
                highlighter saved for what matters most.
              </motion.p>
            </motion.header>

            <DSSection id="colors">
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
                className="mt-6 p-4 border rule-frame-r"
                style={{ background: "var(--muted)", borderRadius: "var(--radius)" }}
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

          <DSSection id="typography">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.p variants={fadeUp} className="type-body mt-0 mb-8" style={{ color: "var(--text-dim)" }}>
                Bricolage Grotesque for display (variable opsz, 500–800), DM Sans 400 for body —
                never 300 — and Caveat for handwritten asides. Components use the{" "}
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>.type-*</code>{" "}
                role classes below, not raw sizes.
              </motion.p>

              {TYPE_SPECIMENS.map(({ cls, label, spec, sample }) => (
                <motion.div key={cls} variants={fadeUp} className="py-5 border-b rule-b">
                  <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--primary-600)" }}>{label}</code>
                    <span className="type-label" style={{ color: "var(--text-dim)" }}>{spec}</span>
                  </div>
                  <p className={`${cls} m-0`} style={{ overflowWrap: "anywhere" }}>{sample}</p>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="py-5 border-b rule-b">
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

              <motion.div variants={fadeUp} className="py-5 border-b rule-b">
                <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--primary-600)" }}>Text tiers</code>
                  <span className="type-label" style={{ color: "var(--text-dim)" }}>three, and only three</span>
                </div>
                <p className="type-body m-0 mb-4">Body and display sit on <code style={{ fontFamily: "var(--font-mono)" }}>text-text</code>.</p>
                <p className="type-body m-0 mb-4 text-text-meta">Supporting prose, captions and method notes sit on <code style={{ fontFamily: "var(--font-mono)" }}>text-text-meta</code>.</p>
                <p className="type-body m-0 mb-4 text-dim">Labels, counts and timestamps sit on <code style={{ fontFamily: "var(--font-mono)" }}>text-dim</code> — the quietest tier that still clears AA.</p>
                <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  Never a <code style={{ fontFamily: "var(--font-mono)" }}>text-text/NN</code> alpha: an alpha says nothing about which
                  tier it meant, and the low ones had drifted under 4.5:1 on real copy. Raw alphas are for
                  decorative glyphs only. Tracking is the same story &mdash;{" "}
                  <code style={{ fontFamily: "var(--font-mono)" }}>tracking-caps</code> is the token, and{" "}
                  <code style={{ fontFamily: "var(--font-mono)" }}>text-2xs</code> already carries it, so a micro-label needs no tracking class at all.
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

          <DSSection id="ink">
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

              {/* Filed under Ink rather than Surfaces because the design-system
                  project files it that way too — the source card is group="Ink".
                  It is a mark, not a surface treatment. */}
              <motion.div variants={fadeUp} className="mt-10">
                <p className="type-label m-0 mb-2" style={{ color: "var(--text-dim)" }}>Dot pattern — seamless hand-drawn tile</p>
                <p className="type-body mt-0 mb-6" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  A 626px tile carrying 24 large blobs and 56 small specks, in the same ink as
                  the doodles and scattered by hand so no two marks match and the repeat never
                  reads as a grid. Two
                  variants, and the ground decides which one you want. The sizes below are the
                  defaults — override either with{" "}
                  <code style={{ fontFamily: "var(--font-mono)" }}>--dots-size</code>, as the
                  case-study banner mat does at 130px, because across a 32px band the default
                  scatters too thin to read as a pattern.
                </p>

                <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
                  <figure className="m-0">
                    <div className="border rule-frame bg-dots-paper" style={{ height: "220px" }} />
                    <code className="block mt-3 mb-1" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.bg-dots-paper</code>
                    <figcaption className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                      Brings its own warm paper ground, drawn at 313px. For when the pattern
                      IS the surface.
                    </figcaption>
                  </figure>

                  <figure className="m-0">
                    <div className="border rule-frame bg-dots" style={{ height: "220px", backgroundColor: "var(--primary)" }} />
                    <code className="block mt-3 mb-1" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.bg-dots</code>
                    <figcaption className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                      No ground of its own, drawn at 200px so the marks read finer. Layer it
                      over a surface that is already painted — coral here, the banner&rsquo;s
                      white mat on a case study.
                    </figcaption>
                  </figure>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <p className="type-label m-0 mb-2" style={{ color: "var(--text-dim)" }}>Hand-drawn rules — every hairline on the site</p>
                <p className="type-body mt-0 mb-6" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  Same ink at the same opacity the hairlines always had — they are just no
                  longer straight. A seamless 360px SVG tile carries the wobble and is painted
                  as a background inside the element&rsquo;s (already transparent) 1px border, so
                  swapping <code style={{ fontFamily: "var(--font-mono)" }}>border-border</code> for{" "}
                  <code style={{ fontFamily: "var(--font-mono)" }}>rule-t</code> moves nothing.
                  Dividers, frames, chips, buttons, circles, the sidebar spines and the
                  cursor&rsquo;s own ink trail are all the same ~1.2px nib — one pen drew the
                  site, so there is no bold tier and no fine one. Only the dashed
                  &ldquo;+N more&rdquo; chip stays crisp, and print falls back to a straight
                  hairline. Tints vary; weight does not.
                </p>

                <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))" }}>
                  <div>
                    <p className="type-label m-0 mb-4" style={{ color: "var(--text-dim)" }}>Tints — one weight</p>
                    {[
                      [".rule-line", ""],
                      [".rule-soft", "rule-soft"],
                      [".rule-faint", "rule-faint"],
                    ].map(([label, mod]) => (
                      <div key={label} className="mb-5">
                        <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>{label}</code>
                        <div className={`rule-line ${mod}`} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="type-label m-0 mb-4" style={{ color: "var(--text-dim)" }}>Frame &amp; vertical</p>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-box</code>
                    <div className="border rule-box px-5 py-6 mb-5">
                      <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                        Only for frames whose children carry their own padding — a photo
                        would sit on top of the line.
                      </p>
                    </div>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-line-v</code>
                    <div className="flex gap-5" style={{ height: "72px" }}>
                      <div className="rule-line-v" />
                      <div className="rule-line-v" />
                      <div className="rule-line-v rule-soft" />
                    </div>
                  </div>

                  <div>
                    <p className="type-label m-0 mb-4" style={{ color: "var(--text-dim)" }}>Outlines that sit over content</p>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-frame / .rule-frame-in</code>
                    <div className="border rule-frame px-5 py-4 mb-5">
                      <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                        Drawn into an <code style={{ fontFamily: "var(--font-mono)" }}>::after</code>, so it lands
                        on top of a photo. Use <code style={{ fontFamily: "var(--font-mono)" }}>-in</code> when the
                        host clips with <code style={{ fontFamily: "var(--font-mono)" }}>overflow-hidden</code>.
                      </p>
                    </div>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-pill &middot; --rule-fill-color</code>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge tone="accent">Eye-Tracking</Badge>
                      <Badge tone="rose">N=30</Badge>
                      <Badge tone="muted">Coming Soon</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge tone="accent" className="!text-white [--rule-fill-color:var(--primary-600)]">Eye-Tracking</Badge>
                      <Badge tone="rose" className="!text-white [--rule-fill-color:var(--secondary-600)]">N=30</Badge>
                      <Badge tone="highlight" className="[--rule-fill-color:var(--highlight)]">N=30</Badge>
                    </div>
                    <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-xs)", color: "var(--text-dim)" }}>
                      The filled row is the hover state, forced. A fill never comes from
                      <code style={{ fontFamily: "var(--font-mono)" }}> bg-*</code> on anything wearing a drawn
                      outline — that would paint a hard rectangle under the drawn one.
                    </p>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-edge-l + --rule-line-color</code>
                    <div className="flex gap-6">
                      <div className="border-l-2 rule-edge-l pl-4" style={{ height: "64px" }} />
                      <div className="border-l-2 rule-edge-l [--rule-line-color:var(--primary-600)] pl-4" style={{ height: "64px" }} />
                      <div className="border-l-2 rule-edge-l [--rule-line-color:var(--secondary-600)] pl-4" style={{ height: "64px" }} />
                      <div className="border-l-2 rule-edge-l [--rule-line-color:var(--highlight)] pl-4" style={{ height: "64px" }} />
                    </div>
                  </div>

                  <div>
                    <p className="type-label m-0 mb-4" style={{ color: "var(--text-dim)" }}>Curves, taps &amp; bars</p>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-frame-r &middot; radius kept</code>
                    <div className="border rule-frame-r px-4 py-3 mb-5" style={{ borderRadius: "var(--radius)" }}>
                      <p className="type-body m-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                        Four corner arcs, four stretched runs. <code style={{ fontFamily: "var(--font-mono)" }}>--rule-r</code> is the radius.
                      </p>
                    </div>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-circle &middot; .rule-disc &middot; .rule-dot</code>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-9 h-9 rule-circle [--rule-line-color:var(--primary-600)]" />
                      <div className="w-8 h-8 rule-circle" />
                      <div className="w-9 h-9 rounded-full rule-disc" style={{ background: "var(--color-ink-600)" }} />
                      <div className="w-2 h-2 rule-dot" style={{ background: "var(--color-ink-900)" }} />
                      <div className="w-2 h-2 rule-dot" style={{ background: "var(--primary-600)" }} />
                      <div className="w-1.5 h-1.5 rule-dot" style={{ background: "var(--primary)" }} />
                    </div>
                    <code className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}>.rule-stroke &middot; .rule-stroke-v</code>
                    <div className="flex items-stretch gap-4" style={{ height: "56px" }}>
                      <div className="w-[5px] rule-stroke-v" style={{ background: "var(--accent-spine)" }} />
                      <div className="w-[5px] rule-stroke-v" style={{ background: "var(--border)" }} />
                      <div className="flex-1 flex flex-col justify-center gap-4">
                        <div className="h-[5px] w-full rule-stroke" style={{ background: "var(--border)" }} />
                        <div className="h-[5px] w-full rule-stroke" style={{ background: "var(--accent-spine)" }} />
                        <div className="h-[5px] w-full rule-stroke" style={{ background: "var(--secondary-600)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </DSSection>

          <DSSection id="components">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp} className="mb-10">
                <h2 className="type-h3 mt-0 mb-1">Buttons</h2>
                <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  Five, each with one home. The filled ink CTA (drawn fill via{" "}
                  <code style={{ fontFamily: "var(--font-mono)" }}>rule-fill-r</code>) is the hero&rsquo;s;
                  the coral CTA belongs to the 404 and error pages; the doodle button (Caveat label,
                  coral oval sketches itself on hover) is the loud variant; the quiet text button
                  carries back-links; and the gold prototype link is a case study&rsquo;s single gold
                  mark — one per page, always the live build.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                  <InkCtaButton type="button">See my work <HandArrow /></InkCtaButton>
                  <CoralCtaButton type="button">Back to the homepage</CoralCtaButton>
                  <SolidButton type="button">Download CV</SolidButton>
                  <Button type="button">Say hello</Button>
                </div>
                <PrototypeLink href="/designsystem" label="View the live prototype" />
              </motion.div>

              <motion.div variants={fadeUp} className="mb-10">
                <h2 className="type-h3 mt-0 mb-1">Badges &amp; tags</h2>
                <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  Notebook-tag chips: ink outlines at rest, filling solid on hover. Text is
                  always AA — ink or the -600 accent shades at rest, white once filled.
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

              {/* The outcome vocabulary — the defined table behind the status
                  pill every case study's outcome block renders. Built from
                  the SAME ADOPTION_META the pill component uses, so the
                  documented convention and the live pills cannot drift. */}
              <motion.div variants={fadeUp} className="mb-10">
                <h2 className="type-h3 mt-0 mb-1">Outcome status vocabulary</h2>
                <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  Every case study closes with exactly one of these statuses. The
                  convention: a pending outcome is stated in a defined term, never
                  upgraded, never estimated — the same discipline as the evidence
                  grades (confirmed / indicative / hypothesis / untested) the IBS
                  research applies to its findings.
                </p>
                <ul className="space-y-3 m-0 p-0 list-none">
                  {Object.entries(ADOPTION_META).map(([key, meta]) => (
                    <li key={key} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <Badge tone={meta.tone}>{t(meta.labelKey)}</Badge>
                      <span className="type-body" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                        {t(meta.defKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h2 className="type-h3 mt-0 mb-1">Surfaces &amp; imagery</h2>
                <p className="type-body mt-0 mb-5" style={{ fontSize: "var(--fs-sm)", color: "var(--text-dim)" }}>
                  Cards use 12px radius; paper sheets, photo frames and project rows stay
                  square-cornered. Every one of those edges is drawn rather than stroked, radius
                  included. Shadows are warm brown-tinted, never gray. Photos sit in a
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

          <DSSection id="motion">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {MOTION_RULES.map((r) => <RuleRow key={r.name} {...r} />)}
            </motion.div>
          </DSSection>

            <DSSection id="icons">
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <motion.p variants={fadeUp} className="type-body mt-0 mb-6">
                  No icon fonts, no icon libraries — every glyph below is drawn in the
                  same ~1.6–1.8px nib as the rule-* hairlines: strokes curve where a
                  machine would rule them, ends overshoot, nothing is symmetric, and the
                  ? / ! dots are pen taps, not circles. All paint in{" "}
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>currentColor</code>{" "}
                  and stay <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>aria-hidden</code> —
                  the control carrying one already has its own name.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="grid gap-2.5 mb-10"
                  style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}
                >
                  {GLYPH_SPECIMENS.map(({ name, el, job }) => (
                    <div
                      key={name}
                      className="border rule-frame-r flex flex-col items-center text-center px-3 pt-5 pb-4"
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      <span className="flex h-8 items-center text-text">{el}</span>
                      <code
                        className="block mt-2 mb-1"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--primary-600)" }}
                      >
                        {name}
                      </code>
                      <span className="type-body" style={{ fontSize: "var(--fs-2xs)", color: "var(--text-dim)", lineHeight: 1.5 }}>
                        {job}
                      </span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <RuleRow name="Doodles" value="assets/icons/*.svg via CSS mask" note="Hand-drawn ink marks, tinted with currentColor." />
                  <RuleRow name="Glyphs" value="HandArrow · HandIcons · currentColor" note="The set above — one file, one pen. No Feather paths, no icon font; a new control takes a bench glyph or a newly drawn one, never a pasted library path." />
                  <RuleRow name="Unicode" value="mid-dot separators only" note="Arrows, closes and chevrons are drawn glyphs, not glyphs of the typeface. No emoji, ever." />
                </motion.div>
              </motion.div>
            </DSSection>
          </div>
        </div>
      </div>
    </div>
  );
}