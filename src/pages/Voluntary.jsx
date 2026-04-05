// src/pages/Voluntary.jsx
import React from "react";
import { VoluntaryList } from "../components/VoluntaryList";
import { voluntaryItems } from "../data/voluntary";
import { ScribbleUnderline, FlowerDoodle } from "../components/DoodleLibrary";
import { useTranslation } from "../context/LanguageContext";

export default function Voluntary() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
      
      {/* Background Decor */}
      <FlowerDoodle className="absolute top-32 -left-20 w-96 h-96 text-accent opacity-10 -rotate-12 pointer-events-none" />

      <div className="container relative z-10 max-w-4xl px-4">
        
        <header className="mb-20 relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-text mb-4">
            {t("voluntary.heading")}<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-accent opacity-80" />
          <p className="text-xl text-dim mt-6 font-medium">
            {t("voluntary.description")}
          </p>
        </header>

        {/* The List Component */}
        <VoluntaryList items={voluntaryItems} />

      </div>
    </main>
  );
}