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
  imageClassName?: string;
  isUpcoming?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'karmaquest',
    title: 'KarmaQuest',
    description: 'A narrative game reimagining Mahapuranic morals for a digital generation.',
    role: 'I worked as the sole UX/UI Designer, Researcher, and Game Designer for the project.',
    timeline: '21 weeks',
    outcome: 'The project resulted in a functional narrative mobile game prototype, along with its brand identity and supporting research documentation.',
    imageSrc: '/karmaquest-preview.webp',
    route: '/projects/karmaquest',
  },
  {
    id: 'beacon',
    title: 'Beacon',
    description: 'A mobile app measuring IQ, EQ & PQ to guide students in grades 8–12.',
    role: 'I worked as the Lead UX/UI Designer & Researcher for the product.',
    timeline: '4 weeks',
    outcome: 'The project resulted in a full end-to-end interactive Figma prototype.',
    imageSrc: '/beacon-preview.webp',
    route: '/projects/beacon',
  },
  {
    id: 'nirogya',
    title: 'Nirogya',
    description: 'Connecting tier-3 and rural patients to doctor consultations and licensed local pharmacies, from diagnosis to doorstep.',
    role: 'Solo UX/UI designer and researcher',
    timeline: '2 weeks',
    outcome: 'An end-to-end healthcare platform prototype, spanning telemedicine and pharmacy fulfillment, along with its brand identity and supporting research.',
    imageSrc: '/assets/Project container mockup image.webp',
    route: '/projects/nirogya',
    imageClassName: 'scale-[1.47] -translate-y-6 md:-translate-y-8',
    isUpcoming: true,
  },
];

interface SelectedWorkSectionProps {
  onNavigate?: (path: string) => void;
}

