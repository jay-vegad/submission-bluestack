"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

interface DoorPuppy {
  id: string;
  name: string;
  meta: string;
  doorColor: string;
  image: string;
  objectPosition: string;
  backgroundColor: string;
  href: string;
}

const DOOR_PUPPIES: DoorPuppy[] = [
  {
    id: "max",
    name: "Max",
    meta: "Maltipoo, boy, 3 months, with video",
    doorColor: "#a24a1a",
    image:
      "https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
    objectPosition: "53.8% 44.3%",
    backgroundColor: "#785838",
    href: "/puppies/maltipoo-max-male",
  },
  {
    id: "korean-teacup-maltipoo",
    name: "Korean Teacup Maltipoo",
    meta: "girl, 2 months, with video",
    doorColor: "#5a3a28",
    image:
      "https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    objectPosition: "52.5% 42.6%",
    backgroundColor: "#e8e8e8",
    href: "/puppies/korean-teacup-maltipoo-female",
  },
  {
    id: "korean-teacup-poodle",
    name: "Korean Teacup Poodle",
    meta: "girl, 2 months",
    doorColor: "#d4893f",
    image:
      "https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
    objectPosition: "54.5% 45.7%",
    backgroundColor: "#f8d8b8",
    href: "/puppies/korean-teacup-poodle-female",
  },
  {
    id: "maltipoo-cavapoo",
    name: "Maltipoo & Cavapoo",
    meta: "boy, 3 months Maltipoo & 2 months Cavapoo, with video",
    doorColor: "#b8644a",
    image:
      "https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
    objectPosition: "44.7% 29.5%",
    backgroundColor: "#b8a8a8",
    href: "/puppies/maltipoo-cavapoo-male",
  },
  {
    id: "toy-poodle",
    name: "Toy Poodle",
    meta: "boy & girl, 2 months",
    doorColor: "#7a4a2e",
    image:
      "https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    objectPosition: "65.4% 44.7%",
    backgroundColor: "#c8c8c8",
    href: "/puppies/toy-poodle-male-female",
  },
  {
    id: "maltipoo-female-2",
    name: "Maltipoo",
    meta: "girl, 3 months, with video",
    doorColor: "#a24a1a",
    image:
      "https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
    objectPosition: "64.6% 42.3%",
    backgroundColor: "#080808",
    href: "/puppies/maltipoo-female-2",
  },
  {
    id: "pomeranian-girl",
    name: "Pomeranian",
    meta: "girl, 3 months",
    doorColor: "#5a3a28",
    image:
      "https://puppy.instabizweb.com/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    objectPosition: "40.3% 44.3%",
    backgroundColor: "#080808",
    href: "/puppies/pomeranian-female",
  },
  {
    id: "copper-boy",
    name: "Copper",
    meta: "Cavapoo, boy, 2 months",
    doorColor: "#d4893f",
    image:
      "https://puppy.instabizweb.com/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg",
    objectPosition: "48.3% 43.6%",
    backgroundColor: "#c88848",
    href: "/puppies/copper-male",
  },
  {
    id: "shih-tzu-girl",
    name: "Shih Tzu",
    meta: "girl, 2 months",
    doorColor: "#b8644a",
    image:
      "https://puppy.instabizweb.com/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
    objectPosition: "44.8% 42.5%",
    backgroundColor: "#383848",
    href: "/puppies/shitzu-female",
  },
  {
    id: "shih-tzu-boy",
    name: "Shih Tzu",
    meta: "boy, 2 months",
    doorColor: "#7a4a2e",
    image:
      "https://puppy.instabizweb.com/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg",
    objectPosition: "40.3% 43.6%",
    backgroundColor: "#787888",
    href: "/puppies/shitzu-male",
  },
  {
    id: "maltipoo-female-1",
    name: "Maltipoo",
    meta: "girl, 2.5 months",
    doorColor: "#a24a1a",
    image:
      "https://puppy.instabizweb.com/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg",
    objectPosition: "47.5% 50.5%",
    backgroundColor: "#e8d8c8",
    href: "/puppies/maltipoo-female-1",
  },
  {
    id: "maltipoo-female",
    name: "Maltipoo",
    meta: "girl, 2 months",
    doorColor: "#5a3a28",
    image:
      "https://puppy.instabizweb.com/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg",
    objectPosition: "56.9% 49.2%",
    backgroundColor: "#e8d8c8",
    href: "/puppies/maltipoo-female",
  },
  {
    id: "korean-teacup-pomeranian-1",
    name: "Korean Teacup Pomeranian",
    meta: "girl, 2 months",
    doorColor: "#d4893f",
    image:
      "https://puppy.instabizweb.com/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg",
    objectPosition: "49.9% 51.3%",
    backgroundColor: "#d8d8d8",
    href: "/puppies/korean-teacup-pomeranian-1",
  },
  {
    id: "korean-teacup-pomeranian",
    name: "Korean Teacup Pomeranian",
    meta: "girl, 2 months",
    doorColor: "#b8644a",
    image:
      "https://puppy.instabizweb.com/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg",
    objectPosition: "49.9% 48.6%",
    backgroundColor: "#484848",
    href: "/puppies/korean-teacup-pomeranian",
  },
  {
    id: "korean-teacup-pomeranian-male",
    name: "Korean Teacup Pomeranian",
    meta: "boy, 2 months",
    doorColor: "#7a4a2e",
    image:
      "https://puppy.instabizweb.com/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg",
    objectPosition: "48.9% 44.1%",
    backgroundColor: "#080808",
    href: "/puppies/korean-teacup-pomeranian-male",
  },
];

