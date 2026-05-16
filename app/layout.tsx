import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/shared/posthog-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Waffert — Build Global Wealth Every Month",
    template: "%s — Waffert",
  },
  description:
    "Simple investment plans for diaspora families, international professionals, and emerging-market investors. Build global wealth every month.",
  keywords: [
    "investing",
    "wealth building",
    "diaspora investing",
    "halal investing",
    "international savers",
    "monthly investment plan",
    "ETF",
    "global wealth",
    "wealth basket",
  ],
  authors: [{ name: "Waffert" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Waffert — Build Global Wealth Every Month",
    description:
      "Simple investment plans for diaspora families, international professionals, and emerging-market investors.",
    url: "https://waffert.com",
    siteName: "Waffert",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waffert — Build Global Wealth Every Month",
    description: "Simple investment plans for international savers.",
  },
  metadataBase: new URL("https://waffert.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </Suspense>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
