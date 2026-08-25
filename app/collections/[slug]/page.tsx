import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { collections, getCollection, getCollectionProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  return {
    title: `${collection.name} devices`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const items = getCollectionProducts(collection.name);
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

  return (
    <main className="shop-page collection-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
    </main>
  );
}
