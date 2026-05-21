"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AdminCatalogPage, getAdminCatalog } from "@/lib/admin-data";

const CatalogViewer = dynamic(() => import("@/components/CatalogViewer"), { ssr: false });

export default function CatalogPage() {
  const [pages, setPages] = useState<AdminCatalogPage[]>([]);

  useEffect(() => {
    setPages(getAdminCatalog());
  }, []);

  const catalogPages = pages.map((p) => ({
    id: p.id,
    leftImage: p.leftImage,
    leftTitle: p.leftTitle,
    leftSubtitle: p.leftSubtitle,
    leftProducts: p.leftProducts,
    rightImage: p.rightImage,
    rightTitle: p.rightTitle,
    rightSubtitle: p.rightSubtitle,
    rightProducts: p.rightProducts,
    promo: p.promoText ? { text: p.promoText, color: p.promoColor || "bg-amber-700" } : undefined,
  }));

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24">
      <CatalogViewer
        pages={catalogPages}
        title="2026 Collection Catalog"
        subtitle="Volume 302"
      />
    </div>
  );
}
