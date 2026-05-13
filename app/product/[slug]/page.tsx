import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/data";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  return <ProductDetail product={product} />;
}
