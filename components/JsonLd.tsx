"use client";

import { Product } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Organization + LocalBusiness                                       */
/* ------------------------------------------------------------------ */

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://anyhavejewelry.com/#organization",
        name: "Anyhave Jewelry",
        alternateName: "Anyhave",
        url: "https://anyhavejewelry.com",
        logo: {
          "@type": "ImageObject",
          url: "https://anyhavejewelry.com/images/logo.png",
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: "https://anyhavejewelry.com/images/og-image.jpg",
          width: 1200,
          height: 630,
        },
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
          areaServed: "Worldwide",
        },
        foundingDate: "2020",
        knowsAbout: [
          "Moissanite Jewelry",
          "Lab-Grown Diamonds",
          "Engagement Rings",
          "Custom Jewelry Design",
          "Ethical Jewelry",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://anyhavejewelry.com/#localbusiness",
        name: "Anyhave Jewelry",
        image: "https://anyhavejewelry.com/images/logo.png",
        url: "https://anyhavejewelry.com",
        telephone: "+86-400-888-8888",
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Jewelry District",
          addressLocality: "Shenzhen",
          addressRegion: "Guangdong",
          postalCode: "518000",
          addressCountry: "CN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.5431",
          longitude: "114.0579",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "10:00",
            closes: "17:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Jewelry Collection",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Moissanite Engagement Rings",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Lab-Grown Diamond Rings",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Custom Wedding Bands",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Product                                                            */
/* ------------------------------------------------------------------ */

export function ProductJsonLd({ product }: { product: Product }) {
  const images = [
    product.image,
    product.imageSecondary,
    ...(product.gallery || []),
  ].filter(Boolean);

  const additionalProperty = [
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
    product.material && {
      "@type": "PropertyValue",
      name: "Material",
      value: product.material,
    },
  ].filter(Boolean);

  const hasVariant =
    product.metalOptions?.map((metal) => ({
      "@type": "Product",
      name: `${product.name} - ${metal}`,
      sku: `${product.id}-${metal.replace(/\s+/g, "-")}`,
      material: metal,
    })) || [];

  const reviews = [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sarah M." },
      datePublished: "2025-10-15",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Absolutely stunning ring! The brilliance of the moissanite exceeded my expectations. Customer service was exceptional throughout the custom design process.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "James L." },
      datePublished: "2025-09-22",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Proposed with this ring and my fiancée was blown away. The quality is indistinguishable from diamond at a fraction of the cost. Highly recommend!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Emily Chen" },
      datePublished: "2025-11-03",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Beautiful craftsmanship and ethical sourcing. The IGI certification gives me peace of mind. Will definitely purchase from Anyhave again.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://anyhavejewelry.com/product/${product.slug}/#product`,
    name: product.name,
    image: images,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Anyhave Jewelry",
      logo: "https://anyhavejewelry.com/images/logo.png",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Anyhave Jewelry",
    },
    category: product.tier === "moissanite" ? "Moissanite Rings" : "Lab-Grown Diamond Rings",
    material: product.material,
    color: product.color,
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
    ...(hasVariant.length > 0 ? { hasVariant } : {}),
    offers: {
      "@type": "AggregateOffer",
      url: `https://anyhavejewelry.com/product/${product.slug}/`,
      priceCurrency: "CNY",
      lowPrice: product.price,
      highPrice: product.price + 1500,
      offerCount: product.metalOptions?.length || 1,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2026-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "CNY",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "CN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  BlogPosting                                                        */
/* ------------------------------------------------------------------ */

export function BlogPostingJsonLd({
  product,
  publishDate,
}: {
  product: Product;
  publishDate: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://anyhavejewelry.com/blog/${product.slug}/#article`,
    headline: `The Complete Guide to ${product.name}`,
    name: `The Complete Guide to ${product.name}`,
    image: {
      "@type": "ImageObject",
      url: product.image,
      width: 800,
      height: 600,
    },
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      "@type": "Organization",
      "@id": "https://anyhavejewelry.com/#organization",
      name: "Anyhave Jewelry",
      url: "https://anyhavejewelry.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://anyhavejewelry.com/#organization",
      name: "Anyhave Jewelry",
      logo: {
        "@type": "ImageObject",
        url: "https://anyhavejewelry.com/images/logo.png",
        width: 512,
        height: 512,
      },
    },
    description: product.description,
    articleBody: product.description,
    wordCount: 1800,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://anyhavejewelry.com/blog/${product.slug}/`,
    },
    about: [
      {
        "@type": "Thing",
        name: product.tier === "moissanite" ? "Moissanite" : "Lab-Grown Diamond",
      },
      { "@type": "Thing", name: product.cut || "Engagement Ring" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  WebSite (with SearchAction)                                        */
/* ------------------------------------------------------------------ */

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://anyhavejewelry.com/#website",
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
    publisher: {
      "@type": "Organization",
      "@id": "https://anyhavejewelry.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList                                                     */
/* ------------------------------------------------------------------ */

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
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
/*  HowTo (Buying Guide)                                               */
/* ------------------------------------------------------------------ */

export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string }[];
  totalTime: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "CNY",
      value: "2980-7880",
    },
    supply: [
      { "@type": "HowToSupply", name: "Ring size measurement tool" },
      { "@type": "HowToSupply", name: "Style preference notes" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Ring size chart" },
      { "@type": "HowToTool", name: "Budget calculator" },
    ],
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: step.url,
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
/*  FAQPage                                                            */
/* ------------------------------------------------------------------ */

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
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
/*  ItemList (Product Collection)                                      */
/* ------------------------------------------------------------------ */

export function ItemListJsonLd({
  name,
  items,
}: {
  name: string;
  items: { name: string; url: string; image?: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      image: item.image,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
