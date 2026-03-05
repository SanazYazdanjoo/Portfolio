// src/components/VoluntaryList.jsx
import React from "react";

export function VoluntaryList({ items = [] }) {
  return (
    <div className="space-y-16">
      {items.map((item) => (
        <article 
          key={item.id} 
          className="bg-panel p-8 md:p-12 border border-border shadow-sm relative -rotate-0 hover:rotate-2 transition-transform duration-500"
        >
          {/* Tape Decor */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-sm border border-border/50 shadow-sm"></div>
          
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
            <h2 className="text-2xl font-bold text-text">{item.title}</h2>
            <span className="doodle-text text-xl text-primary">{item.year}</span>
          </div>
          
          <h3 className="text-sm font-bold uppercase tracking-widest text-dim mb-6">{item.org}</h3>
          
          <p className="text-lg text-text leading-relaxed">
            {item.desc}
          </p>
        </article>
      ))}
    </div>
  );
}