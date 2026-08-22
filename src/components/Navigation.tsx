import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [istTime, setIstTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (Asia/Kolkata)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sectionIds = ['work', 'about'];

    const handleScroll = () => {
      if (window.location.pathname !== '/') {
        if (window.location.pathname === '/archives') {
          setActiveSection('archives');
        } else {
          setActiveSection(null);
        }
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId?: string, isRoute?: boolean, routePath?: string) => {
    e.preventDefault();
    if (isRoute && routePath) {
      setActiveSection(sectionId || null);
      if (onNavigate) {
        onNavigate(routePath);
      } else {
        window.location.pathname = routePath;
      }
      return;
    }

    setActiveSection(sectionId || null);
    if (onNavigate) {
      onNavigate('/', sectionId);
    } else {
      if (window.location.pathname !== '/') {
        window.location.href = sectionId ? `/#${sectionId}` : '/';
      } else if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'work', label: 'Work', href: '/#work' },
    { id: 'about', label: 'About', href: '/#about' },
    { id: 'archives', label: 'Archives', href: '/archives', isRoute: true },
  ];

  return (
    <header className="fixed top-[18px] left-4 md:left-[50px] right-4 md:right-[50px] z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto bg-[#0d2b49] border border-[#13304E] rounded-[10px] shadow-[0px_8px_34px_rgba(0,0,0,0.34)] px-5 md:px-7 py-3 flex items-center justify-between pointer-events-auto backdrop-blur-md">

        {/* LEFT ZONE: Logo mark */}
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, undefined)}
            className="group flex items-center gap-2.5 text-offwhite hover:text-mint transition-colors cursor-pointer"
          >
            <span className="w-8 h-8 rounded-[8px] bg-mint text-navy font-headline font-bold text-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              IC
            </span>
            <span className="font-headline font-bold text-sm md:text-base tracking-tight text-offwhite">
              Isha Chaphekar
            </span>
          </a>
        </div>

        {/* CENTER ZONE: Navigation links */}
        <nav className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id, item.isRoute, item.href)}
                className={`text-xs md:text-sm font-sans relative py-1 transition-colors cursor-pointer ${isActive
                    ? 'text-mint font-semibold'
                    : 'font-medium text-offwhite/80 hover:text-mint after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-mint hover:after:w-full after:transition-all'
                  }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* RESUME BUTTON: #0d2b49 background, 1px Coral stroke, rounded-[10px], no download icon */}
          <a
            href="https://drive.google.com/file/d/1EKU9CL8M1yHmD2kVEIXG1PH8T5zNTIHl/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-1.5 rounded-[10px] bg-[#0d2b49] border border-[#FF6B4A] text-[#FF6B4A] font-sans font-bold text-xs hover:bg-[#FF6B4A] hover:text-[#00203F] transition-all duration-200 shadow-sm"
          >
            Resume
          </a>
        </nav>

        {/* RIGHT ZONE: Live IST clock */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-offwhite/70 bg-[#00203F]/50 px-3 py-1.5 rounded-[8px] border border-[#13304E]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          <span className="font-mono tracking-wide">
            IST — {istTime || '09:41 PM'}
          </span>
        </div>

      </div>
    </header>
  );
};

