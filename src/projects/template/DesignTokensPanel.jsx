// Compact, live view of the design system for the Design System section.
//
// The values are READ, not written: every cell resolves its CSS custom
// property from the live cascade (getComputedStyle on this panel's own
// element) at render time, so the numbers on the page are theme.css's
// numbers by construction. This is deliberately unlike /designsystem's
// swatch data, which mirrors the tokens in JS — here a token edit updates
// the case study with no second file to keep in sync, which is the whole
// claim the section makes.
//
// Semantic roles re-resolve when the theme flips (the effect below re-reads
// on ThemeContext's `theme`, which moves for both the manual toggle and —
// while no manual choice is stored — the OS preference), because that is
// exactly what they do in theme.css; the primitives are theme-independent
// and simply don't change. In environments without the stylesheet (jsdom),
// values resolve empty and render as an em-dash — the token NAMES are still
// the compact map.

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, SolidButton, InkCtaButton, CoralCtaButton } from "../../components/Button";
import { Badge } from "../../components/Badge";
import TagChip from "../../components/TagChip";
import { HandArrow } from "../../components/HandArrow";
import {
  HandMenu, HandClose, HandChevron, HandList, HandGrid, HandMail,
  HandQuestion, HandBang, HandInfo, HandSearch, HandCheck,
  HandPlus, HandMinus, HandDownload, HandSend, HandSpark,
} from "../../components/HandIcons";

const COLOR_PRIMITIVES = [
  "--color-coral-500", "--color-coral-600", "--color-rose-500", "--color-rose-600",
  "--color-blush-300", "--color-gold-500", "--color-ink-900", "--color-ink-600",
  "--color-ink-300", "--color-paper-100", "--color-paper-200", "--color-white",
];

const SEMANTIC_ROLES = [
  "--primary", "--secondary", "--highlight", "--bg",
  "--text", "--text-meta", "--text-dim", "--muted",
];

const FONT_FAMILIES = [
  ["--font-family-display", "display"],
  ["--font-family-sans", "body"],
  ["--font-family-hand", "hand"],
];

const TYPE_SCALE = [
  "--fs-hero", "--fs-h2", "--fs-card-title", "--fs-body", "--fs-small", "--fs-label",
];

const SHAPE_MOTION = [
  "--radius-md", "--timing-smooth", "--content-max", "--gutter", "--section-pad",
];

// The icon tier, rendered from the live components the same way the token
// cells resolve from the live cascade: HandIcons.jsx is the single source,
// so a redrawn path updates this panel with the site it describes. Compact
// view — names and marks only; each glyph's job is documented on
// /design-system and in the HandIcons.jsx header.
const GLYPHS = [
  ["HandArrow", <HandArrow key="a" />],
  ["…up-right", <HandArrow key="b" direction="up-right" />],
  ["…back", <HandArrow key="c" direction="back" />],
  ["HandChevron", <HandChevron key="d" className="h-4 w-4" />],
  ["HandMenu", <HandMenu key="e" className="h-4 w-4" />],
  ["HandClose", <HandClose key="f" className="h-4 w-4" />],
  ["HandList", <HandList key="g" className="h-4 w-4" />],
  ["HandGrid", <HandGrid key="h" className="h-4 w-4" />],
  ["HandMail", <HandMail key="i" className="h-4 w-4" />],
  ["HandDownload", <HandDownload key="j" className="h-4 w-4" />],
  ["HandSend", <HandSend key="k" className="h-4 w-4" />],
  ["HandSpark", <HandSpark key="l" className="h-4 w-4" />],
  ["HandQuestion", <HandQuestion key="m" className="h-4 w-4" />],
  ["HandBang", <HandBang key="n" className="h-4 w-4" />],
  ["HandSearch", <HandSearch key="o" className="h-4 w-4" />],
  ["HandInfo", <HandInfo key="p" className="h-4 w-4" />],
  ["HandCheck", <HandCheck key="q" className="h-4 w-4" />],
  ["HandPlus", <HandPlus key="r" className="h-4 w-4" />],
  ["HandMinus", <HandMinus key="s" className="h-4 w-4" />],
];

const ALL_TOKENS = [
  ...COLOR_PRIMITIVES,
  ...SEMANTIC_ROLES,
  ...FONT_FAMILIES.map(([name]) => name),
  ...TYPE_SCALE,
  ...SHAPE_MOTION,
];

