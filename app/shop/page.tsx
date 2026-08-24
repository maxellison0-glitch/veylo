import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ShopCatalog } from "@/components/shop-catalog";

export const metadata: Metadata = {
  title: "Shop at-home beauty tech",
  description: "The full Veylo range: red light devices, an LED mask and facial tools, with tracked UK delivery and a 30-day money-back guarantee.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = await searchParams;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veyloskin.com" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://www.veyloskin.com/shop" },
    ],
  };

  return (
    <main className="shop-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="site-container page-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span>Shop</span></div>
      <header className="site-container shop-hero">
        <span className="eyebrow">The range</span>
        <h1>Simple tools, <em>short rituals.</em></h1>
        <p>Five products, chosen and tested against one bar: a visible-glow ritual in under ten minutes a day.</p>
      </header>
      <div className="site-container"><ShopCatalog initialQuery={query.q} /></div>
    </main>
  );
}
