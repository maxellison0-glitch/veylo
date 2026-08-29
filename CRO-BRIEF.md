# Veylo — Conversion Brief (Codex handoff)

> **Purpose:** Fix the mobile checkout, add a welcome-offer email capture, improve how the collection sells psychologically, and close the tracking gaps found in the 29 Aug audit. Ads are live to the Relief Belt, so P0 items protect money already being spent.
>
> **Audited:** live site (www.veyloskin.com) on 375px/360px/1440px viewports, Meta Events Manager dataset 1033232699483856, Stripe checkout session flow, and this repo.

---

## Audit summary (what was found)

**Working:**
- Meta browser pixel fires end-to-end: PageView → ViewContent → AddToCart → InitiateCheckout → Purchase (1 real purchase recorded 24 Aug).
- Stripe embedded checkout creates sessions correctly; `allow_promotion_codes: true` is already set, so discount codes work with zero code changes.
- Client tracking calls are wired in all the right places (`lib/tracking.ts` call sites verified).

**Broken / missing:**
1. **GA4 is not running at all.** `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` is unset in production — no gtag script in the served HTML even with consent accepted. TikTok pixel likewise absent (may be intentional).
2. **Meta Conversions API has never delivered an event.** Events Manager shows zero SERVER_ONLY events ever. The code in `lib/meta-conversions.ts` is correct, so the cause is deployment config: `STRIPE_WEBHOOK_SECRET` and/or `META_CONVERSIONS_API_ACCESS_TOKEN` missing in the Vercel project, or no webhook endpoint registered in Stripe pointing at `/api/stripe/webhook`. Right now a buyer who never returns to `/checkout/return` (common in Meta's in-app browser) is an untracked purchase.
3. **Checkout is off-centre everywhere.** `.checkout-layout` reserves a `450px` (desktop) / `380px` (≤1080px) second grid column for a summary element that no longer exists — Stripe's embed includes its own summary. On 1440px the form sits at x=133 with ~700px dead space right. On phones, Max's screenshot shows the embed clipped off the right edge in Meta's in-app browser.
4. **Horizontal overflow source:** `.footer-wordmark` renders 374px wide at a 360px viewport (font-size 90px, fixed). `body{overflow-x:hidden}` mostly hides it, but it's the prime suspect for the shifted/clipped layout in in-app browsers.
5. **Shop page sells slowly on mobile:** ~1000px of hero/breadcrumb before the first product; 1-column grid = one product per screenful; first card shows an empty placeholder tile for seconds while a heavy PNG lazy-loads; no social proof anywhere; only bundles have was-prices.
6. **No email capture asset:** the newsletter form exists but only forwards each address to hello@veyloskin.com via Resend — there is no list, no welcome offer, no abandoned-checkout recovery.

---

## P0-A — Prerequisites: STATUS AS OF 29 AUG (evening)

All dashboard prerequisites are DONE except the Meta CAPI token, which is deliberately parked:

1. ✅ **Stripe webhook live**: `veylo-production` → `https://www.veyloskin.com/api/stripe/webhook`, events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`. `STRIPE_WEBHOOK_SECRET` is set in Vercel and deployed.
2. ✅ **`VEYLO10` promotion code live in Stripe**: 10% off, once, restricted to first-time orders. The welcome-offer feature (P1) can ship immediately — the code will be accepted at checkout with zero backend work.
3. ✅ **Klarna + Clearpay enabled** in Stripe payment methods — the payment-logos row on PDPs (P2-4) should include both from day one.
4. ✅ **GA4 live**: property "Veylo", stream "Veylo Skin website", `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID=G-WWMHYBB0YH` set in Vercel (Production) and deployed. gtag events in `lib/tracking.ts` now actually fire — do not remove the consent gating.
5. ⏸️ **Meta CAPI token: PARKED — do not touch.** The pixel dataset lives under a personal-account "Luna Plants" wrapper; the "Veylo Skin" business portfolio is ad-restricted, so migrating the pixel is unsafe until that restriction is resolved. The webhook route's `sendMetaPurchase` will throw until `META_CONVERSIONS_API_ACCESS_TOKEN` exists — Codex: wrap that call so a missing token logs and returns 200 rather than erroring the webhook (small P0 code fix, see P0-C below).

### P0-C — New small code task (consequence of the above)
In `app/api/stripe/webhook/route.ts`, `sendMetaPurchase` throws when Meta env vars are missing, which makes Stripe see a 500 and retry/disable deliveries. Change behaviour: if `META_CONVERSIONS_API_ACCESS_TOKEN` is unset, log once and return `{received: true}` normally. CAPI starts working later by just adding the env var — no redeploy of logic needed.

---

## P0-B — Checkout layout fix (Codex)

Files: `app/globals.css` (lines ~317, ~348, ~364, ~378), `components/checkout-form.tsx`.

1. `.checkout-layout`: remove the grid entirely. Replace with a single centred column: `max-width: 680px; margin: 0 auto;`. Delete the `1fr 450px` base rule, the `1fr 380px` rule in the ≤1080px block, and the now-redundant `.checkout-layout { grid-template-columns: 1fr }` in the ≤800px block. Delete `.checkout-summary` rules if nothing renders them (grep first — the component was removed, the CSS remains).
2. Compact the checkout header on mobile: `.checkout-form h1` → `font-size: clamp(34px, 9vw, 67px)`; `.checkout-form header` padding `45px 0` → `clamp(18px, 4vw, 45px) 0`. Goal: the Stripe email field visible within the first viewport on a 360px phone.
3. Overflow hardening (fixes the in-app-browser clipping):
   - `html { overflow-x: clip; }` (keep `body` rule too).
   - `.footer-wordmark { font-size: clamp(44px, 22vw, 200px); letter-spacing: -0.07em; max-width: 100%; }` — it must never exceed the viewport at 320px.
   - Sweep for other fixed-width offenders ≥320px at mobile sizes (announcement bar, marquee, hero) — test at 320/360/375/412.
4. Give the Stripe embed room: the wrapper div should have `min-width: 0; width: 100%;` and no horizontal padding beyond `.site-container`'s.
5. QA matrix (must pass before done): 320, 360, 375, 412, 800, 1080, 1440 widths — checkout visually centred, zero horizontal scroll, Pay button fully visible. Playwright or manual devtools run is fine.

---

## P1 — Welcome offer + email capture (Codex)

**Chosen mechanic (recommended): email-gated instant reveal.** Visitor enters email → we store it → the code `VEYLO10` is revealed immediately in the popup (no "check your inbox" friction) AND emailed as a backup. This builds a marketing list *and* converts the session that's already paid for by ads. A no-gate banner code burns 10% margin with no asset built; email-then-wait kills redemption. Gate it.

### 1. Popup component (`components/welcome-offer.tsx`)
- Trigger: 8s on page OR 40% scroll OR exit-intent (desktop only), whichever first. Never on `/checkout*`, `/cart`. Never within 30 days of dismissal (`localStorage` key `veylo-welcome-offer: dismissed|claimed + timestamp`), never if already claimed.
- Mobile: bottom sheet (~55vh), not a full-screen overlay — full-screen popups on ad traffic spike bounce and risk Meta's "unexpected experience" flags. Desktop: centred modal, max-width 440px.
- Design: match the editorial system — `--paper` background, display-serif headline, clay accent, hairline rules. No stock "gift box" iconography.
- Copy:
  - Eyebrow: `WELCOME TO VEYLO`
  - Headline: `10% off your first ritual.`
  - Body: `Join the list and we'll take 10% off your first order — plus early access to new devices and honest guides on what actually works.`
  - Field placeholder: `Email address` · Button: `Claim 10% off`
  - Success state: headline `Your code:` + large `VEYLO10` + "Copy code" button + `Applied at checkout — paste it in the promo field. Also sent to your inbox.` + CTA `Shop the range`.
  - Dismiss link (not just an ×): `No thanks, full price is fine.`
- Accessibility: focus trap, Esc closes, `role="dialog"`, respects `prefers-reduced-motion`.
- Fire `Lead` (Meta) + `generate_lead` (GA4) on successful capture via a new `trackLead()` in `lib/tracking.ts`.

### 2. Storage (`app/api/newsletter/route.ts`)
- Extend the existing route: accept `{ email, source }` (`welcome-popup` | `footer`).
- Add the contact to a **Resend Audience** (`resend.contacts.create({ audienceId: process.env.RESEND_AUDIENCE_ID, email })`) so a real list accumulates — keep the existing notification email to hello@ as well.
- On `source === "welcome-popup"`, send the welcome email (from `hello@veyloskin.com`): subject `Your 10% is waiting` — code, 3 featured products, free-delivery-over-£40 reminder, plain editorial styling.
- Handle duplicates gracefully (already subscribed → still show the code client-side).

### 3. Announcement bar (`components/announcement-bar.tsx`)
- Rotate two messages (CSS fade every 6s, no layout shift): `Free UK delivery over £40` ↔ `10% off your first order — claim below`. Second message scroll-links to opening the popup (or a `#welcome` trigger).

### 4. Checkout nudge
- On `/checkout`, above the embed, one quiet line for claimed users only (read from localStorage): `Have your VEYLO10 code? Add it in the promo field below.` Do not show to users who never claimed — don't teach full-price buyers to go hunting for codes mid-checkout.

**Not in scope for Codex:** creating the Stripe promotion code (owner action 3) and `RESEND_AUDIENCE_ID` env var (owner creates the audience in Resend).

---

## P1 — Pricing display & anchoring (Codex + owner decision)

**Compliance guard-rail (UK CMA/CAP):** a struck-through was-price is only lawful if the product genuinely sold at that price for a meaningful period. The Relief Belt has only ever sold at £69.99 — do **not** invent `previousPrice: 89.99`. Anchor with things that are true:

1. **Bundle savings are real — surface them harder.** The three Sets already have honest was-prices. On `ProductCard`, when `previousPrice` exists, add a computed pill `Save £X` in clay (the CSS badge exists; make the saving explicit and consistent).
2. **Clinic-price anchor on PDPs** (true and defensible): under the price on relevant devices, one muted line — Relief Belt: `A single red-light clinic session is £40–60. This is yours, nightly.` LED mask: `Clinic LED courses run £300+.` Data lives in `lib/catalog.ts` as optional `anchor?: string` rendered in `product-purchase.tsx` under `.detail-price`.
3. **Welcome offer is the discount.** VEYLO10 gives every new visitor a real 10% without polluting list prices — protects the brand and the margin ladder (£129.99 anchor → £69.99 core → £14.99 impulse).
4. **Optional (owner decision):** if Max wants strike-through prices on singles, raise the list price first and sell at it for a genuine period, or run a clearly-dated launch offer (`Launch price — ends <date>` with a real end date honoured). Codex: implement nothing here without the decision.

---

## P1 — Shop/collection page psychology (Codex)

Files: `components/shop-catalog.tsx`, `components/product-card.tsx`, `app/globals.css`, `app/shop/page.tsx`.

1. **Compress the hero on mobile:** breadcrumb + headline + intro currently push products ~1000px down. Cap the shop hero at ~40vh on ≤540px: smaller headline (`clamp(34px, 10vw, 53px)`), shorten intro to one line, pull the filter/sort bar up. First two product cards must be visible on a 812px-tall phone without scrolling.
2. **Two-column mobile grid:** `.product-grid, .shop-product-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 12px; }` at ≤540px (currently 1 column). Shrink card type accordingly; keep Quick add but as a compact icon button at ≤540px. One product per screenful reads as a thin catalogue; two-up reads as a range.
3. **Merchandised order, not just badges:** in the `featured` sort, pin: (1) LuminaPro LED Mask first — the £129.99 anchor makes everything after feel accessible; (2) Relief Belt second with a new `badge: "Bestseller"` (it's the ad product — true claim); (3) then core devices descending, impulse items last, bundles in their existing Combos section. Implement as an explicit `featuredOrder` array in `lib/catalog.ts` used by the featured sort.
4. **Cards carry proof and reasons:** add to `ProductCard` under the title, one muted benefit line (reuse `strapline`, clamp to one line) — cards currently give name + tagline + price and no reason to click.
5. **Image loading:** first 4 shop cards and the PDP hero get `priority`; the placeholder "V" tile flashing for seconds on the first card is the worst first impression on the page. Also pass tighter `sizes` (`(max-width:540px) 50vw, (max-width:800px) 50vw, 25vw`) so mobile pulls small variants.
6. **Collection pages** (`app/collections/[slug]/page.tsx`): same grid + ordering changes; add a one-line "why this collection" intro above the grid (exists in `collections` data).

---

## P2 — PDP conversion upgrades (Codex)

Files: `components/product-purchase.tsx`, `app/products/[slug]/page.tsx`, `app/globals.css`.

1. **Sticky mobile add-to-bag:** at ≤800px, when the main CTA scrolls out of view, show a slim fixed bottom bar: product name (truncated) + price + `Add to bag`. This is the single highest-value PDP change for ad traffic that scrolls to read.
2. **Delivery expectation near CTA:** OWNER DECISION (29 Aug): do NOT show transit times or arrival dates anywhere on product/cart/checkout surfaces — dispatch-speed framing only ("Dispatched within 48 hours, fully tracked", already live). Transit estimates exist solely on /delivery and the contact FAQ; leave those intact.
3. **Guarantee framing:** the 30-day money-back line exists; retitle it `Try it for 30 nights` on the Relief Belt/Wand (`riskReversal?: string` in catalog, fallback to current copy). Risk reversal beats feature lists at this price point.
4. **Payment method logos:** under the CTA, a muted row: Visa · Mastercard · Apple Pay · Google Pay · Klarna (once enabled). Static SVGs, no scripts.
5. **Reviews — honest path only:** no fabricated reviews or fake counts (illegal under UK DMCC 2024, and a Meta ban risk). Ship the plumbing: `reviews?: { author, rating, text, date }[]` in catalog rendered as a PDP section + `AggregateRating` JSON-LD only when real reviews exist; plus a post-purchase review-request email (see P2-8). Until reviews exist, show the guarantee + "as featured in our Journal" instead — never invented counts.

---

## P2 — Cart & AOV (Codex)

Files: `components/cart-drawer.tsx`, `components/cart-page-content.tsx`.

1. **Free-delivery progress in the drawer:** the cart page already has `.delivery-progress`; mirror it in the drawer above the subtotal: `You're £X away from free UK delivery` with the bar. Under £40 carts, this is the cheapest AOV lift available.
2. **One impulse cross-sell in the drawer:** below the items, a single compact row — CryoGlow Ice Roller £14.99 with `+ Add` (or Gua Sha if roller is already in the cart). One suggestion, not a carousel. Rule: suggest the cheapest item not in the cart from `["cool-roller","sculpt-set"]`.
3. **Bundle upgrade hint:** if the cart contains exactly the Veylo Wand or Relief Belt, one line: `Add the {other} as The Relief Ritual and save £15` linking to the bundle PDP.

---

## P2-8 — Abandoned checkout recovery (Codex, after webhook works)

- Handle `checkout.session.expired` in `app/api/stripe/webhook/route.ts`: if `session.customer_details?.email` exists (Stripe embedded checkout collects email first, so most abandons have it), send one Resend email ~1h later: subject `Your Veylo bag is waiting`, cart contents, one CTA back to `/checkout`, VEYLO10 mention only if they had claimed it (skip the discount otherwise — don't train abandonment). One send per email per 7 days (in-memory/Upstash or a `sent` metadata flag; simplest: Resend idempotency key on session id).
- Also send a proper order-confirmation email on `checkout.session.completed` (Stripe's receipt is bare): branded, what happens next, delivery window, support contact. `lib/emails.ts` for shared templates.

---

## The completion thread (psychology guide for every task above)

The store's job after the first click is to build momentum and never break it. Codex: apply these rules to every task in this brief rather than treating them as separate features.

1. **Message match, ad → checkout.** The ad promises relief; every step should re-promise it. The Relief Belt PDP headline, the cart line item, and the line above the Stripe embed should echo one idea (relief, tonight, risk-free) — not switch registers to generic ecommerce speak.
2. **Momentum framing.** People finish journeys they feel are nearly done. Cart drawer shows the free-delivery progress bar filling (progress, not distance); checkout header drops the tall editorial padding so the payment form itself is the first thing visible — the form being visible IS the momentum cue.
3. **Endowment before payment.** Once something is in the bag, talk about it as theirs: "Your Relief Belt is ready to dispatch" beats "Items: 1". Use this voice in the drawer, cart page, and abandoned-checkout email.
4. **Reassurance at the exact moment of doubt.** Doubt peaks at price and at payment. At price: the clinic-cost anchor + 30-night guarantee. At payment: one quiet line under the embed — "30-day money-back guarantee · dispatched within 48h · Stripe secure" — nothing more.
5. **Reduce choices as intent rises.** Homepage can be rich; PDP offers exactly one primary action; cart offers exactly one cross-sell; checkout offers zero distractions (no nav links back into the catalogue beyond the small "Return to bag").
6. **Honest urgency only.** Delivery-date specificity ("order today, arrives Tue–Fri") is the only time pressure allowed. No countdown timers, no fake stock counters — they poison trust and breach CAP guidance.

## Measurement (definition of success)

- GA4 live: real-time shows `page_view`, `view_item`, `add_to_cart`, `begin_checkout`, `purchase`.
- Events Manager: Server events appearing for Purchase with matching `event_id` dedup (browser + server counted once).
- Funnel baseline from pixel (last 7 days): ~130 PageView → 58 ViewContent → 3 AddToCart → 4 InitiateCheckout → 1 Purchase. Watch ViewContent→ATC (worst step, ~5%) after the shop/PDP changes, and ATC→Purchase after the checkout fix.
- Email list: welcome-popup capture rate target 3–6% of unique visitors; VEYLO10 redemptions visible in Stripe.

## Codex working notes

- Stack: Next.js App Router, React 19, Tailwind 4 + hand-rolled editorial CSS in `app/globals.css` (single-file, dense one-line rule groups — match that style, mind selector specificity/order since later rules win).
- Product data is static in `lib/catalog.ts`; cart state in `components/store-provider.tsx` (localStorage).
- Validate with `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Priority order: P0-B → P1 welcome offer → P1 shop → P2s. Ship P0-B alone first — it's protecting live ad spend.
