import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar1";

const CitizenFront = () => {
  const navigate = useNavigate();

  // dummy stats + reports (later you can replace with API data)
  const stats = [
    { label: "Open", value: 2, valueClass: "text-yellow-600" },
    { label: "In Progress", value: 0, valueClass: "text-blue-600" },
    { label: "Resolved", value: 0, valueClass: "text-green-600" },
  ];

  const reports = [
    {
      title: "water leakage",
      meta: "about 6 hours ago · andheri",
      priority: "Low",
      status: "Open",
      icon: "💧",
    },
    {
      title: "road damage",
      meta: "about 6 hours ago · mumbai",
      priority: "High",
      status: "Open",
      icon: "🛣️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">My Reports</h1>
            <p className="text-gray-600 mt-1">
              Track your submitted infrastructure reports
            </p>
          </div>

          {/* ✅ Connected button */}
          <button
            onClick={() => navigate("/citizen/report")}
            className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
          >
            + Report Incident
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border rounded-2xl p-6 text-center shadow-sm"
            >
              <div className={`text-3xl font-bold ${s.valueClass}`}>
                {s.value}
              </div>
              <div className="text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="mt-10 space-y-4">
          {reports.map((r) => (
            <div
              key={r.title}
              className="bg-white border rounded-2xl p-5 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                  {r.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold capitalize">
                    {r.title}
                  </div>
                  <div className="text-sm text-gray-500">{r.meta}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm px-3 py-1 rounded-full border ${
                    r.priority === "High"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {r.priority}
                </span>

                <span className="text-sm px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizenFront;
