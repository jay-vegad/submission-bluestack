---
name: TeddyPups U.A.E.
url: https://puppy.instabizweb.com/
colors:
  primary: "#a24a1a"
  primary-hover: "#8e3f15"
  secondary: "#1f7a4d"
  secondary-hover: "#1f6b45"
  background: "#fffdf8"
  background-tint: "#fbe3b4"
  background-subtle: "#e8dfd3"
  text-primary: "#2a170e"
  text-secondary: "#5a3a28"
  text-inverse: "#fffdf8"
  text-whatsapp: "#ffffff"
  border-light: "#e8dfd3"
  border-dark: "#e8d8c8"
  accent-honey: "#f2be6b"
  accent-toffee: "#c2622b"
  accent-orange: "#d4893f"
  dark-surface: "#3b2215"
  dark-surface-alt: "#080808"
  dark-text: "#fffdf8"
typography:
  display:
    family: "Fraunces"
    size: 96px
    weight: 400
    line-height: 1.2
  heading-1:
    family: "Fraunces"
    size: 34px
    weight: 400
    line-height: 1.2
  heading-2:
    family: "Fraunces"
    size: 29px
    weight: 400
    line-height: 1.2
  body:
    family: "Figtree"
    size: 17px
    weight: 400
    line-height: 1.5
  body-sm:
    family: "Figtree"
    size: 15px
    weight: 400
    line-height: 1.5
  caption:
    family: "Figtree"
    size: 14px
    weight: 400
    line-height: 1.5
  decorative:
    family: "Shantell Sans"
    size: 17px
    weight: 400
    line-height: 1.5
  code:
    family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    size: 14px
    weight: 400
    line-height: 1.5
spacing:
  base: 4px
  scale: [0, 4, 8, 12, 16, 20, 24, 32]
radius:
  xs: 1px
  sm: 8px
  md: 16px
  lg: 50px
  full: 999px
elevation:
  card-default: "rgba(42, 23, 14, 0.2) 2px 3px 0px 0px"
  card-inset: "rgba(42, 23, 14, 0.08) 0px 0px 0px 1px inset"
  button-active: "rgb(42, 23, 14) 0px 8px 0px -2.4px"
  button-focus-inset: "rgb(255, 253, 248) 0px 0px 0px 4px inset"
  card-hover: "rgba(42, 23, 14, 0.25) 0px 7px 0px -3px"
motion:
  duration-fast: "0.16s"
  duration-base: "0.2s"
  duration-medium: "0.3s"
  duration-slow: "0.48s"
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  easing-silk: "cubic-bezier(0.22, 1, 0.36, 1)"
  easing-pounce: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  easing-snap: "cubic-bezier(0.7, 0, 0.2, 1)"
components:
  button-primary:
    bg: "{colors.primary}"
    text: "{colors.text-inverse}"
    border: "{colors.text-inverse}"
    radius: "{radius.full}"
    padding: "13.6px 25.6px"
    font-weight: 650
    font-size: 17px
  button-secondary:
    bg: "{colors.secondary}"
    text: "{colors.text-whatsapp}"
    border: "{colors.text-whatsapp}"
    radius: "{radius.full}"
    padding: "9.6px 21.6px"
    font-weight: 650
    font-size: 15.2px
  button-ghost:
    bg: "transparent"
    text: "{colors.text-primary}"
    border: "{colors.text-primary}"
    radius: "{radius.full}"
    padding: "13.6px 25.6px"
    font-weight: 650
    font-size: 17px
  card-door:
    bg: "{colors.primary}" # Varies by door
    text: "{colors.text-inverse}"
    radius: "{radius.lg}"
    shadow: "{elevation.card-default}"
layout:
  container-sm: "24rem"
  container-md: "28rem"
  container-3xl: "48rem"
  container-4xl: "56rem"
  container-5xl: "64rem"
  container-6xl: "72rem"
breakpoints:
  mobile-sm: 639px
  mobile-lg: 767px
  tablet: 1023px
  desktop: 1024px
  desktop-lg: 1280px # (inferred from common desktop breakpoints)
---

# Design System Inspired by TeddyPups U.A.E.

## 1. Visual Theme & Atmosphere

