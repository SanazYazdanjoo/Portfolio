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
        display: ["var(--font-display)"], // Fraunces — actually loads now
        hand: ["var(--font-hand)"],
        sans: ["var(--font-sans)"],
        serif: ["var(--font-display)"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
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