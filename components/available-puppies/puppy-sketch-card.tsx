"use client";

import Image from "next/image";
import React from "react";
import { AvailablePuppy, SketchDoodle } from "./types";

interface PuppySketchCardProps {
  puppy: AvailablePuppy;
  delayIndex?: number;
  onSelect: (puppy: AvailablePuppy) => void;
}

// Organic hand-drawn SVG watercolor wash blob path from the sketchbook design
const SKETCH_WASH_PATH =
  "M97.63 50.00C97.69 52.59 97.48 55.28 96.99 57.81C96.49 60.35 95.66 62.89 94.63 65.22C93.60 67.56 92.25 69.79 90.81 71.83C89.37 73.87 87.69 75.73 86.00 77.46C84.31 79.19 82.49 80.74 80.68 82.21C78.86 83.67 77.00 85.01 75.11 86.28C73.21 87.54 71.30 88.73 69.32 89.81C67.34 90.89 65.32 91.90 63.23 92.75C61.14 93.59 58.98 94.34 56.77 94.88C54.57 95.42 52.29 95.81 50.00 96.01C47.71 96.20 45.38 96.21 43.05 96.05C40.73 95.89 38.38 95.54 36.06 95.03C33.74 94.52 31.41 93.86 29.13 93.00C26.85 92.14 24.56 91.12 22.40 89.88C20.23 88.64 18.07 87.21 16.14 85.55C14.20 83.89 12.34 81.99 10.78 79.91C9.23 77.84 7.85 75.51 6.80 73.11C5.75 70.71 4.98 68.10 4.48 65.53C3.98 62.96 3.81 60.27 3.81 57.68C3.80 55.09 4.09 52.50 4.46 50.00C4.82 47.50 5.39 45.06 6.00 42.68C6.62 40.31 7.34 37.99 8.15 35.72C8.96 33.45 9.84 31.22 10.86 29.06C11.89 26.91 13.00 24.77 14.30 22.77C15.60 20.77 17.04 18.83 18.64 17.07C20.23 15.32 22.01 13.69 23.88 12.26C25.76 10.84 27.79 9.59 29.87 8.52C31.94 7.45 34.13 6.57 36.33 5.84C38.53 5.10 40.80 4.54 43.08 4.10C45.35 3.67 47.67 3.37 50.00 3.24C52.33 3.11 54.70 3.11 57.04 3.33C59.38 3.55 61.77 3.94 64.06 4.57C66.36 5.20 68.65 6.06 70.81 7.12C72.97 8.19 75.06 9.51 77.01 10.98C78.95 12.44 80.77 14.14 82.46 15.92C84.15 17.70 85.70 19.65 87.15 21.67C88.59 23.68 89.91 25.81 91.11 28.01C92.31 30.21 93.42 32.50 94.35 34.87C95.27 37.25 96.09 39.72 96.64 42.25C97.18 44.77 97.57 47.41 97.63 50.00Z";

