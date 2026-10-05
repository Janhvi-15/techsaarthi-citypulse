import { NavLink, useNavigate } from "react-router-dom";

const Navbar3 = () => {
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
          onClick={() => navigate("/fieldstaff")}
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            📈
          </div>
          <div className="text-xl font-semibold text-gray-900">CityPulse</div>
        </div>

        {/* Middle: Links */}
        <nav className="flex items-center gap-6">
          <NavLink to="/dashboard2" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/fieldstaff" className={linkClass}>
            Active Tasks
          </NavLink>
        </nav>

        {/* Right: Logout */}
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-xl border text-gray-700 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar3;
