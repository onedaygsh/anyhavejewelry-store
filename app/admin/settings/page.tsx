"use client";

import { useState, useEffect } from "react";
import {
  SiteSettings,
  defaultSiteSettings,
  getSiteSettings,
  saveSiteSettings,
} from "@/lib/admin-data";
import { X, Plus, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  const handleSave = () => {
    saveSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateAnnouncement = (index: number, value: string) => {
    setSettings((prev) => {
      const announcements = [...prev.announcements];
      announcements[index] = value;
      return { ...prev, announcements };
    });
  };

  const addAnnouncement = () => {
    setSettings((prev) => ({
      ...prev,
      announcements: [...prev.announcements, ""],
    }));
  };

  const removeAnnouncement = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((_, i) => i !== index),
    }));
  };

  const updateTrustItem = (
    index: number,
    field: keyof SiteSettings["trustItems"][0],
    value: string
  ) => {
    setSettings((prev) => {
      const trustItems = [...prev.trustItems];
      trustItems[index] = { ...trustItems[index], [field]: value };
      return { ...prev, trustItems };
    });
  };

  const updateFooter = (field: keyof SiteSettings["footer"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      footer: { ...prev.footer, [field]: value },
    }));
  };

  const updateNavbar = (field: keyof SiteSettings["navbar"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      navbar: { ...prev.navbar, [field]: value },
    }));
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Site Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Announcements */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="font-medium text-charcoal">Announcement Bar</h2>
          <button
            onClick={addAnnouncement}
            className="flex items-center gap-1 text-xs text-champagne hover:underline"
          >
            <Plus className="w-3 h-3" />
            Add Item
          </button>
        </div>
        <div className="divide-y divide-black/5">
          {settings.announcements.map((text, i) => (
            <div key={i} className="p-6 flex items-center gap-4">
              <span className="text-xs text-charcoal/30 font-mono w-6">{i + 1}</span>
              <input
                value={text}
                onChange={(e) => updateAnnouncement(i, e.target.value)}
                className="flex-1 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
              <button
                onClick={() => removeAnnouncement(i)}
                className="p-1 text-charcoal/30 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Trust Banner</h2>
        </div>
        <div className="divide-y divide-black/5">
          {settings.trustItems.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Trust Item {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">Title (EN)</label>
                  <input
                    value={item.titleEn}
                    onChange={(e) => updateTrustItem(i, "titleEn", e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">Title (ZH)</label>
                  <input
                    value={item.titleZh}
                    onChange={(e) => updateTrustItem(i, "titleZh", e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">Description (EN)</label>
                  <input
                    value={item.descEn}
                    onChange={(e) => updateTrustItem(i, "descEn", e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">Description (ZH)</label>
                  <input
                    value={item.descZh}
                    onChange={(e) => updateTrustItem(i, "descZh", e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Footer</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Company Description (EN)</label>
            <textarea
              rows={2}
              value={settings.footer.descEn}
              onChange={(e) => updateFooter("descEn", e.target.value)}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Company Description (ZH)</label>
            <textarea
              rows={2}
              value={settings.footer.descZh}
              onChange={(e) => updateFooter("descZh", e.target.value)}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Rights Text (EN)</label>
              <input
                value={settings.footer.rightsEn}
                onChange={(e) => updateFooter("rightsEn", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Rights Text (ZH)</label>
              <input
                value={settings.footer.rightsZh}
                onChange={(e) => updateFooter("rightsZh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navbar */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Navbar</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Logo Text</label>
            <input
              value={settings.navbar.logo}
              onChange={(e) => updateNavbar("logo", e.target.value)}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Book Appointment (EN)</label>
              <input
                value={settings.navbar.bookAppointmentEn}
                onChange={(e) => updateNavbar("bookAppointmentEn", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Book Appointment (ZH)</label>
              <input
                value={settings.navbar.bookAppointmentZh}
                onChange={(e) => updateNavbar("bookAppointmentZh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
