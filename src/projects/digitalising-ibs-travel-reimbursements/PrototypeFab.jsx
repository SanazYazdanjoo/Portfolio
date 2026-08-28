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
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useCornerOccupied } from "../../hooks/useCornerOccupied";
import { HandArrow } from "../../components/HandArrow";

// The badge and its two backing shapes are all cut from `.rule-blob`, the
// same hand-torn silhouette the rest of the site is drawn with. It replaced a
// set of morphing border-radius keyframes: those melted smoothly but read as
// vector-smooth next to every other edge on the page. The movement now comes
// from rotation and scale instead — and because the shape is irregular, a
// slow rotation is visible in a way it never is on a circle.

// The eye, drawn the way it would be drawn: the lid is two separate pen
// strokes rather than one closed almond, and they don't tidy up at the
// corners — the upper stroke runs past the lower one at the inner corner and
// stops short of it at the outer one. The iris is a loop the pen lifted off
// before closing, and the pupil is an uneven blob. A symmetrical almond with
// a compass-perfect iris was the tell that this was drawn with a mouse.
const LID_UPPER = "M1.6 13.2 C3.9 8.8, 8.9 6.2, 13.6 6.5 C17.5 6.75, 20.9 8.9, 22.6 12";
const LID_LOWER = "M2.5 12.4 C4 15.6, 8 17.9, 12 18 C16.2 18.1, 19.9 15.8, 21.9 12.6";
const IRIS =
  "M10.8 9.2 C12.7 8.5, 15.1 9.9, 15.4 12 C15.7 14.1, 14 15.8, 11.9 15.7 " +
  "C10 15.6, 8.5 14.1, 8.6 12.2 C8.68 10.7, 9.5 9.7, 10.5 9.25";
const PUPIL =
  "M12 10.95 C12.8 10.9, 13.45 11.6, 13.4 12.35 C13.35 13.15, 12.7 13.7, 11.95 13.65 " +
  "C11.15 13.6, 10.6 12.95, 10.65 12.2 C10.7 11.5, 11.3 11, 12 10.95 Z";
// Five lashes, no two the same length or lean. Spread across the lid rather
// than bunched at the corner — checked by rendering the icon at size, where
// a corner cluster fuses into the lid stroke and reads as a smudge.
const LASHES = [
  "M6.3 9.4 C6.05 8.7, 5.85 8.2, 5.6 7.5",
  "M9.3 7.6 C9.1 6.5, 8.95 5.7, 8.75 4.7",
  "M13.1 7.15 C13.35 6, 13.5 5.2, 13.75 4.3",
  "M16.9 7.9 C17.45 6.9, 17.9 6.1, 18.4 5.2",
  "M20.2 9.7 C21.1 9.1, 21.9 8.6, 22.8 8",
];
// A closed shape tucked just inside the two lid strokes, used only to keep
// the tracking iris behind the lid.
const LID_CLIP =
  "M1.9 12.8 C4.1 8.8, 8.9 6.4, 13.6 6.7 C17.4 6.95, 20.7 9, 22.3 12.1 " +
  "C20.2 15.7, 16.2 17.9, 12 17.8 C8 17.7, 4 15.5, 1.9 12.8 Z";
const LID_CLIP_ID = "prototype-fab-lid";

// Pen weight, matched to the handwriting rather than picked by eye. The note
// beside the badge is Caveat 700 at --fs-2xl, which caps at 30px; rasterising
// that face at that size and measuring its stroke runs puts the pen at ~2px,
// with the downstrokes — the part that reads as "the pen" — a little heavier.
// The icon draws its 24-unit viewBox at 44px (md:w-11), so one unit is 1.83px
// and PEN lands the lid at ~2.5px. Change the icon's rendered size and this
// number has to move with it, or the drawing stops matching the writing.
const PEN = 1.36;
const LASH_PEN = PEN * 0.83;

const DEFAULT_NOTE = { en: "psst — it's live!", de: "psst — es ist live!" };
const NEW_TAB_HINT = { en: "opens in a new tab", de: "öffnet in einem neuen Tab" };