TeddyPups U.A.E. presents a warm, inviting, and playful aesthetic, centered around a rich palette of earthy tones and soft neutrals. The primary background is a creamy `#fffdf8`, providing a clean canvas for the deep `#2a170e` text and vibrant accents like the `#a24a1a` primary call-to-action buttons and the fresh `#1f7a4d` WhatsApp button. Generous whitespace and a clear visual hierarchy ensure readability, while playful, hand-drawn illustrations and puppy photography infuse the brand with an approachable, friendly character.

The design system incorporates a distinct "physical" feel through prominent, often offset, box-shadows such as `rgba(42, 23, 14, 0.2) 2px 3px 0px 0px`, giving elements a sticker-like or raised appearance. Headings set in the `Fraunces` serif typeface, combined with the clean `Figtree` sans-serif for body text, establish a balance between classic charm and modern legibility. Subtle CSS animations, like the `tp-curtain-lift` and `tp-runner-x` keyframes, add dynamic, playful micro-interactions that enhance the user experience without being distracting.

**Key Characteristics**

- Warm, earthy color palette with `#fffdf8` and `#2a170e`.
- Playful `Fraunces` serif headings and clean `Figtree` body text.
- Prominent, offset shadows like `rgba(42, 23, 14, 0.2) 2px 3px 0px 0px`.
- Hand-drawn illustrations and high-quality puppy photography.
- Generous use of spacing, with a base of `4px`.
- Rounded corners, notably `999px` for buttons and `50px` for cards.
- Subtle, engaging CSS keyframe animations for interactive elements.

## 2. Color Palette & Roles

The TeddyPups U.A.E. color palette is built around warm, inviting tones that evoke comfort and playfulness, balanced with deep, rich neutrals for strong readability.

- **Primary**: `primary: #a24a1a` (Deep Orange) — Used for primary calls-to-action, prominent buttons like "View available puppies", and key interactive elements.
- **Primary Hover**: `primary-hover: #8e3f15` (Darker Orange) — A slightly darker shade of the primary color, used for the hover state of primary buttons.
- **Secondary**: `secondary: #1f7a4d` (Forest Green) — Employed for the "WhatsApp us" call-to-action, providing a distinct, actionable alternative.
- **Secondary Hover**: `secondary-hover: #1f6b45` (Darker Forest Green) — A darker shade of the secondary color, used for the hover state of secondary buttons.
- **Background**: `background: #fffdf8` (Creamy White) — The main page background color, providing a soft, clean canvas.
- **Background Tint**: `background-tint: #fbe3b4` (Soft Honey) — Used for subtle section backgrounds and highlighted areas, adding warmth.
- **Background Subtle**: `background-subtle: #e8dfd3` (Light Beige) — A very light, neutral tone used for subtle borders or separators, like the floor line under the puppy doors.
- **Text Primary**: `text-primary: #2a170e` (Deep Cocoa) — The main color for headings, body text, and strong textual elements, ensuring high contrast on light backgrounds.
- **Text Secondary**: `text-secondary: #5a3a28` (Cocoa Soft) — A slightly lighter, muted brown used for secondary text, descriptions, and less prominent content.
- **Text Inverse**: `text-inverse: #fffdf8` (Creamy White) — Used for text placed on primary, secondary, or dark backgrounds to ensure readability.
- **Text WhatsApp**: `text-whatsapp: #ffffff` (Pure White) — Specifically used for text on the WhatsApp button, ensuring maximum contrast.
- **Border Light**: `border-light: #e8dfd3` (Light Beige) — Used for subtle structural borders and dividers on light backgrounds.
- **Border Dark**: `border-dark: #e8d8c8` (Light Brown) — Used for borders within dark sections, providing a gentle separation.
- **Accent Honey**: `accent-honey: #f2be6b` (Honey Yellow) — A bright, warm accent used for focus rings and occasional highlights.
- **Accent Toffee**: `accent-toffee: #c2622b` (Toffee Brown) — A rich, warm brown used for specific accents and interactive states, like navigation link hovers.
- **Accent Orange**: `accent-orange: #d4893f` (Warm Orange) — Used for minor decorative elements or subtle highlights.
- **Dark Surface**: `dark-surface: #3b2215` (Dark Brown) — The background color for the footer and other dark sections, creating a cozy, grounded feel.
- **Dark Surface Alt**: `dark-surface-alt: #080808` (Near Black) — An alternative very dark background, used sparingly for deep contrast.
- **Dark Text**: `dark-text: #fffdf8` (Creamy White) — The primary text color used on dark backgrounds, ensuring high visibility.

