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
          "Anyhave Jewelry is a premium moissanite and custom jewelry manufacturer based in Fuzhou, China, with over 10 years of craftsmanship expertise. We specialize in D-color VVS1 moissanite, 925 sterling silver, and Chinese intangible cultural heritage lacquer jewelry. Our workshop produces 500,000+ pieces monthly, offering OEM/ODM services with 3D CAD modeling in 24-48 hours, prototyping in 7-10 days, and mass production in 14-21 days. Every piece undergoes three-stage human quality inspection and EU REACH-compliant eco-plating.",
        sameAs: [
          "https://instagram.com/anyhavejewelry",
          "https://pinterest.com/anyhavejewelry",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+86-400-888-8888",
          contactType: "Customer Service",
          availableLanguage: ["English", "Chinese", "Arabic"],
          areaServed: ["US", "CA", "GB", "DE", "FR", "AU", "AE", "SA", "QA", "KW"],
        },
        foundingDate: "2015",
        founder: {
          "@type": "Person",
          name: "Anyhave Master Craftsmen Collective",
          jobTitle: "Founding Artisan Team",
          knowsAbout: ["Jewelry Making", "Moissanite Setting", "Lacquer Craft", "Supply Chain Management"],
        },
        knowsAbout: [
          "D-Color VVS1 Moissanite",
          "925 Sterling Silver Jewelry",
          "Chinese Intangible Cultural Heritage Lacquer Jewelry",
          "Micro-Pave Setting",
          "3D CAD Jewelry Modeling",
          "Custom Jewelry Design",
          "OEM Jewelry Manufacturing",
          "ODM Jewelry Production",
          "Eco-Plating Technology",
          "EU REACH Compliance",
          "Amoeba Management",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Certification",
            name: "GRA Moissanite Certification",
            recognizedBy: {
              "@type": "Organization",
              name: "Global Gemological Research Association",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Compliance",
            name: "EU REACH Regulation Compliance",
            recognizedBy: {
              "@type": "Organization",
              name: "European Chemicals Agency",
            },
          },
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Jewelry Design",
              description: "3D CAD modeling with dynamic preview, 24-48 hour turnaround",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "OEM Jewelry Manufacturing",
              description: "White-label production with MOQ 30-50 pieces per style",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ODM Jewelry Production",
              description: "Original design manufacturing with full IP protection",
            },
          },
        ],
        employee: {
          "@type": "EmployeeRole",
          roleName: "Master Artisan",
          namedPosition: "Senior Jewelry Craftsman",
          numberedPosition: "35+",
        },
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
          streetAddress: "Cangshan Jewelry Industry Zone",
          addressLocality: "Fuzhou",
          addressRegion: "Fujian",
          postalCode: "350000",
          addressCountry: "CN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "26.0745",
          longitude: "119.2965",
        },
        hasMap: "https://www.google.com/maps/search/Fuzhou+Jewelry+Industry+Zone+Fujian+China",
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
          name: "Jewelry Collection & Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "D-Color VVS1 Moissanite Engagement Rings",
                description: "Premium moissanite rings with GRA certification, available in 0.5ct to 5ct",
                material: "925 Sterling Silver with 18K Gold Plating",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Chinese ICH Lacquer Jewelry",
                description: "Intangible Cultural Heritage lacquer jewelry, handcrafted with traditional techniques",
                material: "Natural Lacquer with Gold/Silver Inlay",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Custom Wedding Bands",
                description: "Personalized wedding bands with complimentary engraving",
                material: "925 Sterling Silver / 18K Gold / Rose Gold / Rhodium",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "3D CAD Jewelry Modeling",
                description: "Precision 3D modeling with dynamic preview, 24-48 hour delivery",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "OEM/ODM Jewelry Manufacturing",
                description: "White-label and original design manufacturing, MOQ 30-50 pieces per style",
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
      priceCurrency: "USD",
      lowPrice: Math.round(product.price / 7.2),
      highPrice: Math.round((product.price + 1500) / 7.2),
      offerCount: product.metalOptions?.length || 1,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2026-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: [
          { "@type": "DefinedRegion", addressCountry: "US" },
          { "@type": "DefinedRegion", addressCountry: "CA" },
          { "@type": "DefinedRegion", addressCountry: "GB" },
          { "@type": "DefinedRegion", addressCountry: "DE" },
          { "@type": "DefinedRegion", addressCountry: "FR" },
          { "@type": "DefinedRegion", addressCountry: "AU" },
          { "@type": "DefinedRegion", addressCountry: "AE" },
          { "@type": "DefinedRegion", addressCountry: "SA" },
        ],
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 14,
            maxValue: 21,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 8,
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
