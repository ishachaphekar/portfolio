import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Download, BookOpen, Play, Pause } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { PhoneFrame } from '../components/PhoneFrame';

interface KarmaQuestPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const KarmaQuestPage: React.FC<KarmaQuestPageProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isLightSection, setIsLightSection] = useState<boolean>(false);
  const [sliderTop, setSliderTop] = useState<number>(5);
  const navItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
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

  // Scroll to top and reset video recording to start on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Scroll spy to highlight active sticky column navigation section & detect background theme
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['overview', 'research', 'solution', 'ideate', 'prototype', 'reflection'];
      const scrollPosition = window.scrollY + 220;

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

      // Check if the current sidebar position overlaps a light background section container
      const sidebarY = window.scrollY + 250;
      let light = false;
      
      const solutionEl = document.getElementById('section-solution');
      const prototypeEl = document.getElementById('section-prototype');
      const reflectionEl = document.getElementById('section-reflection');

      if (solutionEl) {
        const top = solutionEl.offsetTop;
        const bottom = top + solutionEl.offsetHeight;
        if (sidebarY >= top && sidebarY <= bottom) {
          light = true;
        }
      }

      if (prototypeEl) {
        const top = prototypeEl.offsetTop;
        const bottom = top + prototypeEl.offsetHeight;
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
        className={`hidden xl:flex fixed top-0 bottom-0 right-0 h-screen w-40 sm:w-44 z-30 flex-col justify-start pt-36 px-4 sm:px-5 border-l-[0.5px] transition-colors duration-300 pointer-events-auto ${
          isLightSection
            ? 'border-navy/20'
            : 'border-mint/30'
        }`}
      >
        <div className="relative py-1.5 flex flex-col space-y-2">
          
          {/* 0.5px SLIDER KNOB EXACTLY ALIGNED WITH TEXT ON THE LEFT STROKE */}
          <div
            className={`absolute top-0 -left-[16px] sm:-left-[20px] w-[1px] rounded-full transition-all duration-300 ${
              isLightSection
                ? 'bg-coral shadow-[0_0_6px_rgba(255,107,74,0.8)]'
                : 'bg-mint shadow-[0_0_6px_rgba(173,239,209,0.9)]'
            }`}
            style={{
              height: '18px',
              transform: `translateY(${sliderTop}px)`,
            }}
          />

          {/* OVERVIEW ITEM (MULISH FONT 14-16PX ALIGNED WITH SLIDER) */}
          <button
            ref={(el) => { navItemRefs.current['overview'] = el; }}
            onClick={() => scrollToSection('overview')}
            className={`h-7 flex items-center text-left font-sans text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
              activeSection === 'overview'
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
              className={`w-6 border-t-[0.5px] transition-colors duration-300 ${
                isLightSection ? 'border-navy/20' : 'border-mint/25'
              }`}
            />
          </div>

          {/* OTHER SECTIONS (MULISH FONT 14-16PX ALIGNED WITH SLIDER) */}
          {[
            { id: 'research', label: 'Research' },
            { id: 'solution', label: 'Solution' },
            { id: 'ideate', label: 'Ideate' },
            { id: 'prototype', label: 'Prototype' },
            { id: 'reflection', label: 'Reflection' },
          ].map((sec) => (
            <button
              key={sec.id}
              ref={(el) => { navItemRefs.current[sec.id] = el; }}
              onClick={() => scrollToSection(sec.id)}
              className={`h-7 flex items-center text-left font-sans text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
                activeSection === sec.id
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

            {/* MAIN HEADING (NO PROJECT 01 OR PILL) */}
            <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite tracking-tight leading-tight max-w-5xl">
              Turning ancient Puranic dilemmas into a modern game of choices
            </h1>

            {/* INTRO PARAGRAPH */}
            <p className="font-sans text-base sm:text-lg text-offwhite/85 leading-relaxed max-w-5xl">
              KarmaQuest is a narrative-based mobile game for adults aged 20-40 who feel disconnected from inner peace amid career and life pressures. Players navigate real-life dilemmas through 5 characters, each linked to an element, making morally grey choices that shape their outcome — turning ancient Puranic wisdom into a modern decision-making tool.
            </p>

            {/* QUICK FACTS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 pt-6">
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">ROLE</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">UX/UI Designer</p>
              </div>
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">TIMELINE</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">21 weeks</p>
              </div>
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">TOOLS</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Figma, Procreate, AI tools</p>
              </div>
              <div className="bg-navy-light/80 p-5 rounded-2xl border border-mint/20 hover:border-mint/40 transition-colors shadow-sm flex flex-col justify-center">
                <span className="font-headline text-[11px] uppercase tracking-wider text-mint block mb-1.5 font-bold">PLATFORM</span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-offwhite">Mobile app / game</p>
              </div>
            </div>

            {/* LARGE HERO MOCKUP PREVIEW */}
            <div className="relative rounded-3xl overflow-hidden border border-mint/20 shadow-2xl bg-navy-light aspect-[16/7.8] flex items-center justify-center mt-8">
              <video
                src="/karmaquest-placeholder-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-top block"
              />
            </div>
          </div>

          {/* 2. PROBLEM SECTION */}
          <div className="pt-16 border-t border-mint/15 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Problem
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="font-sans text-base sm:text-lg text-offwhite/90 leading-relaxed">
                  Ancient Indian moral philosophy holds relevant guidance, but feels inaccessible and disconnected from daily modern life. Young adults between 20 and 40 are in the most socially, emotionally, and career-demanding years of their lives — and a widening gap from the value systems that once built resilience is leaving them without accessible guidance for tough decisions. The people who felt this most: urban and semi-urban adults aged 20-40 with regular digital exposure, stressed by ambition and financial pressure, and struggling to "let go."
                </p>
              </div>

              {/* CALLOUT STAT CARD */}
              <div className="lg:col-span-4 bg-navy-light/80 p-6 sm:p-8 rounded-2xl border border-mint/30 shadow-xl flex flex-col justify-center items-center text-center">
                <span className="font-headline font-bold text-4xl sm:text-5xl text-coral block mb-2">
                  109
                </span>
                <p className="font-sans text-xs sm:text-sm text-offwhite/85 font-medium leading-snug">
                  survey responses backing this problem
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
                Before a single screen got designed, this project needed a foundation in unfamiliar territory — Vedic and Puranic philosophy. That meant going directly to the source.
              </p>
            </div>

            {/* PRIMARY RESEARCH — INTERVIEWS */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Primary research — interviews
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/10 hover:border-mint/30 transition-colors space-y-3">
                  <span className="font-headline font-bold text-base text-mint block">
                    Mr. Ganesh Thite
                  </span>
                  <span className="font-sans text-xs text-coral block font-semibold">
                    Retired HOD, Sanskrit Dept., Pune University
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/80 leading-relaxed pt-3 border-t border-mint/10">
                    "Walked through the structure of the Vedic literature and how the Puranas simplify complex philosophical inquiry into accessible narrative — directly shaping the 'story-first' approach to the game."
                  </p>
                </div>

                <div className="bg-navy-light/60 p-6 sm:p-8 rounded-2xl border border-mint/10 hover:border-mint/30 transition-colors space-y-3">
                  <span className="font-headline font-bold text-base text-mint block">
                    Mr. Arun Vaze
                  </span>
                  <span className="font-sans text-xs text-coral block font-semibold">
                    Vedic scholar & pandit, Pune Ved Paathshaala
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-offwhite/80 leading-relaxed pt-3 border-t border-mint/10">
                    "Explained how Vedic wisdom guides individuals from atman (self) toward paramatman (universal soul) — a throughline that informed the game's karma-based progression."
                  </p>
                </div>
              </div>
            </div>

            {/* SURVEY — 109 RESPONSES WITH SURVEY.PNG */}
            <div className="space-y-6 pt-8 border-t border-mint/10">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Survey — 109 responses, ages 20+
              </h3>
              <p className="font-sans text-sm sm:text-base text-offwhite/80 leading-relaxed">
                A Google form survey was conducted with a carefully designed questionnaire to help people aged 20+ introspect themselves. The questionnaire contains questions revolving around one's mental and emotional well being, which would help the people gain deeper awareness about themselves.
              </p>

              {/* SURVEY IMAGE CONTAINER — NO EXTRA BACKGROUND */}
              <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
                <img
                  src="/survey.png"
                  alt="Survey Results - 109 responses"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              {/* CALLOUT BOX BELOW SURVEY IMAGE */}
              <div className="bg-navy-light/80 p-6 sm:p-7 rounded-2xl border border-mint/20">
                <p className="font-sans text-xs sm:text-sm text-offwhite/90 leading-relaxed">
                  <strong className="text-mint font-bold">Key Insight:</strong> 96.3% of respondents believe timeless wisdom is still relevant today. Nearly 60% said work & career stress dominates daily life — and overthinking topped the list of traits people most wanted to change about themselves.
                </p>
              </div>
            </div>

            {/* EMPATHY MAPPING WITH EMPATHY MAPPING.PNG */}
            <div className="space-y-6 pt-16 sm:pt-20 border-t border-mint/10">
              <h3 className="font-headline font-bold text-lg sm:text-xl text-offwhite tracking-tight">
                Empathy mapping — segmented by age & gender
              </h3>

              {/* EMPATHY MAPPING IMAGE CONTAINER — NO EXTRA BACKGROUND */}
              <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
                <img
                  src="/empathy-mapping.png"
                  alt="Empathy Mapping — segmented by age & gender"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              {/* CROSS-GROUP PATTERN CALLOUT BOX */}
              <div className="bg-navy-light/80 p-6 sm:p-7 rounded-2xl border border-mint/20">
                <p className="font-sans text-xs sm:text-sm text-offwhite/90 leading-relaxed">
                  <strong className="text-mint font-bold">Cross-group pattern:</strong> The mind is most restless between 20-40; thoughts, emotions, and surroundings dominate, and self-control stays low. Past 41, self-control rises and emotions grow more submissive. Women across every age group lean on journaling and meditation to cope; men rarely do.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* OBSERVATIONS & SOLUTIONS — COMPLETE SCREEN WIDTH OFF-WHITE BACKGROUND */}
        <div id="section-solution" className="bg-offwhite text-navy py-20 w-full">
          <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-navy text-left">
              Observations & Solutions
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-navy/15 shadow-md items-center">
                <div className="md:col-span-5 space-y-1">
                  <span className="font-headline text-xs text-coral font-bold uppercase tracking-wider block">01 · OBSERVATION</span>
                  <p className="font-sans text-xs sm:text-sm text-navy/80 font-medium">Emotional guidance matters most under 40 — past 41, self-control takes over.</p>
                </div>
                <div className="hidden md:block md:col-span-1 text-center text-navy/40 font-bold text-xl">→</div>
                <div className="md:col-span-6 space-y-1">
                  <span className="font-headline text-xs text-navy font-bold uppercase tracking-wider block">SOLUTION</span>
                  <p className="font-sans text-xs sm:text-sm font-bold text-navy">Narrowed the target audience to 20-40 year-olds specifically, rather than a broad adult range.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-navy/15 shadow-md items-center">
                <div className="md:col-span-5 space-y-1">
                  <span className="font-headline text-xs text-coral font-bold uppercase tracking-wider block">02 · OBSERVATION</span>
                  <p className="font-sans text-xs sm:text-sm text-navy/80 font-medium">Women across every age group lean on journaling and meditation to cope; men rarely do.</p>
                </div>
                <div className="hidden md:block md:col-span-1 text-center text-navy/40 font-bold text-xl">→</div>
                <div className="md:col-span-6 space-y-1">
                  <span className="font-headline text-xs text-navy font-bold uppercase tracking-wider block">SOLUTION</span>
                  <p className="font-sans text-xs sm:text-sm font-bold text-navy">Built reflective 'pause' moments into the game after each choice, regardless of player gender.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-navy/15 shadow-md items-center">
                <div className="md:col-span-5 space-y-1">
                  <span className="font-headline text-xs text-coral font-bold uppercase tracking-wider block">03 · OBSERVATION</span>
                  <p className="font-sans text-xs sm:text-sm text-navy/80 font-medium">Of 6 shortlisted formats (Six Thinking Hats), a digital game scored most impactful and practical.</p>
                </div>
                <div className="hidden md:block md:col-span-1 text-center text-navy/40 font-bold text-xl">→</div>
                <div className="md:col-span-6 space-y-1">
                  <span className="font-headline text-xs text-navy font-bold uppercase tracking-wider block">SOLUTION</span>
                  <p className="font-sans text-xs sm:text-sm font-bold text-navy">Committed to an interactive narrative game over a passive format like a graphic novel or website.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAVY CONTAINER PART 2 */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 space-y-24 md:space-y-28 pb-16">

          {/* 4. DEFINING THE EXPERIENCE */}
          <div className="pt-10 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Defining the Experience
            </h2>

            <p className="font-sans text-base sm:text-lg text-offwhite/90 leading-relaxed">
              The final structure: 5 fictional characters, each linked to an elemental core drawn from the Panchamahabhuta, with personality traits tied to their element. The game unfolds across 3 stages, each built around a dilemma with two choices — one morally high, one potentially grey. As the story progresses, the line between the two thins. At the end of each stage, players see the consequences, karma points, and elemental shift their choices caused — and the game closes with one of 5 possible endings, plus a lesson drawn from the Mahapuranas tied to that ending.
            </p>

            <div className="space-y-4 pt-2">
              <span className="font-headline font-bold text-xs uppercase tracking-wider text-offwhite/60 block">
                The 5 Mahapuranic stories behind it:
              </span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6">
                {[
                  'Keshidhvaja and Khandikya',
                  'Ribhu and Nidagha',
                  'Chitraketu',
                  'Jadabharata',
                  'Shumbh-Nishumbha and Durga',
                ].map((story, idx) => (
                  <span
                    key={idx}
                    className="px-5 py-2.5 rounded-full bg-navy-light text-mint border border-mint/20 font-sans text-xs sm:text-sm font-medium hover:border-mint/40 transition-colors shadow-sm"
                  >
                    {story}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5. USER FLOW */}
          <div id="section-ideate" className="pt-16 border-t border-mint/15 space-y-6">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              User Flow
            </h2>

            {/* USER FLOW IMAGE CONTAINER — NO EXTRA BACKGROUND */}
            <div className="rounded-2xl border border-mint/20 shadow-xl overflow-hidden my-6">
              <img
                src="/userflow-game.png"
                alt="User Flow Diagram — KarmaQuest"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>

            {/* CALLOUT BOX BELOW USER FLOW IMAGE */}
            <div className="bg-navy-light/80 p-6 sm:p-7 rounded-2xl border border-mint/20 shadow-xl">
              <p className="font-sans text-xs sm:text-sm text-offwhite/90 leading-relaxed">
                <strong className="text-mint font-bold">Mapping the full playthrough:</strong> Launch → gender select → character choice → 3 branching stages, each with 3 choices leading to consequences → one of several possible endings. Mapped out before any screen was designed, to make sure the branching logic actually held together.
              </p>
            </div>
          </div>

          {/* 6. WIREFRAMES */}
          <div className="pt-16 border-t border-mint/15 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Wireframes
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
              {[
                { label: 'Homepage flow', src: '/wf-homepage-flow.png' },
                { label: 'Stage 1 — Awakening', src: '/wf-stage1-awakening.png' },
                { label: 'Branching choice', src: '/wf-branching-choice.png' },
                { label: 'Ending stage', src: '/wf-ending-stage.png' },
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
          </div>

          {/* 7. VISUAL IDENTITY */}
          <div className="pt-16 border-t border-mint/15 space-y-8">
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

                  <div className="space-y-5">
                    {/* PRIMARY */}
                    <div>
                      <span className="text-xs font-headline font-bold text-mint uppercase tracking-wider block mb-2">
                        PRIMARY
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-[#2F0446] text-white p-3.5 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Russian Violet</span>
                          <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#2F0446</span>
                        </div>
                        <div className="bg-[#68169E] text-white p-3.5 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Chinese Purple</span>
                          <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#68169E</span>
                        </div>
                        <div className="bg-[#F17447] text-white p-3.5 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Mandarin</span>
                          <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#F17447</span>
                        </div>
                      </div>
                    </div>

                    {/* SECONDARY */}
                    <div>
                      <span className="text-xs font-headline font-bold text-mint uppercase tracking-wider block mb-2">
                        SECONDARY
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-[#3BFFE2] text-navy p-3.5 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Turquoise</span>
                          <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#3BFFE2</span>
                        </div>
                        <div className="bg-[#EFBF04] text-navy p-3.5 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">American Yellow</span>
                          <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#EFBF04</span>
                        </div>
                        <div className="bg-[#435A23] text-white p-3.5 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-xs sm:text-sm leading-tight block">Dark Moss Green</span>
                          <span className="font-mono text-[10px] sm:text-xs opacity-85 block">#435A23</span>
                        </div>
                      </div>
                    </div>

                    {/* TERTIARY */}
                    <div>
                      <span className="text-xs font-headline font-bold text-mint uppercase tracking-wider block mb-2">
                        TERTIARY
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-[#6C73B2] text-white p-3 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-[11px] sm:text-xs leading-tight block">Toolbox</span>
                          <span className="font-mono text-[10px] opacity-85 block">#6C73B2</span>
                        </div>
                        <div className="bg-[#94D6FA] text-navy p-3 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-[11px] sm:text-xs leading-tight block">Pale Cyan</span>
                          <span className="font-mono text-[10px] opacity-85 block">#94D6FA</span>
                        </div>
                        <div className="bg-[#E2E1E3] text-navy p-3 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-[11px] sm:text-xs leading-tight block">Platinum</span>
                          <span className="font-mono text-[10px] opacity-85 block">#E2E1E3</span>
                        </div>
                        <div className="bg-[#1B1B1B] text-white p-3 rounded-xl h-18 sm:h-20 flex flex-col justify-end shadow-sm">
                          <span className="font-sans font-bold text-[11px] sm:text-xs leading-tight block">Eerie Black</span>
                          <span className="font-mono text-[10px] opacity-85 block">#1B1B1B</span>
                        </div>
                      </div>
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

                  <div className="space-y-6 sm:space-y-7">
                    {/* Amoria */}
                    <div className="space-y-1">
                      <span className="font-sans font-bold text-sm text-mint block leading-tight">Amoria</span>
                      <span className="font-sans text-xs text-offwhite/60 block mb-2">Logo typeface</span>
                      <p className="font-headline font-bold text-2xl sm:text-3xl text-offwhite tracking-tight">
                        KarmaQuest
                      </p>
                    </div>

                    {/* NamiW04 — Bold */}
                    <div className="space-y-1 pt-4 border-t border-mint/10">
                      <span className="font-sans font-bold text-sm text-mint block leading-tight">NamiW04 — Bold</span>
                      <span className="font-sans text-xs text-offwhite/60 block mb-2">Screen headers, game titles, stage names</span>
                      <p className="font-headline font-bold text-xl sm:text-2xl text-offwhite tracking-tight">
                        Choose your character
                      </p>
                    </div>

                    {/* Petita — Medium / Bold */}
                    <div className="space-y-1 pt-4 border-t border-mint/10">
                      <span className="font-sans font-bold text-sm text-mint block leading-tight">Petita — Medium / Bold</span>
                      <span className="font-sans text-xs text-offwhite/60 block mb-2">Sub-headings, body text, dialogues</span>
                      <p className="font-sans font-bold text-2xl sm:text-3xl text-offwhite tracking-wide">
                        Aa Bb Cc
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. FEATURE DEEP-DIVES */}
          <div className="pt-16 border-t border-mint/15 space-y-8">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Feature Deep-Dives
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
              {/* COLUMN 1: CHOOSING YOUR CHARACTER */}
              <div className="space-y-4 flex flex-col items-center text-left">
                <div className="w-[70%] mx-auto space-y-4">
                  <div className="relative rounded-2xl border border-mint/20 shadow-xl bg-navy-light overflow-visible">
                    <img
                      src="/choosing-character.png"
                      alt="Choosing your character"
                      className="w-full h-auto block rounded-2xl"
                    />
                    {/* Spotlight / Highlight Box over heading + character cards */}
                    <div
                      className="absolute border-2 border-mint rounded-xl pointer-events-none"
                      style={{ top: '17.5%', left: '-4.5%', width: '109%', height: '74%' }}
                    />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-headline font-bold text-base text-coral block">
                      Choosing your character
                    </h3>
                    <p className="font-sans text-[10px] sm:text-xs text-offwhite/85 leading-relaxed">
                      Five characters, five elemental cores. This is the first real commitment a player makes — who they'll see the story through — so each portrait needed enough personality to make the choice feel personal, not arbitrary.
                    </p>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: THE DILEMMA (MULTI-SCREENSHOT STACK) */}
              <div className="space-y-4 flex flex-col items-center text-left">
                <div className="w-[70%] mx-auto space-y-4">
                  <div className="space-y-3.5">
                    {/* Dilemma 1: Dialogue bubble highlight (upper part of dialogues) */}
                    <div className="relative rounded-2xl border border-mint/20 shadow-xl bg-navy-light overflow-visible">
                      <img
                        src="/the-dilemma-1.png"
                        alt="The dilemma — Dialogue"
                        className="w-full h-auto block rounded-2xl"
                      />
                      <div
                        className="absolute border-2 border-mint rounded-xl pointer-events-none"
                        style={{ top: '5%', left: '-4.5%', width: '109%', height: '62%' }}
                      />
                    </div>
                    {/* Dilemma 2: Choice buttons highlight (both buttons covered) */}
                    <div className="relative rounded-2xl border border-mint/20 shadow-xl bg-navy-light overflow-visible">
                      <img
                        src="/the-dilemma-2.png"
                        alt="The dilemma — Choices"
                        className="w-full h-auto block rounded-2xl"
                      />
                      <div
                        className="absolute border-2 border-mint rounded-xl pointer-events-none"
                        style={{ top: '21%', left: '-1.5%', width: '103%', height: '56%' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-headline font-bold text-base text-coral block">
                      The dilemma
                    </h3>
                    <p className="font-sans text-[10px] sm:text-xs text-offwhite/85 leading-relaxed">
                      Dialogue-driven, not menu-driven — the moral weight of each choice needed to come through conversation, the way it would in real life, not as a flat multiple-choice prompt.
                    </p>
                  </div>
                </div>
              </div>

              {/* COLUMN 3: KARMA & CONSEQUENCE */}
              <div className="space-y-4 flex flex-col items-center text-left">
                <div className="w-[70%] mx-auto space-y-4">
                  <div className="relative rounded-2xl border border-mint/20 shadow-xl bg-navy-light overflow-visible">
                    <img
                      src="/karma-consequence.png"
                      alt="Karma & Consequence"
                      className="w-full h-auto block rounded-2xl"
                    />
                    {/* Spotlight / Highlight Box over karma meter + elemental balance panel */}
                    <div
                      className="absolute border-2 border-mint rounded-xl pointer-events-none"
                      style={{ top: '14%', left: '-4.5%', width: '109%', height: '68%' }}
                    />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-headline font-bold text-base text-coral block">
                      Karma & consequence
                    </h3>
                    <p className="font-sans text-[10px] sm:text-xs text-offwhite/85 leading-relaxed">
                      Every choice visibly shifts karma points and elemental balance. Making that shift visible — not just implied — was what turned the game from a story you read into a story you're accountable for.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* USER INTERFACE SECTION — MATCHED BACKGROUND WITH SEAMLESS IMAGE BLEND */}
        <div id="section-prototype" className="bg-white text-navy py-12 sm:py-16 md:py-24 my-12 overflow-hidden w-full">
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
                  src="/ui-onboarding.png"
                  alt="KarmaQuest — User Interface Onboarding"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 2. HOMEPAGE SECTION */}
              <div className="w-full flex justify-center">
                <img
                  src="/ui-homepage.png"
                  alt="KarmaQuest — User Interface Homepage Section"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 3. STAGE 1 */}
              <div className="w-full flex justify-center">
                <img
                  src="/ui-stage1.png"
                  alt="KarmaQuest — User Interface Stage 1"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 4. STAGE 2 */}
              <div className="w-full flex justify-center">
                <img
                  src="/ui-stage2.png"
                  alt="KarmaQuest — User Interface Stage 2"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 5. STAGE 3 */}
              <div className="w-full flex justify-center">
                <img
                  src="/ui-stage3.png"
                  alt="KarmaQuest — User Interface Stage 3"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

              {/* 6. ENDING SCREENS */}
              <div className="w-full flex justify-center">
                <img
                  src="/ui-ending-screens.png"
                  alt="KarmaQuest — User Interface Ending Screens"
                  className="w-full h-auto block object-contain"
                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </div>

        {/* NAVY CONTAINER PART 3 */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 pb-16">
          {/* 10. PROTOTYPE SECTION */}
          <div className="pt-16 pb-12 space-y-10">
            <h2 className="font-headline font-bold text-[30px] text-mint text-left">
              Prototype
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center justify-between">
              {/* LEFT COLUMN: GAME RECORDING ALIGNED TO LEFT EDGE OF CONTAINER */}
              <div className="flex justify-center md:justify-start">
                <div 
                  onClick={togglePlay}
                  className="relative group rounded-[28px] sm:rounded-[32px] overflow-hidden bg-black border-4 border-navy-light/40 w-full max-w-[260px] sm:max-w-[300px] aspect-[9/19.5] shadow-2xl flex items-center justify-center cursor-pointer"
                >
                  <video
                    ref={videoRef}
                    src="/final-game-screen-recording.mp4"
                    className="w-full h-full object-contain block"
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

                  {/* PLAY / PAUSE OVERLAY BUTTON (0% OPACITY WHEN PLAYING, 100% WHEN PAUSED) */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300 pointer-events-none ${
                      isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
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

              {/* RIGHT COLUMN: TEXT ABOVE DOWNLOAD BUTTON MOVED TOWARDS RIGHT EDGE TO DISTRIBUTE SPACE EQUALLY */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-6 md:ml-auto max-w-md">
                <p className="font-headline font-bold text-2xl sm:text-3xl text-offwhite tracking-tight">
                  Play the full game
                </p>

                <button
                  onClick={() => alert('Launching KarmaQuest prototype demo...')}
                  className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-coral text-navy font-headline font-bold text-sm sm:text-base hover:bg-coral-hover transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.03]"
                >
                  <span>Download & Play</span>
                  <Download className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 
          11. REFLECTION & NEXT PROJECT BUTTON SECTIONS (OFF-WHITE BACKGROUND WITH NAVY HEADING)
          NO HORIZONTAL DIVIDER LINE BETWEEN REFLECTION AND NEXT PROJECT BUTTON
        */}
        <div id="section-reflection" className="bg-offwhite text-navy py-24 w-full">
          <div className="max-w-6xl mx-auto px-6 md:px-12 xl:pr-32 space-y-20">
            
            {/* REFLECTION SECTION */}
            <div className="space-y-8">
              <h2 className="font-headline font-bold text-[30px] text-navy text-left">
                Reflection
              </h2>

              {/* RECTANGLE PULL QUOTE (MULISH FONT ONLY) */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-navy/15 space-y-4 shadow-xl">
                <p className="font-sans text-base sm:text-lg text-navy leading-relaxed font-bold">
                  "KarmaQuest began with a quiet urge — to bring the timeless wisdom of ancient Indian texts into today's world, to make them breathe. That was my first challenge: not the design, but the weight of the content. Then came the next question — how do I translate this for my generation? Not as lectures, not as textbook rewrites. That's when the idea of a game came in."
                </p>
              </div>

              {/* OUTSIDE RECTANGLE IN GREYISH COLOUR (MULISH FONT ONLY) - ALIGNED WITH TEXT INSIDE BOX */}
              <p className="font-sans text-sm sm:text-base text-navy/70 leading-relaxed px-6 sm:px-10 pt-2">
                Working within a 21-week academic timeline meant learning game UX and narrative design while simultaneously diving into Vedic philosophy — a subject with zero prior familiarity. The project stayed mostly solo, with dev support from a friend only for the Angular/CSS build. AI tools helped generate scenes to reach visual realism at a scale one person could actually pull off alone.
              </p>
            </div>

            {/* NEXT PROJECT BUTTON SECTION (NO HORIZONTAL DIVIDER LINE) */}
            <div className="pt-6">
              <div className="space-y-4">
                <span className="font-headline font-bold text-sm sm:text-base uppercase tracking-widest text-navy block">
                  Next Project
                </span>

                <div
                  onClick={() => onNavigate('/projects/beacon')}
                  className="bg-navy text-offwhite border border-navy/20 hover:border-coral rounded-2xl p-6 sm:p-8 flex items-center justify-between transition-all duration-300 group cursor-pointer shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl text-offwhite tracking-tight group-hover:text-coral transition-colors">
                      BEACON
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-mint/80 mt-1">
                      A mobile app measuring IQ, EQ & PQ to guide students in grades 8–12
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
