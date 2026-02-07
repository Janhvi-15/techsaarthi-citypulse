import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const navigate = useNavigate();

  const goToAuth = (role) => {
    navigate(`/auth?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Logo */}
      <div className="px-8 py-6">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xl font-semibold cursor-pointer"
        >
          <span className="text-blue-600">📈</span>
          CivicPulse
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mt-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose your <span className="text-blue-600">role</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Select how you want to use CivicPulse. Each role has a dedicated
          dashboard and tools.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto mt-14 px-6 grid gap-8 md:grid-cols-3">
        {/* Citizen */}
        <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition p-8 text-center">
          <div className="text-5xl mb-6">👤</div>

          <h2 className="text-2xl font-semibold">Citizen</h2>
          <p className="text-gray-600 mt-3">
            Report civic issues, track complaints, and stay updated on
            resolutions.
          </p>

          <button
            onClick={() => goToAuth("citizen")}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
          >
            Continue as Citizen →
          </button>
        </div>

        {/* Administrator */}
        <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>

          <h2 className="text-2xl font-semibold">Administrator</h2>
          <p className="text-gray-600 mt-3">
            Monitor reports, manage departments, and ensure city-wide
            transparency.
          </p>

          <button
            onClick={() => goToAuth("admin")}
            className="mt-8 w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700"
          >
            Continue as Admin →
          </button>
        </div>

        {/* Field User */}
        <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition p-8 text-center">
          <div className="text-5xl mb-6">🛠️</div>

          <h2 className="text-2xl font-semibold">Field User</h2>
          <p className="text-gray-600 mt-3">
            Resolve issues on-site, update progress, and close complaints
            efficiently.
          </p>

          <button
            onClick={() => goToAuth("field")}
            className="mt-8 w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700"
          >
            Continue as Field User →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-14 text-sm text-gray-500">
        © 2026 CivicPulse · Smart Urban Infrastructure
      </div>
    </div>
  );
};

export default RoleSelect;
