"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryPhoto } from "@/app/data/site-data";

export interface FamilyLightboxProps {
  photos: GalleryPhoto[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  captions?: string[];
}

export function FamilyLightbox({
  photos,
  selectedIndex,
  onClose,
  onSelectIndex,
}: FamilyLightboxProps) {
  const total = photos.length;
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < total;
  const currentPhoto = isOpen ? photos[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onSelectIndex((selectedIndex! + 1) % total);
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((selectedIndex! - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedIndex, total, onClose, onSelectIndex]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 bg-[#24130b]/96 backdrop-blur-sm transition-opacity duration-200 select-none animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full screen photo view"
    >
      {/* Top Bar: Counter on Left (plain text) & White Pill Close Button on Right matching Image 2 */}
      <div
        className="w-full flex items-center justify-between pt-1 sm:pt-2 px-2 sm:px-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple white counter text like "17 / 64" */}
        <span className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide">
          {selectedIndex + 1} / {total}
        </span>

        {/* White pill Close button */}
        <button
          type="button"
          onClick={onClose}
          className="bg-white hover:bg-white/90 active:scale-95 text-[#2a170e] font-semibold text-sm sm:text-base px-6 sm:px-7 py-2 sm:py-2.5 rounded-full shadow-md transition-all duration-150 cursor-pointer"
          aria-label="Close photo view"
        >
          Close
        </button>
      </div>

      {/* Center Image Container: Clean photo displayed full height / width matching Image 2 */}
      <div
        className="flex-1 w-full flex items-center justify-center my-auto p-2 sm:p-4 z-10"
        onClick={onClose}
      >
        <div
          className="relative max-h-[74vh] sm:max-h-[78vh] max-w-[92vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[55vw] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentPhoto.imageUrl}
            alt={currentPhoto.alt || `TeddyPups family photo ${selectedIndex + 1}`}
            width={currentPhoto.width || 1080}
            height={currentPhoto.height || 1440}
            className="max-h-[74vh] sm:max-h-[78vh] w-auto h-auto object-contain rounded-sm shadow-2xl block"
            priority
          />
        </div>
      </div>

      {/* Bottom Bar: Previous and Next Pill Buttons matching Image 2 */}
      <div
        className="w-full flex items-center justify-center gap-3.5 pb-2 sm:pb-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button: Translucent with subtle white outline */}
        <button
          type="button"
          onClick={() => onSelectIndex((selectedIndex - 1 + total) % total)}
          className="border border-white/60 bg-black/25 hover:bg-white/10 active:scale-95 text-white font-medium text-sm sm:text-base px-6 sm:px-7 py-2 sm:py-2.5 rounded-full transition-all duration-150 cursor-pointer"
          aria-label="Previous photo"
        >
          Previous
        </button>

        {/* Next Button: Warm Golden Honey filled pill button */}
        <button
          type="button"
          onClick={() => onSelectIndex((selectedIndex + 1) % total)}
          className="bg-[#f2be6b] hover:bg-[#e8b259] active:scale-95 text-[#2a170e] font-bold text-sm sm:text-base px-7 sm:px-8 py-2 sm:py-2.5 rounded-full shadow transition-all duration-150 cursor-pointer"
          aria-label="Next photo"
        >
          Next
        </button>
      </div>
    </div>
  );
}
