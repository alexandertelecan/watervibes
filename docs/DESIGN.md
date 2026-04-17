# DESIGN.md — WaterVibes Visual Direction

> Working draft. Committed for review. Supersedes all ad-hoc aesthetic choices once approved.
> Read alongside [`docs/skills/frontend-design.md`](./skills/frontend-design.md) and [`CLAUDE.md`](../CLAUDE.md) §5.

---

## 0. Aesthetic Direction (the one-liner)

**Warm, tactile, unhurried.** Cream linen backgrounds, deep forest-green ink, terracotta punctuation. Organic edges over hard rectangles. Generous breathing room over dense grids. A bath at dusk, cedar steam, a heavy ceramic mug — not a product catalog, a place.

References orbit a shared gravity well: Aesop's typographic restraint, Goop's editorial warmth, Oura's soft gradient surfaces, Le Labo's tactile labels. The site should feel *made*, not *generated*.

**The one thing someone remembers:** a warm cream page with soft rounded shapes, a dark-green headline set in a characterful serif, and a single terracotta mark that feels like it was stamped.

---

## 1. Palette

All values are final proposals with WCAG AA contrast verified for body text (4.5:1) and large text / UI (3:1).

### 1.1 Core tokens (recommended)

| Token                   | Value    | Purpose                                    | Contrast |
| ----------------------- | -------- | ------------------------------------------ | -------- |
| `--background`          | `#F4EDE1` | warm linen, page base                     | —        |
| `--surface`             | `#EAE1D0` | cards, panels, secondary sections         | —        |
| `--foreground`          | `#1F1A15` | body + headings (deep espresso, not black) | 14.8:1 on bg ✓ AAA |
| `--primary`             | `#2D3F2F` | buttons, links, green ink                 | —        |
| `--primary-foreground`  | `#F8F2E7` | text on primary                           | 9.97:1 on primary ✓ AAA |
| `--accent`              | `#A0442E` | terracotta — text, fills, punctuation     | 5.30:1 on bg ✓ AA |
| `--accent-tint`         | `#B5543A` | hover / decorative (large text only)      | 4.11:1 on bg — large/decor only |
| `--accent-foreground`   | `#F8F2E7` | text on accent                            | 5.52:1 on accent ✓ AA |
| `--muted`               | `#E4DAC8` | chips, quiet callouts                     | —        |
| `--muted-foreground`    | `#6B6557` | secondary text (warm stone)               | 4.90:1 on bg ✓ AA |
| `--border`              | `#D9CEBA` | warm neutral, feels aged paper            | 1.5:1 on bg (UI element; AA non-text is 3:1 — see 1.4) |
| `--ring`                | `#A0442E` | focus ring (terracotta pops on green AND cream) | — |
| `--card`                | `#F4EDE1` | matches bg — cards lift via shadow, not fill | — |
| `--card-foreground`     | `#1F1A15` | — | 14.8:1 ✓ AAA |
| `--destructive`         | `#8A2A1F` | muted brick (not ER-red) — confirms spa tone | 6.5:1 on bg ✓ AAA |
| `--destructive-foreground` | `#F8F2E7` | — | — |
| `--input`               | `#D9CEBA` | input border (same as --border) | — |
| `--popover`             | `#F8F2E7` | slightly lifted surface for menus | — |
| `--popover-foreground`  | `#1F1A15` | — | — |

### 1.2 Background alternatives (pick one during review)

| Option | Hex       | Mood                                        |
| ------ | --------- | ------------------------------------------- |
| **A (recommended)** | `#F4EDE1` | warm linen, the default — bright enough to photograph well |
| B      | `#EFE6D6` | oat / almond — one step darker, more "closed in, candle-lit" |
| C      | `#EBE1CD` | sandstone — risks looking dingy on lower-brightness laptops; not recommended unless paired with brighter `--surface` |

### 1.3 Primary (deep green) alternatives

