"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waysData } from "@/app/data/site-data";

export function WaysToMeet() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current?.querySelectorAll(".way-card");
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ways"
      className="py-20 lg:py-28 bg-[#fbe3b4]/30 relative"
      aria-labelledby="paths-title"
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-scrawl text-lg text-[#a24a1a]">
            Choose your path
          </span>
          <h2
            id="paths-title"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-[#2a170e] mt-1 text-balance leading-tight"
          >
            <span className="whitespace-nowrap">Two ways to meet</span>{" "}
            <span className="whitespace-nowrap">your puppy</span>
          </h2>
          <p className="font-body text-[#5a3a28] text-base sm:text-lg mt-3">
            Whether you want to cuddle and bond in our Dubai showroom today or
            import a rare teacup line from Seoul, we provide a seamless,
            joyful experience.
          </p>
        </div>

        {/* 2 Ways Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {waysData.ways.map((way) => (
            <article
              key={way.id}
              className="way-card flex flex-col justify-between bg-[#fffdf8] rounded-[32px] p-6 sm:p-8 border-2 border-[#e8d8c8] shadow-[rgba(42,23,14,0.2)_2px_3px_0px_0px] hover:shadow-[rgba(42,23,14,0.25)_0px_7px_0px_-3px] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${way.accent}15`,
                      color: way.accent,
                    }}
                  >
                    {way.badge}
                  </span>
                  <span className="text-xs font-bold text-[#5a3a28] uppercase tracking-wider">
                    Option {way.id === "way-local" ? "01" : "02"}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-heading text-2xl sm:text-3xl text-[#2a170e] mb-3">
                  {way.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[#5a3a28] text-base leading-relaxed mb-6">
                  {way.description}
                </p>

                {/* Image Illustration */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-[#fbe3b4]/40 border border-[#e8dfd3]">
                  <Image
                    src={way.image}
                    alt={way.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>

                {/* Highlights List */}
                <ul className="space-y-3 mb-8" aria-label="Highlights">
                  {way.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#2a170e]"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1f7a4d]/15 text-[#1f7a4d] flex items-center justify-center mt-0.5">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <a
                href={way.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary w-full text-center text-base"
              >
                {way.ctaText}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

