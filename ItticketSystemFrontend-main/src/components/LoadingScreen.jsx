import React from "react";
import logo from "../assets/logo.png"; // 👈 adjust path if needed
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-wrapper">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingScreen;
