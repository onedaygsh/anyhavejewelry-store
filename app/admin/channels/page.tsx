"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Check, X, Save } from "lucide-react";
import {
  getChannels,
  saveChannels,
  defaultChannels,
  type Channel,
} from "@/lib/channel-data";

const channelTypes = [
  { value: "paid", label: "Paid Ads" },
  { value: "organic", label: "Organic Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "direct", label: "Direct" },
  { value: "email", label: "Email" },
];

export default function ChannelsPage() {
  const [channels, setChannels] = useState(getChannels());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newChannel, setNewChannel] = useState<Partial<Channel>>({});
  const [showAdd, setShowAdd] = useState(false);

  const updateChannels = (updated: Channel[]) => {
    setChannels(updated);
    saveChannels(updated);
  };

  const toggleActive = (id: string) => {
    const updated = channels.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    );
    updateChannels(updated);
  };

  const deleteChannel = (id: string) => {
    const updated = channels.filter((c) => c.id !== id);
    updateChannels(updated);
  };

  const saveEdit = (id: string, data: Partial<Channel>) => {
    const updated = channels.map((c) =>
      c.id === id ? { ...c, ...data } : c
    );
    updateChannels(updated);
    setEditingId(null);
  };

  const addChannel = () => {
    if (!newChannel.name || !newChannel.type) return;
    const id = `custom_${Date.now()}`;
    const channel: Channel = {
      id,
      name: newChannel.name,
      type: newChannel.type as Channel["type"],
      utmSource: newChannel.utmSource || id,
      utmMedium: newChannel.utmMedium || "",
      description: newChannel.description || "",
      color: newChannel.color || "#6B7280",
      active: true,
    };
    updateChannels([...channels, channel]);
    setNewChannel({});
    setShowAdd(false);
  };

  const resetDefaults = () => {
    if (confirm("Reset to default channels? All custom channels will be lost.")) {
      updateChannels([...defaultChannels]);
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Channel Configuration</h1>
          <p className="text-sm text-charcoal/50 mt-1">
            Manage traffic sources for UTM tracking and analytics
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetDefaults}
            className="px-4 py-2 text-sm border border-black/10 text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Reset Defaults
          </button>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 text-sm bg-charcoal text-white flex items-center gap-2 hover:bg-graphite transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Channel
          </button>
        </div>
      </div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-black/5 p-6 mb-6"
        >
          <h3 className="font-medium text-charcoal mb-4">New Channel</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-charcoal/50 mb-1">Name</label>
              <input
                value={newChannel.name || ""}
                onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne"
                placeholder="e.g. Pinterest"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/50 mb-1">Type</label>
              <select
                value={newChannel.type || ""}
                onChange={(e) => setNewChannel({ ...newChannel, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne"
              >
                <option value="">Select</option>
                {channelTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-charcoal/50 mb-1">UTM Source</label>
              <input
                value={newChannel.utmSource || ""}
                onChange={(e) => setNewChannel({ ...newChannel, utmSource: e.target.value })}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne"
                placeholder="pinterest"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/50 mb-1">UTM Medium</label>
              <input
                value={newChannel.utmMedium || ""}
                onChange={(e) => setNewChannel({ ...newChannel, utmMedium: e.target.value })}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne"
                placeholder="social"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs text-charcoal/50 mb-1">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newChannel.color || "#6B7280"}
                  onChange={(e) => setNewChannel({ ...newChannel, color: e.target.value })}
                  className="w-10 h-9 border border-black/5 cursor-pointer"
                />
                <span className="text-sm text-charcoal/50">{newChannel.color || "#6B7280"}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-charcoal/50 mb-1">Description</label>
              <input
                value={newChannel.description || ""}
                onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne"
                placeholder="Optional description"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addChannel}
              className="px-4 py-2 text-sm bg-charcoal text-white hover:bg-graphite transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Channel
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm border border-black/10 text-charcoal/60 hover:text-charcoal transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-white border border-black/5">
        <table className="w-full text-sm">
          <thead className="bg-cream/50">
            <tr className="text-left text-xs text-charcoal/50">
              <th className="px-6 py-3 font-medium">Channel</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">UTM Source</th>
              <th className="px-6 py-3 font-medium">UTM Medium</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {channels.map((channel) => (
              <ChannelRow
                key={channel.id}
                channel={channel}
                editing={editingId === channel.id}
                onToggle={() => toggleActive(channel.id)}
                onEdit={() => setEditingId(channel.id)}
                onSave={(data) => saveEdit(channel.id, data)}
                onCancel={() => setEditingId(null)}
                onDelete={() => deleteChannel(channel.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChannelRow({
  channel,
  editing,
  onToggle,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: {
  channel: Channel;
  editing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onSave: (data: Partial<Channel>) => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const [form, setForm] = useState(channel);

  if (editing) {
    return (
      <tr className="bg-cream/30">
        <td className="px-6 py-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-2 py-1 bg-white border border-black/5 text-sm text-charcoal"
          />
        </td>
        <td className="px-6 py-3">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as Channel["type"] })}
            className="px-2 py-1 bg-white border border-black/5 text-sm text-charcoal"
          >
            {channelTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </td>
        <td className="px-6 py-3">
          <input
            value={form.utmSource || ""}
            onChange={(e) => setForm({ ...form, utmSource: e.target.value })}
            className="w-full px-2 py-1 bg-white border border-black/5 text-sm text-charcoal"
          />
        </td>
        <td className="px-6 py-3">
          <input
            value={form.utmMedium || ""}
            onChange={(e) => setForm({ ...form, utmMedium: e.target.value })}
            className="w-full px-2 py-1 bg-white border border-black/5 text-sm text-charcoal"
          />
        </td>
        <td className="px-6 py-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-xs text-charcoal/60">{form.active ? "Active" : "Inactive"}</span>
          </label>
        </td>
        <td className="px-6 py-3 text-right">
          <div className="flex justify-end gap-2">
            <button onClick={() => onSave(form)} className="text-green-600 hover:text-green-700">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={onCancel} className="text-charcoal/40 hover:text-charcoal">
              <X className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-cream/20 transition-colors">
      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: channel.color }}
          />
          <span className="text-charcoal">{channel.name}</span>
        </div>
      </td>
      <td className="px-6 py-3">
        <span className="text-xs text-charcoal/50 capitalize">{channel.type}</span>
      </td>
      <td className="px-6 py-3 text-charcoal/60">{channel.utmSource || "-"}</td>
      <td className="px-6 py-3 text-charcoal/60">{channel.utmMedium || "-"}</td>
      <td className="px-6 py-3">
        <button
          onClick={onToggle}
          className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider transition-colors ${
            channel.active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {channel.active ? "Active" : "Inactive"}
        </button>
      </td>
      <td className="px-6 py-3 text-right">
        <div className="flex justify-end gap-2">
          <button onClick={onEdit} className="text-charcoal/40 hover:text-charcoal">
            <Pencil className="w-4 h-4" />
          </button>
          {!channel.id.startsWith("default_") && (
            <button onClick={onDelete} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
