export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "any-jw-001",
    author: "Sarah M.",
    rating: 5,
    date: "2025-04-02",
    content:
      "Absolutely stunning round moissanite ring! The brilliance is incredible and it sparkles even more than my friend's diamond. The 18K white gold band feels substantial and luxurious. Could not be happier with this purchase.",
  },
  {
    id: "r2",
    productId: "any-jw-001",
    author: "James L.",
    rating: 5,
    date: "2025-03-15",
    content:
      "Proposed with this ring and she said yes immediately. The classic round solitaire design is timeless and the moissanite stone catches light from every angle. Excellent craftsmanship for the price.",
  },
  {
    id: "r3",
    productId: "any-jw-002",
    author: "Emily R.",
    rating: 5,
    date: "2025-03-28",
    content:
      "The oval lab-grown diamond ring exceeded all expectations. The elongated shape is so flattering on my hand and the brilliance is unreal. IGI certificate included gave me complete confidence.",
  },
  {
    id: "r4",
    productId: "any-jw-003",
    author: "Michael T.",
    rating: 5,
    date: "2025-02-10",
    content:
      "The pear cut moissanite ring is absolutely unique. The teardrop shape is elegant and the stone has incredible fire. The 18K white gold band complements it perfectly. A beautiful symbol of our love.",
  },
  {
    id: "r5",
    productId: "any-jw-004",
    author: "Jessica K.",
    rating: 5,
    date: "2025-04-08",
    content:
      "This pear lab-grown diamond ring is breathtaking. The 2-carat stone in rose gold is exactly what I dreamed of. The setting is secure and the craftsmanship is top notch. Perfect engagement ring.",
  },
  {
    id: "r6",
    productId: "any-jw-005",
    author: "Anna W.",
    rating: 5,
    date: "2025-01-20",
    content:
      "The emerald cut moissanite ring is pure sophistication. The step-cut facets create this beautiful hall-of-mirrors effect that is so different from brilliant cuts. I love how unique and elegant it looks.",
  },
  {
    id: "r7",
    productId: "any-jw-006",
    author: "David C.",
    rating: 5,
    date: "2025-03-05",
    content:
      "Bought this cushion cut lab diamond for my wife and she is obsessed. The softly rounded corners give it such a romantic, vintage feel. The 18K white gold band is polished to perfection.",
  },
  {
    id: "r8",
    productId: "any-jw-007",
    author: "Rachel P.",
    rating: 5,
    date: "2025-02-28",
    content:
      "The princess cut moissanite ring is a work of art. The sharp edges and incredible brilliance make it so modern and striking. The four-prong setting is classic and secure. Truly a unique piece.",
  },
  {
    id: "r9",
    productId: "any-jw-008",
    author: "Sophie H.",
    rating: 5,
    date: "2025-04-12",
    content:
      "This oval statement ring is my new favorite piece. The 2.5-carat lab-grown diamond is absolutely show-stopping. Set in platinum, it feels incredibly luxurious. Wore it to a gala and received endless compliments.",
  },
  {
    id: "r10",
    productId: "any-jw-009",
    author: "Olivia N.",
    rating: 5,
    date: "2025-03-22",
    content:
      "The cushion moissanite engagement ring is gorgeous! The vintage-inspired charm with modern fire is exactly what I wanted. The 14K white gold setting is refined and durable. Packaging was beautiful too.",
  },
];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}
