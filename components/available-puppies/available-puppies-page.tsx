"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { availablePuppiesList, AvailablePuppy } from "./types";
import { PuppySketchCard } from "./puppy-sketch-card";
import { PuppyFilterBar } from "./puppy-filter-bar";
import { AlreadyGoneHomeBanner } from "./already-gone-home-banner";
import { PuppyVideoModal } from "./puppy-video-modal";
import { PuppySVG } from "../puppy-svg/puppy-svg";

export function AvailablePuppiesPage() {
  const [whereFilter, setWhereFilter] = useState<"everywhere" | "imported" | "korean-teacup">("everywhere");
  const [breedFilter, setBreedFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<"boys" | "girls" | null>(null);
  const [selectedPuppy, setSelectedPuppy] = useState<AvailablePuppy | null>(null);

  // Filter 15 puppies based on active criteria
  const filteredPuppies = useMemo(() => {
    return availablePuppiesList.filter((pup) => {
      // 1. Where filter
      if (whereFilter === "imported" && pup.origin !== "Imported") return false;
      if (whereFilter === "korean-teacup") {
        const isTeacup =
          pup.breed.toLowerCase().includes("teacup") ||
          pup.name.toLowerCase().includes("teacup");
        if (!isTeacup) return false;
      }

      // 2. Breed filter
      if (breedFilter) {
        const matchesBreed =
          pup.breed.toLowerCase().includes(breedFilter.toLowerCase()) ||
          pup.name.toLowerCase().includes(breedFilter.toLowerCase());
        if (!matchesBreed) return false;
      }

      // 3. Gender filter
      if (genderFilter === "boys") {
        if (pup.gender !== "male" && pup.gender !== "both") return false;
      }
      if (genderFilter === "girls") {
        if (pup.gender !== "female" && pup.gender !== "both") return false;
      }

      return true;
    });
  }, [whereFilter, breedFilter, genderFilter]);

  return (
    <div
      className="w-full bg-puppies-page min-h-screen text-[#2a170e]"
      style={{
        background:
          "radial-gradient(circle at 1px 1px, #2a170e17 1px, transparent 1.6px) 0 0 / 26px 26px, linear-gradient(180deg, #fff8ec, #fffdf8 60%)",
        backgroundColor: "#fffdf8",
      }}
    >
      {/* Top Hero / Header Section of Available Puppies - Full Width Screen */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full">
        <div className="w-full max-w-none">
          {/* Top Banner Row: Title + Circular Puppy Badge */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 sm:mb-14">
            {/* Left: Titles & Description matching Screenshot 1 */}
            <div className="max-w-4xl xl:max-w-5xl">
              <span className="font-scrawl text-xl sm:text-2xl text-[#a24a1a] block mb-2 font-bold tracking-wide">
                from Teddy&apos;s sketchbook
              </span>

              <div className="inline-block relative">
                <h1 className="font-plush text-6xl sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[132px] 2xl:text-[148px] text-[#2a170e] font-extrabold tracking-tight leading-[0.98]">
                  Available puppies
                </h1>

                {/* Hand-drawn single wavy underline SVG matching screenshot 1 */}
                <svg
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="w-full max-w-[560px] lg:max-w-[720px] h-5 sm:h-6 lg:h-7 mt-1.5 overflow-visible select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1"
                    pathLength="1"
                    stroke="#c2622b"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              <p className="font-body text-[#5a3a28] text-lg sm:text-xl lg:text-[23px] max-w-2xl mt-5 leading-relaxed font-normal">
                Every listing shows real photos of the actual puppy. Open a profile
                to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Right: Circular Hand-drawn Badge with Teddy ("self-portrait" underneath matching screenshot) */}
            <div className="self-start lg:self-auto flex flex-col items-center shrink-0">
              <div className="relative group cursor-pointer">
                {/* Speech Bubble floating on top-left of the portrait */}
                <div className="absolute -top-5 -left-3 sm:-top-7 sm:-left-5 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <div className="relative bg-white border-2 border-[#2a170e] rounded-[1.25rem] px-3 sm:px-4 py-0.5 sm:py-1 shadow-[2px_2.5px_0_0_rgba(42,23,14,0.18)]">
                    <span className="font-scrawl text-sm sm:text-base md:text-[17px] text-[#2a170e] font-bold tracking-wide select-none block">
                      zoomies!
                    </span>
                    {/* Speech bubble pointer arrow */}
                    <svg
                      className="absolute -bottom-2 right-4 w-3.5 h-2.5 overflow-visible"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M0 0 L14 0 L5 9 Z" fill="#ffffff" />
                      <path d="M0 0 L5 9 L13 0" stroke="#2a170e" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Circular Portrait Frame - Large, Crisp, Clean */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 aspect-square rounded-full bg-[#faebd4] border-[2.8px] border-[#2a170e] shadow-[3px_5px_0_0_rgba(42,23,14,0.15)] flex items-center justify-center overflow-hidden transition-transform duration-400 group-hover:scale-[1.03]">
                  {/* Subtle inner sketchy outline */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#2a170e"
                      strokeWidth="1.2"
                      strokeDasharray="94 6"
                      opacity="0.3"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="43.5"
                      fill="none"
                      stroke="#2a170e"
                      strokeWidth="0.8"
                      strokeDasharray="6 3"
                      opacity="0.25"
                    />
                  </svg>

                  {/* High fidelity Teddy Vector Mascot */}
                  <div className="relative w-[85%] h-[85%] flex items-center justify-center translate-y-1 sm:translate-y-2">
                    <PuppySVG
                      flipX={true}
                      isHappy={true}
                      className="w-full h-auto drop-shadow-sm select-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hand-drawn "self-portrait" underneath matching screenshot */}
              <span className="font-scrawl text-[#2a170e] text-lg sm:text-xl md:text-2xl font-bold tracking-wide mt-3 select-none">
                self-portrait
              </span>
            </div>
          </div>

          {/* Interactive Hand-drawn Sketchbook Filter Box (Full Width) */}
          <PuppyFilterBar
            whereFilter={whereFilter}
            onWhereChange={setWhereFilter}
            breedFilter={breedFilter}
            onBreedChange={setBreedFilter}
            genderFilter={genderFilter}
            onGenderChange={setGenderFilter}
            count={filteredPuppies.length}
          />

          {/* 15 Puppies Sketch Grid - 4 in one row on desktop with spacious layout */}
          {filteredPuppies.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-6 xl:gap-x-8 gap-y-16 sm:gap-y-20 p-0 m-0 justify-items-center w-full">
              {filteredPuppies.map((pup, index) => (
                <PuppySketchCard
                  key={pup.id}
                  puppy={pup}
                  delayIndex={index}
                  onSelect={(p) => setSelectedPuppy(p)}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-24 px-6 rounded-3xl bg-[#fffdf8]/90 border-2 border-dashed border-[#2a170e]/30 my-10 shadow-[0_4px_0_0_rgba(42,23,14,0.06)]">
              <span className="text-5xl mb-4 block">🐶</span>
              <h3 className="font-heading text-3xl text-[#2a170e] mb-3">
                No puppies match these filters
              </h3>
              <p className="font-body text-[#5a3a28] text-lg max-w-lg mx-auto mb-8">
                Try selecting &quot;everywhere&quot; or clearing your breed and gender
                filters to explore all available puppies.
              </p>
              <button
                type="button"
                onClick={() => {
                  setWhereFilter("everywhere");
                  setBreedFilter(null);
                  setGenderFilter(null);
                }}
                className="button-primary text-lg px-8 py-3.5"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Already Gone Home Banner Section (Full Width Screen) */}
      <AlreadyGoneHomeBanner />

      {/* Puppy Detail / Video Modal */}
      <PuppyVideoModal
        puppy={selectedPuppy}
        onClose={() => setSelectedPuppy(null)}
      />
    </div>
  );
}
