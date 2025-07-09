import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-blue-800 mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
         We help you find the best hostels and PG accommodations tailored to your needs.
          Whether you're a student, working professional, or traveler, our platform allows
          you to search, filter, and connect with verified listings easily.
          <br />
          Your next comfortable stay is just a few clicks away!
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          <motion.div
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <FaHome className="text-4xl text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Verified Listings</h3>
            <p className="text-gray-600">
              All hostels and PGs are verified so you never have to worry about scams.
            </p>
          </motion.div>

          <motion.div
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers className="text-4xl text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">User Friendly</h3>
            <p className="text-gray-600">
              Our clean interface makes searching, filtering, and booking effortless.
            </p>
          </motion.div>

          <motion.div
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <FaMapMarkedAlt className="text-4xl text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Location Based</h3>
            <p className="text-gray-600">
              Instantly discover hostels and PGs near your desired location or university.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
