"use client";

import Image from "next/image";
import Link from "next/link";
import { siteMetadata } from "@/app/data/site-data";

export function Footer() {
  const exploreLinks = [
    { label: "Available puppies", href: "/puppies" },
    { label: "Gone home", href: "/happy-families" },
    { label: "Happy families", href: "/happy-families" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Delivery & collection", href: "/how-it-works#delivery" },
    { label: "FAQ", href: "/faq" },
    { label: "Visit & contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "TikTok", url: "https://tiktok.com" },
    { name: "Facebook", url: "https://facebook.com" },
  ];

  return (
    <>
      {/* SVG ClipPath Definition for the Organic Top Wave */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="footer-wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.07 C 0.08 0.035, 0.14 0.012, 0.22 0.012 C 0.32 0.012, 0.38 0.065, 0.46 0.065 C 0.55 0.065, 0.62 0.008, 0.72 0.008 C 0.82 0.008, 0.90 0.035, 1 0.045 L 1 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <footer
        className="tp-footer relative z-10 bg-[#24130b] text-[#fffdf8] pt-24 sm:pt-28 pb-12 overflow-hidden -mt-12 sm:-mt-16"
        style={{
          clipPath: "url(#footer-wave-clip)",
        }}
        aria-label="Site Footer"
      >
        {/* Night Sky Ambience: Sparkling Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          {/* Star 1 - Top Left */}
          <span
            className="absolute left-[6%] top-[14%] text-[#f2be6b]/80 tp-twinkle"
            style={{ animationDuration: "2.8s", animationDelay: "0.2s" }}
          >
            ✦
          </span>

          {/* Star 2 - Above Home */}
          <span
            className="absolute left-[16%] top-[19%] text-[#f2be6b]/70 tp-twinkle text-xs"
            style={{ animationDuration: "3.2s", animationDelay: "1.1s" }}
          >
            ✦
          </span>

          {/* Star 3 - Mid Left */}
          <span
            className="absolute left-[28%] top-[23%] text-[#f2be6b]/60 tp-twinkle text-[10px]"
            style={{ animationDuration: "2.6s", animationDelay: "0.6s" }}
          >
            ✦
          </span>

          {/* Star 4 - Center Top */}
          <span
            className="absolute left-[44%] top-[13%] text-[#f2be6b]/75 tp-twinkle text-sm"
            style={{ animationDuration: "3.5s", animationDelay: "1.5s" }}
          >
            ✦
          </span>

          {/* Star 5 - Above Explore */}
          <span
            className="absolute left-[54%] top-[17%] text-[#f2be6b]/70 tp-twinkle text-xs"
            style={{ animationDuration: "2.9s", animationDelay: "0.8s" }}
          >
            ✦
          </span>

          {/* Star 6 - Center Right */}
          <span
            className="absolute left-[69%] top-[19%] text-[#f2be6b]/60 tp-twinkle text-[11px]"
            style={{ animationDuration: "3.1s", animationDelay: "1.8s" }}
          >
            ✦
          </span>

          {/* Star 7 - Near Moon */}
          <span
            className="absolute right-[22%] top-[27%] text-[#f2be6b]/80 tp-twinkle text-xs"
            style={{ animationDuration: "2.5s", animationDelay: "0.4s" }}
          >
            ✦
          </span>

          {/* Star 8 - Far Right */}
          <span
            className="absolute right-[8%] top-[24%] text-[#f2be6b]/65 tp-twinkle text-[10px]"
            style={{ animationDuration: "3.4s", animationDelay: "1.3s" }}
          >
            ✦
          </span>

          {/* Crescent Moon matching exact site CSS */}
          <div className="tp-moon" aria-hidden="true" />
        </div>

        {/* Footer Main Content Grid */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10 items-start">
            {/* Column 1: Brand & Puppy in Basket */}
            <div className="md:col-span-5 flex flex-col items-start">
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-[54px] text-[#fffdf8] font-normal tracking-tight mb-4 leading-tight">
                Home, at last.
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-[#e8ded2]/80 max-w-sm leading-relaxed mb-6">
                TeddyPups U.A.E. is a Dubai-based brand specializing in
                miniature puppies, offering premium services and worldwide
                shipping.
              </p>

              {/* Puppy in Basket Illustration matching screenshot */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 mt-2">
                <Image
                  src="/brand/puppy-in-basket.png"
                  alt="Teddy puppy in basket"
                  fill
                  sizes="176px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Column 2: Explore Links with Animated Underlines */}
            <div className="md:col-span-3">
              <h3 className="font-heading text-lg sm:text-xl text-[#f2be6b] mb-5 tracking-wide">
                Explore
              </h3>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-block text-[15px] sm:text-[16px] text-[#e8ded2]/85 hover:text-[#fffdf8] transition-colors duration-200 py-0.5"
                    >
                      <span>{link.label}</span>
                      {/* Smooth Underline Expansion on Hover */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#f2be6b] group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Say Hello (Contact & Social Pills) */}
            <div className="md:col-span-4">
              <h3 className="font-heading text-lg sm:text-xl text-[#f2be6b] mb-5 tracking-wide">
                Say hello
              </h3>
              <ul className="space-y-3.5 text-[15px] sm:text-[16px] text-[#e8ded2]/85">
                <li>
                  <a
                    href={siteMetadata.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block text-[#fffdf8] font-medium hover:text-[#f2be6b] transition-colors duration-200 py-0.5"
                  >
                    <span>WhatsApp +971 50 000 0000</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#f2be6b] group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="group relative inline-block hover:text-[#f2be6b] transition-colors duration-200 py-0.5 break-all"
                  >
                    <span>info@instabizweb.com</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#f2be6b] group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
                </li>
                <li className="pt-0.5 text-[#e8ded2]/75 leading-relaxed">
                  Downtown Dubai, United Arab Emirates
                </li>
              </ul>

              {/* Social Media Pill Buttons matching screenshot */}
              <div className="flex items-center gap-2.5 mt-6 flex-wrap">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-[#fffdf8] hover:border-[#f2be6b] hover:text-[#f2be6b] hover:bg-white/5 transition-all duration-200"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar matching screenshot */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e8ded2]/70">
            <div className="flex items-center gap-2.5">
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={siteMetadata.logo}
                  alt="TeddyPups logo"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span>© 2026 TeddyPups U.A.E.</span>
            </div>

            <div className="font-scrawl text-sm sm:text-base text-[#f2be6b]">
              every puppy is family
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
