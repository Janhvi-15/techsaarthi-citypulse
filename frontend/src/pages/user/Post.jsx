import { useEffect, useMemo, useState } from "react";
// import Navbar1 from "../components/Navbar1";

const REACT_KEY = "civicpulse_reactions_v1";

const tabs = ["All", "Open", "In Progress", "On Hold", "Resolved"];

function timeAgo(dateString) {
  const date = new Date(dateString);
  const diff = Date.now() - date;
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

// Get category icon
const getCategoryIcon = (category) => {
  const icons = {
    "Water Leakage": "💧",
    "Road Damage": "🛣️",
    "Garbage": "🗑️",
    "Street Light": "💡",
    "Default": "📍"
  };
  return icons[category] || icons["Default"];
};

const Post = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState({}); // { [id]: "upvote" | "downvote" | null }

  // Fetch incidents from API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/incidents");
        const data = await response.json();
        
        if (data.success) {
          setIncidents(data.data);
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // Load reactions from localStorage
  useEffect(() => {
    const savedReact = localStorage.getItem(REACT_KEY);
    setReactions(savedReact ? JSON.parse(savedReact) : {});
  }, []);

  // Save reactions to localStorage
  useEffect(() => {
    localStorage.setItem(REACT_KEY, JSON.stringify(reactions));
  }, [reactions]);

  const sortedIncidents = useMemo(() => {
    // newest first
    return [...incidents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [incidents]);

  const filtered = useMemo(() => {
    if (activeTab === "All") return sortedIncidents;
    return sortedIncidents.filter((r) => r.status === activeTab);
  }, [sortedIncidents, activeTab]);

  const toggleReaction = (id, type) => {
    setReactions((prev) => {
      const current = prev[id] || null;
      // clicking same reaction removes it
      const next = current === type ? null : type;
      return { ...prev, [id]: next };
    });
  };

  const counts = useMemo(() => {
    // Count upvotes and downvotes per incident
    const upvoteCount = {};
    const downvoteCount = {};
    
    for (const incident of incidents) {
      upvoteCount[incident._id] = 0;
      downvoteCount[incident._id] = 0;
    }
    
    Object.entries(reactions).forEach(([id, val]) => {
      if (val === "upvote") upvoteCount[id] = (upvoteCount[id] || 0) + 1;
      if (val === "downvote") downvoteCount[id] = (downvoteCount[id] || 0) + 1;
    });
    
    return { upvoteCount, downvoteCount };
  }, [reactions, incidents]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Community Posts
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Browse all reported incidents and their current status in your community.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-7 flex flex-wrap gap-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-xl border-2 font-semibold transition-all ${
                activeTab === t
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="mt-12 text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="text-gray-600 mt-6 text-lg font-medium">Loading posts...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mt-6">
              <p className="text-gray-600 font-medium">
                Showing <span className="font-bold text-blue-600">{filtered.length}</span> of{" "}
                <span className="font-bold text-gray-900">{incidents.length}</span> posts
              </p>
            </div>

            {/* Feed */}
            <div className="mt-6 space-y-5">
              {filtered.map((incident) => {
                const myReact = reactions[incident._id] || null;

                return (
                  <div
                    key={incident._id}
                    className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Category Icon */}
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                          {getCategoryIcon(incident.category)}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                            {incident.title}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                            <span>{timeAgo(incident.createdAt)}</span>
                            <span>•</span>
                            <span>📍 {incident.location?.address || "Mumbai"}</span>
                            <span>•</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                              {incident.category}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-sm px-4 py-2 rounded-full border-2 font-bold whitespace-nowrap ${badgeClasses(
                          incident.status
                        )}`}
                      >
                        {incident.status}
                      </span>
                    </div>

                    {/* Image */}
                    {incident.image && (
                      <div className="mb-4">
                        <img
                          src={`http://localhost:3000${incident.image}`}
                          alt={incident.title}
                          className="w-full h-64 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 text-base leading-relaxed mb-5">
                      {incident.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="mb-5 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">Progress Status:</span>
                        <span className="text-sm font-semibold text-blue-600">
                          {incident.status === "Open" ? "0%" : incident.status === "In Progress" ? "50%" : "100%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            incident.status === "Open"
                              ? "bg-yellow-500 w-0"
                              : incident.status === "In Progress"
                              ? "bg-blue-500 w-1/2"
                              : "bg-green-500 w-full"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Upvote / Downvote */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => toggleReaction(incident._id, "upvote")}
                        className={`px-5 py-2.5 rounded-xl border-2 flex items-center gap-2 font-semibold transition-all hover:scale-105 ${
                          myReact === "upvote"
                            ? "bg-green-50 border-green-300 text-green-700 shadow-md"
                            : "bg-white hover:bg-green-50 border-gray-300 hover:border-green-300 text-gray-700"
                        }`}
                      >
                        <span className="text-xl">👍</span>
                        <span>Upvote</span>
                        <span className="text-sm font-bold bg-white px-2 py-0.5 rounded-full">
                          {counts.upvoteCount[incident._id] || 0}
                        </span>
                      </button>

                      <button
                        onClick={() => toggleReaction(incident._id, "downvote")}
                        className={`px-5 py-2.5 rounded-xl border-2 flex items-center gap-2 font-semibold transition-all hover:scale-105 ${
                          myReact === "downvote"
                            ? "bg-red-50 border-red-300 text-red-700 shadow-md"
                            : "bg-white hover:bg-red-50 border-gray-300 hover:border-red-300 text-gray-700"
                        }`}
                      >
                        <span className="text-xl">👎</span>
                        <span>Downvote</span>
                        <span className="text-sm font-bold bg-white px-2 py-0.5 rounded-full">
                          {counts.downvoteCount[incident._id] || 0}
                        </span>
                      </button>

                      {/* Additional Info */}
                      <div className="ml-auto text-sm text-gray-500">
                        <span className="font-medium">Last updated:</span> {timeAgo(incident.updatedAt)}
                      </div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="text-center text-gray-500 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    No posts found
                  </p>
                  <p className="text-gray-500">
                    No reports found for{" "}
                    <span className="font-bold text-blue-600">{activeTab}</span> status.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;