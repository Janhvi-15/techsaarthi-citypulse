import { useEffect, useMemo, useState } from "react";
import Navbar1 from "../components/Navbar1";

const STORAGE_KEY = "civicpulse_reports_v1";
const REACT_KEY = "civicpulse_reactions_v1";

const seedReports = [
  {
    id: "r1",
    title: "Water leakage near Main Road",
    category: "Water Leakage",
    description:
      "Heavy leakage since morning, causing traffic and water waste.",
    locationText: "Andheri East, Mumbai",
    status: "Open",
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: "r2",
    title: "Street light not working",
    category: "Street Light",
    description: "The street is very dark at night, safety issue.",
    locationText: "Bandra West, Mumbai",
    status: "In Progress",
    createdAt: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
  },
  {
    id: "r3",
    title: "Garbage overflow near market",
    category: "Garbage",
    description: "Garbage not collected for 3 days, bad smell.",
    locationText: "Kurla, Mumbai",
    status: "On Hold",
    createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
  },
  {
    id: "r4",
    title: "Pothole fixed finally",
    category: "Road Damage",
    description: "Resolved by municipality. Thanks!",
    locationText: "Dadar, Mumbai",
    status: "Resolved",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
];

const tabs = ["All", "Open", "In Progress", "On Hold", "Resolved"];

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  return `${days} days ago`;
}

function badgeClasses(status) {
  switch (status) {
    case "Open":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "On Hold":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "Resolved":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

const Post = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [reports, setReports] = useState([]);
  const [reactions, setReactions] = useState({}); // { [id]: "like" | "dislike" | null }

  // Load reports + reactions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const list = saved ? JSON.parse(saved) : seedReports;

    // seed if empty
    if (!saved) localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    setReports(list);

    const savedReact = localStorage.getItem(REACT_KEY);
    setReactions(savedReact ? JSON.parse(savedReact) : {});
  }, []);

  // Save reactions
  useEffect(() => {
    localStorage.setItem(REACT_KEY, JSON.stringify(reactions));
  }, [reactions]);

  const sortedReports = useMemo(() => {
    // newest first
    return [...reports].sort((a, b) => b.createdAt - a.createdAt);
  }, [reports]);

  const filtered = useMemo(() => {
    if (activeTab === "All") return sortedReports;
    return sortedReports.filter((r) => r.status === activeTab);
  }, [sortedReports, activeTab]);

  const toggleReaction = (id, type) => {
    setReactions((prev) => {
      const current = prev[id] || null;
      // clicking same reaction removes it
      const next = current === type ? null : type;
      return { ...prev, [id]: next };
    });
  };

  const counts = useMemo(() => {
    // Simple counts derived from reactions object
    // (Per-user toggle only; for demo UI)
    const likeCount = {};
    const dislikeCount = {};
    for (const r of reports) {
      likeCount[r.id] = 0;
      dislikeCount[r.id] = 0;
    }
    Object.entries(reactions).forEach(([id, val]) => {
      if (val === "like") likeCount[id] = (likeCount[id] || 0) + 1;
      if (val === "dislike") dislikeCount[id] = (dislikeCount[id] || 0) + 1;
    });
    return { likeCount, dislikeCount };
  }, [reactions, reports]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Posts</h1>
            <p className="text-gray-600 mt-1">
              Browse all reported issues and their current status.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-7 flex flex-wrap gap-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-xl border transition ${
                activeTab === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-8 space-y-4">
          {filtered.map((r) => {
            const myReact = reactions[r.id] || null;

            return (
              <div
                key={r.id}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{r.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {timeAgo(r.createdAt)} • {r.locationText} •{" "}
                      <span className="font-medium">{r.category}</span>
                    </p>
                  </div>

                  <span
                    className={`text-sm px-3 py-1 rounded-full border ${badgeClasses(
                      r.status,
                    )}`}
                  >
                    {r.status}
                  </span>
                </div>

                <p className="text-gray-700 mt-3">{r.description}</p>

                {/* Like / Dislike */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleReaction(r.id, "like")}
                    className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
                      myReact === "like"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    👍 Like{" "}
                    <span className="text-xs">
                      ({counts.likeCount[r.id] || 0})
                    </span>
                  </button>

                  <button
                    onClick={() => toggleReaction(r.id, "dislike")}
                    className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
                      myReact === "dislike"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    👎 Dislike{" "}
                    <span className="text-xs">
                      ({counts.dislikeCount[r.id] || 0})
                    </span>
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 bg-white border rounded-2xl p-10">
              No reports found for{" "}
              <span className="font-semibold">{activeTab}</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
