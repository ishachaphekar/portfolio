import React from 'react';
import { ArchiveGrid } from './ArchiveGrid';

export const ArchivesAnchor: React.FC = () => {
  return (
    <section id="archives" className="relative py-12 md:py-16 px-6 md:px-12 bg-offwhite text-navy border-t border-navy/10 overflow-hidden">
      {/* Decorative background blur blobs */}
      <div className="absolute -right-32 top-1/3 w-72 h-72 bg-mint/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-32 bottom-1/4 w-80 h-80 bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl lg:max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* SECTION HEADING & INTRO COPY */}
        <div className="space-y-2 text-left">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-navy tracking-tight leading-tight">
            Archives
          </h2>
          <p className="font-sans text-sm sm:text-base text-navy/80 leading-relaxed max-w-3xl">
            A selection of visual design work, from brand identities and packaging to campaigns and creative work, that reflects the visual-design foundation before UX became the focus.
          </p>
        </div>

        {/* RESPONSIVE COMPACT BENTO GRID FOR ARCHIVE IMAGES */}
        <div>
          <ArchiveGrid />
        </div>

      </div>
    </section>
  );
};

