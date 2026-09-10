import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { imageDims } from "../utils/imageDims";
import { NeedsInputMarker } from "../components/NeedsInputMarker";
import { HandArrow } from "../components/HandArrow";
import { HandClose } from "../components/HandIcons";
import { isNeedsInput } from "../data/needsInput";

function ZoomOverlay({ figure, onClose }) {
  const { t } = useTranslation();
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;

      const focusable = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={figure.alt || t("project.media.enlargedDefault")}
      tabIndex={-1}
      className="fixed inset-0 z-[100] overflow-auto bg-black/85 md:bg-black/80 md:backdrop-blur-md print:hidden focus-ring"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("project.media.closeLabel")}
        className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full rule-circle rule-circle-lg [--rule-line-color:rgb(255_255_255/0.25)] [--rule-fill-color:rgb(0_0_0/0.7)] text-white shadow-lg transition-colors duration-200 hover:[--rule-line-color:rgb(255_255_255)] hover:[--rule-fill-color:rgb(0_0_0)] focus-ring-light"
      >
        <HandClose className="h-5 w-5" />
      </button>

      <div className="px-4 pb-16 pt-20">
        <img
          src={figure.src}
          alt={figure.alt}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto block h-auto w-full max-w-[1800px]"
        />
        {figure.caption && (
          <p className="mx-auto mt-4 max-w-3xl text-center font-mono text-2xs uppercase leading-relaxed text-white/70">
            {figure.caption}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function SectionMedia({ items }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [zoomed, setZoomed] = useState(null);
  const triggerRef = useRef(null);

  const closeZoom = useCallback(() => {
    setZoomed(null);
    triggerRef.current?.focus();
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div data-section-media="" className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
        {items.map((f, i) => {
          const isVideo = f.type === "video";
          const isEmbed = f.type === "embed";
          const isLink = !!f.href && !isEmbed;
          const needsArtwork =
            f.pending === true ||
            !f.src ||
            isNeedsInput(f.src) ||
            (isVideo && isNeedsInput(f.poster));
          const canZoom =
            !isLink &&
            !isVideo &&
            !isEmbed &&
            f.zoom !== false &&
            !!f.src &&
            !needsArtwork;
          const linkLabel = f.linkLabel || t("project.media.openFullPage");

          const media = needsArtwork ? (
            <div
              role="img"
              aria-label={f.alt}
              className="flex min-h-[160px] flex-col items-center justify-center gap-2 p-8 text-center"
            >
              <span className="font-mono text-2xs uppercase text-text-meta">
                {t("project.media.pending")}
              </span>
              {f.pendingFile && (
                <span className="break-all font-mono text-2xs text-text-meta/70">
                  {f.pendingFile}
                </span>
              )}
              {isNeedsInput(f.src) && <NeedsInputMarker path={`figures[${i}].src`} />}
            </div>
          ) : isEmbed ? (
            <div className="relative w-full aspect-[4/3] sm:aspect-video bg-white print:hidden">
              <iframe
                src={f.src}
                title={f.alt || f.title || "Embedded design"}
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : isVideo && !prefersReducedMotion ? (
            <video
              src={f.src}
              poster={f.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={f.alt}
              className={`w-full h-auto block print:hidden ${f.className || ""}`}
            />
          ) : (
            <img
              src={isVideo ? f.poster : f.src}
              alt={f.alt}
              loading="lazy"
              decoding="async"
              {...imageDims(isVideo ? f.poster : f.src)}
              className={`w-full h-auto block ${f.className || ""}`}
            />
          );

          return (
            <figure
              key={i}
              className={`m-0 ${f.span === 2 ? "sm:col-span-2" : ""} ${
                f.printHidden || needsArtwork || isEmbed ? "print:hidden" : ""
              }`}
            >
              {(f.label || f.title || f.description) && (
                <div className="mb-4">
                  {f.label && (
                    <p className="m-0 mb-2 font-mono text-2xs uppercase text-primary-600">
                      {f.label}
                    </p>
                  )}
                  {f.title && (
                    <h4 className="m-0 mb-2 font-display text-lg md:text-xl font-extrabold tracking-tight text-text">
                      {f.title}
                    </h4>
                  )}
                  {f.description && (
                    <p className="m-0 text-sm md:text-base leading-relaxed text-text-meta">
                      {f.description}
                    </p>
                  )}
                </div>
              )}

              <div
                className={`border rule-frame-in [--rule-fill-color:rgb(var(--muted-rgb)/0.3)] overflow-hidden ${
                  isLink
                    ? "transition-colors duration-200 hover:[--rule-line-color:var(--primary-600)]"
                    : ""
                }`}
              >
                {isLink ? (
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${linkLabel}: ${f.alt}`}
                    className="group relative block focus-ring"
                  >
                    {media}
                    <span
                      aria-hidden="true"
                      data-corner-cta=""
                      className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 border rule-frame [--rule-fill-color:var(--bg)] px-2.5 py-1.5 font-mono text-2xs font-bold uppercase text-text no-print transition-colors duration-200 group-hover:[--rule-line-color:var(--primary-600)] group-hover:text-primary-600"
                    >
                      {linkLabel}
                      <HandArrow direction="up-right" className="w-3 h-3" />
                    </span>
                  </a>
                ) : canZoom ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget;
                      setZoomed(f);
                    }}
                    aria-label={`${t("project.media.enlarge")}: ${f.alt}`}
                    className="group block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 focus-ring"
                  >
                    {media}
                  </button>
                ) : (
                  media
                )}

                {isVideo && !prefersReducedMotion && (
                  <img
                    src={f.poster}
                    alt={f.alt}
                    className="w-full h-auto hidden print:block"
                  />
                )}
              </div>

              {(f.caption || isLink) && (
                <figcaption className="mt-2.5 font-mono text-2xs uppercase text-text-meta leading-relaxed">
                  {f.caption}
                  {canZoom && (
                    <span className="ml-2 normal-case tracking-normal text-text-meta print:hidden">
                      &mdash; {t("project.media.clickToEnlarge")}
                    </span>
                  )}
                  {isLink && (
                    <span className="ml-2 normal-case tracking-normal text-text-meta print:hidden">
                      {f.caption && <>&mdash; </>}
                      {t("project.media.opensNewTab")}
                    </span>
                  )}
                </figcaption>
              )}

              {f.takeaway && (
                <div className="mt-4 border-l-2 rule-edge-l [--rule-line-color:var(--primary-600)] pl-4">
                  <p className="m-0 mb-1 font-mono text-2xs uppercase text-primary-600">
                    {f.takeawayLabel || t("project.media.whatItShows")}
                  </p>
                  <p className="m-0 text-sm leading-relaxed text-text-meta">
                    {f.takeaway}
                  </p>
                </div>
              )}
            </figure>
          );
        })}
      </div>

      {zoomed && <ZoomOverlay figure={zoomed} onClose={closeZoom} />}
    </>
  );
}
