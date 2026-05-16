"use client";

import { useState } from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Video, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ConsultationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    preferredTime: "",
    monthlyAmount: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please provide your name and email");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else throw new Error("Failed");
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
            <h1 className="text-3xl font-bold text-[#0f2744] mb-3">Request received!</h1>
            <p className="text-gray-600 leading-relaxed">
              Thank you for booking a consultation. Our team will reach out within 48 hours to confirm a time.
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
          <h1 className="text-4xl font-bold mb-4">Book a Consultation</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Speak to a Waffert wealth specialist about your goals, questions, and how global investing could work for you.
          </p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Info sidebar */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4">What to expect</h2>
                <ul className="space-y-4">
                  {[
                    { icon: Video, title: "30-minute video call", desc: "Via Zoom or Google Meet — your preference" },
                    { icon: MessageSquare, title: "No-pressure conversation", desc: "We're here to answer questions, not sell" },
                    { icon: Calendar, title: "Flexible scheduling", desc: "Morning, afternoon, or evening slots available" },
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

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-amber-800 text-xs leading-relaxed">
                  <strong>Disclaimer:</strong> Waffert consultations are educational conversations only. Our specialists are not regulated financial advisers and will not provide personalised investment advice or recommendations to invest. Always seek independent financial advice before making investment decisions.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
              <h2 className="font-semibold text-[#0f2744] text-lg">Your details</h2>

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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Country of residence</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. France"
                  />
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
                <label className="text-sm font-medium text-gray-700 block mb-1">Preferred time slot</label>
                <select
                  value={form.preferredTime}
                  onChange={(e) => setForm((f) => ({ ...f, preferredTime: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">No preference</option>
                  <option value="morning">Morning (9am–12pm CET)</option>
                  <option value="afternoon">Afternoon (12pm–5pm CET)</option>
                  <option value="evening">Evening (5pm–8pm CET)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">What would you like to discuss?</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Your goals, questions, countries you invest in, currencies..."
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-4">
                  This is a non-binding educational consultation. Not regulated investment advice. See our{" "}
                  <a href="/legal/disclaimer" className="underline">disclaimer</a>.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-xl font-semibold h-11"
                >
                  {submitting ? "Sending..." : "Request Consultation"}
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
