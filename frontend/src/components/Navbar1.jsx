import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "text-gray-600 hover:text-black hover:bg-gray-50 border-transparent";

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/citizen")}
          className="flex items-center gap-2 font-semibold text-xl cursor-pointer"
        >
          <span className="text-blue-600">📈</span>
          CityPulse
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/citizen")}
            className={`px-4 py-2 rounded-xl border ${isActive("/citizen")}`}
          >
            MyReport
          </button>

          <button
            onClick={() => navigate("/citizen/post")}
            className={`px-4 py-2 rounded-xl border ${isActive("/citizen/post")}`}
          >
            Post
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 rounded-xl border ${isActive("/dashboard")}`}
          >
            Dashboard
          </button>
        </div>

        {/* User pill */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white">
          <span className="text-gray-600">👤</span>
          <span className="text-sm font-medium">{user?.name || "User"}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
            Citizen
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
