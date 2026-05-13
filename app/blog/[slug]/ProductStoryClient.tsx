"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Gem,
  Sparkles,
  Ruler,
  Award,
  ShoppingBag,
  Heart,
  Clock,
  User,
  Calendar,
  Tag,
  ChevronRight,
  Share2,
  Bookmark,
} from "lucide-react";
import { products, getProductBySlug } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";

/* ------------------------------------------------------------------ */
/*  Article content generators (SEO-rich educational copy)            */
/* ------------------------------------------------------------------ */

function generateArticleSections(product: ReturnType<typeof getProductBySlug>, locale: string) {
  if (!product) return [];
  const isZh = locale === "zh";
  const stoneType = product.tier === "moissanite" ? (isZh ? "莫桑石" : "Moissanite") : (isZh ? "培育钻石" : "Lab-Grown Diamond");
  const cutName = product.cut || "";
  const metal = product.metalOptions?.[0] || (isZh ? "18K白金" : "18K White Gold");

  if (isZh) {
    return [
      {
        title: `${cutName}切割：经典与优雅的代名词`,
        content: `${cutName}切割是珠宝界最受欢迎和最具标志性的切割方式之一。其独特的对称设计和58个精密刻面，能够最大程度地捕捉和反射光线，呈现出无与伦比的火彩与亮度。每一枚${cutName}${stoneType}戒指都经过大师级工匠的精心打磨，确保每一个角度都完美对称，让宝石在任何光线下都能绽放出最璀璨的光芒。`,
      },
      {
        title: `${stoneType}科普：什么是${stoneType}？`,
        content: `${stoneType}是${product.tier === "moissanite" ? "一种在实验室中培育的宝石，其亮度和火彩甚至超越了天然钻石。莫桑石的折射率高达2.65，远高于钻石的2.42，这意味着它能展现出更加绚丽的彩虹色光芒。同时，莫桑石的硬度达到9.25（钻石为10），极其耐磨，适合日常佩戴。" : "在受控实验室环境中培育的真正钻石，具有与天然开采钻石完全相同的化学、物理和光学特性。经IGI国际宝石学院认证，每一颗培育钻石都配有独立证书，确保其品质和来源的透明可追溯。"}".replace(/\n/g, " ")`,
      },
      {
        title: "4C标准解析：如何判断宝石品质",
        content: `选购${stoneType}戒指时，了解4C标准至关重要。克拉（Carat）代表宝石的重量，${product.carat || "1.00克拉"}的大小在视觉上极具存在感。切工（Cut）决定了宝石的光芒，${cutName}切割以其卓越的光学性能著称。净度（Clarity）${product.clarity || "VVS1"}意味着宝石内部几乎无可见内含物。颜色（Color）等级${product.color || "D-E"}代表接近无色的顶级品质。这四个维度共同决定了一颗宝石的价值和美感。`,
      },
      {
        title: "为什么选择${metal}镶嵌？",
        content: `${metal}是高端珠宝中最受欢迎的金属材质之一。${metal.includes("白金") || metal.includes("White") ? "白金以其纯净的银白色泽和现代感著称，能够完美衬托钻石和莫桑石的璀璨光芒，同时不易氧化变色。" : metal.includes("玫瑰") || metal.includes("Rose") ? "玫瑰金以其温暖浪漫的粉色调深受喜爱，能为戒指增添独特的复古气质和女性柔美。" : "黄金作为传统贵金属，象征着永恒与财富，其温暖的色调与各类宝石都能完美搭配。"}此外，${product.metalOptions?.join("、") || "14K/18K白金、黄金、玫瑰金"}等多种金属选择，让您可以根据个人风格和肤色定制最适合的戒指。`,
      },
      {
        title: "订婚戒指选购指南",
        content: `选购订婚戒指是人生中的重要决定。首先要确定预算范围，${stoneType}相比天然钻石具有更高的性价比，让您可以用相同的预算获得更大、更优质的宝石。其次要考虑佩戴者的个人风格——经典独钻适合简约优雅的女性，而光环款则更适合喜欢华丽感的人。戒指尺寸也至关重要，建议在购买前准确测量手指周长。最后，选择值得信赖的品牌和提供完善售后服务的商家，确保您的投资得到长期保障。`,
      },
      {
        title: "日常保养与清洁建议",
        content: `为了保持您的${product.name}始终如新，日常保养非常重要。建议每月使用温水和中性洗洁精轻轻清洗戒指，用软毛刷去除缝隙中的污垢。避免在游泳、做家务或运动时佩戴，以防化学品腐蚀金属或宝石受到撞击。每隔6-12个月，将戒指送至专业珠宝店进行深度清洁和检查，确保镶嵌牢固、宝石无损。正确的保养能让您的珠宝陪伴您一生。`,
      },
    ];
  }

  // English
  return [
    {
      title: `The ${cutName} Cut: A Timeless Symbol of Elegance`,
      content: `The ${cutName} cut is one of the most popular and iconic diamond cuts in the jewelry world. Its unique symmetrical design with 58 precision facets maximizes light capture and reflection, delivering unmatched brilliance and fire. Every ${cutName} ${stoneType} ring is meticulously polished by master artisans to ensure perfect symmetry from every angle, allowing the gemstone to shine its brightest in any light.`,
    },
    {
      title: `${stoneType} 101: What Is ${stoneType}?`,
      content: `${stoneType} is ${product.tier === "moissanite" ? "a lab-created gemstone with brilliance and fire that surpasses natural diamonds. With a refractive index of 2.65 (diamonds are 2.42), moissanite displays more vivid rainbow flashes. Its hardness of 9.25 on the Mohs scale (diamond is 10) makes it extremely durable for daily wear." : "a real diamond grown in a controlled laboratory environment with identical chemical, physical, and optical properties to mined diamonds. IGI certified, each lab-grown diamond comes with an independent certificate ensuring quality and traceable origins."}`,
    },
    {
      title: "Understanding the 4Cs: How to Evaluate Gemstone Quality",
      content: `When shopping for a ${stoneType} ring, understanding the 4Cs is essential. Carat refers to the gemstone's weight — ${product.carat || "1.00 ct"} offers substantial visual presence. Cut determines brilliance, and the ${cutName} cut is renowned for superior optical performance. Clarity grade ${product.clarity || "VVS1"} means virtually no visible inclusions. Color grade ${product.color || "D-E"} represents near-colorless top-tier quality. Together, these four dimensions define a gemstone's value and beauty.`,
    },
    {
      title: `Why Choose ${metal}?`,
      content: `${metal} is among the most sought-after metals in fine jewelry. ${metal.includes("White") ? "White gold is prized for its pure silvery-white luster and modern aesthetic. It perfectly complements the brilliance of diamonds and moissanite while resisting tarnish." : metal.includes("Rose") ? "Rose gold is beloved for its warm, romantic pink hue that adds vintage charm and feminine softness to any ring." : "Gold, the traditional precious metal, symbolizes eternity and wealth. Its warm tone pairs beautifully with all gemstone types."} With options including ${product.metalOptions?.join(", ") || "14K/18K white, yellow, and rose gold"}, you can customize the perfect match for your personal style and skin tone.`,
    },
    {
      title: "Engagement Ring Buying Guide",
      content: `Choosing an engagement ring is one of life's most significant decisions. Start by setting a budget — ${stoneType} offers exceptional value compared to natural diamonds, allowing you to get a larger, higher-quality stone for the same investment. Next, consider the wearer's personal style: classic solitaires suit elegant minimalists, while halo settings appeal to those who love glamour. Ring size is critical — measure finger circumference accurately before purchasing. Finally, choose a trusted brand with comprehensive after-sales service to protect your investment for years to come.`,
    },
    {
      title: "Care & Maintenance Tips",
      content: `To keep your ${product.name} looking its best, regular care is essential. Clean your ring monthly using warm water and mild dish soap, gently brushing with a soft toothbrush to remove debris from crevices. Avoid wearing it while swimming, doing housework, or exercising to prevent chemical corrosion or physical impact. Every 6-12 months, have your ring professionally cleaned and inspected to ensure the setting remains secure and the gemstone is undamaged. Proper care ensures your jewelry lasts a lifetime.`,
    },
  ];
}

