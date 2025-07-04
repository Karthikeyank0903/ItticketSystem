import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📥 handleSubmit triggered");
    setLoading(true);

    const loginData = { email, password };

    try {
      console.log("🔗 Sending login request...");
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("✅ Login Response:", user);

        const rawRole = user.role?.toLowerCase().trim();
        console.log("👤 Raw Role:", rawRole);

        let role = "unknown";
        if (rawRole?.includes("support")) {
          role = "support";
        } else if (
          rawRole?.includes("develop") ||
          rawRole?.includes("employee")
        ) {
          role = "development";
        }

        console.log("✅ Normalized Role:", role);

        // Store user details
        localStorage.setItem("token", user.token || "no-token");
        localStorage.setItem("userId", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "support") {
          window.location.href = "/support/dashboard";
        } else if (role === "development") {
          window.location.href = "/employee/dashboard";
        } else {
          console.warn("🚨 Unknown role, redirecting to unauthorized");
          window.location.href = "/unauthorized";
        }
      } else {
        const error = await response.text();
        alert("Login failed: " + error);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {loading && <div className="spinner"></div>}

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

