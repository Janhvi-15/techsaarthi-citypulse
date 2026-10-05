import { useMemo, useState } from "react";
import Navbar2 from "../components/Navbar2";

const pill = (text, cls) => (
  <span
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${cls}`}
  >
    <span className="w-2.5 h-2.5 rounded-full bg-current opacity-60" />
    {text}
  </span>
);

const priorityRank = { Critical: 3, High: 2, Medium: 1, Low: 0 };

const AdminFront = () => {
  const [activeTab, setActiveTab] = useState("Incidents");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [sortBy, setSortBy] = useState("Priority");

  // ✅ NEW: Department click → show issues + staff allocation
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  const stats = useMemo(
    () => [
      { label: "Open", value: 4, cls: "text-red-600", icon: "⚠️" },
      { label: "In Progress", value: 3, cls: "text-blue-600", icon: "🕒" },
      { label: "On Hold", value: 1, cls: "text-amber-600", icon: "⏸️" },
      { label: "Resolved", value: 2, cls: "text-green-600", icon: "✅" },
      { label: "Critical", value: 2, cls: "text-red-600", icon: "🚨" },
      {
        label: "Avg Resolution",
        value: "32h",
        cls: "text-gray-700",
        icon: "⏱️",
      },
    ],
    [],
  );

  // ✅ make rows editable (for assigning)
  const [rows, setRows] = useState([
    {
      id: "INC-003",
      type: "Power Outage",
      location: "789 Elm Blvd",
      dept: "Power",
      priority: "Critical",
      status: "Open",
      reported: "6/2/2026",
      assigned: "—",
    },
    {
      id: "INC-004",
      type: "Power Outage",
      location: "791 Elm Blvd",
      dept: "Power",
      priority: "High",
      status: "Open",
      reported: "6/2/2026",
      assigned: "—",
    },
    {
      id: "INC-002",
      type: "Water Leak",
      location: "45 Oak Ave",
      dept: "Water",
      priority: "Critical",
      status: "Open",
      reported: "6/2/2026",
      assigned: "—",
    },
    {
      id: "INC-009",
      type: "Flooding",
      location: "410 Low St",
      dept: "Drainage",
      priority: "High",
      status: "In Progress",
      reported: "6/2/2026",
      assigned: "—",
    },
    {
      id: "INC-011",
      type: "Road Damage",
      location: "12 Market Rd",
      dept: "Roads",
      priority: "Medium",
      status: "On Hold",
      reported: "7/2/2026",
      assigned: "—",
    },
    {
      id: "INC-008",
      type: "Streetlight Out",
      location: "88 Night St",
      dept: "Power",
      priority: "Low",
      status: "Resolved",
      reported: "28/1/2026",
      assigned: "Ahmed Khan",
    },
  ]);

  // ✅ staff list (demo) per department
  const staffByDept = useMemo(
    () => ({
      Power: [
        { name: "Ahmed Khan", initials: "AK" },
        { name: "Neha Patil", initials: "NP" },
      ],
      Water: [
        { name: "Rohit Sharma", initials: "RS" },
        { name: "Meera Joshi", initials: "MJ" },
      ],
      Roads: [
        { name: "James Carter", initials: "JC" },
        { name: "Sana Ali", initials: "SA" },
      ],
      Drainage: [
        { name: "Vikas Rao", initials: "VR" },
        { name: "Anita Singh", initials: "AS" },
      ],
    }),
    [],
  );

  // ✅ Top priority incident per department (clickable)
  const topPriorityByDept = useMemo(() => {
    const map = {};
    rows.forEach((inc) => {
      const dept = inc.dept;
      if (
        !map[dept] ||
        (priorityRank[inc.priority] ?? 0) >
          (priorityRank[map[dept].priority] ?? 0)
      ) {
        map[dept] = inc;
      }
    });
    return Object.values(map);
  }, [rows]);

  const filtered = useMemo(() => {
    let data = [...rows];

    if (typeFilter !== "All") data = data.filter((r) => r.dept === typeFilter);
    if (statusFilter !== "All Status")
      data = data.filter((r) => r.status === statusFilter);
    if (priorityFilter !== "All Priorities")
      data = data.filter((r) => r.priority === priorityFilter);

    if (sortBy === "Priority") {
      data.sort(
        (a, b) =>
          (priorityRank[b.priority] ?? 0) - (priorityRank[a.priority] ?? 0),
      );
    }
    return data;
  }, [rows, typeFilter, statusFilter, priorityFilter, sortBy]);

  // ✅ Department modal data
  const deptIssues = useMemo(() => {
    if (!selectedDept) return [];
    return rows
      .filter((r) => r.dept === selectedDept)
      .sort(
        (a, b) =>
          (priorityRank[b.priority] ?? 0) - (priorityRank[a.priority] ?? 0),
      );
  }, [rows, selectedDept]);

  const deptStaff = useMemo(() => {
    if (!selectedDept) return [];
    return staffByDept[selectedDept] || [];
  }, [selectedDept, staffByDept]);

  const activeTaskCountFor = (name) => {
    // active = not Resolved
    return rows.filter((r) => r.assigned === name && r.status !== "Resolved")
      .length;
  };

  const allocateTo = (staffName) => {
    if (!selectedIssueId) {
      alert("Please select an issue first (click an issue row).");
      return;
    }
    setRows((prev) =>
      prev.map((r) =>
        r.id === selectedIssueId
          ? {
              ...r,
              assigned: staffName,
              status: r.status === "Open" ? "In Progress" : r.status,
            }
          : r,
      ),
    );
    alert(`Allocated ${selectedIssueId} to ${staffName} ✅`);
  };

  const openDept = (dept) => {
    setSelectedDept(dept);
    const first = rows.find((r) => r.dept === dept);
    setSelectedIssueId(first ? first.id : null);
  };

  const closeDept = () => {
    setSelectedDept(null);
    setSelectedIssueId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar2 userName="Admin" role="Administrator" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Priority Alerts (by Department) */}
        <div className="border rounded-2xl bg-red-50/40 p-6">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            🔥 <span>Top Priority Alerts (by Department)</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {topPriorityByDept.map((a) => (
              <button
                key={a.dept}
                onClick={() => openDept(a.dept)}
                className="text-left bg-white border rounded-2xl p-4 flex items-center justify-between hover:shadow-sm transition"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
                      {a.dept}
                    </span>

                    {a.priority === "Critical"
                      ? pill(
                          "Critical",
                          "text-red-700 border-red-200 bg-red-50",
                        )
                      : a.priority === "High"
                        ? pill(
                            "High",
                            "text-orange-700 border-orange-200 bg-orange-50",
                          )
                        : a.priority === "Medium"
                          ? pill(
                              "Medium",
                              "text-amber-700 border-amber-200 bg-amber-50",
                            )
                          : pill(
                              "Low",
                              "text-gray-700 border-gray-200 bg-gray-50",
                            )}

                    <span className="text-sm font-semibold text-gray-500">
                      {a.id}
                    </span>
                  </div>

                  <div className="mt-2 font-semibold text-lg">{a.type}</div>
                  <div className="text-sm text-gray-500">{a.location}</div>
                </div>

                <div className="text-gray-400 text-xl">›</div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border rounded-2xl p-5 flex items-center gap-3"
            >
              <div className="text-lg">{s.icon}</div>
              <div className="flex-1">
                <div className={`text-2xl font-bold ${s.cls}`}>{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["Incidents", "Grouped (1)", "Zone Density", "Audit Log"].map(
            (t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-xl border font-medium ${
                  activeTab === t
                    ? "bg-white shadow-sm"
                    : "bg-gray-50 hover:bg-white"
                }`}
              >
                {t}
              </button>
            ),
          )}
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border bg-white"
          >
            <option value="All">All</option>
            <option value="Power">Power</option>
            <option value="Water">Water</option>
            <option value="Roads">Roads</option>
            <option value="Drainage">Drainage</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border bg-white"
          >
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>On Hold</option>
            <option>Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border bg-white"
          >
            <option>All Priorities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={() => setSortBy("Priority")}
            className="px-5 py-3 rounded-xl border bg-white flex items-center gap-2 hover:bg-gray-50"
          >
            ⇅ <span className="font-semibold">Sort:</span> {sortBy}
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-5 py-4">ID</th>
                  <th className="text-left px-5 py-4">TYPE</th>
                  <th className="text-left px-5 py-4">LOCATION</th>
                  <th className="text-left px-5 py-4">DEPT</th>
                  <th className="text-left px-5 py-4">PRIORITY</th>
                  <th className="text-left px-5 py-4">STATUS</th>
                  <th className="text-left px-5 py-4">REPORTED</th>
                  <th className="text-left px-5 py-4">ASSIGNED</th>
                  <th className="text-left px-5 py-4">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-5 py-4 font-semibold">{r.id}</td>
                    <td className="px-5 py-4">{r.type}</td>
                    <td className="px-5 py-4 text-gray-600">{r.location}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => openDept(r.dept)}
                        className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200 hover:bg-yellow-100"
                      >
                        {r.dept}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      {r.priority === "Critical"
                        ? pill(
                            "Critical",
                            "text-red-700 border-red-200 bg-red-50",
                          )
                        : r.priority === "High"
                          ? pill(
                              "High",
                              "text-orange-700 border-orange-200 bg-orange-50",
                            )
                          : r.priority === "Medium"
                            ? pill(
                                "Medium",
                                "text-amber-700 border-amber-200 bg-amber-50",
                              )
                            : pill(
                                "Low",
                                "text-gray-700 border-gray-200 bg-gray-50",
                              )}
                    </td>
                    <td className="px-5 py-4">
                      {r.status === "Open" ? (
                        <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                          Open
                        </span>
                      ) : r.status === "Resolved" ? (
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                          Resolved
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {r.status}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{r.reported}</td>
                    <td className="px-5 py-4 text-gray-600">{r.assigned}</td>
                    <td className="px-5 py-4">
                      {r.assigned === "—" ? (
                        <button
                          onClick={() => openDept(r.dept)}
                          className="px-5 py-2 rounded-xl bg-[#0F2A4D] text-white font-semibold hover:bg-[#0b2240]"
                        >
                          Assign
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Department Details + Allocation Modal */}
      {selectedDept && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Department</div>
                <div className="text-xl font-bold">
                  {selectedDept} Issues & Allocation
                </div>
              </div>
              <button
                onClick={closeDept}
                className="text-gray-500 hover:text-black text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3">
              {/* Left: Issues list (select one) */}
              <div className="md:col-span-2 p-5 border-r">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Issues</h3>
                  <div className="text-sm text-gray-500">
                    Click an issue to select it
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {deptIssues.map((it) => {
                    const isSelected = it.id === selectedIssueId;
                    return (
                      <button
                        key={it.id}
                        onClick={() => setSelectedIssueId(it.id)}
                        className={`w-full text-left border rounded-2xl p-4 transition ${
                          isSelected
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-semibold text-gray-700">
                            {it.id}
                          </span>

                          {it.priority === "Critical"
                            ? pill(
                                "Critical",
                                "text-red-700 border-red-200 bg-red-50",
                              )
                            : it.priority === "High"
                              ? pill(
                                  "High",
                                  "text-orange-700 border-orange-200 bg-orange-50",
                                )
                              : it.priority === "Medium"
                                ? pill(
                                    "Medium",
                                    "text-amber-700 border-amber-200 bg-amber-50",
                                  )
                                : pill(
                                    "Low",
                                    "text-gray-700 border-gray-200 bg-gray-50",
                                  )}

                          {it.status === "Open" ? (
                            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-sm">
                              Open
                            </span>
                          ) : it.status === "Resolved" ? (
                            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm">
                              Resolved
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm">
                              {it.status}
                            </span>
                          )}

                          <div className="flex-1" />

                          <span className="text-sm text-gray-600">
                            Assigned:{" "}
                            <span className="font-semibold">{it.assigned}</span>
                          </span>
                        </div>

                        <div className="mt-2 font-semibold">{it.type}</div>
                        <div className="text-sm text-gray-500">
                          {it.location}
                        </div>
                      </button>
                    );
                  })}

                  {deptIssues.length === 0 && (
                    <div className="text-gray-500">
                      No issues found for this department.
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Staff list + allocate */}
              <div className="p-5">
                <h3 className="font-semibold text-lg">People</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Selected issue:{" "}
                  <span className="font-semibold">
                    {selectedIssueId || "—"}
                  </span>
                </p>

                <div className="mt-4 space-y-3">
                  {deptStaff.map((s) => (
                    <div
                      key={s.name}
                      className="border rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                          {s.initials}
                        </div>
                        <div>
                          <div className="font-semibold">{s.name}</div>
                          <div className="text-xs text-gray-500">
                            Active tasks:{" "}
                            <span className="font-semibold text-gray-800">
                              {activeTaskCountFor(s.name)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => allocateTo(s.name)}
                        className="px-4 py-2 rounded-xl bg-[#0F2A4D] text-white font-semibold hover:bg-[#0b2240]"
                      >
                        Allocate
                      </button>
                    </div>
                  ))}

                  {deptStaff.length === 0 && (
                    <div className="text-gray-500">
                      No staff found for this department.
                    </div>
                  )}
                </div>

                <div className="mt-5 text-xs text-gray-500">
                  Tip: Click an issue first, then click Allocate on a person.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFront;
