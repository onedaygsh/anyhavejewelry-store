import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/data";
import ProductStoryClient from "./ProductStoryClient";
import { BlogPostingJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const title = `The Complete Guide to ${product.name} | Anyhave Jewelry Blog`;
  return {
    title,
    description: product.description,
    keywords: [
      product.name,
      product.tier,
      product.cut || "",
      "jewelry guide",
      "moissanite vs diamond",
      "lab grown diamond guide",
      "engagement ring buying guide",
    ].filter(Boolean),
    openGraph: {
      title,
      description: product.description,
      url: `https://anyhavejewelry.com/blog/${product.slug}/`,
      siteName: "Anyhave Jewelry",
      images: [product.image],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://anyhavejewelry.com/blog/${product.slug}/`,
    },
  };
}

const PUBLISH_DATES: Record<string, string> = {
  "round-brilliant-moissanite-ring": "2025-11-15",
  "oval-lab-grown-diamond-ring": "2025-11-18",
  "pear-cut-moissanite-ring": "2025-11-22",
  "pear-lab-grown-diamond-ring": "2025-11-25",
  "emerald-cut-moissanite-ring": "2025-12-01",
  "cushion-cut-lab-diamond-ring": "2025-12-05",
  "princess-cut-moissanite-ring": "2025-12-10",
  "oval-lab-diamond-statement-ring": "2025-12-15",
  "cushion-moissanite-engagement-ring": "2025-12-20",
};

export default function ProductStoryPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  return (
    <>
      {product && (
        <BlogPostingJsonLd
          product={product}
          publishDate={PUBLISH_DATES[params.slug] || "2025-11-15"}
        />
      )}
      <ProductStoryClient slug={params.slug} />
    </>
  );
}
