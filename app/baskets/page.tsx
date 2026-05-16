import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import DisclaimerBanner from "@/components/shared/disclaimer-banner";
import { Button } from "@/components/ui/button";
import { LAUNCH_BASKETS, getRiskLevelLabel } from "@/lib/baskets";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Wealth Baskets",
  description: "Explore 5 educational wealth basket concepts for international savers. Find the right approach for your goals, currency, and risk profile.",
  openGraph: {
    title: "Wealth Baskets — Waffert",
    description: "Explore 5 educational wealth basket concepts for international savers.",
    url: "https://waffert.com/baskets",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Wealth Baskets — Waffert",
    description: "Explore 5 educational wealth basket concepts for international savers.",
  },
};

const RISK_COLORS: Record<string, string> = {
  conservative: "bg-blue-100 text-blue-700",
  moderate: "bg-teal-100 text-teal-700",
  balanced: "bg-amber-100 text-amber-700",
  growth: "bg-orange-100 text-orange-700",
  aggressive: "bg-red-100 text-red-700",
};

export default function BasketsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Wealth Baskets</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Five illustrative portfolio concepts matched to different investor profiles, goals, and risk appetites. Educational and illustrative only — not financial advice.
          </p>
          <Link href="/quiz" className="inline-block mt-6">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-full px-6 font-semibold">
              Take the quiz to find your basket <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <DisclaimerBanner />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAUNCH_BASKETS.map((basket) => (
              <Link key={basket.slug} href={`/baskets/${basket.slug}`}>
                <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group h-full flex flex-col p-6">
                  {/* Icon + risk badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{basket.icon}</div>
                    <span className={`text-xs font-semibold rounded-full px-3 py-1 ${RISK_COLORS[basket.riskLevel]}`}>
                      {getRiskLevelLabel(basket.riskLevel)}
                    </span>
                  </div>

                  <h2 className="font-semibold text-[#0f2744] text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                    {basket.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{basket.tagline}</p>

                  {/* Asset classes preview */}
                  <div className="space-y-1.5 mb-4">
                    {basket.assetClasses.slice(0, 2).map((ac) => (
                      <div key={ac.name} className="flex justify-between text-xs text-gray-500">
                        <span>{ac.name}</span>
                        <span className="font-medium">{ac.rangeMin}–{ac.rangeMax}%</span>
                      </div>
                    ))}
                    {basket.assetClasses.length > 2 && (
                      <p className="text-xs text-gray-400">+ {basket.assetClasses.length - 2} more</p>
                    )}
                  </div>

                  {/* Return scenarios */}
                  <div className="pt-4 border-t border-gray-50">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Illustrative returns (annual)</span>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-sm font-bold text-blue-600">{basket.returnScenario.conservative}%</span>
                        <span className="text-xs text-gray-400 ml-1">conservative</span>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-emerald-600">{basket.returnScenario.base}%</span>
                        <span className="text-xs text-gray-400 ml-1">base</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Explore basket <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
