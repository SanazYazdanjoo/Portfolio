// Build-time snapshots of every public route's rendered body. Runs LAST in
// `npm run build`, after generate-meta.mjs (which writes one HTML file per
// route with that route's <head>) and generate-llms.mjs (which links each
// file to its markdown mirror).
//
// Why: the site is a client-rendered SPA, so every HTML file shipped with
// <div id="root"></div> and nothing else. Search engines that render JS were
// fine; AI fetchers, link-preview scrapers and reader modes — which do not
// run JavaScript — saw no body text at all.
//
// How: serve dist/ with `vite preview`, open each route in headless Chromium,
// wait for the page to render, and copy #root's markup into that route's
// existing HTML file inside a <div data-prerendered> wrapper. The <head> that
// generate-meta wrote is left untouched.
//
// The visual design does not change: index.html marks <html data-js> before
// first paint and hides [data-prerendered], so a visitor with JavaScript sees
// exactly what they saw before (shell → skeleton → page), and React's first
// render replaces the snapshot — it is replaced, never hydrated, so there is
// no hydration-mismatch class of bug to introduce. Only clients without JS
// read it.
//
// Browser: Playwright's own Chromium locally; on Vercel, @sparticuz/chromium
// (a Chromium build that runs on Vercel's Amazon Linux build image, where
// Playwright's browser is missing system libraries). If no browser can be
// launched the build warns loudly and ships without snapshots — the site then
// behaves exactly as before — unless PRERENDER_STRICT=1, which fails the build.
// PRERENDER_CHROMIUM_PATH overrides the executable for local setups whose
// Playwright browser version doesn't match.

import { preview } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const STRICT = process.env.PRERENDER_STRICT === "1";

// A route whose <main> has less readable text than this is treated as a
// failed render (skeleton, error page, chunk that never loaded).
const MIN_MAIN_TEXT = 200;

const START = "<!--prerender-->";
const END = "<!--/prerender-->";
// Matches the empty mount point; inject() strips any earlier snapshot first.
const ROOT_RE = /<div id="root"([^>]*)><\/div>/;

// --------------------------------------------------------------- routes

// Exactly the routes generate-meta wrote files for: same source modules,
// loaded the same way, so the two can't disagree about what exists. Each
// entry is [url path, dist file].
async function listRoutes() {
  const { createServer } = await import("vite");
  const server = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  try {
    const { projects } = await server.ssrLoadModule("/src/data/projects.js");
    const staticPaths = [
      "/about", "/projects", "/cv", "/contact", "/credentials", "/designsystem",
      "/voluntary", "/tags", "/sitemap", "/privacy", "/impressum",
    ];
    const projectPaths = projects.filter((p) => p.href).map((p) => p.href);
    return [
      ["/", "index.html"],
      ...[...staticPaths, ...projectPaths].map((p) => [p, `${p.slice(1)}.html`]),
    ];
  } finally {
    await server.close();
  }
}

// -------------------------------------------------------------- browser

async function launchBrowser() {
  const { chromium } = await import("playwright");
  const attempts = [];

  if (process.env.PRERENDER_CHROMIUM_PATH) {
    attempts.push(["PRERENDER_CHROMIUM_PATH", () =>
      chromium.launch({ executablePath: process.env.PRERENDER_CHROMIUM_PATH })]);
  }
  const sparticuz = async () => {
    const { default: lambda } = await import("@sparticuz/chromium");
    return chromium.launch({
      executablePath: await lambda.executablePath(),
      args: lambda.args,
      headless: true,
    });
  };
  // On Vercel the serverless build first; locally Playwright's own browser.
  if (process.env.VERCEL) attempts.push(["@sparticuz/chromium", sparticuz]);
  attempts.push(["playwright chromium", () => chromium.launch()]);
  if (!process.env.VERCEL && process.platform === "linux") {
    attempts.push(["@sparticuz/chromium", sparticuz]);
  }

  const errors = [];
  for (const [label, launch] of attempts) {
    try {
      const browser = await launch();
      console.log(`prerender: using ${label}`);
      return browser;
    } catch (err) {
      errors.push(`${label}: ${String(err.message).split("\n")[0]}`);
    }
  }
  throw new Error(`no browser could be launched\n  ${errors.join("\n  ")}`);
}

// ------------------------------------------------------------- snapshot