## 3. Typography Rules

The typography system combines a distinctive serif for headings with a clean, modern sans-serif for body text, creating a friendly yet professional tone.

- **Font Family**:
  - Primary Headings: `'Fraunces', 'Fraunces Fallback', serif`
  - Body Text: `'Figtree', 'Figtree Fallback', ui-sans-serif, system-ui, sans-serif`
  - Decorative Text: `'Shantell Sans', 'Shantell Sans Fallback', ui-rounded, "Comic Sans MS", cursive`
  - Monospace: `'ui-monospace', SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

- **Hierarchy**:
  - **Display**: `Fraunces` `96px` `400` · line-height `1.2` · tracking `none` · Used for hero headlines, capturing immediate attention.
  - **H1**: `Fraunces` `34px` `400` · line-height `1.2` · tracking `none` · Major section titles, establishing clear content blocks.
  - **H2**: `Fraunces` `29px` `400` · line-height `1.2` · tracking `none` · Secondary section titles, providing sub-hierarchy.
  - **Body**: `Figtree` `17px` `400` · line-height `1.5` · tracking `none` · Standard paragraph text, optimized for readability.
  - **Body Small**: `Figtree` `15px` `400` · line-height `1.5` · tracking `none` · Used for descriptions, meta-information, and less prominent text.
  - **Caption**: `Figtree` `14px` `400` · line-height `1.5` · tracking `none` · Smallest functional text, e.g., legal notes or timestamps.
  - **Decorative**: `Shantell Sans` `17px` `400` · line-height `1.5` · tracking `none` · Applied to playful elements like "every puppy is family" or "Available" tags.
  - **Code/Mono**: `ui-monospace` `14px` `400` · line-height `1.5` · tracking `none` · For code snippets or fixed-width content.

- **Principles**:
  - Headings leverage the `Fraunces` serif for character and visual weight, always set at `400` weight for a consistent, inviting feel.
  - Body text utilizes `Figtree` at `17px` with `1.5` line height to ensure optimal readability and a modern aesthetic.
  - Decorative text, like the "Available" tags, employs `Shantell Sans` to introduce a hand-drawn, whimsical touch.
  - Text color for primary content on light backgrounds should always be `{colors.text-primary}` (`#2a170e`) for strong contrast.
  - Interactive elements like buttons and navigation links use `Figtree` with a `650` font weight for emphasis and clarity.

## 4. Component Stylings

### Buttons

Buttons feature highly rounded corners and distinct shadow effects, giving them a tactile, sticker-like appearance. All buttons include a `0.2s` `cubic-bezier(0.4, 0, 0.2, 1)` transition for smooth feedback.

#### Primary Button

A prominent call-to-action button with a deep orange background and a subtle border.

```css
.button-primary {
  background-color: var(--color-primary, #a24a1a);
  color: var(--color-text-inverse, #fffdf8);
  font-family: var(--typography-body-family, "Figtree");
  font-size: 17px;
  font-weight: 650;
  padding: 13.6px 25.6px;
  border: 1px solid var(--color-text-inverse, #fffdf8);
  border-radius: var(--radius-full, 999px);
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
  cursor: pointer;
  transition:
    background-color var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)),
    box-shadow var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.button-primary:hover {
  background-color: var(
    --color-primary-hover,
    #8e3f15
  ); /* inferred from screenshot */
  box-shadow: var(
    --elevation-card-hover,
    rgba(42, 23, 14, 0.25) 0px 7px 0px -3px
  );
}

.button-primary:active {
  background-color: var(
    --color-primary-hover,
    #8e3f15
  ); /* inferred from screenshot */
  box-shadow: var(
    --elevation-button-active,
    rgb(42, 23, 14) 0px 8px 0px -2.4px
  );
  transform: translateY(2px); /* inferred from screenshot */
}

.button-primary:disabled {
  background-color: var(
    --color-primary,
    #a24a1a
  ); /* inferred from screenshot */
  opacity: 0.6; /* inferred from screenshot */
  cursor: not-allowed;
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
}
```

