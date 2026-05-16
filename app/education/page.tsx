import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Education Library — Waffert",
  description: "Learn about investing, wealth building, ETFs, halal investing, and more with Waffert's education library.",
};

const ARTICLES = [
  {
    category: "Foundations",
    items: [
      { title: "What is compound interest and why does it matter?", desc: "The most powerful force in investing — explained simply.", time: "5 min read", emoji: "📈" },
      { title: "ETFs vs individual stocks: which is right for most investors?", desc: "Understanding the difference and why diversification matters.", time: "7 min read", emoji: "📊" },
      { title: "What does 'risk' really mean in investing?", desc: "Going beyond volatility to understand what you're actually risking.", time: "6 min read", emoji: "⚖️" },
      { title: "Why time horizon is the most important investment decision", desc: "How your timeline changes everything about how you should invest.", time: "5 min read", emoji: "⏱️" },
    ],
  },
  {
    category: "For International Investors",
    items: [
      { title: "How diaspora investors can build wealth across borders", desc: "Special considerations for those who earn in one country but invest globally.", time: "8 min read", emoji: "🌍" },
      { title: "Currency risk: what it is and how to manage it", desc: "When you hold assets in a different currency from your income.", time: "6 min read", emoji: "💱" },
      { title: "Investing from France, Germany, or Spain as a non-EU citizen", desc: "Practical considerations for international residents in Europe.", time: "9 min read", emoji: "🇪🇺" },
      { title: "Protecting wealth against inflation in emerging markets", desc: "How to think about preserving purchasing power across different economic environments.", time: "7 min read", emoji: "🛡️" },
    ],
  },
  {
    category: "Halal Investing",
    items: [
      { title: "Introduction to Shariah-compliant investing", desc: "The principles behind halal finance — riba, gharar, and prohibited sectors.", time: "8 min read", emoji: "☪️" },
      { title: "What is sukuk? The Islamic alternative to bonds explained", desc: "How sukuk generates returns without interest payments.", time: "6 min read", emoji: "📜" },
      { title: "How halal equity screening works", desc: "What makes a company Shariah-compliant and what gets excluded.", time: "7 min read", emoji: "🔍" },
      { title: "ESG vs Halal investing: differences and overlaps", desc: "Both are values-based — but they're not the same thing.", time: "5 min read", emoji: "🌿" },
    ],
  },
  {
    category: "Portfolio Basics",
    items: [
      { title: "What is a model portfolio and how does it work?", desc: "Understanding basket-style investing and why diversification is essential.", time: "6 min read", emoji: "🧺" },
      { title: "The case for monthly investing (pound/euro-cost averaging)", desc: "Why regular small contributions often beat timing the market.", time: "5 min read", emoji: "📅" },
      { title: "How to read investment returns: nominal vs real", desc: "Why inflation always matters when evaluating investment performance.", time: "4 min read", emoji: "🔢" },
      { title: "Bonds vs equities: understanding the fundamental tradeoff", desc: "The building blocks of almost every diversified portfolio.", time: "7 min read", emoji: "📉" },
    ],
  },
];

export default function EducationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Education Library</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need to understand global investing — from foundations to halal finance to cross-border wealth building.
          </p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Coming soon notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">
            <BookOpen size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-800 text-sm font-medium mb-1">Articles coming soon</p>
              <p className="text-blue-700 text-sm">
                Full articles are being written by our team. The topics below represent our content roadmap. Join the waitlist to be notified when new content is published.
              </p>
            </div>
          </div>

          {ARTICLES.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-[#0f2744] mb-6 pb-3 border-b border-gray-200">
                {section.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {section.items.map((article) => (
                  <div
                    key={article.title}
                    className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl shrink-0">{article.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-[#0f2744] text-sm mb-1 leading-snug">{article.title}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-2">{article.desc}</p>
                        <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">
                          {article.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-[#0f2744] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to put knowledge into practice?</h2>
            <p className="text-gray-300 mb-6">Take the quiz to get your personalised wealth basket recommendation.</p>
            <Link href="/quiz">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-full px-8 font-semibold">
                Take the free quiz <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
