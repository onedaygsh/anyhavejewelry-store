"use client";

import { useState } from "react";
import { getAdminOrders, updateOrderStatus, type Order } from "@/lib/admin-data";
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

const statusOptions: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusIcons = {
  pending: Clock,
  confirmed: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const statusColors = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(getAdminOrders);
  const [query, setQuery] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(query.toLowerCase()) ||
    o.customerName.toLowerCase().includes(query.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(query.toLowerCase())
  );

  const handleStatusChange = (id: string, status: Order["status"]) => {
    const updated = updateOrderStatus(id, status);
    setOrders(updated);
  };

  const detail = detailId ? orders.find((o) => o.id === detailId) : null;

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="font-serif text-2xl text-charcoal mb-8">Orders</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID, name, or email..."
          className="w-full max-w-sm pl-9 pr-4 py-2.5 bg-white border border-black/5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-champagne"
        />
      </div>

      <div className="bg-white border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream/50">
            <tr className="text-left text-xs text-charcoal/50">
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Items</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((order) => {
              const StatusIcon = statusIcons[order.status];
              return (
                <tr key={order.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-charcoal/70">{order.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-charcoal">{order.customerName}</p>
                    <p className="text-xs text-charcoal/40">{order.customerEmail}</p>
                  </td>
                  <td className="px-5 py-3 text-charcoal/60">{order.items.length} items</td>
                  <td className="px-5 py-3 text-charcoal font-medium">¥{order.total.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusColors[order.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-charcoal/50">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setDetailId(order.id)}
                      className="text-xs text-champagne hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-charcoal/40">No orders found.</div>
        )}
      </div>

      {/* Detail Panel */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDetailId(null)} />
          <div className="relative w-full max-w-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="font-medium text-charcoal">Order {detail.id}</h2>
              <button onClick={() => setDetailId(null)} className="text-charcoal/40 hover:text-charcoal">Close</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-charcoal/40 mb-1">Customer</p>
                  <p className="text-charcoal">{detail.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/40 mb-1">Email</p>
                  <p className="text-charcoal">{detail.customerEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/40 mb-1">Phone</p>
                  <p className="text-charcoal">{detail.customerPhone || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/40 mb-1">Payment</p>
                  <p className="text-charcoal capitalize">{detail.paymentMethod}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-charcoal/40 mb-1">Shipping Address</p>
                <p className="text-sm text-charcoal">{detail.address}, {detail.city}, {detail.postalCode}, {detail.country}</p>
              </div>

              <div className="border-t border-black/5 pt-4">
                <p className="text-xs text-charcoal/40 mb-2">Items</p>
                <div className="space-y-2">
                  {detail.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-10 bg-stone overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-charcoal">{item.name}</p>
                        <p className="text-xs text-charcoal/40">Qty: {item.quantity}{item.size ? ` · Size: ${item.size}` : ""}</p>
                      </div>
                      <span className="text-charcoal">¥{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/5 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-charcoal/40 mb-1">Update Status</p>
                  <select
                    value={detail.status}
                    onChange={(e) => handleStatusChange(detail.id, e.target.value as Order["status"])}
                    className="px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="text-right">
                  <p className="text-xs text-charcoal/40">Total</p>
                  <p className="text-xl font-medium text-charcoal">¥{detail.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