#### Secondary Button (WhatsApp)

A distinct green button for WhatsApp actions, ensuring high visibility.

```css
.button-secondary {
  background-color: var(--color-secondary, #1f7a4d);
  color: var(--color-text-whatsapp, #ffffff);
  font-family: var(--typography-body-family, "Figtree");
  font-size: 15.2px;
  font-weight: 650;
  padding: 9.6px 21.6px;
  border: 1px solid var(--color-text-whatsapp, #ffffff);
  border-radius: var(--radius-full, 999px);
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
  cursor: pointer;
  transition:
    background-color var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)),
    box-shadow var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.button-secondary:hover {
  background-color: var(
    --color-secondary-hover,
    #1f6b45
  ); /* inferred from screenshot */
  box-shadow: var(
    --elevation-card-hover,
    rgba(42, 23, 14, 0.25) 0px 7px 0px -3px
  );
}

.button-secondary:active {
  background-color: var(
    --color-secondary-hover,
    #1f6b45
  ); /* inferred from screenshot */
  box-shadow: var(
    --elevation-button-active,
    rgb(42, 23, 14) 0px 8px 0px -2.4px
  );
  transform: translateY(2px); /* inferred from screenshot */
}

.button-secondary:disabled {
  background-color: var(
    --color-secondary,
    #1f7a4d
  ); /* inferred from screenshot */
  opacity: 0.6; /* inferred from screenshot */
  cursor: not-allowed;
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
}
```

#### Ghost Button

A transparent button with a text-primary border and text, used for secondary actions or navigation.

```css
.button-ghost {
  background-color: transparent;
  color: var(--color-text-primary, #2a170e);
  font-family: var(--typography-body-family, "Figtree");
  font-size: 17px;
  font-weight: 650;
  padding: 13.6px 25.6px;
  border: 1px solid var(--color-text-primary, #2a170e);
  border-radius: var(--radius-full, 999px);
  box-shadow: none;
  cursor: pointer;
  transition:
    background-color var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)),
    color var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)),
    border-color var(--motion-duration-base, 0.2s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.button-ghost:hover {
  background-color: var(
    --color-text-primary,
    #2a170e
  ); /* inferred from screenshot */
  color: var(--color-text-inverse, #fffdf8); /* inferred from screenshot */
  border-color: var(
    --color-text-primary,
    #2a170e
  ); /* inferred from screenshot */
}

.button-ghost:active {
  background-color: var(
    --color-text-primary,
    #2a170e
  ); /* inferred from screenshot */
  color: var(--color-text-inverse, #fffdf8); /* inferred from screenshot */
  border-color: var(
    --color-text-primary,
    #2a170e
  ); /* inferred from screenshot */
  transform: translateY(1px); /* inferred from screenshot */
}

.button-ghost:disabled {
  background-color: transparent;
  color: var(--color-text-secondary, #5a3a28); /* inferred from screenshot */
  border-color: var(
    --color-text-secondary,
    #5a3a28
  ); /* inferred from screenshot */
  opacity: 0.6; /* inferred from screenshot */
  cursor: not-allowed;
}
```

### Cards & Containers

The site uses "door" components as cards for puppy listings, featuring a distinct rounded-top shape and shadow. The `.tp-step` elements also show a hover shadow.

#### Puppy Door Card

These cards represent individual puppies, featuring a rounded-top door shape with a strong, offset shadow. On hover, the shadow subtly shifts.

```css
.card-door {
  background-color: var(
    --color-primary,
    #a24a1a
  ); /* Varies by door, e.g., #3b2215 or #d4893f */
  color: var(--color-text-inverse, #fffdf8);
  border-radius: var(--radius-lg, 50px) var(--radius-lg, 50px)
    var(--radius-xs, 1px) var(--radius-xs, 1px); /* Rounded top, flat bottom */
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
  transition: box-shadow var(--motion-duration-base, 0.2s)
    var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
  padding: 0; /* Content handles internal padding */
  overflow: hidden;
}

.card-door:hover {
  box-shadow: var(
    --elevation-card-hover,
    rgba(42, 23, 14, 0.25) 0px 7px 0px -3px
  );
  transform: translateY(-2px); /* inferred from screenshot */
}

/* Specific styling for the "Available" tag on the door */
.tp-door__tag {
  font-family: var(--typography-decorative-family, "Shantell Sans");
  background-color: var(--color-accent-honey, #f2be6b);
  color: var(--color-text-primary, #2a170e);
  border-radius: var(--radius-full, 999px);
  padding: 4px 12px;
  position: absolute; /* inferred from screenshot */
  top: 16px; /* inferred from screenshot */
  right: -16px; /* inferred from screenshot */
  transform: rotate(10deg); /* inferred from screenshot */
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
}
```

