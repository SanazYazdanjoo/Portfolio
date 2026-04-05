// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

export function Hero({ data }) {
  return (
    // Added a subtle background color class (you can map bg-background to a light gray in Tailwind)
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-visible">
      
      {/* ── Photo & Cursive Section ── */}
      <motion.div
        className="hero-photo absolute z-10
                   top-[10%] md:top-[7%] lg:top-[5%] 
                   right-[10%] md:right-[20%] lg:right-[25%]
                   w-[45vw] max-w-[220px] md:max-w-[300px] lg:max-w-[350px]"
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
            className="w-full h-auto object-cover transition-all duration-700 hover:grayscale-0"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
      </motion.div>

      {/* ── Main Typography (Left Aligned Layout) ── */}
      <motion.div
        className="hero-typography relative z-20 flex flex-col w-full pointer-events-none mt-[10vh] md:mt-[15vh]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Name — */}
        <h1 className="font-sans md:font-black uppercase leading-[0.9] tracking-normal w-full">
        
          <span 
            className="block text-text"
            style={{ fontSize: "clamp(3.5rem, 8.5vw, 11.5rem)" }}
          >
            SANAZ
          </span>
          
          <span 
            className="block text-text"
            style={{ fontSize: "clamp(3.5rem, 8.5vw, 11.5rem)" }}
          >
            YAZDANJOO
          </span>
        </h1>
      </motion.div>

      {/* ── Editorial Text Blocks (Bottom/Sides) ── */}
      <motion.div 
        className="relative z-30 flex flex-col md:flex-row justify-between items-end md:items-start w-full mt-10 md:mt-16 text-[9px] md:text-[11px] font-medium tracking-[0.2em] text-text/70 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Bottom Left Description */}
        <p className="hero-tagline max-w-full md:max-w-full font-sans font-light text-3xl max-w-xl">
I speak both 'user' and 'developer'.            
        </p>

        {/* Bottom Right / Date Block */}
        
          <p className=" text-3xl font-sans font-light text-text/70">
            Portfolio[ {data.year || "2026"} ]
          </p>
        
        
      </motion.div>
      

    </div>
  );
}