"use client";

import Image from "next/image";
import Link from "next/link";
import { goneHomePuppiesList } from "./types";

export function AlreadyGoneHomeBanner() {
  return (
    <section className="relative w-full bg-gone-home-pattern pt-20 sm:pt-24 pb-32 sm:pb-40 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden border-t border-[#e8d5b5]/50">
      <div className="w-full max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Heading, Subtitle & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[76px] text-[#2a170e] font-normal leading-[1.05] tracking-tight mb-4">
              Already
              <br />
              gone home
            </h2>

            <p className="font-body text-[#5a3a28] text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed">
              These puppies have found their families.
            </p>

            <Link
              href="/happy-families"
              className="inline-flex items-center justify-center bg-[#a24a1a] hover:bg-[#8e3f15] text-[#fffdf8] font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-9 py-4 rounded-full shadow-[0_5px_0_0_#2a170e] hover:shadow-[0_6px_0_0_#2a170e] hover:-translate-y-0.5 hover:-rotate-1 active:translate-y-0.5 active:rotate-0 active:shadow-[0_2px_0_0_#2a170e] transition-all duration-200"
            >
              See the puppies who&apos;ve gone home
            </Link>
          </div>

          {/* Right Column: 5 Hand-drawn Circular Puppy Portraits (Scaled Up) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end overflow-visible py-4">
            <div className="relative flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2">
              {/* Whimsical connecting dashed curve & doodles */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible select-none"
              >
                {/* Connecting delicate dashed curve matching screenshot */}
                <path
                  d="M 50 56 Q 120 22, 190 56 T 330 56 T 470 56 T 610 56"
                  fill="none"
                  stroke="#c28e5d"
                  strokeWidth="1.4"
                  strokeDasharray="4 5"
                  opacity="0.6"
                />
                {/* Heart between Ace and Leo */}
                <g transform="translate(110, 24) scale(0.75) rotate(-14)">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="none"
                    stroke="#a24a1a"
                    strokeWidth="1.8"
                  />
                </g>
                {/* Paw between Leo and Mia */}
                <g transform="translate(250, 16) scale(0.42) rotate(6)">
                  <path
                    d="M12 14c-2.5 0-5 2.5-5 5 0 1.5 1 2 2.5 2s2-1 2.5-1 1 1 2.5 1 2.5-.5 2.5-2c0-2.5-2.5-5-5-5zm-5-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm10 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-7.5-4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm5 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                    fill="#a24a1a"
                    opacity="0.8"
                  />
                </g>
                {/* Heart between Mia and Sadie */}
                <g transform="translate(390, 26) scale(0.7) rotate(12)">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="none"
                    stroke="#a24a1a"
                    strokeWidth="1.8"
                  />
                </g>
                {/* Dotted sparkle between Sadie and Pomeranian */}
                <g transform="translate(530, 30) scale(0.75)">
                  <path
                    d="M0 -8 C0 -2 2 0 8 0 C2 0 0 2 0 8 C0 2 -2 0 -8 0 C-2 0 0 -2 0 -8 Z"
                    fill="#c2622b"
                    opacity="0.9"
                  />
                </g>
              </svg>

              {/* 5 Gone Home Puppy Items */}
              {goneHomePuppiesList.map((pup, idx) => {
                const tilts = ["-1.2deg", "1deg", "-0.8deg", "1.4deg", "-1deg"];
                const tilt = tilts[idx % tilts.length];

                return (
                  <div
                    key={pup.id}
                    className="relative flex flex-col items-center group transition-transform duration-300 hover:scale-105 shrink-0"
                    style={{ transform: `rotate(${tilt})` }}
                  >
                    {/* Hand-drawn Circular Frame Scaled Up */}
                    <div className="relative w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] md:w-[125px] md:h-[125px] lg:w-[135px] lg:h-[135px] aspect-square rounded-full flex items-center justify-center p-1 bg-[#fff8e8] shadow-[0_4px_0_0_rgba(42,23,14,0.14)]">
                      {/* Photo with rounded-full circle */}
                      <div className="relative w-full h-full rounded-full overflow-hidden border-[1.8px] border-[#2a170e]">
                        <Image
                          src={pup.imageUrl}
                          alt={pup.alt}
                          fill
                          sizes="150px"
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Double sketchy loop border overlay */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 100"
                        className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="#2a170e"
                          strokeWidth="1.3"
                          strokeDasharray="98 2"
                          opacity="0.85"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="44"
                          fill="none"
                          stroke="#2a170e"
                          strokeWidth="0.8"
                          strokeDasharray="4 3"
                          opacity="0.45"
                        />
                      </svg>

                      {/* "gone home ♥" Sticker Pill */}
                      <span className="absolute -bottom-2 z-10 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#fffcf5] border-[1.3px] border-[#2a170e] text-[#2a170e] font-scrawl text-[11px] sm:text-[12.5px] font-bold whitespace-nowrap shadow-[1px_2px_0_0_rgba(42,23,14,0.22)]">
                        gone home <span className="text-[#a24a1a]">♥</span>
                      </span>
                    </div>

                    {/* Puppy Name Underneath */}
                    <span className="font-plush text-base sm:text-lg lg:text-xl text-[#2a170e] font-extrabold mt-4 tracking-tight">
                      {pup.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
