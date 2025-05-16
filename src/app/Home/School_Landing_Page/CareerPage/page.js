"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSchool,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaLanguage,
  FaUsers,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { executeQuery } from "../../../graphqlClient";
import { GET_SCHOOL_CAREER_DATA } from "../../../query/schoolCareersQuery/schoolCareersquery";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.4 } },
};
// const glowEffect = {
//   hidden: { scale: 0.9, opacity: 0 },
//   visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } },
// };

const CareerPage = () => {
  const [circles, setCircles] = useState([]);
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const router = useRouter();

  // Generate circles for background animation
  useEffect(() => {
    const generatedCircles = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 80 + 40,
      height: Math.random() * 80 + 40,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setCircles(generatedCircles);
  }, []);

  // Fetch job data using the GraphQL query
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await executeQuery(GET_SCHOOL_CAREER_DATA);
        if (response?.getSchoolCareers) {
          setJobs(response.getSchoolCareers);
        } else {
          setError("No job data found.");
        }
      } catch (err) {
        setError("Failed to fetch job data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Animated Circles Component
  const AnimatedCircles = () => {
    const circleVariants = {
      animate: {
        y: [0, -15, 0],
        opacity: [0.1, 0.6, 0.1],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      },
    };

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {circles.map((circle, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20"
            style={{ width: circle.width, height: circle.height, top: circle.top, left: circle.left }}
            variants={circleVariants}
            animate="animate"
          />
        ))}
      </div>
    );
  };
  return (
    <div className="min-h-screen  antialiased overflow-hidden">
      {/* Header Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-blue-950 to-blue-950 font-sans min-h-[70vh]  pt-32 sm:min-h-[80vh] flex items-center justify-center">
      <AnimatedCircles />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50"></div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="container mx-auto px-4 sm:px-6 z-10 text-center text-white"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight"
        >
          Career  {" "}
          <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Opportunities
          </span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-md md:max-w-6xl mx-auto"
        >
          Join a team that is passionate about shaping the future. 
        </motion.p>

        {/* Buttons for navigation */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 flex justify-center space-x-2 sm:space-x-4"
        >

                    {/* Back Button */}
          <button
            onClick={() => router.back()}  // Go back to the previous page
            className="flex items-center py-2 px-4  text-white rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          {/* Home Button */}
          <button
            onClick={() => router.push('/')}  // Navigate to Home
            className="flex items-center py-2 px-4  text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <FaHome className="mr-2" /> Home
          </button>
          {/* Dashboard Button */}
          {/* <button
            onClick={() => router.push('/dashboard')}  // Navigate to Dashboard
            className="flex items-center py-2 px-4  text-white rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
          >
            <FaTachometerAlt className="mr-2" /> Dashboard
          </button> */}
  
        </motion.div>
      </motion.div>
    </section>


    <div>
        <div className="bg-[#F3E5F5] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
              <Image
                alt="Prime Scholars Academy Campus"
                src="/img/sexc.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Shaping Tomorrow’s Leaders</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Prime Scholars Academy - Excellence & Innovation</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                We empower students with a perfect blend of academic excellence, skill-based learning, and strong moral values to create future leaders.
              </p>
              <div className="mt-5 ">
                  <button className="bg-[#8E24AA] text-white px-6 py-3  shadow-md hover:bg-[#6E1B85]">
                    Explore More
                  </button>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
      <div className="bg-[#E3F2FD] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Shaping Tomorrow’s Leaders</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Prime Scholars Academy - Excellence & Innovation</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                We empower students with a perfect blend of academic excellence, skill-based learning, and strong moral values to create future leaders.
              </p>
              <div className="mt-5 ">
                  <button className="bg-[#8E24AA] text-white px-6 py-3  shadow-md hover:bg-[#6E1B85]">
                    Explore More
                  </button>
          
              </div>
    
              
            </div>
            <div className="relative">
              <Image
                alt="Prime Scholars Academy Campus"
                src="/img/sexc.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
          </div>
        </div>
        
      </div>
    
    
    
      <div className="bg-[#F3E5F5] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
              <Image
                alt="Prime Scholars Academy Campus"
                src="/img/sexc.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Shaping Tomorrow’s Leaders</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Prime Scholars Academy - Excellence & Innovation</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                We empower students with a perfect blend of academic excellence, skill-based learning, and strong moral values to create future leaders.
              </p>
              <div className="mt-5 ">
                  <button className="bg-[#8E24AA] text-white px-6 py-3  shadow-md hover:bg-[#6E1B85]">
                    Explore More
                  </button>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
      </div>

      {/* Jobs Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 relative">
        <AnimatedCircles />
        {loading && <p className="text-center text-gray-600">Loading jobs...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="text-center text-gray-600">No job openings available at the moment.</p>
        )}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6"
        >
          {jobs.map((job) => (
            <motion.div
              key={job.job_id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              initial="hidden"
              animate="visible"
              className="relative bg-gradient-to-br from-white to-gray-100 border-2 border-dashed border-blue-400 rounded-3xl shadow-xl p-6 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4 border-b-2 border-blue-400 pb-2 tracking-wide">
                {job.position_title}
              </h2>

              <div className="bg-white border border-gray-300 rounded-xl p-4 space-y-3 shadow-md">
                {[
                  { icon: FaSchool, label: "Department", value: job.department },
                  { icon: FaMapMarkerAlt, label: "Location", value: job.location },
                  { icon: FaClock, label: "Work Time", value: job.required_work_time },
                  { icon: FaGraduationCap, label: "Qualification", value: job.required_qualification },
                  { icon: FaLanguage, label: "Language", value: job.required_language },
                  { icon: FaUsers, label: "Experience", value: job.required_experience },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 border-b border-gray-200 pb-2 last:border-none"
                  >
                    <item.icon className="text-blue-500 text-xl" />
                    <p className="text-md font-semibold text-gray-800">
                      <span className="font-medium">{item.label}:</span>{" "}
                      <span className="text-green-800">{item.value}</span>
                    </p>
                  </div>
                ))}
                <p className="mt-4 text-gray-700 text-md leading-relaxed italic border-t border-gray-300 pt-3">
                  {job.job_description}
                </p>
              </div>

              <motion.button
                onClick={() => router.push("/Career/ApplicationFormApply")} // Update this to a dynamic route if needed
                className="w-full py-3 mt-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-500"
              >
                I am Interested
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default CareerPage;
