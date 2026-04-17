# WaterVibes — Project Plan

> Premium jacuzzi catalog & lead-generation site for **WaterVibes**.
> Clean, modern, minimalist aesthetic. Bilingual (EN + RO).
> Full-stack Next.js with MongoDB and Resend-powered contact form.

---

## 1. Goals & Scope

### Primary Goals

- Showcase a curated catalog of jacuzzis with filtering (size, color).
- Capture leads through a simple contact form (email delivery via Resend).
- Allow the owner to manage products & testimonials via a password-protected admin UI.
- Deliver a premium, responsive, bilingual experience (English + Romanian).

### Out of Scope (v1)

- Online checkout, payments, shopping cart.
- User accounts / authentication for end customers.
- Reviews submitted by end users (admin-curated testimonials only).
- Blog, FAQ, services, financing pages.
- Dark mode.

---

## 2. Tech Stack

| Layer           | Choice                                    | Why                                                                |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| Framework       | **Next.js 15 (App Router)**               | Full-stack in one project, API routes, SSR/ISR, image optimization |
| Language        | **TypeScript**                            | Type safety across frontend/backend                                |
| Styling         | **Tailwind CSS v4**                       | Utility-first, airy minimalist design                              |
| UI primitives   | **shadcn/ui + Radix**                     | Accessible, unstyled primitives we can theme                       |
| Icons           | **lucide-react**                          | Clean, consistent icon set                                         |
| Database        | **MongoDB** (Atlas or local)              | NoSQL flexibility for products/testimonials                        |
| ODM             | **Mongoose**                              | Schema validation, typed models                                    |
| Email           | **Resend**                                | Simple API for contact form notifications                          |
| Forms           | **react-hook-form + zod**                 | Typed validation, client + server                                  |
| i18n            | **next-intl**                             | App Router-native, EN + RO                                         |
| Auth (admin)    | **Simple password + JWT cookie** (`jose`) | No overkill for a single-admin site                                |
| Image hosting   | **Cloudinary** (URLs stored in MongoDB)   | Easy transformations, free tier                                    |
| Hosting target  | **Vercel**                                | Zero-config Next.js deploy                                         |
| Package manager | **pnpm**                                  | Fast, disk-efficient                                               |

---

## 3. Design Direction

**Vibe:** Clean & modern — airy, minimalist, lots of whitespace.

### Visual Language

- **Palette:**
  - `--background`: `#FBFBF9` (warm off-white)
  - `--foreground`: `#0E1A24` (deep navy-black)
  - `--primary`: `#0A6E8C` (calm water teal)
  - `--accent`: `#E8F1F2` (soft pale blue)
  - `--muted`: `#6B7280`
  - `--border`: `#E5E7EB`
- **Typography:**
  - Headings: **Fraunces** (serif, editorial feel) or **Instrument Serif**
  - Body: **Inter** (sans, clean)
  - Loaded via `next/font/google`.
- **Spacing:** Generous — sections `py-24 md:py-32`, max content width `max-w-6xl`.
- **Imagery:** Large, high-quality product photography with subtle hover zoom. Negative space is a feature, not a bug.
- **Motion:** Restrained — `framer-motion` for fade-ups on scroll, 300ms easing. No bouncy or flashy effects.
- **Corners:** `rounded-2xl` for cards, `rounded-xl` for buttons/inputs.

### Responsiveness

Mobile-first. Breakpoints: `sm 640` / `md 768` / `lg 1024` / `xl 1280`. Test nav, hero, catalog grid, product gallery on mobile first.

---

## 4. Pages & Routes

