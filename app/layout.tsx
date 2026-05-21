import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/components/CartProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { I18nProvider } from "@/lib/i18n/context";
import { CurrencyProvider } from "@/lib/currency/context";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import TrackingProvider from "@/components/TrackingProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://anyhavejewelry.com"),
  title: {
    default: "Anyhave Jewelry | Custom Jewelry That Tells Your Story | Handcrafted Worldwide",
    template: "%s | Anyhave Jewelry",
  },
  description:
    "Design your own custom jewelry at Anyhave. Handcrafted personalized necklaces, rings & bracelets with ethical moissanite & lab-grown diamonds. Free shipping over $75. 60-day returns. EU REACH & California Prop 65 compliant.",
  keywords: [
    "custom jewelry",
    "personalized jewelry",
    "moissanite ring",
    "lab grown diamond",
    "custom name necklace",
    "engraved jewelry",
    "engagement ring",
    "wedding band",
    "925 sterling silver jewelry",
    "ethical jewelry",
    "conflict free diamonds",
    "Anyhave Jewelry",
    "jewelry gift",
    "anniversary gift",
    "birthday jewelry",
  ],
  authors: [{ name: "Anyhave Jewelry Master Craftsmen Team", url: "https://anyhavejewelry.com/about/" }],
  creator: "Anyhave Jewelry",
  publisher: "Anyhave Jewelry",
  openGraph: {
    title: "Anyhave Jewelry | Custom Jewelry That Tells Your Story",
    description:
      "Design your own custom jewelry at Anyhave. Handcrafted personalized necklaces, rings & bracelets. Free shipping over $75. Ethical moissanite & lab-grown diamonds.",
    url: "https://anyhavejewelry.com",
    siteName: "Anyhave Jewelry",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anyhave Jewelry | Custom Jewelry That Tells Your Story",
    description:
      "Handcrafted personalized necklaces, rings & bracelets. Free shipping over $75. Ethical moissanite & lab-grown diamonds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "REPLACE_WITH_REAL_GOOGLE_VERIFICATION_CODE",
  },
  alternates: {
    canonical: "https://anyhavejewelry.com",
    languages: {
      "en-US": "https://anyhavejewelry.com/",
      "zh-CN": "https://anyhavejewelry.com/?lang=zh",
      "ar-SA": "https://anyhavejewelry.com/?lang=ar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        <TrackingProvider />
        <I18nProvider>
          <CurrencyProvider>
            <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </WishlistProvider>
          </CartProvider>
          </CurrencyProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
