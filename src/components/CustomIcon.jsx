// src/components/CustomIcon.jsx
import React from 'react';

export function CustomIcon({ name, className = "", alt, ext = "svg" }) {
  const iconPath = `/assets/icons/${name}.${ext}`;

  return (
    <div 
      className={`custom-icon-img inline-block mix-blend-multiply ${className}`}
      role="img"
      aria-label={alt || `${name} icon`}
      style={{
        // 1. currentColor tells it to use whatever text color Tailwind gives it!
        backgroundColor: 'currentColor', 
        
        // 2. The Cookie Cutter: These tell the browser to mask the background color using your file
        WebkitMaskImage: `url(${iconPath})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        
        maskImage: `url(${iconPath})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    />
  );
}