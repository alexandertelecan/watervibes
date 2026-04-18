# DESIGN.md — WaterVibes Visual Direction

> Working draft. Committed for review. Supersedes all ad-hoc aesthetic choices once approved.
> Read alongside [`docs/skills/frontend-design.md`](./skills/frontend-design.md) and [`CLAUDE.md`](../CLAUDE.md) §5.

---

## 0. Aesthetic Direction (the one-liner)

**Airbnb-warm commercial.** Pure white backgrounds, charcoal ink, aqua-teal punctuation. Chunky humanist sans. Pill buttons. Image-first listing cards. Friendly and commercial — a place to *choose a jacuzzi*, not a gallery of objects.

References orbit the consumer-marketplace canon: Airbnb's listing cards and pill chips, Booking.com's card-grid density, Allbirds' friendly commerce typography, Parachute Home's warm product imagery. Previous Scandinavian-editorial direction (Frama / Skagerak / Aesop index spreads) is set aside — that direction is correct for a magazine, not for a catalog where people are deciding on a purchase.

**The one thing someone remembers:** a white page with big rounded image cards, a chunky sans-serif headline in charcoal, and a single aqua pill button that signals "this is the one to press."

---

## 1. Palette

All values are final proposals with WCAG AA contrast verified for body text (4.5:1) and large text / UI (3:1).

### 1.1 Core tokens

| Token                      | Value     | Purpose                                              | Contrast |
| -------------------------- | --------- | ---------------------------------------------------- | -------- |
| `--background`             | `#FFFFFF` | pure white page base                                 | —        |
| `--surface`                | `#F7F7F7` | cards, panels, secondary sections (Airbnb soft gray) | —        |
| `--foreground`             | `#222222` | body + headings (charcoal, not pure black)           | ~16:1 on bg ✓ AAA |
| `--primary`                | `#222222` | charcoal — filled buttons, links                     | —        |
| `--primary-foreground`     | `#FFFFFF` | text on primary                                      | ~16:1 on primary ✓ AAA |
| `--accent`                 | `#0E7C8E` | aqua-teal — the signature brand color; punctuation   | 4.91:1 on bg ✓ AA |
| `--accent-tint`            | `#2BA9BB` | hover on accent — decorative only                    | 2.7:1 on bg — decor only |
| `--accent-foreground`      | `#FFFFFF` | text on accent                                       | 4.91:1 on accent ✓ AA |
| `--muted`                  | `#F2F2F2` | chips, quiet callouts                                | —        |
| `--muted-foreground`       | `#6A6A6A` | secondary text (medium gray)                         | ~5.5:1 on bg ✓ AA |
| `--border`                 | `#DDDDDD` | hairline (Airbnb card border)                        | ~1.5:1 (decorative only — see 1.3) |
| `--ring`                   | `#0E7C8E` | focus ring (aqua pops on white AND charcoal)         | — |
| `--card`                   | `#FFFFFF` | matches bg — cards lift via subtle shadow, not fill  | — |
| `--card-foreground`        | `#222222` | — | ~16:1 ✓ AAA |
| `--destructive`            | `#C13515` | Airbnb destructive red                               | — |
| `--destructive-foreground` | `#FFFFFF` | — | — |
| `--input`                  | `#DDDDDD` | input border (same as --border) | — |
| `--popover`                | `#FFFFFF` | matches bg — menus lift via shadow | — |
| `--popover-foreground`     | `#222222` | — | — |

### 1.2 Why these choices

- **White + charcoal + aqua** is the Airbnb pattern with one swap. Airbnb uses coral `#FF385C` for CTAs; we keep aqua `#0E7C8E` instead — it's the brand's one load-bearing color and ties the product (water) to the palette without being on-the-nose.
- **Charcoal primary (`#222222`)** is Airbnb's exact text color. Primary buttons are filled charcoal, not marine. Aqua is reserved for the *signature* action (hero primary, key CTAs), so charcoal does the quiet work.
- **Aqua accent (`#0E7C8E`)** passes AA on white at body size (4.91:1). Bright aqua (`#2BA9BB`) is decorative only.
- **Pure white background.** Airbnb uses pure `#FFFFFF`. A chalk cast read as "designer-Scandinavian"; pure white reads as "commerce, modern retail, browse-ready."

