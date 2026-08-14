# yazdanjoo.de

Portfolio and case-study site for Sanaz Yazdanjoo — UX Engineer. React + Vite,
bilingual (EN/DE), deployed on Vercel.

Live: <https://yazdanjoo.de>

## Run

```bash
npm install
npm run dev        # vite dev server, opens a browser
npm run test       # vitest, watch mode
npm run test:run   # vitest, single run
npm run build      # lint → sitemap → content guard → vite build
```

## How content is organised

There is one source of truth for each kind of content, and the build fails
rather than letting them drift.

| What | Where |
|---|---|
| Profile, CV, skills, certifications | `src/data/data.json` → `src/data/profile.js` |
| Voluntary work | `src/data/data.json` → `src/data/voluntary.js` |
| One case study | `src/projects/<slug>/data.js` |
| Career arc ("The Bridge") | `src/data/career.js` (structure) + `src/translations/` (copy) |
| UI strings (EN/DE) | `src/translations/{en,de}.js` |
| Design tokens | `src/styles/theme.css`, surfaced at `/designsystem` |

**Adding a case study:** create `src/projects/<slug>/` with a `data.js` and an
`index.jsx`. Nothing else. `import.meta.glob` discovers the folder at build
time, so the route, the homepage card, the tag pages, and the sitemap all
pick it up with no manual registration. The folder name *is* the URL slug.

**Bilingual fields** are `{ en, de }` objects anywhere in the tree.
`useLocalizedProfile` resolves them recursively, so a page never handles
language itself. A field with only one language present fails the test suite.

**Which language mechanism to use where** — there are two, plus one hybrid,
and the split is by who owns the text:

- **UI strings** (nav labels, buttons, section kickers — anything that belongs
  to the *interface*): flat dot-notation keys in `src/translations/{en,de}.js`,
  resolved with `t("nav.home")` from `useTranslation()`.
- **Content fields** (anything that belongs to the *data* — profile values,
  case-study prose): inline `{ en, de }` objects where the data lives,
  resolved by `useLocalizedProfile`. Language-neutral proper nouns (tool
  names, tech stacks) stay plain strings.
- **The hybrid** (`src/data/career.js`): structure lives in the data file,
  but its fields are translation *keys* (`labelKey`, `summaryKey`) resolved
  at render time — used when a data structure's copy should live with the
  other UI strings.

When adding new text, pick by ownership: interface → translation key,
data → `{ en, de }` object. Don't invent a fourth pattern.

## Build-time guarantees

`npm run build` chains these around Vite (lint and the guards before the
build, `generate-meta` after it), and any of them failing stops the build:

- **`scripts/check-needs-input.mjs`** — a `NEEDS_INPUT` sentinel marks a fact
  that hasn't been supplied yet. It renders as a visible marker in dev and
  refuses to build in production, so a placeholder cannot ship as if it were
  content.
- **`scripts/generate-sitemap.mjs`** — derives `sitemap.xml` from the same
  module the app routes from, so the sitemap cannot list a route that
  doesn't exist.
- **`scripts/generate-meta.mjs`** — writes a static HTML file per route with
  its own title and description, so a link shared to LinkedIn or Slack
  unfurls with that page's metadata rather than the site default.
- **ESLint**, then the Vite build.

The Vitest suite (`src/data/projects.test.js`) enforces the data contract:
`id === slug === folder name`, lowercase slugs, unique routes, bilingual
parity, and that every skill tag carries a `tagEvidence` pointer into the
case-study text that backs it.

## Layout

```
src/
  components/    shared UI
  data/          profile data + the projects aggregator
  pages/         one file per route
  projects/      one folder per case study + ProjectTemplate
  styles/        tokens, fonts
  translations/  en.js / de.js
  test/          vitest suites
scripts/         build-time generators and guards
```

`src/pages/Admin.jsx` is a dev-only content editor backed by a local Express
server (`server/`). It is registered as a route only when `import.meta.env.DEV`
is true and never ships in a production bundle.
