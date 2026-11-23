"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteMetadata } from "@/app/data/site-data";
import { PuppySVG } from "@/components/puppy-svg";

export function FamilyBottomCta() {
  return (
    <section className="py-14 sm:py-18 relative overflow-hidden text-center">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#fbe3b4]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {/* Adorable Puppy Mascot Duo */}
        <div className="flex items-end justify-center gap-3 mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 animate-bounce duration-1000">
            <PuppySVG isHappy={true} />
          </div>
          <div className="w-11 h-11 sm:w-14 sm:h-14 -ml-3 animate-bounce [animation-delay:200ms]">
            <PuppySVG isSitting={true} flipX={true} />
          </div>
        </div>

        {/* Eyebrow */}
        <span className="font-scrawl text-lg sm:text-xl text-[#a24a1a] font-semibold mb-2.5">
          Your happy chapter begins here
        </span>

        {/* Heading */}
        <h2 className="font-plush text-3xl sm:text-4xl md:text-5xl text-[#2a170e] font-extrabold tracking-tight mb-4 leading-[1.08]">
          Ready to welcome your own puppy?
        </h2>

        {/* Description */}
        <p className="font-body text-[#5a3a28] text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          Every puppy at TeddyPups is health-guaranteed, raised with endless love,
          and ready to bring boundless joy into your home.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <Link
            href="/#meet"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#a24a1a] text-[#fffdf8] font-bold text-base shadow-[0_4px_0_0_#2a170e] hover:shadow-[0_6px_0_0_#2a170e] hover:-translate-y-0.5 hover:-rotate-1 active:translate-y-1 active:rotate-0 active:shadow-[0_1px_0_0_#2a170e] transition-all duration-200"
          >
            <span>Meet available puppies</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <a
            href={siteMetadata.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold"
          >
            <span>WhatsApp our team</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-1.114-.067-.323-.102-.741-.248-1.3-.491-1.749-.759-2.887-2.529-2.975-2.645-.088-.117-.709-.942-.709-1.798s.445-1.277.604-1.452c.16-.175.348-.219.464-.219.116 0 .232.001.334.006.107.005.25.04.385.365.144.35.49 1.196.533 1.284.044.088.073.19.015.307-.058.117-.087.19-.174.292-.087.102-.184.228-.263.307-.088.087-.18.182-.077.357.102.175.456.753.978 1.218.673.599 1.24.785 1.415.872.175.088.277.073.379-.044.102-.117.436-.511.553-.686.117-.175.233-.146.393-.088.16.058 1.018.48 1.193.568.175.088.291.131.335.204.044.073.044.423-.1 1.028z" />
            </svg>
          </a>
        </div>

        {/* Mascot Banner matching Image 1 right above footer wave */}
        <div className="mt-12 sm:mt-16 pb-4 flex flex-col sm:flex-row items-center justify-center gap-3 select-none">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src="/brand/sitting-puppy.png"
              alt="Teddy puppy sitting"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          <span className="font-scrawl text-xl sm:text-2xl md:text-[26px] text-[#2a170e] font-medium tracking-wide">
            every one of them was a Teddy Pup once
          </span>
        </div>
      </div>
    </section>
  );
}

