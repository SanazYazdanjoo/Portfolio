// The sticky "the build is live, go press it" badge. This case study is the
// only page that mounts it — it is rendered from this folder's index.jsx,
// beside <ProjectTemplate>, not from the template itself, so no other
// project can inherit it by accident.
//
// Why a floating badge at all: this is the one project on the site with a
// deployed, clickable build behind it. The inline PrototypeLink sits several
// screens down inside a collapsible section, so a reader who never scrolls
// that far never learns the app exists. The badge carries that single fact
// to every scroll position.
//
// The gold-once-per-page rule (see template/PrototypeLink.jsx) still holds,
// and this is not an exception to it: the badge is the *same* call to action
// as the inline link, and it parks itself — animates away entirely — while
// the prototype section is on screen. Only one gold mark is ever visible at
// a time, and when the real one is in view the badge gets out of its way.
//
// Nothing here is outlined or ringed: the shape is a gold blob whose corner
// radii morph continuously, backed by two softer blobs breathing out of
// phase with it. That is the whole attention mechanism — an organic wobble
// rather than pulsing rings, which read as a notification badge.
//
// Gold stays a background token: the eye sitting on the fill is ink
// (text-highlight-on), the hover tooltip is plain surface + shadow rather
// than a second gold shape, and the handwritten nudge outside the badge is
// coral.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";

// Four corner-radius sets the badge melts between. Every keyframe keeps the
// same 8-value `x / y` structure — framer interpolates the numbers inside a
// complex string only while the structure matches, and a shorthand slipped
// in here would snap instead of morph. BLOB[0] doubles as the static shape
// under prefers-reduced-motion, so the badge is never a plain circle.
const BLOB = [
  "58% 42% 61% 39% / 47% 55% 45% 53%",
  "41% 59% 38% 62% / 59% 42% 58% 41%",
  "64% 36% 47% 53% / 39% 63% 37% 61%",
  "58% 42% 61% 39% / 47% 55% 45% 53%",
];

// The backing blobs run their own phase order so the three silhouettes never
// line up — that offset is what makes the edge look like it is breathing
// rather than scaling.
const BLOB_ALT = [BLOB[2], BLOB[0], BLOB[1], BLOB[2]];

// The lid outline, and the clip that keeps the tracking pupil behind it.
// Top and bottom arcs are intentionally not mirrors.
const ALMOND = "M1.9 12.4 C5.8 6.3, 18.4 6, 22.1 12.1 C18.3 18, 5.8 18.3, 1.9 12.4 Z";
const LID_CLIP_ID = "prototype-fab-lid";

const DEFAULT_NOTE = { en: "psst — it's live!", de: "psst — es ist live!" };
const NEW_TAB_HINT = { en: "opens in a new tab", de: "öffnet in einem neuen Tab" };

// One lashed eye, drawn as outline strokes with a deliberately uneven almond
// and no two lashes alike — a compass-perfect eye reads as a stock icon, and
// this page's whole visual language is hand-drawn.
//
// It blinks on a long cycle and its pupil tracks the pointer, so the badge
// registers as something alive in the corner instead of a static sticker.
// That is the "look at this" signal, doing the job the removed pings did,
// without a single border.
function EyeMark({ reduce, pupilX, pupilY, svgRef }) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 24 24"
      className="w-9 h-9 md:w-11 md:h-11 overflow-visible"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduce ? {} : { scaleY: [1, 0.06, 1] }}
        transition={{ duration: 0.42, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }}
      >
        {/* Iris first, clipped to the lid and overdrawn by it: at full
            stretch the pupil would otherwise cross the outline and read as
            a ball sitting on top of the eye rather than behind it. Clip and
            lid share one path, so they stay aligned through the blink. */}
        <defs>
          <clipPath id={LID_CLIP_ID}>
            <path d={ALMOND} />
          </clipPath>
        </defs>
        <motion.g
          clipPath={`url(#${LID_CLIP_ID})`}
          style={reduce ? undefined : { x: pupilX, y: pupilY }}
        >
          <circle cx="12" cy="12.2" r="3.5" />
          <circle cx="12" cy="12.2" r="1.5" fill="currentColor" stroke="none" />
          {/* Glint, punched back out in the badge's own gold rather than
              painted white — the fill has to follow the token into dark
              mode, where --highlight is the lighter gold. */}
          <circle cx="10.9" cy="11.1" r="0.75" fill="var(--highlight)" stroke="none" />
        </motion.g>

        <path d={ALMOND} />

        {/* Four lashes, each rising off the top arc and leaning further
            right as they go outward. Spread across the whole lid rather
            than bunched at the corner: at 44px a corner cluster fuses into
            the almond stroke and reads as a smudge — checked by rendering
            the icon at size, not by eye in the editor. No two are the same
            length or angle, which is the hand-drawn part.
            They live inside the blink group on purpose — lashes belong to
            the lid, so they come down with it. Their tips run past the
            almond, which is why the <svg> is overflow-visible.
            A brow used to sit above this: with lashes in, the two crowded
            each other at icon size and the brow lost. */}
        <g strokeWidth="1.5">
          <path d="M9.2 7.9 C9.0 6.7, 8.8 5.8, 8.6 4.8" />
          <path d="M13 7.55 C13.2 6.3, 13.4 5.3, 13.6 4.2" />
          <path d="M16.9 8.15 C17.4 7.1, 17.9 6.2, 18.3 5.2" />
          <path d="M20.3 9.9 C21.2 9.3, 22.1 8.7, 23 8.1" />
        </g>
      </motion.g>
    </svg>
  );
}

