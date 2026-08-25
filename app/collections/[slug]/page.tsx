import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { collections, getCollection, getCollectionProducts } from "@/lib/catalog";
import { absoluteUrl, jsonLd } from "@/lib/seo";

const collectionSeo = {
  face: {
    title: "At-Home Facial Devices UK | LED, Microcurrent & Massage",
    description: "Shop Veylo facial devices for at-home routines, including LED light therapy, red light, cooling and massage tools. Tracked UK delivery.",
    copy: "Compare at-home facial devices by the job they do. LED tools provide a hands-free light routine, the Veylo Wand combines red light with microcurrent, warmth and massage, while cooling and gua sha tools offer a simpler manual ritual. Each product page gives the treatment time, mechanism, instructions and contraindications before you buy.",
    faqs: [
      ["Which facial device should I start with?", "Start with the concern and the routine you can repeat. Choose an LED mask for hands-free full-face light, a focused wand for a short guided ritual, or a manual cooling or massage tool when you do not want a powered device."],
      ["How often should I use an at-home facial device?", "Frequency depends on the technology and model. Follow the schedule on the product page and the supplied instructions rather than combining several intensive treatments at once."],
    ],
  },
  body: {
    title: "At-Home Body Devices UK | Red Light Therapy & IPL",
    description: "Explore Veylo body devices, including wearable 660nm and 850nm red light therapy belts and ice-cooled IPL for eligible hair and skin tones.",
    copy: "Veylo body devices cover two distinct routines. Wearable red and near-infrared light belts are designed for targeted twenty-minute sessions around the back, knee, shoulder or hip. IPL is a gradual hair-reduction routine for eligible skin tones, hair colours and treatment areas. Compare the intended use, session schedule, power setup and suitability guidance before choosing.",
    faqs: [
      ["What do 660nm and 850nm mean on a red light therapy belt?", "They are wavelength measurements. The Relief Belt combines visible 660nm red light with 850nm near-infrared light in one flexible wrap. Wavelength is only one specification; session guidance, fit and consistent use also matter."],
      ["Is at-home IPL suitable for everyone?", "No. IPL suitability depends on skin tone, hair colour, medication and the treatment area. Patch test first and do not use over tattoos, dark marks, broken skin or any area excluded by the supplied guide."],
    ],
  },
  "scalp-hair": {
    title: "Electric Scalp Massagers UK | Rechargeable Scalp Care",
    description: "Shop rechargeable electric scalp massagers for a repeatable dry-scalp, neck or shoulder massage ritual, with tracked UK delivery.",
    copy: "A scalp massager is a mechanical massage tool, not a hair-growth treatment. Veylo focuses on comfortable, repeatable use: flexible silicone contact points, a rechargeable cordless body and simple controls for a short dry-scalp or wash-day ritual. Product claims stay within what the device is designed to do.",
    faqs: [
      ["Can an electric scalp massager regrow hair?", "Veylo does not claim that mechanical scalp massage regrows hair. The device is sold for a comfortable scalp, neck or shoulder massage routine."],
      ["Can I use the massager on wet hair?", "Use only as described for the exact model. The current ScalpRevive Four-Head Massager should not be submerged; switch it off before wiping the heads with a damp cloth and let them dry fully."],
    ],
  },
  bundles: {
    title: "At-Home Beauty Device Sets & Red Light Therapy Bundles",
    description: "Shop Veylo beauty device bundles for face and body rituals, including red light therapy sets, with a saving versus buying separately.",
    copy: "Veylo bundles pair devices that have separate, clear roles rather than stacking several treatments into the same session. Compare what is included, the saving against individual prices, delivery setup and how each tool fits into a morning or evening routine.",
    faqs: [
      ["Do Veylo bundles cost less than buying separately?", "Where a saving applies, the exact amount is shown on the product page and is calculated against the current individual product prices."],
      ["Do I need to use every device in a bundle together?", "No. Each tool can be used independently. Follow the individual product instructions and avoid combining intensive technologies more often than their guides recommend."],
    ],
  },
} as const;

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  const seo = collectionSeo[collection.slug as keyof typeof collectionSeo];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absoluteUrl(`/collections/${collection.slug}`) },
    openGraph: {
      url: absoluteUrl(`/collections/${collection.slug}`),
      title: `${seo.title} | Veylo`,
      description: seo.description,
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const items = getCollectionProducts(collection.name);
  const seo = collectionSeo[collection.slug as keyof typeof collectionSeo];
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${collection.name} by Veylo`,
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `https://www.veyloskin.com/products/${product.slug}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veyloskin.com" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://www.veyloskin.com/shop" },
      { "@type": "ListItem", position: 3, name: collection.name, item: absoluteUrl(`/collections/${collection.slug}`) },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="shop-page collection-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <div className="site-container page-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/shop">Shop</Link><ChevronRight size={13} /><span>{collection.name}</span></div>
      <header className="site-container shop-hero collection-hero">
        <span className="eyebrow">{collection.eyebrow}</span>
        <h1>{collection.name === "Scalp & Hair" ? <>Scalp <em>&amp; hair.</em></> : <>{collection.name} <em>rituals.</em></>}</h1>
        <p>{collection.description}</p>
        <span className="collection-count">{items.length} {items.length === 1 ? "product" : "products"} · tracked UK delivery</span>
      </header>
      <section className="site-container collection-products" aria-label={`${collection.name} products`}>
        <div className="product-grid">{items.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
      </section>
      <section className="faq-section product-faq">
        <div className="site-container faq-layout">
          <div><span className="eyebrow">Choosing clearly</span><h2>About {collection.name.toLowerCase()} <em>devices.</em></h2><p>{seo.copy}</p></div>
          <div className="faq-list">
            {seo.faqs.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  );
}
