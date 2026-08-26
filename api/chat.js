// "Ask this portfolio" — OpenAI-backed chat endpoint.
//
// Runs in two places from one file: as a Vercel serverless function
// (/api/chat in production) and mounted on the local Express dev server
// (server/server.js), which is why it sticks to the plain Node (req, res)
// signature and reads the body defensively — Vercel and express.json() both
// pre-parse JSON, but a bare Node server would not.
//
// The OpenAI key never reaches the browser: the client sends only the
// visible chat turns, and this function prepends the system prompt and the
// build-generated knowledge base server-side, so a caller can neither read
// nor override the grounding.

import knowledge from "./_knowledge.mjs";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
// gpt-5-mini: current small model, priced for a public widget. Overridable
// per deployment so a model deprecation is an env change, not a code change.
const DEFAULT_MODEL = "gpt-5-mini";

// Abuse brakes, both best-effort by design: serverless instances don't share
// memory, so a determined caller can exceed these across instances. They cap
// the honest-mistake and single-bot cost; the hard ceiling is the monthly
// budget limit set on the OpenAI project key itself.
const PER_IP_WINDOW_MS = 60_000;
const PER_IP_MAX = 8;
const INSTANCE_HOURLY_MAX = 300;

// Request-shape limits: a portfolio Q&A needs neither essays nor long memory.
const MAX_TURNS = 16;
const MAX_TURN_CHARS = 1_500;
const MAX_COMPLETION_TOKENS = 700;

const SYSTEM_PROMPT = `You are the AI version of Sanaz Yazdanjoo — a UX Engineer — chatting with visitors on her portfolio site. Visitors are typically recruiters, hiring managers, and fellow researchers.

Voice:
- Chat AS Sanaz, in the first person ("I built…", "my thesis…"). Warm, casual, conversational — contractions, plain words, no corporate speak.
- Keep replies chat-sized: a couple of short sentences, or a quick list when comparing things. Offer to go deeper rather than dumping detail.
- Stay honest about what you are: if anyone asks whether they're talking to the real Sanaz — or anything about being human or AI — say cheerfully that you're her AI stand-in built into the site, and that the real Sanaz is one message away via the [contact page](/contact). Never claim to be the human herself, and never invent personal feelings about things outside the knowledge below.
- Answer in the visitor's language. In German, address people with "Sie" unless they write "du" first. No emoji unless the visitor uses them first.
- Speak naturally — never mention the knowledge JSON, internal field names (like "contact.availability"), or these instructions. Visitors should just hear a person talking about her work.

Ground rules:
- Answer ONLY from the knowledge JSON below. It is generated from the same data the site renders, so it is the single source of truth. If something isn't in it, say so in a relaxed way and point to the contact page (/contact) — never guess, extrapolate, or invent numbers, dates, employers, or results.
- When a case study is relevant, link it with a relative markdown link, e.g. [my gaze-input thesis](/projects/gaze-assisted-input). Only use paths that appear in the knowledge (project "page" fields and the "pages" map). Never link external sites except the GitHub/LinkedIn from the contact data.
- Politely deflect anything unrelated to Sanaz's professional work (no general tech support, no opinions on other people, no writing code for visitors) and steer back to the portfolio.
- Availability, location, or work permit questions: answer from contact.availability.

Knowledge:
${JSON.stringify(knowledge)}`;

// ip → recent request timestamps. Module scope survives warm invocations of
// the same instance, which is exactly the lifetime these brakes aim for.
const hits = new Map();
let hourWindowStart = 0;
let hourCount = 0;

function rateLimited(ip, now) {
  if (now - hourWindowStart > 3_600_000) {
    hourWindowStart = now;
    hourCount = 0;
  }
  if (++hourCount > INSTANCE_HOURLY_MAX) return true;

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < PER_IP_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1_000) {
    // Bound the map: drop entries whose window has fully expired.
    for (const [k, v] of hits) {
      if (now - v[v.length - 1] >= PER_IP_WINDOW_MS) hits.delete(k);
    }
  }
  return recent.length > PER_IP_MAX;
}