// Project card with attached image & three-column information strip
const ProjectCard: React.FC<{ project: ProjectItem; onClick?: () => void }> = ({ project, onClick }) => (
  <div
    onClick={project.isUpcoming ? undefined : onClick}
    className="bg-gradient-to-br from-white via-white to-mint/10 rounded-b-3xl rounded-tr-3xl border border-navy/10 p-6 md:p-10 shadow-xl flex flex-col justify-between min-h-[540px] md:min-h-[600px] w-full relative z-10 cursor-pointer group"
  >
    {/* THREE-COLUMN INFORMATION STRIP */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-navy/10 items-start">
      {/* COLUMN 1: Heading & Subline */}
      <div className="md:col-span-4 space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-headline font-bold text-2xl md:text-3xl text-navy group-hover:text-coral transition-colors">
            {project.title}
          </h3>
          {project.isUpcoming && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/10 border border-mint/30 text-navy font-sans font-medium text-xs">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span>Upcoming</span>
            </div>
          )}
        </div>
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
        className={`w-full h-full object-cover object-center rounded-2xl shadow-sm transition-transform duration-500 ${project.imageClassName || 'group-hover:scale-102'
          }`}
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
      const STICKY_TOP = 96; // matches sticky top-24 (96px offset)
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const offset = STICKY_TOP - rect.top;
      const progress = Math.max(0, Math.min(1, offset / totalScrollable));
      setScrollProgress(progress);

      const totalTransitions = Math.max(1, PROJECTS.length - 1);
      const step = Math.min(
        PROJECTS.length - 1,
        Math.floor(progress * totalTransitions + 0.5)
      );
      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Tab click handler
  const handleTabClick = (idx: number) => {
    if (!isMobile && sectionRef.current) {
      const STICKY_TOP = 96;
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const totalTransitions = Math.max(1, PROJECTS.length - 1);
      const targetProgress = idx / totalTransitions;
      const targetScroll = sectionRef.current.offsetTop - STICKY_TOP + totalScrollable * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      setActiveStep(idx);
    }
  };

  const handleCardClick = (project: ProjectItem) => {
    if (project.isUpcoming) return;
    if (onNavigate) {
      onNavigate(project.route);
    } else {
      window.location.pathname = project.route;
    }
  };

  const activeProject = PROJECTS[activeStep];
  const totalTransitions = Math.max(1, PROJECTS.length - 1);

  // Dynamic runway height tied to number of project cards (85vh per card transition)
  const dynamicSectionHeight = isMobile ? 'auto' : `${100 + totalTransitions * 85}vh`;

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ height: dynamicSectionHeight }}
      className={`relative bg-offwhite text-navy m-0 overflow-x-clip ${isMobile ? 'py-8 px-6' : 'py-8 px-6 md:px-12'
        }`}
    >
      {/* STICKY INNER WRAPPER */}
      <div
        className={
          isMobile
            ? 'w-full max-w-5xl mx-auto'
            : 'sticky top-24 max-w-5xl mx-auto py-2'
        }
      >
        {/* Decorative background blobs */}
        <div className="absolute -left-32 top-1/4 w-72 h-72 bg-mint/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-1/4 w-80 h-80 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

        {/* SECTION HEADING */}
        <div className="text-left pt-2 mb-8 relative z-10">
          <h2 className="font-headline font-bold text-[32px] sm:text-[45px] text-navy tracking-tight leading-tight">
            Selected Work
          </h2>
        </div>

        {/* CARD STACK CONTAINER WITH FOLDER TABS */}
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
                    className={`absolute top-0 left-0 h-10 w-[160px] px-4 rounded-t-xl border-t border-l border-r font-headline font-bold text-xs transition-all duration-300 flex items-center justify-center truncate ${activeStep === idx
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
              {PROJECTS.map((project, idx) => {
                let translateY = 0;
                let opacity = 1;
                let pointerEvents: 'auto' | 'none' = 'auto';

                if (idx > 0) {
                  const baseStart = (idx - 1) / totalTransitions;
                  const slideEnd = idx / totalTransitions;
                  const activeSlideStart = baseStart + 0.04; // 4% scroll delay buffer so card is hidden on initial view

                  if (scrollProgress < activeSlideStart) {
                    translateY = 100;
                    opacity = 0;
                    pointerEvents = 'none';
                  } else if (scrollProgress >= slideEnd) {
                    translateY = 0;
                    opacity = 1;
                    pointerEvents = 'auto';
                  } else {
                    const ratio = (scrollProgress - activeSlideStart) / (slideEnd - activeSlideStart);
                    translateY = (1 - ratio) * 100;
                    opacity = Math.min(1, ratio / 0.15); // smooth 15% initial fade-in
                    pointerEvents = 'auto';
                  }
                }

                const isActiveTab = activeStep === idx;
                const tabLeftOffset = idx * 165; // side-by-side accumulation

                return (
                  <div
                    key={project.id}
                    className={
                      idx === 0
                        ? 'relative z-10'
                        : 'absolute top-10 left-0 right-0 w-full'
                    }
                    style={
                      idx === 0
                        ? undefined
                        : {
                          zIndex: 10 + idx * 10,
                          transform: `translateY(${translateY}%)`,
                          opacity: opacity,
                          pointerEvents: pointerEvents,
                          willChange: 'transform, opacity',
                        }
                    }
                  >
                    {/* Folder Tab */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClick(idx);
                      }}
                      style={{ left: `${tabLeftOffset}px` }}
                      className={`absolute -top-10 h-10 w-[160px] px-4 rounded-t-2xl font-headline font-bold text-xs flex items-center justify-center truncate border-t border-l border-r transition-all duration-300 ${isActiveTab
                          ? 'bg-white border-navy/10 text-navy z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-b-white translate-y-[1px]'
                          : 'bg-navy/10 border-navy/15 text-navy/60 hover:text-navy z-10 backdrop-blur-xs'
                        }`}
                    >
                      {project.title}
                    </button>

                    <ProjectCard
                      project={project}
                      onClick={() => handleCardClick(project)}
                    />
                  </div>
                );
              })}
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
