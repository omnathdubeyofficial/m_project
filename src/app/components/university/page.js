"use client";

import { 
  FaSearch, FaCalendarAlt, FaUsers, FaRegCalendarAlt, 
  FaTrophy, FaHeartbeat, FaClipboardList, FaGraduationCap, FaClipboard 
} from "react-icons/fa";
import Link from "next/link";
import Navber from "../../navbar/page";

const UniversityPage = () => {


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
    <div className="bg-gray-50 text-gray-800 min-h-screen transition-colors duration-500 pt-32">
      <Navber/>
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search services..."
                className="bg-white text-gray-900 border border-gray-300 px-4 py-3 w-full rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 rounded-xl shadow-lg flex flex-col items-center cursor-pointer border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl bg-white text-gray-900"
                >
                  <div className="text-4xl mb-4 text-blue-600">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-center">{service.name}</h3>
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