"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getSiteSettings, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<string[]>([
    "Free 30-Day Returns · Free 90-Day Resize · IGI Certified",
    "Enjoy 30% Off on Lab-Grown Diamonds · Code: DIAMOND30",
    "Free Global Shipping on Orders Over ¥3000",
    "Ethical Moissanite & Lab-Grown Diamonds · Conflict Free",
  ]);

  const loadAnnouncements = () => {
    const settings = getSiteSettings();
    if (settings.announcements && settings.announcements.length > 0) {
      setAnnouncements(settings.announcements);
    }
  };

  useEffect(() => {
    loadAnnouncements();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.siteSettings) loadAnnouncements();
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!visible) return null;

  return (
    <div className="bg-obsidian text-white text-[11px] tracking-widest uppercase py-2.5 relative z-[60]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        <p className="text-center transition-opacity duration-500">
          {announcements[index]}
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