| Option | Hex       | Mood                                        |
| ------ | --------- | ------------------------------------------- |
| **A (recommended)** | `#2D3F2F` | forest / lichen — slightly desaturated, most "spa" |
| B      | `#334D34` | brighter forest — more energy, less "hush" |
| C      | `#2B4132` | deeper, nearly black-green — more masculine, reads darker on mobile |

### 1.4 Accent (terracotta) alternatives

| Option | Hex       | Mood / Use                                 | Contrast on bg |
| ------ | --------- | ------------------------------------------ | -------------- |
| **A (recommended)** | `#A0442E` | deepest — works as body-size text AND as button fill | 5.30:1 ✓ AA |
| B      | `#B5543A` | balanced — great for large headlines + decorative, **fails** AA for body text | 4.11:1 ✗ |
| C      | `#C8553D` | brightest / classic terracotta — for swatches and illustration accents only | 3.55:1 ✗ for text |

**Decision:** accept `--accent: #A0442E` as the one working terracotta. Use `--accent-tint: #B5543A` for hover states and decorative flourishes (pull-quote marks, divider rules) where contrast matters less.

### 1.5 Border contrast note

`--border: #D9CEBA` at ~1.5:1 against the background is intentionally soft (this is the whole "tactile" point — no harsh hairlines). Where borders carry meaning (focus states, form validation, selected filter), we escalate to `--foreground` or `--accent` at 3:1+ to meet WCAG 1.4.11 for non-text UI. The default soft border is decorative only.

### 1.6 Tailwind wiring

Every token above maps into `@theme inline` in [`globals.css`](../src/app/globals.css) so `bg-background`, `text-primary`, `bg-accent`, etc. work out of the box. Add `--surface`, `--accent-tint` — they don't exist yet.

---

## 2. Typography

### 2.1 Families

- **Heading: Fraunces (kept).** Already installed. Configure it with `--fraunces-soft: 100` and `--fraunces-opsz: 144` on display sizes to lean into its soft, humanist axis. Reconsider only if hero comps feel too tech-y — fallback is Instrument Serif for display only, keeping Fraunces for smaller headings.
  - *Rationale:* Fraunces has a reverse-stress warmth that aligns with the cream palette; Instrument Serif is more austere and editorial; Cormorant Garamond skews wedding-stationery. We already pay the font budget for Fraunces — use it deliberately instead of stacking a third family.
- **Body: Manrope.** Replace Inter. Humanist sans with open apertures and gentle curves — reads warmer on cream than Inter's cold geometric. Geist is still tech-SaaS; Manrope is closer to the "made by humans, for a bath" register.
  - *Rationale:* the frontend-design skill explicitly names Inter as a generic choice to avoid. Manrope is well-rendered on every platform, has a weight range from 200–800, and pairs with Fraunces without competing.

### 2.2 Scale & rhythm

Modular scale ≈ 1.25 (major third). Line-heights tighten as size grows.

| Role        | Size / Line-height | Weight | Tracking    | Family    |
| ----------- | ------------------ | ------ | ----------- | --------- |
| display     | 64–80 / 72–84      | 400    | −0.03em     | Fraunces (soft, opsz 144) |
| h1          | 44–56 / 52–60      | 400    | −0.02em     | Fraunces  |
| h2          | 32–40 / 40–46      | 500    | −0.015em    | Fraunces  |
| h3          | 24–28 / 32–36      | 500    | −0.01em     | Fraunces  |
| lede        | 20 / 32            | 400    | 0           | Manrope   |
| body        | 17 / 28            | 400    | 0           | Manrope   |
| small       | 14 / 20            | 500    | +0.01em     | Manrope   |
| eyebrow     | 12 / 16            | 600    | +0.14em, UPPERCASE | Manrope   |

Body is **17px**, not 16. On a cream background with a dark foreground, 17/28 reads calmer and lets the serifs in headings breathe. Enforce a `max-width: 68ch` on prose blocks.

