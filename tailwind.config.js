/** @type {import('tailwindcss').Config} */
export default {
  // Enables class-based dark-mode switching
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        // rgb(var(--x-rgb) / <alpha-value>) lets Tailwind's color/NN opacity
        // modifier (e.g. text-text/60) actually work. A bare var(--x) can't
        // be split into channels, so Tailwind silently drops the modifier
        // and renders full-opacity instead — see git history on this file.
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        "muted-surface": "var(--muted-surface)",
        text: "rgb(var(--text-rgb) / <alpha-value>)",
        "text-display": "var(--text-display)",
        dim: "rgb(var(--text-dim-rgb) / <alpha-value>)",
        border: "var(--border)",
        line: "var(--line)",
        ink: "rgb(var(--text-rgb) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary-rgb) / <alpha-value>)",     // #892107 — large text / UI only
          // Hover step for -600 text links: one rung brighter than -600 in
          // both themes, AA-safe on bg/surface/muted. A -600 link must hover
          // to THIS, never to `primary` — in dark, `primary` is the FILL
          // accent and sits under the 4.5:1 text floor.
          500: "rgb(var(--primary-500-rgb) / <alpha-value>)",
          600: "rgb(var(--primary-600-rgb) / <alpha-value>)",     // small-text-safe coral
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary-rgb) / <alpha-value>)",   // #BF5858 rose — large text / UI only
          600: "rgb(var(--secondary-600-rgb) / <alpha-value>)",   // small-text-safe rose
        },
        blush: {
          DEFAULT: "var(--blush)",        // #E1A19A — tints only, never text
          weak: "var(--blush-weak)",      // pale wash for chips / bands
        },
        highlight: {
          DEFAULT: "rgb(var(--highlight-rgb) / <alpha-value>)",   // #D3A22E gold — highlighter only
          weak: "var(--highlight-weak)",
          // Text sitting ON a gold fill is always ink, in both themes — the
          // same pairing .ink-highlight makes. Gold is a background token;
          // this is the only text color allowed to meet it.
          on: "var(--color-ink-900)",
        },
        "print-primary": "var(--print-primary)",
        accent: "var(--accent)",
        spine: "var(--accent-spine)",
        "text-meta": "var(--text-meta)",
        "surface-warm": "var(--surface-warm)",
        peach: "var(--peach)",            // legacy alias → blush wash
        gold: "var(--gold)",              // legacy alias → highlight
        danger: "rgb(var(--danger-rgb) / <alpha-value>)",
        success: "rgb(var(--success-rgb) / <alpha-value>)",
        tn: "var(--tn)",

      
      },
      // 1.5px is the reference's rule weight under the active nav item and
      // under the secondary CTA. 2.6em is the min-height it gives a career
      // arc label so the three years line up whatever the label wraps to.
      borderWidth: {
        rule: "1.5px",
      },
      minHeight: {
        arc: "2.6em",
      },
      aspectRatio: {
        portrait: "4 / 5",
      },
      borderRadius: {
        xl: "var(--radius)",
        "2xl": `calc(var(--radius) * 1.5)`,
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        page: "var(--content-max)",
        wide: "var(--w-wide)",
        doc: "var(--w-doc)",
        measure: "var(--measure, 68ch)",
      },
fontFamily: {
  sans:    "var(--font-family-sans)",
  display: "var(--font-family-display)",
  hand:    "var(--font-family-hand)",
  mono:    "var(--font-family-mono)",
},
/* ── THE TYPE SCALE ──────────────────────────────────────────────────
   One key per role in the design reference, carrying that role's exact
   size, line height and tracking. A component writes text-card-title or
   text-lead; it never writes a size, a leading or a tracking. The legacy
   names at the bottom exist only so the pages this pass does not
   re-render keep compiling, and each is pinned to a role above. */
