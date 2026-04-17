# CLAUDE.md — Operating Manual for Claude Code

> Read this **first** every session. It tells you how this repo is organized, how to navigate it, and the rules you must follow while making changes. The authoritative product spec lives in [`PLAN.md`](./PLAN.md) — consult it whenever you are unsure about scope, design, or data model.

---

## 1. Project in One Paragraph

**WaterVibes** is a bilingual (English + Romanian) catalog & lead-generation site for a jacuzzi brand. It is a full-stack **Next.js 15 App Router** app with **TypeScript**, **Tailwind**, **MongoDB (Mongoose)**, and **Resend** for email. End customers browse jacuzzis, filter by size and color, view product details, and submit contact/quote requests that email the owner. The owner manages products and testimonials through a password-protected `/admin` panel. There is **no checkout, no cart, no customer accounts.**

---

## 2. Golden Rules

1. **PLAN.md is the source of truth.** If a user request contradicts PLAN.md, stop and ask.
2. **Follow the build phases.** Don't skip ahead. Phase 0 → 6 in PLAN.md §12.
3. **Small, reviewable commits.** One concern per commit. Use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
4. **Type everything.** No `any`. Prefer `unknown` + narrowing, or a proper type.
5. **Server components by default** in the App Router. Only add `"use client"` when you need state, effects, or browser-only APIs.
6. **Keep data bilingual.** Product/testimonial text fields are `{ en, ro }`. Never store a single string.
7. **Never commit secrets.** Only `.env.example` is tracked.
8. **Accessibility is not optional.** Every interactive element must be keyboard-reachable with a visible focus ring.
9. **Mobile-first.** Write the mobile layout first, enhance upward.
10. **Ask before scope creep.** New page, new dependency, new service → confirm with the user.
11. **Design changes must reference `docs/DESIGN.md`.** Tokens, typography, motion, layout rules all live there. If what you're building isn't in DESIGN.md, stop and propose an addition before implementing.

---

## 3. Repo Map (where to find things)

> Reflects the actual state of the repo (tracked files + in-progress additions). Anything in `PLAN.md` but missing below has not been built yet. Keep this map in sync — see §3a.

