import React, { useState, useRef, useEffect } from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { ArrowLeft } from 'lucide-react';

interface NoteState {
  id: string;
  text: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  x: number;
  y: number;
  zIndex: number;
  rotation: number;
  dragRotation: number;
  pinType: 'pin' | 'tape' | 'tape-alt';
  parallaxSpeed: number;
}

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(20);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // 3 Elongated Sticky Notes with distinct colors, font, and tactile details
  const [notes, setNotes] = useState<NoteState[]>([
    {
      id: 'note-1',
      text: 'picks the hardest, messiest problem in the room — on purpose',
      bgColor: 'bg-mint',
      textColor: 'text-navy font-bold',
      borderColor: 'border-navy/10',
      x: 0,
      y: 0,
      zIndex: 10,
      rotation: -3,
      dragRotation: 0,
      pinType: 'tape',
      parallaxSpeed: -0.15,
    },
    {
      id: 'note-2',
      text: "reads every screen like there's a design decision hiding in it",
      bgColor: 'bg-offwhite',
      textColor: 'text-navy font-bold',
      borderColor: 'border-navy/15',
      x: 0,
      y: 0,
      zIndex: 11,
      rotation: 2.5,
      dragRotation: 0,
      pinType: 'pin',
      parallaxSpeed: -0.08,
    },
    {
      id: 'note-3',
      text: 'my process: research → question → make → refine',
      bgColor: 'bg-navy-light',
      textColor: 'text-mint font-bold',
      borderColor: 'border-mint/20',
      x: 0,
      y: 0,
      zIndex: 12,
      rotation: -1.5,
      dragRotation: 0,
      pinType: 'tape-alt',
      parallaxSpeed: -0.22,
    },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; initialNoteX: number; initialNoteY: number } | null>(null);

  // Initialize note positions (tight cluster, shifted slightly downward)
  useEffect(() => {
    const initPositions = () => {
      if (!sectionRef.current) return;
      const w = sectionRef.current.clientWidth;
      const h = sectionRef.current.clientHeight;
      const isMobile = w < 768;

      setNotes((prev) => [
        {
          ...prev[0],
          x: isMobile ? Math.max(12, w * 0.05) : w * 0.58,
          y: isMobile ? h * 0.60 : h * 0.28,
        },
        {
          ...prev[1],
          x: isMobile ? Math.max(12, w * 0.08) : w * 0.62,
          y: isMobile ? h * 0.72 : h * 0.44,
        },
        {
          ...prev[2],
          x: isMobile ? Math.max(12, w * 0.05) : w * 0.56,
          y: isMobile ? h * 0.84 : h * 0.60,
        },
      ]);
      setIsInitialized(true);
    };

    initPositions();
    window.addEventListener('resize', initPositions);
    return () => window.removeEventListener('resize', initPositions);
  }, []);

  // Track window scroll position for scroll-driven parallax movement
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pointer Down handler: Bring note to top z-index & start drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    const newZ = highestZIndex + 1;
    setHighestZIndex(newZ);

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, zIndex: newZ } : n))
    );

    const targetNote = notes.find((n) => n.id === id);
    if (!targetNote) return;

    setDraggingId(id);
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      initialNoteX: targetNote.x,
      initialNoteY: targetNote.y,
    };
  };

  // Pointer Move handler: Drag freely ANYWHERE within the ENTIRE Hero section
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId || !dragStartRef.current || !sectionRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.pointerX;
    const deltaY = e.clientY - dragStartRef.current.pointerY;

    const sectionWidth = sectionRef.current.clientWidth;
    const sectionHeight = sectionRef.current.clientHeight;

    const noteWidth = e.currentTarget.offsetWidth || 310;
    const noteHeight = e.currentTarget.offsetHeight || 110;

    const maxX = Math.max(0, sectionWidth - noteWidth - 10);
    const maxY = Math.max(0, sectionHeight - noteHeight - 10);

    const newX = Math.max(10, Math.min(maxX, dragStartRef.current.initialNoteX + deltaX));
    const newY = Math.max(10, Math.min(maxY, dragStartRef.current.initialNoteY + deltaY));

    const tilt = Math.min(8, Math.max(-8, deltaX * 0.12));

    setNotes((prev) =>
      prev.map((n) => (n.id === draggingId ? { ...n, x: newX, y: newY, dragRotation: tilt } : n))
    );
  };

  // Pointer Up handler
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDraggingId(null);
      dragStartRef.current = null;

      setNotes((prev) =>
        prev.map((n) => ({ ...n, dragRotation: 0 }))
      );
    }
  };

  // Find 2nd note position for positioning instruction label cleanly to its right
  const note2 = notes.find((n) => n.id === 'note-2');
  const note2Y = note2 ? note2.y + scrollY * note2.parallaxSpeed + 40 : 0;
  const note2X = note2 ? note2.x + 330 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen pt-16 pb-6 px-6 md:px-12 flex flex-col justify-center bg-navy text-offwhite overflow-hidden m-0 select-none"
    >
      {/* Background Subtle Accent Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-mint/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT COLUMN: MAIN HERO CONTENT (Repositioned slightly up & toward center, smart negative space) */}
          <div className="lg:col-span-7 z-10 pointer-events-auto -mt-4">

            {/* OPPORTUNITY PILL */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/20 text-mint text-xs md:text-sm font-sans font-medium mb-9 transition-all hover:bg-mint/15">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-breathing absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-coral" />
              </span>
              <span>{HERO_DATA.opportunityPill}</span>
            </div>

            {/* INTRO BLOCK: +20% PROFILE PHOTO FIRST + "hi, I'm Isha" + #5F6B83 SUB-TEXT */}
            <div className="mb-9 space-y-2">
              <div className="flex items-center gap-6">

                {/* 1. ROUNDED VERTICAL RECTANGLE PROFILE PHOTO */}
                <div
                  className="w-24 h-28 sm:w-28 sm:h-34 rounded-2xl bg-navy-light border-2 border-mint/30 shadow-xl overflow-hidden flex-shrink-0 transform rotate-[6deg] hover:rotate-0 transition-transform duration-300"
                  title="Isha Chaphekar — Profile Photo"
                >
                  <img
                    src="/isha-profile.jpg"
                    alt="Isha Chaphekar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* 2. "hi, I'm Isha" TEXT & #5F6B83 SINGLE LINE SUB-TEXT */}
                <div className="flex flex-col justify-center gap-2">
                  <span className="font-script text-coral text-3xl md:text-4xl font-bold tracking-wide">
                    {HERO_DATA.personalIntro}
                  </span>

                  {/* Single Line Text in #5F6B83 */}
                  <p className="text-xs sm:text-sm md:text-base font-sans font-medium text-[#5F6B83] tracking-wide">
                    UI/UX Designer | Research-First Design | Exploring UX + AI
                  </p>
                </div>

              </div>
            </div>

            {/* HERO HEADLINE */}
            <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-[1.15] mb-7 tracking-tight max-w-2xl">
              {HERO_DATA.headline}
            </h1>

            {/* SUB-LINE */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-offwhite/70 max-w-xl leading-relaxed">
              {HERO_DATA.subline}
            </p>

          </div>

          {/* RIGHT COLUMN SPACER FOR GRID */}
          <div className="lg:col-span-5 h-[340px] hidden lg:block pointer-events-none" />

        </div>
      </div>

      {/* HERO-WIDE DRAGGABLE STICKY NOTES (Clustered tighter, shifted downward) */}
      {isInitialized &&
        notes.map((note) => {
          const totalY = note.y + scrollY * note.parallaxSpeed;
          const totalRotation = note.rotation + note.dragRotation;
          const isDragging = draggingId === note.id;

          return (
            <div
              key={note.id}
              onPointerDown={(e) => handlePointerDown(e, note.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                left: `${note.x}px`,
                top: `${totalY}px`,
                zIndex: note.zIndex,
                transform: `rotate(${totalRotation}deg) scale(${isDragging ? 1.08 : 1})`,
                touchAction: 'none',
              }}
              className={`hidden md:block absolute w-[290px] sm:w-[320px] p-5 rounded-2xl border shadow-xl cursor-grab active:cursor-grabbing select-none transition-transform transition-shadow duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl ${note.bgColor} ${note.textColor} ${note.borderColor} ${isDragging ? 'shadow-2xl ring-2 ring-coral/60 scale-108' : ''
                }`}
            >
              {/* TACTILE DETAILS */}
              {note.pinType === 'pin' && (
                <div className="absolute -top-2 left-5 w-4 h-4 rounded-full bg-coral border border-offwhite/60 shadow-md flex items-center justify-center pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-navy/60" />
                </div>
              )}

              {note.pinType === 'tape' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-offwhite/35 border-t border-b border-white/50 backdrop-blur-xs rounded-xs rotate-[-2deg] shadow-xs pointer-events-none" />
              )}

              {note.pinType === 'tape-alt' && (
                <div className="absolute -top-3 right-5 w-12 h-4 bg-mint/45 border-t border-b border-mint/50 backdrop-blur-xs rounded-xs rotate-[3deg] shadow-xs pointer-events-none" />
              )}

              {/* NOTE TEXT */}
              <p className="font-script text-lg md:text-xl tracking-wide leading-snug pt-1 pointer-events-none">
                {note.text}
              </p>
            </div>
          );
        })}

      {/* HANDWRITTEN INSTRUCTION PLACED TO THE RIGHT OF THE 2ND STICKY NOTE */}
      {/* {isInitialized && note2 && (
        <div
          style={{
            left: `${note2X}px`,
            top: `${note2Y}px`,
          }}
          className="absolute z-30 hidden xl:flex items-center gap-2 text-mint/80 font-script text-base md:text-lg select-none pointer-events-none whitespace-nowrap transition-all duration-150"
        >
          <ArrowLeft className="w-4 h-4 text-mint/80 stroke-[2.5]" />
          <span>you can move these around</span>
        </div>
      )} */}
    </section>
  );
};
