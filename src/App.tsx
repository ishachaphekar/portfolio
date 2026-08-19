import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { AboutSection } from './components/AboutSection';
import { ArchivesAnchor } from './components/ArchivesAnchor';
import { Footer } from './components/Footer';
import { KarmaQuestPage } from './pages/KarmaQuestPage';
import { BeaconPage } from './pages/BeaconPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, sectionId?: string) => {
    const targetUrl = sectionId ? `${path}#${sectionId}` : path;
    window.history.pushState({}, '', targetUrl);
    setCurrentPath(path);
    if (path === '/') {
      setTimeout(() => {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (currentPath === '/projects/karmaquest') {
    return (
      <div className="min-h-screen bg-navy text-offwhite font-sans selection:bg-mint selection:text-navy">
        <KarmaQuestPage onNavigate={navigateTo} />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/projects/beacon') {
    return (
      <div className="min-h-screen bg-navy text-offwhite font-sans selection:bg-mint selection:text-navy">
        <BeaconPage onNavigate={navigateTo} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-offwhite font-sans selection:bg-mint selection:text-navy">
      {/* 1. NAVIGATION */}
      <Navigation onNavigate={navigateTo} />

      {/* 2. HERO SECTION */}
      <HeroSection />

      {/* 3. SELECTED WORK (STACKING CARDS) */}
      <SelectedWorkSection onNavigate={navigateTo} />

      {/* 4. ABOUT SECTION */}
      <AboutSection />

      {/* 5. ARCHIVES PLACEHOLDER ANCHOR */}
      <ArchivesAnchor />

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