#### Step Card

Used in the "Your puppy journey" section, these cards have a subtle hover effect.

```css
.card-step {
  background-color: var(--color-background, #fffdf8);
  color: var(--color-text-primary, #2a170e);
  border-radius: var(--radius-md, 16px);
  box-shadow: none;
  padding: 24px; /* inferred from screenshot */
  transition: box-shadow var(--motion-duration-base, 0.2s)
    var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.tp-step:hover {
  /* .tp-step is the base selector for these cards */
  box-shadow: rgba(42, 23, 14, 0.12) 9px 12px; /* From pseudoStates */
}
```

### Inputs & Forms

#### Text Input

Standard text input fields with a distinct focus ring.

```css
.input-text {
  background-color: var(--color-background, #fffdf8);
  color: var(--color-text-primary, #2a170e);
  font-family: var(--typography-body-family, "Figtree");
  font-size: 17px;
  font-weight: 400;
  padding: 12px 16px; /* inferred from screenshot */
  border: 1px solid var(--color-border-light, #e8dfd3); /* inferred from screenshot */
  border-radius: var(--radius-sm, 8px);
  box-shadow: var(
    --elevation-card-inset,
    rgba(42, 23, 14, 0.08) 0px 0px 0px 1px inset
  );
  transition:
    border-color var(--motion-duration-fast, 0.16s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)),
    box-shadow var(--motion-duration-fast, 0.16s)
      var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.input-text:focus-visible {
  outline: none;
  border-color: var(
    --color-accent-honey,
    #f2be6b
  ); /* inferred from screenshot */
  box-shadow:
    var(--color-accent-honey, #f2be6b) 0px 0px 0px 5px,
    var(--color-text-primary, #2a170e) 0px 6px 0px -2px; /* From pseudoStates.focus on .tp-notes__search input */
  background-color: rgba(
    251,
    227,
    180,
    0.6
  ); /* From pseudoStates.focus on .tp-blank :is(input, select) */
}

.input-text:disabled {
  background-color: var(
    --color-background-subtle,
    #e8dfd3
  ); /* inferred from screenshot */
  color: var(--color-text-secondary, #5a3a28); /* inferred from screenshot */
  border-color: var(
    --color-border-light,
    #e8dfd3
  ); /* inferred from screenshot */
  cursor: not-allowed;
}
```

#### Form Label

Labels for form fields, using the secondary text color.

```css
.form-label {
  font-family: var(--typography-body-family, "Figtree");
  font-size: 15px; /* inferred from screenshot */
  font-weight: 500; /* inferred from screenshot */
  color: var(--color-text-secondary, #5a3a28);
  display: block;
  margin-bottom: var(--spacing-xs, 4px);
}
```

#### Checkbox/Radio

(none observed in source)

### Navigation

#### Top Navigation Bar

The main navigation bar, fixed at the top, with a clean background.

```css
.navbar {
  background-color: var(--color-background, #fffdf8);
  color: var(--color-text-primary, #2a170e);
  padding: 16px 32px; /* inferred from screenshot */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky; /* inferred from screenshot */
  top: 0;
  z-index: var(--z-index-nav, 40);
  box-shadow: none; /* No shadow on the bar itself */
}
```

#### Navigation Link

Individual links within the navigation bar, with a subtle color change on hover.

