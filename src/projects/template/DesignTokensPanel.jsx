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
// Semantic roles re-resolve when the visitor's color scheme flips (the
// media listener below), because that is exactly what they do in theme.css;
// the primitives are scheme-independent and simply don't change. In
// environments without the stylesheet (jsdom), values resolve empty and
// render as an em-dash — the token NAMES are still the compact map.

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../context/LanguageContext";

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
  const [resolved, setResolved] = useState({});

  useEffect(() => {
    const read = () => {
      const el = rootRef.current;
      if (!el || typeof getComputedStyle !== "function") return;
      const styles = getComputedStyle(el);
      const next = {};
      for (const name of ALL_TOKENS) next[name] = styles.getPropertyValue(name).trim();
      setResolved(next);
    };
    read();
    // The semantic tier re-resolves with the scheme; re-read when it flips.
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener?.("change", read);
    return () => mq?.removeEventListener?.("change", read);
  }, []);

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
    </div>
  );
}
