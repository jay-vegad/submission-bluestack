"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

interface FamilyPhoto {
  id: number;
  src: string;
  caption: string;
  tilt: string;
  tape: string;
  tapeClass: string;
  hasBothTapes?: boolean;
  delay: string;
  bgColor: string;
}

const FAMILY_PHOTOS: FamilyPhoto[] = [
  {
    id: 1,
    src: "https://puppy.instabizweb.com/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg",
    caption: "Lulu 🧸 with her new mummy ❤️",
    tilt: "-2.2deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape--center",
    delay: "330ms",
    bgColor: "rgb(216, 184, 152)",
  },
  {
    id: 2,
    src: "https://puppy.instabizweb.com/media/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg",
    caption: "Adorable Maltipoo baby 🧸❤️",
    tilt: "1.6deg",
    tape: "#f9cdbf",
    tapeClass: "tp-tape--left",
    delay: "0ms",
    bgColor: "rgb(216, 184, 136)",
  },
  {
    id: 3,
    src: "https://puppy.instabizweb.com/media/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg",
    caption: "My new teddy puppy 🥰🧸",
    tilt: "-0.9deg",
    tape: "#cfe5f6",
    tapeClass: "tp-tape--right",
    delay: "550ms",
    bgColor: "rgb(200, 184, 152)",
  },
  {
    id: 4,
    src: "https://puppy.instabizweb.com/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg",
    caption: "Our new puppies 🧸🥰🤗",
    tilt: "2.4deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape--tl",
    hasBothTapes: true,
    delay: "110ms",
    bgColor: "rgb(200, 168, 136)",
  },
  {
    id: 5,
    src: "https://puppy.instabizweb.com/media/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg",
    caption: "New puppy 🧸😍",
    tilt: "-1.5deg",
    tape: "#e9dcc4",
    tapeClass: "tp-tape--center",
    delay: "660ms",
    bgColor: "rgb(232, 216, 184)",
  },
  {
    id: 6,
    src: "https://puppy.instabizweb.com/media/pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg",
    caption: "Gang of 3 😍🧸",
    tilt: "0.8deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape--right",
    delay: "220ms",
    bgColor: "rgb(184, 152, 120)",
  },
  {
    id: 7,
    src: "https://puppy.instabizweb.com/media/4wOJk9azop_-/65ecf66bf0/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg",
    caption: "So happy 😍😍",
    tilt: "-2.6deg",
    tape: "#f9cdbf",
    tapeClass: "tp-tape--left",
    delay: "770ms",
    bgColor: "rgb(88, 56, 56)",
  },
  {
    id: 8,
    src: "https://puppy.instabizweb.com/media/3h20rIasJCOa/10c307cb1c/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg",
    caption: "New pup 🤗💫",
    tilt: "1.2deg",
    tape: "#cfe5f6",
    tapeClass: "tp-tape--center",
    delay: "440ms",
    bgColor: "rgb(24, 40, 72)",
  },
];

export function HappyFamilies() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [teddyHappy, setTeddyHappy] = useState(false);

  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % FAMILY_PHOTOS.length : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + FAMILY_PHOTOS.length) % FAMILY_PHOTOS.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhotoIndex]);

  const activePhoto = selectedPhotoIndex !== null ? FAMILY_PHOTOS[selectedPhotoIndex] : null;

  return (
    <div data-section="families">
      <section
        aria-labelledby="dusk-title"
        className="tp-scene tp-dusk"
        data-pup-scene="true"
        data-tone="dark"
        data-here="true"
        data-visited="true"
        style={{ "--sky-top": "#a65a30", "--sky-bottom": "#4d2b19" } as React.CSSProperties}
      >
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <h2 id="dusk-title" className="font-plush text-huge">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members of loving families.
              These heartwarming moments have been shared by our valued clients who welcomed a
              Teddy Pup into their homes and hearts.
            </p>
          </div>

          <figure className="tp-dusk__note">
            <blockquote className="font-plush-text">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import
              journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support
              throughout the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-scrawl">
              Sarah M., Dubai, UAE
            </figcaption>
          </figure>
        </div>

        <div className="tp-photowall">
          <div className="tp-photowall__wall">
            <ul aria-label="Photos from TeddyPups families" className="tp-photowall__prints">
              {FAMILY_PHOTOS.map((photo, i) => (
                <li
                  key={photo.id}
                  data-armed="true"
                  data-reveal="true"
                  data-revealed="true"
                  style={{ "--d": photo.delay } as React.CSSProperties}
                >
                  <button
                    aria-label={`Open photo ${i + 1} of ${FAMILY_PHOTOS.length}: ${photo.caption}`}
                    className="tp-photowall__print"
                    type="button"
                    onClick={() => setSelectedPhotoIndex(i)}
                  >
                    <span
                      className="tp-polaroid"
                      style={
                        {
                          "--tilt": photo.tilt,
                          "--tape": photo.tape,
                          "--i": i,
                        } as React.CSSProperties
                      }
                    >
                      {photo.hasBothTapes ? (
                        <>
                          <span aria-hidden="true" className="tp-tape tp-tape--tl" />
                          <span aria-hidden="true" className="tp-tape tp-tape--tr" />
                        </>
                      ) : (
                        <span aria-hidden="true" className={`tp-tape ${photo.tapeClass}`} />
                      )}
                      <span className="tp-polaroid__photo">
                        <Image
                          alt="A happy TeddyPups family with their new puppy"
                          src={photo.src}
                          width={433}
                          height={433}
                          loading="lazy"
                          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 42vw"
                          style={{
                            width: "100%",
                            height: "auto",
                            backgroundColor: photo.bgColor,
                          }}
                        />
                      </span>
                      <span className="tp-polaroid__caption font-scrawl">
                        {photo.caption}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="tp-facade__ground">
              <span aria-hidden="true" className="tp-facade__door" />
              <span aria-hidden="true" className="tp-lamp">
                <span className="tp-lamp__light" />
              </span>

              <Link className="btn btn-primary tp-facade__cta" href="/happy-families">
                See every happy family
              </Link>

              <TeddyMascot pose="sit" facing="right" className="tp-dusk__teddy" />
            </div>

            <div aria-hidden="true" className="tp-street__pavement" />
          </div>
        </div>

        {/* Fullscreen Lightbox Photo Viewer */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="relative max-w-xl w-full bg-[#fffdf8] p-4 sm:p-6 rounded-3xl shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-3 right-4 w-10 h-10 rounded-full bg-[#2a170e]/10 hover:bg-[#2a170e]/20 text-[#2a170e] flex items-center justify-center font-bold text-xl transition-colors z-20"
                aria-label="Close photo preview"
              >
                ✕
              </button>

              <div className="relative w-full aspect-square max-h-[70vh] rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 600px"
                  priority
                />
              </div>

              <div className="mt-4 text-center">
                <p className="font-scrawl text-xl sm:text-2xl text-[#2a170e]">
                  {activePhoto.caption}
                </p>
                <p className="font-body text-xs text-[#5a3a28] mt-1">
                  Photo {selectedPhotoIndex! + 1} of {FAMILY_PHOTOS.length} • Click outside or press Esc to close
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between w-full mt-4 px-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhotoIndex(
                      (prev) => (prev! - 1 + FAMILY_PHOTOS.length) % FAMILY_PHOTOS.length
                    )
                  }
                  className="btn btn-ghost text-sm py-1.5 px-4"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhotoIndex((prev) => (prev! + 1) % FAMILY_PHOTOS.length)
                  }
                  className="btn btn-ghost text-sm py-1.5 px-4"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
