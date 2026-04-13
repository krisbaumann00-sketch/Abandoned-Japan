import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 px-4 min-h-screen bg-[#f4f1ea]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-serif mb-2">Privacy Policy</h1>
          <p className="text-[#a97a5e] mb-10">Last updated: January 2024</p>
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-md space-y-8">
            {[
              {
                title: "1. Introduction",
                content: "AbandonedJapan (\"we\", \"our\", or \"us\") is committed to protecting your privacy and complying with GDPR regulations. This policy explains how we collect, use, and protect your personal data when you use our conservation network platform."
              },
              {
                title: "2. Data We Collect",
                content: "We collect: (a) Account information — name, email address, and password hash when you register. (b) Contact form submissions — name, email, phone (optional), interest area, and message. (c) Usage data — pages visited and features used, collected anonymously."
              },
              {
                title: "3. How We Use Your Data",
                content: "Your data is used to: provide platform services and account management; send relevant conservation opportunities and event notifications (with your consent); improve our platform through aggregated analytics. We never sell, rent, or share your data with third parties for marketing."
              },
              {
                title: "4. Data Retention",
                content: "We retain your account data for as long as your account is active, or until you request deletion. Contact form submissions are retained for 12 months. You may request deletion at any time via your dashboard."
              },
              {
                title: "5. Your GDPR Rights",
                content: "Under GDPR, you have the right to: access all data we hold about you; export your data in a portable format; correct inaccurate data; request deletion of your data ('right to be forgotten'); withdraw consent at any time. Exercise these rights via your Dashboard or by contacting us."
              },
              {
                title: "6. Cookies",
                content: "We use only essential session cookies required for authentication. No tracking cookies or third-party advertising cookies are used."
              },
              {
                title: "7. Contact",
                content: "For privacy concerns or GDPR requests, contact our Data Protection Officer at: privacy@abandoned-japan.com"
              }
            ].map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold font-serif mb-3 text-[#43523d]">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
