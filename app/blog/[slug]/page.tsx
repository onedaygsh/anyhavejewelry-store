import { products } from "@/lib/data";
import ProductStoryClient from "./ProductStoryClient";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductStoryPage({ params }: { params: { slug: string } }) {
  return <ProductStoryClient slug={params.slug} />;
}