// Organic SVG mask data-URI applied to the photo container
const PHOTO_MASK_DATA_URL =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22M95.56%2050.00C95.78%2052.43%2095.85%2054.93%2095.69%2057.40C95.53%2059.87%2095.19%2062.40%2094.60%2064.82C94.00%2067.24%2093.17%2069.68%2092.10%2071.94C91.03%2074.20%2089.69%2076.40%2088.17%2078.36C86.66%2080.33%2084.87%2082.15%2083.00%2083.75C81.13%2085.34%2079.04%2086.73%2076.95%2087.93C74.85%2089.13%2072.62%2090.12%2070.41%2090.97C68.20%2091.83%2065.94%2092.50%2063.69%2093.08C61.43%2093.65%2059.16%2094.09%2056.88%2094.40C54.60%2094.71%2052.30%2094.92%2050.00%2094.95C47.70%2094.98%2045.38%2094.89%2043.10%2094.58C40.81%2094.27%2038.51%2093.79%2036.31%2093.09C34.10%2092.40%2031.92%2091.48%2029.87%2090.41C27.81%2089.33%2025.83%2088.03%2023.99%2086.62C22.14%2085.21%2020.40%2083.61%2018.78%2081.93C17.16%2080.25%2015.65%2078.44%2014.26%2076.55C12.88%2074.66%2011.59%2072.67%2010.46%2070.60C9.33%2068.53%208.31%2066.36%207.48%2064.13C6.65%2061.90%205.95%2059.56%205.49%2057.21C5.02%2054.85%204.74%2052.41%204.69%2050.00C4.64%2047.59%204.81%2045.13%205.16%2042.74C5.52%2040.35%206.11%2037.96%206.83%2035.66C7.56%2033.35%208.48%2031.09%209.52%2028.91C10.57%2026.73%2011.76%2024.60%2013.09%2022.57C14.41%2020.54%2015.87%2018.56%2017.47%2016.73C19.07%2014.90%2020.82%2013.13%2022.71%2011.59C24.60%2010.05%2026.66%208.62%2028.81%207.47C30.96%206.32%2033.28%205.37%2035.61%204.71C37.94%204.05%2040.40%203.66%2042.80%203.52C45.20%203.37%2047.65%203.52%2050.00%203.83C52.35%204.14%2054.68%204.71%2056.91%205.37C59.15%206.03%2061.31%206.88%2063.41%207.80C65.51%208.71%2067.53%209.75%2069.50%2010.86C71.47%2011.98%2073.38%2013.18%2075.22%2014.51C77.05%2015.83%2078.84%2017.25%2080.50%2018.80C82.17%2020.36%2083.77%2022.04%2085.22%2023.83C86.66%2025.63%2088.00%2027.57%2089.17%2029.59C90.34%2031.61%2091.37%2033.76%2092.23%2035.97C93.10%2038.17%2093.82%2040.47%2094.37%2042.81C94.93%2045.15%2095.34%2047.57%2095.56%2050.00Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E";

// Hand-drawn organic ink contour line and retrace lines encircling the sketch frame
const SKETCH_INK_LINE_PATH =
  "M99.83 50.00C99.55 52.49 99.05 54.95 98.42 57.34C97.79 59.73 96.99 62.07 96.05 64.32C95.11 66.58 94.02 68.78 92.77 70.86C91.52 72.94 90.10 74.95 88.55 76.81C87.00 78.67 85.27 80.42 83.45 82.02C81.63 83.61 79.66 85.07 77.63 86.40C75.60 87.73 73.47 88.91 71.29 89.99C69.11 91.07 66.86 92.02 64.55 92.86C62.24 93.70 59.88 94.45 57.45 95.03C55.03 95.61 52.52 96.09 50.00 96.33C47.48 96.57 44.87 96.67 42.31 96.48C39.75 96.29 37.14 95.88 34.65 95.21C32.17 94.54 29.70 93.59 27.40 92.45C25.11 91.31 22.91 89.90 20.87 88.38C18.83 86.86 16.94 85.12 15.18 83.33C13.42 81.53 11.80 79.60 10.30 77.61C8.79 75.62 7.40 73.54 6.15 71.38C4.90 69.23 3.75 66.99 2.80 64.68C1.86 62.37 1.04 59.95 0.50 57.50C-0.04 55.06 -0.39 52.51 -0.44 50.00C-0.48 47.49 -0.26 44.92 0.23 42.45C0.71 39.99 1.50 37.53 2.48 35.22C3.45 32.91 4.70 30.67 6.07 28.58C7.44 26.48 9.02 24.50 10.68 22.65C12.34 20.80 14.14 19.08 16.03 17.48C17.91 15.89 19.91 14.41 21.98 13.09C24.06 11.77 26.24 10.57 28.48 9.57C30.72 8.56 33.06 7.71 35.42 7.06C37.79 6.41 40.23 5.95 42.66 5.64C45.09 5.34 47.56 5.24 50.00 5.25C52.44 5.26 54.89 5.44 57.33 5.71C59.77 5.98 62.20 6.36 64.64 6.87C67.08 7.38 69.53 7.98 71.95 8.76C74.37 9.55 76.83 10.44 79.16 11.58C81.50 12.72 83.84 14.03 85.95 15.59C88.06 17.15 90.09 18.95 91.81 20.92C93.53 22.90 95.06 25.13 96.26 27.44C97.47 29.74 98.38 32.26 99.03 34.75C99.67 37.25 100.00 39.86 100.13 42.40C100.27 44.94 100.12 47.51 99.83 50.00Z";

