import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Download, Play, Pause, ExternalLink } from 'lucide-react';
import { Navigation } from '../components/Navigation';

// Image & Video Assets (served from public/assets/)
const beaconHeroVideo = '/assets/Videos/Beacon hero placeholder.mp4';
const beaconPrototypeVideo = '/assets/Videos/Beacon prototype video.mp4';

const empathyMappingImg = '/assets/empathy mapping.png';
const competitiveAnalysisImg = '/assets/competative analysis.png';
const userJourneyImg = '/assets/User journey.png';
const siteMapImg = '/assets/site map.jpg';
const cardSortingImg = '/assets/card sorting.png';
const userPersona1Img = '/assets/User Persona 1.png';
const userPersona2Img = '/assets/User Persona 2.png';

// Wireframe Assets
const splashScreenImg = '/assets/Splash Screen.png';
const registerImg = '/assets/Register.png';
const profileImg = '/assets/Profile.png';
const homeScreenWfImg = '/assets/home screen.png';
const dashboardImg = '/assets/Dashboard.png';
const analysisWfImg = '/assets/analysis.png';
const reportImg = '/assets/Report.png';

// UI Assets
const onboardingImg = '/assets/Onboarding.png';
const profileSetupImg = '/assets/Profile setup.png';
const homeScreen1Img = '/assets/Home screen-1.png';
const homeScreen2Img = '/assets/Home screen-2.png';
const analysis1Img = '/assets/Analysis-1.png';
const analysis2Img = '/assets/Analysis-2.png';

