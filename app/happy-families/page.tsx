import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { Preloader } from "@/components/preloader/preloader";
import { ScrollProgressBar } from "@/components/scroll-progress-bar/scroll-progress-bar";
import { PawTrail } from "@/components/paw-trail/paw-trail";
import { LandingCompanion } from "@/components/landing-companion/landing-companion";
import { Header } from "@/components/header/header";
import { HappyFamiliesPage } from "@/components/happy-families/happy-families-page";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Happy Families & Puppies | TeddyPups U.A.E.",
  description:
    "Explore all 64+ happy families and their beloved puppies across Dubai and the UAE. Heartwarming photo moments, testimonials, and client stories.",
};

export default function HappyFamiliesRoute() {
  return (
    <SmoothScroll>
      {/* 1. Small Preloader */}
      <Preloader />

      {/* Top Scroll Reading Progress */}
      <ScrollProgressBar />

      {/* Interactive Paw Trail following hover in any direction */}
      <PawTrail />

      {/* Persistent Walking Mascot Companion across page */}
      <LandingCompanion />

      {/* 2. Sticky Header with active Happy Families tab */}
      <Header />

      {/* Main Page Flow (Relative container to allow footer reveal beneath) */}
      <main
        className="relative z-10 bg-happy-families-pattern shadow-2xl w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg,#0000 0 46px,#c2622b0b 46px 48px),radial-gradient(70% 40% at 50% 0,#ffd68c73,#0000 70%),linear-gradient(#fff3df,#fbe9cc 60%,#f7e0bd)",
        }}
      >
        <HappyFamiliesPage />
      </main>

      {/* 3. Footer with wavy reveal */}
      <Footer />
    </SmoothScroll>
  );
}