const SKETCH_INK_RETRACE_PATH =
  "M37.52 95.79C36.56 95.50 33.64 94.73 31.77 94.02C29.89 93.32 28.03 92.51 26.25 91.57C24.47 90.62 22.73 89.55 21.11 88.37C19.48 87.18 17.92 85.86 16.48 84.45C15.03 83.05 13.69 81.52 12.45 79.93C11.21 78.35 10.07 76.66 9.03 74.94C7.99 73.22 7.06 71.43 6.21 69.61C5.36 67.78 4.60 65.91 3.94 64.00C3.29 62.10 2.71 60.14 2.25 58.17C1.80 56.19 1.43 54.17 1.22 52.13C1.00 50.10 0.89 48.02 0.95 45.97C1.01 43.91 1.20 41.82 1.56 39.79C1.91 37.75 2.43 35.71 3.09 33.75C3.75 31.78 4.57 29.84 5.50 27.98C6.43 26.13 7.51 24.33 8.67 22.60C9.83 20.88 11.11 19.23 12.46 17.64C13.81 16.06 15.25 14.54 16.76 13.09C18.27 11.65 19.85 10.27 21.51 8.98C23.18 7.69 24.91 6.46 26.73 5.36C28.54 4.26 30.44 3.24 32.40 2.39C34.36 1.55 36.41 0.81 38.49 0.28C40.57 -0.24 42.72 -0.61 44.86 -0.77C47.00 -0.92 49.18 -0.88 51.30 -0.65C53.43 -0.42 55.55 0.03 57.58 0.61C59.62 1.20 61.61 1.99 63.50 2.86C65.40 3.74 67.21 4.78 68.95 5.86C70.69 6.94 72.33 8.14 73.92 9.36C75.51 10.58 77.01 11.86 78.47 13.18C79.94 14.50 81.98 16.58 82.68 17.26";

