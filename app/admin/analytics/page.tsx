"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Globe, MousePointer, Eye, Trash2 } from "lucide-react";
import {
  getChannelStats,
  getDailyStats,
  getTopPages,
  getTotalVisits,
  clearVisits,
} from "@/lib/channel-data";

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [refreshKey, setRefreshKey] = useState(0);

  const stats = useMemo(() => getChannelStats(days), [days, refreshKey]);
  const daily = useMemo(() => getDailyStats(days), [days, refreshKey]);
  const topPages = useMemo(() => getTopPages(days, 10), [days, refreshKey]);
  const total = useMemo(() => getTotalVisits(days), [days, refreshKey]);

  const maxDaily = Math.max(...daily.map((d) => d.count), 1);
  const maxChannel = Math.max(...stats.map((s) => s.count), 1);

  const handleClear = () => {
    if (confirm("Clear all visit data? This cannot be undone.")) {
      clearVisits();
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Analytics Dashboard</h1>
          <p className="text-sm text-charcoal/50 mt-1">
            Traffic source breakdown and visit trends
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <button
            onClick={handleClear}
            className="px-3 py-2 text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          icon={Eye}
          label="Total Visits"
          value={total.toLocaleString()}
          color="bg-blue-500/10 text-blue-600"
        />
        <SummaryCard
          icon={Globe}
          label="Active Channels"
          value={stats.filter((s) => s.count > 0).length.toString()}
          color="bg-green-500/10 text-green-600"
        />
        <SummaryCard
          icon={MousePointer}
          label="Top Page"
          value={topPages[0]?.path || "-"}
          color="bg-amber-500/10 text-amber-600"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Channel Distribution */}
        <div className="bg-white border border-black/5 p-6">
          <h2 className="font-medium text-charcoal mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-charcoal/50" />
            Channel Distribution
          </h2>
          {stats.length === 0 || stats.every((s) => s.count === 0) ? (
            <div className="text-center py-12 text-sm text-charcoal/40">
              No visit data yet. Traffic will appear here once visitors land on your site.
            </div>
          ) : (
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.channelId}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stat.color }}
                      />
                      <span className="text-sm text-charcoal">{stat.channelName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-charcoal">{stat.count}</span>
                      <span className="text-xs text-charcoal/40 w-10 text-right">
                        {stat.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-cream rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.count / maxChannel) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Daily Trend */}
        <div className="bg-white border border-black/5 p-6">
          <h2 className="font-medium text-charcoal mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-charcoal/50" />
            Daily Visits
          </h2>
          {daily.every((d) => d.count === 0) ? (
            <div className="text-center py-12 text-sm text-charcoal/40">
              No visit data yet. Daily trends will appear once visitors start arriving.
            </div>
          ) : (
            <div className="flex items-end gap-1 h-48">
              {daily.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.count / maxDaily) * 100}%` }}
                      transition={{ duration: 0.3 }}
                      className="w-full bg-champagne/60 rounded-t group-hover:bg-champagne transition-colors"
                      style={{ minHeight: d.count > 0 ? 4 : 1 }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-charcoal text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        {d.date}: {d.count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-2 text-[10px] text-charcoal/30">
            <span>{daily[0]?.date}</span>
            <span>{daily[daily.length - 1]?.date}</span>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white border border-black/5 p-6">
        <h2 className="font-medium text-charcoal mb-4">Top Pages</h2>
        {topPages.length === 0 ? (
          <div className="text-center py-8 text-sm text-charcoal/40">
            No page visit data yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-charcoal/50">
              <tr>
                <th className="pb-2 font-medium">Page</th>
                <th className="pb-2 font-medium text-right">Visits</th>
                <th className="pb-2 font-medium text-right">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {topPages.map((page) => (
                <tr key={page.path} className="hover:bg-cream/30 transition-colors">
                  <td className="py-2.5 text-charcoal font-mono text-xs">{page.path}</td>
                  <td className="py-2.5 text-right text-charcoal">{page.count}</td>
                  <td className="py-2.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-cream rounded-full overflow-hidden">
                        <div
                          className="h-full bg-champagne rounded-full"
                          style={{ width: `${(page.count / (topPages[0]?.count || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-charcoal/40 w-8 text-right">
                        {Math.round((page.count / total) * 100)}%
                      </span>
                    </div>
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

function SummaryCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white p-6 border border-black/5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-charcoal/60">{label}</span>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-medium text-charcoal truncate">{value}</p>
    </div>
  );
}
