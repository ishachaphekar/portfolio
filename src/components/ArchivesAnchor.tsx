import React from 'react';
import { Palette, Package, Sparkles } from 'lucide-react';

interface ArchiveCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
}

const ARCHIVE_CATEGORIES: ArchiveCategory[] = [
  {
    id: 'brand-identities',
    title: 'Brand Identities',
    subtitle: 'Visual Systems & Guidelines',
    description: 'Logo systems, brand guidelines, and visual identity frameworks crafted for clarity, consistency, and brand expression.',
    tags: ['Brand Identity', 'Typography', 'Visual Systems'],
    icon: Palette,
  },
  {
    id: 'packaging-design',
    title: 'Packaging & Print',
    subtitle: 'Gourmet Foods & FMCG',
    description: 'Custom product packaging and print collateral designed to stand out on shelves and build lasting customer connections.',
    tags: ['Packaging Design', 'Print Collaterals', 'FMCG'],
    icon: Package,
  },
  {
    id: 'campaigns-illustration',
    title: 'Campaigns & Creative Work',
    subtitle: 'Marketing & Event Branding',
    description: 'Hand-drawn illustrative marketing collaterals, social media assets, and offline event campaigns.',
    tags: ['Event Branding', 'Illustrations', 'Social Media'],
    icon: Sparkles,
  },
];

export const ArchivesAnchor: React.FC = () => {
  return (
    <section id="archives" className="relative py-24 px-6 md:px-12 bg-offwhite text-navy border-t border-navy/10 overflow-hidden">
      {/* Decorative background blur blobs */}
      <div className="absolute -right-32 top-1/3 w-72 h-72 bg-mint/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-32 bottom-1/4 w-80 h-80 bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* SECTION HEADING */}
        <div className="text-left">
          <h2 className="font-headline font-bold text-[32px] sm:text-[45px] text-navy tracking-tight leading-tight">
            Archives
          </h2>
        </div>

        {/* INTRO COPY (Aligned left with rest of site text) */}
        <div className="max-w-3xl text-left">
          <p className="font-sans text-base sm:text-lg text-navy/80 leading-relaxed">
            A selection of visual design work, from brand identities and packaging to campaigns and creative work, that reflects the visual-design foundation before UX became the focus.
          </p>
        </div>

        {/* VISUAL DESIGN WORK SHOWCASE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {ARCHIVE_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white/80 backdrop-blur-xs p-7 rounded-2xl border border-navy/10 hover:border-coral/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy border border-navy/10 flex items-center justify-center group-hover:bg-coral/10 group-hover:text-coral transition-colors">
                      <IconComponent className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-headline font-bold text-xl text-navy mb-1 group-hover:text-coral transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="font-sans text-xs font-semibold text-navy/50 uppercase tracking-wider mb-3">
                    {category.subtitle}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-navy/70 leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-navy/10">
                  {category.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full bg-navy/5 text-navy/70 text-[11px] font-sans font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

