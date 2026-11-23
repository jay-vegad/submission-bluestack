"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GalleryPhoto } from "@/app/data/site-data";

export interface PolaroidCardProps {
  photo: GalleryPhoto;
  index: number;
  onClick: () => void;
  customCaption?: string;
}

// Noticeable yet tasteful random tilt angles for realistic wall pinning
const RANDOM_TILTS = [
  -1.8, 1.6, -1.3, 2.0, -1.6, 1.4, -1.9, 1.7,
  -1.2, 2.1, -1.5, 1.3, -2.0, 1.5, -1.4, 1.8,
];

/**
 * Animated Puppy Paw: uses /mouse-pointer/pointer-paw.svg from the public folder.
 * Compact, cute paw size that comes down from above, stamps the tape, and leaves.
 */
function PuppyPaw() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_4px_rgba(42,23,14,0.22)] flex items-center justify-center">
        <Image
          src="/mouse-pointer/pointer-paw.svg"
          alt="Puppy paw"
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export function PolaroidCard({
  photo,
  index,
  onClick,
  customCaption,
}: PolaroidCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const pawRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const inViewRef = useRef(false);
  const imageLoadedRef = useRef(false);

  const tilt = RANDOM_TILTS[index % RANDOM_TILTS.length];
  const tapeTilt = index % 2 === 0 ? -1.2 : 1.4;
  const caption = customCaption || photo.caption || "Happy TeddyPups family moment";

  // Trigger animation: Paw comes in -> tape appears -> card does little jump -> paw goes away rotating right
  const triggerAnimation = useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const cardEl = cardInnerRef.current;
    const pawEl = pawRef.current;
    const tapeEl = tapeRef.current;
    if (!cardEl || !pawEl) return;

    // Slight row stagger so cards in the same row don't hit identically simultaneously
    const staggerDelay = (index % 4) * 0.08;

    const tl = gsap.timeline({ delay: staggerDelay });

    // 1. Puppy paw comes down fast from above, tilted left (-16deg)
    tl.fromTo(
      pawEl,
      { opacity: 0, y: -30, rotate: -16, scale: 1.15, display: "block" },
      {
        opacity: 0.95,
        y: 2,
        rotate: -6,
        scaleX: 1.06,
        scaleY: 0.88,
        duration: 0.24,
        ease: "power2.in",
      }
    );

    // 2. Tape appears under the paw stamp right after image loads in viewport
    if (tapeEl) {
      tl.fromTo(
        tapeEl,
        { opacity: 0, scaleY: 0.6, scaleX: 1.2 },
        { opacity: 0.95, scaleY: 1, scaleX: 1, duration: 0.26, ease: "back.out(1.4)" },
        "-=0.1"
      );
    }

    // 3. Card enters with little jump animation as per the CSS (tp-print-bound) - no bounce
    tl.fromTo(
      cardEl,
      { opacity: 0, y: 25, scale: 0.92 },
      {
        opacity: 1,
        y: -6, // subtle jump overshoot
        scaleX: 0.98,
        scaleY: 1.03,
        duration: 0.26,
        ease: "power2.out",
      },
      "-=0.18"
    )
    .to(cardEl, {
      y: 0,
      scaleX: 1.025,
      scaleY: 0.975,
      duration: 0.16,
      ease: "power1.inOut",
    })
    .to(cardEl, {
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.16,
      ease: "power2.out",
    });

    // 4. Paw GOES AWAY: lifts up, fades out with opacity, and rotates to the RIGHT (+10deg)
    tl.to(
      pawEl,
      {
        opacity: 0,
        y: -22,
        rotate: 10, // Right rotate animation on exit
        scale: 1.04,
        duration: 0.32,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(pawEl, { display: "none" });
        },
      },
      "-=0.18"
    );
  }, [index]);

  const handleImageLoad = () => {
    imageLoadedRef.current = true;
    // Tape & jump animation trigger ONLY after image has loaded in viewport
    if (inViewRef.current && !hasAnimatedRef.current) {
      triggerAnimation();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion accessibility check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (cardInnerRef.current) gsap.set(cardInnerRef.current, { opacity: 1, y: 0, scale: 1 });
      if (pawRef.current) gsap.set(pawRef.current, { opacity: 0, display: "none" });
      if (tapeRef.current) gsap.set(tapeRef.current, { opacity: 0.95, scale: 1 });
      hasAnimatedRef.current = true;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cardEl = cardInnerRef.current;
    const pawEl = pawRef.current;
    const tapeEl = tapeRef.current;
    const containerEl = containerRef.current;
    if (!cardEl || !pawEl || !containerEl) return;

    // Set initial state before stamp animation: tape and card hidden
    gsap.set(cardEl, { opacity: 0, y: 25, scale: 0.92 });
    gsap.set(pawEl, { opacity: 0, y: -30, rotate: -16, scale: 1.15, display: "none" });
    if (tapeEl) {
      gsap.set(tapeEl, { opacity: 0, scaleY: 0.6, scaleX: 1.2 });
    }

    // ScrollTrigger: When user scrolls down and card enters view
    const st = ScrollTrigger.create({
      trigger: containerEl,
      start: "top 88%",
      onEnter: () => {
        inViewRef.current = true;
        // If image has already loaded, trigger stamp animation!
        if (imageLoadedRef.current) {
          triggerAnimation();
        }
      },
    });

    // Check if card is already in view upon mount (e.g. initial top rows)
    if (st.progress > 0) {
      inViewRef.current = true;
      if (imageLoadedRef.current) {
        triggerAnimation();
      }
    }

    // Safety fallback: if in viewport and image takes > 1.2s to load, animate anyway
    const fallbackTimer = setTimeout(() => {
      if (inViewRef.current && !hasAnimatedRef.current) {
        triggerAnimation();
      }
    }, 1200);

    return () => {
      clearTimeout(fallbackTimer);
      st.kill();
    };
  }, [triggerAnimation]);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        transform: `rotate(${tilt}deg)`,
      }}
      className="group relative cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#a24a1a]/30 w-full select-none"
      aria-label={`View photo: ${caption}`}
    >
      {/* Animated Puppy Paw: Comes down from above, stamps, then goes away */}
      <div
        ref={pawRef}
        className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none"
        aria-hidden="true"
      >
        <PuppyPaw />
      </div>

      {/* Inner Polaroid Card with clean static shadow (no hover showcase) */}
      <div
        ref={cardInnerRef}
        style={{ transformOrigin: "center top" }}
        className="relative w-full bg-[#ffffff] p-2 sm:p-2.5 pb-2.5 sm:pb-3 rounded-[3px] border border-[#2a170e]/10 shadow-[0_3px_12px_rgba(42,23,14,0.06),0_1px_3px_rgba(42,23,14,0.04)]"
      >
        {/* Washi Tape Strip at the top holding the polaroid on the wall */}
        <div
          ref={tapeRef}
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-5.5 bg-[#f7eedc]/95 backdrop-blur-[1px] border-t border-b border-[#dfcfb5]/70 shadow-[0_1px_2.5px_rgba(42,23,14,0.08)] z-10 pointer-events-none select-none rounded-[1px]"
          style={{
            transform: `translateX(-50%) rotate(${tapeTilt}deg)`,
            clipPath:
              "polygon(3% 0%, 97% 0%, 100% 25%, 98% 50%, 100% 75%, 97% 100%, 3% 100%, 0% 75%, 2% 50%, 0% 25%)",
          }}
          aria-hidden="true"
        />

        {/* Crystal Clean Photo Container - High contrast, sharp, static - no hover zoom */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#fbf9f5] border border-[#2a170e]/5">
          <Image
            src={photo.imageUrl}
            alt={photo.alt || caption}
            fill
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover rounded-[2px]"
            loading={index < 8 ? "eager" : "lazy"}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Clean Polaroid Chin with Refined Handwritten Caption Font Size */}
        <div className="pt-2 sm:pt-2.5 pb-0.5 px-1 flex items-center justify-center min-h-[32px] sm:min-h-[36px]">
          <p className="font-scrawl text-[#3a2215] text-[13px] sm:text-[14px] md:text-[15px] text-center truncate font-medium max-w-full tracking-normal select-none">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
