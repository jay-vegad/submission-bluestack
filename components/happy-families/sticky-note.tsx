"use client";

import React from "react";

export function StickyNote() {
  return (
    <div className="relative group w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] xl:max-w-[440px] ml-auto">
      {/* Translucent Sky Blue Tape */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 sm:w-36 h-6 sm:h-7 pointer-events-none select-none z-20 -rotate-[2.5deg] shadow-[0_2px_4px_rgba(42,23,14,0.1)]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255, 255, 255, 0.25) 3px 5px), linear-gradient(90deg, rgba(255, 255, 255, 0.4), transparent 30%, rgba(255, 255, 255, 0.3) 70%, transparent), #b2d7f3",
          opacity: 0.92,
          clipPath:
            "polygon(0 10%, 3% 0, 50% 4%, 97% 0, 100% 14%, 98% 40%, 100% 66%, 97% 100%, 50% 96%, 3% 100%, 0 86%, 2% 52%)",
        }}
        aria-hidden="true"
      />

      {/* Lined Notebook Letter Page (+1.4deg clockwise rotation, static - no hover showcase) */}
      <div
        className="relative bg-[#fffdf6] px-5 sm:px-6 md:px-7 pt-5 sm:pt-6 pb-6 sm:pb-7 rounded-[4px] border border-[#2a170e]/10 shadow-[0_8px_24px_-4px_rgba(42,23,14,0.14),0_3px_8px_rgba(42,23,14,0.06)] rotate-[1.4deg] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 31px, rgba(47, 110, 158, 0.18) 31px, rgba(47, 110, 158, 0.18) 32px)",
          backgroundSize: "100% 32px",
          backgroundPosition: "0 8px",
        }}
      >
        {/* Letter Text - Perfectly aligned with the 32px ruled lines */}
        <div className="relative z-10 pt-0.5">
          <p className="font-serif text-[#1e1e1e] sm:text-[#2a170e] text-[15px] sm:text-[16px] md:text-[16.5px] leading-[32px] tracking-normal font-normal">
            &ldquo;TeddyPups truly made our dream a reality. They supported us at
            every step of the import journey. Our Maltipoo arrived healthy,
            cheerful, and absolutely perfect. Having 24/7 support throughout the
            process gave us complete peace of mind.&rdquo;
          </p>

          <div className="mt-2 pt-0.5">
            <p className="font-scrawl text-[#8e3f15] text-[17px] sm:text-[18px] md:text-[19px] leading-[32px] font-semibold">
              Sarah M., Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
