import React, { useMemo } from "react";
import Navbar3 from "../components/Navbar3";
import MapView from "../components/MapView";

const Dashboard2 = () => {
  // demo issues for map (replace with API later)
  const issues = useMemo(
    () => [
      {
        _id: "1",
        type: "Road Damage",
        text: "Cracked pavement near school zone",
        status: "In Progress",
        coords: { lat: 19.076, lng: 72.8777 },
      },
      {
        _id: "2",
        type: "Water Leakage",
        text: "Leakage near main road",
        status: "Open",
        coords: { lat: 19.1197, lng: 72.8697 },
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar3 />
      <MapView issues={issues} />
    </div>
  );
};

export default Dashboard2;
