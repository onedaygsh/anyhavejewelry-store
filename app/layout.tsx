import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { CartProvider } from "@/components/CartProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { I18nProvider } from "@/lib/i18n/context";
import { CurrencyProvider } from "@/lib/currency/context";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://anyhavejewelry.com"),
  title: "Anyhave Jewelry | Bespoke Moissanite & Lab-Grown Diamond Jewelry",
  description:
    "Handcrafted moissanite and lab-grown diamond jewelry. Design your perfect engagement ring, wedding band, or custom piece. Ethical, sustainable, and beautiful.",
  keywords: [
    "moissanite ring",
    "lab grown diamond",
    "engagement ring",
    "custom jewelry",
    "ethical jewelry",
    "sustainable diamonds",
    "wedding band",
    "Anyhave Jewelry",
  ],
  authors: [{ name: "Anyhave Jewelry" }],
  openGraph: {
    title: "Anyhave Jewelry | Bespoke Moissanite & Lab-Grown Diamond Jewelry",
    description:
      "Handcrafted moissanite and lab-grown diamond jewelry. Design your perfect engagement ring, wedding band, or custom piece.",
    url: "https://anyhavejewelry.com",
    siteName: "Anyhave Jewelry",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anyhave Jewelry | Bespoke Moissanite & Lab-Grown Diamond Jewelry",
    description:
      "Handcrafted moissanite and lab-grown diamond jewelry. Ethical, sustainable, and beautiful.",
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
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://anyhavejewelry.com",
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
        <I18nProvider>
          <CurrencyProvider>
            <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
          </CurrencyProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
