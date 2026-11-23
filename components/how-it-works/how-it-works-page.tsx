"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteMetadata } from "@/app/data/site-data";
import { SittingMascot } from "@/components/mascot/sitting-mascot";

export function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"local" | "imported">("local");

  const promiseRef = useRef<HTMLElement>(null);
  const deliveryRef = useRef<HTMLElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Puppy Promise Stamps: Scale high to low on scroll down
      const promiseSection = promiseRef.current;
      if (promiseSection) {
        const stampEls = promiseSection.querySelectorAll(".tp-stamp");
        if (stampEls.length > 0) {
          gsap.fromTo(
            stampEls,
            {
              opacity: 0,
              scale: 1.7,
              rotation: (i, el) => {
                const tilt =
                  parseFloat((el as HTMLElement).style.getPropertyValue("--tilt")) || 0;
                return tilt - 16;
              },
            },
            {
              opacity: 0.92,
              scale: 1,
              rotation: (i, el) => {
                const tilt =
                  parseFloat((el as HTMLElement).style.getPropertyValue("--tilt")) || 0;
                return tilt;
              },
              duration: 0.7,
              stagger: 0.15,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: promiseSection,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 2. Delivery & Collection: Airplane movement based on scroll from Korea to Dubai
      const deliveryEl = deliveryRef.current;
      const planeEl = planeRef.current;

      if (deliveryEl && planeEl) {
        const p0 = { x: 40, y: 250 };
        const p1 = { x: 170, y: 40 };
        const p2 = { x: 470, y: 20 };
        const p3 = { x: 620, y: 168 };

        const updatePlanePosition = (progress: number) => {
          const t = Math.max(0, Math.min(1, progress));
          const mt = 1 - t;

          // Cubic bezier coordinates: M40 250 C 170 40, 470 20, 620 168
          const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
          const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;

          // Derivative for exact tangent angle
          const dx = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
          const dy = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          planeEl.setAttribute(
            "transform",
            `translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${angle.toFixed(1)})`
          );
        };

        // Initialize at Korea
        updatePlanePosition(0);

        ScrollTrigger.create({
          trigger: deliveryEl,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
          onUpdate: (self) => {
            updatePlanePosition(self.progress);
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene w-full"
      style={{
        ["--sky-top" as string]: "#fffbf3",
        ["--sky-bottom" as string]: "#f6cc85",
      }}
      aria-labelledby="how-title"
    >
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        {/* Top Header */}
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <h1
            id="how-title"
            className="font-plush text-giant md:col-span-7 text-[#2a170e]"
          >
            How it works
          </h1>
          <p className="text-lede text-[#5a3a28] md:col-span-5 md:pb-4">
            Whether you choose to visit us locally or order a premium breed from
            overseas, TeddyPups is here to make the experience unforgettable.
          </p>
        </header>

        {/* On this page Chips Navigation */}
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
          <a
            href="#two-ways"
            onClick={(e) => scrollToSection(e, "two-ways")}
            className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-[0.95rem] font-semibold tracking-tight text-[#2a170e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a24a1a] focus-visible:ring-offset-2 transition-colors duration-150"
          >
            <span className="font-plush text-toffee text-base sm:text-lg font-bold leading-none">1</span>
            <span>Two ways home</span>
          </a>
          <a
            href="#promise"
            onClick={(e) => scrollToSection(e, "promise")}
            className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-[0.95rem] font-semibold tracking-tight text-[#2a170e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a24a1a] focus-visible:ring-offset-2 transition-colors duration-150"
          >
            <span className="font-plush text-toffee text-base sm:text-lg font-bold leading-none">2</span>
            <span>Our premium puppy promise</span>
          </a>
          <a
            href="#delivery"
            onClick={(e) => scrollToSection(e, "delivery")}
            className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-[0.95rem] font-semibold tracking-tight text-[#2a170e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a24a1a] focus-visible:ring-offset-2 transition-colors duration-150"
          >
            <span className="font-plush text-toffee text-base sm:text-lg font-bold leading-none">3</span>
            <span>Delivery &amp; collection</span>
          </a>
          <a
            href="#why"
            onClick={(e) => scrollToSection(e, "why")}
            className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-[0.95rem] font-semibold tracking-tight text-[#2a170e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a24a1a] focus-visible:ring-offset-2 transition-colors duration-150"
          >
            <span className="font-plush text-toffee text-base sm:text-lg font-bold leading-none">4</span>
            <span>Why choose us</span>
          </a>
        </nav>

        {/* 1. Two Ways Home Section */}
        <div id="two-ways" className="scroll-mt-28">
          <section
            className="tp-journeys"
            aria-labelledby="two-ways-title"
            data-ready="true"
          >
            {/* Top Switch Row */}
            <div className="tp-journeys__top">
              <div>
                <p className="font-scrawl tp-journeys__kicker">choose your way</p>
                <h2 id="two-ways-title" className="font-plush text-big text-[#2a170e]">
                  Two ways home
                </h2>
              </div>

              <div className="tp-journeys__pick">
                <div
                  role="tablist"
                  aria-label="Ways to bring your puppy home"
                  className="tp-switch"
                  data-tab={activeTab === "local" ? "0" : "1"}
                  style={{
                    ["--at" as string]: activeTab === "local" ? 0 : 1,
                    ["--n" as string]: 2,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="tp-switch__thumb"
                    style={{
                      transform:
                        activeTab === "local" ? "translateX(0)" : "translateX(100%)",
                    }}
                  />
                  <button
                    type="button"
                    role="tab"
                    id="tab-local"
                    aria-selected={activeTab === "local"}
                    aria-controls="panel-local"
                    tabIndex={activeTab === "local" ? 0 : -1}
                    onClick={() => setActiveTab("local")}
                    className={`tp-switch__tab ${activeTab === "local" ? "text-white" : "text-[#2a170e]"
                      }`}
                  >
                    <span className="font-plush tp-switch__label">In Dubai</span>
                    <span className="tp-switch__hint">meet in person</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-imported"
                    aria-selected={activeTab === "imported"}
                    aria-controls="panel-imported"
                    tabIndex={activeTab === "imported" ? 0 : -1}
                    onClick={() => setActiveTab("imported")}
                    className={`tp-switch__tab ${activeTab === "imported" ? "text-white" : "text-[#2a170e]"
                      }`}
                  >
                    <span className="font-plush tp-switch__label">Imported</span>
                    <span className="tp-switch__hint">order upon request</span>
                  </button>
                </div>

                {/* Mascot Teddy Facing Right */}
                <div
                  className="pup-buddy tp-journeys__teddy w-24 sm:w-28 md:w-32 h-auto shrink-0 transition-transform duration-300"
                  data-live=""
                  data-facing="right"
                >
                  <svg
                    viewBox="0 0 300 240"
                    style={{ overflow: "visible" }}
                    role="img"
                    aria-label="Teddy, waiting to see which way you pick"
                    focusable="false"
                    className="w-full h-full"
                  >
                    <g
                      data-p="root"
                      transform="translate(0.0 0) translate(150 0) scale(1.000 1) translate(-150 0)"
                    >
                      <ellipse
                        data-p="shadow"
                        cx="150"
                        cy="230"
                        rx="92"
                        ry="7"
                        fill="#2a170e"
                        opacity="0.12"
                        transform="translate(0 0) scale(1 1)"
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center center 0px",
                        }}
                      />
                      <g
                        data-p="body"
                        transform="translate(0 -2.36) rotate(-24 196 206) translate(196 0) scale(1 1) translate(-196 0)"
                        opacity="1"
                      >
                        <g data-p="bf" transform="translate(94 192) rotate(0)" opacity="0">
                          <path
                            d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                            fill="#e4a352"
                          />
                          <path
                            d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                            stroke="#2a170e"
                            strokeWidth="3.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M-3.5 29 v5 M4.5 29 v5"
                            stroke="#2a170e"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>
                        <g data-p="ff" transform="translate(168 192) rotate(24)">
                          <path
                            d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                            fill="#e4a352"
                          />
                          <path
                            d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                            stroke="#2a170e"
                            strokeWidth="3.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M-3.5 29 v5 M4.5 29 v5"
                            stroke="#2a170e"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>
                        <g data-p="tail" transform="rotate(29.72 84 150)">
                          <path
                            d="M86 152 C80 146 76 140 74 136"
                            stroke="#2a170e"
                            strokeWidth="9"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M86 152 C80 146 76 140 74 136"
                            stroke="#f2be6b"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                            fill="#f2be6b"
                            stroke="#2a170e"
                            strokeWidth="3.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        </g>
                        <g data-p="bn" transform="translate(110 194) rotate(0)" opacity="0">
                          <path
                            d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                            fill="#f2be6b"
                          />
                          <path
                            d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
                            stroke="#2a170e"
                            strokeWidth="3.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M-3.5 27 v5 M4.5 27 v5"
                            stroke="#2a170e"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>
                        <path
                          d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <g data-p="fn" transform="translate(186 194) rotate(24)">
                          <path
                            d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                            fill="#f2be6b"
                          />
                          <path
                            d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                            stroke="#2a170e"
                            strokeWidth="3.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M-3.5 27 v5 M4.5 27 v5"
                            stroke="#2a170e"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>
                      </g>
                      <g data-p="haunch" opacity="1" transform="translate(0 1.44)">
                        <path
                          d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M132 222v5M139 222v5"
                          stroke="#2a170e"
                          strokeWidth="2.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </g>
                      <g
                        data-p="head"
                        transform="translate(-10 -6.55) rotate(-10.95 212 100)"
                      >
                        <path
                          d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                          fill="#a24a1a"
                          stroke="#2a170e"
                          strokeWidth="3"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                          fill="#fbe3b4"
                          stroke="#2a170e"
                          strokeWidth="2.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          data-p="earL"
                          d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                          fill="#e4a352"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          transform="rotate(0 174 82)"
                        />
                        <path
                          data-p="earR"
                          d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                          fill="#e4a352"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          transform="rotate(0 250 82)"
                        />
                        <path
                          d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                          fill="#fbe3b4"
                        />
                        <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                        <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                        <g data-p="eyes" transform="translate(-3.39 -0.14)">
                          <g data-p="open" opacity="1">
                            <g data-p="blink" transform="translate(0 0) scale(1 1)">
                              <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                              <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                              <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                              <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                              <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                              <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                            </g>
                          </g>
                        </g>
                        <path
                          data-p="happy"
                          d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0"
                        />
                        <path
                          data-p="shut"
                          d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0"
                        />
                        <path
                          d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                          fill="#2a170e"
                        />
                        <path
                          d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                          stroke="#2a170e"
                          strokeWidth="3"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          data-p="tongue"
                          d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                          fill="#e98c8c"
                          stroke="#2a170e"
                          strokeWidth="2.2"
                          strokeLinejoin="round"
                          opacity="1"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Panel 1: In Dubai */}
            <div
              role="tabpanel"
              id="panel-local"
              aria-labelledby="tab-local"
              className={`tp-journey transition-all duration-300 ${activeTab === "local" ? "block" : "hidden"
                }`}
            >
              <div className="tp-journey__head grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <h3 className="font-plush tp-journey__title text-[clamp(1.65rem,3.8vw,2.65rem)] font-bold text-[#2a170e] leading-tight text-balance">
                    <span className="whitespace-nowrap">Meet your puppy</span>{" "}
                    <span className="whitespace-nowrap">in person</span>
                  </h3>
                  <p className="text-lede mt-3 sm:mt-4 text-[#5a3a28] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                    Step into our Downtown Dubai showroom and experience the joy of
                    choosing your puppy face-to-face. We source healthy, well-socialized
                    puppies from trusted local breeders, ensuring they&apos;re raised with
                    care, proper nutrition, and veterinary checks.
                  </p>
                </div>

                <div aria-hidden="true" className="tp-postcard lg:col-span-5 max-w-lg mx-auto lg:max-w-none">
                  <span className="tp-postcard__sun" />
                  <svg
                    viewBox="0 0 300 120"
                    className="tp-postcard__city"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-scrawl tp-postcard__to tp-postcard__to--left">
                    Downtown Dubai
                  </span>
                </div>
              </div>

              {/* 4 Steps In Dubai */}
              <ol className="tp-steps">
                <li className="tp-step" style={{ ["--i" as string]: 0, ["--tint" as string]: "#fbe3b4" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <circle
                        cx="21"
                        cy="21"
                        r="12"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m30 30 10 10"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 27c-3-2-4.4-3.6-4.4-5.2a2.2 2.2 0 0 1 4.4-.4 2.2 2.2 0 0 1 4.4.4c0 1.6-1.4 3.2-4.4 5.2z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 1</span>
                  <h4 className="font-plush-text tp-step__title">Explore our puppies</h4>
                  <p className="tp-step__text">
                    Browse our website to view the available puppies. Each listing includes
                    photos, breed details, age, and health information.
                  </p>
                </li>

                <li className="tp-step" style={{ ["--i" as string]: 1, ["--tint" as string]: "#fde6de" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <path
                        d="M24 40C11 31 6 24.5 6 17.8 6 12.4 10.2 8 15.4 8c3.7 0 6.8 2.1 8.6 5.3C25.8 10.1 28.9 8 32.6 8 37.8 8 42 12.4 42 17.8 42 24.5 37 31 24 40z"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m17 22 5 5 9-10"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 2</span>
                  <h4 className="font-plush-text tp-step__title">Choose your puppy</h4>
                  <p className="tp-step__text">
                    Once you find a puppy you love, open their profile for more information or
                    to enquire further. You can also reach out to us directly if you have any questions.
                  </p>
                </li>

                <li className="tp-step" style={{ ["--i" as string]: 2, ["--tint" as string]: "#e3f0fb" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <path
                        d="M14 18c-3-6-1-10 3-10s5 4 4 8M34 18c3-6 1-10-3-10s-5 4-4 8"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <ellipse
                        cx="24"
                        cy="27"
                        rx="13"
                        ry="12"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="19.5" cy="25" r="1.6" fill="currentColor" />
                      <circle cx="28.5" cy="25" r="1.6" fill="currentColor" />
                      <path
                        d="M22 31h4l-2 2z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 3</span>
                  <h4 className="font-plush-text tp-step__title">Meet before you choose</h4>
                  <p className="tp-step__text">
                    Spend time bonding before making your decision.
                  </p>
                </li>

                <li className="tp-step" style={{ ["--i" as string]: 3, ["--tint" as string]: "#e6f2df" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <path
                        d="M5 30V18h22v12M27 22h8l6 6v2H27"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 30h36"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="13" cy="33" r="3.4" strokeWidth="2.6" />
                      <circle cx="34" cy="33" r="3.4" strokeWidth="2.6" />
                      <path
                        d="M16 26c-2.3-1.6-3.4-2.8-3.4-4a1.7 1.7 0 0 1 3.4-.4 1.7 1.7 0 0 1 3.4.4c0 1.2-1.1 2.4-3.4 4z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 4</span>
                  <h4 className="font-plush-text tp-step__title">Pick-up or delivery</h4>
                  <p className="tp-step__text">
                    Pick up your puppy from us or have them delivered to your home within Dubai.
                    Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.
                  </p>
                </li>
              </ol>
            </div>

            {/* Panel 2: Imported */}
            <div
              role="tabpanel"
              id="panel-imported"
              aria-labelledby="tab-imported"
              className={`tp-journey transition-all duration-300 ${activeTab === "imported" ? "block" : "hidden"
                }`}
            >
              <div className="tp-journey__head grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <h3 className="font-plush tp-journey__title text-[clamp(1.65rem,3.8vw,2.65rem)] font-bold text-[#2a170e] leading-tight text-balance">
                    <span className="whitespace-nowrap">Order upon</span>{" "}
                    <span className="whitespace-nowrap">request</span>
                  </h3>
                  <p className="text-lede mt-3 sm:mt-4 text-[#5a3a28] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                    Looking for a truly exceptional companion? Our Order Upon Request service
                    gives you access to some of the world&apos;s most sought-after teacup breeds
                    — ethically sourced from the most reputable, certified breeders across Europe,
                    Korea, and beyond.
                  </p>
                  <p className="font-scrawl mt-3 sm:mt-4 text-toffee-ink text-lg sm:text-xl md:text-2xl">
                    From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring
                    the world&apos;s finest puppies to Dubai, just for you.
                  </p>
                </div>

                <div aria-hidden="true" className="tp-postcard tp-postcard--sky lg:col-span-5 max-w-lg mx-auto lg:max-w-none">
                  <svg
                    viewBox="0 0 320 150"
                    className="tp-postcard__route"
                    preserveAspectRatio="none"
                  >
                    <path d="M28 128C90 20 230 20 292 118" />
                  </svg>
                  <svg
                    viewBox="0 0 64 40"
                    className="tp-postcard__plane w-16 h-10"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 22l20-2 12-14h6l-6 14 14-1 6-7h4l-3 10 3 10h-4l-6-7-14-1 6 14h-6L24 24 4 22z"
                      fill="#fffdf8"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-scrawl tp-postcard__from">Europe · Korea</span>
                  <span className="font-scrawl tp-postcard__to">Dubai</span>
                </div>
              </div>

              {/* 4 Steps Imported */}
              <ol className="tp-steps">
                <li className="tp-step" style={{ ["--i" as string]: 0, ["--tint" as string]: "#fbe3b4" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <rect
                        x="7"
                        y="10"
                        width="34"
                        height="30"
                        rx="5"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 19h34M16 6v8M32 6v8"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m17 29 5 5 9-9"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 1</span>
                  <h4 className="font-plush-text tp-step__title">Reserve your puppy</h4>
                  <p className="tp-step__text">
                    Browse our selection of available breeds and place a reservation for the
                    teacup puppy that captures your heart. Our reservation-only model ensures
                    that each puppy is specifically sourced to meet your preferences.
                  </p>
                </li>

                <li className="tp-step" style={{ ["--i" as string]: 1, ["--tint" as string]: "#fde6de" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <path
                        d="M6 12a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-9l-6 5v-5h-1a5 5 0 0 1-5-5z"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M36 17h1a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-1v5l-6-5h-6a5 5 0 0 1-4-2"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 2</span>
                  <h4 className="font-plush-text tp-step__title">Personalized consultation</h4>
                  <p className="tp-step__text">
                    Once your reservation is confirmed, we will work closely with you to finalize
                    details and provide updates on your puppy&apos;s journey.
                  </p>
                </li>

                <li className="tp-step" style={{ ["--i" as string]: 2, ["--tint" as string]: "#e3f0fb" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <path
                        transform="matrix(-1 0 0 1 48 0)"
                        d="M4 27l13-1.5 8-10h4l-4 9.5 9-.8 4-4.7h3l-2 6.6 2 6.6h-3l-4-4.7-9-.8 4 9.5h-4l-8-10L4 29z"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 3</span>
                  <h4 className="font-plush-text tp-step__title">Import and arrival</h4>
                  <p className="tp-step__text">
                    We manage all aspects of the import process, including health checks, travel
                    arrangements, and necessary documentation. Your puppy will be carefully
                    transported and will arrive ready to join your family.
                  </p>
                </li>

                <li className="tp-step" style={{ ["--i" as string]: 3, ["--tint" as string]: "#e6f2df" }}>
                  <span aria-hidden="true" className="tp-step__icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className="w-7 h-7">
                      <path
                        d="M6 23 24 8l18 15M11 19v21h26V19"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 35c-4.6-3.2-6.8-5.7-6.8-8.2a3.4 3.4 0 0 1 6.8-.8 3.4 3.4 0 0 1 6.8.8c0 2.5-2.2 5-6.8 8.2z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="tp-step__num font-plush">Step 4</span>
                  <h4 className="font-plush-text tp-step__title">Welcome home</h4>
                  <p className="tp-step__text">
                    Upon arrival, we provide support to help your new puppy acclimate to their new
                    environment. Our team is available for any additional assistance and to ensure
                    a smooth transition into your home.
                  </p>
                </li>
              </ol>
            </div>
          </section>
        </div>

        {/* 2. Our Premium Puppy Promise (Puppy Passport) */}
        <section
          id="promise"
          ref={promiseRef}
          aria-labelledby="promise-title"
          className="mt-16 sm:mt-24 scroll-mt-28"
        >
          {/* The Open Passport Booklet Container */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#4e2712] p-2.5 sm:p-3.5 md:p-4 shadow-[0_25px_60px_rgba(42,23,14,0.32)] border-[3px] border-[#381a0b]">
            {/* Inner Double-Page Paper Spread */}
            <div className="relative rounded-[22px] sm:rounded-[28px] bg-[#fffbf2] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[480px] sm:min-h-[520px] shadow-inner">
              {/* Subtle Repeating Concentric Passport Watermark SVG Pattern */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="passport-guilloche-how"
                    x="0"
                    y="0"
                    width="120"
                    height="120"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#2a170e" strokeWidth="1.2" />
                    <circle cx="60" cy="60" r="40" fill="none" stroke="#2a170e" strokeWidth="0.8" />
                    <circle cx="60" cy="60" r="30" fill="none" stroke="#2a170e" strokeWidth="0.8" strokeDasharray="2 3" />
                    <circle cx="60" cy="60" r="20" fill="none" stroke="#2a170e" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#passport-guilloche-how)" />
              </svg>

              {/* Center Book Spine Crease & Shadow */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#2a170e]/15 z-20 shadow-[0_0_12px_rgba(42,23,14,0.18)]"
              >
                <div className="absolute top-0 bottom-0 -left-6 w-6 bg-gradient-to-r from-transparent to-[#2a170e]/8 pointer-events-none" />
                <div className="absolute top-0 bottom-0 -right-6 w-6 bg-gradient-to-l from-transparent to-[#2a170e]/8 pointer-events-none" />
              </div>

              {/* Left Page: Title, Script Kicker & Mascot Puppy */}
              <div className="md:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative z-10 border-b md:border-b-0 md:border-r border-[#2a170e]/10">
                <div>
                  <span className="font-scrawl text-lg sm:text-xl md:text-2xl text-[#8a3814] block">
                    puppy passport
                  </span>
                  <h2
                    id="promise-title"
                    className="font-heading text-3xl sm:text-4xl lg:text-[44px] text-[#2a170e] font-black leading-[1.08] tracking-tight mt-1 max-w-[12ch]"
                  >
                    Our premium puppy promise
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-[#5a3a28] mt-3 leading-relaxed max-w-[280px]">
                    Every puppy is treated like family. We guarantee pure genetics, licensed
                    veterinarian approvals, and compassionate care every step of the journey.
                  </p>
                </div>

                {/* Sitting Mascot Puppy at bottom of left page looking right */}
                <div className="pt-8 sm:pt-12 flex justify-start sm:justify-center md:justify-start">
                  <SittingMascot
                    className="w-28 sm:w-36 md:w-40 h-auto cursor-pointer transition-transform hover:scale-105"
                    facing="right"
                  />
                </div>
              </div>

              {/* Right Page: 2x2 Grid of Official Stamps */}
              <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 relative z-10 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Stamp 1: Hand-selected breeders */}
                  <div className="flex flex-col items-center text-center">
                    <div className="passport-stamp-badge tp-stamp w-28 h-28 rounded-full border-2 border-[#8a3814] flex flex-col items-center justify-center p-2 rotate-[-3deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 shadow-2xs bg-[#8a3814]/[0.03]">
                      <div className="w-24 h-24 rounded-full border border-dashed border-[#8a3814] flex flex-col items-center justify-center p-1">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-[#8a3814]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          <path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h6.28" />
                        </svg>
                        <span className="font-heading font-black text-[10px] text-[#8a3814] uppercase tracking-wider text-center leading-tight mt-1">
                          Hand-selected<br />breeders
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-xs sm:text-[13px] text-[#5a3a28] mt-3 leading-relaxed max-w-[200px]">
                      We work only with breeders who uphold the highest ethical and health standards.
                    </p>
                  </div>

                  {/* Stamp 2: Full transparency */}
                  <div className="flex flex-col items-center text-center">
                    <div className="passport-stamp-badge tp-stamp w-32 h-24 rounded-2xl border-2 border-[#1f7a4d] flex flex-col items-center justify-center p-1.5 rotate-[4deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 shadow-2xs bg-[#1f7a4d]/[0.03]">
                      <div className="w-full h-full rounded-xl border border-dashed border-[#1f7a4d] flex flex-col items-center justify-center p-1">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-[#1f7a4d]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                        </svg>
                        <span className="font-heading font-black text-[10px] text-[#1f7a4d] uppercase tracking-wider text-center leading-tight mt-1">
                          Full<br />transparency
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-xs sm:text-[13px] text-[#5a3a28] mt-3 leading-relaxed max-w-[200px]">
                      Photos, videos, and health certificates are shared before your puppy travels.
                    </p>
                  </div>

                  {/* Stamp 3: Safe, stress-free delivery */}
                  <div className="flex flex-col items-center text-center">
                    <div className="passport-stamp-badge tp-stamp w-32 h-24 rounded-[36px] border-2 border-[#5a3a28] flex flex-col items-center justify-center p-1.5 rotate-[-2deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 shadow-2xs bg-[#5a3a28]/[0.03]">
                      <div className="w-full h-full rounded-[30px] border border-dashed border-[#5a3a28] flex flex-col items-center justify-center p-1">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-[#5a3a28]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          <line x1="8" y1="10" x2="8.01" y2="10" strokeWidth="3" />
                          <line x1="12" y1="10" x2="12.01" y2="10" strokeWidth="3" />
                          <line x1="16" y1="10" x2="16.01" y2="10" strokeWidth="3" />
                        </svg>
                        <span className="font-heading font-black text-[10px] text-[#5a3a28] uppercase tracking-wider text-center leading-tight mt-1">
                          Safe, stress-free<br />delivery
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-xs sm:text-[13px] text-[#5a3a28] mt-3 leading-relaxed max-w-[200px]">
                      We handle every detail of the import process, so your puppy arrives happy and healthy.
                    </p>
                  </div>

                  {/* Stamp 4: Certified health guarantee */}
                  <div className="flex flex-col items-center text-center">
                    <div className="passport-stamp-badge tp-stamp w-28 h-28 rounded-full border-2 border-dotted border-[#b85b24] flex flex-col items-center justify-center p-1.5 rotate-[3deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 shadow-2xs bg-[#b85b24]/[0.03]">
                      <div className="w-24 h-24 rounded-full border border-[#b85b24] flex flex-col items-center justify-center p-1">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-[#b85b24]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span className="font-heading font-black text-[9.5px] text-[#b85b24] uppercase tracking-wider text-center leading-tight mt-1">
                          Certified Health<br />Guarantee
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-xs sm:text-[13px] text-[#5a3a28] mt-3 leading-relaxed max-w-[200px]">
                      Puppies delivered to loving homes all around the world with vet certification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Delivery & Collection Section */}
        <section
          id="delivery"
          ref={deliveryRef}
          aria-labelledby="delivery-title"
          className="mt-16 sm:mt-24 grid items-center gap-8 sm:gap-10 lg:grid-cols-12 scroll-mt-28"
        >
          <div className="lg:col-span-6">
            <h2 id="delivery-title" className="font-plush text-huge text-[#2a170e]">
              Delivery &amp; collection
            </h2>
            <p className="text-lede mt-3 sm:mt-5 text-[#5a3a28] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy
              travels comfortably and arrives safely.
            </p>
            <ul className="mt-8 sm:mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 list-none p-0">
              <li>
                <h3 className="font-plush-text text-base sm:text-lg md:text-[1.38rem] font-bold leading-snug text-[#2a170e]">
                  Take your puppy home the same day
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base">
                  Local puppies are available immediately — visit, fall in love, and go home together.
                </p>
              </li>
              <li>
                <h3 className="font-plush-text text-base sm:text-lg md:text-[1.38rem] font-bold leading-snug text-[#2a170e]">
                  Delivery within Dubai
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base">
                  Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.
                </p>
              </li>
              <li>
                <h3 className="font-plush-text text-base sm:text-lg md:text-[1.38rem] font-bold leading-snug text-[#2a170e]">
                  Safe international cargo
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base">
                  We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.
                </p>
              </li>
              <li>
                <h3 className="font-plush-text text-base sm:text-lg md:text-[1.38rem] font-bold leading-snug text-[#2a170e]">
                  Worldwide delivery
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base">
                  We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners
                  ensure your new furry friend travels comfortably and arrives safely, no matter the distance.
                </p>
              </li>
            </ul>
          </div>

          <div className="relative w-full h-[clamp(16rem,30vw,24rem)] lg:col-span-6 flex items-center justify-center">
            {/* Flight Route with Flying Airplane from Korea to Dubai */}
            <div className="tp-flight w-full h-full relative">
              <svg
                viewBox="0 0 660 300"
                role="img"
                aria-label="A plane flying puppies from Korea to Dubai"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <clipPath id="_R_1albsnkivb_">
                    <circle r="25" />
                  </clipPath>
                </defs>

                <path
                  ref={flightPathRef}
                  id="tp-flight-route"
                  d="M40 250 C 170 40, 470 20, 620 168"
                  className="tp-flight__route"
                />

                <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                <circle cx="620" cy="168" r="7" className="tp-flight__dot" />

                <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
                  Korea
                </text>
                <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
                  Dubai
                </text>

                {/* Airplane group translated and rotated along the bezier curve */}
                <g ref={planeRef} id="tp-flight-plane-group" style={{ opacity: 1 }}>
                  <g transform="translate(-126 -78)">
                    <path
                      d="M28 60 L8 26 L34 26 L60 54 Z"
                      className="tp-flight__wing"
                    />
                    <path
                      d="M108 112 L142 156 L172 156 L158 112 Z"
                      className="tp-flight__wing tp-flight__wing--far"
                    />
                    <path
                      d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                      className="tp-flight__body"
                    />
                    <path
                      d="M104 44 L138 2 L168 2 L154 44 Z"
                      className="tp-flight__wing"
                    />
                    <path
                      d="M206 64 C215 67 221 73 224 80"
                      className="tp-flight__line"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us Section */}
        <section
          id="why"
          aria-labelledby="why-title"
          className="mt-16 sm:mt-24 grid gap-8 sm:gap-12 lg:grid-cols-12 scroll-mt-28"
        >
          <div className="lg:col-span-5">
            <h2 id="why-title" className="font-plush text-huge text-[#2a170e]">
              Why choose us
            </h2>
            <p className="text-lede mt-3 sm:mt-6 text-[#5a3a28] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We&apos;re here to help you find a new family member. From the moment you
              visit our site to the joyful day your puppy arrives at your door, we&apos;re with
              you every step of the way. Our mission is to make the entire adoption process
              smooth, transparent, and full of love.
            </p>
          </div>

          <ul className="space-y-6 sm:space-y-8 lg:col-span-6 lg:col-start-7">
            <li className="flex gap-4 sm:gap-5">
              <svg
                viewBox="0 0 64 64"
                className="size-10 sm:size-14 shrink-0 text-[#c2622b]"
                aria-hidden="true"
              >
                <path
                  d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 50c10 4 20 4 30 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 7"
                />
              </svg>
              <div>
                <h3 className="font-plush text-lg sm:text-2xl lg:text-[2.1rem] font-bold text-[#2a170e] leading-snug">
                  International cargo
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base md:text-lg">
                  We safely deliver puppies to loving homes all around the world. Our trusted
                  international cargo partners ensure your new furry friend travels comfortably
                  and arrives safely, no matter the distance.
                </p>
              </div>
            </li>

            <li className="flex gap-4 sm:gap-5">
              <svg
                viewBox="0 0 64 64"
                className="size-10 sm:size-14 shrink-0 text-[#c2622b]"
                aria-hidden="true"
              >
                <path
                  d="M10 14h44v28H30l-12 10v-10h-8z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 28h0M32 28h0M42 28h0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h3 className="font-plush text-lg sm:text-2xl lg:text-[2.1rem] font-bold text-[#2a170e] leading-snug">Support 24/7</h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base md:text-lg">
                  Our team is available 24/7 to answer your questions and assist you through
                  every step of the adoption process. From choosing your puppy to post-delivery
                  support — we&apos;re just a message away.
                </p>
              </div>
            </li>

            <li className="flex gap-4 sm:gap-5">
              <svg
                viewBox="0 0 64 64"
                className="size-10 sm:size-14 shrink-0 text-[#c2622b]"
                aria-hidden="true"
              >
                <path
                  d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 30h7l3-7 4 13 3-6h7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h3 className="font-plush text-lg sm:text-2xl lg:text-[2.1rem] font-bold text-[#2a170e] leading-snug">
                  Health guarantee
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[#5a3a28] leading-relaxed text-sm sm:text-base md:text-lg">
                  All our puppies come with a verified health certificate from licensed vets.
                  We ensure every puppy is vaccinated, dewormed, and thoroughly checked before
                  joining your family.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* 5. Care / CTA Board Section */}
        <section
          aria-labelledby="care-title"
          className="tp-board mt-16 sm:mt-24 grid items-center gap-8 md:grid-cols-[1fr_auto] p-6 sm:p-8 md:!p-12"
        >
          <div>
            <h2 id="care-title" className="font-plush text-big text-[#2a170e]">
              Unique and high quality puppies
            </h2>
            <p className="text-lede measure mt-3 sm:mt-5 text-cocoa-soft leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
              When you choose TeddyPups, you can trust that you&apos;re getting a puppy of
              the highest quality. We also provide guidance and support to new pet owners,
              offering advice on training, nutrition, and general care to ensure a smooth
              transition for you and your new furry friend.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={siteMetadata.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-sm sm:text-base md:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 text-center justify-center"
              >
                Ask us on WhatsApp
              </a>
              <Link className="btn btn-ghost text-sm sm:text-base md:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 text-center justify-center" href="/puppies">
                See available puppies
              </Link>
            </div>
          </div>

          <div
            className="pup-buddy mx-auto w-48 md:w-56"
            data-live=""
            data-facing="left"
          >
            <svg
              viewBox="0 0 300 240"
              style={{ overflow: "visible" }}
              role="img"
              aria-label="Teddy, ready to play"
              focusable="false"
              className="w-full h-full"
            >
              <g
                data-p="root"
                transform="translate(0.0 0) translate(150 0) scale(-1.000 1) translate(-150 0)"
              >
                <ellipse
                  data-p="shadow"
                  cx="150"
                  cy="230"
                  rx="92"
                  ry="7"
                  fill="#2a170e"
                  opacity="0.12"
                  transform="translate(0 0) scale(1 1)"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center center 0px",
                  }}
                />
                <g
                  data-p="body"
                  transform="translate(0 2.55) rotate(15 196 206) translate(196 0) scale(1 1) translate(-196 0)"
                  opacity="1"
                >
                  <g data-p="bf" transform="translate(94 192) rotate(0)" opacity="1">
                    <path
                      d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                      fill="#e4a352"
                    />
                    <path
                      d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M-3.5 29 v5 M4.5 29 v5"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <g data-p="ff" transform="translate(168 192) rotate(-67)">
                    <path
                      d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                      fill="#e4a352"
                    />
                    <path
                      d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M-3.5 29 v5 M4.5 29 v5"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <g data-p="tail" transform="rotate(-31.25 84 150)">
                    <path
                      d="M86 152 C80 146 76 140 74 136"
                      stroke="#2a170e"
                      strokeWidth="9"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M86 152 C80 146 76 140 74 136"
                      stroke="#f2be6b"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </g>
                  <g data-p="bn" transform="translate(110 194) rotate(0)" opacity="1">
                    <path
                      d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                      fill="#f2be6b"
                    />
                    <path
                      d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M-3.5 27 v5 M4.5 27 v5"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <path
                    d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <g data-p="fn" transform="translate(186 194) rotate(-73)">
                    <path
                      d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                      fill="#f2be6b"
                    />
                    <path
                      d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M-3.5 27 v5 M4.5 27 v5"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                </g>
                <g data-p="haunch" opacity="0" transform="translate(0 -0.9)">
                  <path
                    d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M132 222v5M139 222v5"
                    stroke="#2a170e"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
                <g
                  data-p="head"
                  transform="translate(14 30.83) rotate(8.92 212 100)"
                >
                  <path
                    d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                    fill="#a24a1a"
                    stroke="#2a170e"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                    fill="#fbe3b4"
                    stroke="#2a170e"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    data-p="earL"
                    d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    transform="rotate(0 174 82)"
                  />
                  <path
                    data-p="earR"
                    d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    transform="rotate(0 250 82)"
                  />
                  <path
                    d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                    fill="#fbe3b4"
                  />
                  <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <g data-p="eyes" transform="translate(0.54 -2.23)">
                    <g data-p="open" opacity="0">
                      <g data-p="blink" transform="translate(0 0) scale(1 1)">
                        <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                        <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                        <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                        <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                        <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                        <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                      </g>
                    </g>
                  </g>
                  <path
                    data-p="happy"
                    d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    opacity="1"
                  />
                  <path
                    data-p="shut"
                    d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0"
                  />
                  <path
                    d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                    fill="#2a170e"
                  />
                  <path
                    d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                    stroke="#2a170e"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    data-p="tongue"
                    d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                    fill="#e98c8c"
                    stroke="#2a170e"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    opacity="1"
                  />
                </g>
              </g>
            </svg>
          </div>
        </section>
      </div>
    </section>
  );
}
