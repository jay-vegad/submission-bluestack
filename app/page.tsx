import Link from "next/link";
import { Preloader } from "@/components/preloader/preloader";
import { Header } from "@/components/header/header";
import { Hero } from "@/components/hero/hero";
import { MeetPups } from "@/components/meet-pups/meet-pups";
import { WaysToMeet } from "@/components/ways-to-meet/ways-to-meet";
import { PuppyJourney } from "@/components/puppy-journey/puppy-journey";
import { WhyTrust } from "@/components/why-trust/why-trust";
import { HappyFamilies } from "@/components/happy-families/happy-families";
import { FaqAccordion } from "@/components/faq-accordion/faq-accordion";
import { CtaSection } from "@/components/cta-section/cta-section";
import { Footer } from "@/components/footer/footer";
import { ScrollProgressBar } from "@/components/scroll-progress-bar/scroll-progress-bar";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "name": "TeddyPups U.A.E.",
    "description":
      "TeddyPups U.A.E. specializes in premium teacup and miniature puppies in Dubai, offering Korean Teacup Maltipoos, Pomeranians, Poodles, and concierge pet delivery across the UAE.",
    "url": "https://puppy.instabizweb.com",
    "telephone": "+971500000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "10:00",
        "closes": "21:00",
      },
    ],
  };

  return (
    <SmoothScroll>
      {/* 1. Small Preloader */}
      <Preloader />

      {/* Top Scroll Reading Progress */}
      <ScrollProgressBar />

      {/* 2. Sticky Header */}
      <Header />

      {/* Main Continuous Day-to-Night Scene Container */}
      <main id="main" className="relative pt-[var(--header-h)] outline-none">
        <div className="tp-page relative z-10" data-page="home">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {/* 1. Hero: Day sky, lineup of 6 arched puppies, scalloped quilt, peeking Teddy */}
          <Hero />

          {/* 2. Meet: 16 doors, 3D perspective opening, hallway track, treadmill mascot */}
          <MeetPups />

          {/* 3. Ways to Meet (Paths): Showroom & Worldwide Flight branches with fork mascot */}
          <WaysToMeet />

          {/* 4. Journey: Interactive phone mockup, chat stamps, sitting Teddy */}
          <PuppyJourney />

          {/* 5. Trust: Official Dubai passport book, wax & ink stamps, skyline */}
          <WhyTrust />

          {/* 6. Families: Dusk photowall with washi tape, polaroids, porch lamp, sitting Teddy */}
          <HappyFamilies />

          {/* 7. FAQ: Night sky with twinkling stars, wonder ?, Teddy mascot */}
          <FaqAccordion />

          {/* 8. CTA: Cozy home doorway, Max inside, welcome mat, bowing Teddy */}
          <CtaSection />
        </div>
      </main>

      {/* 9. Authentic Night Sky Footer with Hill Wave, Moon, Stars & Snug Basket Teddy */}
      <Footer />

      {/* 10. Floating Quick Action Bar on Mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <a
            className="btn btn-primary flex-1 py-2 text-sm text-center"
            href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp us
          </a>
          <Link
            className="btn btn-ghost flex-1 py-2 text-sm text-center"
            href="/puppies"
          >
            Available puppies
          </Link>
        </div>
      </div>
    </SmoothScroll>
  );
}
