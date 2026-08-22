import React from 'react';

export const ImagePlaceholder = ({ text = "Coming Soon" }) => {
  return (
    // 'group' lets the image react to hover on the parent
    <div className="absolute inset-0 w-full h-full bg-muted/20 flex flex-col items-center justify-center overflow-hidden border rule-frame-in relative group">

      {/* Sketch image background — global CSS renders it in B&W; a slight zoom plays on hover. */}
      <img
        src="/assets/sketch-placeholder.png" 
        alt="Editorial sketch placeholder"
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 group-hover:scale-100 transition-transform duration-1000"
      />

      {/* Text box overlay */}
      <div className="relative z-10 backdrop-blur-sm border rule-frame [--rule-fill-color:var(--bg)] px-8 py-4 shadow-sm -rotate-0">
        <span className="doodle-text text-3xl text-text">
          {text}
        </span>
      </div>
      
    </div>
  );
};