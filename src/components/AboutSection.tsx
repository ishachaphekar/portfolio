import React, { useState, useEffect } from 'react';
import { ABOUT_DATA, ResearchCardData } from '../data/portfolioData';
import { Award, BookOpen, ShieldCheck, X, ExternalLink } from 'lucide-react';

const ABOUT_PHOTOS = [
  '/about-photo-1.jpg',
  '/about-photo-2.jpg',
  '/about-photo-3.jpg',
  '/about-photo-4.jpg',
  '/about-photo-5.jpg',
  '/about-photo-6.jpg',
];

// Helper to generate 6 randomized tilts within -6° to +6°
const generateTilts = () => [
  Math.floor(Math.random() * 13) - 6,
  Math.floor(Math.random() * 13) - 6,
  Math.floor(Math.random() * 13) - 6,
  Math.floor(Math.random() * 13) - 6,
  Math.floor(Math.random() * 13) - 6,
  Math.floor(Math.random() * 13) - 6,
];

// Auto-cycling stacking photo cards with drop-in animation & reset fold-down
const StackingPhotoCards: React.FC = () => {
  const [stackedCount, setStackedCount] = useState<number>(1);
  const [tilts, setTilts] = useState<number[]>(generateTilts());
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isResetting) return;

      if (stackedCount < ABOUT_PHOTOS.length) {
        setStackedCount((prev) => prev + 1);
      } else {
        setIsResetting(true);
        setTimeout(() => {
          setTilts(generateTilts());
          setStackedCount(1);
          setIsResetting(false);
        }, 500);
      }
    }, 1700);

    return () => clearTimeout(timer);
  }, [stackedCount, isResetting]);

  return (
    <div className="flex items-center justify-center py-2">
      <div className="relative w-[180px] sm:w-[210px] md:w-[230px] h-[250px] sm:h-[290px] md:h-[310px] overflow-hidden flex items-center justify-center">
        <div
          className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out ${
            isResetting ? 'translate-y-[120%] opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {ABOUT_PHOTOS.slice(0, stackedCount).map((photoSrc, idx) => {
            const isLatest = idx === stackedCount - 1;
            const tiltAngle = tilts[idx] || 0;

            return (
              <div
                key={idx}
                style={{
                  zIndex: idx + 1,
                  transform: `rotate(${tiltAngle}deg)`,
                }}
                className={`absolute w-[160px] sm:w-[190px] md:w-[210px] aspect-[3/4] rounded-xl border-2 border-mint/30 shadow-xl bg-navy-light overflow-hidden select-none transition-all duration-500 ${
                  isLatest ? 'animate-card-drop' : ''
                }`}
              >
                <img
                  src={photoSrc}
                  alt={`Isha — Moment ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 via-transparent to-white/15 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const [selectedPublication, setSelectedPublication] = useState<ResearchCardData | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPublication(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-navy text-offwhite min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* SECTION TITLE */}
        <div className="text-left">
          <h2 className="font-headline font-bold text-[32px] sm:text-[45px] text-offwhite tracking-tight leading-tight">
            {ABOUT_DATA.heading}
          </h2>
        </div>

        {/* 1. INTRO: TWO-COLUMN LAYOUT WITH BACKGROUND HEADING & STACKED CARDS WITH TOP STICKY NOTE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Background Heading + Intro Copy */}
          <div className="lg:col-span-6 space-y-3 max-w-2xl">
            <h3 className="font-sans font-bold text-[18px] text-mint uppercase tracking-wider mb-3 text-left">
              Background
            </h3>
            <p className="font-sans text-base sm:text-lg text-offwhite/90 leading-relaxed">
              {ABOUT_DATA.introText}
            </p>
          </div>

          {/* RIGHT COLUMN: Centered Photo Card Stack + Floating Sticky Note */}
          <div className="lg:col-span-6 flex items-center justify-center relative py-6">
            <div className="relative">
              <StackingPhotoCards />

              {/* Sticky Note (-8deg tilt, moved higher and further right) */}
              <div className="absolute -top-16 sm:-top-20 -right-10 sm:-right-32 z-30 w-[180px] sm:w-[205px] p-3.5 rounded-xl border border-navy/15 bg-[#F4F4F4] text-navy shadow-xl -rotate-[8deg] select-none">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-offwhite/50 border-t border-b border-white/60 backdrop-blur-xs rounded-xs rotate-[-2deg] shadow-xs pointer-events-none" />
                
                <p className="font-script text-xs sm:text-sm font-bold tracking-wide leading-snug pt-1">
                  Off-screen, I enjoy travelling, baking, exploring new hobbies or five episodes deep into a sitcom I've already seen once.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 2. PHILOSOPHY: LEFT-ALIGNED 18px MULISH MINT HEADING + 4 COMPACT BLOCKS */}
        <div className="pt-8 border-t border-mint/10">
          <h3 className="font-sans font-bold text-[18px] text-mint uppercase tracking-wider mb-6 text-left">
            Design Philosophy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT_DATA.philosophy.map((item, idx) => (
              <div
                key={idx}
                className="bg-navy-light/60 p-6 rounded-xl border border-mint/10 hover:border-mint/30 transition-colors"
              >
                <h4 className="font-sans text-xs font-semibold text-mint mb-2.5">
                  {item.question}
                </h4>
                <p className="font-sans text-xs text-offwhite/70 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SKILLS & TOOLS: LEFT-ALIGNED 18px MULISH MINT HEADING */}
        <div className="pt-8 border-t border-mint/10">
          <h3 className="font-sans font-bold text-[18px] text-mint uppercase tracking-wider mb-8 text-left">
            SKILLS & TOOLS
          </h3>

          <div className="space-y-10">
            {/* Skills */}
            <div>
              <span className="text-xs font-sans text-offwhite/50 block mb-4 font-semibold uppercase tracking-wider">
                Core Capabilities
              </span>
              <div className="flex flex-wrap gap-3">
                {ABOUT_DATA.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 rounded-full bg-navy-light text-offwhite text-sm font-sans font-medium border border-mint/20 hover:border-mint/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <span className="text-xs font-sans text-offwhite/50 block mb-4 font-semibold uppercase tracking-wider">
                Tools & Technologies
              </span>
              <div className="flex flex-wrap gap-3">
                {ABOUT_DATA.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-4 py-2 rounded-full bg-navy-light text-offwhite text-sm font-sans font-medium border border-mint/20 hover:border-mint/40 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. EXPERIENCE: LEFT-ALIGNED 18px MULISH MINT HEADING */}
        <div className="pt-8 border-t border-mint/10">
          <h3 className="font-sans font-bold text-[18px] text-mint uppercase tracking-wider mb-6 text-left">
            EXPERIENCE
          </h3>

          <div className="divide-y divide-mint/10">
            {ABOUT_DATA.experience.map((exp, eIdx) => (
              <div key={eIdx} className="py-6 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-headline font-medium text-lg md:text-xl text-offwhite">
                    {exp.role}
                  </h4>
                  <span className="font-sans text-sm text-offwhite/60">
                    at <strong className="text-offwhite/90 font-medium">{exp.company}</strong>
                  </span>
                </div>
                <div className="text-sm font-sans text-offwhite/50 text-right whitespace-nowrap">
                  {exp.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. RESEARCH & PUBLICATIONS: 3 CARDS IN HORIZONTAL LINE WITH CERTIFICATE POPUP MODAL */}
        <div className="pt-8 border-t border-mint/10">
          <h3 className="font-sans font-bold text-[18px] text-mint uppercase tracking-wider mb-6 text-left">
            RESEARCH & PUBLICATIONS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_DATA.researchAndAchievements.map((item, rIdx) => {
              const icons = [Award, BookOpen, ShieldCheck];
              const IconComp = icons[rIdx % icons.length];
              return (
                <div
                  key={rIdx}
                  onClick={() => setSelectedPublication(item)}
                  className="bg-navy-light/80 p-6 rounded-2xl border border-mint/20 hover:border-coral transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-full bg-mint/10 text-mint border border-mint/20 flex items-center justify-center group-hover:bg-coral/20 group-hover:text-coral transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-headline font-bold px-2.5 py-1 rounded-full bg-mint text-navy">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="font-headline font-bold text-base text-offwhite mb-1.5 group-hover:text-coral transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-mint mb-2 font-medium leading-snug">
                      {item.subtitle}
                    </p>
                    {item.detail && (
                      <p className="font-sans text-xs text-offwhite/60 leading-relaxed line-clamp-3">
                        {item.detail}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* CLEAN CERTIFICATION IMAGE POP-UP MODAL (NO BOXES, NO TEXT, NATURAL IMAGE ASPECT) */}
      {selectedPublication && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-navy/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPublication(null)}
        >
          <div
            className="relative flex flex-col items-center max-h-[90vh] max-w-[90vw] select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setSelectedPublication(null)}
              className="absolute -top-4 -right-4 z-20 p-2.5 rounded-full bg-navy/90 border border-mint/30 text-offwhite/80 hover:text-offwhite hover:bg-coral transition-all shadow-xl"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Pure Certificate Image (Unstretched, natural aspect ratio, no container box) */}
            <img
              src={selectedPublication.imageSrc}
              alt={selectedPublication.title}
              className="max-h-[80vh] max-w-[85vw] w-auto h-auto object-contain rounded-2xl shadow-2xl"
            />

            {/* Publication Link Button (ONLY for 2nd Publication) */}
            {selectedPublication.externalUrl && (
              <div className="pt-4 flex justify-center">
                <a
                  href={selectedPublication.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-navy font-headline font-bold text-xs hover:bg-coral-hover transition-all shadow-xl hover:scale-105"
                >
                  <span>View Publication on Routledge</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
