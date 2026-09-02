// Machine-readable content layer for AI crawlers. Runs AFTER `vite build`
// and `generate-meta.mjs`.
//
// The site is a client-rendered SPA, and the crawlers behind answer engines
// (GPTBot, ClaudeBot, PerplexityBot, CCBot) do not execute JavaScript — they
// see the per-route <head> that generate-meta.mjs writes and an empty <body>.
// Every word of case-study prose is invisible to them.
//
// Fix, without prerendering the app: write plain-markdown mirrors of the
// content pages into dist/ (served as static files ahead of the SPA rewrite),
// plus /llms.txt (the llms.txt convention: an index AI crawlers fetch) and
// /llms-full.txt (everything in one document). Each mirrored HTML page gets a
// <link rel="alternate" type="text/markdown"> pointing at its mirror.
//
// Content is NOT written here: it derives from api/_knowledge.mjs, the same
// committed knowledge base the "Ask this portfolio" assistant answers from
// (regenerated earlier in the build by generate-chat-knowledge.mjs). One
// source, three consumers — the mirrors can never drift from the site.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import knowledge from "../api/_knowledge.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

const { profile, projects, voluntary } = knowledge;
const site = profile.contact.website.replace(/\/$/, "");

// ---------------------------------------------------------------- markdown

const heading = (level, text) => `${"#".repeat(level)} ${text}\n\n`;

// Renders any knowledge value into markdown, so a new field added to a
// project's <slug>.data.js shows up in the mirror without touching this script.
function md(value, level = 2) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") {
    return `${value}\n\n`;
  }
  // Booleans are layout/display flags in the source data (prune() drops the
  // ones it knows about); they carry nothing a reader wants.
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) {
      return value.map((v) => `- ${v}`).join("\n") + "\n\n";
    }
    return value.map((v) => md(v, level)).join("");
  }
  // Known object shapes get purpose-built rendering; anything else falls
  // through to key-by-key.
  if ("quote" in value) {
    return `> "${value.quote}"\n> — ${value.attribution ?? ""}\n\n`;
  }
  if ("value" in value && "label" in value) {
    return `- **${value.value}** — ${value.label}\n`;
  }
  if ("phase" in value && "title" in value) {
    let out = `- **${value.phase}: ${value.title}**`;
    if (value.annotation) out += ` — ${value.annotation}`;
    if (value.insight) out += `\n  - Insight: ${value.insight}`;
    return out + "\n";
  }
  if ("body" in value) {
    let out = `${value.body}\n\n`;
    for (const [k, v] of Object.entries(value)) {
      if (k === "body" || k === "adoption") continue;
      out += md(v, level);
    }
    return out;
  }
  return Object.entries(value)
    .map(([k, v]) => heading(level + 1, titleCase(k)) + md(v, level + 1))
    .join("");
}

const titleCase = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

// Blank line between metric/process bullets and the next block: md() emits
// them without a trailing blank line so consecutive bullets stay one list.
const closeList = (s) => (s.endsWith("\n\n") ? s : s + "\n");

// ---------------------------------------------------------------- projects

// Site section order, with the headings the pages use.
const PROJECT_SECTIONS = [
  ["about", "About"],
  ["challenge", "Challenge"],
  ["solution", "Solution"],
  ["design", "Design"],
  ["wireframe", "Wireframes"],
  ["designSystem", "Design System"],
  ["methodology", "Methodology"],
  ["process", "Process"],
  ["results", "Results"],
  ["implications", "Implications"],
  ["verbatims", "Participant Voices"],
  ["metrics", "Key Numbers"],
  ["outcome", "Outcome"],
];

function projectMarkdown(p) {
  let out = heading(1, p.title);
  if (p.tagline) out += `> ${p.tagline}\n\n`;

  // Fact block: the load-bearing facts in one extractable place.
  const facts = [
    ["Case study", `${site}${p.page}`],
    ["Author", `${profile.name} (${profile.role})`],
    ["Role", p.role],
    ["Year", p.year],
    ["Timeline", p.timeline],
    ["Status", p.status === "in-progress" ? "in progress" : p.status],
    ["Context", p.context],
    ["Summary outcome", p.cardOutcome],
  ];
  for (const [label, v] of facts) {
    if (v) out += `- **${label}:** ${v}\n`;
  }
  out += "\n";

  if (p.subtitle) out += `${p.subtitle}\n\n`;

  for (const [key, title] of PROJECT_SECTIONS) {
    if (p[key] == null) continue;
    out += heading(2, title) + closeList(md(p[key]));
  }

  if (p.methods?.length) out += heading(2, "Methods") + md(p.methods);
  if (p.techStack?.length) out += heading(2, "Tech Stack") + md(p.techStack);
  if (p.tags?.length) out += heading(2, "Skills & Topics") + p.tags.join(" · ") + "\n\n";

  return out;
}

// ----------------------------------------------------------------- profile

