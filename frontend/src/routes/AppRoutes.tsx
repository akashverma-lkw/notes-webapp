// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => (
  <>
  <Toaster position="top-center" />
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
  </>
);

export default AppRoutes;
