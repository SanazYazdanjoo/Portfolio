/** @type {import('tailwindcss').Config} */
export default {
  // Keeps your theme switching support
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        "muted-surface": "var(--muted-surface)",
        text: "var(--text)",
        "text-display": "var(--text-display)",
        dim: "var(--text-dim)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        line: "var(--line)",
        primary: {
          DEFAULT: "var(--primary)",      // #E43D12 — large text / UI only
          600: "var(--primary-600)",      // small-text-safe coral
        },
        secondary: {
          DEFAULT: "var(--secondary)",    // #D6536D rose — large text / UI only
          600: "var(--secondary-600)",    // small-text-safe rose
        },
        blush: {
          DEFAULT: "var(--blush)",        // #FFA2B6 — tints only, never text
          weak: "var(--blush-weak)",      // pale wash for chips / bands
        },
        highlight: {
          DEFAULT: "var(--highlight)",    // #EFB11D gold — highlighter only
          weak: "var(--highlight-weak)",
        },
        "print-primary": "var(--print-primary)",
        accent: "var(--accent)",
        peach: "var(--peach)",            // legacy alias → blush wash
        gold: "var(--gold)",              // legacy alias → highlight
        danger: "var(--danger)",
        success: "var(--success)",
      },
      borderRadius: {
        xl: "var(--radius)",
        "2xl": `calc(var(--radius) * 1.5)`,
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
fontFamily: {
  sans:    "var(--font-family-sans)",
  display: "var(--font-family-display)",
  hand:    "var(--font-family-hand)",
  mono:    "var(--font-family-mono)",
},
fontSize: {
  "2xs":     ["var(--text-2xs)",     { lineHeight: "1.4", letterSpacing: "var(--tracking-caps)" }],
  xs:        ["var(--text-xs)",      { lineHeight: "1.5" }],
  sm:        ["var(--text-sm)",      { lineHeight: "1.6" }],
  base:      ["var(--text-base)",    { lineHeight: "var(--leading-body)" }],
  lg:        ["var(--text-lg)",      { lineHeight: "var(--leading-body)" }],
  xl:        ["var(--text-xl)",      { lineHeight: "1.4" }],
  "2xl":     ["var(--text-2xl)",     { lineHeight: "var(--leading-heading)" }],
  "3xl":     ["var(--text-3xl)",     { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)" }],
  "4xl":     ["var(--text-4xl)",     { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)" }],
  display:   ["var(--text-display)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
},
      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,.61,.36,1)",
      },
      backgroundImage: {
        paper: "url('/assets/bg-paper.png')",
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