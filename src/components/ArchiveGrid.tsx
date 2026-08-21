import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { ARCHIVES } from '@/data/archivesData';
import { ArchiveImage } from '@/types/archivesTypes';
import { ImageModal } from './ImageModal';

/**
 * Fully dynamic helper to determine CSS Grid column & row spans for Bento layout.
 * Evaluates image aspect ratio & orientation purely from metadata thresholds.
 * Zero hardcoding — works automatically for any existing or future images.
 */
const getBentoSpanClass = (image: ArchiveImage): string => {
  const ratio = image.aspectRatio;

  if (ratio) {
    if (ratio <= 0.55) {
      // Ultra-tall images (e.g. 1:2 standee posters) -> 1 col x 3 rows
      return 'col-span-1 row-span-3';
    }
    if (ratio >= 1.65) {
      // Wide banner landscapes (e.g. 16:9 compositions) -> 2 cols x 1 row
      return 'col-span-1 sm:col-span-2 row-span-1';
    }
    if (ratio <= 0.85) {
      // Standard portrait posters & collaterals (3:4, A4, 4:5) -> 1 col x 2 rows
      return 'col-span-1 row-span-2';
    }
    // Standard 3:2 & square compositions -> 1 col x 1 row
    return 'col-span-1 row-span-1';
  }

  // Generic fallback if aspectRatio metadata is omitted
  switch (image.orientation) {
    case 'landscape':
      return 'col-span-1 sm:col-span-2 row-span-1';
    case 'portrait':
      return 'col-span-1 row-span-2';
    case 'square':
    default:
      return 'col-span-1 row-span-1';
  }
};

/**
 * Responsive Bento Grid component for displaying archive images.
 * Uses aspect-matched grid spans to ensure full artwork visibility without clipping.
 * Hovering displays title & subtitle with project typography and an enlarge button.
 * Clicking any item or its enlarge button opens a full-page modal with a slightly black overlay.
 */
export const ArchiveGrid: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ArchiveImage | null>(null);

  return (
    <>
      {/* Bento Grid Container */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 grid-flow-dense auto-rows-[95px] sm:auto-rows-[115px] md:auto-rows-[125px] lg:auto-rows-[135px]">
          {ARCHIVES.map((image, idx) => {
            const spanClass = getBentoSpanClass(image);
            const imagePath = `/assets/archives/${image.fileName}`;

            return (
              <div
                key={`${image.fileName}-${idx}`}
                onClick={() => setSelectedImage(image)}
                className={`relative group overflow-hidden rounded-xl border border-navy/10 hover:border-coral/40 shadow-xs hover:shadow-lg transition-all duration-300 bg-navy/5 cursor-pointer ${spanClass}`}
              >
                {/* Archive Image */}
                <img
                  src={imagePath}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-between text-offwhite pointer-events-auto">
                  {/* Top: Modal Enlarge Trigger Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                      }}
                      aria-label={`Enlarge ${image.title}`}
                      className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-coral text-offwhite hover:text-navy backdrop-blur-md transition-all shadow-xs transform group-hover:scale-105 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Bottom: Title and Subtitle with Project Typography */}
                  <div className="space-y-0.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-headline font-bold text-xs sm:text-sm text-offwhite leading-snug drop-shadow-xs truncate">
                      {image.title}
                    </h4>
                    <p className="font-sans text-[10px] sm:text-xs font-semibold text-mint uppercase tracking-wider drop-shadow-xs truncate">
                      {image.subTitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Page Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default ArchiveGrid;
