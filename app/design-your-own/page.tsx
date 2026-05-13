"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  Diamond,
  Circle,
  Hexagon,
  Triangle,
  Square,
  Star,
  Heart,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getCustomizeContent, subscribeToAdminData, ADMIN_KEYS, defaultCustomizeContent, type CustomizeContent } from "@/lib/admin-data";

type Step = "style" | "stone" | "metal" | "engraving" | "review";

export default function DesignYourOwnPage() {
  const { locale } = useI18n();
  const [config, setConfig] = useState<CustomizeContent>(defaultCustomizeContent);
  const [step, setStep] = useState<Step>("style");

  const loadConfig = () => {
    setConfig(getCustomizeContent());
  };

  useEffect(() => {
    loadConfig();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.customizeContent) loadConfig();
    });
  }, []);

  const ringStyles = config.ringStyles.map((s) => ({
    id: s.id,
    name: s.labelEn,
    nameZh: s.labelZh,
    image: s.image,
    desc: "",
    descZh: "",
  }));

  const stones = config.stones.map((s) => ({
    id: s.id,
    name: s.nameEn,
    nameZh: s.nameZh,
    price: s.price,
    color: s.color,
    type: s.type,
  }));

  const metals = config.metals.map((m) => ({
    id: m.id,
    name: m.nameEn,
    nameZh: m.nameZh,
    price: m.price,
    color: m.color,
  }));

  const basePrices = config.basePrices;
  const [selection, setSelection] = useState({
    style: "",
    stone: "",
    metal: "",
    engraving: "",
    ringSize: "",
  });

  const steps: { key: Step; label: string; labelZh: string }[] = [
    { key: "style", label: "Style", labelZh: "款式" },
    { key: "stone", label: "Stone", labelZh: "宝石" },
    { key: "metal", label: "Metal", labelZh: "金属" },
    { key: "engraving", label: "Details", labelZh: "细节" },
    { key: "review", label: "Review", labelZh: "确认" },
  ];

  const selectedStyle = ringStyles.find((s) => s.id === selection.style);
  const selectedStone = stones.find((s) => s.id === selection.stone);
  const selectedMetal = metals.find((m) => m.id === selection.metal);

  const totalPrice =
    (selectedStyle ? basePrices[selectedStyle.id] : 0) +
    (selectedStone ? selectedStone.price : 0) +
    (selectedMetal ? selectedMetal.price : 0);

  const canProceed = {
    style: !!selection.style,
    stone: !!selection.stone,
    metal: !!selection.metal,
    engraving: true,
    review: true,
  };

  const updateSelection = (key: keyof typeof selection, value: string) => {
    setSelection((prev) => ({ ...prev, [key]: value }));
  };

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const goNext = () => {
    const next = steps[currentStepIndex + 1];
    if (next) setStep(next.key);
  };

  const goBack = () => {
    const prev = steps[currentStepIndex - 1];
    if (prev) setStep(prev.key);
  };

  const isEn = locale === "en";

  return (
    <div className="bg-cream min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3">
            {isEn ? "Bespoke Design" : "专属定制"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            {isEn ? "Design Your Own Ring" : "设计您的专属戒指"}
          </h1>
          <p className="text-charcoal/50 max-w-md mx-auto">
            {isEn
              ? "Follow the steps below to create a one-of-a-kind piece that tells your story."
              : "按照以下步骤，创造一件讲述您故事的独一无二之作。"}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, i) => {
            const isActive = s.key === step;
            const isCompleted = i < currentStepIndex;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isCompleted || i === currentStepIndex) setStep(s.key);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase transition-all ${
                    isActive
                      ? "bg-charcoal text-white"
                      : isCompleted
                      ? "bg-charcoal/80 text-white"
                      : "bg-white text-charcoal/40 border border-black/5"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className="w-4 h-4 flex items-center justify-center text-[10px] font-mono">
                      {i + 1}
                    </span>
                  )}
                  {isEn ? s.label : s.labelZh}
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-charcoal/20" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Style */}
          {step === "style" && (
            <motion.div
              key="style"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl text-charcoal text-center mb-8">
                {isEn ? "Choose Your Setting Style" : "选择您的镶嵌款式"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {ringStyles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateSelection("style", s.id)}
                    className={`group text-left border transition-all duration-300 ${
                      selection.style === s.id
                        ? "border-champagne bg-white shadow-lg"
                        : "border-black/5 bg-white hover:border-champagne/30"
                    }`}
                  >
                    <div className="aspect-square bg-stone relative overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {selection.style === s.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-champagne rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-charcoal mb-1">{isEn ? s.name : s.nameZh}</h3>
                      <p className="text-xs text-charcoal/50">{isEn ? s.desc : s.descZh}</p>
                      <p className="text-xs text-charcoal/70 mt-2">+ {isEn ? "From" : "起"} ¥{basePrices[s.id]}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Stone */}
          {step === "stone" && (
            <motion.div
              key="stone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl text-charcoal text-center mb-8">
                {isEn ? "Select Your Center Stone" : "选择您的主石"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {stones.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateSelection("stone", s.id)}
                    className={`p-6 border text-left transition-all ${
                      selection.stone === s.id
                        ? "border-champagne bg-white shadow-lg"
                        : "border-black/5 bg-white hover:border-champagne/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full border border-black/10"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className={`px-2 py-0.5 text-[10px] tracking-wider uppercase ${
                          s.type === "lab" ? "bg-charcoal text-white" : "bg-cream-dark text-charcoal/70"
                        }`}>
                          {s.type === "lab" ? (isEn ? "Lab Diamond" : "培育钻石") : (isEn ? "Moissanite" : "莫桑石")}
                        </span>
                      </div>
                      {selection.stone === s.id && (
                        <Check className="w-5 h-5 text-champagne" />
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-charcoal mb-1">{isEn ? s.name : s.nameZh}</h3>
                    <p className="text-lg font-light text-charcoal">¥{s.price}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Metal */}
          {step === "metal" && (
            <motion.div
              key="metal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl text-charcoal text-center mb-8">
                {isEn ? "Choose Your Metal" : "选择您的金属"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {metals.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateSelection("metal", m.id)}
                    className={`p-6 border text-left transition-all ${
                      selection.metal === m.id
                        ? "border-champagne bg-white shadow-lg"
                        : "border-black/5 bg-white hover:border-champagne/30"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-full border border-black/10"
                        style={{ backgroundColor: m.color }}
                      />
                      {selection.metal === m.id && (
                        <Check className="w-4 h-4 text-champagne ml-auto" />
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-charcoal mb-1">{isEn ? m.name : m.nameZh}</h3>
                    <p className="text-xs text-charcoal/50">
                      {m.price > 0 ? `+ ¥${m.price}` : isEn ? "Base price included" : "包含在基础价格中"}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Engraving + Ring Size */}
          {step === "engraving" && (
            <motion.div
              key="engraving"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl text-charcoal text-center mb-8">
                {isEn ? "Personalize Your Ring" : "个性化您的戒指"}
              </h2>
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Ring Size */}
                <div className="bg-white p-6 border border-black/5">
                  <label className="block text-sm font-medium tracking-wide mb-3">
                    {isEn ? "Ring Size" : "戒指尺寸"}
                  </label>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSelection("ringSize", size)}
                        className={`py-2 text-sm border transition-all ${
                          selection.ringSize === size
                            ? "border-charcoal bg-charcoal text-white"
                            : "border-black/10 text-charcoal/70 hover:border-charcoal/30"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engraving */}
                <div className="bg-white p-6 border border-black/5">
                  <label className="block text-sm font-medium tracking-wide mb-3">
                    {isEn ? "Engraving (Optional)" : "刻字（可选）"}
                  </label>
                  <input
                    type="text"
                    value={selection.engraving}
                    onChange={(e) => updateSelection("engraving", e.target.value)}
                    placeholder={isEn ? "Enter up to 20 characters..." : "最多20个字符..."}
                    maxLength={20}
                    className="w-full px-4 py-3 border border-black/10 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-champagne transition-colors"
                  />
                  <p className="text-xs text-charcoal/40 mt-2">
                    {isEn ? `${selection.engraving.length}/20 characters` : `${selection.engraving.length}/20 字符`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl text-charcoal text-center mb-8">
                {isEn ? "Review Your Design" : "确认您的设计"}
              </h2>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-black/5 overflow-hidden">
                  {/* Preview Image */}
                  <div className="aspect-[16/9] bg-stone relative overflow-hidden">
                    {selectedStyle && (
                      <img
                        src={selectedStyle.image}
                        alt={selectedStyle.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-xs tracking-widest uppercase mb-1">{isEn ? "Your Design" : "您的设计"}</p>
                      <h3 className="text-white font-serif text-xl">
                        {selectedStyle ? (isEn ? selectedStyle.name : selectedStyle.nameZh) : ""}
                      </h3>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-6 space-y-4">
                    {selectedStone && (
                      <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm text-charcoal/60">{isEn ? "Center Stone" : "主石"}</span>
                        <span className="text-sm text-charcoal">{isEn ? selectedStone.name : selectedStone.nameZh}</span>
                      </div>
                    )}
                    {selectedMetal && (
                      <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm text-charcoal/60">{isEn ? "Metal" : "金属"}</span>
                        <span className="text-sm text-charcoal">{isEn ? selectedMetal.name : selectedMetal.nameZh}</span>
                      </div>
                    )}
                    {selection.ringSize && (
                      <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm text-charcoal/60">{isEn ? "Ring Size" : "戒指尺寸"}</span>
                        <span className="text-sm text-charcoal">{selection.ringSize}</span>
                      </div>
                    )}
                    {selection.engraving && (
                      <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm text-charcoal/60">{isEn ? "Engraving" : "刻字"}</span>
                        <span className="text-sm text-charcoal italic">"{selection.engraving}"</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium text-charcoal">{isEn ? "Estimated Total" : "预估总价"}</span>
                      <span className="text-2xl font-light text-charcoal">¥{totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-8 text-center">
                  <Link
                    href={`/contact/?subject=custom-design&style=${selection.style}&stone=${selection.stone}&metal=${selection.metal}&size=${selection.ringSize}&engraving=${encodeURIComponent(selection.engraving)}`}
                    className="inline-flex items-center gap-2 px-10 py-4 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
                  >
                    {isEn ? "REQUEST QUOTE" : "获取报价"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-xs text-charcoal/40 mt-4">
                    {isEn
                      ? "Our designers will contact you within 24 hours to finalize your design."
                      : "我们的设计师将在24小时内联系您，确认设计细节。"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 max-w-2xl mx-auto">
          <button
            onClick={goBack}
            disabled={currentStepIndex === 0}
            className={`px-6 py-3 text-sm tracking-widest border transition-all ${
              currentStepIndex === 0
                ? "border-black/5 text-charcoal/20 cursor-not-allowed"
                : "border-black/10 text-charcoal/70 hover:border-charcoal/30"
            }`}
          >
            {isEn ? "BACK" : "返回"}
          </button>

          {/* Running Total */}
          {selectedStyle && (
            <div className="hidden md:block text-center">
              <p className="text-xs text-charcoal/40 tracking-wider uppercase">{isEn ? "Running Total" : "当前总价"}</p>
              <p className="text-lg font-light text-charcoal">¥{totalPrice}</p>
            </div>
          )}

          {step !== "review" ? (
            <button
              onClick={goNext}
              disabled={!canProceed[step]}
              className={`px-6 py-3 text-sm tracking-widest border transition-all flex items-center gap-2 ${
                canProceed[step]
                  ? "border-charcoal bg-charcoal text-white hover:bg-graphite"
                  : "border-black/5 text-charcoal/20 cursor-not-allowed"
              }`}
            >
              {isEn ? "NEXT" : "下一步"}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
