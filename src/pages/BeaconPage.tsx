import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Download, Layers, Target, Compass } from 'lucide-react';
import { Navigation } from '../components/Navigation';

interface BeaconPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const BeaconPage: React.FC<BeaconPageProps> = ({ onNavigate }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-navy text-offwhite font-sans selection:bg-mint selection:text-navy">
      {/* FIXED NAVIGATION BAR */}
      <Navigation onNavigate={onNavigate} />

      {/* PAGE CONTAINER WITH TOP PADDING FOR FIXED NAVBAR */}
      <div className="pt-28 md:pt-36 pb-0">
        
        {/* NAVY CONTAINER FOR MAIN CASE STUDY */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20 pb-20">
          
          {/* 1. HERO SECTION */}
          <div className="space-y-6">
            {/* BACK BUTTON ABOVE MAIN HEADING */}
            <div>
              <button
                onClick={() => onNavigate('/')}
                className="inline-flex items-center gap-3 text-offwhite hover:text-mint font-headline font-bold text-base transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
            </div>

            {/* MAIN HEADING */}
            <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite tracking-tight leading-tight max-w-5xl">
              Beacon — Holistic Student Evaluation Platform
            </h1>

            {/* INTRO PARAGRAPH */}
            <p className="font-sans text-base sm:text-lg text-offwhite/85 leading-relaxed max-w-5xl">
              A mobile app measuring IQ, EQ & PQ to guide students in grades 8–12 toward personalized academic paths and balanced emotional growth. Designed to replace stressful traditional test scores with clear, encouraging guidance.
            </p>

            {/* QUICK FACTS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="bg-navy-light/60 p-4.5 rounded-xl border border-mint/15">
                <span className="font-headline text-[10px] uppercase tracking-wider text-mint/60 block mb-1 font-bold">ROLE</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Lead UX/UI Designer</p>
              </div>
              <div className="bg-navy-light/60 p-4.5 rounded-xl border border-mint/15">
                <span className="font-headline text-[10px] uppercase tracking-wider text-mint/60 block mb-1 font-bold">TIMELINE</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">4 weeks</p>
              </div>
              <div className="bg-navy-light/60 p-4.5 rounded-xl border border-mint/15">
                <span className="font-headline text-[10px] uppercase tracking-wider text-mint/60 block mb-1 font-bold">TOOLS</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Figma, Design Systems</p>
              </div>
              <div className="bg-navy-light/60 p-4.5 rounded-xl border border-mint/15">
                <span className="font-headline text-[10px] uppercase tracking-wider text-mint/60 block mb-1 font-bold">OUTCOME</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Full Figma Prototype</p>
              </div>
            </div>

            {/* LARGE HERO MOCKUP PREVIEW */}
            <div className="relative rounded-3xl overflow-hidden border border-mint/20 shadow-2xl bg-navy-light aspect-[16/9] flex items-center justify-center mt-6">
              <img
                src="/beacon-preview.png"
                alt="Beacon Hero Mockup"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* 2. PROBLEM SECTION */}
          <div className="pt-10 border-t border-mint/10 space-y-6">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Problem
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="font-sans text-base sm:text-lg text-offwhite/90 leading-relaxed">
                  Middle and high school students in grades 8–12 face overwhelming pressure trying to align their academic choices with career aspirations. Standard intelligence metrics evaluate only academic memory (IQ), ignoring emotional resilience (EQ) and physical wellness (PQ). Beacon bridges this gap by providing an integrated assessment model that translates complex multi-dimensional data into actionable, encouraging growth steps.
                </p>
              </div>

              {/* CALLOUT STAT CARD */}
              <div className="lg:col-span-4 bg-navy-light/80 p-6 sm:p-8 rounded-2xl border border-mint/30 shadow-xl flex flex-col justify-center items-center text-center">
                <span className="font-headline font-bold text-4xl sm:text-5xl text-coral block mb-2">
                  3-Axis
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 font-medium leading-snug">
                  IQ, EQ & PQ balanced evaluation framework
                </p>
              </div>
            </div>
          </div>

          {/* 3. KEY SYSTEM HIGHLIGHTS */}
          <div className="pt-10 border-t border-mint/10 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              FEATURE DEEP-DIVES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy-light/60 p-6 sm:p-7 rounded-2xl border border-mint/20 space-y-3">
                <div className="w-10 h-10 rounded-full bg-mint/10 text-mint border border-mint/20 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-base text-offwhite">Multi-Dimensional Scoring</h3>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Calculates balanced feedback combining cognitive reasoning, emotional awareness, and physical health habits into a single clear dashboard.
                </p>
              </div>

              <div className="bg-navy-light/60 p-6 sm:p-7 rounded-2xl border border-mint/20 space-y-3">
                <div className="w-10 h-10 rounded-full bg-mint/10 text-mint border border-mint/20 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-base text-offwhite">Guided Career Mapping</h3>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Recommends subject streams and extracurricular activities tailored specifically to the student's unique personality and strengths.
                </p>
              </div>

              <div className="bg-navy-light/60 p-6 sm:p-7 rounded-2xl border border-mint/20 space-y-3">
                <div className="w-10 h-10 rounded-full bg-mint/10 text-mint border border-mint/20 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-base text-offwhite">Calm Visual Architecture</h3>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Designed with serene pastel tones, high readability, and micro-interactions that keep testing anxiety to a minimum.
                </p>
              </div>
            </div>
          </div>

          {/* 4. PROTOTYPE */}
          <div className="pt-10 border-t border-mint/10 space-y-6 text-center">
            <h2 className="font-headline font-bold text-[30px] text-mint text-center">
              PROTOTYPE
            </h2>
            <p className="font-sans text-base text-offwhite/85">Explore the full Figma prototype</p>
            <div className="flex justify-center">
              <button
                onClick={() => alert('Opening Beacon Figma Prototype...')}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-coral text-navy font-headline font-bold text-sm hover:bg-coral-hover transition-colors shadow-lg cursor-pointer"
              >
                <span>View Interactive Prototype</span>
                <Download className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

        {/* 
          5. REFLECTION & NEXT PROJECT BUTTON SECTIONS (OFF-WHITE BACKGROUND WITH NAVY HEADING)
          NO HORIZONTAL DIVIDER LINE BETWEEN REFLECTION AND NEXT PROJECT BUTTON
        */}
        <div className="bg-offwhite text-navy py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto space-y-16">
            
            {/* REFLECTION SECTION */}
            <div className="space-y-6">
              <h2 className="font-headline font-bold text-[30px] text-navy text-left">
                Reflection
              </h2>

              {/* RECTANGLE PULL QUOTE (MULISH FONT ONLY) */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-navy/15 space-y-4 shadow-xl">
                <p className="font-sans text-base sm:text-lg text-navy leading-relaxed font-bold">
                  "Designing Beacon pushed me to ask how data can feel encouraging rather than intimidating for young students. Balancing technical data visualization with warm UI elements was the key breakthrough."
                </p>
              </div>
            </div>

            {/* NEXT PROJECT BUTTON SECTION (NO HORIZONTAL DIVIDER LINE) */}
            <div className="pt-6">
              <div className="space-y-3">
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-navy/50 block">
                  Next Project
                </span>

                <div
                  onClick={() => onNavigate('/projects/karmaquest')}
                  className="bg-navy text-offwhite border border-navy/20 hover:border-coral rounded-2xl p-6 sm:p-8 flex items-center justify-between transition-all duration-300 group cursor-pointer shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl text-offwhite tracking-tight group-hover:text-coral transition-colors">
                      KARMAQUEST
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-mint/80 mt-1">
                      A narrative game reimagining Mahapuranic morals for a digital generation
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-coral/10 text-coral border border-coral/30 flex items-center justify-center group-hover:bg-coral group-hover:text-navy transition-all duration-300 flex-shrink-0">
                    <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
