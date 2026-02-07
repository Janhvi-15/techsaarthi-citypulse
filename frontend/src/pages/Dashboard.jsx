import React, { useState } from "react";
import ReportCard from "../components/ReportCard";

const Dashboard = () => {
  const [tab, setTab] = useState("my");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {tab === "my" ? "My Reports" : "Public Reports"}
          </h1>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">
            + New Report
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab("my")}
            className={`px-4 py-2 rounded-xl ${
              tab === "my" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            My Reports
          </button>

          <button
            onClick={() => setTab("public")}
            className={`px-4 py-2 rounded-xl ${
              tab === "public" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Public
          </button>
        </div>

        {/* Report List */}
        <div className="space-y-4">
          <ReportCard
            title="Pothole near Main Road"
            location="Andheri East"
            status="Open"
          />
          <ReportCard
            title="Streetlight not working"
            location="Bandra West"
            status="In Progress"
          />
          <ReportCard
            title="Garbage overflow"
            location="Kurla"
            status="Resolved"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
