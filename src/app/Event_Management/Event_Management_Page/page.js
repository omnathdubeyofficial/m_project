"use client";

import { 
  FaCalendarAlt, FaUsers, FaRupeeSign, FaClipboardList, 
  FaClipboard, FaHandshake, FaClock, FaBullhorn, FaTruck, FaExclamationTriangle, FaBoxOpen, FaAward, FaCalendarCheck
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Event_Management_Page = () => {
  const router = useRouter();

  const services = [
    { name: "Event Creation Form", icon: <FaCalendarAlt />, path: "/University_Management/Holiday_List" },
    { name: "Registration Form", icon: <FaUsers />, path: "/University_Management/Phone_Directory_List" },
    { name: "Budget Request Form", icon: <FaRupeeSign />, path: "/University_Management/Academic_Calendar_List" },
    { name: "Feedback Form", icon: <FaClipboard />, path: "/components/admin-registration" },
    { name: "Attendance Form", icon: <FaClipboardList />, path: "/components/admin-registration" },
    { name: "Resource Request Form", icon: <FaBoxOpen />, path: "/components/admin-registration" },
    { name: "Certificate Generation Form", icon: <FaAward />, path: "/components/admin-registration" },
    { name: "Sponsorship Form", icon: <FaHandshake />, path: "/components/admin-registration" },
    { name: "Schedule Management Form", icon: <FaClock />, path: "/components/admin-registration" },
    { name: "Media and Promotion Form", icon: <FaBullhorn />, path: "/components/admin-registration" },
    { name: "Transport and Logistics ", icon: <FaTruck />, path: "/components/admin-registration" },
    { name: "Risk Management Form", icon: <FaExclamationTriangle />, path: "/components/admin-registration" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-2 border-gray-300 p-4 bg-white">
            <button 
              onClick={() => router.push("/dashboard")} 
              className="bg-green-600 text-white px-4 py-2 flex items-center gap-2 shadow-md hover:bg-green-700"
            >
              Go Back
            </button>
            <h2 className="text-2xl text-center flex items-center gap-3">
              <FaCalendarCheck className="text-green-500 text-2xl animate-pulse" />
              <span className="tracking-wide text-gray-800">Event Management</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 transition-transform hover:scale-105 hover:shadow-2xl bg-white text-gray-900 hover:bg-blue-50 hover:border-blue-400"
                >
                  <div className="text-5xl mb-4 text-green-700">{service.icon}</div>
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

export default Event_Management_Page;