```
.
├── PLAN.md                                 # product spec — read for product decisions
├── CLAUDE.md                               # this file — workflow rules
├── AGENTS.md                               # cross-agent operating notes
├── README.md                               # human-facing setup
├── .env.example                            # env var reference
├── components.json                         # shadcn/ui generator config
├── eslint.config.mjs                       # ESLint flat config
├── next.config.ts                          # Next.js config (next-intl plugin wiring)
├── postcss.config.mjs                      # PostCSS / Tailwind v4 pipeline
├── tsconfig.json                           # TypeScript config + @/ path alias
├── package.json                            # deps + pnpm scripts (dev, build, seed, …)
├── pnpm-workspace.yaml                     # pnpm workspace marker
│
├── docs/
│   ├── DESIGN.md                           # authoritative visual direction (palette, type, motion, components)
│   ├── IMAGERY.md                          # curated Unsplash picks mapped to site roles
│   └── skills/
│       └── frontend-design.md              # design-thinking reference (distinctive, non-generic UI)
│
├── messages/
│   ├── en.json                             # English UI strings
│   └── ro.json                             # Romanian UI strings
│
├── public/
│   ├── *.svg                               # Next.js scaffold SVGs (file, globe, next, vercel, window) — brand assets TBD
│   └── videos/
│       └── hero.mp4                        # homepage hero background video (local)
│
├── scripts/
│   └── seed.ts                             # `pnpm seed` — wipes + reseeds Mongo from lib/seed-data.ts
│
└── src/
    ├── proxy.ts                            # Next.js 16 proxy (middleware): i18n routing for public pages + JWT guard for /admin and /api/admin
    │
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css                     # Tailwind v4 + CSS custom properties (design tokens)
    │   ├── sitemap.ts                      # MetadataRoute.Sitemap — /en, /ro static paths + product slugs from MongoDB
    │   ├── robots.ts                       # MetadataRoute.Robots — allow /, disallow /admin/ + /api/, sitemap ref
    │   │
    │   ├── [locale]/                       # all public pages live here (bilingual)
    │   │   ├── layout.tsx                  # header + footer + fonts + SkipToContent + <main id="main"> + metadata template + og image
    │   │   ├── page.tsx                    # HOME → components/home/* (Hero + Featured + Testimonials + CTA)
    │   │   ├── not-found.tsx               # localized 404 — rendered by notFound() inside [locale]
    │   │   ├── error.tsx                   # "use client" — localized error boundary (Try again + Back home)
    │   │   ├── [...rest]/page.tsx          # catch-all — triggers notFound() so unknown localized paths hit not-found.tsx
    │   │   ├── about/
    │   │   │   └── page.tsx                # ABOUT page (server) → hero + story + values + HomeCTA, FadeIn sections
    │   │   ├── catalog/
    │   │   │   ├── page.tsx                # CATALOG list → components/catalog/*
    │   │   │   ├── loading.tsx             # skeleton grid (9 cards) + filter placeholder
    │   │   │   └── [slug]/
    │   │   │       ├── page.tsx            # PRODUCT DETAIL → components/product/*
    │   │   │       └── loading.tsx         # skeleton gallery + text placeholders
    │   │   └── contact/
    │   │       └── page.tsx                # CONTACT page (server) → components/contact/ContactForm
    │   │
    │   ├── admin/                          # ENGLISH-ONLY — internal CMS, never locale-prefixed
    │   │   ├── layout.tsx                  # root html/body/fonts for the /admin tree (public — includes /admin/login)
    │   │   ├── login/page.tsx              # "use client" — POSTs password to /api/admin/login, redirects on success
    │   │   └── (protected)/                # route group — auth guard + sidebar + Toaster apply only here
    │   │       ├── layout.tsx              # server: await requireAdmin() + renders <AdminSidebar /> + <main> + <Toaster />
    │   │       ├── error.tsx               # "use client" — English-only admin error boundary (Try again + Back to dashboard)
    │   │       ├── page.tsx                # /admin dashboard — product/testimonial count cards + manage links
    │   │       ├── products/
    │   │       │   ├── page.tsx            # list → <ProductsTable /> + "New product" link
    │   │       │   ├── loading.tsx         # skeleton table (6 rows)
    │   │       │   ├── new/page.tsx        # renders <ProductForm mode="create" />
    │   │       │   └── [id]/page.tsx       # loads product by id → <ProductForm mode="edit" />
    │   │       └── testimonials/
    │   │           ├── page.tsx            # list → <TestimonialsTable /> + "New testimonial" link
    │   │           ├── new/page.tsx        # renders <TestimonialForm mode="create" />
    │   │           └── [id]/page.tsx       # loads testimonial by id → <TestimonialForm mode="edit" />
    │   │
    │   └── api/
    │       ├── contact/
    │       │   └── route.ts                # POST → zod + Resend send; in-memory IP rate limit
    │       ├── products/
    │       │   ├── route.ts                # GET (public list), POST (admin — verifies session cookie)
    │       │   └── [id]/route.ts           # GET / PUT / DELETE by id (mutations verify session cookie; PUT is full replace)
    │       ├── testimonials/
    │       │   ├── route.ts                # GET (public list), POST (admin — verifies session cookie)
    │       │   └── [id]/route.ts           # GET / PUT / DELETE by id (admin for mutations)
    │       └── admin/
    │           ├── login/route.ts          # POST only — zod + bcrypt compare + sets wv_admin JWT cookie; 5/IP/10m rate limit
    │           ├── logout/route.ts         # POST only — clears wv_admin cookie
    │           └── session/route.ts        # GET only — returns { authenticated: boolean }
    │
    ├── components/
    │   ├── ui/                             # shadcn primitives — DO NOT hand-edit
    │   │   ├── button.tsx
    │   │   ├── dialog.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── select.tsx
    │   │   ├── sheet.tsx
    │   │   ├── slider.tsx                  # Radix Slider wrapper — catalog size filter
    │   │   ├── sonner.tsx                  # toast container
    │   │   └── textarea.tsx
    │   │
    │   ├── layout/
    │   │   ├── Header.tsx                  # server — brand wordmark + 4-item nav + LanguageSwitcher + Request-a-quote Button
    │   │   ├── Footer.tsx                  # server — 3-col on surface + oversized wordmark watermark + photo credit
    │   │   ├── LanguageSwitcher.tsx        # EN/RO toggle preserving route (aria-current on active)
    │   │   ├── MobileNav.tsx               # "use client" — Sheet-based mobile menu (focus trap, Esc closes)
    │   │   ├── ScrolledHeader.tsx          # "use client" — IntersectionObserver shrink-on-scroll chrome wrapper
    │   │   └── SkipToContent.tsx           # server — visible-on-focus "Skip to main content" link → #main
    │   │
    │   ├── admin/
    │   │   ├── AdminSidebar.tsx            # "use client" — fixed-width sidebar + active nav item + sign-out button
    │   │   ├── BilingualField.tsx          # "use client" — EN/RO side-by-side input/textarea pair for react-hook-form
    │   │   ├── DataTable.tsx               # "use client" — generic <table> (columns, rows, emptyMessage, getRowKey)
    │   │   ├── DeleteDialog.tsx            # "use client" — shadcn Dialog for destructive confirm
    │   │   ├── FormSection.tsx             # server wrapper — titled form section w/ divider
    │   │   ├── ProductForm.tsx             # "use client" — the big product create/edit form (composes Basics/Variant/Features/Images)
    │   │   ├── ProductFormBasics.tsx       # "use client" — slug/order/featured section for ProductForm
    │   │   ├── ProductFormFeatures.tsx     # "use client" — bilingual feature bullets (useFieldArray)
    │   │   ├── ProductFormImages.tsx       # "use client" — image-URL rows with thumbnails (TODO: Cloudinary upload)
    │   │   ├── ProductFormVariant.tsx      # "use client" — size/color/colorHex section (auto-fills hex from color)
    │   │   ├── ProductsTable.tsx           # "use client" — products list table + delete dialog state
    │   │   ├── TestimonialForm.tsx         # "use client" — testimonial create/edit form
    │   │   ├── TestimonialsTable.tsx       # "use client" — testimonials list table + delete dialog state
    │   │   └── product-form-types.ts      # zod schema + ProductFormValues shared by ProductForm sections
    │   │
    │   ├── shared/
    │   │   ├── Button.tsx                  # brand Button (primary/accent/outline/ghost) + optional trailing arrow — DESIGN.md §5
    │   │   ├── Container.tsx               # mx-auto wrapper with size: narrow | default | wide
    │   │   ├── FadeIn.tsx                  # "use client" — fade-up reveal + optional animated terracotta hairline
    │   │   ├── ImagePlaceholder.tsx        # warm-surface container with cross-hatch linen + role label — used for the 5 IMAGERY.md roles pending URLs
    │   │   ├── PriceTag.tsx                # formatted EUR price display
    │   │   └── SectionHeading.tsx          # asymmetric (default) or center — eyebrow + h2 + floated lede per DESIGN.md §5
    │   │
    │   ├── home/                           # homepage-only sections
    │   │   ├── Hero.tsx                    # server — video + cream→primary gradient + 7/12 display headline + rotated ordinal eyebrow
    │   │   ├── FeaturedProducts.tsx        # server — grid; after 6 products a full-bleed pull-quote breaks the grid (Goop borrow)
    │   │   ├── BrandStory.tsx              # server — asymmetric short brand story between Featured and Testimonials (Oura gradient borrow)
    │   │   ├── Testimonials.tsx            # server — fetches + renders the hero quote; hand-off to TestimonialsClient for auto-advance
    │   │   ├── TestimonialsClient.tsx      # "use client" — auto-advancing hero quote + filmstrip (10s, pauses on hover / out-of-view / reduced motion)
    │   │   └── HomeCTA.tsx                 # server — closing banner on primary; Button accent → /contact
    │   │
    │   ├── catalog/
    │   │   ├── CatalogGrid.tsx             # responsive product grid
    │   │   ├── CatalogFilters.tsx          # size + color filters (client, URL-state)
    │   │   ├── ProductCard.tsx             # card for grid item
    │   │   ├── ProductCardSkeleton.tsx     # shimmer placeholder matching ProductCard's rounded-2xl frame
    │   │   └── EmptyState.tsx              # shown when filters return zero
    │   │
    │   ├── product/
    │   │   ├── ProductGallery.tsx          # primary image + thumbnails
    │   │   ├── ProductSpecs.tsx            # dimensions / capacity / power table
    │   │   ├── ProductFeatures.tsx         # bilingual feature bullets
    │   │   ├── ColorSwatch.tsx             # color chip (single-color per SKU)
    │   │   └── QuoteCTA.tsx                # "Request a quote" CTA → /contact
    │   │
    │   └── contact/
    │       └── ContactForm.tsx             # "use client" — react-hook-form + zod → POST /api/contact
    │
    ├── i18n/                               # next-intl configuration (not lib/i18n.ts)
    │   ├── routing.ts                      # locales, defaultLocale, pathnames
    │   ├── navigation.ts                   # typed Link / useRouter wrappers
    │   └── request.ts                      # per-request locale/messages loader
    │
    ├── lib/
    │   ├── db.ts                           # Mongoose cached connection — ALWAYS use this
    │   ├── utils.ts                        # cn() (tailwind-merge) + slugify()
    │   ├── constants.ts                    # CONTACT_EMAIL, SIZES, COLORS, etc.
    │   ├── seed-data.ts                    # 8 products + 4 testimonials for `pnpm seed`
    │   ├── resend.ts                       # Resend singleton + sendContactEmail() helper (server-only)
    │   ├── auth.ts                         # bcrypt + jose crypto: verifyPassword, signSessionToken, verifySessionToken, cookie options (Edge-safe)
    │   ├── auth-server.ts                  # Node-only: isAdmin() / requireAdmin() — reads cookies() from next/headers
    │   ├── serializers.ts                  # serializeProduct / serializeTestimonial — converts Mongoose docs to plain JSON for client components
    │   ├── models/
    │   │   ├── Product.ts                  # Mongoose schema (bilingual fields)
    │   │   └── Testimonial.ts              # Mongoose schema (bilingual quote + rating)
    │   └── validators/
    │       ├── product.ts                  # zod schema for product create/update
    │       ├── testimonial.ts              # zod schema for testimonial create/update
    │       └── contact.ts                  # zod schema for contact form (client + server)
    │
    └── types/
        ├── index.ts                        # re-exports
        ├── product.ts                      # Product TS types (mirrors Mongoose model)
        └── testimonial.ts                  # Testimonial TS types
```

