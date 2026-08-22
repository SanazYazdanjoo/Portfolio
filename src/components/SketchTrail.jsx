import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Mouse-following "ink" trail.
 *
 * The nib chases the pointer on a rAF loop rather than tracing raw mouse
 * samples, so the stroke flows at display rate instead of at whatever rate
 * the mouse reports.
 *
 * The trail is drawn as ONE filled ribbon — the centreline is offset left and
 * right by a tapering half-width and closed into a single outline. Drawn as a
 * chain of translucent stroked segments instead it beads: every shared
 * endpoint composites twice and reads as a dot. One fill has no overlaps, so
 * self-crossings union cleanly (nonzero winding) and the ink stays even.
 *
 * Elements marked [data-no-sketch="true"] break the stroke.
 */

const LIFETIME   = 620;   // ms for ink to dry out completely
const MAX_POINTS = 72;    // centreline samples kept
const MIN_STEP   = 3;     // px the nib must travel before sampling
const LIFT_AFTER = 120;   // ms of stillness that lifts the pen
const CHASE      = 0.34;  // how hard the nib chases the pointer, per 60fps frame
const MAX_WIDTH  = 3.4;
const MIN_WIDTH  = 1.2;
const TAPER      = 0.6;   // tail-to-head width curve; lower = quicker to full width
const PEAK_ALPHA = 0.5;

const f = (n) => Math.round(n * 10) / 10;
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/** Quadratic chain through `a`, curving via midpoints. Assumes the cursor
 *  already sits on the first point. `rev` walks the array backwards. */
const smooth = (a, rev) => {
  const n = a.length;
  const at = (i) => a[rev ? n - 1 - i : i];
  let d = '';
  for (let i = 1; i < n - 1; i += 1) {
    const c = at(i);
    const nx = at(i + 1);
    d += `Q${f(c.x)} ${f(c.y)} ${f((c.x + nx.x) / 2)} ${f((c.y + nx.y) / 2)}`;
  }
  const end = at(n - 1);
  return `${d}L${f(end.x)} ${f(end.y)}`;
};

/** One stroke, as a closed outline: up the left edge, round the nib, back down
 *  the right edge. Half-width tapers to zero at the tail, so it closes to a
 *  point with no cap to bead. */
const ribbon = (run) => {
  const n = run.length;
  if (n < 2) return '';

  const left = [];
  const right = [];
  for (let i = 0; i < n; i += 1) {
    const p = run[i];
    const a = run[i === 0 ? 0 : i - 1];
    const b = run[i === n - 1 ? n - 1 : i + 1];
    let tx = b.x - a.x;
    let ty = b.y - a.y;
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    const h = (p.w / 2) * Math.pow(i / (n - 1), TAPER);
    left.push({ x: p.x - ty * h, y: p.y + tx * h });
    right.push({ x: p.x + ty * h, y: p.y - tx * h });
  }

  const r = run[n - 1].w / 2;
  const head = left[n - 1];
  const headBack = right[n - 1];
  const cap = Math.hypot(head.x - headBack.x, head.y - headBack.y) > 0.2
    ? `A${f(r)} ${f(r)} 0 0 0 ${f(headBack.x)} ${f(headBack.y)}`
    : `L${f(headBack.x)} ${f(headBack.y)}`;

  return `M${f(left[0].x)} ${f(left[0].y)}${smooth(left, false)}${cap}${smooth(right, true)}Z`;
};

export const SketchTrail = () => {
  const pathRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const path = pathRef.current;
    if (!path) return;
    // Coarse pointers (touch) would smear ink under every drag.
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

    const pointer = { x: 0, y: 0, t: 0 };
    const nib = { x: 0, y: 0 };   // eased pen position
    const pts = [];               // centreline samples, tail → head
    let inkWidth = MAX_WIDTH * 0.7;
    let sampledAt = 0;
    let penDown = false;
    let newRun = true;            // next sample starts a fresh stroke
    let blocked = false;
    let raf = 0;
    let last = 0;

    const liftPen = () => {
      penDown = false;
      newRun = true;
    };

    const sample = (now) => {
      pts.push({ x: nib.x, y: nib.y, w: inkWidth, t: now, brk: newRun });
      if (pts.length > MAX_POINTS) pts.shift();
      newRun = false;
      sampledAt = now;
    };

    const frame = (now) => {
      const dt = Math.min(now - last, 64) || 16.67;
      last = now;

      if (!blocked && now - pointer.t < LIFT_AFTER) {
        if (!penDown) {
          // Start where the cursor actually is, so a resumed stroke does not
          // sweep across the screen to catch up.
          nib.x = pointer.x;
          nib.y = pointer.y;
          penDown = true;
          sample(now);
        } else {
          // frame-rate independent easing — the drag of a real pen
          const k = 1 - Math.pow(1 - CHASE, dt / 16.67);
          nib.x += (pointer.x - nib.x) * k;
          nib.y += (pointer.y - nib.y) * k;

          const tip = pts[pts.length - 1];
          const dist = tip ? Math.hypot(nib.x - tip.x, nib.y - tip.y) : Infinity;
          if (dist >= MIN_STEP) {
            // Ink physics off true speed (px/ms), not per-event distance, so
            // weight is the same on a 125Hz and a 1000Hz mouse.
            const speed = dist / Math.max(now - sampledAt, 1);
            const target = clamp(MAX_WIDTH - speed * 0.6, MIN_WIDTH, MAX_WIDTH);
            inkWidth += (target - inkWidth) * 0.2;  // thickness drifts, never jumps
            sample(now);
          }
        }
      } else if (penDown) {
        liftPen();
      }

      while (pts.length && now - pts[0].t > LIFETIME) pts.shift();

      if (!pts.length) {
        path.setAttribute('opacity', '0');
        if (!penDown) {
          raf = 0;   // nothing left to draw — stop burning frames
          return;
        }
      } else {
        // Split on pen lifts, then render every stroke into one <path>: the
        // subpaths share a fill, so overlaps union instead of stacking.
        const runs = [];
        let run = null;
        for (let i = 0; i < pts.length; i += 1) {
          if (!run || pts[i].brk) runs.push((run = []));
          run.push(pts[i]);
        }
        // Live head, so the ink reaches the nib between samples.
        if (penDown && run) run.push({ x: nib.x, y: nib.y, w: inkWidth });

        let d = '';
        for (let i = 0; i < runs.length; i += 1) d += ribbon(runs[i]);

        const life = 1 - (now - pts[pts.length - 1].t) / LIFETIME;
        path.setAttribute('d', d);
        path.setAttribute('opacity', (PEAK_ALPHA * clamp(life, 0, 1)).toFixed(3));
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const handleMove = (e) => {
      if (e.pointerType === 'touch') return;

      if (e.target.closest && e.target.closest('[data-no-sketch="true"]')) {
        if (!blocked) liftPen();
        blocked = true;
        start();   // let the ink already on screen finish drying
        return;
      }
      blocked = false;

      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.t = performance.now();
      start();
    };

    const handleOut = (e) => {
      if (e.relatedTarget == null) liftPen();
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerout', handleOut, { passive: true });
    window.addEventListener('blur', liftPen);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerout', handleOut);
      window.removeEventListener('blur', liftPen);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shouldReduce]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden no-print"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full text-primary">
        <path ref={pathRef} fill="currentColor" fillRule="nonzero" opacity="0" />
      </svg>
    </div>
  );
};
