// Admin Data Layer - uses localStorage for persistence in static export mode
import { Product } from "./data";
import { BlogPost } from "./blog-data";

const LS_PREFIX = "anyhave-admin::";

// ==================== Sync ====================
const SYNC_CHANNEL = "anyhave-admin-sync";

export const ADMIN_KEYS = {
  auth: LS_PREFIX + "auth",
  products: LS_PREFIX + "products",
  blog: LS_PREFIX + "blog",
  orders: LS_PREFIX + "orders",
  pageContent: LS_PREFIX + "page-content",
  siteSettings: LS_PREFIX + "site-settings",
  homepageSections: LS_PREFIX + "homepage-sections",
  aboutContent: LS_PREFIX + "about-content",
  contactContent: LS_PREFIX + "contact-content",
  customizeContent: LS_PREFIX + "customize-content",
  translations: LS_PREFIX + "translations",
  comparison: LS_PREFIX + "comparison",
} as const;

function broadcastSync(key: string) {
  if (typeof window === "undefined") return;
  try {
    const channel = new BroadcastChannel(SYNC_CHANNEL);
    channel.postMessage({ key });
    channel.close();
  } catch {
    // BroadcastChannel not supported
  }
}

export function subscribeToAdminData(callback: (key: string) => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(LS_PREFIX)) {
      callback(e.key);
    }
  };

  const handleBroadcast = (e: MessageEvent) => {
    if (e.data?.key?.startsWith(LS_PREFIX)) {
      callback(e.data.key);
    }
  };

  window.addEventListener("storage", handleStorage);

  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(SYNC_CHANNEL);
    channel.addEventListener("message", handleBroadcast);
  } catch {
    // BroadcastChannel not supported
  }

  return () => {
    window.removeEventListener("storage", handleStorage);
    if (channel) {
      channel.removeEventListener("message", handleBroadcast);
      channel.close();
    }
  };
}

// Auth
const AUTH_KEY = ADMIN_KEYS.auth;
const ADMIN_PASSWORD = "anyhave2025";

export function adminLogin(password: string): boolean {
  if (typeof window === "undefined") return false;
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, Date.now().toString());
    return true;
  }
  return false;
}

export function adminLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
}

// Products
const PRODUCTS_KEY = ADMIN_KEYS.products;

export function getAdminProducts(defaultProducts: Product[]): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw) as Product[];
    return parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function saveAdminProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  broadcastSync(PRODUCTS_KEY);
}

export function addAdminProduct(products: Product[], product: Product): Product[] {
  const updated = [...products, product];
  saveAdminProducts(updated);
  return updated;
}

export function updateAdminProduct(products: Product[], updated: Product): Product[] {
  const list = products.map((p) => (p.id === updated.id ? updated : p));
  saveAdminProducts(list);
  return list;
}

export function deleteAdminProduct(products: Product[], id: string): Product[] {
  const list = products.filter((p) => p.id !== id);
  saveAdminProducts(list);
  return list;
}

// Blog Posts
const BLOG_KEY = ADMIN_KEYS.blog;

export function getAdminBlogPosts(defaultPosts: BlogPost[]): BlogPost[] {
  if (typeof window === "undefined") return defaultPosts;
  try {
    const raw = localStorage.getItem(BLOG_KEY);
    if (!raw) return defaultPosts;
    const parsed = JSON.parse(raw) as BlogPost[];
    return parsed.length > 0 ? parsed : defaultPosts;
  } catch {
    return defaultPosts;
  }
}

export function saveAdminBlogPosts(posts: BlogPost[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  broadcastSync(BLOG_KEY);
}

export function addAdminBlogPost(posts: BlogPost[], post: BlogPost): BlogPost[] {
  const updated = [post, ...posts];
  saveAdminBlogPosts(updated);
  return updated;
}

export function updateAdminBlogPost(posts: BlogPost[], updated: BlogPost): BlogPost[] {
  const list = posts.map((p) => (p.slug === updated.slug ? updated : p));
  saveAdminBlogPosts(list);
  return list;
}

export function deleteAdminBlogPost(posts: BlogPost[], slug: string): BlogPost[] {
  const list = posts.filter((p) => p.slug !== slug);
  saveAdminBlogPosts(list);
  return list;
}

// Orders
export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  note?: string;
  createdAt: string;
}

const ORDERS_KEY = ADMIN_KEYS.orders;

export function getAdminOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAdminOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  broadcastSync(ORDERS_KEY);
}

export function addOrder(order: Order): Order[] {
  const orders = getAdminOrders();
  const updated = [order, ...orders];
  saveAdminOrders(updated);
  return updated;
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const orders = getAdminOrders();
  const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
  saveAdminOrders(updated);
  return updated;
}

// Page Content
export interface PageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroImage: string;
  heroCta2En: string;
  heroCta2Zh: string;
  collections: {
    title: string;
    desc: string;
    image: string;
    href: string;
  }[];
  inspirePosts: {
    title: string;
    desc: string;
    image: string;
    href: string;
  }[];
}

const PAGE_KEY = ADMIN_KEYS.pageContent;

export function getPageContent(defaultContent: PageContent): PageContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(PAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as PageContent;
    return { ...defaultContent, ...parsed };
  } catch {
    return defaultContent;
  }
}

export function savePageContent(content: PageContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAGE_KEY, JSON.stringify(content));
  broadcastSync(PAGE_KEY);
}

// Deep merge utility for nested objects (used by translations)
function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key in override) {
    const val = override[key];
    if (
      val &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      key in base &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(
        base[key] as Record<string, unknown>,
        val as Record<string, unknown>
      );
    } else if (val !== undefined) {
      result[key] = val;
    }
  }
  return result as T;
}

// ==================== Site Settings ====================
const SETTINGS_KEY = ADMIN_KEYS.siteSettings;

