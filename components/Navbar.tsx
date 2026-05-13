"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { useI18n } from "@/lib/i18n/context";
import SearchModal from "./SearchModal";
import CountrySelector from "./CountrySelector";
import { getSiteSettings, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const { locale, t } = useI18n();
  const [logo, setLogo] = useState("Anyhave");
  const [bookAppointment, setBookAppointment] = useState("Book Appointment");

  const loadSettings = () => {
    const settings = getSiteSettings();
    setLogo(settings.navbar.logo || "Anyhave");
    setBookAppointment(
      locale === "en"
        ? settings.navbar.bookAppointmentEn || "Book Appointment"
        : settings.navbar.bookAppointmentZh || "预约咨询"
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    loadSettings();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.siteSettings) loadSettings();
    });
  }, [locale]);

  const navLinks = [
    { href: "/products/", label: t.nav.shop },
    { href: "/customize/", label: t.nav.customize },
    { href: "/about/", label: t.nav.about },
    { href: "/blog/", label: t.nav.blog },
    { href: "/contact/", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 transition-all duration-500 border-b",
        scrolled
          ? "glass-nav border-black/5 py-3 shadow-sm"
          : "bg-cream border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo - centered like Diamaura */}
        <Link href="/" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2">
          <span className="text-xl font-serif tracking-[0.2em] font-medium text-charcoal group-hover:text-champagne transition-colors duration-300">
            {logo}
          </span>
        </Link>

        {/* Desktop Nav - left side */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-charcoal/70 hover:text-charcoal transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-champagne after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Book Appointment + icons */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact/"
            className="hidden md:inline-flex items-center px-5 py-2 bg-obsidian text-white text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300"
          >
            {bookAppointment}
          </Link>
          <button
            className="hidden md:flex p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5 text-charcoal/70" />
          </button>
          <Link
            href="/wishlist/"
            className="hidden md:flex p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Heart className="w-5 h-5 text-charcoal/70" />
          </Link>
          <button
            className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 text-charcoal/70" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-champagne text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
          <div className="hidden md:flex ml-1">
            <CountrySelector />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 glass-nav border-b border-black/5 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-charcoal/80 hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-black/5">
            <button
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
            >
              <Search className="w-5 h-5 text-charcoal/70" />
            </button>
            <Link
              href="/wishlist/"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Heart className="w-5 h-5 text-charcoal/70" />
            </Link>
            <div className="flex items-center">
              <CountrySelector />
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