interface BeaconPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const BeaconPage: React.FC<BeaconPageProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isLightSection, setIsLightSection] = useState<boolean>(false);
  const [sliderTop, setSliderTop] = useState<number>(5);
  const navItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [isPastProjectEnd, setIsPastProjectEnd] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Dynamically align slider knob with active section button text center
  useEffect(() => {
    const updateSlider = () => {
      const activeEl = navItemRefs.current[activeSection];
      if (activeEl) {
        setSliderTop(activeEl.offsetTop + activeEl.offsetHeight / 2 - 9);
      }
    };
    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeSection]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Scroll spy to highlight active sticky column navigation section & detect background theme
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'overview',
        'research',
        'journey',
        'userflow',
        'walkthrough',
        'reflection',
      ];
      const scrollPosition = window.scrollY + 220;

      // Fade out sidebar only when reaching the Next Project card past Reflection
      const nextProjectEl = document.getElementById('next-project-card');
      if (nextProjectEl) {
        const nextProjectTop = nextProjectEl.offsetTop - 100;
        if (window.scrollY >= nextProjectTop) {
          setIsPastProjectEnd(true);
        } else {
          setIsPastProjectEnd(false);
        }
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }

      // Check if current sidebar position overlaps a light background section container
      const sidebarY = window.scrollY + 250;
      let light = false;

      const walkthroughEl = document.getElementById('section-walkthrough');
      const reflectionEl = document.getElementById('section-reflection');

      if (walkthroughEl) {
        const top = walkthroughEl.offsetTop;
        const bottom = top + walkthroughEl.offsetHeight;
        if (sidebarY >= top && sidebarY <= bottom) {
          light = true;
        }
      }

      if (reflectionEl) {
        const top = reflectionEl.offsetTop;
        // From reflection top all the way down to the bottom of the page (footer)
        if (sidebarY >= top) {
          light = true;
        }
      }

      setIsLightSection(light);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy text-offwhite font-sans selection:bg-mint selection:text-navy">
      {/* FIXED NAVIGATION BAR */}
      <Navigation onNavigate={onNavigate} />

      {/* STICKY RIGHT SIDE COLUMN (FULL SCREEN HEIGHT, REDUCED WIDTH DOCKED TO RIGHT EDGE) */}
      <div
        className={`hidden xl:flex fixed top-0 bottom-0 right-0 h-screen w-40 sm:w-44 z-30 flex-col justify-start pt-36 px-4 sm:px-5 border-l-[0.5px] transition-all duration-300 pointer-events-auto ${
          isPastProjectEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${isLightSection
          ? 'border-navy/20'
          : 'border-mint/30'
          }`}
      >
        <div className="relative py-1.5 flex flex-col space-y-2">
          {/* 0.5px SLIDER KNOB EXACTLY ALIGNED WITH TEXT ON THE LEFT STROKE */}
          <div
            className={`absolute top-0 -left-[16px] sm:-left-[20px] w-[1px] rounded-full transition-all duration-300 ${isLightSection
              ? 'bg-coral shadow-[0_0_6px_rgba(255,107,74,0.8)]'
              : 'bg-mint shadow-[0_0_6px_rgba(173,239,209,0.9)]'
              }`}
            style={{
              height: '18px',
              transform: `translateY(${sliderTop}px)`,
            }}
          />

          {/* OVERVIEW ITEM */}
          <button
            ref={(el) => { navItemRefs.current['overview'] = el; }}
            onClick={() => scrollToSection('overview')}
            className={`h-7 flex items-center text-left font-sans text-sm sm:text-base transition-colors duration-200 cursor-pointer ${activeSection === 'overview'
              ? isLightSection
                ? 'text-coral font-bold'
                : 'text-mint font-bold'
              : isLightSection
                ? 'text-navy/60 hover:text-navy font-medium'
                : 'text-offwhite/60 hover:text-offwhite font-medium'
              }`}
          >
            Overview
          </button>

          {/* GAP & SMALL HORIZONTAL DIVIDER */}
          <div className="py-1">
            <div
              className={`w-6 border-t-[0.5px] transition-colors duration-300 ${isLightSection ? 'border-navy/20' : 'border-mint/25'
                }`}
            />
          </div>

          {/* OTHER SECTIONS */}
          {[
            { id: 'research', label: 'Research' },
            { id: 'journey', label: 'Analyse' },
            { id: 'userflow', label: 'Design' },
            { id: 'walkthrough', label: 'Prototype' },
            { id: 'reflection', label: 'Reflection' },
          ].map((sec) => (
            <button
              key={sec.id}
              ref={(el) => { navItemRefs.current[sec.id] = el; }}
              onClick={() => scrollToSection(sec.id)}
              className={`h-7 flex items-center text-left font-sans text-sm sm:text-base transition-colors duration-200 cursor-pointer ${activeSection === sec.id
                ? isLightSection
                  ? 'text-coral font-bold'
                  : 'text-mint font-bold'
                : isLightSection
                  ? 'text-navy/60 hover:text-navy font-medium'
                  : 'text-offwhite/60 hover:text-offwhite font-medium'
                }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* PAGE CONTAINER WITH TOP PADDING FOR FIXED NAVBAR */}
      <div className="pt-36 md:pt-48 pb-0">

        {/* NAVY CONTAINER PART 1 */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 space-y-24 md:space-y-28 pb-16">

          {/* 1. HERO SECTION */}
          <div id="section-overview" className="space-y-8">
            {/* BACK BUTTON ABOVE MAIN HEADING */}
            <div>
              <button
                onClick={() => onNavigate('/')}
                className="inline-flex items-center gap-3.5 text-offwhite hover:text-mint font-sans font-bold text-base transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-navy-light/80 border border-mint/30 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/20 group-hover:text-mint transition-all duration-300 shadow-sm">
                  <ArrowLeft className="w-5 h-5 stroke-[2.5] text-mint group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <span className="tracking-wide">Back</span>
              </button>
            </div>

            {/* MAIN HEADING */}
            <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite tracking-tight leading-tight max-w-5xl">
              Helping students understand themselves beyond the classroom
            </h1>

            {/* INTRO PARAGRAPH */}
            <p className="font-sans text-base sm:text-lg text-offwhite/85 leading-relaxed max-w-5xl">
              Beacon is a mobile app that measures a student's Intelligence, Emotional, and Physical Quotients in one place, translating results into personalized recommendations, growth areas, and career direction for students in grades 8–12, while keeping parents informed and involved.
            </p>

            {/* QUICK FACTS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 pt-6">
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">ROLE</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">UX/UI Designer</p>
              </div>
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">TIMELINE</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">4 weeks</p>
              </div>
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">TOOLS</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Figma, FigJam</p>
              </div>
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">PLATFORM</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Mobile app</p>
              </div>
            </div>

            {/* LARGE HERO MOCKUP PREVIEW WITH VIDEO */}
            <div className="relative rounded-3xl overflow-hidden border border-mint/20 shadow-2xl bg-navy-light aspect-[16/8] flex items-center justify-center mt-8">
              <video
                src={beaconHeroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-top block"
              />
            </div>
          </div>

          {/* 2. PROBLEM SECTION */}
          <div id="section-problem" className="pt-16 border-t border-mint/15 space-y-12">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Problem
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="font-sans text-base sm:text-lg text-offwhite/90 leading-relaxed">
                  Indian schools for grades 8–12 focus heavily on academic performance, leaving emotional (EQ) and physical (PQ) development largely unmeasured and unsupported. No single platform assesses IQ, EQ, and PQ together — existing methods are outdated and academics-only, and parents lack the tools to understand their child beyond grades.
                </p>
              </div>

              {/* CALLOUT STAT CARD */}
              <div className="lg:col-span-4 bg-navy-light/80 p-6 sm:p-8 rounded-2xl border border-mint/30 shadow-xl flex flex-col justify-center items-center text-center">
                <span className="font-headline font-bold text-4xl sm:text-5xl text-coral block mb-2">
                  0
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 font-medium leading-snug">
                  platforms currently integrate IQ + EQ + PQ assessment in one place
                </p>
              </div>
            </div>

            {/* 4W+1H BREAKDOWN — DIVIDED INTO 4 COLUMNS WITH DIVIDER LINES IN BETWEEN (NO BOUNDING BOXES) */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-mint/20 py-8 border-t border-mint/15 translate-y-[2px]">
              {/* WHAT */}
              <div className="md:px-6 py-4 md:py-0 space-y-2">
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-mint block">
                  WHAT
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Academics-only focus neglects personalized, holistic assessment.
                </p>
              </div>

              {/* WHEN */}
              <div className="md:px-6 py-4 md:py-0 space-y-2">
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-mint block">
                  WHEN
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Peaks during career-decision years, ages 13–18.
                </p>
              </div>

              {/* WHERE */}
              <div className="md:px-6 py-4 md:py-0 space-y-2">
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-mint block">
                  WHERE
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Schools across India, grades 8–12.
                </p>
              </div>

              {/* WHY */}
              <div className="md:px-6 py-4 md:py-0 space-y-2">
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-mint block">
                  WHY
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                  Parents lack detailed metrics to guide a child's holistic growth.
                </p>
              </div>
            </div>
          </div>

          {/* 3. RESEARCH, IN DEPTH */}
          <div id="section-research" className="pt-16 border-t border-mint/15 space-y-12">
            <div>
              <h2 className="font-headline font-bold text-[30px] text-mint text-left mb-4">
                Research, In Depth
              </h2>
              <p className="font-sans text-base sm:text-lg text-offwhite/85 leading-relaxed">
                Before a single screen got designed, this project needed to hold three very different lenses at once — a student being assessed, a parent wanting clarity, and a teacher needing something practical to actually use.
              </p>
            </div>

            {/* LITERATURE REVIEW */}
            <div className="space-y-4 pt-4">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Literature Review
              </h3>
              <p className="font-sans text-base sm:text-lg text-offwhite/85 leading-relaxed">
                Grounded in published research before any primary research began — International Journal of Indian Psychology, EPRA IJMR, National Library of Medicine, and Saudi Journal of Sports Medicine — establishing that EQ, IQ, and PQ each independently shape a child's development. This set the foundation before moving into original research below.
              </p>
            </div>

            {/* COMPETITIVE ANALYSIS */}
            <div className="space-y-6 pt-8 border-t border-mint/10">
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                  Competitive Analysis
                </h3>
                <p className="font-sans text-base sm:text-lg text-offwhite/85 leading-relaxed">
                  Studied existing assessment and development platforms to understand how they approach aptitude, personalization and career guidance. Benchmarked i-Tap / Jnana Prabodhini Aptitude Test, CambriLearn and Positive Intelligence across assessment type, age group, personalization, career guidance and accessibility.
                </p>
              </div>

              {/* COMPETITIVE ANALYSIS IMAGE CONTAINER */}
              <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
                <img
                  src={competitiveAnalysisImg}
                  alt="Competitive Analysis — Beacon"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              {/* SYNTHESIS CALLOUT BOX */}
              <div className="bg-navy-light/80 p-6 sm:p-7 rounded-2xl border border-mint/20">
                <p className="font-sans text-xs sm:text-sm text-offwhite/90 leading-relaxed">
                  <strong className="text-mint font-bold">Synthesis Callout:</strong> Benchmarked against i-Tap & Aptitude Test (Jnana Prabodhini), CambriLearn, and Positive Intelligence across assessment type, age group, personalization, and holistic focus — all indirect competitors. None combine IQ, EQ, and PQ in one platform the way Beacon does.
                </p>
              </div>
            </div>

            {/* PRIMARY RESEARCH — INTERVIEWS WITH TEACHERS & PERSONAS */}
            <div className="space-y-6 pt-12 border-t border-mint/10">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Primary research — interviews with teachers
              </h3>

              <div className="-mx-6 sm:-mx-12 md:-mx-20 lg:-mx-28 xl:-mx-36 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden bg-navy-light/60 p-3.5 flex items-center justify-center">
                  <img
                    src={userPersona1Img}
                    alt="User Persona 1 — Teacher"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden bg-navy-light/60 p-3.5 flex items-center justify-center">
                  <img
                    src={userPersona2Img}
                    alt="User Persona 2 — Teacher"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* EMPATHY MAPPING */}
            <div className="space-y-6 pt-12 border-t border-mint/10">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Empathy mapping — segmented by age & gender
              </h3>

              {/* EMPATHY MAPPING IMAGE CONTAINER */}
              <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
                <img
                  src={empathyMappingImg}
                  alt="Empathy Mapping — segmented by age & gender"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              {/* SYNTHESIS CALLOUT BOX */}
              <div className="bg-navy-light/80 p-6 sm:p-7 rounded-2xl border border-mint/20">
                <p className="font-sans text-xs sm:text-sm text-offwhite/90 leading-relaxed">
                  <strong className="text-mint font-bold">Synthesis Callout:</strong> Applied Says/Thinks/Does/Feels to both teacher personas — the common thread: hopeful about a comprehensive platform's potential, but frustrated by the limits of current academic-only assessment. Both frequently research or seek out better tools on their own initiative.
                </p>
              </div>
            </div>

            {/* INTERVIEWS WITH PSYCHOLOGISTS */}
            <div className="space-y-6 pt-12 border-t border-mint/10">
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                  Interviews with Psychologists
                </h3>
                <p className="font-sans text-xs sm:text-sm text-offwhite/80 leading-relaxed">
                  Once teacher interviews raised the question of how IQ, EQ, and PQ actually relate to each other, 5 practicing psychologists were interviewed to answer it — insights that directly shaped what 'personalized recommendations' needed to mean.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* 1. Mrs. Deepti Borkar */}
                <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/10 hover:border-mint/30 transition-colors space-y-3">
                  <span className="font-headline font-bold text-base text-mint block">
                    Mrs. Deepti Borkar
                  </span>
                  <span className="font-sans text-xs text-coral block font-semibold">
                    Parenting specialist, psychology since 2008
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 italic leading-relaxed pt-2 border-t border-mint/10">
                    "IQ remains stable throughout life, while EQ changes — making a direct correlation between them subjective."
                  </p>
                  <p className="font-sans text-xs text-mint/90 font-medium pt-1">
                    <strong className="text-offwhite font-semibold">Design response:</strong> Treated IQ and EQ as separate, non-predictive metrics rather than implying one determines the other.
                  </p>
                </div>

                {/* 2. Mr. Rakesh Sinha */}
                <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/10 hover:border-mint/30 transition-colors space-y-3">
                  <span className="font-headline font-bold text-base text-mint block">
                    Mr. Rakesh Sinha
                  </span>
                  <span className="font-sans text-xs text-coral block font-semibold">
                    Clinical psychology, 27 years
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 italic leading-relaxed pt-2 border-t border-mint/10">
                    "Focusing on the weak areas that result from these tests can be beneficial for the overall development of the child."
                  </p>
                  <p className="font-sans text-xs text-mint/90 font-medium pt-1">
                    <strong className="text-offwhite font-semibold">Design response:</strong> Report screens lead with growth areas framed constructively, not just a score.
                  </p>
                </div>

                {/* 3. Mrs. Ashwini Kurlekar */}
                <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/10 hover:border-mint/30 transition-colors space-y-3">
                  <span className="font-headline font-bold text-base text-mint block">
                    Mrs. Ashwini Kurlekar
                  </span>
                  <span className="font-sans text-xs text-coral block font-semibold">
                    Parent counselling, 25 years
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 italic leading-relaxed pt-2 border-t border-mint/10">
                    "These tests aren't readily accessible online, making it hard for parents to get a holistic view of their child's development."
                  </p>
                  <p className="font-sans text-xs text-mint/90 font-medium pt-1">
                    <strong className="text-offwhite font-semibold">Design response:</strong> Built a dedicated parent-facing view — not just a student report parents have to interpret alone.
                  </p>
                </div>

                {/* 4. Ms. Pooja Dehadrey */}
                <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/10 hover:border-mint/30 transition-colors space-y-3">
                  <span className="font-headline font-bold text-base text-mint block">
                    Ms. Pooja Dehadrey
                  </span>
                  <span className="font-sans text-xs text-coral block font-semibold">
                    Rehabilitation psychology
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 italic leading-relaxed pt-2 border-t border-mint/10">
                    "EQ is often neglected among all three, even though parents weigh IQ heavily when deciding careers."
                  </p>
                  <p className="font-sans text-xs text-mint/90 font-medium pt-1">
                    <strong className="text-offwhite font-semibold">Design response:</strong> Gave EQ equal visual weight to IQ throughout — same size, same position, same report treatment.
                  </p>
                </div>
              </div>
            </div>

            {/* INFLUENCE OF PARENTS — SUPPORTING STATS */}
            <div className="space-y-6 pt-12 border-t border-mint/10">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Influence of Parents — Supporting Stats
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <div className="bg-navy-light/80 p-6 sm:p-8 rounded-2xl border border-mint/30 shadow-xl flex flex-col justify-between items-center text-center h-full">
                  <div className="flex items-center justify-center min-h-[56px] sm:min-h-[64px] mb-2">
                    <span className="font-headline font-bold text-4xl sm:text-5xl text-coral block">
                      48%
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="font-sans text-xs sm:text-sm text-offwhite/85 font-medium leading-snug">
                      felt their parents influenced their career path
                    </p>
                  </div>
                </div>

                <div className="bg-navy-light/80 p-6 sm:p-8 rounded-2xl border border-mint/30 shadow-xl flex flex-col justify-between items-center text-center h-full">
                  <div className="flex items-center justify-center min-h-[56px] sm:min-h-[64px] mb-2">
                    <span className="font-headline font-bold text-4xl sm:text-5xl text-coral block">
                      40%
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="font-sans text-xs sm:text-sm text-offwhite/85 font-medium leading-snug">
                      felt pressured to follow parental advice
                    </p>
                  </div>
                </div>

                <div className="bg-navy-light/80 p-6 sm:p-8 rounded-2xl border border-mint/30 shadow-xl flex flex-col justify-between items-center text-center h-full">
                  <div className="flex items-center justify-center min-h-[56px] sm:min-h-[64px] mb-2">
                    <span className="font-headline font-bold text-4xl sm:text-5xl text-coral block">
                      82%
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="font-sans text-xs sm:text-sm text-offwhite/85 font-medium leading-snug">
                      of Indian parents highly involved in career decisions — highest globally
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. USER JOURNEY MAPPING */}
          <div id="section-journey" className="pt-16 border-t border-mint/15 space-y-6">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              User Journey Mapping — School Adoption
            </h2>

            <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
              <img
                src={userJourneyImg}
                alt="User Journey Mapping — School Adoption"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* DEFINING THE SOLUTION */}
          <div id="section-solution" className="pt-16 border-t border-mint/15 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Defining the solution
            </h2>

            <p className="font-sans text-base sm:text-lg text-offwhite/90 leading-relaxed">
              The proposed solution is a user-friendly mobile application designed to achieve the following:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              <div className="bg-navy-light/60 p-6 sm:p-7 rounded-2xl border border-mint/20 hover:border-mint/30 transition-colors space-y-3 flex flex-col justify-between">
                <div>
                  <span className="font-headline font-bold text-xs uppercase tracking-wider text-coral block mb-2">
                    01 · ASSESSMENTS
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                    Standardized tests for assessing IQ, EQ, and PQ, alongside the child’s interests, allowing for a comprehensive evaluation of each child’s capabilities.
                  </p>
                </div>
              </div>

              <div className="bg-navy-light/60 p-6 sm:p-7 rounded-2xl border border-mint/20 hover:border-mint/30 transition-colors space-y-3 flex flex-col justify-between">
                <div>
                  <span className="font-headline font-bold text-xs uppercase tracking-wider text-coral block mb-2">
                    02 · FEEDBACK
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                    Individualized feedback outlining the child’s strengths and weaknesses in each quotient, along with actionable recommendations for improvement according to the interest of the child.
                  </p>
                </div>
              </div>

              <div className="bg-navy-light/60 p-6 sm:p-7 rounded-2xl border border-mint/20 hover:border-mint/30 transition-colors space-y-3 flex flex-col justify-between">
                <div>
                  <span className="font-headline font-bold text-xs uppercase tracking-wider text-coral block mb-2">
                    03 · CAREER PATHS
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/85 leading-relaxed">
                    Potential career paths that align with the child’s strengths and interests.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD SORTING */}
          <div id="section-cardsorting" className="pt-16 border-t border-mint/15 space-y-6">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Card sorting
            </h2>

            <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
              <img
                src={cardSortingImg}
                alt="Card sorting — Beacon"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* 5. USER FLOW — MAPPING THE FULL PLAYTHROUGH */}
          <div id="section-userflow" className="pt-16 border-t border-mint/15 space-y-6">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              User Flow — mapping the full playthrough
            </h2>

            <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
              <img
                src={siteMapImg}
                alt="User Flow — Site Map"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* WIREFRAMES */}
          <div id="section-wireframes" className="pt-16 border-t border-mint/15 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Wireframes
            </h2>

            <div className="space-y-3.5 sm:space-y-4">
              {/* UPPER ROW: 4 ITEMS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 justify-center">
                {[
                  { label: 'Splash Screen', src: splashScreenImg },
                  { label: 'Registration', src: registerImg },
                  { label: 'Profile', src: profileImg },
                  { label: 'Home Screen', src: homeScreenWfImg },
                ].map((wf, idx) => (
                  <div
                    key={idx}
                    className="bg-navy-light/60 p-2 sm:p-2.5 rounded-2xl border border-mint/20 hover:border-mint/40 shadow-xl flex flex-col items-center justify-between hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-auto h-[235px] sm:h-[310px] md:h-[340px] aspect-[1572/3408] rounded-xl overflow-hidden flex items-center justify-center bg-navy/30 p-1">
                      <img
                        src={wf.src}
                        alt={wf.label}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="pt-2 pb-1 text-center w-full">
                      <span className="font-sans font-medium text-xs sm:text-sm text-offwhite block leading-snug group-hover:text-mint transition-colors">
                        {wf.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* LOWER ROW: 3 ITEMS CENTERED DIRECTLY UNDER UPPER ROW */}
              <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
                {[
                  { label: 'Dashboard', src: dashboardImg },
                  { label: 'Analysis', src: analysisWfImg },
                  { label: 'Report', src: reportImg },
                ].map((wf, idx) => (
                  <div
                    key={idx}
                    className="w-[calc(50%-7px)] md:w-[calc(25%-12px)] flex-shrink-0 bg-navy-light/60 p-2 sm:p-2.5 rounded-2xl border border-mint/20 hover:border-mint/40 shadow-xl flex flex-col items-center justify-between hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-full h-[235px] sm:h-[310px] md:h-[340px] aspect-[1572/3408] rounded-xl overflow-hidden flex items-center justify-center bg-navy/30 p-1">
                      <img
                        src={wf.src}
                        alt={wf.label}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="pt-2 pb-1 text-center w-full">
                      <span className="font-sans font-medium text-xs sm:text-sm text-offwhite block leading-snug group-hover:text-mint transition-colors">
                        {wf.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. VISUAL IDENTITY */}
          <div id="section-visuals" className="pt-16 border-t border-mint/15 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Visual Identity
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* Color Palette Card */}
              <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/20 hover:border-mint/30 transition-colors flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-headline font-bold text-xs uppercase tracking-wider text-offwhite/60 block mb-5">
                    Colour Palette
                  </span>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Yellow */}
                      <div className="bg-[#F3E47D] text-navy p-3.5 rounded-xl h-20 flex flex-col justify-end shadow-sm">
                        <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Yellow</span>
                        <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#F3E47D · CMYK 0,10,49,5</span>
                      </div>

                      {/* Orange */}
                      <div className="bg-[#F18750] text-white p-3.5 rounded-xl h-20 flex flex-col justify-end shadow-sm">
                        <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Orange</span>
                        <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#F18750 · CMYK 0,44,67,5</span>
                      </div>

                      {/* White */}
                      <div className="bg-[#FFFFFF] text-navy border border-navy/20 p-3.5 rounded-xl h-20 flex flex-col justify-end shadow-sm">
                        <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">White</span>
                        <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#FFFFFF · CMYK 0,0,0,0</span>
                      </div>

                      {/* Black */}
                      <div className="bg-[#151515] text-white p-3.5 rounded-xl h-20 flex flex-col justify-end shadow-sm">
                        <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Black</span>
                        <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#151515 · CMYK 0,0,0,92</span>
                      </div>
                    </div>

                    {/* Grey */}
                    <div className="bg-[#D9D9D9] text-navy p-3.5 rounded-xl h-16 flex flex-col justify-end shadow-sm">
                      <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Grey</span>
                      <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#D9D9D9 · CMYK 0,0,0,15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Card */}
              <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/20 hover:border-mint/30 transition-colors flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-headline font-bold text-xs uppercase tracking-wider text-offwhite/60 block mb-5">
                    Typography
                  </span>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="font-sans font-bold text-sm text-mint block leading-tight">Main Typeface: Poppins</span>
                      <span className="font-sans text-xs text-offwhite/60 block mb-2">Clean, accessible geometric typography</span>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-mint/10 text-xs sm:text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-mint/5">
                        <span className="font-bold text-offwhite text-lg">Headline</span>
                        <span className="text-mint font-mono">Bold / 24</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-mint/5">
                        <span className="font-semibold text-offwhite text-base">Title 1</span>
                        <span className="text-mint font-mono">SemiBold / 17</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-mint/5">
                        <span className="font-normal text-offwhite text-base">Title 2</span>
                        <span className="text-mint font-mono">Regular / 17</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-mint/5">
                        <span className="font-normal text-offwhite text-sm">Body Large</span>
                        <span className="text-mint font-mono">Regular / 14</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-mint/5">
                        <span className="font-normal text-offwhite text-xs">Body Medium</span>
                        <span className="text-mint font-mono">Regular / 11</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="font-normal text-offwhite text-[10px]">Caption / Small</span>
                        <span className="text-mint font-mono">Regular / 8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* USER INTERFACE SECTION — MATCHED BACKGROUND WITH SEAMLESS IMAGE BLEND */}
        <div id="section-walkthrough" className="bg-white text-navy py-12 sm:py-16 md:py-24 my-12 overflow-hidden w-full">
          {/* HEADING CONTAINER ALIGNED WITH THE REST OF THE SITE */}
          <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32">
            <h2 className="font-headline font-bold text-[30px] text-navy text-left">
              User Interface
            </h2>
          </div>

          {/* EXPANDED CONTENT CONTAINER FOR MAXIMUM IMAGE READABILITY & EQUAL DIMENSION ALIGNMENT */}
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 xl:pr-32 mt-6 sm:mt-8">
            <div className="w-full flex flex-col items-center gap-0">
              
              {/* 1. ONBOARDING */}
              <div className="w-full flex justify-center">
                <img
                  src={onboardingImg}
                  alt="Beacon — User Interface Onboarding"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 2. PROFILE SETUP */}
              <div className="w-full flex justify-center">
                <img
                  src={profileSetupImg}
                  alt="Beacon — User Interface Profile Setup"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 3. HOME SCREEN 1 */}
              <div className="w-full flex justify-center">
                <img
                  src={homeScreen1Img}
                  alt="Beacon — User Interface Home Screen 1"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 4. HOME SCREEN 2 */}
              <div className="w-full flex justify-center">
                <img
                  src={homeScreen2Img}
                  alt="Beacon — User Interface Home Screen 2"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 5. ANALYSIS 1 */}
              <div className="w-full flex justify-center">
                <img
                  src={analysis1Img}
                  alt="Beacon — User Interface Analysis 1"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 6. ANALYSIS 2 */}
              <div className="w-full flex justify-center">
                <img
                  src={analysis2Img}
                  alt="Beacon — User Interface Analysis 2"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </div>

        {/* NAVY CONTAINER PART 2 */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 pb-16">
          {/* 7. PROTOTYPE SECTION */}
          <div id="section-prototype" className="pt-16 pb-12 space-y-10">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Prototype
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center justify-between">
              {/* LEFT COLUMN: APP RECORDING */}
              <div className="flex justify-center md:justify-start">
                <div
                  onClick={togglePlay}
                  className="relative group rounded-[28px] sm:rounded-[32px] overflow-hidden bg-black border-4 border-navy-light/40 w-full max-w-[260px] sm:max-w-[300px] aspect-[9/19.5] shadow-2xl flex items-center justify-center cursor-pointer"
                >
                  <video
                    ref={videoRef}
                    src={beaconPrototypeVideo}
                    className="w-full h-full object-cover object-center scale-[1.02] block"
                    playsInline
                    loop
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                      }
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* PLAY / PAUSE OVERLAY BUTTON */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                      }`}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy/85 border border-mint/40 text-mint flex items-center justify-center shadow-lg backdrop-blur-md">
                      {isPlaying ? (
                        <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-mint/30" />
                      ) : (
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-mint/80 translate-x-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PROTOTYPE CALLOUT & BUTTON (CENTRALLY ALIGNED WITH EACH OTHER) */}
              <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
                <p className="font-headline font-bold text-2xl sm:text-3xl text-offwhite tracking-tight">
                  View the Figma Prototype
                </p>

                <button
                  onClick={() => alert('Launching Beacon Figma prototype...')}
                  className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-coral text-navy font-headline font-bold text-sm sm:text-base hover:bg-coral-hover transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.03]"
                >
                  <span>Interactive Prototype</span>
                  <ExternalLink className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* REFLECTION & NEXT PROJECT BUTTON SECTIONS (OFF-WHITE BACKGROUND WITH NAVY HEADING) */}
        <div id="section-reflection" className="bg-offwhite text-navy py-24 w-full">
          <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 space-y-20">

            {/* REFLECTION SECTION */}
            <div className="space-y-8">
              <h2 className="font-headline font-bold text-[30px] text-navy text-left">
                Reflection
              </h2>

              {/* RECTANGLE PULL QUOTE */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-navy/15 space-y-4 shadow-xl">
                <p className="font-sans text-base sm:text-lg text-navy leading-relaxed font-bold">
                  "It all started with a question — what if we looked beyond the grades and inferred a child's strengths and weaknesses at an early stage? Designing this app meant wearing many hats: a child, a parent, a teacher, and almost a psychologist. Beacon became more than a product — it became a belief that every child deserves to know their strength, not just be told about it."
                </p>
              </div>

              {/* SUPPORTING LINE IN GREYISH COLOUR */}
              <p className="font-sans text-sm sm:text-base text-navy/70 leading-relaxed px-6 sm:px-10 pt-2">
                Working within a tight 4-week sprint meant balancing sensitive psychological and developmental data into an interface that never feels clinical or exam-like — resolving that tension became the real design problem, more than the UI itself.
              </p>
            </div>

            {/* NEXT PROJECT BUTTON SECTION */}
            <div id="next-project-card" className="pt-6">
              <div className="space-y-4">
                <span className="font-headline font-bold text-sm sm:text-base uppercase tracking-widest text-navy block">
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
