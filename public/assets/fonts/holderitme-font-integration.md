# Holderitme Font Integration Guide

> ⚠️ License: **Freeware, Non-Commercial** (fontspace.com/holderitme-font-f124211)
> Use for decorative headings/accents only. Not for body text.

---

## Step 1 — Place the Font File

Put `Holderitme-nAXLV.ttf` inside your project at:

```
src/
  assets/
    fonts/
      Holderitme-nAXLV.ttf   ← here
```

---

## Step 2 — Register It in Your Global CSS (`index.css`)

```css
@font-face {
  font-family: 'Heading';          /* ← This is the name you use everywhere */
  src: url('./assets/fonts/Holderitme-nAXLV.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;              /* prevents invisible text flash */
}
```

---

## Step 3 — Extend Tailwind Config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Heading', 'Georgia', 'serif'], // fallback chain
      },
    },
  },
  plugins: [],
}
```

Now you can use `font-heading` as a Tailwind class anywhere.

---

## Step 4 — Usage in Components

### In JSX (Tailwind class):
```jsx
// A section title with the custom font
<h1 className="font-heading text-4xl text-primary">
  UX Researcher
</h1>

// Your name in the hero — great use case
<span className="font-heading text-6xl">
  Firstname Lastname
</span>

// Section headings in CV.jsx
<h2 className="font-heading text-2xl text-primary border-b border-primary">
  Experience
</h2>
```

### With Framer Motion (animate on mount):
```jsx
import { motion } from 'framer-motion';

<motion.h1
  className="font-heading text-5xl text-primary"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Your Name
</motion.h1>
```

---

## Step 5 — Print Safety

Since the CV prints to PDF, embed a print fallback in your print CSS so it degrades gracefully if the font doesn't load in a headless browser:

```css
@media print {
  .font-heading, [class*="font-heading"] {
    font-family: 'Heading', Georgia, 'Times New Roman', serif !important;
  }
}
```

---

## Where It Fits in Your Architecture

| Location | Recommended Usage |
|---|---|
| Hero / Homepage name | ✅ Primary — large display size |
| Section headings (`<h2>`) | ✅ Great — adds personality |
| Nav logo text (if text-based) | ✅ Works well at `text-xl` |
| CV section headers | ✅ Use sparingly — max 2–3 instances |
| Body text / paragraphs | ❌ Never — license + readability |
| Skill tags / badges | ❌ Too small, loses character |

---

## profile.js Addition (Optional — Single Source of Truth)

If you want to reference the font name from `profile.js` to keep things systematic:

```js
// profile.js
export const design = {
  fonts: {
    heading: 'Heading',        // maps to font-heading Tailwind class
    body: 'Inter',             // your body font
  },
  colors: {
    primary: '#8B0000',        // your burgundy
  },
}
```

This is optional but consistent with your single-source-of-truth philosophy.
