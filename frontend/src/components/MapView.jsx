import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ issues = [] }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Civic Issues Map</h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Default: Mumbai */}
        <MapContainer
          center={[19.076, 72.8777]}
          zoom={12}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {issues
            .filter((issue) => issue?.coords?.lat && issue?.coords?.lng)
            .map((issue) => (
              <Marker
                key={issue._id || issue.id}
                position={[Number(issue.coords.lat), Number(issue.coords.lng)]}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {issue.type || "Civic Issue"}
                    </p>
                    <p className="text-sm">{issue.text}</p>
                    <p className="text-xs">
                      Status: <b>{issue.status}</b>
                    </p>
                    <Link
                      to={`/issue/${issue._id || issue.id}`}
                      className="text-yellow-600 text-sm underline"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
