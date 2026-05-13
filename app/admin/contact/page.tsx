"use client";

import { useState, useEffect } from "react";
import {
  ContactContent,
  defaultContactContent,
  getContactContent,
  saveContactContent,
} from "@/lib/admin-data";
import { Save } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

export default function AdminContactPage() {
  const [content, setContent] = useState<ContactContent>(defaultContactContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(getContactContent());
  }, []);

  const handleSave = () => {
    saveContactContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Contact Page</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Contact Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Studio Address</label>
            <input
              value={content.studio}
              onChange={(e) => setContent((prev) => ({ ...prev, studio: e.target.value }))}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Email</label>
            <input
              value={content.email}
              onChange={(e) => setContent((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Phone</label>
            <input
              value={content.phone}
              onChange={(e) => setContent((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Business Hours</label>
            <input
              value={content.hours}
              onChange={(e) => setContent((prev) => ({ ...prev, hours: e.target.value }))}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <ImagePreviewInput
            label="Studio Image URL"
            value={content.image}
            onChange={(value) => setContent((prev) => ({ ...prev, image: value }))}
          />
        </div>
      </section>
    </div>
  );
}
