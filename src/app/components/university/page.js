"use client";

import { 
  FaSearch, FaCalendarAlt, FaUsers, FaRegCalendarAlt, 
  FaTrophy, FaHeartbeat,FaArrowLeft, FaClipboardList, FaGraduationCap, FaClipboard 
} from "react-icons/fa";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Navber from "../../navbar/page";

const UniversityPage = () => {

  const router = useRouter();



  const services = [
    { name: "List of Holiday", icon: <FaCalendarAlt />, path: "/student_dash/students_forms/holiday_list" },
    { name: "Phone Directory", icon: <FaUsers />, path: "/phone-directory" },
    { name: "Academic Calendar", icon: <FaRegCalendarAlt />, path: "/academic-calendar" },
    { name: "Admin Registration", icon: <FaClipboardList />, path: "/components/admin-registration" },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen transition-colors duration-500 pt-32">
      <Navber/>
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <button onClick={() => router.push("/dashboard")} className="bg-blue-500 text-white px-3 py-2 flex items-center gap-2 hover:bg-blue-700">
              <FaArrowLeft /> Go Back
            </button>
            <h2 className="text-2xl text-center text-gray-800">University Management</h2>
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