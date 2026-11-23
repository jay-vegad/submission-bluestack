"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AvailablePuppy } from "./types";
import { siteMetadata } from "@/app/data/site-data";

interface PuppyVideoModalProps {
  puppy: AvailablePuppy | null;
  onClose: () => void;
}

export function PuppyVideoModal({ puppy, onClose }: PuppyVideoModalProps) {
  useEffect(() => {
    if (!puppy) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [puppy, onClose]);

  if (!puppy) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello TeddyPups, I'm interested in ${puppy.name} (${puppy.breed}, ${puppy.genderLabel}). Is this puppy currently available?`
  );
  const whatsappUrl = `${siteMetadata.whatsappUrl}?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${puppy.name} details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fffdf8] rounded-3xl border-2 border-[#2a170e] shadow-[0_12px_32px_rgba(42,23,14,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#fffdf8]/90 hover:bg-[#fae1cb] border border-[#2a170e] flex items-center justify-center text-[#2a170e] transition-colors shadow-sm cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Media Container: Video or High-res Photo */}
        <div className="relative w-full aspect-video sm:aspect-[16/10] bg-[#24130b] overflow-hidden">
          {puppy.hasVideo && puppy.videoUrl ? (
            <video
              src={puppy.videoUrl}
              controls
              autoPlay
              playsInline
              loop
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={puppy.imageUrl}
                alt={puppy.alt}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Available sticker in corner */}
          <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#fff9e6] border-[1.2px] border-[#2a170e] text-[#2a170e] font-scrawl text-xs font-semibold shadow-sm rotate-[-4deg]">
            Available puppy
          </span>
        </div>

        {/* Details and WhatsApp Inquiry */}
        <div className="p-6 sm:p-8 bg-[#fffdf8]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl text-[#2a170e] tracking-tight">
                {puppy.name}
              </h3>
              <p className="font-body text-[#7a5c48] text-base mt-0.5">
                {puppy.genderLabel}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbe3b4] border border-[#2a170e]/20 text-xs font-semibold text-[#5a3a28]">
              <span>📍</span> {puppy.origin === "Imported" ? "Ethical Korea Import" : "Dubai Showroom Ready"}
            </span>
          </div>

          {/* Puppy Health & Care highlights */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-4 my-2 border-y border-[#e8dfd3]">
            <div className="text-center p-2 rounded-xl bg-[#fff8e8] border border-[#e8dfd3]/80">
              <span className="text-xs sm:text-sm font-semibold text-[#2a170e] block">100% Verified</span>
              <span className="text-[11px] text-[#7a5c48]">Vet Health Checked</span>
            </div>
            <div className="text-center p-2 rounded-xl bg-[#fff8e8] border border-[#e8dfd3]/80">
              <span className="text-xs sm:text-sm font-semibold text-[#2a170e] block">Vaccinated</span>
              <span className="text-[11px] text-[#7a5c48]">& Microchipped</span>
            </div>
            <div className="text-center p-2 rounded-xl bg-[#fff8e8] border border-[#e8dfd3]/80">
              <span className="text-xs sm:text-sm font-semibold text-[#2a170e] block">24/7 Aftercare</span>
              <span className="text-[11px] text-[#7a5c48]">Lifetime Support</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 text-base py-3.5 px-6 text-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-1.114-.067-.323-.102-.741-.248-1.3-.491-1.749-.759-2.887-2.529-2.975-2.645-.088-.117-.709-.942-.709-1.798s.445-1.277.604-1.452c.16-.175.348-.219.464-.219.116 0 .232.001.334.006.107.005.25.04.385.365.144.35.49 1.196.533 1.284.044.088.073.19.015.307-.058.117-.087.19-.174.292-.087.102-.184.228-.263.307-.088.087-.18.182-.077.357.102.175.456.753.978 1.218.673.599 1.24.785 1.415.872.175.088.277.073.379-.044.102-.117.436-.511.553-.686.117-.175.233-.146.393-.088.16.058 1.018.48 1.193.568.175.088.291.131.335.204.044.073.044.423-.1 1.028z" />
              </svg>
              <span>Ask about {puppy.name} on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#2a170e]/40 text-[#2a170e] font-semibold text-base hover:bg-[#f5eee6] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

