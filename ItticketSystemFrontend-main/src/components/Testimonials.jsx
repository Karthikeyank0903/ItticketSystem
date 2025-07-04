import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      company: "TechNova Solutions",
      feedback:
        "This ticketing system has simplified our support process immensely. The UI is clean and the experience is smooth!",
      rating: 5,
    },
    {
      name: "Ravi Kumar",
      company: "BrightEdge Corp",
      feedback:
        "Fast, reliable, and easy to use. Our team loves how intuitive the platform is.",
      rating: 4,
    },
    {
      name: "Sarah Johnson",
      company: "InnovateX",
      feedback:
        "Customer service is excellent and the system is exactly what we needed. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <section className="mt-16 px-4 text-white text-center">
      <h2 className="text-3xl font-bold text-cyan-400 mb-10">
        What Our Happy Customers Say
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg rounded-xl p-6 max-w-sm w-full text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <FaQuoteLeft className="text-cyan-300 text-xl mb-3" />
            <p className="italic text-gray-200 mb-4">"{t.feedback}"</p>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>

            <p className="font-semibold text-white">— {t.name}</p>
            <p className="text-sm text-gray-400">{t.company}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
