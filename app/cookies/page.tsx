import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Veylo uses cookies and similar technologies on veyloskin.com.",
};

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <div className="site-container legal-container">
        <span className="eyebrow">Policy</span>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Last updated: August 2026</p>

        <section>
          <h2>1. What are cookies?</h2>
          <p>Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences and understand how you use it.</p>
        </section>

        <section>
          <h2>2. Cookies we use</h2>

          <h3>Strictly necessary cookies</h3>
          <p>These are essential for the site to function. They enable core features such as the shopping cart and checkout. No consent is needed for these cookies.</p>
          <ul>
            <li><strong>Cart data</strong> (localStorage): remembers items in your basket between visits</li>
            <li><strong>Stripe</strong>: required for secure payment processing during checkout</li>
          </ul>

          <h3>Analytics and advertising cookies</h3>
          <p>These cookies are only set if you accept non-essential cookies via the banner shown on your first visit. They help us understand how visitors use the site and measure the effectiveness of our advertising. You can change your preference at any time by clearing your browser cookies and revisiting the site.</p>
          <ul>
            <li><strong>Meta Pixel (Facebook/Instagram)</strong>: tracks page views, add-to-cart and purchase events to measure ad performance and build audiences. Set by facebook.net. See <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta&apos;s privacy policy</a></li>
            <li><strong>TikTok Pixel</strong>: tracks page views and conversion events for TikTok advertising. Set by analytics.tiktok.com. See <a href="https://www.tiktok.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">TikTok&apos;s privacy policy</a></li>
            <li><strong>Google Analytics / Google Ads</strong>: tracks site usage and conversion events for Google advertising. Set by googletagmanager.com. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s privacy policy</a></li>
          </ul>
        </section>

        <section>
          <h2>3. Third-party cookies</h2>
          <p>During checkout, Stripe may set cookies necessary for payment processing and fraud prevention. These are governed by <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s privacy policy</a>.</p>
        </section>

        <section>
          <h2>4. Managing cookies</h2>
          <p>You can control and delete cookies through your browser settings. Blocking strictly necessary cookies may prevent parts of the site from working correctly. For instructions on managing cookies, visit your browser&apos;s help pages:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>
        </section>

        <section>
          <h2>5. Changes to this policy</h2>
          <p>We will update this page if our use of cookies changes, particularly if we introduce analytics or marketing trackers. When that happens, we will add a cookie consent banner before setting any non-essential cookies.</p>
        </section>

        <section>
          <h2>6. More information</h2>
          <p>For details on how we handle personal data, see our <Link href="/privacy">Privacy Notice</Link>. For any questions, email <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>.</p>
        </section>
      </div>
    </main>
  );
}