### 2.3 Tracking / letter-spacing rules

- Display and h1 tighten (−0.02 to −0.03em) so serifs knit together.
- Body and lede stay at 0 — any spacing tweak here shows up as "typeset."
- Eyebrow (pre-heading tag) is +0.14em uppercase — a consistent marker for section starts.
- Buttons: +0.02em; never uppercase (reserve that for eyebrows).

---

## 3. Shape & Texture

### 3.1 Corner radii

| Token              | Value | Use                             |
| ------------------ | ----- | ------------------------------- |
| `--radius-sm`      | 8px   | inputs, small chips             |
| `--radius-md`      | 14px  | buttons, menus                  |
| `--radius-lg`      | 24px  | cards, product tiles, panels    |
| `--radius-xl`      | 36px  | hero panels, feature blocks     |
| `--radius-full`    | 999px | pills, avatars, swatches        |

Current site uses `rounded-2xl` (~16px) everywhere. Push cards to 24, hero panels to 36 — softer is warmer.

### 3.2 Shadows (warm, diffused)

All shadows tint toward the palette — HSL hue 30 (warm brown-orange), not neutral gray. Three levels:

```css
--shadow-sm: 0 1px 2px 0 hsl(30 25% 20% / 0.06);
--shadow-md: 0 12px 28px -12px hsl(30 25% 20% / 0.18),
             0 4px 8px -4px hsl(30 25% 20% / 0.08);
--shadow-lg: 0 30px 60px -20px hsl(30 30% 18% / 0.28),
             0 12px 24px -12px hsl(30 25% 18% / 0.14);
```

Rule: never ship a hard 0/2/4 box-shadow. Every shadow is soft-spread, warm-tinted, with a second tighter layer to ground the element.

### 3.3 Texture — subtle grain

One utility class, used selectively:

