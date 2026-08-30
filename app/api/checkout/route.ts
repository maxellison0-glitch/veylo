import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { products } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type CartItem = {
  slug: string;
  variant: string;
  finish: string;
  quantity: number;
};

type MetaTracking = {
  consent?: boolean;
  fbp?: string;
  fbc?: string;
};

function safeMetadataValue(value: string | null | undefined, maxLength = 500) {
  if (!value) return undefined;
  return value.replace(/[\r\n]/g, " ").slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  const { items, metaTracking } = (await request.json()) as {
    items: CartItem[];
    metaTracking?: MetaTracking;
  };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const unknownItem = items.find((item) => !products.some((product) => product.slug === item.slug));
  if (unknownItem) {
    return NextResponse.json(
      { error: "One of the products in your bag could not be found." },
      { status: 400 },
    );
  }

  const lineItems = items.map((item) => {
    const product = products.find((p) => p.slug === item.slug);
    if (!product) throw new Error(`Unknown product: ${item.slug}`);

    const variant = product.variants.find((v) => v.label === item.variant) ?? product.variants[0];

    return {
      price_data: {
        currency: "gbp",
        product_data: {
          name: product.name,
          description: `${variant.label} · ${item.finish}`,
        },
        unit_amount: Math.round(variant.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const subtotal = lineItems.reduce(
    (sum, li) => sum + li.price_data.unit_amount * li.quantity,
    0,
  );

  const shippingOptions =
    subtotal >= 4000
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 0, currency: "gbp" },
              display_name: "Free tracked UK delivery",
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 299, currency: "gbp" },
              display_name: "Tracked UK delivery",
            },
          },
        ];

  const trackingConsent = metaTracking?.consent === true;
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const sourceUrl = request.nextUrl.origin;
  const rawTrackingMetadata = {
    meta_tracking_consent: trackingConsent ? "accepted" : "rejected",
    meta_fbp: trackingConsent ? safeMetadataValue(metaTracking?.fbp, 255) : undefined,
    meta_fbc: trackingConsent ? safeMetadataValue(metaTracking?.fbc, 255) : undefined,
    meta_client_ip_address: trackingConsent ? safeMetadataValue(forwardedFor, 64) : undefined,
    meta_client_user_agent: trackingConsent
      ? safeMetadataValue(request.headers.get("user-agent"))
      : undefined,
    meta_source_url: safeMetadataValue(`${sourceUrl}/checkout/return`),
    meta_contents: safeMetadataValue(
      JSON.stringify(
        items.map((item) => {
          const product = products.find((entry) => entry.slug === item.slug);
          const variant = product?.variants.find((entry) => entry.label === item.variant) ?? product?.variants[0];
          return {
            id: item.slug,
            quantity: item.quantity,
            item_price: variant?.price,
          };
        }),
      ),
    ),
  };
  const trackingMetadata = Object.fromEntries(
    Object.entries(rawTrackingMetadata).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );

  // Hosted checkout: Stripe owns the whole viewport, which sidesteps the
  // embedded iframe's unreliable sizing inside in-app mobile browsers.
  const session = await getStripe().checkout.sessions.create({
    integration_identifier: "veylo_checkout_kmtrpexa",
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["GB"] },
    shipping_options: shippingOptions,
    allow_promotion_codes: true,
    // UK-only store: currency conversion adds a broken narrow-screen selector and a buyer FX fee.
    adaptive_pricing: { enabled: false },
    locale: "en-GB",
    success_url: `${request.nextUrl.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.nextUrl.origin}/cart`,
    metadata: trackingMetadata,
  });

  return NextResponse.json({ url: session.url });
}
