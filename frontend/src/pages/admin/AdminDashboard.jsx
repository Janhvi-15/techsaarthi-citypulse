import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-rose-500 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">👑 Admin Dashboard</h1>
                <p className="text-red-100 mt-2">Welcome, {user?.name}!</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Name
                </h3>
                <p className="text-2xl font-bold text-gray-800">{user?.name}</p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Email
                </h3>
                <p className="text-2xl font-bold text-gray-800">{user?.email}</p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Role
                </h3>
                <p className="text-2xl font-bold text-red-600 uppercase">
                  {user?.role}
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Access Level
                </h3>
                <p className="text-2xl font-bold text-red-600">Full Access</p>
              </div>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">156</h3>
                <p className="text-blue-100">Total Incidents</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">89</h3>
                <p className="text-green-100">Resolved</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">45</h3>
                <p className="text-yellow-100">In Progress</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">22</h3>
                <p className="text-red-100">Pending</p>
              </div>
            </div>

            {/* User Management Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">542</h3>
                <p className="text-purple-100">Public Users</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">28</h3>
                <p className="text-orange-100">Staff Members</p>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">3</h3>
                <p className="text-pink-100">Administrators</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Admin Controls
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  📊 View All Incidents
                </button>

                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  👥 Manage Users
                </button>

                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  📈 View Analytics
                </button>

                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  📋 Staff Management
                </button>

                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  ⚙️ System Settings
                </button>

                <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  📜 View Logs
                </button>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                🔴 Critical Alerts
              </h3>
              <ul className="text-red-800 space-y-2">
                <li>• 5 incidents pending assignment for more than 48 hours</li>
                <li>• 2 staff members with overdue task submissions</li>
                <li>• High incident volume in Downtown District</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
