# Rasa Construction

A premium construction company portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion. Designed with a cinematic, architect-inspired aesthetic — editorial layouts, brutalist typography, and a strict professional design system throughout.

The site showcases Rasa Construction's core services: scaffolding & centring materials rental, concrete works, and vertical hoist rental, serving builders and contractors across Tamil Nadu.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework — file-based routing, SSR, image optimization, streaming |
| **React 19** | Component model and state management |
| **Tailwind CSS v4** | Utility classes alongside the custom CSS design system |
| **Framer Motion** | Scroll-triggered animations, page transitions, layout animations |
| **TypeScript** | End-to-end type safety across components, data, and hooks |
| **Vercel** | Production deployment platform, edge network, analytics |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system — tokens, spacing scale, typography, animations
│   ├── layout.tsx           # Root layout — Navbar, Footer, metadata
│   ├── loading.tsx          # Next.js streaming loading UI
│   └── page.tsx             # Page assembly — compositional only, no business logic
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky navigation with scroll-aware state
│   │   ├── Footer.tsx       # 4-column footer, pulls data from company.ts
│   │   └── Container.tsx    # Single container system (max-width: 1280px)
│   │
│   ├── sections/
│   │   ├── Hero.tsx         # Full-viewport hero with parallax and stat strip
│   │   ├── About.tsx        # Asymmetric 5/7 grid with animated counter
│   │   ├── Services.tsx     # 3-column card grid, data-driven from services.ts
│   │   ├── Projects.tsx     # Filterable masonry gallery from projects.ts
│   │   ├── Testimonials.tsx # 3-column review grid from testimonials.ts
│   │   ├── Contact.tsx      # Contact info + quote request form
│   │   └── CTA.tsx          # Parallax call-to-action banner
│   │
│   ├── ui/
│   │   ├── Button.tsx       # Polymorphic button (renders as <a> or <button>)
│   │   ├── SectionTitle.tsx # Eyebrow label + heading with light/dark theme
│   │   ├── Badge.tsx        # Tag/label pill with light/dark/green variants
│   │   ├── Logo.tsx         # Rasa Construction inline SVG logo mark
│   │   └── WhatsAppFloat.tsx # Fixed WhatsApp CTA button
│   │
│   └── animations/
│       ├── Reveal.tsx       # Scroll-triggered reveal wrapper (up/left/right)
│       └── Parallax.tsx     # Performant CSS parallax using passive scroll listener
│
├── data/
│   ├── company.ts           # All company info — name, contact, location, nav links
│   ├── projects.ts          # Portfolio projects with category metadata
│   ├── services.ts          # Service catalogue with icon names and image paths
│   └── testimonials.ts      # Client testimonials with initials and ratings
│
├── hooks/
│   ├── useScroll.ts         # Scroll position, direction, and threshold state
│   └── useMobile.ts         # Responsive breakpoint detection via matchMedia
│
├── lib/
│   ├── animations.ts        # Shared Framer Motion variants (fadeUp, slideLeft, stagger…)
│   ├── constants.ts         # App-wide constants — breakpoints, icon map, site URL
│   └── utils.ts             # Pure utility functions — scrollTo, cx, waLink, clamp
│
└── types/
    ├── project.ts           # Project interface
    ├── service.ts           # Service interface
    └── testimonial.ts       # Testimonial interface

public/
├── hero/                    # Hero background images
├── projects/                # Project gallery images
├── services/                # Service-specific imagery
├── team/                    # Team and about section photos
├── logos/                   # Brand assets
└── icons/                   # Icon assets
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Lint check

```bash
npm run lint
```

---

## Design System

The entire visual language is managed in `src/app/globals.css` as CSS custom properties. No component uses arbitrary spacing or color values.

### Spacing (8pt scale)

```css
--s1:  8px    --s2:  16px   --s3:  24px   --s4:  32px
--s6:  48px   --s8:  64px   --s12: 96px   --s16: 128px
```

### Section Rhythm

| Breakpoint | Padding |
|---|---|
| Desktop (> 1024px) | 120px top/bottom |
| Tablet (640–1024px) | 96px top/bottom |
| Mobile (< 640px) | 72px top/bottom |

### Typography Scale

| Token | Size | Usage |
|---|---|---|
| `--t-hero` | clamp(44px → 72px) | Hero headline |
| `--t-h1` | clamp(32px → 48px) | Section titles |
| `--t-h2` | 24px | Card headings, subtitles |
| `--t-body` | 18px | Body copy |
| `--t-sm` | 14px | Labels, captions, metadata |

### Container System

One container, used everywhere via the `.c` class:

```css
max-width: 1280px
padding-inline: 80px  /* desktop */
padding-inline: 48px  /* tablet */
padding-inline: 20px  /* mobile */
```

Use the `Container` component instead of raw divs with padding:

```tsx
<Container section>  {/* section adds 120/96/72px vertical padding */}
  ...
</Container>
```

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--clr-primary` | `#083335` | Brand green-teal |
| `--clr-accent` | `#D8B9A3` | Warm beige — CTAs, highlights |
| `--clr-bg` | `#F7F5F2` | Off-white background |
| `--clr-dark` | `#051f21` | Deep dark — footer, sections |

