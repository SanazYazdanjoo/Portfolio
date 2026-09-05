// Figure grid for project detail pages. Frames use .rule-frame-in with no
// color chrome; captions are mono micro-type matching MetaField / Tech
// Stack. `span: 2` makes a figure full-width for hero charts. `type:
// "video"` plays an autoplay/loop/muted MP4 (converted from GIFs, roughly
// 94% smaller) and falls back to the poster frame when the user prefers
// reduced motion or in print. Images are click-to-zoom by default (`zoom:
// false` opts out), since the source diagrams are 1600-1800px wide and the
// detail is not readable at inline size without it.
//
// Optional per-figure framing:
//   label         — mono eyebrow above the title
//   title         — short display heading
//   description   — what the diagram shows and how to read it
//   takeaway      — the finding, set off by a rule so it can be scanned
//                   without the setup
//   takeawayLabel — overrides the default "What it shows"
// A figure that omits all of them renders as a plain image. Projects
// without a `figures` key are unaffected.
//
// `pending: true` marks a figure whose artwork has not been exported yet. It
// keeps its framing — label, title and description are already written, and
// are the reason the figure is planned — and says the image is coming, where
// the image will go. Same vocabulary as a `pending` metric, and the same
// reasoning: the honest rendering of something not yet made is a frame that
// says so, not a broken image and not silence. Dropping the entry from the
// data would also "work", and is the thing this codebase keeps having to
// relearn not to do — a planned figure that quietly stops existing is
// indistinguishable from one nobody ever wrote.
//
// Deliberately NOT the NEEDS_INPUT sentinel. That gate fails the production
// build, and it exists so a fabricated *claim* cannot ship; an unexported
// illustration is an absent asset, not a false statement. Using it here cost
// a real deployment (Vercel EqywaKS2H, 20.08.2026) on a page whose prose and
// other figures were entirely intact. isNeedsInput stays wired below purely
// as a crash guard — a Symbol reaching an <img src> is a React error — so a
// data file that does use the sentinel degrades to this same frame.
//
// `href` turns the figure into a preview that opens a standalone page in a
// new tab (the detailed UML and the persona set are full documents that
// need a whole viewport, not a zoom overlay). It replaces zoom rather than
// stacking with it — one click target, one outcome. The page itself lives
// in public/, since files under src/ are bundled, not served. `linkLabel`
// overrides the corner badge text.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { imageDims } from "../utils/imageDims";
import { NeedsInputMarker } from "../components/NeedsInputMarker";
import { HandArrow } from "../components/HandArrow";
import { HandClose } from "../components/HandIcons";
import { isNeedsInput } from "../data/needsInput";

