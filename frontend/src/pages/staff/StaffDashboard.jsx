import { useAuth } from "../../context/AuthContext";

export default function StaffDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">🧑‍🔧 Staff Dashboard</h1>
                <p className="text-orange-100 mt-2">Welcome, {user?.name}!</p>
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
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Name
                </h3>
                <p className="text-2xl font-bold text-gray-800">{user?.name}</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Email
                </h3>
                <p className="text-2xl font-bold text-gray-800">{user?.email}</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Work Category
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {user?.workCategory}
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="text-sm text-gray-600 font-semibold uppercase mb-2">
                  Assigned Location
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {user?.workLocation}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">12</h3>
                <p className="text-blue-100">Assigned Tasks</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">8</h3>
                <p className="text-green-100">Completed</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
                <h3 className="text-3xl font-bold">4</h3>
                <p className="text-yellow-100">In Progress</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  📋 View Assignments
                </button>

                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  ✅ Mark Complete
                </button>

                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg text-center font-semibold hover:shadow-lg transition">
                  📝 Submit Report
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-orange-900 mb-2">
                👨‍💼 Your Responsibilities
              </h3>
              <p className="text-orange-800">
                You are responsible for managing incidents in the {user?.workCategory} category
                at {user?.workLocation}. Check your assignments regularly and update the system
                with progress reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
