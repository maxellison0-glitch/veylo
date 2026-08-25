import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { formatPrice, getProduct, getProductCollections, products } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: `${product.description} ${formatPrice(product.price)} with tracked UK delivery.`,
    openGraph: {
      title: `${product.name} | Veylo`,
      description: product.description,
      ...(product.image ? { images: [{ url: product.image, width: 1024, height: 1280, alt: product.name }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const productCollections = getProductCollections(product);
  const related = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const aShared = getProductCollections(a).some((collection) => productCollections.includes(collection));
      const bShared = getProductCollections(b).some((collection) => productCollections.includes(collection));
      return Number(bShared) - Number(aShared);
    })
    .slice(0, 3);
  const faqs = product.faqs ?? [
    {
      question: "Is this product available to order now?",
      answer: "Yes. This product is currently open for UK orders and its delivery estimate is shown beside the purchase controls.",
    },
    {
      question: "Is this device suitable for everyone?",
      answer: "No device is suitable for every person or condition. Read the final instructions and contraindications before use, avoid broken or irritated skin, and ask a qualified healthcare professional if you are pregnant, have an implanted electronic device, take photosensitising medication or are unsure whether the technology is appropriate for you.",
    },
    {
      question: "What if it is not right for me?",
      answer: "Veylo's 30-day returns terms apply. Please read the returns page before opening any hygiene-sealed components.",
    },
  ];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image ? { image: product.image } : {}),
    brand: { "@type": "Brand", name: "Veylo" },
    category: "At-home beauty devices",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `https://www.veyloskin.com/products/${product.slug}`,
      seller: { "@type": "Organization", name: "Veylo" },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veyloskin.com" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://www.veyloskin.com/shop" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.veyloskin.com/products/${product.slug}` },
    ],
  };

  return (
    <main className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="site-container page-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/shop">Shop</Link><ChevronRight size={13} /><span>{product.name}</span></div>
      <div className="site-container"><ProductPurchase product={product} /></div>
      <section className="product-value-section">
        <div className="site-container value-grid">
          <div><span>01</span><h2>Purpose, not noise</h2><p>Every product page explains what the tool is for, how the technology works and where its limits begin.</p></div>
          <div><span>02</span><h2>Honest by design</h2><p>We describe the mechanism, routine and limits in plain English, without miracle language or invented results.</p></div>
          <div><span>03</span><h2>Backed for 30 days</h2><p>Use it at home. If it is not for you, our 30-day money-back guarantee applies.</p></div>
        </div>
      </section>
      <section className="faq-section product-faq">
        <div className="site-container faq-layout">
          <div><span className="eyebrow">Before you begin</span><h2>Product <em>questions.</em></h2><p>Clear instructions matter as much as the device. These answers cover availability, suitability and returns.</p></div>
          <div className="faq-list">
            {faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
      <section className="section related-products">
        <div className="site-container">
          <div className="section-heading compact-heading"><div><span className="eyebrow">Keep exploring</span><h2>Complete the <em>ritual.</em></h2></div><Link className="text-link" href="/shop">Shop all</Link></div>
          <div className="product-grid three-column-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}</div>
        </div>
      </section>
    </main>
  );
}
