"use client";

import React, { useState, useEffect } from "react";

const SPEECH_WORDS = ["zoomies!", "pounce!", "wheee!", "bork!", "sniff!", "wag wag!"];

export function TeddySelfPortrait() {
  const [facing, setFacing] = useState<"left" | "right">("left");
  const [isActing, setIsActing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [tailAngle, setTailAngle] = useState(19.03);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Tail wag loop when acting or hovered
  useEffect(() => {
    if (!isActing && !isHovered) {
      setTailAngle(19.03);
      return;
    }

    let frame: number;
    let start = performance.now();
    const animateTail = (now: number) => {
      const elapsed = (now - start) / 1000;
      const speed = isActing ? 18 : 8;
      const amplitude = isActing ? 24 : 14;
      setTailAngle(19 + Math.sin(elapsed * speed) * amplitude);
      frame = requestAnimationFrame(animateTail);
    };
    frame = requestAnimationFrame(animateTail);
    return () => cancelAnimationFrame(frame);
  }, [isActing, isHovered]);

  const handleClick = () => {
    const nextFacing = facing === "left" ? "right" : "left";
    setFacing(nextFacing);
    setClickCount((prev) => prev + 1);
    setIsActing(true);
    setTimeout(() => {
      setIsActing(false);
    }, 650);
  };

  const currentWord = SPEECH_WORDS[clickCount % SPEECH_WORDS.length];

  return (
    <div className="tp-sketchbook__self-wrapper flex flex-col items-center select-none shrink-0">
      {/* Interactive Clickable Portrait Card */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Teddy self portrait. Click to make Teddy act and turn side to side."
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#2a170e]/30 rounded-full"
      >
        {/* Dynamic Speech Bubble: positioned on left when facing left, right when facing right */}
        <div
          className={`absolute -top-7 sm:-top-9 z-30 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            facing === "left"
              ? "-left-4 sm:-left-6 translate-x-0"
              : "-right-4 sm:-right-6 translate-x-0"
          } ${isActing ? "scale-115 -translate-y-2" : "scale-100 group-hover:scale-105"}`}
        >
          <div className="relative bg-white border-[2.2px] border-[#2a170e] rounded-[1.3rem] px-3.5 sm:px-4 py-1 sm:py-1.5 shadow-[2px_3px_0_0_rgba(42,23,14,0.18)]">
            <span className="font-scrawl text-sm sm:text-base md:text-[17px] text-[#2a170e] font-bold tracking-wide select-none block leading-tight">
              {currentWord}
            </span>
            {/* Speech bubble pointer arrow pointing towards Teddy's head */}
            <svg
              className={`absolute -bottom-2.5 overflow-visible w-4 h-3 ${
                facing === "left" ? "right-4" : "left-4 scale-x-[-1]"
              }`}
              viewBox="0 0 16 12"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0 0 L16 0 L6 11 Z" fill="#ffffff" />
              <path
                d="M0 0 L6 11 L15 0"
                stroke="#2a170e"
                strokeWidth="2.2"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Hand-drawn Sketchbook Portrait Frame */}
        <div
          className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-[235px] lg:h-[235px] xl:w-[250px] xl:h-[250px] aspect-square flex items-center justify-center p-2 sm:p-3 transition-transform duration-300 group-hover:scale-[1.025]"
          style={{
            border: "3px solid #2a170e",
            background: "#fcebc8",
            borderRadius: "52% 48% 50% 50% / 50% 52% 48% 50%",
            boxShadow: "3px 5px 0 0 rgba(42,23,14,0.14)",
          }}
        >
          {/* Organic Retrace Outer Sketch Line matching .tp-sketchbook__self:after */}
          <div
            className="absolute inset-[-6px_-4px_-5px_-6px] pointer-events-none -rotate-[6deg]"
            style={{
              border: "2px solid rgba(42, 23, 14, 0.42)",
              borderRadius: "48% 52% 47% 53% / 53% 47%",
            }}
            aria-hidden="true"
          />

          {/* Interactive Teddy SVG Mascot: properly centered, hops and turns left/right on click */}
          <div
            className={`w-[96%] h-[96%] flex items-center justify-center transition-all duration-450 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isActing
                ? facing === "left"
                  ? "-translate-x-3.5 -translate-y-2.5 rotate-[-3deg]"
                  : "translate-x-3.5 -translate-y-2.5 rotate-[3deg]"
                : "translate-x-0 translate-y-0 rotate-0"
            }`}
          >
            <svg
              viewBox="0 0 300 240"
              style={{ overflow: "visible" }}
              role="img"
              aria-label="Teddy, the TeddyPups puppy"
              focusable="false"
              className="w-full h-full select-none pointer-events-none"
            >
              <g
                data-p="root"
                transform={
                  facing === "left"
                    ? "translate(0.0 0) translate(150 0) scale(-1.000 1) translate(-150 0)"
                    : "translate(0.0 0) translate(150 0) scale(1.000 1) translate(-150 0)"
                }
                style={{
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transformOrigin: "150px 160px",
                }}
              >
                {/* Soft ground shadow ellipse beneath paws */}
                <ellipse
                  data-p="shadow"
                  cx="150"
                  cy="230"
                  rx="92"
                  ry="7"
                  fill="#2a170e"
                  opacity={isActing ? "0.08" : "0.14"}
                  transform={isActing ? "scale(0.9 1)" : "scale(1 1)"}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center center 0px",
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Teddy Body with legs, tail and fluffy fur */}
                <g
                  data-p="body"
                  transform="translate(0 -1.41) rotate(-24 196 206) translate(196 0) scale(1 1) translate(-196 0)"
                  opacity="1"
                >
                  {/* Back far foot */}
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

                  {/* Front far foot with playful 24deg rotation */}
                  <g
                    data-p="ff"
                    transform={`translate(168 192) rotate(${isActing ? 12 : 24})`}
                    style={{ transition: "transform 0.25s ease" }}
                  >
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

                  {/* Wagging Fluffy Tail */}
                  <g
                    data-p="tail"
                    transform={`rotate(${tailAngle} 84 150)`}
                    style={{
                      transformOrigin: "84px 150px",
                    }}
                  >
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

                  {/* Back near foot */}
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

                  {/* Fluffy Body Torso Contours */}
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

                  {/* Front near foot */}
                  <g
                    data-p="fn"
                    transform={`translate(186 194) rotate(${isActing ? 12 : 24})`}
                    style={{ transition: "transform 0.25s ease" }}
                  >
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

                {/* Haunch with cute rear sitting paw */}
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

                {/* Head with Collar, Heart Tag, Ears, Cheeks and Face */}
                <g
                  data-p="head"
                  transform={`translate(-10 ${isActing ? -8 : -5.12}) rotate(${
                    isActing ? 4 : isHovered ? 2 : 0
                  } 212 100)`}
                  style={{
                    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {/* Collar Band */}
                  <path
                    d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                    fill="#a24a1a"
                    stroke="#2a170e"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* Heart Pendant Tag */}
                  <path
                    d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                    fill="#fbe3b4"
                    stroke="#2a170e"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Left Ear */}
                  <path
                    data-p="earL"
                    d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    transform={isActing ? "rotate(6 174 82)" : "rotate(0 174 82)"}
                    style={{ transition: "transform 0.25s ease" }}
                  />

                  {/* Right Ear */}
                  <path
                    data-p="earR"
                    d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    transform={isActing ? "rotate(-6 250 82)" : "rotate(0 250 82)"}
                    style={{ transition: "transform 0.25s ease" }}
                  />

                  {/* Fluffy Head Cloud */}
                  <path
                    d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Head Top Tuft */}
                  <path
                    d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Cream Muzzle */}
                  <path
                    d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                    fill="#fbe3b4"
                  />

                  {/* Rosy Cheeks */}
                  <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

                  {/* Eyes: Open eyes with cute highlights, or happy squint when acting / blinking */}
                  <g data-p="eyes">
                    <g
                      data-p="open"
                      opacity={isActing || isBlinking ? 0 : 1}
                      style={{ transition: "opacity 0.15s ease" }}
                    >
                      <g data-p="blink">
                        <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                        <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                        <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                        <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                        <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                        <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                      </g>
                    </g>
                    {/* Happy eyes ^ ^ */}
                    <path
                      data-p="happy"
                      d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      opacity={isActing || isBlinking ? 1 : 0}
                      style={{ transition: "opacity 0.15s ease" }}
                    />
                  </g>

                  {/* Dark Cocoa Nose */}
                  <path
                    d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                    fill="#2a170e"
                  />

                  {/* Cute Mouth */}
                  <path
                    d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                    stroke="#2a170e"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Pink Tongue */}
                  <path
                    data-p="tongue"
                    d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                    fill="#e98c8c"
                    stroke="#2a170e"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    opacity={isActing ? 1 : 0.9}
                    transform={isActing ? "scale(1.15) translate(-3 -2)" : undefined}
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Hand-drawn caption underneath matching reference */}
      <span className="font-scrawl text-[#2a170e] text-lg sm:text-xl md:text-2xl font-bold tracking-wide mt-3.5 select-none text-center">
        self-portrait
      </span>
    </div>
  );
}

