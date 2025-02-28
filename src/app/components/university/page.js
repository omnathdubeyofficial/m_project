"use client";

import { 
  FaSearch, FaCalendarAlt, FaUsers, FaRegCalendarAlt, 
  FaTrophy, FaHeartbeat, FaArrowLeft, FaClipboardList, FaGraduationCap, FaClipboard 
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navber from "../../navbar/page";

const UniversityPage = () => {
  const router = useRouter();

  const services = [
    { name: "List of Holiday", icon: <FaCalendarAlt />, path: "/University_Management/Holiday_List" },
    { name: "Phone Directory", icon: <FaUsers />, path: "/University_Management/Phone_Directory_List" },
    { name: "Academic Calendar", icon: <FaRegCalendarAlt />, path: "/University_Management/Academic_Calendar_List" },
    { name: "Admin Registration", icon: <FaClipboardList />, path: "/components/admin-registration" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 min-h-screen transition-colors duration-500 pt-32">
      <Navber />
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <button 
              onClick={() => router.push("/dashboard")} 
              className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2  shadow-md hover:bg-blue-700 transition-all"
            >
              <FaArrowLeft /> Go Back
            </button>
            <h2 className="text-3xl  text-center text-gray-900">University Management</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 transition-transform hover:scale-105 hover:shadow-2xl bg-white text-gray-900 hover:bg-blue-50 hover:border-blue-400"
                >
                  <div className="text-5xl mb-4 text-blue-700">{service.icon}</div>
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
