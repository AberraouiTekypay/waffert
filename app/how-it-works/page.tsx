import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata = {
  title: "How It Works",
  description: "Learn how Waffert helps international investors build global wealth through simple monthly investment plans. Take the quiz, get a plan, start building.",
  openGraph: {
    title: "How Waffert Works — Build Global Wealth Every Month",
    description: "Learn how Waffert helps international investors build global wealth through simple monthly plans.",
    url: "https://waffert.com/how-it-works",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "How Waffert Works",
    description: "Learn how Waffert helps international investors build global wealth.",
  },
};

const STEPS = [
  {
    number: "01",
    title: "Answer the wealth quiz",
    description: "Tell us where you live, what currency you earn in, your investment goals, time horizon, and risk appetite. It takes about 5 minutes and is completely free.",
    bullets: ["Country and currency", "Investment goals and timeline", "Risk appetite", "Halal preference", "Monthly investment capacity"],
    emoji: "📝",
  },
  {
    number: "02",
    title: "Get your Wealth Basket",
    description: "Our rules-based recommendation engine matches your profile to one of nine illustrative wealth baskets — from Conservative EUR to Halal Global to Emerging Market Diaspora.",
    bullets: ["Rules-based, transparent logic", "Nine basket concepts", "Risk score explanation", "Alternative basket suggestions"],
    emoji: "🧺",
  },
  {
    number: "03",
    title: "Explore and understand",
    description: "Each basket comes with a full educational breakdown — asset classes, illustrative allocations, return scenarios, and key risks. No jargon.",
    bullets: ["Asset class breakdowns", "Illustrative return scenarios", "Key risks explained", "Educational context"],
    emoji: "📚",
  },
  {
    number: "04",
    title: "Run the simulator",
    description: "Use our investment simulator to see how monthly contributions and a lump sum could grow over your chosen time horizon — across conservative, base, and optimistic return scenarios.",
    bullets: ["Monthly contribution modelling", "Lump sum integration", "Inflation-adjusted view", "Chart-ready projections"],
    emoji: "📊",
  },
  {
    number: "05",
    title: "Join the waitlist",
    description: "Waffert is in early access. Join the waitlist and we'll notify you when real investing — through regulated partner providers — is available in your country.",
    bullets: ["Early access priority", "Country demand tracking", "No commitment required", "Book a consultation call"],
    emoji: "🚀",
  },
];

const DIFFERENCES = [
  {
    us: "Built for international savers, diaspora investors, and halal-conscious investors",
    them: "Most apps target single-market domestic investors",
  },
  {
    us: "Educational first — we explain every basket before you decide",
    them: "Many platforms push you to invest before you understand",
  },
  {
    us: "No trading screens, no price tickers, no gambling UX",
    them: "Many investing apps deliberately mimic casino aesthetics",
  },
  {
    us: "Goal-based planning: monthly wealth building, not daily trading",
    them: "Most apps encourage excessive activity and speculation",
  },
  {
    us: "Transparent about what Waffert is and isn't (not regulated yet)",
    them: "Some platforms obscure regulatory status or act outside their licence",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">How Waffert works</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From your first question to your wealth plan — simple, transparent, educational.
          </p>
        </div>
      </section>

      <div className="flex-1">
        {/* Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
            {STEPS.map((step, i) => (
              <div key={step.number} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}>
                {/* Visual */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <div className="text-9xl font-black text-gray-100 select-none leading-none">{step.number}</div>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">{step.emoji}</div>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#0f2744] mb-3">{step.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-5">{step.description}</p>
                  <ul className="space-y-2">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why different */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0f2744] mb-3">Why Waffert is different</h2>
              <p className="text-gray-600">We are not a trading app. We are not a brokerage. We are a wealth education platform for international savers.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0f2744] text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Waffert</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {DIFFERENCES.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm text-emerald-700 font-medium">{d.us}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{d.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Important disclaimers */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-[#0f2744] mb-6 text-center">What Waffert is — and isn't</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "✅ Waffert IS", items: ["An educational wealth platform", "A quiz and basket recommendation tool", "An investment simulator", "A waitlist for a future regulated service", "A content and education library"] },
                { label: "❌ Waffert is NOT", items: ["A regulated investment adviser", "A broker-dealer or trading platform", "A custodian of client money", "Providing personalised financial advice", "A guarantee of returns or outcomes"] },
              ].map((col) => (
                <div key={col.label} className={`rounded-2xl p-6 ${col.label.startsWith("✅") ? "bg-emerald-50" : "bg-red-50"}`}>
                  <h3 className="font-semibold text-lg mb-4">{col.label}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0f2744] text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start your wealth plan today</h2>
            <p className="text-gray-300 mb-8">Free, educational, and takes 5 minutes.</p>
            <Link href="/quiz">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-full px-8 h-12 font-semibold">
                Take the free quiz <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
