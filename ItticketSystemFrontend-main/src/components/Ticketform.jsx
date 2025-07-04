import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    systemId: "",
    subject: "",
    description: "",
    priority: "Medium",
    requestType: "Hardware",
    criticalSystem: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Check if user info is missing in localStorage
    const createdById = localStorage.getItem("userId");
    const createdByName = localStorage.getItem("name");
    const createdByEmail = localStorage.getItem("email");

    if (!createdById || !createdByEmail) {
      // ❗ This error occurs when user logs out or localStorage is cleared
      setMessage("❌ User info missing. Please log in again.");
      return;
    }

    const ticket = {
      requestId: uuidv4(), // 🎯 Generate unique ticket ID
      ...formData,
      createdById,
      createdByName,
      createdByEmail,
      status: "OPEN",
    };

    try {
      const response = await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      });

      if (!response.ok) {
        // ❌ Backend responded with error status (e.g., 400, 500)
        const errorData = await response.json();
        setMessage(`❌ Failed to submit ticket: ${errorData.message || response.statusText}`);
        return;
      }

      // ✅ Ticket submitted successfully
      setMessage("✅ Ticket submitted successfully!");

      // 🧹 Clear form after successful submission
      setFormData({
        employeeId: "",
        systemId: "",
        subject: "",
        description: "",
        priority: "Medium",
        requestType: "Hardware",
        criticalSystem: false,
      });
    } catch (error) {
      // 🔌 This error usually occurs when backend is not running or port is incorrect
      console.error("Submission error:", error);
      setMessage("❌ Could not connect to the backend server.");
    }
  };

  return (
    <div style={containerStyle}>
      <h3>📝 Create New Ticket</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="systemId"
          placeholder="System ID"
          value={formData.systemId}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ ...inputStyle, minHeight: "80px" }}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🟠 High</option>
          <option value="Critical">🔴 Critical</option>
        </select>

        <select
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Hardware">🖥️ Hardware</option>
          <option value="Software">💽 Software</option>
        </select>

        <label style={checkboxLabel}>
          <input
            type="checkbox"
            name="criticalSystem"
            checked={formData.criticalSystem}
            onChange={handleChange}
          />
          Is this a Critical System?
        </label>

        <button type="submit" style={submitButtonStyle}>
          Submit Ticket
        </button>
      </form>

      {/* 🔔 Show success or error message */}
      {message && (
        <p style={{ marginTop: "15px", color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

// Styling objects
const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "30px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "14px",
};

const checkboxLabel = {
  display: "block", // 📌 Fix from your comment: was broken
  margin: "10px 0",
  fontWeight: "bold",
};

const submitButtonStyle = {
  ...inputStyle,
  backgroundColor: "#1890ff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default TicketForm;