// "DM Sans", "DM Sans Fallback", system-ui, … → DM Sans. The stack is the
// implementation; the face is the fact worth a compact cell.
const firstFamily = (stack) => (stack || "").split(",")[0]?.replace(/["']/g, "").trim();

function GroupLabel({ children }) {
  return (
    <p className="m-0 mb-3 font-mono text-2xs uppercase text-text-meta">{children}</p>
  );
}

function ValueRow({ name, value, swatch }) {
  return (
    <div className="flex items-center gap-3 border-b rule-b py-1.5 min-w-0">
      {swatch && (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 border rule-frame"
          style={{ background: `var(${name})` }}
        />
      )}
      <code className="font-mono text-2xs text-text">{name}</code>
      <span className="ml-auto truncate font-mono text-2xs text-dim" title={value || undefined}>
        {value || "—"}
      </span>
    </div>
  );
}

export function DesignTokensPanel() {
  const { t } = useTranslation();
  const rootRef = useRef(null);
  const { theme } = useTheme();
  const [resolved, setResolved] = useState({});

  // The semantic tier re-resolves with the theme; re-read when it flips.
  // `theme` covers both the manual toggle and, with no stored choice, the
  // OS — a matchMedia listener alone would miss the toggle.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof getComputedStyle !== "function") return;
    const styles = getComputedStyle(el);
    const next = {};
    for (const name of ALL_TOKENS) next[name] = styles.getPropertyValue(name).trim();
    setResolved(next);
  }, [theme]);

  return (
    <div ref={rootRef} data-design-tokens-panel="" className="mt-8 flex flex-col gap-8">
      <p className="m-0 border-l-2 rule-l pl-4 text-sm leading-relaxed text-text-meta">
        {t("project.designSystem.liveNote")}
      </p>

      {/* Color primitives — the raw ramp, scheme-independent */}
      <div>
        <GroupLabel>{t("project.designSystem.groupColors")}</GroupLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {COLOR_PRIMITIVES.map((name) => (
            <div key={name} className="min-w-0">
              <div
                className="h-9 w-full border rule-frame"
                style={{ background: `var(${name})` }}
              />
              <p className="mt-1.5 mb-0 truncate font-mono text-2xs text-text" title={name}>
                {name.replace("--color-", "")}
              </p>
              <p className="m-0 truncate font-mono text-2xs text-dim" title={resolved[name] || undefined}>
                {resolved[name] || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic roles — what components actually consume */}
      <div>
        <GroupLabel>{t("project.designSystem.groupSemantic")}</GroupLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {SEMANTIC_ROLES.map((name) => (
            <ValueRow key={name} name={name} value={resolved[name]} swatch />
          ))}
        </div>
      </div>

      {/* Typography — the three faces, then the scale steps */}
      <div>
        <GroupLabel>{t("project.designSystem.groupType")}</GroupLabel>
        <div className="mb-3">
          {FONT_FAMILIES.map(([name, role]) => (
            <div key={name} className="flex items-baseline gap-3 border-b rule-b py-1.5 min-w-0">
              <span
                aria-hidden="true"
                className="w-8 shrink-0 text-xl leading-none text-text"
                style={{ fontFamily: `var(${name})` }}
              >
                Ag
              </span>
              <code className="font-mono text-2xs text-text">{name}</code>
              <span className="ml-auto truncate font-mono text-2xs text-dim" title={resolved[name] || undefined}>
                {firstFamily(resolved[name]) || `— ${role}`}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {TYPE_SCALE.map((name) => (
            <ValueRow key={name} name={name} value={resolved[name]} />
          ))}
        </div>
      </div>

      {/* Shape, layout & motion */}
      <div>
        <GroupLabel>{t("project.designSystem.groupShape")}</GroupLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {SHAPE_MOTION.map((name) => (
            <ValueRow key={name} name={name} value={resolved[name]} />
          ))}
        </div>
      </div>

      {/* Components — the shipped Button/Badge/TagChip, imported rather than
          redrawn, for the same reason the token cells resolve live: there is
          no second copy to drift. The button labels are the hero's own keys. */}
      <div>
        <GroupLabel>{t("project.designSystem.groupComponents")}</GroupLabel>
        <p className="mt-0 mb-5 text-sm leading-relaxed text-text-meta">
          {t("project.designSystem.componentsNote")}
        </p>
        {/* Labels are each button's real ones: the hero CTA's key, the 404
            CTA's key, the back link Button actually renders on /privacy. */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 mb-6">
          <InkCtaButton type="button">{t("hero.ctaWork")} <HandArrow /></InkCtaButton>
          <CoralCtaButton type="button">{t("notFound.cta")}</CoralCtaButton>
          <SolidButton type="button">{t("hero.ctaCv")}</SolidButton>
          <Button type="button">{t("common.backToPortfolio")}</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge tone="accent">Eye-Tracking</Badge>
          <Badge tone="rose">N=30</Badge>
          <Badge tone="highlight">SUS 85.2</Badge>
          <Badge tone="muted">{t("projects.comingSoon")}</Badge>
        </div>
        <div className="flex flex-wrap items-center">
          <TagChip name="usability-testing" count={4} />
          <TagChip name="mixed-methods" count={3} />
        </div>
      </div>

      {/* Icon glyphs — the drawn set, rendered from the live components */}
      <div>
        <GroupLabel>{t("project.designSystem.groupGlyphs")}</GroupLabel>
        <p className="mt-0 mb-4 text-sm leading-relaxed text-text-meta">
          {t("project.designSystem.glyphsNote")}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {GLYPHS.map(([name, el]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1.5 border rule-frame px-2 pt-3.5 pb-2.5 min-w-0"
            >
              <span className="flex h-5 items-center text-text">{el}</span>
              <code className="max-w-full truncate font-mono text-2xs text-dim" title={name}>
                {name}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