| Route                        | Purpose                                                                              | Data source                               |
| ---------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| `/` (localized `/en`, `/ro`) | Hero video/image, featured products, testimonials, CTA                               | MongoDB (featured products, testimonials) |
| `/[locale]/catalog`          | All products with size + color filters                                               | MongoDB (products)                        |
| `/[locale]/catalog/[slug]`   | Product detail: gallery, specs, "Request a Quote" CTA → opens contact form prefilled | MongoDB (single product)                  |
| `/[locale]/about`            | Brand story, values                                                                  | Static content in translation files       |
| `/[locale]/contact`          | Contact form → Resend email                                                          | —                                         |
| `/admin/login`               | Password entry                                                                       | —                                         |
| `/admin`                     | Dashboard: product & testimonial CRUD                                                | MongoDB (protected)                       |
| `/api/contact`               | POST → sends email via Resend                                                        | —                                         |
| `/api/products`              | GET (public) / POST (admin)                                                          | MongoDB                                   |
| `/api/products/[id]`         | GET / PUT / DELETE (admin)                                                           | MongoDB                                   |
| `/api/testimonials`          | GET (public) / POST (admin)                                                          | MongoDB                                   |
| `/api/testimonials/[id]`     | PUT / DELETE (admin)                                                                 | MongoDB                                   |
| `/api/admin/login`           | POST → issues JWT cookie                                                             | —                                         |
| `/api/admin/logout`          | POST → clears cookie                                                                 | —                                         |

---

## 5. Data Models

### Product

```ts
{
  _id: ObjectId
  slug: string            // unique, URL-safe (e.g., "azure-6")
  name: { en: string, ro: string }
  tagline: { en: string, ro: string }
  description: { en: string, ro: string }   // markdown allowed
  size: "2-person" | "4-person" | "6+person"
  color: string           // hex or named: "white", "graphite", "teak", etc.
  colorHex: string        // for swatches
  price: number           // in EUR, display only — no checkout
  images: string[]        // Cloudinary URLs, first is primary
  specs: {
    dimensions: string    // "2.1m x 2.1m x 0.9m"
    jets: number
    capacity: number      // persons
    power: string         // "3.5 kW"
    weightEmpty: string
    weightFull: string
  }
  features: { en: string[], ro: string[] }
  featured: boolean       // show on homepage
  order: number           // for manual sorting
  createdAt: Date
  updatedAt: Date
}
```

### Testimonial

```ts
{
  _id: ObjectId
  author: string
  location: string
  quote: { en: string, ro: string }
  rating: 1 | 2 | 3 | 4 | 5
  featured: boolean
  createdAt: Date
}
```

### AdminSession (implicit — JWT cookie, no DB table)

---

## 6. Forms & Lead Capture

### Contact form fields

`name`, `email`, `phone (optional)`, `message`, optional hidden `productSlug` when arriving from a product page.

### Flow

1. Client-side validation via `zod` + `react-hook-form`.
2. POST to `/api/contact`.
3. Server re-validates, then calls `Resend.emails.send()`.
4. Email goes to `CONTACT_EMAIL` constant (from env).
5. Success/error toast via `sonner`.

### NOT saved to DB

Per spec — email is the only destination.

---

## 7. Admin Auth

- Single password stored as `ADMIN_PASSWORD_HASH` (bcrypt) in env.
- `POST /api/admin/login` compares, issues signed JWT (jose) in `httpOnly` cookie, 7-day expiry.
- Middleware (`middleware.ts`) protects `/admin/*` and admin API routes.
- Logout clears cookie.

---

## 8. Internationalization (next-intl)

- Locales: `en` (default), `ro`.
- URL structure: `/en/...`, `/ro/...`. Root `/` redirects to user's preferred locale.
- Translation files: `messages/en.json`, `messages/ro.json`.
- Product/testimonial text is bilingual **in the data model**, so admin enters both.
- Static UI text (nav, buttons, labels) lives in the JSON message files.
- Language switcher in header.

---

## 9. Seed Data (8 products, 4 testimonials)

Claude will invent realistic WaterVibes SKUs, e.g.:

- **Azure 2** — 2-person, white, entry level
- **Azure 4** — 4-person, white, mid
- **Coral Breeze** — 4-person, teak, mid
- **Serenity 6** — 6+-person, graphite, premium
- **Lagoon Pro** — 6+-person, white, premium
- **Pebble 2** — 2-person, graphite, entry
- **Meridian 4** — 4-person, graphite, mid
- **Oasis Signature** — 6+-person, teak, luxury

Seed script: `pnpm seed` (reads `lib/seed-data.ts`, wipes + reinserts).

