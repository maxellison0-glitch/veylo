import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Veylo collects, uses and protects your personal data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="site-container legal-container">
        <span className="eyebrow">Privacy</span>
        <h1>Privacy Notice</h1>
        <p className="legal-updated">Last updated: August 2026</p>

        <section>
          <h2>1. Who we are</h2>
          <p>Veylo is the data controller for personal data collected through veyloskin.com. Our address is The Fairmont, Kitty Lane, FY4 5EG, United Kingdom. Contact us at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>.</p>
        </section>

        <section>
          <h2>2. What data we collect</h2>
          <p>We may collect and process the following personal data:</p>
          <ul>
            <li><strong>Identity and contact data:</strong> name, email address, delivery address, phone number</li>
            <li><strong>Order data:</strong> products purchased, order value, payment status</li>
            <li><strong>Communications:</strong> messages you send us via email or the contact form</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information, pages visited (see our <Link href="/cookies">Cookie Policy</Link>)</li>
            <li><strong>Marketing preferences:</strong> whether you have opted in to our newsletter</li>
          </ul>
        </section>

        <section>
          <h2>3. How we use your data</h2>
          <p>We use your personal data for the following purposes and legal bases:</p>
          <ul>
            <li><strong>Fulfilling orders</strong> (contractual necessity): processing payment, preparing and dispatching your order, sending order confirmations and delivery updates</li>
            <li><strong>Customer service</strong> (contractual necessity / legitimate interest): responding to enquiries, handling returns and resolving complaints</li>
            <li><strong>Marketing</strong> (consent): sending our newsletter if you have opted in. You can unsubscribe at any time using the link in any email</li>
            <li><strong>Legal obligations</strong> (legal obligation): keeping financial records, responding to lawful requests from authorities</li>
            <li><strong>Site improvement</strong> (legitimate interest): understanding how visitors use our site to improve functionality and content</li>
          </ul>
        </section>

        <section>
          <h2>4. Who we share data with</h2>
          <p>We share personal data only where necessary:</p>
          <ul>
            <li><strong>Stripe:</strong> payment processing. Stripe acts as an independent controller. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s privacy policy</a></li>
            <li><strong>Meta:</strong> advertising measurement where you have accepted advertising cookies. Purchase details and identifiers are sent securely through the Meta Pixel and Conversions API to attribute sales and improve advertising</li>
            <li><strong>Delivery carriers:</strong> name and address to fulfil delivery</li>
            <li><strong>Vercel:</strong> website hosting</li>
            <li><strong>Zoho:</strong> email services</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2>5. Data retention</h2>
          <p>We keep order data for 6 years to meet tax and accounting obligations. Contact form messages are retained for 2 years. Newsletter subscriber data is kept until you unsubscribe. We delete or anonymise data when it is no longer needed.</p>
        </section>

        <section>
          <h2>6. Your rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Rectify inaccurate or incomplete data</li>
            <li>Erase your data (where there is no legal reason for us to keep it)</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time (where processing is based on consent)</li>
          </ul>
          <p>To exercise any of these rights, email <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>. We will respond within one month.</p>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>We use HTTPS encryption across our site, process payments through Stripe&apos;s PCI-compliant infrastructure and limit access to personal data to those who need it. While no system is completely secure, we take reasonable steps to protect your data.</p>
        </section>

        <section>
          <h2>8. Complaints</h2>
          <p>If you are unhappy with how we handle your data, please contact us first so we can try to resolve the issue. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>
        </section>

        <section>
          <h2>9. Changes to this notice</h2>
          <p>We may update this notice from time to time. The date at the top of this page shows when it was last revised.</p>
        </section>
      </div>
    </main>
  );
}
