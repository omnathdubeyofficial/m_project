"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa"; // Importing social media icons

const facultyData = {
  Management: {
    members: [
      { name: "Dr. Ramesh Gupta", role: "Director", image: "/img/q.png", experience: "25+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
      { name: "Mrs. Sunita Mehta", role: "Principal", image: "/img/q.png", experience: "20+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
      { name: "Mr. Anil Sharma", role: "Vice Principal", image: "/img/q.png", experience: "18+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
    ],
    bgColor: "bg-blue-300",
  },
  "Mathematics Department": {
    members: [
      { name: "Dr. Anjali Sharma", role: "Mathematics Teacher", image: "/img/q.png", experience: "12+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
    ],
    bgColor: "bg-green-300",
  },
  "Science Department": {
    members: [
      { name: "Mr. Rajesh Kumar", role: "Physics Teacher", image: "/img/q.png", experience: "10+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
      { name: "Dr. Sanjay Joshi", role: "Chemistry Teacher", image: "/img/q.png", experience: "15+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
    ],
    bgColor: "bg-yellow-300",
  },
  "Language Department": {
    members: [
      { name: "Ms. Priya Verma", role: "English Teacher", image: "/img/q.png", experience: "8+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
    ],
    bgColor: "bg-purple-300",
  },
  "Support Staff": {
    members: [
      { name: "Mr. Suresh Yadav", role: "Security In-Charge", image: "/img/q.png", experience: "10+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
      { name: "Mrs. Radha Devi", role: "Housekeeping Supervisor", image: "/img/q.png", experience: "12+ years", facebook: "#", instagram: "#", youtube: "#", linkedin: "#", twitter: "#" },
    ],
    bgColor: "bg-gray-300",
  },
};

// Background Circles Animation Variants
const circleVariants = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const FacultyPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const departments = ["All", ...Object.keys(facultyData)];

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-44 px-6 relative overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute w-60 h-60 bg-blue-200 rounded-full top-10 left-10"
        variants={circleVariants}
        animate="animate"
      ></motion.div>
      <motion.div
        className="absolute w-40 h-40 bg-green-200 rounded-full bottom-20 right-20"
        variants={circleVariants}
        animate="animate"
        transition={{ duration: 5 }}
      ></motion.div>
      <motion.div
        className="absolute w-32 h-32 bg-yellow-200 rounded-full top-1/3 right-1/4"
        variants={circleVariants}
        animate="animate"
        transition={{ duration: 6 }}
      ></motion.div>
      <motion.div
        className="absolute w-40 h-40 bg-purple-200 rounded-full bottom-1/3 left-1/4"
        variants={circleVariants}
        animate="animate"
        transition={{ duration: 4.5 }}
      ></motion.div>

      {/* Heading */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-blue-800 tracking-wide drop-shadow-md">Our Faculty</h2>
        <p className="text-lg text-gray-700 mt-2 max-w-3xl mx-auto">
          Meet the inspiring minds behind our school’s success.
        </p>
      </motion.div>

      {/* Dropdown */}
      <div className="flex justify-center mb-12 relative z-10">
        <select
          className="px-6 py-3 bg-white border-2 border-blue-400 rounded-full text-blue-700 shadow-lg hover:bg-blue-100 transition-all"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {Object.entries(facultyData).map(([section, data], index) => (
          (selectedDepartment === "All" || selectedDepartment === section) && (
            <motion.div
              key={index}
              className={`${data.bgColor} p-8 rounded-t-3xl rounded-b-lg shadow-xl relative overflow-hidden`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Page Fold Effect */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/30 rounded-br-3xl"></div>
              {/* Department Name */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 relative z-10 inline-block px-4 py-2 bg-white/90 rounded-lg shadow-md">
                {section}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.members.map((member, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                    whileHover={{ scale: 1.03 }}
                  >
                    {/* Top Gradient Accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-xl"></div>

                    {/* Image with Hover Effect */}
                    <div className="relative group mt-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-300"
                      />
                      <div className="absolute inset-0 w-24 h-24 rounded-full bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center space-y-3 mt-4">
                      <h4 className="text-xl font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600 italic">{member.role}</p>
                      <div className="flex items-center justify-center space-x-2 bg-blue-50 px-4 py-1 rounded-full shadow-inner border border-blue-200">
                        <span className="text-xs font-medium text-blue-700">Experience:</span>
                        <span className="text-sm font-semibold text-blue-800">{member.experience}</span>
                      </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100 w-full justify-center">
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-blue-500 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110"
                      >
                        <FaFacebook size={18} />
                      </a>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-pink-500 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-200 hover:scale-110"
                      >
                        <FaInstagram size={18} />
                      </a>
                      <a
                        href={member.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-110"
                      >
                        <FaYoutube size={18} />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-blue-700 rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110"
                      >
                        <FaLinkedin size={18} />
                      </a>
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:scale-110"
                      >
                        <FaTwitter size={18} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        ))}
      </div>
    </section>
  );
};

export default FacultyPage;