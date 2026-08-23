# Veylo storefront

The frontend for Veylo, a UK ecommerce brand for design-led at-home beauty tech. The domain is veyloskin.co.uk (not yet live).

## Stack

- Next.js App Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom editorial design system
- Stripe embedded checkout (env-driven)

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Copy `.env.local.example` to `.env.local` and add Stripe keys to enable checkout.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Storefront routes

- `/` — hero-product homepage
- `/shop` — filterable product range (concern and type)
- `/products/[slug]` — configurable product detail
- `/cart` and `/checkout` — local cart and Stripe embedded checkout
- `/about`, `/contact` — brand pages
- `/journal` — notes, coming soon
- `/delivery`, `/returns`, `/privacy`, `/terms`, `/cookies` — policies

Product data lives in `lib/catalog.ts`. Product photos go in `public/products/{slug}.jpg`; until a photo exists, a placeholder tile in the product's finish colour is rendered.
