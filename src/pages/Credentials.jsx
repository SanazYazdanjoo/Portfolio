// Certificate gallery. Reads profile.certifications (never hardcoded here) and
// renders one card per entry. A card's interactive affordance is scoped to its
// thumbnail only (button → lightbox when `file` is set, external link when
// only `verifyUrl` is set) so an <a> is never nested inside a <button> — the
// same constraint ProjectTemplate's collapsible sections enforce elsewhere in
// this codebase. Cards with neither stay fully static.
//
// The topic filter above the grid is client-side only: nothing is re-fetched
// and the page never reloads, the already-loaded list is just re-rendered.
// Selection lives in the URL (?topic=research,design) rather than in local
// state alone, so a filtered view is shareable and the back button undoes it.
// Chips are multi-select with OR semantics; no chip selected means "all".

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { Badge } from "../components/Badge";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const TOPIC_PARAM = "topic";

// Display order of the filter chips. Topics found in the data but missing here
// (e.g. one added later in /admin) are appended after these, so a new topic
// still gets a chip instead of silently dropping out of the filter bar.
const TOPIC_ORDER = [
  "research",
  "strategy",
  "design",
  "accessibility",
  "ai",
  "engineering",
  "academic",
];

function isPdf(path) {
  return typeof path === "string" && path.toLowerCase().endsWith(".pdf");
}

// Newest first. `date` (ISO) is authoritative when present; a year-only entry
// sorts as if it were December, which keeps degrees above the courses that
// share their year without inventing a precise date for them.
function sortKey(cert) {
  if (cert.date) return cert.date;
  return cert.year ? `${cert.year}-12-31` : "0000-00-00";
}

// Stable across filtering — deliberately NOT index-based, so a card that
// survives a filter change is re-positioned by the layout animation instead of
// being torn down and rebuilt.
function certKey(cert) {
  return `${cert.file || ""}|${cert.title}|${cert.year || ""}`;
}

// Alt text for the certificate image/thumbnail. Built from a translated
// template rather than concatenated in English, so a German reader on a
// screen reader hears German around the (untranslated) proper nouns.
function certAltText(t, cert) {
  return t("credentials.imageAlt")
    .replace("{title}", cert.title)
    .replace("{provider}", cert.provider);
}

// Typographic fallback tile: no <img>, so a missing thumb never renders a broken image
function FallbackTile({ title }) {
  const initial = (title || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-blush-weak px-4">
      <span aria-hidden="true" className="font-display text-4xl font-extrabold text-primary-600">
        {initial}
      </span>
      <span className="max-w-full truncate text-center text-2xs font-bold uppercase tracking-widest text-dim">
        {title}
      </span>
    </div>
  );
}

