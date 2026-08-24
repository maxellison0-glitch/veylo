"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  slug: string;
  name: string;
  /** Which image to show: 0 = hero, 1 = lifestyle, 2 = lifestyle. */
  imageIndex?: number;
  /** Hex of the finish used to tint the placeholder tile. */
  finish?: string;
  className?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
};

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9";

/**
 * Product images: [hero, lifestyle 1, lifestyle 2].
 * Hero shots generated 23 Aug; lifestyle shots re-generated 24 Aug 2026
 * with hero-image references for product consistency.
 * All via Higgsfield marketing_studio_image, 4:5.
 */
const productImages: Record<string, string[]> = {
  "veylo-wand": [
    `${CDN}/hf_20260823_175045_1485ed57-f4b8-4a93-a36e-91e2960359d3.png`,
    `${CDN}/hf_20260824_184915_8add347d-ec7c-4d7e-bef0-12d46b6e969d.png`,
    `${CDN}/hf_20260824_184915_efa8ab87-a0be-4312-89bb-46ac8a09f393.png`,
  ],
  "lumen-mask": [
    `${CDN}/hf_20260823_175045_a02b71d8-5e87-4474-89d9-edc7872668f7.png`,
    `${CDN}/hf_20260824_184915_9f425f23-4dd4-4e80-b93c-d805a03e93b2.png`,
    `${CDN}/hf_20260824_184916_0c63ed19-757d-4a64-9c48-ac755c3a901c.png`,
  ],
  "cool-roller": [
    `${CDN}/hf_20260823_175045_96a00a93-6b86-4953-8017-ebca810f5c8a.png`,
    `${CDN}/hf_20260824_184915_3f87370f-7ecc-4c3e-a57f-7e997192c460.png`,
    `${CDN}/hf_20260824_184915_d4a90388-e961-4daf-9825-e42b763f8c9c.png`,
  ],
  "sculpt-set": [
    `${CDN}/hf_20260823_175045_ca4479d6-71b1-4f82-9562-c92e6186d9a3.png`,
    `${CDN}/hf_20260824_184915_920901a2-15db-411a-b8d6-34619ba9d3e5.png`,
    `${CDN}/hf_20260824_184915_f7758454-47b8-4b03-ad22-d486c0bb011e.png`,
  ],
  "glow-ritual": [
    `${CDN}/hf_20260823_175045_1485ed57-f4b8-4a93-a36e-91e2960359d3.png`,
    `${CDN}/hf_20260824_184915_8add347d-ec7c-4d7e-bef0-12d46b6e969d.png`,
    `${CDN}/hf_20260824_184915_3f87370f-7ecc-4c3e-a57f-7e997192c460.png`,
  ],
  "relief-belt": [
    `${CDN}/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png`,
    `${CDN}/hf_20260824_185029_88bfbe77-6578-4dd2-a331-0987c17f9759.png`,
    `${CDN}/hf_20260824_185029_42b49c06-05f6-48f5-89a7-494fadcc52e7.png`,
  ],
  "relief-ritual": [
    `${CDN}/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png`,
    `${CDN}/hf_20260824_184915_efa8ab87-a0be-4312-89bb-46ac8a09f393.png`,
    `${CDN}/hf_20260824_185029_88bfbe77-6578-4dd2-a331-0987c17f9759.png`,
  ],
};

/** Get a specific image URL for a product. */
export function getProductImage(slug: string, index: number): string {
  const images = productImages[slug];
  if (!images) return `/products/${slug}.jpg`;
  return images[Math.min(index, images.length - 1)] ?? images[0];
}

/** How many images a product has. */
export function getProductImageCount(slug: string): number {
  return productImages[slug]?.length ?? 1;
}

/**
 * Renders a product image. Supports imageIndex for gallery views.
 * Falls back to /products/{slug}.jpg, then a placeholder tile.
 */
export function ProductImage({
  slug,
  name,
  imageIndex = 0,
  finish = "#f3e4de",
  className = "",
  alt,
  sizes = "(max-width: 800px) 100vw, 33vw",
  priority = false,
}: ProductImageProps) {
  const [missing, setMissing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const initial = name.replace(/^The\s+/i, "").charAt(0).toUpperCase() || "V";
  const src = getProductImage(slug, imageIndex);

  return (
    <div
      className={`product-art ${className}`}
      style={{ "--tile": finish } as React.CSSProperties}
    >
      <span className="product-placeholder" aria-hidden={!missing}>
        <span>{initial}</span>
      </span>
      {!missing && (
        <Image
          src={src}
          alt={alt ?? name}
          fill
          sizes={sizes}
          priority={priority}
          className="product-photo"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          onError={() => setMissing(true)}
        />
      )}
      {missing && <span className="sr-only">{alt ?? name}</span>}
    </div>
  );
}