export function MeetPups() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [hoveredDoorId, setHoveredDoorId] = useState<string | null>(null);
  const [currentOpenIndex, setCurrentOpenIndex] = useState(0);

  const getScrollDistance = useCallback(() => {
    if (!trackRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    return Math.max(0, trackWidth - viewportWidth + 120);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Only pin and scrub on desktop (width >= 1024px)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const doorIdx = Math.min(
                15,
                Math.floor(self.progress * (DOOR_PUPPIES.length + 1))
              );
              setCurrentOpenIndex(doorIdx);
            },
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [getScrollDistance]);

  return (
    <div data-section="meet">
      <section
        ref={sectionRef}
        aria-labelledby="meet-title"
        className="tp-scene tp-meet"
        data-here="false"
        data-pinned="true"
        data-pup-scene="true"
        data-tone="light"
        data-visited="false"
        style={
          {
            "--sky-top": "#fff1d8",
            "--sky-bottom": "#fbe3b4",
          } as React.CSSProperties
        }
      >
        <div data-pin-range="true">
          <div className="tp-meet__stage">
            <header className="tp-meet__head gutter">
              <div>
                <h2 className="font-plush text-huge" id="meet-title">
                  Meet the pups
                </h2>
                <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                  Real puppies, real photos, looking for their families right now.
                </p>
              </div>
              <Link className="btn btn-primary shrink-0" href="/puppies">
                See all available puppies
              </Link>
            </header>

            <div className="tp-meet__hall">
              <ol
                ref={trackRef}
                aria-label="Puppies looking for a family"
                className="tp-meet__track"
                data-treadmill="true"
              >
                {DOOR_PUPPIES.map((pup, idx) => {
                  const isOpen = idx <= currentOpenIndex || hoveredDoorId === pup.id;

                  return (
                    <li
                      key={pup.id}
                      className="tp-door"
                      data-open={isOpen ? "true" : "false"}
                      onMouseEnter={() => setHoveredDoorId(pup.id)}
                      onMouseLeave={() => setHoveredDoorId(null)}
                    >
                      <Link
                        className="tp-door__link"
                        href={pup.href}
                        style={{ "--door": pup.doorColor } as React.CSSProperties}
                      >
                        <span className="tp-door__plate">
                          <span className="font-plush tp-door__name">{pup.name}</span>
                          <span className="tp-door__meta">{pup.meta}</span>
                        </span>

                        <span className="tp-door__frame">
                          <span className="tp-door__room">
                            <Image
                              alt={`${pup.name}, puppy`}
                              fill
                              sizes="(min-width: 1024px) 15rem, 44vw"
                              style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                inset: "0px",
                                objectFit: "cover",
                                objectPosition: pup.objectPosition,
                                color: "transparent",
                                backgroundColor: pup.backgroundColor,
                              }}
                              src={pup.image}
                              loading="lazy"
                            />
                          </span>

                          <span aria-hidden="true" className="tp-door__way">
                            <span className="tp-door__leaf">
                              <svg
                                aria-hidden="true"
                                className="tp-door__peephole"
                                fill="currentColor"
                                viewBox="0 0 64 64"
                              >
                                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                              </svg>
                              <span className="tp-door__knob"></span>
                            </span>
                          </span>

                          <span className="tp-door__tag font-scrawl">Available</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}

                {/* 16th Door: Meet them all */}
                <li
                  className="tp-door tp-door--all"
                  data-open={currentOpenIndex >= 15 ? "true" : "false"}
                >
                  <Link className="tp-door__link" href="/puppies">
                    <span className="tp-door__frame tp-door__frame--all">
                      <span className="font-plush tp-door__all">Meet them all</span>
                    </span>
                  </Link>
                </li>
              </ol>

              {/* Wooden Base Floor Runner */}
              <div aria-hidden="true" className="tp-meet__floor">
                <span className="tp-meet__runner"></span>
              </div>

              {/* Teddy on treadmill trotting in place */}
              <TeddyMascot
                pose="walk"
                facing="right"
                act="treadmill"
                className="tp-meet__teddy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
