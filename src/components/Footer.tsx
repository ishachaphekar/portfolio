import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 md:px-12 bg-navy text-offwhite border-t border-mint/10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* TOP SECTION: "Always up for a good conversation!" + Subtitle + "Reach out at ↗" Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-headline text-3xl md:text-4xl text-[#F4F4F4] font-bold tracking-tight mb-2">
              Always up for a good conversation!
            </h3>
            <p className="font-sans text-[16px] text-mint leading-relaxed">
              Whether it's a role, a project, or just to chat design
            </p>
          </div>

          <a
            href="mailto:ishachaphekarwork@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-navy font-headline font-bold text-sm hover:bg-coral-hover transition-colors shadow-lg group cursor-pointer"
          >
            <span>Reach out at</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
          </a>
        </div>

        {/* THIN HORIZONTAL DIVIDER (MOVED FURTHER DOWN) */}
        <div className="w-full border-t border-mint/15 pt-2" />

        {/* BOTTOM SECTION: Copyright + Image Icon Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-offwhite/50">
          <div>
            © 2026 Isha Chaphekar. Designed with Figma, Antigravity and overthinking.
          </div>

          {/* LinkedIn & Behance Rounded Rectangle Icon Buttons */}
          <div className="flex items-center gap-3.5">
            {/* LinkedIn Icon Button */}
            <a
              href="https://linkedin.com/in/isha-chaphekar/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border-[0.5px] border-[#F4F4F4] bg-transparent flex items-center justify-center p-2 hover:border-mint transition-all group"
              aria-label="LinkedIn Profile"
            >
              <img
                src="/linkedin-icon.png"
                alt="LinkedIn"
                className="w-4 h-4 object-contain brightness-0 invert group-hover:opacity-80 transition-opacity"
              />
            </a>

            {/* Behance Icon Button */}
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border-[0.5px] border-[#F4F4F4] bg-transparent flex items-center justify-center p-2.5 hover:border-mint transition-all group"
              aria-label="Behance Profile"
            >
              <img
                src="/behance-icon.png"
                alt="Behance"
                className="w-5 h-4 object-contain brightness-0 invert group-hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
