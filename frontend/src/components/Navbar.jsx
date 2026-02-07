import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 border-b">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <span className="text-blue-600">📈</span>
        CivicPulse
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          📊 Public Dashboard
        </button>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
