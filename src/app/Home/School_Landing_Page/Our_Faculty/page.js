
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GET_ALL_FACULTY_QUERY } from "../../../query/facultyMembersQuery/facultyMembersQuery";
import { executeQuery } from "../../../graphqlClient";
import Loading from "../../../Loader/page";

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: { y: -10, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" },
};

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define color schemes for departments
  const colorSchemes = [
    { accentColor: "border-blue-600", bgColor: "bg-blue-50" },
    { accentColor: "border-green-600", bgColor: "bg-green-50" },
    { accentColor: "border-yellow-600", bgColor: "bg-yellow-50" },
    { accentColor: "border-purple-600", bgColor: "bg-purple-50" },
    { accentColor: "border-gray-600", bgColor: "bg-gray-50" },
    { accentColor: "border-red-600", bgColor: "bg-red-50" },
    { accentColor: "border-teal-600", bgColor: "bg-teal-50" },
  ];

  // Fetch faculty data
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const response = await executeQuery(GET_ALL_FACULTY_QUERY);
        const faculty = response?.getAllFaculty || [];

        // Group faculty by department
        const groupedData = faculty.reduce((acc, member) => {
          const dept = member.department || "Other";
          if (!acc[dept]) {
            acc[dept] = {
              members: [],
              // Assign colors cyclically
              accentColor: colorSchemes[Object.keys(acc).length % colorSchemes.length].accentColor,
              bgColor: colorSchemes[Object.keys(acc).length % colorSchemes.length].bgColor,
            };
          }
          acc[dept].members.push({
            name: member.full_name,
            role: member.profession,
            image: member.profile_image || "/img/placeholder.png", // Fallback image
            experience: member.experience,
            qualification: member.qualification,
            facebook: member.facebook_link || "#",
            instagram: member.instagram_link || "#",
            youtube: member.youtube_link || "#",
            linkedin: member.linkedin_link || "#",
            twitter: member.x_link || "#",
          });
          return acc;
        }, {});

        setFacultyData(groupedData);
      } catch (err) {
        setError("Failed to load faculty data.");
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const departments = ["All", ...Object.keys(facultyData)];

  return (
    <section className="min-h-screen bg-white py-44 px-6">
      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-serif font-bold text-gray-800">Our Faculty</h2>
        <p className="text-lg text-gray-600 mt-3 max-w-3xl mx-auto">
          Meet the exceptional individuals driving academic excellence and innovation.
        </p>
      </motion.div>

      {/* Dropdown */}
      <div className="flex justify-center mb-12">
        <select
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:bg-gray-50"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept} className="text-gray-700">
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty Sections */}
      <div className="max-w-6xl mx-auto space-y-16">
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : Object.keys(facultyData).length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No faculty members found.</p>
        ) : (
          Object.entries(facultyData).map(([section, data], index) => (
            (selectedDepartment === "All" || selectedDepartment === section) && (
              <motion.div
                key={index}
                className={`${data.bgColor} p-8 rounded-xl shadow-md border-t-4 ${data.accentColor}`}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{section}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.members.map((member, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center transition-all duration-300"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      {/* Faculty Image */}
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mb-4"
                      />

                      {/* Faculty Info */}
                      <h4 className="text-xl font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Qualification:</span> {member.qualification}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Experience:</span> {member.experience}
                      </p>

                      {/* Social Media Icons */}
                      <div className="flex space-x-4 mt-4">
                        {member.facebook && member.facebook !== "#" && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border-2 border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                          >
                            <FaFacebook size={18} />
                          </a>
                        )}
                        {member.instagram && member.instagram !== "#" && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border-2 border-pink-500 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-200"
                          >
                            <FaInstagram size={18} />
                          </a>
                        )}
                        {member.youtube && member.youtube !== "#" && (
                          <a
                            href={member.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border-2 border-red-600 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                          >
                            <FaYoutube size={18} />
                          </a>
                        )}
                        {member.linkedin && member.linkedin !== "#" && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border-2 border-blue-800 rounded-full text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-200"
                          >
                            <FaLinkedin size={18} />
                          </a>
                        )}
                        {member.twitter && member.twitter !== "#" && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border-2 border-sky-500 rounded-full text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-200"
                          >
                            <FaTwitter size={18} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))
        )}
      </div>
    </section>
  );
};

export default FacultyPage;
