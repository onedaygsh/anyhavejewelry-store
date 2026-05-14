"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { isAdminLoggedIn, adminLogout } from "@/lib/admin-data";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Layers,
  Settings,
  Home,
  Info,
  Mail,
  Languages,
  LogOut,
  Wand2,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/admin/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products/", label: "Products", icon: Package },
  { href: "/admin/orders/", label: "Orders", icon: ShoppingCart },
  { href: "/admin/blog/", label: "Blog", icon: FileText },
  { href: "/admin/pages/", label: "Pages", icon: Layers },
  { href: "/admin/comparison/", label: "Comparison", icon: BarChart3 },
  { href: "/admin/settings/", label: "Settings", icon: Settings },
  { href: "/admin/homepage/", label: "Homepage", icon: Home },
  { href: "/admin/about/", label: "About", icon: Info },
  { href: "/admin/contact/", label: "Contact", icon: Mail },
  { href: "/admin/customize/", label: "Customize", icon: Wand2 },
  { href: "/admin/translations/", label: "Translations", icon: Languages },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push("/admin/login/");
    }
  }, [router]);

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login/");
  };

  const isLoginPage = pathname === "/admin/login/" || pathname === "/admin/login";
  if (!isAdminLoggedIn() && !isLoginPage) return null;

  return (
    <div className="min-h-screen bg-cream flex"
    >
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal flex-shrink-0 flex flex-col"
      >
        <div className="p-6 border-b border-white/5"
        >
          <Link href="/" className="font-serif text-lg text-white tracking-[0.1em]"
          >
            Anyhave Jewelry
          </Link>
          <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 py-4"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  active
                    ? "text-champagne bg-white/5 border-r-2 border-champagne"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5"
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors w-full px-2 py-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto"
      >
        {children}
      </main>
    </div>
  );
}
