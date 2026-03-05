import React from 'react';
import { FlowerDoodle, CircleDoodle } from './DoodleLibrary';

export const ImagePlaceholder = ({ text = "Coming Soon" }) => {
  return (
    // Added 'group' here so the image can react to hover
    <div className="absolute inset-0 w-full h-full bg-muted/20 flex flex-col items-center justify-center overflow-hidden border border-border relative group">
      
      {/* The Sketch Image Background */}
      {/* The global CSS automatically makes this B&W. 
          We add a slight zoom effect on hover for interactivity. */}
      <img 
        src="/assets/sketch-placeholder.png" 
        alt="Editorial sketch placeholder"
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 group-hover:scale-100 transition-transform duration-1000"
      />

      {/* The Text Box Overlay */}
      <div className="relative z-10 bg-bg/90 backdrop-blur-sm border px-8 py-4 shadow-sm -rotate-0">
        <span className="doodle-text text-3xl text-text">
          {text}
        </span>
      </div>
      
    </div>
  );
};