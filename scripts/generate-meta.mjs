// Per-route metadata for link previews. Runs AFTER `vite build`.
//
// The site is a client-rendered SPA behind a catch-all rewrite, so every URL
// used to serve the same dist/index.html — and every link shared to LinkedIn,
// Slack or a recruiter's inbox unfurled with the same site-level title and
// description. `useDocumentMeta` sets the real values, but it runs in the
// browser, and unfurlers don't execute JS.
//
// Fix: copy dist/index.html once per route with that route's <title>,
// description and og:*/twitter:* tags substituted in, written at the path the
// route lives at (/about → dist/about.html). Vercel's `cleanUrls: true` (see
// vercel.json) serves dist/about.html at /about; anything without a generated
// file still falls through to the catch-all rewrite. The React app boots and
// takes over identically either way — this only changes what a crawler that
// never runs the app gets to read.
//
// Route + copy come from the same modules the app and the sitemap use, loaded
// through Vite's SSR runner because projects.js uses import.meta.glob.

import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
// Person enrichment (languages, education, skills, current employer) comes
// from the chat assistant's knowledge base: already English, already pruned,
// regenerated earlier in this same build from the same data.json.
import knowledge from "../api/_knowledge.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Unfurlers truncate well before this; trim on a word boundary so the preview
// never ends mid-word.
function clamp(text, max = 200) {
  const s = String(text ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]$/, "") + "…";
}

// English only: og:locale is en, and a crawler gets one shot at the document.
const en = (v) => (v && typeof v === "object" && "en" in v ? v.en : v);

function render(template, { title, description, url, image, graph }) {
  let html = template;

  const set = (pattern, replacement) => {
    if (!pattern.test(html)) {
      throw new Error(`generate-meta: no match for ${pattern} — index.html changed shape?`);
    }
    html = html.replace(pattern, replacement);
  };

  set(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  set(
    /(<meta\s+name="description"[\s\S]*?content=")[\s\S]*?(")/,
    `$1${escapeHtml(description)}$2`
  );
  set(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeHtml(url)}$2`);
  set(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`);
  set(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapeHtml(description)}$2`
  );
  set(/(<meta property="og:image" content=")[^"]*(")/, `$1${escapeHtml(image)}$2`);
  set(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`);
  set(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapeHtml(description)}$2`
  );
  set(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${escapeHtml(image)}$2`);

  // One combined ld+json graph per route: the Person entity everywhere, plus
  // whatever the route adds (WebSite, ProfilePage, Article + breadcrumb).
  // <-escape so no JSON value can ever close the script element early.
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
  html = html.replace(
    "</head>",
    () => `<script type="application/ld+json">${json}</script>\n  </head>`
  );

  return html;
}

