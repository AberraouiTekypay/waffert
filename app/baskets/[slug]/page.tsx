import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import DisclaimerBanner from "@/components/shared/disclaimer-banner";
import { Button } from "@/components/ui/button";
import { BASKETS, LAUNCH_BASKETS, getBasketBySlug, getRiskLevelLabel } from "@/lib/baskets";
import { ArrowLeft, ArrowRight, TrendingUp, Shield, Clock, AlertTriangle, Users } from "lucide-react";

export function generateStaticParams() {
  // Generate pages for launch baskets only
  return LAUNCH_BASKETS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const basket = getBasketBySlug(params.slug);
  if (!basket) return { title: "Basket not found" };
  return {
    title: `${basket.name} — Waffert`,
    description: basket.description,
  };
}

const RISK_COLORS: Record<string, string> = {
  conservative: "bg-blue-100 text-blue-700",
  moderate: "bg-teal-100 text-teal-700",
  balanced: "bg-amber-100 text-amber-700",
  growth: "bg-orange-100 text-orange-700",
  aggressive: "bg-red-100 text-red-700",
};

export default function BasketDetailPage({ params }: { params: { slug: string } }) {
  const basket = getBasketBySlug(params.slug);
  if (!basket) notFound();

  const otherBaskets = LAUNCH_BASKETS.filter((b) => b.slug !== basket.slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/baskets" className="inline-flex items-center text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} className="mr-1" /> All baskets
          </Link>
          <div className="flex items-start gap-5">
            <div className="text-5xl">{basket.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-semibold rounded-full px-3 py-1 ${RISK_COLORS[basket.riskLevel]}`}>
                  {getRiskLevelLabel(basket.riskLevel)} risk
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{basket.name}</h1>
              <p className="text-gray-300 text-lg">{basket.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <DisclaimerBanner />

          {/* Overview card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] text-lg mb-4">About this basket</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{basket.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Shield size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500">Risk Level</div>
                <div className="text-sm font-semibold text-[#0f2744] capitalize mt-0.5">{basket.riskLevel}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Clock size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500">Time Horizon</div>
                <div className="text-sm font-semibold text-[#0f2744] mt-0.5">{basket.timeHorizon}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <TrendingUp size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500">Base Return*</div>
                <div className="text-sm font-semibold text-emerald-600 mt-0.5">{basket.returnScenario.base}% p.a.</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Users size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500">Target User</div>
                <div className="text-xs font-medium text-[#0f2744] mt-0.5 leading-tight">{basket.targetUser.split(" ").slice(0, 4).join(" ")}...</div>
              </div>
            </div>
          </div>

          {/* Asset allocation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] text-lg mb-4">Illustrative asset allocation</h2>
            <p className="text-sm text-gray-500 mb-6">
              The ranges below are illustrative concepts only. Actual allocations would depend on market conditions, regulation, and partner provider constraints. This is not an actual investment portfolio.
            </p>
            <div className="space-y-5">
              {basket.assetClasses.map((ac, i) => {
                const mid = (ac.rangeMin + ac.rangeMax) / 2;
                const barColors = [
                  "bg-emerald-500", "bg-blue-500", "bg-purple-500",
                  "bg-amber-500", "bg-teal-500"
                ];
                return (
                  <div key={ac.name}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-medium text-gray-800 text-sm">{ac.name}</span>
                      <span className="text-gray-500 text-sm font-medium">{ac.rangeMin}–{ac.rangeMax}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full rounded-full ${barColors[i % barColors.length]}`}
                        style={{ width: `${mid}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">{ac.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Return scenarios */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] text-lg mb-2">Illustrative return scenarios</h2>
            <p className="text-sm text-gray-500 mb-6">
              These figures are hypothetical and for educational purposes only. They are not forecasts or guarantees.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Conservative", sub: "Lower-end scenario", value: basket.returnScenario.conservative, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Base Case", sub: "Expected scenario", value: basket.returnScenario.base, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Optimistic", sub: "Higher-end scenario", value: basket.returnScenario.optimistic, color: "text-purple-600", bg: "bg-purple-50" },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-5 text-center`}>
                  <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}%</div>
                  <div className="font-medium text-gray-700 text-sm">{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              * Annual return assumptions. Hypothetical only. Past performance is not indicative of future results. Capital is at risk.
            </p>
          </div>

          {/* Educational explanation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] text-lg mb-4">How this basket works</h2>
            <p className="text-gray-600 leading-relaxed">{basket.educationalExplanation}</p>
          </div>

          {/* Suitable for */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] text-lg mb-4">Who is this basket for?</h2>
            <ul className="space-y-2">
              {basket.suitableFor.map((s) => (
                <li key={s} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Key risks */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-amber-600" />
              <h2 className="font-semibold text-amber-900 text-lg">Key risks</h2>
            </div>
            <ul className="space-y-2">
              {basket.keyRisks.map((r) => (
                <li key={r} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="shrink-0 mt-0.5">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="bg-[#0f2744] rounded-2xl p-6 text-white">
            <h2 className="font-semibold text-lg mb-2">Interested in this basket?</h2>
            <p className="text-gray-400 text-sm mb-6">
              Run a simulation to see how monthly contributions could grow. Join our waitlist for when real investing launches.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href={`/simulator?basket=${basket.slug}`}>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold" size="sm">
                  <TrendingUp size={14} className="mr-1" /> Run simulator
                </Button>
              </Link>
              <Link href="/waitlist">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent rounded-xl" size="sm">
                  Join waitlist
                </Button>
              </Link>
              <Link href="/consultation">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent rounded-xl" size="sm">
                  Book a call
                </Button>
              </Link>
            </div>
          </div>

          {/* Other baskets */}
          <div>
            <h2 className="font-semibold text-[#0f2744] text-lg mb-4">Explore other baskets</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherBaskets.map((b) => (
                <Link key={b.slug} href={`/baskets/${b.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-emerald-200 transition-all group">
                    <div className="text-2xl mb-2">{b.icon}</div>
                    <h3 className="font-semibold text-[#0f2744] text-sm group-hover:text-emerald-700 transition-colors">{b.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{b.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link href="/baskets" className="text-sm text-emerald-600 font-semibold hover:underline flex items-center gap-1 justify-center">
                View all baskets <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