export interface SiteSettings {
  announcements: string[];
  trustItems: {
    titleEn: string;
    titleZh: string;
    descEn: string;
    descZh: string;
  }[];
  footer: {
    descEn: string;
    descZh: string;
    rightsEn: string;
    rightsZh: string;
  };
  navbar: {
    logo: string;
    bookAppointmentEn: string;
    bookAppointmentZh: string;
  };
}

export const defaultSiteSettings: SiteSettings = {
  announcements: [
    "Free 30-Day Returns · Free 90-Day Resize · IGI Certified",
    "Enjoy 30% Off on Lab-Grown Diamonds · Code: DIAMOND30",
    "Free Global Shipping on Orders Over ¥3000",
    "Ethical Moissanite & Lab-Grown Diamonds · Conflict Free",
  ],
  trustItems: [
    { titleEn: "Certified Quality", titleZh: "认证品质", descEn: "GIA-graded diamonds and pure metals", descZh: "GIA分级钻石和纯贵金属" },
    { titleEn: "Master Craftsmanship", titleZh: "大师工艺", descEn: "Hand-finished by expert artisans", descZh: "由资深工匠手工完成" },
    { titleEn: "Global Shipping", titleZh: "全球配送", descEn: "Insured delivery worldwide", descZh: "全球保险配送" },
    { titleEn: "Design Support", titleZh: "设计支持", descEn: "1-on-1 consultation with jewelry experts", descZh: "一对一珠宝专家咨询" },
  ],
  footer: {
    descEn: "Bespoke moissanite and lab-grown diamond jewelry. Handcrafted symbols of love that respect both your values and your budget.",
    descZh: "定制莫桑石和培育钻石珠宝。手工打造的爱情象征，既尊重您的价值观，也尊重您的预算。",
    rightsEn: "© 2026 Anyhave Jewelry. All rights reserved.",
    rightsZh: "© 2026 Anyhave Jewelry。保留所有权利。",
  },
  navbar: {
    logo: "Anyhave",
    bookAppointmentEn: "Book Appointment",
    bookAppointmentZh: "预约咨询",
  },
};

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSiteSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSiteSettings;
    const parsed = JSON.parse(raw) as Partial<SiteSettings>;
    return { ...defaultSiteSettings, ...parsed };
  } catch {
    return defaultSiteSettings;
  }
}

export function saveSiteSettings(settings: SiteSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  broadcastSync(SETTINGS_KEY);
}

// ==================== Homepage Sections ====================
const HOMEPAGE_KEY = ADMIN_KEYS.homepageSections;

export interface HomepageSections {
  features: { titleEn: string; titleZh: string; descEn: string; descZh: string }[];
  shopByShape: { nameEn: string; nameZh: string; image: string }[];
  promos: { discountEn: string; discountZh: string; labelEn: string; labelZh: string; href: string; bg: string }[];
  promoCode: string;
  ringBuilderCTA: {
    titleEn: string; titleZh: string;
    descEn: string; descZh: string;
    btn1En: string; btn1Zh: string;
    btn2En: string; btn2Zh: string;
    quizEn: string; quizZh: string;
    quizDescEn: string; quizDescZh: string;
    quizDesc2En: string; quizDesc2Zh: string;
    image: string;
  };
  craftingMemories: {
    steps: { titleEn: string; titleZh: string; descEn: string; descZh: string; image: string }[];
  };
  technologySection: {
    labelEn: string; labelZh: string;
    titleEn: string; titleZh: string;
    descEn: string; descZh: string;
    badgeEn: string; badgeZh: string;
    btnEn: string; btnZh: string;
    image: string;
    features: { titleEn: string; titleZh: string; descEn: string; descZh: string }[];
  };
  testimonials: { name: string; locationEn: string; locationZh: string; textEn: string; textZh: string }[];
  commitment: {
    images: string[];
    stats: { num: string; labelEn: string; labelZh: string }[];
  };
  bestsellers: {
    labelEn: string; labelZh: string;
    titleEn: string; titleZh: string;
    productIds: string[];
  };
}