function generateFAQs(product: ReturnType<typeof getProductBySlug>, locale: string) {
  if (!product) return [];
  const isZh = locale === "zh";
  const stoneType = product.tier === "moissanite" ? (isZh ? "莫桑石" : "moissanite") : (isZh ? "培育钻石" : "lab-grown diamond");

  if (isZh) {
    return [
      { q: `${product.name}适合日常佩戴吗？`, a: `当然适合。${product.tier === "moissanite" ? "莫桑石硬度高达9.25，仅次于钻石，非常耐磨。" : "培育钻石与天然钻石硬度相同（10级），极其耐用。"}搭配${product.metalOptions?.[0] || "18K白金"}镶嵌，这枚戒指可以陪伴您度过每一天。` },
      { q: `${stoneType}和天然钻石有什么区别？`, a: `${product.tier === "moissanite" ? "莫桑石是实验室培育的宝石，亮度火彩甚至超越钻石，价格却仅为钻石的十分之一。" : "培育钻石与天然钻石在化学、物理和光学上完全相同，唯一的区别是形成环境——一个在实验室，一个在地下。培育钻石通常比同等品质天然钻石便宜40-60%。"}` },
      { q: "戒指尺寸不合适怎么办？", a: "我们提供终身免费尺寸调整服务。如果您购买的戒指尺寸不合适，只需联系客服，我们将为您安排专业的尺寸修改。" },
      { q: "你们提供刻字服务吗？", a: "是的，我们提供免费的内圈刻字服务。您可以刻上日期、名字或简短的祝福语（最多20个字符），让戒指更具纪念意义。" },
      { q: "如何保养这枚戒指？", a: "建议每月用温水和中性洗洁精清洗，避免接触化学品。每6-12个月送至专业珠宝店检查镶嵌牢固度。详细的保养指南会随戒指一起寄送给您。" },
    ];
  }

  return [
    { q: `Is the ${product.name} suitable for daily wear?`, a: `Absolutely. ${product.tier === "moissanite" ? "Moissanite scores 9.25 on the Mohs hardness scale, second only to diamonds, making it extremely durable." : "Lab-grown diamonds share the same hardness as natural diamonds (10 on the Mohs scale), making them exceptionally durable."} Paired with a ${product.metalOptions?.[0] || "18K white gold"} setting, this ring is designed to be worn every day.` },
    { q: `What is the difference between ${stoneType} and natural diamonds?`, a: `${product.tier === "moissanite" ? "Moissanite is a lab-created gemstone with brilliance and fire that can exceed diamonds, at roughly one-tenth the price." : "Lab-grown diamonds are chemically, physically, and optically identical to natural diamonds. The only difference is their origin — one grown in a lab, the other mined from the earth. Lab-grown diamonds typically cost 40-60% less than equivalent natural diamonds."}` },
    { q: "What if the ring size is wrong?", a: "We offer complimentary resizing for life. If your ring doesn't fit perfectly, simply contact our customer service and we'll arrange professional resizing at no charge." },
    { q: "Do you offer engraving services?", a: "Yes, we offer complimentary inner-band engraving. You can inscribe a date, name, or short meaningful phrase (up to 20 characters) to make your ring truly one-of-a-kind." },
    { q: "How do I care for this ring?", a: "Clean monthly with warm water and mild soap. Avoid exposure to harsh chemicals. Have the setting inspected every 6-12 months by a professional jeweler. A detailed care guide is included with every purchase." },
  ];
}

