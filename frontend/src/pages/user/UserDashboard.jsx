import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">👤 User Dashboard</h1>
                <p className="text-purple-100 mt-2">Welcome, {user?.name}!</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Name
                </h3>
                <p className="text-2xl font-bold text-gray-800">{user?.name}</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Email
                </h3>
                <p className="text-2xl font-bold text-gray-800">{user?.email}</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Role
                </h3>
                <p className="text-2xl font-bold text-purple-600 uppercase">
                  {user?.role}
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Account Status
                </h3>
                <p className="text-2xl font-bold text-green-600">✓ Active</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/report-incident"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition"
                >
                  📝 Report Incident
                </Link>

                <button
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition"
                >
                  📊 View My Reports
                </button>

                <button
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition"
                >
                  📍 Track Status
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                💡 Help & Support
              </h3>
              <p className="text-blue-800">
                Report city infrastructure issues to help keep your community
                clean and safe. Your reports help authorities prioritize maintenance
                and improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
