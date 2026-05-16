import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waffert — Build Global Wealth Every Month",
  description:
    "Simple investment plans for diaspora families, international professionals, and emerging-market investors. Build global wealth every month.",
  keywords: [
    "investing",
    "wealth",
    "diaspora",
    "halal investing",
    "ETF",
    "monthly investment",
    "savings plan",
    "global wealth",
  ],
  openGraph: {
    title: "Waffert — Build Global Wealth Every Month",
    description: "Simple investment plans for international savers.",
    url: "https://waffert.com",
    siteName: "Waffert",
    type: "website",
  },
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
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