**Not yet built (tracked in PLAN.md):** `src/components/admin/ImageUploader.tsx` (Cloudinary — TODO in ProductFormImages.tsx), `/public/og-image.jpg` (1200x630 — TODO in root layout metadata), `src/hooks/*`.

**Status: Redesign complete — warm tactile.**

### Quick lookup — "where does X live?"

| If you need to edit…                    | Go to…                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Public root layout (header/footer/i18n) | [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)               |
| The homepage (composition)              | [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx) → [src/components/home/](src/components/home/) |
| The hero section                        | [src/components/home/Hero.tsx](src/components/home/Hero.tsx)             |
| Homepage featured-products grid         | [src/components/home/FeaturedProducts.tsx](src/components/home/FeaturedProducts.tsx) |
| Homepage testimonials grid              | [src/components/home/Testimonials.tsx](src/components/home/Testimonials.tsx) |
| Homepage closing CTA                    | [src/components/home/HomeCTA.tsx](src/components/home/HomeCTA.tsx)       |
| Scroll fade-up motion wrapper           | [src/components/shared/FadeIn.tsx](src/components/shared/FadeIn.tsx)     |
| The catalog list                        | [src/app/[locale]/catalog/page.tsx](src/app/[locale]/catalog/page.tsx)   |
| The catalog filters                     | [src/components/catalog/CatalogFilters.tsx](src/components/catalog/CatalogFilters.tsx) |
| The product detail page                 | [src/app/[locale]/catalog/[slug]/page.tsx](src/app/[locale]/catalog/[slug]/page.tsx) + [src/components/product/](src/components/product/) |
| The contact page                        | [src/app/[locale]/contact/page.tsx](src/app/[locale]/contact/page.tsx)   |
| The contact form (client)               | [src/components/contact/ContactForm.tsx](src/components/contact/ContactForm.tsx) |
| The About page                          | [src/app/[locale]/about/page.tsx](src/app/[locale]/about/page.tsx)       |
| Localized 404 / error boundary          | [not-found](src/app/[locale]/not-found.tsx) + [error](src/app/[locale]/error.tsx) + catch-all [...rest]/page.tsx |
| Admin error boundary                    | [src/app/admin/(protected)/error.tsx](src/app/admin/(protected)/error.tsx) |
| Sitemap / Robots                        | [src/app/sitemap.ts](src/app/sitemap.ts) + [src/app/robots.ts](src/app/robots.ts) |
| Loading skeletons                       | [catalog](src/app/[locale]/catalog/loading.tsx), [product](src/app/[locale]/catalog/[slug]/loading.tsx), [admin products](src/app/admin/(protected)/products/loading.tsx) + [ProductCardSkeleton](src/components/catalog/ProductCardSkeleton.tsx) |
| Skip-to-content link                    | [src/components/layout/SkipToContent.tsx](src/components/layout/SkipToContent.tsx) |
| Mobile navigation (Sheet)               | [src/components/layout/MobileNav.tsx](src/components/layout/MobileNav.tsx) |
| Contact submit API                      | [src/app/api/contact/route.ts](src/app/api/contact/route.ts)             |
| Resend client / sendContactEmail        | [src/lib/resend.ts](src/lib/resend.ts)                                   |
| Product list/create API                 | [src/app/api/products/route.ts](src/app/api/products/route.ts)           |
| Product detail/mutate API               | [src/app/api/products/[id]/route.ts](src/app/api/products/[id]/route.ts) |
| Testimonials list/create API            | [src/app/api/testimonials/route.ts](src/app/api/testimonials/route.ts)   |
| Testimonial detail/mutate API           | [src/app/api/testimonials/[id]/route.ts](src/app/api/testimonials/[id]/route.ts) |
| Admin login page                        | [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx)             |
| Admin dashboard (shell)                 | [src/app/admin/(protected)/page.tsx](src/app/admin/(protected)/page.tsx) |
| Admin shell layout (sidebar + guard)    | [src/app/admin/(protected)/layout.tsx](src/app/admin/(protected)/layout.tsx) |
| Admin sidebar (nav + logout)            | [src/components/admin/AdminSidebar.tsx](src/components/admin/AdminSidebar.tsx) |
| Admin products list                     | [src/app/admin/(protected)/products/page.tsx](src/app/admin/(protected)/products/page.tsx) + [ProductsTable](src/components/admin/ProductsTable.tsx) |
| Admin product create/edit (form shell)  | [new](src/app/admin/(protected)/products/new/page.tsx) + [edit](src/app/admin/(protected)/products/[id]/page.tsx) |
| Product admin form (big one)            | [src/components/admin/ProductForm.tsx](src/components/admin/ProductForm.tsx) + [sections](src/components/admin/) (ProductForm*.tsx) |
| Admin testimonials list                 | [src/app/admin/(protected)/testimonials/page.tsx](src/app/admin/(protected)/testimonials/page.tsx) + [TestimonialsTable](src/components/admin/TestimonialsTable.tsx) |
| Admin testimonial create/edit           | [new](src/app/admin/(protected)/testimonials/new/page.tsx) + [edit](src/app/admin/(protected)/testimonials/[id]/page.tsx) |
| Testimonial admin form                  | [src/components/admin/TestimonialForm.tsx](src/components/admin/TestimonialForm.tsx) |
| Shared admin primitives                 | [DataTable](src/components/admin/DataTable.tsx), [DeleteDialog](src/components/admin/DeleteDialog.tsx), [BilingualField](src/components/admin/BilingualField.tsx), [FormSection](src/components/admin/FormSection.tsx) |
| Admin auth (crypto, cookie, JWT)        | [src/lib/auth.ts](src/lib/auth.ts) + [src/proxy.ts](src/proxy.ts)        |
| Admin session helpers (server only)     | [src/lib/auth-server.ts](src/lib/auth-server.ts)                         |
| Admin login / logout / session APIs     | [src/app/api/admin/login/route.ts](src/app/api/admin/login/route.ts), [logout](src/app/api/admin/logout/route.ts), [session](src/app/api/admin/session/route.ts) |
| The DB connection                       | [src/lib/db.ts](src/lib/db.ts)                                           |
| Mongo → plain-JSON serializers          | [src/lib/serializers.ts](src/lib/serializers.ts)                         |
| Product schema (Mongoose)               | [src/lib/models/Product.ts](src/lib/models/Product.ts)                   |
| Testimonial schema (Mongoose)           | [src/lib/models/Testimonial.ts](src/lib/models/Testimonial.ts)           |
| Zod validation                          | [src/lib/validators/](src/lib/validators/) *(`product.ts`, `testimonial.ts`, `contact.ts`)* |
| i18n routing / locales                  | [src/i18n/routing.ts](src/i18n/routing.ts)                               |
| i18n middleware (locale guard)          | [src/proxy.ts](src/proxy.ts)                                             |
| Typed Link / useRouter                  | [src/i18n/navigation.ts](src/i18n/navigation.ts)                         |
| Translations                            | [messages/en.json](messages/en.json), [messages/ro.json](messages/ro.json) |
| Color palette / design tokens           | [src/app/globals.css](src/app/globals.css)                               |
| Slugify / cn utilities                  | [src/lib/utils.ts](src/lib/utils.ts)                                     |
| Shared UI (Container, Heading, Price)   | [src/components/shared/](src/components/shared/)                         |
| Brand Button primitive                  | [src/components/shared/Button.tsx](src/components/shared/Button.tsx)     |
| Imagery placeholder (5 photo roles)     | [src/components/shared/ImagePlaceholder.tsx](src/components/shared/ImagePlaceholder.tsx) |
| Homepage brand-story section            | [src/components/home/BrandStory.tsx](src/components/home/BrandStory.tsx) |
| Testimonials auto-advance client        | [src/components/home/TestimonialsClient.tsx](src/components/home/TestimonialsClient.tsx) |
| Scroll-shrinking header wrapper         | [src/components/layout/ScrolledHeader.tsx](src/components/layout/ScrolledHeader.tsx) |
| Catalog size-filter slider              | [src/components/ui/slider.tsx](src/components/ui/slider.tsx)             |
| Authoritative design spec               | [docs/DESIGN.md](docs/DESIGN.md)                                         |
| Curated imagery pointers                | [docs/IMAGERY.md](docs/IMAGERY.md)                                       |
| Frontend-design skill reference         | [docs/skills/frontend-design.md](docs/skills/frontend-design.md)         |
| shadcn primitives                       | [src/components/ui/](src/components/ui/)                                 |
| Header / Footer / Language switcher     | [src/components/layout/](src/components/layout/)                         |
| Seed data                               | [src/lib/seed-data.ts](src/lib/seed-data.ts)                             |
| Seed runner                             | [scripts/seed.ts](scripts/seed.ts)                                       |
| App-wide constants                      | [src/lib/constants.ts](src/lib/constants.ts)                             |
| Shared TS types                         | [src/types/](src/types/)                                                 |

