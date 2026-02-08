import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const API_URL = "http://localhost:3000/api/v1";

// Fix marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom marker icons based on status
const createCustomIcon = (status) => {
  const color = status === "Open" ? "#f59e0b" : status === "In Progress" ? "#3b82f6" : "#10b981";
  
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        ">
          📍
        </div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

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

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("overview");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Post view states
  const [activeTab, setActiveTab] = useState("All");
  const [userVotes, setUserVotes] = useState({}); // Track user's votes

  // Fetch incidents from API
  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents`);
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

  // Handle upvote
  const handleUpvote = async (incidentId) => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      
      const response = await fetch(`${API_URL}/incidents/${incidentId}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        // Update the incident in state
        setIncidents(prevIncidents =>
          prevIncidents.map(incident =>
            incident._id === incidentId
              ? {
                  ...incident,
                  upvoteCount: data.data.upvoteCount,
                  downvoteCount: data.data.downvoteCount
                }
              : incident
          )
        );

        // Update user vote status
        setUserVotes(prev => ({
          ...prev,
          [incidentId]: {
            hasUpvoted: data.data.hasUpvoted,
            hasDownvoted: data.data.hasDownvoted
          }
        }));
      }
    } catch (error) {
      console.error("Error upvoting:", error);
      alert("Please login to vote on incidents");
    }
  };

  // Handle downvote
  const handleDownvote = async (incidentId) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/incidents/${incidentId}/downvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        // Update the incident in state
        setIncidents(prevIncidents =>
          prevIncidents.map(incident =>
            incident._id === incidentId
              ? {
                  ...incident,
                  upvoteCount: data.data.upvoteCount,
                  downvoteCount: data.data.downvoteCount
                }
              : incident
          )
        );

        // Update user vote status
        setUserVotes(prev => ({
          ...prev,
          [incidentId]: {
            hasUpvoted: data.data.hasUpvoted,
            hasDownvoted: data.data.hasDownvoted
          }
        }));
      }
    } catch (error) {
      console.error("Error downvoting:", error);
      alert("Please login to vote on incidents");
    }
  };

  // Calculate stats from actual incident data
  const stats = [
    { 
      label: "Open", 
      value: incidents.filter(i => i.status === "Open").length, 
      valueClass: "text-yellow-600" 
    },
    { 
      label: "In Progress", 
      value: incidents.filter(i => i.status === "In Progress").length, 
      valueClass: "text-blue-600" 
    },
    { 
      label: "Resolved", 
      value: incidents.filter(i => i.status === "Resolved").length, 
      valueClass: "text-green-600" 
    },
  ];

  // Get unique categories
  const categories = ["All", ...new Set(incidents.map(i => i.category))];

  // Filter incidents based on status, category, and search
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === "All" || incident.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || incident.category === categoryFilter;
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.location?.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Post view filtering
  const sortedIncidents = useMemo(() => {
    return [...incidents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [incidents]);

  const filteredPosts = useMemo(() => {
    if (activeTab === "All") return sortedIncidents;
    return sortedIncidents.filter((r) => r.status === activeTab);
  }, [sortedIncidents, activeTab]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      "Water Leakage": "💧",
      "Road Damage": "🛣️",
      "Garbage Overflow": "🗑️",
      "Street Light Issue": "💡",
      "Drainage Problem": "🚰",
      "Public Toilet Issue": "🚻",
      "Electricity Issue": "⚡",
      "Footpath Issue": "🚶",
      "Traffic Signal Issue": "🚦",
      "Default": "📍"
    };
    return icons[category] || icons["Default"];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 24) {
      return `about ${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "Open":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Posts View Component
  const PostsView = () => (
    <div>
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Community Posts
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Browse all reported incidents, vote on their priority, and track their status.
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
              Showing <span className="font-bold text-blue-600">{filteredPosts.length}</span> of{" "}
              <span className="font-bold text-gray-900">{incidents.length}</span> posts
            </p>
          </div>

          {/* Feed */}
          <div className="mt-6 space-y-5">
            {filteredPosts.map((incident) => {
              const userVote = userVotes[incident._id];
              const hasUpvoted = userVote?.hasUpvoted || false;
              const hasDownvoted = userVote?.hasDownvoted || false;

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
                      onClick={() => handleUpvote(incident._id)}
                      className={`px-5 py-2.5 rounded-xl border-2 flex items-center gap-2 font-semibold transition-all hover:scale-105 ${
                        hasUpvoted
                          ? "bg-green-50 border-green-400 text-green-700 shadow-md"
                          : "bg-white hover:bg-green-50 border-gray-300 hover:border-green-300 text-gray-700"
                      }`}
                    >
                      <span className="text-xl">👍</span>
                      <span>Upvote</span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                        hasUpvoted ? "bg-green-100" : "bg-gray-100"
                      }`}>
                        {incident.upvoteCount || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDownvote(incident._id)}
                      className={`px-5 py-2.5 rounded-xl border-2 flex items-center gap-2 font-semibold transition-all hover:scale-105 ${
                        hasDownvoted
                          ? "bg-red-50 border-red-400 text-red-700 shadow-md"
                          : "bg-white hover:bg-red-50 border-gray-300 hover:border-red-300 text-gray-700"
                      }`}
                    >
                      <span className="text-xl">👎</span>
                      <span>Downvote</span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                        hasDownvoted ? "bg-red-100" : "bg-gray-100"
                      }`}>
                        {incident.downvoteCount || 0}
                      </span>
                    </button>

                    {/* Net Score Display */}
                    <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <span className="text-sm font-medium text-gray-600">Community Score:</span>
                      <span className={`text-lg font-bold ${
                        (incident.upvoteCount || 0) - (incident.downvoteCount || 0) > 0 
                          ? "text-green-600" 
                          : (incident.upvoteCount || 0) - (incident.downvoteCount || 0) < 0 
                          ? "text-red-600" 
                          : "text-gray-600"
                      }`}>
                        {(incident.upvoteCount || 0) - (incident.downvoteCount || 0) > 0 ? "+" : ""}
                        {(incident.upvoteCount || 0) - (incident.downvoteCount || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                    <span className="font-medium">Last updated:</span> {timeAgo(incident.updatedAt || incident.createdAt)}
                  </div>
                </div>
              );
            })}

            {filteredPosts.length === 0 && (
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
  );

  // Track Status Component
  const TrackStatusView = () => (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📍 Track Your Reports
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor the status of all your submitted incidents
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by title, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading incidents...</p>
          </div>
        ) : filteredIncidents.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">No incidents found</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident._id}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl">
                    {getCategoryIcon(incident.category)}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold capitalize text-gray-900">
                      {incident.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(incident.createdAt)} · {incident.location?.address || "Mumbai"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {incident.description}
                    </div>
                    {/* Vote counts in list view */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                        👍 {incident.upvoteCount || 0}
                      </span>
                      <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full font-medium">
                        👎 {incident.downvoteCount || 0}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        (incident.upvoteCount || 0) - (incident.downvoteCount || 0) > 0
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-50 text-gray-700"
                      }`}>
                        Score: {(incident.upvoteCount || 0) - (incident.downvoteCount || 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200 font-medium">
                    {incident.category}
                  </span>
                  <span className={`text-sm px-4 py-2 rounded-full border font-medium ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏙️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CityPulse
              </h1>
              <p className="text-xs text-gray-500">Report. Track. Resolve.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView("overview")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "overview"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveView("map")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "map"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setActiveView("track")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "track"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              📍 Track Status
            </button>
            <button
              onClick={() => setActiveView("posts")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "posts"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              💬 Community Posts
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeView === "overview" ? (
          <>
            {/* Welcome Section */}
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || "User"}! 👋
              </h2>
              <p className="text-blue-100">
                Let's keep our city clean and well-maintained together.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                  <div className={`text-4xl font-bold ${stat.valueClass}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/report-incident")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-2">📝</div>
                  <div className="text-lg font-bold">Report New Incident</div>
                  <div className="text-sm text-blue-100 mt-1">Submit a new civic issue</div>
                </button>
                <button
                  onClick={() => setActiveView("posts")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-2">💬</div>
                  <div className="text-lg">Community Posts</div>
                  <div className="text-sm text-orange-100 mt-1">Browse & vote on posts</div>
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Recent Reports
              </h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 mt-4">Loading incidents...</p>
                </div>
              ) : incidents.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-600 text-lg">No incidents reported yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incidents.slice(0, 5).map((incident) => (
                    <div
                      key={incident._id}
                      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                          {getCategoryIcon(incident.category)}
                        </div>
                        <div>
                          <div className="text-lg font-semibold capitalize text-gray-900">
                            {incident.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(incident.createdAt)} · {incident.location?.address || "Mumbai"}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {incident.description}
                          </div>
                          {/* Vote counts */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium">
                              👍 {incident.upvoteCount || 0}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-medium">
                              👎 {incident.downvoteCount || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200 font-medium">
                          {incident.category}
                        </span>
                        <span className={`text-sm px-4 py-2 rounded-full border font-medium ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                💡 Help & Support
              </h3>
              <p className="text-blue-800">
                Report city infrastructure issues to help keep your community clean
                and safe. Your reports help authorities prioritize maintenance and
                improvements. Vote on incidents to show which issues matter most to you!
              </p>
            </div>
          </>
        ) : activeView === "map" ? (
          /* Map View - keeping existing implementation */
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🗺️ Incident Hotspot Map
              </h2>
              <p className="text-gray-600">
                Explore all reported incidents across Mumbai. Click on markers for details.
              </p>
              
              {/* Legend */}
              <div className="flex gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow"></div>
                  <span className="text-sm font-medium text-gray-700">Open ({stats[0].value})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow"></div>
                  <span className="text-sm font-medium text-gray-700">In Progress ({stats[1].value})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow"></div>
                  <span className="text-sm font-medium text-gray-700">Resolved ({stats[2].value})</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 mt-4">Loading map...</p>
                </div>
              </div>
            ) : (
              <MapContainer
                center={[19.076, 72.8777]}
                zoom={12}
                style={{ height: "600px", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {incidents
                  .filter((incident) => incident.location?.latitude && incident.location?.longitude)
                  .map((incident) => (
                    <Marker
                      key={incident._id}
                      position={[
                        Number(incident.location.latitude),
                        Number(incident.location.longitude)
                      ]}
                      icon={createCustomIcon(incident.status)}
                    >
                      <Popup>
                        <div className="space-y-2 min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getCategoryIcon(incident.category)}</span>
                            <h3 className="font-bold text-lg capitalize">{incident.title}</h3>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-gray-700">
                              <strong>Category:</strong> {incident.category}
                            </p>
                            <p className="text-sm text-gray-700">
                              <strong>Description:</strong> {incident.description}
                            </p>
                            <p className="text-sm text-gray-700">
                              <strong>Location:</strong> {incident.location?.address}
                            </p>
                            <p className="text-sm">
                              <strong>Status:</strong>{" "}
                              <span className={`font-semibold ${
                                incident.status === "Open"
                                  ? "text-yellow-600"
                                  : incident.status === "In Progress"
                                  ? "text-blue-600"
                                  : "text-green-600"
                              }`}>
                                {incident.status}
                              </span>
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
                                👍 {incident.upvoteCount || 0}
                              </span>
                              <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
                                👎 {incident.downvoteCount || 0}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Reported {formatDate(incident.createdAt)}
                            </p>
                          </div>

                          {incident.image && (
                            <img
                              src={`http://localhost:3000${incident.image}`}
                              alt={incident.title}
                              className="w-full h-32 object-cover rounded-lg mt-2"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            )}
          </div>
        ) : activeView === "track" ? (
          <TrackStatusView />
        ) : (
          <PostsView />
        )}
      </div>
    </div>
  );
}