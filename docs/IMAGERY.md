---
name: Imagery Curation
description: Curated Unsplash photos for the WaterVibes redesign, mapped to roles in DESIGN.md §6.
---

# IMAGERY.md — WaterVibes Curated Photography

> Companion to [`docs/DESIGN.md`](./DESIGN.md) §6. Five Unsplash picks, one per role, to be applied in Step 1/2 of the redesign.
> Romanian brand voice is authoritative; photography is the tactile counterpart — warm, natural-light, unhurried.

---

## 0. Honest note on verification

- The Unsplash photo **page IDs** below are confirmed to exist via web search (Google has indexed them with matching titles, photographer names, and descriptions).
- I was **not able to fetch the photo pages directly** from this environment — Unsplash has active bot protection (Anubis challenge) that blocks server-side WebFetch and curl with non-browser requests. That means I verified **existence and description** but not the actual pixel content.
- Similarly, the canonical CDN URL hash for each photo (e.g. `photo-1607687644-dc5fa4ef3de6`) cannot be derived from the short page ID (e.g. `xY6H6qv6HmI`) without fetching the page.

**Two recommended resolution paths — please pick one before Step 1:**

1. **You confirm + paste.** Open each of the 5 Unsplash page URLs below in your browser, visually confirm the fit, then paste each photo's canonical `images.unsplash.com/photo-...` URL into this file (or reply here). I swap the placeholders in Step 2.
2. **Download to `/public/images/`.** In Step 1 I add a one-time download step: fetch each image to `public/images/hero.jpg`, `public/images/featured.jpg`, etc. (via the `/download?force=true&w=1600` endpoint the browser can reach), and reference local files. Self-hosts the assets, removes external dependency, zero 3rd-party runtime calls. Downside: adds ~2–4 MB to the repo.

Either path works. Path 2 is my recommendation for a brand site that wants crisp, hotlink-free delivery.

---

## 1. Role → photo

### 1.1 Hero (homepage hero poster / `/about` hero background)

- **Page:** https://unsplash.com/photos/a-patio-with-a-pool-and-a-deck-with-a-house-in-the-background-FT9EK36iVek
- **Short ID:** `FT9EK36iVek`
- **Photographer:** Marty O'Neill *(search-result credit — confirm on the page)*
- **Why this pick:** "A patio with a pool and a deck with a house in the background" tagged as a Sunset image — matches the brief's "outdoor / backyard, cedar deck, dusk, steam." Strong warm magenta/gold sky tones; dark wood deck anchors the lower third. The house silhouette reads as "home," not "resort."
- **Placeholder CDN URL (to be swapped):** `https://images.unsplash.com/photo-<HASH>?auto=format&fit=crop&w=1920&q=80`

### 1.2 Featured-products placeholder (fallback image on homepage Featured section)

- **Page:** https://unsplash.com/photos/a-wooden-deck-with-a-small-pool-of-water-K2PHlHf807g
- **Short ID:** `K2PHlHf807g`
- **Photographer:** Yuika Takamura *(search-result credit — confirm on the page)*
- **Why this pick:** Japanese sensibility — wooden deck + small still pool of water. Reads as an intimate soaking tub rather than a pool. Serene, minimal, warm wood. Works as a neutral fallback when a product has no hero image yet.
- **Placeholder CDN URL (to be swapped):** `https://images.unsplash.com/photo-<HASH>?auto=format&fit=crop&w=1600&q=80`

### 1.3 Catalog empty state

- **Page:** https://unsplash.com/photos/white-ceramic-mug-with-coffee-on-brown-wooden-table-dqpEg5lo9P0
- **Short ID:** `dqpEg5lo9P0`
- **Photographer:** Annie Spratt (@anniespratt) — confirmed in search results, Aug 4 2017
- **Why this pick:** Annie Spratt's photography is consistently warm-light, editorial, understated — exactly the register the brand wants. A ceramic mug with coffee on brown wood is the platonic form of the DESIGN §6.1 "still life, lots of negative space" brief. Used as the visual behind "Niciun produs găsit" / "No products match" — keeps the mood warm even when filters fail.
- **Placeholder CDN URL (to be swapped):** `https://images.unsplash.com/photo-<HASH>?auto=format&fit=crop&w=1200&q=80`

