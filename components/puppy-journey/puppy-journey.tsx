"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyData, siteMetadata } from "@/app/data/site-data";

export function PuppyJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });
    }

    // Scroll trigger for tracking active step
    const stepEls = sectionRef.current?.querySelectorAll(".journey-step-item");
    if (stepEls) {
      stepEls.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveStep(index + 1),
          onEnterBack: () => setActiveStep(index + 1),
        });
      });
    }

    const sectionEl = sectionRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionEl) t.kill();
      });
    };
  }, []);

  const currentStepData =
    journeyData.steps.find((s) => s.number === activeStep) ||
    journeyData.steps[0];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-20 lg:py-28 bg-[#fffdf8] relative overflow-hidden"
      aria-labelledby="journey-title"
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-lg text-[#a24a1a]">
            Concierge Experience
          </span>
          <h2
            id="journey-title"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-[#2a170e] mt-1 text-balance leading-tight"
          >
            <span className="whitespace-nowrap">Your puppy</span>{" "}
            <span className="whitespace-nowrap">journey</span>
          </h2>
          <p className="font-body text-[#5a3a28] text-base sm:text-lg mt-3">
            {journeyData.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Steps with Drawing Path */}
          <div className="lg:col-span-6 relative">
            {/* SVG Connecting Path that draws on scroll */}
            <svg
              className="absolute left-6 top-8 bottom-8 w-1 h-[calc(100%-60px)] -translate-x-1/2 pointer-events-none hidden sm:block"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="#e8dfd3"
                strokeWidth="3"
                strokeDasharray="4 6"
              />
              <path
                ref={pathRef}
                d="M 2 0 L 2 1000"
                stroke="#a24a1a"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <div className="space-y-8 relative z-10">
              {journeyData.steps.map((step) => {
                const isActive = activeStep === step.number;
                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(step.number)}
                    className={`journey-step-item p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                      isActive
                        ? "bg-[#fffdf8] border-[#a24a1a] shadow-[rgba(42,23,14,0.12)_9px_12px] -translate-y-1"
                        : "bg-[#fffdf8]/60 border-[#e8dfd3] hover:border-[#a24a1a]/50 hover:bg-[#fffdf8]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-lg font-bold transition-colors ${
                          isActive
                            ? "bg-[#a24a1a] text-[#fffdf8]"
                            : "bg-[#fbe3b4] text-[#2a170e]"
                        }`}
                      >
                        {step.number}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading text-xl sm:text-2xl text-[#2a170e]">
                            {step.title}
                          </h3>
                          {isActive && (
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1f7a4d]/15 text-[#1f7a4d] font-semibold">
                              Live Mockup
                            </span>
                          )}
                        </div>
                        <p className="font-body text-[#5a3a28] text-sm sm:text-base mt-2 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: WhatsApp Style Chat Mockup */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative mx-auto w-full max-w-[380px] bg-[#0c1317] rounded-[42px] p-3 shadow-2xl border-[6px] border-[#222]">
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-[#222] rounded-full mx-auto mb-2" />

              {/* WhatsApp Interface Header */}
              <div className="bg-[#1f7a4d] text-white px-4 py-3 rounded-t-[28px] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/20 border border-white/40">
                    <Image
                      src={siteMetadata.logo}
                      alt="TeddyPups Avatar"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold leading-tight">
                      TeddyPups U.A.E. 🐾
                    </h4>
                    <span className="text-[11px] text-white/80">Online</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/90">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
              </div>

              {/* Chat Message Stream Area */}
              <div className="bg-[#efeae2] p-4 h-[380px] overflow-y-auto space-y-3 flex flex-col justify-end text-xs sm:text-[13px]">
                {/* Security encryption pill */}
                <div className="mx-auto bg-[#ffeecd] text-[#54656f] text-[10px] px-3 py-1 rounded-md shadow-xs text-center max-w-[280px]">
                  🔒 Messages with TeddyPups UAE are end-to-end encrypted.
                </div>

                {currentStepData.chat.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] rounded-2xl p-3 shadow-xs transition-all duration-300 ${
                        isUser
                          ? "ml-auto bg-[#d9fdd3] text-[#111b21] rounded-tr-xs"
                          : "mr-auto bg-white text-[#111b21] rounded-tl-xs"
                      }`}
                    >
                      {msg.imageUrl && (
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-[#e8dfd3]">
                          <Image
                            src={msg.imageUrl}
                            alt="Puppy preview"
                            fill
                            sizes="280px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className="text-[10px] text-gray-500 self-end mt-1">
                        {msg.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp Mockup Input Bar */}
              <div className="bg-[#f0f2f5] px-3 py-2.5 rounded-b-[28px] flex items-center gap-2">
                <span className="text-gray-400">😊</span>
                <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-500">
                  Message TeddyPups...
                </div>
                <a
                  href={siteMetadata.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#1f7a4d] text-white flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Send WhatsApp message"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

