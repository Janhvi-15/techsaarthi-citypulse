import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";

import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard3 from "./pages/Dashboard3";
import StaffDashboard from "./pages/staff/StaffDashboard";

import CitizenFront from "./pages/CitizenFront";
import ReportIncident from "./pages/ReportIncident";
import Post from "./pages/Post";
import FieldStaff from "./pages/FieldStaff";
import MapView from "./components/MapView";

import AdminFront from "./pages/AdminFront";

// Authentication
import AdminLogin from "./pages/admin/AdminLogin";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffRegister from "./pages/staff/StaffRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== HOME ==================== */}
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<RoleSelect />} />

        {/* ==================== GENERAL DASHBOARDS ==================== */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />

        {/* ==================== CITIZEN ==================== */}
        <Route path="/citizen" element={<CitizenFront />} />
        <Route path="/citizen/report" element={<ReportIncident />} />
        <Route path="/report-incident" element={<ReportIncident />} />
        <Route path="/citizen/map" element={<MapView />} />
        <Route path="/citizen/post" element={<Post />} />

        {/* ==================== USER ==================== */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* Alternative/legacy user routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        {/* ==================== STAFF ==================== */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/register" element={<StaffRegister />} />
        <Route path="/fieldstaff" element={<FieldStaff />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />

        {/* ==================== ADMIN ==================== */}
        <Route path="/admin" element={<AdminFront />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
