import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for Early Access",
  description: "Join the Waffert waitlist. Be first to invest when your country launches. Free, no commitment.",
  openGraph: {
    title: "Register for Early Access — Waffert",
    description: "Join the waitlist. Be first to invest when your country launches.",
    url: "https://waffert.com/waitlist",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Waffert Waitlist",
    description: "Be first to invest when your country launches.",
  },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
