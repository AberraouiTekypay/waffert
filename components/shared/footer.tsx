import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f2744] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0f2744] text-sm font-black">W</span>
              Waffert
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Build global wealth every month. Simple investment plans for international savers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link href="/baskets" className="hover:text-white transition-colors">Wealth Baskets</Link></li>
              <li><Link href="/simulator" className="hover:text-white transition-colors">Simulator</Link></li>
              <li><Link href="/quiz" className="hover:text-white transition-colors">Take the Quiz</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Learn</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/education" className="hover:text-white transition-colors">Education Library</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition-colors">Book a Consultation</Link></li>
              <li><Link href="/waitlist" className="hover:text-white transition-colors">Early Access</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/legal/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-5 text-xs text-gray-400 leading-relaxed mb-6">
            <strong className="text-gray-300">Important Notice:</strong> Waffert is currently in early access. The platform provides educational simulations only and does not provide investment advice, execution, custody, or client-money services. Future investment services, if launched, will be offered through appropriately regulated partners. All basket illustrations and simulator outputs are hypothetical and do not represent actual investment results or guarantees. The value of investments can fall as well as rise — capital is at risk. Always seek independent financial advice before making investment decisions.
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Waffert. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              waffert.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