// Runs in the page. Returns #root's markup cleaned up for a reader that
// will never run the app: collapsed sections opened, clamped paragraphs
// unclamped, entrance-animation start states removed.
function snapshotInPage() {
  const root = document.getElementById("root");
  const clone = root.cloneNode(true);

  clone.querySelectorAll("script, [role='status']").forEach((el) => el.remove());

  // Section bodies and "Key insight" bodies: open, visible, readable.
  clone.querySelectorAll("[data-collapsible-body], [data-insight-body]").forEach((el) => {
    el.removeAttribute("aria-hidden");
    el.removeAttribute("inert");
    el.style.gridTemplateRows = "1fr";
    el.style.opacity = "";
    el.style.transition = "";
  });
  // "Read more" paragraphs: full height, no fade.
  clone.querySelectorAll("[data-clamped-text]").forEach((el) => {
    el.style.maxHeight = "";
    el.style.maskImage = "";
    el.style.webkitMaskImage = "";
    el.style.transition = "";
  });
  // framer-motion leaves below-the-fold elements at their `initial` state
  // (opacity 0, translated) until they scroll into view.
  clone.querySelectorAll("[style]").forEach((el) => {
    if (el.style.opacity === "0") el.style.opacity = "";
    if (el.style.transform) el.style.transform = "";
    if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
  });

  const main = clone.querySelector("main");
  return {
    html: clone.innerHTML,
    mainText: (main?.textContent ?? "").replace(/\s+/g, " ").trim().length,
  };
}

async function snapshot(page, url) {
  const res = await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  if (!res || !res.ok()) throw new Error(`HTTP ${res?.status()}`);
  // Rendered = the lazy route chunk replaced the Suspense skeleton (a direct
  // child of <main>; embeds keep role="status" loaders of their own) and <main>
  // carries real text.
  await page.waitForFunction(
    (min) => {
      const main = document.querySelector("main");
      return main && !main.querySelector(":scope > [role='status']") &&
        main.textContent.replace(/\s+/g, " ").trim().length >= min;
    },
    MIN_MAIN_TEXT,
    { timeout: 20_000 }
  );
  // One more idle beat for measure-after-mount effects (ClampedText,
  // FitTitle) to settle before the markup is copied.
  await page.waitForTimeout(150);
  return page.evaluate(snapshotInPage);
}

// ---------------------------------------------------------------- write

function inject(fileHtml, snapshotHtml) {
  if (!ROOT_RE.test(fileHtml)) {
    throw new Error('no empty <div id="root"></div> — index.html changed shape?');
  }
  return fileHtml.replace(
    ROOT_RE,
    (_, attrs) =>
      `<div id="root"${attrs}>${START}<div data-prerendered>${snapshotHtml}</div>${END}</div>`
  );
}

// Strip an earlier snapshot so reruns against the same dist stay idempotent.
const strip = (html) =>
  html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), "");

// ----------------------------------------------------------------- main

async function main() {
  const routes = await listRoutes();

  // Unknown URLs (/tags/<skill>, 404s) are served by vercel.json's catch-all
  // rewrite to /index.html. A text-free `spa.html` shell was tried as the
  // destination (2026-11-24) and broke every such route in production —
  // Vercel answered 404 for the rewrite target alongside cleanUrls — so the
  // fallback stays index.html: its snapshot is hidden from JS visitors, and
  // React renders the right page (or the styled 404) over it.

  let browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    const msg = `prerender: SKIPPED — ${err.message}\n  The site still works; crawlers that don't run JS will see empty bodies.`;
    if (STRICT) throw new Error(msg);
    console.warn(`\n⚠️  ${msg}\n`);
    return;
  }

  const server = await preview({
    root: ROOT,
    logLevel: "error",
    preview: { port: 4317, strictPort: false, open: false },
  });
  const base = server.resolvedUrls.local[0].replace(/\/$/, "");

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      locale: "en-US",
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    // English snapshot regardless of any stored preference.
    await context.addInitScript(() => {
      try { localStorage.setItem("portfolio-lang", "en"); } catch { /* ignore */ }
    });
    // Third parties (consent banner, analytics, fonts CDN) stay out of the
    // snapshot and out of the analytics numbers.
    await context.route("**/*", (route) => {
      const u = new URL(route.request().url());
      return u.origin === new URL(base).origin ? route.continue() : route.abort();
    });
    const page = await context.newPage();

    // Capture everything first, then write: the preview server reads the
    // same files, and every route should render from a clean shell.
    const results = [];
    for (const [path, file] of routes) {
      try {
        const snap = await snapshot(page, `${base}${path}`);
        results.push([path, file, snap]);
      } catch (err) {
        throw new Error(`prerender: ${path} did not render — ${err.message.split("\n")[0]}`);
      }
    }

    for (const [path, file, snap] of results) {
      const out = join(DIST, file);
      let html;
      try {
        html = await readFile(out, "utf-8");
      } catch {
        throw new Error(`prerender: dist/${file} missing — is ${path} still in generate-meta.mjs?`);
      }
      await writeFile(out, inject(strip(html), snap.html), "utf-8");
      console.log(`prerender: ${path.padEnd(48)} ${String(snap.mainText).padStart(6)} chars`);
    }
    console.log(`prerender: ${results.length} routes snapshotted`);
  } finally {
    await browser.close();
    await new Promise((r) => server.httpServer.close(r));
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
