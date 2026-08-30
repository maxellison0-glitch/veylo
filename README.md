# Veylo storefront

The frontend for Veylo, a UK ecommerce brand for design-led at-home beauty tech. The production domain is www.veyloskin.com.

## Stack

- Next.js App Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom editorial design system
- Stripe hosted checkout (sessions created in `/api/checkout`; buyers pay on checkout.stripe.com)

## Tracking

All tracking is consent-gated by the cookie banner (`components/cookie-consent.tsx`).

- **Meta pixel** (`NEXT_PUBLIC_META_PIXEL_ID`) — PageView, ViewContent, AddToCart, InitiateCheckout, Lead, Purchase (browser side, fired from `lib/tracking.ts`).
- **GA4** (`NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`) — mirror events via gtag.
- **Meta Conversions API** — server-side Purchase, sent from the Stripe webhook (`app/api/stripe/webhook/route.ts` → `lib/meta-conversions.ts`), deduplicated against the browser event by session id. Requires `STRIPE_WEBHOOK_SECRET` and `META_CONVERSIONS_API_ACCESS_TOKEN` (a long-lived user token that expires ~every 60 days — a scheduled task reminds Max to renew; see the Vercel env var note for the renewal steps).
- **Email capture** — welcome popup + footer form store contacts in Resend (`RESEND_API_KEY`; domain veyloskin.com is verified) and send the VEYLO10 welcome email.

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
- `/cart` and `/checkout` — local cart; `/checkout` creates a Stripe session and redirects to Stripe's hosted payment page (returns to `/checkout/return`)
- `/about`, `/contact` — brand pages
- `/journal` — notes, coming soon
- `/delivery`, `/returns`, `/privacy`, `/terms`, `/cookies` — policies

Product data lives in `lib/catalog.ts`. Product photos go in `public/products/{slug}.jpg`; until a photo exists, a placeholder tile in the product's finish colour is rendered.
