"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 18) + 12;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setIsRemoved(true);
          }, 600);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fffdf8] transition-opacity duration-600 ease-out ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading TeddyPups"
      role="status"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Logo */}
        <div className="relative w-24 h-24 mb-4 animate-bounce">
          <Image
            src="/brand/logo.png"
            alt="TeddyPups U.A.E."
            fill
            sizes="96px"
            className="object-contain"
            priority
          />
        </div>

        {/* Animated Headline */}
        <h2 className="font-heading text-2xl md:text-3xl text-[#2a170e] mb-2 tracking-tight">
          TeddyPups U.A.E.
        </h2>

        {/* Hand-drawn scrawl tagline */}
        <p className="font-scrawl text-sm md:text-base text-[#a24a1a] mb-6">
          every puppy is family
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 h-1.5 bg-[#e8dfd3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#a24a1a] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric progress indicator */}
        <span className="mt-3 text-xs font-semibold text-[#5a3a28] tracking-widest uppercase">
          {progress}%
        </span>
      </div>
    </div>
  );
}