---

## 3a. Keeping the Repo Map Accurate (MANDATORY)

The repo map in §3 is the single source of navigation truth for every future session. It MUST stay in sync with reality.

Whenever you, Claude, do ANY of the following, you MUST update §3 in the SAME commit:

- Create a new file in `src/`, `app/`, `components/`, `lib/`, `hooks/`, `types/`, `scripts/`, `messages/`, or `public/`
- Delete a file from any of those locations
- Rename or move a file
- Significantly change what a file does (enough that its one-line description is no longer accurate)

Rules:
1. The update is NOT optional and NOT a follow-up commit — it ships with the code change.
2. Update BOTH the tree diagram AND the "Quick lookup" table if the change affects navigation.
3. If you add a whole new subfolder (e.g., `src/components/blog/`), add it to the tree with a short comment explaining its purpose.
4. If you're unsure whether a file is "significant enough" to map, include it. Err on the side of over-documenting.
5. Before finishing any task, re-read §3 and confirm it matches your actual changes. If it doesn't, fix §3 before committing.

Self-check at end of every task:
- [ ] Did I create, delete, rename, or repurpose any files?
- [ ] If yes, did I update §3 (tree + lookup table) to match?
- [ ] Does every path I mention in §3 resolve to a real file?

Failure to maintain §3 forces future sessions to re-explore the repo, which wastes time and context. Treat §3 like a build artifact: if the code changes, §3 changes.

