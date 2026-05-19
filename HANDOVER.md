# Project Handover Document
## Rasa Construction — Frontend Portfolio Website

**Document Type:** Engineering & Design Handoff  
**Version:** 1.0  
**Date:** May 2026  
**Status:** Production-Ready (Content Pending)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Brand Identity](#2-brand-identity)
3. [Tech Stack](#3-tech-stack)
4. [Folder Architecture](#4-folder-architecture)
5. [Component Architecture](#5-component-architecture)
6. [Design System](#6-design-system)
7. [Animation System](#7-animation-system)
8. [Known Issues & Technical Debt](#8-known-issues--technical-debt)
9. [Real Content Integration Plan](#9-real-content-integration-plan)
10. [Data Layer](#10-data-layer)
11. [Responsive Strategy](#11-responsive-strategy)
12. [Performance Strategy](#12-performance-strategy)
13. [Deployment Workflow](#13-deployment-workflow)
14. [Future Improvements](#14-future-improvements)
15. [Design Philosophy](#15-design-philosophy)

---

## 1. Project Overview

### What it is

A premium, single-page portfolio website for **Rasa Construction**, a real-world construction company based in Achankuttam, Tamil Nadu, India. The site is owned by **Gurusamy A** and represents a field-focused construction rental business with 15+ years of experience.

This is not a template. It was designed from first principles to feel like a premium construction brand built by a high-end design agency — not an AI-generated site or a Bootstrap theme.

### Business Purpose

- Attract new construction clients across Tamil Nadu
- Build trust immediately with first-time visitors
- Showcase scaffolding rental, centring material, concrete works, and vertical hoist services
- Provide a frictionless path to contact (WhatsApp, phone, quote form)

### Target Audience

- Civil contractors and site engineers
- Real estate developers and builders
- Architects coordinating construction logistics
- Project managers in Tamil Nadu and surrounding regions

### Visual Direction

The site takes design direction from three influences:

1. **Editorial architecture magazines** — Asymmetric layouts, oversized type, generous whitespace
2. **Luxury construction branding** — Deep green-teal palette, warm beige accents, restrained glassmorphism
3. **Industrial utility** — Grain texture, structural grid overlays, brutalist-weight headings

The goal is a site that feels like it was designed by a senior art director who understands both construction culture and modern digital design.

---

## 2. Brand Identity

### Primary Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--clr-primary` | `#083335` | Brand green-teal — headings, buttons, primary surfaces |
| `--clr-primary-mid` | `#0d4d50` | Hover states, gradient mid-point |
| `--clr-primary-dark` | `#051f21` | Deep backgrounds, footer |
| `--clr-accent` | `#D8B9A3` | Warm beige — CTA buttons, eyebrow labels, highlights |
| `--clr-accent-lt` | `#e8d0c0` | Accent hover states |
| `--clr-accent-dk` | `#c4a088` | Gradient accent, darker accent uses |
| `--clr-bg` | `#F7F5F2` | Off-white site background |

The palette deliberately avoids pure black and pure white. Every surface is warm or tinted to prevent the sterile "AI-generated" look.

### Typography System

Three typefaces are used with strict role separation:

| Family | Role | Weight |
|---|---|---|
| **Montserrat** | Brutalist display headings, logo wordmark | 700–900 |
| **Poppins** | UI labels, navigation, eyebrow text, buttons | 400–700 |
| **Inter** | Body copy, form inputs, captions | 400–600 |

The typographic hierarchy is fixed — no component should introduce a new font size outside the defined scale. See Section 6.

### Logo

The Rasa Construction logo is an **inline SVG architectural building mark** — two tall tower columns flanking two shorter inner columns, connected by a gateway arch at the base. It lives in `src/components/ui/Logo.tsx` as a recolorable React component. There is no raster version.

### UI Style Direction

- **Grain overlay** on all sections (CSS SVG data URI, no external request) to prevent the "glossy AI render" look
- **Asymmetric layout composition** — no two sections share identical grid structure
- **Cinematic image treatment** — directional gradients over photography, not flat overlays
- **Glassmorphism used sparingly** — only on floating stat chips, trust badges, and the dark-theme navbar

---

## 3. Tech Stack

### Next.js 16 (App Router)

Chosen for: file-based routing, React Server Components, streaming loading UI via `app/loading.tsx`, and built-in image optimisation (WebP/AVIF auto-conversion). The project uses the App Router exclusively — no `pages/` directory.

### React 19

Standard component model. All interactive components are Client Components (`"use client"`). Static sections are Server Components by default.

### Tailwind CSS v4

Used for responsive utility classes alongside the custom design system in `globals.css`. Important: Tailwind is **supplementary** here, not the primary styling strategy. All spacing, typography, and colour live in CSS custom properties — Tailwind utilities are used only for layout utilities like `flex`, `grid-cols-*`, `hidden`, and responsive overrides.

**Do not add ad-hoc Tailwind spacing utilities** (e.g. `p-6`, `mt-8`). Use `--s*` tokens via inline styles to maintain the 8pt system.

### Framer Motion

Used for three categories of animation:
1. Scroll-triggered section reveals (`Reveal.tsx`)
2. Parallax backgrounds (`Parallax.tsx`)
3. Layout animations (navbar active indicator uses `layoutId`)

All animation variants are centralised in `src/lib/animations.ts`.

### TypeScript

All data structures, component props, hooks, and utility functions are fully typed. See `src/types/` for data interfaces.

---

## 4. Folder Architecture

```
Rasa-construction-portfolio/
├── public/
│   ├── hero/            Hero background image(s)
│   ├── projects/        Project gallery images — used in projects.ts
│   ├── services/        Service card imagery (currently unused, ready for content)
│   ├── team/            About / team photography
│   ├── logos/           Brand asset exports
│   ├── icons/           Custom icon assets
│   └── images/          Legacy image path (exists for backwards compatibility)
│
└── src/
    ├── app/
    │   ├── globals.css      Single CSS design system file — all tokens live here
    │   ├── layout.tsx       Root layout: imports Navbar, Footer, sets metadata
    │   ├── loading.tsx      Next.js streaming loading screen (RasaLogo + progress bar)
    │   └── page.tsx         Page assembly — purely compositional, no logic
    │
    ├── components/
    │   ├── layout/          Chrome components (Navbar, Footer, Container)
    │   ├── sections/        Full-page sections (Hero, About, Services, etc.)
    │   ├── ui/              Reusable primitives (Button, Badge, SectionTitle, Logo, WhatsApp)
    │   └── animations/      Motion wrappers (Reveal, Parallax)
    │
    ├── data/                All hardcoded content — edit here, not in components
    ├── hooks/               React hooks (useScroll, useMobile)
    ├── lib/                 Pure utilities (animations.ts, utils.ts, constants.ts)
    └── types/               TypeScript interfaces for all data structures
```

### Key architectural rule

`page.tsx` **contains zero logic and zero hardcoded strings**. It is purely a composition of section imports. Any developer touching `page.tsx` should only be adding or reordering section components.

---

## 5. Component Architecture

### Dependency chain

```
page.tsx
  └── sections/Hero.tsx
        ├── components/animations/Parallax.tsx
        ├── components/layout/Container.tsx
        ├── components/ui/Button.tsx
        └── data/company.ts
```

Every section follows this pattern: **data → section → primitives**. Sections are never nested inside each other. UI primitives never import section-level components.

### Layout components

| Component | Responsibility |
|---|---|
| `Navbar` | Fixed nav, scroll-aware styling, mobile drawer, active section tracking via `useScroll` |
| `Footer` | 4-column grid, sources all data from `company.ts` and `services.ts` |
| `Container` | Enforces the single container system — `max-width: 1280px` + responsive padding |

### Section components

| Section | Key Design Decision |
|---|---|
| `Hero` | Left-aligned brutalist type, parallax bg, editorial eyebrow label, stat strip |
| `About` | 5/7 asymmetric CSS grid — text left, image right with overlapping stat chip |
| `Services` | 3-column equal grid; image-bg cards vs light cards alternated by data |
| `Projects` | Masonry gallery with filter tabs; categories auto-derived from `projectCategories` |
| `Testimonials` | 3-column equal grid on dark bg; Stars sub-component |
| `Contact` | 2-col asymmetric (1/1.15) — info left, dark panel form right |
| `CTA` | Parallax banner — centered editorial layout, 480px height |

### UI primitives

| Primitive | Props Interface |
|---|---|
| `Button` | `variant: primary | dark | ghost`, `size: sm | md | lg`, `as: 'button'` for forms |
| `SectionTitle` | `eyebrow`, `heading`, `body?`, `align: left | center`, `theme: light | dark` |
| `Badge` | `variant: light | dark | green` |
| `Logo` | `size`, `color`, `className` |

### Animation wrappers

| Wrapper | Usage |
|---|---|
| `Reveal` | Wrap any element that should fade-in on scroll. Props: `direction`, `delay` |
| `Parallax` | Wrap background images for parallax. Props: `speed` (0–1, default 0.35) |

---

## 6. Design System

All tokens are defined in `src/app/globals.css` as CSS custom properties. This is the **single source of truth** — do not duplicate values anywhere.

### 8pt Spacing Scale

```
--s1:  8px    --s2:  16px   --s3:  24px   --s4:  32px
--s6:  48px   --s8:  64px   --s12: 96px   --s16: 128px
```

**Rule:** No component or section may use a spacing value not in this scale. No `margin: 10px`, no `padding: 20px`, no `gap: 14px`.

### Section Vertical Rhythm

The `.s` class (applied via `<Container section>`) provides section-level vertical padding via `--section-y`:

| Viewport | Padding |
|---|---|
| Desktop > 1024px | 120px |
| Tablet 640–1024px | 96px |
| Mobile < 640px | 72px |

### Typography Scale

| Token | Size | Responsive |
|---|---|---|
| `--t-hero` | clamp(44px, 7vw, 72px) | Yes — scales with viewport |
| `--t-h1` | clamp(32px, 5vw, 48px) | Yes |
| `--t-h2` | 24px | No |
| `--t-body` | 18px | No |
| `--t-sm` | 14px | No |
| `--t-xs` | 12px | No |

### Grid System

Use CSS Grid for all multi-column layouts. Tailwind responsive utilities set mobile fallback:

```tsx
<div
  style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s3)" }}
  className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
>
```

Cards always maintain equal height and equal gap within a grid. Never use `gap: auto` or uneven gutters.

### Container

```
max-width: 1280px
padding-inline: 80px (desktop) / 48px (tablet) / 20px (mobile)
```

Every section wraps its content in `<Container section>`. No section extends wider than the container. No element floats outside the container grid.

---

## 7. Animation System

### Philosophy

Animations should feel **architectural, not playful**. The site is for a serious construction company. Effects must be:
- Subtle, not dramatic
- Smooth, not bouncy
- Triggered by scroll, not autoplay loops
- Performance-safe (no janky repaints)

### Centralised Variants — `src/lib/animations.ts`

```ts
fadeUp    — y: 40 → 0, opacity 0 → 1, 750ms ease-out
fadeIn    — opacity 0 → 1, 600ms ease-out
slideLeft — x: -40 → 0, 800ms ease-out
slideRight— x: 40 → 0, 800ms ease-out
scaleIn   — scale 0.85 → 1, spring
stagger() — staggerChildren: 0.08s (for card grids)
```

**Rule:** Never define inline Framer Motion `variants` objects inside a component. Import from `animations.ts`.

### Reveal component

The `Reveal` wrapper (`src/components/animations/Reveal.tsx`) handles all scroll-triggered animations. It uses `useInView` with `once: true` and `margin: "-72px"` to trigger slightly before the element enters the viewport.

```tsx
<Reveal direction="left" delay={0.15}>
  <SectionTitle ... />
</Reveal>
```

### Parallax component

`Parallax` uses a **passive scroll listener** that writes directly to a `ref.current.style.transform` — no React state, no re-renders on scroll tick.

```tsx
<Parallax speed={0.38} className="absolute inset-0 scale-110">
  <Image ... />
</Parallax>
```

The `scale-110` class is intentional — it gives the parallax room to move without revealing the image edges.

### Hover interactions

Card hover states use CSS transitions only (no Framer Motion for hover):
- Cards: `translateY(-6px)` + elevated shadow
- Icon containers inside cards: `scale(1.1)`
- Top accent line on service cards: `scaleX(0 → 1)` on `origin-left`

---

## 8. Known Issues & Technical Debt

This section documents what the current codebase has, what may need review, and what was explicitly changed during development.

### Resolved Issues

| Issue | Resolution |
|---|---|
| Custom cursor effects causing janky rendering | Removed entirely — system cursor restored |
| Random spacing values across components | Replaced with strict `--s*` token system |
| Monolithic flat component directory | Refactored into `layout/`, `sections/`, `ui/`, `animations/` |
| Hardcoded company data inside JSX | Extracted to `src/data/company.ts` |
| Loading screen as separate component (conflicted with App Router) | Replaced with `app/loading.tsx` |
| WhatsApp URL hardcoded in multiple places | Centralised via `waLink()` utility |

### Current Technical Debt

**About section grid — mobile collapse:**  
The 5/7 CSS Grid (`gridTemplateColumns: "5fr 7fr"`) is set as an inline style. The mobile collapse is handled via Tailwind `className`, but these two systems may conflict on some viewport edge cases. Recommend migrating to a pure CSS media query within `globals.css` or a CSS module.

**Services icon resolution:**  
Icons are resolved dynamically by string name from the Lucide library using a cast: `(LucideIcons as unknown as Record<string, LucideIcon>)[name]`. This is a safe runtime pattern but bypasses TypeScript's type safety for icon names. If Lucide updates icon names, breakage will only appear at runtime. Consider creating a strict `IconMap` record in `lib/constants.ts` that explicitly imports and maps each used icon.

**Contact form — mock submission:**  
The form currently uses `await new Promise((r) => setTimeout(r, 1500))` as a placeholder submission handler. EmailJS or a backend API must replace this before production. See Section 13.

**`SectionTitle` — `style` prop forwarding:**  
The component does not accept a generic `style` prop for arbitrary overrides. Some sections pass `style={{ marginBottom: "var(--s12)" }}` directly to it via the parent wrapper. This is correct and intentional — do not add style forwarding to `SectionTitle` as it would allow arbitrary margin overrides that break the spacing system.

**Old `rasa-site/` subdirectory:**  
A legacy `rasa-site/` directory exists in the repository root from an earlier migration phase. It is **not used by the build** but may cause confusion. It should be deleted before final deployment.

**`Footer.tsx` in `src/components/` (root):**  
After the refactor, the canonical Footer lives in `src/components/layout/Footer.tsx`. There may be a stale reference to `src/components/Footer.tsx` in older open editor tabs. Verify this file no longer exists.

### Layout Patterns to Watch

When adding new sections, avoid these anti-patterns that were present in the original build:
- Sections with different `max-width` values — use `Container` always
- Padding values not from `--s*` scale (e.g. `padding: 60px 40px`)
- Sections that center all content — vary alignment intentionally
- Repeated card structures with identical visual weight

---

## 9. Real Content Integration Plan

### Photography

All current images are placeholder project photography. Before production, replace the following:

| File | Location | Notes |
|---|---|---|
| Hero background | `public/hero/hero.png` | Minimum 1920×1080px, WebP, construction site at golden hour |
| About team photo | `public/team/about-team.png` | Portrait orientation, 4:5 ratio, subject in site context |
| Scaffolding project | `public/projects/scaffolding.png` | Wide or tall, real scaffold setup |
| Concrete project | `public/projects/concrete.png` | Concrete pour or slab work in progress |
| Hoist project | `public/projects/hoist.png` | Vertical hoist in operation on multi-storey |

After replacing images, update the `image` field in the relevant data files (`projects.ts`, `services.ts`). No component code needs changing.

### Contact Form

Replace the mock timeout in `src/components/sections/Contact.tsx` with an EmailJS call:

```ts
import emailjs from "@emailjs/browser";

await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  { from_name: form.name, phone: form.phone, message: form.msg, service: form.service },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

### Map Embed

The Google Maps iframe in Contact uses a placeholder coordinate. Replace with the exact embed URL for Achankuttam, Tirunelveli district. Get the correct embed URL from Google Maps → Share → Embed a map.

### Social Media Links

The Footer `socials` array uses `href: "#"` placeholders. Replace with live handles before deployment:

```ts
// src/components/layout/Footer.tsx
const socials = [
  { Icon: Share2, href: "https://facebook.com/rasaconstruction", label: "Facebook" },
  ...
]
```

---

## 10. Data Layer

All content that changes per-client or per-project lives in `src/data/`. UI components never hardcode business content. This is the critical contract — respect it when adding features.

### `src/data/company.ts`

The master record for all company information. Referenced by Navbar, Footer, Hero, About, Contact, CTA, and metadata.

```ts
export const company = {
  name, owner, founded, location, contact, stats, navLinks
}
```

Changing `company.contact.primary` here propagates automatically to the phone CTA in Hero, Footer, Navbar mobile drawer, CTA section, and Contact cards.

### `src/data/services.ts`

Array of `Service` objects. Each service has:
- `id` — used as React key
- `iconName` — string matching a Lucide icon name (resolved dynamically in `Services.tsx`)
- `image?` — optional path; when present, the card renders with a photo background

Add a service by appending to the array. Remove one by removing its entry. No JSX edits required.

### `src/data/projects.ts`

Array of `Project` objects. The `projectCategories` export is auto-derived using `Array.from(new Set(...))` — filter tabs in the gallery update automatically when you add a new category.

Setting `tall: true` renders the card in a 3:4 portrait aspect ratio in the masonry grid.

### `src/data/testimonials.ts`

Array of `Testimonial` objects. The `initials` field generates the avatar placeholder. When a real client photo is available, it should be added as an `avatar` field and the avatar `<div>` in `Testimonials.tsx` updated to render `<Image>` instead.

---

## 11. Responsive Strategy

### Breakpoints

Defined in `src/lib/constants.ts` and used by `useMobile`:

| Key | Value |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Approach

The layout is **content-first, not mobile-first in the reactive sense**. Desktop layout is defined via CSS Grid in inline styles. Mobile collapse is handled by Tailwind responsive utilities in `className`. This dual approach is deliberate — it keeps the desktop grid precise while providing clean mobile fallback without media query fragmentation.

**Pattern used throughout:**

```tsx
<div
  style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "var(--s12)" }}
  className="grid-cols-1 lg:grid-cols-[1fr_1.15fr]"
>
```

### Typography responsiveness

Hero and section heading sizes use `clamp()` — they scale smoothly between mobile and desktop without media query jumps:

```css
--t-hero: clamp(2.75rem, 7vw, 4.5rem);
--t-h1:   clamp(2rem, 5vw, 3rem);
```

### Container padding responsiveness

Container padding is controlled via CSS custom property override at breakpoints:

```css
/* Tablet */
@media (max-width: 1024px) { --container-px: 3rem; }
/* Mobile */
@media (max-width: 640px)  { --container-px: 1.25rem; }
```

This means **no component needs to override padding** — the container handles it automatically.

---

## 12. Performance Strategy

### Images

- All images use Next.js `<Image>` with `fill` and `sizes` props
- `sizes` prop is tuned per-context (e.g. `"(max-width: 640px) 100vw, 33vw"` for grid items)
- WebP format in `public/` — Next.js auto-converts to AVIF where supported
- Hero image uses `priority` to prevent LCP penalty
- All other images use `loading="lazy"` (default in `<Image>`)

### Animations

- `Parallax` uses a passive scroll listener + direct DOM ref mutation — zero React re-renders on scroll
- `Reveal` uses `once: true` so animations fire only once per session
- No animation uses `transform: all` or animates `width`/`height` — only `opacity` and `transform` are animated (GPU-composited)

### Code splitting

Next.js App Router handles automatic per-route code splitting. Section components are separate modules, giving the bundler visibility for tree-shaking.

### Grain texture

Implemented as a CSS data URI SVG with no external HTTP request. Applied via the `.grain` class and `::after` pseudo-element.

### Font loading

Google Fonts loaded with `display=swap` — text renders in fallback font immediately, swaps to Montserrat/Poppins/Inter once loaded. No render blocking.

---

## 13. Deployment Workflow

### Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

### Production build verification

```bash
npm run build        # TypeScript check + Next.js build
npm run start        # Serve production build locally
npm run lint         # ESLint check
```

Always run `npm run build` before pushing to main. Fix any TypeScript or ESLint errors before deployment.

### Vercel deployment

Connect the repository to [vercel.com](https://vercel.com):

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `.` (repository root) |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Node.js Version | 18.x or 20.x |

Environment variables to add in Vercel dashboard before launch:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

### Branch strategy recommendation

```
main        → production (auto-deploys to Vercel)
dev         → staging (preview deployments on Vercel)
feature/*   → feature branches (preview deployments)
```

### Legacy directory warning

The `rasa-site/` subdirectory **must be deleted** before final production deployment. It is an earlier iteration of the project left in the repository root and will not be built, but it adds confusion and unnecessary repository weight.

---

## 14. Future Improvements

Prioritised from highest immediate business value to longest-term technical investment:

### High priority (before or shortly after launch)

| Task | Notes |
|---|---|
| EmailJS integration | Replace mock form submission with real email delivery |
| Real photography | Replace all placeholder images with actual site photography |
| Google Maps embed | Replace placeholder coordinate with real embed URL |
| Social media links | Update Footer with live handles |
| OG image | Add `opengraph-image.jpg` to `app/` for link previews |

### Medium priority (post-launch)

| Task | Notes |
|---|---|
| SEO enhancements | `robots.txt`, `sitemap.xml`, Schema.org structured data for local business |
| Google Analytics / Vercel Analytics | Track visitor sources and contact conversion |
| Advanced project filtering | Filter by location, project year, scale |
| WhyChooseUs section | Currently has a component written but not added to `page.tsx`; evaluate inclusion |

### Long-term

| Task | Notes |
|---|---|
| CMS integration | Sanity.io or Contentful for client-editable projects and services |
| Admin dashboard | Protected route for Gurusamy sir to add projects and update photos |
| Blog / Articles | Construction insights, project case studies — SEO long-tail traffic |
| Tamil language support | `next-intl` for Tamil/English switching |
| Testimonials form | Auto-submit review form → testimonials data |

---

## 15. Design Philosophy

This section exists to ensure that future changes — whether code corrections, redesigns, or feature additions — do not accidentally destroy the aesthetic intent of the project.

### The core emotional goal

A visitor arriving at this site should feel:

> *"This is a serious, experienced, trustworthy construction company. They know their work. This feels real."*

Not:
> *"This is a professionally designed website."*

Those are different feelings. The first comes from human texture, imperfect layout asymmetry, editorial weight, and restraint. The second comes from polish without soul.

### What makes this site feel human-designed

**Layout asymmetry is intentional.** The About section uses a 5:7 column ratio — not 50/50. The Contact form column is 1:1.15 — not equal. These ratios create visual tension that feels like a decision, not a default.

**Spacing is unequal across the vertical axis.** The hero's stat strip has generous whitespace above it. The CTA is shorter than other sections. Section rhythm varies — this is what creates the feeling of a designed page, not a stacked template.

**The grain overlay is non-negotiable.** It is the single most important tool for preventing the "AI-generated glossy render" aesthetic. Every section has it. Do not remove it.

**Dark sections have depth, not flatness.** The testimonials and Why Choose Us sections use a gradient from `#030f10` to `#083335` to `#030f10` — not a flat colour. The radial glow overlay adds subtle warmth.

**Photography is treated cinematically.** Hero overlays are directional (left-heavy), not flat dark screens. Gradients follow narrative direction — they darken where text lives, fade where image should breathe.

### What to avoid when making changes

| Avoid | Why |
|---|---|
| Centered layouts in every section | Destroys the editorial quality; feels like a SaaS landing page |
| Identical card structures across sections | Repetition reads as template, not design |
| Additional animation effects | The site is deliberately restrained; more motion reads as unprofessional |
| Replacing inline styles with arbitrary Tailwind utilities | Breaks the spacing system contract |
| Adding gradients that use non-brand colors | The palette is tightly controlled — beige-on-deep-teal only |
| Removing the eyebrow label + heading pattern | This editorial device is what creates consistent visual hierarchy |
| Making the logo larger or adding a filled background | The logo is a line mark — it should sit cleanly on dark backgrounds |

### On the role of technology

The technology choices (Next.js, Framer Motion, TypeScript) are in service of one goal: **making the site feel fast, real, and trustworthy to a Tamil Nadu construction professional**. They are not showcases of technical skill. If a simpler solution exists for a problem, choose it. If an animation feels gratuitous, remove it. The site should feel like it was made for the client — not for a developer portfolio.

---

## Appendix: Key File Reference

| File | Purpose |
|---|---|
| `src/app/globals.css` | Design system — all tokens, classes, animations |
| `src/data/company.ts` | Master company data — single source of truth |
| `src/components/layout/Container.tsx` | The only allowed container component |
| `src/lib/animations.ts` | All Framer Motion variants |
| `src/lib/utils.ts` | `scrollTo`, `cx`, `waLink`, `clamp` |
| `src/components/ui/Button.tsx` | All CTA buttons and links — use this, not raw `<a>` |
| `src/components/ui/SectionTitle.tsx` | All section headings — use this, not raw `<h2>` |
| `src/components/animations/Reveal.tsx` | All scroll-triggered animations — use this wrapper |

---

*Handover prepared by the development team. For questions about design decisions, refer to Section 15. For content updates, start with Section 10. For deployment, see Section 13.*
