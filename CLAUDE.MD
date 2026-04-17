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
├── messages/
│   ├── en.json                             # English UI strings
│   └── ro.json                             # Romanian UI strings
│
├── public/
│   └── *.svg                               # Next.js scaffold SVGs (file, globe, next, vercel, window) — brand assets TBD
│
├── scripts/
│   └── seed.ts                             # `pnpm seed` — wipes + reseeds Mongo from lib/seed-data.ts
│
└── src/
    ├── proxy.ts                            # next-intl middleware (locale routing); re-exported as middleware by Next — will also host admin auth guard
    │
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css                     # Tailwind v4 + CSS custom properties (design tokens)
    │   │
    │   ├── [locale]/                       # all public pages live here
    │   │   ├── layout.tsx                  # header + footer + fonts + NextIntlClientProvider
    │   │   ├── page.tsx                    # HOME (placeholder — components/home/* not built yet)
    │   │   └── catalog/
    │   │       ├── page.tsx                # CATALOG list → components/catalog/*
    │   │       └── [slug]/page.tsx         # PRODUCT DETAIL → components/product/*
    │   │
    │   └── api/
    │       └── products/
    │           ├── route.ts                # GET (public list), POST (admin create)
    │           └── [id]/route.ts           # GET / PUT / DELETE by id
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
    │   │   ├── sonner.tsx                  # toast container
    │   │   └── textarea.tsx
    │   │
    │   ├── layout/
    │   │   ├── Header.tsx                  # top nav + logo + language switcher
    │   │   ├── Footer.tsx                  # footer nav + contact line
    │   │   └── LanguageSwitcher.tsx        # EN/RO toggle preserving route
    │   │
    │   ├── shared/
    │   │   ├── Container.tsx               # max-w-6xl mx-auto px-6 wrapper
    │   │   ├── SectionHeading.tsx          # eyebrow + h2 + optional lede
    │   │   └── PriceTag.tsx                # formatted EUR price display
    │   │
    │   ├── catalog/
    │   │   ├── CatalogGrid.tsx             # responsive product grid
    │   │   ├── CatalogFilters.tsx          # size + color filters (client, URL-state)
    │   │   ├── ProductCard.tsx             # card for grid item
    │   │   └── EmptyState.tsx              # shown when filters return zero
    │   │
    │   └── product/
    │       ├── ProductGallery.tsx          # primary image + thumbnails
    │       ├── ProductSpecs.tsx            # dimensions / capacity / power table
    │       ├── ProductFeatures.tsx         # bilingual feature bullets
    │       ├── ColorSwatch.tsx             # color chip (single-color per SKU)
    │       └── QuoteCTA.tsx                # "Request a quote" CTA → /contact
    │
    ├── i18n/                               # next-intl configuration (not lib/i18n.ts)
    │   ├── routing.ts                      # locales, defaultLocale, pathnames
    │   ├── navigation.ts                   # typed Link / useRouter wrappers
    │   └── request.ts                      # per-request locale/messages loader
    │
    ├── lib/
    │   ├── db.ts                           # Mongoose cached connection — ALWAYS use this
    │   ├── utils.ts                        # cn() (tailwind-merge)
    │   ├── constants.ts                    # CONTACT_EMAIL, SIZES, COLORS, etc.
    │   ├── seed-data.ts                    # 8 products + 4 testimonials for `pnpm seed`
    │   ├── models/
    │   │   ├── Product.ts                  # Mongoose schema (bilingual fields)
    │   │   └── Testimonial.ts              # Mongoose schema (bilingual quote + rating)
    │   └── validators/
    │       └── product.ts                  # zod schema for product create/update
    │
    └── types/
        ├── index.ts                        # re-exports
        ├── product.ts                      # Product TS types (mirrors Mongoose model)
        └── testimonial.ts                  # Testimonial TS types
```

**Not yet built (tracked in PLAN.md):** `src/app/[locale]/about`, `src/app/[locale]/contact`, `src/app/admin/*`, `src/app/api/contact`, `src/app/api/testimonials`, `src/app/api/admin`, `src/components/home/*`, `src/components/contact/*`, `src/components/admin/*`, `src/components/layout/MobileNav.tsx`, `src/components/shared/FadeIn.tsx`, `src/lib/auth.ts`, `src/lib/resend.ts`, `src/lib/validators/{testimonial,contact}.ts`, `src/hooks/*`.

### Quick lookup — "where does X live?"

| If you need to edit…                    | Go to…                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Public root layout (header/footer/i18n) | [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)               |
| The homepage                            | [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx) *(hero TBD)*      |
| The catalog list                        | [src/app/[locale]/catalog/page.tsx](src/app/[locale]/catalog/page.tsx)   |
| The catalog filters                     | [src/components/catalog/CatalogFilters.tsx](src/components/catalog/CatalogFilters.tsx) |
| The product detail page                 | [src/app/[locale]/catalog/[slug]/page.tsx](src/app/[locale]/catalog/[slug]/page.tsx) + [src/components/product/](src/components/product/) |
| Product list/create API                 | [src/app/api/products/route.ts](src/app/api/products/route.ts)           |
| Product detail/mutate API               | [src/app/api/products/[id]/route.ts](src/app/api/products/[id]/route.ts) |
| The DB connection                       | [src/lib/db.ts](src/lib/db.ts)                                           |
| Product schema (Mongoose)               | [src/lib/models/Product.ts](src/lib/models/Product.ts)                   |
| Testimonial schema (Mongoose)           | [src/lib/models/Testimonial.ts](src/lib/models/Testimonial.ts)           |
| Zod validation                          | [src/lib/validators/](src/lib/validators/) *(only `product.ts` so far)*  |
| i18n routing / locales                  | [src/i18n/routing.ts](src/i18n/routing.ts)                               |
| i18n middleware (locale guard)          | [src/proxy.ts](src/proxy.ts)                                             |
| Typed Link / useRouter                  | [src/i18n/navigation.ts](src/i18n/navigation.ts)                         |
| Translations                            | [messages/en.json](messages/en.json), [messages/ro.json](messages/ro.json) |
| Color palette / design tokens           | [src/app/globals.css](src/app/globals.css)                               |
| Shared UI (Container, Heading, Price)   | [src/components/shared/](src/components/shared/)                         |
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
