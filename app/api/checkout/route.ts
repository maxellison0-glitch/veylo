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

export async function POST(request: NextRequest) {
  const { items } = (await request.json()) as { items: CartItem[] };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
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
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 4 },
                maximum: { unit: "business_day" as const, value: 7 },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 299, currency: "gbp" },
              display_name: "Tracked UK delivery",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 4 },
                maximum: { unit: "business_day" as const, value: 7 },
              },
            },
          },
        ];

  const session = await getStripe().checkout.sessions.create({
    integration_identifier: "veylo_checkout_kmtrpexa",
    ui_mode: "embedded_page",
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["GB"] },
    shipping_options: shippingOptions,
    allow_promotion_codes: true,
    return_url: `${request.nextUrl.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
