"use client";

import { useState, useMemo } from "react";
import { BlogPost, blogPosts } from "@/lib/blog-data";
import {
  getAdminBlogPosts,
  saveAdminBlogPosts,
  addAdminBlogPost,
  updateAdminBlogPost,
  deleteAdminBlogPost,
} from "@/lib/admin-data";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  date: new Date().toISOString().split("T")[0],
  excerpt: "",
  content: "",
  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop",
  category: "General",
  readTime: "5 min read",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(() => getAdminBlogPosts(blogPosts));
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [posts, query]);

  const handleSave = (post: BlogPost) => {
    if (!post.slug) {
      const slug = post.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      const newPost = { ...post, slug: slug || "post-" + Date.now() };
      const updated = addAdminBlogPost(posts, newPost);
      setPosts(updated);
    } else {
      const updated = updateAdminBlogPost(posts, post);
      setPosts(updated);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (slug: string) => {
    if (!confirm("Delete this blog post?")) return;
    const updated = deleteAdminBlogPost(posts, slug);
    setPosts(updated);
  };

  const openNew = () => {
    setEditing({ ...emptyPost });
    setShowForm(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing({ ...p });
    setShowForm(true);
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Blog Posts</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full max-w-sm pl-9 pr-4 py-2.5 bg-white border border-black/5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-champagne"
        />
      </div>

      <div className="bg-white border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream/50">
            <tr className="text-left text-xs text-charcoal/50">
              <th className="px-5 py-3 font-medium">Image</th>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Read Time</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((p) => (
              <tr key={p.slug} className="hover:bg-cream/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="w-10 h-10 bg-stone overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="font-medium text-charcoal">{p.title}</p>
                  <p className="text-xs text-charcoal/40">/{p.slug}</p>
                </td>
                <td className="px-5 py-3 text-charcoal/60">{p.category}</td>
                <td className="px-5 py-3 text-charcoal/60">{p.date}</td>
                <td className="px-5 py-3 text-charcoal/60">{p.readTime}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 text-charcoal/40 hover:text-champagne transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.slug)}
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
          <div className="px-6 py-10 text-center text-sm text-charcoal/40">
            No posts found.
          </div>
        )}
      </div>

      {showForm && editing && (
        <BlogPostForm
          post={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function BlogPostForm({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost;
  onSave: (p: BlogPost) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BlogPost>(post);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">
            {form.slug ? "Edit Post" : "New Post"}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-black/5 rounded-full"
          >
            <X className="w-5 h-5 text-charcoal/50" />
          </button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Title *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Slug *
              </label>
              <input
                required
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
                placeholder="auto-generated if empty"
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Date *
              </label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Category *
              </label>
              <input
                required
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Read Time
              </label>
              <input
                value={form.readTime}
                onChange={(e) =>
                  setForm({ ...form, readTime: e.target.value })
                }
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
          <ImagePreviewInput
            label="Image Path *"
            value={form.image}
            onChange={(value) => setForm({ ...form, image: value })}
          />
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">
              Excerpt *
            </label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">
              Content (HTML) *
            </label>
            <textarea
              required
              rows={10}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              placeholder="<p>Your content here...</p>"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne font-mono"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 border border-black/10 text-sm text-charcoal hover:bg-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
