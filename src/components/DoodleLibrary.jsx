import React from 'react';
import { motion } from "framer-motion";

 export const CircleDoodle = ({ className = "text-primary", isAnimated = true, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    preserveAspectRatio="none" 
    className={className} 
    {...props}
  >
    <path 
      d="M5,50 C5,20 25,5 50,5 C75,5 95,20 95,50 C95,80 75,95 50,95 C25,95 5,80 5,50" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeDasharray="500"
      className={`${isAnimated ? 'animate-sketch-oval' : ''}`}
    />
  </svg>
);

 export const FlowerDoodle = ({ className = "", ...props }) => (
  <img 
    src="/assets/flower-doodle.png" 
    alt="Hand-drawn flower decoration"
    className={`object-contain ${className}`}
    {...props} 
  />
);

 export const ScribbleUnderline = ({ className = "text-primary", ...props }) => (
  <svg viewBox="0 0 100 20" fill="none" preserveAspectRatio="none" className={className} {...props}>
    <path 
      d="M2,15 Q25,5 50,15 T98,15" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
  </svg>
);

 export const VerticalMarginLine = ({ className = "text-border opacity-40" }) => (
  <div className={`vertical-line fixed left-4 md:left-8 top-0 bottom-0 w-4 pointer-events-none z-[60] ${className}`}>
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 20 1000" 
      preserveAspectRatio="none" 
    >
      <path 
        d="M10,0 Q12,100 8,200 T10,400 Q13,500 9,600 T10,800 Q7,900 11,1000" 
        stroke="currentColor" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export const HorizontalMarginLine = ({ isVisible = true, className = "text-primary opacity-40" }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    className={`horizontal-line w-full h-5 pointer-events-none ${className}`}
  >
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1000 20" 
      preserveAspectRatio="none" 
      className="w-full h-full"
    >
      <path 
        d="M0,10 Q100,12 200,8 T400,10 Q500,13 600,9 T800,10 Q900,7 1000,11" 
        stroke="currentColor" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </motion.div>
);


export const SpeckleCluster = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`w-24 h-24 ${className}`} fill="currentColor">
    {/* Large Anchors (The "Bigger" ones for depth) */}
    <circle cx="22" cy="28" r="4.2" />
    <circle cx="75" cy="45" r="3.8" />
    <circle cx="45" cy="78" r="8.5" />
    <circle cx="12" cy="92" r="3.5" />

    {/* Medium Speckles */}
    <circle cx="20" cy="30" r="2.0" />
    <circle cx="50" cy="20" r="1.8" />
    <circle cx="80" cy="40" r="2.5" />
    <circle cx="40" cy="70" r="2.0" />
    <circle cx="65" cy="85" r="1.8" />
    <circle cx="10" cy="90" r="2.2" />

    {/* Small Dust/Detail */}
    <circle cx="25" cy="25" r="1.2" />
    <circle cx="15" cy="35" r="1.5" />
    <circle cx="55" cy="25" r="1.0" />
    <circle cx="45" cy="22" r="1.5" />
    <circle cx="85" cy="45" r="1.2" />
    <circle cx="35" cy="72" r="1.0" />
  </svg>
);

// Icon The Wobbly +
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// Icon The Wobbly X
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);