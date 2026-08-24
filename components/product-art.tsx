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
 * Hero shots generated 23 Aug; lifestyle shots generated 24 Aug 2026.
 * All via Higgsfield marketing_studio_image, 4:5.
 */
const productImages: Record<string, string[]> = {
  "veylo-wand": [
    `${CDN}/hf_20260823_175045_1485ed57-f4b8-4a93-a36e-91e2960359d3.png`,
    `${CDN}/hf_20260824_154102_ebd94bc6-6b82-45bb-9721-6b60bc509bab.png`,
    `${CDN}/hf_20260824_154714_227de572-fabd-4bd7-b878-bb6b2239a4aa.png`,
  ],
  "lumen-mask": [
    `${CDN}/hf_20260823_175045_a02b71d8-5e87-4474-89d9-edc7872668f7.png`,
    `${CDN}/hf_20260824_154102_3bcc9d71-00b4-4e37-95ed-88ef16ddff81.png`,
    `${CDN}/hf_20260824_154102_4e4df14d-acc6-4ba8-b555-70cb9374c5c8.png`,
  ],
  "cool-roller": [
    `${CDN}/hf_20260823_175045_96a00a93-6b86-4953-8017-ebca810f5c8a.png`,
    `${CDN}/hf_20260824_154102_f34236c0-79c2-445d-b698-02e735b0f9b0.png`,
    `${CDN}/hf_20260824_154102_ae12bf18-d000-4c94-8372-67437f9904de.png`,
  ],
  "sculpt-set": [
    `${CDN}/hf_20260823_175045_ca4479d6-71b1-4f82-9562-c92e6186d9a3.png`,
    `${CDN}/hf_20260824_154102_4ace0697-1965-4757-a0f8-65093320083e.png`,
    `${CDN}/hf_20260824_154102_116fd246-e4e7-4bfe-896d-2c89e010548e.png`,
  ],
  "glow-ritual": [
    "/products/glow-ritual.png",
    `${CDN}/hf_20260824_154102_9914c080-134e-4573-b656-f61ac41cbff1.png`,
    `${CDN}/hf_20260824_154102_3e69531d-e24c-4d5c-9435-ae7607622b7f.png`,
  ],
  "relief-belt": [
    `${CDN}/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png`,
    `${CDN}/hf_20260824_154102_b9dd8c95-1c8b-466f-af48-98765afac496.png`,
    `${CDN}/hf_20260824_154102_84c0e78a-cffc-45fe-a008-c945f84ea991.png`,
  ],
  "relief-ritual": [
    `${CDN}/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png`,
    `${CDN}/hf_20260824_154714_7ea1dcfc-5d7a-4188-9547-231e97eb2791.png`,
    `${CDN}/hf_20260824_154714_5bc138b4-5d8a-4fe9-a3ce-e01f200f4a0b.png`,
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
