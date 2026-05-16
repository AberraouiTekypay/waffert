import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export const metadata = {
  title: "Terms of Use — Waffert",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl font-bold text-[#0f2744] mb-2">Terms of Use</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Early Access Notice:</strong> Waffert is currently in early access mode. These Terms of Use are a placeholder and will be replaced with full legal terms before commercial launch. Please review our <a href="/legal/disclaimer" className="underline">Legal Disclaimer</a> and <a href="/legal/privacy" className="underline">Privacy Policy</a> for current governing terms.
              </p>
            </div>

            {[
              {
                title: "Acceptance of terms",
                content: "By accessing or using the Waffert platform, you agree to be bound by these Terms of Use and all applicable laws. If you do not agree with these terms, please do not use the platform.",
              },
              {
                title: "Educational use only",
                content: "The Waffert platform is provided for educational and informational purposes only. It does not constitute financial advice, investment recommendations, or any regulated financial service. See our full Legal Disclaimer.",
              },
              {
                title: "No regulated services",
                content: "Waffert does not provide regulated investment advice, portfolio management, trade execution, custody, or client money services. Use of this platform does not create a regulated financial services relationship.",
              },
              {
                title: "User conduct",
                content: "You agree to use the platform only for lawful purposes and in accordance with applicable laws in your jurisdiction. You must not attempt to misuse the platform, submit false information, or interfere with its operation.",
              },
              {
                title: "Intellectual property",
                content: "All content on the Waffert platform — including text, graphics, basket concepts, and educational materials — is the property of Waffert and may not be reproduced without permission.",
              },
              {
                title: "Limitation of liability",
                content: "To the maximum extent permitted by law, Waffert shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.",
              },
              {
                title: "Changes to terms",
                content: "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.",
              },
              {
                title: "Contact",
                content: "For terms-related enquiries, contact legal@waffert.com",
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