async function main() {
  const server = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { projects } = await server.ssrLoadModule("/src/data/projects.js");
    const { profileData } = await server.ssrLoadModule("/src/data/profile.js");

    const site = profileData.contact.website.replace(/\/$/, "");
    const name = profileData.name;
    const role = en(profileData.role);
    // The generated 1200×630 card (scripts/generate-og-image.mjs), not the
    // raw square portrait — unfurlers crop to ~1.91:1.
    const image = `${site}/og-card.png`;
    let template = await readFile(join(DIST, "index.html"), "utf-8");

    if (!template.includes("</head>")) {
      throw new Error("generate-meta: no </head> in index.html — changed shape?");
    }
    // Strip any ld+json the template already carries before render() injects
    // the per-route graph, so a local rerun against the same dist (the "/"
    // route writes the injected template back to index.html) stays idempotent
    // instead of stacking a second block.
    template = template.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>\n?\s*/g,
      ""
    );

    // schema.org Person, carried by every generated route. The og:* tags above
    // solve link unfurls; this one is for name searches and for answer engines
    // — a crawler that never runs the app sees an empty SPA body, so the entity
    // Google reconciles against LinkedIn/GitHub/XING must be in the static
    // head. It is given an @id so the per-route nodes below can reference the
    // same entity instead of restating it.
    const contact = profileData.contact;
    const [locality, country] = en(contact.location)
      .split(",")
      .map((s) => s.trim());
    const PERSON_ID = `${site}/#person`;

    // knowsAbout / hasCredential / worksFor come from the knowledge base
    // (English, pruned, regenerated earlier in this build) rather than being
    // restated here — same reason the chat assistant reads from it.
    const k = knowledge.profile;
    const knowsAbout = [...new Set(Object.values(k.skills ?? {}).flat())];
    const current = (k.experience ?? []).find((e) => /present/i.test(e.date));
    // Degrees and formal language certificates only. Proficiency levels are
    // deliberately not asserted here: schema.org has no property for them, and
    // paraphrasing a level is exactly how a C1 drifts upward.
    const hasCredential = (k.certifications ?? [])
      .filter((c) => c.type === "degree" || c.type === "language")
      .map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: c.type,
        recognizedBy: { "@type": "Organization", name: c.provider },
        ...(c.year ? { dateCreated: c.year } : {}),
      }));

    const person = {
      "@type": "Person",
      "@id": PERSON_ID,
      name,
      jobTitle: role,
      description: en(profileData.profileSummary),
      url: `${site}/`,
      image: `${site}/assets/me.jpg`,
      email: `mailto:${contact.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressCountry: country,
      },
      alumniOf: (k.education ?? []).map((e) => ({
        "@type": "CollegeOrUniversity",
        name: e.school,
      })),
      ...(current
        ? { worksFor: { "@type": "Organization", name: current.company } }
        : {}),
      knowsAbout,
      knowsLanguage: (k.languages ?? []).map((l) => ({
        "@type": "Language",
        name: l.name,
      })),
      hasCredential,
      sameAs: [contact.linkedin, contact.github, contact.xing].filter(Boolean),
    };

    const website = {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: `${site}/`,
      name: `${name} — ${role}`,
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    };

    // Case studies are works authored by the Person, not just pages: it is the
    // relation that lets an answer engine say "she built X" rather than
    // "a page mentions X".
    const projectGraph = (p) => {
      const full = knowledge.projects.find((kp) => kp.page === p.href) ?? {};
      const url = `${site}${p.href}`;
      return [
        {
          "@type": "Article",
          "@id": `${url}#article`,
          headline: en(p.title),
          description: clamp(en(p.tagline) || en(p.subtitle) || en(p.challenge), 300),
          url,
          inLanguage: "en",
          author: { "@id": PERSON_ID },
          publisher: { "@id": PERSON_ID },
          isPartOf: { "@id": `${site}/#website` },
          ...(full.year ? { datePublished: String(full.year) } : {}),
          ...(full.tags?.length ? { keywords: full.tags.join(", ") } : {}),
          ...(full.about ? { abstract: clamp(full.about, 500) } : {}),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: `${site}/projects` },
            { "@type": "ListItem", position: 3, name: en(p.title), item: url },
          ],
        },
      ];
    };

    // Static routes. Hand-written because there is nothing to derive a good
    // page description from — a nav label is not a description.
    const staticRoutes = [
      ["/about", `About ${name}`, en(profileData.profileSummary)],
      ["/projects", `Case Studies — ${name}`,
        "Case studies in UX research and engineering: controlled experiments, mixed-methods studies, and the interfaces built from them."],
      // "since 2015", not a year-count: a start year cannot drift stale the
      // way a hand-written span did (this line said "eight years" while the
      // hero said "5+" — F3, reconciled 2026-08-24).
      ["/cv", `CV — ${name}`,
        `${role} with an M.Sc. in Human-Computer Interaction. Frontend development, UX research, and QA since 2015.`],
      ["/contact", `Contact — ${name}`, en(profileData.contact.availability)],
      ["/credentials", `Credentials — ${name}`,
        "Degrees, certifications and workshop credentials, with the source documents attached."],
      ["/designsystem", `Design System — ${name}`,
        "The living style guide behind this site: design tokens, type scale, and the contrast rules baked into the token names."],
      ["/voluntary", `Voluntary Work — ${name}`,
        "Community building, mentorship, and conference volunteering alongside the professional work."],
      ["/tags", `Skills & Methods — ${name}`,
        "Every skill tag on this site, each linked to the case-study evidence that backs it."],
      ["/sitemap", `Sitemap — ${name}`,
        "Every route on this site, generated from the same data the app routes from."],
      ["/privacy", `Privacy Policy — ${name}`,
        "How visitor data is handled on this site, in line with the GDPR."],
      ["/impressum", `Impressum — ${name}`,
        "Legal notice and disclosure according to § 5 DDG."],
    ];

    const projectRoutes = projects
      .filter((p) => p.href)
      .map((p) => [
        p.href,
        `${en(p.title)} — ${name}`,
        en(p.tagline) || en(p.subtitle) || en(p.challenge),
        projectGraph(p),
      ]);

    const routes = [
      ["/", `${name} — ${role}`, en(profileData.profileSummary), [website]],
      ...staticRoutes,
      ...projectRoutes,
    ];

    let written = 0;
    for (const [path, title, description, extra = []] of routes) {
      // The Person is on every route; /about is additionally *about* her, which
      // is the page Google prefers to attach a knowledge panel to.
      const graph =
        path === "/about"
          ? [
              person,
              {
                "@type": "ProfilePage",
                url: `${site}/about`,
                mainEntity: { "@id": PERSON_ID },
                isPartOf: { "@id": `${site}/#website` },
              },
              ...extra,
            ]
          : [person, ...extra];

      const html = render(template, {
        title,
        description: clamp(description),
        url: `${site}${path}`,
        image,
        graph,
      });

      // "/" is dist/index.html itself; everything else becomes <path>.html,
      // which cleanUrls serves at the extensionless route.
      const outPath =
        path === "/" ? join(DIST, "index.html") : join(DIST, `${path.slice(1)}.html`);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf-8");
      written += 1;
    }

    console.log(
      `generate-meta: ${written} routes written (${projectRoutes.length} from projects.js)`
    );

    // Build stamp, readable at /version.json. Exists because mobile-cache
    // debugging is otherwise blind: a phone can serve a stale cached build
    // while the laptop shows the new one, and there was no way to tell which
    // build a device was actually looking at. Vercel provides the commit SHA
    // in the build env; local builds fall back to asking git.
    let commit = process.env.VERCEL_GIT_COMMIT_SHA || "";
    if (!commit) {
      try {
        const { execSync } = await import("node:child_process");
        commit = execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim();
      } catch {
        commit = "unknown";
      }
    }
    await writeFile(
      join(DIST, "version.json"),
      JSON.stringify({ commit: commit.slice(0, 7), builtAt: new Date().toISOString() }, null, 2),
      "utf-8"
    );
    console.log(`generate-meta: version.json stamped ${commit.slice(0, 7)}`);
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
