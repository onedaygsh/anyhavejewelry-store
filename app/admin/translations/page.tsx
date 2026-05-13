"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAdminTranslations,
  saveAdminTranslations,
  resetAdminTranslations,
} from "@/lib/admin-data";
import { translations as defaultTranslations } from "@/lib/i18n/translations";
import type { Translations } from "@/lib/i18n/translations";
import { Save, RotateCcw, Search } from "lucide-react";

type Lang = "en" | "zh";

type FlatEntry = {
  path: string;
  en: string;
  zh: string;
};

function flattenSection(
  enObj: unknown,
  zhObj: unknown,
  prefix = ""
): FlatEntry[] {
  const results: FlatEntry[] = [];
  if (
    typeof enObj === "string" &&
    typeof zhObj === "string"
  ) {
    results.push({ path: prefix, en: enObj, zh: zhObj });
  } else if (
    Array.isArray(enObj) &&
    Array.isArray(zhObj)
  ) {
    const maxLen = Math.max(enObj.length, zhObj.length);
    for (let i = 0; i < maxLen; i++) {
      const enItem = enObj[i];
      const zhItem = zhObj[i];
      if (
        typeof enItem === "string" &&
        typeof zhItem === "string"
      ) {
        results.push({ path: `${prefix}[${i}]`, en: enItem, zh: zhItem });
      } else if (
        typeof enItem === "object" &&
        enItem !== null &&
        typeof zhItem === "object" &&
        zhItem !== null
      ) {
        results.push(...flattenSection(enItem, zhItem, `${prefix}[${i}]`));
      }
    }
  } else if (
    typeof enObj === "object" &&
    enObj !== null &&
    typeof zhObj === "object" &&
    zhObj !== null
  ) {
    const enKeys = Object.keys(enObj);
    const zhKeys = Object.keys(zhObj);
    const allKeys = Array.from(new Set([...enKeys, ...zhKeys]));
    for (const key of allKeys) {
      const newPath = prefix ? `${prefix}.${key}` : key;
      results.push(
        ...flattenSection(
          (enObj as Record<string, unknown>)[key],
          (zhObj as Record<string, unknown>)[key],
          newPath
        )
      );
    }
  }
  return results;
}

function setPath(obj: Record<string, unknown>, path: string, value: string) {
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current: unknown = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const next = (current as Record<string, unknown>)[part];
    if (next === undefined) {
      const nextPart = parts[i + 1];
      (current as Record<string, unknown>)[part] = /^\d+$/.test(nextPart)
        ? []
        : {};
    }
    current = (current as Record<string, unknown>)[part];
  }
  (current as Record<string, unknown>)[parts[parts.length - 1]] = value;
}

const SECTIONS = [
  { key: "nav", label: "Nav" },
  { key: "hero", label: "Hero" },
  { key: "trust", label: "Trust" },
  { key: "tiers", label: "Tiers" },
  { key: "featured", label: "Featured" },
  { key: "testimonials", label: "Testimonials" },
  { key: "newsletter", label: "Newsletter" },
  { key: "story", label: "Story" },
  { key: "footer", label: "Footer" },
  { key: "products", label: "Products" },
  { key: "productDetail", label: "Product Detail" },
  { key: "cart", label: "Cart" },
  { key: "checkout", label: "Checkout" },
  { key: "contact", label: "Contact" },
  { key: "blog", label: "Blog" },
  { key: "customize", label: "Customize" },
  { key: "rtaConfigurator", label: "Configurator" },
  { key: "wishlist", label: "Wishlist" },
  { key: "search", label: "Search" },
  { key: "about", label: "About" },
  { key: "home", label: "Home" },
  { key: "localeNames", label: "Locale Names" },
];

export default function AdminTranslationsPage() {
  const [translations, setTranslations] =
    useState<Translations>(defaultTranslations);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("nav");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTranslations(getAdminTranslations(defaultTranslations));
  }, []);

  const handleSave = () => {
    saveAdminTranslations(translations);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all translation overrides to defaults?")) {
      resetAdminTranslations();
      setTranslations(defaultTranslations);
    }
  };

  const updateValue = useCallback(
    (path: string, lang: Lang, value: string) => {
      setTranslations((prev) => {
        const next = {
          en: { ...(prev.en as unknown as Record<string, unknown>) },
          zh: { ...(prev.zh as unknown as Record<string, unknown>) },
        };
        setPath(next[lang], path, value);
        return next as unknown as Translations;
      });
    },
    []
  );

  const enSection = (translations.en as unknown as Record<string, unknown>)[
    activeSection
  ];
  const zhSection = (translations.zh as unknown as Record<string, unknown>)[
    activeSection
  ];

  const flatEntries = flattenSection(enSection, zhSection, activeSection);

  const filteredEntries = search.trim()
    ? flatEntries.filter(
        (e) =>
          e.path.toLowerCase().includes(search.toLowerCase()) ||
          e.en.toLowerCase().includes(search.toLowerCase()) ||
          e.zh.toLowerCase().includes(search.toLowerCase())
      )
    : flatEntries;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Translations</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 border border-charcoal text-charcoal text-sm hover:bg-charcoal hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Section list */}
        <aside className="w-48 flex-shrink-0">
          <div className="bg-white border border-black/5 overflow-hidden">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => {
                  setActiveSection(section.key);
                  setSearch("");
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  activeSection === section.key
                    ? "bg-charcoal text-white"
                    : "text-charcoal/70 hover:bg-cream"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Editor */}
        <div className="flex-1">
          <div className="bg-white border border-black/5 mb-4">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="font-medium text-charcoal">
                {SECTIONS.find((s) => s.key === activeSection)?.label}
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 text-charcoal/30 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search keys or text..."
                  className="pl-9 pr-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne w-64"
                />
              </div>
            </div>

            <div className="divide-y divide-black/5">
              {filteredEntries.length === 0 && (
                <div className="p-6 text-sm text-charcoal/40 text-center">
                  No entries found
                </div>
              )}
              {filteredEntries.map((entry) => (
                <div key={entry.path} className="p-4">
                  <p className="text-[10px] text-charcoal/40 font-mono mb-2 truncate">
                    {entry.path}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      value={entry.en}
                      onChange={(e) =>
                        updateValue(entry.path, "en", e.target.value)
                      }
                      placeholder="English"
                      className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                    />
                    <input
                      value={entry.zh}
                      onChange={(e) =>
                        updateValue(entry.path, "zh", e.target.value)
                      }
                      placeholder="中文"
                      className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
