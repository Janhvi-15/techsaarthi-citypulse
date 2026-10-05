import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Roleselect from "./pages/Roleselect";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CitizenFront from "./pages/CitizenFront";
import ReportIncident from "./pages/ReportIncident";
import Post from "./pages/Post";
import MapView from "./components/MapView";
import FieldStaff from "./pages/FieldStaff";
import Dashboard2 from "./pages/Dashboard2";
import AdminFront from "./pages/AdminFront";
import Dashboard3 from "./pages/Dashboard3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<Roleselect />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citizen" element={<CitizenFront />} />
        <Route path="/citizen/report" element={<ReportIncident />} />
        <Route path="/citizen/map" element={<MapView />} />
        <Route path="/citizen/post" element={<Post />} />
        <Route path="/fieldstaff" element={<FieldStaff />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/admin" element={<AdminFront />} />
        <Route path="/admin/dashboard" element={<Dashboard3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
