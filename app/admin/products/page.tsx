"use client";

import { useState, useMemo } from "react";
import { Product, products } from "@/lib/data";
import {
  getAdminProducts,
  saveAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "@/lib/admin-data";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

const tiers = [
  { key: "moissanite", label: "Moissanite" },
  { key: "lab", label: "Lab-Grown" },
];

const emptyProduct: Product = {
  id: "",
  slug: "",
  name: "",
  tier: "moissanite",
  tierLabel: "",
  price: 0,
  material: "",
  description: "",
  specs: [],
  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop",
};

export default function AdminProductsPage() {
  const [data, setData] = useState(() => getAdminProducts(products));
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    return data.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.material.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  const handleSave = (product: Product) => {
    if (!product.id) {
      const id = "admin-" + Date.now();
      const slug = product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const newProduct = { ...product, id, slug };
      const updated = addAdminProduct(data, newProduct);
      setData(updated);
    } else {
      const updated = updateAdminProduct(data, product);
      setData(updated);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this product?")) return;
    const updated = deleteAdminProduct(data, id);
    setData(updated);
  };

  const openNew = () => {
    setEditing({ ...emptyProduct, id: "", slug: "" });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setShowForm(true);
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Products</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-sm pl-9 pr-4 py-2.5 bg-white border border-black/5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-champagne"
        />
      </div>

      <div className="bg-white border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream/50">
            <tr className="text-left text-xs text-charcoal/50">
              <th className="px-5 py-3 font-medium">Image</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Tier</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-cream/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="w-10 h-10 bg-stone overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="font-medium text-charcoal">{p.name}</p>
                  <p className="text-xs text-charcoal/40">{p.material}</p>
                </td>
                <td className="px-5 py-3 text-charcoal/60">{p.tierLabel || p.tier}</td>
                <td className="px-5 py-3 text-charcoal">¥{p.price.toLocaleString()}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 text-charcoal/40 hover:text-champagne transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 text-charcoal/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-charcoal/40">No products found.</div>
        )}
      </div>

      {/* Modal */}
      {showForm && editing && (
        <ProductForm
          product={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(product);
  const [specInput, setSpecInput] = useState(product.specs.join(", "));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const specs = specInput.split(",").map((s) => s.trim()).filter(Boolean);
    const tierLabel =
      form.tier === "moissanite"
        ? "Moissanite Collection"
        : "Lab-Grown Collection";
    onSave({ ...form, specs, tierLabel });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">{form.id ? "Edit Product" : "New Product"}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-black/5 rounded-full">
            <X className="w-5 h-5 text-charcoal/50" />
          </button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Price (¥) *</label>
              <input required type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Material *</label>
            <input required value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
          </div>
          <ImagePreviewInput
            label="Image Path *"
            value={form.image}
            onChange={(value) => setForm({ ...form, image: value })}
          />
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Tier *</label>
            <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value as Product["tier"] })} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne">
              {tiers.map((t) => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Specs (comma separated)</label>
            <input value={specInput} onChange={(e) => setSpecInput(e.target.value)} placeholder="e.g. Center: D-Grade Moissanite, Setting: S925 Silver" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 py-2.5 border border-black/10 text-sm text-charcoal hover:bg-cream transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
