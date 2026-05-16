"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import DisclaimerBanner from "@/components/shared/disclaimer-banner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { runSimulator, RETURN_PRESETS } from "@/lib/simulator";
import { formatCurrency } from "@/lib/utils";
import { LAUNCH_BASKETS, getBasketBySlug } from "@/lib/baskets";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Link from "next/link";

const CURRENCIES = [
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "USD", symbol: "$" },
];

function SimulatorContent() {
  const params = useSearchParams();

  const [monthly, setMonthly] = useState(Number(params.get("monthly") || 500));
  const [lump, setLump] = useState(Number(params.get("lump") || 0));
  const [years, setYears] = useState(Number(params.get("years") || 10));
  const [scenario, setScenario] = useState<"conservative" | "base" | "optimistic">("base");
  const [inflationRate, setInflationRate] = useState(2.5);
  const [currency, setCurrency] = useState("EUR");
  const [selectedBasket, setSelectedBasket] = useState(params.get("basket") || "global-growth");

  const basket = getBasketBySlug(selectedBasket);
  const presets = RETURN_PRESETS[selectedBasket] || RETURN_PRESETS.default;
  const annualReturn = presets[scenario];

  const result = runSimulator({
    monthlyAmount: monthly,
    lumpSum: lump,
    years,
    annualReturn,
    inflationRate,
    currency,
  });

  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || "€";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-[#0f2744] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Investment Simulator</h1>
          <p className="text-gray-300 text-lg">
            See how your monthly contributions could grow over time. Educational illustration only.
          </p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <DisclaimerBanner />

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Controls */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
                <h2 className="font-semibold text-[#0f2744] text-lg">Your inputs</h2>

                {/* Basket selector */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Wealth Basket</label>
                  <select
                    value={selectedBasket}
                    onChange={(e) => setSelectedBasket(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {LAUNCH_BASKETS.map((b) => (
                      <option key={b.slug} value={b.slug}>{b.icon} {b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Currency</label>
                  <div className="flex gap-2">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c.code)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                          currency === c.code
                            ? "bg-[#0f2744] text-white border-[#0f2744]"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Monthly investment</label>
                    <span className="text-sm font-bold text-[#0f2744]">{currencySymbol}{monthly.toLocaleString()}</span>
                  </div>
                  <Slider
                    min={50}
                    max={5000}
                    step={50}
                    value={[monthly]}
                    onValueChange={([v]) => setMonthly(v)}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{currencySymbol}50</span>
                    <span>{currencySymbol}5,000</span>
                  </div>
                </div>

                {/* Lump sum */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Initial lump sum</label>
                    <span className="text-sm font-bold text-[#0f2744]">{currencySymbol}{lump.toLocaleString()}</span>
                  </div>
                  <Slider
                    min={0}
                    max={100000}
                    step={1000}
                    value={[lump]}
                    onValueChange={([v]) => setLump(v)}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{currencySymbol}0</span>
                    <span>{currencySymbol}100k</span>
                  </div>
                </div>

                {/* Time horizon */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Investment period</label>
                    <span className="text-sm font-bold text-[#0f2744]">{years} years</span>
                  </div>
                  <Slider
                    min={1}
                    max={40}
                    step={1}
                    value={[years]}
                    onValueChange={([v]) => setYears(v)}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 yr</span>
                    <span>40 yrs</span>
                  </div>
                </div>

                {/* Inflation rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Assumed inflation</label>
                    <span className="text-sm font-bold text-[#0f2744]">{inflationRate}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={8}
                    step={0.5}
                    value={[inflationRate]}
                    onValueChange={([v]) => setInflationRate(v)}
                  />
                </div>

                {/* Scenario */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Return scenario</label>
                  <div className="flex gap-2">
                    {(["conservative", "base", "optimistic"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setScenario(s)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${
                          scenario === s
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {basket?.name}: {presets[scenario]}% annual return (illustrative)
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total contributions", value: formatCurrency(result.totalContributions, currency), color: "text-gray-700" },
                  { label: "Estimated future value*", value: formatCurrency(result.futureValue, currency), color: "text-emerald-600" },
                  { label: "Estimated gain*", value: formatCurrency(result.totalGain, currency), color: "text-purple-600" },
                  { label: "Inflation-adjusted value*", value: formatCurrency(result.inflationAdjustedValue, currency), color: "text-blue-600" },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                    <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-semibold text-[#0f2744] mb-4">Growth over time</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={result.yearlyBreakdown} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <defs>
                      <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f2744" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#0f2744" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="year"
                      tickFormatter={(v) => `Yr ${v}`}
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `${currencySymbol}${(v / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(Number(value), currency),
                        name === "value" ? "Estimated value" : name === "contributions" ? "Contributions" : "Inflation-adjusted",
                      ]}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend
                      formatter={(value) =>
                        value === "value"
                          ? "Estimated value"
                          : value === "contributions"
                          ? "Total contributions"
                          : "Inflation-adjusted"
                      }
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#valueGrad)" />
                    <Area type="monotone" dataKey="contributions" stroke="#0f2744" strokeWidth={2} fill="url(#contribGrad)" strokeDasharray="4 2" />
                    <Area type="monotone" dataKey="inflationAdjusted" stroke="#6366f1" strokeWidth={1.5} fill="none" strokeDasharray="3 3" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                * These are illustrative projections based on a {presets[scenario]}% annual return assumption for the {scenario} scenario. They are educational only and do not represent actual investment results, guarantees, or forecasts. The value of investments can fall as well as rise. You may get back less than you invest. Returns are not guaranteed. Inflation-adjusted figures use a {inflationRate}% assumed inflation rate.
              </div>

              {/* CTA */}
              <div className="bg-[#0f2744] rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Ready to invest?</h3>
                <p className="text-gray-400 text-sm mb-4">Join the waitlist for when Waffert launches real investing through regulated partners.</p>
                <div className="flex gap-3">
                  <Link href="/waitlist">
                    <Button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold" size="sm">
                      Join waitlist
                    </Button>
                  </Link>
                  <Link href="/quiz">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent rounded-xl" size="sm">
                      Retake quiz
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-[#0f2744] border-t-transparent rounded-full" /></div>}>
      <SimulatorContent />
    </Suspense>
  );
}
