"use client";

import React from "react";
import Link from "next/link";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Are your puppies vaccinated and health-checked?",
    a: "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
  },
  {
    q: "Can I meet a puppy before I decide?",
    a: "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
  },
  {
    q: "Can I take my puppy home the same day?",
    a: "Local puppies are available immediately, so you can take your puppy home the same day.",
  },
];

const TWINKLE_STARS = [
  { left: "8%", top: "12%", width: 16.2, delay: "0s" },
  { left: "22%", top: "30%", width: 9, delay: "0.4s" },
  { left: "41%", top: "8%", width: 12.6, delay: "0.8s" },
  { left: "57%", top: "22%", width: 8.1, delay: "1.2s" },
  { left: "72%", top: "6%", width: 14.4, delay: "1.6s" },
  { left: "88%", top: "18%", width: 10.8, delay: "2s" },
  { left: "95%", top: "42%", width: 9, delay: "2.4s" },
  { left: "4%", top: "58%", width: 10.8, delay: "2.8s" },
  { left: "34%", top: "70%", width: 7.2, delay: "3.2s" },
  { left: "63%", top: "84%", width: 9.9, delay: "3.6s" },
  { left: "83%", top: "66%", width: 12.6, delay: "4s" },
];

export function FaqAccordion() {
  return (
    <div data-section="questions">
      <section
        aria-labelledby="questions-title"
        className="tp-scene tp-night"
        data-pup-scene="true"
        data-tone="dark"
        data-here="false"
        data-visited="false"
        style={{ "--sky-top": "#4d2b19", "--sky-bottom": "#2f1a10" } as React.CSSProperties}
      >
        {/* Night Sky Twinkling Stars */}
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          {TWINKLE_STARS.map((star, i) => (
            <svg
              key={i}
              aria-hidden="true"
              className="tp-twinkle absolute text-honey"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.width}px`,
                animationDelay: star.delay,
              }}
              viewBox="0 0 40 40"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 id="questions-title" className="font-plush text-huge">
              Questions, answered
            </h2>

            <Link className="btn btn-ghost tp-night__cta" href="/faq">
              Read all questions
            </Link>

            <div className="tp-night__pup">
              <span aria-hidden="true" className="tp-night__wonder font-plush">
                ?
              </span>

              <TeddyMascot
                pose="sit"
                facing="right"
                act="tilt"
                className="tp-night__teddy"
              />
            </div>
          </div>

          <dl className="tp-night__list">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="tp-qa" data-pup-look="">
                <dt className="font-plush tp-qa__q">
                  <svg aria-hidden="true" className="tp-qa__star" viewBox="0 0 40 40">
                    <path
                      d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                      fill="currentColor"
                    />
                  </svg>
                  {faq.q}
                </dt>
                <dd className="tp-qa__a">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
