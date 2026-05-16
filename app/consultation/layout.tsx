import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speak to a Wealth Specialist",
  description: "Book a free session with a Waffert wealth specialist. Get personalised guidance on your investment strategy.",
  openGraph: {
    title: "Speak to a Wealth Specialist — Waffert",
    description: "Book a free session with a Waffert wealth specialist.",
    url: "https://waffert.com/consultation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speak to a Wealth Specialist — Waffert",
    description: "Book a free session with a Waffert wealth specialist.",
  },
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
