"use client";

import { 
  FaBroom, FaUsers, FaClipboardList, FaClock, FaBoxOpen, FaRupeeSign, FaAward, FaExclamationTriangle
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Housekeeping_Staff_Page = () => {
  const router = useRouter();

  const housekeepingServices = [
    { name: "Housekeeping Staff Management", icon: <FaUsers />, path: "/housekeeping/staff-management" },
    { name: "Shift Scheduling", icon: <FaClock />, path: "/housekeeping/shift-scheduling" },
    { name: "Attendance Management", icon: <FaClipboardList />, path: "/housekeeping/attendance" },
    { name: "Equipment Request", icon: <FaBoxOpen />, path: "/housekeeping/equipment-request" },
    { name: "Budget Management", icon: <FaRupeeSign />, path: "/housekeeping/budget-management" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/housekeeping/performance-evaluation" },
    { name: "Resource Allocation", icon: <FaBoxOpen />, path: "/housekeeping/resource-allocation" },
    { name: "Risk Management", icon: <FaExclamationTriangle />, path: "/housekeeping/risk-management" }
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-2 border-gray-300 shadow-md">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 text-white px-6 py-2 flex items-center gap-2 shadow-md hover:bg-green-700 transition-all"
            >
              Go Back
            </button>
            <h2 className="text-3xl text-center flex items-center gap-3 text-gray-800 font-semibold">
              <FaBroom className="text-green-500 text-3xl animate-pulse" />
              Housekeeping Staff Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {housekeepingServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 bg-white transition-transform hover:scale-105 hover:shadow-2xl rounded-lg text-gray-900 hover:bg-green-50 hover:border-green-400"
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

export default Housekeeping_Staff_Page;
