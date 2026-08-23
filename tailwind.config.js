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
fontSize: {
  "2xs":     ["var(--fs-2xs)",     { lineHeight: "1.4", letterSpacing: "var(--tracking-caps)" }],
  xs:        ["var(--fs-xs)",      { lineHeight: "1.5" }],
  sm:        ["var(--fs-sm)",      { lineHeight: "1.6" }],
  base:      ["var(--fs-base)",    { lineHeight: "var(--leading-body)" }],
  body:      ["var(--fs-body)",    { lineHeight: "var(--leading-body-snug)" }],
  subhead:   ["var(--fs-subhead)", { lineHeight: "1.5" }],
  lg:        ["var(--fs-lg)",      { lineHeight: "var(--leading-body)" }],
  xl:        ["var(--fs-xl)",      { lineHeight: "1.4" }],
  "2xl":     ["var(--fs-2xl)",     { lineHeight: "var(--leading-heading)" }],
  "3xl":     ["var(--fs-3xl)",     { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)" }],
  "4xl":     ["var(--fs-4xl)",     { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)" }],
  display:   ["var(--fs-display)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
  quote:         ["var(--fs-quote)",       { lineHeight: "1.375" }],
  metric:        ["var(--fs-metric)",      { lineHeight: "1" }],
  "metric-long": ["var(--fs-metric-long)", { lineHeight: "1" }],
},
      // The three tracking tokens, exposed as utilities. Without these the
      // only way to reach --tracking-caps was an arbitrary value, which is
      // how one token ended up spelled eight different ways.
      letterSpacing: {
        caps: "var(--tracking-caps)",
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