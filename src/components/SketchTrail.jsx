import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * SketchTrail — a mouse-following "ink" trail.
 * v2: smoothed quadratic segments + speed-based ink weight.
 * Supports exclusion zones via [data-no-sketch="true"].
 */
export const SketchTrail = () => {
  const [segments, setSegments] = useState([]);
  const lastPoint = useRef(null);   // previous mouse point
  const prevPoint = useRef(null);   // point before that (for midpoint smoothing)
  const timeoutRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;

    const breakStroke = () => {
      lastPoint.current = null;
      prevPoint.current = null;
    };

    const handleMouseMove = (e) => {
      const current = { x: e.clientX, y: e.clientY };

      // 1. Exclusion zones (Project Cards, CV text)
      if (e.target.closest('[data-no-sketch="true"]')) {
        breakStroke();
        return;
      }

      const last = lastPoint.current;

      if (last) {
        const dist = Math.hypot(current.x - last.x, current.y - last.y);

        // 2. Jitter filter — ignore micro-movements (kills the zigzag)
        if (dist < 4) return;

        // 3. Smooth: draw a quadratic curve from the previous midpoint,
        //    through the last point, to the new midpoint. Adjacent
        //    segments share endpoints exactly → continuous curve.
        const prev = prevPoint.current ?? last;
        const start = { x: (prev.x + last.x) / 2, y: (prev.y + last.y) / 2 };
        const end   = { x: (last.x + current.x) / 2, y: (last.y + current.y) / 2 };

        // 4. Ink physics: fast strokes are thinner, slow strokes heavier
        const width = Math.max(1.4, Math.min(3.4, 3.6 - dist * 0.045));

        const newSegment = {
          id: Date.now() + Math.random(),
          d: `M ${start.x} ${start.y} Q ${last.x} ${last.y} ${end.x} ${end.y}`,
          width,
        };

        setSegments((s) => [...s.slice(-50), newSegment]);
        prevPoint.current = last;
      }

      lastPoint.current = current;

      // 5. Lift the pen if the mouse pauses
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(breakStroke, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldReduce]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden no-print">
      <svg className="absolute inset-0 w-full h-full text-primary">
        <AnimatePresence>
          {segments.map((seg) => (
            <motion.path
              key={seg.id}
              d={seg.d}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              initial={{ opacity: 0.55, strokeWidth: seg.width }}
              animate={{ opacity: 0, strokeWidth: seg.width * 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
};