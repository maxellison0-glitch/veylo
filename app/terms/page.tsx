import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for purchasing from Veylo, a UK-based online retailer of at-home beauty devices and accessories.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="site-container legal-container">
        <span className="eyebrow">Legal</span>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: August 2026</p>

        <section>
          <h2>1. About us</h2>
          <p>Veylo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates veyloskin.com. Our address is The Fairmont, Kitty Lane, FY4 5EG, United Kingdom. You can reach us at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>.</p>
        </section>

        <section>
          <h2>2. These terms</h2>
          <p>By placing an order through veyloskin.com you agree to be bound by these terms together with our <Link href="/privacy">Privacy Notice</Link>, <Link href="/delivery">Delivery Policy</Link>, <Link href="/returns">Returns Policy</Link> and <Link href="/cookies">Cookie Policy</Link>. We may update these terms from time to time; the version in force at the date of your order applies.</p>
        </section>

        <section>
          <h2>3. Orders and pricing</h2>
          <p>All prices are in pounds sterling (GBP) and include VAT where applicable. We reserve the right to change prices at any time, but changes will not affect orders already accepted.</p>
          <p>An order is accepted when we send a confirmation email. Until that point, we may decline or cancel an order for any reason, including stock availability or pricing errors.</p>
        </section>

        <section>
          <h2>4. Products</h2>
          <p>Product images are representative. Colours and finishes may appear slightly different between screens and individual units; minor variations are not defects.</p>
          <p>Our products are cosmetic tools intended for general beauty use. They are not medical devices and are not intended to diagnose, treat or cure any condition. Always follow the instructions supplied with each product.</p>
        </section>

        <section>
          <h2>5. Payment</h2>
          <p>Payment is taken at checkout via Stripe. We accept major credit and debit cards. All transactions are processed securely; we do not store your card details.</p>
        </section>

        <section>
          <h2>6. Delivery</h2>
          <p>Delivery terms are set out in our <Link href="/delivery">Delivery Policy</Link>. Risk passes to you on delivery. Title passes when we receive full payment.</p>
        </section>

        <section>
          <h2>7. Returns, cancellations and refunds</h2>
          <p>Your cancellation and return rights are set out in our <Link href="/returns">Returns, Cancellations and Refunds Policy</Link>.</p>
        </section>

        <section>
          <h2>8. Limitation of liability</h2>
          <p>Nothing in these terms limits our liability for death or personal injury caused by our negligence, fraud or any other liability that cannot be excluded by law.</p>
          <p>Subject to the above, our total liability for any claim arising from or related to an order shall not exceed the amount you paid for that order.</p>
        </section>

        <section>
          <h2>9. Intellectual property</h2>
          <p>All content on this site, including designs, images, text and the Veylo brand, is owned by us or our licensors. You may not reproduce, distribute or use any content without our written permission.</p>
        </section>

        <section>
          <h2>10. Governing law</h2>
          <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales, without prejudice to your statutory rights.</p>
        </section>

        <section>
          <h2>11. Contact</h2>
          <p>Questions about these terms? Email us at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a> or write to Veylo, The Fairmont, Kitty Lane, FY4 5EG.</p>
        </section>
      </div>
    </main>
  );
}
