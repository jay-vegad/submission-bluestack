"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { meetPuppiesData, siteMetadata } from "@/app/data/site-data";
import { PuppySVG } from "@/components/puppy-svg";

// Rich puppy data formatted specifically for the arched doors matching the screenshots
interface DoorPuppy {
  id: string;
  name: string;
  subtitle: string;
  doorColor: string;
  imageUrl: string;
  alt: string;
  breed: string;
}

const doorPuppies: DoorPuppy[] = [
  {
    id: "max",
    name: "Max",
    subtitle: "Maltipoo, boy, 3 months, with video",
    doorColor: "#8c4a24", // warm saddle cedar
    imageUrl:
      "https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
    alt: "Max, male Maltipoo puppy",
    breed: "Maltipoo",
  },
  {
    id: "korean-teacup-maltipoo",
    name: "Korean Teacup Maltipoo",
    subtitle: "girl, 2 months, with video",
    doorColor: "#3f2922", // dark chocolate espresso
    imageUrl:
      "https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    alt: "Female Korean Teacup Maltipoo puppy",
    breed: "Korean Teacup Maltipoo",
  },
  {
    id: "korean-teacup-poodle",
    name: "Korean Teacup Poodle",
    subtitle: "girl, 2 months",
    doorColor: "#c8833b", // golden honey oak
    imageUrl:
      "https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
    alt: "Female Korean Teacup Poodle puppy",
    breed: "Korean Teacup Poodle",
  },
  {
    id: "maltipoo-cavapoo",
    name: "Maltipoo & Cavapoo",
    subtitle: "boy, 3 months Maltipoo & 2 months Cavapoo, with video",
    doorColor: "#a8523c", // terracotta redwood
    imageUrl:
      "https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
    alt: "Maltipoo and Cavapoo puppies",
    breed: "Maltipoo & Cavapoo",
  },
  {
    id: "toy-poodle",
    name: "Toy Poodle",
    subtitle: "boy & girl, 2 months",
    doorColor: "#543928", // medium walnut
    imageUrl:
      "https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    alt: "Toy Poodle puppies",
    breed: "Toy Poodle",
  },
  {
    id: "maltipoo-girl",
    name: "Maltipoo",
    subtitle: "girl, 3 months, with video",
    doorColor: "#8c4a24",
    imageUrl:
      "https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
    alt: "Maltipoo puppy",
    breed: "Maltipoo",
  },
  {
    id: "pomeranian",
    name: "Pomeranian",
    subtitle: "girl, 3 months",
    doorColor: "#3f2922",
    imageUrl:
      "https://puppy.instabizweb.com/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    alt: "Pomeranian puppy",
    breed: "Pomeranian",
  },
  {
    id: "copper-cavapoo",
    name: "Cavapoo",
    subtitle: "boy, 2 months",
    doorColor: "#c8833b",
    imageUrl:
      "https://puppy.instabizweb.com/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg",
    alt: "Cavapoo puppy",
    breed: "Cavapoo",
  },
  {
    id: "shih-tzu-girl",
    name: "Shih Tzu",
    subtitle: "girl, 2 months, with video",
    doorColor: "#a8523c",
    imageUrl:
      "https://puppy.instabizweb.com/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
    alt: "Shih Tzu puppy",
    breed: "Shih Tzu",
  },
  {
    id: "teacup-pomeranian",
    name: "Korean Teacup Pomeranian",
    subtitle: "girl, 2 months, with video",
    doorColor: "#543928",
    imageUrl:
      "https://puppy.instabizweb.com/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg",
    alt: "Korean Teacup Pomeranian puppy",
    breed: "Korean Teacup Pomeranian",
  },
];

// Entry footsteps leading down from Hero section into the walkway
const entryFootprints = [
  { top: 22, left: "51%", angle: 152 },
  { top: 58, left: "46%", angle: 142 },
  { top: 100, left: "39%", angle: 130 },
  { top: 148, left: "30%", angle: 115 },
  { top: 202, left: "20%", angle: 100 },
  { top: 260, left: "10%", angle: 88 },
];

