import siteDataJson from "./site-data.json";

export interface Puppy {
  id: string;
  name: string;
  displayName: string;
  breed: string;
  gender: string;
  genderLabel: string;
  age: string;
  color: string;
  status: string;
  imageUrl: string;
  alt: string;
  origin: string;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  color: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TrustStamp {
  id: string;
  title: string;
  description: string;
  color: string;
  tilt: string;
  icon: "health" | "plane" | "support" | "globe";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  puppy: string;
}

export const siteMetadata = {
  name: siteDataJson.meta.name,
  tagline: siteDataJson.meta.tagline,
  description: siteDataJson.meta.description,
  phone: siteDataJson.meta.phone,
  email: siteDataJson.meta.email,
  address: siteDataJson.meta.address,
  whatsappUrl: siteDataJson.meta.whatsappUrl,
  logo: siteDataJson.meta.logo,
};

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Puppies", href: "/puppies" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Why trust us", href: "#trust" },
  { label: "Happy families", href: "/happy-families" },
  { label: "FAQ", href: "/faq" },
  { label: "Visit & contact", href: "/contact" },
];

export const heroPuppies = (siteDataJson.puppies as Puppy[]).slice(0, 15);

export const heroData = {
  note: "every puppy is family",
  title: "Premium teacup puppies in Dubai",
  lede: "Teddy bear & teacup puppies, raised with tender love and care. Meet local puppies in our Downtown Dubai showroom, or bring home a rare breed imported with safe worldwide travel.",
  ctaPrimary: {
    label: "View available puppies",
    href: "#meet",
  },
  ctaSecondary: {
    label: "WhatsApp us",
    href: siteMetadata.whatsappUrl,
  },
  puppies: heroPuppies,
};

export const meetPuppiesData = {
  heading: "Meet the pups",
  body: "Real puppies, real photos, looking for their families right now.",
  ctaLabel: "See all available puppies",
  ctaHref: siteMetadata.whatsappUrl,
  puppies: siteDataJson.puppies as Puppy[],
};

export const waysData = {
  heading: "Two ways to meet your puppy",
  ways: [
    {
      id: "way-local",
      title: "Puppies in Dubai",
      badge: "In our showroom",
      description:
        "Meet puppies ready right now in our Downtown Dubai showroom. Spend time cuddling, playing, and bonding in person before bringing your puppy home the same day.",
      highlights: [
        "Downtown Dubai showroom visit",
        "Personal bonding & cuddle time",
        "Take home the very same day",
        "Full health certificate & vaccinations",
      ],
      image: "https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
      ctaText: "Book showroom visit",
      ctaHref: siteMetadata.whatsappUrl,
      accent: "#a24a1a",
    },
    {
      id: "way-imported",
      title: "Imported for you",
      badge: "Bespoke sourcing",
      description:
        "Looking for an ultra-rare teacup or a specific coat color? We partner with ethical, verified top breeders in South Korea and worldwide, escorting your dream puppy safely to Dubai.",
      highlights: [
        "Rare Korean teacups & designer lines",
        "Direct verified ethical breeders",
        "Safe climate-controlled international travel",
        "Complete passport, microchip & quarantine clearance",
      ],
      image: "https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
      ctaText: "Request custom puppy",
      ctaHref: siteMetadata.whatsappUrl,
      accent: "#1f7a4d",
    },
  ],
};

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  chat: ChatMessage[];
}

export const journeyData: {
  heading: string;
  body: string;
  steps: JourneyStep[];
} = {
  heading: "Your puppy journey",
  body: "A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.",
  steps: [
    {
      number: 1,
      title: "Choose your breed",
      description:
        "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
      chat: [
        {
          id: "m1",
          sender: "user",
          text: "Hi TeddyPups! We are looking for a tiny Korean Maltipoo puppy in Dubai 🐾",
          time: "10:14 AM",
        },
        {
          id: "m2",
          sender: "bot",
          text: "Hello! Welcome to TeddyPups UAE ❤️ We'd love to help you find your dream puppy. We currently have adorable Maltipoo babies in our Downtown showroom and new Korean teacups arriving this week!",
          time: "10:15 AM",
        },
      ],
    },
    {
      number: 2,
      title: "Get photos & details",
      description:
        "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
      chat: [
        {
          id: "m3",
          sender: "bot",
          text: "Here is little Max! 🧸 He is 3 months old, hypoallergenic, fully vet-checked, and weighs just 900g. Here is his up-to-date photo:",
          time: "10:18 AM",
          imageUrl: "https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
        },
        {
          id: "m4",
          sender: "user",
          text: "Oh my goodness, he is so precious! Can we come meet him in person today?",
          time: "10:20 AM",
        },
      ],
    },
    {
      number: 3,
      title: "Secure & safe delivery",
      description:
        "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
      chat: [
        {
          id: "m5",
          sender: "bot",
          text: "Showroom appointment confirmed for 4:00 PM today! We've prepared his welcome basket, vet passport, vaccination card, and premium starter food. 🚗✨",
          time: "10:22 AM",
        },
        {
          id: "m6",
          sender: "user",
          text: "We can't wait to welcome him into our family! Thank you so much TeddyPups! 🎉❤️",
          time: "10:25 AM",
        },
      ],
    },
  ],
};

