"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, TrendingUp, Globe, BarChart2, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASKETS } from "@/lib/baskets";

interface StatsData {
  waitlistTotal: number;
  quizTotal: number;
  consultationTotal: number;
  halalPct: number;
  topCountries: { country: string; count: number }[];
  topBaskets: { slug: string; count: number }[];
  monthlyDistribution: { range: string; count: number }[];
  recentLeads: {
    name: string;
    email: string;
    country: string;
    currency: string;
    monthly_amount: string;
    is_halal: boolean;
    created_at: string;
  }[];
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
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

function BarRow({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 truncate mr-2">{label}</span>
        <span className="text-gray-500 font-medium shrink-0">{count}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${(count / max) * 100}%` }} />
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "leads">("overview");
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "waffert2026";

  const fetchStats = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (!res.ok) throw new Error("Unauthorized or fetch failed");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      setError("Failed to load data. Check your password or Supabase connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleLogin() {
    if (password === adminPassword) {
      setAuthed(true);
      fetchStats(password);
    } else {
      setError("Wrong password");
    }
  }

  function exportCSV() {
    if (!stats?.recentLeads) return;
    const rows = [
      ["Name", "Email", "Country", "Currency", "Monthly", "Halal", "Date"],
      ...stats.recentLeads.map((l) => [
        l.name,
        l.email,
        l.country,
        l.currency || "",
        l.monthly_amount || "",
        l.is_halal ? "Yes" : "No",
        l.created_at?.split("T")[0] || "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waffert-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

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
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-xl"
              onClick={handleLogin}
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
      {/* Header */}
      <div className="bg-[#0f2744] text-white px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0f2744] text-sm font-black">W</span>
            <span className="font-semibold text-sm sm:text-base">Waffert Admin</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            {(["overview", "leads"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium capitalize transition-colors ${activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0f2744]">
              {activeTab === "overview" ? "Dashboard" : "Leads"}
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">Live data from Supabase</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2 text-xs"
            onClick={() => fetchStats(password)}
            disabled={loading}
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && !stats && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[#0f2744] border-t-transparent rounded-full" />
          </div>
        )}

        {stats && activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={Users} label="Early access" value={stats.waitlistTotal} sub="Registrations" />
              <StatCard icon={BarChart2} label="Quiz completions" value={stats.quizTotal} />
              <StatCard icon={TrendingUp} label="Consultations" value={stats.consultationTotal} />
              <StatCard icon={Globe} label="Halal interest" value={`${stats.halalPct}%`} sub="of registrations" />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Countries */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4 text-sm">Demand by country</h2>
                {stats.topCountries.length === 0 ? (
                  <p className="text-gray-400 text-sm">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {stats.topCountries.map((c) => (
                      <BarRow key={c.country} label={c.country} count={c.count} max={stats.topCountries[0].count} color="bg-emerald-500" />
                    ))}
                  </div>
                )}
              </div>

              {/* Baskets */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4 text-sm">Basket recommendations</h2>
                {stats.topBaskets.length === 0 ? (
                  <p className="text-gray-400 text-sm">No quiz data yet</p>
                ) : (
                  <div className="space-y-3">
                    {stats.topBaskets.map((b) => {
                      const basket = BASKETS.find((bk) => bk.slug === b.slug);
                      return (
                        <BarRow
                          key={b.slug}
                          label={`${basket?.icon || ""} ${basket?.name.replace(" Basket", "") || b.slug}`}
                          count={b.count}
                          max={stats.topBaskets[0].count}
                          color="bg-blue-500"
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Monthly ranges */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h2 className="font-semibold text-[#0f2744] mb-4 text-sm">Monthly investment ranges</h2>
                {stats.monthlyDistribution.length === 0 ? (
                  <p className="text-gray-400 text-sm">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {stats.monthlyDistribution.map((m) => (
                      <BarRow key={m.range} label={m.range} count={m.count} max={stats.monthlyDistribution[0].count} color="bg-purple-500" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thresholds */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-semibold text-[#0f2744] mb-4 text-sm">Validation thresholds</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Kill", desc: "< 100 signups in 60 days", active: stats.waitlistTotal < 100, color: "bg-red-50 border-red-200 text-red-700" },
                  { label: "Continue", desc: "100–500 signups, refine messaging", active: stats.waitlistTotal >= 100 && stats.waitlistTotal < 500, color: "bg-amber-50 border-amber-200 text-amber-700" },
                  { label: "Scale", desc: "500+ signups, activate provider", active: stats.waitlistTotal >= 500, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                ].map((t) => (
                  <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                    <div className="font-semibold text-lg mb-1">{t.label}</div>
                    <div className="text-sm">{t.desc}</div>
                    {t.active && <div className="text-xs font-bold mt-2 uppercase">→ Current</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {stats && activeTab === "leads" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={exportCSV} className="flex items-center gap-2 text-xs">
                <Download size={12} /> Export CSV
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Name", "Email", "Country", "Currency", "Monthly", "Halal", "Date"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                          No registrations yet. Share the link!
                        </td>
                      </tr>
                    ) : (
                      stats.recentLeads.map((lead, i) => (
                        <tr key={lead.email} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 font-medium text-[#0f2744] whitespace-nowrap">{lead.name}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{lead.email}</td>
                          <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.country}</td>
                          <td className="px-4 py-3 text-gray-600">{lead.currency || "—"}</td>
                          <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{lead.monthly_amount || "—"}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lead.is_halal ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                              {lead.is_halal ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                            {lead.created_at?.split("T")[0] || "—"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
