"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, Globe, BarChart2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASKETS } from "@/lib/baskets";

// Mock data — replace with Supabase queries
const MOCK_STATS = {
  totalVisitors: 1247,
  quizStarts: 489,
  quizCompletions: 312,
  waitlistSignups: 187,
  consultationRequests: 34,
  completionRate: 63.8,
};

const MOCK_COUNTRIES = [
  { country: "France", count: 89 },
  { country: "Morocco", count: 67 },
  { country: "UAE", count: 45 },
  { country: "United Kingdom", count: 38 },
  { country: "Germany", count: 29 },
  { country: "Algeria", count: 22 },
  { country: "Spain", count: 18 },
  { country: "Netherlands", count: 14 },
];

const MOCK_BASKETS = [
  { slug: "halal-global", count: 87 },
  { slug: "global-growth", count: 72 },
  { slug: "emerging-market-diaspora", count: 58 },
  { slug: "retirement-builder", count: 41 },
  { slug: "conservative-eur", count: 28 },
  { slug: "child-education", count: 19 },
];

const MOCK_MONTHLY = [
  { range: "< €100", count: 22 },
  { range: "€100–250", count: 67 },
  { range: "€250–500", count: 89 },
  { range: "€500–1,000", count: 73 },
  { range: "€1,000–2,000", count: 41 },
  { range: "€2,000+", count: 20 },
];

const MOCK_LEADS = [
  { name: "Amina Touré", email: "a.toure@email.com", country: "France", currency: "EUR", monthly: "€250–500", basket: "Halal Global", isHalal: true, date: "2026-05-15" },
  { name: "Ibrahim Khalil", email: "i.khalil@email.com", country: "UAE", currency: "AED", monthly: "€1,000–2,000", basket: "Global Growth", isHalal: true, date: "2026-05-15" },
  { name: "Sofia Martins", email: "s.martins@email.com", country: "Spain", currency: "EUR", monthly: "€500–1,000", basket: "Conservative EUR", isHalal: false, date: "2026-05-14" },
  { name: "Omar Benali", email: "o.benali@email.com", country: "Morocco", currency: "MAD", monthly: "€250–500", basket: "Emerging Market Diaspora", isHalal: true, date: "2026-05-14" },
  { name: "Marie Dubois", email: "m.dubois@email.com", country: "France", currency: "EUR", monthly: "€100–250", basket: "Retirement Builder", isHalal: false, date: "2026-05-13" },
];

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
          <Icon size={16} className="text-emerald-600" />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#0f2744]">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "leads">("overview");

  // Simple password gate — replace with proper auth
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-sm shadow-sm">
          <div className="flex items-center gap-2 font-bold text-xl text-[#0f2744] mb-6">
            <span className="w-8 h-8 bg-[#0f2744] rounded-lg flex items-center justify-center text-white text-sm font-black">W</span>
            Admin
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "waffert2026") && setAuthed(true)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter admin password"
              />
            </div>
            <Button
              className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-xl"
              onClick={() => {
                if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "waffert2026")) setAuthed(true);
                else alert("Wrong password");
              }}
            >
              Access Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-[#0f2744] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0f2744] text-sm font-black">W</span>
            <span className="font-semibold">Waffert Admin</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-medium transition-colors ${activeTab === "overview" ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`text-sm font-medium transition-colors ${activeTab === "leads" ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              Leads
            </button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setAuthed(false)}
            className="text-gray-400 hover:text-white text-xs"
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f2744]">
              {activeTab === "overview" ? "Dashboard Overview" : "Lead Management"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Data shown is illustrative — connect Supabase to see real data</p>
          </div>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <RefreshCw size={14} /> Refresh
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Waitlist signups" value={MOCK_STATS.waitlistSignups} sub="All time" />
              <StatCard icon={BarChart2} label="Quiz completions" value={MOCK_STATS.quizCompletions} sub={`${MOCK_STATS.completionRate}% completion rate`} />
              <StatCard icon={TrendingUp} label="Quiz starts" value={MOCK_STATS.quizStarts} />
              <StatCard icon={Globe} label="Consultation requests" value={MOCK_STATS.consultationRequests} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Top countries */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4">Demand by country</h2>
                <div className="space-y-3">
                  {MOCK_COUNTRIES.map((c) => {
                    const max = MOCK_COUNTRIES[0].count;
                    return (
                      <div key={c.country}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{c.country}</span>
                          <span className="text-gray-500 font-medium">{c.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(c.count / max) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top baskets */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4">Basket recommendations</h2>
                <div className="space-y-3">
                  {MOCK_BASKETS.map((b) => {
                    const basket = BASKETS.find((basket) => basket.slug === b.slug);
                    const max = MOCK_BASKETS[0].count;
                    return (
                      <div key={b.slug}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{basket?.icon} {basket?.name.replace(" Basket", "")}</span>
                          <span className="text-gray-500 font-medium">{b.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(b.count / max) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly investment ranges */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4">Monthly investment ranges</h2>
                <div className="space-y-3">
                  {MOCK_MONTHLY.map((m) => {
                    const max = Math.max(...MOCK_MONTHLY.map((x) => x.count));
                    return (
                      <div key={m.range}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{m.range}</span>
                          <span className="text-gray-500 font-medium">{m.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(m.count / max) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Kill/continue thresholds */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-semibold text-[#0f2744] mb-4">Validation thresholds</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Kill", desc: "< 100 waitlist in 60 days", condition: MOCK_STATS.waitlistSignups < 100, color: "bg-red-50 border-red-200 text-red-700" },
                  { label: "Continue + pivot", desc: "100–500 waitlist, adjust messaging", condition: MOCK_STATS.waitlistSignups >= 100 && MOCK_STATS.waitlistSignups < 500, color: "bg-amber-50 border-amber-200 text-amber-700" },
                  { label: "Scale", desc: "500+ waitlist, strong country clustering", condition: MOCK_STATS.waitlistSignups >= 500, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                ].map((t) => (
                  <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                    <div className="font-semibold text-lg mb-1">{t.label}</div>
                    <div className="text-sm">{t.desc}</div>
                    {t.condition && <div className="text-xs font-bold mt-2 uppercase">→ Current status</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Export button placeholder */}
            <div className="flex justify-end">
              <Button size="sm" variant="outline" className="text-xs">
                Export CSV (TODO: connect Supabase)
              </Button>
            </div>

            {/* Leads table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Name", "Email", "Country", "Currency", "Monthly", "Basket", "Halal", "Date"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_LEADS.map((lead, i) => (
                      <tr key={lead.email} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-5 py-3 font-medium text-[#0f2744]">{lead.name}</td>
                        <td className="px-5 py-3 text-gray-600">{lead.email}</td>
                        <td className="px-5 py-3 text-gray-600">{lead.country}</td>
                        <td className="px-5 py-3 text-gray-600">{lead.currency}</td>
                        <td className="px-5 py-3 text-gray-600">{lead.monthly}</td>
                        <td className="px-5 py-3 text-gray-600 text-xs">{lead.basket}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lead.isHalal ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                            {lead.isHalal ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-500 text-xs">{lead.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
                Showing mock data — connect Supabase to see real leads
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
