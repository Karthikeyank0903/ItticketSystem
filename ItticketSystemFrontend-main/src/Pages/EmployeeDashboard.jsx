import React, { useEffect, useState } from "react";
import TicketForm from "../components/Ticketform"; // <-- Import your ticket form

const EmployeeDashboard = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false); // <-- Form visibility

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName || "Employee");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const submitReview = () => {
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    const review = {
      rating,
      comment,
    };

    console.log("Submitted review:", review);
    alert("⭐ Thanks for your feedback!");
    setRating(0);
    setComment("");
  };

  return (
    <div style={styles.container}>
      <h2>🎫 Welcome, {name}</h2>
      <p>Submit and view your IT support tickets below.</p>

      <div style={styles.actions}>
        <button style={styles.primaryButton} onClick={() => setShowForm(true)}>
          ➕ Submit New Ticket
        </button>
      </div>

      {/* Ticket Form Section */}
      {showForm && (
        <div style={styles.section}>
          <TicketForm />
          <button
            onClick={() => setShowForm(false)}
            style={{
              ...styles.logoutButton,
              backgroundColor: "#888",
              marginTop: "10px",
            }}
          >
            ❌ Cancel
          </button>
        </div>
      )}

      <div style={styles.section}>
        <h3>📋 Current Tickets</h3>
        <p>No active tickets found.</p>
      </div>

      <div style={styles.section}>
        <h3>📜 Ticket History</h3>
        <p>No ticket history yet.</p>
      </div>

      <div style={styles.section}>
        <h3>⭐ Submit Feedback</h3>
        <div style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                ...styles.star,
                color: star <= (hovered || rating) ? "#f39c12" : "#ccc",
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Leave a comment..."
          style={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button style={styles.primaryButton} onClick={submitReview}>
          Submit Review
        </button>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        🚪 Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  actions: {
    margin: "20px 0",
  },
  section: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  primaryButton: {
    padding: "10px 20px",
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "30px",
  },
  stars: {
    marginBottom: "10px",
  },
  star: {
    fontSize: "30px",
    marginRight: "5px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    resize: "vertical",
    minHeight: "80px",
    marginBottom: "10px",
    marginTop: "10px",
    border: "1px solid #ccc",
  },
};

export default EmployeeDashboard;
