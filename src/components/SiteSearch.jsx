// Site search: a drawn-glyph trigger in the nav and a centred dialog over a
// scrim, searching pages, case-study cards, and tags (src/utils/searchIndex).
//
// The dialog follows CertificateLightbox's contract (portal to body, z-[100],
// Escape + Tab trap, body-scroll lock, click-scrim-to-close) rather than
// AskPortfolio's anchored popover — a modal takes the page, a FAB shares it.
// The scrim declares `data-corner-cta` so the ASK AI pill parks underneath
// instead of floating over the scrim; see useCornerOccupied for why z-index
// alone can never settle that (the shell/scroll-container layer split).
//
// Keyboard: the input keeps focus the whole time (combobox pattern) —
// ArrowUp/Down move aria-activedescendant, Enter opens the active result,
// Escape closes. Ctrl/Cmd+K toggles the dialog from anywhere.

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { HandSearch } from "./HandIcons";
import { EmptyState } from "./EmptyState";
import { searchSite, MIN_QUERY_LENGTH } from "../utils/searchIndex";
import { EASE } from "../utils/motion";

export const SiteSearch = () => {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const results = useMemo(() => searchSite(query, lang), [query, lang]);
  const groups = useMemo(
    () =>
      [
        { key: "projects", label: t("search.groupProjects"), items: results.projects },
        { key: "pages", label: t("search.groupPages"), items: results.pages },
        { key: "tags", label: t("search.groupTags"), items: results.tags },
      ].filter((g) => g.items.length > 0),
    [results, t]
  );
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const hasQuery = query.trim().length >= MIN_QUERY_LENGTH;

  // A fresh query means a fresh "best match" — never a stale row number.
  const onQueryChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(0);
  };

  // Ctrl/Cmd+K from anywhere. `close` (not bare setOpen(false)) so the query
  // never lingers into the next opening.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (o) {
            setQuery("");
            setActiveIndex(0);
          }
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // While open: autofocus, body-scroll lock, Escape-to-close, Tab trap,
  // focus-return — the CertificateLightbox effect, with the trigger captured
  // up front the way MobileMenu does it (trigger and dialog share a parent).
  useEffect(() => {
    if (!open) return undefined;

    const trigger = triggerRef.current;
    inputRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open, close]);

  // Keep the active row in view. Instant, never smooth — smooth centring
  // inside a scroller is exactly what the iOS oscillation fix banned.
  useEffect(() => {
    if (!open || flat.length === 0) return;
    document
      .getElementById(`${baseId}-opt-${activeIndex}`)
      ?.scrollIntoView?.({ block: "nearest" });
  }, [open, activeIndex, flat.length, baseId]);

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const item = flat[activeIndex];
      if (item?.href) {
        e.preventDefault();
        navigate(item.href);
        close();
      }
    }
  };

  // Wrap the first query token's matches so the eye lands on why a row is
  // here. <mark>'s browser default is a yellow slab — overridden to the
  // AA-safe accent text tone instead.
  const firstToken = query.trim().toLowerCase().split(/\s+/)[0] ?? "";
  const highlight = (text) => {
    if (!firstToken || !text) return text;
    const lower = text.toLowerCase();
    const parts = [];
    let cursor = 0;
    let idx = lower.indexOf(firstToken);
    while (idx !== -1) {
      parts.push(text.slice(cursor, idx));
      parts.push(
        <mark key={idx} className="bg-transparent font-semibold text-primary-600">
          {text.slice(idx, idx + firstToken.length)}
        </mark>
      );
      cursor = idx + firstToken.length;
      idx = lower.indexOf(firstToken, cursor);
    }
    parts.push(text.slice(cursor));
    return parts;
  };

  const countLabel = !hasQuery
    ? ""
    : flat.length === 1
    ? t("search.resultCount.one")
    : t("search.resultCount.many").replace("{count}", String(flat.length));

  let flatIndex = -1;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("search.open")}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="self-center shrink-0 p-s8 -m-s8 text-text hover:text-primary-500
                   transition-colors duration-200 focus-ring"
      >
        <HandSearch className="w-[20px] h-[20px]" />
      </button>

      {open &&
        createPortal(
          <div
            /* data-corner-cta: parks the ASK AI pill while the scrim is up —
               the pill lives at the shell level (z-[80]) and would otherwise
               float over a modal it can't interleave with. */
            data-corner-cta=""
            onClick={close}
            className="fixed inset-0 z-[100] no-print flex items-start justify-center
                       bg-text/70 px-s16 pb-s32 pt-s48 md:pt-s88"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("search.title")}
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: EASE }}
              className="flex max-h-full w-full max-w-xl flex-col rounded-xl border rule-frame-r
                         [--rule-fill-color:var(--bg)] bg-bg shadow-lg"
            >
              {/* The classic box. The drawn frame is the panel's own; inside it
                  the field row carries the house hairline as its baseline. */}
              <div className="flex items-center gap-s12 border-b rule-b px-s16 py-s12">
                <HandSearch aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-dim" />
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded={flat.length > 0}
                  aria-controls={listboxId}
                  aria-activedescendant={
                    flat.length > 0 ? `${baseId}-opt-${activeIndex}` : undefined
                  }
                  aria-autocomplete="list"
                  aria-label={t("search.title")}
                  autoComplete="off"
                  spellCheck="false"
                  value={query}
                  onChange={onQueryChange}
                  onKeyDown={onInputKeyDown}
                  placeholder={t("search.placeholder")}
                  className="min-w-0 flex-1 bg-transparent text-body text-text
                             placeholder:text-dim focus-ring"
                />
                <kbd
                  aria-hidden="true"
                  className="hidden md:inline-block shrink-0 border rule-frame px-s8 py-s3
                             font-mono text-plate text-text-meta"
                >
                  esc
                </kbd>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-s8">
                {!hasQuery ? (
                  <p className="m-0 px-s8 py-s12 text-small text-dim">{t("search.hint")}</p>
                ) : flat.length === 0 ? (
                  <EmptyState title={t("search.empty")}>{t("search.emptyBody")}</EmptyState>
                ) : (
                  <ul id={listboxId} role="listbox" aria-label={t("search.title")} className="m-0 list-none p-0">
                    {groups.map((group) => (
                      <li key={group.key} role="presentation">
                        <div className="px-s8 pb-s3 pt-s12 font-mono text-label uppercase text-text-meta">
                          {group.label}
                        </div>
                        <ul role="group" aria-label={group.label} className="m-0 list-none p-0">
                          {group.items.map((item) => {
                            flatIndex += 1;
                            const i = flatIndex;
                            const active = i === activeIndex;
                            const snippet =
                              item.type === "tag"
                                ? (item.count === 1
                                    ? t("search.tagCount.one")
                                    : t("search.tagCount.many")
                                  ).replace("{count}", String(item.count))
                                : item.snippet;
                            return (
                              <li
                                key={`${item.type}-${item.href}`}
                                id={`${baseId}-opt-${i}`}
                                role="option"
                                aria-selected={active}
                              >
                                <Link
                                  to={item.href}
                                  tabIndex={-1}
                                  onClick={close}
                                  onMouseEnter={() => setActiveIndex(i)}
                                  className={`block rounded-xl px-s8 py-s8 transition-colors duration-200 ${
                                    active ? "bg-muted" : ""
                                  }`}
                                >
                                  <span className="block text-body font-medium text-text">
                                    {highlight(item.title)}
                                  </span>
                                  {snippet && (
                                    <span className="block text-small text-dim line-clamp-2">
                                      {item.type === "tag" ? snippet : highlight(snippet)}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-between gap-s16 border-t rule-t px-s16 py-s8">
                <span aria-hidden="true" className="font-mono text-plate text-text-meta">
                  {t("search.kbdHint")}
                </span>
                <span aria-live="polite" className="font-mono text-plate text-text-meta">
                  {countLabel}
                </span>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
};
