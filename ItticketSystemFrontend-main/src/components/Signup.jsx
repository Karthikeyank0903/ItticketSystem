import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [systemId, setSystemId] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const signupData = {
      employeeId,
      name,
      systemId,
      role,
      contact,
      email,
      password,
    };

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        alert("👍 Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        const error = await response.text();
        alert("❌ Signup failed: " + error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <div className="form-header">
          <div className="icon-circle">
            <span role="img" aria-label="signup">📝</span>
          </div>
          <h2>Create your account</h2>
        </div>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>System Id</label>
          <input
            type="text"
            value={systemId}
            onChange={(e) => setSystemId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Support Team">Support Team</option>
            <option value="Development">Development</option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="signup-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
