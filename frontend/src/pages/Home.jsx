import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Logo */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span className="text-blue-600">📈</span>
          CityPulse
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mt-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose your <span className="text-blue-600">role</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          A smart city platform to report, track, and resolve infrastructure
          issues — transparently and efficiently.
        </p>

        {user && (
          <div className="mt-6 inline-block bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium">
            Welcome back, <span className="font-bold">{user.name}</span> 👋
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto mt-14 px-6 grid gap-8 md:grid-cols-3">
        {/* Public User / Citizen */}
        <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition p-8 text-center">
          <div className="text-5xl mb-6">👤</div>
          <h2 className="text-2xl font-semibold">Public User</h2>
          <p className="text-gray-600 mt-3">
            Report infrastructure problems and track their resolution in
            real-time.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/user/register"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
            >
              Register
            </Link>
            <Link
              to="/user/login"
              className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Staff / Field User */}
        <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition p-8 text-center">
          <div className="text-5xl mb-6">🛠️</div>
          <h2 className="text-2xl font-semibold">Staff Member</h2>
          <p className="text-gray-600 mt-3">
            Handle assigned complaints and update resolution progress.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/staff/register"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700"
            >
              Register
            </Link>
            <Link
              to="/staff/login"
              className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl font-medium hover:bg-emerald-50"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Administrator */}
        <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h2 className="text-2xl font-semibold">Administrator</h2>
          <p className="text-gray-600 mt-3">
            Monitor the entire system and manage city-wide operations.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/admin/login"
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700"
            >
              Login
            </Link>
            <button
              disabled
              className="w-full border-2 border-gray-300 text-gray-400 py-3 rounded-xl font-medium cursor-not-allowed"
            >
              Invite Only
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-20 px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why CityPulse?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature icon="⚡" title="Real-time Updates" desc="Track complaint progress instantly." />
          <Feature icon="📍" title="Location Aware" desc="Precise issue mapping & allocation." />
          <Feature icon="👥" title="Community Powered" desc="Citizens & authorities collaborate." />
          <Feature icon="📊" title="Smart Analytics" desc="Data-backed decisions for cities." />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-sm text-gray-500 border-t">
        © 2026 CityPulse · Smart Urban Infrastructure
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <span className="text-3xl">{icon}</span>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}