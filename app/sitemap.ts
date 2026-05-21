import { MetadataRoute } from "next";
import { products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://anyhavejewelry.com";

  const staticRoutes = [
    "",
    "about",
    "contact",
    "blog",
    "products",
    "customize",
    "design-your-own",
    "collections",
    "catalog",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
    alternates: {
      languages: {
        "en-US": `${baseUrl}/${route}`,
        "zh-CN": `${baseUrl}/${route}?lang=zh`,
        "ar-SA": `${baseUrl}/${route}?lang=ar`,
      },
    },
  }));

  const collectionEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/collections/engagement/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/collections/moissanite/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/collections/lab-grown/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  ];

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
