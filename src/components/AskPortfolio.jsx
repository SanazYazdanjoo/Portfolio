// "Ask this portfolio" — floating AI assistant, grounded in the site's own
// content. The browser talks to /api/chat (a Vercel function in production,
// server/server.js in dev via the Vite proxy); the OpenAI key and the system
// prompt live server-side only. Replies stream in as plain text.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { EASE } from "../utils/motion";

// Turns sent per request; older history is context the answers don't need.
const HISTORY_LIMIT = 12;

// The model is instructed to emit at most **bold** and [text](path) links,
// so the renderer handles exactly that plus "- " bullets — a full markdown
// dependency would be dead weight against three constructs.
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

function renderInline(text, keyBase) {
  const nodes = [];
  let last = 0;
  let i = 0;
  let m;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[1] !== undefined) {
      const [, label, href] = m;
      nodes.push(
        href.startsWith("/") ? (
          <Link key={key} to={href} className="underline decoration-primary-600/60 underline-offset-2 hover:text-primary-600">
            {label}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-primary-600/60 underline-offset-2 hover:text-primary-600">
            {label}
          </a>
        )
      );
    } else {
      nodes.push(<strong key={key} className="font-semibold">{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function AssistantText({ text }) {
  // Consecutive "- " lines fold into one list; everything else is a paragraph.
  const blocks = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const isItem = /^[-*] /.test(trimmed);
    const prev = blocks[blocks.length - 1];
    if (isItem && prev?.type === "ul") prev.items.push(trimmed.slice(2));
    else if (isItem) blocks.push({ type: "ul", items: [trimmed.slice(2)] });
    else blocks.push({ type: "p", text: trimmed });
  }
  return (
    <div className="space-y-s8">
      {blocks.map((b, bi) =>
        b.type === "ul" ? (
          <ul key={bi} className="list-disc pl-s16 space-y-s2">
            {b.items.map((item, ii) => (
              <li key={ii}>{renderInline(item, `${bi}-${ii}`)}</li>
            ))}
          </ul>
        ) : (
          <p key={bi}>{renderInline(b.text, `${bi}`)}</p>
        )
      )}
    </div>
  );
}

const SparkIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M12 3.6c.5 2.9 1.4 5 2.9 6.3 1.2 1 2.9 1.7 5.3 2-2.4.5-4.1 1.2-5.3 2.2-1.4 1.2-2.4 3.2-2.9 6-.6-2.9-1.5-4.9-2.9-6-1.2-1-2.9-1.7-5.2-2.1 2.3-.4 4-1.1 5.2-2.1 1.4-1.3 2.3-3.4 2.9-6.3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export function AskPortfolio() {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | streaming | error
  const [errorKey, setErrorKey] = useState(null);

  const fabRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Follow the stream: keep the newest tokens in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Abandoning the page mid-answer should also stop the upstream tokens.
  useEffect(() => () => abortRef.current?.abort(), []);

  const close = useCallback(() => {
    setOpen(false);
    fabRef.current?.focus();
  }, []);

  const send = useCallback(
    async (raw) => {
      const text = raw.trim();
      if (!text || status === "streaming") return;

      const history = [...messages, { role: "user", content: text }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setStatus("streaming");
      setErrorKey(null);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.slice(-HISTORY_LIMIT), lang }),
          signal: controller.signal,
        });
        if (!res.ok) {
          setMessages(history); // drop the empty assistant bubble
          setErrorKey(
            res.status === 429 ? "chat.errorRate" : res.status === 503 ? "chat.offline" : "chat.error"
          );
          setStatus("error");
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const delta = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = prev.slice();
            const tail = next[next.length - 1];
            next[next.length - 1] = { ...tail, content: tail.content + delta };
            return next;
          });
        }
        setStatus("idle");
      } catch {
        if (controller.signal.aborted) return; // unmount/close, not a failure
        setMessages(history);
        setErrorKey("chat.error");
        setStatus("error");
      } finally {
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [messages, status, lang]
  );

  const streaming = status === "streaming";
  const lastIsEmptyAssistant =
    streaming && messages[messages.length - 1]?.role === "assistant" && !messages[messages.length - 1].content;

  return (
    <div className="fixed bottom-s16 right-s16 z-[80] no-print flex flex-col items-end gap-s8">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={t("chat.title")}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            onKeyDown={(e) => e.key === "Escape" && close()}
            className="w-[min(24rem,calc(100vw-2rem))] h-[min(32rem,calc(100dvh-8rem))]
                       flex flex-col overflow-hidden rounded-xl border border-border bg-bg shadow-lg"
          >
            <header className="flex items-center justify-between gap-s8 border-b rule-b px-s16 py-s8 bg-surface">
              <div className="min-w-0">
                <p className="text-label font-mono uppercase text-primary-600">{t("chat.title")}</p>
                <p className="text-plate font-mono text-dim/80 truncate">{t("chat.subtitle")}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={t("chat.close")}
                className="focus-ring shrink-0 p-s2 text-dim hover:text-text transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M6.4 6.2c3.8 4 7.5 7.8 11.3 11.5M17.5 6.4C13.8 10.2 10 14 6.3 17.7"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div ref={listRef} aria-live="polite" className="flex-1 overflow-y-auto px-s16 py-s12 space-y-s12 text-small text-text">
              {messages.length === 0 && (
                <div className="space-y-s12">
                  <p className="text-dim">{t("chat.intro")}</p>
                  <div className="flex flex-col items-start gap-s6">
                    {["chat.q1", "chat.q2", "chat.q3"].map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => send(t(key))}
                        className="focus-ring text-tag font-mono text-left border border-border rounded-full px-s12 py-s3
                                   hover:border-primary-600 hover:text-primary-600 transition-colors"
                      >
                        {t(key)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-xl border border-border bg-muted-surface px-s12 py-s6 whitespace-pre-wrap">
                      {m.content}
                    </p>
                  </div>
                ) : m.content ? (
                  <AssistantText key={i} text={m.content} />
                ) : null
              )}

              {lastIsEmptyAssistant && (
                <p className="text-tag font-mono text-dim animate-pulse">{t("chat.thinking")}</p>
              )}
              {status === "error" && errorKey && (
                <p role="alert" className="text-tag font-mono text-danger">{t(errorKey)}</p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t rule-b px-s8 pt-s6 pb-s2 flex items-center gap-s6"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                maxLength={1000}
                className="flex-1 min-w-0 bg-transparent text-small px-s8 py-s6 focus:outline-none placeholder:text-dim/60"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label={t("chat.send")}
                className="focus-ring shrink-0 p-s6 text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed
                           hover:scale-110 transition-transform"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M4.8 12.2c4.6-.1 9.2-.1 13.9-.2M13 6.5c2 2 3.9 3.9 5.8 5.6-2 1.9-3.9 3.8-5.7 5.7"
                    stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <p className="px-s16 pb-s6 text-plate font-mono text-dim/80">{t("chat.disclosure")}</p>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={fabRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        className="focus-ring group flex items-center gap-s6 rounded-full border border-border bg-surface
                   px-s16 py-s8 shadow-md hover:border-primary-600 transition-colors"
      >
        <SparkIcon className="h-4 w-4 text-primary-600 transition-transform group-hover:rotate-12" />
        <span className="text-label font-mono uppercase text-text group-hover:text-primary-600 transition-colors">
          {t("chat.fab")}
        </span>
      </button>
    </div>
  );
}