export const trustStamps: TrustStamp[] = [
  {
    id: "stamp-1",
    title: "Vet-checked & healthy",
    description: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.",
    color: "#a24a1a",
    tilt: "-8deg",
    icon: "health",
  },
  {
    id: "stamp-2",
    title: "Korea to Dubai, safely",
    description: "Trusted breeders, safe travel, and premium care from start to finish.",
    color: "#1f6b45",
    tilt: "5deg",
    icon: "plane",
  },
  {
    id: "stamp-3",
    title: "Support 24/7",
    description: "Always here to help, from choosing your puppy to post-delivery support.",
    color: "#5a3a28",
    tilt: "-4deg",
    icon: "support",
  },
  {
    id: "stamp-4",
    title: "Trusted by families worldwide",
    description: "Puppies delivered to loving homes all around the world.",
    color: "#c2622b",
    tilt: "7deg",
    icon: "globe",
  },
];

export const happyFamiliesData = {
  heading: "Happy families & puppies",
  body: "We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.",
  ctaLabel: "See every happy family",
  ctaHref: siteMetadata.whatsappUrl,
  testimonials: [
    {
      id: "t1",
      name: "Sarah & Rashid",
      location: "Downtown Dubai",
      rating: 5,
      quote:
        "Our teacup Maltipoo brings so much happiness into our home every single day. The TeddyPups team made the whole adoption process effortless, loving, and completely transparent.",
      puppy: "Max, Maltipoo",
    },
    {
      id: "t2",
      name: "Elena K.",
      location: "Palm Jumeirah",
      rating: 5,
      quote:
        "The veterinary health certificate, safe arrival from Korea, and 24/7 aftercare guidance were unmatched. TeddyPups is truly the gold standard for puppies in the UAE.",
      puppy: "Mimi, Teacup Pomeranian",
    },
    {
      id: "t3",
      name: "Ahmed Al Mansoori",
      location: "Abu Dhabi",
      rating: 5,
      quote:
        "From our first WhatsApp message to seeing the puppy playing happily with our children, it felt like family. Highly recommend to anyone looking for a healthy puppy.",
      puppy: "Teddy, Cavapoo",
    },
  ] as Testimonial[],
  photos: siteDataJson.photos as GalleryPhoto[],
};

export const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "Are your puppies vaccinated and health-checked?",
    answer:
      "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
  },
  {
    id: "faq-2",
    question: "Can I meet a puppy before I decide?",
    answer:
      "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
  },
  {
    id: "faq-3",
    question: "Can I take my puppy home the same day?",
    answer:
      "Local puppies are available immediately, so you can take your puppy home the same day.",
  },
  {
    id: "faq-4",
    question: "How does the imported puppy process work?",
    answer:
      "We work directly with certified ethical breeders in South Korea and worldwide. We handle all government health certifications, pet-safe travel, and UAE customs quarantine so your puppy arrives safely in top health.",
  },
  {
    id: "faq-5",
    question: "What aftercare and puppy support do you provide?",
    answer:
      "We provide 24/7 concierge WhatsApp support for feeding guides, toilet training advice, recommended veterinarians, and lifetime breed advice.",
  },
  {
    id: "faq-6",
    question: "What breeds do you specialize in?",
    answer:
      "We specialize in miniature and teacup breeds, including Maltipoo, Pomeranian, Cavapoo, Poodle, and Shih Tzu, all raised with love and gentle socialization.",
  },
];

export const ctaData = {
  heading: "Ready to meet your new best friend?",
  lede: "Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.",
  ctaWhatsApp: "Enquire on WhatsApp",
  ctaContact: "Visit & contact",
};

export const footerData = {
  name: "TeddyPups U.A.E.",
  tagline: "every puppy is family",
  exploreLinks: [
    { label: "Home", href: "/" },
    { label: "Puppies", href: "/puppies" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Why trust us", href: "/#trust" },
    { label: "Happy families", href: "/happy-families" },
    { label: "FAQ", href: "/#faq" },
  ],
  contact: {
    whatsapp: "+971 50 000 0000",
    whatsappUrl: siteMetadata.whatsappUrl,
    email: siteMetadata.email,
    location: siteMetadata.address,
  },
  social: [
    { name: "Instagram", url: "https://www.instabizweb.com/" },
    { name: "TikTok", url: "https://www.instabizweb.com/" },
    { name: "Facebook", url: "https://www.instabizweb.com/" },
  ],
};
