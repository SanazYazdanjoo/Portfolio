/** @type {import('tailwindcss').Config} */
export default {
  // Keeps your theme switching support
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Linked directly to your theme.css variables
        bg: "var(--bg)",
        panel: "var(--panel)",
        muted: "var(--muted)",
        text: "var(--text)",
        dim: "var(--text-dim)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          600: "var(--primary-600)",
        },
        accent: "var(--accent)",
        peach: "var(--peach)", 
        danger: "var(--danger)",
        success: "var(--success)",
      },
      borderRadius: {
        // Uses the radius token from your CV profile
        xl: "var(--radius)",
        "2xl": `calc(var(--radius) * 1.5)`,
      },
      boxShadow: {
        soft: "var(--shadow)",
      },
      fontFamily: {
        display: ['Holderitme', 'Georgia', 'Times New Roman', 'serif'],
        hand: ['var(--font-hand)'],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        // Your custom "smooth" curve for interactions
        smooth: "cubic-bezier(.22,.61,.36,1)",
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