```css
.nav-link {
  font-family: var(--typography-body-family, "Figtree");
  font-size: 17px;
  font-weight: 500; /* inferred from screenshot */
  color: var(--color-text-primary, #2a170e);
  text-decoration: none;
  padding: 8px 12px; /* inferred from screenshot */
  transition: color var(--motion-duration-fast, 0.16s)
    var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.nav-link:hover {
  color: var(
    --color-accent-toffee,
    #c2622b
  ); /* From pseudoStates.hover on .tp-nav-link */
}

.nav-link.active,
.nav-link[aria-current="page"] {
  color: var(--color-primary, #a24a1a); /* inferred from screenshot */
  font-weight: 600; /* inferred from screenshot */
}
```

#### Dropdown Menu

(none observed in source)

### Links

#### Standard Link

Inline text links, typically underlined and using the primary text color.

```css
.link-standard {
  color: var(--color-text-primary, #2a170e);
  text-decoration: underline;
  font-family: var(--typography-body-family, "Figtree");
  font-size: 17px;
  font-weight: 400;
  transition: color var(--motion-duration-fast, 0.16s)
    var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.link-standard:hover {
  color: var(--color-accent-toffee, #c2622b); /* inferred from screenshot */
}

.link-standard:visited {
  color: var(--color-text-secondary, #5a3a28); /* inferred from screenshot */
}
```

#### Secondary Link

Links used in footers or less prominent areas, often without underline.

```css
.link-secondary {
  color: var(--color-dark-text, #fffdf8);
  text-decoration: none;
  font-family: var(--typography-body-family, "Figtree");
  font-size: 17px;
  font-weight: 400;
  transition: color var(--motion-duration-fast, 0.16s)
    var(--motion-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.link-secondary:hover {
  color: var(--color-accent-honey, #f2be6b); /* inferred from screenshot */
  text-decoration: underline; /* inferred from screenshot */
}

.link-secondary:visited {
  color: var(--color-dark-text, #fffdf8); /* inferred from screenshot */
}
```

### Badges

The "Available" tag on puppy door cards serves as a status badge.

#### Status Badge - Available

A playful, hand-drawn style badge indicating availability, with a distinct shadow.