---

## 4. Tech Stack (fixed)

- **Next.js 15** App Router · **TypeScript** · **Tailwind CSS v4**
- **MongoDB** via **Mongoose**
- **Resend** for contact email
- **next-intl** for i18n (`en`, `ro`)
- **shadcn/ui** + **Radix** primitives · **lucide-react** icons
- **react-hook-form** + **zod** for forms
- **jose** + **bcryptjs** for admin auth
- **framer-motion** for restrained scroll animation
- **sonner** for toasts
- **pnpm** as the package manager

Do not swap any of these without asking.

**Design system reference:** [`docs/skills/frontend-design.md`](./docs/skills/frontend-design.md) — read before any UI change. It is the design authority for this project alongside `docs/DESIGN.md` (the project's committed visual direction).

---

## 5. Design Tokens (authoritative)

See [`docs/DESIGN.md`](./docs/DESIGN.md) §1 for the authoritative palette, typography scale, radii, shadows, and motion. Tokens live in [`src/app/globals.css`](./src/app/globals.css). Reach for `src/components/shared/Container.tsx`, `SectionHeading.tsx`, `FadeIn.tsx`, `Button.tsx` instead of reinventing spacing, headings, motion, or buttons.

---

## 6. Data Model Cheat Sheet

**Product** — bilingual text, one primary size, one color per SKU (multiple color variants = multiple products), price in EUR (display only), `featured: boolean` for homepage, `order: number` for manual sort.

**Testimonial** — bilingual quote, 1–5 rating, `featured: boolean`.

**Contact submissions** — **NOT** stored. Emailed via Resend only.

Full shapes are in `PLAN.md` §5 and enforced by Mongoose + zod in `src/lib/models/` and `src/lib/validators/`.

---

## 7. Commands

```bash
pnpm dev              # local dev at http://localhost:3000
pnpm build            # production build
pnpm start            # run production build
pnpm lint             # eslint
pnpm typecheck        # tsc --noEmit
pnpm seed             # wipe + reseed MongoDB with lib/seed-data.ts
```

Run `pnpm lint && pnpm typecheck` before declaring any phase complete.

---

## 8. Coding Conventions

- **File naming:** `PascalCase.tsx` for components, `camelCase.ts` for libs/hooks/utils, `kebab-case` for routes.
- **Imports:** use the `@/` alias. Group: (1) node/external, (2) `@/` internal, (3) relative, (4) types — blank line between groups.
- **Server vs. client components:**
  - Default: server component.
  - Add `"use client"` only for stateful UI (forms, filters with local state, carousels, toasts).
  - Data fetching belongs in server components or route handlers, never in a `useEffect`.
- **Forms:** always `react-hook-form` + `zod` resolver. Validate on both client and server.
- **Mongoose:** always `await dbConnect()` from `lib/db.ts` at the top of any route handler. Use `.lean()` when returning to the client.
- **Errors in API routes:** return `Response.json({ error }, { status })`. Never leak stack traces.
- **Loading + empty states:** every list view must handle `loading`, `empty`, and `error`.
- **Images:** `next/image` always, with explicit `width`/`height` or `fill` + sized parent.
- **Accessibility:** semantic tags (`<nav>`, `<main>`, `<section>`), `aria-label` on icon-only buttons, visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).

