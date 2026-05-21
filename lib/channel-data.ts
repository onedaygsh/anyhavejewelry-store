// Channel & Analytics Data Layer
// Stores channel config and visit tracking in localStorage for static export mode

const LS_PREFIX = "anyhave-admin::";

export const CHANNEL_KEYS = {
  channels: LS_PREFIX + "channels",
  visits: LS_PREFIX + "visits",
  analyticsEnabled: LS_PREFIX + "analytics-enabled",
} as const;

export interface Channel {
  id: string;
  name: string;
  type: "paid" | "organic" | "social" | "referral" | "direct" | "email";
  utmSource?: string;
  utmMedium?: string;
  description?: string;
  color: string;
  active: boolean;
}

export interface VisitRecord {
  id: string;
  source: string;
  medium: string;
  campaign: string;
  path: string;
  referrer: string;
  timestamp: number;
  channelId?: string;
}

export interface ChannelStats {
  channelId: string;
  channelName: string;
  color: string;
  count: number;
  percentage: number;
}

export interface DailyStats {
  date: string;
  count: number;
}

// Default channels
export const defaultChannels: Channel[] = [
  { id: "google-ads", name: "Google Ads", type: "paid", utmSource: "google", utmMedium: "cpc", color: "#4285F4", active: true },
  { id: "facebook", name: "Facebook / Meta", type: "social", utmSource: "facebook", utmMedium: "social", color: "#1877F2", active: true },
  { id: "instagram", name: "Instagram", type: "social", utmSource: "instagram", utmMedium: "social", color: "#E4405F", active: true },
  { id: "tiktok", name: "TikTok", type: "social", utmSource: "tiktok", utmMedium: "social", color: "#000000", active: true },
  { id: "alibaba", name: "Alibaba International", type: "referral", utmSource: "alibaba", utmMedium: "referral", color: "#FF6A00", active: true },
  { id: "google-organic", name: "Google Organic", type: "organic", utmSource: "google", utmMedium: "organic", color: "#34A853", active: true },
  { id: "bing", name: "Bing", type: "organic", utmSource: "bing", utmMedium: "organic", color: "#008373", active: true },
  { id: "direct", name: "Direct Traffic", type: "direct", color: "#6B7280", active: true },
  { id: "email", name: "Email Marketing", type: "email", utmSource: "newsletter", utmMedium: "email", color: "#EA4335", active: true },
];

function broadcast(key: string) {
  if (typeof window === "undefined") return;
  try {
    const channel = new BroadcastChannel("anyhave-admin-sync");
    channel.postMessage({ key });
    channel.close();
  } catch {
    // BroadcastChannel not supported
  }
}

// Channels
export function getChannels(): Channel[] {
  if (typeof window === "undefined") return defaultChannels;
  try {
    const raw = localStorage.getItem(CHANNEL_KEYS.channels);
    if (!raw) return defaultChannels;
    const parsed = JSON.parse(raw) as Channel[];
    return parsed.length > 0 ? parsed : defaultChannels;
  } catch {
    return defaultChannels;
  }
}

export function saveChannels(channels: Channel[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHANNEL_KEYS.channels, JSON.stringify(channels));
  broadcast(CHANNEL_KEYS.channels);
}

// Visits
export function getVisits(): VisitRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHANNEL_KEYS.visits);
    if (!raw) return [];
    return JSON.parse(raw) as VisitRecord[];
  } catch {
    return [];
  }
}

export function recordVisit(visit: Omit<VisitRecord, "id">) {
  if (typeof window === "undefined") return;
  const visits = getVisits();
  const newVisit: VisitRecord = {
    ...visit,
    id: `v_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  };
  // Match channel
  const channels = getChannels();
  const matched = channels.find(
    (c) =>
      c.active &&
      c.utmSource &&
      visit.source.toLowerCase().includes(c.utmSource.toLowerCase())
  );
  if (matched) {
    newVisit.channelId = matched.id;
  }
  visits.push(newVisit);
  // Keep last 5000 records
  if (visits.length > 5000) {
    visits.splice(0, visits.length - 5000);
  }
  localStorage.setItem(CHANNEL_KEYS.visits, JSON.stringify(visits));
  broadcast(CHANNEL_KEYS.visits);
}

export function clearVisits() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHANNEL_KEYS.visits);
  broadcast(CHANNEL_KEYS.visits);
}

// Analytics
export function getChannelStats(days = 30): ChannelStats[] {
  const visits = getVisits();
  const channels = getChannels();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const recent = visits.filter((v) => v.timestamp > cutoff);

  const counts = new Map<string, number>();
  recent.forEach((v) => {
    const id = v.channelId || "unknown";
    counts.set(id, (counts.get(id) || 0) + 1);
  });

  const total = recent.length || 1;
  const stats: ChannelStats[] = [];

  channels.forEach((c) => {
    const count = counts.get(c.id) || 0;
    if (count > 0 || c.active) {
      stats.push({
        channelId: c.id,
        channelName: c.name,
        color: c.color,
        count,
        percentage: Math.round((count / total) * 100),
      });
    }
  });

  // Sort by count desc
  stats.sort((a, b) => b.count - a.count);
  return stats;
}

export function getDailyStats(days = 30): DailyStats[] {
  const visits = getVisits();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const recent = visits.filter((v) => v.timestamp > cutoff);

  const counts = new Map<string, number>();
  recent.forEach((v) => {
    const date = new Date(v.timestamp).toISOString().slice(0, 10);
    counts.set(date, (counts.get(date) || 0) + 1);
  });

  // Fill empty dates
  const result: DailyStats[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().slice(0, 10);
    result.push({ date: dateStr, count: counts.get(dateStr) || 0 });
  }
  return result;
}

export function getTopPages(days = 30, limit = 10): { path: string; count: number }[] {
  const visits = getVisits();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const recent = visits.filter((v) => v.timestamp > cutoff);

  const counts = new Map<string, number>();
  recent.forEach((v) => {
    counts.set(v.path, (counts.get(v.path) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getTotalVisits(days = 30): number {
  const visits = getVisits();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return visits.filter((v) => v.timestamp > cutoff).length;
}

// Analytics enabled toggle
export function isAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(CHANNEL_KEYS.analyticsEnabled);
  return raw === null ? true : raw === "true";
}

export function setAnalyticsEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHANNEL_KEYS.analyticsEnabled, String(enabled));
}
