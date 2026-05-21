"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { getSiteSettings, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { t, locale } = useI18n();
  const [rights, setRights] = useState<string>(t.footer.rights);

  const loadRights = () => {
    const settings = getSiteSettings();
    setRights(
      locale === "en"
        ? settings.footer.rightsEn || t.footer.rights
        : settings.footer.rightsZh || t.footer.rights
    );
  };
  const isEn = locale === "en";

  useEffect(() => {
    loadRights();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.siteSettings) loadRights();
    });
  }, [locale, t.footer.rights]);

  return (
    <footer className="bg-dark-footer text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-wide mb-5">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products/" className="hover:text-white transition-colors">{t.footer.shop}</Link></li>
              <li><Link href="/customize/" className="hover:text-white transition-colors">{t.footer.customize}</Link></li>
              <li><Link href="/about/" className="hover:text-white transition-colors">{t.footer.about}</Link></li>
              <li><Link href="/blog/" className="hover:text-white transition-colors">{t.footer.blog}</Link></li>
              <li><Link href="/contact/" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>

          {/* Company 2 */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-wide mb-5">{t.footer.company2}</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.materials}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.furniture}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.collection}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.careTitle}</span></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-wide mb-5">{t.footer.about}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact/" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.location}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.reviews}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.footer.videos}</span></li>
            </ul>
          </div>

          {/* Stay Inspired */}
          <div className="col-span-2">
            <h4 className="text-white text-xs font-medium tracking-wide mb-5">{t.footer.stayInspired}</h4>
            <p className="text-sm mb-4">{t.footer.signUpDesc}</p>
            <div className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.enterEmail}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-champagne/50 transition-colors"
              />
              <button className="px-4 py-2.5 bg-champagne text-white text-sm hover:bg-champagne-light transition-colors">
                {isEn ? "JOIN" : "加入"}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>{rights}</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-white/10 rounded text-[10px]">VISA</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px]">MC</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px]">AMEX</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px]">Pay</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px]">GPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
