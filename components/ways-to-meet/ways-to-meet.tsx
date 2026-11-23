"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

export function WaysToMeet() {
  const sectionRef = useRef<HTMLElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    const planeEl = planeRef.current;
    if (!sectionEl || !planeEl) return;

    // Cubic bezier path: M40 250 C 170 40, 470 20, 620 168
    const p0 = { x: 40, y: 250 };
    const p1 = { x: 170, y: 40 };
    const p2 = { x: 470, y: 20 };
    const p3 = { x: 620, y: 168 };

    const updatePlanePosition = (progress: number) => {
      const t = Math.max(0, Math.min(1, progress));
      const mt = 1 - t;

      // Cubic bezier formula
      const x =
        mt * mt * mt * p0.x +
        3 * mt * mt * t * p1.x +
        3 * mt * t * t * p2.x +
        t * t * t * p3.x;
      const y =
        mt * mt * mt * p0.y +
        3 * mt * mt * t * p1.y +
        3 * mt * t * t * p2.y +
        t * t * t * p3.y;

      // Derivative for exact flight tangent angle
      const dx =
        3 * mt * mt * (p1.x - p0.x) +
        6 * mt * t * (p2.x - p1.x) +
        3 * t * t * (p3.x - p2.x);
      const dy =
        3 * mt * mt * (p1.y - p0.y) +
        6 * mt * t * (p2.y - p1.y) +
        3 * t * t * (p3.y - p2.y);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      planeEl.setAttribute(
        "transform",
        `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)})`
      );
    };

    // Initialize plane at Korea
    updatePlanePosition(0);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      updatePlanePosition(0.5);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: "top 80%",
      end: "bottom 25%",
      scrub: 0.8,
      onUpdate: (self) => {
        updatePlanePosition(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div data-section="paths">
      <section
        ref={sectionRef}
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-paths"
        style={
          {
            "--sky-top": "#fbe3b4",
            "--sky-bottom": "#f7d18d",
          } as React.CSSProperties
        }
        aria-labelledby="paths-title"
        data-here="false"
        data-visited="false"
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <h2 id="paths-title" className="tp-paths__title font-plush text-huge">
            Two ways to meet your puppy
          </h2>

          <div className="tp-fork">
            {/* Center Wooden Post on desktop */}
            <div aria-hidden="true" className="tp-fork__post" />

            {/* 1. Puppies in Dubai (Left) */}
            <article className="tp-way tp-way--left" aria-labelledby="way-local">
              <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
                Puppies in Dubai
              </h3>

              <div className="tp-way__scene" data-pup-look="true">
                <svg
                  viewBox="0 0 300 120"
                  className="tp-way__skyline"
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

                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <Image
                      alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                      loading="lazy"
                      decoding="async"
                      fill
                      sizes="(min-width: 1024px) 16rem, 60vw"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: "0px",
                        objectFit: "cover",
                        objectPosition: "54.3% 48.3%",
                        backgroundColor: "rgb(104, 88, 72)",
                      }}
                      src="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                    />
                  </span>
                  <figcaption className="font-scrawl">In our showroom</figcaption>
                </figure>
              </div>

              <p className="tp-way__text">
                See them, love them, take them home. Come meet our locally available
                puppies before you decide.
              </p>

              <Link className="btn btn-primary" href="/puppies?origin=local">
                Meet local puppies
              </Link>
            </article>

            {/* 2. Imported for you (Right) */}
            <article
              className="tp-way tp-way--right"
              aria-labelledby="way-imported"
            >
              <h3
                id="way-imported"
                className="tp-sign tp-sign--right font-plush"
              >
                Imported for you
              </h3>

              <div className="tp-way__scene" data-pup-look="true">
                <div className="tp-flight">
                  <svg
                    viewBox="0 0 660 300"
                    role="img"
                    aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
                  >
                    <defs>
                      <clipPath id="_tp_flight_porthole_clip_">
                        <circle r="25" />
                      </clipPath>
                    </defs>

                    {/* Flight Path Route */}
                    <path
                      d="M40 250 C 170 40, 470 20, 620 168"
                      className="tp-flight__route"
                    />
                    <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                    <circle cx="620" cy="168" r="7" className="tp-flight__dot" />

                    <text
                      x="40"
                      y="284"
                      textAnchor="middle"
                      className="tp-flight__label"
                    >
                      Korea
                    </text>
                    <text
                      x="620"
                      y="202"
                      textAnchor="middle"
                      className="tp-flight__label"
                    >
                      Dubai
                    </text>

                    {/* Airplane group moving along the route curve */}
                    <g
                      ref={planeRef}
                      id="tp-landing-airplane-group"
                      transform="translate(40.0 250.0) rotate(-58.2)"
                      style={{ opacity: 1, willChange: "transform" }}
                    >
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
                      <g transform="translate(10 2)">
                        <image
                          href="https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                          x="-25"
                          y="-25"
                          width="50"
                          height="50"
                          clipPath="url(#_tp_flight_porthole_clip_)"
                          preserveAspectRatio="xMidYMid slice"
                        />
                        <circle r="25" className="tp-flight__porthole" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>

              <p className="tp-way__text">
                Exclusive Korean teacup puppies, delivered. Order from the
                world&apos;s most reputable breeders and let us handle the import.
              </p>

              <Link className="btn btn-primary" href="/puppies?origin=imported">
                See imported puppies
              </Link>
            </article>

            {/* Fork Mascot */}
            <TeddyMascot pose="sit" facing="right" className="tp-fork__teddy" />
          </div>
        </div>
      </section>
    </div>
  );
}