// Filter chip. Multi-select, so no shared layoutId pill (two chips can be
// active at once) — the active state is a solid fill instead.
function FilterChip({ active, label, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 border px-4 py-2 text-2xs font-black uppercase tracking-wider
                  transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600
                  ${
                    active
                      ? "border-primary-600 bg-primary-600 text-white"
                      : "border-border bg-bg text-text/70 hover:border-primary-600 hover:text-primary-600"
                  }`}
    >
      {label}
      <span className={active ? "text-white/70" : "text-text/35"}>{count}</span>
    </button>
  );
}

// Lightbox
function CertificateLightbox({ cert, onClose }) {
  const { t } = useTranslation();
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    };
  }, [onClose]);

  const pdf = isPdf(cert.file);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-text/70 p-4 md:p-10"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-3xl flex-col bg-bg shadow-md"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 id={titleId} className="font-display text-lg font-extrabold text-text">
            {cert.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("credentials.close")}
            className="shrink-0 border border-border px-3 py-1.5 text-2xs font-black uppercase tracking-wider
                       text-text hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            {t("credentials.close")} &#10005;
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-muted/30 p-4">
          {pdf ? (
            <iframe
              src={cert.file}
              title={`${cert.title} — ${cert.provider}`}
              className="h-[70vh] w-full border border-border bg-bg"
            />
          ) : (
            <img
              src={cert.file}
              alt={certAltText(t, cert)}
              className="mx-auto block h-auto max-h-[70vh] w-auto"
            />
          )}
        </div>

        <div className="flex justify-end border-t border-border px-5 py-4">
          <a
            href={cert.file}
            download
            className="border border-primary/40 px-4 py-2 text-2xs font-black uppercase tracking-wider
                       text-primary-600 hover:bg-blush-weak focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            {t("credentials.download")} &#8595;
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Card
function CertificateCard({ cert, index, onOpenFile }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const hasFile = Boolean(cert.file);
  const hasVerify = Boolean(cert.verifyUrl);
  const hasSkills = Array.isArray(cert.skills) && cert.skills.length > 0;
  const altText = certAltText(t, cert);
  const typeLabel = cert.type ? t(`credentials.type.${cert.type}`, cert.type) : null;
  const detail = typeof cert.detail === "string" ? cert.detail : "";

  // A `thumb` path is truthy even when the file behind it is missing, and the
  // SPA rewrite answers a missing asset with index.html rather than a 404 —
  // so the <img> fails to decode and renders as a broken image. onError falls
  // back to the typographic tile the missing-thumb path already uses.
  const [thumbFailed, setThumbFailed] = useState(false);
  const thumbContent = cert.thumb && !thumbFailed ? (
    // object-contain, not -cover: these scans are portrait and landscape in the
    // same grid, and cropping a certificate cuts its heading off.
    <img
      src={cert.thumb}
      alt={altText}
      loading="lazy"
      onError={() => setThumbFailed(true)}
      className="h-full w-full object-contain"
    />
  ) : (
    <FallbackTile title={cert.title} />
  );

  const thumbWrapClasses =
    "block aspect-[4/3] w-full overflow-hidden border-b border-border bg-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-600";
  const thumbInner = (
    <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
      {thumbContent}
    </div>
  );

  let thumbEl;
  if (hasFile) {
    thumbEl = (
      <button
        type="button"
        onClick={(e) => onOpenFile(cert, e.currentTarget)}
        aria-label={`${t("credentials.viewCredential")}: ${cert.title}`}
        className={`group cursor-zoom-in appearance-none border-0 p-0 ${thumbWrapClasses}`}
      >
        {thumbInner}
      </button>
    );
  } else if (hasVerify) {
    thumbEl = (
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("credentials.verify")}: ${cert.title}`}
        className={`group ${thumbWrapClasses}`}
      >
        {thumbInner}
      </a>
    );
  } else {
    thumbEl = <div className={thumbWrapClasses}>{thumbContent}</div>;
  }

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        // Stagger only the first screenful; a filter that reveals 15 cards
        // shouldn't take two seconds to finish drawing.
        delay: prefersReducedMotion ? 0 : Math.min(index, 8) * 0.04,
      }}
      className="flex h-full flex-col border border-border bg-bg"
    >
      {thumbEl}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-extrabold leading-snug text-text">
            {cert.title}
          </h3>
          {typeLabel && (
            <span className="shrink-0">
              <Badge tone="accent">{typeLabel}</Badge>
            </span>
          )}
        </div>

        <p className="text-sm text-text/65">
          {cert.provider}
          {cert.year && <span className="text-text/35"> &middot; {cert.year}</span>}
          {cert.duration && <span className="text-text/35"> &middot; {cert.duration}</span>}
        </p>

        {detail && <p className="text-sm leading-relaxed text-text/55">{detail}</p>}

        {hasSkills && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {cert.skills.map((skill) => (
              <Badge key={skill} tone="muted">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {hasFile && hasVerify && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1 text-2xs font-black uppercase tracking-wider
                       text-primary-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            {t("credentials.verify")} &#8599;
          </a>
        )}
      </div>
    </motion.div>
  );
}

// Page
export default function Credentials() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();
  const { certifications } = profileData;

  useDocumentMeta({
    title: `${t("credentials.heading")} — ${profileData.name}`,
    description: t("credentials.subheading"),
  });

  const [openCert, setOpenCert] = useState(null);
  const triggerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Newest first, independent of the order entries happen to sit in data.json.
  const sorted = useMemo(
    () => [...(certifications || [])].sort((a, b) => sortKey(b).localeCompare(sortKey(a))),
    [certifications]
  );

  // One chip per topic actually present in the data, with its count.
  const topics = useMemo(() => {
    const counts = new Map();
    for (const cert of sorted) {
      if (!cert.topic) continue;
      counts.set(cert.topic, (counts.get(cert.topic) || 0) + 1);
    }
    const known = TOPIC_ORDER.filter((id) => counts.has(id));
    const extra = [...counts.keys()].filter((id) => !TOPIC_ORDER.includes(id)).sort();
    return [...known, ...extra].map((id) => ({ id, count: counts.get(id) }));
  }, [sorted]);

  // The URL is the single source of truth for the selection: no local state to
  // fall out of sync with it, and ?topic=… survives a reload or a shared link.
  const selected = useMemo(() => {
    const raw = searchParams.get(TOPIC_PARAM);
    if (!raw) return [];
    const valid = new Set(topics.map((topic) => topic.id));
    return raw.split(",").filter((id) => valid.has(id));
  }, [searchParams, topics]);

  const setSelected = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams);
      if (next.length === 0) params.delete(TOPIC_PARAM);
      else params.set(TOPIC_PARAM, next.join(","));
      // replace, not push: a filter chip isn't a navigation step, so Back
      // should leave the page rather than walk through every chip toggle.
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const toggleTopic = useCallback(
    (id) =>
      setSelected(
        selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
      ),
    [selected, setSelected]
  );

  // OR semantics: picking two topics widens the result rather than narrowing it
  // to certificates that are somehow both.
  const visible = useMemo(
    () => (selected.length === 0 ? sorted : sorted.filter((c) => selected.includes(c.topic))),
    [sorted, selected]
  );

  const openFile = useCallback((cert, triggerEl) => {
    triggerRef.current = triggerEl || null;
    setOpenCert(cert);
  }, []);

  const closeLightbox = useCallback(() => {
    setOpenCert(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  return (
    <main className="min-h-screen bg-bg pt-20 md:pt-24 pb-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <motion.header
          className="mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-text">
            {t("credentials.heading")}
          </h1>
          <p className="mt-4 text-sm text-text/60">{t("credentials.subheading")}</p>
        </motion.header>

        {sorted.length === 0 ? (
          <p className="text-sm text-text/50">{t("credentials.empty")}</p>
        ) : (
          <>
            {/* Filter bar — centred above the grid */}
            {topics.length > 1 && (
              <div className="mb-10 flex flex-col items-center gap-4">
                <div
                  role="group"
                  aria-label={t("credentials.filter.label")}
                  className="flex flex-wrap items-center justify-center gap-2"
                >
                  <FilterChip
                    active={selected.length === 0}
                    label={t("credentials.filter.all")}
                    count={sorted.length}
                    onClick={() => setSelected([])}
                  />
                  {topics.map((topic) => (
                    <FilterChip
                      key={topic.id}
                      active={selected.includes(topic.id)}
                      label={t(`credentials.topic.${topic.id}`, topic.id)}
                      count={topic.count}
                      onClick={() => toggleTopic(topic.id)}
                    />
                  ))}
                </div>

                <p aria-live="polite" className="text-2xs uppercase tracking-widest text-dim">
                  {t("credentials.showing")
                    .replace("{count}", visible.length)
                    .replace("{total}", sorted.length)}
                </p>
              </div>
            )}

            {visible.length === 0 ? (
              <div className="border border-border/60 px-8 py-16 text-center">
                <p className="text-sm text-text/60">{t("credentials.noMatch")}</p>
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  className="mt-4 border border-primary/40 px-4 py-2 text-2xs font-black uppercase tracking-wider
                             text-primary-600 hover:bg-blush-weak focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                >
                  {t("credentials.reset")}
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visible.map((cert, i) => (
                    <CertificateCard
                      key={certKey(cert)}
                      cert={cert}
                      index={i}
                      onOpenFile={openFile}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>

      {openCert && <CertificateLightbox cert={openCert} onClose={closeLightbox} />}
    </main>
  );
}
