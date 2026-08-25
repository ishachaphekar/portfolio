import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const mailtoUrl = `mailto:ishachaphekarwork@gmail.com?subject=Reaching%20out%20from%20Portfolio&body=Hi%20Isha,%0A%0AMy%20email%20is:%20${encodeURIComponent(
      email
    )}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="py-16 px-6 md:px-12 bg-navy text-offwhite border-t border-mint/10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* TOP SECTION: "Always up for a good conversation!" + Subtitle + Email Input & "Reach out" Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-headline text-3xl md:text-4xl text-[#F4F4F4] font-bold tracking-tight mb-2">
              Always up for a good conversation!
            </h3>
            <p className="font-sans text-[16px] text-mint leading-relaxed">
              Whether it's a role, a project, or just to chat design
            </p>
          </div>

          {/* EMAIL INPUT BOX & REACH OUT BUTTON */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 w-full sm:w-auto"
          >
            <div className="relative flex items-center w-full sm:w-[250px] md:w-[270px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                required
                className="w-full h-11 pl-4 pr-10 rounded-xl bg-navy-light/90 border border-mint/20 text-offwhite text-sm font-sans placeholder:text-offwhite/40 focus:outline-none focus:border-mint transition-colors shadow-inner"
              />
              <img
                src="/email icon.png"
                alt="Email Icon"
                className="absolute right-3 w-6 h-6 object-contain pointer-events-none"
              />
            </div>

            <button
              type="submit"
              className="h-11 px-5 rounded-xl bg-coral text-navy font-headline font-bold text-sm hover:bg-coral-hover transition-all duration-200 shadow-lg hover:shadow-coral/20 cursor-pointer flex items-center justify-center shrink-0"
            >
              {submitted ? 'Sent!' : 'Reach out'}
            </button>
          </form>
        </div>

        {/* THIN HORIZONTAL DIVIDER (MOVED FURTHER DOWN) */}
        <div className="w-full border-t border-mint/15 pt-2" />

        {/* BOTTOM SECTION: Copyright + Image Icon Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-sans text-offwhite">
          <div className="space-y-1">
            <p className="text-[16px] text-offwhite flex items-center gap-1.5 flex-wrap">
              <span>Built with Antigravity, Spotify and lots of overthinking!!</span>
              <Heart className="w-4 h-4 text-coral fill-coral inline-block shrink-0" />
            </p>
            <p className="text-[14px] text-offwhite/80">
              © 2026 Isha Chaphekar.
            </p>
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
