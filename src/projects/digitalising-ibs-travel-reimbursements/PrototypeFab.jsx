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
// Gold stays a background token: everything sitting on the fill is ink
// (text-highlight-on), the hover tooltip is surface + border rather than a
// second gold shape, and the handwritten nudge outside the badge is coral.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";

// Same wobbly-oval vocabulary as CircleDoodle in components/DoodleLibrary.jsx
// — a perfect circle orbiting a perfect circle would read as a loading
// spinner, which is the one thing this must not look like.
const WOBBLY_RING =
  "M52,4 C80,2 98,23 97,52 C96,80 76,98 48,97 C20,96 2,76 3,48 C4,21 24,3 52,4";

// Hover sparks, placed around the badge. Popped in on hover with a staggered
// overshoot rather than run on a loop: an idle page already has the bob, the
// wiggle and the pings — permanent glitter would make the corner noisy
// instead of inviting.
const SPARKS = [
  { pos: { top: "-12%", left: "-6%" }, size: 14, delay: 0 },
  { pos: { top: "4%", right: "-16%" }, size: 10, delay: 60 },
  { pos: { bottom: "-10%", left: "14%" }, size: 11, delay: 120 },
];

const DEFAULT_NOTE = { en: "psst — it's live!", de: "psst — es ist live!" };
const NEW_TAB_HINT = { en: "opens in a new tab", de: "öffnet in einem neuen Tab" };

// Cursor + twinkle. A pointer says "this is a thing you press"; the ↗ glyph
// the inline link uses says "this is a link" — at 84px the pointer is the
// friendlier read, and the hover tooltip still carries the ↗.
function CursorMark({ reduce }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="none" aria-hidden="true">
      <path
        d="M5.5 3.2 L5.5 18.4 L9.3 14.9 L11.6 20.2 L14.2 19.1 L11.9 13.9 L17 13.6 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <motion.path
        d="M18.4 2.2 c.45 2.1 1 2.65 3.1 3.1 -2.1 .45 -2.65 1 -3.1 3.1 -.45 -2.1 -1 -2.65 -3.1 -3.1 2.1 -.45 2.65 -1 3.1 -3.1 z"
        fill="currentColor"
        style={{ transformOrigin: "18.4px 5.3px" }}
        animate={reduce ? {} : { scale: [1, 0.5, 1], opacity: [1, 0.4, 1], rotate: [0, 25, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
      />
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
  const [scrolledIn, setScrolledIn] = useState(false);
  const [parked, setParked] = useState(false);

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
                                 border border-border bg-surface px-4 py-2 text-2xs font-black
                                 uppercase tracking-[0.18em] text-text shadow-sm opacity-0
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

                {/* Attention wiggle every few seconds — the one loop allowed
                    to be a little rude, because a reader deep in a case study
                    is not looking at the corner of their screen. */}
                <motion.span
                  className="relative grid h-[68px] w-[68px] md:h-[84px] md:w-[84px] place-items-center
                             rounded-full bg-highlight text-highlight-on shadow-md ring-offset-bg
                             group-focus-visible:ring-2 group-focus-visible:ring-primary-600
                             group-focus-visible:ring-offset-2"
                  animate={reduce ? {} : { rotate: [0, -9, 7, -4, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
                >
                  {/* Halo pings — two gold rings breathing outwards. */}
                  {!reduce &&
                    [0, 1].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border-2 border-highlight"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
                      />
                    ))}

                  {/* Wobbly orbit, drawn in ink on the page background. */}
                  {!reduce && (
                    <motion.svg
                      viewBox="0 0 100 100"
                      fill="none"
                      aria-hidden="true"
                      className="absolute -inset-[14px] text-text opacity-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    >
                      <path
                        d={WOBBLY_RING}
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeDasharray="6 12"
                      />
                    </motion.svg>
                  )}

                  {/* Hover sparks. CSS rather than framer so they inherit the
                      reduced-motion transition kill for free. */}
                  {SPARKS.map((spark, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="absolute scale-50 opacity-0 text-primary-600 transition duration-300
                                 group-hover:scale-100 group-hover:opacity-100
                                 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                      style={{
                        ...spark.pos,
                        width: spark.size,
                        height: spark.size,
                        transitionDelay: `${spark.delay}ms`,
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 0 c1.6 8 2.4 8.8 12 10.4 -9.6 1.6 -10.4 2.4 -12 12 -1.6 -9.6 -2.4 -10.4 -12 -12 9.6 -1.6 10.4 -2.4 12 -10.4 z" />
                      </svg>
                    </span>
                  ))}

                  <CursorMark reduce={reduce} />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
