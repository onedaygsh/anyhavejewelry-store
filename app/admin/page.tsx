"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  FileText,
  Eye,
  Settings,
  Home,
  Info,
  Mail,
  Languages,
  Layers,
} from "lucide-react";
import { products } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";
import {
  getAdminProducts,
  getAdminBlogPosts,
  getAdminOrders,
} from "@/lib/admin-data";

export default function AdminDashboard() {
  const activeProducts = useMemo(() => getAdminProducts(products).length, []);
  const activePosts = useMemo(() => getAdminBlogPosts(blogPosts).length, []);
  const orders = useMemo(() => getAdminOrders(), []);
  const pendingOrders = useMemo(() => orders.filter((o) => o.status === "pending").length, [orders]);
  const recentOrders = orders.slice(0, 5);

  const stats = [
    { label: "Products", value: activeProducts, icon: Package, href: "/admin/products/", color: "bg-blue-500/10 text-blue-600" },
    { label: "Orders", value: orders.length, icon: ShoppingCart, href: "/admin/orders/", color: "bg-green-500/10 text-green-600" },
    { label: "Blog Posts", value: activePosts, icon: FileText, href: "/admin/blog/", color: "bg-purple-500/10 text-purple-600" },
    { label: "Pending Orders", value: pendingOrders, icon: Eye, href: "/admin/orders/", color: "bg-amber-500/10 text-amber-600" },
  ];

  const quickLinks = [
    { label: "Homepage", icon: Home, href: "/admin/homepage/", desc: "Features, promos, shapes, CTA" },
    { label: "Settings", icon: Settings, href: "/admin/settings/", desc: "Announcements, trust, footer" },
    { label: "About", icon: Info, href: "/admin/about/", desc: "Story, stats, values, CTA" },
    { label: "Contact", icon: Mail, href: "/admin/contact/", desc: "Studio info, image" },
    { label: "Translations", icon: Languages, href: "/admin/translations/", desc: "EN / ZH copy editing" },
    { label: "Pages", icon: Layers, href: "/admin/pages/", desc: "Hero, collections, inspire" },
  ];

  return (
    <div className="p-8 max-w-6xl"
    >
      <h1 className="font-serif text-2xl text-charcoal mb-8"
    >Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
    >
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white p-6 border border-black/5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-4"
    >
              <span className="text-sm text-charcoal/60"
    >{s.label}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${s.color}`}
    >
                <s.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-medium text-charcoal"
    >{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mb-10"
      >
        <h2 className="font-medium text-charcoal mb-4"
        >Quick Links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {quickLinks.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className="bg-white p-5 border border-black/5 hover:shadow-sm transition-shadow flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0"
              >
                <q.icon className="w-5 h-5 text-charcoal/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal mb-0.5"
                >{q.label}</p>
                <p className="text-xs text-charcoal/40"
                >{q.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white border border-black/5"
    >
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between"
    >
          <h2 className="font-medium text-charcoal"
    >Recent Orders</h2>
          <Link href="/admin/orders/" className="text-xs text-champagne hover:underline"
    >View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-charcoal/40"
    >No orders yet.</div>
        ) : (
          <table className="w-full text-sm"
    >
            <thead className="bg-cream/50"
    >
              <tr className="text-left text-xs text-charcoal/50"
    >
                <th className="px-6 py-3 font-medium"
    >Order ID</th>
                <th className="px-6 py-3 font-medium"
    >Customer</th>
                <th className="px-6 py-3 font-medium"
    >Total</th>
                <th className="px-6 py-3 font-medium"
    >Status</th>
                <th className="px-6 py-3 font-medium"
    >Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5"
    >
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-cream/30 transition-colors"
    >
                  <td className="px-6 py-3 font-mono text-xs text-charcoal/70"
    >{order.id}</td>
                  <td className="px-6 py-3 text-charcoal"
    >{order.customerName}</td>
                  <td className="px-6 py-3 text-charcoal"
    >¥{order.total.toLocaleString()}</td>
                  <td className="px-6 py-3"
    >
                    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      order.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "shipped"
                        ? "bg-purple-100 text-purple-700"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-charcoal/50"
    >
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
