"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-charcoal/40 flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-charcoal transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <>
            <ChevronRight key={`sep-${i}`} className="w-3 h-3" />
            <li key={i}>
              {i === items.length - 1 ? (
                <span className="text-charcoal/70 truncate max-w-[200px]">{item.name}</span>
              ) : (
                <Link href={item.url} className="hover:text-charcoal transition-colors truncate max-w-[200px]">
                  {item.name}
                </Link>
              )}
            </li>
          </>
        ))}
      </ol>
    </nav>
  );
}
