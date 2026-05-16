"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/baskets", label: "Baskets" },
  { href: "/simulator", label: "Simulator" },
  { href: "/education", label: "Learn" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#0f2744]">
            <span className="w-8 h-8 bg-[#0f2744] rounded-lg flex items-center justify-center text-white text-sm font-black">W</span>
            Waffert
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-[#0f2744] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/waitlist">
              <Button size="sm" variant="outline" className="rounded-full px-4 text-[#0f2744] border-gray-200 hover:bg-gray-50 text-sm">
                Early access
              </Button>
            </Link>
            <Link href="/quiz">
              <Button size="sm" className="bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-full px-5">
                Find my plan
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200",
            open ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2 space-y-2">
              <Link href="/quiz" onClick={() => setOpen(false)}>
                <Button className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-full">
                  Find my wealth plan
                </Button>
              </Link>
              <Link href="/waitlist" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full rounded-full border-gray-200">
                  Register for early access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