export function MeetPups() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Set of opened door IDs (supports hover and touch toggle)
  const [openDoorIds, setOpenDoorIds] = useState<Record<string, boolean>>({});

  // Dog Mascot Animation State
  const [isDogHovered, setIsDogHovered] = useState(false);

  // Dynamic Walk Cycle Angles (driven by scroll)
  const [limbState, setLimbState] = useState({
    fnAngle: 0,
    bfAngle: 0,
    ffAngle: 0,
    bnAngle: 0,
    bodyY: 0,
    headY: 0,
    tailAngle: 6.61,
    shadowScaleX: 1,
    earAngle: 0,
  });

  const lastScrollTimeRef = useRef(0);
  const stridePhaseRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Open/Close door handler
  const handleDoorHover = useCallback((id: string, isOpen: boolean) => {
    setOpenDoorIds((prev) => ({ ...prev, [id]: isOpen }));
  }, []);

  const handleDoorClick = useCallback((puppy: DoorPuppy) => {
    // Open puppy inquiry on WhatsApp directly on click
    window.open(
      `https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'm%20asking%20about%20${encodeURIComponent(
        puppy.name
      )}%20(${encodeURIComponent(puppy.breed)})!`,
      "_blank"
    );
  }, []);

  // Update door cards state based on scroll position (doors swing open as they roll past the puppy)
  const updateDoorsState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const threshold = window.innerWidth * 0.38;
    const doorCards = track.querySelectorAll<HTMLElement>(".door-card");
    doorCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const shouldBeOpen = rect.left < threshold;
      if (card.dataset.open !== String(shouldBeOpen)) {
        card.dataset.open = String(shouldBeOpen);
      }
    });
  }, []);

  // Update dog trot cycle in-place from scroll progress (puppy stays stationary on treadmill)
  const updateDogWalk = useCallback((progress: number) => {
    lastScrollTimeRef.current = Date.now();

    // 28 walk cycles across the full horizontal track
    const totalCycles = 28;
    stridePhaseRef.current = progress * totalCycles * Math.PI * 2;

    const phase = stridePhaseRef.current;
    const sinPhase = Math.sin(phase);
    const cosPhase = Math.cos(phase);

    setLimbState({
      fnAngle: sinPhase * 25,
      bfAngle: sinPhase * 22,
      ffAngle: -sinPhase * 25,
      bnAngle: -sinPhase * 22,
      bodyY: -Math.abs(sinPhase) * 4.8,
      headY: -Math.abs(sinPhase) * 2.8,
      tailAngle: 6.61 + sinPhase * 16,
      shadowScaleX: 1 - Math.abs(sinPhase) * 0.08,
      earAngle: cosPhase * 8,
    });
  }, []);

  // Smooth lerp back to relaxed standing when scroll pauses + gentle idle breathing
  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const timeSinceScroll = now - lastScrollTimeRef.current;

      if (timeSinceScroll > 100) {
        // Idle animation
        const t = now * 0.0025;
        const idleBodyY = Math.sin(t * 1.5) * 1.2;
        const idleTail = 6.61 + Math.sin(t * 2) * 5;

        setLimbState((prev) => ({
          fnAngle: prev.fnAngle * 0.85,
          bfAngle: prev.bfAngle * 0.85,
          ffAngle: prev.ffAngle * 0.85,
          bnAngle: prev.bnAngle * 0.85,
          bodyY: prev.bodyY * 0.85 + idleBodyY * 0.15,
          headY: prev.headY * 0.85 + idleBodyY * 0.1,
          tailAngle: prev.tailAngle * 0.85 + idleTail * 0.15,
          shadowScaleX: prev.shadowScaleX * 0.85 + 1 * 0.15,
          earAngle: prev.earAngle * 0.85,
        }));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // GSAP Horizontal Pinning on Desktop and Tablets
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.innerWidth >= 768;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const getScrollDistance = () => track.scrollWidth - window.innerWidth + 240;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateDogWalk(self.progress);
            updateDoorsState();
          },
        },
      });
    }, section);

    // Initial check to set doors open state on mount
    updateDoorsState();

    const handleResize = () => {
      ScrollTrigger.refresh();
      updateDoorsState();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [updateDogWalk, updateDoorsState]);

  // Mobile horizontal scroll listener
  const handleMobileScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    const progress = track.scrollLeft / maxScroll;
    updateDogWalk(progress);
    updateDoorsState();
  };

  return (
    <section
      ref={sectionRef}
      id="meet"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fff1d8] via-[#fff7ea] to-[#fbe3b4]/35 pt-14 pb-28 lg:py-20 flex flex-col justify-between overflow-hidden select-none"
      aria-labelledby="meet-title"
    >
      {/* Warm ambient sun glow matching hero section */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[min(94vw,66rem)] aspect-square rounded-full bg-gradient-to-b from-[#f2be6b]/20 via-[#fbe3b4]/16 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Entry footsteps leading down from Hero section into the walkway */}
      <div
        className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none z-10 overflow-hidden"
        aria-hidden="true"
      >
        {entryFootprints.map((ep, i) => (
          <div
            key={`entry-fp-${i}`}
            className="absolute transition-opacity duration-300"
            style={{
              left: ep.left,
              top: `${ep.top}px`,
              transform: `rotate(${ep.angle}deg)`,
              opacity: 0.38,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" fill="#8c4a24">
              <path d="M24 20c-5.5 0-10 4-10 9 0 4.5 4 8 10 8s10-3.5 10-8c0-5-4.5-9-10-9z" />
              <ellipse cx="14" cy="14" rx="3.5" ry="5" transform="rotate(-18 14 14)" />
              <ellipse cx="20.5" cy="10" rx="3.5" ry="5.5" transform="rotate(-6 20.5 10)" />
              <ellipse cx="27.5" cy="10" rx="3.5" ry="5.5" transform="rotate(6 27.5 10)" />
              <ellipse cx="34" cy="14" rx="3.5" ry="5" transform="rotate(18 34 14)" />
            </svg>
          </div>
        ))}
      </div>
      {/* 1. Section Header: Title, Subtitle, and Pill CTA Button */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 z-20 mb-6 sm:mb-8 lg:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <h2
              id="meet-title"
              className="font-plush font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#2a170e] tracking-tight leading-[1.05]"
              style={{
                fontFamily:
                  "var(--font-fraunces-local), var(--font-fraunces), 'Fraunces', serif",
                fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
              }}
            >
              {meetPuppiesData.heading}
            </h2>
            <p className="font-body text-[#5a3a28] text-base sm:text-lg lg:text-[19px] max-w-xl mt-2 leading-snug">
              {meetPuppiesData.body}
            </p>
          </div>

          {/* Pill CTA button with solid shadow */}
          <a
            href={siteMetadata.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-0 bg-[#a24a1a] text-[#fffdf8] rounded-full px-7 py-3 text-[16px] font-semibold cursor-pointer shadow-[0_4px_0_0_#2a170e] hover:-translate-y-[2px] hover:-rotate-1 hover:bg-[#8e3f15] hover:shadow-[0_6px_0_0_#2a170e] active:translate-y-[2px] active:rotate-0 active:shadow-[0_1px_0_0_#2a170e] transition-all duration-200 self-start sm:self-auto inline-flex items-center justify-center shrink-0"
          >
            {meetPuppiesData.ctaLabel}
          </a>
        </div>
      </div>

      {/* 2. Horizontal Arched Doors Track (Generous spacing and proportions matching screenshots) */}
      <div className="relative w-full flex-1 flex items-end z-10 pb-4">
        <div
          ref={trackRef}
          onScroll={handleMobileScroll}
          className="flex items-end gap-12 sm:gap-16 lg:gap-20 pl-36 sm:pl-56 md:pl-72 lg:pl-[38vw] pr-16 sm:pr-24 lg:pr-32 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {doorPuppies.map((puppy) => {
            const isOpen = Boolean(openDoorIds[puppy.id]);

            return (
              <div
                key={puppy.id}
                data-open="false"
                className={`door-card door-group flex-shrink-0 flex flex-col items-center group cursor-pointer ${
                  isOpen ? "is-open" : ""
                }`}
                style={{ scrollSnapAlign: "start" }}
                onMouseEnter={() => handleDoorHover(puppy.id, true)}
                onMouseLeave={() => handleDoorHover(puppy.id, false)}
                onPointerEnter={() => handleDoorHover(puppy.id, true)}
                onPointerLeave={() => handleDoorHover(puppy.id, false)}
                onClick={() => handleDoorClick(puppy)}
              >
                {/* Text Above Door: Name & Subtitle */}
                <div className="text-center mb-3 sm:mb-4 px-2 max-w-[260px] flex flex-col items-center justify-end min-h-[58px]">
                  <h3
                    className="font-plush font-extrabold text-2xl sm:text-[26px] text-[#2a170e] leading-tight text-center"
                    style={{
                      fontFamily:
                        "var(--font-fraunces-local), var(--font-fraunces), 'Fraunces', serif",
                    }}
                  >
                    {puppy.name}
                  </h3>
                  <p className="font-body text-xs sm:text-[13.5px] text-[#6b4832] text-center mt-1 leading-snug">
                    {puppy.subtitle}
                  </p>
                </div>

                {/* Arched Doorway Frame Container */}
                <div className="relative w-[230px] sm:w-[246px] lg:w-[258px] h-[330px] sm:h-[348px] lg:h-[362px] door-perspective">
                  {/* "Available" Pill Tag on Upper Right of Doorway Frame */}
                  <div
                    className="absolute -top-2 -right-3 z-30 bg-white text-[#2a170e] border-2 border-[#2a170e] font-bold text-xs sm:text-[13px] px-3.5 py-0.5 rounded-full shadow-[0_2px_0_0_#2a170e] rotate-[7deg] tracking-tight pointer-events-none select-none"
                    style={{
                      fontFamily:
                        "var(--font-shantell), cursive, sans-serif",
                    }}
                  >
                    Available
                  </div>

                  {/* Arched Opening Behind the Door (Holds Real Puppy Photo cleanly down to bottom) */}
                  <div className="absolute inset-0 w-full h-full rounded-t-[115px] sm:rounded-t-[123px] lg:rounded-t-[129px] rounded-b-none border-2 border-[#2a170e] overflow-hidden bg-[#1f120c] z-0">
                    <Image
                      src={puppy.imageUrl}
                      alt={puppy.alt}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Subtle warm ambient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Wooden Door Leaf (Swings open on hover / tap in 3D perspective to the left) */}
                  <div
                    className={`door-leaf absolute inset-0 w-full h-full rounded-t-[115px] sm:rounded-t-[123px] lg:rounded-t-[129px] rounded-b-none border-2 border-[#2a170e] z-10 ${
                      isOpen ? "is-open" : ""
                    }`}
                    style={{
                      backgroundColor: puppy.doorColor,
                      transform: isOpen
                        ? "perspective(1200px) rotateY(68deg)"
                        : undefined,
                      boxShadow: isOpen
                        ? "4px 0 16px rgba(0, 0, 0, 0.35)"
                        : undefined,
                    }}
                  >
                    <svg
                      viewBox="0 0 258 362"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      fill="none"
                    >
                      {/* Carved Door Arch Groove Inset */}
                      <path
                        d="M 14 362 L 14 129 A 115 115 0 0 1 244 129 L 244 362"
                        stroke="rgba(42, 23, 14, 0.45)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 16 362 L 16 129 A 113 113 0 0 1 242 129 L 242 362"
                        stroke="rgba(255, 255, 255, 0.16)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />

                      {/* Embossed Paw Print on Door Arch Top */}
                      <g opacity="0.38">
                        <ellipse
                          cx="129"
                          cy="74"
                          rx="14.5"
                          ry="11.5"
                          fill="#ffffff"
                        />
                        <ellipse
                          cx="110"
                          cy="56"
                          rx="4.8"
                          ry="7"
                          transform="rotate(-18 110 56)"
                          fill="#ffffff"
                        />
                        <ellipse
                          cx="122"
                          cy="50"
                          rx="4.8"
                          ry="7.5"
                          transform="rotate(-6 122 50)"
                          fill="#ffffff"
                        />
                        <ellipse
                          cx="136"
                          cy="50"
                          rx="4.8"
                          ry="7.5"
                          transform="rotate(6 136 50)"
                          fill="#ffffff"
                        />
                        <ellipse
                          cx="148"
                          cy="56"
                          rx="4.8"
                          ry="7.5"
                          transform="rotate(18 148 56)"
                          fill="#ffffff"
                        />
                      </g>

                      {/* Brass Door Knob on Right Side */}
                      <circle
                        cx="226"
                        cy="210"
                        r="8.5"
                        fill="#f2c063"
                        stroke="#2a170e"
                        strokeWidth="2.2"
                      />
                      <circle cx="226" cy="210" r="2.8" fill="#2a170e" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Floor Runner (Warm wooden baseboard across the entire bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[68px] sm:h-[76px] lg:h-[82px] z-15 floor-wood-planks border-t-[3px] border-[#2a170e]">
        {/* Top wood bevel lip */}
        <div className="w-full h-[9px] bg-[#ecc088] border-b border-[#2a170e]/20" />
      </div>

      {/* 4. Mascot Puppy Container (Sticks at one position on the floor, trotting in place as doors roll) */}
      <div
        className="absolute left-6 sm:left-12 lg:left-[14vw] bottom-[54px] sm:bottom-[62px] lg:bottom-[68px] z-25 pointer-events-auto"
      >
        {/* Mascot Dog - trots in place with scroll as doors roll past */}
        <div
          className="relative w-36 sm:w-44 lg:w-52 h-auto cursor-pointer z-10 group select-none"
          onMouseEnter={() => setIsDogHovered(true)}
          onMouseLeave={() => setIsDogHovered(false)}
          onClick={() => setIsDogHovered((prev) => !prev)}
          title="TeddyPups Mascot Puppy - tap or hover me!"
        >
          <PuppySVG
            limbState={limbState}
            isHovered={isDogHovered}
            className="w-full h-auto drop-shadow-md"
          />
        </div>
      </div>

      {/* 5. Mobile Swipe Indicator */}
      <div className="lg:hidden mt-6 text-center z-20">
        <span className="text-xs text-[#5a3a28] font-medium inline-flex items-center justify-center gap-1.5 bg-[#fbe3b4]/60 px-4 py-1.5 rounded-full border border-[#e8d8c8]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 18l6-6-6-6M4 18l6-6-6-6" />
          </svg>
          Scroll or swipe horizontally to see all puppies
        </span>
      </div>
    </section>
  );
}
