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
        page: "var(--w-page)",
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
   Eight steps, each one a token in theme.css. A component writes
   text-h3 or text-body; it never writes a size. The legacy names below
   are kept only so the pages this pass does not re-render keep
   compiling, and every one of them is pinned to a step above — there
   is one set of sizes, two sets of names. */
fontSize: {
  display:   ["var(--fs-display)", { lineHeight: "var(--lh-display)", letterSpacing: "var(--tracking-display)" }],
  h1:        ["var(--fs-h1)",      { lineHeight: "var(--lh-h1)",      letterSpacing: "var(--tracking-display)" }],
  h2:        ["var(--fs-h2)",      { lineHeight: "var(--lh-h2)",      letterSpacing: "var(--tracking-heading)" }],
  h3:        ["var(--fs-h3)",      { lineHeight: "var(--lh-h3)",      letterSpacing: "var(--tracking-heading)" }],
  "body-lg": ["var(--fs-body-lg)", { lineHeight: "var(--lh-body-lg)" }],
  body:      ["var(--fs-body)",    { lineHeight: "var(--lh-body)" }],
  small:     ["var(--fs-small)",   { lineHeight: "var(--lh-small)" }],
  label:     ["var(--fs-label)",   { lineHeight: "var(--lh-label)", letterSpacing: "var(--tracking-label)" }],

  // Legacy names — pinned to the steps above, not to sizes of their own.
  "2xs":     ["var(--fs-label)",   { lineHeight: "var(--lh-label)", letterSpacing: "var(--tracking-caps)" }],
  xs:        ["var(--fs-label)",   { lineHeight: "var(--lh-label)" }],
  sm:        ["var(--fs-small)",   { lineHeight: "var(--lh-small)" }],
  base:      ["var(--fs-body)",    { lineHeight: "var(--lh-body)" }],
  lg:        ["var(--fs-body-lg)", { lineHeight: "var(--lh-body-lg)" }],
  xl:        ["var(--fs-h3)",      { lineHeight: "var(--lh-h3)" }],
  "2xl":     ["var(--fs-h3)",      { lineHeight: "var(--lh-h3)" }],
  "3xl":     ["var(--fs-h2)",      { lineHeight: "var(--lh-h2)" }],
  "4xl":     ["var(--fs-h1)",      { lineHeight: "var(--lh-h1)" }],
  quote:         ["var(--fs-h3)",  { lineHeight: "var(--lh-h3)" }],
  metric:        ["var(--fs-h2)",  { lineHeight: "var(--lh-h2)" }],
  "metric-long": ["var(--fs-h3)",  { lineHeight: "var(--lh-h3)" }],
},

/* ── THE SPACING SCALE ───────────────────────────────────────────────
   Ten steps, deliberately given their own `s`-prefixed namespace rather
   than overriding Tailwind's default numeric spacing: overriding it
   would silently drop every w-6 / h-4 / inset-2 on the pages this pass
   does not touch. The prefix is also what makes the audit greppable —
   a homepage padding that is not p-sNN is a bug you can find with a
   regex. */
spacing: {
  s4:   "var(--space-4)",
  s8:   "var(--space-8)",
  s12:  "var(--space-12)",
  s16:  "var(--space-16)",
  s24:  "var(--space-24)",
  s32:  "var(--space-32)",
  s48:  "var(--space-48)",
  s64:  "var(--space-64)",
  s96:  "var(--space-96)",
  s128: "var(--space-128)",
},

      // The three tracking tokens, exposed as utilities. Without these the
      // only way to reach --tracking-caps was an arbitrary value, which is
      // how one token ended up spelled eight different ways.
      letterSpacing: {
        label: "var(--tracking-label)",   // 0.08em — the only caps tracking
        caps: "var(--tracking-caps)",     // legacy, pages not re-rendered here
        heading: "var(--tracking-heading)",
        display: "var(--tracking-display)",
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