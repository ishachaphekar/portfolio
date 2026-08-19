import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PhotoPlaceholderProps {
  label?: string;
  category?: string;
  className?: string;
  aspectRatio?: string;
  dark?: boolean;
}

export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  label = "PHOTO",
  category,
  className = "",
  aspectRatio = "aspect-4/3",
  dark = false
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 text-center border transition-all duration-300 ${
        dark
          ? 'bg-navy-light text-offwhite/80 border-mint/20'
          : 'bg-[#EAEAEA] text-navy/70 border-navy/10'
      } ${aspectRatio} ${className}`}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-navy/5 text-navy/60 border border-navy/10">
        <ImageIcon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <span className="font-headline font-semibold text-xs tracking-wider uppercase mb-1 opacity-90">
        {label}
      </span>
      {category && (
        <span className="text-[11px] font-sans opacity-60">
          {category}
        </span>
      )}
      
      {/* Subtle corner badge tag */}
      <div className="absolute bottom-3 right-3 text-[10px] uppercase font-headline tracking-widest px-2 py-0.5 rounded-full bg-navy/10 text-navy/50 font-bold">
        Placeholder
      </div>
    </div>
  );
};
