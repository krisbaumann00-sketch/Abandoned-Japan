export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] font-sans">
      {/* Simple Header */}
      <header className="bg-[#43523d] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-serif">Abandoned Japan</h1>
          <p className="text-xl mt-2 text-white/70">Seto Inland Sea Conservation</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif text-[#43523d] mb-6">
          Welcome to Abandoned Japan
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Your site is now live on abandonedjapan.org.<br />
          The islands from your backend will appear here soon.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-sm text-gray-500">
            Backend Status: Connected to http://127.0.0.1:8000
          </p>
        </div>
      </div>
    </div>
  );
}