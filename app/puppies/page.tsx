import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { Preloader } from "@/components/preloader/preloader";
import { ScrollProgressBar } from "@/components/scroll-progress-bar/scroll-progress-bar";
import { PawTrail } from "@/components/paw-trail/paw-trail";
import { LandingCompanion } from "@/components/landing-companion/landing-companion";
import { Header } from "@/components/header/header";
import { AvailablePuppiesPage } from "@/components/available-puppies/available-puppies-page";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Available Puppies | TeddyPups U.A.E.",
  description:
    "Meet all available teacup & miniature puppies ready for their loving families in Dubai and worldwide. Real photos, real videos, ethical breeders, and safe delivery.",
};

export default function PuppiesRoute() {
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

      {/* 2. Sticky Header with active Puppies tab */}
      <Header />

      {/* Main Page Flow */}
      <main className="relative z-10 w-full">
        <AvailablePuppiesPage />
      </main>

      {/* 3. Footer with organic wavy reveal */}
      <Footer />
    </SmoothScroll>
  );
}

