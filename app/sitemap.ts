import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://veyloskin.co.uk";
  const staticRoutes = ["", "/shop", "/about", "/contact", "/terms", "/privacy", "/delivery", "/returns", "/cookies"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-08-23"),
    changeFrequency: path === "" || path === "/shop" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.7,
  }));
  const productRoutes = products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, lastModified: new Date("2026-08-23"), changeFrequency: "weekly" as const, priority: 0.8 }));
  const articleRoutes = journalPosts.map((post) => ({ url: `${baseUrl}/journal/${post.slug}`, lastModified: new Date("2026-08-23"), changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
