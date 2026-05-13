import { Suspense } from "react";
import ProductList from "./ProductList";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 bg-white" />}>
      <ProductList />
    </Suspense>
  );
}
