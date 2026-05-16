import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export const metadata = {
  title: "Privacy Policy — Waffert",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl font-bold text-[#0f2744] mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-8">
            {[
              {
                title: "What data we collect",
                content: "We collect information you provide directly: name, email address, country of residence, currency preferences, and investment goals when you complete our quiz, join the waitlist, or request a consultation. We also collect anonymised analytics data (page views, quiz completion rates, country demand) through privacy-respecting analytics tools.",
              },
              {
                title: "How we use your data",
                content: "We use your data to: (1) send you updates about Waffert's launch in your country; (2) analyse demand to prioritise product development; (3) respond to consultation requests; (4) improve our educational content. We do not sell your data to third parties.",
              },
              {
                title: "Legal basis for processing (GDPR)",
                content: "For EU/EEA residents, we process your data under the following legal bases: consent (for marketing emails), legitimate interest (for analytics and product improvement), and contract (for consultation requests). You may withdraw consent at any time.",
              },
              {
                title: "Data storage and security",
                content: "Your data is stored securely using industry-standard encryption. We use reputable infrastructure providers (including Supabase) that maintain appropriate security certifications. We retain your data for as long as necessary to provide our services, or until you request deletion.",
              },
              {
                title: "Your rights",
                content: "Under GDPR and applicable data protection laws, you have the right to: access your personal data; correct inaccurate data; request deletion of your data; withdraw consent; and lodge a complaint with your local data protection authority. To exercise these rights, email us at privacy@waffert.com.",
              },
              {
                title: "Cookies and analytics",
                content: "We use privacy-respecting analytics (such as Plausible or PostHog) that do not use third-party tracking cookies or sell data to advertisers. We may use functional cookies necessary for the platform to operate (such as storing your quiz result temporarily).",
              },
              {
                title: "Third-party services",
                content: "We may use third-party services including email providers (for sending you updates), calendar tools (for consultation booking), and analytics platforms. Each operates under their own privacy policies and we select providers committed to data privacy.",
              },
              {
                title: "Contact",
                content: "For privacy enquiries, contact us at privacy@waffert.com. We aim to respond to all enquiries within 30 days.",
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
