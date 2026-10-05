import { NavLink, useNavigate } from "react-router-dom";

const Navbar2 = ({ userName = "Admin", role = "Administrator" }) => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-5 py-2 rounded-xl font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-700 border border-blue-200"
        : "text-gray-600 hover:text-black hover:bg-gray-50"
    }`;

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            📈
          </div>
          <div className="text-xl font-semibold text-gray-900">CityPulse</div>
        </div>

        {/* Middle: Links */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/admin" className={linkClass}>
            Incidents
          </NavLink>
          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </nav>

        {/* Right: User pill + Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 border rounded-2xl px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              🛡️
            </div>
            <div className="font-semibold text-gray-900">{userName}</div>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {role}
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar2;
