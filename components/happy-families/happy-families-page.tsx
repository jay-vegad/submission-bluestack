"use client";

import React from "react";
import { PolaroidGallery } from "./polaroid-gallery";
import { FamilyBottomCta } from "./family-bottom-cta";

export function HappyFamiliesPage() {
  return (
    <section aria-labelledby="families-title" className="tp-memories relative min-h-screen w-full">
      {/* Container with proper top spacing to clear the fixed navbar and provide beautiful breathing room */}
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <div className="tp-memories__head">
          <div>
            <p
              className="font-scrawl text-lg text-toffee-ink"
              data-reveal="true"
              data-armed="true"
              data-revealed="true"
            >
              our wall of happy endings
            </p>
            <h1
              id="families-title"
              className="font-plush text-giant tp-memories__title"
              data-reveal="true"
              data-armed="true"
              data-revealed="true"
            >
              Happy families
              <svg
                viewBox="0 0 48 44"
                className="tp-memories__heart"
                aria-hidden="true"
              >
                <path
                  d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h1>
            <p
              className="text-lede mt-6 max-w-[50ch] text-cocoa-soft"
              data-reveal="true"
              data-armed="true"
              data-revealed="true"
            >
              Nothing makes us happier than seeing our puppies in loving homes!
              Here are some beautiful moments shared by our amazing clients after
              welcoming their furry friends.
            </p>
            <p
              className="font-scrawl mt-5 text-lg text-toffee-ink"
              data-reveal="true"
              data-armed="true"
              data-revealed="true"
            >
              64 moments and counting
            </p>
          </div>

          <figure
            className="tp-memories__note"
            data-reveal="true"
            data-armed="true"
            data-revealed="true"
          >
            <span
              aria-hidden="true"
              className="tp-tape tp-tape--center"
              style={{ "--tape": "#cfe5f6" } as React.CSSProperties}
            />
            <blockquote className="font-sans font-normal text-[#2a170e] text-[1.05rem] leading-[1.65rem]">
              “TeddyPups truly made our dream a reality. They supported us at
              every step of the import journey. Our Maltipoo arrived healthy,
              cheerful, and absolutely perfect. Having 24/7 support throughout
              the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-sans font-medium text-[#8e3f15] text-[0.95rem] mt-3">
              Sarah M., Dubai, UAE
            </figcaption>
          </figure>
        </div>

        {/* Masonry Polaroid Wall */}
        <div className="mt-16 md:mt-20">
          <div>
            <PolaroidGallery />
          </div>
        </div>

        {/* Bottom CTA with 2 Cartoon Puppies */}
        <FamilyBottomCta />
      </div>
    </section>
  );
}
