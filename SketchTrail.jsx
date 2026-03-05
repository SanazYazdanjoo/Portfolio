// src/components/SketchTrail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const SketchTrail = () => {
  const [segments, setSegments] = useState([]);
  const lastPoint = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // --- CALIBRATION OFFSETS ---
      // Tweak these numbers to perfectly align the ink with your pen tip!
      // Positive X moves ink RIGHT. Negative X moves ink LEFT.
      // Positive Y moves ink DOWN. Negative Y moves ink UP.
      const offsetX = 10; 
      const offsetY = -15;  

      // Apply the offsets to the exact mouse coordinates
      const currentPoint = { 
        x: e.clientX + offsetX, 
        y: e.clientY + offsetY 
      };

      // If we have a previous point, draw a line segment from there to here!
      if (lastPoint.current) {
        const newSegment = {
          id: Date.now() + Math.random(), // Unique ID
          x1: lastPoint.current.x,
          y1: lastPoint.current.y,
          x2: currentPoint.x,
          y2: currentPoint.y,
        };

        // Keep the last 50 segments for a nice long tail
        setSegments((prev) => [...prev.slice(-50), newSegment]); 
      }

      // Update the last point to the current one
      lastPoint.current = currentPoint;

      // Clear the previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // If the mouse stops moving for 100ms, "lift the pen" 
      // so we don't draw a giant line across the screen when you move again
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
    // A single, invisible full-screen SVG that holds all our lines
    <svg className="fixed inset-0 pointer-events-none z-[100] w-full h-full text-primary">
      {segments.map((seg) => (
        <motion.line
          key={seg.id}
          initial={{ opacity: 0.8, strokeWidth: 4 }} // Made slightly thicker for better "ink" feel
          animate={{ opacity: 0, strokeWidth: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          x1={seg.x1}
          y1={seg.y1}
          x2={seg.x2}
          y2={seg.y2}
          stroke="currentColor"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};