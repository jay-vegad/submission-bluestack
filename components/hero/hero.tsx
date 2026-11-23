"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { siteMetadata, meetPuppiesData } from "@/app/data/site-data";
import { PuppySVG } from "@/components/puppy-svg";

// The puppy stays put behind the fence, so every limb sits at rest.
const RESTING_LIMBS = {
  fnAngle: 0,
  bfAngle: 0,
  ffAngle: 0,
  bnAngle: 0,
  bodyY: 0,
  headY: 0,
  tailAngle: 6.61,
  shadowScaleX: 1,
  earAngle: 0,
};

const NO_HEAD_MOVE = { x: 0, y: 0, angle: 0 };
const NO_EAR_MOVE = { left: 0, right: 0 };

// What the puppy can do when you click it. A random one plays each time,
// never the same one twice in a row. y is a % of the puppy's own height,
// so ducking behind the wall works at every screen size.
type Reaction = {
  id: string;
  text: string;
  eyesClosed: boolean;
  ears: { left: number; right: number };
  head: { x: number; y: number; angle: number };
  y: string[];
  rotate: number[];
  times: number[];
  duration: number;
};

const REACTIONS: Reaction[] = [
  {
    // Quick double hop with ears perked up
    id: "bark",
    text: "Woof woof!",
    eyesClosed: false,
    ears: { left: 14, right: -14 },
    head: { x: 0, y: -4, angle: 0 },
    y: ["0%", "-6%", "0%", "-6%", "0%"],
    rotate: [0, -2, 0, 2, 0],
    times: [0, 0.25, 0.5, 0.75, 1],
    duration: 0.7,
  },
  {
    // Flinches, drops behind the wall, then climbs back up
    id: "ouch",
    text: "Ouchhh!",
    eyesClosed: true,
    ears: { left: -10, right: 10 },
    head: { x: 0, y: 4, angle: 0 },
    y: ["0%", "6%", "75%", "75%", "0%"],
    rotate: [0, -5, 0, 0, 0],
    times: [0, 0.12, 0.35, 0.7, 1],
    duration: 1.7,
  },
  {
    // Hides, waits a beat, then pops up higher than before
    id: "peekaboo",
    text: "Peekaboo!",
    eyesClosed: false,
    ears: { left: 8, right: -8 },
    head: NO_HEAD_MOVE,
    y: ["0%", "80%", "80%", "-6%", "0%"],
    rotate: [0, 0, 0, 0, 0],
    times: [0, 0.25, 0.6, 0.85, 1],
    duration: 1.9,
  },
  {
    // Happy side to side wiggle with eyes squeezed shut
    id: "happy",
    text: "Hehe!",
    eyesClosed: true,
    ears: { left: 6, right: -6 },
    head: NO_HEAD_MOVE,
    y: ["0%", "-4%", "0%", "-4%", "0%", "0%"],
    rotate: [0, -6, 6, -6, 6, 0],
    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    duration: 1,
  },
  {
    // Big startled jump
    id: "whoa",
    text: "Whoa!",
    eyesClosed: false,
    ears: { left: 16, right: -16 },
    head: { x: 0, y: -5, angle: 0 },
    y: ["0%", "-16%", "0%"],
    rotate: [0, 0, 0],
    times: [0, 0.4, 1],
    duration: 0.6,
  },
];

type SeatConfig = {
  slot: number;
  width: string;
  height: string;
  showTag?: boolean;
  hideOnMobile?: boolean;
};

// Left side, outer to inner. The right side mirrors this exactly,
// so the puppy always lands dead center.
const LEFT_SEATS: SeatConfig[] = [
  {
    slot: 0,
    width: "w-16 sm:w-24 md:w-28 lg:w-36",
    height: "h-24 sm:h-32 md:h-44 lg:h-52",
    hideOnMobile: true,
  },
  {
    slot: 1,
    width: "w-20 sm:w-28 md:w-36 lg:w-44",
    height: "h-28 sm:h-40 md:h-52 lg:h-64",
    showTag: true,
  },
  {
    slot: 2,
    width: "w-14 sm:w-20 md:w-28 lg:w-32",
    height: "h-20 sm:h-28 md:h-36 lg:h-44",
  },
];

