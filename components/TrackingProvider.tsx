"use client";

import { useEffect } from "react";
import { recordVisit } from "@/lib/channel-data";

function getReferrerSource(referrer: string): string {
  if (!referrer) return "direct";
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes("google")) return "google-organic";
    if (host.includes("bing")) return "bing";
    if (host.includes("facebook") || host.includes("fb")) return "facebook";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("tiktok")) return "tiktok";
    if (host.includes("alibaba")) return "alibaba";
    if (host.includes("pinterest")) return "pinterest";
    if (host.includes("twitter") || host.includes("x.com")) return "twitter";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("youtube")) return "youtube";
    return "referral";
  } catch {
    return "referral";
  }
}

export default function TrackingProvider() {
  useEffect(() => {
    // Only track once per session
    if (sessionStorage.getItem("anyhave_tracked")) return;
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const utmSource = url.searchParams.get("utm_source") || "";
    const utmMedium = url.searchParams.get("utm_medium") || "";
    const utmCampaign = url.searchParams.get("utm_campaign") || "";

    let source = utmSource;
    let medium = utmMedium;

    if (!source) {
      source = getReferrerSource(document.referrer);
      medium = medium || (document.referrer ? "referral" : "direct");
    }

    if (!medium) {
      medium = "direct";
    }

    recordVisit({
      source,
      medium,
      campaign: utmCampaign,
      path: url.pathname + url.search,
      referrer: document.referrer || "",
      timestamp: Date.now(),
    });

    sessionStorage.setItem("anyhave_tracked", "true");
  }, []);

  return null;
}
