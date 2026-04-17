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

---

## 3. Repo Map (where to find things)

```
.
├── PLAN.md                             # spec — read for product decisions
├── CLAUDE.md                           # this file — read for workflow rules
├── README.md                           # human-facing setup
├── .env.example                        # env var reference
├── middleware.ts                       # i18n routing + admin auth guard
│
├── messages/
│   ├── en.json                         # English UI strings (nav, buttons, labels)
│   └── ro.json                         # Romanian UI strings
│
├── public/
│   ├── videos/hero.mp4                 # or reference a Cloudinary URL
│   └── images/                         # logo, og-image, brand statics
│
├── src/
│   ├── app/
│   │   ├── [locale]/                   # all public pages live here
│   │   │   ├── layout.tsx              # header + footer + fonts + i18n provider
│   │   │   ├── page.tsx                # HOME  → components/home/*
│   │   │   ├── catalog/
│   │   │   │   ├── page.tsx            # CATALOG → components/catalog/*
│   │   │   │   └── [slug]/page.tsx     # PRODUCT DETAIL → components/product/*
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx        # → components/contact/ContactForm
│   │   │
│   │   ├── admin/                      # protected by middleware
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # dashboard
│   │   │   ├── login/page.tsx
│   │   │   ├── products/{page,new,[id]}
│   │   │   └── testimonials/{page,new,[id]}
│   │   │
│   │   ├── api/
│   │   │   ├── contact/route.ts        # POST → Resend (no DB write)
│   │   │   ├── products/route.ts       # GET (public), POST (admin)
│   │   │   ├── products/[id]/route.ts  # GET, PUT, DELETE
│   │   │   ├── testimonials/route.ts
│   │   │   ├── testimonials/[id]/route.ts
│   │   │   └── admin/{login,logout}/route.ts
│   │   │
│   │   └── globals.css                 # Tailwind + CSS custom properties
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn primitives — DO NOT rewrite by hand
│   │   ├── layout/                     # Header, Footer, LanguageSwitcher, MobileNav
│   │   ├── home/                       # Hero, FeaturedProducts, Testimonials, HomeCTA
│   │   ├── catalog/                    # CatalogGrid, CatalogFilters, ProductCard, EmptyState
│   │   ├── product/                    # ProductGallery, ProductSpecs, ProductFeatures, ColorSwatch, QuoteCTA
│   │   ├── contact/                    # ContactForm
│   │   ├── admin/                      # AdminSidebar, ProductForm, TestimonialForm, DataTable, DeleteDialog
│   │   └── shared/                     # Container, SectionHeading, PriceTag, FadeIn
│   │
│   ├── lib/
│   │   ├── db.ts                       # Mongoose cached connection — ALWAYS use this
│   │   ├── models/Product.ts
│   │   ├── models/Testimonial.ts
│   │   ├── auth.ts                     # bcrypt + jose JWT helpers
│   │   ├── resend.ts                   # Resend client + sendContactEmail()
│   │   ├── validators/{product,testimonial,contact}.ts   # zod schemas
│   │   ├── i18n.ts                     # next-intl config
│   │   ├── constants.ts                # CONTACT_EMAIL, SIZES, COLORS, etc.
│   │   ├── utils.ts                    # cn(), formatPrice, slugify
│   │   └── seed-data.ts                # 8 products + 4 testimonials
│   │
│   ├── hooks/useProducts.ts, useFilters.ts
│   └── types/{product,testimonial,index}.ts
│
└── scripts/seed.ts                     # pnpm seed
```

### Quick lookup — "where does X live?"

| If you need to edit…                  | Go to…                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------- |
| The homepage hero                     | `src/components/home/Hero.tsx`                                            |
| The catalog filters                   | `src/components/catalog/CatalogFilters.tsx`                               |
| The product detail layout             | `src/app/[locale]/catalog/[slug]/page.tsx` + `src/components/product/*`   |
| The contact form                      | `src/components/contact/ContactForm.tsx` + `src/app/api/contact/route.ts` |
| Email sending logic                   | `src/lib/resend.ts`                                                       |
| The DB connection                     | `src/lib/db.ts`                                                           |
| Product schema                        | `src/lib/models/Product.ts`                                               |
| Zod validation                        | `src/lib/validators/*.ts`                                                 |
| Admin auth                            | `src/lib/auth.ts` + `middleware.ts`                                       |
| Translations                          | `messages/en.json`, `messages/ro.json`                                    |
| Color palette / design tokens         | `src/app/globals.css`                                                     |
| Shared UI like headings or containers | `src/components/shared/`                                                  |
| shadcn primitives                     | `src/components/ui/`                                                      |
| Seed data                             | `src/lib/seed-data.ts`                                                    |

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

---

## 5. Design Tokens (authoritative)

Defined in `src/app/globals.css`:

| Token          | Value     | Use                             |
| -------------- | --------- | ------------------------------- |
| `--background` | `#FBFBF9` | page background                 |
| `--foreground` | `#0E1A24` | body text, headings             |
| `--primary`    | `#0A6E8C` | primary buttons, links, accents |
| `--accent`     | `#E8F1F2` | soft section backgrounds        |
| `--muted`      | `#6B7280` | secondary text                  |
| `--border`     | `#E5E7EB` | dividers, card borders          |

- **Heading font:** Fraunces (serif)
- **Body font:** Inter (sans)
- **Radius:** `rounded-2xl` cards · `rounded-xl` buttons/inputs
- **Section rhythm:** `py-24 md:py-32`, `max-w-6xl mx-auto px-6`
- **Motion:** 300ms ease-out, small translate + fade only

Reach for `src/components/shared/Container.tsx`, `SectionHeading.tsx`, `FadeIn.tsx` instead of reinventing spacing/motion.

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