// One lashed eye, drawn as if by the same hand that writes the note under
// it: open lid strokes that overshoot at one corner and leave the other
// unclosed, an iris the pen lifted off before finishing, an uneven pupil,
// five unlike lashes — and a stroke width measured off the Caveat face
// rather than chosen (see PEN).
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
      className="w-7 h-7 md:w-11 md:h-11 overflow-visible"
      fill="none"
      stroke="currentColor"
      strokeWidth={PEN}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduce ? {} : { scaleY: [1, 0.06, 1] }}
        transition={{ duration: 0.42, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }}
      >
        {/* The eyeball goes down first and the lid strokes draw over it, so
            a pupil at full stretch reads as sitting behind the lid rather
            than on top of it. The clip is the belt to that braces. */}
        <defs>
          <clipPath id={LID_CLIP_ID}>
            <path d={LID_CLIP} />
          </clipPath>
        </defs>
        <motion.g
          clipPath={`url(#${LID_CLIP_ID})`}
          style={reduce ? undefined : { x: pupilX, y: pupilY }}
        >
          <path d={PUPIL} fill="currentColor" stroke="none" />
          {/* Glint, punched back out in the badge's own gold rather than
              painted white — the fill has to follow the token into dark
              mode, where --highlight is the lighter gold. */}
          <circle cx="11.15" cy="11.6" r="0.5" fill="var(--highlight)" stroke="none" />
          <path d={IRIS} />
        </motion.g>

        <path d={LID_UPPER} />
        <path d={LID_LOWER} />

        {/* Lashes sit inside the blink group on purpose — they belong to the
            lid, so they come down with it. Their tips run past the lid,
            which is why the <svg> is overflow-visible. A brow used to sit
            above them: with lashes in, the two crowded each other at icon
            size and the brow lost. */}
        <g strokeWidth={LASH_PEN}>
          {LASHES.map((d) => (
            <path key={d} d={d} />
          ))}
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
  // On a phone the badge overlaps the reading column (see the sizing note
  // below), so its idle loops — bob, blob rotation/breath, wiggle — play ON
  // TOP of the text and read as the page shaking, permanently: measured as
  // 11/11 differing frame-pairs at rest, and reported by a reader in
  // exactly those words. Below md the badge holds still and keeps only the
  // entrance spring and the blink — the one idle sign of life small enough
  // to stay inside the mark. Desktop, where the badge sits in the margin
  // and overlaps nothing, keeps the full choreography.
  const isMobile = useIsMobile();
  const calm = reduce || isMobile;
  const hostRef = useRef(null);
  const eyeRef = useRef(null);
  const [scrolledIn, setScrolledIn] = useState(false);
  const [parked, setParked] = useState(false);
  // On phones the badge also yields the corner the same way the ASK AI pill
  // does: while a [data-corner-cta] occupant is there — the pill bar in
  // transit, a figure's diagram chip, the open menu — the badge parks
  // rather than being sliced by the bar (z-40 over this z-30) or sitting on
  // top of a chip's tap target. Desktop keeps the badge up: there it lives
  // in the page margin and overlaps nothing, and parking it whenever a
  // figure chip crosses the lower viewport would read as flicker.
  const cornerOccupied = useCornerOccupied();

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
        // Travel is deliberately short of what the clip allows: with a pen
        // this thin, an iris clipped mid-curve by the lid is conspicuous, so
        // the eye stops looking before it gets there.
        pupilTargetX.set((dx / distance) * 1.8 * reach);
        pupilTargetY.set((dy / distance) * 1.3 * reach);
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
  const visible = scrolledIn && !parked && !(isMobile && cornerOccupied);

  return (
    <>
      {/* In-flow, zero-size anchor. It stays inside the page — and therefore
          inside the scroll container — purely so the two effects above can
          resolve that container with .closest(). The visible badge renders
          through a portal to <body>: a position:fixed subtree INSIDE iOS's
          async overflow scroller is positioned by the scrolling tree out of
          step with the content around it, and this badge was the worst
          possible tenant of that path — filtered (drop-shadow), spring-
          animated, and mounted/unmounted by AnimatePresence. At body level
          it is a plain viewport-fixed layer, the same arrangement as the
          ASK AI pill, which has never misbehaved. */}
      <span ref={hostRef} aria-hidden="true" />
      {createPortal(
    <div
      // pointer-events-none on the wrapper so the empty column above the
      // badge never eats clicks meant for the page underneath it.
      /* bottom-24 on phones, not bottom-4: the AskPortfolio pill owns the
         bottom-right corner (fixed bottom-s16 right-s16, z-80), and at
         bottom-4 this badge sat stacked BEHIND it — an amber sliver peeking
         out from the pill's edge. Desktop has room for both.

         z-30: below the ASK AI pill (z-80), above the scroll container
         (shell-level layer 10). Since the portal move the badge no longer
         shares a stacking context with the pill bar, so the bar cannot
         slice it mid-transit — the corner-parking contract handles that
         overlap instead (the badge steps aside while the bar holds the
         corner). */
      className="no-print pointer-events-none fixed bottom-24 right-4 md:bottom-8 md:right-8
                 z-30 flex flex-col items-end gap-1"
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
              animate={calm ? {} : { y: [0, -7, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${labelText} — ${hintText}`}
                className="group flex items-center focus-ring"
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
                                 text-text shadow-md opacity-0
                                 transition-opacity duration-200 group-hover:opacity-100
                                 group-focus-visible:opacity-100"
                    >
                      {labelText}
                      <HandArrow direction="up-right" className="w-3 h-3" />
                    </span>
                  </span>
                </span>

                {/* Sized against the reading column, not just the corner. At
                    68px with -inset-4 blobs the painted mark measured 132px
                    across and covered 57px of a 279px phone column — a fifth
                    of the measure, over four or five lines of body copy, with
                    the outer blob running 10px past the bottom of the screen.
                    56px with tighter blobs lands at ~80px painted and ~20px of
                    overlap, and still clears the 44px minimum tap target by a
                    comfortable margin. Desktop, where the badge sits in the
                    page margin and overlaps nothing, is unchanged. */}
                {/* The lift lives on this wrapper as a drop-shadow, not on the
                    badge as a box-shadow: a mask clips the element's own
                    shadow away with everything else outside the torn edge,
                    while a filter on the parent follows the shape. */}
                <span className="relative grid h-14 w-14 md:h-[84px] md:w-[84px] place-items-center
                                 drop-shadow-[0_4px_7px_rgba(60,40,30,0.22)]">
                  {/* Two soft blobs behind the badge, morphing and drifting
                      out of phase with it and with each other. No stroke, no
                      pulse ring: the movement is the attention-getter. */}
                  {!reduce && (
                    <>
                      <motion.span
                        aria-hidden="true"
                        className="absolute -inset-1.5 md:-inset-2 bg-highlight rule-blob opacity-25"
                        animate={calm ? {} : { rotate: -360, scale: [1, 1.07, 1] }}
                        transition={{
                          rotate: { duration: 26, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                        }}
                      />
                      <motion.span
                        aria-hidden="true"
                        // The outer blob is the widest part of the mark and
                        // carries no information, so a phone does without it:
                        // one backing blob still breaks the silhouette, and
                        // the ~16px it saves on each side is the difference
                        // between clipping the ends of body-copy lines and
                        // grazing the margin.
                        className="hidden md:block absolute -inset-4 bg-highlight rule-blob opacity-[0.12]"
                        animate={{ rotate: 360 }}
                        transition={{ rotate: { duration: 34, repeat: Infinity, ease: "linear" } }}
                      />
                    </>
                  )}

                  {/* The badge itself: gold blob, ink eye. The wiggle every
                      few seconds is the one loop allowed to be a little
                      rude, because a reader deep in a case study is not
                      looking at the corner of their screen. */}
                  <motion.span
                    className="relative grid h-full w-full place-items-center bg-highlight rule-blob
                               text-highlight-on"
                    animate={calm ? {} : { rotate: [0, -9, 7, -4, 0] }}
                    transition={{
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
    </div>,
        document.body
      )}
    </>
  );
}
