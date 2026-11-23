"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { happyFamiliesData, GalleryPhoto } from "@/app/data/site-data";
import { FamilyLightbox } from "./family-lightbox";

// Curated authentic captions for the Lightbox detail view
const CURATED_CAPTIONS = [
  "Lulu 🧸 with her new mummy ❤️",
  "Adorable Maltipoo baby 🧸❤️",
  "My new teddy puppy 🥰🧸",
  "Our new puppies 🧸🥰🤗",
  "New puppy 🧸😍",
  "Gang of 3 😍🧸",
  "So happy 😍😍",
  "New pup 🤗💫",
  "Bella with her new family ✨",
  "Oliver's first day home 🏡",
  "Mimi getting endless cuddles 🥰",
  "Welcome home, Coco! 🐾",
  "Pure joy in Downtown Dubai ❤️",
  "First car ride home 🚗💨",
  "Nap time with little Leo 💤",
  "Daisy found her forever home 🌸",
  "The sweetest teddy boy 🧸✨",
  "Brothers at first sight 🐶❤️",
  "Chloe & her teacup puppy 🎀",
  "Our little cloud on Palm Jumeirah ☁️",
  "Toby meeting his new sister 💖",
  "Best birthday surprise ever! 🎂🎈",
  "Puppy kisses all day long 😘🐾",
  "Little peanut taking over the sofa 🛋️",
  "Golden boy settling right in ✨",
  "Look at that smile! 😍",
  "Love at first wag 💕",
  "Our living room is complete 🏡❤️",
  "Milo's first park walk 🌳",
  "Precious little angel 👼🧸",
  "Family photo ready 📸🥰",
  "Archie loving his new bed 🛏️",
  "Teacup Maltipoo magic ✨",
  "Puppy love in Dubai Marina ⛵",
  "He never leaves my side 🥺❤️",
  "Sweet dreams with Teddy 💤",
  "The softest fur baby in the UAE 🧸",
  "Welcome to the good life, Rocky 🌟",
  "Two peas in a pod 🫛❤️",
  "Cutest addition to our family 💫",
  "Morning zoomies champion ⚡",
  "Little Princess Rosie 👑",
  "Already best friends forever 🤞🐶",
  "Wrapped in pure happiness 🎀",
  "That curious puppy gaze 👀✨",
  "Heart melted completely ❤️🔥",
  "Our fluffy bundle of joy ☁️🧸",
  "First day of pampering 🛁✨",
  "Sunny afternoon snuggles ☀️",
  "Forever grateful for this pup 🙏❤️",
  "Look who just learned to sit! 🎓",
  "Dubai sunset with our baby 🌅",
  "Unconditional love right here 💖",
  "The sweetest teacup girl 🌸",
  "Tiny paws, gigantic heart 🐾❤️",
  "Best decision we ever made 🏆",
  "Sofa king crowned today 👑",
  "Meet Sir Winston 🧸🎩",
  "Our home feels complete now 🏡",
  "Playtime never ends 🎾⚡",
  "Tiny adventurer exploring 🧭",
  "Precious fluffball forever ☁️",
  "Sleeping soundly in mama's arms 💤",
  "TeddyPups family forever and always ♡",
];

const TAPE_COLORS = [
  "#f6d79a",
  "#f9cdbf",
  "#cfe5f6",
  "#cce8d6",
  "#fed7aa",
  "#e2d4f0",
];

const TAPE_POSITIONS = [
  "tp-tape--center",
  "tp-tape--left",
  "tp-tape--right",
  "tp-tape--center",
  "tp-tape--left",
  "tp-tape--right",
];

const TILTS = [
  -2.2, 1.6, -0.9, 2.1, -1.8, 1.4, -2.4, 1.8, -1.2, 2.0, -1.6, 1.3,
];

const ALL_PHOTOS: GalleryPhoto[] = happyFamiliesData.photos || [];

interface WallItemProps {
  photo: GalleryPhoto;
  index: number;
  total: number;
  caption: string;
  onOpen: () => void;
}

function WallItem({ photo, index, total, caption, onOpen }: WallItemProps) {
  const [revealed, setRevealed] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tilt = TILTS[index % TILTS.length];
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];
  const tapePos = TAPE_POSITIONS[index % TAPE_POSITIONS.length];
  const delayMs = (index % 4) * 60;

  return (
    <li
      ref={itemRef}
      className="tp-wall__item"
      data-reveal="true"
      data-armed="true"
      data-revealed={revealed ? "true" : undefined}
      style={{ "--d": `${delayMs}ms` } as React.CSSProperties}
    >
      <button
        type="button"
        className="tp-wall__print"
        aria-label={`Open photo ${index + 1} of ${total}`}
        onClick={onOpen}
      >
        <span
          className="tp-polaroid"
          style={
            {
              "--tilt": `${tilt}deg`,
              "--tape": tapeColor,
              "--i": index,
            } as React.CSSProperties
          }
        >
          <span aria-hidden="true" className={`tp-tape ${tapePos}`} />
          <span
            className="tp-polaroid__photo"
            style={{ backgroundColor: photo.color || "#e8dfd3" }}
          >
            <Image
              src={photo.imageUrl}
              alt={
                photo.alt ||
                `A happy TeddyPups family with their new puppy (${index + 1})`
              }
              width={photo.width || 960}
              height={photo.height || 1280}
              className="w-full h-auto block"
              style={{
                color: "transparent",
                backgroundColor: photo.color || "#e8dfd3",
              }}
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
              loading={index < 4 ? "eager" : "lazy"}
              priority={index < 4}
            />
          </span>
          <span className="tp-polaroid__caption font-scrawl">{caption}</span>
        </span>

        {/* Animated Paw Print SVG stamped onto the polaroid on viewport entry */}
        <svg
          viewBox="0 0 64 64"
          className="tp-wall__paw"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
        </svg>
      </button>
    </li>
  );
}

export function PolaroidGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      <ul className="tp-wall" aria-label="Photos from TeddyPups families">
        {ALL_PHOTOS.map((photo, index) => (
          <WallItem
            key={photo.id || index}
            photo={photo}
            index={index}
            total={ALL_PHOTOS.length}
            caption={CURATED_CAPTIONS[index] || photo.caption || ""}
            onOpen={() => setLightboxIndex(index)}
          />
        ))}
      </ul>

      {/* Lightbox Modal matching Image 2 */}
      <FamilyLightbox
        photos={ALL_PHOTOS}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
        captions={CURATED_CAPTIONS}
      />
    </div>
  );
}