function RenderDoodle({ doodle }: { doodle: SketchDoodle }) {
  if (doodle.type === "curl") {
    return (
      <g transform={doodle.transform}>
        <g className="tp-sketch__doodle pointer-events-none">
          <path
            d="M0 0c1.6-.6 2.4 1.4.8 2.6-2 1.4-4.6-.4-4-3 .7-3 4.8-3.8 6.8-1.2 2.4 3-0.2 7.4-3.8 7.2"
            fill="none"
            stroke={doodle.stroke || "#c2622b"}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    );
  }

  if (doodle.type === "paw") {
    return (
      <g transform={doodle.transform}>
        <g className="tp-sketch__doodle pointer-events-none">
          <path
            d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
            transform="scale(.17) translate(-32 -34)"
            fill={doodle.fill || "#d4893f"}
            opacity="0.85"
          />
        </g>
      </g>
    );
  }

  if (doodle.type === "whiskers") {
    return (
      <g transform={doodle.transform}>
        <g className="tp-sketch__doodle pointer-events-none">
          <path
            d="M-5 -5l4 2.5M-6 0h5M-5 5l4 -2.5"
            fill="none"
            stroke={doodle.stroke || "#a24a1a"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    );
  }

  if (doodle.type === "dots") {
    return (
      <g transform={doodle.transform}>
        <g className="tp-sketch__doodle pointer-events-none">
          <circle cx="-2.5" cy="0" r="1.35" fill={doodle.fill || "#2a170e"} />
          <circle cx="2.5" cy="0" r="1.35" fill={doodle.fill || "#2a170e"} />
        </g>
      </g>
    );
  }

  if (doodle.type === "heart") {
    return (
      <g transform={doodle.transform}>
        <g className="tp-sketch__doodle pointer-events-none">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke={doodle.stroke || "#2a170e"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(0.65) translate(-12, -12)"
          />
        </g>
      </g>
    );
  }

  if (doodle.type === "sparkle") {
    return (
      <g transform={doodle.transform}>
        <g className="tp-sketch__doodle pointer-events-none">
          <path
            d="M0 -7 C0 -1.6 1.6 0 7 0 C1.6 0 0 1.6 0 7 C0 1.6 -1.6 0 -7 0 C-1.6 0 0 -1.6 0 -7 Z"
            fill={doodle.fill || "#c2622b"}
            opacity="0.9"
          />
        </g>
      </g>
    );
  }

  return null;
}

export function PuppySketchCard({
  puppy,
  delayIndex = 0,
  onSelect,
}: PuppySketchCardProps) {
  return (
    <li
      className="list-none flex justify-center group w-full"
      style={{
        opacity: 1,
        transform: "none",
        transformOrigin: "50% 50% 0px",
      }}
    >
      <a
        className="tp-sketch relative flex flex-col items-center w-full max-w-[360px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[420px] xl:max-w-[460px] 2xl:max-w-[480px] cursor-pointer no-underline select-none transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.025]"
        data-reveal="true"
        data-armed="true"
        data-revealed="true"
        style={
          {
            "--tilt": puppy.tilt,
            "--d": `${delayIndex * 50}ms`,
            "--wash": puppy.wash,
            transform: `rotate(${puppy.tilt})`,
          } as React.CSSProperties
        }
        aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.gender}, ${puppy.age}, available`}
        href={`/puppies#${puppy.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(puppy);
        }}
      >
        {/* Frame container matching original sketchbook layout with generous sizing */}
        <span className="tp-sketch__frame relative flex items-center justify-center w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[370px] lg:h-[370px] xl:w-[410px] xl:h-[410px] 2xl:w-[430px] 2xl:h-[430px] shrink-0">
          {/* 1. Organic watercolor wash background blooming behind photo */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="tp-sketch__wash absolute inset-0 w-full h-full pointer-events-none"
            style={{
              translate: puppy.washTranslate || "-0.1% 6%",
            }}
          >
            <path
              d={SKETCH_WASH_PATH}
              fill={puppy.wash || "var(--wash)"}
              style={{
                fill: puppy.wash,
              }}
            />
          </svg>

          {/* 2. Photo masked with organic hand-drawn SVG silhouette */}
          <span
            className="tp-sketch__photo absolute inset-[4.5%] overflow-hidden"
            style={{
              maskImage: `url("${PHOTO_MASK_DATA_URL}")`,
              WebkitMaskImage: `url("${PHOTO_MASK_DATA_URL}")`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              backgroundColor: "rgb(248, 216, 184)",
            }}
          >
            <Image
              src={puppy.imageUrl}
              alt={puppy.alt}
              fill
              sizes="(min-width: 1536px) 26rem, (min-width: 1024px) 28vw, (min-width: 640px) 48vw, 95vw"
              className="object-cover object-center w-full h-full transition-[scale,transform] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
              priority={delayIndex < 4}
            />
          </span>

          {/* 3. Hand-drawn ink contour line and retrace lines encircling the frame + specific doodles */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="tp-sketch__ink absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
          >
            {/* Primary organic ink contour line with gentle floating animation */}
            <g className="tp-sketch__ring-anim">
              <path
                d={SKETCH_INK_LINE_PATH}
                pathLength="1"
                className="tp-sketch__line transition-colors duration-250 group-hover:stroke-[#a24a1a]"
              />
            </g>
            {/* Secondary retrace artistic sketch line with counter-floating animation */}
            <g className="tp-sketch__ring-anim--alt">
              <path
                d={SKETCH_INK_RETRACE_PATH}
                pathLength="1"
                className="tp-sketch__line tp-sketch__line--retrace transition-colors duration-250 group-hover:stroke-[#a24a1a]"
              />
            </g>

            {/* Specific thematic doodles per card */}
            {puppy.doodles &&
              puppy.doodles.map((doodle, idx) => (
                <RenderDoodle key={idx} doodle={doodle} />
              ))}
          </svg>

          {/* 4. "Available" sticker badge pinned at top right */}
          <span className="tp-sketch__sticker font-scrawl text-base sm:text-lg">
            Available
          </span>

          {/* 5. Optional video badge at bottom left */}
          {puppy.hasVideo && (
            <span className="tp-sketch__video font-body text-sm sm:text-base font-bold">
              ▶ video
            </span>
          )}
        </span>

        {/* 6. Name and metadata in plush font */}
        <span className="tp-sketch__name font-plush text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.35rem]">
          {puppy.name}
        </span>
        <span className="tp-sketch__meta font-body text-base sm:text-lg lg:text-[1.125rem]">
          {puppy.genderLabel || `${puppy.breed} · ${puppy.gender} · ${puppy.age}`}
        </span>
      </a>
    </li>
  );
}
