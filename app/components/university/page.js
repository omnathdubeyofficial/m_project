"use client";

import { useState, useEffect } from "react";
import { 
  FaSearch, FaMoon, FaSun, FaCalendarAlt, FaUsers, FaRegCalendarAlt, 
  FaTrophy, FaHeartbeat, FaClipboardList, FaGraduationCap, FaClipboard 
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link"; // For navigation

const UniversityPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      username: "Omnath Dubey",
      profession: "Super Admin",
      profileImg: "/img/om.webp",
    });
  }, []);

  const services = [
    { name: "List of Holiday", icon: <FaCalendarAlt />, path: "/holiday-list" },
    { name: "Phone Directory", icon: <FaUsers />, path: "/phone-directory" },
    { name: "Academic Calendar", icon: <FaRegCalendarAlt />, path: "/academic-calendar" },
    { name: "Admin Registration", icon: <FaClipboardList />, path: "/components/admin-registration" },
    { name: "Yuva Mahotsav", icon: <FaTrophy />, path: "/yuva-mahotsav" },
    { name: "Affiliation", icon: <FaClipboard />, path: "/affiliation" },
    { name: "Sport Council", icon: <FaHeartbeat />, path: "/sport-council" },
    { name: "Health Center", icon: <FaHeartbeat />, path: "/health-center" },
    { name: "Convocation", icon: <FaGraduationCap />, path: "/convocation" },
    { name: "Placement Cell", icon: <FaClipboardList />, path: "/placement-cell" },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-200" : "bg-green-100 text-gray-800"} min-h-screen transition-colors duration-500`}>
      {/* Header */}
      <header className="sticky top-0 flex items-center justify-between px-6 py-4 shadow-md bg-opacity-90 backdrop-blur-md z-10 border-b border-gray-300">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src="/img/image.png"
            alt="University Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-xl  hidden sm:block">
            Dr. Ram Manohar Lohia Avadh University
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Profile Section */}
          {user && (
            <div className="flex items-center space-x-3">
              <Image
                src={user.profileImg}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs">{user.profession}</p>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none hover:scale-105 transition-transform duration-300"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-2xl" />
            ) : (
              <FaMoon className="text-gray-600 text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            {/* Search Bar */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search..."
                className={`${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
                } px-4 py-2 w-full rounded-full shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 transition`}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform ${
                    darkMode
                      ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100"
                      : "bg-gradient-to-r from-green-100 via-green-200 to-green-300 text-green-900"
                  } flex flex-col items-center cursor-pointer`}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg ">{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UniversityPage;
