import MapView from "../components/MapView";
import Navbar1 from "../components/Navbar1";

const Dashboard = () => {
  // Example issues (replace with API data later)
  const issues = [
    {
      id: "1",
      type: "Road Damage",
      text: "Potholes near Sion Circle",
      status: "Pending",
      coords: { lat: 19.0406, lng: 72.8647 },
    },
    {
      id: "2",
      type: "Water Leak",
      text: "Leakage near Dadar station",
      status: "In Progress",
      coords: { lat: 19.0176, lng: 72.8562 },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <MapView issues={issues} />
    </div>
  );
};

export default Dashboard;