```css
.badge-status-available {
  background-color: var(--color-accent-honey, #f2be6b);
  color: var(--color-text-primary, #2a170e);
  font-family: var(--typography-decorative-family, "Shantell Sans");
  font-size: 17px;
  font-weight: 400;
  padding: 4px 12px;
  border: none;
  border-radius: var(--radius-full, 999px);
  box-shadow: var(
    --elevation-card-default,
    rgba(42, 23, 14, 0.2) 2px 3px 0px 0px
  );
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

## 5. Layout Principles

The layout emphasizes generous spacing and clear content separation, creating an open and friendly user experience.

- **Spacing System**: Base unit `4px` → `0, 4, 8, 12, 16, 20, 24, 32`.
  - `0px`: Reset or tight alignments.
  - `4px` (xxs): Smallest element separation, e.g., icon-text gap.
  - `8px` (xs): Minor spacing, e.g., between form elements.
  - `12px` (sm): Padding for small components, list item spacing.
  - `16px` (md): Standard component padding, vertical rhythm.
  - `20px` (lg): Increased spacing for readability.
  - `24px` (xl): Section sub-padding, between major elements.
  - `32px` (xxl): Large section padding, separating distinct content blocks.

- **Grid & Container** _Note: container widths and column counts are not extracted from the source. The values below are reasonable defaults inferred from the visible layout density._
  - Max width: `var(--layout-container-6xl, 72rem)` (1152px) for main content.
  - Columns: 12-column grid (inferred).
  - Gutter: `24px` (inferred).
  - Section Padding: `64px` vertical, `32px` horizontal (inferred).

- **Whitespace Philosophy**: TeddyPups utilizes ample whitespace to create a sense of calm and to allow content to breathe. Large vertical and horizontal gaps, often `32px` or more, are used to clearly delineate sections and prevent visual clutter. This generous spacing contributes to the premium and approachable feel, ensuring that each element has its own visual space.

- **Border Radius Scale**:
  - `1px` (xs): Minimal rounding, almost sharp, used for specific card bottoms.
  - `8px` (sm): Small radius for input fields and subtle container rounding.
  - `16px` (md): Standard radius for cards and general UI elements.
  - `50px` (lg): Prominent rounding for unique components like the puppy door cards.
  - `999px` (full): Full pill-shape for all buttons and badges.

## 6. Depth & Elevation

The elevation system uses distinct offset shadows to give elements a playful, tangible quality, reminiscent of stickers or physical objects.

- **Flat (z-0)**: `none` — Used for base backgrounds and non-interactive elements.
- **Default Card (z-1)**: `rgba(42, 23, 14, 0.2) 2px 3px 0px 0px` — Applied to puppy door cards and buttons in their resting state, giving a slight lift.
- **Card Inset (z-1)**: `rgba(42, 23, 14, 0.08) 0px 0px 0px 1px inset` — Used for input fields, providing subtle depth without casting an external shadow.
- **Hover Card (z-2)**: `rgba(42, 23, 14, 0.12) 9px 12px` — A more pronounced, offset shadow used for interactive elements like `.tp-step` cards on hover.
- **Button Hover (z-2)**: `rgba(42, 23, 14, 0.25) 0px 7px 0px -3px` — A distinct shadow for button hover states, indicating interaction.
- **Button Active (z-2)**: `rgb(42, 23, 14) 0px 8px 0px -2.4px` — A strong, pushed-in shadow for button active states, simulating a press.
- **Focus Ring Inset (z-3)**: `rgb(255, 253, 248) 0px 0px 0px 4px inset` — An inner white glow for focus states, combined with a larger outer shadow.
- **Navigation/Sticky (z-40)**: `(z-index: 40)` — Used for the main navigation bar to ensure it remains above most content.
- **Modal/Overlay (z-50)**: `(z-index: 50)` (inferred) — For modals or full-screen overlays, ensuring they are always on top.

**Shadow Philosophy**
The shadow philosophy at TeddyPups U.A.E. is characterized by a playful, "sticker-like" aesthetic. Shadows are frequently offset (`2px 3px 0px 0px` or `9px 12px`), creating a sense of depth and making elements appear to pop off the page. This is further enhanced by distinct hover (`rgba(42, 23, 14, 0.25) 0px 7px 0px -3px`) and active (`rgb(42, 23, 14) 0px 8px 0px -2.4px`) states that provide clear visual feedback and contribute to the tactile feel of the interface.

## 7. Do's and Don'ts

### Do's

- **Do** use `{colors.text-primary}` (`#2a170e`) for all body text on `{colors.background}` (`#fffdf8`); measured contrast ratio is 16.83, passing AAA.
- **Do** apply `{colors.primary}` (`#a24a1a`) for the Primary Button background with `{colors.text-inverse}` (`#fffdf8`) text; measured ratio is 5.85, passing AA.
- **Do** maintain a consistent `1.5` line height for all `Figtree` body and caption text sizes, including `17px` and `14px`.
- **Do** use `999px` border-radius for all interactive buttons and badges, creating a pill-shaped aesthetic.
- **Do** ensure all input fields have a focus ring using `{colors.accent-honey}` (`#f2be6b`) `0px 0px 0px 5px` box-shadow.
- **Do** separate major content sections with at least `32px` of vertical spacing, using the `{spacing.xxl}` token.
- **Do** use the `Fraunces` typeface exclusively for headings (H1, H2, Display) at `400` weight.
- **Do** apply `rgba(42, 23, 14, 0.2) 2px 3px 0px 0px` shadow to all `card-door` components for a consistent lifted effect.
- **Do** use `{colors.secondary}` (`#1f7a4d`) for the WhatsApp button background with `{colors.text-whatsapp}` (`#ffffff`) text; measured ratio is 5.32, passing AA.

### Don'ts

- **Don't** use `{colors.text-secondary}` (`#5a3a28`) on `{colors.background-subtle}` (`#e8dfd3`) for primary content; measured ratio is 5.25, which barely passes AA.
- **Don't** introduce custom spacing values; adhere strictly to the `0, 4, 8, 12, 16, 20, 24, 32px` scale.
- **Don't** use `Figtree` with a font-weight greater than `650`, even for emphasis; reserve `Fraunces` for headline impact.
- **Don't** use sharp corners on interactive elements; ensure a minimum `8px` border-radius for inputs and `999px` for buttons.
- **Don't** place text directly on complex photographic backgrounds without a clear overlay or sufficient contrast.
- **Don't** use generic transition durations; prefer `0.2s` with `cubic-bezier(0.4, 0, 0.2, 1)` for most UI interactions.
- **Don't** use `Shantell Sans` for body copy or functional text; it is reserved for decorative elements like the "Available" badge.
- **Don't** apply shadows inconsistently; ensure all interactive cards use the `rgba(42, 23, 14, 0.12) 9px 12px` hover shadow.