---

## 10. Repo Map

```
watervibes/
├── PLAN.md                          # this file
├── CLAUDE.md                        # Claude Code operating manual
├── README.md                        # human-facing setup notes
├── .env.example                     # documents required env vars
├── .env.local                       # (gitignored)
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── package.json
├── middleware.ts                    # i18n + admin auth
│
├── public/
│   ├── fonts/                       # self-hosted fallbacks if needed
│   ├── videos/                      # hero.mp4 (or Cloudinary URL)
│   └── images/                      # static brand assets (logo, og-image)
│
├── messages/
│   ├── en.json                      # English UI strings
│   └── ro.json                      # Romanian UI strings
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # localized root layout (fonts, header, footer)
│   │   │   ├── page.tsx             # HOME
│   │   │   ├── catalog/
│   │   │   │   ├── page.tsx         # CATALOG (server component, reads products)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # PRODUCT DETAIL
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx           # admin shell (sidebar nav)
│   │   │   ├── page.tsx             # dashboard
│   │   │   ├── login/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # list
│   │   │   │   ├── new/page.tsx     # create
│   │   │   │   └── [id]/page.tsx    # edit
│   │   │   └── testimonials/
│   │   │       ├── page.tsx
│   │   │       ├── new/page.tsx
│   │   │       └── [id]/page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── testimonials/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── admin/
│   │   │       ├── login/route.ts
│   │   │       └── logout/route.ts
│   │   │
│   │   ├── globals.css              # Tailwind + CSS vars
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn primitives (button, input, dialog, …)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx             # video or image, headline, CTA
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── HomeCTA.tsx
│   │   ├── catalog/
│   │   │   ├── CatalogGrid.tsx
│   │   │   ├── CatalogFilters.tsx   # size + color
│   │   │   ├── ProductCard.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── product/
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductSpecs.tsx
│   │   │   ├── ProductFeatures.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   └── QuoteCTA.tsx         # opens ContactForm prefilled
│   │   ├── contact/
│   │   │   └── ContactForm.tsx
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── ProductForm.tsx      # create + edit
│   │   │   ├── TestimonialForm.tsx
│   │   │   ├── DataTable.tsx        # generic list
│   │   │   └── DeleteDialog.tsx
│   │   └── shared/
│   │       ├── Container.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── PriceTag.tsx
│   │       └── FadeIn.tsx           # scroll-triggered motion wrapper
│   │
│   ├── lib/
│   │   ├── db.ts                    # Mongoose connection (cached)
│   │   ├── models/
│   │   │   ├── Product.ts
│   │   │   └── Testimonial.ts
│   │   ├── auth.ts                  # JWT sign/verify, password check
│   │   ├── resend.ts                # Resend client + send helper
│   │   ├── validators/
│   │   │   ├── product.ts           # zod schemas
│   │   │   ├── testimonial.ts
│   │   │   └── contact.ts
│   │   ├── i18n.ts                  # next-intl config
│   │   ├── constants.ts             # CONTACT_EMAIL, SIZES, COLORS
│   │   ├── utils.ts                 # cn(), formatPrice, slugify
│   │   └── seed-data.ts             # 8 products + 4 testimonials
│   │
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useFilters.ts
│   │
│   └── types/
│       ├── product.ts
│       ├── testimonial.ts
│       └── index.ts
│
└── scripts/
    └── seed.ts                      # pnpm seed → populates MongoDB
```

---

## 11. Environment Variables

Documented in `.env.example`:

