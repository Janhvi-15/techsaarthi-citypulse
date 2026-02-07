import { useState } from "react";
import { userRegister } from "../../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await userRegister(formData);
      navigate("/user/login?registered=true");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">👤</h1>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join CityPulse and help your community</p>
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
              placeholder="John Doe"
              require
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-purple-600 hover:text-purple-700 font-semibold"
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
