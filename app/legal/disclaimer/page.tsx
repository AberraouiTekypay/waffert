import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export const metadata = {
  title: "Legal Disclaimer — Waffert",
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl font-bold text-[#0f2744] mb-2">Legal Disclaimer</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="prose prose-gray max-w-none space-y-8">
            {[
              {
                title: "Educational purposes only",
                content: "All content on this platform — including basket illustrations, risk profiles, simulator outputs, and educational materials — is provided for educational and illustrative purposes only. Nothing on this platform constitutes personalised financial advice, investment recommendations, or an offer or solicitation to buy, sell, or hold any financial instrument.",
              },
              {
                title: "Not a regulated financial service",
                content: "Waffert is not a licensed investment adviser, broker-dealer, portfolio manager, financial planner, or regulated financial services provider in any jurisdiction. We do not hold regulatory permission from the FCA (UK), AMF (France), CNMV (Spain), BaFin (Germany), the UAE SCA/CBUAE, or any other regulatory authority to provide investment advice, manage portfolios, execute trades, or hold client money. Our regulatory status is subject to ongoing legal review as we explore partnerships with licensed providers.",
              },
              {
                title: "No execution, custody, or client money",
                content: "Waffert does not execute trades on your behalf. We do not hold custody of any assets. We do not receive, hold, or manage client money in any form. Any future connection to regulated execution or custody services will be through appropriately licensed third-party partner providers, disclosed clearly to users at that time.",
              },
              {
                title: "Basket illustrations are not actual portfolios",
                content: "The 'Wealth Baskets' described on this platform are illustrative portfolio concepts only. They are not actual managed funds, ETFs, unit trusts, or investment products. Actual allocations within such concepts would vary significantly based on market conditions, regulatory constraints, provider availability, and individual circumstances. No basket illustration should be treated as a specific investment recommendation.",
              },
              {
                title: "Simulator outputs are hypothetical",
                content: "The investment simulator uses assumed annual return rates and compound interest formulae for illustrative and educational purposes. All simulator outputs are hypothetical projections only. They are not forecasts, guarantees, or predictions of future investment returns. Actual returns can be significantly higher or lower than any scenario shown. Past performance is not indicative of future results.",
              },
              {
                title: "Capital at risk",
                content: "All investing involves risk. The value of investments can fall as well as rise. You may get back less than you invest. Some investment categories — particularly emerging market equities, commodities, and less liquid assets — carry substantial risk of capital loss. Do not invest money you cannot afford to lose.",
              },
              {
                title: "Halal compliance",
                content: "The Halal Global Basket and any references to Shariah-compliant investing on this platform are illustrative educational concepts only. Waffert does not employ certified Shariah scholars or provide Shariah certification. Any actual Shariah-compliant investment product would require certification by qualified Islamic scholars and appropriate regulatory compliance. Always seek qualified Islamic finance advice before relying on any Shariah-compliance assertion.",
              },
              {
                title: "Cross-border and regulatory considerations",
                content: "Investment regulations vary significantly between jurisdictions. Content on this platform may not be appropriate, permitted, or lawful in your country of residence. It is your responsibility to ensure that accessing and acting on any information provided by Waffert complies with the laws and regulations applicable to you. We make no representation that the information on this platform is appropriate or available for use in any particular jurisdiction.",
              },
              {
                title: "Independent advice",
                content: "We strongly encourage all users to seek independent financial advice from a properly regulated and qualified financial adviser before making any investment decision. Nothing on this platform substitutes for professional financial advice tailored to your personal circumstances.",
              },
              {
                title: "No liability",
                content: "To the fullest extent permitted by applicable law, Waffert, its directors, employees, and affiliates shall not be liable for any loss or damage — including but not limited to investment losses, indirect, incidental, or consequential damages — arising from reliance on information provided on this platform.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-[#0f2744] mb-2">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
