import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { LAUNCH_BASKETS } from "@/lib/baskets";
import { ArrowRight, TrendingUp, Shield, Globe, Users, Star, CheckCircle } from "lucide-react";

const STATS = [
  { value: "5", label: "Wealth Baskets" },
  { value: "€100", label: "Start from per month" },
  { value: "Free", label: "Educational quiz" },
  { value: "5min", label: "To your wealth plan" },
];

const REASONS = [
  {
    icon: Globe,
    title: "Built for international savers",
    desc: "Whether you're in Paris, Dubai, or Casablanca — Waffert is designed for the globally mobile investor.",
  },
  {
    icon: Shield,
    title: "Transparent and educational",
    desc: "No jargon. No hidden fees on recommendations. We explain every basket clearly before you decide.",
  },
  {
    icon: TrendingUp,
    title: "Monthly investing made simple",
    desc: "Set a monthly amount, pick a wealth plan, and let compounding do the work over time.",
  },
  {
    icon: Users,
    title: "Diaspora and halal options",
    desc: "Emerging market exposure, Shariah-compliant baskets, and cross-border wealth planning in one place.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Finally a platform that understands I earn in euros but think about wealth in a global context.",
    name: "Amina T.",
    location: "Paris, France",
  },
  {
    quote: "The halal basket concept is exactly what our community has been waiting for.",
    name: "Ibrahim K.",
    location: "London, UK",
  },
  {
    quote: "Simple, clear, and no gambling vibes. This is how investing should feel.",
    name: "Sofia M.",
    location: "Barcelona, Spain",
  },
];

export default function HomePage() {
  const highlightedBaskets = LAUNCH_BASKETS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen pb-[72px] sm:pb-0">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0f2744] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
              <Star size={14} fill="currentColor" />
              Early access — explore wealth baskets for free
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Save smarter.{" "}
              <span className="text-emerald-400">Invest globally.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              Waffert helps international savers explore simple monthly wealth plans. Answer a few questions and discover your ideal wealth basket — free, educational, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-full px-8 font-semibold text-base h-12 w-full sm:w-auto"
                >
                  Find my wealth plan <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/waitlist">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 font-semibold text-base h-12 bg-transparent w-full sm:w-auto"
                >
                  Register for early access
                </Button>
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-5 max-w-lg">
              Educational simulations only. Waffert does not provide investment advice, execute trades, hold client money, or provide custody. Capital is at risk.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#0f2744]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Waffert */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0f2744] mb-4">
              Investing for the globally connected
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Most investing apps are built for one country, one currency, one type of investor. Waffert is built for people who live, earn, and think across borders.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map((r) => (
              <div key={r.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <r.icon size={20} className="text-emerald-600" />
                </div>
                <h3 className="font-semibold text-[#0f2744] mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0f2744] mb-4">How Waffert works</h2>
            <p className="text-gray-600 text-lg">Three steps to your global wealth plan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Answer the wealth quiz",
                desc: "Tell us about your goals, currency, time horizon, and risk preference. Takes 5 minutes.",
              },
              {
                step: "02",
                title: "Get your Wealth Basket",
                desc: "Our rules-based engine recommends an educational basket matched to your profile.",
              },
              {
                step: "03",
                title: "Explore and plan",
                desc: "Use our simulator to see how monthly contributions could grow over time. Then join the waitlist for real investing when we launch.",
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-5">
                <div className="text-5xl font-black text-gray-100 leading-none shrink-0">{step.step}</div>
                <div>
                  <h3 className="font-semibold text-[#0f2744] text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/quiz">
              <Button className="bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-full px-8 h-11 font-semibold">
                Take the free quiz <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Baskets */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#0f2744] mb-2">Wealth Baskets</h2>
              <p className="text-gray-600">Illustrative portfolio concepts for every investor profile</p>
            </div>
            <Link href="/baskets" className="text-sm text-emerald-600 font-semibold hover:underline flex items-center gap-1">
              View all 5 baskets <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {highlightedBaskets.map((basket) => (
              <Link key={basket.slug} href={`/baskets/${basket.slug}`}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group h-full flex flex-col">
                  <div className="text-3xl mb-3">{basket.icon}</div>
                  <h3 className="font-semibold text-[#0f2744] text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                    {basket.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{basket.tagline}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                      <div className="text-xs text-gray-400">Risk level</div>
                      <div className="text-sm font-medium text-[#0f2744] capitalize">{basket.riskLevel}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Time horizon</div>
                      <div className="text-sm font-medium text-[#0f2744]">{basket.timeHorizon}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0f2744] mb-4">From our early community</h2>
            <p className="text-gray-600">What international investors are telling us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="font-medium text-[#0f2744] text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start exploring global wealth plans today
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            Free quiz, personalised basket recommendation, and early access to Waffert when we launch real investing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-50 rounded-full px-8 font-semibold h-12 w-full sm:w-auto"
              >
                Find my wealth plan <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/waitlist">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 font-semibold h-12 bg-transparent w-full sm:w-auto"
              >
                Register for early access
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-emerald-200">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Free, no obligation</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Educational only</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> No client money</span>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 flex gap-3 shadow-lg">
        <Link href="/waitlist" className="flex-1">
          <Button variant="outline" className="w-full rounded-full border-gray-200 text-[#0f2744] font-semibold text-sm h-11">
            Early access
          </Button>
        </Link>
        <Link href="/quiz" className="flex-1">
          <Button className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-full font-semibold text-sm h-11">
            Find my plan
          </Button>
        </Link>
      </div>
    </div>
  );
}