### 1.4 Contact page aside

- **Page:** https://unsplash.com/photos/a-cup-of-tea-with-a-white-blanket-TVoC93uVN70
- **Short ID:** `TVoC93uVN70`
- **Photographer:** *(not captured by search snippet — confirm on the page)*
- **Why this pick:** A cup of tea on a white blanket — cozy, intimate, warm. Matches the "ceramic + warm light" part of the brief. **Honest caveat:** the original brief asked for "hands visible, human presence." This image has no hands. If you want hand-presence specifically, we need a different pick — the candidates I found (person holding coconut; women in robes) either had distracting secondary subjects or drifted into stock-spa territory. My judgment: the brand warmth register matters more than literal hands for the contact-aside context, where the image sits next to a pull-quote and contact block. Open to swapping if you disagree.
- **Placeholder CDN URL (to be swapped):** `https://images.unsplash.com/photo-<HASH>?auto=format&fit=crop&w=1200&q=80`

### 1.5 About/story section

- **Page:** https://unsplash.com/photos/a-wooden-sauna-overlooks-a-forest-view-xY6H6qv6HmI
- **Short ID:** `xY6H6qv6HmI`
- **Photographer:** Clay Banks — confirmed in search results, Glen Spey NY
- **Why this pick:** Pure match for "cedar sauna interior, warm light, wood grain, low-key lighting." Clay Banks' sauna series is widely used for wellness brands and reads as a "place you want to be" rather than a product-shot. The forest view through the window echoes the "relaxation connected to nature" thread in the brand copy.
- **Placeholder CDN URL (to be swapped):** `https://images.unsplash.com/photo-<HASH>?auto=format&fit=crop&w=1600&q=80`

---

## 2. Attribution plan

- Footer credit line: "Photography: Unsplash — Marty O'Neill, Yuika Takamura, Annie Spratt, Clay Banks + one TBC" (per DESIGN.md §5 Footer — *"Made in Romania"* microline gets a photo credit sibling).
- Per Unsplash License: attribution is not required but encouraged. We do it because it matches the brand's "made by humans" register.

---

## 3. Backups (if you veto a pick above)

| Role              | Backup short ID     | Notes                                             |
| ----------------- | ------------------- | ------------------------------------------------- |
| Hero              | `K2PHlHf807g`       | Quieter alternative — use if the Marty O'Neill shot feels too "real estate." Swap with Featured placeholder. |
| Hero              | `wKKpE9DHdew`       | Aerial pool + wooden deck. Risk: too top-down, loses the "dusk/person" warmth. |
| Catalog empty     | `kuRUoN19feg`       | Mug on wooden chair at sunset — warmer than the Annie Spratt pick, but less negative space. |
| About/story       | `NRZ1bc4h9ME`       | Anne Nygård — sauna with rocks, bucket, wood. More "accessories-forward," less window/view. |
| About/story       | `8ReIGirLkiQ`       | Wooden bench inside sauna — tighter crop, no forest view. |

---

## 4. Rejected directions (for the record)

- **Stock "model in white tub" photography** — rejected per DESIGN.md §6.1.
- **Bright blue pool-tile imagery** — fights `--primary`, rejected per §6.1.
- **Flash-lit product-on-seamless-paper shots** — wrong register entirely.
- **Any image dominated by cold cyan or turquoise** — palette clash.

---

## 5. Action items before Step 1

- [ ] You visually confirm each of the 5 Unsplash page URLs and flag any you want swapped for a backup.
- [ ] You choose between **Path 1 (paste CDN URLs)** and **Path 2 (download to `/public/images/`)** from §0 above.
- [ ] Once confirmed, I apply the URLs in Step 2 (public pages) per the roles mapped here.
