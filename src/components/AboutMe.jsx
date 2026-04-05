// src/components/AboutMe.jsx
import React from "react";
import { motion } from "framer-motion";
import { ScribbleUnderline } from "./DoodleLibrary";

export function AboutMe({ data }) {
  return (
    <div className="relative w-full px-[4%] md:px-[6%] font-sans text-text">
      
      <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">
        
        {/* Change: md:col-span-7 is now md:col-span-12 so it takes the full width */}
      <motion.div 
          className="md:col-span-12 flex flex-col z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
      >
          {/* Handwritten Header */}
          <div className="relative inline-block w-max mb-6 md:mb-10">
            <h2 className="font-display text-text text-6xl md:text-8xl -rotate-6 relative z-10">
              About Me
            </h2>
          </div>

          {/* Main Paragraphs — The gap-10 or gap-16 will push them nicely apart across the full screen */}
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-10 lg:gap-20 mt-2 max-w-5xl">
            <p className="text-base leading-[1.85] text-text/90 font-light">
              I bridge the gap between code and human behavior. With 5+ years as a Frontend Developer and QA Engineer — shipping 20+ production websites and building QA systems from scratch — I now apply that technical fluency to UX Research.
             
              I run stakeholder interviews, contextual inquiries, and controlled experiments, then translate findings into validated Figma prototypes and working code. Currently pursuing my MSc in HCI at Bauhaus University of Weimar, I speak both 'user' and 'developer' — fluently.
            </p>
          </div>
      </motion.div>

      </div>

      {/* ── Bottom Section: Skills List ── */}
      <motion.div 
        className="w-full max-w-[1400px] mx-auto pt-5 border-t border-border/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <span className="block text-[10px] md:text-xs font-black  tracking-[0.3em] text-primary mb-10">
          What I Bring
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <h3 className="text-[28px] md:text-xl font-display font-bold font-black tracking-[0.2em] text-text mb-4">Research</h3>
            <ul className="text-sm text-text/70 space-y-2 font-light leading-relaxed">
              <li>Qualitative Interviews</li>
              <li>Contextual Inquiry</li>
              <li>Survey Design</li>
              <li>Usability Testing</li>
              <li>Quantitative Analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[28px] md:text-xl font-display font-bold font-black tracking-[0.2em] text-text mb-4">Design</h3>
            <ul className="text-sm text-text/70 space-y-2 font-light leading-relaxed">
              <li>Design Thinking</li>
              <li>Wireframes & Prototypes</li>
              <li>User Flows</li>
              <li>Style Guides</li>
              <li>Behavioral Design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[28px] md:text-xl font-display font-bold font-black tracking-[0.2em] text-text mb-4">Technical</h3>
            <ul className="text-sm text-text/70 space-y-2 font-light leading-relaxed">
              <li>HTML / CSS / JS</li>
              <li>React</li>
              <li>Python</li>
              <li>Bootstrap</li>
              <li>CMS (WordPress, Typo3)</li>
              <li>Arduino</li>
            </ul>
          </div>
        </div>
      </motion.div>

    </div>
  );
}