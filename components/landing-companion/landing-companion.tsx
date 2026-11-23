"use client";

import { useEffect, useState, useRef } from "react";
import { PuppySVG } from "@/components/puppy-svg";
import { motion, AnimatePresence } from "motion/react";

interface FloatingFootprint {
  id: number;
  x: number;
  y: number;
  angle: number;
  createdAt: number;
}

export function LandingCompanion() {
  const [isVisible, setIsVisible] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [footprints, setFootprints] = useState<FloatingFootprint[]>([]);

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

  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const stridePhaseRef = useRef(0);
  const footprintIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Companion appears when scrolled past Hero & MeetPups section (> 1400px), or past the top
      // allowing the puppy to move through the entire landing page
      const showCompanion = scrollY > 1200 && scrollY < docHeight - windowHeight - 150;
      setIsVisible(showCompanion);

      const deltaY = scrollY - lastScrollYRef.current;
      const direction = deltaY >= 0 ? "down" : "up";
      setScrollDirection(direction);

      if (Math.abs(deltaY) > 2) {
        setIsWalking(true);
        lastScrollTimeRef.current = Date.now();

        stridePhaseRef.current += Math.abs(deltaY) * 0.05;
        const phase = stridePhaseRef.current;
        const sinPhase = Math.sin(phase * Math.PI * 2);
        const cosPhase = Math.cos(phase * Math.PI * 2);

        setLimbState({
          fnAngle: sinPhase * 26,
          bfAngle: sinPhase * 22,
          ffAngle: -sinPhase * 26,
          bnAngle: -sinPhase * 22,
          bodyY: -Math.abs(sinPhase) * 4.5,
          headY: -Math.abs(sinPhase) * 2.8,
          tailAngle: 6.61 + sinPhase * 16,
          shadowScaleX: 1 - Math.abs(sinPhase) * 0.08,
          earAngle: cosPhase * 7,
        });

        // Drop footprints along the companion path
        if (showCompanion && Math.abs(sinPhase) > 0.85) {
          const now = Date.now();
          setFootprints((prev) => {
            const newFp: FloatingFootprint = {
              id: ++footprintIdRef.current,
              x: direction === "down" ? 18 : 110,
              y: 50 + (footprintIdRef.current % 2 === 0 ? -6 : 6),
              angle: direction === "down" ? 90 : -90,
              createdAt: now,
            };
            return [...prev.slice(-6), newFp];
          });
        }
      }

      lastScrollYRef.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Idle animation & footprints cleanup
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const now = Date.now();
      const timeSinceScroll = now - lastScrollTimeRef.current;

      if (timeSinceScroll > 120) {
        setIsWalking(false);
        const t = now * 0.0028;
        const idleBodyY = Math.sin(t * 1.5) * 1.2;
        const idleTail = 6.61 + Math.sin(t * 2.2) * 6;

        setLimbState((prev) => ({
          fnAngle: prev.fnAngle * 0.82,
          bfAngle: prev.bfAngle * 0.82,
          ffAngle: prev.ffAngle * 0.82,
          bnAngle: prev.bnAngle * 0.82,
          bodyY: prev.bodyY * 0.82 + idleBodyY * 0.18,
          headY: prev.headY * 0.82 + idleBodyY * 0.12,
          tailAngle: prev.tailAngle * 0.82 + idleTail * 0.18,
          shadowScaleX: prev.shadowScaleX * 0.82 + 1 * 0.18,
          earAngle: prev.earAngle * 0.82,
        }));
      }

      // Cleanup old footprints (> 1.2s)
      setFootprints((prev) => prev.filter((fp) => now - fp.createdAt < 1200));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollToPuppies = () => {
    const meetSection = document.getElementById("meet");
    if (meetSection) {
      meetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out pointer-events-auto ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-90 pointer-events-none"
      }`}
      aria-label="TeddyPups mascot companion - walking with you along the page"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 right-0 z-50 pointer-events-none whitespace-nowrap"
          >
            <div className="px-3 py-1 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] text-[11px] font-bold text-[#2a170e] shadow-[0_3px_0_0_#2a170e] flex items-center gap-1.5">
              <span>Click to see all puppies! 🐾</span>
              <div className="absolute top-full right-8 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-[5px] border-t-[#2a170e]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Walking footprints stamped behind companion */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {footprints.map((fp) => {
          return (
            <div
              key={fp.id}
              className="absolute pointer-events-none transition-opacity duration-1000 opacity-40"
              style={{
                left: `${fp.x}px`,
                top: `${fp.y}px`,
                transform: `rotate(${fp.angle}deg)`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 48 48" fill="#8c4a24">
                <path d="M24 20c-5.5 0-10 4-10 9 0 4.5 4 8 10 8s10-3.5 10-8c0-5-4.5-9-10-9z" />
                <ellipse cx="14" cy="14" rx="3.5" ry="5" transform="rotate(-18 14 14)" />
                <ellipse cx="20.5" cy="10" rx="3.5" ry="5.5" transform="rotate(-6 20.5 10)" />
                <ellipse cx="27.5" cy="10" rx="3.5" ry="5.5" transform="rotate(6 27.5 10)" />
                <ellipse cx="34" cy="14" rx="3.5" ry="5" transform="rotate(18 34 14)" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Puppy Mascot Button */}
      <button
        onClick={scrollToPuppies}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block w-28 sm:w-32 h-auto cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a24a1a] rounded-2xl p-1 bg-[#fffdf8]/85 backdrop-blur-sm border-2 border-[#2a170e] shadow-[0_4px_0_0_#2a170e] hover:shadow-[0_6px_0_0_#2a170e] hover:-translate-y-1 hover:rotate-[-2deg] active:translate-y-0.5 active:rotate-0 active:shadow-[0_1px_0_0_#2a170e] transition-all duration-200"
        title="TeddyPups Mascot - Tap to meet our puppies!"
        aria-label="View puppies"
      >
        <PuppySVG
          limbState={limbState}
          isHovered={isHovered}
          flipX={scrollDirection === "up"}
          className="w-full h-auto drop-shadow-sm"
        />
        <div className="text-[10px] font-bold text-[#2a170e] text-center -mt-1 pb-0.5 tracking-tight flex items-center justify-center gap-1">
          <span>{isWalking ? "Pitter patter..." : "Meet Pups"}</span>
          <span className="text-[#a24a1a]">🐾</span>
        </div>
      </button>
    </div>
  );
}

