import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { sendMetaPurchase } from "@/lib/meta-conversions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PURCHASE_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);
let loggedMissingMetaToken = false;

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 500 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature" }, { status: 400 });
  }

  if (PURCHASE_EVENTS.has(event.type)) {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      if (!process.env.META_CONVERSIONS_API_ACCESS_TOKEN) {
        if (!loggedMissingMetaToken) {
          console.warn("Meta Conversions API token is unset; skipping server-side Purchase events.");
          loggedMissingMetaToken = true;
        }
      } else {
        await sendMetaPurchase(session, event.created);
      }
    }
  }

  return NextResponse.json({ received: true });
}
