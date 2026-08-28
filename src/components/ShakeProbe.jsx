// On-device oscillation probe. Mounted only when the URL carries `?probe`
// (App.jsx), invisible and costless otherwise.
//
// Why it exists: the mobile shake reported on e59c0a0 could not be
// attributed from a screen recording, because a recording shows DISPLAYED
// frames — it cannot say whether the page's scroll offset is really
// oscillating (a JS or engine scroll loop), the layout is really moving
// (a resize/viewport loop), or neither is and the compositor is alternating
// between two stale frames of a perfectly still page. A screenshot of the
// shaking screen looking clean already hinted at the third; this probe
// makes the distinction measurable.
//
// Every frame it samples the values each theory predicts would oscillate:
//
//   scroller.top   the app scroll container's scrollTop     (scroll loop)
//   doc.top        the DOCUMENT's scrollTop — must stay 0;  (double-scroller
//                  a nonzero/flapping value is the two-      handoff, the
//                  scroller handoff the dvh shell prevents)  old 100vh bug)
//   inner.h        window.innerHeight, the layout viewport  (dvh/chrome flap)
//   vv.h/vv.top    visualViewport height and offset         (chrome movement)
//   shell.h        the .app-shell's clientHeight            (dvh in effect)
//   content.top    a real content element's rect.top —      (layout shift vs
//                  layout+scroll as the MAIN THREAD sees it  everything else)
//
// Each line shows last [min..max] and `flips`, the count of frames on which
// the value differed from the frame before. While the screen visibly
// shakes: a flips counter climbing ~60/s names the oscillating value; every
// counter static while the shake continues means nothing the page can
// observe is moving — the oscillation lives in the compositor's layer
// positioning, and the fix is layer surgery, not JS.
//
// The readout is written with direct textContent updates from one rAF loop —
// no React state, so the probe cannot itself churn the tree — and it also
// shows /version.json's stamp, so a phone serving a stale cached bundle
// identifies itself. The raw per-metric stats are exposed on
// window.__shakeProbe for console use.

import { useEffect, useRef } from "react";

const round1 = (v) => Math.round(v * 10) / 10;

export function ShakeProbe({ scrollRef }) {
  const outRef = useRef(null);

  useEffect(() => {
    const out = outRef.current;
    if (!out) return undefined;

    let build = "…";
    fetch("/version.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((v) => {
        build = v ? JSON.stringify(v) : "no version.json";
      })
      .catch(() => {
        build = "version.json unreachable";
      });

    const track = {};
    const stat = (key, v) => {
      const t = track[key] ?? (track[key] = { min: v, max: v, last: v, flips: 0 });
      if (v !== t.last) t.flips += 1;
      if (v < t.min) t.min = v;
      if (v > t.max) t.max = v;
      t.last = v;
    };

    let frames = 0;
    let raf = 0;
    const tick = () => {
      frames += 1;
      const scroller = scrollRef.current;
      const vv = window.visualViewport;
      const doc = document.scrollingElement;
      const content = document.getElementById("main-content");

      if (scroller) stat("scroller.top", round1(scroller.scrollTop));
      stat("doc.top", round1(doc ? doc.scrollTop : 0));
      stat("inner.h", window.innerHeight);
      if (vv) {
        stat("vv.h", round1(vv.height));
        stat("vv.top", round1(vv.offsetTop));
      }
      stat("shell.h", document.querySelector(".app-shell")?.clientHeight ?? 0);
      if (content) stat("content.top", round1(content.getBoundingClientRect().top));

      // A tenth of the sampling rate is plenty for eyes; the counters carry
      // the per-frame story.
      if (frames % 6 === 0) {
        out.textContent =
          Object.entries(track)
            .map(([k, t]) => `${k}: ${t.last}  [${t.min} .. ${t.max}]  flips:${t.flips}`)
            .join("\n") + `\nframes:${frames}\nbuild: ${build}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.__shakeProbe = track;

    return () => {
      cancelAnimationFrame(raf);
      delete window.__shakeProbe;
    };
  }, [scrollRef]);

  return (
    <pre
      ref={outRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 88,
        left: 8,
        right: 8,
        zIndex: 9999,
        margin: 0,
        padding: 8,
        background: "rgba(0, 0, 0, 0.78)",
        color: "#7CFC9B",
        font: "11px/1.5 monospace",
        whiteSpace: "pre-wrap",
        pointerEvents: "none",
      }}
    />
  );
}
