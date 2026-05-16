"use client";

import { useState } from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, Users, Zap } from "lucide-react";
import { toast } from "sonner";
import { track, identifyUser } from "@/lib/analytics";

const COUNTRIES = [
  "France", "Germany", "Spain", "Italy", "Netherlands", "Belgium", "Portugal",
  "United Kingdom", "UAE", "Saudi Arabia", "Qatar", "Morocco", "Algeria",
  "Tunisia", "Egypt", "Nigeria", "Senegal", "South Africa", "Kenya", "Other",
];

export default function EarlyAccessPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    currency: "",
    monthlyAmount: "",
    isHalal: false,
    interestedIn: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function toggle(field: string) {
    setForm((f) => ({
      ...f,
      interestedIn: f.interestedIn.includes(field)
        ? f.interestedIn.filter((i) => i !== field)
        : [...f.interestedIn, field],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.name || !form.country) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        track("waitlist_submitted", {
          country: form.country,
          currency: form.currency,
          monthly_amount: form.monthlyAmount,
          is_halal: form.isHalal,
        });
        identifyUser(form.email, { name: form.name, country: form.country });
        setSubmitted(true);
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f2744] mb-3">You're in!</h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              You're registered for early access to Waffert. We'll notify you as soon as investing is available in your country.
            </p>
            <p className="text-sm text-gray-400">
              In the meantime, explore our wealth baskets and run the investment simulator.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Register for Early Access</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Be among the first to invest when Waffert launches with regulated partner providers. Tell us about yourself so we can prioritise your country.
          </p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Benefits */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4">Why register for early access?</h2>
                <ul className="space-y-4">
                  {[
                    { icon: Zap, title: "Early access", desc: "Be first to invest when your country launches" },
                    { icon: Globe, title: "Shape the product", desc: "Your country and currency data helps us prioritise" },
                    { icon: Users, title: "Community access", desc: "Join our educational webinars and community" },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-[#0f2744] text-sm">{item.title}</div>
                        <div className="text-gray-500 text-xs">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
                <h3 className="font-semibold text-emerald-800 mb-2">No commitment</h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  Joining the waitlist is completely free and non-binding. We'll never share your data with third parties for marketing.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
              <h2 className="font-semibold text-[#0f2744] text-lg mb-2">Your details</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Full name *</label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Email address *</label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Country of residence *</label>
                <select
                  required
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select country...</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Currency you earn in</label>
                  <select
                    value={form.currency}
                    onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select currency...</option>
                    {["EUR", "GBP", "USD", "AED", "MAD", "DZD", "NGN", "SAR", "Other"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Monthly investment budget</label>
                  <select
                    value={form.monthlyAmount}
                    onChange={(e) => setForm((f) => ({ ...f, monthlyAmount: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select range...</option>
                    {["< €100", "€100–250", "€250–500", "€500–1,000", "€1,000–2,000", "€2,000+"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">What are you most interested in? (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {["Halal investing", "Emerging markets", "Retirement planning", "Monthly savings plans", "Child education", "Income investing"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggle(item)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                        form.interestedIn.includes(item)
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isHalal}
                    onChange={(e) => setForm((f) => ({ ...f, isHalal: e.target.checked }))}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-gray-600">I require Shariah-compliant (Halal) investment options</span>
                </label>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-4">
                  By joining, you agree to receive email updates about Waffert. We will never sell your data. See our{" "}
                  <a href="/legal/privacy" className="underline">Privacy Policy</a>.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-xl font-semibold h-11"
                >
                  {submitting ? "Joining..." : "Join the Waitlist"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
