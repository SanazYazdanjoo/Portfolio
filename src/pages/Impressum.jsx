// src/pages/Impressum.jsx
import React from 'react';
import { Button } from '../components/Button';
import { FlowerDoodle } from '../components/DoodleLibrary';
import { profileData } from '../data/profile';

export default function Impressum() {
  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <FlowerDoodle className="absolute top-20 right-10 w-64 h-64 text-peach opacity-10 rotate-12 pointer-events-none" />

      <div className="container max-w-4xl relative z-10">
        
        {/* Back Navigation */}
        <div className="mb-16">
          <Button to="/" variant="ghost" className="text-sm uppercase tracking-widest font-bold text-dim">
            ← Back to Portfolio
          </Button>
        </div>

        {/* Header */}
        <header className="mb-16 relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-text mb-4">
            Impressum<span className="text-primary">.</span>
          </h1>
          <p className="text-xl text-dim mt-6 font-medium">
            Legal notice and disclosure according to § 5 TMG.
          </p>
        </header>

        {/* Legal Content - Structured as an Editorial Document */}
        <article className="space-y-12 text-lg text-text leading-relaxed font-medium bg-panel p-8 md:p-12 border border-border shadow-sm relative">
          
          {/* Subtle Doodle on the document */}
          <FlowerDoodle className="absolute -bottom-6 -right-6 w-32 h-32 text-accent opacity-20 -rotate-12 pointer-events-none" />

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Information according to § 5 TMG</h2>
            <p>
              {profileData.name}<br />
              [Your Street and House Number]<br />
              [Your Zip Code] Weimar<br />
              Germany
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Contact</h2>
            <p>
              Phone: [Your Phone Number]<br />
              Email: {profileData.contact.email}
            </p>
          </section>

          <div className="h-px w-full bg-border/50 my-8"></div>

          <section className="space-y-6 text-dim text-base">
            <div>
              <h3 className="font-bold text-text mb-2">Liability for Content</h3>
              <p>
                As a service provider, I am responsible for my own content on these pages in accordance with general laws pursuant to § 7 para.1 TMG. According to §§ 8 to 10 TMG, however, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text mb-2">Liability for Links</h3>
              <p>
                My website contains links to external websites of third parties, on whose contents I have no influence. Therefore, I cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text mb-2">Copyright</h3>
              <p>
                The content and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of commercialization of such material beyond the scope of the copyright law require the prior written consent of its respective author or creator.
              </p>
            </div>
          </section>

        </article>

      </div>
    </main>
  );
}