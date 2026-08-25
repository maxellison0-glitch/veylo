import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.veyloskin.com";
  const staticRoutes = ["", "/shop", "/technology", "/about", "/contact", "/delivery", "/returns"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: path === "" || path === "/shop" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.7,
  }));
  const productRoutes = products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, lastModified: new Date("2026-08-25"), changeFrequency: "weekly" as const, priority: 0.8 }));
  const collectionRoutes = collections.map((collection) => ({ url: `${baseUrl}/collections/${collection.slug}`, lastModified: new Date("2026-08-25"), changeFrequency: "weekly" as const, priority: 0.85 }));
  const articleRoutes = journalPosts.map((post) => ({ url: `${baseUrl}/journal/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.65 }));
  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...articleRoutes];
}
