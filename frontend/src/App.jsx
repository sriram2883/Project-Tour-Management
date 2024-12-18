import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ConfirmedTours from "./components/confirmedtours";
import HomePage from "./components/HomePage";
import TourPage from "./components/TourPage";
import AdminPage from "./components/AdminPage";
import CoordinatorPage from "./components/coordinatorPage";
import LoginPage from "./components/LoginPage";
import BookingDetails from "./components/BookingDetails";
import About from "./components/About";
import Contact from "./components/Contact";
import Terms from "./components/Terms";
import AdminDashboard from "./components/admindashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const [token,setToken] =useState(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      fetch("https://project-tour-management-server.onrender.com/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("User is authenticated");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
        });
    }
  }, [token]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tour" element={<TourPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coordinator"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <CoordinatorPage />
            </ProtectedRoute>
          }
        />
        {
          (token == null) ? <Route path="/login" element={<LoginPage />} /> : null
        }        
        <Route path="/booking/:tourid" element={<BookingDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/confirmedtours" element={<ConfirmedTours />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
