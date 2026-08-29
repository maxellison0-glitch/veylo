"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/catalog";
import { ProductImage } from "./product-art";
import { useStore } from "./store-provider";

export function ProductCard({ product, index = 0, priority = false }: { product: Product; index?: number; priority?: boolean }) {
  const [finish, setFinish] = useState(product.finishes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useStore();

  function quickAdd() {
    addItem(product, { finish: finish.name });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="product-card" style={{ "--card-index": index } as React.CSSProperties}>
      <div className="product-card-visual">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <ProductImage slug={product.slug} name={product.name} finish={finish.hex} alt={`${product.name} in ${finish.name}`} priority={priority} sizes="(max-width: 540px) 50vw, (max-width: 800px) 50vw, 25vw" />
        </Link>
        <button className="quick-add" onClick={quickAdd} aria-label={`Quick add ${product.name}`}>
          <Plus size={17} strokeWidth={1.7} /> <span>{added ? "Added" : "Quick add"}</span>
        </button>
      </div>
      <div className="product-card-info">
        <div>
          <span className="product-tagline">{product.tagline}</span>
          <Link href={`/products/${product.slug}`} className="product-title-link">
            <h3>{product.name}</h3><ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="product-price">
          {product.previousPrice && <s>{formatPrice(product.previousPrice)}</s>}
          <strong>{formatPrice(product.price)}</strong>
        </div>
      </div>
      <div className="swatch-list" aria-label="Available finishes">
        {product.finishes.map((option) => (
          <button
            className={finish.name === option.name ? "is-selected" : ""}
            key={option.name}
            style={{ background: option.hex }}
            onClick={() => setFinish(option)}
            aria-label={`Show ${option.name}`}
            title={option.name}
          />
        ))}
        <span>{finish.name}</span>
      </div>
    </article>
  );
}
