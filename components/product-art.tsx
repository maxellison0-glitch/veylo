"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  slug: string;
  name: string;
  /** Hex of the finish used to tint the placeholder tile. */
  finish?: string;
  className?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Hero shots generated 23 Aug 2026 (Higgsfield marketing_studio_image, 4:5).
 * Served from the generation CDN for now; replace with self-hosted
 * /products/{slug}.jpg files once downloaded from the Higgsfield library.
 * glow-ritual has no shot yet (daily generation cap) — placeholder shows.
 */
const remoteImages: Record<string, string> = {
  "veylo-wand":
    "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_1485ed57-f4b8-4a93-a36e-91e2960359d3.png",
  "lumen-mask":
    "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_a02b71d8-5e87-4474-89d9-edc7872668f7.png",
  "cool-roller":
    "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_96a00a93-6b86-4953-8017-ebca810f5c8a.png",
  "sculpt-set":
    "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_ca4479d6-71b1-4f82-9562-c92e6186d9a3.png",
};

/**
 * Renders the product's hero image (remote CDN first, then
 * /products/{slug}.jpg from public/). If neither exists, a soft gradient
 * tile in the product's finish colour with a serif initial is shown instead.
 */
export function ProductImage({
  slug,
  name,
  finish = "#f3e4de",
  className = "",
  alt,
  sizes = "(max-width: 800px) 100vw, 33vw",
  priority = false,
}: ProductImageProps) {
  const [missing, setMissing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const initial = name.replace(/^The\s+/i, "").charAt(0).toUpperCase() || "V";

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
          src={remoteImages[slug] ?? `/products/${slug}.jpg`}
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
