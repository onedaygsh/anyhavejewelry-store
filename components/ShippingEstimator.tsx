"use client";

import { useState } from "react";
import { Truck, Clock, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface ShippingEstimatorProps {
  freeShippingThreshold?: number;
}

export default function ShippingEstimator({ freeShippingThreshold = 75 }: ShippingEstimatorProps) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const [zip, setZip] = useState("");
  const [showEstimate, setShowEstimate] = useState(false);

  const handleEstimate = () => {
    if (zip.trim().length >= 3) {
      setShowEstimate(true);
    }
  };

  return (
    <div className="border border-black/5 bg-cream/50 p-5 mb-6">
      <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-4 flex items-center gap-2">
        <Truck className="w-3.5 h-3.5" />
        {isEn ? "Shipping Estimate" : "配送估算"}
      </p>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/30" />
          <input
            type="text"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setShowEstimate(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleEstimate()}
            placeholder={isEn ? "Enter ZIP / Postal code" : "输入邮编"}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
          />
        </div>
        <button
          onClick={handleEstimate}
          className="px-4 py-2.5 bg-charcoal text-white text-xs tracking-widest font-medium hover:bg-graphite transition-colors"
        >
          {isEn ? "Calculate" : "计算"}
        </button>
      </div>

      {showEstimate && (
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-black/5">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-champagne" />
              <span className="text-sm text-charcoal">
                {isEn ? "Standard Shipping" : "标准配送"}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-charcoal font-medium">
                {isEn ? "Free" : "免费"}
              </p>
              <p className="text-[11px] text-charcoal/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {isEn ? "7-14 business days" : "7-14 个工作日"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-champagne" />
              <span className="text-sm text-charcoal">
                {isEn ? "Express Shipping" : "快递配送"}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-charcoal font-medium">$15.00</p>
              <p className="text-[11px] text-charcoal/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {isEn ? "3-5 business days" : "3-5 个工作日"}
              </p>
            </div>
          </div>
        </div>
      )}

      {!showEstimate && (
        <p className="text-[11px] text-charcoal/40">
          {isEn
            ? `Free standard shipping on orders over $${freeShippingThreshold}. Enter your ZIP code for delivery estimates.`
            : `满 $${freeShippingThreshold} 免标准运费。输入邮编获取配送估算。`}
        </p>
      )}
    </div>
  );
}
