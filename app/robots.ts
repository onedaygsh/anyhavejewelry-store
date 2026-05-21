import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/checkout/", "/_next/"],
    },
    sitemap: "https://anyhavejewelry.com/sitemap.xml",
  };
}
