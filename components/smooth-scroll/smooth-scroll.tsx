"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize LocomotiveScroll (v5 with smooth Lenis-based scrolling)
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      },
    });

    locomotiveScrollRef.current = locomotiveScroll;

    // Connect locomotive scroll events with ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      locomotiveScroll.destroy();
      locomotiveScrollRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