// Zoom overlay. Rendered through a portal to document.body: figures sit
// inside a framer-motion section, and a transformed ancestor would
// otherwise become the containing block for `position: fixed`, breaking
// the overlay mid-animation.
//
// The backdrop is a dark scrim plus a blur, not the page background at 95%
// opacity. The old `bg-bg/95` was the same surface the close button is drawn
// on, so the button dissolved into whatever sat behind it — and on a wide
// figure there is no "behind it" that stays constant while you scroll. A
// scrim that is never the page colour gives every control on top of it one
// predictable ground.
//
// Focus goes to the dialog itself on open — not to the close button, which
// would read the control before the content it belongs to — and is trapped
// inside it until close. SectionMedia returns focus to the triggering figure.
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

      // Focus trap. Everything focusable in here is a button or the image
      // wrapper, so a static query is enough — no mutation observer.
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

    // Freeze background scroll while the overlay owns the viewport.
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
      /* Blur only from md up: a full-screen backdrop-filter over a scrollable
         layer is one of iOS Safari's worst repaint paths. A slightly deeper
         plain scrim does the same job of separating figure from page. */
      className="fixed inset-0 z-[100] overflow-auto bg-black/85 md:bg-black/80 md:backdrop-blur-md
 print:hidden focus-ring"
      onClick={onClose}
    >
      {/* Fixed, not sticky: a sticky header scrolls with the overlay's own
          scroll container and can be pushed off by a tall figure. The close
          control has to be in the same place on the first screen and the
          last. Its own surface + ring, so it reads on any image under it. */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("project.media.closeLabel")}
        className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center
 rounded-full rule-circle rule-circle-lg [--rule-line-color:rgb(255_255_255/0.25)]
 [--rule-fill-color:rgb(0_0_0/0.7)] text-white shadow-lg
 transition-colors duration-200
 hover:[--rule-line-color:rgb(255_255_255)] hover:[--rule-fill-color:rgb(0_0_0)] focus-ring-light"
      >
        <HandClose className="h-5 w-5" />
      </button>

      <div className="px-4 pb-16 pt-20">
        {/* Stop propagation so clicking the image itself does not dismiss. */}
        <img
          src={figure.src}
          alt={figure.alt}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto block h-auto w-full max-w-[1800px]"
        />
        {figure.caption && (
          <p className="mx-auto mt-4 max-w-3xl text-center font-mono text-2xs
                        uppercase leading-relaxed text-white/70">
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
      {/* data-section-media: print hook. The A4 rules in index.css keep
          this grid two-column on paper (pairs print side by side, a
          caption beneath each) and cap figure images at ~100mm tall so a
          portrait photo can't consume a page. */}
      <div data-section-media="" className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
        {items.map((f, i) => {
          const isVideo = f.type === "video";
          const isLink = !!f.href;
          // A figure is pending when the data says so (`pending: true`), or
          // when its file has not been dropped into ./media yet — data files
          // that resolve media by filename (deskbird) get `src: null` back
          // from the glob and name the awaited file in `pendingFile`.
          const needsArtwork =
            f.pending === true ||
            (!isVideo && !f.src) ||
            isNeedsInput(f.src) ||
            isNeedsInput(f.poster);
          const canZoom = !isLink && !isVideo && f.zoom !== false && !!f.src && !needsArtwork;
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
            /* width/height are the image's pixel size (utils/imageDims —
               registered at build time, never typed into the data), and
               they are here for the box, not the size: `w-full h-auto`
               still decides how big the figure renders, while the
               attribute pair gives the browser the aspect ratio to reserve
               that box BEFORE the lazy image arrives. Without them each
               figure landed at height 0 and shoved the page down as it
               loaded — 766px over one phone read of this page. */
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
              /* `printHidden: true` keeps a figure on screen but out of the
                 A4 export — how a 12-image flow gallery prints its lead
                 images only instead of blowing up the PDF. */
              /* A pending figure is likewise off the paper: a dashed frame
                 saying "in preparation" is a screen affordance for the
                 author, not content for the reader of a PDF. */
              className={`m-0 ${f.span === 2 ? "sm:col-span-2" : ""} ${f.printHidden || needsArtwork ? "print:hidden" : ""}`}
            >
              {/* Optional framing above the image; a figure that omits these
                  renders as a plain image. */}
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
                className={`border rule-frame-in [--rule-fill-color:rgb(var(--muted-rgb)/0.3)] overflow-hidden
                            ${isLink ? "transition-colors duration-200 hover:[--rule-line-color:var(--primary-600)]" : ""}`}
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
                      /* useCornerOccupied watches this attribute: while a chip
                         like this occupies the viewport's bottom-right corner,
                         the fixed ASK-AI pill (and, on phones, the prototype
                         badge) parks itself so two tap targets never stack
                         (observed on a reader's recording: pill over "Open the
                         diagram"). */
                      data-corner-cta=""
                      /* No backdrop-blur here on purpose: the fill is already
                         opaque, so the blur painted nothing — while costing
                         iOS a live backdrop re-blur on every scroll frame the
                         figure was in view, which read as the page dragging
                         past the (then sticky) section bar. */
                      className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5
                                 border rule-frame [--rule-fill-color:var(--bg)] px-2.5 py-1.5 font-mono text-2xs font-bold
                                 uppercase text-text no-print
                                 transition-colors duration-200
                                 group-hover:[--rule-line-color:var(--primary-600)] group-hover:text-primary-600"
                    >
                      {linkLabel}
                      <HandArrow direction="up-right" className="w-3 h-3" />
                    </span>
                  </a>
                ) : canZoom ? (
                  <button
                    type="button"
                    onClick={(e) => { triggerRef.current = e.currentTarget; setZoomed(f); }}
                    aria-label={`${t("project.media.enlarge")}: ${f.alt}`}
                    className="group block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 focus-ring"
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

              {(f.caption || isLink) && (
                <figcaption
                  className="mt-2.5 font-mono text-2xs uppercase
                             text-text-meta leading-relaxed"
                >
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

              {/* The "so what". Kept visually distinct from the description so
                  a scanning reader can take the finding without the setup. */}
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
