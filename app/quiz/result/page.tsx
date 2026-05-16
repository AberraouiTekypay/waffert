"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import DisclaimerBanner from "@/components/shared/disclaimer-banner";
import { Button } from "@/components/ui/button";
import { getBasketBySlug } from "@/lib/baskets";
import { computeRiskScore, recommendBaskets, getRiskLabel, getRiskDescription } from "@/lib/recommendation-engine";
import { QuizAnswer, RiskScore, BasketSlug, Basket } from "@/lib/types";
import { ArrowRight, TrendingUp, Shield, Clock, Target, ChevronRight } from "lucide-react";

interface QuizResult {
  id: string;
  answers: QuizAnswer;
  riskScore: RiskScore;
  recommendation: { primary: BasketSlug; alternatives: BasketSlug[] };
}

function RiskMeter({ score }: { score: number }) {
  const pct = ((score - 1) / 4) * 100;
  const colors = ["bg-emerald-500", "bg-emerald-400", "bg-amber-400", "bg-orange-400", "bg-red-400"];
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Conservative</span>
        <span>Aggressive</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colors[score - 1]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuizResultContent() {
  const params = useSearchParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [primaryBasket, setPrimaryBasket] = useState<Basket | null>(null);
  const [altBaskets, setAltBaskets] = useState<Basket[]>([]);

  useEffect(() => {
    // Try cookie first
    const isLocal = params.get("local") === "1";
    let quizResult: QuizResult | null = null;

    if (!isLocal) {
      const cookieMatch = document.cookie.match(/waffert_quiz_result=([^;]+)/);
      if (cookieMatch) {
        try {
          quizResult = JSON.parse(decodeURIComponent(cookieMatch[1]));
        } catch {}
      }
    }

    // Fallback to session storage
    if (!quizResult) {
      const stored = sessionStorage.getItem("waffert_quiz");
      if (stored) {
        const answers: QuizAnswer = JSON.parse(stored);
        const riskScore = computeRiskScore(answers);
        const recommendation = recommendBaskets(answers, riskScore);
        quizResult = {
          id: crypto.randomUUID(),
          answers,
          riskScore,
          recommendation,
        };
      }
    }

    if (quizResult) {
      setResult(quizResult);
      const primary = getBasketBySlug(quizResult.recommendation.primary);
      if (primary) setPrimaryBasket(primary);
      const alts = quizResult.recommendation.alternatives
        .map((slug) => getBasketBySlug(slug))
        .filter(Boolean) as Basket[];
      setAltBaskets(alts);
    }
  }, [params]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#0f2744] border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!result || !primaryBasket) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-[#0f2744] mb-3">No results found</h1>
            <p className="text-gray-500 mb-6 leading-relaxed">
              We couldn't find your quiz results. This can happen if you cleared your browser data or opened the link on a different device.
            </p>
            <Link href="/quiz">
              <Button className="bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-full px-8 font-semibold">
                Retake the quiz
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { riskScore, answers } = result;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero result header */}
      <section className="bg-[#0f2744] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-400 font-medium text-sm mb-2 uppercase tracking-wider">Your wealth plan</p>
          <div className="text-5xl mb-3">{primaryBasket.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{primaryBasket.name}</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">{primaryBasket.tagline}</p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
          {/* Disclaimer */}
          <DisclaimerBanner />

          {/* Risk profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] text-lg mb-1">Your risk profile</h2>
            <p className="text-2xl font-bold text-emerald-600 mb-1">{getRiskLabel(riskScore.total)}</p>
            <p className="text-gray-600 text-sm mb-4">{getRiskDescription(riskScore.total)}</p>
            <RiskMeter score={riskScore.total} />
          </div>

          {/* Primary basket details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-semibold text-[#0f2744] text-lg mb-1">Recommended Basket</h2>
                <p className="text-gray-500 text-sm">{primaryBasket.description}</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Shield size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500 mb-0.5">Risk Level</div>
                <div className="text-sm font-semibold text-[#0f2744] capitalize">{primaryBasket.riskLevel}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Clock size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500 mb-0.5">Time Horizon</div>
                <div className="text-sm font-semibold text-[#0f2744]">{primaryBasket.timeHorizon}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Target size={18} className="text-[#0f2744] mx-auto mb-1" />
                <div className="text-xs text-gray-500 mb-0.5">Goal</div>
                <div className="text-sm font-semibold text-[#0f2744]">{primaryBasket.goal}</div>
              </div>
            </div>

            {/* Illustrative allocation */}
            <h3 className="font-semibold text-[#0f2744] text-sm mb-3">Illustrative asset allocation</h3>
            <div className="space-y-3">
              {primaryBasket.assetClasses.map((ac) => (
                <div key={ac.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{ac.name}</span>
                    <span className="text-gray-500 font-medium">{ac.rangeMin}–{ac.rangeMax}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(ac.rangeMin + ac.rangeMax) / 2}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{ac.description}</p>
                </div>
              ))}
            </div>

            {/* Return scenarios */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="text-sm font-semibold text-[#0f2744] mb-3">Illustrative annual return scenarios</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Conservative", value: primaryBasket.returnScenario.conservative, color: "text-blue-600" },
                  { label: "Base case", value: primaryBasket.returnScenario.base, color: "text-emerald-600" },
                  { label: "Optimistic", value: primaryBasket.returnScenario.optimistic, color: "text-purple-600" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className={`text-xl font-bold ${s.color}`}>{s.value}%</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Hypothetical figures only. Not a forecast. Past performance is not indicative of future results.
              </p>
            </div>
          </div>

          {/* Key risks */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-[#0f2744] mb-4">Key risks to understand</h2>
            <ul className="space-y-3">
              {primaryBasket.keyRisks.map((risk) => (
                <li key={risk} className="flex gap-3 text-sm text-gray-600">
                  <span className="text-amber-500 shrink-0 mt-0.5">⚠</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="bg-[#0f2744] rounded-2xl p-6 text-white">
            <h2 className="font-semibold text-lg mb-2">What would you like to do next?</h2>
            <p className="text-gray-400 text-sm mb-6">
              Waffert is in early access. Join the waitlist for when we launch real investing, or book a call to discuss your wealth plan.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href={`/baskets/${primaryBasket.slug}`}>
                <Button className="w-full bg-white text-[#0f2744] hover:bg-gray-100 rounded-xl font-semibold" size="sm">
                  Explore this basket <ChevronRight size={14} className="ml-1" />
                </Button>
              </Link>
              <Link href={`/simulator?basket=${primaryBasket.slug}&monthly=${answers.monthlyAmount}&lump=${answers.lumpSum}&years=${answers.timeHorizon}`}>
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
                  Book a consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Alternative baskets */}
          {altBaskets.length > 0 && (
            <div>
              <h2 className="font-semibold text-[#0f2744] mb-4">You might also consider</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {altBaskets.map((b) => (
                  <Link key={b.slug} href={`/baskets/${b.slug}`}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-emerald-200 transition-all group">
                      <div className="text-2xl mb-2">{b.icon}</div>
                      <h3 className="font-semibold text-[#0f2744] text-sm group-hover:text-emerald-700 transition-colors">{b.name}</h3>
                      <p className="text-gray-500 text-xs mt-1">{b.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function QuizResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#0f2744] border-t-transparent rounded-full" />
      </div>
    }>
      <QuizResultContent />
    </Suspense>
  );
}
