import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold font-serif mb-2">Dashboard</h1>
          <p className="text-[#a97a5e] mb-10">Welcome to your conservation hub.</p>

          <div className="grid-2 mb-8">
            <div className="bg-[#43523d] text-white p-8 rounded-xl shadow-md">
              <div className="text-3xl mb-3">📊</div>
              <h2 className="text-xl font-bold font-serif mb-4">Your Activity</h2>
              <div className="space-y-2 text-sm opacity-80">
                <p>Volunteer hours logged: <span className="font-bold text-yellow-400">0 hrs</span></p>
                <p>Properties saved: <span className="font-bold text-yellow-400">0</span></p>
                <p>Events joined: <span className="font-bold text-yellow-400">0</span></p>
              </div>
            </div>
            <div className="bg-[#c67d60] text-white p-8 rounded-xl shadow-md">
              <div className="text-3xl mb-3">⚙️</div>
              <h2 className="text-xl font-bold font-serif mb-4">Account Settings</h2>
              <div className="space-y-2 text-sm opacity-90">
                <p>Update your profile, email preferences, and notification settings.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-[#43523d]">
            <h2 className="text-2xl font-bold font-serif mb-2">GDPR Controls</h2>
            <p className="text-[#a97a5e] mb-6 text-sm">
              Under GDPR, you have the right to access, export, and delete all data we hold about you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/account/export"
                className="bg-[#facc15] text-[#43523d] px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors"
              >
                Export My Data
              </Link>
              <Link
                href="/account/delete"
                className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
              >
                Delete Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
