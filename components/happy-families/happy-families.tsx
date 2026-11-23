"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { happyFamiliesData } from "@/app/data/site-data";

export function HappyFamilies() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const photos = happyFamiliesData.photos.slice(0, 16); // Show 16 high-impact family photos
  const testimonials = happyFamiliesData.testimonials;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % photos.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhotoIndex, photos.length]);

  const activePhoto =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <section
      id="families"
      className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-[#fffdf8] relative"
      aria-labelledby="dusk-title"
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-lg text-[#a24a1a]">
            Pure happiness
          </span>
          <h2
            id="dusk-title"
            className="font-plush text-4xl sm:text-5xl lg:text-6xl text-[#2a170e] mt-2 font-extrabold tracking-tight"
          >
            {happyFamiliesData.heading}
          </h2>
          <p className="font-body text-[#5a3a28] text-base sm:text-lg mt-3">
            {happyFamiliesData.body}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#fbe3b4]/20 border-2 border-[#e8d8c8] rounded-3xl p-6 flex flex-col justify-between shadow-[rgba(42,23,14,0.2)_2px_3px_0px_0px] hover:shadow-[rgba(42,23,14,0.25)_0px_7px_0px_-3px] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#f2be6b] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-body text-[#2a170e] text-base italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#e8dfd3] flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg text-[#2a170e] font-semibold">
                    {t.name}
                  </h4>
                  <span className="text-xs text-[#5a3a28]">{t.location}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#a24a1a]/10 text-[#a24a1a]">
                  {t.puppy}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-2xl text-[#2a170e]">
              Client Photo Moments
            </h3>
            <span className="text-xs text-[#5a3a28] font-medium hidden sm:inline">
              Click any photo to enlarge
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-[#e8dfd3] bg-[#fbe3b4]/30 text-left focus:outline-none focus:ring-4 focus:ring-[#f2be6b] shadow-sm hover:shadow-md transition-all duration-300"
                aria-label={`View photo: ${photo.caption}`}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
                  <span className="text-xs font-medium text-white line-clamp-2">
                    {photo.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Link to Dedicated Happy Families Full Wall Page */}
          <div className="mt-12 text-center">
            <Link
              href="/happy-families"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#a24a1a] text-[#fffdf8] font-semibold text-base shadow-[0_4px_0_0_#2a170e] hover:shadow-[0_6px_0_0_#2a170e] hover:-translate-y-0.5 hover:-rotate-1 active:translate-y-1 active:rotate-0 active:shadow-[0_1px_0_0_#2a170e] transition-all duration-200"
            >
              <span>See all 64 happy families &amp; photo moments</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center bg-[#fffdf8] rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#2a170e] text-white flex items-center justify-center hover:bg-[#a24a1a] transition-colors"
              aria-label="Close photo"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Photo Container */}
            <div className="relative w-full aspect-square max-h-[60vh] rounded-2xl overflow-hidden bg-[#e8dfd3]">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 750px"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption & Controls */}
            <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-heading text-lg text-[#2a170e]">
                {activePhoto.caption}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhotoIndex(
                      (selectedPhotoIndex - 1 + photos.length) % photos.length
                    )
                  }
                  className="px-3 py-1.5 rounded-full border border-[#e8dfd3] text-sm text-[#2a170e] hover:bg-[#fbe3b4] transition-colors"
                >
                  ← Prev
                </button>
                <span className="text-xs text-[#5a3a28]">
                  {selectedPhotoIndex + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhotoIndex(
                      (selectedPhotoIndex + 1) % photos.length
                    )
                  }
                  className="px-3 py-1.5 rounded-full border border-[#e8dfd3] text-sm text-[#2a170e] hover:bg-[#fbe3b4] transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

