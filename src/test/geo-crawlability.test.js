// Crawlability, enforced.
//
// Answer engines (ChatGPT, Claude, Perplexity, Gemini) read this site through
// crawlers that do not run JavaScript. Two things have to stay true for them
// to see anything at all, and both are edits-in-a-config-file away from
// silently breaking with no visible symptom on the site itself:
//
//   - robots.txt must not disallow the named AI crawlers
//   - the build must still emit the markdown mirrors they read
//
// A third condition lives outside this repo and cannot be tested here: Vercel
// Attack Challenge Mode must stay OFF (it was on until 2026-08-29, 403-ing
// every non-browser client, robots.txt included). See GEO.md.

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(p, "utf-8");

// The crawlers that feed the answer engines, plus the two opt-out tokens
// (Google-Extended, Applebot-Extended) that govern AI use of already-indexed
// pages.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

describe("robots.txt", () => {
  const robots = read("public/robots.txt");

  // Parsed into groups so the assertion reads the file the way a crawler does:
  // a Disallow belongs to whichever User-agent block precedes it.
  const groups = [];
  for (const line of robots.split("\n")) {
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") groups.push({ agents: [value], rules: [] });
    else if (key === "disallow" && groups.length) {
      groups[groups.length - 1].rules.push(value);
    }
  }

  it("disallows nothing, for any agent", () => {
    const blocking = groups.filter((g) => g.rules.some((r) => r !== ""));
    expect(blocking.map((g) => g.agents.join())).toEqual([]);
  });

  it.each(AI_CRAWLERS)("names %s explicitly", (agent) => {
    // Explicit over inherited: several hosts and CDNs block these by default,
    // and a named Allow is the record of the decision not to.
    expect(groups.some((g) => g.agents.includes(agent))).toBe(true);
  });

  it("points at the sitemap", () => {
    expect(robots).toMatch(/^Sitemap: https:\/\/\S+\/sitemap\.xml$/m);
  });
});

describe("build wiring", () => {
  const pkg = JSON.parse(read("package.json"));

  it("generates the markdown mirrors after the HTML they are linked from", () => {
    const build = pkg.scripts.build;
    expect(build).toContain("generate-llms.mjs");
    // generate-meta rewrites every route file from dist/index.html as its
    // template, which would drop the <link rel="alternate"> tags — so the
    // mirrors have to be generated after it, not before.
    expect(build.indexOf("generate-meta.mjs")).toBeLessThan(
      build.indexOf("generate-llms.mjs")
    );
    // The mirrors derive from the chat knowledge base, which must be rebuilt
    // from data.json first or they ship yesterday's content.
    expect(build.indexOf("generate-chat-knowledge.mjs")).toBeLessThan(
      build.indexOf("generate-llms.mjs")
    );
  });
});
