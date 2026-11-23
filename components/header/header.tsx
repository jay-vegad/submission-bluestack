"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteMetadata } from "@/app/data/site-data";

export function Header() {
  const pathname = usePathname();
  const isHappyFamiliesPage = pathname === "/happy-families";
  const isPuppiesPage = pathname === "/puppies";
  const isHowItWorksPage = pathname === "/how-it-works";
  const isFaqPage = pathname === "/faq";
  const isContactPage =
    pathname === "/contact" ||
    pathname === "/visit-contact" ||
    pathname === "/visit-and-contact";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [manualNav, setManualNav] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const activeNav = isPuppiesPage
    ? "Puppies"
    : isHappyFamiliesPage
    ? "Happy families"
    : isHowItWorksPage
    ? "How it works"
    : isFaqPage
    ? "FAQ"
    : isContactPage
    ? "Visit & contact"
    : manualNav || "Home";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Puppies", href: "/puppies" },
    { label: "Happy families", href: "/happy-families" },
    { label: "How it works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
    { label: "Visit & contact", href: "/contact" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 15);

      if (currentScrollY > 100 && currentScrollY > lastScrollY + 5) {
        setIsHidden(true); // hide when scrolling down
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 80) {
        setIsHidden(false); // show when scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        id="site-header"
        data-scrolled={isScrolled ? "true" : "false"}
        data-hidden={isHidden ? "true" : "false"}
        className={`tp-header fixed inset-x-0 top-0 z-50 bg-[#fffdf8] transition-transform duration-300 ease-out ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Main Content Bar: Expanded height for prominent logo, readable links & solid buttons */}
        <div className="tp-header__bar gutter w-full h-[4.25rem] sm:h-[4.75rem] max-w-[110rem] mx-auto flex items-center justify-between relative z-10">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="tp-header__brand flex items-center gap-3 sm:gap-3.5 group shrink-0 text-decoration-none"
            aria-label="TeddyPups U.A.E. — home"
          >
            <div className="tp-header__logo relative w-12 h-12 sm:w-[52px] sm:h-[52px] lg:w-14 lg:h-14 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 shrink-0">
              <Image
                src={siteMetadata.logo}
                alt="TeddyPups logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="font-plush tp-header__name text-2xl sm:text-[1.65rem] lg:text-[1.75rem] font-bold text-[#2a170e] tracking-tight leading-none">
              TeddyPups
            </span>
          </Link>

          {/* Desktop Navigation Links: Increased font size, comfortable spacing & animated paw indicator */}
          <nav
            aria-label="Main"
            className="tp-header__nav hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8"
          >
            <ul className="flex items-center gap-6 xl:gap-8 2xl:gap-9">
              {navItems.map((item) => {
                const isActive = activeNav === item.label;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      data-active={isActive ? "true" : "false"}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setManualNav(item.label)}
                      className={`tp-nav-link text-[1.05rem] lg:text-[1.125rem] transition-colors duration-200 relative flex flex-col items-center justify-center py-2 px-1 group/link ${
                        isActive
                          ? "text-[#a24a1a] font-bold"
                          : "text-[#2a170e] font-semibold hover:text-[#a24a1a]"
                      }`}
                    >
                      <span>{item.label}</span>

                      {/* Active paw indicator or subtle hover preview */}
                      <svg
                        viewBox="0 0 64 64"
                        className={`tp-nav-link__paw absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 text-[#a24a1a] -rotate-[10deg] pointer-events-none transition-all duration-200 ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-50 group-hover/link:opacity-45 group-hover/link:scale-95"
                        }`}
                        aria-hidden="true"
                        fill="currentColor"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: Enhanced WhatsApp CTA button + Mobile Menu pill button */}
          <div className="tp-header__end flex items-center gap-3 shrink-0">
            <a
              href={siteMetadata.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp tp-header__wa bg-[#1f7a4d] hover:bg-[#1b6b43] text-white text-base lg:text-[1.05rem] font-bold py-2.5 px-6 lg:px-7 rounded-full shadow-[0_4px_0_0_#2a170e] hover:-translate-y-0.5 hover:rotate-1 active:translate-y-[2px] active:rotate-0 active:shadow-[0_1.5px_0_0_#2a170e] transition-all duration-200 hidden sm:inline-flex items-center justify-center whitespace-nowrap min-h-[2.85rem]"
            >
              <span>WhatsApp us</span>
            </a>

            {/* Mobile Menu Button: Pill with paw icon + readable text */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#2a170e] bg-[#fffdf8] hover:bg-[#faebd7] px-4.5 text-base font-bold text-[#2a170e] lg:hidden transition-colors shadow-[0_2px_0_0_#2a170e]"
              aria-haspopup="dialog"
              aria-label="Site menu"
            >
              <svg
                viewBox="0 0 64 64"
                className="size-4 text-[#2a170e]"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Scalloped hem SVG pattern with soft warm drop shadow matching reference */}
        <svg
          aria-hidden="true"
          className="tp-header__hem absolute top-[calc(100%-1px)] left-0 w-full h-[14px] pointer-events-none overflow-visible"
          width="100%"
          height="14"
          preserveAspectRatio="none"
          style={{
            filter:
              "drop-shadow(0 3px 3px rgba(42, 23, 14, 0.14)) drop-shadow(0 6px 10px rgba(42, 23, 14, 0.10))",
          }}
        >
          <defs>
            <pattern
              id="tp-hem"
              width="44"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0H44V2A22 11 0 0 1 0 2Z"
                className="tp-header__hem-fill"
                fill="#fffdf8"
              />
              <path
                d="M0 2A22 11 0 0 0 44 2"
                className="tp-header__hem-line"
                fill="none"
                stroke="#2a170e"
                strokeOpacity="0.18"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="14" fill="url(#tp-hem)" />
        </svg>
      </header>

      {/* Fullscreen Mobile Menu Dialog / Overlay */}
      <dialog
        aria-label="Site menu"
        open={isMenuOpen}
        className={`tp-menu fixed inset-0 z-[100] m-0 h-dvh max-h-none w-screen max-w-none bg-[#fbe3b4] p-0 text-[#2a170e] backdrop:bg-[#2a170e]/40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none hidden"
        }`}
      >
        <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 overflow-y-auto">
          {/* Top Row with 'where to, friend?' & Close button */}
          <div className="flex items-center justify-between">
            <span className="font-scrawl text-xl sm:text-2xl text-[#2a170e]">
              where to, friend?
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="h-11 rounded-full bg-[#2a170e] px-6 text-base font-bold text-[#fffdf8] hover:bg-[#4a2e1e] transition-colors shadow-[0_3px_0_0_rgba(42,23,14,0.3)] active:translate-y-[1px]"
            >
              Close
            </button>
          </div>

          {/* Navigation Links inside Mobile Drawer */}
          <nav aria-label="Mobile" className="my-auto py-8">
            <ul className="space-y-3">
              {navItems.map((item, index) => {
                const isActive = activeNav === item.label;
                return (
                  <li key={item.label}>
                    <Link
                      data-active={isActive ? "true" : "false"}
                      aria-current={isActive ? "page" : undefined}
                      className={`tp-menu-link font-plush block py-2 text-[clamp(2.4rem,10vw,3.4rem)] transition-colors flex items-center justify-between ${
                        isActive
                          ? "text-[#a24a1a] font-extrabold"
                          : "text-[#2a170e] hover:text-[#a24a1a]"
                      }`}
                      style={{ transitionDelay: `${index * 35}ms` }}
                      href={item.href}
                      onClick={() => {
                        setManualNav(item.label);
                        setIsMenuOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <svg
                          viewBox="0 0 64 64"
                          className="w-8 h-8 text-[#a24a1a] -rotate-[10deg] shrink-0 ml-3"
                          aria-hidden="true"
                          fill="currentColor"
                        >
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Actions inside Drawer */}
          <div className="space-y-3 pt-6 border-t border-[#2a170e]/15">
            <a
              href={siteMetadata.whatsappUrl}
              className="btn btn-whatsapp w-full bg-[#1f7a4d] hover:bg-[#1b6b43] text-white text-lg font-bold py-3.5 px-6 rounded-full text-center shadow-[0_4px_0_0_#2a170e] hover:-translate-y-0.5 active:translate-y-1 block"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              WhatsApp us
            </a>
            <p className="text-center text-base font-semibold text-[#5a3a28]">
              {siteMetadata.phone}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
