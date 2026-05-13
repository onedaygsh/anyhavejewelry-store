"use client";

import { Product } from "@/lib/data";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anyhave Jewelry",
    url: "https://anyhavejewelry.com",
    logo: "https://anyhavejewelry.com/images/logo.png",
    description:
      "Handcrafted moissanite and lab-grown diamond jewelry. Design your perfect engagement ring, wedding band, or custom piece. Ethical, sustainable, and beautiful.",
    sameAs: [
      "https://instagram.com/anyhavejewelry",
      "https://pinterest.com/anyhavejewelry",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-400-888-8888",
      contactType: "Customer Service",
      availableLanguage: ["English", "Chinese"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [
      product.image,
      product.imageSecondary,
      ...(product.gallery || []),
    ].filter(Boolean),
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Anyhave Jewelry",
    },
    offers: {
      "@type": "Offer",
      url: `https://anyhavejewelry.com/product/${product.slug}/`,
      priceCurrency: "CNY",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "12",
    },
    ...(product.carat || product.cut || product.clarity || product.color
      ? {
          additionalProperty: [
            product.carat && {
              "@type": "PropertyValue",
              name: "Carat Weight",
              value: product.carat,
            },
            product.cut && {
              "@type": "PropertyValue",
              name: "Cut",
              value: product.cut,
            },
            product.clarity && {
              "@type": "PropertyValue",
              name: "Clarity",
              value: product.clarity,
            },
            product.color && {
              "@type": "PropertyValue",
              name: "Color Grade",
              value: product.color,
            },
            product.certification && {
              "@type": "PropertyValue",
              name: "Certification",
              value: product.certification,
            },
          ].filter(Boolean),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BlogPostingJsonLd({
  product,
  publishDate,
}: {
  product: Product;
  publishDate: string;
}) {
  const name = product?.name || "";
  const image = product?.image || "";
  const description = product?.description || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: `The Complete Guide to ${name}`,
    image: image,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      "@type": "Organization",
      name: "Anyhave Jewelry",
      url: "https://anyhavejewelry.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Anyhave Jewelry",
      logo: {
        "@type": "ImageObject",
        url: "https://anyhavejewelry.com/images/logo.png",
      },
    },
    description: description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://anyhavejewelry.com/blog/${product?.slug || ""}/`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anyhave Jewelry",
    url: "https://anyhavejewelry.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://anyhavejewelry.com/products/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
