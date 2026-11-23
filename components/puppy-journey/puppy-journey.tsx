"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

const BREED_CHIPS = [
  { name: "Maltipoo", slug: "maltipoo" },
  { name: "Pomeranian", slug: "pomeranian" },
  { name: "Poodle", slug: "poodle" },
  { name: "Cavapoo", slug: "cavapoo" },
  { name: "Shih Tzu", slug: "shih-tzu" },
];

const SNAPS = [
  {
    src: "https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
    alt: "A tiny apricot teddy bear puppy held up in the TeddyPups showroom",
  },
  {
    src: "https://puppy.instabizweb.com/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
    alt: "The apricot teddy bear puppy from our showroom, close up",
  },
  {
    src: "https://puppy.instabizweb.com/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
    alt: "Another view of the apricot puppy",
  },
  {
    src: "https://puppy.instabizweb.com/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg",
    alt: "Playful apricot puppy looking into camera",
  },
];

export function PuppyJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div data-section="journey">
      <section
        aria-labelledby="journey-title"
        className="tp-scene tp-chat"
        data-pup-scene="true"
        data-tone="light"
        data-here="false"
        data-visited="false"
        style={
          {
            "--sky-top": "#f7d18d",
            "--sky-bottom": "#f0b866",
          } as React.CSSProperties
        }
      >
        <div className="tp-chat__grid gutter" data-pin-range="true">
          {/* Left Column: 3 Steps */}
          <div className="tp-chat__story">
            <h2 className="font-plush text-huge" id="journey-title">
              Your puppy journey
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple,
              secure, and purely joyful.
            </p>

            <ol className="tp-chat__steps">
              <li
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === 0 ? "true" : undefined}
                data-done={activeStep > 0 ? "true" : undefined}
                onClick={() => setActiveStep(0)}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  1
                </span>
                <h3 className="font-plush tp-chat__title">Choose your breed</h3>
                <p className="tp-chat__text">
                  Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll
                  guide you based on availability and your lifestyle.
                </p>
              </li>

              <li
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === 1 ? "true" : undefined}
                data-done={activeStep > 1 ? "true" : undefined}
                onClick={() => setActiveStep(1)}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  2
                </span>
                <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
                <p className="tp-chat__text">
                  Our team will share real photos, health details, and all necessary
                  information directly on WhatsApp.
                </p>
              </li>

              <li
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === 2 ? "true" : undefined}
                onClick={() => setActiveStep(2)}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  3
                </span>
                <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
                <p className="tp-chat__text">
                  Once confirmed, we handle everything professionally and ensure your
                  puppy reaches you safely and stress-free.
                </p>
              </li>
            </ol>

            <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
              How it works
            </Link>
          </div>

          {/* Right Column: Authentic Phone Mockup + Mascot Buddy */}
          <div className="tp-chat__side">
            <div
              aria-label="A WhatsApp conversation with TeddyPups U.A.E."
              className="tp-phone"
              role="group"
            >
              {/* WhatsApp Header Bar */}
              <div className="tp-phone__bar">
                <Image
                  alt=""
                  className="tp-phone__avatar rounded-full"
                  width={40}
                  height={40}
                  src="/brand/logo.png"
                />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">online</span>
                </span>
              </div>

              {/* Chat Screen */}
              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">
                  Hi TeddyPups! I&apos;d love to know more about your puppies.
                </p>

                {/* Step 0 Group */}
                <div
                  className="tp-msg-group"
                  data-show={activeStep >= 0 ? "true" : "false"}
                  data-step="0"
                >
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll
                      guide you based on availability and your lifestyle.
                    </p>
                    <ul className="tp-chips" aria-label="Breeds we have now">
                      {BREED_CHIPS.map((breed) => (
                        <li key={breed.slug}>
                          <Link href={`/puppies?breed=${breed.slug}`}>
                            {breed.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step 1 Group: Photos & Video */}
                {activeStep >= 1 && (
                  <div
                    className="tp-msg-group"
                    data-show="true"
                    data-step="1"
                  >
                    <div className="tp-msg tp-msg--them tp-msg--media">
                      <div className="tp-snaps">
                        {SNAPS.map((snap, i) => (
                          <span key={i} className="tp-snaps__one">
                            <Image
                              alt={snap.alt}
                              fill
                              sizes="9rem"
                              style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                inset: 0,
                                objectFit: "cover",
                              }}
                              src={snap.src}
                            />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="tp-msg tp-msg--them tp-msg--media">
                      <div className="tp-clip">
                        <video
                          ref={videoRef}
                          src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                          poster="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-label="A puppy video in showroom"
                          onEnded={() => setIsVideoPlaying(false)}
                        />
                        <button
                          type="button"
                          className="tp-clip__play"
                          onClick={toggleVideo}
                          aria-pressed={isVideoPlaying}
                          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            {isVideoPlaying ? (
                              <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                            ) : (
                              <path d="M8 5v14l11-7z" />
                            )}
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className="tp-msg tp-msg--them">
                      Our team will share real photos, health details, and all necessary
                      information directly on WhatsApp.
                    </p>
                  </div>
                )}

                {/* Step 2 Group: Safe Delivery Route */}
                {activeStep >= 2 && (
                  <div className="tp-msg-group" data-show="true" data-step="2">
                    <div className="tp-msg tp-msg--them">
                      <p>
                        Once confirmed, we handle everything professionally and ensure your
                        puppy reaches you safely and stress-free.
                      </p>
                      <svg
                        viewBox="0 0 220 70"
                        className="tp-route"
                        aria-hidden="true"
                      >
                        <path
                          d="M14 52 C 60 6, 120 70, 170 28"
                          className="tp-route__line"
                        />
                        <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                        <path
                          d="M164 32 l12 -12 l12 12 v14 h-24 z"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <path
                          d="M176 12 v8 M172 16 h8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Teddy sitting beside phone */}
            <TeddyMascot pose="sit" facing="right" className="tp-chat__teddy" />
          </div>
        </div>
      </section>
    </div>
  );
}