---

## 9. i18n Rules

- All user-facing static strings go through `useTranslations()` / `getTranslations()` from `next-intl` — never hardcode English in JSX.
- Add a key to **both** `messages/en.json` and `messages/ro.json`. Missing Romanian → flag it explicitly in your response, don't silently copy English.
- Content fields on products/testimonials are bilingual objects. Render the correct side based on the current locale.
- Route links must preserve locale (use next-intl's `Link` or `useRouter`).

---

## 10. Admin & Auth Rules

- `/admin/*` (pages and APIs except `/admin/login`) requires a valid JWT cookie issued by `/api/admin/login`.
- The cookie must be `httpOnly`, `secure` in production, `sameSite: "lax"`, 7-day expiry.
- Password lives **only** as a bcrypt hash in `ADMIN_PASSWORD_HASH` — never plaintext.
- Do not invent role-based access. One admin, one password.

---

## 11. Security Non-Negotiables

- Validate every request body with zod before touching the database.
- Sanitize rich-text description rendering (treat as markdown, not HTML).
- Do not log request bodies containing PII (emails, phones) in production.
- Do not expose admin endpoints to `GET` when a mutation is intended.
- Never return password hashes, JWT secrets, or Resend keys to the client.

---

## 12. When You Don't Know

1. Re-read the relevant section of `PLAN.md`.
2. Grep the repo for an existing pattern (`rg "useTranslations"`, etc.).
3. If still unclear, **ask the user** — don't invent.

---

## 13. Definition of Done (per feature)

- [ ] Works on mobile (narrow viewport) and desktop.
- [ ] Keyboard-navigable, visible focus, no accessibility regressions.
- [ ] EN and RO strings present; both render correctly.
- [ ] `pnpm lint && pnpm typecheck` pass clean.
- [ ] No console errors or warnings in dev or production build.
- [ ] Matches the tokens in §5 — no random colors, no rogue fonts.
- [ ] Single commit (or a small, logical sequence) with a Conventional Commit message.

---

## 14. First Session Boot Sequence

When a new session starts:

1. Read `PLAN.md` §1–3 and §12 (phases).
2. Read this `CLAUDE.md` fully.
3. Run `git status` and `git log --oneline -10` to see where the previous session left off.
4. Identify the current phase from PLAN.md §12. Continue from there.
5. If unclear, ask the user which phase to work on.

Let's build something beautiful. 🌊
