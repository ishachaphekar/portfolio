import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [istTime, setIstTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId?: string, isRoute?: boolean, routePath?: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

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
    { id: 'blog', label: 'Blog', href: 'https://medium.com/@ishachaphekar', isExternal: true },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 md:top-[18px] md:left-[50px] md:right-[50px] z-50 w-full md:w-auto transition-all duration-300 pointer-events-none">
        <div className="w-full max-w-full md:max-w-6xl mx-auto bg-[#0d2b49] border-b border-[#13304E] md:border md:rounded-[10px] shadow-[0px_8px_34px_rgba(0,0,0,0.34)] px-4 sm:px-6 md:px-7 py-3 flex items-center justify-between pointer-events-auto backdrop-blur-md box-border">

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

          {/* CENTER ZONE: Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-5 md:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (item.isExternal) {
                      setIsMobileMenuOpen(false);
                    } else {
                      handleNavClick(e, item.id, item.isRoute, item.href);
                    }
                  }}
                  className={`text-xs md:text-sm font-sans relative py-1 transition-colors cursor-pointer ${isActive
                    ? 'text-mint font-semibold'
                    : 'font-medium text-offwhite/80 hover:text-mint after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-mint hover:after:w-full after:transition-all'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* RESUME BUTTON */}
            <a
              href="https://drive.google.com/file/d/13m6idqr8j7YP4kXHdYHuGaX9IalfvzHa/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-[10px] bg-[#0d2b49] border border-[#FF6B4A] text-[#FF6B4A] font-sans font-bold text-xs hover:bg-[#FF6B4A] hover:text-[#00203F] transition-all duration-200 shadow-sm"
            >
              Resume
            </a>
          </nav>

          {/* RIGHT ZONE: Desktop Live IST clock & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-sans text-offwhite/70 bg-[#00203F]/50 px-3 py-1.5 rounded-[8px] border border-[#13304E]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="font-mono tracking-wide">
                IST — {istTime || '09:41 PM'}
              </span>
            </div>

            {/* HAMBURGER BUTTON (Mobile / Tablet portrait) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center p-2 rounded-lg text-offwhite hover:text-mint hover:bg-[#13304E]/50 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* FULL-SCREEN OVERLAY MENU (Mobile / Tablet portrait) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] w-full max-w-full overflow-hidden bg-[#00203F] flex flex-col justify-between p-6 sm:p-8 md:hidden pointer-events-auto box-border">
          {/* OVERLAY HEADER */}
          <div className="flex items-center justify-between border-b border-[#13304E]/80 pb-5">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, undefined)}
              className="flex items-center gap-2.5 text-offwhite"
            >
              <span className="w-8 h-8 rounded-[8px] bg-mint text-navy font-headline font-bold text-sm flex items-center justify-center">
                IC
              </span>
              <span className="font-headline font-bold text-base tracking-tight text-offwhite">
                Isha Chaphekar
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-offwhite hover:text-mint bg-[#0d2b49] border border-[#13304E] focus:outline-none transition-colors"
              aria-label="Close navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* OVERLAY LINKS */}
          <nav className="flex flex-col items-center justify-center gap-7 my-auto py-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (item.isExternal) {
                      setIsMobileMenuOpen(false);
                    } else {
                      handleNavClick(e, item.id, item.isRoute, item.href);
                    }
                  }}
                  className={`text-2xl font-headline font-bold tracking-wide transition-colors text-mint hover:text-offwhite ${isActive ? 'underline underline-offset-8 decoration-mint' : ''
                    }`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="https://drive.google.com/file/d/1EKU9CL8M1yHmD2kVEIXG1PH8T5zNTIHl/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 px-8 py-3 rounded-[10px] bg-[#0d2b49] border-2 border-[#FF6B4A] text-[#FF6B4A] font-sans font-bold text-base hover:bg-[#FF6B4A] hover:text-[#00203F] transition-all duration-200 shadow-lg"
            >
              Resume
            </a>
          </nav>

          {/* OVERLAY FOOTER */}
          <div className="flex items-center justify-center pt-5 border-t border-[#13304E]/80">
            <div className="flex items-center gap-2 text-xs font-sans text-offwhite/80 bg-[#0d2b49] px-4 py-2 rounded-[8px] border border-[#13304E]">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="font-mono tracking-wide">
                IST — {istTime || '09:41 PM'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


