/** @type {import('tailwindcss').Config} */
export default {
  // Keeps your theme switching support
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
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
          DEFAULT: "var(--primary)",
          600: "var(--primary-600)",
        },
        "print-primary": "var(--print-primary)",
        accent: "var(--accent)",
        peach: "var(--peach)",
        gold: "var(--gold)",
        danger: "var(--danger)",
        success: "var(--success)",
      },
      borderRadius: {
        // Uses the radius token from your CV profile
        xl: "var(--radius)",
        "2xl": `calc(var(--radius) * 1.5)`,
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        hand: ["var(--font-hand)"],
        sans: ["var(--font-sans)"],
        serif: ['system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        // Your custom "smooth" curve for interactions
        smooth: "cubic-bezier(.22,.61,.36,1)",
      },
      backgroundImage: {
        paper: "url('/assets/bg-paper.png')",
      },
      container: { 
        center: true, 
        padding: "1.5rem",
        screens: {
          '2xl': '1400px', // Prevents the layout from getting too wide for research case studies
        }
      },
      cursor: {
        // Your custom pen cursor for that hand-drawn feel
        pen: 'url(/assets/icons/pen.svg) 0 32, auto',
      }
    },
  },
  plugins: [],
};