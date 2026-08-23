import { Suspense } from "react";
import type { Metadata } from "next";
import { ReturnContent } from "./return-content";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false, follow: false } };

export default function ReturnPage() {
  return (
    <main className="checkout-page">
      <div className="site-container">
        <Suspense fallback={<section className="order-confirmation"><span className="eyebrow">Processing</span><h1>One moment…</h1></section>}>
          <ReturnContent />
        </Suspense>
      </div>
    </main>
  );
}
