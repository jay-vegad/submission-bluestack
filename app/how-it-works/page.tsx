import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { Preloader } from "@/components/preloader/preloader";
import { ScrollProgressBar } from "@/components/scroll-progress-bar/scroll-progress-bar";
import { PawTrail } from "@/components/paw-trail/paw-trail";
import { LandingCompanion } from "@/components/landing-companion/landing-companion";
import { Header } from "@/components/header/header";
import { HowItWorksPage } from "@/components/how-it-works/how-it-works-page";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "How It Works | TeddyPups U.A.E.",
  description:
    "Whether you choose to visit us locally in Downtown Dubai or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.",
};

export default function HowItWorksRoute() {
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

      {/* 2. Sticky Header with active How it works tab */}
      <Header />

      {/* Main Page Flow */}
      <main className="relative z-10 w-full shadow-2xl">
        <HowItWorksPage />
      </main>

      {/* 3. Footer with wavy reveal */}
      <Footer />
    </SmoothScroll>
  );
}
