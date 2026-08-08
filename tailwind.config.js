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
        muted: "var(--muted)",
        "muted-surface": "var(--muted-surface)",
        text: "var(--text)",
        "text-display": "var(--text-display)",
        dim: "var(--text-dim)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        line: "var(--line)",
        ink: 'var(--text)',
        primary: {
          DEFAULT: "var(--primary)",      // #892107 — large text / UI only
          600: "var(--primary-600)",      // small-text-safe coral
        },
        secondary: {
          DEFAULT: "var(--secondary)",    // #BF5858 rose — large text / UI only
          600: "var(--secondary-600)",    // small-text-safe rose
        },
        blush: {
          DEFAULT: "var(--blush)",        // #E1A19A — tints only, never text
          weak: "var(--blush-weak)",      // pale wash for chips / bands
        },
        highlight: {
          DEFAULT: "var(--highlight)",    // #D3A22E gold — highlighter only
          weak: "var(--highlight-weak)",
        },
        "print-primary": "var(--print-primary)",
        accent: "var(--accent)",
        spine: "var(--accent-spine)",
        "text-meta": "var(--text-meta)",
        "surface-warm": "var(--surface-warm)",
        peach: "var(--peach)",            // legacy alias → blush wash
        gold: "var(--gold)",              // legacy alias → highlight
        danger: "var(--danger)",
        success: "var(--success)",
        tn: "var(--tn)", 

      
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
  "2xs":     ["var(--fs-2xs)",     { lineHeight: "1.4", letterSpacing: "var(--tracking-caps)" }],
  xs:        ["var(--fs-xs)",      { lineHeight: "1.5" }],
  sm:        ["var(--fs-sm)",      { lineHeight: "1.6" }],
  base:      ["var(--fs-base)",    { lineHeight: "var(--leading-body)" }],
  lg:        ["var(--fs-lg)",      { lineHeight: "var(--leading-body)" }],
  xl:        ["var(--fs-xl)",      { lineHeight: "1.4" }],
  "2xl":     ["var(--fs-2xl)",     { lineHeight: "var(--leading-heading)" }],
  "3xl":     ["var(--fs-3xl)",     { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)" }],
  "4xl":     ["var(--fs-4xl)",     { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)" }],
  display:   ["var(--fs-display)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
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