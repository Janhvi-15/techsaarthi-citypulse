// src/pages/Dashboard3.jsx
import { useMemo } from "react";
import Navbar2 from "../components/Navbar2";
import MapView from "../components/MapView";

const Dashboard3 = () => {
  // demo issues for map (replace with real data later)
  const issues = useMemo(
    () => [
      {
        _id: "1",
        type: "Power Outage",
        text: "Major power outage reported",
        status: "Open",
        coords: { lat: 19.076, lng: 72.8777 }, // Mumbai
      },
      {
        _id: "2",
        type: "Water Leak",
        text: "Leak near main road",
        status: "In Progress",
        coords: { lat: 19.1197, lng: 72.8697 },
      },
      {
        _id: "3",
        type: "Road Damage",
        text: "Pothole issue",
        status: "Resolved",
        coords: { lat: 19.0728, lng: 72.8826 },
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar2 userName="Admin" role="Administrator" />
      <MapView issues={issues} />
    </div>
  );
};

export default Dashboard3;