```
# MongoDB
MONGODB_URI=mongodb+srv://...
MONGODB_DB=watervibes

# Resend
RESEND_API_KEY=re_...
CONTACT_EMAIL=hello@watervibes.example
FROM_EMAIL=noreply@watervibes.example

# Admin auth
ADMIN_PASSWORD_HASH=$2a$10$...        # bcrypt hash of the admin password
JWT_SECRET=<32+ random bytes>

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 12. Build Phases (for Claude Code)

Execute in order. Do not skip ahead. Commit after each phase.

### Phase 0 — Scaffold

1. `pnpm create next-app@latest watervibes --ts --tailwind --app --eslint --src-dir --import-alias "@/*"`
2. Install dependencies: `mongoose`, `resend`, `next-intl`, `zod`, `react-hook-form`, `@hookform/resolvers`, `jose`, `bcryptjs`, `framer-motion`, `lucide-react`, `sonner`, `clsx`, `tailwind-merge`, `class-variance-authority`.
3. Install shadcn/ui: `pnpm dlx shadcn@latest init` then add `button input textarea select dialog sheet dropdown-menu label toast`.
4. Create `.env.example`, `.env.local`, `CLAUDE.md` (already present).
5. Commit: `chore: scaffold Next.js app`.

### Phase 1 — Foundations

1. Tailwind theme tokens in `globals.css` (CSS vars for palette above).
2. Fonts via `next/font/google` (Fraunces + Inter) in root layout.
3. `lib/db.ts` (Mongoose cached connection).
4. `lib/models/Product.ts`, `lib/models/Testimonial.ts`.
5. `middleware.ts` for i18n routing only (auth later).
6. `next-intl` setup: `messages/en.json`, `messages/ro.json`, `lib/i18n.ts`.
7. `Header`, `Footer`, `LanguageSwitcher`, `Container`, `SectionHeading`.
8. Commit: `feat: foundations — db, i18n, layout`.

### Phase 2 — Catalog & Product

1. `/api/products` GET route.
2. Catalog page (server component fetches products).
3. `CatalogFilters` (size + color) with URL state via `searchParams`.
4. `ProductCard`, `CatalogGrid`, `EmptyState`.
5. Product detail page with `ProductGallery`, `ProductSpecs`, `ProductFeatures`, `QuoteCTA`.
6. Commit: `feat: catalog and product detail`.

### Phase 3 — Home

1. `Hero` with video (fallback image), headline, CTA buttons.
2. `FeaturedProducts` (pulls `featured: true`).
3. `Testimonials` carousel/grid.
4. `HomeCTA` (closing banner → /contact).
5. Commit: `feat: homepage`.

### Phase 4 — Contact & Resend

1. `ContactForm` with react-hook-form + zod.
2. `/api/contact` route → `lib/resend.ts` sends email.
3. Success/error toasts.
4. "Request a Quote" on product page prefills `productSlug`.
5. Commit: `feat: contact form + resend`.

### Phase 5 — Admin

1. `lib/auth.ts` (bcrypt compare, jose JWT sign/verify).
2. `/admin/login` page + `/api/admin/login` route.
3. Extend `middleware.ts` to protect `/admin/*` except `/admin/login`.
4. Admin shell (`AdminSidebar`, layout).
5. Products CRUD: list, create, edit, delete.
6. Testimonials CRUD.
7. Commit: `feat: admin panel`.

### Phase 6 — Seed + About + Polish

1. `scripts/seed.ts` + `pnpm seed` script.
2. `/about` page content.
3. Accessibility pass: focus rings, semantic HTML, alt text, keyboard nav.
4. Lighthouse pass on desktop + mobile.
5. OG image + metadata per page.
6. `sitemap.ts`, `robots.ts`.
7. Commit: `feat: seed, about, polish`.

---

## 13. Acceptance Checklist

- [ ] Homepage loads under 2s on fast 3G (Lighthouse).
- [ ] Catalog filters work and reflect in URL.
- [ ] Product detail "Request a Quote" delivers email via Resend.
- [ ] Admin login works; unauthenticated access to `/admin` redirects to login.
- [ ] Product CRUD in admin persists to MongoDB.
- [ ] Language switcher swaps all copy, URLs, and product fields.
- [ ] Mobile nav is keyboard & screen-reader accessible.
- [ ] No console errors in production build.
- [ ] `pnpm seed` populates 8 products + 4 testimonials cleanly.

---

## 14. Future (post-v1)

Don't build these yet, but keep the codebase friendly toward:

- Stripe checkout.
- Customer accounts & saved quotes.
- Blog / buyer's guides.
- Dealer locator / showroom map.
- CMS migration (Sanity) if non-technical users need to edit content.
- Dark mode.
