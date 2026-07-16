// src/components/Button.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SketchOval = () => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    preserveAspectRatio="none"
    className="absolute -inset-x-6 -inset-y-5 w-[calc(100%+56px)] h-[calc(100%+40px)] text-primary pointer-events-none z-0 drop-shadow-[0_0_12px_rgba(196,67,34,0.18)]"
  >
    <path
      d="M10,50 C10,20 50,10 100,10 C150,10 190,20 190,50 C190,80 150,90 100,90 C50,90 10,80 10,50"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeLinecap="round"
      className="animate-sketch-oval"
    />
  </svg>
);

const ArrowIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M5.2 12.1c2.2 0 4.1-.1 6.3-.1h4.4"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
    />
    <path
      d="M12.1 6.4 17.8 12l-5.8 5.4"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.7 11.9h1.1"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// 1. ADDED: Standard Button export to satisfy the import and fix the Vercel crash
export const Button = ({ children, to, href, className = "", ...props }) => {
  const baseStyles = "inline-block text-text hover:text-primary transition-colors font-medium";
  const combinedClasses = `${baseStyles} ${className}`;

  if (to) return <Link to={to} className={combinedClasses} {...props}>{children}</Link>;
  if (href) return <a href={href} className={combinedClasses} {...props}>{children}</a>;
  
  return <button className={combinedClasses} {...props}>{children}</button>;
};

// 2. Your original SolidButton with the doodle-text and SketchOval
export const SolidButton = ({ children, to, href, className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative inline-block z-10 doodle-text text-3xl font-bold transition-all duration-300";
  const hoverStyles = isHovered ? "text-primary scale-[1.04]" : "text-text";
  const combinedClasses = `${baseStyles} ${hoverStyles} ${className}`;

  const content = (
    <span
      className="relative flex items-center justify-center px-3 py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <SketchOval />}
      <span className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${isHovered ? "-translate-y-0.5" : ""}`}>
        <span className="relative z-10">{children}</span>
        <ArrowIcon className={`h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1.5 scale-110" : ""}`} />
      </span>
    </span>
  );

  if (to) return <Link to={to} className={combinedClasses} {...props}>{content}</Link>;
  if (href) return <a href={href} className={combinedClasses} {...props}>{content}</a>;
  
  return <button className={combinedClasses} {...props}>{content}</button>;
};