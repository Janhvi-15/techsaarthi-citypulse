import api from "./axios";

// USER
export const userRegister = (data) => api.post("/auth/register", data);
export const userLogin = (data) => api.post("/auth/login", data);

// STAFF
export const staffRegister = (data) => api.post("/staff/auth/register", data);
export const staffLogin = (data) => api.post("/staff/auth/login", data);

// ADMIN
export const adminLogin = (data) => api.post("/admin/auth/login", data);
