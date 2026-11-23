"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trustStamps } from "@/app/data/site-data";

export function WhyTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const stampsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const stampEls = stampsRef.current?.querySelectorAll(".passport-stamp");
    if (!stampEls || stampEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(stampEls, {
        opacity: 0,
        scale: 0.85,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Icon render helper for the 4 passport stamps
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "health":
        return (
          <svg
            viewBox="0 0 64 64"
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" />
            <path d="M22 30h7l3-7 4 13 3-6h7" />
          </svg>
        );
      case "plane":
        return (
          <svg
            viewBox="0 0 64 64"
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" />
            <path d="M8 50c10 4 20 4 30 0" strokeDasharray="3 6" />
          </svg>
        );
      case "support":
        return (
          <svg
            viewBox="0 0 64 64"
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 14h44v28H30l-12 10v-10h-8z" />
            <circle cx="22" cy="28" r="2" fill="currentColor" />
            <circle cx="32" cy="28" r="2" fill="currentColor" />
            <circle cx="42" cy="28" r="2" fill="currentColor" />
          </svg>
        );
      case "globe":
      default:
        return (
          <svg
            viewBox="0 0 64 64"
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="32" cy="32" r="22" />
            <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" />
          </svg>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="py-20 lg:py-28 bg-[#fbe3b4]/30 relative"
      aria-labelledby="trust-title"
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-lg text-[#a24a1a]">
            puppy passport
          </span>
          <h2
            id="trust-title"
            className="font-heading text-3xl sm:text-4xl lg:text-[44px] text-[#2a170e] mt-1"
          >
            Why families trust TeddyPups
          </h2>
          <p className="font-body text-[#5a3a28] text-base sm:text-lg mt-3">
            Every puppy is treated like family. We guarantee pure genetics, licensed
            veterinarian approvals, and compassionate care every step of the journey.
          </p>
        </div>

        {/* Passport Stamps Grid */}
        <div
          ref={stampsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {trustStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="passport-stamp flex flex-col justify-between bg-[#fffdf8] rounded-3xl p-6 border-2 border-[#e8d8c8] shadow-[rgba(42,23,14,0.2)_2px_3px_0px_0px] hover:shadow-[rgba(42,23,14,0.25)_0px_7px_0px_-3px] hover:-translate-y-2 transition-all duration-300"
              style={{
                transform: `rotate(${stamp.tilt})`,
              }}
            >
              <div>
                {/* Stamp Icon badge */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xs border"
                  style={{
                    backgroundColor: `${stamp.color}15`,
                    color: stamp.color,
                    borderColor: `${stamp.color}30`,
                  }}
                >
                  {renderIcon(stamp.icon)}
                </div>

                <h3 className="font-heading text-xl sm:text-2xl text-[#2a170e] mb-2.5">
                  {stamp.title}
                </h3>

                <p className="font-body text-sm text-[#5a3a28] leading-relaxed">
                  {stamp.description}
                </p>
              </div>

              {/* Official Seal Watermark Label */}
              <div className="mt-6 pt-4 border-t border-[#e8dfd3] flex items-center justify-between text-xs text-[#a24a1a] font-semibold uppercase tracking-wider font-mono">
                <span>Certified Guarantee</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

