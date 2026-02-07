import { useState } from "react";
import { staffRegister } from "../../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function StaffRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    workCategory: "",
    workLocation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await staffRegister(formData);
      navigate("/staff/login?registered=true");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🧑‍🔧</h1>
          <h2 className="text-3xl font-bold text-gray-800">Staff Registration</h2>
          <p className="text-gray-600 mt-2">Join our maintenance team</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 border border-red-200 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Smith"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Work Category
            </label>
            <select
              name="workCategory"
              required
              value={formData.workCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
              disabled={loading}
            >
              <option value="">Select Work Category</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Garbage Overflow">Garbage Overflow</option>
              <option value="Street Light Issue">Street Light Issue</option>
              <option value="Drainage Problem">Drainage Problem</option>
              <option value="Public Toilet Issue">Public Toilet Issue</option>
              <option value="Electricity Issue">Electricity Issue</option>
              <option value="Footpath Issue">Footpath Issue</option>
              <option value="Traffic Signal Issue">Traffic Signal Issue</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Assigned Work Location
            </label>
            <input
              type="text"
              name="workLocation"
              placeholder="e.g., Downtown District"
              required
              value={formData.workLocation}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already registered?{" "}
          <Link
            to="/staff/login"
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            Log in here
          </Link>
        </p>

        <p className="text-center text-gray-600 mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
