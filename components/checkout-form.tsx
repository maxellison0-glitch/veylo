"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useStore } from "./store-provider";
import { useCookieConsent } from "./cookie-consent";
import { trackBeginCheckout } from "@/lib/tracking";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CheckoutForm() {
  const { items, subtotal } = useStore();
  const { consent } = useCookieConsent();
  const tracked = useRef(false);

  useEffect(() => {
    if (items.length && !tracked.current) {
      tracked.current = true;
      trackBeginCheckout(subtotal, items.map((item) => ({ id: item.slug, name: item.name, price: item.price, quantity: item.quantity })));
    }
  }, [items, subtotal]);

  const fetchClientSecret = useCallback(async () => {
    const readCookie = (name: string) => {
      const prefix = `${name}=`;
      const value = document.cookie
        .split(";")
        .map((entry) => entry.trim())
        .find((entry) => entry.startsWith(prefix));
      return value ? decodeURIComponent(value.slice(prefix.length)) : undefined;
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          slug: item.slug,
          variant: item.variant,
          finish: item.finish,
          quantity: item.quantity,
        })),
        metaTracking: {
          consent: consent === "accepted",
          fbp: consent === "accepted" ? readCookie("_fbp") : undefined,
          fbc: consent === "accepted" ? readCookie("_fbc") : undefined,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.clientSecret) {
      throw new Error(data.error ?? "Unable to start checkout");
    }

    const { clientSecret } = data;
    return clientSecret;
  }, [consent, items]);

  if (!items.length) {
    return (
      <section className="order-confirmation">
        <span className="eyebrow">Nothing here yet</span>
        <h1>Your bag is <em>empty.</em></h1>
        <Link className="button button-primary" href="/shop">Shop the range</Link>
      </section>
    );
  }

  return (
    <div className="checkout-layout">
      <div className="checkout-form">
        <Link className="checkout-back" href="/cart"><ArrowLeft size={15} /> Return to bag</Link>
        <header><span className="eyebrow">Secure checkout</span><h1>Almost <em>home.</em></h1></header>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