export const defaultHomepageSections: HomepageSections = {
  features: [
    { titleEn: "Ethical Stones", titleZh: "道德宝石", descEn: "Conflict-free moissanite and certified lab-grown diamonds.", descZh: "无冲突莫桑石和认证培育钻石。" },
    { titleEn: "Custom Design", titleZh: "定制设计", descEn: "Personalize every detail from stone to metal to engraving.", descZh: "从宝石到金属到刻字，个性化每一个细节。" },
    { titleEn: "Master Craftsmanship", titleZh: "大师工艺", descEn: "Hand-finished by artisans with decades of experience.", descZh: "由拥有数十年经验的工匠手工完成。" },
    { titleEn: "Global Delivery", titleZh: "全球配送", descEn: "Insured shipping worldwide with elegant gift packaging.", descZh: "带优雅礼品包装的保险全球配送。" },
  ],
  shopByShape: [
    { nameEn: "Round", nameZh: "圆形", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop" },
    { nameEn: "Oval", nameZh: "椭圆形", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop" },
    { nameEn: "Radiant", nameZh: "雷迪恩", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop" },
    { nameEn: "Pear", nameZh: "梨形", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
    { nameEn: "Emerald", nameZh: "祖母绿", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop" },
    { nameEn: "Cushion", nameZh: "枕形", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop" },
  ],
  promos: [
    { discountEn: "30% OFF", discountZh: "7折", labelEn: "Lab Diamonds", labelZh: "培育钻石", href: "/products/?tier=lab", bg: "bg-stone" },
    { discountEn: "20% OFF", discountZh: "8折", labelEn: "Engagement Rings", labelZh: "订婚戒指", href: "/products/?tier=moissanite", bg: "bg-cream-dark" },
    { discountEn: "15% OFF", discountZh: "85折", labelEn: "Wedding Bands", labelZh: "结婚对戒", href: "/products/", bg: "bg-stone" },
    { discountEn: "FREE", discountZh: "免费", labelEn: "Engraving", labelZh: "刻字", href: "/customize/", bg: "bg-cream-dark" },
  ],
  promoCode: "Check Out With Code: DIAMOND30",
  ringBuilderCTA: {
    titleEn: "Ring",
    titleZh: "定制戒指",
    descEn: "Choose a unique ring setting and then select the perfect central stone — or vice versa! It is really up to you!",
    descZh: "选择独特的戒指镶嵌方式，然后挑选完美的主石——或者反过来！一切由您决定！",
    btn1En: "START WITH A SETTING",
    btn1Zh: "从镶嵌开始",
    btn2En: "START WITH A DIAMOND",
    btn2Zh: "从钻石开始",
    quizEn: "Take Our Quiz",
    quizZh: "参加测试",
    quizDescEn: "Can not decide? ",
    quizDescZh: "无法决定？",
    quizDesc2En: " find what you are looking for in 2 minutes",
    quizDesc2Zh: " 2 分钟内找到您想要的",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
  },
  craftingMemories: {
    steps: [
      { titleEn: "DESIGN", titleZh: "DESIGN", descEn: "Share your vision with our designers. We create detailed sketches and 3D previews tailored to your preferences and budget.", descZh: "与我们的设计师分享您的愿景。我们根据您的喜好和预算创建详细的草图和3D预览。", image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&h=600&fit=crop" },
      { titleEn: "CRAFT", titleZh: "CRAFT", descEn: "Master artisans handcraft your piece using traditional techniques and modern precision. Every stone is carefully set by hand.", descZh: "大师工匠使用传统技术和现代精度手工制作您的作品。每颗宝石都精心手工镶嵌。", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop" },
      { titleEn: "ENJOY", titleZh: "ENJOY", descEn: "Your jewelry arrives in premium packaging, ready to become part of your most cherished moments. A symbol that lasts forever.", descZh: "您的珠宝以高级包装送达，准备成为您最珍贵时刻的一部分。一个永恒的象征。", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop" },
    ],
  },
  technologySection: {
    labelEn: "Try Our Tech",
    labelZh: "体验我们的科技",
    titleEn: "Design the Future\nof Jewelry",
    titleZh: "设计珠宝的未来",
    descEn: "Anyhave merges cutting-edge technology with timeless craftsmanship. Our digital tools let you co-create your piece, while our master artisans bring it to life with decades of expertise.",
    descZh: "Anyhave 将尖端科技与传统工艺完美融合。我们的数字工具让您共同参与创作，而我们的大师工匠则以数十年的专业技艺将其变为现实。",
    badgeEn: "TECHNOLOGY MEETS ART",
    badgeZh: "科技遇见艺术",
    btnEn: "EXPLORE CUSTOMIZATION",
    btnZh: "探索定制",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=1000&fit=crop",
    features: [
      { titleEn: "AI-Powered Design", titleZh: "AI 驱动设计", descEn: "Our intelligent system helps you visualize combinations in real time. Mix stones, metals, and settings with instant feedback.", descZh: "我们的智能系统帮助您实时可视化组合效果。即时反馈地混搭宝石、金属和镶嵌方式。" },
      { titleEn: "True-to-Life Preview", titleZh: "逼真预览", descEn: "See exactly how your ring will look before it is crafted. Accurate proportions, realistic sparkle, and true colors.", descZh: "在制作前精确看到戒指的效果。准确的比例、逼真的闪耀和真实的色彩。" },
      { titleEn: "Precision Crafting", titleZh: "精密工艺", descEn: "Every design is translated into a master craftsman's blueprint. Technology guides the hand, tradition guides the heart.", descZh: "每个设计都被转化为大师工匠的蓝图。技术引导双手，传统引导心灵。" },
    ],
  },
  testimonials: [
    { name: "Sarah & James", locationEn: "New York", locationZh: "纽约", textEn: "The moissanite engagement ring exceeded all expectations. The fire and brilliance are incredible, and knowing it is ethically sourced makes it even more special.", textZh: "莫桑石订婚戒指超出了所有期望。火彩和亮度令人难以置信，知道它是符合道德来源的让它更加特别。" },
    { name: "Emily R.", locationEn: "London", locationZh: "伦敦", textEn: "I customized a lab-grown diamond necklace for my anniversary. The design process was seamless, and the final piece is absolutely stunning. Worth every penny.", textZh: "我为周年纪念定制了一条培育钻石项链。设计过程非常顺畅，最终作品绝对惊艳。物超所值。" },
    { name: "Michael T.", locationEn: "Sydney", locationZh: "悉尼", textEn: "Proposed with a three-stone ring from Anyhave. My fiancee was blown away by the quality and the personal engraving. Truly a one-of-a-kind piece.", textZh: "用Anyhave的三石戒指向女友求婚。她对品质和个性化刻字印象深刻。真正独一无二的作品。" },
  ],
  commitment: {
    images: [
      "/images/jewelry/ring-100.png",
      "/images/jewelry/ring-150.png",
      "/images/jewelry/ring-140.png",
    ],
    stats: [
      { num: "IGI", labelEn: "Certified Lab Diamonds", labelZh: "认证培育钻石" },
      { num: "VVS1+", labelEn: "Stone Clarity Grade", labelZh: "宝石净度等级" },
      { num: "18K/14K", labelEn: "Pure Gold Alloys", labelZh: "纯金合金" },
      { num: "Lifetime", labelEn: "Cleaning & Inspection", labelZh: "清洁与检查" },
    ],
  },
  bestsellers: {
    labelEn: "Best Selling",
    labelZh: "热销推荐",
    titleEn: "DIAMAURA'S BEST SELLING",
    titleZh: "DIAMAURA 热销产品",
    productIds: ["any-jw-001", "any-jw-002", "any-jw-003", "any-jw-004", "any-jw-005", "any-jw-006"],
  },
};

export function getHomepageSections(): HomepageSections {
  if (typeof window === "undefined") return defaultHomepageSections;
  try {
    const raw = localStorage.getItem(HOMEPAGE_KEY);
    if (!raw) return defaultHomepageSections;
    const parsed = JSON.parse(raw) as Partial<HomepageSections>;
    // Deep merge for nested arrays and objects
    const merged = deepMerge(
      defaultHomepageSections as unknown as Record<string, unknown>,
      parsed as unknown as Record<string, unknown>
    );
    return merged as unknown as HomepageSections;
  } catch {
    return defaultHomepageSections;
  }
}

export function saveHomepageSections(sections: HomepageSections) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HOMEPAGE_KEY, JSON.stringify(sections));
  broadcastSync(HOMEPAGE_KEY);
}

// ==================== About Content ====================
const ABOUT_KEY = ADMIN_KEYS.aboutContent;

export interface AboutContent {
  storyDescEn: string;
  storyDescZh: string;
  howItStartedP1En: string;
  howItStartedP1Zh: string;
  howItStartedP2En: string;
  howItStartedP2Zh: string;
  howItStartedP3En: string;
  howItStartedP3Zh: string;
  stats: { num: string; labelEn: string; labelZh: string }[];
  collections: { titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string; descEn: string; descZh: string; image: string }[];
  processSteps: { titleEn: string; titleZh: string; descEn: string; descZh: string }[];
  sustainabilityP1En: string;
  sustainabilityP1Zh: string;
  sustainabilityP2En: string;
  sustainabilityP2Zh: string;
  sustainabilityP3En: string;
  sustainabilityP3Zh: string;
  sustainabilityImage: string;
  values: { titleEn: string; titleZh: string; descEn: string; descZh: string }[];
  ctaTitleEn: string;
  ctaTitleZh: string;
  ctaDescEn: string;
  ctaDescZh: string;
  ctaDesignEn: string;
  ctaDesignZh: string;
  ctaExploreEn: string;
  ctaExploreZh: string;
  originImage: string;
}

export const defaultAboutContent: AboutContent = {
  storyDescEn: "Anyhave was born in the jewelry district of Fuzhou, China — a city with over 200 years of jewelry-making heritage. We are not a retailer. We are a workshop that opened its doors to the world. By combining traditional hand-setting techniques with modern 3D visualization and digital supply chain management, we bridge the gap between bespoke craftsmanship and everyday wearability.",
  storyDescZh: "Anyhave诞生于中国福州珠宝产业带——一座拥有200多年珠宝制作历史的城市。我们不是零售商，而是向世界敞开大门的工坊。通过将传统手工镶嵌技艺与现代3D可视化及数字化供应链管理相结合，我们架起了定制工艺与日常佩戴之间的桥梁。",
  howItStartedP1En: "We started with a workshop, not a brand. For over a decade, our team of craftsmen perfected one thing: making exceptional jewelry accessible. No distributors. No wholesale markups. No retail middlemen. Just the actual cost of materials and artisan labor, plus a margin that sustains our team.",
  howItStartedP1Zh: "我们从一个工坊起步，而非一个品牌。十多年来，我们的工匠团队只专注于一件事：让卓越的珠宝触手可及。没有分销商，没有批发加价，没有零售中间商。只有材料和工匠劳动的实际成本，加上维持团队的合理利润。",
  howItStartedP2En: "Our workshop runs on amoeba management — every production cell operates as an independent profit center. Material waste and labor costs are tracked per piece. This transparency is what allows us to offer customization at prices mass-produced brands cannot match. Monthly output reaches 500,000 pieces for silver/copper lines and 150,000 for high-grade moissanite micro-pave.",
  howItStartedP2Zh: "我们的工坊采用阿米巴经营管理——每个生产单元都作为独立的利润中心运作。材料损耗和人工成本按件追踪。正是这种透明度使我们能够以大规模生产品牌无法匹敌的价格提供定制服务。银饰/铜饰月产能达50万件，高定级莫桑石微镶月产能达15万件。",
  howItStartedP3En: "Today, our mission is unchanged: to create jewelry that tells your story while honoring the hands that made it. Every piece passes three separate human inspections — surface flaw check, stone security test, and dimensional verification — before it ever reaches you.",
  howItStartedP3Zh: "今天，我们的使命始终未变：创造讲述您故事的珠宝，同时尊重制作它的双手。每件作品在送达您手中之前，都必须通过三道独立的人工质检——表面瑕疵检查、宝石牢固度测试和尺寸核准。",
  stats: [
    { num: "10+", labelEn: "Years of Craft", labelZh: "工艺年限" },
    { num: "500K+", labelEn: "Monthly Output", labelZh: "月产量" },
    { num: "35+", labelEn: "Master Artisans", labelZh: "大师工匠" },
    { num: "3-Stage", labelEn: "QC Inspection", labelZh: "质检流程" },
  ],
  collections: [
    { titleEn: "Engagement Rings", titleZh: "订婚戒指", subtitleEn: "Symbols of Forever", subtitleZh: "永恒的象征", descEn: "From classic solitaires to vintage halos, each engagement ring is crafted to capture the uniqueness of your love story. D-color VVS1 moissanite with GRA certification.", descZh: "从经典独钻到复古光环，每枚订婚戒指都旨在捕捉您独特爱情故事的光芒。D色VVS1莫桑石，附GRA证书。", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop" },
    { titleEn: "Wedding Bands", titleZh: "结婚对戒", subtitleEn: "Eternal Commitment", subtitleZh: "永恒的承诺", descEn: "Simple, elegant bands in 925 sterling silver with genuine 18K gold plating. Available in various widths and finishes to match your personal style.", descZh: "925纯银搭配真金18K电镀的简约优雅对戒。提供多种宽度和饰面，以匹配您的个人风格。", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop" },
    { titleEn: "Necklaces & Pendants", titleZh: "项链与吊坠", subtitleEn: "Timeless Elegance", subtitleZh: "永恒优雅", descEn: "Delicate solitaires, bold statement pieces, and everything in between. Each pendant designed to catch the light and admiration.", descZh: "精致的独钻到大胆的宣言作品。每款吊坠都旨在捕捉光芒和赞赏。", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop" },
  ],
  processSteps: [
    { titleEn: "3D CAD Modeling (24-48h)", titleZh: "3D建模（24-48小时）", descEn: "Receive your design sketch or concept. Our structural engineers build a precision 3D CAD model and provide a dynamic preview. Adjust stone size, metal weight, or setting style until it is exactly right.", descZh: "接收您的设计草图或概念。我们的结构工程师构建精密3D CAD模型并提供动态预览。调整宝石尺寸、金属重量或镶嵌样式，直到完全满意。" },
    { titleEn: "Wax Printing & Casting", titleZh: "蜡模打印与铸造", descEn: "High-resolution resin printers create wax molds with micron-level accuracy. Strict alloy melting point control and lost-wax casting eliminate sand holes and oxidation in 925 silver and premium copper.", descZh: "高分辨率树脂打印机以微米级精度创建蜡模。严格的合金熔点控制和失蜡铸造工艺杜绝925银和高品质铜材的沙眼与氧化问题。" },
    { titleEn: "Hand-Polishing & Micro-Setting", titleZh: "手工抛光与微镶", descEn: "Artisans with 10+ years of experience hand-finish every piece under a 40x microscope. Micro-pave setting ensures moissanite stability and maximizes refractive brilliance.", descZh: "拥有10年以上经验的匠人在40倍显微镜下手工精修每件作品。微镶工艺确保莫桑石的稳固性并最大化折射光泽。" },
    { titleEn: "Eco-Plating & 3-Stage QC", titleZh: "环保电镀与三道质检", descEn: "Multi-layer 18K gold / rose gold / rhodium electroplating with anti-oxidation protective film. Every piece passes three inspections: surface scratch check, stone security test, and caliper dimensional verification.", descZh: "多层18K金/玫瑰金/铑电镀，配合抗氧化保护膜。每件作品通过三道检验：表面划痕检查、宝石牢固度测试、卡尺尺寸核准。" },
    { titleEn: "Packaging", titleZh: "包装", descEn: "Your jewelry arrives in a premium gift box with certificate of authenticity, care guide, and polishing cloth.", descZh: "您的珠宝以高级礼盒送达，内含真伪证书、保养指南和抛光布。" },
    { titleEn: "Global Delivery", titleZh: "全球配送", descEn: "Insured global shipping with tracking. Integrated international ERP provides end-to-end visibility from Fuzhou to North America, Europe, and the Middle East.", descZh: "带追踪的投保全球配送。集成的国际ERP系统提供从福州到北美、欧洲和中东的端到端可视化物流追踪。" },
  ],
  sustainabilityP1En: "We believe beautiful jewelry should not come at the cost of the planet or human rights. Our eco-plating process complies with EU REACH standards — no lead, no nickel, no cadmium. The anti-oxidation protective film ensures lasting color retention.",
  sustainabilityP1Zh: "我们相信美丽的珠宝不应以地球或人权为代价。我们的环保电镀工艺符合欧盟REACH标准——无铅、无镍、无镉。抗氧化保护膜确保持久保色。",
  sustainabilityP2En: "Our moissanite and lab-grown diamonds eliminate the need for mining, reducing environmental impact while offering identical beauty. We use only D-color VVS1 stones cut with Belgian precision techniques — each passes a standard diamond tester and supports GRA certificate issuance.",
  sustainabilityP2Zh: "我们的莫桑石和培育钻石消除了采矿需求，在提供同等美丽的同时减少环境影响。我们只使用D色VVS1级宝石，采用比利时精密切割工艺——每颗都能通过标准测钻笔检测，并支持出具GRA证书。",
  sustainabilityP3En: "Every shipment uses minimal, recyclable packaging. Our amoeba profit accounting model tracks material waste per piece, driving continuous reduction. Our goal is simple: stunning jewelry, minimal footprint.",
  sustainabilityP3Zh: "每次发货使用最少、可回收的包装。我们的阿米巴利润核算模型按件追踪材料损耗，推动持续降低。我们的目标很简单：惊艳的珠宝，最小的足迹。",
  sustainabilityImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop",
  values: [
    { titleEn: "Precision Craftsmanship", titleZh: "精密工艺", descEn: "Every setting, every polish, every detail is executed with the utmost care. Under a 40x microscope, our artisans ensure tighter prongs, straighter rows, and more fire.", descZh: "每一个镶嵌、每一次抛光、每一个细节都以 utmost care 执行。在40倍显微镜下，我们的匠人确保更紧的镶爪、更直的排列和更璀璨的火彩。" },
    { titleEn: "Transparent Pricing", titleZh: "透明定价", descEn: "We own the workshop. No distributors, no wholesale markups, no retail middlemen. Amoeba profit accounting tracks every cost per piece. You pay for the piece, not the shelf it sits on.", descZh: "我们拥有工坊。没有分销商，没有批发加价，没有零售中间商。阿米巴利润核算按件追踪每一项成本。您为作品付费，而非它摆放的货架。" },
    { titleEn: "Digital Supply Chain", titleZh: "数字化供应链", descEn: "Full-stack digitalization from 3D asset library to production scheduling to quality control. Real-time order tracking from Fuzhou to your door.", descZh: "从3D资产库到生产排期再到质量控制的全栈数字化。从福州到您家门口的实时订单追踪。" },
    { titleEn: "Conscious Production", titleZh: "有意识的生产", descEn: "EU REACH compliant plating. Conflict-free stones. Recycled metals. Three-stage human inspection. Because trust is earned, not claimed.", descZh: "符合欧盟REACH标准的电镀。无冲突宝石。回收金属。三道人工质检。因为信任是赢得的，而非宣称的。" },
  ],
  ctaTitleEn: "Your Story Deserves a Beautiful Symbol",
  ctaTitleZh: "您的故事值得一个美丽的象征",
  ctaDescEn: "Whether you are proposing, celebrating an anniversary, or treating yourself — we are here to craft something extraordinary. From sketch to shipment in as little as 14 days.",
  ctaDescZh: "无论您是求婚、庆祝周年纪念，还是犒劳自己——我们都能为您打造非凡之作。从草图到发货，最快仅需14天。",
  ctaDesignEn: "START YOUR DESIGN",
  ctaDesignZh: "开始您的设计",
  ctaExploreEn: "EXPLORE COLLECTION",
  ctaExploreZh: "浏览系列",
  originImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop",
};

export function getAboutContent(): AboutContent {
  if (typeof window === "undefined") return defaultAboutContent;
  try {
    const raw = localStorage.getItem(ABOUT_KEY);
    if (!raw) return defaultAboutContent;
    const parsed = JSON.parse(raw) as Partial<AboutContent>;
    const merged = deepMerge(
      defaultAboutContent as unknown as Record<string, unknown>,
      parsed as unknown as Record<string, unknown>
    );
    return merged as unknown as AboutContent;
  } catch {
    return defaultAboutContent;
  }
}

export function saveAboutContent(content: AboutContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ABOUT_KEY, JSON.stringify(content));
  broadcastSync(ABOUT_KEY);
}

// ==================== Contact Content ====================
const CONTACT_KEY = ADMIN_KEYS.contactContent;

export interface ContactContent {
  studio: string;
  email: string;
  phone: string;
  hours: string;
  image: string;
}

export const defaultContactContent: ContactContent = {
  studio: "Shenzhen, China",
  email: "hello@anyhavejewelry.com",
  phone: "+86 755 8888 9999",
  hours: "Mon-Fri 9:00-18:00 CST",
  image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop",
};

export function getContactContent(): ContactContent {
  if (typeof window === "undefined") return defaultContactContent;
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (!raw) return defaultContactContent;
    const parsed = JSON.parse(raw) as Partial<ContactContent>;
    return { ...defaultContactContent, ...parsed };
  } catch {
    return defaultContactContent;
  }
}

export function saveContactContent(content: ContactContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONTACT_KEY, JSON.stringify(content));
  broadcastSync(CONTACT_KEY);
}

// ==================== Customize Content ====================
const CUSTOMIZE_KEY = ADMIN_KEYS.customizeContent;

export interface RingStyleItem {
  id: string;
  labelEn: string;
  labelZh: string;
  image: string;
  price: number;
}

export interface StoneItem {
  id: string;
  nameEn: string;
  nameZh: string;
  price: number;
  color: string;
  type: "moissanite" | "lab";
  image: string;
}

export interface MetalItem {
  id: string;
  nameEn: string;
  nameZh: string;
  price: number;
  color: string;
}

export interface PaymentMethodItem {
  id: string;
  label: string;
  icon: string;
}

export interface CustomizeContent {
  heroImage: string;
  heroBadgeEn: string;
  heroBadgeZh: string;
  configuratorImage: string;
  livePreviewBadgeEn: string;
  livePreviewBadgeZh: string;
  virtualPreviewImage: string;
  ringStyles: RingStyleItem[];
  stones: StoneItem[];
  metals: MetalItem[];
  basePrices: Record<string, number>;
  paymentMethods: PaymentMethodItem[];
}

export const defaultCustomizeContent: CustomizeContent = {
  heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=900&fit=crop",
  heroBadgeEn: "AI-Powered Design",
  heroBadgeZh: "AI 驱动设计",
  configuratorImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop",
  livePreviewBadgeEn: "LIVE PREVIEW",
  livePreviewBadgeZh: "实时预览",
  virtualPreviewImage: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=1200&h=900&fit=crop",
  ringStyles: [
    { id: "solitaire", labelEn: "Solitaire", labelZh: "独钻", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop", price: 0 },
    { id: "halo", labelEn: "Halo", labelZh: "光环", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop", price: 800 },
    { id: "threestone", labelEn: "Three-Stone", labelZh: "三石", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop", price: 1200 },
    { id: "vintage", labelEn: "Vintage", labelZh: "复古", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=600&fit=crop", price: 1500 },
  ],
  stones: [
    { id: "round-moissanite", nameEn: "Round Brilliant Moissanite", nameZh: "圆形明亮式莫桑石", price: 2980, color: "#e8e0d0", type: "moissanite", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop" },
    { id: "cushion-moissanite", nameEn: "Cushion Cut Moissanite", nameZh: "枕形切割莫桑石", price: 3280, color: "#d4c4a8", type: "moissanite", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop" },
    { id: "round-lab", nameEn: "Round Lab-Grown Diamond", nameZh: "圆形培育钻石", price: 5680, color: "#f0f0f0", type: "lab", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop" },
    { id: "oval-lab", nameEn: "Oval Lab-Grown Diamond", nameZh: "椭圆形培育钻石", price: 6280, color: "#e8d8e0", type: "lab", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop" },
  ],
  metals: [
    { id: "14k-white", nameEn: "14K White Gold", nameZh: "14K白金", price: 0, color: "#e0e0e0" },
    { id: "14k-yellow", nameEn: "14K Yellow Gold", nameZh: "14K黄金", price: 0, color: "#d4af37" },
    { id: "14k-rose", nameEn: "14K Rose Gold", nameZh: "14K玫瑰金", price: 0, color: "#e8b4b8" },
    { id: "18k-white", nameEn: "18K White Gold", nameZh: "18K白金", price: 800, color: "#d8d8d8" },
    { id: "platinum", nameEn: "Platinum", nameZh: "铂金", price: 1500, color: "#c0c0c0" },
  ],
  basePrices: {
    solitaire: 1200,
    halo: 1800,
    threestone: 2200,
    vintage: 2000,
    pave: 1600,
  },
  paymentMethods: [
    { id: "alipay", label: "Alipay", icon: "A" },
    { id: "wechat", label: "WeChat Pay", icon: "W" },
    { id: "card", label: "Credit Card", icon: "C" },
  ],
};

export function getCustomizeContent(): CustomizeContent {
  if (typeof window === "undefined") return defaultCustomizeContent;
  try {
    const raw = localStorage.getItem(CUSTOMIZE_KEY);
    if (!raw) return defaultCustomizeContent;
    const parsed = JSON.parse(raw) as Partial<CustomizeContent>;
    const merged = deepMerge(
      defaultCustomizeContent as unknown as Record<string, unknown>,
      parsed as unknown as Record<string, unknown>
    );
    return merged as unknown as CustomizeContent;
  } catch {
    return defaultCustomizeContent;
  }
}

export function saveCustomizeContent(content: CustomizeContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOMIZE_KEY, JSON.stringify(content));
  broadcastSync(CUSTOMIZE_KEY);
}

// ==================== Admin Translations ====================
const TRANSLATIONS_KEY = ADMIN_KEYS.translations;

import type { Translations } from "./i18n/translations";

export function getAdminTranslations(defaultTranslations: Translations): Translations {
  if (typeof window === "undefined") return defaultTranslations;
  try {
    const raw = localStorage.getItem(TRANSLATIONS_KEY);
    if (!raw) return defaultTranslations;
    const parsed = JSON.parse(raw) as Partial<Translations>;
    return deepMerge(
      defaultTranslations as unknown as Record<string, unknown>,
      parsed as unknown as Record<string, unknown>
    ) as unknown as Translations;
  } catch {
    return defaultTranslations;
  }
}

export function saveAdminTranslations(translations: Translations) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TRANSLATIONS_KEY, JSON.stringify(translations));
  broadcastSync(TRANSLATIONS_KEY);
}

export function resetAdminTranslations() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TRANSLATIONS_KEY);
  broadcastSync(TRANSLATIONS_KEY);
}

// ==================== Gemstone Comparison ====================
const COMPARISON_KEY = ADMIN_KEYS.comparison;

export interface ComparisonRow {
  label: string;
  moissanite: string;
  lab: string;
  natural: string;
}

export interface ComparisonBadge {
  name: string;
  descriptionEn: string;
  descriptionZh: string;
}

export interface ComparisonData {
  labelEn: string;
  labelZh: string;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  rows: ComparisonRow[];
  badges: ComparisonBadge[];
  footerTextEn: string;
  footerTextZh: string;
}

export const defaultComparisonData: ComparisonData = {
  labelEn: "Expert Comparison",
  labelZh: "专业对比",
  titleEn: "Moissanite vs. Lab-Grown vs. Natural Diamond",
  titleZh: "莫桑石 vs. 培育钻石 vs. 天然钻石",
  subtitleEn: "An objective, data-driven comparison to help you make an informed decision. All metrics verified by independent gemological institutes.",
  subtitleZh: "客观、数据驱动的对比，帮助您做出明智决定。所有指标均经过独立宝石学机构验证。",
  rows: [
    { label: "Brilliance (Refractive Index)", moissanite: "2.65 (Highest)", lab: "2.42", natural: "2.42" },
    { label: "Fire (Dispersion)", moissanite: "0.104 (2.4x diamond)", lab: "0.044", natural: "0.044" },
    { label: "Hardness (Mohs Scale)", moissanite: "9.25", lab: "10", natural: "10" },
    { label: "Conflict Free", moissanite: "Yes", lab: "Yes", natural: "No" },
    { label: "Environmentally Friendly", moissanite: "Yes", lab: "Yes", natural: "No" },
    { label: "Certification", moissanite: "IGI / GRA", lab: "IGI / GIA", natural: "GIA / IGI" },
    { label: "Color Range", moissanite: "D-E (Colorless)", lab: "D-F (Colorless)", natural: "D-Z (Varies)" },
    { label: "Availability", moissanite: "Unlimited", lab: "Unlimited", natural: "Limited / Rare" },
    { label: "Resale Value", moissanite: "Moderate", lab: "Growing", natural: "High (traditionally)" },
  ],
  badges: [
    { name: "IGI", descriptionEn: "International Gemological Institute — independent certification for lab-grown diamonds and moissanite.", descriptionZh: "国际宝石学院——为培育钻石和莫桑石提供独立认证。" },
    { name: "GIA", descriptionEn: "Gemological Institute of America — the world's foremost authority on diamond grading.", descriptionZh: "美国宝石学院——全球钻石分级最权威的机构。" },
    { name: "GRA", descriptionEn: "Gem Research Academy — specialized certification for moissanite quality and authenticity.", descriptionZh: "宝石研究院——专注于莫桑石品质与真伪认证。" },
  ],
  footerTextEn: "Data source: IGI, GIA, GRA certification standards (2025)",
  footerTextZh: "数据来源：IGI、GIA、GRA 认证标准 (2025)",
};

export function getComparisonData(): ComparisonData {
  if (typeof window === "undefined") return defaultComparisonData;
  try {
    const raw = localStorage.getItem(COMPARISON_KEY);
    if (!raw) return defaultComparisonData;
    const parsed = JSON.parse(raw) as Partial<ComparisonData>;
    const merged = deepMerge(
      defaultComparisonData as unknown as Record<string, unknown>,
      parsed as unknown as Record<string, unknown>
    );
    return merged as unknown as ComparisonData;
  } catch {
    return defaultComparisonData;
  }
}

export function saveComparisonData(data: ComparisonData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMPARISON_KEY, JSON.stringify(data));
  broadcastSync(COMPARISON_KEY);
}

// ==================== Collections Content ====================
const COLLECTIONS_KEY = ADMIN_KEYS.pageContent + "::collections";

export interface AdminCollection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  productCount: number;
  tag: string;
  productSlugs: string[];
}

export const defaultAdminCollections: AdminCollection[] = [
  {
    slug: "engagement",
    title: "Say Yes Forever",
    subtitle: "Engagement Collection",
    description: "D-color VVS1 moissanite solitaires and lab-grown diamond rings. Ethically crafted, eternally brilliant.",
    image: "/images/jewelry/ring-120.png",
    productCount: 9,
    tag: "Bestseller",
    productSlugs: [
      "round-brilliant-moissanite-ring",
      "oval-lab-grown-diamond-ring",
      "pear-cut-moissanite-ring",
      "pear-lab-grown-diamond-ring",
      "emerald-cut-moissanite-ring",
      "cushion-cut-lab-diamond-ring",
      "princess-cut-moissanite-ring",
      "oval-lab-diamond-statement-ring",
      "cushion-moissanite-engagement-ring",
    ],
  },
  {
    slug: "moissanite",
    title: "Moissanite Collection",
    subtitle: "Fire & Brilliance",
    description: "Exceptional moissanite rings in round, pear, emerald, princess, and cushion cuts. Unmatched sparkle at extraordinary value.",
    image: "/images/jewelry/ring-100.png",
    productCount: 5,
    tag: "Popular",
    productSlugs: [
      "round-brilliant-moissanite-ring",
      "pear-cut-moissanite-ring",
      "emerald-cut-moissanite-ring",
      "princess-cut-moissanite-ring",
      "cushion-moissanite-engagement-ring",
    ],
  },
  {
    slug: "lab-grown",
    title: "Lab-Grown Diamonds",
    subtitle: "Ethical Luxury",
    description: "IGI-certified lab-grown diamonds identical to mined diamonds. Oval, pear, and cushion cuts in gold and platinum.",
    image: "/images/jewelry/ring-150.png",
    productCount: 4,
    tag: "New",
    productSlugs: [
      "oval-lab-grown-diamond-ring",
      "pear-lab-grown-diamond-ring",
      "cushion-cut-lab-diamond-ring",
      "oval-lab-diamond-statement-ring",
    ],
  },
];

export function getAdminCollections(): AdminCollection[] {
  if (typeof window === "undefined") return defaultAdminCollections;
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    if (!raw) return defaultAdminCollections;
    const parsed = JSON.parse(raw) as AdminCollection[];
    return parsed.length > 0 ? parsed : defaultAdminCollections;
  } catch {
    return defaultAdminCollections;
  }
}

export function saveAdminCollections(collections: AdminCollection[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  broadcastSync(COLLECTIONS_KEY);
}

// ==================== Catalog Content ====================
const CATALOG_KEY = ADMIN_KEYS.pageContent + "::catalog";

export interface AdminCatalogPage {
  id: number;
  leftImage: string;
  leftTitle: string;
  leftSubtitle: string;
  leftProducts: { name: string; slug: string; price: string }[];
  rightImage: string;
  rightTitle: string;
  rightSubtitle: string;
  rightProducts?: { name: string; slug: string; price: string }[];
  promoText?: string;
  promoColor?: string;
}

export const defaultAdminCatalog: AdminCatalogPage[] = [
  {
    id: 1,
    leftImage: "/images/jewelry/ring-120.png",
    leftTitle: "Engagement Collection",
    leftSubtitle: "Say Yes Forever",
    leftProducts: [
      { name: "Round Brilliant Solitaire", slug: "round-brilliant-moissanite-ring", price: "$2,980" },
      { name: "Oval Lab Diamond Ring", slug: "oval-lab-grown-diamond-ring", price: "$5,280" },
    ],
    rightImage: "/images/jewelry/ring-150.png",
    rightTitle: "Pear Cut Moissanite",
    rightSubtitle: "1.5ct Teardrop Elegance",
    promoText: "BESTSELLER",
    promoColor: "bg-amber-700",
  },
  {
    id: 2,
    leftImage: "/images/jewelry/ring-100.png",
    leftTitle: "Moissanite Collection",
    leftSubtitle: "Fire & Brilliance",
    leftProducts: [
      { name: "Pear Cut Moissanite", slug: "pear-cut-moissanite-ring", price: "$4,280" },
      { name: "Emerald Cut Moissanite", slug: "emerald-cut-moissanite-ring", price: "$5,680" },
    ],
    rightImage: "/images/jewelry/ring-105.png",
    rightTitle: "Princess Cut Moissanite",
    rightSubtitle: "Modern Geometric Beauty",
    rightProducts: [
      { name: "Princess Cut Ring", slug: "princess-cut-moissanite-ring", price: "$3,680" },
      { name: "Cushion Engagement Ring", slug: "cushion-moissanite-engagement-ring", price: "$4,580" },
    ],
  },
  {
    id: 3,
    leftImage: "/images/jewelry/ring-108.png",
    leftTitle: "Lab-Grown Diamonds",
    leftSubtitle: "Ethical Luxury",
    leftProducts: [
      { name: "Cushion Lab Diamond", slug: "cushion-cut-lab-diamond-ring", price: "$6,280" },
      { name: "Pear Lab Diamond", slug: "pear-lab-grown-diamond-ring", price: "$6,880" },
    ],
    rightImage: "/images/jewelry/ring-154.png",
    rightTitle: "Oval Statement Ring",
    rightSubtitle: "2.5ct Platinum",
    promoText: "NEW",
    promoColor: "bg-champagne",
  },
];

export function getAdminCatalog(): AdminCatalogPage[] {
  if (typeof window === "undefined") return defaultAdminCatalog;
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    if (!raw) return defaultAdminCatalog;
    const parsed = JSON.parse(raw) as AdminCatalogPage[];
    return parsed.length > 0 ? parsed : defaultAdminCatalog;
  } catch {
    return defaultAdminCatalog;
  }
}

export function saveAdminCatalog(pages: AdminCatalogPage[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CATALOG_KEY, JSON.stringify(pages));
  broadcastSync(CATALOG_KEY);
}