fontSize: {
  // 11px
  plate:        ["var(--fs-plate)", { lineHeight: "var(--lh-180)", letterSpacing: "var(--ls-10)" }],
  badge:        ["var(--fs-plate)", { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-14)" }],
  // 12px — every mono label
  label:        ["var(--fs-label)", { lineHeight: "var(--lh-170)", letterSpacing: "var(--ls-16)" }],
  meta:         ["var(--fs-label)", { lineHeight: "var(--lh-170)", letterSpacing: "var(--ls-06)" }],
  tag:          ["var(--fs-label)", { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-08)" }],
  num:          ["var(--fs-label)", { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-14)" }],
  years:        ["var(--fs-label)", { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-10)" }],
  date:         ["var(--fs-label)", { lineHeight: "var(--lh-140)" }],
  // 15px
  small:        ["var(--fs-small)", { lineHeight: "var(--lh-160)" }],
  nav:          ["var(--fs-small)", { lineHeight: "var(--lh-140)" }],
  cta:          ["var(--fs-small)", { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-06)" }],
  // 17px
  body:         ["var(--fs-body)", { lineHeight: "var(--lh-160)" }],
  prose:        ["var(--fs-body)", { lineHeight: "var(--lh-165)" }],
  arc:          ["var(--fs-body)", { lineHeight: "var(--lh-130)" }],
  wordmark:     ["var(--fs-body)", { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-wordmark)" }],
  // 19px
  lead:         ["var(--fs-lead)", { lineHeight: "var(--lh-150)" }],
  outcome:      ["var(--fs-lead)", { lineHeight: "var(--lh-155)" }],
  // 21px / 24px — the hero's positioning line and the aside beneath it,
  // and the About bio, which reads at the same step as the positioning line.
  statement:    ["var(--fs-statement)", { lineHeight: "var(--lh-150)" }],
  aside:        ["var(--fs-aside)", { lineHeight: "var(--lh-125)" }],
  "prose-lead": ["var(--fs-lead)", { lineHeight: "var(--lh-165)" }],
  // display sizes
  hand:         ["var(--fs-hand)", { lineHeight: "var(--lh-125)" }],
  "card-title": ["var(--fs-card-title)", { lineHeight: "var(--lh-118)", letterSpacing: "var(--ls-card-title)" }],
  numeral:      ["var(--fs-numeral)", { lineHeight: "var(--lh-100)" }],
  h2:           ["var(--fs-h2)", { lineHeight: "var(--lh-110)", letterSpacing: "var(--ls-h2)" }],
  email:        ["var(--fs-email)", { lineHeight: "var(--lh-110)", letterSpacing: "var(--ls-h2)" }],
  hero:         ["var(--fs-hero)", { lineHeight: "var(--lh-94)", letterSpacing: "var(--ls-hero)" }],

  // Legacy names — pinned to roles above, not to sizes of their own.
  "2xs":     ["var(--fs-plate)",      { lineHeight: "var(--lh-140)", letterSpacing: "var(--ls-16)" }],
  xs:        ["var(--fs-label)",      { lineHeight: "var(--lh-140)" }],
  sm:        ["var(--fs-small)",      { lineHeight: "var(--lh-160)" }],
  base:      ["var(--fs-body)",       { lineHeight: "var(--lh-160)" }],
  lg:        ["var(--fs-lead)",       { lineHeight: "var(--lh-150)" }],
  xl:        ["var(--fs-hand)",       { lineHeight: "var(--lh-125)" }],
  "2xl":     ["var(--fs-card-title)", { lineHeight: "var(--lh-118)" }],
  "3xl":     ["var(--fs-h2)",         { lineHeight: "var(--lh-110)" }],
  "4xl":     ["var(--fs-email)",      { lineHeight: "var(--lh-110)" }],
  display:   ["var(--fs-hero)",       { lineHeight: "var(--lh-94)" }],
  quote:         ["var(--fs-hand)",       { lineHeight: "var(--lh-125)" }],
  metric:        ["var(--fs-numeral)",    { lineHeight: "var(--lh-100)" }],
  "metric-long": ["var(--fs-card-title)", { lineHeight: "var(--lh-118)" }],
},

/* ── THE SPACING SCALE ───────────────────────────────────────────────
   The reference's own set, in its own `s`-prefixed namespace. The prefix
   keeps Tailwind's default numeric spacing intact for the pages this
   pass does not touch, and makes the audit greppable: a homepage padding
   that is not p-sNN is findable with a regex. */
spacing: {
  s2:   "var(--space-2)",
  s3:   "var(--space-3)",
  s5:   "var(--space-5)",
  s6:   "var(--space-6)",
  s8:   "var(--space-8)",
  s10:  "var(--space-10)",
  s12:  "var(--space-12)",
  s15:  "var(--space-15)",
  s16:  "var(--space-16)",
  s20:  "var(--space-20)",
  s24:  "var(--space-24)",
  s26:  "var(--space-26)",
  s28:  "var(--space-28)",
  s32:  "var(--space-32)",
  s48:  "var(--space-48)",
  s56:  "var(--space-56)",
  s72:  "var(--space-72)",
  s88:  "var(--space-88)",
  // Not a rhythm step — a measured column width, see theme.css.
  "timeline-date": "var(--timeline-date)",
},

      // The three tracking tokens, exposed as utilities. Without these the
      // only way to reach --tracking-caps was an arbitrary value, which is
      // how one token ended up spelled eight different ways.
      // Tracking travels with its type role above; these stay only for the
      // pages this pass does not re-render.
      letterSpacing: {
        label: "var(--ls-08)",
        caps: "var(--ls-16)",
        heading: "var(--ls-h2)",
        display: "var(--ls-hero)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,.61,.36,1)",
      },
      backgroundImage: {
        // .webp generated from the bg-paper.png master by
        // scripts/generate-webp.mjs — edit the .png, re-run that script.
        paper: "url('/assets/bg-paper.webp')",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1400px",
        },
      },
      cursor: {
        pen: "url(/assets/icons/pen.svg) 0 32, auto",
      },
    },
  },
  plugins: [],
};