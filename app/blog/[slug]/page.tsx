import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/data";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data";
import ProductStoryClient from "./ProductStoryClient";
import BlogArticleClient from "./BlogArticleClient";
import { BlogPostingJsonLd, BreadcrumbJsonLd, HowToJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  const productSlugs = products.map((product) => ({ slug: product.slug }));
  const blogSlugs = blogPosts.map((post) => ({ slug: post.slug }));
  return [...productSlugs, ...blogSlugs];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  // Blog post metadata
  const blogPost = getBlogPostBySlug(params.slug);
  if (blogPost) {
    return {
      title: `${blogPost.title} | Anyhave Jewelry Blog`,
      description: blogPost.excerpt,
      keywords: [
        blogPost.category,
        "moissanite",
        "lab grown diamond",
        "jewelry guide",
        "engagement ring",
        "gemstone education",
      ],
      openGraph: {
        title: blogPost.title,
        description: blogPost.excerpt,
        url: `https://anyhavejewelry.com/blog/${blogPost.slug}/`,
        siteName: "Anyhave Jewelry",
        images: [blogPost.image],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blogPost.title,
        description: blogPost.excerpt,
        images: [blogPost.image],
      },
      alternates: {
        canonical: `https://anyhavejewelry.com/blog/${blogPost.slug}/`,
      },
    };
  }

  // Product story metadata
  const product = getProductBySlug(params.slug);
  if (product) {
    const title = `The Complete Guide to ${product.name} | Anyhave Jewelry Blog`;
    return {
      title,
      description: product.description,
      keywords: [
        product.name,
        product.tier,
        product.cut || "",
        product.carat || "",
        "jewelry guide",
        "moissanite vs diamond",
        "lab grown diamond guide",
        "engagement ring buying guide",
        "how to choose engagement ring",
        "gemstone buying guide",
      ].filter(Boolean),
      openGraph: {
        title,
        description: product.description,
        url: `https://anyhavejewelry.com/blog/${product.slug}/`,
        siteName: "Anyhave Jewelry",
        images: [product.image],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: product.description,
        images: [product.image],
      },
      alternates: {
        canonical: `https://anyhavejewelry.com/blog/${product.slug}/`,
      },
    };
  }

  return {};
}

const PUBLISH_DATES: Record<string, string> = {
  "round-brilliant-moissanite-ring": "2025-11-15",
  "oval-lab-grown-diamond-ring": "2025-11-18",
  "pear-cut-moissanite-ring": "2025-11-22",
  "pear-lab-grown-diamond-ring": "2025-11-25",
  "emerald-cut-moissanite-ring": "2025-12-01",
  "cushion-cut-lab-diamond-ring": "2025-12-05",
  "princess-cut-moissanite-ring": "2025-12-10",
  "oval-lab-diamond-statement-ring": "2025-12-15",
  "cushion-moissanite-engagement-ring": "2025-12-20",
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  // Render blog article
  const blogPost = getBlogPostBySlug(params.slug);
  if (blogPost) {
    const breadcrumbs = [
      { name: "Jewelry Guide", url: "https://anyhavejewelry.com/blog/" },
      { name: blogPost.title, url: `https://anyhavejewelry.com/blog/${blogPost.slug}/` },
    ];

    return (
      <>
        <BreadcrumbJsonLd items={breadcrumbs} />
        <BlogPostingJsonLd
          product={{
            id: blogPost.slug,
            name: blogPost.title,
            slug: blogPost.slug,
            description: blogPost.excerpt,
            image: blogPost.image,
            price: 0,
            material: "",
            tier: "moissanite",
            tierLabel: blogPost.category,
            specs: [],
          } as any}
          publishDate={blogPost.date}
        />
        <BlogArticleClient slug={params.slug} />
      </>
    );
  }

  // Render product story
  const product = getProductBySlug(params.slug);
  if (!product) {
    return null;
  }

  const publishDate = PUBLISH_DATES[params.slug] || "2025-11-15";

  const breadcrumbs = [
    { name: "Jewelry Guide", url: "https://anyhavejewelry.com/blog/" },
    { name: product?.name || params.slug, url: `https://anyhavejewelry.com/blog/${params.slug}/` },
  ];

  const howToSteps = [
    { name: "Set Your Budget", text: "Determine a realistic budget based on your financial situation. Moissanite and lab-grown diamonds offer exceptional value, allowing larger stones for the same investment." },
    { name: "Choose Your Gemstone", text: "Decide between moissanite (superior brilliance, budget-friendly) or lab-grown diamond (identical to natural, ethically produced). Consider the 4Cs: Cut, Color, Clarity, and Carat." },
    { name: "Select the Cut and Shape", text: "Pick a shape that matches personal style. Round Brilliant offers maximum sparkle; Oval and Pear create elegant, finger-lengthening effects; Emerald and Cushion provide vintage sophistication." },
    { name: "Pick the Metal", text: "Choose from 14K/18K white gold (modern), yellow gold (classic), rose gold (romantic), or platinum (premium durability). Consider skin tone and lifestyle." },
    { name: "Verify Certification", text: "Ensure your gemstone comes with IGI or GIA certification. This guarantees quality, authenticity, and provides documentation for insurance and resale." },
    { name: "Place Your Order", text: "Complete your purchase with confidence. Anyhave offers 30-day returns, free resizing, lifetime cleaning, and insured global shipping." },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {product && <BlogPostingJsonLd product={product} publishDate={publishDate} />}
      <HowToJsonLd
        name="How to Choose the Perfect Engagement Ring"
        description="A step-by-step expert guide to selecting an engagement ring that matches your style, budget, and values."
        steps={howToSteps}
        totalTime="P2W"
      />
      <ProductStoryClient slug={params.slug} />
    </>
  );
}
