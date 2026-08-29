import { Headphones, Lock, RotateCcw, Truck } from "lucide-react";

const promises = [
  { icon: Truck, title: "Tracked UK delivery", copy: "Free over £40, dispatched within 48 hours" },
  { icon: RotateCcw, title: "30-day money-back guarantee", copy: "Not for you? Send it back within 30 days" },
  { icon: Lock, title: "Secure Stripe checkout", copy: "Card details never touch our servers" },
  { icon: Headphones, title: "UK-based support", copy: "Real replies within two working days" },
];

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why shop with Veylo">
      <div className="site-container trust-grid">
        {promises.map(({ icon: Icon, title, copy }) => (
          <div className="trust-item" key={title}>
            <Icon size={23} strokeWidth={1.35} aria-hidden="true" />
            <div><strong>{title}</strong><span>{copy}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
