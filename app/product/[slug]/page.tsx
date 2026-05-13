import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/data";
import ProductDetail from "./ProductDetail";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

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
      product.cut || "",
      product.carat || "",
      "engagement ring",
      "moissanite",
      "lab grown diamond",
      "custom jewelry",
      "ethical jewelry",
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

  const breadcrumbs = [
    { name: "Shop", url: "https://anyhavejewelry.com/products/" },
    { name: product.tierLabel, url: `https://anyhavejewelry.com/products/?tier=${product.tier}` },
    { name: product.name, url: `https://anyhavejewelry.com/product/${product.slug}/` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ProductJsonLd product={product} />
      <ProductDetail product={product} />
    </>
  );
}
