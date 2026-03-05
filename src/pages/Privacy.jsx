// src/pages/Privacy.jsx
import React from 'react';
import { Button } from '../components/Button';
import { FlowerDoodle } from '../components/DoodleLibrary';
import { siteConfig } from '../data/siteConfig';

export default function Privacy() {
  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <FlowerDoodle className="absolute top-40 -left-20 w-80 h-80 text-peach opacity-10 -rotate-12 pointer-events-none" />

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
            Privacy Policy<span className="text-primary">.</span>
          </h1>
          <p className="text-xl text-dim mt-6 font-medium max-w-2xl">
            Information on how your data is handled when you visit this portfolio, complying with the GDPR (DSGVO).
          </p>
        </header>

        {/* Privacy Content - Structured as an Editorial Document */}
        <article className="space-y-12 text-lg text-text leading-relaxed font-medium bg-panel p-8 md:p-12 border border-border shadow-sm relative">
          
          {/* Subtle Doodle on the document */}
          <FlowerDoodle className="absolute -top-6 -right-6 w-24 h-24 text-accent opacity-30 rotate-45 pointer-events-none" />

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">1. An Overview of Data Protection</h2>
            <h3 className="font-bold text-text mb-2 mt-6">General Information</h3>
            <p className="mb-4">
              The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.
            </p>
            <h3 className="font-bold text-text mb-2">Data Controller</h3>
            <p>
              The data processing on this website is carried out by the website operator:<br />
              <strong>{siteConfig.author}</strong><br />
              Email: {siteConfig.contact.email}
            </p>
          </section>

          <div className="h-px w-full bg-border/50 my-8"></div>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">2. Data Collection on this Website</h2>
            <h3 className="font-bold text-text mb-2 mt-6">Server Log Files</h3>
            <p className="mb-4">
              The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-dim text-base mb-6">
              <li>Browser type and browser version</li>
              <li>Operating system used</li>
              <li>Referrer URL</li>
              <li>Hostname of the accessing computer</li>
              <li>Time of the server request</li>
              <li>IP address</li>
            </ul>
            <p className="text-base text-dim">
              This data is not merged with other data sources. The basis for data processing is Art. 6 (1) (f) GDPR, which allows the processing of data to fulfill a contract or for measures preliminary to a contract, as well as for the legitimate interest of the technically error-free presentation and optimization of the operator's website.
            </p>

            <h3 className="font-bold text-text mb-2 mt-6">Contact via Email</h3>
            <p className="mb-4">
              If you send me an email, your details, including the contact details you provided, will be stored by me for the purpose of processing the inquiry and in case of follow-up questions. I do not share this data without your consent.
            </p>
          </section>

          <div className="h-px w-full bg-border/50 my-8"></div>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">3. Your Rights</h2>
            <p className="text-base text-dim">
              You have the right to receive information about the origin, recipient, and purpose of your stored personal data free of charge at any time. You also have a right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time for the future. Furthermore, under certain circumstances, you have the right to request the restriction of the processing of your personal data. You can contact me at any time at the email address provided above for this purpose.
            </p>
          </section>

        </article>

      </div>
    </main>
  );
}