"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CatalogPage {
  id: number;
  leftImage: string;
  leftTitle?: string;
  leftSubtitle?: string;
  leftProducts?: { name: string; slug: string; price: string }[];
  rightImage: string;
  rightTitle?: string;
  rightSubtitle?: string;
  rightProducts?: { name: string; slug: string; price: string }[];
  promo?: { text: string; color: string };
}

interface CatalogViewerProps {
  pages: CatalogPage[];
  title?: string;
  subtitle?: string;
}

export default function CatalogViewer({ pages, title, subtitle }: CatalogViewerProps) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSpreads = Math.ceil(pages.length / 2);

  const goToSpread = useCallback(
    (index: number) => {
      if (isFlipping || index === currentSpread || index < 0 || index >= totalSpreads) return;
      setDirection(index > currentSpread ? "right" : "left");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread(index);
        setIsFlipping(false);
      }, 500);
    },
    [currentSpread, isFlipping, totalSpreads]
  );

  const nextSpread = () => goToSpread(currentSpread + 1);
  const prevSpread = () => goToSpread(currentSpread - 1);

  const leftPage = pages[currentSpread * 2];
  const rightPage = pages[currentSpread * 2 + 1];

  return (
    <div className={cn("w-full", fullscreen && "fixed inset-0 z-[100] bg-obsidian")}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8 px-6">
          {subtitle && (
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">{subtitle}</p>
          )}
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl text-obsidian">{title}</h2>
          )}
        </div>
      )}

      {/* Viewer Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative mx-auto",
          fullscreen ? "max-w-[95vw] h-[90vh]" : "max-w-5xl aspect-[16/10]"
        )}
      >
        {/* Book Shadow */}
        <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-4 scale-[0.98]" />

        {/* Book */}
        <div className="relative w-full h-full flex bg-white shadow-2xl overflow-hidden">
          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-black/20 to-transparent z-20" />

          {/* Left Page */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${currentSpread}`}
              initial={isFlipping ? { rotateY: direction === "right" ? -90 : 90, opacity: 0 } : false}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction === "right" ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-1/2 h-full relative border-r border-black/5"
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            >
              {leftPage && <PageContent page={leftPage} side="left" />}
            </motion.div>
          </AnimatePresence>

          {/* Right Page */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${currentSpread}`}
              initial={isFlipping ? { rotateY: direction === "right" ? 90 : -90, opacity: 0 } : false}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction === "right" ? -90 : 90, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-1/2 h-full relative"
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            >
              {rightPage && <PageContent page={rightPage} side="right" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={prevSpread}
            disabled={currentSpread === 0 || isFlipping}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all",
              currentSpread === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-cream hover:scale-110"
            )}
          >
            <ChevronLeft className="w-5 h-5 text-obsidian" />
          </button>
        </div>

        <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={nextSpread}
            disabled={currentSpread >= totalSpreads - 1 || isFlipping}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all",
              currentSpread >= totalSpreads - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-cream hover:scale-110"
            )}
          >
            <ChevronRight className="w-5 h-5 text-obsidian" />
          </button>
        </div>

        {/* Page Indicator */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-xs text-obsidian/50 tracking-wide">
            {currentSpread * 2 + 1}-{Math.min((currentSpread + 1) * 2, pages.length)} / {pages.length}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSpreads }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSpread(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === currentSpread ? "bg-champagne w-6" : "bg-obsidian/20 hover:bg-obsidian/40"
                )}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 z-30 w-9 h-9 bg-white/90 backdrop-blur rounded-full shadow flex items-center justify-center hover:bg-white transition-colors"
        >
          {fullscreen ? <X className="w-4 h-4 text-obsidian" /> : <Maximize2 className="w-4 h-4 text-obsidian" />}
        </button>
      </div>
    </div>
  );
}

function PageContent({ page, side }: { page: CatalogPage; side: "left" | "right" }) {
  const image = side === "left" ? page.leftImage : page.rightImage;
  const title = side === "left" ? page.leftTitle : page.rightTitle;
  const subtitle = side === "left" ? page.leftSubtitle : page.rightSubtitle;
  const products = side === "left" ? page.leftProducts : page.rightProducts;
  const promo = page.promo;

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        alt={title || "Catalog page"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Promo Badge */}
      {promo && (
        <div
          className={cn(
            "absolute top-6 left-6 w-20 h-20 rounded-full flex items-center justify-center text-center z-10",
            promo.color || "bg-red-600"
          )}
        >
          <span className="text-white text-[10px] font-bold leading-tight px-2">{promo.text}</span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {subtitle && (
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-2">{subtitle}</p>
        )}
        {title && (
          <h3 className="font-serif text-xl md:text-2xl text-white leading-tight mb-3">{title}</h3>
        )}

        {/* Product List */}
        {products && products.length > 0 && (
          <div className="space-y-2 mt-4">
            {products.map((product, i) => (
              <a
                key={i}
                href={`/product/${product.slug}/`}
                className="flex items-center justify-between group"
              >
                <span className="text-xs text-white/80 group-hover:text-champagne transition-colors">
                  {product.name}
                </span>
                <span className="text-xs text-white/60">{product.price}</span>
              </a>
            ))}
          </div>
        )}

        {/* Zoom hint */}
        <div className="mt-4 flex items-center gap-1.5 text-white/40">
          <ZoomIn className="w-3 h-3" />
          <span className="text-[10px] tracking-wide">Click to explore</span>
        </div>
      </div>
    </div>
  );
}
