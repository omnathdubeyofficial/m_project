"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { FaFolder, FaUser, FaUsers, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import './style.css';
const slides = [
  "/videos/41603-430090405_medium.mp4",
  "/videos/21472-318172509_small.mp4",
  "/videos/90933-629483642_medium.mp4"
];

const announcements = [
  { date: "2025-03-28", title: "Open House and Important Updates", link: "/announcements/open-house", category: "News", issuedBy: "Admin", audience: "Students", description: "Join us for an open house and get the latest updates about the school! Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!" },
  { date: "2025-03-25", title: "School Reopening Notification – 7th April 2025", link: "/announcements/school-reopening", category: "News", issuedBy: "Admin", audience: "Students", description: "School will reopen on 7th April 2025. Please ensure attendance!" },
  { date: "2025-03-25", title: "Open House for Grades Nursery to VIII – 29th March", link: "/announcements/open-house-grades", category: "News", issuedBy: "Admin", audience: "Parents", description: "Parents are invited to the open house session for classes Nursery to VIII." },
  { date: "2025-03-25", title: "Cervical Cancer Vaccination Drive – 29th March", link: "/announcements/vaccination-drive", category: "Health", issuedBy: "Admin", audience: "Students", description: "A vaccination drive is being held for students on 29th March." },
  { date: "2025-03-28", title: "Open House and Important Updates", link: "/announcements/open-house", category: "News", issuedBy: "Admin", audience: "Students", description: "Join us for an open house and get the latest updates about the school! Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!Join us for an open house and get the latest updates about the school!" },
  { date: "2025-03-25", title: "School Reopening Notification – 7th April 2025", link: "/announcements/school-reopening", category: "News", issuedBy: "Admin", audience: "Students", description: "School will reopen on 7th April 2025. Please ensure attendance!" },
  { date: "2025-03-25", title: "Open House for Grades Nursery to VIII – 29th March", link: "/announcements/open-house-grades", category: "News", issuedBy: "Admin", audience: "Parents", description: "Parents are invited to the open house session for classes Nursery to VIII." },
  { date: "2025-03-25", title: "Cervical Cancer Vaccination Drive – 29th March", link: "/announcements/vaccination-drive", category: "Health", issuedBy: "Admin", audience: "Students", description: "A vaccination drive is being held for students on 29th March." }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(Array(announcements.length).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section className="relative w-screen h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden bg-gray-50">
      {/* Video Carousel */}
      <div className="relative w-full md:w-2/3 h-screen">
        {slides.map((video, index) => (
          <video
            key={index}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <div 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-500 border border-white ${
                index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

     {/* Announcements Section */}
<div className="w-full md:w-1/3 h-screen bg-red-100 p-6 md:p-8 overflow-hidden z-10 flex flex-col justify-start pt-16 md:pt-28">
  <h2 className="text-2xl font-bold text-white bg-red-600 p-3 mb-2 border-b-2 pb-2 text-left flex items-center">
    <span className="mr-2 text-xl"><FaClipboardList className="mx-1" /></span> Latest Circulars
  </h2>

  {/* Scrollable Announcement List */}
  <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide" style={{ maxHeight: "calc(100vh - 160px)" }}>
    {announcements.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        className="p-4 border-b border-gray-300 hover:bg-gray-200 transition-all text-left"
      >
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          {item.title} {index === 0 && <span className="ml-2 text-red-500 text-sm font-bold animate-pulse">NEW</span>}
        </h3>
        <p className="text-sm text-gray-700 mt-2">
          {expanded[index] ? item.description : `${item.description.substring(0, 50)}...`}
        </p>
        <button
          onClick={() => toggleReadMore(index)}
          className="text-red-500 text-sm font-medium hover:underline mt-1 block"
        >
          {expanded[index] ? "Read Less" : "Read More →"}
        </button>
        <p className="text-xs text-gray-500 font-semibold flex items-center mt-2 mb-2">
          <FaCalendarAlt className="mr-1" /> {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} | <FaUsers className="mx-1" /> Audience: {item.audience}
        </p>
        <p className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
          <FaFolder className="mr-1" /> Category: {item.category} | <FaUser className="mx-1" /> Issued By: {item.issuedBy}
        </p>
        <Link href={item.link} className="flex items-center text-red-500 text-sm font-medium hover:underline mt-2">
          <FaDownload className="mr-2" /> Download PDF
        </Link>
      </motion.div>
    ))}
  </div>
</div>

    </section>
  );
};

export default HeroSection;
