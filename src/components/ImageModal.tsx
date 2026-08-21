import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ArchiveImage } from '@/types/archivesTypes';

interface ImageModalProps {
  image: ArchiveImage | null;
  onClose: () => void;
}

/**
 * Full-page Image Modal component for archive grid items.
 * Renders a slightly black backdrop overlay (rgba(0,0,0,0.5)),
 * displays the enlarged image with title & subtitle in the top-left corner,
 * and provides keyboard navigation (Escape to close) and focus management for accessibility.
 */
export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!image) return;

    // Lock body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    closeButtonRef.current?.focus();

    // Handle ESC key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  const imagePath = `/assets/archives/${image.fileName}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-subtitle"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
    >
      {/* Slightly black overlay (rgba(0,0,0,0.5)) */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col bg-navy/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-navy/80">
          {/* Top-Left Corner: Title & Subtitle */}
          <div className="space-y-1 pr-4">
            <h3
              id="modal-title"
              className="font-headline font-bold text-lg sm:text-2xl text-offwhite tracking-tight"
            >
              {image.title}
            </h3>
            <p
              id="modal-subtitle"
              className="font-sans text-xs sm:text-sm font-medium text-mint uppercase tracking-wider"
            >
              {image.subTitle}
            </p>
          </div>

          {/* Top-Right Corner: Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-full bg-white/10 hover:bg-coral/20 text-offwhite hover:text-coral border border-white/10 transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Center: Enlarged Image */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/40 min-h-[300px]">
          <img
            src={imagePath}
            alt={image.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
