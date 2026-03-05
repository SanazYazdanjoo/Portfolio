import React from "react";
import { profileData } from "../data/profile";
import { ScribbleUnderline, CircleDoodle, FlowerDoodle } from "../components/DoodleLibrary";

export default function Contact() {
  return (
    <div className="min-h-screen bg-bg py-20 relative overflow-hidden flex items-center">
      <FlowerDoodle className="absolute top-1/4 -right-20 w-96 h-96 text-accent opacity-10 rotate-12 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        <header className="mb-16 relative inline-block">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-text mb-4">
            Hi<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-accent opacity-80" />
        </header>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Direct Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Email</h3>
              <a 
                href={`mailto:${profileData.contact.email}`} 
                className="text-2xl md:text-3xl font-bold text-text hover:text-primary transition-colors break-all"
              >
                {profileData.contact.email} 
              </a>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Location & Phone</h3>
              <p className="text-xl text-text font-medium">{profileData.contact.location} </p>
              <p className="text-xl text-dim">{profileData.contact.phone} </p>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Socials</h3>
              <div className="flex gap-6">
                <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-primary transition-colors underline decoration-primary/30">LinkedIn </a>
                <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-primary transition-colors underline decoration-primary/30">GitHub</a>
              </div>
            </div>
          </div>

          {/* Languages & Collaboration */}
          <div className="bg-panel p-8 border border-border rounded-sm shadow-sm relative rotate-1">
             {/* "Tape" Decor */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-sm border border-border/50 shadow-sm"></div>
            
            <h3 className="text-xl font-bold text-text mb-6">Let's collaborate in:</h3>
            <ul className="space-y-4">
              {profileData.languages.map((lang, i) => (
                <li key={i} className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-bold text-text">{lang.name} </span>
                  <span className="text-xs text-dim italic">{lang.level} </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-dim leading-relaxed italic">
              Currently based in Weimar, Germany, and open to UX Research opportunities and HCI collaborations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}