---

## Data Management

All content is separated from UI components. To update the site's content, edit the files in `src/data/` — no JSX changes needed.

### Company information — `src/data/company.ts`

Update business details: name, owner, phone numbers, email, address, founding year, and navigation links.

```ts
export const company = {
  name:    "Rasa Construction",
  owner:   "Gurusamy A",
  contact: { primary: "+91 98427 66379", ... },
  ...
}
```

### Services — `src/data/services.ts`

Add, remove, or edit services. Each entry includes a title, description, tag, Lucide icon name, and optional image path.

```ts
export const services: Service[] = [
  { id: "scaffolding", title: "Scaffolding Rental", iconName: "LayoutGrid", image: "/projects/scaffolding.png", ... },
  ...
]
```

### Projects — `src/data/projects.ts`

Add portfolio projects. The `category` field is used to auto-generate filter tabs — no manual updates needed.

```ts
export const projects: Project[] = [
  { id: "site-1", title: "High-Rise Scaffolding", category: "Scaffolding", location: "Tirunelveli, TN", image: "/projects/scaffolding.png", tall: true },
  ...
]
```

### Testimonials — `src/data/testimonials.ts`

Update client reviews. Initials are used as avatar placeholders.

---

## Image Management

### Directory structure

Place all images in the appropriate `public/` subdirectory:

| Folder | Content |
|---|---|
| `public/hero/` | Hero section background |
| `public/projects/` | Project gallery images |
| `public/team/` | About / team photography |
| `public/services/` | Service card backgrounds |

### Replacing images

1. Add your image to the correct folder (WebP recommended, JPG acceptable)
2. Update the path in the relevant data file (`projects.ts`, `services.ts`)
3. Specify dimensions via the `sizes` prop on the `<Image>` component

### Recommended specs

| Usage | Format | Aspect Ratio | Notes |
|---|---|---|---|
| Hero background | WebP | 16:9 | Min 1920px wide, compress to < 400KB |
| Project gallery — tall | WebP | 3:4 | Portrait orientation |
| Project gallery — wide | WebP | 4:3 | Landscape orientation |
| About / team | WebP | 4:5 | Subject centered top-third |

All images use Next.js `<Image>` with `fill`, `lazy`, and `sizes` attributes for automatic optimization.

---

## Animation System

All Framer Motion variants are defined in `src/lib/animations.ts` and shared across components.

```ts
import { fadeUp, slideLeft, stagger } from "@/lib/animations";
```

For scroll-triggered reveals, use the `Reveal` wrapper component instead of inline `useInView` hooks:

```tsx
<Reveal direction="left" delay={0.1}>
  <YourComponent />
</Reveal>
```

For parallax backgrounds:

```tsx
<Parallax speed={0.35}>
  <Image ... />
</Parallax>
```

Available directions: `up` (default), `left`, `right`.

---

## Responsive Design

The site is built mobile-first. Breakpoints are defined in `src/lib/constants.ts` and used via the `useMobile` hook and CSS media queries.

| Breakpoint | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Multi-column grids collapse gracefully using CSS Grid:

```tsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
  className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments on push.

**Build settings:**

| Setting | Value |
|---|---|
| Framework | Next.js |
| Build command | `npm run build` |
| Output directory | `.next` |
| Install command | `npm install` |

### Environment variables

No environment variables are required for the base setup. If you integrate EmailJS for the contact form, add:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Performance Notes

- **Images**: All served via Next.js Image Optimization with WebP/AVIF auto-conversion
- **Fonts**: Loaded via Google Fonts with `display=swap` to eliminate render blocking
- **Animations**: Parallax uses passive scroll listeners and direct DOM ref mutation — no React re-renders on scroll
- **Code splitting**: Each section is a separate module; Next.js handles automatic chunk splitting
- **Grain texture**: Implemented as a CSS SVG data URI — zero additional HTTP requests

---

## Customization

### Changing the brand color

Update `--clr-primary` in `src/app/globals.css`:

```css
:root {
  --clr-primary: #083335;    /* change this */
  --clr-accent:  #D8B9A3;    /* and this for the warm accent */
}
```

### Adding a new section

1. Create `src/components/sections/YourSection.tsx`
2. Add your data type to `src/types/`
3. Add data to `src/data/`
4. Import and place in `src/app/page.tsx`

### Updating navigation

Edit `company.navLinks` in `src/data/company.ts` — the Navbar and Footer both source from there.

---

## Future Roadmap

- **CMS integration** — Connect to Sanity or Contentful for client-editable content
- **Admin dashboard** — Project management panel for adding new work
- **Blog section** — Construction insights and project case studies
- **SEO enhancements** — Structured data (Schema.org), sitemap generation, OG images
- **Advanced project filtering** — Filter by location, year, project type
- **EmailJS integration** — Live contact form submission with confirmation emails
- **Multi-language support** — Tamil and English localization
- **Analytics** — Vercel Analytics + Google Search Console integration

---

## License

Private project. All rights reserved — Rasa Construction © 2026.

---

*Built with precision. Delivered with trust.*
