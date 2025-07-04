import React, { useEffect, useState } from "react";
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";
import WelcomeDashboard from "./Pages/WelcomeDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import SupportDashboard from "./Pages/Supportdashboard";
import NotAuthorized from "./Pages/NotAuthorizedDashboard";
import ContactPage from "./Pages/ContactPage"; // ✅ Add this

// Auth Helpers
const isAuthenticated = () => !!localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("role");

// Protected Route
const ProtectedRoute = ({ role, children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (getUserRole() !== role) return <Navigate to="/not-authorized" />;
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <AnimatedBackground />

      <Routes>
        <Route path="/" element={<WelcomeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactPage />} /> {/* ✅ New Route */}

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="development">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support/dashboard"
          element={
            <ProtectedRoute role="support">
              <SupportDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<h2 className="text-center text-white">404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
