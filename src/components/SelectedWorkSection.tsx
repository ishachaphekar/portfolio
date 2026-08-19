import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  role: string;
  timeline: string;
  outcome: string;
  imageSrc: string;
  route: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'karmaquest',
    title: 'KarmaQuest',
    description: 'A narrative game reimagining Mahapuranic morals for a digital generation.',
    role: 'I worked as the sole UX/UI Designer, Researcher, and Game Designer for the project.',
    timeline: '21 weeks',
    outcome: 'The project resulted in a functional narrative mobile game prototype, along with its brand identity and supporting research documentation.',
    imageSrc: '/karmaquest-preview.jpg',
    route: '/projects/karmaquest',
  },
  {
    id: 'beacon',
    title: 'Beacon',
    description: 'A mobile app measuring IQ, EQ & PQ to guide students in grades 8–12.',
    role: 'I worked as the Lead UX/UI Designer & Researcher for the product.',
    timeline: '4 weeks',
    outcome: 'The project resulted in a full end-to-end interactive Figma prototype.',
    imageSrc: '/beacon-preview.png',
    route: '/projects/beacon',
  },
];

interface SelectedWorkSectionProps {
  onNavigate?: (path: string) => void;
}

// Project card with attached image & three-column information strip
const ProjectCard: React.FC<{ project: ProjectItem; onClick?: () => void }> = ({ project, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gradient-to-br from-white via-white to-mint/10 rounded-b-3xl rounded-tr-3xl border border-navy/10 p-6 md:p-10 shadow-xl flex flex-col justify-between min-h-[540px] md:min-h-[600px] w-full relative z-10 cursor-pointer group"
  >
    {/* THREE-COLUMN INFORMATION STRIP */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-navy/10 items-start">
      {/* COLUMN 1: Heading & Subline */}
      <div className="md:col-span-4 space-y-2">
        <h3 className="font-headline font-bold text-2xl md:text-3xl text-navy group-hover:text-coral transition-colors">
          {project.title}
        </h3>
        <p className="font-sans text-sm text-navy/80 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* COLUMN 2: ROLE & TIMELINE */}
      <div className="md:col-span-4 space-y-4">
        <div>
          <span className="font-headline font-bold text-[11px] uppercase tracking-wider text-navy/40 block mb-1">
            ROLE
          </span>
          <p className="font-sans text-xs text-navy/80 font-medium leading-relaxed">
            {project.role}
          </p>
        </div>

        <div>
          <span className="font-headline font-bold text-[11px] uppercase tracking-wider text-navy/40 block mb-1">
            TIMELINE
          </span>
          <p className="font-sans text-xs text-navy/80 font-medium leading-relaxed">
            {project.timeline}
          </p>
        </div>
      </div>

      {/* COLUMN 3: OUTCOME */}
      <div className="md:col-span-4 space-y-1">
        <span className="font-headline font-bold text-[11px] uppercase tracking-wider text-navy/40 block mb-1">
          OUTCOME
        </span>
        <p className="font-sans text-xs text-navy/80 font-medium leading-relaxed">
          {project.outcome}
        </p>
      </div>
    </div>

    {/* ENLARGED PROJECT SCREENSHOT / IMAGE FRAME */}
    <div className="relative overflow-hidden rounded-2xl bg-navy/5 border border-navy/10 h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center mt-6">
      <img
        src={project.imageSrc}
        alt={project.title}
        className="w-full h-full object-cover object-center rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-102"
      />
    </div>
  </div>
);

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Custom cursor state
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-linked progress (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const offset = -rect.top;
      const progress = Math.max(0, Math.min(1, offset / totalScrollable));
      setScrollProgress(progress);
      setActiveStep(progress < 0.5 ? 0 : 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Tab click handler
  const handleTabClick = (idx: number) => {
    if (!isMobile && sectionRef.current) {
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const target =
        sectionRef.current.offsetTop + (idx === 0 ? totalScrollable * 0.2 : totalScrollable * 0.8);
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      setActiveStep(idx);
    }
  };

  // Beacon slide-up calculation: 0.40 → 0.75 progress range
  const SLIDE_START = 0.40;
  const SLIDE_END = 0.75;
  
  const beaconTranslateY =
    scrollProgress < SLIDE_START
      ? 100
      : scrollProgress >= SLIDE_END
      ? 0
      : 100 - ((scrollProgress - SLIDE_START) / (SLIDE_END - SLIDE_START)) * 100;

  // Opacity: hide Beacon and its tab when KarmaQuest is active (scrollProgress < 0.40)
  const beaconOpacity =
    scrollProgress < SLIDE_START
      ? 0
      : Math.min(1, (scrollProgress - SLIDE_START) / 0.08);

  const activeProject = PROJECTS[activeStep];

  const handleCardClick = (project: ProjectItem) => {
    if (onNavigate) {
      onNavigate(project.route);
    } else {
      window.location.pathname = project.route;
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative bg-offwhite text-navy m-0 ${
        isMobile ? 'py-16 px-6' : 'h-[200vh] px-6 md:px-12'
      }`}
    >
      {/* STICKY INNER WRAPPER */}
      <div
        className={
          isMobile
            ? 'w-full max-w-5xl mx-auto'
            : 'sticky top-20 max-w-5xl mx-auto py-4'
        }
        style={{ position: isMobile ? undefined : 'sticky' }}
      >
        {/* Decorative background blobs */}
        <div className="absolute -left-32 top-1/4 w-72 h-72 bg-mint/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-1/4 w-80 h-80 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

        {/* SECTION HEADING */}
        <div className="text-left mb-8 relative z-10">
          <h2 className="font-headline font-bold text-[32px] sm:text-[45px] text-navy tracking-tight leading-tight">
            Selected Work
          </h2>
        </div>

        {/*
         * CARD STACK CONTAINER WITH FOLDER TABS
         * Card 0 (KarmaQuest) is visible initially with its tab.
         * Card 1 (Beacon) & its tab remain completely hidden (opacity 0) until scroll progresses.
         */}
        <div
          className="relative overflow-visible rounded-3xl z-10"
          style={{ cursor: isCardHovered && !isMobile ? 'none' : 'auto' }}
          onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
          onMouseEnter={() => !isMobile && setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          {isMobile ? (
            <div className="space-y-14">
              {PROJECTS.map((project, idx) => (
                <div key={project.id} className="relative pt-10">
                  {/* Mobile Folder Tab */}
                  <button
                    onClick={() => handleTabClick(idx)}
                    className={`absolute top-0 left-0 h-10 px-6 rounded-t-xl border-t border-l border-r font-headline font-bold text-xs transition-all duration-300 flex items-center ${
                      activeStep === idx
                        ? 'bg-white border-navy/15 text-navy shadow-md'
                        : 'bg-navy/10 border-navy/10 text-navy/60 hover:text-navy'
                    }`}
                  >
                    {project.title}
                  </button>
                  <ProjectCard
                    project={project}
                    onClick={() => handleCardClick(project)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative pt-10">
              {/* KARMAQUEST CARD CONTAINER (Base layer, visible initially) */}
              <div className="relative z-10">
                {/* KarmaQuest Folder Tab */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClick(0);
                  }}
                  className={`absolute -top-10 left-0 h-10 px-7 rounded-t-2xl font-headline font-bold text-xs transition-all duration-300 flex items-center justify-center border-t border-l border-r ${
                    activeStep === 0
                      ? 'bg-white border-navy/10 text-navy z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-b-white translate-y-[1px]'
                      : 'bg-navy/10 border-navy/15 text-navy/60 hover:text-navy z-10 backdrop-blur-xs'
                  }`}
                >
                  {PROJECTS[0].title}
                </button>

                <ProjectCard
                  project={PROJECTS[0]}
                  onClick={() => handleCardClick(PROJECTS[0])}
                />
              </div>

              {/*
               * BEACON CARD CONTAINER & FOLDER TAB
               * Completely hidden (opacity 0, pointer-events none) when KarmaQuest is active.
               * Fades in and slides up seamlessly when user scrolls.
               */}
              <div
                className="absolute inset-x-0 top-10 bottom-0"
                style={{
                  zIndex: 20,
                  transform: `translateY(${beaconTranslateY}%)`,
                  opacity: beaconOpacity,
                  pointerEvents: beaconOpacity === 0 ? 'none' : 'auto',
                  transition: 'transform 40ms linear, opacity 120ms ease-out',
                }}
              >
                {/* Beacon Folder Tab */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClick(1);
                  }}
                  className={`absolute -top-10 left-[150px] h-10 px-7 rounded-t-2xl font-headline font-bold text-xs transition-all duration-300 flex items-center justify-center border-t border-l border-r ${
                    activeStep === 1
                      ? 'bg-white border-navy/10 text-navy z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-b-white translate-y-[1px]'
                      : 'bg-navy/10 border-navy/15 text-navy/60 hover:text-navy z-10 backdrop-blur-xs'
                  }`}
                >
                  {PROJECTS[1].title}
                </button>

                <ProjectCard
                  project={PROJECTS[1]}
                  onClick={() => handleCardClick(PROJECTS[1])}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CUSTOM CURSOR BUBBLE */}
      {isCardHovered && !isMobile && (
        <div
          onClick={() => handleCardClick(activeProject)}
          className="fixed z-[9999] pointer-events-none flex flex-col items-center justify-center rounded-full bg-coral text-navy shadow-xl cursor-pointer"
          style={{
            width: 64,
            height: 64,
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="font-headline font-bold text-[11px] leading-none">View</span>
          <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 stroke-[2.5]" />
        </div>
      )}
    </section>
  );
};
