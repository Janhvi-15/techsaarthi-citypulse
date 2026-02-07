import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">🏙️</span>
          CityPulse
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm">
                <span className="font-semibold">{user.name}</span>
                <span className="ml-2 text-blue-200">({user.role})</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition"
            >
              Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
