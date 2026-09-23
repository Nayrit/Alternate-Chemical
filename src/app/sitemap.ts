import type { MetadataRoute } from "next";
import { products, siteRoutes, type Sector } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = siteRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date("2026-09-23"),
    changeFrequency: "monthly" as const,
    priority: route.path === "/" ? 1 : route.path === "/products" ? 0.9 : 0.8,
  }));
  const grades = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified: new Date("2026-09-23"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const sectorPages = (["food", "pharma", "textile", "feed"] as Sector[]).map((sector) => ({
    url: `${SITE_URL}/products?sector=${sector}`,
    lastModified: new Date("2026-09-23"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...grades, ...sectorPages];
}