function aboutMarkdown() {
  const c = profile.contact;
  let out = heading(1, `${profile.name} — ${profile.role}`);
  out += `> ${profile.positioning}\n\n`;
  out += `${profile.profileSummary}\n\n`;

  if (profile.bioParagraphs?.length) {
    out += heading(2, "Bio") + md(profile.bioParagraphs.join("\n\n"));
  }
  if (profile.impactStats?.length) {
    out += heading(2, "At a Glance");
    for (const s of profile.impactStats) out += `- **${s.value}** — ${s.label}\n`;
    out += "\n";
  }
  out += heading(2, "Languages");
  for (const l of profile.languages ?? []) out += `- ${l.name}: ${l.level}\n`;
  out += "\n";

  out += heading(2, "Contact");
  const rows = [
    ["Website", c.website],
    ["Email", c.email],
    ["LinkedIn", c.linkedin],
    ["GitHub", c.github],
    ["Location", c.location],
    ["Timezone", c.timezone],
    ["Availability", c.availability],
  ];
  for (const [label, v] of rows) if (v) out += `- **${label}:** ${v}\n`;
  out += "\n";
  return out;
}

function cvMarkdown() {
  let out = heading(1, `CV — ${profile.name}`);
  out += `${profile.role}. ${profile.positioning}\n\n`;

  out += heading(2, "Experience");
  for (const e of profile.experience ?? []) {
    out += heading(3, `${e.role} — ${e.company} (${e.date})`);
    if (e.impactMetrics?.length) out += md(e.impactMetrics);
    if (e.tasks?.length) out += md(e.tasks);
  }

  out += heading(2, "Education");
  for (const e of profile.education ?? []) {
    out += heading(3, `${e.degree} — ${e.school} (${e.year})`);
    if (e.grade) out += `${e.grade}\n\n`;
    if (e.awards?.length) out += md(e.awards);
  }

  out += heading(2, "Skills");
  for (const [category, list] of Object.entries(profile.skills ?? {})) {
    out += `- **${category}:** ${list.join(", ")}\n`;
  }
  out += "\n";

  out += heading(2, "Certifications & Workshops");
  for (const cert of profile.certifications ?? []) {
    out += `- **${cert.title}** — ${cert.provider} (${cert.year})`;
    if (cert.detail) out += `. ${cert.detail}`;
    out += "\n";
  }
  out += "\n";
  return out;
}

function voluntaryMarkdown() {
  let out = heading(1, `Voluntary Work — ${profile.name}`);
  for (const v of voluntary ?? []) {
    out += heading(2, `${v.title} — ${v.org} (${v.year})`);
    out += md(v.desc);
  }
  return out;
}

// ----------------------------------------------------------------- llms.txt

function llmsIndex() {
  let out = `# ${profile.name}\n\n`;
  out += `> ${profile.positioning} ${profile.profileSummary}\n\n`;
  out += `This site is ${profile.name}'s portfolio (${site}). It is a JavaScript
application; the markdown mirrors below carry the full text content of each
page and are the recommended way to read it. The complete content in a single
document: ${site}/llms-full.txt\n\n`;

  out += `## Profile\n\n`;
  out += `- [About](${site}/about.md): profile summary, languages, and contact details\n`;
  out += `- [CV](${site}/cv.md): experience, education, skills, and certifications\n`;
  out += `- [Voluntary work](${site}/voluntary.md): community and conference involvement\n\n`;

  out += `## Case studies\n\n`;
  for (const p of projects) {
    out += `- [${p.title}](${site}${p.page}.md): ${p.tagline ?? p.subtitle ?? ""}\n`;
  }
  out += `\n## Optional\n\n`;
  out += `- [Sitemap](${site}/sitemap.xml): every route on the site\n`;
  return out;
}

// ------------------------------------------------- <link rel="alternate">

const LINK_RE = /<link rel="alternate" type="text\/markdown"[^>]*>\n?/g;

async function linkMirror(htmlPath, mdUrl) {
  let html;
  try {
    html = await readFile(htmlPath, "utf-8");
  } catch {
    console.warn(`generate-llms: no ${htmlPath} to link from — route removed?`);
    return;
  }
  // Replace-not-stack, like generate-meta: reruns stay idempotent.
  html = html.replace(LINK_RE, "");
  const tag = `<link rel="alternate" type="text/markdown" href="${mdUrl}" title="Markdown version of this page">`;
  if (!html.includes("</head>")) {
    throw new Error(`generate-llms: no </head> in ${htmlPath}`);
  }
  html = html.replace("</head>", `${tag}\n  </head>`);
  await writeFile(htmlPath, html, "utf-8");
}

// --------------------------------------------------------------------- main

async function main() {
  // [dist-relative md path, markdown, html file to link from]
  const pages = [
    ["about.md", aboutMarkdown(), "about.html"],
    ["cv.md", cvMarkdown(), "cv.html"],
    ["voluntary.md", voluntaryMarkdown(), "voluntary.html"],
    ...projects.map((p) => [
      `${p.page.slice(1)}.md`,
      projectMarkdown(p),
      `${p.page.slice(1)}.html`,
    ]),
  ];

  for (const [mdPath, content] of pages) {
    const out = join(DIST, mdPath);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, content, "utf-8");
  }

  await writeFile(join(DIST, "llms.txt"), llmsIndex(), "utf-8");

  const full =
    pages.map(([, content]) => content.trimEnd()).join("\n\n---\n\n") + "\n";
  await writeFile(join(DIST, "llms-full.txt"), full, "utf-8");

  for (const [mdPath, , htmlPath] of pages) {
    await linkMirror(join(DIST, htmlPath), `/${mdPath}`);
  }

  console.log(
    `generate-llms: ${pages.length} markdown mirrors, llms.txt, llms-full.txt (${Math.round(full.length / 1024)} KiB)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
