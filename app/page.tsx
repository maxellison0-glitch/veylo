import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { products } from "@/lib/catalog";
import { Newsletter } from "@/components/newsletter";
import { ProductImage } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { TrustBar } from "@/components/trust-bar";

export const metadata: Metadata = {
  description:
    "Design-led at-home beauty tech from the UK. The Veylo Wand pairs 660nm red light with microcurrent, warmth and massage in one five-minute ritual.",
};

export default function HomePage() {
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veylo",
    url: "https://www.veyloskin.com",
    logo: "https://www.veyloskin.com/og.png",
    description: "Design-led at-home beauty tech, chosen and tested in the UK.",
    areaServed: "GB",
    contactPoint: { "@type": "ContactPoint", email: "hello@veyloskin.com", contactType: "customer service" },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Veylo",
    url: "https://www.veyloskin.com",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <section className="hero-section">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span>The Veylo Wand</span> · New</span>
            <h1>Five minutes to brighter-looking <em>skin.</em></h1>
            <p>The Veylo Wand pairs 660nm red light with microcurrent, warmth and massage — a salon ritual, at home.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/products/veylo-wand">Shop The Veylo Wand <ArrowRight size={17} /></Link>
              <Link className="text-link" href="/about">Read our story</Link>
            </div>
            <a className="scroll-cue" href="#ritual"><ArrowDown size={18} /> The ritual</a>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-number" aria-hidden="true">01</div>
            <ProductImage slug="veylo-wand" name="The Veylo Wand" finish="#f0eae2" alt="The Veylo Wand in Pearl" sizes="(max-width: 800px) 100vw, 55vw" priority />
            <div className="hero-caption">
              <span>The Veylo Wand</span>
              <span>Pearl · £49.99</span>
            </div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>RED LIGHT · MICROCURRENT · WARMTH · MASSAGE · RED LIGHT · MICROCURRENT · WARMTH · MASSAGE · RED LIGHT · MICROCURRENT · WARMTH · MASSAGE · </span></div>
      </section>

      <TrustBar />

      <section className="section process-section" id="ritual">
        <div className="site-container process-layout">
          <div className="process-intro">
            <span className="eyebrow eyebrow-light">The ritual</span>
            <h2>Five minutes.<br /><em>Every evening.</em></h2>
            <p>No settings to learn and no drawer of half-used steps. One device, one slow pass, then your usual serum.</p>
          </div>
          <ol className="process-steps">
            <li><span>01</span><div><h3>Cleanse</h3><p>Start with clean, dry skin. Remove make-up and pat dry.</p></div></li>
            <li><span>02</span><div><h3>Glide for five minutes</h3><p>Move the wand slowly upwards and outwards across cheeks, brow and jaw.</p></div></li>
            <li><span>03</span><div><h3>Follow with serum</h3><p>Finish with your usual serum or moisturiser and let it settle.</p></div></li>
          </ol>
        </div>
        <div className="process-ticker" aria-hidden="true"><span>CLEANSE → GLIDE → SERUM → REST → REPEAT TOMORROW → CLEANSE → GLIDE → SERUM → REST → </span></div>
      </section>

      <section className="section section-featured" id="featured">
        <div className="site-container">
          <div className="section-heading">
            <div><span className="eyebrow">The range</span><h2>Tools for a<br /><em>calmer ritual.</em></h2></div>
            <div className="section-heading-aside"><p>Five products, each chosen against the same bar: a visible-glow ritual in under ten minutes.</p><Link className="text-link" href="/shop">Shop all products <ArrowRight size={15} /></Link></div>
          </div>
          <div className="product-grid">
            {products.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}
          </div>
        </div>
      </section>

      <section className="studio-story">
        <div className="studio-image-panel">
          <div className="studio-grid-lines" aria-hidden="true" />
          <ProductImage slug="lumen-mask" name="The Lumen Mask" finish="#f0eae2" alt="The Lumen Mask in Pearl" className="studio-image-fill" sizes="(max-width: 800px) 100vw, 55vw" />
          <span className="studio-note">Chosen and tested in the UK</span>
        </div>
        <div className="studio-copy-panel">
          <span className="eyebrow">About Veylo</span>
          <h2>Beauty tech,<br />without the <em>noise.</em></h2>
          <p>We started Veylo because good skin tools were either salon-priced or covered in flashing lights and empty promises. We choose a small number of devices, test them ourselves and describe them honestly.</p>
          <ul>
            <li><Check size={16} /> Rituals under ten minutes</li>
            <li><Check size={16} /> Plain-English guides with every device</li>
            <li><Check size={16} /> 30-day money-back guarantee</li>
          </ul>
          <Link className="button button-outline" href="/about">Read our story</Link>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="site-container newsletter-layout">
          <div><span className="eyebrow">Skin notes</span><h2>One short email<br />a <em>month.</em></h2></div>
          <div><p>Skin notes — one short email a month. Ritual ideas, honest product notes and early access to new devices.</p><Newsletter /><small>By subscribing, you agree to our privacy policy. Unsubscribe any time.</small></div>
        </div>
      </section>
    </main>
  );
}