function generateToc(product: ReturnType<typeof getProductBySlug>, locale: string) {
  const isZh = locale === "zh";
  const sections = generateArticleSections(product, locale);
  return [
    isZh ? "产品概览" : "Product Overview",
    ...sections.map((s) => s.title),
    isZh ? "常见问题" : "Frequently Asked Questions",
    isZh ? "相关产品" : "Related Products",
  ];
}

/* ------------------------------------------------------------------ */
/*  FAQ JSON-LD                                                       */
/* ------------------------------------------------------------------ */

function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ProductStoryClient({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const { currency } = useCurrency();
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const isZh = locale === "zh";
  const sections = generateArticleSections(product, locale);
  const faqs = generateFAQs(product, locale);
  const toc = generateToc(product, locale);

  const related = products
    .filter((p) => p.tier === product.tier && p.id !== product.id)
    .slice(0, 3);

  const has4C = product.carat || product.cut || product.clarity || product.color;
  const readTime = isZh ? "8 分钟阅读" : "8 min read";
  const author = "Anyhave Jewelry";
  const publishDate = "2025-12-01";

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const slugify = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-").slice(0, 40);

  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <div className="bg-cream min-h-screen pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-charcoal/40">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">{isZh ? "首页" : "Home"}</Link>
              </li>
              <ChevronRight className="w-3 h-3" />
              <li>
                <Link href="/blog/" className="hover:text-charcoal transition-colors">{isZh ? "珠宝指南" : "Jewelry Guide"}</Link>
              </li>
              <ChevronRight className="w-3 h-3" />
              <li className="text-charcoal/70 truncate max-w-[200px]">{product.name}</li>
            </ol>
          </nav>

          {/* Back */}
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? "返回珠宝指南" : "Back to Jewelry Guide"}
          </Link>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-white text-[10px] tracking-widest uppercase text-charcoal/60 border border-black/5">
                {product.tierLabel}
              </span>
              <span className="flex items-center gap-1 text-xs text-charcoal/40">
                <Tag className="w-3 h-3" />
                {isZh ? "购买指南" : "Buying Guide"}
              </span>
              {product.certification && (
                <span className="flex items-center gap-1 text-xs text-charcoal/40">
                  <Award className="w-3 h-3" />
                  {product.certification}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-6 leading-tight">
              {isZh ? `${product.name}完全指南：选购、保养与专业知识` : `The Complete Guide to ${product.name}`}
            </h1>

            <p className="text-lg text-charcoal/60 leading-relaxed max-w-3xl mb-6">
              {isZh
                ? `深入了解${product.name}的设计理念、${product.tier === "moissanite" ? "莫桑石" : "培育钻石"}专业知识、4C品质标准以及日常保养技巧。无论您是准备求婚还是为自己挑选一件特别的珠宝，这篇指南都将帮助您做出明智的选择。`
                : `Discover the design philosophy, gemstone expertise, 4C quality standards, and care tips for the ${product.name}. Whether you are planning a proposal or treating yourself, this guide helps you make an informed choice.`}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-charcoal/40 border-b border-black/5 pb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4" />
                {isZh ? "购买指南" : "Buying Guide"}
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <div className="order-2 lg:order-1">
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="aspect-[16/9] bg-stone rounded-sm overflow-hidden mb-12"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Product Overview */}
              <section id={slugify(toc[0])} className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-4">{toc[0]}</h2>
                <p className="text-charcoal/70 leading-relaxed mb-6">{product.description}</p>
                <div className="bg-white border border-black/5 p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.carat && (
                      <div className="text-center">
                        <Gem className="w-5 h-5 text-charcoal/40 mx-auto mb-1" />
                        <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{isZh ? "克拉" : "Carat"}</p>
                        <p className="text-sm font-medium text-charcoal">{product.carat}</p>
                      </div>
                    )}
                    {product.cut && (
                      <div className="text-center">
                        <Sparkles className="w-5 h-5 text-charcoal/40 mx-auto mb-1" />
                        <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{isZh ? "切工" : "Cut"}</p>
                        <p className="text-sm font-medium text-charcoal">{product.cut}</p>
                      </div>
                    )}
                    {product.clarity && (
                      <div className="text-center">
                        <Ruler className="w-5 h-5 text-charcoal/40 mx-auto mb-1" />
                        <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{isZh ? "净度" : "Clarity"}</p>
                        <p className="text-sm font-medium text-charcoal">{product.clarity}</p>
                      </div>
                    )}
                    {product.color && (
                      <div className="text-center">
                        <Award className="w-5 h-5 text-charcoal/40 mx-auto mb-1" />
                        <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{isZh ? "颜色" : "Color"}</p>
                        <p className="text-sm font-medium text-charcoal">{product.color}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xl font-light tracking-wide text-charcoal">
                      {formatPrice(product.price, currency)}
                    </span>
                    <Link
                      href={`/product/${product.slug}/`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white text-sm tracking-widest hover:bg-graphite transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {isZh ? "查看产品" : "View Product"}
                    </Link>
                  </div>
                </div>
              </section>

              {/* Article Sections */}
              {sections.map((section, i) => (
                <motion.section
                  key={i}
                  id={slugify(section.title)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="font-serif text-2xl text-charcoal mb-4">{section.title}</h2>
                  <p className="text-charcoal/70 leading-relaxed">{section.content}</p>
                </motion.section>
              ))}

              {/* Specs */}
              {product.imageSecondary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 gap-6 mb-12"
                >
                  <div className="aspect-[4/5] bg-stone overflow-hidden">
                    <img
                      src={product.imageSecondary}
                      alt={`${product.name} detail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10 bg-white border border-black/5">
                    <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
                      {isZh ? "规格参数" : "Specifications"}
                    </p>
                    <ul className="space-y-3">
                      {product.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-3 text-sm text-charcoal/60">
                          <Sparkles className="w-3 h-3 text-champagne" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    {product.metalOptions && product.metalOptions.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-black/5">
                        <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mb-2">
                          {isZh ? "可选金属" : "Available Metals"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.metalOptions.map((m) => (
                            <span key={m} className="px-3 py-1 text-xs border border-black/10 text-charcoal/60">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* FAQs */}
              <section id={slugify(toc[toc.length - 2])} className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-6">{toc[toc.length - 2]}</h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-black/5 p-5">
                      <h3 className="text-sm font-medium text-charcoal mb-2 flex items-start gap-2">
                        <span className="text-champagne mt-0.5">Q:</span>
                        {faq.q}
                      </h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed pl-5">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10 border border-black/5 text-center mb-12"
              >
                <Award className="w-8 h-8 text-champagne mx-auto mb-4" />
                <h2 className="font-serif text-2xl text-charcoal mb-3">
                  {isZh ? "准备好拥有属于您的珠宝了吗？" : "Ready to Make It Yours?"}
                </h2>
                <p className="text-charcoal/60 max-w-lg mx-auto mb-6">
                  {isZh
                    ? "每一枚戒指都承载着独特的故事。让我们帮您找到那枚完美的戒指。"
                    : "Every ring tells a unique story. Let us help you find the perfect one."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/product/${product.slug}/`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {isZh ? "立即购买" : "Shop Now"}
                  </Link>
                  <Link
                    href="/design-your-own/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    {isZh ? "定制此款式" : "Customize This Style"}
                  </Link>
                </div>
              </motion.div>

              {/* Related */}
              <section id={slugify(toc[toc.length - 1])} className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-6">{toc[toc.length - 1]}</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}/`}
                      className="group block"
                    >
                      <div className="aspect-[4/3] bg-stone overflow-hidden mb-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{p.tierLabel}</p>
                      <h3 className="text-sm font-medium text-charcoal group-hover:text-champagne transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="order-1 lg:order-2">
              <div className="sticky top-28">
                <div className="bg-white border border-black/5 p-5 mb-6">
                  <p className="text-xs tracking-wider uppercase text-charcoal/40 mb-3">
                    {isZh ? "目录" : "Table of Contents"}
                  </p>
                  <ul className="space-y-2">
                    {toc.map((item, i) => (
                      <li key={i}>
                        <button
                          onClick={() => scrollToId(slugify(item))}
                          className="text-sm text-charcoal/60 hover:text-charcoal transition-colors text-left w-full"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-black/5 p-5">
                  <p className="text-xs tracking-wider uppercase text-charcoal/40 mb-3">
                    {isZh ? "快速链接" : "Quick Links"}
                  </p>
                  <div className="space-y-2">
                    <Link
                      href={`/product/${product.slug}/`}
                      className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-champagne transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {isZh ? "查看产品详情" : "View Product Details"}
                    </Link>
                    <Link
                      href="/design-your-own/"
                      className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-champagne transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      {isZh ? "定制此款式" : "Customize This Style"}
                    </Link>
                    <Link
                      href="/contact/"
                      className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-champagne transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      {isZh ? "咨询珠宝顾问" : "Contact Jewelry Advisor"}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
