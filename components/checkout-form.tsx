"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useStore } from "./store-provider";
import { useCookieConsent } from "./cookie-consent";
import { trackBeginCheckout } from "@/lib/tracking";

export function CheckoutForm() {
  const { items, subtotal } = useStore();
  const { consent } = useCookieConsent();
  const tracked = useRef(false);
  const redirecting = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (items.length && !tracked.current) {
      tracked.current = true;
      trackBeginCheckout(subtotal, items.map((item) => ({ id: item.slug, name: item.name, price: item.price, quantity: item.quantity })));
    }
  }, [items, subtotal]);

  const beginCheckout = useCallback(async () => {
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
    if (!response.ok || !data.url) {
      throw new Error(data.error ?? "Unable to start checkout");
    }

    window.location.assign(data.url);
  }, [consent, items]);

  useEffect(() => {
    if (!items.length || redirecting.current) return;
    redirecting.current = true;
    beginCheckout().catch(() => {
      redirecting.current = false;
      setFailed(true);
    });
  }, [items.length, beginCheckout]);

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
        {failed ? (
          <div className="checkout-handoff">
            <p>We couldn&rsquo;t open the payment page. Check your connection and try again.</p>
            <button
              className="button button-primary"
              onClick={() => {
                setFailed(false);
                redirecting.current = true;
                beginCheckout().catch(() => {
                  redirecting.current = false;
                  setFailed(true);
                });
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="checkout-handoff" role="status">
            <p>Taking you to secure payment&hellip;</p>
          </div>
        )}
        <p className="checkout-reassurance">30-day money-back guarantee · UK delivery 7–14 days · Stripe secure</p>
      </div>
    </div>
  );
}
