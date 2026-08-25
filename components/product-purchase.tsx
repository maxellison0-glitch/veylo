"use client";

import { Check, Heart, Minus, Plus, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatPrice, type Product } from "@/lib/catalog";
import { trackViewContent } from "@/lib/tracking";
import { useCookieConsent } from "./cookie-consent";
import { ProductImage, getProductImageCount } from "./product-art";
import { useStore } from "./store-provider";

export function ProductPurchase({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [finish, setFinish] = useState(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);
  const [favourite, setFavourite] = useState(false);
  const trackedVariant = useRef<string | null>(null);
  const { consent } = useCookieConsent();
  const { addItem } = useStore();
  const imageCount = getProductImageCount(product.slug);

  useEffect(() => {
    if (consent !== "accepted" || trackedVariant.current === variant.label) return;
    trackedVariant.current = variant.label;
    trackViewContent({
      id: product.slug,
      name: product.name,
      price: variant.price,
      quantity: 1,
    });
  }, [consent, product.name, product.slug, variant.label, variant.price]);

  return (
    <div className="product-detail-grid">
      <div className="product-gallery">
        <div className={`product-main-view gallery-view-${view}`}>
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <ProductImage slug={product.slug} name={product.name} imageIndex={view} finish={finish.hex} alt={`${product.name} in ${finish.name}`} sizes="(max-width: 800px) 100vw, 55vw" priority={view === 0} />
          <span className="gallery-view-label">0{view + 1} / 0{imageCount}</span>
        </div>
        <div className="gallery-thumbnails">
          {Array.from({ length: imageCount }, (_, i) => i).map((item) => (
            <button className={view === item ? "is-selected" : ""} key={item} onClick={() => setView(item)} aria-label={`View product image ${item + 1}`}>
              <ProductImage slug={product.slug} name={product.name} imageIndex={item} finish={finish.hex} sizes="120px" />
            </button>
          ))}
        </div>
      </div>

      <div className="product-purchase-panel">
        <div className="product-flag">Veylo collection</div>
        <span className="product-tagline">{product.tagline}</span>
        <h1>{product.name}</h1>
        <p className="product-strapline">{product.strapline}</p>
        <div className="detail-price">{product.previousPrice && <s>{formatPrice(product.previousPrice)}</s>}<strong>{formatPrice(variant.price)}</strong><span>free UK delivery over £40</span></div>
        <p className="product-description">{product.description}</p>

        <fieldset className="variant-fieldset">
          <div className="variant-label"><legend>1. Choose your option</legend></div>
          <div className="size-options">
            {product.variants.map((option) => (
              <button className={variant.label === option.label ? "is-selected" : ""} key={option.label} onClick={() => setVariant(option)}>
                <span>{option.label}</span><small>{option.note}</small><strong>{formatPrice(option.price)}</strong>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="variant-fieldset">
          <div className="variant-label"><legend>2. Choose a finish</legend><span>{finish.name}</span></div>
          <div className="large-swatches">
            {product.finishes.map((option) => (
              <button className={finish.name === option.name ? "is-selected" : ""} key={option.name} onClick={() => setFinish(option)} aria-label={option.name} title={option.name}>
                <span style={{ background: option.hex }} />
              </button>
            ))}
          </div>
        </fieldset>

        <div className="purchase-actions">
          <div className="quantity-control large-quantity" aria-label="Quantity">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
          </div>
          <button className="button button-primary add-to-bag" onClick={() => addItem(product, { variant: variant.label, finish: finish.name, quantity })}>Add to bag · {formatPrice(variant.price * quantity)}</button>
          <button className={`favourite-button ${favourite ? "is-selected" : ""}`} onClick={() => setFavourite((value) => !value)} aria-label={favourite ? "Remove from favourites" : "Add to favourites"}><Heart size={20} fill={favourite ? "currentColor" : "none"} /></button>
        </div>

        <div className="purchase-promises">
          <span><Truck size={18} /> {product.leadTime}</span>
          <span><Check size={18} /> 30-day money-back guarantee</span>
        </div>

        <div className="detail-accordions">
          <details open><summary>The ritual</summary><p>{product.longDescription}</p></details>
          <details><summary>What&rsquo;s included</summary><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></details>
          <details><summary>How to use</summary><p>{product.howTo}</p></details>
          <details><summary>Specs</summary><p>{product.specs}</p></details>
          {product.technology?.length ? <details><summary>How the technology works</summary><ul>{product.technology.map((item) => <li key={item}>{item}</li>)}</ul></details> : null}
          {product.useCases?.length ? <details><summary>Designed for</summary><ul>{product.useCases.map((item) => <li key={item}>{item}</li>)}</ul></details> : null}
        </div>
      </div>
    </div>
  );
}
