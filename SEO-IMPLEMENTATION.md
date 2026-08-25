# Veylo organic search launch plan

Updated: 25 August 2026

## What is implemented in the storefront

- Fixed `https://www.veyloskin.com` as the production metadata base so preview hosts cannot become canonical URLs.
- Added self-referencing canonicals to the homepage, shop, commercial collections, product pages, technology, about, contact, delivery and returns pages.
- Added permissive Googlebot preview directives, blocked API routes from crawling, and kept cart/checkout pages crawlable with `noindex` so search engines can see the exclusion directive.
- Kept no-index pages (checkout, cart and the empty journal) out of the XML sitemap.
- Added unique, search-intent-led titles and descriptions for all 11 product pages and four collection pages.
- Expanded category pages with useful, visible comparison copy and FAQs. The copy distinguishes mechanisms and avoids unsupported medical or hair-growth claims.
- Expanded product structured data with price, GBP currency, availability, Veylo brand, category, colour, shipping time/cost and the 30-day returns policy.
- Added visible FAQ structured data and breadcrumb structured data to product and collection pages.
- Added a Google Merchant RSS feed at `/google-merchant-feed.xml` for free listings and Shopping readiness.
- Added a web app manifest and environment variables for Google Search Console and Bing Webmaster Tools verification.
- Preserved the catalogue's quarantine of unverified product concepts; only the 11 approved products are published.

## Keyword and landing-page map

| Priority query cluster | Primary landing page | Organic competitors observed |
| --- | --- | --- |
| red light therapy belt UK, 660nm 850nm belt | `/products/relief-belt` | Lumovex, TheThermoLab, Theia, Diamond |
| LED face mask UK, 7 colour LED mask | `/products/lumen-mask` | CurrentBody, Ovey London, Boots, Silk'n |
| ice-cooled IPL UK, at-home IPL handset | `/products/ipl-hair-removal` | Ulike/Boots, CurrentBody |
| red light therapy facial wand, microcurrent face wand | `/products/veylo-wand` | FLOE, Maskura, Nanoleaf, Solawave |
| heated eye massager air compression | `/products/eye-rest-massager` | Helpfect, Medisana, Renpho/Costco |
| electric scalp massager UK | `/products/scalprevive-massager` | Currys/Medivon, Aetheo/Breo, Debenhams marketplace |
| stainless steel ice roller for face | `/products/cool-roller` | Elizabeth Grant and large beauty retailers |

The fastest realistic product opportunities are the Relief Belt, Veylo Wand and EyeRest pages: Veylo is priced below many specialist competitors while the implemented copy is more cautious and specification-led. The LED-mask and IPL terms have higher retailer and paid-media competition and will usually need Merchant Center, reviews, links and sustained content support.

## Competitor advertising check

Google Ads Transparency Center was checked with the region set to the United Kingdom on 25 August 2026.

- CurrentBody.com Ltd: verified UK advertiser, approximately 300 ads visible in the advertiser suggestion.
- SOUTH KOREA ULIKE GROUP CO., LIMITED: approximately 504 ads; a second verified US account showed approximately two ads.
- Lumovex: no advertiser or website match appeared for `Lumovex` or `lumovex.co.uk`. This is not definitive proof of no advertising because ads can be registered under a different legal entity or account.
- Silk'n: no direct advertiser suggestion appeared for the brand-name search. Treat this as inconclusive for the same reason.

Transparency Center counts are approximate creative counts, not spend, impressions or search-keyword data. They show that CurrentBody and Ulike are actively investing at materially larger scale and should be monitored for messaging and offer changes, not copied.

## Actions requiring account access

1. Deploy the current build to the production domain.
2. In Google Search Console, add the domain property, place its verification token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, deploy, then submit `/sitemap.xml`.
3. Inspect and request indexing for the homepage, the four collections and the priority products: Relief Belt, LuminaPro, IceGlide, Veylo Wand, EyeRest and ScalpRevive.
4. Create or connect Google Merchant Center, verify/claim the domain, add the scheduled feed `https://www.veyloskin.com/google-merchant-feed.xml`, select the United Kingdom and enable free listings.
5. Configure Merchant Center shipping to match the site (£2.99 below £40; free from £40) and the 30-day return policy. Resolve every diagnostics warning before ads are considered.
6. Add the GA4 measurement ID to `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`, then confirm consent-mode behaviour and ecommerce events in DebugView.
7. After data begins accumulating, use Search Console queries/pages weekly: improve pages receiving impressions in positions 8–30 before creating additional content.

## Next authority work (30–90 days)

- Collect verified buyer reviews on the relevant product pages. Do not add aggregate-rating schema until ratings are genuinely visible on-page.
- Publish first-hand guides only after the team can document the actual device, test method, photos and reviewer. Priority comparisons: 660nm vs 850nm, LED mask vs facial wand, ice-cooled IPL suitability, and eye-massager safety.
- Build relevant UK links through product testing, beauty/wellness editors, supplier/manufacturer listings and credible gift guides. Avoid paid link packages and mass guest posting.
- Add GTINs or manufacturer part numbers to catalogue data and the Merchant feed when the verified identifiers are available. Do not invent identifiers.
- Monitor Core Web Vitals and image performance after production traffic begins; optimise based on field data rather than a one-off lab score.

## Measurement baseline

At the time of the audit, a `site:veyloskin.com` search did not surface an established indexed footprint, and direct fetches of the production domain were not consistently available to the audit tool. Treat Search Console's Page Indexing report as the authoritative baseline after deployment. No ethical SEO implementation can guarantee ranking dates; indexing and commercial rankings depend on crawl access, competition, site trust, product evidence, links and user response.

## Primary Google references

- [Google product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Google free product listings](https://support.google.com/merchants/answer/13889434?hl=en)
- [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
