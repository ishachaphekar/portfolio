import React from 'react';

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  src,
  alt,
  className = '',
}) => {
  return (
    <div
      className={`relative bg-black p-[4px] sm:p-[5px] rounded-[24px] sm:rounded-[28px] border border-black/40 flex flex-col justify-start overflow-hidden flex-shrink-0 transition-transform duration-300 ${className}`}
    >
      {/* Vector / CSS Notch */}
      <div className="absolute top-[6px] sm:top-[8px] left-1/2 -translate-x-1/2 w-10 sm:w-14 h-[8px] sm:h-[10px] bg-black rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-0.5 bg-zinc-800 rounded-full" />
      </div>

      {/* Inner Display Screen */}
      <div className="w-full h-full rounded-[20px] sm:rounded-[23px] overflow-hidden bg-black relative z-10 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain block"
          loading="lazy"
        />
      </div>
    </div>
  );
};
