import { useState } from "react";
import Navbar3 from "../components/Navbar3";

const FieldStaff = () => {
  const staff = { name: "James Carter", department: "Roads" };

  const [task] = useState({
    code: "INC-005",
    priority: "Medium",
    status: "In-Progress",
    category: "Roads",
    title: "Road Damage",
    desc: "Cracked pavement near school zone",
    address: "200 School Rd",
    date: "3/2/2026",
  });

  const badge = (text, cls) => (
    <span className={`text-sm px-3 py-1 rounded-full border ${cls}`}>
      {text}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar3 />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Logged in card */}
        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0F2A4D] text-white flex items-center justify-center text-xl">
              🔧
            </div>

            <div>
              <div className="text-sm text-gray-500">Logged in as</div>
              <div className="font-semibold text-lg">
                {staff.name} — {staff.department}{" "}
                <span className="text-gray-400">▾</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm text-gray-500">Active Tasks</div>
          </div>
        </div>

        {/* Active Assignments */}
        <div className="mt-10 flex items-center gap-3 text-gray-700">
          <span className="text-xl">⚠️</span>
          <h2 className="text-lg font-semibold tracking-wide">
            ACTIVE ASSIGNMENTS
          </h2>
        </div>

        <div className="mt-4 bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">
              {task.code}
            </span>

            {badge(
              task.priority,
              "bg-yellow-50 text-yellow-700 border-yellow-200",
            )}
            {badge(task.status, "bg-blue-50 text-blue-700 border-blue-200")}

            <div className="flex-1" />

            {badge(
              task.category,
              "bg-orange-50 text-orange-700 border-orange-200",
            )}
          </div>

          <h3 className="mt-4 text-xl font-bold">{task.title}</h3>
          <p className="mt-2 text-gray-600">{task.desc}</p>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">📍 {task.address}</div>
            <div className="flex items-center gap-2">🕒 {task.date}</div>
          </div>

          <button className="mt-6 w-full bg-[#0F2A4D] text-white py-3 rounded-xl font-semibold hover:bg-[#0b2240]">
            Resolved
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldStaff;