## 8. Responsive Behavior

_Note: breakpoints below are derived from the source's actual media queries. Adjust to the brand's actual media queries when implementing._

- **Breakpoints**:
  - **Mobile Small** (~639px): Typography scales down, most multi-column layouts collapse to single.
  - **Mobile Large** (~767px): Navigation might transition to a hamburger menu, larger touch targets.
  - **Tablet** (~1023px): Adjustments for two-column layouts, increased padding.
  - **Desktop** (~1024px): Standard desktop layout, full navigation, larger content areas.
  - **Desktop Large** (~1280px): (inferred from common desktop breakpoints) Wider containers, more generous spacing.

- **Touch Targets**:
  - Interactive elements like buttons and links should have a minimum tap area of `44px` by `44px` (inferred).
  - Ensure a minimum `8px` clear space around touch targets to prevent accidental taps (inferred).

- **Collapsing Strategy**:
  - **Navigation**: The main navigation bar collapses into a hamburger menu on screens smaller than `1023px`.
  - **Cards**: Multi-column `card-door` layouts transition to a single column stack on mobile breakpoints.
  - **Typography**: Display and H1 font sizes scale down progressively on smaller viewports to maintain readability.
  - **Padding**: Horizontal section padding reduces from `32px` to `16px` on mobile, maintaining content margins.
  - **Forms**: Input fields and form elements stack vertically on mobile to optimize for single-column flow.
  - **Spacing**: Vertical spacing between sections might be slightly reduced on mobile, but still adhering to the spacing scale.

## 9. Agent Prompt Guide

- **Quick Color Reference**:
  - primary: `#a24a1a`
  - primary-hover: `#8e3f15`
  - secondary: `#1f7a4d`
  - secondary-hover: `#1f6b45`
  - background: `#fffdf8`
  - background-tint: `#fbe3b4`
  - background-subtle: `#e8dfd3`
  - text-primary: `#2a170e`
  - text-secondary: `#5a3a28`
  - text-inverse: `#fffdf8`
  - text-whatsapp: `#ffffff`
  - border-light: `#e8dfd3`
  - border-dark: `#e8d8c8`
  - accent-honey: `#f2be6b`
  - accent-toffee: `#c2622b`
  - accent-orange: `#d4893f`
  - dark-surface: `#3b2215`
  - dark-surface-alt: `#080808`
  - dark-text: `#fffdf8`

- **Iteration Guide**:
  1.  Always use `{colors.primary}` (`#a24a1a`) for main CTAs and `{colors.secondary}` (`#1f7a4d`) for WhatsApp actions.
  2.  Ensure display text uses `Fraunces` `96px` `400` and body text uses `Figtree` `17px` `400`.
  3.  Apply spacing from the `4px` base scale: `0, 4, 8, 12, 16, 20, 24, 32px`.
  4.  All buttons and badges must have `{radius.full}` (`999px`) border-radius.
  5.  Default cards should use `{radius.md}` (`16px`) and `{elevation.card-default}` shadow.
  6.  Buttons must be `13.6px 25.6px` padding for primary/ghost, `9.6px 21.6px` for secondary.
  7.  Input fields require a `{colors.accent-honey}` (`#f2be6b`) focus ring and `{elevation.card-inset}` shadow.
  8.  Navigation links (`.nav-link`) should change `color` to `{colors.accent-toffee}` (`#c2622b`) on hover.
  9.  Implement depth using the defined elevation tiers, especially `rgba(42, 23, 14, 0.2) 2px 3px 0px 0px` for lifted elements.
  10. Ensure text on `{colors.background}` (`#fffdf8`) is `{colors.text-primary}` (`#2a170e`) for AAA contrast.
  11. For mobile, collapse multi-column layouts to single and reduce horizontal padding to `16px`.
  12. All UI interactions should use a `transition` of `0.2s cubic-bezier(0.4, 0, 0.2, 1)`.
