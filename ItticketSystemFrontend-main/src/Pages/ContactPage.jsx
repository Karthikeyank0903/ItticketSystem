import React, { useState } from "react";
import { FaEnvelope, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import Testimonials from "../components/Testimonials";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="font-poppins bg-gradient-to-r from-blue-900 to-gray-300 min-h-screen flex flex-col items-center justify-center px-4 py-10 text-white">
      <div className="max-w-5xl w-full flex flex-col gap-20 items-center">

        {/* 🌟 About Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-teal-300">About Us</h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg leading-relaxed">
            We are a team of passionate engineers building intuitive and scalable solutions.  
            Our mission is to simplify IT ticket management and enhance support workflows.
          </p>
        </section>

        {/* 📞 Contact Info */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-teal-300 mb-6">Contact Information</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full shadow-md border border-white/20 text-blue-200 hover:bg-white/20 transition-all">
              <FaEnvelope className="text-pink-400" />
              <span className="text-sm md:text-base">support@example.com</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full shadow-md border border-white/20 text-blue-200 hover:bg-white/20 transition-all">
              <FaLinkedin className="text-blue-500" />
              <span className="text-sm md:text-base">LinkedIn Profile</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full shadow-md border border-white/20 text-blue-200 hover:bg-white/20 transition-all">
              <FaPhoneAlt className="text-green-400" />
              <span className="text-sm md:text-base">+91 98765 43210</span>
            </div>
          </div>
        </section>

        {/* ✉️ Contact Form */}
        <section className="w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-teal-300 mb-6">📬 Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-all duration-300 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105"
              >
                🚀 Send Message
              </button>
            </div>
          </form>
        </section>

        {/* 🌈 Testimonials */}
        <section className="w-full mt-16">
          <Testimonials />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
