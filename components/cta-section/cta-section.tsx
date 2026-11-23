"use client";

import Image from "next/image";
import { ctaData, siteMetadata } from "@/app/data/site-data";

export function CtaSection() {
  return (
    <section
      id="contact"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-[#2f1a10] to-[#24130b] text-[#fffdf8]"
      aria-labelledby="cta-title"
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <span className="font-scrawl text-lg text-[#f2be6b]">
              Your new family member
            </span>
            <h2
              id="cta-title"
              className="font-heading text-3xl sm:text-4xl lg:text-[50px] leading-tight text-[#fffdf8] mt-2 mb-6"
            >
              {ctaData.heading}
            </h2>
            <p className="font-body text-[#e8dfd3] text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              {ctaData.lede}
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href={siteMetadata.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-base py-3 px-8 w-full sm:w-auto justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.22 8.23z" />
                </svg>
                {ctaData.ctaWhatsApp}
              </a>

              <a
                href="mailto:info@instabizweb.com"
                className="inline-flex items-center justify-center font-medium text-base px-6 py-3 rounded-full border border-[#e8dfd3]/40 text-[#fffdf8] hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                Email Concierge
              </a>
            </div>

            {/* Address & visit info */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs sm:text-sm text-[#e8dfd3]/80">
              <span>📍 Downtown Dubai Showroom • Daily visits by appointment</span>
            </div>
          </div>

          {/* Right: Cozy Home Doorway Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] flex flex-col items-center">
              {/* Porch light fixture with warm glow */}
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#f2be6b] shadow-[0_0_30px_#f2be6b]" />
                <div className="w-1.5 h-4 bg-[#3b2215]" />
              </div>

              {/* House Doorway with puppy peek */}
              <div className="relative w-[240px] h-[340px] rounded-t-[120px] bg-[#3b2215] border-4 border-[#5a3a28] p-3 shadow-2xl flex flex-col items-center justify-end overflow-hidden">
                {/* Inside Room Warm Glow & Puppy */}
                <div className="absolute inset-x-2 top-4 bottom-0 rounded-t-[100px] overflow-hidden bg-gradient-to-b from-[#fbe3b4] to-[#f2be6b]/80 shadow-inner">
                  <Image
                    src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                    alt="Puppy waiting inside"
                    fill
                    sizes="240px"
                    className="object-cover object-bottom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Open Door Angle Frame */}
                <div className="absolute right-2 top-6 bottom-0 w-12 bg-[#2a170e]/40 backdrop-blur-xs rounded-r-md border-l border-white/20" />
              </div>

              {/* Welcome Home Doormat */}
              <div className="mt-3 px-8 py-2 rounded-xl bg-[#c2622b] text-[#fffdf8] font-scrawl text-sm shadow-md rotate-[-2deg]">
                welcome home
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

