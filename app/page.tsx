import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { collections, products } from "@/lib/catalog";
import { Newsletter } from "@/components/newsletter";
import { ProductImage } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { TrustBar } from "@/components/trust-bar";

export const metadata: Metadata = {
  title: "Beneath the surface",
  description: "Professional skin and body treatment technology, made clearer for use at home. Explore Veylo devices for face, body and scalp rituals.",
};

const concerns = [
  { name: "Fine lines & brightness", note: "LED, warmth and focused facial tools", href: "/shop?concern=Fine%20lines" },
  { name: "Puffiness & tension", note: "Cooling and massage-led rituals", href: "/shop?concern=Puffiness" },
  { name: "Body recovery", note: "Wearable red and near-infrared light", href: "/collections/body" },
  { name: "Scalp care", note: "A more intentional wash-day routine", href: "/collections/scalp-hair" },
];

export default function HomePage() {
  const featuredSlugs = ["eye-rest-massager", "ipl-hair-removal", "scalprevive-massager", "veylo-wand", "lumen-mask", "relief-belt"];
  const featuredProducts = products.filter((product) => featuredSlugs.includes(product.slug));
  const bundleProducts = products.filter((product) => product.ptype === "Set");
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veylo",
    url: "https://www.veyloskin.com",
    logo: "https://www.veyloskin.com/og.png",
    slogan: "Beneath the surface",
    description: "At-home skin and body technology with plain-English guidance.",
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
            <span className="eyebrow">Beneath the surface</span>
            <h1>Professional skin treatment. <em>At home.</em></h1>
            <p>Focused technology for face, body and scalp — chosen for clear purpose, realistic routines and honest guidance.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/shop">Shop the collection <ArrowRight size={17} /></Link>
              <Link className="text-link" href="/technology">Understand the technology</Link>
            </div>
            <a className="scroll-cue" href="#collections"><ArrowDown size={18} /> Explore the range</a>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-number" aria-hidden="true">01</div>
            <ProductImage slug="lumen-mask" name="LuminaPro LED Face Mask" finish="#f0eae2" alt="LuminaPro LED Face Mask" sizes="(max-width: 800px) 100vw, 55vw" priority />
            <div className="hero-caption"><span>Face · Body · Scalp</span><span>Technology with a reason</span></div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>LED · MICROCURRENT · RECOVERY · COOLING · MASSAGE · IPL · ULTRASONIC · LED · MICROCURRENT · RECOVERY · COOLING · MASSAGE · </span></div>
      </section>

      <TrustBar />

      <section className="section home-collections" id="collections">
        <div className="site-container">
          <div className="section-heading">
            <div><span className="eyebrow">Featured collections</span><h2>One purpose.<br /><em>One clear place.</em></h2></div>
            <div className="section-heading-aside"><p>Build around the area you want to treat, then compare only the technologies that belong there.</p><Link className="text-link" href="/shop">See everything <ArrowRight size={15} /></Link></div>
          </div>
          <div className="collection-grid">
            {collections.map((collection, index) => (
              <Link href={`/collections/${collection.slug}`} className="collection-card" key={collection.slug}>
                <span>0{index + 1}</span><h3>{collection.name}</h3><p>{collection.description}</p><ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="concerns">
        <div className="site-container process-layout">
          <div className="process-intro">
            <span className="eyebrow eyebrow-light">Shop by concern</span>
            <h2>Start with what you want to <em>change.</em></h2>
            <p>A useful catalogue begins with the customer&rsquo;s concern, not a long list of technologies. These routes keep the choice focused.</p>
          </div>
          <div className="concern-links">
            {concerns.map((concern, index) => <Link href={concern.href} key={concern.name}><span>0{index + 1}</span><div><h3>{concern.name}</h3><p>{concern.note}</p></div><ArrowRight size={17} /></Link>)}
          </div>
        </div>
      </section>

      <section className="section section-featured" id="featured">
        <div className="site-container">
          <div className="section-heading">
            <div><span className="eyebrow">The core range</span><h2>Begin beneath<br /><em>the surface.</em></h2></div>
            <div className="section-heading-aside"><p>From the £129.99 LuminaPro anchor to low-friction entry devices, every tier is ready to order.</p><Link className="text-link" href="/shop">Shop all products <ArrowRight size={15} /></Link></div>
          </div>
          <div className="product-grid">{featuredProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
          <div className="combo-section">
            <div className="combo-heading"><span className="eyebrow">Build the ritual</span><h2>Bundles</h2></div>
            <p className="preview-intro">Complementary products grouped into a clearer routine, with the saving shown before checkout.</p>
            <div className="product-grid">{bundleProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
          </div>
        </div>
      </section>

      <section className="studio-story">
        <div className="studio-image-panel">
          <div className="studio-grid-lines" aria-hidden="true" />
          <ProductImage slug="veylo-wand" name="The Veylo Wand" finish="#f0eae2" alt="The Veylo Wand in Pearl" className="studio-image-fill" sizes="(max-width: 800px) 100vw, 55vw" />
          <span className="studio-note">Purpose before promises</span>
        </div>
        <div className="studio-copy-panel">
          <span className="eyebrow">The Veylo standard</span>
          <h2>Technology,<br />without the <em>theatre.</em></h2>
          <p>We explain the mechanism, the routine and the limits, so customers know exactly where each device belongs before it reaches their bathroom shelf.</p>
          <ul>
            <li><Check size={16} /> Plain-English instructions and warnings</li>
            <li><Check size={16} /> Supplier, sample and documentation review</li>
            <li><Check size={16} /> No invented reviews or before-and-after results</li>
          </ul>
          <Link className="button button-outline" href="/technology">How we assess technology</Link>
        </div>
      </section>

      <section className="newsletter-section" id="newsletter">
        <div className="site-container newsletter-layout">
          <div><span className="eyebrow">Skin notes</span><h2>Launches, rituals<br />and <em>evidence.</em></h2></div>
          <div><p>One useful email a month: simple routines, product notes and early access to new drops and bundle offers.</p><Newsletter /><small>By subscribing, you agree to our privacy policy. Unsubscribe any time.</small></div>
        </div>
      </section>
    </main>
  );
}
