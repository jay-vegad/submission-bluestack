import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { Preloader } from "@/components/preloader/preloader";
import { ScrollProgressBar } from "@/components/scroll-progress-bar/scroll-progress-bar";
import { PawTrail } from "@/components/paw-trail/paw-trail";
import { LandingCompanion } from "@/components/landing-companion/landing-companion";
import { Header } from "@/components/header/header";
import { ContactPage } from "@/components/contact/contact-page";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Visit & Contact | TeddyPups U.A.E.",
  description:
    "Get in touch with TeddyPups U.A.E. Visit our Downtown Dubai showroom or write us a letter with your puppy inquiries. Whether ready to adopt or just seeking info, we'd love to hear from you!",
};

export default function ContactRoute() {
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

      {/* 2. Sticky Header with active Visit & contact tab */}
      <Header />

      {/* Main Page Flow */}
      <main className="relative z-10 w-full shadow-2xl">
        <ContactPage />
      </main>

      {/* 3. Footer with wavy reveal */}
      <Footer />
    </SmoothScroll>
  );
}

