"use client";

import { Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useWishlist } from "./WishlistProvider";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  iconClassName?: string;
}

export default function WishlistButton({
  product,
  className,
  iconClassName,
}: WishlistButtonProps) {
  const { toggle, isWishlisted } = useWishlist();
  const active = isWishlisted(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      className={cn(
        "flex items-center justify-center transition-colors",
        className
      )}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "transition-all duration-300",
          active
            ? "fill-champagne text-champagne"
            : "fill-transparent text-charcoal/40 hover:text-champagne",
          iconClassName
        )}
      />
    </button>
  );
}
