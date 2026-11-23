export interface SketchDoodle {
  type: "whiskers" | "paw" | "heart" | "sparkle" | "curl" | "dots";
  transform: string;
  stroke?: string;
  fill?: string;
}

export interface AvailablePuppy {
  id: string;
  name: string;
  breed: string;
  gender: "male" | "female" | "both";
  genderLabel: string;
  age: string;
  origin: "Imported" | "Showroom";
  hasVideo: boolean;
  videoUrl?: string;
  imageUrl: string;
  alt: string;
  tilt: string;
  wash: string;
  washTranslate: string;
  ringVariant?: "v1" | "v2" | "v3";
  doodles: SketchDoodle[];
  slug: string;
}

export interface GoneHomePuppy {
  id: string;
  name: string;
  imageUrl: string;
  alt: string;
  breed?: string;
}

// 15 Available Puppies with exact specific doodles from the reference sketchbook layout (Screenshot 3)
// Notice: Sparse, harmonious placement with zero overlapping paw prints across adjacent cards
export const availablePuppiesList: AvailablePuppy[] = [
  // --- ROW 1 ---
  {
    id: "max",
    name: "Max",
    breed: "Maltipoo",
    gender: "male",
    genderLabel: "Maltipoo · boy · 3 months",
    age: "3 months",
    origin: "Showroom",
    hasVideo: true,
    videoUrl: "https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4",
    imageUrl: "https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
    alt: "Max, male Maltipoo puppy",
    tilt: "0.36deg",
    wash: "#f2be6b",
    washTranslate: "-4% 4.9%",
    doodles: [
      { type: "curl", transform: "translate(-7.0, 64.1) rotate(-9) scale(0.85)", stroke: "#c2622b" },
      { type: "paw", transform: "translate(6.7, 16.0) rotate(-10) scale(0.95)", fill: "#d4893f" },
    ],
    slug: "max-maltipoo-male",
  },
  {
    id: "korean-teacup-maltipoo",
    name: "Korean Teacup Maltipoo",
    breed: "Korean Teacup Maltipoo",
    gender: "female",
    genderLabel: "girl · 2 months",
    age: "2 months",
    origin: "Imported",
    hasVideo: true,
    videoUrl: "https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4",
    imageUrl: "https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    alt: "Female Korean Teacup Maltipoo puppy",
    tilt: "-0.71deg",
    wash: "#bfddf5",
    washTranslate: "-1.3% 6.1%",
    // Card 2: 2 dots at top, single paw print at lower-left (between Card 1 and 2)
    doodles: [
      { type: "dots", transform: "translate(50, 2)", fill: "#2a170e" },
      { type: "paw", transform: "translate(5, 76) rotate(16) scale(0.8)", fill: "#2a170e" },
    ],
    slug: "korean-teacup-maltipoo-female",
  },
  {
    id: "korean-teacup-poodle",
    name: "Korean Teacup Poodle",
    breed: "Korean Teacup Poodle",
    gender: "female",
    genderLabel: "girl · 2 months",
    age: "2 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
    alt: "Female Korean Teacup Poodle puppy",
    tilt: "1.1deg",
    wash: "#c6ebd0",
    washTranslate: "2% -3%",
    // Card 3: 1 sparkle star at left (between Card 2 and 3), 2 dots at top, 3 whiskers at right
    doodles: [
      { type: "sparkle", transform: "translate(3, 48) scale(0.85)", fill: "#c2622b" },
      { type: "dots", transform: "translate(50, 2)", fill: "#2a170e" },
      { type: "whiskers", transform: "translate(97, 48) rotate(12) scale(0.85)", stroke: "#a24a1a" },
    ],
    slug: "korean-teacup-poodle-female",
  },
  {
    id: "maltipoo-cavapoo",
    name: "Maltipoo & Cavapoo",
    breed: "Maltipoo & Cavapoo",
    gender: "male",
    genderLabel: "boy · 3 months Maltipoo & 2 months Cavapoo",
    age: "3 months & 2 months",
    origin: "Imported",
    hasVideo: true,
    videoUrl: "https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4",
    imageUrl: "https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
    alt: "Maltipoo & Cavapoo puppy brothers",
    tilt: "-1.3deg",
    wash: "#fcd6cb",
    washTranslate: "-3% 5%",
    // Card 4: 1 heart outline at top-left (between Card 3 and 4)
    doodles: [
      { type: "heart", transform: "translate(10, 26) rotate(-18) scale(0.85)", stroke: "#2a170e" },
    ],
    slug: "maltipoo-cavapoo-boys",
  },
  {
    id: "toy-poodle",
    name: "Toy Poodle",
    breed: "Toy Poodle",
    gender: "both",
    genderLabel: "boy & girl · 2 months",
    age: "2 months",
    origin: "Showroom",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    alt: "Toy Poodle puppies",
    tilt: "0.8deg",
    wash: "#bfddf5",
    washTranslate: "-5% 6%",
    ringVariant: "v1",
    // Matches Screenshot 2: sparkle star + dots on left, paw + dots on right
    doodles: [
      { type: "sparkle", transform: "translate(-6, 48) scale(0.85)", fill: "#c2622b" },
      { type: "dots", transform: "translate(10, 20) rotate(-15)", fill: "#a24a1a" },
      { type: "dots", transform: "translate(95, 62) rotate(15)", fill: "#a24a1a" },
      { type: "paw", transform: "translate(98, 48) rotate(14) scale(0.8)", fill: "#2a170e" },
    ],
    slug: "toy-poodle-boy-girl",
  },

  // --- ROW 2 ---
  {
    id: "maltipoo-girl-3",
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "female",
    genderLabel: "girl · 3 months",
    age: "3 months",
    origin: "Imported",
    hasVideo: true,
    videoUrl: "https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4",
    imageUrl: "https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
    alt: "Maltipoo female puppy 3 months",
    tilt: "-1.0deg",
    wash: "#bfddf5",
    washTranslate: "0% 6%",
    ringVariant: "v2",
    // Matches Screenshot 2: whiskers + sparkle on right side
    doodles: [
      { type: "whiskers", transform: "translate(98, 56) rotate(12) scale(0.85)", stroke: "#a24a1a" },
      { type: "sparkle", transform: "translate(99, 36) scale(0.85)", fill: "#c2622b" },
    ],
    slug: "maltipoo-girl-3-months",
  },
  {
    id: "pomeranian",
    name: "Pomeranian",
    breed: "Pomeranian",
    gender: "female",
    genderLabel: "girl · 3 months",
    age: "3 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    alt: "Pomeranian female puppy",
    tilt: "0.6deg",
    wash: "#fae0cc",
    washTranslate: "-5% 5%",
    ringVariant: "v2",
    // Matches Screenshot 2: heart at top-left
    doodles: [
      { type: "heart", transform: "translate(8, 14) rotate(-16) scale(0.9)", stroke: "#2a170e" },
      { type: "paw", transform: "translate(98, 62) rotate(12) scale(0.8)", fill: "#2a170e" },
    ],
    slug: "pomeranian-girl-3-months",
  },
  {
    id: "copper",
    name: "Copper",
    breed: "Cavapoo",
    gender: "male",
    genderLabel: "Cavapoo · boy · 2 months",
    age: "2 months",
    origin: "Showroom",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg",
    alt: "Copper, Cavapoo puppy boy",
    tilt: "-0.85deg",
    wash: "#fae7cf",
    washTranslate: "0% 6%",
    ringVariant: "v3",
    // Matches Screenshot 2: sparkle at left, dots at right
    doodles: [
      { type: "sparkle", transform: "translate(-4, 34) scale(0.85)", fill: "#c2622b" },
      { type: "dots", transform: "translate(98, 52) rotate(15)", fill: "#a24a1a" },
    ],
    slug: "copper-cavapoo-boy",
  },
  {
    id: "shih-tzu-girl",
    name: "Shih Tzu",
    breed: "Shih Tzu",
    gender: "female",
    genderLabel: "girl · 2 months",
    age: "2 months",
    origin: "Showroom",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
    alt: "Shih Tzu girl puppy",
    tilt: "0.95deg",
    wash: "#fcd8c9",
    washTranslate: "2% 4%",
    // Card 9: 2 dots at top-left
    doodles: [
      { type: "dots", transform: "translate(16, 16) rotate(-15)", fill: "#a24a1a" },
    ],
    slug: "shih-tzu-girl-2-months",
  },
  {
    id: "shih-tzu-boy",
    name: "Shih Tzu",
    breed: "Shih Tzu",
    gender: "male",
    genderLabel: "boy · 2 months",
    age: "2 months",
    origin: "Showroom",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg",
    alt: "Shih Tzu boy puppy",
    tilt: "-0.6deg",
    wash: "#fae7cf",
    washTranslate: "-1.5% 5%",
    // Card 10: 1 heart outline at left (between C9 and C10), 1 paw print on outer right edge
    doodles: [
      { type: "heart", transform: "translate(4, 50) rotate(-12) scale(0.85)", stroke: "#2a170e" },
      { type: "paw", transform: "translate(97, 50) rotate(10) scale(0.8)", fill: "#2a170e" },
    ],
    slug: "shih-tzu-boy-2-months",
  },

  // --- ROW 3 ---
  {
    id: "maltipoo-girl-2-5",
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "female",
    genderLabel: "girl · 2.5 months",
    age: "2.5 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg",
    alt: "Maltipoo female puppy 2.5 months",
    tilt: "1.2deg",
    wash: "#c8ebd1",
    washTranslate: "3% -2%",
    // Card 11: 2 dots at top-left, 3 whiskers at left, curl at bottom-left
    doodles: [
      { type: "dots", transform: "translate(14, 18) rotate(-20)", fill: "#a24a1a" },
      { type: "whiskers", transform: "translate(3, 46) rotate(-14) scale(0.85)", stroke: "#a24a1a" },
      { type: "curl", transform: "translate(5, 78) rotate(10) scale(0.9)", stroke: "#a24a1a" },
    ],
    slug: "maltipoo-girl-2-5-months",
  },
  {
    id: "maltipoo-girl-2",
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "female",
    genderLabel: "girl · 2 months",
    age: "2 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg",
    alt: "Maltipoo female puppy 2 months",
    tilt: "-1.1deg",
    wash: "#bfddf5",
    washTranslate: "-2% 5%",
    // Card 12: 2 dots at top, 1 paw print at lower-left (between C11 and C12)
    doodles: [
      { type: "dots", transform: "translate(50, 2)", fill: "#2a170e" },
      { type: "paw", transform: "translate(5, 76) rotate(16) scale(0.8)", fill: "#2a170e" },
    ],
    slug: "maltipoo-girl-2-months",
  },
  {
    id: "korean-teacup-pom-1",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    gender: "female",
    genderLabel: "girl · 2 months",
    age: "2 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg",
    alt: "Female Korean Teacup Pomeranian puppy",
    tilt: "0.8deg",
    wash: "#fad8d8",
    washTranslate: "2.5% 3%",
    // Card 13: 1 sparkle star at left, 2 dots at top, 3 whiskers at right
    doodles: [
      { type: "sparkle", transform: "translate(3, 48) scale(0.85)", fill: "#c2622b" },
      { type: "dots", transform: "translate(50, 2)", fill: "#2a170e" },
      { type: "whiskers", transform: "translate(97, 48) rotate(12) scale(0.85)", stroke: "#a24a1a" },
    ],
    slug: "korean-teacup-pomeranian-female-white",
  },
  {
    id: "korean-teacup-pom-2",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    gender: "female",
    genderLabel: "girl · 2 months",
    age: "2 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg",
    alt: "Female Korean Teacup Pomeranian puppy",
    tilt: "-0.75deg",
    wash: "#fae6cb",
    washTranslate: "-2% 4%",
    // Card 14: 1 heart outline at top-left
    doodles: [
      { type: "heart", transform: "translate(10, 26) rotate(-18) scale(0.85)", stroke: "#2a170e" },
    ],
    slug: "korean-teacup-pomeranian-female-cream",
  },
  {
    id: "korean-teacup-pom-3",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    gender: "male",
    genderLabel: "boy · 2 months",
    age: "2 months",
    origin: "Imported",
    hasVideo: false,
    imageUrl: "https://puppy.instabizweb.com/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg",
    alt: "Male Korean Teacup Pomeranian puppy",
    tilt: "1.0deg",
    wash: "#fae0cc",
    washTranslate: "2% -3%",
    // Card 15: 2 dots at top-left, 1 paw print on outer right edge facing margin
    doodles: [
      { type: "dots", transform: "translate(14, 18) rotate(-15)", fill: "#a24a1a" },
      { type: "paw", transform: "translate(97, 50) rotate(14) scale(0.8)", fill: "#2a170e" },
    ],
    slug: "korean-teacup-pomeranian-male",
  },
];

export const goneHomePuppiesList: GoneHomePuppy[] = [
  {
    id: "ace",
    name: "Ace",
    imageUrl: "https://puppy.instabizweb.com/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg",
    alt: "Ace, white teacup puppy gone home",
    breed: "Pomeranian",
  },
  {
    id: "leo",
    name: "Leo",
    imageUrl: "https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
    alt: "Leo, teacup puppy gone home",
    breed: "Poodle",
  },
  {
    id: "mia",
    name: "Mia",
    imageUrl: "https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    alt: "Mia, maltipoo puppy gone home",
    breed: "Maltipoo",
  },
  {
    id: "sadie",
    name: "Sadie",
    imageUrl: "https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
    alt: "Sadie, maltipoo puppy gone home",
    breed: "Maltipoo",
  },
  {
    id: "pomeranian",
    name: "Pomeranian",
    imageUrl: "https://puppy.instabizweb.com/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    alt: "Pomeranian puppy gone home",
    breed: "Pomeranian",
  },
];
