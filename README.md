# WaterVibes

A bilingual (English + Romanian) catalog and lead-generation site for a jacuzzi brand. Customers browse products, filter by size and color, view detail pages, and submit contact/quote requests that are emailed to the owner. The owner manages products and testimonials through a password-protected `/admin` panel. No cart, no checkout, no customer accounts.

See [PLAN.md](./PLAN.md) for the product spec and [CLAUDE.md](./CLAUDE.md) for the operating manual (repo map, conventions, phase history).

## Tech stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **MongoDB** via **Mongoose**
- **Resend** for transactional email (contact form)
- **next-intl** for i18n (`en`, `ro`)
- **shadcn/ui** + **Radix** primitives, **lucide-react** icons
- **react-hook-form** + **zod** for forms
- **jose** + **bcryptjs** for admin auth (JWT in an httpOnly cookie)
- **framer-motion** for restrained scroll motion
- **sonner** for toasts
- **pnpm** as the package manager

## Quickstart

```bash
git clone <repo-url> watervibe
cd watervibe
pnpm install

# Copy the environment template and fill in values
cp .env.example .env.local

# Seed MongoDB with 8 products + 4 testimonials
pnpm seed                # writes to the DB
pnpm seed -- --dry-run   # just logs what would be inserted

pnpm dev                 # http://localhost:3000
```

Useful scripts:

```bash
pnpm dev          # local dev
pnpm build        # production build
pnpm start        # run production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm seed         # wipe + reseed products and testimonials
```

## Admin access

1. Pick a password and generate a bcrypt hash:

   ```bash
   node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 10))" 'your-password'
   ```

2. Put the hash in `.env.local` as `ADMIN_PASSWORD_HASH`.

   **Important:** `@next/env` expands `$` as a variable reference (single quotes do not prevent this). Escape every `$` with a backslash:

   ```
   ADMIN_PASSWORD_HASH=\$2a\$10\$xxxxxxxxxxxxxxxxxxxxxx
   ```

3. Generate a 32+ byte random string for `JWT_SECRET`:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. Log in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login) with the plaintext password. The server compares it against the stored hash and sets a signed, httpOnly session cookie (7-day expiry).

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add the following environment variables in the Vercel project settings:
   - `MONGODB_URI`, `MONGODB_DB`
   - `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL`, `NEXT_PUBLIC_CONTACT_EMAIL`
   - `ADMIN_PASSWORD_HASH` (the `$` characters do **not** need to be escaped in Vercel's UI), `JWT_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://watervibes.example`)
3. Deploy. `pnpm build` is the production build; `pnpm seed` can be run locally against the production `MONGODB_URI` to populate the database once.

## Links

- [PLAN.md](./PLAN.md) — product spec, data model, phase history
- [CLAUDE.md](./CLAUDE.md) — repo map, conventions, agent operating manual
