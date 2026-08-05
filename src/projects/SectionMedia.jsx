// src/projects/SectionMedia.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Figure grid for project detail pages — speaks the Quiet Edition language:
//   • border-border frames, no chrome, no color noise
//   • mono micro-type captions (same voice as MetaField / Tech Stack)
//   • `span: 2` for hero figures (full-width charts)
//   • type: "video" → autoplay/loop/muted MP4 demo (your MAGIC & Ninja GIFs,
//     converted to MP4 — ~94% smaller). Falls back to the poster frame when
//     the user prefers reduced motion, and in print.
//   • images are click-to-zoom by default (`zoom: false` opts out). Research
//     diagrams are 1600–1800px wide; inline they are previews, so without a
//     zoom affordance the detail is decorative rather than readable.
//   • optional framing per figure, for artefacts that need explaining rather
//     than just labelling:
//         label       → mono eyebrow above the title
//         title       → short display heading
//         description → what the diagram shows and how to read it
//         takeaway    → the finding, set off by a primary rule so it can be
//                       scanned without the setup
//         takeawayLabel → overrides the default "What it shows"
//     A figure that omits all of them renders exactly as it always did.
//
// Fully additive: projects without a `figures` key render exactly as before.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

// ─── Zoom overlay ────────────────────────────────────────────────────────────
// Rendered through a portal to document.body on purpose: figures sit inside a
// framer-motion section, and a transformed ancestor would otherwise become the
// containing block for `position: fixed` and break the overlay mid-animation.
function ZoomOverlay({ figure, onClose }) {
  const { t } = useTranslation();
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);

    // Freeze background scroll while the overlay owns the viewport.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={figure.alt || t("project.media.enlargedDefault")}
      className="fixed inset-0 z-[100] overflow-auto bg-bg/95 print:hidden"
      onClick={onClose}
    >
      <div className="sticky top-0 flex justify-end p-4">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="border border-border bg-bg px-3 py-1.5 font-mono text-2xs
                     uppercase tracking-wider text-text hover:text-primary-600
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          {t("project.media.close")} &#10005;
        </button>
      </div>

      <div className="px-4 pb-16">
        {/* Stop propagation so clicking the image itself does not dismiss. */}
        <img
          src={figure.src}
          alt={figure.alt}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto block h-auto w-full max-w-[1800px]"
        />
        {figure.caption && (
          <p className="mx-auto mt-4 max-w-3xl text-center font-mono text-2xs
                        uppercase tracking-wider leading-relaxed text-text/45">
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

  // Return focus to the figure that opened the overlay, not to the top of the
  // document — otherwise keyboard users lose their place in a long page.
  const closeZoom = useCallback(() => {
    setZoomed(null);
    triggerRef.current?.focus();
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
        {items.map((f, i) => {
          const isVideo = f.type === "video";
          const canZoom = !isVideo && f.zoom !== false && !!f.src;

          const media = isVideo && !prefersReducedMotion ? (
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
              className={`w-full h-auto block ${f.className || ""}`}
            />
          );

          return (
            <figure
              key={i}
              className={`m-0 ${f.span === 2 ? "sm:col-span-2" : ""}`}
            >
              {/* Optional framing above the image. Any figure that omits these
                  renders exactly as it did before — project-1's charts are
                  unaffected. */}
              {(f.label || f.title || f.description) && (
                <div className="mb-4">
                  {f.label && (
                    <p className="m-0 mb-2 font-mono text-2xs uppercase tracking-[0.2em] text-primary-600">
                      {f.label}
                    </p>
                  )}
                  {f.title && (
                    <h4 className="m-0 mb-2 font-display text-lg md:text-xl font-extrabold tracking-tight text-text">
                      {f.title}
                    </h4>
                  )}
                  {f.description && (
                    <p className="m-0 text-sm md:text-base leading-relaxed text-text/70">
                      {f.description}
                    </p>
                  )}
                </div>
              )}

              <div className="border border-border bg-muted/30 overflow-hidden">
                {canZoom ? (
                  <button
                    type="button"
                    onClick={(e) => { triggerRef.current = e.currentTarget; setZoomed(f); }}
                    aria-label={`${t("project.media.enlarge")}: ${f.alt}`}
                    className="group block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                  >
                    {media}
                  </button>
                ) : (
                  media
                )}

                {/* Print fallback for videos: show the poster frame instead */}
                {isVideo && !prefersReducedMotion && (
                  <img
                    src={f.poster}
                    alt={f.alt}
                    className="w-full h-auto hidden print:block"
                  />
                )}
              </div>

              {f.caption && (
                <figcaption
                  className="mt-2.5 font-mono text-2xs uppercase tracking-wider
                             text-text/45 leading-relaxed"
                >
                  {f.caption}
                  {canZoom && (
                    <span className="ml-2 normal-case tracking-normal text-text/30 print:hidden">
                      &mdash; {t("project.media.clickToEnlarge")}
                    </span>
                  )}
                </figcaption>
              )}

              {/* The "so what". Kept visually distinct from the description so
                  a scanning reader can take the finding without the setup. */}
              {f.takeaway && (
                <div className="mt-4 border-l-2 border-primary-600 pl-4">
                  <p className="m-0 mb-1 font-mono text-2xs uppercase tracking-[0.2em] text-primary-600">
                    {f.takeawayLabel || t("project.media.whatItShows")}
                  </p>
                  <p className="m-0 text-sm leading-relaxed text-text/75">
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
