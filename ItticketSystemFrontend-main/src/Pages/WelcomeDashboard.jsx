import React from "react";
import { Link } from "react-router-dom";
import "./WelcomeDashboard.css";
import logo from "../assets/logo.png"; // Ensure this file exists

const WelcomeDashboard = () => {
  return (
    <div className="welcome-screen">
      {/* Header Section */}
      <div className="welcome-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome to the IT Support System</h1>
        <p>Track, report, and resolve your technical issues easily.</p>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <Link to="/login" className="action-tile login">
          <i className="fas fa-sign-in-alt"></i>
          <span>Login</span>
        </Link>

        <Link to="/signup" className="action-tile signup">
          <i className="fas fa-user-plus"></i>
          <span>Sign Up</span>
        </Link>

        <Link to="/contact" className="action-tile contact">
          <i className="fas fa-envelope"></i>
          <span>Contact</span>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeDashboard;
