"use client";

import { siteMetadata } from "@/app/data/site-data";
import { FaqTeddy } from "./faq-teddy";

interface FaqSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
}

export function FaqSidebar({
  searchQuery,
  onSearchChange,
  filteredCount,
}: FaqSidebarProps) {
  return (
    <aside
      className="tp-notes__side w-full md:w-[280px] lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col items-center md:items-start text-center md:text-left"
      aria-label="Find a question"
    >
      {/* Hand-scrawled kicker label */}
      <label
        htmlFor="faq-search-input"
        className="font-scrawl tp-notes__label text-white text-[1.15rem] block mb-2 cursor-pointer"
      >
        sniff out a question
      </label>

      {/* Single Pill Search Input with Lens Icon */}
      <div className="tp-notes__search w-full max-w-md md:max-w-none relative">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>

        <input
          id="faq-search-input"
          type="search"
          placeholder="delivery, Korea, vaccinated…"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search frequently asked questions"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2a170e]/60 hover:text-[#2a170e] text-xs font-bold px-2 py-1 rounded-full hover:bg-[#e8dfd3]/60 transition-colors z-10"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Live Notes Counter */}
      <p
        className="tp-notes__count text-[1.05rem] text-white font-[650] mt-3.5 mb-1"
        aria-live="polite"
      >
        {filteredCount === 0
          ? "No notes found matching"
          : `${filteredCount} ${filteredCount === 1 ? "note" : "notes"} on the board`}
      </p>

      {/* Small Mascot Puppy with Speech Bubble */}
      <div className="mt-4 mb-5 w-full flex justify-center md:justify-start">
        <FaqTeddy hasQuery={Boolean(searchQuery)} />
      </div>

      {/* Green WhatsApp Action Button as per image */}
      <a
        href={siteMetadata.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-[260px] bg-[#167746] hover:bg-[#13683d] text-white text-[15px] sm:text-base font-bold py-3 px-6 rounded-full shadow-[0_5px_0_0_#0f4c2c] hover:shadow-[0_7px_0_0_#0f4c2c] hover:-translate-y-0.5 hover:rotate-1 active:translate-y-1 active:rotate-0 active:shadow-[0_2px_0_0_#0f4c2c] transition-all duration-200 text-center block"
      >
        Ask your own question
      </a>
    </aside>
  );
}
