# GEO — being found and quoted correctly by answer engines

Generative Engine Optimization: making sure that when someone asks ChatGPT,
Claude, Perplexity, Gemini or Google's AI Overviews about Sanaz Yazdanjoo — or
about "UX engineers in Germany who do eye-tracking research" — the answer is
accurate, attributed, and links here.

It overlaps with SEO but is not the same job. SEO optimises for a ranked list
of links. GEO optimises for being *read, understood and cited* by a model that
retrieves a handful of sources and paraphrases them. Two consequences run
through everything below:

1. **AI crawlers do not run JavaScript.** GPTBot, ClaudeBot, PerplexityBot and
   CCBot fetch HTML and stop. This site is a client-rendered SPA, so its
   `<body>` is empty until React boots — every word of case-study prose was
   invisible to them.
2. **For a person, the answer is assembled off-site too.** LinkedIn, XING,
   GitHub and any third-party mention are weighted at least as heavily as the
   portfolio itself. Contradictions between them make a model hedge or invent.

---

## ⛔ Blocker: Vercel Attack Challenge Mode (only Sanaz can fix this)

Checked live on 2026-08-29:

```
$ curl -A "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)" \
       -D - -o /dev/null https://yazdanjoo.de/
HTTP/1.1 403 Forbidden
X-Vercel-Mitigated: challenge
```

Every request that cannot solve a JavaScript challenge gets **403** — GPTBot,
ClaudeBot, PerplexityBot, plain `curl`, and `robots.txt` itself. Real browsers
pass because they run the challenge script; crawlers cannot. Vercel waves
through its own verified-bot list (Googlebot by verified IP), but the AI
crawlers are not on it.

**Nothing else in this document matters until this is off.** The markdown
mirrors, the structured data, the sitemap — all of it is behind a 403.

Fix: Vercel dashboard → the project → **Firewall** → turn **Attack Challenge
Mode** off. It is a deliberate toggle, usually switched on during a traffic
spike or an attack and then forgotten. Afterwards, re-run the check above and
expect `HTTP/1.1 200`.

---

## Done — shipped in the build

### Markdown mirrors + `llms.txt` (`scripts/generate-llms.mjs`)

The content gap closed without prerendering the app. After `vite build` and
`generate-meta.mjs`, the build writes plain-markdown mirrors of every content
page into `dist/`:

| URL | Contents |
| --- | --- |
| `/llms.txt` | Index of the site for AI crawlers, in the emerging `llms.txt` convention |
| `/llms-full.txt` | Every page below concatenated — the whole portfolio in one document (~62 KiB) |
| `/about.md`, `/cv.md`, `/voluntary.md` | Profile, experience, education, skills, certifications |
| `/projects/<slug>.md` | Full case-study prose: challenge, methodology, process, results, participant quotes, metrics |

Each mirrored HTML page links its mirror with
`<link rel="alternate" type="text/markdown">`, and `vercel.json` serves `.md`
as `text/plain` so a human clicking the link reads it instead of downloading a
file.

The mirrors are **derived, never written by hand**: they render from
`api/_knowledge.mjs`, the same committed knowledge base the "Ask this
portfolio" assistant answers from, which `generate-chat-knowledge.mjs`
regenerates from `data.json` and `src/projects/*/data.js` on every build. One
source, three consumers — a content edit reaches the site, the assistant and
the mirrors together, and they cannot drift apart.

Each case-study mirror opens with a fact block (role, year, timeline, status,
context, outcome) so the load-bearing facts are extractable without reading
the prose.

### Structured data (`scripts/generate-meta.mjs`)

The single `Person` node became a per-route `@graph`:

- **`Person`** on every route, now with `description`, `email`, `worksFor`,
  `alumniOf` (from the education data), `knowsAbout` (every skill), 
  `knowsLanguage`, and `hasCredential` for degrees and language certificates.
  Given an `@id` so other nodes reference the same entity.
  Language *proficiency* is deliberately not asserted — schema.org has no
  property for it, and paraphrasing is how a C1 quietly becomes a C2.
- **`WebSite`** on `/`, authored and published by the Person.
- **`ProfilePage`** on `/about` with `mainEntity` → the Person. This is the
  page Google prefers to hang a knowledge panel on.
- **`Article` + `BreadcrumbList`** on each case study, with `author` → the
  Person, plus `datePublished`, `keywords` and an `abstract`. This is what
  lets an engine say "she built X" rather than "a page mentions X".

### `robots.txt`

Eleven AI crawlers named explicitly with `Allow: /` rather than left to the
wildcard — the record of a decision, and proof against a host that blocks them
by default.

### Guard (`src/test/geo-crawlability.test.js`)

Fails the build if `robots.txt` starts disallowing anything, if a named
crawler is dropped, or if the generators fall out of order in the build script
(the mirrors must run after `generate-meta`, which would otherwise overwrite
their `<link>` tags).

---

## Next — needs a dashboard login (Sanaz)

1. **Turn off Attack Challenge Mode.** See above. Everything is blocked on it.
2. **Bing Webmaster Tools.** ChatGPT's search retrieves through Bing's index.
   Being in Google alone means being invisible to it. Submit
   `https://yazdanjoo.de/sitemap.xml`.
3. **Google Search Console.** Submit the same sitemap; use the URL Inspection
   tool on `/about` to confirm what Google actually renders.
4. **Baseline the answers.** Before anything propagates, ask ChatGPT,
   Perplexity and Gemini: "Who is Sanaz Yazdanjoo?", "Sanaz Yazdanjoo UX
   engineer", "Wer ist Sanaz Yazdanjoo?" — and save the replies. Re-run
   monthly. Without a baseline there is no way to tell whether any of this
   worked.

---

## Later — worth doing, in rough priority order

**Prerender the route bodies.** The structural version of the fix the markdown
mirrors approximate: render each route's HTML at build time with
`react-dom/server` + `StaticRouter`, so crawlers and humans get the same
document. The build scripts already load app modules through Vite's SSR runner,
so the hard part is done; framer-motion and the browser-only hooks would need
SSR guards. Lower priority now that the mirrors carry the content.

**A short FAQ on `/about` or `/contact`.** Answer engines lift question-shaped
content readily: "What does Sanaz specialise in?", "What is she available
for?", "What did her thesis find?" — with `FAQPage` structured data. Cheap,
and it targets the exact phrasing people type into a chat box.

**Off-site entity consistency.** Weighted heavily for a person, and mostly
already in flight:

- Finish the CV / LinkedIn / XING sync (already tracked from the 2026-08-26
  four-way audit). Inconsistent job titles and dates are what make a model
  hedge.
- A GitHub profile README carrying the same bio and linking here.
- The thesis on Google Scholar or ResearchGate, if a citable version exists.
  An academic record is a strong, independently-verifiable entity anchor.
- One or two articles elsewhere under her own name (LinkedIn, dev.to) linking
  back. Citations from other domains are what surface a person for *topic*
  queries, not just name queries.

**Monitoring.** Vercel logs will show `GPTBot` / `ClaudeBot` / `PerplexityBot`
hits once the challenge is off; rising requests for the `.md` mirrors is the
signal that the mirrors are being read.
