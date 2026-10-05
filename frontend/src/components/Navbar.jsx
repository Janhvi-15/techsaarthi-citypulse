import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 border-b bg-white">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-xl font-semibold cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <img src={logo} alt="CityPulse Logo" className="h-8 w-8" />
        </div>
        CityPulse
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          📊 Public Dashboard
        </button>

        <button
          onClick={() => navigate("/auth")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
