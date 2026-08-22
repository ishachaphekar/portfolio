import React from 'react';
import { ABOUT_DATA } from '../data/portfolioData';

/**
 * Standalone Testimonials section with an off-white section background.
 * Preserves the original dark card box styling for contrast and visual hierarchy.
 */
export const TestimonialsSection: React.FC = () => {
  if (!ABOUT_DATA.testimonials) return null;

  return (
    <section className="relative py-20 px-6 md:px-12 bg-offwhite text-navy border-t border-navy/10 overflow-hidden">
      {/* Decorative background blobs (matching SelectedWorkSection) */}
      <div className="absolute -left-32 top-1/4 w-72 h-72 bg-mint/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 w-80 h-80 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* SECTION HEADING */}
        <div className="text-left">
          <h3 className="font-sans font-bold text-[18px] text-navy uppercase tracking-wider mb-2">
            What people say
          </h3>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {ABOUT_DATA.testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-navy-light p-6 md:p-8 rounded-2xl border-2 border-mint/10 hover:border-mint transition-colors flex flex-col justify-between shadow-lg text-offwhite"
            >
              <p className="font-sans text-xs sm:text-sm text-offwhite/90 leading-relaxed mb-6 font-normal">
                {item.quote}
              </p>

              <div className="flex items-center gap-3.5 pt-4 border-t border-mint/10">
                <div className="w-[42px] h-[42px] rounded-full overflow-hidden border border-mint/30 flex-shrink-0 bg-navy">
                  <img
                    src={item.avatarSrc}
                    alt={item.authorName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-[13.5px] text-offwhite">
                    {item.authorName}
                  </h4>
                  <p className="font-sans text-[12px] text-mint/80">
                    {item.authorRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
