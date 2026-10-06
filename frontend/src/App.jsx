import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import CitizenFront from "./pages/CitizenFront";
import ReportIncident from "./pages/ReportIncident";
import Post from "./pages/Post";
import MapView from "./components/MapView";
import FieldStaff from "./pages/FieldStaff";
import Dashboard2 from "./pages/Dashboard2";
import AdminFront from "./pages/AdminFront";
import Dashboard3 from "./pages/Dashboard3";

import AdminLogin from "./pages/admin/AdminLogin";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffRegister from "./pages/staff/StaffRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<RoleSelect />} />

        {/* Existing routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citizen" element={<CitizenFront />} />
        <Route path="/citizen/report" element={<ReportIncident />} />
        <Route path="/citizen/map" element={<MapView />} />
        <Route path="/citizen/post" element={<Post />} />
        <Route path="/fieldstaff" element={<FieldStaff />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/admin" element={<AdminFront />} />
        <Route path="/admin/dashboard" element={<Dashboard3 />} />

        {/* Authentication routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/register" element={<StaffRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
