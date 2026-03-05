// src/components/Button.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Button = ({ children, to, href, className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  // The Hand-Drawn Oval: Designed to "bleed" outside the text area
  const SketchOval = () => (
    <svg 
      viewBox="0 0 200 100" 
      fill="none" 
      preserveAspectRatio="none"
      className="absolute -inset-x-6 -inset-y-4 w-[calc(100%+48px)] h-[calc(100%+32px)] text-primary pointer-events-none z-0"
    >
      <path 
        d="M10,50 C10,20 50,10 100,10 C150,10 190,20 190,50 C190,80 150,90 100,90 C50,90 10,80 10,50" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        className="animate-sketch-oval"
      />
    </svg>
  );

  const baseStyles = "relative inline-block z-10 doodle-text text-3xl font-bold transition-all duration-300";
  const hoverStyles = isHovered ? "text-primary scale-105" : "text-text";
  const combinedClasses = `${baseStyles} ${hoverStyles} ${className}`;

  const content = (
    <span 
      className="relative flex items-center justify-center px-2 py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <SketchOval />}
      <span className="relative z-10">{children}</span>
    </span>
  );

  if (to) return <Link to={to} className={combinedClasses} {...props}>{content}</Link>;
  if (href) return <a href={href} className={combinedClasses} {...props}>{content}</a>;
  
  return <button className={combinedClasses} {...props}>{content}</button>;
};