"use client";

import { useState } from "react";
import Image from "next/image";
import { siteMetadata } from "@/app/data/site-data";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    puppyId: "",
    message: "",
    website: "", // honeypot
  });

  const [phase, setPhase] = useState<"writing" | "posting" | "sent">("writing");
  const [bubbleText, setBubbleText] = useState("waiting for your letter! 🐾");
  const [showBubble, setShowBubble] = useState(false);

  const puppyOptions = [
    { value: "", label: "any puppy (not sure yet)" },
    { value: "4218427a-dd65-4b09-a089-584b912aa7ab", label: "Max (Maltipoo, boy)" },
    { value: "0abcf3f5-0080-44c1-b1e1-2a2de24a3cf4", label: "Korean Teacup Maltipoo (girl)" },
    { value: "c5d2cf3c-51e8-4ecf-ac94-97ef8fceb6ec", label: "Korean Teacup Poodle (girl)" },
    { value: "9cb7d6db-bf35-4e63-8e61-ca63e1925dbd", label: "Maltipoo & Cavapoo (boy)" },
    { value: "b39adb3f-eace-45af-a2e8-425de01ffc50", label: "Toy Poodle (boy & girl)" },
    { value: "027d7333-a8b2-49de-9bbc-9a47af88ebac", label: "Maltipoo (girl)" },
    { value: "ec3a42bf-bd62-46ba-962d-8f94f09715c5", label: "Pomeranian (girl)" },
    { value: "e486e544-f1fd-48f9-8ba0-f556d7ee44e7", label: "Copper (Cavapoo, boy)" },
    { value: "d2d146b2-6454-4e05-967a-87f2ab02946d", label: "Shih Tzu (girl)" },
    { value: "0fe92eee-1937-48e1-b48b-77292a6f25d8", label: "Shih Tzu (boy)" },
    { value: "0deaea0d-1c0e-4e85-868b-3c7376358e03", label: "Maltipoo (girl)" },
    { value: "cbfa8ebd-7e0c-4818-b0ec-144ede4d3352", label: "Maltipoo (girl)" },
    { value: "35d5e8bd-bebb-41c7-b0a9-256482edb3c8", label: "Korean Teacup Pomeranian (girl)" },
    { value: "9fd5c518-a1ce-46d4-b9a4-8fb9714717f4", label: "Korean Teacup Pomeranian (girl)" },
    { value: "e838ce49-59e0-4f3e-ab83-55cd2d98d2a2", label: "Korean Teacup Pomeranian (boy)" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // Honeypot trigger

    setPhase("posting");
    setBubbleText("posting letter... 💌");
    setShowBubble(true);

    setTimeout(() => {
      setPhase("sent");
      setBubbleText("letter received! woof! 🐾");
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      area: "",
      puppyId: "",
      message: "",
      website: "",
    });
    setPhase("writing");
    setBubbleText("waiting for your letter! 🐾");
    setShowBubble(false);
  };

  const selectedPuppyLabel =
    puppyOptions.find((p) => p.value === formData.puppyId)?.label ||
    "any puppy (not sure yet)";

  const directWhatsAppUrl = `https://wa.me/919898124987?text=${encodeURIComponent(
    `Hi TeddyPups! My name is ${formData.name || "a future puppy parent"}. I'm interested in ${selectedPuppyLabel}. ${formData.message ? `Note: ${formData.message}` : ""
    }`
  )}`;

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene w-full"
      style={{
        ["--sky-top" as string]: "#fff9ee",
        ["--sky-bottom" as string]: "#f9dca4",
      }}
      aria-labelledby="contact-title"
    >
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-28 md:pt-36">
        {/* Header */}
        <header className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-end">
          <h1
            id="contact-title"
            className="font-plush text-[clamp(2.75rem,7.5vw,9.5rem)] sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[145px] 2xl:text-[170px] text-[#2a170e] font-extrabold tracking-tight leading-[0.88] max-w-[10ch] lg:col-span-7"
          >
            <span className="block">Get in touch</span>
            <span className="block">with us</span>
          </h1>
          <p className="text-lg sm:text-lg lg:text-xl text-[#5a3a28] leading-relaxed font-normal lg:col-span-5 lg:pb-8 xl:pb-12">
            Have questions about our puppies or adoption process? Fill out the
            form, and our team will get back to you promptly. Whether ready to
            adopt or just seeking info, we&apos;d love to hear from you!
          </p>
        </header>

        {/* Content Grid */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Right Column (Col 6-12 on large screens): The Letter Form */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <div className="tp-post relative" data-phase={phase}>
              {phase === "sent" ? (
                <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#fbe3b4] border-2 border-[#2a170e] flex items-center justify-center text-3xl mb-4 shadow-sm">
                    💌
                  </div>
                  <h2 className="font-plush text-3xl sm:text-4xl text-[#2a170e] mb-3">
                    Letter posted!
                  </h2>
                  <p className="font-scrawl text-xl text-[#a24a1a] mb-4">
                    Dear {formData.name || "future puppy parent"},
                  </p>
                  <p className="text-[#5a3a28] max-w-md text-base sm:text-lg mb-8 leading-relaxed">
                    Thank you so much for reaching out! Teddy and our concierge team
                    have safely received your letter. We will be in touch with you shortly
                    at <span className="font-semibold text-[#2a170e]">{formData.phone || "your phone"}</span>.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp inline-flex items-center gap-2"
                    >
                      <span>Also open in WhatsApp</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-1.114-.067-.323-.102-.741-.248-1.3-.491-1.749-.759-2.887-2.529-2.975-2.645-.088-.117-.709-.942-.709-1.798s.445-1.277.604-1.452c.16-.175.348-.219.464-.219.116 0 .232.001.334.006.107.005.25.04.385.365.144.35.49 1.196.533 1.284.044.088.073.19.015.307-.058.117-.087.19-.174.292-.087.102-.184.228-.263.307-.088.087-.18.182-.077.357.102.175.456.753.978 1.218.673.599 1.24.785 1.415.872.175.088.277.073.379-.044.102-.117.436-.511.553-.686.117-.175.233-.146.393-.088.16.058 1.018.48 1.193.568.175.088.291.131.335.204.044.073.044.423-.1 1.028z" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-ghost border-2 border-[#2a170e] text-[#2a170e]"
                    >
                      Write another note
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="tp-letterform"
                >
                  {/* Decorative Postage Stamp in Top-Right Corner */}
                  <span aria-hidden="true" className="tp-letter__stamp">
                    <svg
                      viewBox="0 0 64 64"
                      className="size-9"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"></path>
                    </svg>
                  </span>

                  {/* Greeting */}
                  <p className="font-scrawl tp-letterform__greeting">
                    Dear TeddyPups,
                  </p>

                  {/* Line 1 */}
                  <p className="tp-letterform__line">
                    my name is{" "}
                    <span className="tp-blank" style={{ ["--size" as string]: "18ch" }}>
                      <input
                        aria-label="Your name (required)"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={80}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </span>
                    {" "}, and you can reach me on
                  </p>

                  {/* Line 2 */}
                  <p className="tp-letterform__line">
                    <span className="tp-blank" style={{ ["--size" as string]: "15ch" }}>
                      <input
                        aria-label="Phone or WhatsApp number with country code (required)"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="+971 50 123 4567"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </span>{" "}
                    or by email at{" "}
                    <span className="tp-blank" style={{ ["--size" as string]: "22ch" }}>
                      <input
                        aria-label="Email (optional)"
                        autoComplete="email"
                        placeholder="optional"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </span>
                    {" "}.
                  </p>

                  {/* Line 3 */}
                  <p className="tp-letterform__line">
                    I live in{" "}
                    <span className="tp-blank" style={{ ["--size" as string]: "14ch" }}>
                      <input
                        aria-label="Your area (optional)"
                        autoComplete="address-level2"
                        maxLength={80}
                        placeholder="e.g. Dubai Marina"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                      />
                    </span>
                    {" "}, and I&apos;m curious about
                  </p>

                  {/* Line 4 */}
                  <p className="tp-letterform__line">
                    <span className="tp-blank tp-blank--select">
                      <label htmlFor="_r_12_" className="sr-only">
                        Puppy you&apos;re interested in (optional)
                      </label>
                      <select
                        id="_r_12_"
                        name="puppyId"
                        value={formData.puppyId}
                        onChange={handleChange}
                      >
                        {puppyOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </span>
                    {" "}.
                  </p>

                  {/* Ruled Notebook Note */}
                  <div className="my-6">
                    <label htmlFor="_r_13_" className="sr-only">
                      Your message (optional)
                    </label>
                    <textarea
                      id="_r_13_"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      placeholder="Anything else you'd like to tell us…"
                      className="tp-letterform__note"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Anti-spam honeypot */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Website
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        name="website"
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  {/* Sign-off & Submit */}
                  <div className="tp-letterform__sign">
                    <p className="font-scrawl text-lg sm:text-xl text-[#5a3a28]">
                      with love, a future puppy parent
                    </p>
                    <button
                      type="submit"
                      disabled={phase === "posting"}
                      className="btn btn-primary"
                    >
                      {phase === "posting" ? "Posting..." : "Post my letter"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Pup Buddy Mascot waiting for the letter */}
            <div
              className="pup-buddy ml-auto mr-4 sm:mr-6 -mt-3 w-28 sm:w-36 md:w-40 relative group cursor-pointer"
              data-live=""
              data-facing="left"
              onMouseEnter={() => setShowBubble(true)}
              onMouseLeave={() => setShowBubble(false)}
            >
              <svg
                viewBox="0 0 300 240"
                style={{ overflow: "visible" }}
                role="img"
                aria-label="Teddy, waiting for your letter"
                focusable="false"
              >
                <g
                  data-p="root"
                  transform="translate(0.0 0) translate(150 0) scale(-1.000 1) translate(-150 0)"
                >
                  <ellipse
                    data-p="shadow"
                    cx="150"
                    cy="230"
                    rx="92"
                    ry="7"
                    fill="#2a170e"
                    opacity="0.12"
                    transform="translate(0 0) scale(1 1)"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center center 0px",
                    }}
                  />
                  <g
                    data-p="body"
                    transform="translate(0 -2.16) rotate(-24 196 206) translate(196 0) scale(1 1) translate(-196 0)"
                    opacity="1"
                  >
                    <g
                      data-p="bf"
                      transform="translate(94 192) rotate(0)"
                      opacity="0"
                    >
                      <path
                        d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                        fill="#e4a352"
                      />
                      <path
                        d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M-3.5 29 v5 M4.5 29 v5"
                        stroke="#2a170e"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                    <g data-p="ff" transform="translate(168 192) rotate(24)">
                      <path
                        d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                        fill="#e4a352"
                      />
                      <path
                        d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M-3.5 29 v5 M4.5 29 v5"
                        stroke="#2a170e"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                    <g data-p="tail" transform="rotate(47.76 84 150)">
                      <path
                        d="M86 152 C80 146 76 140 74 136"
                        stroke="#2a170e"
                        strokeWidth="9"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M86 152 C80 146 76 140 74 136"
                        stroke="#f2be6b"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </g>
                    <g
                      data-p="bn"
                      transform="translate(110 194) rotate(0)"
                      opacity="0"
                    >
                      <path
                        d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                        fill="#f2be6b"
                      />
                      <path
                        d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M-3.5 27 v5 M4.5 27 v5"
                        stroke="#2a170e"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                    <path
                      d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <g data-p="fn" transform="translate(186 194) rotate(24)">
                      <path
                        d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                        fill="#f2be6b"
                      />
                      <path
                        d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M-3.5 27 v5 M4.5 27 v5"
                        stroke="#2a170e"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  </g>
                  <g data-p="haunch" opacity="1" transform="translate(0 1.44)">
                    <path
                      d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M132 222v5M139 222v5"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <g
                    data-p="head"
                    transform="translate(-10 -6.24) rotate(2.4 212 100)"
                  >
                    <path
                      d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                      fill="#a24a1a"
                      stroke="#2a170e"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                      fill="#fbe3b4"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      data-p="earL"
                      d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                      fill="#e4a352"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      transform="rotate(0 174 82)"
                    />
                    <path
                      data-p="earR"
                      d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                      fill="#e4a352"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      transform="rotate(0 250 82)"
                    />
                    <path
                      d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                      fill="#fbe3b4"
                    />
                    <circle
                      cx="181"
                      cy="116"
                      r="7"
                      fill="#f9b9a6"
                      opacity="0.85"
                    />
                    <circle
                      cx="243"
                      cy="116"
                      r="7"
                      fill="#f9b9a6"
                      opacity="0.85"
                    />
                    <g data-p="eyes" transform="translate(2.1 -1.94)">
                      <g data-p="open" opacity="1">
                        <g data-p="blink" transform="translate(0 0) scale(1 1)">
                          <ellipse
                            cx="194"
                            cy="98"
                            rx="7.4"
                            ry="8.6"
                            fill="#2a170e"
                          />
                          <ellipse
                            cx="230"
                            cy="98"
                            rx="7.4"
                            ry="8.6"
                            fill="#2a170e"
                          />
                          <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                          <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                          <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                          <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                        </g>
                      </g>
                    </g>
                    <path
                      data-p="happy"
                      d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0"
                    />
                    <path
                      data-p="shut"
                      d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0"
                    />
                    <path
                      d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                      fill="#2a170e"
                    />
                    <path
                      d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                      stroke="#2a170e"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      data-p="tongue"
                      d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                      fill="#e98c8c"
                      stroke="#2a170e"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                      opacity="1"
                    />
                    <g data-p="mouth" opacity="0">
                      <path
                        d="M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z"
                        fill="#6b2a1c"
                        stroke="#2a170e"
                        strokeWidth="2.6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z"
                        fill="#e98c8c"
                      />
                    </g>
                  </g>
                  <g data-p="ledge" opacity="0">
                    <path
                      d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>
              {/* Floating speech bubble */}
              <span
                aria-hidden="true"
                className="pup-bubble"
                data-show={showBubble ? "true" : "false"}
              >
                {bubbleText}
              </span>
            </div>
          </div>

          {/* Left Column (Col 1-5 on large screens): WhatsApp, Phone, Email & Visit Showroom */}
          <div className="lg:col-span-5 lg:row-start-1 -mt-3">
            <a
              href={siteMetadata.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold py-3 px-6"
            >
              <span>WhatsApp +971 50 000 0000</span>
            </a>

            <dl className="mt-7 sm:mt-8 space-y-4 sm:space-y-4.5">
              <div>
                <dt className="font-scrawl text-[#8c7262] text-sm sm:text-[15px]">call us</dt>
                <dd className="mt-0.5 text-base sm:text-[1.125rem] font-semibold">
                  <a className="link-ink" href="tel:+971500000000">
                    +971 50 000 0000
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-scrawl text-[#8c7262] text-sm sm:text-[15px]">email</dt>
                <dd className="mt-0.5 break-all text-base sm:text-[1.125rem] font-semibold">
                  <a className="link-ink" href="mailto:info@instabizweb.com">
                    info@instabizweb.com
                  </a>
                </dd>
              </div>
            </dl>

            {/* Visit Us Shopfront Section */}
            <section
              aria-labelledby="visit-title"
              className="tp-shopfront mt-10 sm:mt-12"
            >

              {/* City skyline background SVG */}
              <svg
                viewBox="0 0 320 95"
                className="pointer-events-none absolute bottom-0 left-0 right-0 w-full text-[#e8ba94] opacity-80"
                aria-hidden="true"
              >
                <path
                  d="M0 92 h320 M140 92 V22 l3-4 v-10 l2-3 2 3 v10 l3 4 v70 M115 92 V52 h12 v40 M164 92 V44 h14 v48 M190 92 V62 h12 v30 M214 92 V36 h16 v56 M242 92 V56 h18 v36 M272 92 V70 h20 v22 M20 92 V66 h14 v26 M46 92 V46 h16 v46 M74 92 V62 h15 v30 M100 92 V74 h10 v18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative p-7 sm:p-9 md:p-10 pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[460px] sm:min-h-[500px]">
                <div className="sm:col-span-7 z-10 flex flex-col justify-center">
                  <h2
                    id="visit-title"
                    className="font-plush text-3xl sm:text-4xl md:text-[40px] font-bold leading-[1.08] text-[#2a170e]"
                  >
                    <span className="block">Visit us in</span>
                    <span className="block">Downtown Dubai</span>
                  </h2>
                  <p className="mt-4 max-w-[34ch] text-[#4a2c1b] text-base sm:text-lg md:text-[18px] leading-relaxed">
                    Step into our Downtown Dubai showroom and experience the
                    joy of choosing your puppy face-to-face.
                  </p>
                  <div className="mt-5 sm:mt-6 flex items-start gap-3">
                    <svg
                      viewBox="0 0 64 64"
                      className="size-5 sm:size-6 shrink-0 text-[#c2622b] mt-0.5"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                    <p className="font-semibold text-sm sm:text-base md:text-[17px] leading-snug text-[#2a170e]">
                      Downtown Dubai, United Arab<br />Emirates
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Downtown+Dubai+United+Arab+Emirates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 sm:mt-8 inline-block w-fit rounded-full bg-white px-7 sm:px-8 py-3 text-base sm:text-lg font-bold text-[#2a170e] border-[2px] border-[#2a170e] hover:bg-[#fffdf8] hover:-translate-y-0.5 active:translate-y-0 transition-transform transition-colors duration-200 shadow-none"
                  >
                    Open in Google Maps
                  </a>
                </div>

                {/* Arched Photo Frame of Showroom Puppy */}
                <div className="sm:col-span-5 flex justify-center sm:justify-end z-10 self-end">
                  <figure className="relative w-40 sm:w-48 md:w-56 aspect-[3/4.2] rounded-t-full rounded-b-none overflow-hidden border-[2.5px] border-[#2a170e] bg-[#685848]">
                    <Image
                      src="/media/showroom-puppy.jpg"
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      fill
                      sizes="(min-width: 640px) 14rem, 90vw"
                      className="object-cover object-[45.3%_44.4%]"
                      priority
                    />
                  </figure>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

