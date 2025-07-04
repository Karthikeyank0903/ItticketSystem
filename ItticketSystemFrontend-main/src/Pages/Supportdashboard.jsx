import React, { useEffect, useState } from "react";

const SupportDashboard = () => {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState([]);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "Support Engineer";
    setName(storedName);

    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tickets");
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
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

    console.log("Rating submitted:", { rating, comment });
    alert("✅ Thanks for the feedback!");
    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6 font-sans">
      {/* Welcome Message */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">👋 Welcome, {name}</h1>
        <p className="text-sm text-gray-500">Your Support Dashboard</p>
      </div>

      {/* Ticket Table */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">🎫 Active Tickets</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Ticket ID</th>
                <th className="px-4 py-2 border">System ID</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-blue-50 text-center">
                    <td className="px-4 py-2 border">{ticket.id}</td>
                    <td className="px-4 py-2 border">{ticket.systemId}</td>
                    <td className="px-4 py-2 border text-left">{ticket.description}</td>
                    <td className="px-4 py-2 border">
                      <select className="border px-2 py-1 rounded">
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No tickets available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">⭐ Feedback from Employee</h2>
        <div className="flex items-center gap-1 mb-3 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer ${
                star <= (hovered || rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Employee comment..."
          className="w-full p-3 border border-gray-300 rounded resize-none h-24 mb-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={submitReview}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition mt-auto"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default SupportDashboard;
