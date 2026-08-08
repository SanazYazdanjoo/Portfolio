// Certificate gallery. Reads profile.certifications (never hardcoded here) and
// renders one card per entry. A card's interactive affordance is scoped to its
// thumbnail only (button → lightbox when `file` is set, external link when
// only `verifyUrl` is set) so an <a> is never nested inside a <button> — the
// same constraint ProjectTemplate's collapsible sections enforce elsewhere in
// this codebase. Cards with neither stay fully static.

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { Badge } from "../components/Badge";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function isPdf(path) {
  return typeof path === "string" && path.toLowerCase().endsWith(".pdf");
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
              alt={`${cert.title} certificate from ${cert.provider}`}
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
  const altText = `${cert.title} certificate from ${cert.provider}`;
  const typeLabel = cert.type ? t(`credentials.type.${cert.type}`, cert.type) : null;

  const thumbContent = cert.thumb ? (
    <img src={cert.thumb} alt={altText} loading="lazy" className="h-full w-full object-cover" />
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
      custom={index}
      variants={fadeUp}
      initial={prefersReducedMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true }}
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
        </p>

        {hasSkills && (
          <div className="mt-1 flex flex-wrap gap-1.5">
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
  const certifications = profileData.certifications || [];

  const [openCert, setOpenCert] = useState(null);
  const triggerRef = useRef(null);

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
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-text">
            {t("credentials.heading")}
          </h1>
          <p className="mt-4 text-sm text-text/60">{t("credentials.subheading")}</p>
        </motion.header>

        {certifications.length === 0 ? (
          <p className="text-sm text-text/50">{t("credentials.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <CertificateCard
                key={`${cert.title}-${i}`}
                cert={cert}
                index={i}
                onOpenFile={openFile}
              />
            ))}
          </div>
        )}
      </div>

      {openCert && <CertificateLightbox cert={openCert} onClose={closeLightbox} />}
    </main>
  );
}
