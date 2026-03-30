import React from "react";
import { motion } from "framer-motion";
import { CustomIcon } from '../components/CustomIcon';

export function Hero({ data }) {
  return (
    <div className="relative w-full flex flex-col items-center">

      {/* ── DISPLAY TITLE — untouched ─────────────────────── */}
      <h1
        className="relative z-10 w-full flex items-center justify-center font-sans uppercase whitespace-nowrap leading-none tracking-tight"
        style={{ fontSize: 'clamp(0rem, 10vw, 10vw)' }}
      >
        <span>PORTF</span>

        <span
          className="inline-flex items-center justify-center pointer-events-none relative"
          aria-hidden="true"
          style={{
            width: '0.9em',
            height: '1.2em',
            margin: '0 -0.05em',
            flexShrink: 0,
            marginTop: '-0.1em',
          }}
        >
          <img
            src={data.doodles.flower}
            alt=""
            className="flower-doodle absolute inset-0 w-full h-full object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
        </span>

        <span>LIO</span>
      </h1>

      {/* ── STEM — untouched ──────────────────────────────── */}
      <div
        className="flower-doodle-image absolute flex flex-col items-center z-0 pointer-events-none mix-blend-multiply opacity-90"
        style={{ top: '0%', left: '64%', width: '13%', transform: 'translateX(-50%)' }}
      >
        <div className="w-[15%] h-[150vh] text-primary -mt-[20%] opacity-100 relative z-0" />
      </div>

      {/* ── SUBTITLE — anchored to title edges ────────────── */}
      <div className="relative z-20 w-full flex justify-between items-start px-[2vw] mt-3 md:mt-5">

        {/* Role — sits flush under the "P" */}
        <div className="flex flex-col gap-1">
          <span className="text-xl md:text-8xl text-text mt-2 hero-role uppercase font-display ">
            {data.role}
          </span>
        </div>

        {/* Year — sits flush under the final "O" */}
        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1 text-primary">
            <CustomIcon name="Bracket-left"  className="w-5 md:w-8 h-6 md:h-10 text-primary" />
            <span className="font-normal uppercase tracking-[0.2em] text-text text-sm md:text-base">
              {data.year}
            </span>
            <CustomIcon name="Bracket-right" className="w-5 md:w-8 h-6 md:h-10 text-primary" />
          </span>
        </div>

      </div>

      {/* ── TAGLINE — the hero hook that fills the dead space ── */}
      {data.tagline && (
        <motion.p
          className="relative z-20 w-full px-[2vw] mt-8 md:mt-12
                     text-lg md:text-xl font-hand text-text/70 max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          {data.tagline}
        </motion.p>
      )}

    </div>
  );
}