import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery Policy",
  description: "Delivery information for Veylo orders: tracked UK delivery in 7–14 days, free over £40.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <main className="legal-page">
      <div className="site-container legal-container">
        <span className="eyebrow">Policy</span>
        <h1>Delivery Policy</h1>
        <p className="legal-updated">Last updated: August 2026</p>

        <section>
          <h2>1. Where we deliver</h2>
          <p>We currently deliver to United Kingdom addresses only. We do not ship internationally at this time.</p>
        </section>

        <section>
          <h2>2. Dispatch</h2>
          <p>We begin processing your order within 24 hours of payment, Monday to Friday. Orders placed over the weekend are processed at the start of the following week. We will email you when your parcel is on its way, with tracking.</p>
        </section>

        <section>
          <h2>3. Delivery timescales</h2>
          <p>Tracked UK delivery takes 7&ndash;14 days from the day you place your order. Most orders arrive towards the earlier end of that window, but we quote the full range so you are never waiting on a promise we did not make.</p>
          <p>Orders containing more than one item may arrive in separate packages on different days.</p>
          <p>These timescales are estimates and not guaranteed. Delays may occur due to high demand, carrier issues or circumstances beyond our control. We will contact you if there is a significant delay.</p>
        </section>

        <section>
          <h2>4. Shipping costs</h2>
          <ul>
            <li><strong>Orders of &pound;40 or more:</strong> Free tracked UK delivery</li>
            <li><strong>Orders under &pound;40:</strong> &pound;2.99 tracked UK delivery</li>
          </ul>
        </section>

        <section>
          <h2>5. Delivery address</h2>
          <p>Please ensure your delivery address is correct at checkout. We cannot be held responsible for orders delivered to an incorrect address provided by the customer. If you need to change your delivery address after placing an order, contact us as soon as possible at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>. Changes may not be possible once an order has been dispatched.</p>
        </section>

        <section>
          <h2>6. Failed delivery</h2>
          <p>If delivery is attempted and you are not available, the carrier will leave instructions for redelivery or collection. If a parcel is returned to us as undeliverable, we will contact you to arrange redelivery. Additional shipping costs may apply.</p>
        </section>

        <section>
          <h2>7. Damaged or missing items</h2>
          <p>Please inspect your order on arrival. If anything is damaged, missing or incorrect, contact us within 48 hours at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a> with photographs of the item and packaging. We will arrange a replacement or refund as set out in our <Link href="/returns">Returns Policy</Link>.</p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>For any delivery enquiries, email <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>.</p>
        </section>
      </div>
    </main>
  );
}
