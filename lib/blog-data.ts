export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "moissanite-vs-diamond-complete-guide",
    title: "Moissanite vs. Diamond: A Complete Guide",
    date: "2025-04-15",
    excerpt: "Discover why more couples are choosing moissanite for its exceptional brilliance, durability, and ethical advantages over traditional diamonds.",
    content: `
<p>When it comes to choosing a center stone for your engagement ring, the moissanite vs. diamond debate is more relevant than ever. With advancements in lab-created gemstones, moissanite has emerged as a compelling alternative that rivals — and in some ways surpasses — traditional diamonds.</p>

<h3>Brilliance and Fire</h3>
<p>Moissanite has a higher refractive index (2.65) than diamond (2.42), meaning it bends light more effectively and produces more colorful flashes of light, known as "fire." If you want a stone that sparkles intensely under any lighting condition, moissanite delivers.</p>

<h3>Durability</h3>
<p>On the Mohs hardness scale, diamonds rank at 10 (the highest), while moissanite comes in at 9.25. This makes moissanite one of the hardest substances on Earth and perfectly suitable for everyday wear. It resists scratches, chips, and cracks with exceptional resilience.</p>

<h3>Ethical and Environmental Impact</h3>
<p>Unlike mined diamonds, which can carry concerns about conflict sourcing and environmental damage, moissanite is created in controlled laboratory environments. It requires no mining, produces minimal environmental impact, and is 100% conflict-free.</p>

<h3>Value</h3>
<p>A high-quality moissanite typically costs 80-90% less than a comparable diamond. This means couples can invest in a larger, more impressive stone or allocate their budget toward a custom setting, metal upgrade, or future experiences together.</p>
    `.trim(),
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop",
    category: "Education",
    readTime: "6 min read",
  },
  {
    slug: "how-to-choose-engagement-ring",
    title: "How to Choose the Perfect Engagement Ring",
    date: "2025-03-28",
    excerpt: "From stone selection to metal choice, learn everything you need to know to find a ring they will love forever.",
    content: `
<p>Choosing an engagement ring is one of the most significant purchases you will make. With so many styles, stones, and metals to consider, the process can feel overwhelming. This guide breaks it down into manageable steps.</p>

<h3>Understand the 4Cs</h3>
<p>Cut, color, clarity, and carat weight are the universal standards for evaluating gemstones. For lab-grown diamonds and moissanite, focus especially on cut — it determines how brilliantly the stone sparkles. A well-cut stone will always outshine a poorly cut larger one.</p>

<h3>Choose the Right Metal</h3>
<p>Platinum offers unmatched durability and a naturally white sheen that never fades. 18K and 14K gold come in white, yellow, and rose variations. Rose gold has seen a surge in popularity for its warm, romantic hue. Consider your partner's existing jewelry to match their preferred tone.</p>

<h3>Select a Setting Style</h3>
<p>The solitaire is timeless and elegant. Halo settings add extra sparkle and make the center stone appear larger. Three-stone rings symbolize your past, present, and future together. Vintage-inspired designs feature intricate milgrain and filigree details for a romantic, antique feel.</p>

<h3>Get the Right Size</h3>
<p>Borrow one of their rings (from the correct finger) and have it sized at a jeweler. Alternatively, trace the inside of the ring on paper. Most rings can be resized within one or two sizes, but some elaborate designs have limitations.</p>
    `.trim(),
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop",
    category: "Buying Guide",
    readTime: "8 min read",
  },
  {
    slug: "truth-about-lab-grown-diamonds",
    title: "The Truth About Lab-Grown Diamonds",
    date: "2025-03-10",
    excerpt: "Are they real diamonds? How are they made? We answer the most common questions about this revolutionary choice.",
    content: `
<p>Lab-grown diamonds have transformed the jewelry industry, offering identical beauty to mined diamonds with none of the ethical or environmental baggage. Yet misconceptions persist. Let us separate fact from fiction.</p>

<h3>Are They Real Diamonds?</h3>
<p>Yes. Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds. They are composed of 100% carbon arranged in the same crystal structure. The only difference is their origin: one formed deep within the Earth over billions of years, the other in a high-tech facility over several weeks.</p>

<h3>How Are They Made?</h3>
<p>Two primary methods exist. High Pressure High Temperature (HPHT) mimics the natural conditions deep within the Earth. Chemical Vapor Deposition (CVD) grows diamonds from a carbon-rich gas in a vacuum chamber. Both methods produce gemstones indistinguishable from mined diamonds without specialized equipment.</p>

<h3>Do They Hold Their Value?</h3>
<p>Like mined diamonds, lab-grown diamonds are subject to market fluctuations. However, their affordability means buyers typically prioritize personal significance over investment potential. You are purchasing a symbol of love, not a stock portfolio.</p>

<h3>Certification Matters</h3>
<p>Reputable lab-grown diamonds come with certifications from IGI or GIA, the same organizations that grade mined diamonds. Always ask for certification to verify the stone's quality and authenticity.</p>
    `.trim(),
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=600&fit=crop",
    category: "Education",
    readTime: "5 min read",
  },
  {
    slug: "jewelry-care-guide",
    title: "The Complete Guide to Caring for Your Jewelry",
    date: "2025-02-20",
    excerpt: "Learn how to clean, maintain, and protect your fine jewelry so it sparkles like new for generations.",
    content: `
<p>Fine jewelry is designed to last a lifetime — but only with proper care. Whether you own moissanite, lab-grown diamonds, or precious metals, following these guidelines will keep your pieces looking their absolute best.</p>

<h3>Daily Care</h3>
<p>Remove your jewelry before swimming, showering, or applying lotions and perfumes. Chlorine, salt water, and chemicals can dull metals and damage settings over time. Store pieces separately in a soft pouch or lined jewelry box to prevent scratching.</p>

<h3>Cleaning at Home</h3>
<p>Soak your jewelry in warm water with a few drops of mild dish soap for 15-20 minutes. Gently scrub with a soft-bristled toothbrush, paying attention to the underside of stones where oils accumulate. Rinse thoroughly and pat dry with a lint-free cloth.</p>

<h3>Professional Maintenance</h3>
<p>Have your rings inspected by a professional jeweler every 6-12 months. They will check prong tightness, stone security, and metal integrity. Many jewelers offer complimentary cleaning and inspection services.</p>

<h3>Storage Tips</h3>
<p>Keep jewelry away from direct sunlight and extreme temperatures. Store necklaces hanging to prevent tangling. Place silica gel packets in your jewelry box to control moisture. Never toss jewelry loose in a drawer where pieces can scratch each other.</p>
    `.trim(),
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop",
    category: "Care Guide",
    readTime: "4 min read",
  },
  {
    slug: "understanding-4c-diamonds",
    title: "Understanding the 4Cs: A Buyer's Essential Guide",
    date: "2025-01-15",
    excerpt: "Cut, color, clarity, and carat — demystifying the four factors that determine a diamond's quality and value.",
    content: `
<p>The 4Cs — cut, color, clarity, and carat — are the universal language of diamond quality. Understanding them empowers you to make an informed purchase and find the best value for your budget.</p>

<h3>Cut: The Most Important C</h3>
<p>Cut determines how brilliantly a diamond sparkles. It refers not to the shape (round, oval, etc.) but to how well the facets interact with light. Excellent and Very Good cuts maximize brilliance, fire, and scintillation. Never compromise on cut.</p>

<h3>Color: Less Is More</h3>
<p>The diamond color scale runs from D (completely colorless) to Z (noticeable yellow or brown tint). For the best value, choose stones in the G-H range, which appear colorless to the naked eye but cost significantly less than D-F grades.</p>

<h3>Clarity: Imperfections Under the Lens</h3>
<p>Clarity measures internal inclusions and external blemishes. FL (Flawless) is the rarest, followed by VVS, VS, SI, and I grades. VS1-VS2 stones offer an excellent balance — any inclusions are microscopic and invisible without magnification.</p>

<h3>Carat: Size and Weight</h3>
<p>Carat measures weight, not size. A well-cut 0.9ct diamond can appear nearly as large as a 1.0ct stone while costing significantly less. Consider "magic sizes" strategically — slight differences below milestone weights offer hidden value.</p>
    `.trim(),
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop",
    category: "Education",
    readTime: "6 min read",
  },
  {
    slug: "engraving-ideas-for-rings",
    title: "Meaningful Engraving Ideas for Your Rings",
    date: "2024-12-28",
    excerpt: "From dates and coordinates to secret messages, discover creative ways to personalize your rings with engraving.",
    content: `
<p>Ring engraving transforms a beautiful piece of jewelry into a deeply personal treasure. With up to 20 characters typically available on the inside of a band, the challenge is not space — it is choosing something meaningful that you will cherish forever.</p>

<h3>Dates and Coordinates</h3>
<p>The date you met, your anniversary, or the coordinates of a special location (where you first kissed, got engaged, or said "I do") make timeless engravings. Coordinates are discreet and meaningful only to those who know their significance.</p>

<h3>Short Phrases</h3>
<p>"To the moon & back," "Forever & always," "My person," or "Yours" convey deep emotion in just a few words. In other languages, phrases like "Amore mio" (Italian), "Mon coeur" (French), or "Always" carry romantic weight.</p>

<h3>Symbols and Initials</h3>
<p>Infinity symbols, hearts, or interlocking initials add visual interest. Some couples choose matching halves of a phrase — one ring says "I love you," the other says "more." Together, they complete the sentiment.</p>

<h3>Inside Jokes and Secret Messages</h3>
<p>The most personal engravings reference shared memories, pet names, or inside jokes that make you smile every time you glance at your hand. These private messages make the ring uniquely yours.</p>
    `.trim(),
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop",
    category: "Inspiration",
    readTime: "5 min read",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === slug);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}
