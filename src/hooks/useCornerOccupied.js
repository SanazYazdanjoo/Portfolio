// Is the viewport's bottom-right corner claimed by page content? That corner
// belongs, by default, to the floating FABs (the ASK AI pill, and on the IBS
// study the prototype badge). But in-flow tap targets pass through it — a
// figure's "open the diagram" chip, the mobile pill bar while it scrolls up
// to its pinned position — and full-screen surfaces (the hamburger menu)
// cover it outright. Any such element declares itself with an empty
// `data-corner-cta` attribute, and every FAB watching this hook steps aside
// while one is there, so two tap targets are never stacked.
//
// Parking is the only fix that can work here. The FABs are fixed elements at
// the app shell's level, while the pill bar and the chips live inside the
// scroll container, which is its own stacking context (`relative z-10` in
// App.jsx). At the shell level that whole container IS layer 10, whatever
// z-indexes its children carry — so no z-index on the bar can ever lift it
// above a shell-level FAB, and no z-index on a FAB above 10 can drop it
// below the bar. The layers cannot interleave; one side has to yield.
//
// Two observers, each doing the half the other can't:
//
//   IntersectionObserver, with a rootMargin that shrinks the root to the
//   bottom 20% / right 45% of the viewport — a generous halo, so a FAB
//   steps aside a moment before an occupant actually reaches it. The
//   callback only reports CHANGED entries, so membership is a Set carried
//   across calls.
//
//   ROOTED PER OCCUPANT, not at the viewport. An occupant inside the app's
//   scroll container must be observed WITH that container as root: iOS
//   WebKit does not reliably recompute default-viewport-root intersections
//   while an inner scroller moves the content — the same engine fact the
//   section scroll-spy learned in 873c759, where viewport-rooted callbacks
//   simply froze. Here the failure mode was worse than freezing: the stale
//   viewport-root entries flapped, so `occupied` toggled at frame rate and
//   the FABs mounted/unmounted every frame — measured on-device as the
//   floating-button band changing on every frame of a recording, part of
//   the permanent shake reported on e59c0a0. Shell-level occupants (the
//   hamburger overlay, which lives in the header, outside any scroller)
//   keep the viewport root, which is correct for them. The viewport
//   observer is created eagerly so the hook is live before any occupant
//   mounts; per-scroller observers are created as occupants appear.
//
//   MutationObserver, to keep the watched set current. The routes are
//   lazy-loaded (App.jsx renders <Outlet/> under Suspense), so a one-shot
//   querySelectorAll at mount runs against the route's FALLBACK and finds
//   nothing — the occupants mount later, when the chunk resolves, and
//   anything AnimatePresence-mounted (the hamburger menu) comes and goes for
//   the page's whole life. childList-only, so style/transform animation
//   frames never trigger it.
//
// No IntersectionObserver at all: the hook reports "free" forever, which
// degrades to "the FAB is always available" — same policy as PrototypeFab's
// own parking.

import { useEffect, useState } from "react";

const CORNER_ZONE = "-80% 0px 0px -55%";

export function useCornerOccupied() {
  const [occupied, setOccupied] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const inZone = new Set();
    const onEntries = (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inZone.add(e.target);
        else inZone.delete(e.target);
      }
      setOccupied(inZone.size > 0);
    };

    // One observer per scroll root (see the header comment). All of them
    // share `onEntries` and the one `inZone` set, so occupancy is a single
    // fact however many roots are being watched.
    const observers = new Map();
    const makeObserver = (root) =>
      new IntersectionObserver(onEntries, { root, rootMargin: CORNER_ZONE });
    observers.set(null, makeObserver(null));
    const observerFor = (el) => {
      const root = el.closest?.(".overflow-y-auto") ?? null;
      let io = observers.get(root);
      if (!io) {
        io = makeObserver(root);
        observers.set(root, io);
      }
      return io;
    };

    const watched = new Map(); // occupant -> the observer watching it
    const sync = () => {
      const current = new Set(document.querySelectorAll("[data-corner-cta]"));
      for (const el of current) {
        if (!watched.has(el)) {
          const io = observerFor(el);
          watched.set(el, io);
          io.observe(el);
        }
      }
      for (const [el, io] of watched) {
        if (!current.has(el)) {
          // An occupant that unmounts never reports a leaving intersection,
          // so prune it here or a removed menu overlay would park the FABs
          // forever.
          watched.delete(el);
          io.unobserve(el);
          if (inZone.delete(el)) setOccupied(inZone.size > 0);
        }
      }
    };
    sync();

    const mo =
      typeof MutationObserver === "undefined" ? null : new MutationObserver(sync);
    mo?.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo?.disconnect();
      observers.forEach((io) => io.disconnect());
    };
  }, []);

  return occupied;
}
