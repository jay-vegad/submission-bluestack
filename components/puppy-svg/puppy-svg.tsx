"use client";

import React from "react";

export interface PuppyLimbState {
  fnAngle?: number; // Front near leg angle
  bfAngle?: number; // Back far leg angle
  ffAngle?: number; // Front far leg angle
  bnAngle?: number; // Back near leg angle
  bodyY?: number; // Torso vertical bounce
  headY?: number; // Head vertical bounce
  tailAngle?: number; // Tail wag angle
  shadowScaleX?: number; // Shadow squash/stretch
  earAngle?: number; // Ear bounce
}

export interface PuppySVGProps {
  limbState?: PuppyLimbState;
  headOffset?: { x?: number; y?: number; angle?: number };
  eyeOffset?: { x?: number; y?: number };
  earOffset?: { left?: number; right?: number };
  isHappy?: boolean;
  isHovered?: boolean;
  isSitting?: boolean;
  flipX?: boolean;
  className?: string;
  style?: React.CSSProperties;
  viewBox?: string;
}

export function PuppySVG({
  limbState = {},
  headOffset = { x: 0, y: 0, angle: 0 },
  eyeOffset = { x: 0, y: 0 },
  earOffset = { left: 0, right: 0 },
  isHappy = false,
  isHovered = false,
  isSitting = false,
  flipX = false,
  className = "w-full h-auto drop-shadow-md",
  style,
  viewBox = "15 20 295 225",
}: PuppySVGProps) {
  const happy = isHappy || isHovered;

  const fnAngle = limbState.fnAngle ?? 0;
  const bfAngle = limbState.bfAngle ?? 0;
  const ffAngle = limbState.ffAngle ?? 0;
  const bnAngle = limbState.bnAngle ?? 0;
  const bodyY = limbState.bodyY ?? 0;
  const headY = limbState.headY ?? 0;
  const tailAngle = limbState.tailAngle ?? 6.61;
  const shadowScaleX = limbState.shadowScaleX ?? 1;
  const earAngle = limbState.earAngle ?? 0;

  const hX = headOffset.x ?? 0;
  const hY = headOffset.y ?? 0;
  const hAngle = headOffset.angle ?? -0.02;

  const eyeX = eyeOffset.x ?? 0;
  const eyeY = eyeOffset.y ?? 0;

  const earL = earOffset.left ?? 0;
  const earR = earOffset.right ?? 0;

  return (
    <svg
      viewBox={viewBox}
      style={{ overflow: "visible", ...style }}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g
        data-p="root"
        transform={
          flipX
            ? "translate(162.5 0) scale(-1 1) translate(-162.5 0)"
            : undefined
        }
      >
        {/* Soft shadow ellipse beneath feet (only when standing) */}
        {!isSitting && (
          <ellipse
            data-p="shadow"
            cx="150"
            cy="230"
            rx="92"
            ry="7"
            fill="#2a170e"
            opacity="0.18"
            transform={`translate(0 0) scale(${shadowScaleX} 1)`}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
        )}

        {/* Main Body with 4 legs and wagging tail (when standing/walking) */}
        {!isSitting && (
          <g
            data-p="body"
            transform={`translate(0 ${bodyY - 0.41}) rotate(0 196 206) translate(196 0) scale(1 1) translate(-196 0)`}
            opacity="1"
          >
            {/* Back Far Leg (bf) */}
            <g
              data-p="bf"
              transform={`translate(94 192) rotate(${bfAngle})`}
              opacity="1"
            >
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

            {/* Front Far Leg (ff) */}
            <g
              data-p="ff"
              transform={`translate(168 192) rotate(${ffAngle})`}
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
                fill="none"
                stroke="#f2be6b"
                strokeWidth="4"
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

            {/* Back Near Leg (bn) */}
            <g
              data-p="bn"
              transform={`translate(110 194) rotate(${bnAngle})`}
              opacity="1"
            >
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

            {/* Fluffy Body Torso Curves */}
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

            {/* Front Near Leg (fn) */}
            <g
              data-p="fn"
              transform={`translate(186 194) rotate(${fnAngle})`}
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
        )}

        {/* Head with Animated Face, Ears and Collar */}
        <g
          data-p="head"
          transform={`translate(${hX} ${headY - 0.62 + hY}) rotate(${hAngle} 212 100)`}
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
          {/* Collar Tag Pendant */}
          <path
            d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
            fill="#fbe3b4"
            stroke="#2a170e"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Left Floppy Ear */}
          <path
            data-p="earL"
            d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
            fill="#e4a352"
            stroke="#2a170e"
            strokeWidth="3.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            transform={`rotate(${earAngle + earL} 174 82)`}
          />

          {/* Right Floppy Ear */}
          <path
            data-p="earR"
            d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
            fill="#e4a352"
            stroke="#2a170e"
            strokeWidth="3.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            transform={`rotate(${-earAngle + earR} 250 82)`}
          />

          {/* Puffy Head Curls */}
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

          {/* Muzzle */}
          <path
            d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
            fill="#fbe3b4"
          />

          {/* Rosy Cheeks */}
          <circle
            cx="181"
            cy="116"
            r={happy ? 8.5 : 7}
            fill="#f9b9a6"
            opacity={happy ? 1 : 0.85}
            className="transition-all duration-300"
          />
          <circle
            cx="243"
            cy="116"
            r={happy ? 8.5 : 7}
            fill="#f9b9a6"
            opacity={happy ? 1 : 0.85}
            className="transition-all duration-300"
          />

          {/* Open Eyes (Looking towards cursor) vs Happy Closed Curved Eyes */}
          <g
            data-p="eyes"
            transform={`translate(${eyeX} ${eyeY})`}
          >
            {/* Open Eyes */}
            <g
              data-p="open"
              opacity={happy ? 0 : 1}
              className="transition-opacity duration-200"
            >
              <g data-p="blink">
                <ellipse
                  cx="194"
                  cy="98"
                  rx="7.4"
                  ry="8.6"
                  fill="#2a170e"
                />
                <ellipse
                  cx="230"
                  cy="98"
                  rx="7.4"
                  ry="8.6"
                  fill="#2a170e"
                />
                <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
              </g>
            </g>
          </g>

          {/* Happy Closed Curved Eyes (Shown when hovered/tapped) */}
          <path
            data-p="happy"
            d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
            stroke="#2a170e"
            strokeWidth="3.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            opacity={happy ? 1 : 0}
            className="transition-opacity duration-200"
          />

          {/* Cute Nose */}
          <path
            d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
            fill="#2a170e"
          />
          {/* Smiling Mouth */}
          <path
            d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
            stroke="#2a170e"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />

          {/* Playful Pink Tongue */}
          <path
            data-p="tongue"
            d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
            fill="#e98c8c"
            stroke="#2a170e"
            strokeWidth="2.2"
            strokeLinejoin="round"
            opacity={happy ? 1 : 0.8}
            className="transition-opacity duration-200"
          />
        </g>

        {/* Sitting Paws Resting on Ledge (Visible when sitting in Hero section) */}
        {isSitting && (
          <g data-p="ledge" opacity="1">
            <path
              d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
