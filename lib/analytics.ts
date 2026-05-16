"use client";

/**
 * Waffert analytics wrapper.
 * Uses PostHog when NEXT_PUBLIC_POSTHOG_KEY is set, otherwise no-ops silently.
 * All events are opt-in and privacy-respecting.
 */

type EventName =
  | "quiz_started"
  | "quiz_step_completed"
  | "quiz_completed"
  | "basket_viewed"
  | "simulator_used"
  | "waitlist_submitted"
  | "consultation_submitted"
  | "cta_clicked";

type EventProps = Record<string, string | number | boolean | null | undefined>;

function getPosthog() {
  if (typeof window === "undefined") return null;
  // @ts-ignore — PostHog is initialised in the provider
  return (window as any).__posthog || null;
}

export function track(event: EventName, props?: EventProps) {
  try {
    const ph = getPosthog();
    if (ph) {
      ph.capture(event, props);
    }
    // Also push to dataLayer for GTM compatibility
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...props });
    }
  } catch {
    // Analytics must never break the user flow
  }
}

export function identifyUser(email: string, traits?: EventProps) {
  try {
    const ph = getPosthog();
    if (ph) ph.identify(email, traits);
  } catch {}
}
