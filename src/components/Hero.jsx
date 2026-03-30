// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

export function Hero({ data }) {
  return (
    // Added a subtle background color class (you can map bg-background to a light gray in Tailwind)
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-[6%] md:px-[8%] py-20">
      
    

      {/* ── Photo & Cursive Section ── */}
      <motion.div
        className=" hero-photo absolute z-10
                   top-[15%] md:top-[12%] lg:top-[10%]
                   right-[10%] md:right-[20%] lg:right-[25%]
                   w-[55vw] max-w-[260px] md:max-w-[340px] lg:max-w-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      >
        {/* Handwritten role - Made smaller, more delicate, and positioned higher */}
        <span
          className="hero-role absolute -top-8 -left-16 md:-top-10 md:-left-24
                     font-display text-primary text-4xl md:text-5xl lg:text-6xl
                     -rotate-[15deg] z-30 select-none whitespace-nowrap"
        >
          {data.role}
        </span>

        {/* The photo - subtle grayscale transition for an editorial feel (optional) */}
        <div className="relative z-20">
          <img
            src={data.aboutImage}
            alt={data.name}
            className="w-full h-auto object-cover shadow-xl transition-all duration-700 hover:grayscale-0"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
      </motion.div>

      {/* ── Main Typography (Staggered Editorial Layout) ── */}
      <motion.div
        className="relative z-20 flex flex-col w-full pointer-events-none mt-[10vh] md:mt-[15vh]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Name — Changed to a lighter font weight, slightly expanded tracking, and staggered alignment */}
        <h1 className="hero-typography font-sans font-light md:font-normal uppercase leading-[0.9] tracking-normal w-full">
          {/* First Name - Left Aligned */}
          <span 
            className="block text-text"
            style={{ fontSize: "clamp(4rem, 11vw, 13rem)" }}
          >
            SANAZ
          </span>
          {/* Last Name - Indented/Right Shifted */}
          <span 
            className="block text-text ml-[15%] md:ml-[30%]"
            style={{ fontSize: "clamp(4rem, 11vw, 13rem)" }}
          >
            YAZDANYOO
          </span>
        </h1>
      </motion.div>

      {/* ── Editorial Text Blocks (Bottom/Sides) ── */}
      <motion.div 
        className="relative z-30 flex flex-col md:flex-row justify-between items-end md:items-start w-full mt-10 md:mt-16 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-text/70 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Bottom Left Description */}
        <p className="max-w-[200px] md:max-w-[280px] mb-6 md:mb-0">
          {data.tagline || "CREATING INTUITIVE DIGITAL EXPERIENCES THROUGH DESIGN AND ENGINEERING."}
        </p>

        {/* Bottom Right / Date Block */}
        <div className="text-right flex flex-col items-end">
          <p className="max-w-[150px]">
            PORTFOLIO<br/>
            [ {data.year || "2026"} ]
          </p>
        </div>
      </motion.div>

    </div>
  );
}