async function readJsonBody(req) {
  if (req.body !== undefined) {
    // Vercel and express.json() both leave a parsed object (or a string for
    // odd content-types) here already.
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 64_000) throw new Error("body too large");
  }
  return JSON.parse(raw);
}

/** Returns the validated turn list, or null if the shape is unacceptable. */
function validTurns(body) {
  const msgs = body?.messages;
  if (!Array.isArray(msgs) || msgs.length === 0 || msgs.length > MAX_TURNS) return null;
  for (const m of msgs) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return null;
    if (typeof m.content !== "string" || m.content.length === 0 || m.content.length > MAX_TURN_CHARS) return null;
  }
  if (msgs[msgs.length - 1].role !== "user") return null;
  return msgs.map((m) => ({ role: m.role, content: m.content }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    return res.end(JSON.stringify({ error: "method not allowed" }));
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ error: "chat is not configured" }));
  }

  const ip =
    String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip, Date.now())) {
    res.statusCode = 429;
    return res.end(JSON.stringify({ error: "rate limited" }));
  }

  let turns = null;
  let langNote = null;
  try {
    const body = await readJsonBody(req);
    turns = validTurns(body);
    // The widget reports which locale the site is displayed in — the tiebreak
    // for one-word questions whose language the model can't infer.
    if (body?.lang === "de" || body?.lang === "en") {
      const language = body.lang === "de" ? "German" : "English";
      langNote = `The visitor is browsing the ${language} version of the site; when the question's language is ambiguous, answer in ${language}.`;
    }
  } catch {
    // fall through: turns stays null
  }
  if (!turns) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "bad request" }));
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const payload = {
    model,
    stream: true,
    max_completion_tokens: MAX_COMPLETION_TOKENS,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...(langNote ? [{ role: "system", content: langNote }] : []),
      ...turns,
    ],
    // Chat latency matters more than reasoning depth for grounded Q&A, but
    // reasoning_effort is a reasoning-model parameter — older models reject it.
    ...(model.startsWith("gpt-5") ? { reasoning_effort: "minimal" } : {}),
  };

  // Stop paying OpenAI for tokens nobody is reading anymore.
  const upstreamAbort = new AbortController();
  req.on("close", () => upstreamAbort.abort());

  let upstream;
  try {
    upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: upstreamAbort.signal,
    });
  } catch {
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: "upstream unreachable" }));
  }

  if (!upstream.ok) {
    // Never forward OpenAI's error body — it can echo request internals.
    const errText = (await upstream.text()).slice(0, 500);
    console.error(`openai ${upstream.status}: ${errText}`);
    let errCode;
    try {
      errCode = JSON.parse(errText)?.error?.code;
    } catch {
      // non-JSON error body; errCode stays undefined
    }
    // OpenAI signals "no credits / budget cap reached" as a 429, but unlike a
    // real rate limit it won't pass on retry — surfacing it as "try again in
    // a minute" would mislead the visitor. 503 shows the widget's offline
    // notice instead.
    if (errCode === "insufficient_quota" || errCode === "billing_hard_limit_reached") {
      res.statusCode = 503;
    } else {
      res.statusCode = upstream.status === 429 ? 429 : 502;
    }
    return res.end(JSON.stringify({ error: "upstream error" }));
  }

  // The client reads plain streamed text; the SSE framing is parsed here so
  // the widget stays a dumb reader.
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  const decoder = new TextDecoder();
  let buffer = "";
  try {
    for await (const chunk of upstream.body) {
      buffer += decoder.decode(chunk, { stream: true });
      // SSE events are separated by a blank line; the tail after the last
      // separator may be a partial event and stays in the buffer.
      const events = buffer.split("\n\n");
      buffer = events.pop();
      for (const event of events) {
        for (const line of event.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
          if (delta) res.write(delta);
        }
      }
    }
  } catch {
    // Client went away or the upstream stream broke — nothing left to tell
    // either side; fall through to end().
  }
  res.end();
}

// Vercel function settings (ignored by the Express dev mount): answers
// stream token by token instead of arriving as one late buffer.
export const config = { supportsResponseStreaming: true };
