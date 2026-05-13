export interface Product {
  id: string;
  slug: string;
  name: string;
  tier: "moissanite" | "lab";
  tierLabel: string;
  price: number;
  material: string;
  description: string;
  specs: string[];
  featured?: boolean;
  image: string;
  imageSecondary?: string;
  metalOptions?: string[];
  carat?: string;
  cut?: string;
  clarity?: string;
  color?: string;
  certification?: string;
}

export const products: Product[] = [
  {
    id: "any-jw-001",
    slug: "round-brilliant-moissanite-ring",
    name: "Round Brilliant Moissanite Ring",
    tier: "moissanite",
    tierLabel: "Moissanite Collection",
    price: 2980,
    material: "18K White Gold / 1ct Moissanite",
    description:
      "A timeless solitaire featuring a brilliant 1-carat round moissanite center stone. Set in polished 18K white gold, this ring offers exceptional fire and brilliance at a fraction of the cost of a diamond. Perfect for the modern couple who values beauty and sustainability.",
    specs: ["Center Stone: 1ct Round Moissanite", "Metal: 18K White Gold", "Band Width: 2mm", "Setting: 6-Prong Solitaire"],
    featured: true,
    image: "/images/jewelry/ring-120.png",
    imageSecondary: "/images/jewelry/ring-130.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "1.00 ct",
    cut: "Round Brilliant",
    clarity: "VVS1",
    color: "D-E",
    certification: "IGI",
  },
  {
    id: "any-jw-002",
    slug: "oval-lab-grown-diamond-ring",
    name: "Oval Lab-Grown Diamond Ring",
    tier: "lab",
    tierLabel: "Lab-Grown Collection",
    price: 5280,
    material: "14K White Gold / 1.5ct Lab Diamond",
    description:
      "An elegant oval solitaire showcasing a 1.5-carat lab-grown diamond. The elongated shape creates a flattering, finger-lengthening effect. Ethically created with identical chemical composition to mined diamonds, certified by IGI.",
    specs: ["Center Stone: 1.5ct Oval Lab Diamond", "Metal: 14K White Gold", "Setting: 4-Prong Solitaire", "Certification: IGI"],
    featured: true,
    image: "/images/jewelry/ring-150.png",
    imageSecondary: "/images/jewelry/ring-148.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "1.50 ct",
    cut: "Oval",
    clarity: "VS1",
    color: "E-F",
    certification: "IGI",
  },
  {
    id: "any-jw-003",
    slug: "pear-cut-moissanite-ring",
    name: "Pear Cut Moissanite Ring",
    tier: "moissanite",
    tierLabel: "Moissanite Collection",
    price: 4280,
    material: "18K White Gold / 1.5ct Moissanite",
    description:
      "A stunning pear-cut moissanite ring that combines classic elegance with modern sophistication. The teardrop shape maximizes brilliance and creates a uniquely romantic silhouette. Crafted in 18K white gold for enduring beauty.",
    specs: ["Center Stone: 1.5ct Pear Moissanite", "Metal: 18K White Gold", "Setting: 5-Prong Solitaire", "Total Weight: 1.5ct"],
    featured: true,
    image: "/images/jewelry/ring-100.png",
    imageSecondary: "/images/jewelry/ring-110.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "1.50 ct",
    cut: "Pear",
    clarity: "VVS1",
    color: "D-E",
    certification: "IGI",
  },
  {
    id: "any-jw-004",
    slug: "pear-lab-grown-diamond-ring",
    name: "Pear Lab-Grown Diamond Ring",
    tier: "lab",
    tierLabel: "Lab-Grown Collection",
    price: 6880,
    material: "14K Rose Gold / 2ct Lab Diamond",
    description:
      "A breathtaking pear-shaped lab-grown diamond set in warm 14K rose gold. The 2-carat center stone delivers extraordinary sparkle and presence. A perfect choice for those who seek a distinctive, ethically sourced engagement ring.",
    specs: ["Center Stone: 2ct Pear Lab Diamond", "Metal: 14K Rose Gold", "Setting: 5-Prong Solitaire", "Certification: IGI"],
    featured: true,
    image: "/images/jewelry/ring-115.png",
    imageSecondary: "/images/jewelry/ring-135.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "2.00 ct",
    cut: "Pear",
    clarity: "VS1",
    color: "E-F",
    certification: "IGI",
  },
  {
    id: "any-jw-005",
    slug: "emerald-cut-moissanite-ring",
    name: "Emerald Cut Moissanite Ring",
    tier: "moissanite",
    tierLabel: "Moissanite Collection",
    price: 5680,
    material: "18K White Gold / 2ct Moissanite",
    description:
      "A sophisticated emerald-cut moissanite ring featuring clean lines and mesmerizing step-cut facets. The 2-carat stone displays a hall-of-mirrors effect that is both understated and captivating. Set in refined 18K white gold.",
    specs: ["Center Stone: 2ct Emerald Moissanite", "Metal: 18K White Gold", "Setting: 4-Prong Solitaire", "Cut: Step Cut"],
    featured: true,
    image: "/images/jewelry/ring-140.png",
    imageSecondary: "/images/jewelry/ring-159.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "2.00 ct",
    cut: "Emerald",
    clarity: "VVS1",
    color: "D-E",
    certification: "IGI",
  },
  {
    id: "any-jw-006",
    slug: "cushion-cut-lab-diamond-ring",
    name: "Cushion Cut Lab-Grown Diamond Ring",
    tier: "lab",
    tierLabel: "Lab-Grown Collection",
    price: 6280,
    material: "18K White Gold / 1.8ct Lab Diamond",
    description:
      "A romantic cushion-cut lab-grown diamond ring with softly rounded corners and brilliant facets. The 1.8-carat stone offers a perfect blend of vintage charm and modern fire. Expertly set in 18K white gold for a timeless look.",
    specs: ["Center Stone: 1.8ct Cushion Lab Diamond", "Metal: 18K White Gold", "Setting: 4-Prong Solitaire", "Certification: IGI"],
    featured: true,
    image: "/images/jewelry/ring-108.png",
    imageSecondary: "/images/jewelry/ring-160.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "1.80 ct",
    cut: "Cushion",
    clarity: "VS1",
    color: "E-F",
    certification: "IGI",
  },
  {
    id: "any-jw-007",
    slug: "princess-cut-moissanite-ring",
    name: "Princess Cut Moissanite Ring",
    tier: "moissanite",
    tierLabel: "Moissanite Collection",
    price: 3680,
    material: "18K White Gold / 1.2ct Moissanite",
    description:
      "A contemporary princess-cut moissanite ring with sharp, clean edges and extraordinary brilliance. The 1.2-carat square stone is secured in a classic four-prong setting, showcasing its modern geometric beauty in lustrous 18K white gold.",
    specs: ["Center Stone: 1.2ct Princess Moissanite", "Metal: 18K White Gold", "Setting: 4-Prong Solitaire", "Shape: Square"],
    featured: true,
    image: "/images/jewelry/ring-105.png",
    imageSecondary: "/images/jewelry/ring-141.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "1.20 ct",
    cut: "Princess",
    clarity: "VVS1",
    color: "D-E",
    certification: "IGI",
  },
  {
    id: "any-jw-008",
    slug: "oval-lab-diamond-statement-ring",
    name: "Oval Lab-Grown Diamond Statement Ring",
    tier: "lab",
    tierLabel: "Lab-Grown Collection",
    price: 7880,
    material: "Platinum / 2.5ct Lab Diamond",
    description:
      "A show-stopping oval lab-grown diamond ring featuring an impressive 2.5-carat center stone. Set in premium platinum, this statement piece delivers unmatched elegance and ethical luxury. Designed for those who demand the extraordinary.",
    specs: ["Center Stone: 2.5ct Oval Lab Diamond", "Metal: Platinum", "Setting: 4-Prong Solitaire", "Certification: IGI"],
    featured: true,
    image: "/images/jewelry/ring-154.png",
    imageSecondary: "/images/jewelry/ring-152.png",
    metalOptions: ["14K White Gold", "18K White Gold", "Platinum"],
    carat: "2.50 ct",
    cut: "Oval",
    clarity: "VS1",
    color: "E-F",
    certification: "IGI",
  },
  {
    id: "any-jw-009",
    slug: "cushion-moissanite-engagement-ring",
    name: "Cushion Moissanite Engagement Ring",
    tier: "moissanite",
    tierLabel: "Moissanite Collection",
    price: 4580,
    material: "14K White Gold / 1.8ct Moissanite",
    description:
      "A beautifully proportioned cushion-cut moissanite engagement ring with vintage-inspired charm. The 1.8-carat stone emits a soft, romantic glow with exceptional fire. Crafted in 14K white gold for a refined and durable finish.",
    specs: ["Center Stone: 1.8ct Cushion Moissanite", "Metal: 14K White Gold", "Setting: 4-Prong Solitaire", "Style: Classic"],
    featured: true,
    image: "/images/jewelry/ring-125.png",
    imageSecondary: "/images/jewelry/ring-144.png",
    metalOptions: ["14K White Gold", "14K Yellow Gold", "14K Rose Gold", "18K White Gold", "Platinum"],
    carat: "1.80 ct",
    cut: "Cushion",
    clarity: "VVS1",
    color: "D-E",
    certification: "IGI",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByTier(tier?: string): Product[] {
  if (!tier) return products;
  return products.filter((p) => p.tier === tier);
}