### 1.3 Border contrast note

`--border: #DDDDDD` at ~1.5:1 against white is Airbnb's default hairline — visible enough to frame a card, quiet enough to not shout. Where borders carry meaning (focus, validation, selected filter), we escalate to `--foreground` or `--accent` at 3:1+ to meet WCAG 1.4.11 for non-text UI.

### 1.4 Tailwind wiring

Every token above maps into `@theme inline` in [`globals.css`](../src/app/globals.css) so `bg-background`, `text-primary`, `bg-accent`, `bg-accent-tint`, `bg-surface`, etc. work out of the box.

---

## 2. Typography

### 2.1 Families

- **Display + headings: Plus Jakarta Sans** at 700 weight (with 600 for h3 and below). Humanist geometric sans, Airbnb-Cereal-adjacent — friendly, rounded, commercial. Replaces Fraunces entirely (editorial serifs don't fit the "choose a jacuzzi" register).
  - *Loaded into `--font-fraunces`* in [layout.tsx](../src/app/[locale]/layout.tsx) — the CSS variable name is historical, kept to avoid touching 28 downstream files. Plan to rename to `--font-display` the next time that area is worked on.
  - *Rationale:* Airbnb Cereal is custom; Plus Jakarta Sans is the closest free equivalent — similar open apertures, similar rounded stems, similar warmth without being generic like Inter. Distinctive enough not to read as "SaaS default."
- **Body: Manrope.** Stays. Pairs well with Plus Jakarta Sans — both humanist, both open-aperture; PJS is slightly chunkier for display, Manrope is slightly more neutral for body. The small rhythm between them keeps the page from feeling single-family.
  - *Rationale:* Manrope is well-rendered on every platform, weight range 200–800. No reason to swap.

### 2.2 Scale & rhythm

Modular scale ≈ 1.25 (major third). Line-heights tighten as size grows.

| Role        | Size / Line-height | Weight | Tracking    | Family    |
| ----------- | ------------------ | ------ | ----------- | --------- |
| display     | 48–72 / 52–76      | 700    | −0.035em    | Plus Jakarta Sans |
| h1          | 40–52 / 44–58      | 700    | −0.025em    | Plus Jakarta Sans |
| h2          | 30–36 / 35–42      | 700    | −0.02em     | Plus Jakarta Sans |
| h3          | 20–24 / 25–30      | 600    | −0.015em    | Plus Jakarta Sans |
| lede        | 18 / 28            | 400    | 0           | Manrope   |
| body        | 16 / 26            | 400    | 0           | Manrope   |
| small       | 14 / 20            | 500    | +0.005em    | Manrope   |
| eyebrow     | 12 / 16            | 600    | +0.08em, UPPERCASE | Manrope   |

Body drops from 17px → **16px** to match Airbnb and commercial sites generally. Eyebrow tracking drops from +0.14em → +0.08em (less precious, more functional). Headings go all-in on weight 700 — chunky, not elegant.

### 2.3 Tracking / letter-spacing rules

- Display and h1 tighten (−0.025 to −0.035em) — chunky sans at large sizes benefits from negative tracking to knit counters together.
- Body and lede stay at 0 — any spacing tweak here shows up as "typeset."
- Eyebrow is +0.08em uppercase — still reads as a section marker, but less editorial-precious than the previous +0.14em.
- Buttons: −0.005em; never uppercase.

---

## 3. Shape & Texture

### 3.1 Corner radii

| Token              | Value | Use                                          |
| ------------------ | ----- | -------------------------------------------- |
| `--radius-sm`      | 8px   | inputs, small chips                          |
| `--radius-md`      | 12px  | menus, dialog corners                        |
| `--radius-lg`      | 16px  | cards, product tiles (Airbnb listing-card)   |
| `--radius-xl`      | 24px  | hero image panels, feature blocks            |
| `--radius-full`    | 999px | pills, buttons, avatars, swatches, chips     |

**Buttons are pills.** All of them, every size, every variant — `rounded-full`. This is the signature Airbnb / modern-commerce move and carries the whole "friendly commercial" feel. Cards are 16px (Airbnb-listing-card exactly). Hero image panels at 24px for extra softness.

### 3.2 Shadows (neutral, light, Airbnb-card)

All shadows are pure neutral (HSL hue 0, saturation 0%) with light opacity — Airbnb's signature "barely-there" card shadow. Three levels:

```css
--shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.04);
--shadow-md: 0 6px 16px -4px hsl(0 0% 0% / 0.12),
             0 2px 6px -2px hsl(0 0% 0% / 0.06);
--shadow-lg: 0 24px 48px -16px hsl(0 0% 0% / 0.18),
             0 8px 16px -8px hsl(0 0% 0% / 0.08);
```

Tighter spread, lighter opacity than either the old warm-brown or cool-blue recipes. On white, heavy shadows read as "draft modal" — keep them subtle. Cards lift via a very soft shadow and a 1px border (`--border`), not via a big drop-shadow.

### 3.3 Texture

None. No noise overlays, no cross-hatches on page sections. The product IS the texture — photography carries all of the tactility. ImagePlaceholder still uses a diagonal gradient pattern internally but *only* as a dev-time cue for missing photography.

### 3.4 Section transitions

- Section transitions are flat. No gradient bleeds between Hero / Featured / BrandStory / Testimonials. Airbnb doesn't soften section edges and neither do we now — each section owns its slab.
- The one exception: `BrandStory` keeps a very subtle `--surface` gradient top/bottom as a quiet section-change cue. Not a feature, just a seam.
- Reject diagonal dividers, SVG wave dividers, and other generic "template" shape tricks.

---

## 4. Motion

### 4.1 Defaults

- **Duration:** 500ms for page-level reveals, 200ms for hover / state changes, 800ms for the hero's initial staging.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo-ish — decelerates smoothly, matches "soft reveal"). Use for nearly everything.
- **Stagger:** 80ms per child in grids, capped at 400ms total.

### 4.2 Signature moves (only two — resist adding more)

1. **"Settling" reveal on scroll-enter.** SectionHeading fades up 16px over 500ms AND its eyebrow underline (a 1px aqua rule) draws left-to-right over 600ms with a 100ms delay. Used once per section. Drives the "unhurried" feel.
2. **ProductCard lift on hover.** Image zooms 3% (transform: scale(1.03)), card lifts 6px (translateY(-6px)) with `--shadow-md` growing to `--shadow-lg`. Only the hovered card animates — neighbours don't twitch. 200ms, out-expo.

That's it. No parallax scroll backgrounds, no cursor trails, no floating particles, no animated gradients. Restraint = luxury.

### 4.3 Reduced motion

`@media (prefers-reduced-motion: reduce)` kills all transform/translate and cross-fades only (opacity 0 → 1, 200ms). Non-negotiable — the spa tone demands we not override a user's system preference.

---

## 5. Component Direction

What changes from the current execution, component by component. Implementation comes after DESIGN.md is approved.

**Hero** — Keep the video, lay a transparent→charcoal gradient over it for text legibility. Single copy column (no right rail). Headline in display-size Plus Jakarta Sans 700. Two pill CTAs: **accent-filled primary** ("Explore the Collection") + **outline secondary** ("Request a Quote"). No vertical ordinal, no baseline marginalia — those were editorial-Scandinavian artifacts and don't belong here.

**FeaturedProducts** — 3 products the admin has marked featured (backfilled by most-recent) in a 3-column Airbnb-style listing-card grid. Each card: square-ish image (4:5 aspect) on a 16px radius; a size pill top-left on a frosted-white chip; a decorative heart icon top-right; below the image a tight stack — product name (h3), two-line truncated tagline, "From €X,XXX" with the price bolded. Hover lifts the whole card 4px and zooms the image 3%. This replaces the previous editorial-index spreads; they were beautiful but didn't feel like a catalog you'd *shop*.

**SectionHeading** — Unchanged structurally. Eyebrow row sits on a short aqua rule, then the h2 (now in chunky PJS 700), then an optional right-aligned lede. The asymmetric 7/5 grid still holds — it gives a friendly "magazine-department" feel without going full editorial.

**ProductCard** — Stays as-is for the /catalog grid (alternating 4:5 and 5:6 aspect ratios, 16px radius after the radius tighten, color swatch strip at the bottom). Hover: 3% zoom + 6px lift. The *homepage-only* card is the Airbnb-style listing card described in FeaturedProducts above — different component, different use case.

**CatalogFilters** — Desktop becomes a left rail (sticky). Section labels in eyebrow style; filter pills sit beneath each. Color filters show a small color sample inside the pill. **Size filter becomes a 1–5 labeled slider** ("small ← → large"), not discrete chips — this is the one place where the interaction becomes the feature. Mobile stays as a horizontal scroll strip of chips (compact, no slider).

**ProductGallery** — Echo Aesop. Primary image floats on a `--surface` panel with huge top/bottom margin. Thumbnails become a vertical filmstrip on the right (desktop, 64px wide) or horizontal strip below (mobile). Ground the primary image with `--shadow-lg`. No lightbox — the image is already the hero.

**ContactForm** — Desktop splits 5/7. **Left**: an editorial aside — a pull-quote from a testimonial, the owner's email + phone stacked, small hours line. **Right**: the form on a `--surface` panel with `--radius-xl` corners. Labels float above each field in eyebrow style. Focus ring is `--ring` (aqua), 2px offset. Submit button is filled `--primary`, with a subtle arrow glyph that slides 2px on hover.

**Testimonials** — One hero quote at a time. Large italic display-sans pull-quote with an oversize aqua quotation mark (`--accent-tint`) hanging in the left margin. Below: a horizontal filmstrip of the remaining testimonials auto-advancing every 10s, paused on hover. The italic quote in Plus Jakarta Sans reads less editorial-poetic than the old Fraunces italic did — more "customer review," which is the airbnb-aligned register.

**Header** — Structure kept. Logo left (set in display-sans), nav center-right (4 items), language switcher + "Request a quote" pill Button rightmost. On page-scroll past 80px, the header shrinks from 80px → 64px, background transitions from transparent to `--surface` with a 1px `--accent` underline. Smooth.

**Footer** — Three-column on `--surface`. **Left**: the WaterVibes wordmark + tagline + a thin aqua rule. **Center**: nav links, eyebrow-styled section headers. **Right**: contact email, phone, address. Above the columns, a full-width thin aqua divider. A huge display-sans "WaterVibes" watermark sits behind everything at 6% opacity. Microline at the bottom: copyright + "Made in Romania".

**Button** — Pill (`rounded-full`) across every size and variant. Variants: **primary** (filled charcoal) / **accent** (filled aqua — the signature CTA) / **outline** (1px border, transparent) / **ghost** (no border, transparent). Subtle shadow-sm on filled variants, hover lightens (primary → charcoal/90, accent → accent-tint). This is the single biggest visual shift from the Scandinavian pass — pills pull the whole site toward "commerce."

**Admin (lighter pass)** — Same tokens, no video backgrounds, `--shadow-sm` only, and the pill buttons feel right here too (bookings/saves look the part in filled-charcoal pills). Admin sidebar gets a thin `--accent` left rule on active items.

---

## 6. Imagery Direction

### 6.1 Photography brief

- **Natural light, warm-leaning.** Soft daylight or lifestyle-warmth — not golden-hour orange, not cool-architectural blue. Think "home at 4pm on a sunny spring day."
- **Product-in-a-home context.** Backyards, terraces, guesthouse exteriors. Cedar decking or pale stone both work. The jacuzzi should look like it *lives* somewhere — not staged on a studio seamless, not in a minimalist-architectural pool complex.
- **People optional; lived-in signals welcome.** A robe on the rim, a mug on the side table, slippers by the step. Avoid stock "model in swimsuit" photography — doesn't match the brand voice.
- **Palette-aware selection.** Prefer photos with a soft warm cast (cream woods, sand, terracotta details, late-afternoon light) that will coexist with the white+aqua palette. Avoid highly saturated blues (fights our accent) and avoid cold studio-neutrals (feels clinical).

> **NOTE — IMAGERY.md needs a light re-curate.** The current IDs were picked for the original warm-tactile direction. Most will still work (warm-home contexts are exactly what we want). The Scandinavian-pass "cool architectural" brief below is retired — the airbnb direction wants *home-warmth*, not *gallery-cool*.

---

## 7. Three Reference Inspirations

Each with one specific thing we're borrowing.

1. **Airbnb — airbnb.com.**
   *Borrow:* the listing-card anatomy and the pill-everything convention. Applied to /FeaturedProducts as 3 image-first cards (size pill, heart corner, From-price), and to every `<Button>` as `rounded-full`. The category-pill row under the Hero CTAs is the airbnb-category-ribbon move, scoped to our filter set (size).

2. **Aesop — any product page, e.g. aesop.com/u/gentle-facial-cleansing-milk.**
   *Borrow:* the way the product image floats on a single tone with generous top margin on the product detail page, while specs sit as a quiet sidebar. We keep this for /catalog/[slug] — the detail page stays a touch more editorial than the homepage, which is intentional.

3. **Parachute Home — parachutehome.com.**
   *Borrow:* warm product commerce with friendly-but-not-cartoony typography, lots of whitespace between sections, and a clear "shop-first" information hierarchy. Our homepage rhythm (Hero → Featured cards → BrandStory → Testimonials → CTA) mirrors theirs.

(Frama / Skagerak / &Tradition still inspire /catalog/[slug] at the detail level; they're just not driving the homepage anymore.)

---

## 8. Decisions log

The project has passed through three aesthetic directions as the owner's taste clarified. Current state is authoritative; history is kept to explain why certain tokens (`--accent-tint`, the `--font-fraunces` variable name) have vestigial names.

**Current — Airbnb-warm commercial (this doc):**
- [x] Palette — pure white + charcoal + aqua-teal. `--background: #FFFFFF`, `--primary: #222222`, `--accent: #0E7C8E` (kept from previous pass), `--accent-tint: #2BA9BB`.
- [x] Display + heading font — Plus Jakarta Sans (700 weight), loaded via historical `--font-fraunces` CSS var.
- [x] Body font — Manrope (kept).
- [x] Type scale — 16px body, 700-weight chunky display; eyebrow tracking tightened to +0.08em.
- [x] Radii — cards 16px, hero panels 24px; **buttons pill (`rounded-full`)**.
- [x] Shadows — neutral, light, Airbnb-card-style (HSL hue 0).
- [x] No grain overlay, no section gradient bleeds (except BrandStory seam).
- [x] FeaturedProducts — 3 image-first Airbnb listing cards with size pill + heart corner + From-price.
- [x] Hero — single copy column, 2 pill CTAs (filled aqua + outline), size-category pill row linking to catalog filters. No vertical ordinal, no baseline marginalia.
- [ ] Imagery — IMAGERY.md still reflects the original warm-tactile curation. Needs re-curate pass; the airbnb direction wants warm, inviting product-in-context photography (less Scandinavian-architectural, more "this looks nice in a home").

**Previous — Aqueous architectural (Scandinavian):** chalk + marine + aqua, Fraunces SOFT 50, 24/36 radii, cool shadows, editorial FeaturedProducts index. Tokens replaced but many comments/docs still reference "aqueous" phrasing.

**Original — Warm tactile:** cream + forest green + terracotta, Fraunces SOFT 100, 24/36 radii, warm shadows HSL 30, grain overlay. Fully retired.

This file is the spec. Implementation references sections back to it (e.g., "per DESIGN.md §5 — Button").
