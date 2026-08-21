import React, { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { ArchivesAnchor } from '../components/ArchivesAnchor';

interface ArchivesPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const ArchivesPage: React.FC<ArchivesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-offwhite text-navy font-sans selection:bg-mint selection:text-navy">
      <Navigation onNavigate={onNavigate} />
      <div className="pt-20">
        <ArchivesAnchor />
      </div>
    </div>
  );
};

export default ArchivesPage;
