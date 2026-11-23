import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { Preloader } from "@/components/preloader/preloader";
import { ScrollProgressBar } from "@/components/scroll-progress-bar/scroll-progress-bar";
import { PawTrail } from "@/components/paw-trail/paw-trail";
import { LandingCompanion } from "@/components/landing-companion/landing-companion";
import { Header } from "@/components/header/header";
import { FaqPage } from "@/components/faq/faq-page";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Questions & Answers (FAQ) | TeddyPups U.A.E.",
  description:
    "Find answers to frequently asked questions about our health certificates, showroom visits in Downtown Dubai, worldwide puppy delivery, and 24/7 care support.",
};

export default function FaqRoute() {
  return (
    <SmoothScroll>
      {/* 1. Small Preloader */}
      <Preloader />

      {/* Top Scroll Reading Progress */}
      <ScrollProgressBar />

      {/* Interactive Paw Trail following hover */}
      <PawTrail />

      {/* Persistent Walking Mascot Companion across page */}
      <LandingCompanion />

      {/* 2. Sticky Header with active FAQ tab */}
      <Header />

      {/* Main Page Flow */}
      <main className="relative z-10 w-full shadow-2xl">
        <FaqPage />
      </main>

      {/* 3. Footer with wavy reveal */}
      <Footer />
    </SmoothScroll>
  );
}
