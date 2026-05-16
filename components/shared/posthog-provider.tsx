"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === "undefined") return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // manual below
      capture_pageleave: true,
      persistence: "localStorage",
      autocapture: false, // respect privacy; only track explicit events
      loaded: (ph) => {
        // Make posthog accessible for the analytics wrapper
        (window as any).__posthog = ph;
      },
    });
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    posthog.capture("$pageview", {
      $current_url: window.location.href,
      pathname,
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
