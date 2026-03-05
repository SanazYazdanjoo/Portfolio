// src/components/Footer.jsx
import React from 'react';
import { profileData } from '../data/profile';
import { FlowerDoodle, HorizontalMarginLine } from './DoodleLibrary';
import { Button } from './Button';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full pt-16 pb-8 bg-bg border-t border-border overflow-hidden">
      
        
      <div className="container relative">
        
        {/* Artistic Background Accent */}
        <FlowerDoodle className="absolute -right-10 -top-10 w-40 h-40 text-peach opacity-20 rotate-12 pointer-events-none" />

        {/* Bottom Bar */}
        <div className="bottom-bar pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-dim font-medium">
            © {currentYear} {profileData.author}. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <Button to="/impressum" variant="ghost" className="text-xs font-bold uppercase tracking-widest text-dim">
              Impressum
            </Button>
            <Button to="/privacy" variant="ghost" className="text-xs font-bold uppercase tracking-widest text-dim">
              Privacy Policy
            </Button>
          </div>
        </div>
        
      </div>
    </footer>
  );
};