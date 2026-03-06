import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

/**
 * SketchTrail - A mouse-following "ink" trail.
 * Designed to provide a tactile, hand-drawn feel to the portfolio.
 * Supports exclusion zones via [data-no-sketch="true"].
 */
export const SketchTrail = () => {
  const [segments, setSegments] = useState([]);
  const lastPoint = useRef(null);
  const timeoutRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
     if (shouldReduce) return;
    

    const handleMouseMove = (e) => {
      const currentPoint = { 
        x: e.clientX, 
        y: e.clientY 
      };

      // 1. Check for exclusion zones (e.g., Project Cards, CV text)
      const target = e.target.closest('[data-no-sketch="true"]');

      if (target) {
        // Clear the path so it doesn't "teleport" across the forbidden div
        lastPoint.current = null;
        return; 
      }

      // 2. Generate a new segment if we have a starting point
      if (lastPoint.current) {
        const newSegment = {
          id: Date.now() + Math.random(),
          x1: lastPoint.current.x,
          y1: lastPoint.current.y,
          x2: currentPoint.x,
          y2: currentPoint.y,
        };

        // Keep only the last 50 segments for performance
        setSegments((prev) => [...prev.slice(-50), newSegment]); 
      }

      // 3. Update the anchor for the next segment
      lastPoint.current = currentPoint;

      // 4. Break the line if the mouse stops moving for 100ms
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        lastPoint.current = null;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden no-print">
      <svg className="absolute inset-0 w-full h-full text-primary">
        <AnimatePresence>
          {segments.map((seg) => (
            <motion.line
              key={seg.id}
              initial={{ opacity: 0.6, strokeWidth: 2.5 }}
              animate={{ opacity: 0, strokeWidth: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x2}
              y2={seg.y2}
              stroke="currentColor" /* Inherits text-primary */
              strokeLinecap="round"
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
};