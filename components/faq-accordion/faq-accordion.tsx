"use client";

import { useState } from "react";
import { faqData } from "@/app/data/site-data";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Twinkle star positions for the night sky backdrop
  const stars = [
    { top: "12%", left: "8%", size: "16px", delay: "0s" },
    { top: "30%", left: "22%", size: "9px", delay: "0.4s" },
    { top: "8%", left: "41%", size: "13px", delay: "0.8s" },
    { top: "22%", left: "57%", size: "8px", delay: "1.2s" },
    { top: "6%", left: "72%", size: "14px", delay: "1.6s" },
    { top: "18%", left: "88%", size: "11px", delay: "2s" },
    { top: "68%", left: "14%", size: "10px", delay: "2.4s" },
    { top: "82%", left: "80%", size: "12px", delay: "3s" },
  ];

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-[#4d2b19] to-[#2f1a10] text-[#fffdf8]"
      aria-labelledby="questions-title"
    >
      {/* Night Sky Twinkling Stars */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {stars.map((star, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-[#f2be6b]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      <div className="relative z-10 max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-scrawl text-lg text-[#f2be6b]">
            Clear & simple
          </span>
          <h2
            id="questions-title"
            className="font-heading text-3xl sm:text-4xl lg:text-[44px] text-[#fffdf8] mt-1"
          >
            Questions, answered
          </h2>
          <p className="font-body text-[#e8dfd3] text-base sm:text-lg mt-3 max-w-lg mx-auto">
            Everything you need to know about our health clearances, Dubai
            showroom visits, and ethical adoption process.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#e8dfd3]/20 bg-[#3b2215]/60 backdrop-blur-sm transition-all duration-300 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2be6b]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <svg
                      viewBox="0 0 40 40"
                      className="w-5 h-5 text-[#f2be6b] flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="font-heading text-lg sm:text-xl text-[#fffdf8]">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-[#f2be6b]/15 text-[#f2be6b] flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`px-5 sm:px-6 transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-96 pb-6 opacity-100"
                      : "max-h-0 pb-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="font-body text-[#e8dfd3] text-sm sm:text-base leading-relaxed pl-8 border-l-2 border-[#f2be6b]/40">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