// Hand-drawn arrow running from the note down to the badge.
function NudgeArrow() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="w-7 h-7 shrink-0 translate-y-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 7 C19 11, 27 19, 29.5 32" />
      <path d="M23 28.5 L30 33.5 M33.5 26.5 L30 33.5" />
    </svg>
  );
}

export function PrototypeFab({ href, label, note = DEFAULT_NOTE }) {
  const { localize } = useTranslation();
  const reduce = useReducedMotion();
  const hostRef = useRef(null);
  const eyeRef = useRef(null);
  const [scrolledIn, setScrolledIn] = useState(false);
  const [parked, setParked] = useState(false);

  // Pupil offset, in SVG user units. Motion values rather than state on
  // purpose: pointermove would otherwise re-render this subtree on every
  // frame the pointer is anywhere on the page.
  const pupilTargetX = useMotionValue(0);
  const pupilTargetY = useMotionValue(0);
  const pupilX = useSpring(pupilTargetX, { stiffness: 240, damping: 22, mass: 0.4 });
  const pupilY = useSpring(pupilTargetY, { stiffness: 240, damping: 22, mass: 0.4 });

  // The app scrolls inside a container, not the window (see App.jsx), so both
  // effects below resolve that container the way useScrollProgress does. The
  // wrapper element stays mounted whether or not the badge is showing,
  // precisely so this ref survives the badge's own exit animation.
  useEffect(() => {
    const root = hostRef.current?.closest(".overflow-y-auto");
    if (!root) return;
    // Roughly "past the hero": the badge should not greet a reader who has
    // not started reading, it should catch one who is already in.
    const update = () => setScrolledIn(root.scrollTop > root.clientHeight * 0.6);
    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Park while the prototype section — which holds the inline gold CTA — is
  // anywhere on screen. Missing section, or no IntersectionObserver at all:
  // the badge simply never parks, which degrades to "always available".
  useEffect(() => {
    const section = document.getElementById("prototype");
    if (!section || typeof IntersectionObserver === "undefined") return;
    const root = hostRef.current?.closest(".overflow-y-auto") ?? null;
    const io = new IntersectionObserver(([entry]) => setParked(entry.isIntersecting), {
      root,
      threshold: 0,
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Pupil tracking. Coalesced to one rAF per frame, and the offset saturates
  // over the first ~280px so a pointer crossing the page still moves the eye
  // visibly instead of only registering right next to the badge.
  //
  // Mouse pointers only. `pointermove` covers touch as well, and on a phone
  // dragging IS scrolling — one measured flick fired 70 pointermove events —
  // so without this guard every scroll on mobile ran a getBoundingClientRect
  // (a forced layout read) and drove two springs, for an eye that has no
  // pointer to follow in the first place. The guard sits ahead of the rAF
  // throttle so a touch costs nothing at all, not just one frame's work.
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = eyeRef.current?.getBoundingClientRect();
        if (!box) return;
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, distance / 280);
        pupilTargetX.set((dx / distance) * 2.3 * reach);
        pupilTargetY.set((dy / distance) * 1.7 * reach);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, pupilTargetX, pupilTargetY]);

  if (!href) return null;

  const labelText = localize(label);
  const noteText = localize(note);
  const hintText = localize(NEW_TAB_HINT);
  const visible = scrolledIn && !parked;

  return (
    <div
      ref={hostRef}
      // pointer-events-none on the wrapper so the empty column above the
      // badge never eats clicks meant for the page underneath it.
      className="no-print pointer-events-none fixed bottom-5 right-5 md:bottom-8 md:right-8
                 z-50 flex flex-col items-end gap-1"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="prototype-fab"
            className="pointer-events-auto flex flex-col items-end gap-1"
            initial={{ opacity: 0, scale: 0.3, y: 28, rotate: -22 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 18, rotate: 14 }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 320, damping: 15, mass: 0.7 }
            }
          >
            {/* Handwritten nudge. Decorative, and its message is already in
                the badge's accessible name, so it stays out of the a11y tree. */}
            <motion.span
              aria-hidden="true"
              className="hidden md:flex items-end gap-1 mr-6 select-none font-hand font-bold
                         text-2xl leading-none text-primary-600"
              style={{ transformOrigin: "bottom right" }}
              animate={reduce ? {} : { rotate: [-5, -1.5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {noteText}
              <NudgeArrow />
            </motion.span>

            {/* Bob. Its own element on purpose: framer writes one inline
                transform per element, so the bob, the wiggle and the hover
                scale each need a layer of their own or they overwrite each
                other. */}
            <motion.div
              animate={reduce ? {} : { y: [0, -7, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${labelText} — ${hintText}`}
                className="group flex items-center focus:outline-none"
                whileHover={reduce ? {} : { scale: 1.08 }}
                whileTap={reduce ? {} : { scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Tooltip, collapsed to zero width until hover/focus. The
                    0fr→1fr grid trick animates to intrinsic width without
                    measuring anything — the same mechanism
                    CollapsibleSection uses for height, and it inherits the
                    global prefers-reduced-motion transition kill in
                    theme.css. */}
                <span
                  className="hidden md:grid grid-cols-[0fr] ease-smooth
                             transition-[grid-template-columns] duration-300
                             group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]"
                >
                  <span className="overflow-hidden">
                    <span
                      className="mr-3 flex items-center gap-2 whitespace-nowrap rounded-full
                                 bg-surface px-4 py-2 text-2xs font-black uppercase
                                 tracking-[0.18em] text-text shadow-md opacity-0
                                 transition-opacity duration-200 group-hover:opacity-100
                                 group-focus-visible:opacity-100"
                    >
                      {labelText}
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </span>
                  </span>
                </span>

                <span className="relative grid h-[68px] w-[68px] md:h-[84px] md:w-[84px] place-items-center">
                  {/* Two soft blobs behind the badge, morphing and drifting
                      out of phase with it and with each other. No stroke, no
                      pulse ring: the movement is the attention-getter. */}
                  {!reduce && (
                    <>
                      <motion.span
                        aria-hidden="true"
                        className="absolute -inset-2 bg-highlight opacity-25"
                        style={{ borderRadius: BLOB_ALT[0] }}
                        animate={{ borderRadius: BLOB_ALT, rotate: -360, scale: [1, 1.07, 1] }}
                        transition={{
                          borderRadius: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 26, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                        }}
                      />
                      <motion.span
                        aria-hidden="true"
                        className="absolute -inset-4 bg-highlight opacity-[0.12]"
                        style={{ borderRadius: BLOB[1] }}
                        animate={{ borderRadius: [BLOB[1], BLOB[2], BLOB[0], BLOB[1]], rotate: 360 }}
                        transition={{
                          borderRadius: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 34, repeat: Infinity, ease: "linear" },
                        }}
                      />
                    </>
                  )}

                  {/* The badge itself: gold blob, ink eye. The wiggle every
                      few seconds is the one loop allowed to be a little
                      rude, because a reader deep in a case study is not
                      looking at the corner of their screen. */}
                  <motion.span
                    className="relative grid h-full w-full place-items-center bg-highlight
                               text-highlight-on shadow-md ring-offset-bg
                               group-focus-visible:ring-2 group-focus-visible:ring-primary-600
                               group-focus-visible:ring-offset-2"
                    style={{ borderRadius: BLOB[0] }}
                    animate={reduce ? {} : { borderRadius: BLOB, rotate: [0, -9, 7, -4, 0] }}
                    transition={{
                      borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 0.9, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" },
                    }}
                  >
                    <EyeMark reduce={reduce} pupilX={pupilX} pupilY={pupilY} svgRef={eyeRef} />
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
