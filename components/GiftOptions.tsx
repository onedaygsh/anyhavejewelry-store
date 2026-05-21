"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface GiftOptionsProps {
  onToggle: (opts: { giftWrap: boolean; giftMessage: boolean; giftReceipt: boolean; message: string }) => void;
}

export default function GiftOptions({ onToggle }: GiftOptionsProps) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState(false);
  const [giftReceipt, setGiftReceipt] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (updates: Partial<{
    giftWrap: boolean;
    giftMessage: boolean;
    giftReceipt: boolean;
    message: string;
  }>) => {
    const newState = { giftWrap, giftMessage, giftReceipt, message, ...updates };
    onToggle(newState);
  };

  return (
    <div className="border border-black/5 bg-cream/50 p-5 mb-6">
      <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-4 flex items-center gap-2">
        <Gift className="w-3.5 h-3.5" />
        {isEn ? "Gift Options" : "礼品选项"}
      </p>

      <div className="space-y-3">
        {/* Gift Wrap */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => {
              setGiftWrap(e.target.checked);
              handleChange({ giftWrap: e.target.checked });
            }}
            className="w-4 h-4 border-charcoal/20 text-champagne focus:ring-champagne rounded"
          />
          <div className="flex-1">
            <p className="text-sm text-charcoal group-hover:text-champagne transition-colors">
              {isEn ? "Premium Gift Box (+$5.00)" : "精美礼盒 (+$5.00)"}
            </p>
            <p className="text-[11px] text-charcoal/40">
              {isEn ? "Signature packaging with ribbon, care card & polishing cloth" : "标志性包装，含丝带、护理卡和擦银布"}
            </p>
          </div>
        </label>

        {/* Gift Message */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={giftMessage}
            onChange={(e) => {
              setGiftMessage(e.target.checked);
              handleChange({ giftMessage: e.target.checked });
            }}
            className="w-4 h-4 border-charcoal/20 text-champagne focus:ring-champagne rounded"
          />
          <div className="flex-1">
            <p className="text-sm text-charcoal group-hover:text-champagne transition-colors">
              {isEn ? "Gift Message Card (Free)" : "礼品留言卡（免费）"}
            </p>
            <p className="text-[11px] text-charcoal/40">
              {isEn ? "Handwritten note on branded card" : "品牌卡片上的手写便条"}
            </p>
          </div>
        </label>

        <AnimatePresence>
          {giftMessage && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleChange({ message: e.target.value });
                }}
                maxLength={200}
                rows={3}
                placeholder={isEn ? "Write your message here..." : "在此写下您的留言..."}
                className="w-full px-3 py-2 bg-white border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors resize-none"
              />
              <p className="text-[10px] text-charcoal/30 mt-1 text-right">{message.length}/200</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gift Receipt */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={giftReceipt}
            onChange={(e) => {
              setGiftReceipt(e.target.checked);
              handleChange({ giftReceipt: e.target.checked });
            }}
            className="w-4 h-4 border-charcoal/20 text-champagne focus:ring-champagne rounded"
          />
          <div className="flex-1">
            <p className="text-sm text-charcoal group-hover:text-champagne transition-colors">
              {isEn ? "Gift Receipt (Hide Price)" : "礼品收据（隐藏价格）"}
            </p>
            <p className="text-[11px] text-charcoal/40">
              {isEn ? "Remove pricing from packing slip" : "从装箱单中移除价格"}
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
