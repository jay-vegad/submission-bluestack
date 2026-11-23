import { Preloader } from "@/components/preloader";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MeetPups } from "@/components/meet-pups";
import { WaysToMeet } from "@/components/ways-to-meet";
import { PuppyJourney } from "@/components/puppy-journey";
import { WhyTrust } from "@/components/why-trust";
import { HappyFamilies } from "@/components/happy-families";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { PawTrail } from "@/components/paw-trail";
import { LandingCompanion } from "@/components/landing-companion";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      {/* 1. Small Preloader */}
      <Preloader />

      {/* Top Scroll Reading Progress */}
      <ScrollProgressBar />

      {/* Interactive Paw Trail following hover in any direction */}
      <PawTrail />

      {/* Persistent Walking Mascot Companion across landing page */}
      <LandingCompanion />

      {/* 2. Sticky Header (hides on scroll down, reappears on scroll up, with fullscreen menu) */}
      <Header />

      {/* Main Page Flow (Relative container to allow footer reveal beneath) */}
      <div className="relative z-10 bg-[#fffdf8] shadow-2xl">
        {/* 3. Hero section with puppy images and names changing one by one */}
        <Hero />

        {/* 4. Meet the pups - pinned horizontal scroll on desktop, native swipe on mobile */}
        <MeetPups />

        {/* 5. Two ways to meet your puppy cards */}
        <WaysToMeet />

        {/* 6. Your puppy journey with drawing path & dynamic WhatsApp chat mockup */}
        <PuppyJourney />

        {/* 7. Why families trust TeddyPups cards */}
        <WhyTrust />

        {/* 8. Happy families with testimonial and photo gallery (lightbox on click) */}
        <HappyFamilies />

        {/* 9. FAQ accordion */}
        <FaqAccordion />

        {/* 10. Last CTA section */}
        <CtaSection />
      </div>

      {/* 11. Footer with nice reveal animation */}
      <Footer />
    </SmoothScroll>
  );
}
