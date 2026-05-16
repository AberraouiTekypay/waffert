import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Simulator",
  description: "Simulate how your monthly investments could grow over time. Adjust returns, inflation, and time horizon to model different scenarios.",
  openGraph: {
    title: "Investment Simulator — Waffert",
    description: "Simulate how your monthly investments could grow over 5–30 years. Educational projections only.",
    url: "https://waffert.com/simulator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Simulator — Waffert",
    description: "Simulate how your monthly investments could grow over time.",
  },
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