const RIGHT_SEATS: SeatConfig[] = [
  {
    slot: 3,
    width: "w-14 sm:w-20 md:w-28 lg:w-32",
    height: "h-20 sm:h-28 md:h-36 lg:h-44",
  },
  {
    slot: 4,
    width: "w-20 sm:w-28 md:w-36 lg:w-44",
    height: "h-28 sm:h-40 md:h-52 lg:h-64",
  },
  {
    slot: 5,
    width: "w-16 sm:w-24 md:w-28 lg:w-36",
    height: "h-24 sm:h-32 md:h-44 lg:h-52",
    hideOnMobile: true,
  },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const puppyRef = useRef<HTMLDivElement>(null);
  const reactionControls = useAnimationControls();

  const [reaction, setReaction] = useState<Reaction | null>(null);
  const lastReactionId = useRef<string | null>(null);
  const isBusy = useRef(false);
  const isMounted = useRef(true);

  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [eyeLook, setEyeLook] = useState({ x: 0, y: 0 });

  const puppyPool = meetPuppiesData.puppies;
  const [slotIndices, setSlotIndices] = useState([0, 1, 2, 3, 4, 5]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Click the puppy and it picks a random reaction
  const triggerReaction = async () => {
    if (isBusy.current) return;

    const options = REACTIONS.filter((r) => r.id !== lastReactionId.current);
    const next = options[Math.floor(Math.random() * options.length)];

    lastReactionId.current = next.id;
    isBusy.current = true;
    setReaction(next);

    try {
      if (prefersReducedMotion) {
        await new Promise((resolve) => setTimeout(resolve, 900));
      } else {
        await reactionControls.start({
          y: next.y,
          rotate: next.rotate,
          transition: {
            duration: next.duration,
            times: next.times,
            ease: "easeInOut",
          },
        });
      }
    } catch {
      // Component unmounted mid animation, nothing to clean up
    } finally {
      if (isMounted.current) {
        reactionControls.set({ y: "0%", rotate: 0 });
        setReaction(null);
      }
      isBusy.current = false;
    }
  };

  // Every few seconds one arch swaps its puppy: old one drops down, new one springs up.
  useEffect(() => {
    let nextPoolIdx = 6;
    let slotToUpdate = 0;

    const interval = setInterval(() => {
      const targetSlot = slotToUpdate;

      setSlotIndices((prev) => {
        const next = [...prev];
        next[targetSlot] = nextPoolIdx % puppyPool.length;
        return next;
      });

      nextPoolIdx = (nextPoolIdx + 1) % puppyPool.length;
      slotToUpdate = (slotToUpdate + 1) % 6;
    }, 3400);

    return () => clearInterval(interval);
  }, [puppyPool.length]);

  // Only the eyes follow the cursor, and only a little. The body never moves.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!puppyRef.current) return;
      const rect = puppyRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.45;

      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.45)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.45)));

      setEyeLook({ x: dx * 3.5, y: dy * 3.5 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // The mascot SVG has a big viewBox with the real drawing floating inside it,
  // which is why it looked tiny and off center. Measure the actual drawing once
  // and crop the viewBox to it, so the box and the puppy are the same size.
  useLayoutEffect(() => {
    const svg = puppyRef.current?.querySelector("svg");
    if (!svg) return;

    const fit = () => {
      try {
        const box = svg.getBBox();
        if (!box.width || !box.height) return;
        const padX = box.width * 0.03;
        const padTop = box.height * 0.03;
        svg.setAttribute(
          "viewBox",
          `${box.x - padX} ${box.y - padTop} ${box.width + padX * 2} ${box.height + padTop}`
        );
        // Anchor to the bottom so the puppy always sits on the wall
        svg.setAttribute("preserveAspectRatio", "xMidYMax meet");
      } catch {
        // getBBox can throw if the svg is not rendered yet, so we just keep the original
      }
    };

    fit();
    const id = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(id);
  }, []);

  const renderSeat = ({ slot, width, height, showTag, hideOnMobile }: SeatConfig) => {
    const puppy = puppyPool[slotIndices[slot]] || puppyPool[0];
    const isHovered = hoveredSlot === slot;

    return (
      <div
        key={`seat-${slot}`}
        className={`relative flex-col items-center flex-shrink-0 ${width} ${hideOnMobile ? "hidden sm:flex" : "flex"
          }`}
        onMouseEnter={() => setHoveredSlot(slot)}
        onMouseLeave={() => setHoveredSlot(null)}
      >
        {/* Name tooltip. Only this appears on hover, nothing shifts. */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute -top-11 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="relative px-3.5 py-1.5 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] text-[11px] sm:text-xs font-semibold text-[#2a170e] shadow-[0_3px_0_0_#2a170e] flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#1f7a4d] animate-pulse" />
                <span>{puppy.name}</span>
                <span className="text-[#a24a1a]">•</span>
                <span className="font-normal text-[#5a3a28]">{puppy.breed}</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-[5px] border-t-[#2a170e]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`box-${slot}-${puppy.id}`}
            initial={{ y: 130, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 240, damping: 20, mass: 0.85 },
            }}
            exit={{
              y: 130,
              opacity: 0,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }}
            className="relative flex flex-col items-center w-full"
          >
            {showTag && !isHovered && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap px-3 py-0.5 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] text-[11px] sm:text-xs font-semibold text-[#2a170e] shadow-[0_2px_0_0_#2a170e] pointer-events-none">
                {puppy.breed || "Korean Teacup Pomeranian"}
              </div>
            )}

            <Link
              href="#meet"
              className={`relative block w-full ${height} rounded-t-full border-[3px] sm:border-[3.5px] border-b-0 border-[#2a170e] bg-[#fbe3b4] overflow-hidden shadow-[inset_0_0_0_3px_#fffdf8] sm:shadow-[inset_0_0_0_3.5px_#fffdf8]`}
              aria-label={`View ${puppy.name}, ${puppy.breed}`}
            >
              <Image
                src={puppy.imageUrl}
                alt={`${puppy.name}, ${puppy.breed}`}
                fill
                sizes="(max-width: 768px) 140px, 220px"
                className="object-cover object-center"
                priority={slot < 3}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="w-full bg-gradient-to-b from-[#fffdf8] via-[#fffdf8] via-25% via-[#fff7ea] to-[#fbe3b4]/50 pt-28 sm:pt-32 pb-0 flex flex-col relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Warm glow behind the stage */}
      <div
        className="pointer-events-none absolute top-32 sm:top-40 md:top-48 left-1/2 -translate-x-1/2 w-[min(94vw,66rem)] aspect-square rounded-full bg-gradient-to-b from-[#f2be6b]/20 via-[#fbe3b4]/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Copy */}
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
        <div className="relative inline-block mb-2">
          <span className="font-scrawl text-lg sm:text-xl md:text-2xl text-[#a24a1a] font-medium tracking-wide">
            every puppy is family
          </span>
          <svg
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-3 w-full text-[#c2622b]"
            aria-hidden="true"
          >
            <path
              d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          id="hero-title"
          className="font-plush text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[106px] text-[#2a170e] font-extrabold tracking-tight mt-3 mb-5 leading-[0.98]"
          style={{
            fontFamily:
              "var(--font-fraunces-local), var(--font-fraunces), 'Fraunces', serif",
            fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
          }}
        >
          <span className="block">Premium teacup</span>
          <span className="block">puppies in Dubai</span>
        </h1>

        <p className="font-body text-base sm:text-lg md:text-[20px] text-[#5a3a28] max-w-2xl mx-auto leading-relaxed mt-1 mb-8">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full mb-8">
          <a
            href="#meet"
            className="bg-[#a24a1a] text-[#fffdf8] rounded-full px-7 py-3.5 text-[17px] font-semibold shadow-[0_4px_0_0_#2a170e] hover:bg-[#8e3f15] hover:shadow-[0_6px_0_0_#2a170e] hover:-translate-y-[2px] hover:-rotate-1 active:translate-y-[2px] active:rotate-0 active:shadow-[0_1px_0_0_#2a170e] transition-all duration-200 inline-flex items-center justify-center"
          >
            View available puppies
          </a>

          <a
            href={siteMetadata.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[#2a170e] border-2 border-[#2a170e] rounded-full px-7 py-3.5 text-[17px] font-semibold hover:bg-[#2a170e] hover:text-[#fffdf8] active:translate-y-[1px] transition-all duration-200 inline-flex items-center justify-center"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* Stage */}
      <div className="w-full relative mt-4 pt-6">
        {/* Three equal columns: left arches | puppy | right arches.
            The side columns share space equally, so the puppy is always centered. */}
        <div className="w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4 relative z-10 -mb-6 sm:-mb-8 md:-mb-10">
          <div className="flex items-end justify-end gap-2 sm:gap-4 md:gap-5 lg:gap-6">
            {LEFT_SEATS.map(renderSeat)}
          </div>

          {/* Mascot: sunk a little so the feet hide behind the fence */}
          <div
            ref={puppyRef}
            className="relative w-28 sm:w-36 md:w-44 lg:w-48 xl:w-52 mb-11 cursor-pointer select-none"
            onClick={triggerReaction}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerReaction();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="TeddyPups mascot puppy. Click to see how it reacts."
          >
            {/* Speech bubble stays put while the puppy moves */}
            <AnimatePresence>
              {reaction && (
                <motion.div
                  key={reaction.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                >
                  <div className="relative px-3.5 py-1 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] text-[11px] sm:text-xs font-bold text-[#2a170e] shadow-[0_3px_0_0_#2a170e] whitespace-nowrap">
                    {reaction.text}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-[5px] border-t-[#2a170e]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Layer 1: click reactions (duck, hop, wiggle) */}
            <motion.div
              animate={reactionControls}
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Layer 2: slow breathing, a tiny lift on the y axis */}
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -1, -3, -1, 0] }}
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "bottom center" }}
              >
                <PuppySVG
                  limbState={RESTING_LIMBS}
                  headOffset={reaction ? reaction.head : NO_HEAD_MOVE}
                  eyeOffset={eyeLook}
                  earOffset={reaction ? reaction.ears : NO_EAR_MOVE}
                  isHovered={reaction?.eyesClosed ?? false}
                  isSitting
                  className="w-full h-auto drop-shadow-md"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="flex items-end justify-start gap-2 sm:gap-4 md:gap-5 lg:gap-6">
            {RIGHT_SEATS.map(renderSeat)}
          </div>
        </div>

        {/* Fence sits above everything on the stage, so the puppy looks planted behind the wall */}
        <div className="relative z-20" aria-hidden="true">
          <div className="tp-quilt">
            <svg
              className="tp-quilt__edge"
              width="100%"
              height="40"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="tp-scallop-pattern"
                  width="76"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fff1d8" />
                  <path
                    d="M0 27A38 25 0 0 1 76 27"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="3"
                  />
                  <path
                    d="M11 33A27 19 0 0 1 65 33"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="1.6"
                    strokeDasharray="3.5 5.5"
                    strokeLinecap="round"
                    opacity=".42"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#tp-scallop-pattern)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}