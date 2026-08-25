import type { Product } from "@/lib/catalog";

export const SITE_URL = "https://www.veyloskin.com";
export const SITE_NAME = "Veylo";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

const productSearchTitles: Record<string, string> = {
  "veylo-wand": "4-in-1 Red Light Therapy Facial Wand",
  "lumen-mask": "LED Face Mask UK | 7-Colour Light Therapy",
  "cool-roller": "Stainless Steel Ice Roller for Face",
  "sculpt-set": "Jade Gua Sha and Facial Roller Set",
  "glow-ritual": "Red Light Facial Wand and Ice Roller Set",
  "relief-belt": "Red Light Therapy Belt UK | 660nm + 850nm",
  "relief-ritual": "Face and Body Red Light Therapy Set",
  "relief-duo": "Red Light Therapy Belt Twin Pack",
  "ipl-hair-removal": "Ice-Cooled IPL Hair Removal Device UK",
  "scalprevive-massager": "Rechargeable Electric Scalp Massager",
  "eye-rest-massager": "Heated Eye Massager with Air Compression",
};

export function productSeoTitle(product: Product) {
  return productSearchTitles[product.slug] ?? `${product.name} | At-Home Beauty Device`;
}

export function productSeoDescription(product: Product) {
  const delivery = product.price >= 40 ? "Free tracked UK delivery" : "Tracked UK delivery";
  const firstSentence = product.description.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() ?? product.description;
  const suffix = ` ${delivery}. 30-day returns.`;
  if (`${firstSentence}${suffix}`.length <= 160) return `${firstSentence}${suffix}`;

  const available = 159 - suffix.length;
  const shortened = firstSentence.slice(0, available).replace(/\s+\S*$/, "").replace(/[.,;:]$/, "");
  return `${shortened}…${suffix}`;
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
