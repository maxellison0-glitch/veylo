import Link from "next/link";
import { Logo } from "./logo";
import { Newsletter } from "./newsletter";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-lead">
        <div>
          <span className="eyebrow eyebrow-light">Skin notes</span>
          <h2>One short email a month.</h2>
        </div>
        <div>
          <p>Ritual ideas, honest product notes and early access to new devices. Nothing more often than monthly.</p>
          <Newsletter compact />
        </div>
      </div>
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Logo inverse />
          <p>Professional-grade skin and body treatment devices, made clearer for considered use at home.</p>
        </div>
        <div className="footer-links">
          <div><h3>Shop</h3><Link href="/shop">All products</Link><Link href="/collections/face">Face</Link><Link href="/collections/body">Body</Link><Link href="/collections/scalp-hair">Scalp &amp; Hair</Link><Link href="/collections/bundles">Bundles</Link></div>
          <div><h3>Veylo</h3><Link href="/technology">Our technology</Link><Link href="/about">Our story</Link><Link href="/contact">Contact</Link><a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a></div>
          <div><h3>Help</h3><Link href="/delivery">Delivery</Link><Link href="/returns">Returns &amp; refunds</Link><Link href="/contact#faq">FAQs</Link></div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} Veylo. hello@veyloskin.com</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">VEYLO</div>
    </footer>
  );
}
