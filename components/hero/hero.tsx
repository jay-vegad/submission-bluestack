"use client";

import Image from "next/image";
import Link from "next/link";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

const HERO_PUPPIES = [
  {
    name: "Max",
    breed: "Maltipoo",
    gender: "male",
    url: "/puppies/maltipoo-max-male",
    label: "Meet Max, Maltipoo",
    alt: "Max, male Maltipoo puppy",
    image:
      "https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
    objectPosition: "53.8% 44.3%",
    backgroundColor: "#785838",
    style: {
      "--x": "9%",
      "--w": "8.6rem",
      "--peek": 0.62,
      "--tilt": "-5deg",
      "--i": 0,
    } as React.CSSProperties,
  },
  {
    name: "Korean Teacup Maltipoo",
    breed: "Korean Teacup Maltipoo",
    gender: "Female",
    url: "/puppies/korean-teacup-maltipoo-female",
    label: "Meet Korean Teacup Maltipoo, Korean Teacup Maltipoo",
    alt: "Female Korean Teacup Maltipoo puppy",
    image:
      "https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    objectPosition: "52.5% 42.6%",
    backgroundColor: "#e8e8e8",
    style: {
      "--x": "22.5%",
      "--w": "10.4rem",
      "--peek": 0.8,
      "--tilt": "3deg",
      "--i": 1,
    } as React.CSSProperties,
  },
  {
    name: "Korean Teacup Poodle",
    breed: "Korean Teacup Poodle",
    gender: "Female",
    url: "/puppies/korean-teacup-poodle-female",
    label: "Meet Korean Teacup Poodle, Korean Teacup Poodle",
    alt: "Female Korean Teacup Poodle puppy",
    image:
      "https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
    objectPosition: "54.5% 45.7%",
    backgroundColor: "#f8d8b8",
    style: {
      "--x": "35%",
      "--w": "9.2rem",
      "--peek": 0.7,
      "--tilt": "-2deg",
      "--i": 2,
    } as React.CSSProperties,
  },
  {
    name: "Maltipoo & Cavapoo",
    breed: "Maltipoo & Cavapoo",
    gender: "Male",
    url: "/puppies/maltipoo-cavapoo-male",
    label: "Meet Maltipoo & Cavapoo, Maltipoo & Cavapoo",
    alt: "Male Maltipoo & Cavapoo puppy",
    image:
      "https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
    objectPosition: "44.7% 29.5%",
    backgroundColor: "#b8a8a8",
    style: {
      "--x": "65%",
      "--w": "9.4rem",
      "--peek": 0.74,
      "--tilt": "3deg",
      "--i": 3,
    } as React.CSSProperties,
  },
  {
    name: "Toy Poodle",
    breed: "Toy Poodle",
    gender: "",
    url: "/puppies/toy-poodle-male-female",
    label: "Meet Toy Poodle, Toy Poodle",
    alt: "Toy Poodle puppy",
    image:
      "https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    objectPosition: "65.4% 44.7%",
    backgroundColor: "#c8c8c8",
    style: {
      "--x": "77.5%",
      "--w": "10.6rem",
      "--peek": 0.82,
      "--tilt": "-3deg",
      "--i": 4,
    } as React.CSSProperties,
  },
  {
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "Female",
    url: "/puppies/maltipoo-female-2",
    label: "Meet Maltipoo, Maltipoo",
    alt: "Female Maltipoo puppy",
    image:
      "https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
    objectPosition: "64.6% 42.3%",
    backgroundColor: "#080808",
    style: {
      "--x": "91%",
      "--w": "8.4rem",
      "--peek": 0.6,
      "--tilt": "4deg",
      "--i": 5,
    } as React.CSSProperties,
  },
];

export function Hero() {
  return (
    <div data-section="hero">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-hero"
        style={
          {
            "--sky-top": "#fffdf8",
            "--sky-bottom": "#fff1d8",
            "--quilt": "#fff1d8",
          } as React.CSSProperties
        }
        aria-labelledby="hero-title"
        data-here="true"
        data-visited="true"
      >
        <span aria-hidden="true" className="tp-hero__sun"></span>

        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg
              viewBox="0 0 220 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
              aria-hidden="true"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </p>

          <h1 id="hero-title" className="tp-hero__title font-plush">
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>

          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature
            breed from trusted breeders worldwide.
          </p>

          <div className="tp-hero__actions">
            <Link className="btn btn-primary" href="/puppies">
              View available puppies
            </Link>
            <a
              href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="tp-hero__stage">
          {/* Puppy Arches Lineup */}
          <ul
            className="tp-lineup"
            aria-label="Some of the puppies in our showroom"
          >
            {HERO_PUPPIES.map((pup, idx) => (
              <li key={pup.url} className="tp-lineup__seat" style={pup.style}>
                <Link
                  className="tp-lineup__pup"
                  data-pup-friend="true"
                  aria-label={pup.label}
                  href={pup.url}
                >
                  <span className="tp-lineup__photo">
                    <Image
                      alt={pup.alt}
                      fill
                      sizes="11rem"
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
                      priority={idx < 2}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Floating tags with puppy names */}
          <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
            {HERO_PUPPIES.map((pup) => (
              <li key={`tag-${pup.url}`} className="tp-lineup__seat" style={pup.style}>
                <span className="tp-lineup__ghost">
                  <span className="tp-lineup__name font-scrawl">{pup.name}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Wings Image - Pomeranian behind the lineup */}
          <span aria-hidden="true" className="tp-lineup__wings" data-for="6">
            <Image
              alt=""
              fill
              sizes="11rem"
              src="https://puppy.instabizweb.com/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                objectFit: "cover",
                objectPosition: "40.3% 44.3%",
                color: "transparent",
                backgroundColor: "#080808",
              }}
            />
          </span>

          {/* Peeking Teddy Mascot */}
          <TeddyMascot
            pose="peek"
            facing="right"
            act="peekaboo"
            behind
            lane
            className="tp-hero__teddy"
            ariaLabel="Teddy, the TeddyPups puppy, peeking over the quilt"
          />

          {/* Quilt Scallop Pattern at bottom of hero */}
          <div aria-hidden="true" className="tp-quilt">
            <svg
              className="tp-quilt__edge"
              width="100%"
              height="40"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="tp-scallop"
                  width="76"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
                  <path
                    d="M0 27A38 25 0 0 1 76 27"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="3"
                  />
                  <path
                    d="M11 33A27 19 0 0 1 65 33"
                    fill="none"
                    opacity=".42"
                    stroke="#2a170e"
                    strokeWidth="1.6"
                    strokeDasharray="3.5 5.5"
                    strokeLinecap="round"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#tp-scallop)" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
