"use client";

import { useState, useMemo } from "react";
import { faqNotesData } from "./faq-data";
import { FaqSidebar } from "./faq-sidebar";
import { FaqBoard } from "./faq-board";

export function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  // Start with all notes closed so they all show their little corkboard tilt; clicking opens and rotates to 0
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleNote = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return faqNotesData;

    return faqNotesData.filter((note) => {
      const matchQ = note.question.toLowerCase().includes(q);
      const matchA = note.answer.toLowerCase().includes(q);
      const matchKeywords = note.keywords?.some((k) =>
        k.toLowerCase().includes(q)
      );
      return matchQ || matchA || matchKeywords;
    });
  }, [searchQuery]);

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-faqroom overflow-hidden min-h-screen relative text-white"
      style={{
        background: "linear-gradient(180deg, #a95e32 0%, #331c11 100%)",
        ["--sky-top" as string]: "#a95e32",
        ["--sky-bottom" as string]: "#331c11",
      }}
      aria-labelledby="faq-title"
    >
      <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-28 md:pt-36 z-10">
        {/* Page Header with Pure White Heading & Subheading */}
        <header className="max-w-5xl">
          <h1
            id="faq-title"
            className="font-plush text-5xl sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[130px] 2xl:text-[148px] text-white font-extrabold leading-[0.9] tracking-tight"
            style={{
              fontFamily:
                "var(--font-fraunces-local), var(--font-fraunces), 'Fraunces', serif",
              fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
              color: "#ffffff",
            }}
          >
            <span className="block text-white">Questions</span>
            <span className="block text-white">&amp; answers</span>
          </h1>
          <p
            className="text-lede mt-6 max-w-[54ch] !text-white font-medium sm:text-lg lg:text-xl leading-relaxed"
            style={{ color: "#ffffff" }}
          >
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp
            — our team is available 24/7.
          </p>
        </header>

        {/* Content Area: Side-by-side using Flex */}
        <div className="mt-12 md:mt-16">
          <div
            className="tp-notes flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-10 lg:gap-14 xl:gap-16 w-full"
            {...(openId ? { "data-open": "true" } : {})}
          >
            <FaqSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCount={filteredNotes.length}
            />

            <FaqBoard
              notes={filteredNotes}
              searchQuery={searchQuery}
              openId={openId}
              onToggleNote={toggleNote}
              onClearSearch={() => setSearchQuery("")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
