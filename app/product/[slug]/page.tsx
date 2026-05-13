import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug, Product } from "@/lib/data";
import ProductDetail from "./ProductDetail";
import { ProductJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Anyhave Jewelry`,
    description: product.description,
    keywords: [
      product.name,
      product.tier,
      product.material,
      "engagement ring",
      "moissanite",
      "lab grown diamond",
    ],
    openGraph: {
      title: `${product.name} | Anyhave Jewelry`,
      description: product.description,
      url: `https://anyhavejewelry.com/product/${product.slug}/`,
      siteName: "Anyhave Jewelry",
      images: [product.image],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Anyhave Jewelry`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://anyhavejewelry.com/product/${product.slug}/`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetail product={product} />
    </>
  );
}