```css
.grain-overlay::after {
  content: "";
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg …fractalNoise baseFrequency='0.9'…/>");
  opacity: 0.04;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

Apply to: hero, testimonial section backgrounds, footer. **Do not** apply globally — ubiquitous noise becomes noise.

### 3.4 Organic shapes

- Section transitions use soft-edged blobs: a radial gradient from `--surface` to transparent, 60% opacity, 100% border-radius on an oversized absolutely-positioned div. Use sparingly (1–2 per page).
- Reject diagonal dividers, SVG wave dividers, and other generic "bootstrap template" shape tricks.

---

## 4. Motion

### 4.1 Defaults

- **Duration:** 500ms for page-level reveals, 200ms for hover / state changes, 800ms for the hero's initial staging.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo-ish — decelerates smoothly, matches "soft reveal"). Use for nearly everything.
- **Stagger:** 80ms per child in grids, capped at 400ms total.

### 4.2 Signature moves (only two — resist adding more)

1. **"Settling" reveal on scroll-enter.** SectionHeading fades up 16px over 500ms AND its eyebrow underline (a 1px terracotta rule) draws left-to-right over 600ms with a 100ms delay. Used once per section. Drives the "unhurried" feel.
2. **ProductCard lift on hover.** Image zooms 3% (transform: scale(1.03)), card lifts 6px (translateY(-6px)) with `--shadow-md` growing to `--shadow-lg`. Only the hovered card animates — neighbours don't twitch. 200ms, out-expo.

That's it. No parallax scroll backgrounds, no cursor trails, no floating particles, no animated gradients. Restraint = luxury.

### 4.3 Reduced motion

`@media (prefers-reduced-motion: reduce)` kills all transform/translate and cross-fades only (opacity 0 → 1, 200ms). Non-negotiable — the spa tone demands we not override a user's system preference.

---

## 5. Component Direction

What changes from the current execution, component by component. Implementation comes after DESIGN.md is approved.

**Hero** — Keep the video, drop its opacity to ~50% and lay a warm cream→`--primary` vertical gradient over it (reads as "dusk through linen"). Push the headline into a left-aligned 7/12 column set in display-size Fraunces. Add a small rotated (90°) eyebrow on the right rail — "No. 01 / Soak" — with a short terracotta underline. One CTA (not two): filled `--primary`, cream text.

**SectionHeading** — Break the current centered stack. Eyebrow sits top-left on a hairline terracotta rule. h2 drops below, left-aligned, tight tracking. Lede floats to the right at roughly 60% column width, hung off the h2's right edge — asymmetric, editorial. Removes the "three-piece centered trophy" feel.

**ProductCard** — Drop the hard rectangular crop. Alternate aspect ratios: odd-index cards 4:5 portrait, even-index 5:6 (slightly taller). Corner radius jumps to `--radius-lg` (24px). Replace the small color dot with a horizontal "fabric-swatch strip" along the bottom interior edge: 60% width × 8px tall, 0 radius on the left/right, subtle dashed pseudo-border to read as stitched. Hover: 3% image zoom + 6px card lift, as described in §4.2.

**CatalogFilters** — Desktop becomes a left rail (sticky). Section labels in eyebrow style; filter pills sit beneath each. Color filters show a small color sample inside the pill. **Size filter becomes a 1–5 labeled slider** ("small ← → large"), not discrete chips — this is the one place where the interaction becomes the feature. Mobile stays as a horizontal scroll strip of chips (compact, no slider).

**ProductGallery** — Echo Aesop. Primary image floats on a `--surface` panel with huge top/bottom margin. Thumbnails become a vertical filmstrip on the right (desktop, 64px wide) or horizontal strip below (mobile). Ground the primary image with `--shadow-lg`. No lightbox — the image is already the hero.

**ContactForm** — Desktop splits 5/7. **Left**: an editorial aside — a pull-quote from a testimonial, the owner's email + phone stacked, small hours line. **Right**: the form on a `--surface` panel with `--radius-xl` corners. Labels float above each field in eyebrow style. Focus ring is `--ring` (terracotta), 2px offset. Submit button is filled `--primary`, with a subtle arrow glyph that slides 2px on hover.

**Testimonials** — One hero quote at a time. Large Fraunces pull-quote with an oversize terracotta quotation mark (`--accent-tint`) hanging in the left margin, touching the text baseline. Below the quote: a horizontal filmstrip of the remaining testimonials auto-advancing every 10s, paused on hover. Names and locations in eyebrow style. Kill the 3-up card grid.

**Header** — Structure kept. Logo left (set in Fraunces, not an SVG for now), nav center-right (4–5 items max), language switcher + "Request a quote" CTA rightmost. On page-scroll past 80px, the header shrinks from 80px → 64px, background transitions from transparent to `--surface` with a 1px `--accent` underline appearing. Smooth, not jumpy.

**Footer** — Three-column on `--surface`. **Left**: the WaterVibes wordmark + tagline + a thin terracotta rule under it. **Center**: nav links, eyebrow-styled section headers (Company / Catalog / Legal). **Right**: contact email, phone, address, hours. Above the columns, a full-width thin terracotta divider. A huge `--muted` Fraunces "WaterVibes" watermark sits behind everything at 6% opacity — decorative, not clickable. Microline at the bottom: copyright + "Made in Romania" in `--muted-foreground`.

**Admin (lighter pass)** — Same tokens (so admin inherits the warmth), but: no video backgrounds, no grain overlay, tighter radii (keep `--radius-md` for everything except dialogs), `--shadow-sm` only. Admin sidebar gets a thin `--accent` left rule on the active nav item. The intent is "same house, working room."

---

## 6. Imagery Direction

### 6.1 Photography brief

- **Natural light only.** Golden hour or overcast — no flash, no studio seamless paper.
- **Outdoor / backyard contexts.** Wooden decking, cedar surround, pea gravel, a garden in the background. Steam rising at dusk. A linen robe draped on the tub rim. A ceramic mug on the side table.
- **People-in-use, not empty tubs.** Hands, silhouettes, a couple at dusk — faces optional. Avoid stock "model in swimsuit, pristine white tub" photography.
- **Palette-aware selection.** Prefer photos with existing warm tones (cedar, rust, cream, dusk purple-pink). Avoid bright blue pool-tile images — they fight `--primary`.

### 6.2 Specific Unsplash picks — **need your verification**

> **Honest note:** I can't reliably pull verified Unsplash IDs from memory — inventing an 11-char ID that 404s would be worse than not providing one. Below are **search briefs** (query + the specific aesthetic to look for). I'd like you to either (a) confirm you're happy with search briefs and we'll curate from the results together, or (b) drop 3–5 IDs of your own and I'll swap them in.

| Role                          | Unsplash search query                              | What to look for                                 |
| ----------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| Hero background (alt to video)| `outdoor hot tub dusk cedar`                       | Steam rising, golden/magenta sky, dark wood      |
| Featured-products placeholder | `hot tub linen robe garden`                        | Robe on rim, not aggressively staged             |
| Catalog empty state           | `ceramic mug steam wooden table`                   | Still life, lots of negative space               |
| Contact page aside            | `hands ceramic bowl warm light`                    | Hands visible, human presence, no faces required |
| About/story section           | `cedar sauna interior warm light`                  | Wood grain, low-key lighting, spa texture        |

If you'd rather I run a WebSearch to curate 3–5 specific IDs now, say the word.

---

## 7. Three Reference Inspirations

Each with one specific thing we're borrowing.

1. **Aesop — any product page, e.g. aesop.com/u/gentle-facial-cleansing-milk.**
   *Borrow:* the way the product image floats on cream with an almost-excessive top margin, while the ingredient list sits as a quiet, typographically restrained sidebar. We'll echo this on our ProductDetail page — product image gets breathing room, specs (size/capacity/power) sit in a restrained sidebar, not a full-width spec table.

2. **Goop — any shopping content page, e.g. goop.com/beauty/skincare.**
   *Borrow:* the editorial rhythm between product cards and pull-quote / lifestyle breakouts. Goop doesn't grid everything; it lets a full-bleed quote or photo interrupt the product grid. We'll apply this on /catalog: after the first 6 products, break the grid with a full-bleed pull-quote from a testimonial before resuming.

3. **Oura — ouraring.com homepage.**
   *Borrow:* the soft gradient mesh transitions between sections — no hard color boundaries, just organic bleeds. We'll create subtle cream→`--surface` gradient fields between Hero / Featured / Testimonials so the page reads as one continuous surface, not a stack of slabs.

(Holding Le Labo in reserve — the fragrance-specific labels at lelabofragrances.com could inform a later decorative "batch-stamped" label for the footer watermark or admin login. Not borrowing yet.)

---

## 8. Approval Checklist (for review)

Before we write a line of implementation code, confirm:

- [ ] Background choice: **A / B / C** (recommendation: A `#F4EDE1`)
- [ ] Primary green: **A / B / C** (recommendation: A `#2D3F2F`)
- [ ] Terracotta: **A / B / C** (recommendation: A `#A0442E`, with B as `--accent-tint`)
- [ ] Heading font: Fraunces (kept) vs Instrument Serif (swap)
- [ ] Body font: **Manrope** (recommended) vs keep Inter
- [ ] Type scale — OK to go 17px body?
- [ ] Radii jump — OK to push cards to 24px, hero panels to 36px?
- [ ] Grain overlay — green-light or drop?
- [ ] Signature motion — the two in §4.2 are enough; resist adding a third?
- [ ] Imagery — search-brief approach (§6.2) or will you drop specific Unsplash IDs?
- [ ] Any component in §5 you want to pull in a different direction before we build?

Once signed off, this file becomes the spec; implementation PRs reference sections back to it (e.g., "per DESIGN.md §5 — ProductCard").
