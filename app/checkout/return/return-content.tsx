"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { trackPurchase } from "@/lib/tracking";

export function ReturnContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useStore();
  const [status, setStatus] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const purchaseTracked = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    fetch(`/api/checkout/status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setEmail(data.customerEmail);
        if (data.status === "complete") {
          clearCart();
          if (!purchaseTracked.current) {
            purchaseTracked.current = true;
            trackPurchase(data.amountTotal ?? 0, sessionId);
          }
        }
      });
  }, [searchParams, clearCart]);

  if (status === "complete") {
    return (
      <section className="order-confirmation">
        <span className="confirmation-mark"><Check size={34} strokeWidth={1.3} /></span>
        <span className="eyebrow">Order confirmed</span>
        <h1>Your ritual is on its <em>way.</em></h1>
        <p>Thank you. We&apos;ve received your order and will start preparing it for dispatch.{email && <> A confirmation has been sent to <strong>{email}</strong>.</>}</p>
        <div><span>Next step</span><strong>We pack and dispatch</strong><small>Within 24–48 hours, Monday to Friday</small></div>
        <Link className="button button-primary" href="/shop">Continue shopping</Link>
      </section>
    );
  }

  if (status === "open") {
    return (
      <section className="order-confirmation">
        <span className="eyebrow">Payment incomplete</span>
        <h1>Something went <em>wrong.</em></h1>
        <p>Your payment wasn&apos;t completed. No charge has been made.</p>
        <Link className="button button-primary" href="/checkout">Try again</Link>
      </section>
    );
  }

  return (
    <section className="order-confirmation">
      <span className="eyebrow">Processing</span>
      <h1>One moment…</h1>
    </section>
  );
}
