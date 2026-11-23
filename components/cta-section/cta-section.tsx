"use client";

import Image from "next/image";
import Link from "next/link";
import { TeddyMascot } from "@/components/mascot/teddy-mascot";

export function CtaSection() {
  return (
    <div data-section="cta">
      <section
        aria-labelledby="cta-title"
        className="tp-scene tp-home"
        data-pup-scene="true"
        data-tone="dark"
        data-here="false"
        data-visited="false"
        style={
          {
            "--sky-top": "#2f1a10",
            "--sky-bottom": "#24130b",
          } as React.CSSProperties
        }
      >
        <div className="tp-home__copy gutter">
          <h2 id="cta-title" className="font-plush text-huge">
            Ready to meet your new best friend?
          </h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert
            guidance every step of the way. We help you find the right match and
            ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        <div className="tp-house">
          <span
            aria-hidden="true"
            className="tp-house__plant tp-house__plant--left"
          />
          <span aria-hidden="true" className="tp-house__lamp" />
          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <Image
                alt="Max, waiting inside"
                src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                fill
                sizes="16rem"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: 0,
                  objectFit: "cover",
                  objectPosition: "53.8% 44.3%",
                  color: "transparent",
                  backgroundColor: "#785838",
                }}
              />
            </span>
            <span aria-hidden="true" className="tp-house__door">
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>
          <span
            aria-hidden="true"
            className="tp-house__plant tp-house__plant--right"
          />
          <span aria-hidden="true" className="tp-house__mat font-scrawl">
            welcome home
          </span>

          <TeddyMascot pose="bow" facing="right" className="tp-house__teddy" />
        </div>

        <div className="tp-home__actions gutter">
          <a
            href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Enquire on WhatsApp
          </a>
          <Link className="btn btn-ghost" href="/contact">
            Visit &amp; contact
          </Link>
        </div>
      </section>
    </div>
  );
}
